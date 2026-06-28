import { ArticleLayout } from "./ArticleLayout";
import { FAQ } from "@/components/FAQ";

export default function ArticleHowManyRakats() {
  return (
    <ArticleLayout
      title="How Many Rakats in Each Prayer? The Complete Guide to the Five Daily Prayers"
        slug="how-many-rakats-each-prayer"
        excerpt="Fajr, Dhuhr, Asr, Maghrib, Isha — the complete breakdown of fard and sunnah rakats for every prayer."
      tag="Worship & Purification"
      readTime="7 min"
      date="June 2026"
    >
      <p>The five daily prayers are the second pillar of Islam and the most consistent act of worship in a Muslim's life. Here is the complete breakdown of rakats for each prayer, with notes on the fard (obligatory) and sunnah (recommended) components.</p>

      <h2>Fajr (Dawn Prayer)</h2>
      <ul>
        <li>2 sunnah rakats (qabliyyah — before the fard)</li>
        <li>2 fard rakats</li>
        <li>Total: 4 rakats</li>
      </ul>
      <p>The 2 sunnah rakats of Fajr are among the most emphasized in the Sunnah. The Prophet ﷺ said: <em>"The two rakats of Fajr are better than the world and everything in it."</em> (Muslim) He never abandoned them even when travelling.</p>

      <h2>Dhuhr (Midday Prayer)</h2>
      <ul>
        <li>4 sunnah rakats (qabliyyah)</li>
        <li>4 fard rakats</li>
        <li>2 sunnah rakats (ba'diyyah — after the fard)</li>
        <li>2 optional nafl rakats</li>
        <li>Total fard: 4 | Total with sunnah: 12</li>
      </ul>

      <h2>Asr (Afternoon Prayer)</h2>
      <ul>
        <li>4 sunnah rakats (optional, not strongly emphasized)</li>
        <li>4 fard rakats</li>
        <li>Total fard: 4</li>
      </ul>
      <p>The Prophet ﷺ warned severely against missing Asr: <em>"Whoever misses the Asr prayer, it is as if he has lost his family and his wealth."</em> (Bukhari)</p>

      <h2>Maghrib (Sunset Prayer)</h2>
      <ul>
        <li>3 fard rakats</li>
        <li>2 sunnah rakats (ba'diyyah)</li>
        <li>2 optional nafl rakats</li>
        <li>Total fard: 3 | Total with sunnah: 7</li>
      </ul>

      <h2>Isha (Night Prayer)</h2>
      <ul>
        <li>4 fard rakats</li>
        <li>2 sunnah rakats (ba'diyyah)</li>
        <li>3 witr rakats (strongly emphasized — some scholars consider witr wajib)</li>
        <li>2 optional nafl rakats</li>
        <li>Total fard: 4 | Total with witr and sunnah: 11</li>
      </ul>

      <h2>Jumu'ah (Friday Prayer — Replaces Dhuhr)</h2>
      <ul>
        <li>4 sunnah rakats (before the khutbah)</li>
        <li>2 fard rakats (the Jumu'ah prayer itself, after the khutbah)</li>
        <li>4 sunnah rakats (after)</li>
        <li>2 sunnah rakats (after)</li>
      </ul>

      <h2>For the Traveller</h2>
      <p>The four-rakat prayers (Dhuhr, Asr, Isha) are shortened to 2 rakats when travelling (qasr). The distance threshold for travel varies by madhab — Hanafi: approximately 77km; Maliki and Shafi'i: approximately 80km. The sunnah prayers may be omitted while travelling, though the sunnah of Fajr and witr are recommended to maintain even on the road.</p>

      <FAQ items={[
        { q: "Can I pray all the sunnah prayers every day?", a: "Yes, and it is strongly encouraged. The Prophet ﷺ said the most beloved deeds to Allah are the most consistent ones. Praying the regular sunnah prayers daily builds a powerful spiritual foundation." },
        { q: "What is the difference between sunnah muakkadah and ghair muakkadah?", a: "Sunnah muakkadah (emphasized sunnah) are those the Prophet ﷺ prayed consistently and only abandoned rarely. Missing them repeatedly is discouraged. Sunnah ghair muakkadah are those he prayed sometimes — missing them occasionally is acceptable." },
        { q: "How many rakats is Witr?", a: "Witr can be prayed as 1, 3, 5, 7, 9, or 11 rakats. The minimum is 1 rakat. The most common practice is 3 rakats. It should be the last prayer of the night." },
        { q: "Can I pray Fajr sunnah after the fard if I missed it?", a: "Yes — the sunnah of Fajr can be made up after the fard prayer if it was missed. The Prophet ﷺ made up the Fajr sunnah when he slept through Fajr on one occasion." },
        { q: "Do I have to pray all the sunnah prayers to have my fard accepted?", a: "No — the fard prayers are valid without the sunnah prayers. The sunnah prayers supplement the fard. The Prophet ﷺ said they make up for any deficiencies in the obligatory prayers on the Day of Judgment." },
      ]} />
    </ArticleLayout>
  );
}
