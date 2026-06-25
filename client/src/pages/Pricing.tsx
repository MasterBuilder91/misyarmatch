import { useAuth } from "@/_core/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, Crown, Heart, Shield, Zap, Star, BadgeCheck } from "lucide-react";
import { useEffect } from "react";
import { useSearch } from "wouter";
import { toast } from "sonner";

const PRICING = { symbol: "$", premium: 9.99, vip: 19.99 };

export default function Pricing() {
  const { isAuthenticated, loading } = useAuth();
  const search = useSearch();
  const { language, isRTL } = useLanguage();

  const { data: profile } = trpc.profile.get.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
    retry: false,
  });

  const { data: paymentStatus } = trpc.payments.getStatus.useQuery(undefined, {
    enabled: isAuthenticated && !loading,
    retry: false,
  });

  const createCheckout = trpc.payments.createCheckoutSession.useMutation({
    onSuccess: (data: { checkoutUrl?: string | null; url?: string | null }) => {
      const url = data.checkoutUrl ?? data.url;
      if (url) {
        toast.info(language === "ar" ? "جارٍ تحويلك إلى صفحة الدفع..." : "Redirecting to secure checkout...");
        window.open(url, "_blank");
      }
    },
    onError: (err) => toast.error(err.message ?? (language === "ar" ? "فشل بدء الدفع" : "Failed to start checkout")),
  });

  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.get("success") === "true") {
      toast.success(language === "ar" ? "تم الدفع بنجاح! مرحباً بك في الاشتراك المميز." : "Payment successful! Welcome to Premium. JazakAllah khayran. 💕");
    } else if (params.get("cancelled") === "true") {
      toast.info(language === "ar" ? "تم إلغاء الدفع. يمكنك الترقية في أي وقت." : "Payment cancelled. You can upgrade anytime.");
    }
  }, [search, language]);

  const isPremium = paymentStatus?.isPremium ?? profile?.subscriptionTier === "premium";
  const isVip = profile?.subscriptionTier === "vip";
  const isSister = profile?.gender === "sister";

  const fmtPrice = (amount: number) => `$${amount.toFixed(2)}`;

  const handleUpgrade = (tier: "premium" | "vip") => {
    if (!isAuthenticated) { window.location.href = getLoginUrl(); return; }
    createCheckout.mutate({ origin: window.location.origin });
  };

  return (
    <Layout>
      <SEOHead
        title="MisyarMatch — Free to Join During Launch | Halal Misyar Marriage"
        description="MisyarMatch just launched and is free to join right now. Be an early member — browse, match, and message at no cost. The first halal misyar marriage platform for western Muslims."
        keywords="free misyar marriage app, misyar marriage free, new misyar platform 2025, halal matchmaking launch, free Muslim marriage, misyar match free join"
        canonical="/pricing"
      />

      <div dir={isRTL ? "rtl" : "ltr"}>
        {/* Header */}
        <section className="gradient-hero text-white py-16">
          <div className="container max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase" style={{background:'rgba(124,29,46,0.4)', border:'1px solid rgba(160,37,64,0.5)', color:'#F4A0B0'}}>
              🚀 Early Access — Join Now While It's Free
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              {language === "ar" ? "انضم مجاناً. الآن. قبل أن تنتهي الفرصة." : "Free to Join. Right Now. While It Lasts."}
            </h1>
            <p className="text-rose-200 text-lg">
              {language === "ar" ? "MisyarMatch أطلق للتو. كن من أوائل الأعضاء." : "MisyarMatch just launched. Be one of the first members in your city."}
            </p>
            <p className="text-rose-300 text-sm mt-2">
              {language === "ar" ? "مجاني الآن. لن يدوم إلى الأبد." : "Free during launch. This will not last forever — get in early."}
            </p>
          </div>
        </section>

        <section className="py-16 bg-cream">
          <div className="container max-w-5xl mx-auto px-4">

            {isSister && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8 text-center">
                <Heart className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-bold text-emerald-800 text-lg">
                  {language === "ar" ? "الأخوات مجانيات دائماً على MisyarMatch" : "Sisters are always free on MisyarMatch"}
                </h3>
                <p className="text-emerald-700 text-sm mt-1">
                  {language === "ar" ? "لا اشتراك مميز. لا بطاقة ائتمان. أبداً." : "No premium tier. No credit card. Ever."}
                </p>
              </div>
            )}

            {/* Three-tier pricing cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

              {/* Free */}
              <div className="bg-white rounded-2xl p-7 border-2 border-emerald-500 shadow-sm relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    {language === "ar" ? "✓ للجميع" : "✓ EVERYONE"}
                  </span>
                </div>
                <div className="mb-5">
                  <div className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-2">
                    {language === "ar" ? "مجاني خلال الإطلاق" : "Free During Launch"}
                  </div>
                  <div className="font-serif text-4xl font-bold text-gray-900">$0</div>
                  <div className="text-gray-500 text-sm mt-1">
                    {language === "ar" ? "للجميع الآن — قد يتغير لاحقاً" : "For everyone now — may change later"}
                  </div>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {(language === "ar" ? [
                    "إنشاء الملف الشخصي الكامل",
                    "تصفح جميع الأعضاء",
                    "إبداء الاهتمام غير محدود",
                    "التطابق المتبادل",
                    "رسائل خاصة مع التطابقات",
                    "رؤية من أعجب بك",
                    "رؤى التوافق الإسلامية",
                    "شارة الظروف مرئية",
                  ] : [
                    "Full profile creation",
                    "Browse all members",
                    "Unlimited express interest",
                    "Mutual matching",
                    "Private messaging with matches",
                    "See who liked you",
                    "AI Islamic compatibility insights",
                    "Circumstances badge visible",
                  ]).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                {!isAuthenticated ? (
                  <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                    <a href={getLoginUrl()}>{language === "ar" ? "انضم مجاناً الآن" : "Join Free Now"}</a>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full border-emerald-500 text-emerald-700" disabled>
                    {language === "ar" ? "✓ خطتك الحالية" : "✓ Your Plan"}
                  </Button>
                )}
              </div>

              {/* Supporter */}
              <div className="bg-white rounded-2xl p-7 border border-rose-200 shadow-sm relative">
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-rose-600" />
                    <div className="text-sm font-bold text-rose-600 uppercase tracking-wider">
                      {language === "ar" ? "داعم" : "Supporter"}
                    </div>
                  </div>
                  <div className="font-serif text-4xl font-bold text-gray-900">{fmtPrice(PRICING.premium)}</div>
                  <div className="text-gray-500 text-sm mt-1">
                    {language === "ar" ? "شهرياً · ادعم المنصة" : "per month · back the platform"}
                  </div>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {(language === "ar" ? [
                    "كل شيء في الخطة المجانية",
                    "شارة داعم على الملف الشخصي",
                    "أولوية في نتائج البحث",
                    "دعم المنصة واستمرارها",
                  ] : [
                    "Everything in Free",
                    "Supporter badge on profile",
                    "Priority placement in Browse",
                    "Keep MisyarMatch running & growing",
                  ]).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                {!isAuthenticated ? (
                  <Button asChild className="w-full gradient-rose text-white border-0 shadow-rose">
                    <a href={getLoginUrl()}>{language === "ar" ? "ادعم المنصة" : "Support the Platform"}</a>
                  </Button>
                ) : isPremium ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-700 font-semibold py-3">
                    <Heart className="w-4 h-4" />
                    {language === "ar" ? "شكراً لدعمك! ❤️" : "Thank you for supporting! ❤️"}
                  </div>
                ) : (
                  <Button
                    className="w-full gradient-rose text-white border-0 shadow-rose"
                    size="lg"
                    disabled={createCheckout.isPending}
                    onClick={() => handleUpgrade("premium")}
                  >
                    {createCheckout.isPending
                      ? (language === "ar" ? "جارٍ المعالجة..." : "Loading...")
                      : (language === "ar" ? `ادعم — ${fmtPrice(PRICING.premium)}/شهر` : `Support — ${fmtPrice(PRICING.premium)}/month`)}
                  </Button>
                )}
              </div>

              {/* VIP Supporter */}
              <div className="bg-white rounded-2xl p-7 border border-amber-200 shadow-sm relative">
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-4 h-4 text-amber-600" />
                    <div className="text-sm font-bold text-amber-600 uppercase tracking-wider">
                      {language === "ar" ? "أخ VIP" : "VIP Brother"}
                    </div>
                  </div>
                  <div className="font-serif text-4xl font-bold text-gray-900">{fmtPrice(PRICING.vip)}</div>
                  <div className="text-gray-500 text-sm mt-1">
                    {language === "ar" ? "شهرياً · إلغاء في أي وقت" : "per month · cancel anytime"}
                  </div>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {(language === "ar" ? [
                    "كل مميزات الأخ المميز",
                    "إعجابات غير محدودة يومياً",
                    "رؤية من أعجب بك — دائماً",
                    "شارة VIP على الملف الشخصي",
                    "أولوية في نتائج البحث",
                    "دعم مخصص",
                    "رؤية الملفات الشخصية المخفية",
                  ] : [
                    "Everything in Premium",
                    "Unlimited likes per day",
                    "See who liked you — always",
                    "VIP badge on profile",
                    "Priority placement in search",
                    "Dedicated support",
                    "View hidden profiles",
                  ]).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                {!isAuthenticated ? (
                  <Button asChild className="w-full bg-gradient-to-r from-amber-500 to-rose-600 text-white border-0">
                    <a href={getLoginUrl()}>{language === "ar" ? "احصل على VIP" : "Get VIP"}</a>
                  </Button>
                ) : isSister ? (
                  <div className="text-center text-emerald-700 font-semibold text-sm py-3">
                    {language === "ar" ? "الأخوات مجانيات دائماً ❤️" : "Sisters are always free ❤️"}
                  </div>
                ) : isVip ? (
                  <div className="flex items-center justify-center gap-2 text-amber-700 font-semibold py-3">
                    <Crown className="w-4 h-4" />
                    {language === "ar" ? "أنت عضو VIP!" : "You're VIP!"}
                  </div>
                ) : (
                  <Button
                    className="w-full bg-gradient-to-r from-amber-500 to-rose-600 text-white border-0"
                    size="lg"
                    disabled={createCheckout.isPending}
                    onClick={() => handleUpgrade("vip")}
                  >
                    {createCheckout.isPending
                      ? (language === "ar" ? "جارٍ المعالجة..." : "Loading...")
                      : (language === "ar" ? `احصل على VIP — ${fmtPrice(PRICING.vip)}/شهر` : `Get VIP — ${fmtPrice(PRICING.vip)}/month`)}
                  </Button>
                )}
              </div>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[
                { icon: Shield, text: language === "ar" ? "مؤمَّن بـ Stripe" : "Secured by Stripe" },
                { icon: Zap, text: language === "ar" ? "تفعيل فوري" : "Instant activation" },
                { icon: Heart, text: language === "ar" ? "إلغاء في أي وقت" : "Cancel anytime" },
              ].map((item) => (
                <div key={item.text} className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                  <item.icon className="w-4 h-4 text-rose-600" />
                  {item.text}
                </div>
              ))}
            </div>

            {/* Test card notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <p className="text-amber-800 text-sm font-medium">
                🧪 {language === "ar"
                  ? <>وضع الاختبار: استخدم بطاقة <code className="font-mono bg-amber-100 px-1 rounded">4242 4242 4242 4242</code> مع أي تاريخ انتهاء مستقبلي ورمز CVV.</>
                  : <>Test Mode: Use card <code className="font-mono bg-amber-100 px-1 rounded">4242 4242 4242 4242</code> with any future expiry and CVC.</>}
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
