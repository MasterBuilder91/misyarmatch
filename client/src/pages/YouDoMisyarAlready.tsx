import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { ArrowRight, Heart, Scale } from "lucide-react";

const scenarios = [
  {
    title: "The provider who is never home",
    body: "He built the business. He bought the house everyone admires. Society sees a successful man and a wife who 'has it all' — but she rarely has him. Not his time, not his presence, not the intimacy she's entitled to. She traded full rights for stability and status, even if no one ever called it that.",
  },
  {
    title: "The second city, the second life",
    body: "Work takes him abroad for months at a time. The marriage is real, the rights are on paper — but in practice, she's managing a household and a life largely alone. The wife waived consistent presence; what she received instead was security. That trade has a name.",
  },
  {
    title: "The marriage of convenience for the kids",
    body: "They stay together 'for the family.' Affection, intimacy, partnership — quietly given up, replaced by co-parenting logistics and a shared address. Full rights, forfeited, in exchange for stability for the children. Nobody calls it misyar. It is.",
  },
  {
    title: "The woman who wants to be wanted, not managed",
    body: "Some women forfeit certain rights — financial maintenance, full cohabitation — specifically because they want intimacy on their own terms, without the weight of a household to run or a husband to manage full-time. This is the version society quietly judges, even though it's arguably the most honest one: she knows exactly what she's trading, and why.",
  },
];

export default function YouDoMisyarAlready() {
  return (
    <Layout>
      <SEOHead
        title="You Already Practice Misyar — You Just Don't Call It That | MisyarMatch"
        description="Misyar isn't a fringe practice. Wealthy husbands who are never home, marriages of convenience, long-distance arrangements — these are misyar in everything but name. The only difference is honesty."
        keywords="misyar marriage reality, modern misyar examples, misyar in disguise, honest misyar nikah"
        canonical="/you-do-misyar-already"
      />

      <section className="gradient-hero text-white py-16">
        <div className="container max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            You Already Practice Misyar
          </h1>
          <p className="text-rose-200 text-lg max-w-2xl mx-auto">
            You just never called it that.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-3xl mx-auto">
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            Misyar gets treated like a fringe arrangement — something whispered about, looked down on, hidden. But strip away the label, and the actual structure of misyar — one spouse forfeiting certain rights (cohabitation, full-time presence, financial maintenance) in exchange for something else they value more — is already woven through ordinary, socially-approved marriages everywhere.
          </p>
          <p className="text-gray-700 leading-relaxed mb-12 text-lg">
            Society just reserves the judgment for when it's named honestly upfront, rather than discovered quietly over years.
          </p>

          <div className="space-y-6 mb-12">
            {scenarios.map((s) => (
              <div key={s.title} className="bg-rose-50 rounded-2xl p-6 border border-rose-100">
                <h3 className="font-serif font-bold text-rose-900 text-lg mb-2">{s.title}</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 text-white rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-3 mb-4">
              <Scale className="w-6 h-6 text-rose-300 flex-shrink-0 mt-1" />
              <h2 className="font-serif text-2xl font-bold">The double standard</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              A wealthy, absent husband who provides stability but not presence is rarely criticized — he's praised as a hard worker, a good provider. That same trade, made openly and by mutual agreement from day one, gets a different reaction entirely when it's a woman choosing intimacy over a managed household, or a couple agreeing to live separately while staying married.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The arrangement isn't the problem. The dishonesty around it is. Misyar simply names the trade everyone else is already making in silence.
            </p>
          </div>

          <div className="flex items-start gap-3 mb-12">
            <Heart className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
            <p className="text-gray-700 leading-relaxed">
              MisyarMatch exists for people who would rather name the trade than hide it — whoever they are, and whatever rights they're choosing to prioritize or forfeit, by mutual, informed, halal agreement.
            </p>
          </div>

          <div className="text-center bg-rose-50 rounded-2xl p-8 border border-rose-100">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
              Stop hiding the arrangement you're already living
            </h2>
            <p className="text-gray-600 mb-6">
              Create a free profile and find someone who wants the same honesty you do.
            </p>
            <a href={getLoginUrl()}>
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white">
                Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
