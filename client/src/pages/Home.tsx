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
        title="MisyarMatch — Halal Misyar Marriage. Honest. Private. Real."
        description="The world's first dedicated misyar marriage platform for western Muslims. Find your partner with full transparency. Private, secure, and scholar-backed."
        canonical="/"
      />

      {/* Hero */}
      <section className="gradient-hero text-white py-24 md:py-32 relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/couple-bench.png"
            alt=""
            className="w-full h-full object-cover object-center opacity-25"
            loading="eager"
          />
          <div className="absolute inset-0" style={{background:'linear-gradient(to right, rgba(13,11,20,0.98) 0%, rgba(13,11,20,0.85) 40%, rgba(13,11,20,0.4) 100%)'}} />
        </div>
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20" style={{background:'radial-gradient(circle, #B8965A 0%, transparent 70%)', transform:'translate(30%,-30%)'}} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10" style={{background:'radial-gradient(circle, #A02540 0%, transparent 70%)', transform:'translate(-30%,30%)'}} />
        </div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20" style={{background:'radial-gradient(circle, #B8965A 0%, transparent 70%)', transform:'translate(30%,-30%)'}} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10" style={{background:'radial-gradient(circle, #A02540 0%, transparent 70%)', transform:'translate(-30%,30%)'}} />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase" style={{background:'rgba(184,150,90,0.15)', border:'1px solid rgba(184,150,90,0.3)', color:'#D4AF7A'}}>
              <Heart className="w-3 h-3 fill-current" />
              <span>{t("hero.badge")}</span>
            </div>
            {/* Headline */}
            <h1 className="font-serif font-light mb-6 leading-none" style={{fontSize:'clamp(3rem,8vw,5.5rem)', letterSpacing:'-0.03em'}}>
              {t("hero.line1")}<br />
              {t("hero.line2")}<br />
              <em style={{color:'#D4AF7A', fontStyle:'italic'}}>{t("hero.line3")}</em>
            </h1>
            {/* Gold divider */}
            <div className="flex justify-center mb-8">
              <span className="block w-12 h-px" style={{background:'linear-gradient(90deg, transparent, #B8965A, transparent)'}} />
            </div>
            <p className="text-base md:text-lg mb-3 leading-relaxed max-w-xl mx-auto" style={{color:'rgba(255,255,255,0.8)'}}>
              {t("hero.sub1")}
            </p>
            <p className="text-sm mb-10 max-w-lg mx-auto" style={{color:'rgba(255,255,255,0.5)'}}>
              {t("hero.sub2")}
            </p>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {isAuthenticated ? (
                <Button asChild size="lg" className="font-medium shadow-gold" style={{background:'linear-gradient(135deg,#8B6A35,#B8965A,#D4AF7A)', color:'#0D0B14', border:'none'}}>
                  <Link href="/browse">
                    {t("hero.cta.browse")} <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="font-medium shadow-gold" style={{background:'linear-gradient(135deg,#8B6A35,#B8965A,#D4AF7A)', color:'#0D0B14', border:'none'}}>
                  <a href={getLoginUrl()}>
                    {t("hero.cta.join")} <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              )}
              <Button asChild size="lg" variant="outline" style={{borderColor:'rgba(255,255,255,0.25)', color:'white', background:'rgba(255,255,255,0.07)'}}>
                <Link href="/what-is-misyar">{t("hero.cta.whatIsMisyar")}</Link>
              </Button>
            </div>
            <p className="mt-5 text-xs tracking-wide" style={{color:'rgba(255,255,255,0.35)'}}>{t("hero.free")}</p>
          </div>
        </div>
      </section>

      {/* Misyar in Context — real, sourced facts (not platform stats) */}
      <section className="py-10 bg-white border-b border-rose-100">
        <div className="container">
          <p className="text-center text-xs uppercase tracking-wider text-gray-400 mb-6">
            {language === "ar" ? "المسيار في العالم العربي اليوم" : "Misyar in the Arab world today"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-rose-700">7/10</div>
              <p className="mt-1 text-sm text-gray-500">
                {language === "ar"
                  ? "من عقود الزواج في بعض المناطق هي عقود مسيار، وفق مسؤولي زواج سعوديين"
                  : "of marriage contracts in some areas are reportedly misyar, per Saudi marriage officials"}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-rose-700">{language === "ar" ? "عقود" : "Decades"}</div>
              <p className="mt-1 text-sm text-gray-500">
                {language === "ar"
                  ? "المسيار معترف به قانونياً في المملكة العربية السعودية منذ عقود"
                  : "Misyar has been legally recognized in Saudi Arabia for decades"}
              </p>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-3xl md:text-4xl font-bold text-rose-700">{language === "ar" ? "واقع منتشر" : "Widespread"}</div>
              <p className="mt-1 text-sm text-gray-500">
                {language === "ar"
                  ? "وصفه أكاديميون بأنه \"واقع اجتماعي منتشر\" في المجتمع الخليجي"
                  : 'Described by academics as "a widespread social reality" across Gulf society'}
              </p>
            </div>
          </div>
          <p className="text-center text-[11px] text-gray-400 mt-6">
            {language === "ar"
              ? "المصادر: عرب نيوز، ذا أراب ويكلي"
              : "Sources: Arab News, The Arab Weekly"}
          </p>
        </div>
      </section>

      {/* Trust Stats Counter intentionally removed — no fabricated platform metrics.
          Add real CounterStat blocks back here once there's genuine member/match data to report. */}

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
              <div className="relative rounded-2xl overflow-hidden shadow-ink-lg">
                <img
                  src="/images/woman-cafe.png"
                  alt="Muslim woman contemplating"
                  className="w-full h-80 md:h-96 object-cover"
                />
                <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(13,11,20,0.85) 0%, transparent 60%)'}} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-serif text-white text-lg font-semibold leading-snug">
                    {language === "ar" ? "تستحق أكثر من مجرد انتظار." : "She deserves more than waiting."}
                  </p>
                  <p className="text-sm mt-1" style={{color:'rgba(255,255,255,0.7)'}}>
                    {language === "ar" ? "المسيار يُعيد السيطرة إليها." : "Misyar puts control back in her hands."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Story Section */}
      <section className="py-0 bg-[#050408]" dir={isRTL ? "rtl" : "ltr"}>
        <div className="grid grid-cols-2 grid-rows-2">
          {[
            { img: "/images/couple-moment.png", title: language === "ar" ? "اللحظة التي تسبق" : "The Moment Before", sub: language === "ar" ? "قابلا بعضهما. لا إحراج. لا نص محدد. فقط منصة جعلت الأمر مقبولاً." : "Two people who found each other. No awkwardness. No script. Just a platform that made it okay." },
            { img: "/images/couple-playdate.png", title: language === "ar" ? "الحياة التي يبنيانها" : "The Life They Build", sub: language === "ar" ? "لديها أطفال. لديه أطفال. كلاهما بالغ. المنصة جمعتهما. الباقي لهما." : "She has kids. He has kids. Both are adults. The platform introduced them. The rest is theirs." },
            { img: "/images/couple-bench.png", title: language === "ar" ? "السهرة التالية" : "The Evening After", sub: language === "ar" ? "خاص. هادئ. بشروطهما. لا ضغط لتعريف العلاقة لأي أحد." : "Private. Quiet. On their terms. No pressure to define it for anyone else." },
            { img: "/images/couple-door.png", title: language === "ar" ? "الإيماءة التي تقول كل شيء" : "The Gesture That Says Everything", sub: language === "ar" ? "يفتح الباب. هي تمشي للداخل. هذا هو المنتج كله." : "He opens the door. She walks through. That's the whole product." },
          ].map((scene, i) => (
            <div key={i} className="relative overflow-hidden" style={{aspectRatio:'16/9'}}>
              <img
                src={scene.img}
                alt={scene.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(5,4,8,0.9) 0%, rgba(5,4,8,0.2) 50%, transparent 100%)'}} />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="font-serif text-white font-bold text-base md:text-lg mb-1">{scene.title}</h3>
                <p className="text-xs md:text-sm leading-relaxed" style={{color:'rgba(255,255,255,0.75)'}}>{scene.sub}</p>
              </div>
            </div>
          ))}
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
                  mm: language === "ar" ? "من 37 ريال/شهر" : "From $9.99/month",
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
                name: language === "ar" ? "أخ من لندن" : "Brother A., Houston",
                detail: language === "ar" ? "تطابق عبر التصفح" : "Matched via Browse",
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
      <section className="py-20 relative overflow-hidden text-white" dir={isRTL ? "rtl" : "ltr"}>
        {/* Background — candlelight couple */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/couple-moment.png"
            alt=""
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0" style={{background:'rgba(13,11,20,0.82)'}} />
        </div>
        <div className="container text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            {t("general.readyToFind")}
          </h2>
          <p className="mb-8 max-w-xl mx-auto" style={{color:'rgba(255,255,255,0.75)'}}>
            {t("general.joinThousands")}
          </p>
          <Button asChild size="lg" className="font-semibold shadow-gold" style={{background:'linear-gradient(135deg,#8B6A35,#B8965A,#D4AF7A)', color:'#0D0B14', border:'none'}}>
            <a href={getLoginUrl()}>
              {t("general.createProfile")} <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
