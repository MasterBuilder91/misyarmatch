import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

const statements = [
  "I want a real, halal relationship — but I'm not ready (or able) to run a full household right now.",
  "I'm focused on my career, business, or education, and I want a partner who respects that, not one who expects me to put it on hold.",
  "I've been married before, and I want intimacy and companionship without rebuilding the exact same setup.",
  "I value my independence and don't want to ask permission for every decision in my life.",
  "I want a husband who is honest about his situation from day one — no surprises six months in.",
  "I'm privacy-conscious. I don't want my situation broadcast to my entire extended family or community yet.",
  "I'm not interested in being a forgotten second wife — but I also don't need to be someone's only focus to feel valued.",
  "I converted to Islam, and my family doesn't fully understand or support a traditional marriage timeline.",
  "I'm tired of months of texting that go nowhere. I want something real, defined, and intentional.",
  "I want a relationship structured around what I actually need — not what looks acceptable to everyone else.",
];

export default function MisyarForHer() {
  const [checked, setChecked] = useState<boolean[]>(Array(statements.length).fill(false));
  const count = checked.filter(Boolean).length;

  const toggle = (i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <Layout>
      <SEOHead
        title="Is Misyar Right For You? — For Women | MisyarMatch"
        description="A misyar marriage might fit your life better than you think. Check the statements that resonate and see if misyar nikah could be the honest, halal arrangement you've been looking for."
        keywords="misyar for women, is misyar right for me, halal relationship women, misyar nikah women"
        canonical="/misyar-for-her"
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
