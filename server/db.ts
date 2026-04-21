import { and, desc, eq, ne, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  chatMessages,
  chatQueue,
  chatSessions,
  compatibilityInsights,
  interests,
  matches,
  notifications,
  payments,
  privateMessages,
  profiles,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};

  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    const value = user[field];
    if (value === undefined) continue;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  }

  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }

  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// ─── Profiles ─────────────────────────────────────────────────────────────────

export async function getProfileByUserId(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getProfileWithUser(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select({ profile: profiles, user: users })
    .from(profiles)
    .innerJoin(users, eq(profiles.userId, users.id))
    .where(eq(profiles.userId, userId))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createProfile(data: typeof profiles.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(profiles).values(data);
  return getProfileByUserId(data.userId);
}

export async function updateProfile(userId: number, data: Partial<typeof profiles.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(profiles).set(data).where(eq(profiles.userId, userId));
  return getProfileByUserId(userId);
}

export async function listProfiles(filters: {
  gender?: "brother" | "sister";
  location?: string;
  country?: string;
  maritalStatus?: string;
  currentCircumstances?: string;
  excludeUserId?: number;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [
    eq(profiles.isProfileVisible, true),
    eq(profiles.hideFromSearch, false),
    eq(profiles.invisibleMode, false),
  ];

  if (filters.gender) conditions.push(eq(profiles.gender, filters.gender));
  if (filters.location) conditions.push(eq(profiles.location, filters.location));
  if (filters.country) conditions.push(eq(profiles.country, filters.country));
  if (filters.maritalStatus)
    conditions.push(eq(profiles.maritalStatus, filters.maritalStatus as any));
  if (filters.currentCircumstances)
    conditions.push(eq(profiles.currentCircumstances, filters.currentCircumstances as any));
  if (filters.excludeUserId)
    conditions.push(ne(profiles.userId, filters.excludeUserId));

  return db
    .select({ profile: profiles, user: users })
    .from(profiles)
    .innerJoin(users, eq(profiles.userId, users.id))
    .where(and(...conditions))
    .orderBy(desc(profiles.createdAt))
    .limit(filters.limit ?? 20)
    .offset(filters.offset ?? 0);
}

// ─── Interests ────────────────────────────────────────────────────────────────

export async function expressInterest(fromUserId: number, toUserId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db
    .select()
    .from(interests)
    .where(and(eq(interests.fromUserId, fromUserId), eq(interests.toUserId, toUserId)))
    .limit(1);
  if (existing.length > 0) return { alreadyExpressed: true };
  await db.insert(interests).values({ fromUserId, toUserId });
  return { alreadyExpressed: false };
}

export async function checkMutualInterest(userA: number, userB: number) {
  const db = await getDb();
  if (!db) return false;
  const aToB = await db
    .select()
    .from(interests)
    .where(and(eq(interests.fromUserId, userA), eq(interests.toUserId, userB)))
    .limit(1);
  const bToA = await db
    .select()
    .from(interests)
    .where(and(eq(interests.fromUserId, userB), eq(interests.toUserId, userA)))
    .limit(1);
  return aToB.length > 0 && bToA.length > 0;
}

export async function hasExpressedInterest(fromUserId: number, toUserId: number) {
  const db = await getDb();
  if (!db) return false;
  const result = await db
    .select()
    .from(interests)
    .where(and(eq(interests.fromUserId, fromUserId), eq(interests.toUserId, toUserId)))
    .limit(1);
  return result.length > 0;
}

// ─── Matches ──────────────────────────────────────────────────────────────────

export async function createMatch(brotherUserId: number, sisterUserId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db
    .select()
    .from(matches)
    .where(
      and(
        eq(matches.brotherUserId, brotherUserId),
        eq(matches.sisterUserId, sisterUserId),
        eq(matches.isActive, true)
      )
    )
    .limit(1);
  if (existing.length > 0) return existing[0];
  await db.insert(matches).values({ brotherUserId, sisterUserId });
  const created = await db
    .select()
    .from(matches)
    .where(and(eq(matches.brotherUserId, brotherUserId), eq(matches.sisterUserId, sisterUserId)))
    .orderBy(desc(matches.matchedAt))
    .limit(1);
  return created[0] ?? null;
}

export async function getMatchesForUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(matches)
    .where(
      and(
        or(eq(matches.brotherUserId, userId), eq(matches.sisterUserId, userId)),
        eq(matches.isActive, true)
      )
    )
    .orderBy(desc(matches.matchedAt));
}

export async function getMatchById(matchId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(matches).where(eq(matches.id, matchId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// ─── Private Messages ─────────────────────────────────────────────────────────

export async function sendPrivateMessage(matchId: number, senderUserId: number, content: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(privateMessages).values({ matchId, senderUserId, content });
}

export async function getPrivateMessages(matchId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(privateMessages)
    .where(eq(privateMessages.matchId, matchId))
    .orderBy(privateMessages.sentAt);
}

// ─── Notifications ────────────────────────────────────────────────────────────

export async function createNotification(data: typeof notifications.$inferInsert) {
  const db = await getDb();
  if (!db) return;
  await db.insert(notifications).values(data);
}

export async function getNotificationsForUser(userId: number, limit = 30) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(limit);
}

export async function getUnreadNotificationCount(userId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(notifications)
    .where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));
  return result[0]?.count ?? 0;
}

export async function markNotificationsRead(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db
    .update(notifications)
    .set({ isRead: true })
    .where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));
}

// ─── Chat Queue ───────────────────────────────────────────────────────────────

export async function joinChatQueue(userId: number, gender: "brother" | "sister") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .insert(chatQueue)
    .values({ userId, gender })
    .onDuplicateKeyUpdate({ set: { joinedAt: new Date() } });
}

export async function leaveChatQueue(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(chatQueue).where(eq(chatQueue.userId, userId));
}

export async function findChatPartner(userId: number, gender: "brother" | "sister") {
  const db = await getDb();
  if (!db) return null;
  const oppositeGender = gender === "brother" ? "sister" : "brother";
  const result = await db
    .select()
    .from(chatQueue)
    .where(and(eq(chatQueue.gender, oppositeGender), ne(chatQueue.userId, userId)))
    .orderBy(chatQueue.joinedAt)
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

// ─── Chat Sessions ────────────────────────────────────────────────────────────

export async function createChatSession(brotherUserId: number, sisterUserId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(chatSessions).values({ brotherUserId, sisterUserId });
  const result = await db
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
  return result[0] ?? null;
}

export async function getChatSession(sessionId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(chatSessions)
    .where(eq(chatSessions.id, sessionId))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function endChatSession(sessionId: number, durationSeconds: number) {
  const db = await getDb();
  if (!db) return;
  await db
    .update(chatSessions)
    .set({ status: "ended", endedAt: new Date(), durationSeconds })
    .where(eq(chatSessions.id, sessionId));
}

export async function requestConnect(sessionId: number, userId: number, isBrother: boolean) {
  const db = await getDb();
  if (!db) return null;
  if (isBrother) {
    await db
      .update(chatSessions)
      .set({ brotherRequestedConnect: true })
      .where(eq(chatSessions.id, sessionId));
  } else {
    await db
      .update(chatSessions)
      .set({ sisterRequestedConnect: true })
      .where(eq(chatSessions.id, sessionId));
  }
  return getChatSession(sessionId);
}

export async function addChatMessage(sessionId: number, senderUserId: number, content: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(chatMessages).values({ sessionId, senderUserId, content });
}

export async function getChatMessages(sessionId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.sessionId, sessionId))
    .orderBy(chatMessages.sentAt);
}

// ─── Compatibility Insights ───────────────────────────────────────────────────

export async function saveCompatibilityInsight(
  userId: number,
  matchId: number,
  insight: string
) {
  const db = await getDb();
  if (!db) return;
  await db.insert(compatibilityInsights).values({ userId, matchId, insight });
}

export async function getCompatibilityInsight(userId: number, matchId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(compatibilityInsights)
    .where(
      and(eq(compatibilityInsights.userId, userId), eq(compatibilityInsights.matchId, matchId))
    )
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

// ─── Payments ─────────────────────────────────────────────────────────────────

export async function createPayment(data: typeof payments.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(payments).values(data);
}

export async function updatePaymentStatus(
  stripePaymentIntentId: string,
  status: "succeeded" | "failed" | "refunded"
) {
  const db = await getDb();
  if (!db) return;
  await db
    .update(payments)
    .set({ status })
    .where(eq(payments.stripePaymentIntentId, stripePaymentIntentId));
}

export async function upgradeToPremium(userId: number, months = 1) {
  const db = await getDb();
  if (!db) return;
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + months);
  await db
    .update(profiles)
    .set({ subscriptionTier: "premium", premiumExpiresAt: expiresAt })
    .where(eq(profiles.userId, userId));
}

export async function upgradeToVip(userId: number, months = 1) {
  const db = await getDb();
  if (!db) return;
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + months);
  await db
    .update(profiles)
    .set({ subscriptionTier: "vip", premiumExpiresAt: expiresAt })
    .where(eq(profiles.userId, userId));
}

export async function getWhoLikedMe(userId: number, limit = 20) {
  const db = await getDb();
  if (!db) return [];
  const results = await db
    .select({ interest: interests, profile: profiles })
    .from(interests)
    .innerJoin(profiles, eq(interests.fromUserId, profiles.userId))
    .where(eq(interests.toUserId, userId))
    .orderBy(desc(interests.createdAt))
    .limit(limit);
  return results;
}
