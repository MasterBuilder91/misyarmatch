import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { ArrowRight, Check } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Agree on the mahr",
    body: "She chooses something meaningful. He agrees. It can be money — any amount. A piece of jewellery. A Quran. Teaching her something he knows. The Prophet ﷺ accepted a mahr of a ring of iron, a single date, and teaching three surahs of Quran. There is no minimum in most madhabs beyond 'something of value.' Write it down so there is no dispute later.",
  },
  {
    number: "02",
    title: "She appoints a wali — or acts herself",
    body: "In three madhabs (Maliki, Shafi'i, Hanbali) she needs a wali — a male guardian — to speak on her behalf. This can be her father, brother, uncle, any male relative, or any Muslim man she trusts and explicitly appoints as her wakeel. If no family is available or willing, the local imam can serve. In the Hanafi madhab, the position is more nuanced: a thayyib — a previously married woman, whether divorced or widowed — has near-unanimous scholarly backing to act for herself. The Prophet ﷺ said explicitly: 'The thayyib has more right over herself than her wali.' (Muslim) Beyond the thayyib, Hanafi scholars extend this to situations where a woman has no accessible wali — including a convert whose family is non-Muslim, or a woman whose past includes zina and who is now making sincere tawbah and seeking to be halal. In these cases, the scholars understood that leaving such women without a path to valid nikah was worse than the alternatives. The fiqh was designed for real human situations, not ideal ones.",
  },
  {
    number: "03",
    title: "Find two witnesses",
    body: "Two adult Muslim males of sound character. That is all. They can be friends, colleagues, neighbours — anyone. They do not need any official role. They do not need to be imams or scholars. They simply need to be present, hear the offer and acceptance clearly, and be able to attest that it happened. Some scholars permit one man and two women as an alternative. The witnesses are what make this a known, witnessed, valid contract rather than a private arrangement.",
  },
  {
    number: "04",
    title: "Say the words",
    body: "The wali (or she herself in Hanafi madhab) says: 'I give [her name] to you in marriage upon a mahr of [agreed amount/item].' He says: 'I accept her in marriage upon this mahr.' Both statements must be in the same sitting. The witnesses must hear both clearly. That exchange — offer and acceptance in one sitting, witnessed — is the nikah. It is done the moment those words are spoken and heard.",
  },
  {
    number: "05",
    title: "Make du'a",
    body: "The Prophet ﷺ said: 'May Allah bless you, and may He bless upon you, and may He join you together in good.' (Tirmidhi — hassan) This is the sunnah du'a for a newly married couple. Say it. Mean it. You are now husband and wife in the sight of Allah.",
  },
];

const faqs = [
  {
    q: "Does it need to be in Arabic?",
    a: "No. Offer and acceptance in any language the parties understand is valid in the Hanafi and Maliki schools. The Shafi'i school requires Arabic; the Hanbali school has nuanced positions. In the West, scholars have ruled that doing the nikah in English is valid for those who do not speak Arabic, to ensure full understanding of what is being contracted.",
  },
  {
    q: "Does it need to be registered with the government?",
    a: "Not for Islamic validity — the nikah is complete without civil registration. However, civil registration is strongly recommended for practical legal rights: inheritance, next-of-kin status, spousal rights in medical and legal settings, tax and benefits implications. In the UK and US, you can do an Islamic nikah and a civil marriage separately. Both serve different but complementary purposes.",
  },
  {
    q: "Can the nikah be done over video call?",
    a: "Scholars differ significantly on this. The majority traditional position requires all parties — including witnesses — to be physically present in the same space. Some contemporary scholars have permitted video nikah under specific circumstances, particularly where travel is genuinely impossible. For maximum validity and certainty, in-person is always recommended.",
  },
  {
    q: "Does anyone need to be told afterward?",
    a: "The scholars recommend that the marriage not remain completely secret indefinitely. The witnesses already mean it is 'known' to some degree. Beyond that, informing family, praying in her local masjid, and hosting even a small meal (the walimah sunnah) are recommended as ways of establishing the marriage publicly. In Western countries, scholars generally accommodate a degree of privacy while still recommending eventual acknowledgment.",
  },
  {
    q: "What if the wali refuses?",
    a: "If a wali refuses without a legitimate Islamic reason — called adhl (unjust refusal) — his guardianship transfers to the next person in the chain, and ultimately to a judge or imam. In Western countries, any local imam can serve as wali for a woman whose family will not. In the Hanafi school, she can simply proceed without a wali as an adult woman.",
  },
  {
    q: "What is the minimum number of people needed?",
    a: "The absolute minimum: the bride (or her wali speaking for her), the groom, and two witnesses. That is five people at most — three if the bride acts for herself and counts as one of the parties, and the two witnesses are separate. Five adults in a room. One conversation. One marriage.",
  },
];

export default function NikahGuide() {
  return (
    <Layout>
      <SEOHead
        title="How to Do a Nikah: The Complete Practical Guide | MisyarMatch"
        description="Five adults. One room. Twenty minutes. A valid Islamic marriage. Here is the complete, step-by-step guide to performing a nikah — no sheikh, no hall, no production required."
        keywords="how to do nikah, nikah guide, Islamic marriage steps, simple nikah, private nikah, nikah without imam"
        canonical="/nikah-guide"
      />

      {/* Hero */}
      <section
        className="text-white pt-20 pb-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D0B14 0%, #3B1328 55%, #7C1D2E 100%)" }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-white" style={{ transform: "translate(20%, -20%)" }} />
        </div>
        <div className="container max-w-3xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{ background: "rgba(184,150,90,0.15)", border: "1px solid rgba(184,150,90,0.4)", color: "#D4AF7A" }}>
            The Practical Guide
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Five Adults.<br />One Room.<br />One Valid Nikah.
          </h1>
          <p className="text-rose-200/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            No sheikh required. No masjid required. No hall, no feast, no production. Here is exactly what you need — and nothing more.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-rose-200/60">
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-400" /> Offer & acceptance</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-400" /> Agreed mahr</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-400" /> Two witnesses</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-400" /> Done</span>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16" style={{ background: "#F7F3EF" }}>
        <div className="container max-w-3xl mx-auto">

          <div className="space-y-6 mb-16">
            {steps.map((step) => (
              <div key={step.number} className="bg-white rounded-2xl p-8 border border-gray-100"
                style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                <div className="flex items-start gap-5">
                  <div
                    className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-sm"
                    style={{ background: "linear-gradient(135deg, #7C1D2E, #B8965A)", color: "#fff" }}
                  >
                    {step.number}
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-gray-900 mb-3">{step.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* That's it callout */}
          <div
            className="rounded-3xl p-10 text-center text-white mb-16 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0D0B14 0%, #3B1328 60%, #7C1D2E 100%)" }}
          >
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-white" style={{ transform: "translate(30%, -30%)" }} />
            </div>
            <div className="relative">
              <div className="w-12 h-0.5 mx-auto mb-6" style={{ background: "linear-gradient(90deg, #8B6A35, #D4AF7A)" }} />
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">That's it.</h2>
              <p className="text-rose-200/80 text-lg leading-relaxed max-w-xl mx-auto mb-2">
                No imam required. No masjid required. No certificate required for Islamic validity. No family approval required in the Hanafi madhab. No community announcement required beyond the witnesses.
              </p>
              <p className="text-rose-300/60 text-base mt-4">
                Five adults in a room. Twenty minutes. One marriage.
              </p>
              <p className="text-rose-200 font-serif text-xl italic mt-6">
                "Taqwa, even if it looks tacky to the naysayers.<br />Nikah, even when nobody throws you a party."
              </p>
            </div>
          </div>

          {/* FAQ */}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Common Questions</h2>
          <div className="space-y-4 mb-16">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-7 border border-gray-100"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <h3 className="font-semibold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center bg-rose-50 rounded-2xl p-10 border border-rose-100">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
              Ready to find your witness situation?
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              MisyarMatch connects Muslims who want honest, halal, simple arrangements — without the production.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 font-semibold"
              style={{ background: "linear-gradient(135deg, #7C1D2E, #B8965A)", color: "#fff", border: "none" }}>
              <a href={getLoginUrl()}>
                Create Your Free Profile <ArrowRight className="w-4 h-4 ml-2 inline" />
              </a>
            </Button>
          </div>

        </div>
      </section>
    </Layout>
  );
}
