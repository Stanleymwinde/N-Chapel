import type { AcronymLetter, InfoBlock, MinistryBase } from "./types";

export const nextGen: MinistryBase & {
  programmes: (InfoBlock & { label: string; acronym?: AcronymLetter[]; outcome?: string })[];
} = {
  slug: "next-gen-youth",
  href: "/ministries/next-gen-youth",
  name: "Next Gen",
  title: "Next Gen youth church",
  meta: {
    title: "Next Gen youth church",
    description:
      "Next Gen is Nairobi Chapel Ngong Road's youth church: Club Xpressions for teens, the Crossroads rite-of-passage programme and VUMA for school leavers.",
  },
  intro: "Next Gen is where teenagers find God, worship in a real way and grow into who He made them to be.",
  heroImage: "nextgen.hero",
  facts: [
    { icon: "users", label: "Who", value: "Teenagers [TODO: confirm Next Gen age range]" },
    { icon: "clock", label: "When", value: "[TODO: Next Gen meeting day and time]" },
    { icon: "mapPin", label: "Where", value: "The tent at the far corner of the church compound [TODO: confirm venue for all Next Gen programmes]" },
    { icon: "phone", label: "Contact", value: "[TODO: Next Gen contact]" },
  ],
  programmes: [
    {
      id: "club-xpressions",
      label: "For teens",
      title: "Club Xpressions",
      summary:
        "Our teen service, where “Xpressionites” meet in the tent at the far corner of the church compound.",
      bullets: [
        "A vibrant worship team",
        "Teen presenters who lead the service",
        "Sermon series on the issues teens face today",
        "A welcoming place for those who don't yet know God",
      ],
      image: "nextgen.clubxp",
    },
    {
      id: "crossroads",
      label: "2-year programme",
      title: "Crossroads",
      summary:
        "Crossroads guides children through the transition into their teenage years: separation from childhood, training, and returning as young adults who are growing physically, spiritually, emotionally and socially.",
      bullets: [
        "Evangelistic outreaches and community service",
        "Experiential learning expeditions",
        "Culminates in ROPES Camp (Rites of Passage Experiences)",
        "In the second year, boys attend Moran Camp, a biblically sound rite-of-passage camp for boys aged 12–14 [TODO: confirm age range; the camp page says 12–15]",
      ],
      image: "nextgen.crossroads",
      // The page swaps this for the next Moran Camp event page when one is listed in events.ts
      cta: { label: "See Moran Camp dates", href: "/events" },
    },
    {
      id: "vuma",
      label: "8 months, residential",
      title: "VUMA",
      summary:
        "VUMA is a residential discipleship and leadership programme for school leavers in the gap between high school and college.",
      acronym: [
        { letter: "V", word: "Vibrant in purpose", text: "discovering your calling and career" },
        { letter: "U", word: "Unveiled in potential", text: "your talents and spiritual gifts, with practical ministry in churches and schools" },
        { letter: "M", word: "Mature in person", text: "growing in self-awareness" },
        { letter: "A", word: "Anchored in principle", text: "a firm spiritual foundation" },
      ],
      outcome: "Young adults who are secure in their identity in Christ and ready for college life.",
      image: "nextgen.vuma",
      cta: { label: "Ask about VUMA", href: "/contact?subject=General" },
    },
  ],
  nextStep: {
    title: "Teens, come as you are",
    text: "Bring a friend to Club Xpressions on Sunday. Parents, plan your family's first visit here.",
    primary: { label: "Plan your visit", href: "/new-here/plan-your-visit" },
    secondary: { label: "Read our safeguarding policy", href: "/safeguarding" },
  },
};
