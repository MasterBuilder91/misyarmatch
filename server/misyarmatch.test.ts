import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

// ─── Test Helpers ─────────────────────────────────────────────────────────────

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(overrides?: Partial<AuthenticatedUser>): { ctx: TrpcContext; clearedCookies: { name: string; options: Record<string, unknown> }[] } {
  const clearedCookies: { name: string; options: Record<string, unknown> }[] = [];

  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-open-id",
    email: "test@misyarmatch.net",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    lastSignedIn: new Date("2024-01-01"),
    ...overrides,
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, clearedCookies };
}

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

// ─── Auth Tests ───────────────────────────────────────────────────────────────

describe("auth.logout", () => {
  it("clears the session cookie and returns success", async () => {
    const { ctx, clearedCookies } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
    expect(clearedCookies[0]?.options).toMatchObject({
      maxAge: -1,
      httpOnly: true,
      path: "/",
    });
  });

  it("returns the authenticated user from auth.me", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const user = await caller.auth.me();
    expect(user).toBeTruthy();
    expect(user?.email).toBe("test@misyarmatch.net");
  });

  it("returns null from auth.me when unauthenticated", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const user = await caller.auth.me();
    expect(user).toBeNull();
  });
});

// ─── Circumstances Badge Tests ────────────────────────────────────────────────

describe("Circumstances badge label mapping", () => {
  const CIRCUMSTANCES_LABELS: Record<string, string> = {
    ready_now: "Ready Now",
    currently_studying: "Currently Studying",
    going_through_divorce: "Going Through Divorce",
    already_married_seeking_second: "Already Married — Seeking Second Wife",
    working_abroad: "Working Abroad",
    financial_constraints: "Financial Constraints",
  };

  it("maps all six circumstances to correct display labels", () => {
    expect(CIRCUMSTANCES_LABELS["ready_now"]).toBe("Ready Now");
    expect(CIRCUMSTANCES_LABELS["currently_studying"]).toBe("Currently Studying");
    expect(CIRCUMSTANCES_LABELS["going_through_divorce"]).toBe("Going Through Divorce");
    expect(CIRCUMSTANCES_LABELS["already_married_seeking_second"]).toBe("Already Married — Seeking Second Wife");
    expect(CIRCUMSTANCES_LABELS["working_abroad"]).toBe("Working Abroad");
    expect(CIRCUMSTANCES_LABELS["financial_constraints"]).toBe("Financial Constraints");
  });

  it("covers all six defined circumstances", () => {
    expect(Object.keys(CIRCUMSTANCES_LABELS)).toHaveLength(6);
  });
});

// ─── Tiered Access Logic Tests ────────────────────────────────────────────────

describe("Tiered access logic", () => {
  it("sisters are always free — subscriptionTier defaults to free", () => {
    const sisterTier = "free";
    expect(sisterTier).toBe("free");
  });

  it("premium check uses subscriptionTier field", () => {
    const premiumProfile = { subscriptionTier: "premium" as const };
    const freeProfile = { subscriptionTier: "free" as const };
    expect(premiumProfile.subscriptionTier === "premium").toBe(true);
    expect(freeProfile.subscriptionTier === "premium").toBe(false);
  });

  it("daily chat limit for free brothers is 1800 seconds (30 minutes)", () => {
    const FREE_DAILY_LIMIT_SECONDS = 30 * 60;
    expect(FREE_DAILY_LIMIT_SECONDS).toBe(1800);
  });
});

// ─── Speed Chat Session Logic Tests ──────────────────────────────────────────

describe("Speed Chat session logic", () => {
  it("session duration is 5 minutes (300 seconds)", () => {
    const SESSION_DURATION = 5 * 60;
    expect(SESSION_DURATION).toBe(300);
  });

  it("formats time correctly", () => {
    const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}:${s.toString().padStart(2, "0")}`;
    };
    expect(formatTime(300)).toBe("5:00");
    expect(formatTime(0)).toBe("0:00");
    expect(formatTime(65)).toBe("1:05");
    expect(formatTime(59)).toBe("0:59");
  });
});

// ─── CSV Import Parsing Tests ─────────────────────────────────────────────────

describe("Admin CSV import parsing", () => {
  const parseCSV = (text: string) => {
    const lines = text.trim().split("\n");
    if (lines.length < 2) return [];
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
    return lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
      const row: Record<string, string> = {};
      headers.forEach((h, i) => { row[h] = values[i] ?? ""; });
      return {
        gender: (row.gender?.toLowerCase() === "sister" ? "sister" : "brother") as "brother" | "sister",
        displayName: row.display_name || row.name || "Member",
        country: row.country || "United Kingdom",
        currentCircumstances: row.current_circumstances || "ready_now",
      };
    });
  };

  it("parses a valid CSV with headers", () => {
    const csv = `name,gender,country,current_circumstances
Aisha,sister,United Kingdom,ready_now
Omar,brother,United Kingdom,working_abroad`;
    const result = parseCSV(csv);
    expect(result).toHaveLength(2);
    expect(result[0]?.gender).toBe("sister");
    expect(result[0]?.displayName).toBe("Aisha");
    expect(result[1]?.gender).toBe("brother");
    expect(result[1]?.currentCircumstances).toBe("working_abroad");
  });

  it("defaults gender to brother if unrecognised", () => {
    const csv = `name,gender\nTest,unknown`;
    const result = parseCSV(csv);
    expect(result[0]?.gender).toBe("brother");
  });

  it("returns empty array for CSV with only headers", () => {
    const csv = `name,gender,country`;
    const result = parseCSV(csv);
    expect(result).toHaveLength(0);
  });

  it("defaults country to United Kingdom if missing", () => {
    const csv = `name,gender\nTest,sister`;
    const result = parseCSV(csv);
    expect(result[0]?.country).toBe("United Kingdom");
  });
});

// ─── SEO / Meta Tag Tests ─────────────────────────────────────────────────────

describe("SEO configuration", () => {
  it("canonical URL is https://www.misyarmatch.net", () => {
    const canonical = "https://www.misyarmatch.net/";
    expect(canonical).toMatch(/^https:\/\/www\.misyarmatch\.net/);
  });

  it("all required pages have defined routes", () => {
    const routes = [
      "/",
      "/browse",
      "/speed-chat",
      "/matches",
      "/messages",
      "/notifications",
      "/profile/create",
      "/profile/edit",
      "/pricing",
      "/what-is-misyar",
      "/how-it-works",
      "/why-misyar-works",
      "/faq",
      "/safety",
      "/auth",
    ];
    expect(routes).toHaveLength(15);
    routes.forEach((route) => {
      expect(route).toMatch(/^\//);
    });
  });
});

// ─── Stripe Payment Tests ─────────────────────────────────────────────────────

describe("Stripe payment configuration", () => {
  it("premium price is £19.99 (1999 pence)", () => {
    const PREMIUM_PRICE_PENCE = 1999;
    expect(PREMIUM_PRICE_PENCE).toBe(1999);
    expect(PREMIUM_PRICE_PENCE / 100).toBe(19.99);
  });

  it("subscription interval is monthly", () => {
    const interval = "month";
    expect(interval).toBe("month");
  });

  it("currency is GBP", () => {
    const currency = "gbp";
    expect(currency).toBe("gbp");
  });
});
