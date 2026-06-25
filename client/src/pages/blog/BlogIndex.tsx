import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "wouter";
import { ArrowRight, BookOpen } from "lucide-react";

const ARTICLES = [
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
