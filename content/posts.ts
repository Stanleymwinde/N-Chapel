/**
 * Blog posts (sermon notes and devotionals). Add a post by adding one entry
 * to `posts`. The Resources menu shows the three latest automatically.
 * See content/README.md.
 */

export type PostCategory = "Sermon Notes" | "Devotional";

/** Structured rich text: one block per paragraph, heading, list, quote or prayer. */
export type PostBlock =
  | { type: "paragraph"; text: string; /** set semibold, for the line a passage turns on */ emphasis?: boolean }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; cite?: string }
  | { type: "prayer"; title?: string; text: string }
  | { type: "placeholder"; text: string };

export type Post = {
  title: string;
  slug: string;
  /** a real name; never "Admin" */
  author: string;
  /** e.g. "Rev.", "Pastor" (already part of `author` when shown) */
  authorRole?: string;
  /** ISO date, or null when the church hasn't confirmed it (TODO) */
  publishDate: string | null;
  category: PostCategory;
  scripture: string;
  excerpt: string;
  /** media slot key */
  heroImage: string;
  body: PostBlock[];
  /** links to a Resource Library series (/resources/series/[slug]) */
  relatedSeriesSlug?: string;
  sermonVideoUrl?: string;
};

/*
 * Post bodies, copied word for word from the live site (Nov 2026). The live
 * pages are flat paragraphs; only structure was restored (headings, lists,
 * scripture pull quotes, closing prayer). Only obvious typos were fixed.
 */

/** Source: https://nairobichapelngongroad.org/blog/blog-detail-the-merciful */
const bacaBody: PostBlock[] = [
  {
    type: "paragraph",
    text: "The “Valley of Baca” is a symbolic place mentioned in Psalm 84, often translated as “the valley of weeping”. The word “baca” in Hebrew means “weep,” hence the name “valley of weeping”. The Valley of Baca is a metaphor for trials: difficult, painful and challenging periods in life.",
  },
  {
    type: "paragraph",
    text: "The highway to the heart of God sometimes travels through the valley of tears. Life’s journey will inevitably bring us to some mountaintops and some valleys. God usually doesn’t take away all our pain, heartache, confusion, and disappointment in our journey – because it is meant to teach us how to look to Him and depend on Him in all.",
  },
  { type: "quote", text: "Blessed are those whose strength is in you,", cite: "Psalm 84:5" },
  {
    type: "paragraph",
    text: "In times of despair, if we set our hearts to worship, God will bring us the peace that we long for. In this world, we will face both joy and sorrow, pain and comfort, ups and downs. If we learn to live in the presence of God, we can rise above the thoughts and emotions that overwhelm us and find ourselves resting in Him and trusting Him fully.",
  },
  {
    type: "quote",
    text: "Better is one day in your courts than a thousand elsewhere; I would rather be a doorkeeper in the house of my God than dwell in the tents of the wicked. For the LORD God is a sun and shield; the LORD bestows favor and honor; no good thing does he withhold",
    cite: "Psalm 84:11",
  },
  { type: "paragraph", text: "May your place of Weeping, end up as your place of Worship!" },
  {
    type: "paragraph",
    text: "However, the most powerful lesson in this chapter for me is this: God will lead us from Baca to Berakah: from tears to blessings. When we trust God, the Valley of Baca can transform into the Valley of Berakah, a place of blessings. Even in dry times, the pilgrims mentioned in this chapter discovered pools of water, and as they waited for relief, God’s power came through, bringing refreshing rain to their parched land.",
  },
  {
    type: "quote",
    text: "As they pass through the Valley of Baka, they make it a place of springs; the autumn rains also cover it with pools",
    cite: "Psalm 84:6",
  },
  { type: "paragraph", text: "May the season in your Wilderness, end up in a season of Watering for you!" },
  {
    type: "paragraph",
    text: "84 is a very significant number for me, because it’s on the 84th day of the trip Around Africa, that I found myself in the Valley of Baca, mentioned in Psalm 84. However, I confess today that it will not end up as Baca, but Berakah: it will end up as both my place of Worship and my place of Watering!",
  },
  { type: "paragraph", text: "Blessed Palm Sunday!" },
];

/** Source: https://nairobichapelngongroad.org/blog/kenya-tanzania-malawi-zambia-zimbabwe-botswana-eswatini-lesotho-and-south-africa */
const haggaiBody: PostBlock[] = [
  { type: "paragraph", text: "The Book of Haggai: Priorities, Compassion, and the Cost of Obedience." },
  { type: "paragraph", text: "Main Themes:" },
  { type: "list", items: ["Right priorities", "God’s encouragement"] },
  { type: "paragraph", text: "Chapter Breakdown:" },
  {
    type: "list",
    items: ["Haggai 1:1–11: Apathy in rebuilding the temple", "Haggai 1:12–2:23: God’s promised glory for the new house"],
  },
  {
    type: "paragraph",
    text: "Have you ever felt judged or misunderstood? In such moments, it’s easy to wonder if we’re missing something deeper. The Book of Haggai offers a glimpse into a nation grappling with similar emotions and circumstances. As we delve into this book, we aim to understand:",
  },
  { type: "list", items: ["What was God doing in Israel during this time?", "How were God’s people responding to His commands?"] },
  { type: "paragraph", text: "Haggai 1:1–11 – Today’s Key Points:" },
  { type: "list", items: ["The Plan", "The Price", "The Promise"] },
  { type: "heading", text: "The Background" },
  {
    type: "paragraph",
    text: "In 586 B.C., Israel’s disobedience and idol worship led to the destruction of Solomon’s temple. This temple symbolized God’s presence among His people. Israel was exiled to Babylon for 70 years (2 Kings 17), but in 538 B.C., King Cyrus decreed that the Jews could return to Jerusalem to rebuild the temple. Cyrus not only allowed them to return but also financed the rebuilding. Zerubbabel led 60,000 people back to Jerusalem, where they began the monumental task of restoring the city’s walls and government buildings, as detailed in Nehemiah and Ezra.",
  },
  { type: "heading", text: "Who Was Haggai?" },
  {
    type: "paragraph",
    text: "Haggai, a postexilic prophet, was sent to confront and comfort the people after their return from exile. In 520 B.C., he delivered a powerful message, encouraging them to resume rebuilding the temple. Having been born in captivity, Haggai returned to Jerusalem with Zerubbabel in 538 B.C. (Ezra 1:2). Alongside Zechariah, another prophet, Haggai spurred the people on to complete the temple – a central aspect of their relationship with God.",
  },
  {
    type: "paragraph",
    text: "Haggai’s message was clear: prioritize the rebuilding of God’s house. His words acted as a catalyst for resuming the work, pushing both the leaders and people to remember that their spiritual obedience was crucial to Israel’s restoration.",
  },
  { type: "heading", text: "The Plan: God’s Sovereign Role" },
  {
    type: "paragraph",
    text: "God’s plan for Israel was unfolding even through pagan nations. He used Babylon to discipline Israel, but He also used Cyrus to restore them. This restoration was not just physical but spiritual—through Zerubbabel’s leadership, God sought to rebuild Israel’s spiritual foundation.",
  },
  { type: "paragraph", text: "However, two major problems arose:" },
  {
    type: "list",
    items: [
      "**Nostalgia:** Some elders remembered Solomon’s glorious temple and mourned that the new one seemed smaller and less magnificent.",
      "**Opposition:** Enemies of Israel, particularly the Assyrians, infiltrated and sabotaged the rebuilding effort, causing fear and stopping the work.",
    ],
  },
  { type: "heading", text: "The Heart of the Problem: Misplaced Priorities" },
  {
    type: "paragraph",
    text: "The people had neglected God’s house to focus on their own homes. Their reasoning? “It’s not the right time.” Yet, God’s plan had always been to restore the relationship between Himself and His people. When they put their personal concerns above God’s commands, their efforts became futile.",
  },
  {
    type: "paragraph",
    text: "Haggai 1:5–6 emphasizes that by neglecting God’s house, the people found themselves unfulfilled. Their crops were sparse, their clothes didn’t keep them warm, and their money vanished as if in purses with holes.",
  },
  { type: "quote", text: "You have planted much, but harvested little. You eat, but never have enough. You drink, but never have your fill.", cite: "Haggai 1:6" },
  {
    type: "paragraph",
    text: "The deeper truth was that God’s blessings were withheld because of their disobedience. Haggai called them to “consider their ways,” urging them to prioritize God once again.",
  },
  { type: "heading", text: "The Price: Obedience Comes at a Cost" },
  {
    type: "paragraph",
    text: "Following God’s commands often costs us something. The Jews had faced opposition from the Assyrians, who wanted to infiltrate and stop their work. The Assyrian offer of help was declined by Israel’s spiritual leaders, as they knew the rebuilding of the temple was a sacred duty, requiring purity of heart and intent. Allowing foreign influence would have compromised their worship and identity.",
  },
  {
    type: "paragraph",
    text: "This opposition brought discouragement, and for 16 years, the temple lay incomplete. Haggai’s call to action was a challenge to overcome fear and excuses. He reminded them that rebuilding the temple was not just a task – it was a spiritual duty, directly tied to their covenant relationship with God.",
  },
  { type: "heading", text: "The Promise: Blessings Tied to Obedience" },
  {
    type: "paragraph",
    text: "Though obedience comes with a price, it also carries God’s promise of blessing. Haggai promised that if the people would prioritize God’s house, He would restore His presence and bless their efforts.",
  },
  {
    type: "paragraph",
    text: "In Psalm 74:9, the people in exile saw no miraculous signs or prophets. However, Haggai arrived as the first prophet after the exile to remind them of God’s plan. He told them, “Is it time for you to live in your paneled houses, while this house remains in ruins?” Their misplaced priorities had led them to pursue wealth and comfort over God’s work.",
  },
  { type: "heading", text: "Compassion Over Judgment" },
  {
    type: "paragraph",
    text: "Despite Israel’s disobedience, God showed compassion. He didn’t send them back into exile or allow enemies to conquer them again. Instead, He withheld His blessings to correct them and stir their hearts back to Him.",
  },
  {
    type: "paragraph",
    text: "This story illustrates an important truth: God’s compassion triumphs over judgment. When we repent, His mercy prevails.",
  },
  { type: "heading", text: "Application for Today" },
  {
    type: "list",
    items: [
      "**Prioritize God:** Like the Israelites, we often get busy with our own lives and forget to put God first. But when we focus on Him, everything else falls into place.",
      "**Count the Cost:** Obedience to God may come with challenges, but the rewards of His blessing and presence far outweigh the difficulties.",
      "**Stay Strong in the Face of Opposition:** Just as the Jews faced political and personal obstacles, we too will encounter opposition. Yet, when we press on in faith, God promises His blessing.",
    ],
  },
];

/** Source: https://nairobichapelngongroad.org/blog/hope-misappropriated-luke-24 */
const hopeBody: PostBlock[] = [
  { type: "heading", text: "Introduction: When Hope Disappoints" },
  { type: "paragraph", text: "Have you ever said, “I had hoped…”?" },
  { type: "paragraph", text: "That phrase carries weight. For some, it brings nostalgia. For others, disappointment, regret—even pain." },
  { type: "paragraph", text: "Maybe:" },
  {
    type: "list",
    items: [
      "You hoped that relationship would last, but it didn’t",
      "You trusted that job would fulfill you, but now you’re drained",
      "You invested in a business, only for circumstances beyond your control to wipe it out",
      "You believed in a leader, only to be let down",
    ],
  },
  { type: "paragraph", text: "There is a unique kind of pain that comes when hope disappoints." },
  { type: "paragraph", text: "But what if the issue isn’t that hope failed… but that it was misplaced?", emphasis: true },
  { type: "heading", text: "The Emmaus Road: A Journey of Disappointment" },
  { type: "paragraph", text: "In Luke 24:13–35, we meet two disciples walking from Jerusalem to Emmaus—about 11 kilometers." },
  { type: "paragraph", text: "They are:" },
  { type: "list", items: ["Broken", "Confused", "Disappointed"] },
  { type: "paragraph", text: "Their words say it all:" },
  { type: "quote", text: "But we had hoped that he was the one who was going to redeem Israel.", cite: "Luke 24:21" },
  { type: "paragraph", text: "That line is heartbreaking." },
  { type: "paragraph", text: "“We had hoped…”", emphasis: true },
  {
    type: "paragraph",
    text: "They believed Jesus was the Messiah. They had seen His miracles, heard His teaching, watched His power. Everything about Him screamed Savior.",
  },
  { type: "paragraph", text: "But then, He was crucified." },
  { type: "paragraph", text: "To them, that meant one thing: He failed." },
  { type: "heading", text: "The Problem Wasn’t Jesus; It Was Their Expectations" },
  { type: "paragraph", text: "Here’s the twist:" },
  { type: "paragraph", text: "The disciples weren’t wrong about Jesus.", emphasis: true },
  { type: "paragraph", text: "They were wrong about what He came to do.", emphasis: true },
  { type: "paragraph", text: "They hoped in the right person, but for the wrong reason." },
  { type: "paragraph", text: "They expected:" },
  { type: "list", items: ["A political deliverer", "A problem-solving Messiah", "A power-establishing king"] },
  { type: "paragraph", text: "What they got was:" },
  { type: "list", items: ["A suffering Savior", "A cross before the crown", "Redemption through sacrifice"] },
  { type: "paragraph", text: "They had created a version of Jesus without the Cross.", emphasis: true },
  { type: "heading", text: "When We Do the Same Thing" },
  { type: "paragraph", text: "If we’re honest, we do this too." },
  { type: "paragraph", text: "We want:" },
  {
    type: "list",
    items: ["A Jesus who fixes things quickly", "A Jesus who makes life easier", "A Jesus who answers every prayer on demand"],
  },
  { type: "paragraph", text: "Sometimes, we treat Him like a vending machine:" },
  { type: "paragraph", text: "Insert prayer → insert obedience → collect blessing.", emphasis: true },
  { type: "paragraph", text: "But Jesus is not a means to an end." },
  { type: "paragraph", text: "He is the end.", emphasis: true },
  { type: "heading", text: "Jesus Meets Us in Our Misunderstanding" },
  { type: "paragraph", text: "One of the most beautiful parts of this story?" },
  { type: "paragraph", text: "Jesus doesn’t abandon the disciples." },
  { type: "paragraph", text: "He walks with them." },
  { type: "list", items: ["Even in their confusion.", "Even in their disappointment.", "Even in their wrong expectations."] },
  { type: "paragraph", text: "They don’t recognize Him, but He is there." },
  { type: "paragraph", text: "Then He does something powerful:" },
  { type: "paragraph", text: "He explains the Scriptures.", emphasis: true },
  { type: "paragraph", text: "He shows them that:" },
  {
    type: "list",
    items: [
      "The Cross was always the plan",
      "The suffering of the Messiah was not failure, but fulfillment",
      "God had been working all along",
    ],
  },
  { type: "paragraph", text: "Their problem?" },
  { type: "paragraph", text: "Their hope wasn’t shaped by God’s Word.", emphasis: true },
  { type: "heading", text: "From Cold Hearts to Burning Hearts" },
  { type: "paragraph", text: "Later, after Jesus breaks bread with them:" },
  { type: "quote", text: "Then their eyes were opened and they recognized him…", cite: "Luke 24:31" },
  { type: "paragraph", text: "And they say:" },
  { type: "quote", text: "Were not our hearts burning within us while he talked with us on the road…?", cite: "Luke 24:32" },
  { type: "paragraph", text: "Everything changes." },
  { type: "paragraph", text: "They go from:" },
  { type: "list", items: ["Walking away → running back", "Hopeless → hopeful", "Confused → convinced"] },
  { type: "paragraph", text: "Why?" },
  { type: "paragraph", text: "Because when you truly see Jesus for who He is, everything changes.", emphasis: true },
  { type: "heading", text: "Hope Misappropriated vs. Hope Restored" },
  { type: "paragraph", text: "Their hope wasn’t false." },
  { type: "paragraph", text: "It was misappropriated.", emphasis: true },
  { type: "paragraph", text: "God didn’t fail them." },
  { type: "paragraph", text: "Their expectations did." },
  { type: "paragraph", text: "Sometimes:" },
  {
    type: "list",
    items: [
      "We pray for healing, but God is building endurance",
      "We ask for breakthroughs, but God is forming character",
      "We want escape, but God is shaping us through the process",
    ],
  },
  { type: "paragraph", text: "We stop at Friday…" },
  { type: "paragraph", text: "When Sunday is still coming.", emphasis: true },
  { type: "heading", text: "Application: Where Have You Said “I Had Hoped”?" },
  { type: "paragraph", text: "Take a moment and reflect:" },
  {
    type: "list",
    items: [
      "Where in your life have you said, “I had hoped…”?",
      "Did God truly fail you, or do your expectations need reshaping?",
      "Are you defining God by your circumstances… or your circumstances by God?",
    ],
  },
  { type: "paragraph", text: "Some of us are on our own Emmaus road right now." },
  { type: "paragraph", text: "Quietly walking away:" },
  { type: "list", items: ["From faith", "From calling", "From relationships", "From God Himself"] },
  { type: "paragraph", text: "But here’s the truth:" },
  { type: "paragraph", text: "You are not walking alone.", emphasis: true },
  { type: "heading", text: "Don’t Walk Away Too Soon" },
  { type: "paragraph", text: "You might be at 4:59." },
  { type: "paragraph", text: "Don’t walk away." },
  { type: "paragraph", text: "5:00 PM is coming.", emphasis: true },
  { type: "paragraph", text: "Friday is real, but Sunday is coming." },
  { type: "paragraph", text: "Your hope may feel buried, but resurrection is still at work." },
  { type: "heading", text: "The Final Word: Hope Has a Name" },
  { type: "paragraph", text: "Hope is not an outcome." },
  { type: "paragraph", text: "Hope is a person." },
  { type: "paragraph", text: "Hope has a name, and His name is Jesus.", emphasis: true },
  { type: "paragraph", text: "Not the version we invent." },
  { type: "paragraph", text: "Not the one shaped by culture." },
  { type: "paragraph", text: "But the real Jesus:" },
  { type: "list", items: ["The crucified One", "The risen One", "The One who walks with disappointed people"] },
  { type: "paragraph", text: "Even when we miss Him, He never misses us.", emphasis: true },
  { type: "heading", text: "Conclusion & Prayer" },
  { type: "paragraph", text: "If you feel disappointed today, don’t walk away." },
  { type: "paragraph", text: "Look again." },
  { type: "list", items: ["Look to the Cross.", "Look to the risen Christ.", "Look to the One who never fails."] },
  {
    type: "prayer",
    title: "Prayer",
    text: "Lord, open the eyes of our hearts.\nTeach us to see You as You truly are, not as we expect You to be.\nForgive us for defining Your faithfulness by our circumstances.\nHelp us to trust Your Word, even when we don’t understand Your ways.\nRestore our hope, not as we imagined it, but as You intended it.\nRemind us that You walk with us, even on the road of disappointment.\nIn Jesus’ name,\nAmen.",
  },
];

export const posts: Post[] = [
  {
    // CONFIRM WITH THE CHURCH: the live card for this URL is titled "The Merciful and Just God:
    // Lessons from Zephaniah – Pastor Eric Wanjala", but the article body is this Palm Sunday
    // meditation by Rev. Nick Korir. The body is used as the source of truth.
    title: "Palm Sunday Meditation: When Baca Becomes Berakah",
    slug: "when-baca-becomes-berakah",
    author: "Rev. Nick Korir",
    authorRole: "Rev.",
    publishDate: null, // TODO: the live site shows no date
    category: "Devotional",
    scripture: "Psalm 84",
    excerpt:
      "A Palm Sunday reflection on the Valley of Baca in Psalm 84, and how God turns places of weeping into places of worship and blessing.",
    heroImage: "prayer.hero",
    body: bacaBody,
  },
  {
    // CONFIRM WITH THE CHURCH: the live card for this URL is titled "The Call of the King |
    // Rev. Ken Kamau", which does not match the article body (Haggai sermon notes by
    // Rev. Liz Mang'eli). The body is used as the source of truth.
    title: "Haggai: Compassion over Judgement",
    slug: "haggai-compassion-over-judgement",
    author: "Rev. Liz Mang’eli",
    authorRole: "Rev.",
    publishDate: null, // TODO: the live site shows no date
    category: "Sermon Notes",
    scripture: "Haggai 1",
    excerpt:
      "Sermon notes on Haggai covering God’s plan, the price of obedience, and His promise, and why God’s compassion triumphs over judgement.",
    heroImage: "blog.hero",
    body: haggaiBody,
  },
  {
    title: "Hope Misappropriated: When God Doesn’t Meet Our Expectations",
    slug: "hope-misappropriated",
    author: "Rev. Gedion Kadu",
    authorRole: "Rev.",
    publishDate: null, // TODO: the live site shows no date
    category: "Sermon Notes",
    scripture: "Luke 24:13–35",
    excerpt:
      "Have you ever said, “I had hoped…”? A reflection on the road to Emmaus, and what happens when God doesn’t meet our expectations.",
    heroImage: "discipleship.hero",
    body: hopeBody,
    // CONFIRM WITH THE CHURCH: that this message belongs to the "Hope" Bible study series.
    relatedSeriesSlug: "hope",
  },
];

/**
 * Newest first. Posts without a confirmed date keep the order they are
 * listed in above, after any dated posts.
 */
export function sortedPosts(): Post[] {
  return posts
    .map((p, i) => ({ p, i }))
    .sort((a, b) => {
      if (a.p.publishDate && b.p.publishDate) return b.p.publishDate.localeCompare(a.p.publishDate);
      if (a.p.publishDate) return -1;
      if (b.p.publishDate) return 1;
      return a.i - b.i;
    })
    .map(({ p }) => p);
}

/** Rough reading time (~200 words a minute), at least 1 minute. */
export function readingTime(post: Post): number {
  const words = post.body
    .map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : ""))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
