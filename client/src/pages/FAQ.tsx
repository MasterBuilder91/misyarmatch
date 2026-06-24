import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQS = [
  {
    q: "Is misyar marriage halal?",
    a: "Yes. Misyar marriage is a valid Islamic nikah contract permitted by major scholars including Shaykh Ibn Baz, Shaykh Ibn Uthaymeen, and the Islamic Fiqh Academy of the OIC. It fulfils all the pillars of nikah — offer and acceptance, wali, witnesses, and mahr. The wife voluntarily waives certain rights such as shared accommodation and maintenance. It is not temporary marriage (mut'ah), which is forbidden in Sunni Islam.",
  },
  {
    q: "Is MisyarMatch only for misyar marriages?",
    a: "Yes. MisyarMatch is specifically designed for Muslims who want misyar nikah. We are not a general Muslim marriage app. If you want a traditional marriage with full financial maintenance and shared accommodation, there are other platforms for that. We are built for people who want honesty about their circumstances and a halal path to intimacy through misyar.",
  },
  {
    q: "Do sisters really join free forever?",
    a: "Yes. Sisters join free and stay free. This is a non-negotiable platform principle, not a promotional offer. We believe sisters should never have to pay to find a halal partner. Brothers have a free tier with limited daily chat time and a premium tier with extended access.",
  },
  {
    q: "What are the six circumstances options?",
    a: "Ready Now, Currently Studying, Going Through Divorce, Already Married Seeking Second Wife, Working Abroad, and Financial Constraints. Every member must choose one. It is shown as a badge on their profile so both parties know exactly where the other stands before any conversation begins.",
  },
  {
    q: "What is mutual interest and how does matching work?",
    a: "Browse member profiles and click 'Express Interest' on anyone you find compatible. If they express interest back, you have a mutual match and can message privately. Photos are only revealed on a mutual match — character comes before appearance.",
  },
  {
    q: "Why are photos blurred by default?",
    a: "Because character comes before appearance. We believe the most important compatibility factors are circumstances, intention, and values — not looks. Photos are revealed only when both parties express mutual interest. This also protects members from having their photos seen by people who would never be compatible with them.",
  },
  {
    q: "Why no read receipts in private messaging?",
    a: "Because pressure kills honest conversation. When someone can see you have read their message and not replied, it creates anxiety and pressure that leads to rushed, dishonest responses. We want members to take their time and be real.",
  },
  {
    q: "What is the AI compatibility insight?",
    a: "When two members match, each receives a private AI-generated insight — written in the tone of a compassionate Islamic marriage counsellor. It is under 150 words, references their circumstances, and offers practical advice for their first conversation. It is private — only visible to the person it was generated for.",
  },
  {
    q: "Can a man who is already married use MisyarMatch?",
    a: "Yes. 'Already Married Seeking Second Wife' is one of the six circumstances options. It is shown clearly as a badge on his profile. Women who are not interested in this arrangement can filter it out. Women who are open to it can filter for it. This is the honest alternative to men hiding their marital status on other platforms.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. We use Google OAuth for authentication — we never store your password. Photos are stored securely on encrypted S3 storage. Your email is never shown to other members. We do not sell your data. Contact safety@misyarmatch.net for any safety concerns.",
  },
  {
    q: "What is the premium plan for brothers?",
    a: "Brothers on the free tier have limited daily messaging. Premium brothers get unlimited messaging, direct contact with matches, and priority placement in Browse. Sisters are always free — no premium tier for sisters, no exceptions.",
  },
  {
    q: "How do I report a concern?",
    a: "Email safety@misyarmatch.net. We take all reports seriously. We will review and act within 24 hours for urgent safety concerns.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-gray-900 pr-4">{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-rose-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-gray-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <Layout>
      <SEOHead
        title="Frequently Asked Questions — MisyarMatch"
        description="Answers to common questions about MisyarMatch, misyar marriage, photo privacy, premium plans, and Islamic rulings."
        keywords="misyar marriage FAQ, MisyarMatch questions, halal marriage app FAQ, misyar nikah questions"
        canonical="/faq"
      />

      <section className="gradient-hero text-white py-16">
        <div className="container max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-rose-200">Everything you need to know about MisyarMatch.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-3xl mx-auto">
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          <div className="mt-12 text-center bg-rose-50 rounded-2xl p-8 border border-rose-200">
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">Our team responds to all enquiries within 24 hours.</p>
            <a
              href="mailto:support@misyarmatch.net"
              className="inline-flex items-center gap-2 text-rose-700 font-semibold hover:text-rose-900"
            >
              support@misyarmatch.net
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
