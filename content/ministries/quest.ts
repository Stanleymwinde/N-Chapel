import type { AcronymLetter, InfoBlock, MinistryBase } from "./types";

/**
 * Quest children's ministry. Text follows the church's own Quest page copy
 * (supplied by the church), lightly edited for spelling and punctuation only.
 */
export const quest: MinistryBase & {
  welcome: string[];
  quote: string;
  vision: string;
  faith: AcronymLetter[];
  visionVerse: { text: string; reference: string };
  strategy: { title: string; paragraphs: string[]; note?: string; cta?: { label: string; href: string } }[];
  programmesIntro: string;
  ageGroups: {
    group: string;
    meaning: string;
    ages: string;
    classes: { name: string; meaning: string; age: string }[];
  }[];
  serviceFlow: string[];
  safety: { title: string; points: string[] };
  deepIntro: string;
  moreForKids: InfoBlock[];
  parents: { details: string[]; requirement: string };
  community: InfoBlock[];
} = {
  slug: "quest-children",
  href: "/ministries/quest-children",
  name: "Quest",
  title: "Quest children's ministry",
  meta: {
    title: "Quest children's ministry",
    description:
      "Quest is Nairobi Chapel Ngong Road's ministry for children aged 2–11: age-grouped Sunday classes, safe sign-in and pick-up, parenting classes, PPI in schools, SomaNami reading camps and Africa Children's Prayer Day.",
  },
  intro: "Our name, QUEST, embodies the great adventure of knowing God, discovering His Word and enjoying His people.",
  heroImage: "quest.hero",
  facts: [
    { icon: "clock", label: "When", value: "Sundays during services [TODO: confirm Quest runs at both the 9:00 and 11:30 AM services]" },
    { icon: "baby", label: "Ages", value: "2–11 years" },
    { icon: "mapPin", label: "Where", value: "Quest Centre [TODO: confirm the Quest Centre is the Sunday venue]" },
    { icon: "phone", label: "Contact", value: "[TODO: Quest contact phone or email]" },
  ],

  welcome: [
    "We firmly believe that children are important and have a special place in God's heart (Matthew 18:2–9), and that they can be born again (Matthew 18:14).",
    "We also strive to create opportunities for children to nurture and use their God-given gifts to serve their peers and the greater Body of Christ.",
  ],
  // [TODO: confirm the source of this quotation; it paraphrases Matthew 18:3–4]
  quote: "Jesus teaches that people must become humble like children to enter the Kingdom of Heaven.",

  vision:
    "Our vision at Quest is to nurture children of F.A.I.T.H. who will grow D.E.E.P. in their personal relationships with Jesus and reach W.I.D.E. in loving and serving others.",
  faith: [
    { letter: "F", word: "Firm foundation", text: "in the Word of God" },
    { letter: "A", word: "Active devotion", text: "expressed in a worshipping lifestyle and spiritual disciplines" },
    { letter: "I", word: "Involvement", text: "in God's community of love and service" },
    { letter: "T", word: "Transformed lives", text: "seen in Christ-like character" },
    { letter: "H", word: "[TODO: the “H” in F.A.I.T.H.]", text: "[TODO: missing on the church's Quest page]" },
  ],
  visionVerse: {
    text: "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus. Do not quench the Spirit.",
    reference: "1 Thessalonians 5:16–19",
  },

  strategy: [
    {
      title: "The parents",
      paragraphs: [
        "God has clearly given the ultimate responsibility for the spiritual development of children to parents (Deuteronomy 6:1–9). We therefore see ourselves as guides supporting our parents, who have the primary mandate from God to imprint lasting guidance and teaching in their children.",
        "To equip and support parents in their mandate, we run three seasons of Parenting Classes and a one-day Parenting Seminar every year.",
      ],
      cta: { label: "Register for parenting classes", href: "/contact?subject=Events" },
    },
    {
      title: "Volunteer based",
      paragraphs: [
        "The nurture of children takes place in community. In addition to partnering with parents as volunteers, we also partner with members of our congregation. We have many opportunities for volunteers to use their gifts as they work in cooperation with the Holy Spirit to see transformation in the lives of the children and entire families.",
      ],
      note: "All volunteers are trained to equip them to serve effectively, and screened for the safety of the children.",
      cta: { label: "Volunteer with Quest", href: "/get-involved/serve" },
    },
    {
      title: "Bible-based programmes",
      paragraphs: [
        "We make every effort to ensure that our ministry to the children is age appropriate, Bible based, application oriented, and in the context of intentional discipleship.",
      ],
      cta: { label: "See the age groups", href: "#age-groups" },
    },
  ],

  programmesIntro:
    "Our classes at Quest are divided into two main clusters, Kiota and Jasiri, and further into the following age groups.",
  ageGroups: [
    {
      group: "Kiota",
      meaning: "nest",
      ages: "2–5 years",
      classes: [
        { name: "Itibari", meaning: "Faith bud", age: "2" },
        { name: "Neema", meaning: "Grace", age: "3" },
        { name: "Imani", meaning: "Faith", age: "[TODO: confirm Imani age (the Quest page says 3, the same as Neema; likely 4–5)]" },
      ],
    },
    {
      group: "Jasiri",
      meaning: "courage",
      ages: "6–11 years",
      classes: [
        { name: "Sifa", meaning: "Praise", age: "6–7" },
        { name: "Shangwe", meaning: "Jubilation", age: "8–9" },
        { name: "Johari", meaning: "Gem", age: "10–11" },
      ],
    },
  ],

  serviceFlow: ["Large group worship", "Large group Bible teaching", "Small group interaction", "Scripture memorisation", "Bible crafts"],
  safety: {
    title: "Child safety",
    points: [
      "Every parent is required to sign their children in whenever they bring them to Quest, and to sign them out at pick-up.",
      "Each parent receives a tag with a special code when registering their child into any Quest programme, and must present this tag at collection.",
      "All volunteers are trained and screened for the safety of the children.",
    ],
  },

  deepIntro: "Further to our weekly service, we provide opportunities for our children to grow D.E.E.P. through:",
  moreForKids: [
    {
      title: "Quest Worship Team",
      summary: "Engaging children in the worship team, as vocalists and instrumentalists.",
    },
    {
      title: "New Believers Classes",
      summary: "Taking those who freshly commit their lives to Jesus as Lord and Saviour through New Believers Classes, in partnership with their parents.",
    },
    {
      title: "Baptism Classes",
      summary:
        "Taking children aged 10 and over who have made a personal commitment to Jesus through five weeks of preparation before they are baptised by public immersion, of their own accord.",
    },
    {
      title: "Gems & Eagles",
      summary:
        "Small-group discipleship and mentoring through our mums and daughters (Gems) and dads and sons (Eagles) groups. The groups meet at least once a month for Bible study and life-skills coaching with their mentors.",
    },
  ],

  parents: {
    details: ["Three seasons of Parenting Classes a year, plus a one-day Parenting Seminar.", "2027: January–April in person; June–August online, with the first and last classes in person."],
    requirement: "Parenting classes are a prerequisite for child dedication.",
  },

  community: [
    {
      id: "ppi",
      title: "PPI in primary schools",
      summary:
        "PPI (Pastoral Programme Instruction [TODO: confirm the PPI expansion]) is a “Special Syllabus” for pastoral aspects of religion outside Christian Religious Education (CRE) classes. This 30-minute weekly slot for teaching Scripture is provided for in the Education Act of 1968 (revised 1980 and 2013) for all primary schools. It is an opportunity to introduce primary school children to the totality of the Christian faith, and to nurture a biblical worldview in them in their formative years.",
      bullets: [
        "Quest currently runs PPI in 6 schools around us: 4 public and 2 private.",
        "We use the Kenya Institute of Curriculum Development (KICD) approved PPI curriculum, Know, Grow, Serve. Nairobi Chapel is part of the consortium of organisations that wrote it.",
      ],
      image: "quest.community",
    },
    {
      id: "somanami",
      title: "SomaNami reading camps",
      summary:
        "During school holidays, Quest runs free reading camps with a Bible focus. The camps are run in one of the needy schools around us, with the aim of evangelising and discipling the children further to PPI, improving their reading and comprehension, and feeding children who would otherwise not get frequent nutritious meals outside the in-term school-feeding programmes.",
      image: "quest.worship",
    },
    {
      id: "acpd",
      title: "Africa Children's Prayer Day",
      summary:
        "As part of Childnet Tuamke, a network of children's pastors and workers from various churches and organisations, Quest hosts an annual children's prayer day. It encourages children to stand in the gap through prayer for their families, our leaders, country, continent and the world.",
      bullets: [
        "The day is preceded by a month of learning about prayer.",
        "It rallies children from schools, children's homes and churches around us to pray in unity.",
        "It is observed by churches across all 47 counties of Kenya and in other African countries on the first Saturday of October each year.",
      ],
      image: "outreach.mission",
    },
  ],

  nextStep: {
    title: "Bring your children this Sunday",
    text: "Arrive a little early on your first visit so we can register your child and give you your pick-up tag.",
    primary: { label: "Plan your visit", href: "/new-here/plan-your-visit" },
    secondary: { label: "Download children's resources", href: "/resources?audience=children" },
  },
};
