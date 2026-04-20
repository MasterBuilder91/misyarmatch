import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

export default function WhyMisyarWorks() {
  return (
    <Layout>
      <SEOHead
        title="Why Misyar Marriage Works — MisyarMatch"
        description="Why misyar nikah is the honest, practical solution for serious Muslims who cannot or will not pretend. The case for transparency in Islamic marriage."
        keywords="why misyar works, misyar marriage benefits, halal relationship alternatives, Muslim marriage honesty"
        canonical="/why-misyar-works"
      />

      <section className="gradient-hero text-white py-16">
        <div className="container max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Why Misyar Works</h1>
          <p className="text-rose-200 text-lg max-w-2xl mx-auto">
            Not despite the honesty. Because of it.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-3xl mx-auto">

          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">The problem with mainstream Muslim apps</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The most common complaint about Muslim marriage apps is not that the people are bad. It is that the platform forces everyone to pretend. A man who is already married must hide it or be immediately blocked. A woman going through a divorce must present herself as "available" when she is not yet legally free. A student who cannot afford a wedding must either lie about his finances or watch his profile get ignored.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            The result is a platform full of hidden circumstances, wasted time, and broken trust. And when the truth eventually comes out — it always does — the emotional damage is significant.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> Mainstream apps
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "Hidden circumstances discovered weeks in",
                  "Pressure to appear 'traditionally eligible'",
                  "Already-married men must lie or be blocked",
                  "Financial constraints treated as shameful",
                  "No framework for honest misyar intent",
                  "Wasted months of emotional investment",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
              <h3 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> MisyarMatch
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "Circumstances shown as badge from day one",
                  "No pretending — honesty is the product",
                  "Already-married brothers have a dedicated badge",
                  "Financial constraints are a filter, not a shame",
                  "Misyar intention stated clearly in every profile",
                  "Only matched when both parties genuinely want it",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">The repenting crowd</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            There is a large and underserved group of Muslims — people who have lived through difficult periods, who have made mistakes, who are returning to their deen with sincerity. They want a halal relationship. They want nikah. But they are frustrated with platforms that seem designed for people who have never struggled.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            MisyarMatch was built for them. The divorced sister who is not ready for a full traditional marriage again. The brother who is already married but wants to do things the halal way. The convert with no family support. The professional who cannot commit to shared accommodation. These are not edge cases. They are the majority of serious Muslim adults.
          </p>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Why honesty produces better matches</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            When someone sees your circumstances badge and still expresses interest — that interest is real. They are not going to be surprised later. They are not going to feel deceived. The filter has already done its work. What remains is genuine compatibility between two people who accepted each other's reality from the first moment.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            That is not a compromise. That is the foundation of a strong marriage.
          </p>

          <div className="bg-rose-50 rounded-2xl p-8 text-center border border-rose-200">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
              Join the honest alternative
            </h3>
            <p className="text-gray-600 mb-6">
              Sisters always free. Brothers start free. No pretending required.
            </p>
            <Button asChild className="gradient-rose text-white border-0 shadow-rose">
              <a href={getLoginUrl()}>
                Create Your Profile <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
