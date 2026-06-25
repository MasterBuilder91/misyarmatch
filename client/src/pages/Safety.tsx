import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { AlertTriangle, Eye, Heart, Lock, Shield, UserX } from "lucide-react";

export default function Safety() {
  return (
    <Layout>
      <SEOHead
        title="Safety Centre — MisyarMatch"
        description="MisyarMatch Safety Centre. How we protect our members, how to report concerns, and how to stay safe when meeting someone from the platform."
        canonical="/safety"
      />

      <section className="gradient-hero text-white py-16">
        <div className="container max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 mb-6 text-sm">
            <Shield className="w-4 h-4" />
            <span>Safety Centre</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Your Safety Is Our Priority</h1>
          <p className="text-rose-200 text-lg">
            MisyarMatch is built for serious Muslims. We take safety and dignity seriously.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-3xl mx-auto">

          {/* Platform protections */}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Platform Protections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[
              {
                icon: Eye,
                title: "Photos blurred by default",
                desc: "Your photo is only visible to members who have expressed mutual interest with you.",
              },
              {
                icon: Lock,
                title: "Google OAuth only",
                desc: "We never store passwords. Authentication is handled entirely by Google.",
              },
              {
                icon: Heart,
                title: "Mutual interest required",
                desc: "No one can message you unless you have both expressed interest. No cold messages.",
              },
              {
                icon: UserX,
                title: "Block and report",
                desc: "You can block any member at any time. Reports are reviewed within 24 hours.",
              },
              {
                icon: Shield,
                title: "Email never shared",
                desc: "Your email address is never shown to other members under any circumstances.",
              },
              {
                icon: AlertTriangle,
                title: "Dedicated safety email",
                desc: "president@misyarmatch.net is monitored daily for urgent concerns.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex gap-3">
                <item.icon className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                  <div className="text-gray-500 text-sm mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Meeting safely */}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Meeting Safely in Person</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            MisyarMatch facilitates the initial connection. When you decide to meet in person, please follow these guidelines:
          </p>
          <ul className="space-y-3 mb-10 text-gray-700">
            {[
              "Always meet in a public place for the first meeting — a café, restaurant, or public park.",
              "Tell a trusted family member or friend where you are going and who you are meeting.",
              "For sisters: consider bringing a mahram or a trusted female friend to the first meeting.",
              "Do not share your home address, workplace, or daily routine until you have established trust.",
              "Trust your instincts. If something feels wrong, leave. You do not owe anyone an explanation.",
              "The nikah should be conducted with a qualified imam and in the presence of witnesses.",
              "Never transfer money to someone you have not met in person and verified.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-rose-600 flex-shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Red flags */}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Red Flags to Watch For</h2>
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 mb-10">
            <ul className="space-y-2 text-gray-700 text-sm">
              {[
                "Refusing to video call or meet in person after extended messaging",
                "Asking for money, gift cards, or financial transfers",
                "Claiming to be abroad and unable to meet",
                "Pressuring you to move quickly or skip the nikah process",
                "Inconsistencies in their story or profile details",
                "Asking you to communicate outside the platform before meeting",
              ].map((flag) => (
                <li key={flag} className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>

          {/* Report */}
          <div className="bg-rose-50 rounded-2xl p-8 border border-rose-200 text-center">
            <Shield className="w-10 h-10 text-rose-600 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Report a Concern</h3>
            <p className="text-gray-600 mb-4 text-sm">
              If you encounter suspicious behaviour, harassment, or anything that makes you feel unsafe, please contact us immediately.
            </p>
            <a
              href="mailto:president@misyarmatch.net"
              className="inline-flex items-center gap-2 bg-rose-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-rose-800 transition-colors"
            >
              <Shield className="w-4 h-4" />
              president@misyarmatch.net
            </a>
            <p className="text-gray-500 text-xs mt-3">Urgent safety concerns are reviewed within 24 hours.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
