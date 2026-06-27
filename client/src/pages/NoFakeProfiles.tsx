import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { ArrowRight, EyeOff, ShieldCheck, UserCheck } from "lucide-react";

export default function NoFakeProfiles() {
  return (
    <Layout>
      <SEOHead
        title="Our Promise: No Fake Profiles — MisyarMatch"
        description="Every profile on MisyarMatch belongs to a real, registered member. No bots, no fabricated profiles, no padding the numbers. Just honest people looking for honest arrangements."
        keywords="no fake profiles, real members, misyar marriage authentic, dating app trust"
        canonical="/no-fake-profiles"
      />

      <section className="gradient-hero text-white py-16">
        <div className="container max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Every Profile Here Is Real
          </h1>
          <p className="text-rose-200 text-lg max-w-2xl mx-auto">
            No bots. No fabricated members. No padding the numbers to make the room feel fuller than it is.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-3xl mx-auto">
          <p className="text-gray-700 leading-relaxed mb-10 text-lg">
            A lot of dating and matchmaking platforms quietly inflate their numbers — fake profiles to make the site look busier, paid "hosts" chatting as if they're real members, accounts that exist purely to keep you scrolling and paying. We built MisyarMatch around the opposite idea: an arrangement built on honesty shouldn't start with a dishonest platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100 text-center">
              <UserCheck className="w-8 h-8 text-rose-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Real members only</h3>
              <p className="text-sm text-gray-600">
                Every profile is created and maintained by a real, registered person. We do not create, generate, or operate fake accounts on this platform.
              </p>
            </div>
            <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100 text-center">
              <ShieldCheck className="w-8 h-8 text-rose-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">No paid "hosts"</h3>
              <p className="text-sm text-gray-600">
                We don't employ people to chat with you pretending to be interested matches. If someone messages you, it's because they actually want to.
              </p>
            </div>
            <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100 text-center">
              <EyeOff className="w-8 h-8 text-rose-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Privacy, not deception</h3>
              <p className="text-sm text-gray-600">
                You can stay private and selective about what you share. Privacy protects you. It is never used here to mislead you about who you're talking to.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 text-white rounded-2xl p-8 mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4">Why this matters more here than anywhere else</h2>
            <p className="text-gray-300 leading-relaxed">
              Misyar is already a step that takes trust to even consider. If you're going to be honest about what you want — and ask a platform to hold that honesty with care — the least it owes you back is being honest about who's actually on it. We'd rather grow slowly with real people than grow fast with fake ones.
            </p>
          </div>

          <div className="text-center bg-rose-50 rounded-2xl p-8 border border-rose-100">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
              Come see for yourself
            </h2>
            <p className="text-gray-600 mb-6">
              Create a free profile and browse. Every person you find is exactly that — a person.
            </p>
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
