import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

const statements = [
  "I can't yet afford a traditional wedding, dowry, or full household — but I don't want to keep waiting to marry halal.",
  "I travel often for work and can't honestly offer full-time cohabitation right now.",
  "I'm already married and want to be transparent about a second marriage instead of hiding it.",
  "I'm divorced or widowed and want real companionship without rebuilding an entire household from scratch.",
  "I want something real and contractual — not something casual, ambiguous, or haram.",
  "I'd rather be upfront about my circumstances than have a woman discover them later and feel deceived.",
  "I'm a student or early in my career, and traditional marriage isn't financially realistic for me yet.",
  "I want a partner who agrees to the arrangement with full understanding — not someone who resents it later.",
  "I'm tired of apps where everyone pretends to want the same conventional setup, when half of them don't.",
  "I just want to be honest about what I can offer, and find someone who wants exactly that.",
];

export default function MisyarForHim() {
  const [checked, setChecked] = useState<boolean[]>(Array(statements.length).fill(false));
  const count = checked.filter(Boolean).length;

  const toggle = (i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <Layout>
      <SEOHead
        title="Is Misyar Right For You? — For Men | MisyarMatch"
        description="Misyar marriage might be the honest, halal answer you've been looking for. Check the statements that resonate and see if misyar nikah fits your life."
        keywords="misyar for men, is misyar right for me, halal relationship men, misyar nikah men"
        canonical="/misyar-for-him"
      />

      <section className="gradient-hero text-white py-16">
        <div className="container max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Misyar Might Be Right For You If...
          </h1>
          <p className="text-rose-200 text-lg max-w-2xl mx-auto">
            Check what resonates. There's no wrong answer — just clarity.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-2xl mx-auto">
          <div className="space-y-3 mb-10">
            {statements.map((s, i) => (
              <button
                key={s}
                onClick={() => toggle(i)}
                className={`w-full text-left flex items-start gap-3 p-4 rounded-2xl border transition-colors ${
                  checked[i]
                    ? "bg-rose-50 border-rose-300"
                    : "bg-white border-gray-200 hover:border-rose-200"
                }`}
              >
                {checked[i] ? (
                  <CheckCircle2 className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                )}
                <span className="text-gray-700 text-sm leading-relaxed">{s}</span>
              </button>
            ))}
          </div>

          <div className="text-center bg-rose-50 rounded-2xl p-8 border border-rose-100">
            {count === 0 ? (
              <p className="text-gray-600 mb-6">
                Tap the statements above that sound like you.
              </p>
            ) : count <= 3 ? (
              <>
                <h2 className="font-serif text-xl font-bold text-gray-900 mb-3">
                  Worth exploring
                </h2>
                <p className="text-gray-600 mb-6">
                  Even a few of these resonating is reason enough to see what an honest, defined arrangement could look like for you.
                </p>
              </>
            ) : (
              <>
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                  This sounds a lot like misyar.
                </h2>
                <p className="text-gray-600 mb-6">
                  You already know what you want. The only thing missing is a platform that lets you say so honestly — and find someone who wants the same thing.
                </p>
              </>
            )}
            <a href={getLoginUrl()}>
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white">
                Create Your Free Profile <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
