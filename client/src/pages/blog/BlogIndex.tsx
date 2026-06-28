import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "wouter";
import { useState } from "react";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

export const ARTICLES = [
  {
    slug: "islam-wealth-poverty",
    title: "What Islam Says About Wealth, Poverty, and Why Being Poor Is Not a Sin",
    excerpt: "Muslim communities have a complicated relationship with money. The honest Islamic position is more nuanced than either 'money is spiritual poison' or 'wealth is Allah's blessing.'",
    tag: "Muslim Life",
    readTime: "7 min",
  },
  {
    slug: "islamic-parenting",
    title: "What Islam Actually Says About Raising Children — Beyond the Rules",
    excerpt: "The Prophet ﷺ got on the ground to let his grandsons ride on his back during prayer. The Islamic parenting model was never primarily about enforcement.",
    tag: "Muslim Life",
    readTime: "8 min",
  },
  {
    slug: "student-nikah-university",
    title: "The Student Nikah: How Muslim University Students Can Get Married Before They Graduate",
    excerpt: "You are 20, at university, surrounded by people, and told marriage is for after graduation. The Prophet ﷺ said whoever is able should marry. He did not say whoever has graduated.",
    tag: "Marriage & Relationships",
    readTime: "8 min",
  },
  {
    slug: "misyar-long-distance",
    title: "Long Distance Misyar: Can a Nikah Work Across Cities or Countries?",
    excerpt: "The Muslim world is mobile. The misyar structure already assumes non-cohabitation. Long distance is a degree of difference, not a different category.",
    tag: "Marriage & Fiqh",
    readTime: "7 min",
  },
  {
    slug: "muslim-women-divorce-rights",
    title: "Islamic Divorce Rights: What Every Muslim Woman Needs to Know and Is Never Told",
    excerpt: "What the fiqh guarantees and what women actually receive are often entirely different things — not because the fiqh is unclear, but because the knowledge is withheld.",
    tag: "Fiqh & Rights",
    readTime: "9 min",
  },
  {
    slug: "foreplay-is-sunnah",
    title: "Foreplay Is Sunnah: What the Prophet ﷺ Actually Taught About Intimacy in Marriage",
    excerpt: "The Prophet ﷺ said let there be a messenger between you and your wife. When asked what the messenger was, he said: kisses and words. This is not a Western import. It is prophetic.",
    tag: "Marriage & Intimacy",
    readTime: "7 min",
  },
  {
    slug: "muslim-talking-stage",
    title: "The Muslim 'Talking Stage' Is Not Islamic — And It Is Costing You Everything",
    excerpt: "Months of WhatsApp, growing emotional intimacy, no commitment. It is called halal because it stops short of physical contact. It is not halal. And the damage it does is real.",
    tag: "Marriage & Relationships",
    readTime: "8 min",
  },
  {
    slug: "misyar-nafaqah-financial-support",
    title: "What Happens to Nafaqah (Financial Support) in a Misyar Marriage?",
    excerpt: "The wife typically waives ongoing maintenance in misyar. But what cannot be waived, what happens if she changes her mind, and what remains obligatory regardless.",
    tag: "Fiqh & Rights",
    readTime: "7 min",
  },

  {
    slug: "victorianism-colonised-muslim-sexuality",
    title: "How Victorian Prudishness Colonised Muslim Sexuality — And Why Europeans Abandoned It Before We Did",
    excerpt: "The shame, the silence, the treatment of the body as spiritually suspect — Muslims who hold these attitudes believe they are being Islamic. They are being Victorian. And the Victorians abandoned Victorianism decades ago.",
    tag: "Marriage & Relationships",
    readTime: "12 min",
  },

  {
    slug: "stop-worshipping-virginity",
    title: "Stop Worshipping Virginity: What Islam Actually Says About Human Needs and Growing Up",
    excerpt: "Islam is a religion of needs. When you need to eat, you eat. When you need intimacy, you marry. The deen was never designed to produce people who pretend they have no body.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },

  {
    slug: "how-simple-nikah-is",
    title: "How to Make Two People Halal for Each Other: It Is Embarrassingly Simple",
    excerpt: "A sheikh, a masjid, a hall, a feast, forty people with opinions. They convinced you all of it is required. Every single part of that list — except one — is cultural addition with no basis in Islamic law.",
    tag: "Marriage & Fiqh",
    readTime: "10 min",
  },

  {
    slug: "turkish-muslim-man-emotional-unavailability",
    title: "The Turkish Muslim Man Who Cannot Cry in Front of His Wife",
    excerpt: "He built the business. He provides generously. He is respected by everyone. His wife has never seen him afraid. She is married to a performance of a man rather than a man.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "black-american-muslim-marriage-loneliness",
    title: "Black American Muslim Marriage and the Specific Loneliness Nobody Names",
    excerpt: "He converted at 24. He found Islam and became genuinely Muslim. Then he walked into the community and discovered it was not always sure what to do with him.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "muslim-woman-married-abuser-imam-said-sabr",
    title: "The Muslim Woman Who Married Her Abuser Because the Imam Said Sabr",
    excerpt: "She went to the imam. She told him her husband hit her. He told her to be patient. She went home. It happened again. This is what Islam actually says about this.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "what-does-islam-say-about-suicide",
    title: "What Does Islam Say About Suicide? A Complete and Compassionate Guide",
    excerpt: "If you are reading this because you are struggling — this is written with you in mind. Not as a lecture. As a genuine attempt to give you what Islam actually says, including the mercy.",
    tag: "Muslim Life",
    readTime: "9 min",
  },
  {
    slug: "how-to-pray-tahajjud",
    title: "How to Pray Tahajjud: The Night Prayer That Changes Everything",
    excerpt: "The Prophet ﷺ never abandoned it. His companions competed for it. Understanding why requires understanding what happens in those quiet hours when the world is asleep.",
    tag: "Worship & Du'a",
    readTime: "7 min",
  },
  {
    slug: "is-wasting-food-haram",
    title: "Is Wasting Food Haram in Islam? What the Quran and Sunnah Actually Say",
    excerpt: "The Prophet ﷺ instructed his companions to lick the bowl and the fingers. His relationship with food was one of profound gratitude and zero tolerance for waste.",
    tag: "Muslim Life",
    readTime: "5 min",
  },
  {
    slug: "misyar-spouses-celebrate-eid",
    title: "Can Misyar Spouses Celebrate Eid Together? And Other Practical Holiday Questions",
    excerpt: "Yes — and there is no Islamic reason they cannot. Here is the complete practical picture for Eid al-Fitr and Eid al-Adha in a misyar marriage.",
    tag: "Worship & Fiqh",
    readTime: "6 min",
  },
  {
    slug: "is-music-haram-during-ramadan",
    title: "Is Music Haram During Ramadan Specifically? What Changes in the Sacred Month",
    excerpt: "There is no specific hadith singling out music as prohibited during Ramadan while permitted otherwise. Here is what actually changes — and what does not.",
    tag: "Halal & Haram",
    readTime: "6 min",
  },
  {
    slug: "muslim-men-marry-christian-jewish-women",
    title: "Muslim Men and the Permission They Forgot: Marrying Christian and Jewish Women in the West",
    excerpt: "A Quranic permission so clear, so explicit, so unambiguous — buried so thoroughly by cultural pressure that millions of Muslim men in the West do not know it exists.",
    tag: "Marriage & Fiqh",
    readTime: "10 min",
  },
  {
    slug: "pornography-destroys-muslim-marriages",
    title: "What Muslim Men Learn About Women From Pornography — And Why It Destroys Their Marriages",
    excerpt: "For most Muslim men in the West, pornography was their first detailed education about intimacy. That education was wrong in almost every important way. Here is what Al-Ghazali taught instead.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "somali-muslim-marriage-culture",
    title: "The Somali Muslim Marriage and What the Culture Cost Her",
    excerpt: "She is Muslim, she is 31, and she grew up watching aunts navigate marriages where everyone had strong opinions except about whether the two people involved actually wanted each other.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "mother-in-law-destroys-muslim-marriage",
    title: "The Mother-in-Law Who Destroyed the Marriage: Islam's Actual Position on Interference",
    excerpt: "She loved her son. She believed her involvement was protective. The Islamic scholars are explicit about a wife's right to a private household — rights that interference violates.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "bdsm-and-islam",
    title: "BDSM and Islam: What the Fiqh Actually Says About Power, Consent, and Intimacy in Marriage",
    excerpt: "If you found this through a search about BDSM, welcome. You are not going to be lectured. You are going to get an honest engagement with what Islamic scholarship says — and you might be surprised.",
    tag: "Marriage & Intimacy",
    readTime: "10 min",
  },
  {
    slug: "bestiality-accusation-islam-fiqh",
    title: "The Accusation of Bestiality Against Muslims: What the Fiqh Actually Says",
    excerpt: "This accusation is false. The classical scholars addressed it directly and explicitly. Here is the complete, scholarship-backed rebuttal — and what Islam is actually promoting.",
    tag: "Belief & Creed",
    readTime: "8 min",
  },
  {
    slug: "msa-students-get-the-nikah",
    title: "MSA Students: Get the Nikah. Before You Do Something You Cannot Take Back.",
    excerpt: "Taqwa, even when it looks tacky to the naysayers. Nikah, even when nobody throws you a party. The Prophet ﷺ said marry whoever is able — not whoever has graduated.",
    tag: "Marriage & Relationships",
    readTime: "9 min",
  },
  {
    slug: "misyar-wife-counts-four-wives",
    title: "Does a Misyar Wife Count Toward the Limit of Four Wives?",
    excerpt: "Yes. Unambiguously. A misyar wife is a wife. This is one of the clearest indicators of the misyar marriage's full legal status — and every man considering one must understand this.",
    tag: "Fiqh & Rights",
    readTime: "6 min",
  },
  {
    slug: "abortion-ruling-in-islam",
    title: "What Is the Islamic Ruling on Abortion? The Complete Scholarly Picture",
    excerpt: "Neither absolute prohibition nor unrestricted permission. The Islamic framework is stage-based, reason-dependent, and genuinely nuanced. Here is the complete, honest picture.",
    tag: "Fiqh & Rights",
    readTime: "9 min",
  },
  {
    slug: "how-to-perform-wudu",
    title: "How to Perform Wudu Correctly — The Complete Step-by-Step Guide",
    excerpt: "The obligatory elements, the full sunnah method, what breaks it, and where the four madhabs differ — everything you need.",
    tag: "Worship & Purification",
    readTime: "6 min",
  },
  {
    slug: "sister-wives-polygyny-islamic-boundaries",
    title: "Sister Wives, Polygyny, and Where Islam Draws the Line — Completely",
    excerpt: "The modern 'sister wives' concept sounds like beautiful bonding. Islam draws clear, precise, fiqh-backed lines around what co-wives owe each other — and what they absolutely do not.",
    tag: "Marriage & Fiqh",
    readTime: "11 min",
  },
  {
    slug: "pakistani-muslim-woman-wanted",
    title: "The Pakistani Muslim Woman Who Wants to Be Wanted",
    excerpt: "She carries the weight of her family's expectations, her community's gaze, and a culture that has grafted its ideas onto Islamic language. She has never been given permission to want what she actually wants.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "arab-husband-stopped-seeing-wife",
    title: "The Arab Husband and the Wife He Stopped Seeing",
    excerpt: "He married her when she was 22 and he was 27. Fifteen years later she is still beautiful. He has stopped seeing her entirely. Not because he is cruel. Because he stopped looking.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "convert-muslim-marriage-culture-shock",
    title: "What Converts to Islam Were Never Told About Muslim Marriage Culture",
    excerpt: "You took your shahada. You were welcomed. Then you tried to get married in this community. And you discovered the door was much narrower than advertised.",
    tag: "New Muslims",
    readTime: "10 min",
  },
  {
    slug: "what-does-islam-say-about-lgbtq",
    title: "What Does Islam Say About LGBTQ? The Clear Ruling and the Compassionate Response",
    excerpt: "The scholarly ruling is unanimous. The pastoral response requires more nuance than either side of the cultural debate usually provides.",
    tag: "Belief & Creed",
    readTime: "9 min",
  },
  {
    slug: "can-muslims-have-non-muslim-friends",
    title: "Can Muslims Have Non-Muslim Friends? The Complete Ruling With Context",
    excerpt: "Misunderstood in both directions. The actual ruling is more contextual and more human than either extreme suggests.",
    tag: "Muslim Life",
    readTime: "7 min",
  },
  {
    slug: "how-to-make-tawbah",
    title: "How to Make Tawbah (Repentance) in Islam — And Whether Allah Really Forgives Everything",
    excerpt: "Allah is more pleased with the repentance of His slave than one of you finding a lost camel in the desert. This is what He is like. Here is how tawbah actually works.",
    tag: "Worship & Du'a",
    readTime: "7 min",
  },
  {
    slug: "dua-before-sleeping",
    title: "Dua Before Sleeping: The Prophetic Nighttime Routine That Changes Everything",
    excerpt: "The complete Sunnah nighttime routine — Ayat al-Kursi, the three Quls, the tasbih of Fatimah, and the du'a the Prophet ﷺ said before surrendering to sleep.",
    tag: "Worship & Du'a",
    readTime: "6 min",
  },
  {
    slug: "misyar-for-muslim-expat",
    title: "Misyar for the Muslim Expat: The Halal Solution to the Longest Years of Your Life",
    excerpt: "London for two years. Dubai before that. Riyadh before that. The career is excellent. The loneliness is real. Islam has always had a halal answer for this exact situation.",
    tag: "Marriage & Relationships",
    readTime: "9 min",
  },
  {
    slug: "misyar-in-the-gulf",
    title: "Misyar in the Gulf: How It Actually Works on the Ground",
    excerpt: "Not an abstract fiqh concept — a living practice. Who does misyar in Saudi Arabia and the UAE, why, and what the arrangements actually look like.",
    tag: "Marriage & Relationships",
    readTime: "8 min",
  },
  {
    slug: "misyar-wife-travel-permission",
    title: "Does a Misyar Wife Need Her Husband's Permission to Travel?",
    excerpt: "The ruling on travel permission in a misyar arrangement — where her independence was part of the deal from the start.",
    tag: "Fiqh & Rights",
    readTime: "6 min",
  },
  {
    slug: "how-does-misyar-marriage-end",
    title: "How Does a Misyar Marriage End? Talaq, Khul', and What Each Party Is Owed",
    excerpt: "A misyar marriage ends the same way any Islamic marriage ends. Here is what each party is owed and what happens during the iddah.",
    tag: "Fiqh & Rights",
    readTime: "7 min",
  },
  {
    slug: "married-wrong-woman-mothers-choice",
    title: "The Muslim Man Who Married the Wrong Woman Because His Mother Chose",
    excerpt: "He said yes because he did not know how to say no. He has been saying yes ever since — to a life correct in every external detail and empty in every internal one.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "muslim-women-who-never-marry",
    title: "What Happens to Muslim Women Who Never Marry — The Reality Nobody Prepares Them For",
    excerpt: "There is a growing cohort of Muslim women in their late 30s and beyond who did everything right and were still failed by the system. This is what Islam actually offers them now.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "halal-marriage-dead-bedroom",
    title: "When the Marriage Is Halal But the Bedroom Is Dead",
    excerpt: "The nikah is valid. The household functions. For months — sometimes years — they have not touched each other with any real intention. Islam has both a diagnosis and a prescription.",
    tag: "Marriage & Intimacy",
    readTime: "10 min",
  },
  {
    slug: "what-is-zakat",
    title: "What Is Zakat and Who Must Pay It? The Complete Guide Including the Nisab for 2026",
    excerpt: "Zakat is precisely defined — 2.5% of eligible wealth held above the nisab for a full lunar year. Here is everything you need to know, including the misyar wife question.",
    tag: "Worship & Fiqh",
    readTime: "8 min",
  },
  {
    slug: "how-many-rakats-each-prayer",
    title: "How Many Rakats in Each Prayer? The Complete Guide to the Five Daily Prayers",
    excerpt: "Fajr, Dhuhr, Asr, Maghrib, Isha — the complete breakdown of fard and sunnah rakats for every prayer.",
    tag: "Worship & Purification",
    readTime: "7 min",
  },
  {
    slug: "dua-for-anxiety-stress",
    title: "Dua for Anxiety and Stress: What the Prophet ﷺ Taught and What It Actually Does",
    excerpt: "The Prophet ﷺ experienced anxiety and grief. He navigated them with specific practices he taught to his companions. These are not metaphors — they are real tools.",
    tag: "Worship & Du'a",
    readTime: "6 min",
  },
  {
    slug: "is-masturbation-haram",
    title: "Is Masturbation Haram in Islam? The Scholarly Debate and the Real Prescription",
    excerpt: "The majority position, the minority position, and what Islam actually prescribes for the underlying need — which is not masturbation.",
    tag: "Halal & Haram",
    readTime: "7 min",
  },
  {
    slug: "zakat-al-fitr-misyar-wife",
    title: "Zakat al-Fitr: Who Must Pay It — And Does a Man Pay It for His Misyar Wife?",
    excerpt: "Yes — and the answer reveals something important: a misyar wife is a real wife, with the rights and obligations that come with that status.",
    tag: "Worship & Fiqh",
    readTime: "7 min",
  },
  {
    slug: "does-misyar-wife-inherit",
    title: "Does a Misyar Wife Inherit From Her Husband? The Complete Ruling",
    excerpt: "Yes. The inheritance share is set by Allah in the Quran. It cannot be waived by private agreement. The misyar wife inherits.",
    tag: "Fiqh & Rights",
    readTime: "7 min",
  },
  {
    slug: "misyar-and-ramadan",
    title: "Misyar and Ramadan: Fasting, Intimacy, and the Rights That Don't Pause",
    excerpt: "The misyar marriage in Ramadan — what is permitted at night, what is prohibited during the day, and what obligations remain regardless of the structure.",
    tag: "Worship & Fiqh",
    readTime: "7 min",
  },
  {
    slug: "misyar-wife-iddah",
    title: "What Is the Iddah of a Misyar Wife After Divorce or Death?",
    excerpt: "The iddah applies fully to the misyar wife — and during it, her husband owes her maintenance he may have been exempted from before.",
    tag: "Fiqh & Rights",
    readTime: "7 min",
  },
  {
    slug: "misyar-marriage-children-rights",
    title: "If a Misyar Wife Becomes Pregnant: Children's Rights and Lineage in Islamic Law",
    excerpt: "The child of a misyar marriage has full rights in Islamic law. Full lineage. Full inheritance. Full financial support. The arrangement does not change this.",
    tag: "Fiqh & Rights",
    readTime: "7 min",
  },
  {
    slug: "misyar-husband-mahram-hajj",
    title: "Can a Misyar Husband Serve as Mahram for His Wife's Hajj?",
    excerpt: "Yes — he is her husband, and therefore her mahram. The misyar structure affects the arrangement, not the identity.",
    tag: "Worship & Fiqh",
    readTime: "6 min",
  },
  {
    slug: "is-riba-haram-mortgages",
    title: "Is Riba (Interest) Haram? Mortgages, Student Loans, and What the Scholars Actually Say",
    excerpt: "Few prohibitions are more clearly established and more widely violated. Here is the complete picture — including the difficult mortgage question Muslims are actually living with.",
    tag: "Halal & Haram",
    readTime: "9 min",
  },
  {
    slug: "is-hijab-obligatory",
    title: "Is Hijab Obligatory in Islam? The Scholarly Evidence on Both Sides",
    excerpt: "The most politically charged question in contemporary Islam deserves a clear, honest engagement with what the scholarship actually says.",
    tag: "Halal & Haram",
    readTime: "8 min",
  },
  {
    slug: "muslim-marry-non-muslim",
    title: "Can a Muslim Marry a Non-Muslim? The Complete Ruling for Men and Women",
    excerpt: "The ruling is different for men and women, and the reasoning matters. Here is the complete picture — clearly, without political softening.",
    tag: "Fiqh & Rights",
    readTime: "8 min",
  },
  {
    slug: "is-smoking-haram",
    title: "Is Smoking Haram in Islam? The Modern Fatwa and the Classical Principles",
    excerpt: "No Quranic text addresses tobacco directly. The majority contemporary position derives from classical principles applied to modern medical knowledge — and it is clear.",
    tag: "Halal & Haram",
    readTime: "6 min",
  },
  {
    slug: "attractive-muslim-women-50s",
    title: "The Attractive Muslim Woman in Her 50s That Nobody Is Asking About",
    excerpt: "She is sharp, warm, beautiful, and has desires that did not retire when she turned 50. She is supposed to pretend otherwise. Islam does not agree.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "age-gap-marriages-islam",
    title: "Age Gap Marriages in Islam: The Historical Reality vs. the Cultural Discomfort",
    excerpt: "Umm Ayman and Zayd. Khadijah and the Prophet ﷺ. The most respected marriages in Islamic history involved older women and younger men. The Prophet arranged them himself.",
    tag: "Marriage & Relationships",
    readTime: "9 min",
  },
  {
    slug: "two-adults-attracted-misyar",
    title: "Two Muslim Adults Who Like Each Other. Lives That Cannot Merge. The Solution Has Always Been There.",
    excerpt: "Two people. Mutual attraction. A hundred reasons the conventional marriage does not fit. So they do nothing. And one of them eventually finds somewhere less halal to put it.",
    tag: "Marriage & Relationships",
    readTime: "8 min",
  },
  {
    slug: "divorced-muslim-mother-misyar",
    title: "The Divorced Muslim Mother Who Doesn't Want Her Life Taken Over Again",
    excerpt: "She rebuilt. She wants connection. She does not want to hand her independence to someone else again and hope for the best. Islam has an answer for exactly this.",
    tag: "Marriage & Relationships",
    readTime: "9 min",
  },
  {
    slug: "misyar-not-legal-zina",
    title: "'Misyar Is Just Legal Zina': Dismantling the Most Common Objection",
    excerpt: "This objection sounds serious. It sounds Islamic. It is neither. Here is why — carefully, from the scholarship, without dismissing the concern behind it.",
    tag: "Fiqh & Rights",
    readTime: "9 min",
  },
  {
    slug: "muslim-convert-woman-marriage",
    title: "The Muslim Convert Woman Nobody Wants to Marry — And the Fiqh That Protects Her",
    excerpt: "She took her shahada. She changed her life. She became genuinely Muslim. And then she discovered her welcome into parts of the ummah was conditional.",
    tag: "New Muslims",
    readTime: "9 min",
  },
  {
    slug: "husband-provides-everything-except-himself",
    title: "The Husband Who Provides Everything Except Himself",
    excerpt: "She has the house, the car, the holidays. What she does not have is her husband. And nobody will validate that this is a problem worth naming.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "muslim-men-terrified-of-desire",
    title: "Why Muslim Men Are Terrified of Their Own Desires",
    excerpt: "He has been taught that strong desire is weakness. He has not been told that Islam built an entire institution specifically to serve it.",
    tag: "Marriage & Relationships",
    readTime: "9 min",
  },
  {
    slug: "good-muslim-girl-dying-inside",
    title: "The Good Muslim Girl Who Is Dying Inside",
    excerpt: "She does everything right. She covers. She prays. She has not told anyone about the thing that is slowly eating her alive.",
    tag: "Marriage & Intimacy",
    readTime: "9 min",
  },
  {
    slug: "mahr-status-symbol",
    title: "What Happened to Muslim Marriages When We Made Mahr a Status Symbol",
    excerpt: "The Prophet ﷺ said the best mahr is the simplest. Then we turned it into a financial negotiation that is blocking millions of Muslims from nikah.",
    tag: "Marriage & Fiqh",
    readTime: "9 min",
  },
  {
    slug: "muslim-widow-move-on",
    title: "The Muslim Widow Who Is Not Allowed to Move On",
    excerpt: "The Prophet ﷺ married widows. The companions married widows. Islam gives her four months and ten days. Her community gives her permanent mourning.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "misyar-already-married",
    title: "Misyar When You Are Already Married: The Fiqh, the Conditions, and the Honesty Required",
    excerpt: "Yes, a married man can enter a misyar arrangement. Here are the conditions that are serious, non-negotiable, and often ignored.",
    tag: "Fiqh & Rights",
    readTime: "9 min",
  },
  {
    slug: "misyar-divorced-woman-no-wali",
    title: "Misyar for a Divorced Muslim Woman Without a Wali: Is It Valid?",
    excerpt: "The answer across the scholarly tradition is more accessible than most women have been told. Here is the complete fiqh picture.",
    tag: "Fiqh & Rights",
    readTime: "8 min",
  },
  {
    slug: "misyar-nikah-private-valid",
    title: "Is a Misyar Nikah Valid If Only a Few People Know About It?",
    excerpt: "Privacy is one of the most common reasons people seek misyar — and one of the most common sources of anxiety about its validity.",
    tag: "Fiqh & Rights",
    readTime: "7 min",
  },
  {
    slug: "loneliness-muslim-communities",
    title: "The Loneliness Epidemic in Muslim Communities — And the Answer Islam Has Always Had",
    excerpt: "The WHO classifies loneliness as a global health epidemic. It is happening inside Muslim communities that have the theological resources to address it — and the cultural rigidity to prevent addressing it.",
    tag: "Muslim Life",
    readTime: "9 min",
  },
  {
    slug: "victorian-muslim-marriage",
    title: "The Victorian Muslim Wedding: Why We Built a Beautiful Trap and Called It Deen",
    excerpt: "The walimah with 300 guests. The bride in gold. The sheikh with tears in his eyes. It is beautiful. It is also destroying people. Let's be honest about both.",
    tag: "Marriage & Relationships",
    readTime: "11 min",
  },
  {
    slug: "pornography-muslim-men",
    title: "The Epidemic Nobody Talks About in the Masjid: Pornography and the Muslim Man",
    excerpt: "Between 50-70% of Muslim men report regular pornography use. Including practicing ones. The silence is costing us more than the conversation ever could.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "muslim-divorce-spiral",
    title: "What Nobody Tells You About Muslim Divorce: The Spiral Is Real and It Is Coming",
    excerpt: "Everyone prepares you for the marriage. Nobody prepares you for what comes after the divorce. This is that preparation.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "muslim-woman-desire",
    title: "The Muslim Woman's Desire That Nobody Is Allowed to Name",
    excerpt: "We are going to name it. Because the silence has consequences, and the consequences are real, and they are happening to real women right now.",
    tag: "Marriage & Intimacy",
    readTime: "9 min",
  },
  {
    slug: "arranged-marriage-reality",
    title: "Arranged Marriage: The Beautiful Idea That Became a Family Business Merger",
    excerpt: "Arranged marriage, done right, is one of the most sensible institutions in human history. Let's give it that credit — before we look at what it has become.",
    tag: "Marriage & Relationships",
    readTime: "10 min",
  },
  {
    slug: "waiting-for-perfect-marriage",
    title: "Waiting for the Perfect Muslim Marriage Is Making You Worse at Being Muslim",
    excerpt: "The standard is beautiful. The standard is also destroying people. Let's be honest about both.",
    tag: "Marriage & Relationships",
    readTime: "9 min",
  },
  {
    slug: "being-the-second-wife",
    title: "Being the Second Wife: What Nobody Tells You — And What Islam Actually Guarantees You",
    excerpt: "The most misunderstood, most stigmatised, and most legally protected position in Islamic marriage law.",
    tag: "Marriage & Fiqh",
    readTime: "10 min",
  },
  {
    slug: "halal-dating-contradiction",
    title: "'Halal Dating' Is a Contradiction — And the Alternative Is Better Than You Think",
    excerpt: "The desire behind it is real and legitimate. The concept itself is a contradiction. And the workable alternative is simpler than most people realise.",
    tag: "Marriage & Relationships",
    readTime: "8 min",
  },
  {
    slug: "muslim-women-sexuality-classical",
    title: "What Classical Islamic Scholars Said About Female Sexuality — And Why We Stopped Saying It",
    excerpt: "For centuries, Muslim scholars wrote about this with frankness that would make contemporary Muslims uncomfortable. They were not being immodest. They were being scholars.",
    tag: "Marriage & Intimacy",
    readTime: "9 min",
  },
  {
    slug: "music-in-islam",
    title: "Is Music Haram in Islam? The Full Scholarly Debate",
    excerpt: "Few Islamic questions generate more debate. This is not a simple yes or no — there is genuine scholarly disagreement, and honest Muslims deserve an honest explanation.",
    tag: "Halal & Haram",
    readTime: "8 min",
  },
  {
    slug: "boyfriend-girlfriend-islam",
    title: "Is It Haram to Have a Boyfriend or Girlfriend in Islam?",
    excerpt: "Yes — but Islam's answer is not celibacy and suffering. It is nikah. And the path to nikah is more accessible than most people realise.",
    tag: "Halal & Haram",
    readTime: "5 min",
  },
  {
    slug: "how-to-perform-ghusl",
    title: "How to Perform Ghusl Correctly — The Complete Islamic Guide",
    excerpt: "Step-by-step ghusl from the Sunnah of the Prophet ﷺ, with notes on where the four madhabs differ.",
    tag: "Worship & Purification",
    readTime: "6 min",
  },
  {
    slug: "is-crypto-halal",
    title: "Is Cryptocurrency Halal or Haram? The Scholarly Debate in 2026",
    excerpt: "The disagreement is genuine, the arguments are substantive, and the honest answer is: it depends.",
    tag: "Halal & Haram",
    readTime: "7 min",
  },
  {
    slug: "birthdays-in-islam",
    title: "Can Muslims Celebrate Birthdays? What the Scholars Say",
    excerpt: "The fatwa landscape is genuinely divided — and cultural background often shapes the answer more than the actual fiqh does.",
    tag: "Halal & Haram",
    readTime: "5 min",
  },
  {
    slug: "depression-and-islam",
    title: "What Does Islam Say About Depression and Mental Health?",
    excerpt: "A Muslim struggling with mental health is not weak in faith. Islam addresses this with both spiritual and practical guidance.",
    tag: "Muslim Life",
    readTime: "7 min",
  },
  {
    slug: "tattoos-in-islam",
    title: "Are Tattoos Haram in Islam? The Evidence and the Nuance",
    excerpt: "The majority position, the evidence behind it, and what it means for converts who had tattoos before Islam.",
    tag: "Halal & Haram",
    readTime: "5 min",
  },
  {
    slug: "how-to-convert-to-islam",
    title: "How to Convert to Islam — And What Actually Changes After the Shahada",
    excerpt: "The process is simple. The life after is rich, challenging, and transformative. Here is what you need to know.",
    tag: "New Muslims",
    readTime: "8 min",
  },
  {
    slug: "what-happens-after-death-islam",
    title: "What Happens After Death in Islam — The Complete Picture",
    excerpt: "From the moment of death through the Day of Judgment — the complete journey, drawn entirely from Quran and authentic Sunnah.",
    tag: "Belief & Creed",
    readTime: "9 min",
  },
  {
    slug: "missing-friday-prayer",
    title: "Is It Haram to Miss Friday Prayer (Jumu'ah)? The Ruling and the Warning",
    excerpt: "Missing Jumu'ah without a valid excuse is a major sin with serious prophetic warnings. Here is the ruling, clearly stated.",
    tag: "Worship",
    readTime: "5 min",
  },
  {
    slug: "nikah-first-always",
    title: "Is It Haram to Be in a Relationship? Islam's Answer Is Simple: Nikah First. Always.",
    excerpt: "Yes, a romantic relationship outside of marriage is haram. But Islam's answer is not 'be alone and suffer.' It is: get married. The path is simpler than you think.",
    tag: "Marriage & Relationships",
    readTime: "6 min",
  },
  {
    slug: "talking-before-marriage",
    title: "Is It Haram to Talk to a Girl or Guy Before Marriage?",
    excerpt: "One of the most searched Islamic questions online — and one of the most honestly contested. Here is what the scholars actually say.",
    tag: "Marriage & Relationships",
    readTime: "6 min",
  },
  {
    slug: "wali-rights-thayyib",
    title: "Can a Muslim Woman Marry Without a Wali? The Thayyib and Her Rights Across All Four Madhabs",
    excerpt: "The answer depends on one distinction the scholars have always made: is she a bikr or a thayyib? Here is the complete fiqh picture.",
    tag: "Fiqh & Rights",
    readTime: "9 min",
  },
  {
    slug: "secret-nikah",
    title: "Is a Nikah Valid Without Parents' Knowledge? What the Scholars Actually Say",
    excerpt: "The conditions for a valid nikah do not include parental approval. Here is what is actually required — and what is not.",
    tag: "Fiqh & Rights",
    readTime: "7 min",
  },
  {
    slug: "loneliness-in-islam",
    title: "What Islam Says About Loneliness — And Why the Answer Is Always Nikah",
    excerpt: "Islam does not tell lonely Muslims to simply wait and suffer. It prescribes marriage — and the path to that marriage is more accessible than most people know.",
    tag: "Muslim Life",
    readTime: "6 min",
  },
  {
    slug: "dua-for-spouse",
    title: "Dua for Finding a Righteous Spouse — And What Islam Says You Must Do Alongside It",
    excerpt: "The authentic supplications from Quran and Sunnah, plus what the scholars say about the obligation to take action alongside your du'a.",
    tag: "Worship & Du'a",
    readTime: "5 min",
  },
  {
    slug: "wifes-rights-in-islam",
    title: "A Wife's Rights in Islam — Including the One Most Husbands Don't Know About",
    excerpt: "Most Muslims know the basics. Far fewer know the full picture — including a right that modern Muslim culture has almost completely suppressed.",
    tag: "Rights & Fiqh",
    readTime: "8 min",
  },
  {
    slug: "intimacy-in-islam",
    title: "Foreplay Is Sunnah: What Classical Islamic Scholars Said About Intimacy in Marriage",
    excerpt: "Classical scholars wrote openly about intimacy. Modern Muslim culture suppressed it. Here is what Islam has always actually said.",
    tag: "Marriage & Intimacy",
    readTime: "7 min",
  },
  {
    slug: "woman-divorce-islam",
    title: "Can a Muslim Woman Divorce Her Husband? Her Full Rights in Islamic Law",
    excerpt: "Yes — and the Islamic basis for this is clearer and stronger than most Muslim women are ever told. Here is the complete picture.",
    tag: "Rights & Fiqh",
    readTime: "7 min",
  },
  {
    slug: "second-marriage-islam",
    title: "Second Marriage in Islam: Rights, Rules, and What Your First Wife Is Actually Owed",
    excerpt: "The permission is real. The conditions are equally real. Here is what Islamic law actually requires of a man who remarries.",
    tag: "Marriage & Fiqh",
    readTime: "8 min",
  },
  {
    slug: "muslim-woman-living-alone",
    title: "Can a Muslim Woman Live Alone? What Islam Actually Says",
    excerpt: "The answer is more nuanced than either cultural extreme. Here is the fiqh, plainly explained.",
    tag: "Muslim Life",
    readTime: "6 min",
  },
  {
    slug: "muslim-marriage-after-divorce",
    title: "Muslim Marriage After Divorce: A Complete Guide for 2025",
    excerpt: "Divorce ends a chapter — not your right to companionship. Millions of Muslim divorcees are navigating remarriage with no roadmap. This is that roadmap.",
    tag: "Remarriage",
    readTime: "8 min",
  },
  {
    slug: "long-distance-islamic-marriage",
    title: "Long-Distance Islamic Marriage: How It Works and Why More Muslims Are Choosing It",
    excerpt: "A husband in Houston, a wife in Casablanca. Children raised between two worlds. This is not unusual — it is misyar in practice, and it works.",
    tag: "Long Distance",
    readTime: "7 min",
  },
  {
    slug: "muslim-widows-remarriage",
    title: "Muslim Widows and Remarriage: Breaking the Silence",
    excerpt: "The Prophet ﷺ married widows. The companions married widows. Yet Muslim widows today face more stigma than any other group seeking remarriage. It has to stop.",
    tag: "Widowhood",
    readTime: "8 min",
  },
  {
    slug: "why-muslims-stay-single",
    title: "Why So Many Muslims Stay Single — And What Nobody Is Saying About It",
    excerpt: "It is not a lack of faith. It is not a lack of desire. It is a broken system that was never built for the realities of modern Muslim life.",
    tag: "Singles",
    readTime: "9 min",
  },
  {
    slug: "halal-alternatives-to-dating",
    title: "Halal Alternatives to Dating Culture: What Islam Actually Offers",
    excerpt: "Muslims are not choosing between marriage and dating. They are choosing between a system that works and one that doesn't. Here is what actually works.",
    tag: "Islamic Values",
    readTime: "7 min",
  },
  {
    slug: "muslim-single-parents-marriage",
    title: "Marriage for Muslim Single Parents: A Realistic Guide",
    excerpt: "You have children. You have a life. You have real needs. Here is how Muslim single parents approach remarriage without pretending the complications don't exist.",
    tag: "Single Parents",
    readTime: "8 min",
  },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  "Marriage & Relationships": { bg: "#FEE2E2", text: "#991B1B" },
  "Fiqh & Rights": { bg: "#FEF3C7", text: "#92400E" },
  "Halal & Haram": { bg: "#D1FAE5", text: "#065F46" },
  "Muslim Life": { bg: "#DBEAFE", text: "#1E40AF" },
  "Worship & Purification": { bg: "#EDE9FE", text: "#5B21B6" },
  "Worship & Du'a": { bg: "#EDE9FE", text: "#5B21B6" },
  "Worship": { bg: "#EDE9FE", text: "#5B21B6" },
  "Rights & Fiqh": { bg: "#FEF3C7", text: "#92400E" },
  "Marriage & Intimacy": { bg: "#FEE2E2", text: "#991B1B" },
  "Marriage & Fiqh": { bg: "#FEE2E2", text: "#991B1B" },
  "New Muslims": { bg: "#CCFBF1", text: "#065F46" },
  "Belief & Creed": { bg: "#E0E7FF", text: "#3730A3" },
  "Singles": { bg: "#FCE7F3", text: "#9D174D" },
  "Remarriage": { bg: "#FEE2E2", text: "#991B1B" },
  "Long Distance": { bg: "#E0F2FE", text: "#075985" },
  "Widowhood": { bg: "#F1F5F9", text: "#334155" },
  "Islamic Values": { bg: "#D1FAE5", text: "#065F46" },
  "Single Parents": { bg: "#FFEDD5", text: "#9A3412" },
};

function getTagStyle(tag: string) {
  return TAG_COLORS[tag] ?? { bg: "#F3F4F6", text: "#374151" };
}


const ALL_CATEGORIES = ["All", ...Array.from(new Set(ARTICLES.map(a => a.tag))).sort()];
const PAGE_SIZE = 12;

export default function BlogIndex() {
  const featured = ARTICLES[0];
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = activeCategory === "All"
    ? ARTICLES.slice(1)
    : ARTICLES.filter(a => a.tag === activeCategory);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <Layout>
      <SEOHead
        title="MisyarMatch Blog — Muslim Marriage, Misyar, Islamic Law & Halal Life"
        description="In-depth articles on misyar marriage, Islamic fiqh, Muslim remarriage, halal relationships, worship, and everyday Islamic questions. Written by a practicing cleric."
        keywords="Muslim marriage blog, misyar marriage articles, Islamic fiqh questions, halal haram, Muslim life guidance"
        canonical="/blog"
      />

      {/* Hero */}
      <section
        className="text-white pt-20 pb-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D0B14 0%, #3B1328 55%, #7C1D2E 100%)" }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-white" style={{ transform: "translate(20%, -20%)" }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full border border-white" style={{ transform: "translate(-20%, 20%)" }} />
        </div>
        <div className="container max-w-4xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{ background: "rgba(184,150,90,0.15)", border: "1px solid rgba(184,150,90,0.4)", color: "#D4AF7A" }}>
            <BookOpen className="w-3.5 h-3.5" /> Knowledge Centre
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-5 leading-tight">
            The MisyarMatch Blog
          </h1>
          <p className="text-rose-200/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Honest writing on Muslim marriage, misyar nikah, Islamic fiqh, and building halal relationships in the modern world.
          </p>
          <div className="mt-8 text-sm text-rose-300/60">
            {ARTICLES.length} articles · Written by Abu Salman
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: "#F7F3EF" }}>
        <div className="container max-w-5xl mx-auto">

          {activeCategory === "All" && page === 1 && (
          <Link href={`/blog/${featured.slug}`}>
            <div
              className="group mb-10 rounded-3xl overflow-hidden cursor-pointer transition-all hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #0D0B14 0%, #3B1328 55%, #7C1D2E 100%)",
                boxShadow: "0 8px 40px rgba(124,29,46,0.25)"
              }}
            >
              <div className="p-10 md:p-14">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: getTagStyle(featured.tag).bg, color: getTagStyle(featured.tag).text }}
                  >
                    {featured.tag}
                  </span>
                  <span className="text-xs text-rose-300/60">{featured.readTime} read</span>
                  <span className="text-xs text-rose-300/60 ml-auto flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block" /> Featured
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-rose-100 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-rose-200/70 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#D4AF7A" }}>
                  Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>)}

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                style={activeCategory === cat
                  ? { background: "#7C1D2E", color: "#fff" }
                  : { background: "#fff", color: "#6B7280", border: "1px solid #E5E7EB" }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-400 mb-6">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {visible.map((article) => {
              const tagStyle = getTagStyle(article.tag);
              return (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <div
                    className="group bg-white rounded-2xl p-7 border border-gray-100 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 h-full flex flex-col"
                    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: tagStyle.bg, color: tagStyle.text }}
                      >
                        {article.tag}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                    </div>
                    <h2 className="font-serif text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-rose-700 transition-colors flex-1">
                      {article.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 group-hover:gap-2.5 transition-all">
                      Read article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-4">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-30"
                style={{ background: "#fff", border: "1px solid #E5E7EB" }}>← Prev</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className="w-9 h-9 rounded-xl text-sm font-bold"
                  style={p === page ? { background: "#7C1D2E", color: "#fff" } : { background: "#fff", color: "#6B7280", border: "1px solid #E5E7EB" }}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-30"
                style={{ background: "#fff", border: "1px solid #E5E7EB" }}>Next →</button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
