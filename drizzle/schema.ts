import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
} from "drizzle-orm/mysql-core";

// ─── Users ───────────────────────────────────────────────────────────────────

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Profiles ─────────────────────────────────────────────────────────────────

export const profiles = mysqlTable("profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  gender: mysqlEnum("gender", ["brother", "sister"]).notNull(),
  dateOfBirth: timestamp("dateOfBirth"),
  ageVerified: boolean("ageVerified").default(false).notNull(),
  displayName: varchar("displayName", { length: 100 }),
  bio: text("bio"),
  location: varchar("location", { length: 100 }),
  country: varchar("country", { length: 100 }),
  maritalStatus: mysqlEnum("maritalStatus", [
    "never_married",
    "divorced",
    "widowed",
    "married_seeking_second",
  ]),
  currentCircumstances: mysqlEnum("currentCircumstances", [
    "ready_now",
    "currently_studying",
    "going_through_divorce",
    "already_married_seeking_second",
    "working_abroad",
    "financial_constraints",
  ]),
  misyarIntention: text("misyarIntention"),
  faithBackground: mysqlEnum("faithBackground", [
    "muslim",
    "christian",
    "jewish",
    "prefer_not_to_say",
  ]).default("muslim").notNull(),
  openToInterfaith: boolean("openToInterfaith").default(false).notNull(),
  occupation: varchar("occupation", { length: 100 }),
  photoUrl: text("photoUrl"),
  photoKey: text("photoKey"),
  isPhotoPublic: boolean("isPhotoPublic").default(false).notNull(),
  isProfileVisible: boolean("isProfileVisible").default(true).notNull(),
  subscriptionTier: mysqlEnum("subscriptionTier", ["free", "premium", "vip"]).default("free").notNull(),
  premiumExpiresAt: timestamp("premiumExpiresAt"),
  invisibleMode: boolean("invisibleMode").default(false).notNull(),
  hideFromSearch: boolean("hideFromSearch").default(false).notNull(),
  isVerified: boolean("isVerified").default(false).notNull(),
  dailyChatSecondsUsed: int("dailyChatSecondsUsed").default(0).notNull(),
  dailyChatResetAt: timestamp("dailyChatResetAt"),
  isImported: boolean("isImported").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = typeof profiles.$inferInsert;

// ─── Interests ────────────────────────────────────────────────────────────────

export const interests = mysqlTable("interests", {
  id: int("id").autoincrement().primaryKey(),
  fromUserId: int("fromUserId").notNull(),
  toUserId: int("toUserId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Interest = typeof interests.$inferSelect;
export type InsertInterest = typeof interests.$inferInsert;

// ─── Matches ──────────────────────────────────────────────────────────────────

export const matches = mysqlTable("matches", {
  id: int("id").autoincrement().primaryKey(),
  brotherUserId: int("brotherUserId").notNull(),
  sisterUserId: int("sisterUserId").notNull(),
  matchedAt: timestamp("matchedAt").defaultNow().notNull(),
  isActive: boolean("isActive").default(true).notNull(),
});

export type Match = typeof matches.$inferSelect;
export type InsertMatch = typeof matches.$inferInsert;

// ─── Private Messages ─────────────────────────────────────────────────────────

export const privateMessages = mysqlTable("private_messages", {
  id: int("id").autoincrement().primaryKey(),
  matchId: int("matchId").notNull(),
  senderUserId: int("senderUserId").notNull(),
  content: text("content").notNull(),
  sentAt: timestamp("sentAt").defaultNow().notNull(),
});

export type PrivateMessage = typeof privateMessages.$inferSelect;
export type InsertPrivateMessage = typeof privateMessages.$inferInsert;

// ─── Chat Queue ───────────────────────────────────────────────────────────────

export const chatQueue = mysqlTable("chat_queue", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  gender: mysqlEnum("gender", ["brother", "sister"]).notNull(),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
});

export type ChatQueue = typeof chatQueue.$inferSelect;
export type InsertChatQueue = typeof chatQueue.$inferInsert;

// ─── Chat Sessions ────────────────────────────────────────────────────────────

export const chatSessions = mysqlTable("chat_sessions", {
  id: int("id").autoincrement().primaryKey(),
  brotherUserId: int("brotherUserId").notNull(),
  sisterUserId: int("sisterUserId").notNull(),
  status: mysqlEnum("status", ["active", "ended", "connected"]).default("active").notNull(),
  brotherRequestedConnect: boolean("brotherRequestedConnect").default(false).notNull(),
  sisterRequestedConnect: boolean("sisterRequestedConnect").default(false).notNull(),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  endedAt: timestamp("endedAt"),
  durationSeconds: int("durationSeconds").default(0).notNull(),
});

export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatSession = typeof chatSessions.$inferInsert;

// ─── Chat Messages ────────────────────────────────────────────────────────────

export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").notNull(),
  senderUserId: int("senderUserId").notNull(),
  content: text("content").notNull(),
  sentAt: timestamp("sentAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

// ─── Notifications ────────────────────────────────────────────────────────────

export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["new_match", "new_message", "new_interest", "system", "speed_chat_connect"]).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  body: text("body"),
  isRead: boolean("isRead").default(false).notNull(),
  relatedId: int("relatedId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

// ─── Compatibility Insights ───────────────────────────────────────────────────

export const compatibilityInsights = mysqlTable("compatibility_insights", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  matchId: int("matchId").notNull(),
  insight: text("insight").notNull(),
  generatedAt: timestamp("generatedAt").defaultNow().notNull(),
});

export type CompatibilityInsight = typeof compatibilityInsights.$inferSelect;
export type InsertCompatibilityInsight = typeof compatibilityInsights.$inferInsert;

// ─── Stripe Payments ─────────────────────────────────────────────────────────

export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  currency: varchar("currency", { length: 10 }).default("gbp"),
  status: mysqlEnum("status", ["pending", "succeeded", "failed", "refunded"]).default("pending"),
  tierPurchased: mysqlEnum("tierPurchased", ["premium", "vip"]).default("premium"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;
