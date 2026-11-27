import type { Fact, Link, PathwayStep } from "./types";
import { site } from "./site";

/** Homepage content. Events and the latest sermon come from events.ts and sermons.ts. */
export const home = {
  meta: {
    title: "Called to be disciples of Jesus",
    description:
      "Nairobi Chapel Ngong Road: join us on Sundays at 9:00 or 11:30 AM on Ngong Road, Nairobi, or watch live from anywhere. Plan your visit, find a group or give.",
  },

  hero: {
    eyebrow: "Nairobi Chapel Ngong Road",
    title: "Called to be disciples of Jesus.",
    subline: "Join us this Sunday at 9:00 or 11:30 AM on Ngong Road, Nairobi, or watch live from anywhere.",
    primary: { label: "Plan your visit", href: "/new-here/plan-your-visit" } satisfies Link,
    secondary: { label: "Watch live", href: "/watch" } satisfies Link,
    /**
     * Optional background video (≤ 15 s, 720p, muted). Leave null to use the
     * still image. Files go in public/media/home/.
     */
    video: {
      mp4: "/media/home/hero.mp4",
      // TODO: add a WebM version (no ffmpeg was available when this was set up)
      webm: undefined,
      poster: "/media/home/hero.jpg",
    } as null | { mp4: string; webm?: string; poster: string },
  },

  thisSunday: [
    { icon: "clock", label: "Times", value: "Sundays at 9:00 AM and 11:30 AM" },
    { icon: "mapPin", label: "Location", value: "Ngong Road, Nairobi. Get directions", href: site.mapUrl },
    {
      icon: "baby",
      label: "Kids",
      // TODO (CONTENT-TODO.md): confirm Quest runs at both services before saying so here
      value: "Quest for ages 2–11",
      href: "/ministries/quest-children",
    },
  ] satisfies Fact[],

  whatsOn: {
    title: "What’s on",
    intro: "Gatherings, conferences and special services coming up at Nairobi Chapel Ngong Road. There’s something for every age.",
  },

  steps: {
    title: "New here? Three simple steps",
    intro: "Wherever you are with God, there's a place for you here.",
    items: [
      {
        title: "Visit on a Sunday",
        summary: "Come at 9:00 or 11:30 AM. We'll save you a seat and look after your kids.",
        cta: { label: "Plan your visit", href: "/new-here/plan-your-visit" },
      },
      {
        title: "Join Plug-In",
        summary: "A 10-week journey to connect with God, community, church and your purpose.",
        cta: { label: "See next steps", href: "/new-here/next-steps" },
      },
      {
        title: "Find your community",
        summary: "eGroups meet in homes across Nairobi to grow, build friendships and serve.",
        cta: { label: "Find a group", href: "/get-involved/groups" },
      },
    ] satisfies PathwayStep[],
    prayer: { label: "Need prayer? Talk to us", href: "/ministries/prayer#request" } satisfies Link,
  },

  /** Repeated in the gold statement band under the mission. */
  statement: "Being disciples, making disciples",
  /** The two lines of the full-width statement band. */
  statementLines: ["Being disciples,", "making disciples"],

  /** "Your next step" tiles (four-up row). */
  tiles: [
    { title: "New here?", text: "Everything you need for your first Sunday", detail: "Sundays 9:00 & 11:30 AM", href: "/new-here/plan-your-visit", cta: "Plan your visit", image: "newhere.hero" },
    { title: "eGroups", text: "Small groups meeting in homes across Nairobi", detail: "Find one near you", href: "/get-involved/groups", cta: "Find a group", image: "home.community" },
    { title: "Join a team", text: "Use your time and gifts to serve others", detail: "Greeters, ushers, worship and more", href: "/get-involved/serve", cta: "Serve on a team", image: "home.together" },
    { title: "Watch online", text: "Worship with us from anywhere", detail: "Live on Sundays", href: "/watch", cta: "Watch live", image: "watch.hero" },
  ],

  /** Featured "What's on" rows: image per ministry (falls back to events.hero). */
  featuredImages: {
    "/ministries/next-gen-youth": "nextgen.crossroads",
    "/ministries/quest-children": "quest.worship",
    "/ministries/prayer": "prayer.hero",
  } as Record<string, string>,

  rhythms: {
    title: "Our mission",
    items: [
      { title: "Connect with God", text: "[TODO: one-line description of Connect with God]", href: "/ministries/prayer" },
      { title: "Grow in faith", text: "[TODO: one-line description of Grow in faith]", href: "/ministries/discipleship" },
      { title: "Serve others", text: "[TODO: one-line description of Serve others]", href: "/get-involved/serve" },
    ],
  },

  ministries: {
    title: "For every age and stage",
    items: [
      { title: "Quest", summary: "The great adventure of knowing God, for children.", who: "Ages 2–11", href: "/ministries/quest-children", image: "quest.hero", cta: "Explore Quest" },
      { title: "Next Gen", summary: "Where teenagers find God and grow into who He made them to be.", who: "Teens", href: "/ministries/next-gen-youth", image: "nextgen.hero", cta: "Explore Next Gen" },
      { title: "BLITZ 5:16", summary: "College students and early-career young people growing deeper with God.", who: "Ages 19–26", href: "/ministries/blitz-young-adults", image: "blitz.hero", cta: "Explore BLITZ 5:16" },
      { title: "Binti", summary: "Women standing together, lifting each other up and praying.", who: "Women", href: "/get-involved/groups?who=women", image: "groups.binti", cta: "Meet Binti" },
      { title: "Men’s Ministry", summary: "Men growing in faith, friendship and service together.", who: "Men", href: "/get-involved/groups?who=men", image: "groups.jabari", cta: "Meet the men’s ministry" },
    ],
  },

  community: {
    title: "Find your community",
    text: "Life is better together. eGroups are small groups across Nairobi and its outskirts where members meet in homes to grow, build friendships and serve one another. This is where the life of the church happens.",
    cta: { label: "Find a group", href: "/get-involved/groups" } satisfies Link,
  },

  give: {
    verse: "A generous soul will prosper.",
    reference: "Proverbs 11:25",
    text: "Your giving supports ministry in our church and community, such as the PPI Bible Drive, which aims to give 700 Bibles to children in the community around us.",
    story: { label: "See a real impact story", href: "/events/ppi-bible-drive" } satisfies Link,
    cta: { label: "Give now", href: "/give" } satisfies Link,
  },

  pastor: {
    title: "Welcome from our pastor",
    message: "[TODO: 2–3 sentence welcome from the senior pastor]",
    name: "[TODO: pastor's name]",
    role: "[TODO: pastor's role]",
    /** TODO: replace with a real, consented photo (never a stock photo of a person) */
    initials: "NC",
  },

  nextStep: {
    title: "We'd love to meet you this Sunday",
    text: "Find out what to expect, where to park and how we look after your kids.",
    primary: { label: "Plan your visit", href: "/new-here/plan-your-visit" },
    secondary: { label: "Get counselling", href: "/ministries/counselling-care" },
  },
};
