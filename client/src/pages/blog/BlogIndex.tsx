import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "wouter";
import { ArrowRight, BookOpen } from "lucide-react";

const ARTICLES = [
  {
    slug: "nikah-first-always",
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

export default function BlogIndex() {
  return (
    <Layout>
      <SEOHead
        title="MisyarMatch Blog — Muslim Marriage, Misyar, Remarriage & Companionship"
        description="In-depth articles on misyar marriage, Muslim remarriage after divorce, widowhood, long-distance Islamic marriage, and halal alternatives to loneliness. Written by a practicing cleric."
        keywords="Muslim marriage blog, misyar marriage articles, Islamic remarriage guide, Muslim divorce remarriage, halal companionship, Muslim widows marriage, long distance nikah"
        canonical="/blog"
      />

      <section className="gradient-hero text-white py-16">
        <div className="container max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider" style={{background:'rgba(184,150,90,0.15)', border:'1px solid rgba(184,150,90,0.3)', color:'#D4AF7A'}}>
            <BookOpen className="w-3 h-3" /> Knowledge Centre
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">The MisyarMatch Blog</h1>
          <p className="text-rose-200 text-lg">Honest writing on Muslim marriage, misyar nikah, companionship, and building halal relationships in the modern world.</p>
        </div>
      </section>

      <section className="py-16 bg-[#F7F4F0]">
        <div className="container max-w-4xl mx-auto">
          <div className="grid gap-6">
            {ARTICLES.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{background:'#F0E4E8', color:'#7C1D2E'}}>
                          {article.tag}
                        </span>
                        <span className="text-xs text-gray-400">{article.readTime} read</span>
                      </div>
                      <h2 className="font-serif text-xl font-bold text-gray-900 mb-2 group-hover:text-[#7C1D2E] transition-colors leading-snug">
                        {article.title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed">{article.excerpt}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#7C1D2E] flex-shrink-0 mt-1 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
