import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { CircumstancesBadge } from "@/components/CircumstancesBadge";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { ArrowRight, CheckCircle, Eye, Heart, MessageCircle, Shield, UserCheck, Zap } from "lucide-react";

export default function HowItWorks() {
  return (
    <Layout>
      <SEOHead
        title="How MisyarMatch Works — Step by Step Guide"
        description="Learn how MisyarMatch works — from profile creation to matching. Circumstances transparency, mutual interest, and private messaging explained."
        keywords="how misyar match works, misyar marriage app guide, halal matchmaking process, Muslim marriage platform"
        canonical="/how-it-works"
      />

      <section className="gradient-hero text-white py-16">
        <div className="container max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">How MisyarMatch Works</h1>
          <p className="text-rose-200 text-lg">Simple. Honest. Halal.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto">

          {/* Step 1 */}
          <div className="flex gap-6 mb-16">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full gradient-rose flex items-center justify-center text-white font-bold text-lg">1</div>
              <div className="w-0.5 h-full bg-rose-100 mt-2" />
            </div>
            <div className="pb-8">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">Sign in with Google</h2>
              <p className="text-gray-600 mb-4">One click. No username. No password. Google OAuth only — because we want real people, not fake accounts.</p>
              <div className="bg-rose-50 rounded-xl p-4 border border-rose-100 inline-block">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Shield className="w-4 h-4 text-rose-600" />
                  <span>Your email is never shown to other members.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-6 mb-16">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full gradient-rose flex items-center justify-center text-white font-bold text-lg">2</div>
              <div className="w-0.5 h-full bg-rose-100 mt-2" />
            </div>
            <div className="pb-8">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">Complete your 4-step profile</h2>
              <p className="text-gray-600 mb-4">Four honest steps. No fluff.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { step: "Step 1", title: "Gender Gate", desc: "Brother or Sister" },
                  { step: "Step 2", title: "Age Verification", desc: "18+ required. Date of birth collected." },
                  { step: "Step 3", title: "Your Circumstances", desc: "Choose one of six honest options" },
                  { step: "Step 4", title: "Misyar Intention", desc: "Up to 2000 characters. Be honest." },
                ].map((s) => (
                  <div key={s.step} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="text-xs font-bold text-rose-500 uppercase mb-1">{s.step}</div>
                    <div className="font-semibold text-gray-900">{s.title}</div>
                    <div className="text-gray-500 text-sm">{s.desc}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-gray-600 text-sm mb-2">Your circumstances badge will look like this on your profile:</p>
                <CircumstancesBadge circumstances="ready_now" size="lg" />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-6 mb-16">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full gradient-rose flex items-center justify-center text-white font-bold text-lg">3</div>
              <div className="w-0.5 h-full bg-rose-100 mt-2" />
            </div>
            <div className="pb-8">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">Browse with full transparency</h2>
              <p className="text-gray-600 mb-4">Every profile card shows the member's circumstances badge. Photos are blurred by default — because character comes first.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
                  <Eye className="w-5 h-5 text-rose-600 mb-2" />
                  <div className="font-semibold text-gray-900 text-sm">Photos blurred by default</div>
                  <div className="text-gray-500 text-xs mt-1">Revealed only when both parties express mutual interest</div>
                </div>
                <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
                  <CheckCircle className="w-5 h-5 text-rose-600 mb-2" />
                  <div className="font-semibold text-gray-900 text-sm">Circumstances always visible</div>
                  <div className="text-gray-500 text-xs mt-1">Filter by location, marital status, and circumstances</div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-6 mb-16">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full gradient-rose flex items-center justify-center text-white font-bold text-lg">4</div>
              <div className="w-0.5 h-full bg-rose-100 mt-2" />
            </div>
            <div className="pb-8">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">Express interest — mutual matching</h2>
              <p className="text-gray-600 mb-4">When you find someone compatible, hit <strong>Express Interest</strong>. It's private — they don't see a notification saying who. If they express interest back, it's a mutual match. Photos are revealed. Private messaging opens.</p>
              <div className="bg-gray-900 rounded-xl p-4 text-sm font-mono">
                <div className="text-green-400 mb-2">// How matching works:</div>
                <div className="text-gray-300">You → Express Interest on a profile</div>
                <div className="text-gray-300 mt-1">They → Express Interest on your profile</div>
                <div className="text-yellow-300 mt-3">✓ Mutual match — photos revealed</div>
                <div className="text-blue-300 mt-1">✓ Private messaging unlocked</div>
                <div className="text-purple-300 mt-1">✓ AI compatibility insight generated</div>
              </div>
              <p className="text-gray-500 text-sm mt-3">No pressure. No notification sent when you express interest. It only activates if both choose each other.</p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-6 mb-8">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full gradient-rose flex items-center justify-center text-white font-bold text-lg">5</div>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">Private messaging — no read receipts</h2>
              <p className="text-gray-600 mb-4">Matched couples get a private chat. Deliberately no read receipts — because we believe pressure kills honest conversation. Take your time. Be real.</p>
              <div className="flex items-center gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <Heart className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">AI-powered Islamic compatibility insight generated for every match — private and personal.</span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="gradient-rose text-white border-0 shadow-rose">
              <a href={getLoginUrl()}>
                Start Your Profile <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
