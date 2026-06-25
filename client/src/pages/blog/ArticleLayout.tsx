import React from "react";
import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";

interface Props {
  children: React.ReactNode;
  title: string;
  tag: string;
  readTime: string;
  date?: string;
}

export function ArticleLayout({ children, title, tag, readTime, date = "June 2025" }: Props) {
  return (
    <Layout>
      {/* Hero */}
      <div className="gradient-hero text-white py-14">
        <div className="container max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm mb-6 opacity-70 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{background:'rgba(124,29,46,0.4)', color:'#F4A0B0'}}>
              {tag}
            </span>
            <span className="text-sm opacity-60">{readTime} read · {date}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight">{title}</h1>
          <p className="mt-3 text-sm opacity-60">Written by Muhammed Abdullah, Founder — Islamic Studies Diploma (Zad Academy), Friday Khutbah Preacher</p>
        </div>
      </div>

      {/* Article body */}
      <article className="py-12 bg-[#F7F4F0]">
        <div className="container max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-gray-900
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
            prose-strong:text-gray-900
            prose-ul:text-gray-700 prose-li:mb-2
            prose-blockquote:border-l-4 prose-blockquote:border-[#B8965A] prose-blockquote:bg-amber-50 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-gray-800">
            {children}
          </div>

          {/* CTA */}
          <div className="mt-10 rounded-2xl p-8 text-center text-white" style={{background:'linear-gradient(135deg, #0D0B14 0%, #3B1328 60%, #7C1D2E 100%)'}}>
            <h3 className="font-serif text-2xl font-bold mb-3">Ready to take the first step?</h3>
            <p className="text-rose-200 mb-6 max-w-md mx-auto">MisyarMatch just launched. Free to join right now. Be one of the first members in your city.</p>
            <Button asChild size="lg" style={{background:'linear-gradient(135deg,#8B6A35,#B8965A,#D4AF7A)', color:'#0D0B14', border:'none'}}>
              <a href={getLoginUrl()}>Create Your Profile Free <ArrowRight className="w-4 h-4 ml-2 inline" /></a>
            </Button>
          </div>
        </div>
      </article>
    </Layout>
  );
}
