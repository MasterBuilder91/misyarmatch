import type { Express, Request, Response } from "express";
import express from "express";
import Stripe from "stripe";
import { getDb } from "./db";
import { payments, profiles } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export function registerStripeWebhook(app: Express) {
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

      if (event.id.startsWith("evt_test_")) {
        console.log("[Stripe Webhook] Test event detected, returning verification response");
        res.json({ verified: true });
        return;
      }

      try {
        const db = await getDb();
        if (!db) {
          res.status(500).json({ error: "Database not available" });
          return;
        }

        switch (event.type) {

          // ─── Checkout completed — upgrade user ────────────────────────────
          case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const userId = session.metadata?.user_id
              ? parseInt(session.metadata.user_id)
              : session.client_reference_id
              ? parseInt(session.client_reference_id)
              : null;

            if (userId) {
              const tier = session.metadata?.tier === "vip" ? "vip" : "premium";
              const expiresAt = new Date();
              expiresAt.setDate(expiresAt.getDate() + 30);

              // Upgrade profile
              await db
                .update(profiles)
                .set({ subscriptionTier: tier, premiumExpiresAt: expiresAt })
                .where(eq(profiles.userId, userId));

              // Store stripeCustomerId on the payment record so we can reverse later
              if (session.customer) {
                await db
                  .update(payments)
                  .set({
                    stripeCustomerId: session.customer as string,
                    status: "succeeded",
                  })
                  .where(eq(payments.userId, userId));
              }

              console.log(`[Stripe Webhook] Upgraded user ${userId} to ${tier} until ${expiresAt.toISOString()}`);
            }
            break;
          }

          // ─── Subscription cancelled/unpaid — downgrade user ───────────────
          case "customer.subscription.deleted":
          case "customer.subscription.updated": {
            const subscription = event.data.object as Stripe.Subscription;
            const shouldDowngrade =
              subscription.status === "canceled" ||
              subscription.status === "unpaid" ||
              subscription.status === "past_due";

            if (shouldDowngrade) {
              const customerId = subscription.customer as string;

              // Look up user via payments table using stripeCustomerId
              const paymentRecord = await db
                .select({ userId: payments.userId })
                .from(payments)
                .where(eq(payments.stripeCustomerId, customerId))
                .limit(1);

              if (paymentRecord.length > 0) {
                const userId = paymentRecord[0].userId;
                await db
                  .update(profiles)
                  .set({
                    subscriptionTier: "free",
                    premiumExpiresAt: null,
                  })
                  .where(eq(profiles.userId, userId));

                console.log(`[Stripe Webhook] Downgraded user ${userId} to free — subscription ${subscription.status}`);
              } else {
                console.warn(`[Stripe Webhook] Could not find user for customer ${customerId}`);
              }
            }
            break;
          }

          // ─── Invoice payment failed — notify but don't immediately downgrade
          case "invoice.payment_failed": {
            const invoice = event.data.object as Stripe.Invoice;
            const customerId = invoice.customer as string;
            const paymentRecord = await db
              .select({ userId: payments.userId })
              .from(payments)
              .where(eq(payments.stripeCustomerId, customerId))
              .limit(1);

            if (paymentRecord.length > 0) {
              console.log(`[Stripe Webhook] Payment failed for user ${paymentRecord[0].userId} — Stripe will retry`);
              // Stripe automatically retries and will fire customer.subscription.updated
              // with status "past_due" or "unpaid" if retries all fail — handled above
            }
            break;
          }

          // ─── Invoice payment succeeded — refresh expiry ───────────────────
          case "invoice.payment_succeeded": {
            const invoice = event.data.object as Stripe.Invoice;
            if (invoice.billing_reason === "subscription_cycle") {
              const customerId = invoice.customer as string;
              const paymentRecord = await db
                .select({ userId: payments.userId })
                .from(payments)
                .where(eq(payments.stripeCustomerId, customerId))
                .limit(1);

              if (paymentRecord.length > 0) {
                const userId = paymentRecord[0].userId;
                const newExpiry = new Date();
                newExpiry.setDate(newExpiry.getDate() + 30);
                await db
                  .update(profiles)
                  .set({ premiumExpiresAt: newExpiry })
                  .where(eq(profiles.userId, userId));

                console.log(`[Stripe Webhook] Subscription renewed for user ${userId} — expires ${newExpiry.toISOString()}`);
              }
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
