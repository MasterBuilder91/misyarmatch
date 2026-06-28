import { ArticleLayout } from "./ArticleLayout";
import { FAQ } from "@/components/FAQ";

export default function ArticleWudu() {
  return (
    <ArticleLayout
      title="How to Perform Wudu Correctly — The Complete Step-by-Step Guide"
        slug="how-to-perform-wudu"
        excerpt="The obligatory elements, the full sunnah method, what breaks it, and where the four madhabs differ — everything you need."
      tag="Worship & Purification"
      readTime="6 min"
      date="June 2026"
    >
      <p>Wudu (ritual ablution) is required before prayer, before touching the Quran, and for several other acts of worship. The Prophet ﷺ described it as half of faith (iman). Here is the complete, step-by-step guide based on the authentic Sunnah, with notes on where the four madhabs differ.</p>

      <h2>What Requires Wudu</h2>
      <ul>
        <li>The five daily prayers and any voluntary prayers</li>
        <li>Touching the physical Quran (the majority position — Maliki school permits touching without wudu)</li>
        <li>Tawaf (circumambulation of the Ka'bah)</li>
        <li>Sajdat al-Tilawah (prostration of recitation)</li>
      </ul>

      <h2>What Breaks Wudu</h2>
      <ul>
        <li>Anything exiting from the private parts (urine, feces, gas, blood in some madhabs)</li>
        <li>Deep sleep (losing consciousness) — majority position</li>
        <li>Touching the private parts directly with the hand — Shafi'i and Hanbali; not Hanafi</li>
        <li>Skin contact between men and women — Shafi'i position; not Hanafi</li>
        <li>Eating camel meat — Hanbali position based on authentic hadith; not other madhabs</li>
        <li>Loss of consciousness through fainting, intoxication, or illness</li>
      </ul>

      <h2>The Obligatory Elements (Fard) of Wudu</h2>
      <p>Hanafi madhab: four fard acts — washing the face, washing both arms to the elbows, wiping a quarter of the head, washing both feet to the ankles.</p>
      <p>Maliki madhab: seven fard acts — intention, washing the face, washing both arms, wiping the entire head, washing both feet, performing the acts in order, and continuity (not allowing acts to dry before completing).</p>
      <p>Shafi'i/Hanbali: six fard acts — intention, washing the face (including rinsing mouth and nose in Hanbali), washing both arms, wiping part of the head, washing both feet, and performing in order.</p>

      <h2>The Complete Sunnah Method (Step by Step)</h2>
      <ol>
        <li>Make the intention (niyyah) in the heart</li>
        <li>Say <em>Bismillah</em></li>
        <li>Wash both hands three times</li>
        <li>Rinse the mouth three times (madhmadhah)</li>
        <li>Rinse the nose three times — sniffing water in and blowing it out (istinshaq/istinthar)</li>
        <li>Wash the face three times — from hairline to chin, ear to ear</li>
        <li>Wash the right arm three times to and including the elbow, then the left arm three times</li>
        <li>Wipe the head once — the entire head in the Maliki/Hanbali view; part of it in Hanafi/Shafi'i</li>
        <li>Wipe both ears — with the index finger inside, thumb outside</li>
        <li>Wash the right foot three times to and including the ankle, then the left foot</li>
        <li>Say the du'a after wudu: <em>Ashhadu an la ilaha illallah wahdahu la sharika lah, wa ashhadu anna Muhammadan abduhu wa rasuluh. Allahumma aj'alni min al-tawwabin, waj'alni min al-mutatahhirin.</em></li>
      </ol>

      <h2>Wiping Over Socks (Khuff)</h2>
      <p>The Prophet ﷺ permitted wiping over leather socks (khuff) instead of washing the feet — for a resident: 24 hours; for a traveller: 72 hours. Contemporary scholars extend this to thick cotton socks that cover the foot completely. This is one of the practical easements of Islamic law for those on the move.</p>

      <FAQ items={[
        { q: "Does wudu break if I touch my spouse?", a: "This depends on your madhab. In the Shafi\'i school, skin contact between a man and woman breaks wudu. In the Hanafi school, it does not. Follow the ruling of your madhab." },
        { q: "Does laughing break wudu?", a: "Laughing does not break wudu. However, audible laughter during prayer invalidates the prayer in the Hanafi school. Smiling and silent laughter do not affect either wudu or prayer." },
        { q: "Does bleeding break wudu?", a: "In the Hanafi school, flowing blood breaks wudu. In the Shafi\'i and Maliki schools, it does not. This is a significant difference between madhabs." },
        { q: "How long does wudu last?", a: "Wudu remains valid until something breaks it. There is no time limit. You can make wudu in the morning and it remains valid for all prayers as long as nothing breaks it." },
        { q: "Can I pray multiple prayers with one wudu?", a: "Yes — absolutely. One wudu is valid for as many prayers as you wish until something breaks it. The Prophet ﷺ sometimes performed multiple prayers with one wudu." },
      ]} />
    </ArticleLayout>
  );
}
