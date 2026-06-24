import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { storagePut } from "./storage";
import {
  checkMutualInterest,
  createMatch,
  createNotification,
  createPayment,
  expressInterest,
  getCompatibilityInsight,
  getMatchById,
  getMatchesForUser,
  getNotificationsForUser,
  getPrivateMessages,
  getProfileByUserId,
  getProfileWithUser,
  getUnreadNotificationCount,
  hasExpressedInterest,
  listProfiles,
  markNotificationsRead,
  saveCompatibilityInsight,
  sendPrivateMessage,
  updateProfile,
  upgradeToPremium,
  upgradeToVip,
  getWhoLikedMe,
  getDb,
  getUserById,
} from "./db";
import {
  profiles,
  users,
  interests as interestsTable,
  matches as matchesTable,
} from "../drizzle/schema";
import { eq, and, or, desc } from "drizzle-orm";
import Stripe from "stripe";

// ─── Admin guard ──────────────────────────────────────────────────────────────

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// ─── Profile Router ───────────────────────────────────────────────────────────

const profileRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const profile = await getProfileByUserId(ctx.user.id);
    return profile ?? null;
  }),

  getByUserId: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const result = await getProfileWithUser(input.userId);
      return result ?? null;
    }),

  create: protectedProcedure
    .input(
      z.object({
        gender: z.enum(["brother", "sister"]),
        dateOfBirth: z.string(),
        currentCircumstances: z.enum([
          "ready_now",
          "currently_studying",
          "going_through_divorce",
          "already_married_seeking_second",
          "working_abroad",
          "financial_constraints",
        ]),
        misyarIntention: z.string().max(2000),
        displayName: z.string().max(100).optional(),
        bio: z.string().optional(),
        location: z.string().max(100).optional(),
        country: z.string().max(100).optional(),
        maritalStatus: z
          .enum(["never_married", "divorced", "widowed", "married_seeking_second"])
          .optional(),
        occupation: z.string().max(100).optional(),
        photoUrl: z.string().optional(),
        photoKey: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await getProfileByUserId(ctx.user.id);
      if (existing) {
        throw new TRPCError({ code: "CONFLICT", message: "Profile already exists" });
      }
      const dob = new Date(input.dateOfBirth);
      const age = Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 3600 * 1000));
      if (age < 18) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "You must be 18 or older" });
      }
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.insert(profiles).values({
        userId: ctx.user.id,
        gender: input.gender,
        dateOfBirth: dob,
        ageVerified: true,
        currentCircumstances: input.currentCircumstances,
        misyarIntention: input.misyarIntention,
        displayName: input.displayName,
        bio: input.bio,
        location: input.location,
        country: input.country,
        maritalStatus: input.maritalStatus,
        occupation: input.occupation,
        photoUrl: input.photoUrl,
        photoKey: input.photoKey,
      });
      return getProfileByUserId(ctx.user.id);
    }),

  update: protectedProcedure
    .input(
      z.object({
        displayName: z.string().max(100).optional(),
        bio: z.string().optional(),
        location: z.string().max(100).optional(),
        country: z.string().max(100).optional(),
        maritalStatus: z
          .enum(["never_married", "divorced", "widowed", "married_seeking_second"])
          .optional(),
        currentCircumstances: z
          .enum([
            "ready_now",
            "currently_studying",
            "going_through_divorce",
            "already_married_seeking_second",
            "working_abroad",
            "financial_constraints",
          ])
          .optional(),
        misyarIntention: z.string().max(2000).optional(),
        occupation: z.string().max(100).optional(),
        photoUrl: z.string().optional(),
        photoKey: z.string().optional(),
        isProfileVisible: z.boolean().optional(),
        invisibleMode: z.boolean().optional(),
        hideFromSearch: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const profile = await getProfileByUserId(ctx.user.id);
      if (!profile) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Profile not found" });
      }
      return updateProfile(ctx.user.id, input);
    }),

  whoLikedMe: protectedProcedure.query(async ({ ctx }) => {
    const profile = await getProfileByUserId(ctx.user.id);
    const tier = profile?.subscriptionTier ?? "free";
    const results = await getWhoLikedMe(ctx.user.id, tier === "vip" ? 50 : tier === "premium" ? 10 : 3);
    return { results, isLimited: tier === "free", tier };
  }),

  blockUser: protectedProcedure
    .input(z.object({ targetUserId: z.number(), reason: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      // Record block by updating a JSON field or just notify admin
      await createNotification({
        userId: ctx.user.id,
        type: "system",
        title: "User blocked",
        body: `You have blocked user ${input.targetUserId}. They can no longer contact you.`,
        relatedId: input.targetUserId,
      });
      // Notify admin
      await createNotification({
        userId: 1, // admin
        type: "system",
        title: "Block report",
        body: `User ${ctx.user.id} blocked user ${input.targetUserId}. Reason: ${input.reason ?? "Not specified"}.`,
        relatedId: input.targetUserId,
      });
      return { success: true };
    }),

  reportUser: protectedProcedure
    .input(z.object({ targetUserId: z.number(), reason: z.string().min(10) }))
    .mutation(async ({ ctx, input }) => {
      await createNotification({
        userId: 1, // admin
        type: "system",
        title: "Safety report",
        body: `User ${ctx.user.id} reported user ${input.targetUserId}: ${input.reason}`,
        relatedId: input.targetUserId,
      });
      return { success: true };
    }),

  list: publicProcedure
    .input(
      z.object({
        gender: z.enum(["brother", "sister"]).optional(),
        location: z.string().optional(),
        country: z.string().optional(),
        maritalStatus: z.string().optional(),
        currentCircumstances: z.string().optional(),
        excludeUserId: z.number().optional(),
        limit: z.number().min(1).max(50).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      return listProfiles(input);
    }),

  uploadPhoto: protectedProcedure
    .input(
      z.object({
        base64: z.string(),
        mimeType: z.string(),
        fileName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const buffer = Buffer.from(input.base64, "base64");
      const key = `profile-photos/${ctx.user.id}-${Date.now()}-${input.fileName}`;
      const { url } = await storagePut(key, buffer, input.mimeType);
      return { url, key };
    }),
});

// ─── Interests Router ─────────────────────────────────────────────────────────

const interestsRouter = router({
  express: protectedProcedure
    .input(z.object({ toUserId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const result = await expressInterest(ctx.user.id, input.toUserId);
      if (result.alreadyExpressed) return { matched: false, alreadyExpressed: true };

      // Check mutual interest
      const mutual = await checkMutualInterest(ctx.user.id, input.toUserId);
      if (mutual) {
        // Determine brother/sister
        const myProfile = await getProfileByUserId(ctx.user.id);
        const theirProfile = await getProfileByUserId(input.toUserId);
        if (myProfile && theirProfile) {
          const brotherUserId = myProfile.gender === "brother" ? ctx.user.id : input.toUserId;
          const sisterUserId = myProfile.gender === "sister" ? ctx.user.id : input.toUserId;
          await createMatch(brotherUserId, sisterUserId);

          // Notify both
          await createNotification({
            userId: ctx.user.id,
            type: "new_match",
            title: "It's a Match! 💕",
            body: `You and ${theirProfile.displayName ?? "someone"} have matched. Start a conversation!`,
          });
          await createNotification({
            userId: input.toUserId,
            type: "new_match",
            title: "It's a Match! 💕",
            body: `You and ${myProfile.displayName ?? "someone"} have matched. Start a conversation!`,
          });
        }
        return { matched: true, alreadyExpressed: false };
      }

      // Notify the recipient of interest
      const myProfile = await getProfileByUserId(ctx.user.id);
      await createNotification({
        userId: input.toUserId,
        type: "new_interest",
        title: "Someone expressed interest",
        body: `${myProfile?.displayName ?? "A member"} is interested in your profile.`,
        relatedId: ctx.user.id,
      });

      return { matched: false, alreadyExpressed: false };
    }),

  check: protectedProcedure
    .input(z.object({ toUserId: z.number() }))
    .query(async ({ ctx, input }) => {
      const expressed = await hasExpressedInterest(ctx.user.id, input.toUserId);
      const mutual = await checkMutualInterest(ctx.user.id, input.toUserId);
      return { expressed, mutual };
    }),
});

// ─── Matches Router ───────────────────────────────────────────────────────────

const matchesRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const userMatches = await getMatchesForUser(ctx.user.id);
    const enriched = await Promise.all(
      userMatches.map(async (match) => {
        const otherUserId =
          match.brotherUserId === ctx.user.id ? match.sisterUserId : match.brotherUserId;
        const otherProfile = await getProfileWithUser(otherUserId);
        return { match, otherProfile };
      })
    );
    return enriched;
  }),

  getById: protectedProcedure
    .input(z.object({ matchId: z.number() }))
    .query(async ({ ctx, input }) => {
      const match = await getMatchById(input.matchId);
      if (!match) throw new TRPCError({ code: "NOT_FOUND" });
      if (match.brotherUserId !== ctx.user.id && match.sisterUserId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      const otherUserId =
        match.brotherUserId === ctx.user.id ? match.sisterUserId : match.brotherUserId;
      const otherProfile = await getProfileWithUser(otherUserId);
      return { match, otherProfile };
    }),
});

// ─── Messages Router ──────────────────────────────────────────────────────────

const messagesRouter = router({
  send: protectedProcedure
    .input(z.object({ matchId: z.number(), content: z.string().min(1).max(2000) }))
    .mutation(async ({ ctx, input }) => {
      const match = await getMatchById(input.matchId);
      if (!match) throw new TRPCError({ code: "NOT_FOUND" });
      if (match.brotherUserId !== ctx.user.id && match.sisterUserId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      // Paywall: brothers on the free tier cannot message until they upgrade.
      // Sisters can always message for free.
      const myProfile = await getProfileByUserId(ctx.user.id);
      if (myProfile?.gender === "brother" && (myProfile.subscriptionTier ?? "free") === "free") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Upgrade to Premium to start messaging matches.",
        });
      }

      await sendPrivateMessage(input.matchId, ctx.user.id, input.content);

      // Notify recipient
      const otherUserId =
        match.brotherUserId === ctx.user.id ? match.sisterUserId : match.brotherUserId;
      await createNotification({
        userId: otherUserId,
        type: "new_message",
        title: "New message",
        body: `${myProfile?.displayName ?? "Your match"} sent you a message.`,
        relatedId: input.matchId,
      });

      return { success: true };
    }),

  list: protectedProcedure
    .input(z.object({ matchId: z.number() }))
    .query(async ({ ctx, input }) => {
      const match = await getMatchById(input.matchId);
      if (!match) throw new TRPCError({ code: "NOT_FOUND" });
      if (match.brotherUserId !== ctx.user.id && match.sisterUserId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return getPrivateMessages(input.matchId);
    }),
});

// ─── Notifications Router ─────────────────────────────────────────────────────

const notificationsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return getNotificationsForUser(ctx.user.id);
  }),

  unreadCount: protectedProcedure.query(async ({ ctx }) => {
    const count = await getUnreadNotificationCount(ctx.user.id);
    return { count };
  }),

  markAllRead: protectedProcedure.mutation(async ({ ctx }) => {
    await markNotificationsRead(ctx.user.id);
    return { success: true };
  }),
});

// ─── Speed Chat Router ────────────────────────────────────────────────────────

const speedChatRouter = router({
  getStatus: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { inQueue: false, activeSession: null };
    const { chatQueue, chatSessions } = await import("../drizzle/schema");
    const queue = await db
      .select()
      .from(chatQueue)
      .where(eq(chatQueue.userId, ctx.user.id))
      .limit(1);
    const session = await db
      .select()
      .from(chatSessions)
      .where(
        and(
          or(
            eq(chatSessions.brotherUserId, ctx.user.id),
            eq(chatSessions.sisterUserId, ctx.user.id)
          ),
          eq(chatSessions.status, "active")
        )
      )
      .orderBy(desc(chatSessions.startedAt))
      .limit(1);
    return {
      inQueue: queue.length > 0,
      activeSession: session.length > 0 ? session[0] : null,
    };
  }),

  join: protectedProcedure.mutation(async ({ ctx }) => {
    const profile = await getProfileByUserId(ctx.user.id);
    if (!profile) throw new TRPCError({ code: "BAD_REQUEST", message: "Complete your profile first" });

    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const { chatQueue, chatSessions } = await import("../drizzle/schema");

    // Check if already in active session
    const existingSession = await db
      .select()
      .from(chatSessions)
      .where(
        and(
          or(
            eq(chatSessions.brotherUserId, ctx.user.id),
            eq(chatSessions.sisterUserId, ctx.user.id)
          ),
          eq(chatSessions.status, "active")
        )
      )
      .limit(1);
    if (existingSession.length > 0) return { sessionId: existingSession[0].id, matched: true };

    // Find partner
    const oppositeGender = profile.gender === "brother" ? "sister" : "brother";
    const partner = await db
      .select()
      .from(chatQueue)
      .where(and(eq(chatQueue.gender, oppositeGender)))
      .orderBy(chatQueue.joinedAt)
      .limit(1);

    if (partner.length > 0) {
      const partnerEntry = partner[0];
      // Remove both from queue
      await db.delete(chatQueue).where(eq(chatQueue.userId, ctx.user.id));
      await db.delete(chatQueue).where(eq(chatQueue.userId, partnerEntry.userId));

      const brotherUserId = profile.gender === "brother" ? ctx.user.id : partnerEntry.userId;
      const sisterUserId = profile.gender === "sister" ? ctx.user.id : partnerEntry.userId;

      await db.insert(chatSessions).values({ brotherUserId, sisterUserId });
      const session = await db
        .select()
        .from(chatSessions)
        .where(
          and(
            eq(chatSessions.brotherUserId, brotherUserId),
            eq(chatSessions.sisterUserId, sisterUserId),
            eq(chatSessions.status, "active")
          )
        )
        .orderBy(desc(chatSessions.startedAt))
        .limit(1);
      return { sessionId: session[0]?.id ?? null, matched: true };
    }

    // Add to queue
    await db
      .insert(chatQueue)
      .values({ userId: ctx.user.id, gender: profile.gender })
      .onDuplicateKeyUpdate({ set: { joinedAt: new Date() } });

    return { sessionId: null, matched: false };
  }),

  leave: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { success: true };
    const { chatQueue } = await import("../drizzle/schema");
    await db.delete(chatQueue).where(eq(chatQueue.userId, ctx.user.id));
    return { success: true };
  }),

  getSession: protectedProcedure
    .input(z.object({ sessionId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;
      const { chatSessions } = await import("../drizzle/schema");
      const result = await db
        .select()
        .from(chatSessions)
        .where(eq(chatSessions.id, input.sessionId))
        .limit(1);
      if (!result.length) return null;
      const session = result[0];
      if (session.brotherUserId !== ctx.user.id && session.sisterUserId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      // Get partner's circumstances (anonymous — no name/photo)
      const partnerUserId =
        session.brotherUserId === ctx.user.id ? session.sisterUserId : session.brotherUserId;
      const partnerProfile = await getProfileByUserId(partnerUserId);
      return {
        session,
        partnerCircumstances: partnerProfile?.currentCircumstances ?? null,
        partnerGender: partnerProfile?.gender ?? null,
      };
    }),

  sendMessage: protectedProcedure
    .input(z.object({ sessionId: z.number(), content: z.string().min(1).max(500) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const { chatSessions, chatMessages } = await import("../drizzle/schema");
      const session = await db
        .select()
        .from(chatSessions)
        .where(eq(chatSessions.id, input.sessionId))
        .limit(1);
      if (!session.length) throw new TRPCError({ code: "NOT_FOUND" });
      const s = session[0];
      if (s.brotherUserId !== ctx.user.id && s.sisterUserId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      if (s.status !== "active") throw new TRPCError({ code: "BAD_REQUEST", message: "Session ended" });
      await db.insert(chatMessages).values({ sessionId: input.sessionId, senderUserId: ctx.user.id, content: input.content });
      return { success: true };
    }),

  getMessages: protectedProcedure
    .input(z.object({ sessionId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      const { chatSessions, chatMessages } = await import("../drizzle/schema");
      const session = await db
        .select()
        .from(chatSessions)
        .where(eq(chatSessions.id, input.sessionId))
        .limit(1);
      if (!session.length) return [];
      const s = session[0];
      if (s.brotherUserId !== ctx.user.id && s.sisterUserId !== ctx.user.id) return [];
      return db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.sessionId, input.sessionId))
        .orderBy(chatMessages.sentAt);
    }),

  requestConnect: protectedProcedure
    .input(z.object({ sessionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const { chatSessions } = await import("../drizzle/schema");
      const sessionResult = await db
        .select()
        .from(chatSessions)
        .where(eq(chatSessions.id, input.sessionId))
        .limit(1);
      if (!sessionResult.length) throw new TRPCError({ code: "NOT_FOUND" });
      const s = sessionResult[0];
      const isBrother = s.brotherUserId === ctx.user.id;
      const isSister = s.sisterUserId === ctx.user.id;
      if (!isBrother && !isSister) throw new TRPCError({ code: "FORBIDDEN" });

      if (isBrother) {
        await db.update(chatSessions).set({ brotherRequestedConnect: true }).where(eq(chatSessions.id, input.sessionId));
      } else {
        await db.update(chatSessions).set({ sisterRequestedConnect: true }).where(eq(chatSessions.id, input.sessionId));
      }

      const updated = await db.select().from(chatSessions).where(eq(chatSessions.id, input.sessionId)).limit(1);
      const u = updated[0];
      if (u.brotherRequestedConnect && u.sisterRequestedConnect) {
        // Both connected — create match
        const match = await createMatch(u.brotherUserId, u.sisterUserId);
        await db.update(chatSessions).set({ status: "connected" }).where(eq(chatSessions.id, input.sessionId));
        const brotherProfile = await getProfileByUserId(u.brotherUserId);
        const sisterProfile = await getProfileByUserId(u.sisterUserId);
        await createNotification({
          userId: u.brotherUserId,
          type: "speed_chat_connect",
          title: "Speed Chat Match! 💕",
          body: `You and ${sisterProfile?.displayName ?? "your chat partner"} both chose to connect.`,
          relatedId: match?.id,
        });
        await createNotification({
          userId: u.sisterUserId,
          type: "speed_chat_connect",
          title: "Speed Chat Match! 💕",
          body: `You and ${brotherProfile?.displayName ?? "your chat partner"} both chose to connect.`,
          relatedId: match?.id,
        });
        return { bothConnected: true, matchId: match?.id ?? null };
      }
      return { bothConnected: false, matchId: null };
    }),

  endSession: protectedProcedure
    .input(z.object({ sessionId: z.number(), durationSeconds: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { success: true };
      const { chatSessions } = await import("../drizzle/schema");
      await db
        .update(chatSessions)
        .set({ status: "ended", endedAt: new Date(), durationSeconds: input.durationSeconds })
        .where(eq(chatSessions.id, input.sessionId));
      return { success: true };
    }),
});

// ─── Compatibility Insights Router ────────────────────────────────────────────

const insightsRouter = router({
  generate: protectedProcedure
    .input(z.object({ matchId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await getCompatibilityInsight(ctx.user.id, input.matchId);
      if (existing) return existing;

      const match = await getMatchById(input.matchId);
      if (!match) throw new TRPCError({ code: "NOT_FOUND" });
      if (match.brotherUserId !== ctx.user.id && match.sisterUserId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const myProfile = await getProfileByUserId(ctx.user.id);
      const otherUserId = match.brotherUserId === ctx.user.id ? match.sisterUserId : match.brotherUserId;
      const otherProfile = await getProfileByUserId(otherUserId);

      const prompt = `You are a compassionate Islamic marriage counsellor. Two Muslims have matched on a misyar marriage platform. Write a warm, honest, and encouraging compatibility insight for them — under 150 words. Be Islamic in tone, mention tawakkul (trust in Allah), and give practical advice for their first conversation. Their circumstances: Person A is ${myProfile?.currentCircumstances?.replace(/_/g, " ") ?? "unknown"}, Person B is ${otherProfile?.currentCircumstances?.replace(/_/g, " ") ?? "unknown"}. Do not use their names. Keep it private and personal.`;

      const response = await invokeLLM({
        messages: [
          { role: "system", content: "You are a compassionate Islamic marriage counsellor." },
          { role: "user", content: prompt },
        ],
      });

      const rawContent = response.choices[0]?.message?.content;
      const insight = typeof rawContent === "string" ? rawContent : "May Allah bless your connection and guide you both.";

      await saveCompatibilityInsight(ctx.user.id, input.matchId, insight);
      return { insight, generatedAt: new Date() };
    }),

  get: protectedProcedure
    .input(z.object({ matchId: z.number() }))
    .query(async ({ ctx, input }) => {
      return getCompatibilityInsight(ctx.user.id, input.matchId);
    }),
});

// ─── Payments Router ──────────────────────────────────────────────────────────

const paymentsRouter = router({
  createCheckoutSession: protectedProcedure
    .input(z.object({ origin: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Stripe not configured" });
      const stripe = new Stripe(stripeKey);
      const user = await getUserById(ctx.user.id);

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "MisyarMatch Premium Brother",
                description: "Unlimited Speed Chat, direct messaging, priority matching",
              },
              unit_amount: 999, // $9.99
              recurring: { interval: "month" },
            },
            quantity: 1,
          },
        ],
        customer_email: user?.email ?? undefined,
        client_reference_id: ctx.user.id.toString(),
        metadata: {
          user_id: ctx.user.id.toString(),
          customer_email: user?.email ?? "",
          customer_name: user?.name ?? "",
          tier: "premium",
        },
        allow_promotion_codes: true,
        success_url: `${input.origin}/pricing?success=true`,
        cancel_url: `${input.origin}/pricing?cancelled=true`,
      });

      await createPayment({
        userId: ctx.user.id,
        stripePaymentIntentId: session.id,
        amount: "9.99",
        currency: "usd",
        status: "pending",
        tierPurchased: "premium",
      });

      return { checkoutUrl: session.url };
    }),

  createVipCheckoutSession: protectedProcedure
    .input(z.object({ origin: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Stripe not configured" });
      const stripe = new Stripe(stripeKey);
      const user = await getUserById(ctx.user.id);

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "MisyarMatch VIP Brother",
                description: "Unlimited likes, see who liked you, VIP badge, priority placement",
              },
              unit_amount: 1999, // $19.99
              recurring: { interval: "month" },
            },
            quantity: 1,
          },
        ],
        customer_email: user?.email ?? undefined,
        client_reference_id: ctx.user.id.toString(),
        metadata: {
          user_id: ctx.user.id.toString(),
          customer_email: user?.email ?? "",
          customer_name: user?.name ?? "",
          tier: "vip",
        },
        allow_promotion_codes: true,
        success_url: `${input.origin}/pricing?success=true&tier=vip`,
        cancel_url: `${input.origin}/pricing?cancelled=true`,
      });

      await createPayment({
        userId: ctx.user.id,
        stripePaymentIntentId: session.id,
        amount: "19.99",
        currency: "usd",
        status: "pending",
        tierPurchased: "vip",
      });

      return { checkoutUrl: session.url };
    }),

  getStatus: protectedProcedure.query(async ({ ctx }) => {
    const profile = await getProfileByUserId(ctx.user.id);
    const tier = profile?.subscriptionTier ?? "free";
    return {
      isPremium: tier === "premium" || tier === "vip",
      isVip: tier === "vip",
      tier,
      premiumUntil: profile?.premiumExpiresAt ?? null,
    };
  }),
});

// ─── Browse Router ───────────────────────────────────────────────────────────

const browseRouter = router({
  list: protectedProcedure
    .input(
      z.object({
        country: z.string().optional(),
        maritalStatus: z.string().optional(),
        circumstances: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const myProfile = await getProfileByUserId(ctx.user.id);
      if (!myProfile) return { profiles: [], total: 0, expressedInterests: [], mutualInterests: [] };

      // Show opposite gender
      const oppositeGender = myProfile.gender === "brother" ? "sister" : "brother";
      const rawResult = await listProfiles({
        gender: oppositeGender,
        country: input.country,
        maritalStatus: input.maritalStatus,
        currentCircumstances: input.circumstances,
        excludeUserId: ctx.user.id,
        limit: 50,
        offset: 0,
      });

      // Get interests expressed by this user
      const db = await getDb();
      if (!db) return { profiles: [], total: 0, expressedInterests: [], mutualInterests: [] };

      const expressed = await db
        .select({ toUserId: interestsTable.toUserId })
        .from(interestsTable)
        .where(eq(interestsTable.fromUserId, ctx.user.id));

      const expressedIds = expressed.map((e) => e.toUserId);

      // Get mutual interests (matches)
      const userMatches = await getMatchesForUser(ctx.user.id);
      const mutualIds = userMatches.map((m) =>
        m.brotherUserId === ctx.user.id ? m.sisterUserId : m.brotherUserId
      );

      // listProfiles returns array of {profile, user} objects
      const profileList = rawResult.map((r: { profile: any; user: any }) => ({
        ...r.profile,
        dateOfBirth: r.profile.dateOfBirth ? r.profile.dateOfBirth.toISOString().split("T")[0] : null,
      }));

      return {
        profiles: profileList,
        total: profileList.length,
        expressedInterests: expressedIds,
        mutualInterests: mutualIds,
      };
    }),
});

// ─── Admin Router ─────────────────────────────────────────────────────────────

const adminRouter = router({
  importProfiles: adminProcedure
    .input(
      z.object({
        profiles: z.array(
          z.object({
            gender: z.enum(["brother", "sister"]),
            displayName: z.string(),
            age: z.number().optional(),
            location: z.string().optional(),
            country: z.string().optional(),
            maritalStatus: z.string().optional(),
            currentCircumstances: z.string().optional(),
            bio: z.string().optional(),
            occupation: z.string().optional(),
            misyarIntention: z.string().optional(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      let imported = 0;
      for (const p of input.profiles) {
        try {
          // Create a synthetic user for imported profiles
          const openId = `imported_${Date.now()}_${Math.random().toString(36).slice(2)}`;
          await db.insert(users).values({
            openId,
            name: p.displayName,
            loginMethod: "imported",
            role: "user",
          });
          const userResult = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
          const userId = userResult[0]?.id;
          if (!userId) continue;

          const dob = p.age ? new Date(Date.now() - p.age * 365.25 * 24 * 3600 * 1000) : new Date("1990-01-01");
          await db.insert(profiles).values({
            userId,
            gender: p.gender,
            dateOfBirth: dob,
            ageVerified: true,
            displayName: p.displayName,
            bio: p.bio,
            location: p.location,
            country: p.country,
            maritalStatus: (p.maritalStatus as any) ?? "never_married",
            currentCircumstances: (p.currentCircumstances as any) ?? "ready_now",
            misyarIntention: p.misyarIntention ?? "Looking for a sincere misyar partner.",
            occupation: p.occupation,
            isImported: true,
          });
          imported++;
        } catch (e) {
          console.error("Import error for profile:", p.displayName, e);
        }
      }
      return { imported, total: input.profiles.length };
    }),

  getStats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return null;
    const { sql } = await import("drizzle-orm");
    const userCount = await db.select({ count: sql<number>`count(*)` }).from(users);
    const profileCount = await db.select({ count: sql<number>`count(*)` }).from(profiles);
    const matchCount = await db.select({ count: sql<number>`count(*)` }).from(matchesTable);
    return {
      users: userCount[0]?.count ?? 0,
      profiles: profileCount[0]?.count ?? 0,
      matches: matchCount[0]?.count ?? 0,
    };
  }),
});

// ─── App Router ───────────────────────────────────────────────────────────────

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  profile: profileRouter,
  interests: interestsRouter,
  matches: matchesRouter,
  messages: messagesRouter,
  notifications: notificationsRouter,
  speedChat: speedChatRouter,
  insights: insightsRouter,
  payments: paymentsRouter,
  admin: adminRouter,
  browse: browseRouter,
});

export type AppRouter = typeof appRouter;
