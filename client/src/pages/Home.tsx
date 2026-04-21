import { useAuth } from "@/_core/hooks/useAuth";
import { SEOHead } from "@/components/SEOHead";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ArrowRight, CheckCircle, Eye, EyeOff, Heart, Lock, MessageCircle,
  Search, Shield, ShieldCheck, Sparkles, Star, Timer, Users, Zap,
  BadgeCheck, Crown
} from "lucide-react";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";

const CIRCUMSTANCES = [
  { emoji: "✅", label: "Ready Now", labelAr: "مستعد الآن", desc: "No constraints, ready to commit", descAr: "لا قيود، مستعد للالتزام" },
  { emoji: "📚", label: "Currently Studying", labelAr: "يدرس حالياً", desc: "Cannot support financially yet", descAr: "لا يستطيع الدعم المادي بعد" },
  { emoji: "⚖️", label: "Going Through Divorce", labelAr: "يمر بطلاق", desc: "Not yet legally free", descAr: "لم يتحرر قانونياً بعد" },
  { emoji: "🌙", label: "Seeking Second Wife", labelAr: "يبحث عن زوجة ثانية", desc: "Already married, honest about it", descAr: "متزوج بالفعل، صادق في ذلك" },
  { emoji: "✈️", label: "Working Abroad", labelAr: "يعمل في الخارج", desc: "Long distance only", descAr: "مسافة بعيدة فقط" },
  { emoji: "💼", label: "Financial Constraints", labelAr: "ضائقة مالية", desc: "Cannot afford traditional marriage", descAr: "لا يستطيع تحمل تكاليف الزواج التقليدي" },
];

// Animated counter hook
function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function CounterStat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-3xl md:text-4xl font-bold text-rose-700">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-600 text-sm mt-1">{label}</div>
    </div>
  );
}

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { t, language, isRTL } = useLanguage();

  return (
    <Layout>
      <SEOHead
        title="MisyarMatch — Halal Misyar Marriage for Serious Muslims"
        description="The UK's most honest Islamic marriage platform. Find your misyar nikah partner with full transparency about circumstances. Private. Secure. Halal."
        canonical="/"
      />

      {/* Hero */}
      <section className="gradient-hero text-white py-20 md:py-28 relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm font-medium">
              <Heart className="w-4 h-4 fill-current" />
              <span>{t("hero.badge")}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t("hero.line1")}<br />{t("hero.line2")}<br />
              <span className="text-rose-200">{t("hero.line3")}</span>
            </h1>
            <p className="text-lg md:text-xl text-rose-100 mb-4 leading-relaxed max-w-2xl mx-auto">
              {t("hero.sub1")}
            </p>
            <p className="text-rose-200 mb-10 max-w-xl mx-auto">
              {t("hero.sub2")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Button asChild size="lg" className="bg-white text-rose-800 hover:bg-rose-50 font-semibold shadow-lg">
                  <Link href="/browse">
                    {t("hero.cta.browse")} <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="bg-white text-rose-800 hover:bg-rose-50 font-semibold shadow-lg">
                  <a href={getLoginUrl()}>
                    {t("hero.cta.join")} <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              )}
              <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 bg-transparent">
                <Link href="/what-is-misyar">{t("hero.cta.whatIsMisyar")}</Link>
              </Button>
            </div>
            <p className="mt-6 text-rose-300 text-sm">{t("hero.free")}</p>
          </div>
        </div>
      </section>

      {/* Trust Stats Counter */}
      <section className="py-10 bg-white border-b border-rose-100">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CounterStat target={10000} suffix="+" label={language === "ar" ? "عضو مسجل" : "Registered Members"} />
            <CounterStat target={43} suffix="%" label={language === "ar" ? "من المملكة المتحدة" : "From the UK"} />
            <CounterStat target={850} suffix="+" label={language === "ar" ? "تطابق ناجح" : "Successful Matches"} />
            <CounterStat target={9} suffix=" min" label={language === "ar" ? "متوسط وقت الجلسة" : "Avg. Session Time"} />
          </div>
        </div>
      </section>

      {/* Privacy Section — "Your Privacy is Sacred" */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-rose-950 text-white" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-4 text-sm">
                <Lock className="w-4 h-4 text-rose-300" />
                <span className="text-rose-200">{language === "ar" ? "الخصوصية أولاً" : "Privacy First"}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                {t("privacy.title")}
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                {t("privacy.sub")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: EyeOff, key: "privacy.blur", color: "text-rose-300" },
                { icon: Eye, key: "privacy.invisible", color: "text-blue-300" },
                { icon: Timer, key: "privacy.selfDestruct", color: "text-amber-300" },
                { icon: Users, key: "privacy.noName", color: "text-emerald-300" },
                { icon: ShieldCheck, key: "privacy.noShare", color: "text-purple-300" },
                { icon: Lock, key: "privacy.noShare", color: "text-rose-300",
                  labelOverride: language === "ar" ? "تشفير من طرف إلى طرف" : "End-to-End Encryption Badge" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                  <item.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${item.color}`} />
                  <span className="text-gray-200 text-sm leading-relaxed">
                    {item.labelOverride ?? t(item.key)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Circumstances Transparency */}
      <section className="py-16 bg-cream" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "ar" ? "لماذا يضيع الناس وقتهم في تطبيقات الزواج؟" : "The reason people waste time on Muslim apps"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {language === "ar"
                ? "ليس بسبب النوايا السيئة. بل بسبب الظروف المخفية. الرجل الذي لا يزال يدرس ليس مضيعاً للوقت — إذا كان صادقاً من البداية."
                : "It is not bad intentions. It is hidden circumstances. A man who is still studying is not a time waster — if he is honest about it upfront."}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {CIRCUMSTANCES.map((c) => (
              <div key={c.label} className="bg-white rounded-xl p-4 border border-rose-100 shadow-sm hover:shadow-rose transition-shadow">
                <div className="text-2xl mb-2">{c.emoji}</div>
                <div className="font-semibold text-gray-900 text-sm mb-1">
                  {language === "ar" ? c.labelAr : c.label}
                </div>
                <div className="text-gray-500 text-xs">
                  {language === "ar" ? c.descAr : c.desc}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-600">
            {language === "ar"
              ? "كل ملف شخصي يُظهر أحد هذه الشارات. مرئية. دائماً."
              : <>Every profile shows one of these badges. <strong>Visible. Always.</strong> No hiding in a bio.</>}
          </p>
        </div>
      </section>

      {/* Women-First Section */}
      <section className="py-16 bg-white" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-rose-50 rounded-full px-4 py-2 mb-4 text-sm text-rose-700 font-medium">
                  <Heart className="w-4 h-4 fill-rose-300" />
                  {language === "ar" ? "للأخوات أولاً" : "Sisters First"}
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t("women.title")}
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  {t("women.sub")}
                </p>
                <div className="space-y-4">
                  {[
                    { icon: MessageCircle, text: t("women.initiate"), color: "bg-rose-50 text-rose-600" },
                    { icon: Eye, text: t("women.whoLiked"), color: "bg-purple-50 text-purple-600" },
                    { icon: Shield, text: t("women.block"), color: "bg-emerald-50 text-emerald-600" },
                    { icon: Heart, text: t("women.free"), color: "bg-amber-50 text-amber-600" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed pt-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-blush rounded-2xl p-8 border border-rose-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full gradient-rose flex items-center justify-center mx-auto mb-4 shadow-rose">
                    <BadgeCheck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                    {language === "ar" ? "شارة التحقق للأخوات" : "Verification Badge for Sisters"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === "ar"
                      ? "الأخوات يمكنهن التحقق من هويتهن مجاناً للحصول على شارة ثقة. اختياري تماماً."
                      : "Sisters can verify their identity for free to earn a trust badge. Completely optional."}
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    language === "ar" ? "مجاناً للأبد — بلا استثناء" : "Free forever — no exceptions",
                    language === "ar" ? "أنتِ تبدئين المحادثات" : "You initiate conversations",
                    language === "ar" ? "ترين من أبدى اهتماماً" : "See who liked you",
                    language === "ar" ? "حجب فوري لأي شخص" : "Instant block on anyone",
                    language === "ar" ? "دعم أولوي للأخوات" : "Priority support for women",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Khatba Comparison */}
      <section className="py-16 bg-cream" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === "ar" ? "البديل الذكي" : "The Smart Alternative"}
              </h2>
              <p className="text-gray-600 text-lg">
                {language === "ar"
                  ? "لماذا تدفع للخاطبة آلاف الريالات وأنت تستطيع إيجاد شريك حياتك بنفسك — بسرية تامة — بأقل من تكلفة القهوة؟"
                  : "Why pay a khatba thousands when you can find your own match — privately — for less than a coffee?"}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-rose-50 border-b border-rose-100">
                <div className="p-4 font-semibold text-gray-700 text-sm"></div>
                <div className="p-4 font-semibold text-gray-700 text-sm text-center border-x border-rose-100">
                  {language === "ar" ? "الخاطبة التقليدية" : "Traditional Khatba"}
                </div>
                <div className="p-4 font-semibold text-rose-700 text-sm text-center flex items-center justify-center gap-1">
                  <Heart className="w-4 h-4 fill-rose-300" /> MisyarMatch
                </div>
              </div>
              {[
                {
                  label: language === "ar" ? "التكلفة" : "Cost",
                  khatba: language === "ar" ? "+5,000 ريال لكل تعريف" : "5,000+ SAR per introduction",
                  mm: language === "ar" ? "من 37 ريال/شهر" : "From £9.99/month",
                  mmGood: true,
                },
                {
                  label: language === "ar" ? "الخصوصية" : "Privacy",
                  khatba: language === "ar" ? "الجميع في المجتمع يعلم" : "Everyone in the community knows",
                  mm: language === "ar" ? "100% خاص ومجهول" : "100% private and anonymous",
                  mmGood: true,
                },
                {
                  label: language === "ar" ? "الخيارات" : "Options",
                  khatba: language === "ar" ? "1-2 تعريفات" : "1-2 introductions",
                  mm: language === "ar" ? "تصفح آلاف الملفات" : "Browse thousands of profiles",
                  mmGood: true,
                },
                {
                  label: language === "ar" ? "الجدول الزمني" : "Timeline",
                  khatba: language === "ar" ? "أسابيع إلى أشهر" : "Weeks to months",
                  mm: language === "ar" ? "ابدأ التطابق اليوم" : "Start matching today",
                  mmGood: true,
                },
                {
                  label: language === "ar" ? "التحكم" : "Control",
                  khatba: language === "ar" ? "الخاطبة تقرر" : "The khatba decides",
                  mm: language === "ar" ? "أنت تقرر" : "You decide",
                  mmGood: true,
                },
              ].map((row, i) => (
                <div key={i} className={`grid grid-cols-3 border-b border-rose-50 ${i % 2 === 0 ? "bg-white" : "bg-rose-50/30"}`}>
                  <div className="p-4 text-sm font-medium text-gray-700">{row.label}</div>
                  <div className="p-4 text-sm text-gray-500 text-center border-x border-rose-50">{row.khatba}</div>
                  <div className={`p-4 text-sm text-center font-medium ${row.mmGood ? "text-rose-700" : "text-gray-700"}`}>
                    {row.mmGood && <span className="inline-flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> {row.mm}</span>}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center mt-6 text-gray-600 italic text-sm">
              {language === "ar"
                ? "لماذا تدفع للخاطبة آلاف الريالات وأنت تستطيع إيجاد شريك حياتك بنفسك — بسرية تامة — بأقل من تكلفة القهوة؟"
                : "\"Why pay a khatba thousands when you can find your own match — privately — for less than a coffee?\""}
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "ar" ? "كيف يعمل MisyarMatch" : "How MisyarMatch works"}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              {language === "ar" ? "أربع خطوات. شفافية كاملة في كل منها." : "Four steps. Radical transparency at every one."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01", icon: CheckCircle,
                title: language === "ar" ? "كن صادقاً بشأن ظروفك" : "Be honest about your circumstances",
                desc: language === "ar"
                  ? "اختر وضعك الحالي من ستة خيارات واضحة. لا إخفاء. لا ملفات مبهمة. ظروفك تظهر كشارة على ملفك الشخصي."
                  : "Select your current situation from six clear options. No hiding. No vague profiles. Your circumstances are shown as a badge on your profile.",
              },
              {
                step: "02", icon: Search,
                title: language === "ar" ? "تصفح بشفافية كاملة" : "Browse with full transparency",
                desc: language === "ar"
                  ? "اطلع على شارة ظروف كل عضو قبل قراءة سيرته الذاتية. الصور مطموسة حتى الاهتمام المتبادل — الشخصية أولاً."
                  : "See every member's circumstances badge before you even read their bio. Filter by what works for you. Photos are blurred until mutual interest — character first.",
              },
              {
                step: "03", icon: Zap,
                title: language === "ar" ? "محادثة سريعة مجهولة" : "Speed Chat anonymously",
                desc: language === "ar"
                  ? "جلسات نصية مجهولة لمدة 5 دقائق. لا صور. لا ضغط. شارة ظروف الشريك تظهر قبل أول كلمة."
                  : "5-minute anonymous text sessions. No photos. No pressure. Their circumstances badge is shown before the first word. If you both want to connect — you match.",
              },
              {
                step: "04", icon: MessageCircle,
                title: language === "ar" ? "تطابق وتواصل بخصوصية" : "Match and message privately",
                desc: language === "ar"
                  ? "عندما يُبدي الطرفان الاهتمام، يتم التواصل. رسائل خاصة بلا إشعارات قراءة — لأن الضغط يقتل الحوار الصادق."
                  : "When both parties express interest, you're connected. Private messaging with no read receipts — because pressure kills honest conversation.",
              },
            ].map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-rose-700" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
                    {language === "ar" ? `الخطوة ${step.step}` : `Step ${step.step}`}
                  </div>
                  <h3 className="font-serif font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild size="lg" className="gradient-rose text-white border-0 shadow-rose">
              <Link href="/how-it-works">
                {language === "ar" ? "اطلع على الدليل الكامل" : "See the full guide"} <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories / Testimonials */}
      <section className="py-16 bg-blush" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-rose-100 rounded-full px-4 py-2 mb-4 text-sm text-rose-700 font-medium">
              <Sparkles className="w-4 h-4" />
              {language === "ar" ? "قصص نجاح" : "Success Stories"}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "ar" ? "أشخاص حقيقيون. تطابقات حقيقية." : "Real people. Real matches."}
            </h2>
            <p className="text-gray-600">
              {language === "ar" ? "الأسماء مغيرة للخصوصية. القصص حقيقية." : "Names changed for privacy. Stories are real."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: language === "ar"
                  ? "أخبرني منذ البداية أنه لا يزال يدرس. عرفت ما الذي أقدم عليه. أتممنا النكاح بعد ثلاثة أشهر. تلك الصراحة كانت كل شيء."
                  : "He told me upfront he was still studying. I knew what I was walking into. We did our nikah three months later. That honesty was everything.",
                name: language === "ar" ? "أخت من برمنغهام" : "Sister from Birmingham",
                detail: language === "ar" ? "تطابق عبر التصفح" : "Matched via Browse",
                stars: 5,
              },
              {
                quote: language === "ar"
                  ? "أنا متزوج بالفعل. في كل تطبيق آخر كنت مضطراً لإخفاء ذلك أو يتم حظري فوراً. هنا، هو مجرد فلتر. وجدنا زواجنا الثاني هنا."
                  : "I'm already married. On every other app I had to hide it or get blocked immediately. Here, it's a filter. My wife and I found our second marriage here.",
                name: language === "ar" ? "أخ من لندن" : "Brother from London",
                detail: language === "ar" ? "تطابق عبر المحادثة السريعة" : "Matched via Speed Chat",
                stars: 5,
              },
              {
                quote: language === "ar"
                  ? "وجدت شريك حياتي في 3 أسابيع. كنت أبحث عن شخص صادق بشأن ظروفه. MisyarMatch هو المكان الوحيد الذي وجدت فيه ذلك."
                  : "Found my wife on MisyarMatch in 3 weeks. I was looking for someone honest about their circumstances. MisyarMatch is the only place I found that.",
                name: language === "ar" ? "الأخ أ.، الرياض" : "Brother A., Riyadh",
                detail: language === "ar" ? "تطابق عبر التصفح" : "Matched via Browse",
                stars: 5,
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <div className="text-rose-300 text-4xl font-serif mb-3">"</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">{t.quote}</p>
                <div className="border-t border-rose-100 pt-3">
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-rose-600 text-xs">{t.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-t border-rose-100" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-4xl mx-auto">
            {[
              {
                icon: BadgeCheck,
                label: language === "ar" ? "18+ موثق" : "18+ Verified",
                desc: language === "ar" ? "التحقق من العمر إلزامي" : "Age verification mandatory",
              },
              {
                icon: ShieldCheck,
                label: language === "ar" ? "متوافق مع الشريعة" : "Shariah-Compliant",
                desc: language === "ar" ? "النكاح الحلال فقط" : "Halal nikah only",
              },
              {
                icon: Lock,
                label: language === "ar" ? "الأخوات مجاناً دائماً" : "Sisters Free Forever",
                desc: language === "ar" ? "مبدأ المنصة غير القابل للتفاوض" : "Non-negotiable platform principle",
              },
              {
                icon: Crown,
                label: language === "ar" ? "لا إشعارات قراءة" : "No Read Receipts",
                desc: language === "ar" ? "مراسلة بلا ضغط" : "Pressure-free messaging",
              },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-rose-700" />
                </div>
                <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                <div className="text-gray-500 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero text-white" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            {t("general.readyToFind")}
          </h2>
          <p className="text-rose-200 mb-8 max-w-xl mx-auto">
            {t("general.joinThousands")}
          </p>
          <Button asChild size="lg" className="bg-white text-rose-800 hover:bg-rose-50 font-semibold shadow-lg">
            <a href={getLoginUrl()}>
              {t("general.createProfile")} <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
