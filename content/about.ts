/* ------------------------------------------------------------------ */
/* /about                                                              */
/* ------------------------------------------------------------------ */

export const about = {
  title: "About us",
  intro: "We are a church on Ngong Road, Nairobi, being disciples and making disciples of Jesus Christ.",
  story: {
    title: "Our story",
    // From the church's history PDF. TODO (CONTENT-TODO.md): the years from about 2005 to now.
    paragraphs: [
      "Nairobi Chapel began in 1952, when a small group of settlers started meeting at the Nairobi Arboretum. In 1989, with only 20 members left, the congregation gave itself to prayer and invited Nairobi Baptist Church to send leaders. Oscar Muriu and seven families came, and the church was reborn as a Kenyan church reaching students and young families. It grew around 6,000% in ten years, and in 2000 God provided a 14.2-acre property on Ngong Road, which is home to our congregation today.",
      "Nairobi Chapel Ngong Road is an evangelical church. We uphold the Bible as the true word of God, and we shape our vision, structure and ministries by Scripture. Over the years we have planted many churches across Kenya and Africa, and through our Social Justice Ministry we serve the communities around us.",
    ],
    historyPdf: { href: "/pdfs/nairobi-chapel-history.pdf", label: "Read our full history", size: "7.5 MB" },
    // Milestones for the timeline beside the story (all from the history PDF)
    milestones: [
      { year: "1952", text: "First gatherings at the Nairobi Arboretum" },
      { year: "1989", text: "20 members pray; Oscar Muriu and seven families arrive" },
      { year: "2000", text: "A 14.2-acre home on Ngong Road" },
    ],
  },
  /** The current season, in five letters (from the church's TOUCH page; full detail on /about/compass) */
  touch: {
    intro:
      "After Vision 2020, the church needed a new direction. The process began in 2019, was interrupted by COVID-19, and became our Compass, built on “Global Reach through Local TOUCH”.",
    letters: [
      { letter: "T", word: "Teams", be: "Be functional" },
      { letter: "O", word: "One-on-one", be: "Be relational" },
      { letter: "U", word: "Under 18", be: "Be intergenerational" },
      { letter: "C", word: "Community outreach", be: "Be missional" },
      { letter: "H", word: "Health", be: "Be transformational" },
    ],
  },
  /** The Transformation Track (T-Track): the church's discipleship pathway */
  tTrack: {
    title: "The Transformation Track",
    intro: "Our discipleship pathway: four stages from first visit to sent-out disciple.",
    steps: [
      { title: "Reach", text: "Reaching friends, family and contacts. Sunday services are the door into the family." },
      {
        title: "Connect",
        text: "Follow-up calls, the Karibu (Welcome) Lounge and first relationships, so visitors can call this their church.",
      },
      {
        title: "Grow",
        text: "Maturing in faith through eGroups and their A.B.C.D.s:",
        list: [
          { lead: "Accountability", text: "real friendship and counsel" },
          { lead: "Belonging", text: "“this is my family”" },
          { lead: "Care", text: "support through births, bereavement, weddings and other life events" },
          { lead: "Discipleship", text: "living out the gospel together" },
        ],
      },
      {
        title: "Send",
        text: "Members (“Chapelites”) make six commitments:",
        list: [
          { lead: "", text: "Complete Plug-In and attend an eGroup" },
          { lead: "", text: "Attend Sunday services regularly" },
          { lead: "", text: "Pray for the church" },
          { lead: "", text: "Serve in a ministry using their spiritual gift" },
          { lead: "", text: "Tithe generously" },
          { lead: "", text: "Submit to the leadership of the pastors and elders" },
        ],
      },
    ],
  },
  mission: "Being disciples and making disciples of Jesus Christ.",
  vision: "Growing D.E.E.P. to reach W.I.D.E.",
  visionDetail:
    "We want every person God brings through our doors to have a life-changing encounter with Him, begin to live a life of purpose, grow in their relationship with God, and become more like Christ as His disciple.",
  /** Current season. TOUCH = Teams, One on One, Under 18, Community, Health (see /about/compass). */
  season: "Global Reach through Local TOUCH",
  purpose: {
    line: "We are committed to helping people grow D.E.E.P. to reach W.I.D.E.",
    explanation:
      "D.E.E.P. is the “how” of discipleship: four disciplines at the heart of Christian growth. W.I.D.E. is the “what”: the difference we want that growth to make in the world.",
    deep: {
      title: "Grow D.E.E.P.",
      summary: "Four disciplines at the heart of Christian growth.",
      letters: [
        { letter: "D", word: "Daily devotions" },
        { letter: "E", word: "eGroups" },
        { letter: "E", word: "Engagement in service" },
        { letter: "P", word: "Pulpit teaching and Sunday services" },
      ],
    },
    wide: {
      title: "Reach W.I.D.E.",
      summary: "The goals our growth serves.",
      // Targets as supplied by the church; the old "Vision 2020" label is dropped.
      // TODO (CONTENT-TODO.md): confirm these targets still stand.
      letters: [
        { letter: "W", word: "Witness to 1,000,000 people" },
        { letter: "I", word: "Impact and change society through acts of mercy and justice" },
        { letter: "D", word: "Disciple 100,000 converts" },
        { letter: "E", word: "Expand the Kingdom of God by planting 300 churches" },
      ],
    },
  },
  values: {
    title: "Our core values",
    items: [
      { title: "Reach people for Christ", text: "Helping people who have lost their way find their way back to God through Jesus." },
      { title: "Grow together", text: "Real transformation happens in authentic community, especially small groups where people share real life." },
      { title: "Multiply at every level", text: "Helping every member discover their spiritual gift, and raising leaders who serve and plant churches across Kenya and Africa." },
      { title: "Empower the next generation", text: "Investing in children and teenagers so their faith and values are built on Jesus, the one solid Rock." },
      { title: "Keep prayer at the core", text: "Grounding everything in prayer, through daily devotions, weekly prayer gatherings, and monthly prayer and fasting." },
      { title: "Release resources into the community", text: "Sharing money, skills, counsel, connections and opportunity to support people facing poverty of every kind." },
    ],
  },
  explore: [
    { title: "What we believe", summary: "The heart of our faith.", href: "/about/beliefs", cta: "Explore our beliefs", image: "beliefs.hero" },
    { title: "Our Compass", summary: "Our strategic direction as a church.", href: "/about/compass", cta: "See our direction", image: "compass.hero" },
    { title: "Our team", summary: "The pastors and staff who serve the church.", href: "/about/team", cta: "Meet the team", image: "team.hero" },
  ],
  /** More "Get to know us" cards (shown after `explore`, same card style). */
  more: [
    { title: "Financials", summary: "Our AGM booklet and financial reports.", href: "/about/financials", cta: "View the reports", image: "give.hero" },
    { title: "Publications", summary: "Booklets and documents from the church.", href: "/publications", cta: "Browse publications", image: "resources.hero" },
    { title: "Marriage banns", summary: "Upcoming weddings announced to the church.", href: "/info-desk/marriage-banns", cta: "See the banns", image: "banns.hero" },
    // PDFs from the church's current About page; they open in a new tab
    { title: "Our history", summary: "From the Arboretum in 1952 to Ngong Road.", href: "/pdfs/nairobi-chapel-history.pdf", cta: "Read the history (PDF, 7.5 MB)", image: "visit.hero", pdf: true },
    { title: "Our Constitution", summary: "The church's constitution and rules.", href: "/pdfs/nairobi-chapel-constitution.pdf", cta: "Read the Constitution (PDF, 96 KB)", image: "library.study-8", pdf: true },
  ] as { title: string; summary: string; href: string; cta: string; image: string; pdf?: boolean }[],
};

/* ------------------------------------------------------------------ */
/* /about/compass                                                      */
/* ------------------------------------------------------------------ */

export type CompassArea = {
  letter: string;
  word: string;
  /** e.g. "Be Functional" */
  tag: string;
  paragraphs: string[];
  /** A plain string, or a bold title with a short description */
  list?: { title: string; items: (string | { title: string; text: string })[] };
  scripture: string;
};

export const compass = {
  title: "Our Compass",
  intro:
    "Our Compass is our strategic plan for Vision 2030. It sets our focus as “Global Reach through Local TOUCH”: five priorities that shape how we grow as disciples, connect with one another, raise the next generation, serve our community, and pursue wholeness in Christ.",
  identity:
    "Nairobi Chapel is an evangelical, interdenominational church committed to being a biblical, culturally relevant, family-friendly, disciple-making community.",
  verse: { text: "“I planted, Apollos watered, but God gave the growth.”", ref: "1 Corinthians 3:6" },
  why: {
    title: "Why a Compass",
    intro:
      "As Vision 2020 drew to a close, we needed to chart a new path. The process began in 2019, was interrupted by the COVID-19 pandemic, and became this Compass. Three realities seem clear to us:",
    realities: [
      {
        title: "Disconnection",
        text: "We are mostly a commuter church in a society of growing isolation. We want to build deeper connections with one another and with our immediate community.",
      },
      {
        title: "Integration",
        text: "Our neighbours don’t yet fully see the church as their own, and our members don’t yet fully own its ministries. We want to be part of our community and to equip our members to lead ministry.",
      },
      {
        title: "Transformation",
        text: "We haven’t yet fully seen the gospel’s impact on our lives and our community. We want to grow into spiritual maturity together.",
      },
    ],
    response:
      "We want to be touched by God afresh, touched by one another, and to touch our community and spheres of influence. We sum this up as TOUCH.",
  },
  areasTitle: "The five areas of Local TOUCH",
  areas: [
    {
      letter: "T",
      word: "Teams",
      tag: "Be Functional",
      paragraphs: [
        "Every believer is gifted and called to ministry, with pastors equipping them.",
        // TODO(content): confirm with church — the source PDF prints "SE Volunteer Model"; we assume "5E" (Enlist … Evaluate) is correct.
        "We are building a volunteer-led ministry model, using our 5E Volunteer Model and an internship programme that develops future pastors.",
      ],
      list: { title: "The 5E Volunteer Model", items: ["Enlist", "Envision", "Engage", "Encourage", "Evaluate"] },
      scripture: "1 Peter 4:10",
    },
    {
      letter: "O",
      word: "One on One",
      tag: "Be Relational",
      paragraphs: [
        "Discipleship is our biggest need, and it happens through relationships. The focus shifts “from programmes to people” and from Sunday attendance to life in community.",
        "eGroups are the main avenue for discipleship, supported by Next Steps (new believers’ classes) and Plug-In (a 10-week discipleship experience). The Discipleship BootCamp teaches the 5 HABITs:",
      ],
      list: {
        title: "The 5 HABITs",
        items: ["Hanging out with God", "Accountability", "Bible reading", "Involvement in ministry", "Telling others the good news"],
      },
      scripture: "Matthew 28:19–20",
    },
    {
      letter: "U",
      word: "Under 18",
      tag: "Be Intergenerational",
      paragraphs: [
        "Every generation is a gift to the others, and we intend to build real relationships between them, not just run separate programmes.",
        "We have ministries for every age, plus outreach to local schools and colleges.",
      ],
      list: {
        title: "Ministries for every age",
        items: [
          "Crèche (0–2)",
          "Quest (2–11)",
          // TODO(content): confirm with church — Crossroads is 12–13 here, but the Serving Opportunities document says 12–14.
          "Crossroads (12–13)",
          "Teens (14–18)",
          // TODO(content): confirm with church — Young Adults is 19–24 here, but the Next Gen page says BLITZ is for 19–26.
          "Young Adults (19–24)",
          "Adults (25+)",
        ],
      },
      scripture: "Deuteronomy 6:6–7",
    },
    {
      letter: "C",
      word: "Community",
      tag: "Be Missional",
      paragraphs: [
        "We define our immediate community as everything within a 5 km radius: residential estates and informal settlements, schools and colleges, sports stadia, a prison, the Car Bazaar, and businesses and other institutions.",
        "We reach our community through:",
      ],
      list: {
        title: "How we reach our community",
        items: [
          { title: "Evangelism", text: "Boldly sharing the gospel" },
          { title: "Empowerment", text: "Economic empowerment through entrepreneurial mentorship and business skills training" },
          { title: "Engagement", text: "Sending members as ambassadors for Christ into their spheres of influence" },
          { title: "Education", text: "Sponsoring students through the LOGOS Scholarship Fund" },
          { title: "Embracing local initiatives", text: "Partnering with transformational initiatives in our community" },
        ],
      },
      scripture: "Luke 4:18",
    },
    {
      letter: "H",
      word: "Health",
      tag: "Be Transformational",
      paragraphs: ["We want to be a place of healing and wholeness for individuals, families, and marriages. We offer:"],
      list: {
        title: "What we offer",
        items: [
          "Pre-marital preparation",
          "Counselling",
          "Mental health awareness and support",
          "Support groups for singles, divorced and separated people, diverse families, the grieving, and people recovering from alcohol and substance abuse",
          "Marriage enrichment",
          "Men’s and women’s forums",
        ],
      },
      scripture: "3 John 1:2",
    },
  ] satisfies CompassArea[],
  /** slug in content/publications.ts */
  publication: "our-compass",
};

/* ------------------------------------------------------------------ */
/* /about/team                                                         */
/* ------------------------------------------------------------------ */

export type TeamMember = {
  /** stable slug, used as the React key */
  id: string;
  name: string;
  /** job title; left out where the church hasn't confirmed it (the card then shows no title line) */
  role?: string;
  ministry?: string;
  email?: string;
  /** media slot once a real, consented photo exists; until then initials are shown */
  photo?: string;
  /** false: kept for reference but not shown on the site */
  published?: boolean;
};

export type TeamGroup = {
  /** also the URL hash used by the filter (#adults, #next-generation, …) */
  id: string;
  title: string;
  intro?: string;
  /** the matching ministry page, when one exists */
  link?: { label: string; href: string };
  members: TeamMember[];
};

const email = (local: string) => `${local}@nairobichapel.org`;

/**
 * The 2026 team (source: Nairobi Chapel Ngong Road Pastoral Team 2026 bulletin),
 * grouped by area for the page. The first group is Leadership, always shown
 * above the filter. Photos: add a consented photo's media slot as `photo` per
 * person; until then initials are shown (never a stock photo).
 */
const teamGroups: TeamGroup[] = [
  {
    id: "leadership",
    title: "Leadership",
    members: [
      { id: "nick-korir", name: "Rev. Nick Korir", role: "Senior Pastor", email: email("nickkorir") },
      { id: "bella-mburu", name: "Rev. Bella Mburu", role: "Executive Pastor", ministry: "Next Generation", email: email("bellamburu") },
      // TODO(content): confirm spelling with church — “Mangeli” (2026 bulletin) vs “Mang’eli” (old site)
      { id: "liz-mangeli", name: "Rev. Liz Mangeli", role: "Executive Pastor", ministry: "Adults", email: email("lizmangeli") },
      { id: "sue-nziuko", name: "Sue Nziuko", role: "Executive Assistant", email: email("suenziuko") },
    ],
  },
  {
    id: "adults",
    title: "Adults, discipleship & care",
    intro: "Walking with adults through discipleship, small groups, marriage, prayer and care.",
    link: { label: "Discipleship", href: "/ministries/discipleship" },
    members: [
      { id: "jush-korir", name: "Jush Korir", role: "Pastor", ministry: "Discipleship", email: email("juliakorir") },
      { id: "james-muchai", name: "James Muchai", role: "Pastor", ministry: "Small Groups (eGroups)", email: email("jamesgatuha") },
      { id: "sam-odero", name: "Rev. Sam Odero", role: "Pastor", ministry: "Prayer & Adult Care", email: email("samuelodero") },
      { id: "richard-chogo", name: "Richard Chogo", role: "Pastor", ministry: "Marriage Ministry", email: email("richardchogo") },
      { id: "mutheu-mbathi", name: "Mutheu Mbathi", role: "Pastor", ministry: "Assimilation & Support Communities", email: email("mutheum") },
      { id: "mimo-kadu", name: "Mimo Kadu", role: "Pastor", ministry: "Women’s Ministry", email: email("mimokadu") },
      { id: "gedion-kadu", name: "Gedion Kadu", role: "Pastor", ministry: "Men’s Ministry", email: email("kadu") },
      { id: "tatiana-gitonga", name: "Tatiana Gitonga", role: "Pastor", ministry: "Marketplace Ministry & Volunteers", email: email("tatianawairimu") },
      { id: "meshack-ochiel", name: "Meshack Ochiel", role: "Pastor", ministry: "Saturday Service (Church @ 5)", email: email("meshackochiel") },
      // TODO(content): confirm title with church — the old site says “Director”
      { id: "nelson-aseri", name: "Nelson Aseri", ministry: "Counselling Ministry", email: email("nelsonaseri") },
    ],
  },
  {
    id: "next-generation",
    title: "Next Generation",
    intro: "Caring for children, teens and young adults, from Quest to BLITZ.",
    link: { label: "Next Gen", href: "/ministries/next-gen-youth" },
    members: [
      { id: "mercy-ngure", name: "Mercy Ngure", role: "Pastor", ministry: "Children’s Ministry", email: email("mercyn") },
      { id: "alfrida-aluoch", name: "Alfrida Aluoch", role: "Pastor", ministry: "Children’s Ministry", email: email("alfridaaluoch") },
      { id: "javellin-kiende", name: "Javellin Kiende", role: "Pastor", ministry: "Quest Children’s Ministry", email: email("javellinkiende") },
      { id: "kelvin-rapando", name: "Kelvin Rapando", role: "Pastor", ministry: "Quest Children’s Ministry", email: email("kelvinrapando") },
      { id: "eunice-nyoro", name: "Eunice Nyoro", role: "Administrator", ministry: "Quest Children’s Ministry", email: email("eunicenyoro") },
      { id: "emmanuel-akhonya", name: "Emmanuel Akhonya", role: "Pastor", ministry: "Crossroads Ministry", email: email("emmanuelakhonya") },
      { id: "jem-ameka", name: "Jem Ameka", role: "Pastor", ministry: "Teens Ministry", email: email("jemameka") },
      { id: "hez-mahehu", name: "Hez Mahehu", role: "Pastor", ministry: "Youth Ministry", email: email("hezmahehu") },
      { id: "angel-mahehu", name: "Angel Mahehu", role: "Pastor", ministry: "Young Adults & Ex-Candidates", email: email("angelmahehu") },
      { id: "juliah-kariuki", name: "Juliah Kariuki", role: "Administrator", ministry: "Youth Ministry", email: email("juliahmaina") },
      // TODO(content): confirm title with church — the old site says “Director”
      { id: "rhoda-mushiyi", name: "Rhoda Mushiyi", ministry: "Youth Outreach & Empowerment", email: email("rhodaobala") },
    ],
  },
  {
    id: "missions",
    title: "Missions & outreach",
    intro: "Serving our neighbours and taking the gospel beyond our walls.",
    link: { label: "Outreach", href: "/ministries/outreach" },
    members: [
      { id: "festus-omoto", name: "Festus Omoto", role: "Pastor", ministry: "Missions, Outreach & Social Justice", email: email("festusomoto") },
      { id: "gloria-osumba", name: "Gloria Osumba", role: "Social Worker", ministry: "Missions, Outreach & Social Justice", email: email("gloriaosumba") },
      { id: "faith-onyango", name: "Faith Onyango", role: "Administrator", ministry: "Outreach & Missions", email: email("faithonyango") },
    ],
  },
  {
    id: "worship-media",
    title: "Worship, media & production",
    intro: "Leading worship and making every service and stream run well.",
    members: [
      { id: "karimi-rimbui", name: "Karimi Rimbui", role: "Director", ministry: "Worship & Creative", email: email("karimirimbui") },
      { id: "kelai-wanjiru", name: "Kelai Wanjiru", role: "Director", ministry: "Digital Media & Communications", email: email("kelaiwanjiru") },
      { id: "kidane-adala", name: "Kidane Adala", role: "Director", ministry: "Services & Production", email: email("kidaneadala") },
      // TODO(content): confirm title with church
      { id: "gibson-gitonga", name: "Gibson Gitonga", ministry: "Services & Production (Next Gen)", email: email("gibsongitonga") },
      // TODO(content): confirm title with church — the old site says “Production Assistant”
      { id: "andruga-sefu", name: "Andruga Sefu", ministry: "Services & Production", email: email("andrugavuni") },
      // TODO(content): not in 2026 bulletin, confirm with church
      { id: "bernice-kinuthia", name: "Bernice Kinuthia", role: "Coordinator", ministry: "Services & Production", email: email("bernicekinuthia"), published: false },
    ],
  },
  {
    // Shown (with its filter option) automatically once anyone here is published
    id: "support",
    title: "Ministry support staff",
    members: [
      // TODO(content): not in 2026 bulletin, confirm with church
      { id: "richard-mbukha", name: "Richard Mbukha", role: "Ministry Support Staff", published: false },
      // TODO(content): not in 2026 bulletin, confirm with church
      { id: "simon-kimani", name: "Simon Kimani", role: "Ministry Support Staff", published: false },
      // TODO(content): not in 2026 bulletin, confirm with church
      { id: "allan-wafula", name: "Allan Wafula", role: "Ministry Support Staff", published: false },
    ],
  },
];

/** Only the people the site shows; a group with nobody published is dropped (and so is its filter) */
const publishedGroups = teamGroups
  .map((g) => ({ ...g, members: g.members.filter((m) => m.published !== false) }))
  .filter((g) => g.members.length > 0);

export const team = {
  title: "Our team",
  intro: "Meet the pastors and staff who serve Nairobi Chapel Ngong Road.",
  /** every group as supplied, including unpublished people */
  allGroups: teamGroups,
  /** what the page renders: Leadership first, then the filterable groups */
  groups: publishedGroups,
  // TODO(content): 1–2 sentence welcome from Rev. Nick Korir
  welcome: "[TODO: 1–2 sentence welcome from Rev. Nick Korir]",
  /**
   * Office Bearers (moved here from the old "Our Publications" page).
   * Names and roles are not yet known: add them as `members` entries
   * (name + role) once the church supplies them. Never invent people.
   */
  officeBearers: {
    title: "Office Bearers",
    intro: "[TODO: one-line description of the office bearers' role]",
    members: [] as TeamMember[],
    placeholder: "[TODO: names and roles of the Nairobi Chapel Office Bearers (from the Office Bearers document)]",
  },
};

/* ------------------------------------------------------------------ */
/* /about/financials                                                   */
/* ------------------------------------------------------------------ */

export type AnnualReport = {
  /** label as the church writes it, e.g. "2019/2020" */
  year: string;
  title: string;
  /** file in /public/reports; a TODO string when the file is missing */
  file: string;
  /** file size shown on the download button */
  size?: string;
};

export const financials = {
  title: "Our Financials",
  intro:
    "We’re accountable for every shilling given. Our accounts are audited independently every year, overseen by the Elders’ Court, and presented to members at our Annual General Meeting.",

  glance: {
    title: "2025 at a glance",
    note: "Financial year ended 31 December 2025, consolidated for all Nairobi Chapel congregations",
    /** the four headline figures shown large */
    headline: ["Total income", "Total expenditure", "Surplus", "Total assets"],
    rows: [
      { label: "Total income", y2025: "KSh 962.68M", y2024: "KSh 858.10M", change: "+12%" },
      { label: "Tithes & offerings", y2025: "KSh 727.31M", y2024: "KSh 718.05M", change: "+1%" },
      {
        label: "Designated giving",
        detail: "Projects, ministries, LOGOS, discipleship",
        y2025: "KSh 235.37M",
        y2024: "KSh 140.05M",
        change: "+68%",
      },
      { label: "Total expenditure", y2025: "KSh 881.90M", y2024: "KSh 745.08M", change: "+18%" },
      { label: "Surplus", y2025: "KSh 80.79M", y2024: "KSh 113.02M", change: "−29%" },
      { label: "Total assets", y2025: "KSh 1,045M", y2024: "KSh 1,037M", change: "+1%" },
    ] as { label: string; detail?: string; y2025: string; y2024: string; change: string }[],
  },

  givingWent: {
    title: "Where giving went in 2025",
    items: [
      {
        title: "Land for a church home",
        text: "The church spent KSh 42.91M on a second acre for Nairobi Chapel Ongata Rongai. This is part of its goal to move congregations into their own buildings, since rent cost KSh 38M in 2025.",
      },
      {
        title: "Better systems",
        text: "A KSh 5.9M ERP system (Microsoft Dynamics) now links finance, procurement, payroll, and HR across all the churches.",
      },
      {
        title: "Ministry growth",
        text: "Spending on designated ministry projects rose 68%. Direct ministry costs rose 4% and ministry support costs 7%. Staff costs fell 2%.",
      },
      {
        title: "Prudent reserves",
        text: "KSh 452.56M is held in short-term deposits for designated purposes. These include a target buffer of six months’ running costs, asset replacement, and future building projects.",
      },
    ],
  },

  impact: {
    title: "What your giving made possible in 2025",
    note: "Ministry highlights across all Nairobi Chapel churches",
    groups: [
      {
        title: "In-person congregants",
        stats: [
          { value: "6,043", label: "adults" },
          { value: "1,116", label: "youth" },
          { value: "3,189", label: "children" },
        ],
      },
      {
        title: "Coming to faith",
        stats: [
          { value: "2,168", label: "decisions for Christ" },
          { value: "486", label: "new believers" },
          { value: "243", label: "baptisms" },
        ],
      },
      {
        title: "Growing together",
        stats: [
          { value: "111", label: "eGroups" },
          { value: "534", label: "Plug-In participants" },
          { value: "822", label: "women’s ministry participants" },
          { value: "1,874", label: "Man Enough graduates" },
        ],
      },
      {
        title: "Raising leaders",
        stats: [
          { value: "238", label: "LOGOS scholars, supported by 60 active mentors" },
          { value: "25", label: "Kinara Leadership Program graduates, with interns serving in 12 church plants" },
        ],
      },
      {
        title: "Care for families",
        stats: [
          { value: "84", label: "couples through pre-marital counselling" },
          { value: "40", label: "marriages officiated" },
          { value: "145", label: "people in DivorceCare" },
          { value: "113", label: "people in GriefShare" },
        ],
      },
    ],
  },

  governance: {
    title: "Governance",
    paragraphs: [
      "Under the Church Constitution and the Societies Act, the Elders’ Court is responsible for financial oversight. It is supported by the Finance Committee, advisory boards and strategic teams in each congregation.",
      "Day-to-day financial management rests with the Finance team, led by the Finance and Administration Director together with the congregations’ Lead Pastors.",
    ],
    people: [
      { role: "Treasurer", name: "Michael Murimi" },
      { role: "Finance & Administration Director", name: "Jane Mungai" },
      { role: "Auditors", name: "Kreston KM & Company LLP, Certified Public Accountants" },
    ],
    opinionTitle: "Auditor’s opinion",
    opinion:
      "Kreston KM & Company LLP found that the summary financial statements give a true and fair view of the Church’s financial position as at 31 December 2025, and of its performance and cash flows for the year, in line with International Financial Reporting Standards and the Kenyan Societies Act.",
  },

  reportsTitle: "Annual reports",
  reports: [
    { year: "2025", title: "Annual Report 2025", file: "/reports/annual-report-2025.pdf", size: "18 MB" },
    { year: "2024", title: "Annual Report 2024", file: "/reports/annual-report-2024.pdf", size: "3.4 MB" },
    { year: "2023", title: "Annual Report 2023", file: "/reports/annual-report-2023.pdf", size: "3.9 MB" },
    { year: "2022", title: "Annual Report 2022", file: "/reports/annual-report-2022.pdf", size: "5.9 MB" },
    { year: "2021", title: "Annual Report 2021", file: "/reports/annual-report-2021.pdf", size: "11.9 MB" },
    { year: "2019/2020", title: "Annual Report 2019/2020", file: "/reports/annual-report-2019-2020.pdf", size: "15.3 MB" },
    // The current site only has the 2018 cover image, not the report itself.
    { year: "2018", title: "Annual Report 2018", file: "[TODO: the Annual Report 2018 PDF]" },
  ] as AnnualReport[],
};
