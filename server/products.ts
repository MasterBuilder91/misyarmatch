/**
 * MisyarMatch Stripe Product Definitions
 * Premium Brother tier — monthly subscription
 */

export const PRODUCTS = {
  premiumBrother: {
    name: "MisyarMatch Premium Brother",
    description: "Unlimited Speed Chat, direct messaging, priority matching, and extended daily chat time.",
    monthlyPriceGbp: 999, // $9.99 in cents (USD default)
    currency: "gbp",
    interval: "month" as const,
    features: [
      "Unlimited Speed Chat sessions",
      "Direct messaging with all matches",
      "Priority matching in queue",
      "Extended daily chat time",
      "Islamic compatibility insights",
      "Read receipts disabled by default",
    ],
  },
} as const;
