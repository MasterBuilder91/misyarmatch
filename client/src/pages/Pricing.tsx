import { useAuth } from "@/_core/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, Crown, Heart, Shield, Zap, Star, BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearch } from "wouter";
import { toast } from "sonner";

// Geo-based pricing table
const GEO_PRICING: Record<string, { currency: string; symbol: string; premium: number; vip: number; countryName: string; countryNameAr: string }> = {
  SA: { currency: "SAR", symbol: "﷼", premium: 74.99, vip: 112, countryName: "Saudi Arabia", countryNameAr: "المملكة العربية السعودية" },
  AE: { currency: "AED", symbol: "د.إ", premium: 74.99, vip: 112, countryName: "UAE", countryNameAr: "الإمارات العربية المتحدة" },
  KW: { currency: "KWD", symbol: "KD", premium: 5.99, vip: 8.99, countryName: "Kuwait", countryNameAr: "الكويت" },
  QA: { currency: "QAR", symbol: "QR", premium: 74.99, vip: 112, countryName: "Qatar", countryNameAr: "قطر" },
  BH: { currency: "BHD", symbol: "BD", premium: 7.49, vip: 11.99, countryName: "Bahrain", countryNameAr: "البحرين" },
  EG: { currency: "EGP", symbol: "E£", premium: 149.99, vip: 249.99, countryName: "Egypt", countryNameAr: "مصر" },
  PK: { currency: "USD", symbol: "$", premium: 4.99, vip: 7.99, countryName: "Pakistan", countryNameAr: "باكستان" },
  BD: { currency: "USD", symbol: "$", premium: 4.99, vip: 7.99, countryName: "Bangladesh", countryNameAr: "بنغلاديش" },
};
const DEFAULT_PRICING = { currency: "GBP", symbol: "£", premium: 9.99, vip: 19.99, countryName: "Global", countryNameAr: "عالمي" };

async function detectCountry(): Promise<string> {
  try {
    const res = await fetch("https://ip-api.com/json/?fields=countryCode", { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    return data.countryCode ?? "GB";
  } catch {
    return "GB";
  }
}

export default function Pricing() {
  const { isAuthenticated, loading } = useAuth();
  const search = useSearch();
  const { language, isRTL } = useLanguage();
  const [pricing, setPricing] = useState(DEFAULT_PRICING);
  const [countryCode, setCountryCode] = useState("GB");

  useEffect(() => {
    detectCountry().then((code) => {
      setCountryCode(code);
      setPricing(GEO_PRICING[code] ?? DEFAULT_PRICING);
    });
  }, []);

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

  const fmtPrice = (amount: number) => `${pricing.symbol}${amount.toFixed(2)}`;

  const handleUpgrade = (tier: "premium" | "vip") => {
    if (!isAuthenticated) { window.location.href = getLoginUrl(); return; }
    createCheckout.mutate({ origin: window.location.origin });
  };

  return (
    <Layout>
      <SEOHead
        title="Pricing — MisyarMatch Premium & VIP Plans"
        description="Sisters join MisyarMatch free forever. Brothers choose Premium or VIP for unlimited matches, private messaging, and priority placement. Geo-based pricing for Gulf countries."
        keywords="MisyarMatch pricing, misyar marriage app cost, halal matchmaking subscription, SAR pricing"
        canonical="/pricing"
      />

      <div dir={isRTL ? "rtl" : "ltr"}>
        {/* Header */}
        <section className="gradient-hero text-white py-16">
          <div className="container max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              {language === "ar" ? "أسعار بسيطة وصادقة" : "Simple, Honest Pricing"}
            </h1>
            <p className="text-rose-200 text-lg">
              {language === "ar" ? "الأخوات مجاناً للأبد. الإخوة يبدأون مجاناً." : "Sisters free forever. Brothers start free."}
            </p>
            <p className="text-rose-300 text-sm mt-2">
              {language === "ar" ? "لا رسوم خفية. لا خوارزميات. فقط أشخاص صادقون." : "No hidden fees. No algorithms. Just honest people."}
            </p>
            {GEO_PRICING[countryCode] && (
              <div className="mt-4 inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 text-sm">
                <span>🌍</span>
                <span>
                  {language === "ar"
                    ? `الأسعار معروضة بـ ${pricing.currency} لـ ${pricing.countryNameAr}`
                    : `Prices shown in ${pricing.currency} for ${pricing.countryName}`}
                </span>
              </div>
            )}
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
              <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm">
                <div className="mb-5">
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                    {language === "ar" ? "مجاني" : "Free"}
                  </div>
                  <div className="font-serif text-4xl font-bold text-gray-900">£0</div>
                  <div className="text-gray-500 text-sm mt-1">
                    {language === "ar" ? "للأخوات دائماً" : "Forever for sisters. Always."}
                  </div>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {(language === "ar" ? [
                    "إنشاء الملف الشخصي الكامل",
                    "تصفح جميع الأعضاء",
                    "إبداء الاهتمام",
                    "محادثة سريعة (30 دقيقة/يوم للإخوة)",
                    "استقبال الرسائل من التطابقات",
                    "شارة الظروف مرئية",
                    "الأخوات: كل شيء مجاناً",
                  ] : [
                    "Full profile creation",
                    "Browse all members",
                    "Express interest",
                    "Speed Chat (30 min/day for brothers)",
                    "Receive messages from matches",
                    "Circumstances badge visible",
                    "Sisters: unlimited everything",
                  ]).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                {!isAuthenticated ? (
                  <Button asChild variant="outline" className="w-full border-gray-300">
                    <a href={getLoginUrl()}>{language === "ar" ? "انضم مجاناً" : "Join Free"}</a>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full border-gray-300" disabled>
                    {isPremium || isVip ? (language === "ar" ? "الخطة المجانية" : "Free Tier") : (language === "ar" ? "خطتك الحالية" : "Your Current Plan")}
                  </Button>
                )}
              </div>

              {/* Premium */}
              <div className="bg-white rounded-2xl p-7 border-2 border-rose-600 shadow-rose relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-rose-600 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" /> {language === "ar" ? "الأكثر شيوعاً" : "MOST POPULAR"}
                  </span>
                </div>
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-4 h-4 text-rose-600" />
                    <div className="text-sm font-bold text-rose-600 uppercase tracking-wider">
                      {language === "ar" ? "أخ مميز" : "Premium Brother"}
                    </div>
                  </div>
                  <div className="font-serif text-4xl font-bold text-gray-900">{fmtPrice(pricing.premium)}</div>
                  <div className="text-gray-500 text-sm mt-1">
                    {language === "ar" ? "شهرياً · إلغاء في أي وقت" : "per month · cancel anytime"}
                  </div>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {(language === "ar" ? [
                    "كل مميزات الخطة المجانية",
                    "20 إعجاباً يومياً",
                    "محادثة سريعة غير محدودة",
                    "رسائل مباشرة مع جميع التطابقات",
                    "رؤية من أعجب بك (محدود)",
                    "رسائل تختفي تلقائياً",
                    "رؤى التوافق الإسلامية بالذكاء الاصطناعي",
                    "شارة مميزة على الملف الشخصي",
                  ] : [
                    "Everything in Free",
                    "20 likes per day",
                    "Unlimited Speed Chat",
                    "Direct messaging with all matches",
                    "See who liked you (limited)",
                    "Self-destructing messages",
                    "AI Islamic compatibility insights",
                    "Premium badge on profile",
                  ]).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                {!isAuthenticated ? (
                  <Button asChild className="w-full gradient-rose text-white border-0 shadow-rose">
                    <a href={getLoginUrl()}>{language === "ar" ? "انضم وترقَّ" : "Join & Upgrade"}</a>
                  </Button>
                ) : isSister ? (
                  <div className="text-center text-emerald-700 font-semibold text-sm py-3">
                    {language === "ar" ? "الأخوات مجانيات دائماً ❤️" : "Sisters are always free ❤️"}
                  </div>
                ) : isVip ? (
                  <Button variant="outline" className="w-full" disabled>
                    {language === "ar" ? "مشمول في VIP" : "Included in VIP"}
                  </Button>
                ) : isPremium ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-700 font-semibold py-3">
                    <Crown className="w-4 h-4" />
                    {language === "ar" ? "أنت مشترك مميز!" : "You're Premium!"}
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
                      : (language === "ar" ? `ترقية — ${fmtPrice(pricing.premium)}/شهر` : `Upgrade — ${fmtPrice(pricing.premium)}/month`)}
                  </Button>
                )}
              </div>

              {/* VIP */}
              <div className="bg-white rounded-2xl p-7 border-2 border-amber-500 shadow-sm relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-500 to-rose-600 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" /> {language === "ar" ? "الأفضل قيمة" : "BEST VALUE"}
                  </span>
                </div>
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-4 h-4 text-amber-600" />
                    <div className="text-sm font-bold text-amber-600 uppercase tracking-wider">
                      {language === "ar" ? "أخ VIP" : "VIP Brother"}
                    </div>
                  </div>
                  <div className="font-serif text-4xl font-bold text-gray-900">{fmtPrice(pricing.vip)}</div>
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
                      : (language === "ar" ? `احصل على VIP — ${fmtPrice(pricing.vip)}/شهر` : `Get VIP — ${fmtPrice(pricing.vip)}/month`)}
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
