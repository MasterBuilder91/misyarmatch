import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { BookOpen, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function WhatIsMisyar() {
  return (
    <Layout>
      <SEOHead
        title="What Is Misyar Marriage? — Islamic Guide"
        description="A comprehensive Islamic guide to misyar nikah — its definition, scholarly rulings, conditions, and who it is for. Based on fatwas from Ibn Baz, Ibn Uthaymeen, and the Islamic Fiqh Academy."
        keywords="what is misyar marriage, misyar nikah definition, misyar Islamic ruling, Ibn Baz misyar, Ibn Uthaymeen misyar, halal misyar"
        canonical="/what-is-misyar"
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
