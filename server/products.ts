/**
 * MisyarMatch Stripe Product Definitions
 * Premium Brother tier — monthly subscription
 */

export const PRODUCTS = {
  premiumBrother: {
    name: "MisyarMatch Premium Brother",
    description: "Unlimited messaging, direct contact with matches, priority placement in Browse, and verified badge.",
    monthlyPriceGbp: 999, // $9.99 in cents (USD default)
    currency: "gbp",
    interval: "month" as const,
    features: [
      "Unlimited express interest",
      "Direct messaging with all matches",
      "Priority matching in queue",
      "Extended daily chat time",
      "Islamic compatibility insights",
      "Read receipts disabled by default",
    ],
  },
} as const;
