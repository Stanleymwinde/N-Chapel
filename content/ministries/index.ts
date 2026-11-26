import type { MediaKey } from "../types";

/** Ministries overview: grouped by age/stage and by focus. */
export type MinistrySummary = {
  name: string;
  href: string;
  summary: string;
  who: string;
  when?: string;
  image?: MediaKey;
};

export const ministriesOverview = {
  meta: {
    title: "Ministries",
    description:
      "Find your place at Nairobi Chapel Ngong Road: ministries for children, teens and young adults, plus prayer, discipleship, outreach, social justice, counselling, marketplace and disability ministry.",
  },
  title: "Ministries",
  intro:
    "We are committed to helping people grow D.E.E.P. to reach W.I.D.E. There's a place for every age and stage, and a way for everyone to serve.",
  byAge: [
    {
      name: "Quest children's ministry",
      href: "/ministries/quest-children",
      summary: "Age-grouped Sunday classes where children discover God's Word and enjoy His people.",
      who: "Ages 2–11",
      when: "Sundays",
      image: "quest.hero",
    },
    {
      name: "Next Gen youth church",
      href: "/ministries/next-gen-youth",
      summary: "Where teenagers find God, worship in a real way and grow into who He made them to be.",
      who: "Teens",
      image: "nextgen.hero",
    },
    {
      name: "BLITZ 5:16 young adults",
      href: "/ministries/blitz-young-adults",
      summary: "College students and early-career young people building a deeper relationship with God.",
      who: "Ages 19–26",
      when: "Sundays 11:30 AM",
      image: "blitz.hero",
    },
  ] satisfies MinistrySummary[],
  byFocus: [
    {
      name: "Prayer",
      href: "/ministries/prayer",
      summary: "Weekday morning prayer, a Wednesday prayer service and prayer every Sunday.",
      who: "Everyone",
      image: "prayer.hero",
    },
    {
      name: "Discipleship",
      href: "/ministries/discipleship",
      summary: "Plug-In, New Believers, baptism, eGroups and DEPTH teaching.",
      who: "Everyone",
      image: "discipleship.hero",
    },
    {
      name: "Outreach",
      href: "/ministries/outreach",
      summary: "Prison, sports, community and mission: introducing people to Jesus.",
      who: "Everyone",
      image: "outreach.hero",
    },
    {
      name: "Social justice",
      href: "/ministries/social-justice",
      summary: "Benevolence, the Women Empowerment Program and Hands of Compassion.",
      who: "Everyone",
      image: "justice.hero",
    },
    {
      name: "Counselling and care",
      href: "/ministries/counselling-care",
      summary: "Free, confidential counselling, an addiction support group and GriefShare.",
      who: "Everyone",
      image: "counselling.hero",
    },
    {
      name: "Marketplace Ministry",
      href: "/ministries/marketplace",
      summary: "Equipping professionals to represent God's kingdom at work.",
      who: "Professionals",
      image: "marketplace.hero",
    },
    {
      name: "Enzi disability ministry",
      href: "/ministries/enzi",
      summary: "Enzi means treasured. Working for inclusion and access for people with disabilities.",
      who: "Everyone",
      image: "enzi.hero",
    },
  ] satisfies MinistrySummary[],
  nextStep: {
    title: "Not sure where to start?",
    text: "Visit on a Sunday and we'll help you find your place.",
    primary: { label: "Plan your visit", href: "/new-here/plan-your-visit" },
    secondary: { label: "Find a group", href: "/get-involved/groups" },
  },
};

export { quest } from "./quest";
export { nextGen } from "./next-gen";
export { blitz } from "./blitz";
export { prayer } from "./prayer";
export { discipleship } from "./discipleship";
export { outreach } from "./outreach";
export { socialJustice } from "./social-justice";
export { counselling } from "./counselling";
export { marketplace } from "./marketplace";
export { enzi } from "./enzi";

/** Every ministry in one list (age and stage first), for "explore more" links. */
export const allMinistries: (MinistrySummary & { group: "age" | "focus" })[] = [
  ...ministriesOverview.byAge.map((m) => ({ ...m, group: "age" as const })),
  ...ministriesOverview.byFocus.map((m) => ({ ...m, group: "focus" as const })),
];
