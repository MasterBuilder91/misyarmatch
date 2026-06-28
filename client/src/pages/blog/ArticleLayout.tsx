import React, { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { RelatedArticles } from "@/components/RelatedArticles";
import { EmailCapture } from "@/components/EmailCapture";
import { Comments } from "@/components/Comments";
import { ARTICLES } from "@/pages/blog/BlogIndex";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";

interface Props {
  children: React.ReactNode;
  title: string;
  excerpt?: string;
  slug?: string;
  tag: string;
  readTime: string;
  date?: string;
}

const TAG_COLORS: Record<string, string> = {
  "Marriage & Relationships": "bg-rose-100 text-rose-700",
  "Fiqh & Rights": "bg-amber-100 text-amber-700",
  "Halal & Haram": "bg-emerald-100 text-emerald-700",
  "Muslim Life": "bg-blue-100 text-blue-700",
  "Worship & Purification": "bg-violet-100 text-violet-700",
  "Worship & Du'a": "bg-violet-100 text-violet-700",
  "Worship": "bg-violet-100 text-violet-700",
  "Rights & Fiqh": "bg-amber-100 text-amber-700",
  "Marriage & Intimacy": "bg-rose-100 text-rose-700",
  "Marriage & Fiqh": "bg-rose-100 text-rose-700",
  "New Muslims": "bg-teal-100 text-teal-700",
  "Belief & Creed": "bg-indigo-100 text-indigo-700",
  "Singles": "bg-pink-100 text-pink-700",
  "Remarriage": "bg-rose-100 text-rose-700",
  "Long Distance": "bg-sky-100 text-sky-700",
  "Widowhood": "bg-slate-100 text-slate-700",
  "Islamic Values": "bg-emerald-100 text-emerald-700",
  "Single Parents": "bg-orange-100 text-orange-700",
};

export function ArticleLayout({ children, title, excerpt, slug, tag, readTime, date = "June 2026" }: Props) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const tagColor = TAG_COLORS[tag] ?? "bg-gray-100 text-gray-600";

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Layout>
      <SEOHead
        title={title}
        description={excerpt ?? `${title} — In-depth Islamic guidance from Abu Salman at MisyarMatch.`}
        keywords={`${tag}, misyar marriage, Islamic fiqh, Muslim marriage, halal relationships, ${title.toLowerCase()}`}
        canonical={slug ? `/blog/${slug}` : undefined}
        ogType="article"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": excerpt ?? title,
        "author": { "@type": "Person", "name": "Abu Salman" },
        "publisher": {
          "@type": "Organization",
          "name": "MisyarMatch",
          "url": "https://misyarmatch.net"
        },
        "datePublished": "2026-06-27",
        "dateModified": "2026-06-27",
        "mainEntityOfPage": { "@type": "WebPage" }
      }) }} />
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 z-50 h-0.5 bg-rose-500 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero */}
      <div
        className="text-white pt-16 pb-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D0B14 0%, #3B1328 55%, #7C1D2E 100%)" }}
      >
        {/* Geometric decoration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full border border-white" style={{ transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full border border-white" style={{ transform: "translate(-30%, 30%)" }} />
          <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full border border-white opacity-50" style={{ transform: "translateY(-50%)" }} />
        </div>

        <div className="container max-w-3xl mx-auto relative">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm mb-8 text-rose-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>

          <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 ${tagColor}`}>
            {tag}
          </span>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-sm text-rose-200/70">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              Abu Salman
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readTime} read
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {date}
            </span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="py-14" style={{ background: "#F7F3EF" }}>
        <div className="container max-w-3xl mx-auto">

          {/* Content card */}
          <div
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-10"
            style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.07)" }}
          >
            {/* Gold top stripe */}
            <div className="h-1" style={{ background: "linear-gradient(90deg, #8B6A35, #B8965A, #D4AF7A, #B8965A, #8B6A35)" }} />

            <div
              className="px-8 md:px-14 py-12 prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-100
                prose-h3:text-xl prose-h3:mt-9 prose-h3:mb-3 prose-h3:text-rose-900
                prose-p:text-gray-700 prose-p:leading-[1.85] prose-p:mb-6 prose-p:text-[17px]
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:text-gray-700 prose-ul:my-6
                prose-ol:text-gray-700 prose-ol:my-6
                prose-li:mb-3 prose-li:leading-relaxed prose-li:text-[16px]
                prose-blockquote:not-italic
                [&>p:first-child]:text-[19px] [&>p:first-child]:text-gray-800 [&>p:first-child]:leading-relaxed [&>p:first-child]:font-medium"
              style={{
                "--tw-prose-bullets": "#B8965A",
              } as React.CSSProperties}
            >
              {/* Custom blockquote handled via Tailwind prose overrides */}
              <style>{`
                article blockquote {
                  border-left: 4px solid #B8965A;
                  background: linear-gradient(to right, #FFFBF0, #FFFFFF);
                  border-radius: 0 12px 12px 0;
                  padding: 20px 24px;
                  margin: 32px 0;
                  color: #374151;
                  font-size: 17px;
                  line-height: 1.75;
                }
                article blockquote p {
                  margin: 0 !important;
                }
                article ul li::marker {
                  color: #B8965A;
                }
                article ol li::marker {
                  color: #B8965A;
                  font-weight: 600;
                }
              `}</style>
              {children}
              {slug && (
                <Comments slug={slug} />
              )}
              {slug && (
                <RelatedArticles
                  currentSlug={slug}
                  currentTag={tag}
                  articles={ARTICLES}
                />
              )}
            </div>
          </div>

          {/* Author card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10 flex items-center gap-5"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
            <div className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-xl"
              style={{ background: "linear-gradient(135deg, #7C1D2E, #B8965A)" }}>
              M
            </div>
            <div>
              <p className="font-semibold text-gray-900">Abu Salman</p>
              <p className="text-sm text-gray-500">Founder, MisyarMatch · Islamic Studies Diploma (Zad Academy) · Friday Khutbah Preacher</p>
            </div>
          </div>

          {/* Email capture */}
          <EmailCapture variant="banner" />

          {/* CTA */}
          <div
            className="rounded-3xl p-10 text-center text-white overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #0D0B14 0%, #3B1328 60%, #7C1D2E 100%)" }}
          >
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-white" style={{ transform: "translate(30%, -30%)" }} />
            </div>
            <div className="relative">
              <div className="w-12 h-0.5 mx-auto mb-6" style={{ background: "linear-gradient(90deg, #8B6A35, #D4AF7A)" }} />
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">
                Ready to take the first step?
              </h3>
              <p className="text-rose-200 mb-8 max-w-md mx-auto leading-relaxed">
                MisyarMatch just launched. Free to join right now. Be one of the first members in your city.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 font-semibold text-base"
                style={{ background: "linear-gradient(135deg,#8B6A35,#B8965A,#D4AF7A)", color: "#0D0B14", border: "none" }}
              >
                <a href={getLoginUrl()}>
                  Create Your Profile Free <ArrowRight className="w-4 h-4 ml-2 inline" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
