import { useAuth } from "@/_core/hooks/useAuth";
import { SEOHead } from "@/components/SEOHead";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { ArrowRight, CheckCircle, Heart, MessageCircle, Search, Shield, Zap } from "lucide-react";
import { Link } from "wouter";

const CIRCUMSTANCES = [
  { emoji: "✅", label: "Ready Now", desc: "No constraints, ready to commit" },
  { emoji: "📚", label: "Currently Studying", desc: "Cannot support financially yet" },
  { emoji: "⚖️", label: "Going Through Divorce", desc: "Not yet legally free" },
  { emoji: "🌙", label: "Seeking Second Wife", desc: "Already married, honest about it" },
  { emoji: "✈️", label: "Working Abroad", desc: "Long distance only" },
  { emoji: "💼", label: "Financial Constraints", desc: "Cannot afford traditional marriage" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Be honest about your circumstances",
    desc: "Select your current situation from six clear options. No hiding. No vague profiles. Your circumstances are shown as a badge on your profile.",
    icon: CheckCircle,
  },
  {
    step: "02",
    title: "Browse with full transparency",
    desc: "See every member's circumstances badge before you even read their bio. Filter by what works for you. Photos are blurred until mutual interest — character first.",
    icon: Search,
  },
  {
    step: "03",
    title: "Speed Chat anonymously",
    desc: "5-minute anonymous text sessions. No photos. No pressure. Their circumstances badge is shown before the first word. If you both want to connect — you match.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Match and message privately",
    desc: "When both parties express interest, you're connected. Private messaging with no read receipts — because pressure kills honest conversation.",
    icon: MessageCircle,
  },
];

const TESTIMONIALS = [
  {
    quote: "He told me upfront he was still studying. I knew what I was walking into. We did our nikah three months later. That honesty was everything.",
    name: "Sister from Birmingham",
    detail: "Matched via Browse",
  },
  {
    quote: "I'm already married. On every other app I had to hide it or get blocked immediately. Here, it's a filter. My wife and I found our second marriage here.",
    name: "Brother from London",
    detail: "Matched via Speed Chat",
  },
  {
    quote: "I'm a widow. I didn't want a full traditional marriage again — the financial expectations, the family politics. Misyar was always the answer. I just needed a platform that understood that.",
    name: "Sister from Manchester",
    detail: "Matched via Browse",
  },
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <SEOHead
        title="MisyarMatch — Halal Misyar Marriage for Serious Muslims"
        description="The UK's most honest Islamic marriage platform. Find your misyar nikah partner with full transparency about circumstances. No games. No pretending. Just halal."
        canonical="/"
      />

      {/* Hero */}
      <section className="gradient-hero text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm font-medium">
              <Heart className="w-4 h-4 fill-current" />
              <span>For serious Muslims. Honest about everything.</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
              No games.<br />No pretending.<br />
              <span className="text-rose-200">Just halal.</span>
            </h1>
            <p className="text-lg md:text-xl text-rose-100 mb-4 leading-relaxed max-w-2xl mx-auto">
              He is still studying. She knows. She accepts. That is not a compromise — that is a match.
            </p>
            <p className="text-rose-200 mb-10 max-w-xl mx-auto">
              MisyarMatch is built on one principle: honesty is the product. Every profile shows their real circumstances. No hiding. No wasted time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Button asChild size="lg" className="bg-white text-rose-800 hover:bg-rose-50 font-semibold shadow-lg">
                  <Link href="/browse">
                    Browse Members <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="bg-white text-rose-800 hover:bg-rose-50 font-semibold shadow-lg">
                  <a href={getLoginUrl()}>
                    Join Free — Sisters Always Free <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              )}
              <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 bg-transparent">
                <Link href="/what-is-misyar">What Is Misyar?</Link>
              </Button>
            </div>
            <p className="mt-6 text-rose-300 text-sm">
              Sisters join free forever. Brothers start free. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Circumstances Transparency */}
      <section className="py-16 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The reason people waste time on Muslim apps
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              It is not bad intentions. It is hidden circumstances. A man who is still studying is not a time waster — if he is honest about it upfront.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {CIRCUMSTANCES.map((c) => (
              <div key={c.label} className="bg-white rounded-xl p-4 border border-rose-100 shadow-sm hover:shadow-rose transition-shadow">
                <div className="text-2xl mb-2">{c.emoji}</div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{c.label}</div>
                <div className="text-gray-500 text-xs">{c.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-600">
            Every profile shows one of these badges. <strong>Visible. Always.</strong> No hiding in a bio.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How MisyarMatch works
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Four steps. Radical transparency at every one.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-rose-700" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">Step {step.step}</div>
                  <h3 className="font-serif font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild size="lg" className="gradient-rose text-white border-0 shadow-rose">
              <Link href="/how-it-works">See the full guide <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blush">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real people. Real matches.
            </h2>
            <p className="text-gray-600">Names changed for privacy. Stories are real.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
                <div className="text-rose-300 text-4xl font-serif mb-3">"</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">{t.quote}</p>
                <div className="border-t border-rose-100 pt-3">
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-rose-600 text-xs">{t.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-12 bg-white border-t border-rose-100">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Shield, label: "Sisters Free Forever", desc: "Non-negotiable platform principle" },
              { icon: Heart, label: "Mutual Interest Only", desc: "No one-sided contact ever" },
              { icon: CheckCircle, label: "Circumstances Visible", desc: "No hidden agendas" },
              { icon: MessageCircle, label: "No Read Receipts", desc: "Pressure-free messaging" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-rose-700" />
                </div>
                <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                <div className="text-gray-500 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero text-white">
        <div className="container text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Ready to find your match?
          </h2>
          <p className="text-rose-200 mb-8 max-w-xl mx-auto">
            Join thousands of serious Muslims who chose honesty over pretense. Sisters always free. Brothers start free today.
          </p>
          <Button asChild size="lg" className="bg-white text-rose-800 hover:bg-rose-50 font-semibold shadow-lg">
            <a href={getLoginUrl()}>
              Create Your Profile <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
