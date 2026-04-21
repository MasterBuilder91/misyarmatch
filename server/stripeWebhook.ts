import type { Express, Request, Response } from "express";
import express from "express";
import Stripe from "stripe";
import { getDb } from "./db";
import { profiles } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export function registerStripeWebhook(app: Express) {
  // MUST register with raw body BEFORE express.json() middleware
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req: Request, res: Response) => {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!stripeKey || !webhookSecret) {
        console.error("[Stripe Webhook] Missing Stripe configuration");
        res.status(500).json({ error: "Stripe not configured" });
        return;
      }

      const stripe = new Stripe(stripeKey);
      const sig = req.headers["stripe-signature"] as string;

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err: any) {
        console.error("[Stripe Webhook] Signature verification failed:", err.message);
        res.status(400).json({ error: `Webhook Error: ${err.message}` });
        return;
      }

      console.log(`[Stripe Webhook] Event: ${event.type} | ID: ${event.id}`);

      // Handle test events
      if (event.id.startsWith("evt_test_")) {
        console.log("[Stripe Webhook] Test event detected, returning verification response");
        res.json({ verified: true });
        return;
      }

      try {
        switch (event.type) {
          case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const userId = session.metadata?.user_id
              ? parseInt(session.metadata.user_id)
              : session.client_reference_id
              ? parseInt(session.client_reference_id)
              : null;

            if (userId) {
              const db = await getDb();
              if (db) {
                const tier = session.metadata?.tier === "vip" ? "vip" : "premium";
                const expiresAt = new Date();
                expiresAt.setDate(expiresAt.getDate() + 30);
                await db
                  .update(profiles)
                  .set({
                    subscriptionTier: tier,
                    premiumExpiresAt: expiresAt,
                  })
                  .where(eq(profiles.userId, userId));
                console.log(`[Stripe Webhook] Upgraded user ${userId} to ${tier} until ${expiresAt.toISOString()}`);
              }
            }
            break;
          }

          case "customer.subscription.deleted":
          case "customer.subscription.updated": {
            const subscription = event.data.object as Stripe.Subscription;
            if (subscription.status === "canceled" || subscription.status === "unpaid") {
              // Find user by customer ID — for now log it; in production store stripe_customer_id
              console.log(`[Stripe Webhook] Subscription ${subscription.status} for customer ${subscription.customer}`);
            }
            break;
          }

          default:
            console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
      } catch (err) {
        console.error("[Stripe Webhook] Processing error:", err);
        res.status(500).json({ error: "Webhook processing failed" });
      }
    }
  );
}
