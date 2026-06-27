import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

const ARTICLES = [
  {
    slug: "music-in-islam",
    title: "Is Music Haram in Islam? The Full Scholarly Debate",
    excerpt: "Few Islamic questions generate more debate. This is not a simple yes or no — there is genuine scholarly disagreement, and honest Muslims deserve an honest explanation.",
    tag: "Halal & Haram",
    readTime: "8 min",
  },
  {
    slug: "boyfriend-girlfriend-islam",
    title: "Is It Haram to Have a Boyfriend or Girlfriend in Islam?",
    excerpt: "Yes — but Islam's answer is not celibacy and suffering. It is nikah. And the path to nikah is more accessible than most people realise.",
    tag: "Halal & Haram",
    readTime: "5 min",
  },
  {
    slug: "how-to-perform-ghusl",
    title: "How to Perform Ghusl Correctly — The Complete Islamic Guide",
    excerpt: "Step-by-step ghusl from the Sunnah of the Prophet ﷺ, with notes on where the four madhabs differ.",
    tag: "Worship & Purification",
    readTime: "6 min",
  },
  {
    slug: "is-crypto-halal",
    title: "Is Cryptocurrency Halal or Haram? The Scholarly Debate in 2026",
    excerpt: "The disagreement is genuine, the arguments are substantive, and the honest answer is: it depends.",
    tag: "Halal & Haram",
    readTime: "7 min",
  },
  {
    slug: "birthdays-in-islam",
    title: "Can Muslims Celebrate Birthdays? What the Scholars Say",
    excerpt: "The fatwa landscape is genuinely divided — and cultural background often shapes the answer more than the actual fiqh does.",
    tag: "Halal & Haram",
    readTime: "5 min",
  },
  {
    slug: "depression-and-islam",
    title: "What Does Islam Say About Depression and Mental Health?",
    excerpt: "A Muslim struggling with mental health is not weak in faith. Islam addresses this with both spiritual and practical guidance.",
    tag: "Muslim Life",
    readTime: "7 min",
  },
  {
    slug: "tattoos-in-islam",
    title: "Are Tattoos Haram in Islam? The Evidence and the Nuance",
    excerpt: "The majority position, the evidence behind it, and what it means for converts who had tattoos before Islam.",
    tag: "Halal & Haram",
    readTime: "5 min",
  },
  {
    slug: "how-to-convert-to-islam",
    title: "How to Convert to Islam — And What Actually Changes After the Shahada",
    excerpt: "The process is simple. The life after is rich, challenging, and transformative. Here is what you need to know.",
    tag: "New Muslims",
    readTime: "8 min",
  },
  {
    slug: "what-happens-after-death-islam",
    title: "What Happens After Death in Islam — The Complete Picture",
    excerpt: "From the moment of death through the Day of Judgment — the complete journey, drawn entirely from Quran and authentic Sunnah.",
    tag: "Belief & Creed",
    readTime: "9 min",
  },
  {
    slug: "missing-friday-prayer",
    title: "Is It Haram to Miss Friday Prayer (Jumu'ah)? The Ruling and the Warning",
    excerpt: "Missing Jumu'ah without a valid excuse is a major sin with serious prophetic warnings. Here is the ruling, clearly stated.",
    tag: "Worship",
    readTime: "5 min",
  },
    title: "Is It Haram to Be in a Relationship? Islam's Answer Is Simple: Nikah First. Always.",
    excerpt: "Yes, a romantic relationship outside of marriage is haram. But Islam's answer is not 'be alone and suffer.' It is: get married. The path is simpler than you think.",
    tag: "Marriage & Relationships",
    readTime: "6 min",
  },
  {
    slug: "talking-before-marriage",
    title: "Is It Haram to Talk to a Girl or Guy Before Marriage?",
    excerpt: "One of the most searched Islamic questions online — and one of the most honestly contested. Here is what the scholars actually say.",
    tag: "Marriage & Relationships",
    readTime: "6 min",
  },
  {
    slug: "wali-rights-thayyib",
    title: "Can a Muslim Woman Marry Without a Wali? The Thayyib and Her Rights Across All Four Madhabs",
    excerpt: "The answer depends on one distinction the scholars have always made: is she a bikr or a thayyib? Here is the complete fiqh picture.",
    tag: "Fiqh & Rights",
    readTime: "9 min",
  },
  {
    slug: "secret-nikah",
    title: "Is a Nikah Valid Without Parents' Knowledge? What the Scholars Actually Say",
    excerpt: "The conditions for a valid nikah do not include parental approval. Here is what is actually required — and what is not.",
    tag: "Fiqh & Rights",
    readTime: "7 min",
  },
  {
    slug: "loneliness-in-islam",
    title: "What Islam Says About Loneliness — And Why the Answer Is Always Nikah",
    excerpt: "Islam does not tell lonely Muslims to simply wait and suffer. It prescribes marriage — and the path to that marriage is more accessible than most people know.",
    tag: "Muslim Life",
    readTime: "6 min",
  },
  {
    slug: "dua-for-spouse",
    title: "Dua for Finding a Righteous Spouse — And What Islam Says You Must Do Alongside It",
    excerpt: "The authentic supplications from Quran and Sunnah, plus what the scholars say about the obligation to take action alongside your du'a.",
    tag: "Worship & Du'a",
    readTime: "5 min",
  },
  {
    slug: "wifes-rights-in-islam",
    title: "A Wife's Rights in Islam — Including the One Most Husbands Don't Know About",
    excerpt: "Most Muslims know the basics. Far fewer know the full picture — including a right that modern Muslim culture has almost completely suppressed.",
    tag: "Rights & Fiqh",
    readTime: "8 min",
  },
  {
    slug: "intimacy-in-islam",
    title: "Foreplay Is Sunnah: What Classical Islamic Scholars Said About Intimacy in Marriage",
    excerpt: "Classical scholars wrote openly about intimacy. Modern Muslim culture suppressed it. Here is what Islam has always actually said.",
    tag: "Marriage & Intimacy",
    readTime: "7 min",
  },
  {
    slug: "woman-divorce-islam",
    title: "Can a Muslim Woman Divorce Her Husband? Her Full Rights in Islamic Law",
    excerpt: "Yes — and the Islamic basis for this is clearer and stronger than most Muslim women are ever told. Here is the complete picture.",
    tag: "Rights & Fiqh",
    readTime: "7 min",
  },
  {
    slug: "second-marriage-islam",
    title: "Second Marriage in Islam: Rights, Rules, and What Your First Wife Is Actually Owed",
    excerpt: "The permission is real. The conditions are equally real. Here is what Islamic law actually requires of a man who remarries.",
    tag: "Marriage & Fiqh",
    readTime: "8 min",
  },
  {
    slug: "muslim-woman-living-alone",
    title: "Can a Muslim Woman Live Alone? What Islam Actually Says",
    excerpt: "The answer is more nuanced than either cultural extreme. Here is the fiqh, plainly explained.",
    tag: "Muslim Life",
    readTime: "6 min",
  },
  {
    slug: "muslim-marriage-after-divorce",
    title: "Muslim Marriage After Divorce: A Complete Guide for 2025",
    excerpt: "Divorce ends a chapter — not your right to companionship. Millions of Muslim divorcees are navigating remarriage with no roadmap. This is that roadmap.",
    tag: "Remarriage",
    readTime: "8 min",
  },
  {
    slug: "long-distance-islamic-marriage",
    title: "Long-Distance Islamic Marriage: How It Works and Why More Muslims Are Choosing It",
    excerpt: "A husband in Houston, a wife in Casablanca. Children raised between two worlds. This is not unusual — it is misyar in practice, and it works.",
    tag: "Long Distance",
    readTime: "7 min",
  },
  {
    slug: "muslim-widows-remarriage",
    title: "Muslim Widows and Remarriage: Breaking the Silence",
    excerpt: "The Prophet ﷺ married widows. The companions married widows. Yet Muslim widows today face more stigma than any other group seeking remarriage. It has to stop.",
    tag: "Widowhood",
    readTime: "8 min",
  },
  {
    slug: "why-muslims-stay-single",
    title: "Why So Many Muslims Stay Single — And What Nobody Is Saying About It",
    excerpt: "It is not a lack of faith. It is not a lack of desire. It is a broken system that was never built for the realities of modern Muslim life.",
    tag: "Singles",
    readTime: "9 min",
  },
  {
    slug: "halal-alternatives-to-dating",
    title: "Halal Alternatives to Dating Culture: What Islam Actually Offers",
    excerpt: "Muslims are not choosing between marriage and dating. They are choosing between a system that works and one that doesn't. Here is what actually works.",
    tag: "Islamic Values",
    readTime: "7 min",
  },
  {
    slug: "muslim-single-parents-marriage",
    title: "Marriage for Muslim Single Parents: A Realistic Guide",
    excerpt: "You have children. You have a life. You have real needs. Here is how Muslim single parents approach remarriage without pretending the complications don't exist.",
    tag: "Single Parents",
    readTime: "8 min",
  },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  "Marriage & Relationships": { bg: "#FEE2E2", text: "#991B1B" },
  "Fiqh & Rights": { bg: "#FEF3C7", text: "#92400E" },
  "Halal & Haram": { bg: "#D1FAE5", text: "#065F46" },
  "Muslim Life": { bg: "#DBEAFE", text: "#1E40AF" },
  "Worship & Purification": { bg: "#EDE9FE", text: "#5B21B6" },
  "Worship & Du'a": { bg: "#EDE9FE", text: "#5B21B6" },
  "Worship": { bg: "#EDE9FE", text: "#5B21B6" },
  "Rights & Fiqh": { bg: "#FEF3C7", text: "#92400E" },
  "Marriage & Intimacy": { bg: "#FEE2E2", text: "#991B1B" },
  "Marriage & Fiqh": { bg: "#FEE2E2", text: "#991B1B" },
  "New Muslims": { bg: "#CCFBF1", text: "#065F46" },
  "Belief & Creed": { bg: "#E0E7FF", text: "#3730A3" },
  "Singles": { bg: "#FCE7F3", text: "#9D174D" },
  "Remarriage": { bg: "#FEE2E2", text: "#991B1B" },
  "Long Distance": { bg: "#E0F2FE", text: "#075985" },
  "Widowhood": { bg: "#F1F5F9", text: "#334155" },
  "Islamic Values": { bg: "#D1FAE5", text: "#065F46" },
  "Single Parents": { bg: "#FFEDD5", text: "#9A3412" },
};

function getTagStyle(tag: string) {
  return TAG_COLORS[tag] ?? { bg: "#F3F4F6", text: "#374151" };
}

export default function BlogIndex() {
  const featured = ARTICLES[0];
  const rest = ARTICLES.slice(1);

  return (
    <Layout>
      <SEOHead
        title="MisyarMatch Blog — Muslim Marriage, Misyar, Islamic Law & Halal Life"
        description="In-depth articles on misyar marriage, Islamic fiqh, Muslim remarriage, halal relationships, worship, and everyday Islamic questions. Written by a practicing cleric."
        keywords="Muslim marriage blog, misyar marriage articles, Islamic fiqh questions, halal haram, Muslim life guidance"
        canonical="/blog"
      />

      {/* Hero */}
      <section
        className="text-white pt-20 pb-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D0B14 0%, #3B1328 55%, #7C1D2E 100%)" }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-white" style={{ transform: "translate(20%, -20%)" }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full border border-white" style={{ transform: "translate(-20%, 20%)" }} />
        </div>
        <div className="container max-w-4xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{ background: "rgba(184,150,90,0.15)", border: "1px solid rgba(184,150,90,0.4)", color: "#D4AF7A" }}>
            <BookOpen className="w-3.5 h-3.5" /> Knowledge Centre
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-5 leading-tight">
            The MisyarMatch Blog
          </h1>
          <p className="text-rose-200/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Honest writing on Muslim marriage, misyar nikah, Islamic fiqh, and building halal relationships in the modern world.
          </p>
          <div className="mt-8 text-sm text-rose-300/60">
            {ARTICLES.length} articles · Written by Muhammed Abdullah
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: "#F7F3EF" }}>
        <div className="container max-w-5xl mx-auto">

          {/* Featured article */}
          <Link href={`/blog/${featured.slug}`}>
            <div
              className="group mb-10 rounded-3xl overflow-hidden cursor-pointer transition-all hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #0D0B14 0%, #3B1328 55%, #7C1D2E 100%)",
                boxShadow: "0 8px 40px rgba(124,29,46,0.25)"
              }}
            >
              <div className="p-10 md:p-14">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: getTagStyle(featured.tag).bg, color: getTagStyle(featured.tag).text }}
                  >
                    {featured.tag}
                  </span>
                  <span className="text-xs text-rose-300/60">{featured.readTime} read</span>
                  <span className="text-xs text-rose-300/60 ml-auto flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block" /> Featured
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-rose-100 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-rose-200/70 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#D4AF7A" }}>
                  Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rest.map((article) => {
              const tagStyle = getTagStyle(article.tag);
              return (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <div
                    className="group bg-white rounded-2xl p-7 border border-gray-100 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 h-full flex flex-col"
                    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: tagStyle.bg, color: tagStyle.text }}
                      >
                        {article.tag}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                    </div>
                    <h2 className="font-serif text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-rose-700 transition-colors flex-1">
                      {article.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 group-hover:gap-2.5 transition-all">
                      Read article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
