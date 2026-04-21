import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Language = "en" | "ar";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const ARABIC_COUNTRIES = [
  "SA", "AE", "KW", "QA", "BH", "OM", "YE", "JO", "SY", "IQ",
  "LB", "EG", "LY", "TN", "DZ", "MA", "SD", "MR", "SO", "DJ", "KM",
];

// Professional Arabic translations
const translations: Record<string, Record<Language, string>> = {
  // Nav
  "nav.browse": { en: "Browse", ar: "تصفح" },
  "nav.speedChat": { en: "Speed Chat", ar: "محادثة سريعة" },
  "nav.whatIsMisyar": { en: "What Is Misyar?", ar: "ما هو المسيار؟" },
  "nav.pricing": { en: "Pricing", ar: "الأسعار" },
  "nav.matches": { en: "Matches", ar: "التطابقات" },
  "nav.messages": { en: "Messages", ar: "الرسائل" },
  "nav.signIn": { en: "Sign In", ar: "تسجيل الدخول" },
  "nav.signOut": { en: "Sign Out", ar: "تسجيل الخروج" },

  // Hero
  "hero.badge": { en: "For serious Muslims. Honest about everything.", ar: "للمسلمين الجادين. صادقون في كل شيء." },
  "hero.line1": { en: "No games.", ar: "بلا ألعاب." },
  "hero.line2": { en: "No pretending.", ar: "بلا تمثيل." },
  "hero.line3": { en: "Just halal.", ar: "فقط حلال." },
  "hero.sub1": { en: "He is still studying. She knows. She accepts. That is not a compromise — that is a match.", ar: "هو لا يزال يدرس. هي تعلم. هي تقبل. هذا ليس تنازلاً — هذا توافق." },
  "hero.sub2": { en: "MisyarMatch is built on one principle: honesty is the product.", ar: "MisyarMatch مبنية على مبدأ واحد: الصدق هو المنتج." },
  "hero.cta.browse": { en: "Browse Members", ar: "تصفح الأعضاء" },
  "hero.cta.join": { en: "Join Free — Sisters Always Free", ar: "انضمي مجاناً — الأخوات دائماً مجاناً" },
  "hero.cta.whatIsMisyar": { en: "What Is Misyar?", ar: "ما هو المسيار؟" },
  "hero.free": { en: "Sisters join free forever. Brothers start free. No credit card required.", ar: "الأخوات ينضممن مجاناً للأبد. الإخوة يبدأون مجاناً. لا يلزم بطاقة ائتمان." },

  // Privacy section
  "privacy.title": { en: "Your Privacy is Sacred", ar: "خصوصيتك مقدسة" },
  "privacy.sub": { en: "Misyar marriage is a private matter. We built every feature around your right to discretion.", ar: "زواج المسيار شأن خاص. بنينا كل ميزة حول حقك في السرية." },
  "privacy.blur": { en: "Blurred photos until mutual match", ar: "صور مطموسة حتى التطابق المتبادل" },
  "privacy.invisible": { en: "Invisible browsing mode", ar: "وضع التصفح المجهول" },
  "privacy.selfDestruct": { en: "Self-destructing messages", ar: "رسائل تختفي تلقائياً" },
  "privacy.noName": { en: "No real name required", ar: "لا يلزم اسمك الحقيقي" },
  "privacy.noShare": { en: "We never share your data — ever", ar: "لا نشارك بياناتك أبداً — أبداً" },

  // Women-first section
  "women.title": { en: "Built for Sisters First", ar: "مبنية للأخوات أولاً" },
  "women.sub": { en: "We designed MisyarMatch so women feel safe, respected, and in complete control.", ar: "صممنا MisyarMatch لتشعر المرأة بالأمان والاحترام والتحكم الكامل." },
  "women.initiate": { en: "You're in control. Only you can start conversations.", ar: "أنتِ في السيطرة. فقط أنتِ من تبدأ المحادثات." },
  "women.whoLiked": { en: "See who's interested before you decide.", ar: "اعرفي من أبدى اهتماماً قبل أن تقرري." },
  "women.block": { en: "Block anyone instantly. Your safety is our priority.", ar: "احجبي أي شخص فوراً. سلامتك أولويتنا." },
  "women.free": { en: "Always free. No hidden fees. Ever.", ar: "مجاناً دائماً. لا رسوم خفية. أبداً." },

  // Pricing
  "pricing.title": { en: "Simple, Honest Pricing", ar: "أسعار بسيطة وصادقة" },
  "pricing.sub": { en: "Sisters free forever. Brothers start free.", ar: "الأخوات مجاناً للأبد. الإخوة يبدأون مجاناً." },
  "pricing.free": { en: "Free", ar: "مجاني" },
  "pricing.premium": { en: "Premium Brother", ar: "أخ مميز" },
  "pricing.vip": { en: "VIP Brother", ar: "أخ VIP" },
  "pricing.perMonth": { en: "/month", ar: "/شهر" },
  "pricing.cancelAnytime": { en: "cancel anytime", ar: "إلغاء في أي وقت" },

  // General
  "general.joinFree": { en: "Join Free", ar: "انضم مجاناً" },
  "general.learnMore": { en: "Learn More", ar: "اعرف المزيد" },
  "general.getStarted": { en: "Get Started", ar: "ابدأ الآن" },
  "general.createProfile": { en: "Create Your Profile", ar: "أنشئ ملفك الشخصي" },
  "general.readyToFind": { en: "Ready to find your match?", ar: "هل أنت مستعد للعثور على شريك حياتك؟" },
  "general.joinThousands": { en: "Join thousands of serious Muslims who chose honesty over pretense.", ar: "انضم إلى آلاف المسلمين الجادين الذين اختاروا الصدق على التظاهر." },
};

function detectLanguage(): Language {
  // Check localStorage first
  const stored = localStorage.getItem("misyarmatch_lang") as Language | null;
  if (stored === "ar" || stored === "en") return stored;

  // Check browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("ar")) return "ar";

  return "en";
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("misyarmatch_lang", lang);
  };

  useEffect(() => {
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", language === "ar" ? "ar" : "en-GB");
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] ?? translations[key]?.["en"] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL: language === "ar" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
