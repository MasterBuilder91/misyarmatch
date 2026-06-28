import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
}

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  "Marriage & Relationships": { bg: "#FEE2E2", text: "#991B1B" },
  "Fiqh & Rights": { bg: "#FEF3C7", text: "#92400E" },
  "Halal & Haram": { bg: "#D1FAE5", text: "#065F46" },
  "Muslim Life": { bg: "#DBEAFE", text: "#1E40AF" },
  "Worship & Purification": { bg: "#EDE9FE", text: "#5B21B6" },
  "Worship & Du'a": { bg: "#EDE9FE", text: "#5B21B6" },
  "Worship & Fiqh": { bg: "#EDE9FE", text: "#5B21B6" },
  "Worship": { bg: "#EDE9FE", text: "#5B21B6" },
  "Rights & Fiqh": { bg: "#FEF3C7", text: "#92400E" },
  "Marriage & Intimacy": { bg: "#FEE2E2", text: "#991B1B" },
  "Marriage & Fiqh": { bg: "#FEE2E2", text: "#991B1B" },
  "New Muslims": { bg: "#CCFBF1", text: "#065F46" },
  "Belief & Creed": { bg: "#E0E7FF", text: "#3730A3" },
};

function getTagStyle(tag: string) {
  return TAG_COLORS[tag] ?? { bg: "#F3F4F6", text: "#374151" };
}

interface Props {
  currentSlug: string;
  currentTag: string;
  articles: Article[];
}

export function RelatedArticles({ currentSlug, currentTag, articles }: Props) {
  // First try same tag, then fall back to any articles
  const sameTag = articles.filter(a => a.slug !== currentSlug && a.tag === currentTag);
  const others = articles.filter(a => a.slug !== currentSlug && a.tag !== currentTag);

  // Pick 3: as many same-tag as possible, fill rest with others
  const picks: Article[] = [];
  const tagPicks = sameTag.slice(0, 3);
  picks.push(...tagPicks);
  if (picks.length < 3) {
    picks.push(...others.slice(0, 3 - picks.length));
  }

  if (picks.length === 0) return null;

  return (
    <div className="mt-12 pt-10 border-t border-gray-100">
      <h3 className="font-serif text-xl font-bold text-gray-900 mb-6">
        Related Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {picks.map(article => {
          const tagStyle = getTagStyle(article.tag);
          return (
            <Link key={article.slug} href={`/blog/${article.slug}`}>
              <div className="group bg-gray-50 rounded-xl p-5 border border-gray-100 hover:bg-white hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
                <span
                  className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3 inline-block w-fit"
                  style={{ background: tagStyle.bg, color: tagStyle.text }}
                >
                  {article.tag}
                </span>
                <h4 className="font-semibold text-gray-900 text-sm leading-snug mb-2 group-hover:text-rose-700 transition-colors flex-1">
                  {article.title}
                </h4>
                <span className="inline-flex items-center gap-1 text-xs text-rose-600 font-semibold mt-2">
                  Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
