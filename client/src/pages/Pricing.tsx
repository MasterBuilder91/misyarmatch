import { useAuth } from "@/_core/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { CheckCircle, Crown, Heart, Shield, Zap, Star } from "lucide-react";
import { useEffect } from "react";
import { useSearch } from "wouter";
import { toast } from "sonner";

function PremiumCheckoutButton() {
  const createCheckout = trpc.payments.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.checkoutUrl) {
        toast.info("Redirecting to secure checkout...");
        window.open(data.checkoutUrl, "_blank");
      }
    },
    onError: (err) => toast.error(err.message ?? "Failed to start checkout"),
  });

  return (
    <Button
      onClick={() => createCheckout.mutate({ origin: window.location.origin })}
      disabled={createCheckout.isPending}
      className="w-full gradient-rose text-white border-0 shadow-rose"
      size="lg"
    >
      {createCheckout.isPending ? "Loading..." : "Upgrade to Premium — £19.99/month"}
    </Button>
  );
}

export default function Pricing() {
  const { isAuthenticated, loading } = useAuth();
  const search = useSearch();

  const { data: profile } = trpc.profile.get.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
    retry: false,
  });

  const { data: paymentStatus } = trpc.payments.getStatus.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
    retry: false,
  });

  // Handle Stripe redirect callbacks
  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.get("success") === "true") {
      toast.success("Payment successful! Welcome to Premium. JazakAllah khayran. 💕");
    } else if (params.get("cancelled") === "true") {
      toast.info("Payment cancelled. You can upgrade anytime.");
    }
  }, [search]);

  const isPremium = paymentStatus?.isPremium ?? profile?.subscriptionTier === "premium";
  const isSister = profile?.gender === "sister";

  return (
    <Layout>
      <SEOHead
        title="Pricing — MisyarMatch"
        description="MisyarMatch pricing. Sisters join free forever. Brothers start free with limited chat time. Premium brothers get extended access and priority matching."
        keywords="MisyarMatch pricing, misyar marriage app cost, halal matchmaking subscription"
        canonical="/pricing"
      />

      <section className="gradient-hero text-white py-16">
        <div className="container max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Simple, Honest Pricing</h1>
          <p className="text-rose-200 text-lg">Sisters free forever. Brothers start free.</p>
          <p className="text-rose-300 text-sm mt-2">No hidden fees. No algorithms. Just honest people.</p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="container max-w-4xl mx-auto px-4">

          {isSister && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8 text-center">
              <Heart className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h3 className="font-bold text-emerald-800 text-lg">Sisters are always free on MisyarMatch</h3>
              <p className="text-emerald-700 text-sm mt-1">No premium tier. No credit card. Ever.</p>
            </div>
          )}

          {isPremium && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 mb-8 text-center">
              <Crown className="w-8 h-8 text-rose-600 mx-auto mb-2" />
              <h3 className="font-bold text-rose-800 text-lg">You're a Premium Brother</h3>
              <p className="text-rose-700 text-sm mt-1">JazakAllah khayran. Enjoy unlimited access.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free tier */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="mb-6">
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Free</div>
                <div className="font-serif text-4xl font-bold text-gray-900">£0</div>
                <div className="text-gray-500 text-sm mt-1">Forever for sisters. Always.</div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Full profile creation",
                  "Browse all members",
                  "Express interest",
                  "Speed Chat (30 min/day for brothers)",
                  "Receive messages from matches",
                  "Circumstances badge visible",
                  "Sisters: unlimited everything",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              {!isAuthenticated ? (
                <Button asChild variant="outline" className="w-full border-gray-300">
                  <a href={getLoginUrl()}>Join Free</a>
                </Button>
              ) : (
                <Button variant="outline" className="w-full border-gray-300" disabled>
                  {isPremium ? "Free Tier" : "Your Current Plan"}
                </Button>
              )}
            </div>

            {/* Premium tier */}
            <div className="bg-white rounded-2xl p-8 border-2 border-rose-600 shadow-rose relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-rose-600 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" /> MOST POPULAR
                </span>
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-4 h-4 text-rose-600" />
                  <div className="text-sm font-bold text-rose-600 uppercase tracking-wider">Premium Brother</div>
                </div>
                <div className="font-serif text-4xl font-bold text-gray-900">£19.99</div>
                <div className="text-gray-500 text-sm mt-1">per month · cancel anytime</div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Free",
                  "Unlimited Speed Chat time",
                  "Direct messaging with all matches",
                  "Priority matching in Speed Chat queue",
                  "AI Islamic compatibility insights",
                  "Premium badge on profile",
                  "Early access to new features",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              {!isAuthenticated ? (
                <Button asChild className="w-full gradient-rose text-white border-0 shadow-rose">
                  <a href={getLoginUrl()}>Join & Upgrade</a>
                </Button>
              ) : isSister ? (
                <div className="text-center text-emerald-700 font-semibold text-sm py-3">
                  Sisters are always free ❤️
                </div>
              ) : isPremium ? (
                <div className="flex items-center justify-center gap-2 text-emerald-700 font-semibold py-3">
                  <Crown className="w-4 h-4" />
                  You're Premium!
                </div>
              ) : (
                <PremiumCheckoutButton />
              )}
            </div>
          </div>

          {/* Trust signals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {[
              { icon: Shield, text: "Secured by Stripe" },
              { icon: Zap, text: "Instant activation" },
              { icon: Heart, text: "Cancel anytime" },
            ].map((item) => (
              <div key={item.text} className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                <item.icon className="w-4 h-4 text-rose-600" />
                {item.text}
              </div>
            ))}
          </div>

          {/* Test card notice */}
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <p className="text-amber-800 text-sm font-medium">
              🧪 Test Mode: Use card <code className="font-mono bg-amber-100 px-1 rounded">4242 4242 4242 4242</code> with any future expiry and CVC.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
