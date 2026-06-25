import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { BookOpen, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is misyar marriage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Misyar marriage (zawāj al-misyār) is a valid Islamic nikah contract in which the wife voluntarily waives certain rights — typically shared accommodation and financial maintenance. All pillars of nikah must be present: wali, witnesses, and mahr. It is not temporary marriage (mut'ah) and it is not secret. It is a full nikah with complete Islamic validity."
      }
    },
    {
      "@type": "Question",
      "name": "Is misyar marriage halal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Misyar marriage is permitted by major Islamic scholars including Shaykh Ibn Baz (former Grand Mufti of Saudi Arabia), Shaykh Ibn Uthaymeen, the Islamic Fiqh Academy (OIC), and Shaykh Yusuf al-Qaradawi. It fulfils all the conditions of a valid nikah contract."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between misyar and mut'ah marriage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Misyar marriage has no fixed end date — it is a permanent nikah. Mut'ah is a temporary marriage practised in Shi'i Islam and is forbidden in Sunni Islam. Misyar is fully permissible in Sunni Islam. The two are completely different contracts."
      }
    },
    {
      "@type": "Question",
      "name": "Who is misyar marriage suitable for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Misyar is particularly suited for: divorced men and women who want halal companionship without full traditional obligations, widows and widowers, professionals who cannot commit to shared accommodation, men who are already married and wish to take a second wife transparently, students and those with financial constraints, converts, and Muslims working abroad."
      }
    },
    {
      "@type": "Question",
      "name": "Does misyar marriage require a wali (guardian)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. A wali (guardian) must be present or give permission, two Muslim witnesses must be present, and a mahr (dowry) must be agreed upon. These are conditions of all valid nikah contracts, including misyar."
      }
    }
  ]
};

export default function WhatIsMisyar() {
  return (
    <Layout>
      <SEOHead
        title="What Is Misyar Marriage? Complete Islamic Guide (2025)"
        description="Misyar marriage explained — definition, Islamic ruling, scholarly evidence from Ibn Baz and Ibn Uthaymeen, conditions, and who it is for. The first English-language misyar platform for western Muslims."
        keywords="what is misyar marriage, misyar nikah, misyar marriage halal, misyar marriage western, misyar marriage USA, misyar marriage UK, misyar marriage Canada, misyar marriage app, halal misyar, zawaj misyar, Ibn Baz misyar fatwa, misyar vs mutah, misyar conditions, misyar marriage 2025"
        canonical="/what-is-misyar"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* Hero */}
      <section className="gradient-hero text-white py-16">
        <div className="container max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 mb-6 text-sm">
            <BookOpen className="w-4 h-4" />
            <span>Islamic Guidance</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            What Is Misyar Marriage?
          </h1>
          <p className="text-rose-200 text-lg">
            A clear, honest explanation — with scholarly references.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">

            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">The Definition</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Misyar marriage (Arabic: زواج المسيار, <em>zawāj al-misyār</em>) is a valid Islamic nikah contract in which the wife voluntarily waives certain rights that she would normally be entitled to — typically the right to shared accommodation and the husband's financial maintenance (nafaqah). The husband may visit her at her home, and the marriage is conducted with a wali (guardian), witnesses, and mahr (dowry), fulfilling all the essential pillars of nikah.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              The word "misyar" derives from the Arabic root meaning "to walk" or "to travel" — reflecting the arrangement where the husband comes to the wife, rather than establishing a shared household. It is not a secret marriage. It is not a temporary marriage (mut'ah, which is forbidden in Sunni Islam). It is a full nikah with all legal and religious validity.
            </p>

            <blockquote className="border-l-4 border-rose-600 bg-rose-50 p-4 rounded-r-xl my-8">
              <p className="text-gray-800 font-medium italic">
                "Misyar marriage is permissible because it fulfils the conditions of the marriage contract, which are the offer and acceptance, the presence of the wali of the woman, and two witnesses. The fact that the woman waives her right to accommodation and financial support does not affect the validity of the marriage."
              </p>
              <footer className="text-rose-700 font-semibold mt-2 text-sm">
                — Shaykh Ibn Baz (Fatwa No. 19481)
              </footer>
            </blockquote>

            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 mt-10">The Scholarly Consensus</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Misyar marriage has been explicitly permitted by some of the most respected Islamic scholars of the modern era:
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  scholar: "Shaykh Ibn Baz (رحمه الله)",
                  role: "Former Grand Mufti of Saudi Arabia",
                  ruling: "Declared misyar permissible, stating the woman's waiver of her rights is her own choice and does not invalidate the marriage.",
                },
                {
                  scholar: "Shaykh Ibn Uthaymeen (رحمه الله)",
                  role: "Senior Scholar, Saudi Arabia",
                  ruling: "Permitted misyar while emphasising that both parties must enter it with full knowledge and consent, and that it must not be used to harm the woman.",
                },
                {
                  scholar: "Islamic Fiqh Academy (OIC)",
                  role: "International Islamic scholarly body",
                  ruling: "Ruled that misyar is a valid marriage contract, provided all pillars of nikah are present and the woman enters it freely.",
                },
                {
                  scholar: "Shaykh Yusuf al-Qaradawi",
                  role: "International Islamic scholar",
                  ruling: "Permitted misyar for those with genuine need, while cautioning against its misuse.",
                },
              ].map((item) => (
                <div key={item.scholar} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="font-semibold text-gray-900">{item.scholar}</div>
                  <div className="text-rose-600 text-sm mb-2">{item.role}</div>
                  <p className="text-gray-600 text-sm">{item.ruling}</p>
                </div>
              ))}
            </div>

            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 mt-10">The Conditions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For a misyar marriage to be valid, the following conditions must be met:
            </p>
            <div className="space-y-3 mb-8">
              {[
                "The offer and acceptance (ijab and qabul) must be present",
                "The woman's wali (guardian) must be present or give permission",
                "Two Muslim witnesses must be present",
                "A mahr (dowry) must be agreed upon",
                "The woman must waive her rights freely — without coercion",
                "The marriage must not be secret — it should be announced",
                "Both parties must be free to marry (no existing forbidden relationships)",
              ].map((condition) => (
                <div key={condition} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{condition}</span>
                </div>
              ))}
            </div>

            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 mt-10">Who Is Misyar For?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Misyar is not a compromise. For many Muslims, it is the most honest and practical path to a halal relationship. It is particularly suited for:
            </p>
            <ul className="space-y-2 mb-8 text-gray-700">
              <li>• Divorced men and women who want a halal relationship without the full obligations of traditional marriage</li>
              <li>• Widows and widowers who wish to remarry without disrupting existing family arrangements</li>
              <li>• Professionals with demanding careers who cannot commit to shared accommodation</li>
              <li>• Men who are already married and wish to take a second wife in a halal, transparent manner</li>
              <li>• Students or those with financial constraints who cannot yet afford full traditional marriage</li>
              <li>• Converts who may not have family support for a traditional wedding</li>
              <li>• Those working abroad or in long-distance situations</li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 mt-10">Misyar Marriage in the West</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For western Muslims in the United States, United Kingdom, Canada, and Australia, misyar solves a problem that traditional marriage simply cannot address. The western Muslim community faces a unique combination of factors:
            </p>
            <ul className="space-y-2 mb-6 text-gray-700">
              <li>• The collapse of traditional community matchmaking networks — elders and imams who once brokered marriages are no longer available</li>
              <li>• A generation of divorced, widowed, and single Muslims in their 30s, 40s, and 50s with no halal pathway to companionship</li>
              <li>• Professional demands that make shared accommodation impractical</li>
              <li>• Geographic separation from family who might assist with introductions</li>
              <li>• A post-divorce reality where parents are no longer running your marriage search</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              Philadelphia's Black Salafi Muslim community has practiced misyar-style arrangements for decades — documented by NPR, Middle East Forum, and Rutgers University Press. Born into an American framework with no immigrant family pipeline, they built halal infrastructure organically. MisyarMatch brings this solution online for the entire western Muslim diaspora.
            </p>

            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 mt-10">Misyar vs Mut'ah — The Critical Difference</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This is the most common source of confusion and it matters enormously:
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <h3 className="font-bold text-emerald-800 mb-2">Misyar ✅</h3>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• Sunni Islam — fully permissible</li>
                  <li>• No fixed end date — permanent nikah</li>
                  <li>• Requires wali, witnesses, mahr</li>
                  <li>• Approved by Ibn Baz, Ibn Uthaymeen</li>
                  <li>• Woman waives rights voluntarily</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h3 className="font-bold text-red-800 mb-2">Mut'ah ❌</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Forbidden in Sunni Islam</li>
                  <li>• Fixed end date agreed upfront</li>
                  <li>• Practised only in Shi'i Islam</li>
                  <li>• Considered invalid by Sunni scholars</li>
                  <li>• Different contract entirely</li>
                </ul>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 mt-10">What Misyar Is Not</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              It is important to be clear about what misyar is not:
            </p>
            <ul className="space-y-2 mb-8 text-gray-700">
              <li>• It is <strong>not</strong> mut'ah (temporary marriage) — misyar has no fixed end date</li>
              <li>• It is <strong>not</strong> a secret marriage — it should be announced</li>
              <li>• It is <strong>not</strong> a way to exploit women — the woman's consent is paramount</li>
              <li>• It is <strong>not</strong> lesser than a traditional marriage in Islamic validity</li>
              <li>• It is <strong>not</strong> a casual arrangement — it is a full nikah with all legal and religious weight</li>
            </ul>

          </div>

          <div className="mt-12 bg-rose-50 rounded-2xl p-8 text-center border border-rose-200">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
              Ready to find your misyar partner?
            </h3>
            <p className="text-gray-600 mb-6">
              MisyarMatch is built for serious Muslims who want honesty from the first message.
            </p>
            <Button asChild className="gradient-rose text-white border-0 shadow-rose">
              <Link href="/browse">Browse Members</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
