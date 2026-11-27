/**
 * Statement of faith (as supplied by the church). Each article has a
 * summary and its Scripture references; references can be grouped under a
 * label (e.g. "Incarnation"). An article with no references shows none.
 */
export type ScriptureGroup = {
  /** optional group heading, e.g. "Death" */
  label?: string;
  /** references separated by semicolons, as written */
  references: string;
};

export type Belief = {
  title: string;
  summary: string;
  scriptures: ScriptureGroup[];
};

const items: Belief[] = [
    {
      title: "The Bible",
      summary: "The Holy Scriptures are divinely inspired and carry full authority. They are sufficient for faith and life.",
      scriptures: [{ references: "2 Timothy 3:15–17; 1 Peter 1:10–12; 2 Peter 1:20–21; Psalm 19:7–11" }],
    },
    {
      title: "God",
      summary:
        "God is one, and within that unity are three distinct Persons: the Father, the Son, and the Holy Spirit. They are co-equal and co-eternal and are owed equal honour.",
      scriptures: [
        {
          references:
            "Deuteronomy 6:4; Genesis 1:2, 26; John 1:1–2; John 5:17, 22–23; John 14:25–26; John 16:7, 27–28; Philippians 2:6; Hebrews 1:1–3, 8",
        },
      ],
    },
    {
      title: "Jesus Christ",
      summary:
        "The Son of God truly became man, conceived by the Holy Spirit and born of the Virgin Mary. His righteousness is credited to all believers. His death was a sacrifice to God and an atonement for the forgiveness of His people’s sins. He rose from the dead and ascended to the right hand of God, where He is His people’s all-sufficient High Priest. He will return to receive His people and establish His Kingdom.",
      scriptures: [
        { label: "Incarnation", references: "John 1:14; Romans 4:22–24; Romans 8:3; Galatians 4:4; Matthew 1:20–25; Luke 1:35" },
        { label: "Death", references: "Romans 4:25; 2 Corinthians 5:21; Hebrews 9:24–28; Hebrews 10:12–14" },
        { label: "Resurrection", references: "Matthew 28:5–7; 1 Corinthians 15:20" },
        { label: "Ascension", references: "Mark 16:19–20; Luke 24:50–51; Acts 1:9; Ephesians 4:8–10; Hebrews 4:14–16; Hebrews 7:25" },
        { label: "Return", references: "John 14:3; 1 Thessalonians 4:13–18; Luke 1:32–33; Isaiah 9:6–7; Daniel 2:44–45; Daniel 7:13–14" },
      ],
    },
    {
      title: "The Holy Spirit",
      summary: "The Holy Spirit’s work is needed to give new life (regeneration) and to make believers holy (sanctification).",
      scriptures: [{ references: "John 3:5–8; John 16:8–11; Titus 3:4–7; 2 Thessalonians 2:13–14; 1 Peter 1:2" }],
    },
    {
      title: "Salvation",
      summary:
        "Because of Adam’s fall, humanity is lost, hostile to God, and unable to do His will. A sinner is justified before God by faith alone. Everyone justified is also born of God, and that new birth shows itself in holy living and good works.",
      scriptures: [
        { label: "The fall", references: "Psalm 51:2–5; Luke 19:10; Romans 3:19; Romans 5:6, 12–19" },
        { label: "Justification", references: "Romans 3:21–26; Romans 4:4–5; Romans 5:1; Galatians 2:16" },
        { label: "New birth", references: "John 1:12–13; James 1:18; 1 Peter 1:23" },
        { label: "Holy living", references: "Ephesians 2:10; Ephesians 4:24; Titus 3:4–8" },
      ],
    },
    {
      title: "The Church",
      summary:
        "The church has no denominational ties and sees all believers in Jesus Christ as members of the one Body of Christ. It welcomes all believers, regardless of race, who are sound in the faith and seeking to live godly lives.",
      scriptures: [],
    },
    {
      title: "Life after death and judgment",
      summary:
        "At death the human spirit continues to exist consciously. The dead will be raised to life or to condemnation, and both outcomes are eternal.",
      scriptures: [
        {
          references:
            "Ecclesiastes 12:7; Luke 16:19–31; Luke 23:43; 2 Corinthians 5:6–8; 1 Corinthians 15:51–57; Philippians 3:20–21; Romans 14:9–10; 2 Corinthians 5:10; Daniel 12:2; Acts 17:31; Revelation 20:11–15",
        },
      ],
    },
    {
      title: "Satan",
      summary:
        "Satan is a real being, created perfect, who fell through pride and became the father of sin and the enemy of God and humanity.",
      scriptures: [{ references: "Job 1:6–7; Ezekiel 28:14–15; Isaiah 14:12–15; 1 Peter 5:8" }],
    },
];

export const beliefs = {
  title: "What we believe",
  intro:
    "Our faith rests on Jesus Christ and the Bible, God’s Word. We believe the Bible is God's Word, that God is Father, Son and Holy Spirit, and that through faith in Jesus Christ anyone can be made new. These are the truths that shape our life together.",
  items,
};
