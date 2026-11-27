import type { Audience, ChurchEvent, EventType, ISODate, MediaKey } from "./types";

/**
 * What's On. One list, three kinds of event:
 *
 * - "dated":   has a startDate (and optional endDate). Upcoming while
 *              (endDate ?? startDate) is today or later, Nairobi time; then Past.
 * - "ongoing": runs every week or all the time. Shown in the "Every week" strip,
 *              never moves to Past.
 * - "tba":     the date isn't known yet. Shown under "Date to be announced",
 *              never in a month and never in Past.
 *
 * Leave unknown fields out (never guess) and add a TODO(content) comment.
 * `published: false` keeps an entry in the file without showing it anywhere.
 */
export type EventStatus = "dated" | "tba" | "ongoing";

export type WhatsOnEvent = {
  slug: string;
  title: string;
  /** 1–2 lines for the card; "" while unknown */
  summary: string;
  type: EventType;
  /** matches the audience filter values (content/types.ts → Audience) */
  audience: Audience[];
  status: EventStatus;
  startDate?: ISODate;
  endDate?: ISODate;
  /** human-readable, e.g. "6:30–7:30 PM" */
  time?: string;
  location?: string;
  /** e.g. "Every Thursday" */
  recurrence?: string;
  /** ongoing events: the weekday shown in the date block, e.g. "THU" */
  weekday?: string;
  /** the card's main action; leave `href` out while the link is unknown (the card then links to the event page) */
  action?: { label: string; href?: string };
  published: boolean;
  /* Event page extras */
  body?: string[];
  contact?: { phone?: string; email?: string };
  /** related ministry page */
  ministry?: string;
  /** shows a safeguarding note on the event page */
  involvesChildren?: boolean;
  /** only a photo of this event or its subject; otherwise a brand tile is shown */
  image?: MediaKey;
};

const MORAN_SUMMARY =
  "A 12-day away camp taking boys aged 12–15 through the rites of passage in a biblically sound, transformational environment, with parents engaged throughout.";

export const whatsOn: WhatsOnEvent[] = [
  /* ---------------- Dated ---------------- */
  {
    slug: "moran-camp-november-2026",
    title: "Moran Camp: Boys’ Rites of Passage, November 2026 cohort",
    summary: MORAN_SUMMARY,
    image: "events.moran",
    type: "Camp",
    audience: ["Youth", "Parents"],
    status: "dated",
    startDate: "2026-11-08",
    endDate: "2026-11-20",
    // TODO(content): camp venue
    // TODO(content): Moran Camp registration link (November 2026 cohort)
    action: { label: "Register" },
    published: true,
    body: [
      "Moran Camp is a biblically grounded cultural rite of passage for boys, run by Next Gen as part of Crossroads.",
      "Parents can get full details of the programme, what to pack and the daily schedule from the Moran Camp team.",
    ],
    contact: { phone: "0796 696 443", email: "moran@nairobichapel.org" },
    ministry: "/ministries/next-gen-youth",
    involvesChildren: true,
  },
  {
    slug: "moran-camp-july-2027",
    title: "Moran Camp: Boys’ Rites of Passage, July 2027 cohort",
    summary: MORAN_SUMMARY,
    image: "events.moran",
    type: "Camp",
    audience: ["Youth", "Parents"],
    status: "dated",
    startDate: "2027-07-18",
    endDate: "2027-07-30",
    // TODO(content): camp venue
    // TODO(content): Moran Camp registration link (July 2027 cohort)
    action: { label: "Register" },
    published: true,
    body: ["Moran Camp is a biblically grounded cultural rite of passage for boys, run by Next Gen as part of Crossroads."],
    contact: { phone: "0796 696 443", email: "moran@nairobichapel.org" },
    ministry: "/ministries/next-gen-youth",
    involvesChildren: true,
  },
  {
    slug: "kenya-peace-summit-2026",
    title: "2026 Kenya Peace Summit",
    summary: "A conference by Bridgeway Community Church, Gracism Global and Nairobi Chapel Ngong Road.",
    type: "Conference",
    audience: ["Everyone"],
    status: "dated",
    startDate: "2026-10-29",
    endDate: "2026-10-30",
    time: "29 Oct, 1:00–6:00 PM; 30 Oct, 8:30 AM–4:00 PM",
    // TODO(content): venue
    published: true,
  },

  /* ---------------- Ongoing / every week ---------------- */
  {
    slug: "addiction-support-groups",
    title: "Addiction Support Groups",
    summary: "",
    type: "Fellowship",
    audience: ["Everyone"],
    status: "ongoing",
    recurrence: "Every Thursday",
    weekday: "THU",
    time: "6:30–7:30 PM",
    // TODO(content): one-line summary and venue
    // TODO(content): sign-up link for the addiction support groups
    action: { label: "Sign up" },
    published: true,
    ministry: "/ministries/counselling-care",
  },
  {
    slug: "free-counselling",
    title: "Free Counselling",
    summary: "Counselling for personal struggles, marriage challenges, teen issues and mental health concerns.",
    type: "Service",
    audience: ["Everyone"],
    status: "ongoing",
    // TODO(content): confirm which days each set of hours applies to (an earlier copy said Wednesday and Friday 10 AM–4 PM, Saturday 9 AM–2 PM)
    time: "10:00 AM–4:00 PM and 9:00 AM–2:00 PM",
    // TODO(content): booking link for counselling sessions
    action: { label: "Book a session" },
    published: true,
    ministry: "/ministries/counselling-care",
  },
  {
    slug: "griefshare-circle",
    title: "GriefShare Circle",
    summary: "A safe place to share your loss.",
    type: "Fellowship",
    audience: ["Everyone"],
    status: "ongoing",
    // TODO(content): GriefShare schedule (day, time and venue)
    published: true,
    ministry: "/ministries/counselling-care",
  },
  {
    slug: "ppi-bible-drive",
    title: "PPI Bible Drive",
    summary: "KSh 1,000 gives one child their own Bible. M-Pesa Paybill 508701, account “PPI Bible”.",
    type: "Fundraiser",
    audience: ["Everyone"],
    status: "ongoing",
    location: "Quest Centre (Bible drop-off)",
    action: { label: "Give a Bible", href: "/give?reason=ppi-bible#mpesa" },
    published: true,
    body: [
      "Putting Bibles in the hands of 700 children in schools around us. KSh 1,000 gives one child their own Bible.",
      "Give via M-Pesa Paybill 508701, account “PPI Bible”, or drop a Bible at the Quest Centre any Sunday or during the week.",
    ],
    ministry: "/ministries/quest-children",
    image: "give.ppi",
  },

  /* ---------------- Date to be announced ---------------- */
  {
    slug: "moms-and-daughters-high-tea",
    title: "Moms & Daughters High Tea",
    // TODO(content): one-line summary
    summary: "",
    type: "Fellowship",
    audience: ["Women"],
    status: "tba",
    // TODO(content): booking link for the High Tea
    action: { label: "Book your seat" },
    published: true,
  },
  {
    slug: "community-outreach-tujuane",
    title: "Community Outreach at Tujuane Community Centre",
    // TODO(content): one-line summary
    summary: "",
    type: "Outreach",
    audience: ["Everyone"],
    status: "tba",
    location: "Tujuane Community Centre",
    published: true,
    ministry: "/ministries/outreach",
  },
  {
    slug: "parenting-classes-2027",
    title: "Parenting Classes 2027",
    // TODO(content): one-line summary
    summary: "",
    type: "Class",
    audience: ["Parents"],
    status: "tba",
    published: true,
    ministry: "/ministries/quest-children",
  },
  {
    // TODO(content): confirm which Quest camp is current — the church site titles it “The King and I: December Quest Camp” but describes an August “SPLASH” day camp
    slug: "quest-holiday-camp",
    title: "The King and I: December Quest Camp",
    summary: "",
    type: "Camp",
    audience: ["Children"],
    status: "tba",
    published: false,
    ministry: "/ministries/quest-children",
    involvesChildren: true,
  },

  /* ---------------- Unverified: not shown ---------------- */
  // TODO(content): not on church site, confirm with church
  { slug: "family-fun-day-picnic", title: "Family Fun Day Picnic", summary: "", type: "Fellowship", audience: ["Families", "Everyone"], status: "tba", published: false },
  // TODO(content): not on church site, confirm with church
  { slug: "youth-worship-night", title: "Youth Worship Night", summary: "", type: "Service", audience: ["Youth"], status: "tba", published: false },
  // TODO(content): not on church site, confirm with church
  { slug: "womens-prayer-breakfast", title: "Women’s Prayer Breakfast", summary: "", type: "Fellowship", audience: ["Women"], status: "tba", published: false },
  // TODO(content): not on church site, confirm with church
  { slug: "community-clean-up-day", title: "Community Clean-up Day", summary: "", type: "Outreach", audience: ["Everyone"], status: "tba", published: false },
];

// Not an event: the “Around Africa on Motorcycle” coffee table book.
// TODO(content): consider for blog/announcements

/** Everything the site shows */
export const publishedEvents = whatsOn.filter((e) => e.published);

export const getEvent = (slug: string) => publishedEvents.find((e) => e.slug === slug);

/* ------------------------------------------------------------------ */
/* Compatibility: other pages (home, Give, Next Gen, Prayer, Quest)    */
/* read dated events in the older ChurchEvent shape.                   */
/* ------------------------------------------------------------------ */

export type EventEntry = ChurchEvent & { dateTbc?: string };

export const events: EventEntry[] = publishedEvents
  .filter((e): e is WhatsOnEvent & { startDate: ISODate } => e.status === "dated" && Boolean(e.startDate))
  .map((e) => ({
    slug: e.slug,
    title: e.title,
    summary: e.summary,
    body: e.body,
    type: e.type,
    audience: e.audience,
    time: e.time,
    venue: e.location ?? "",
    contact: e.contact,
    cta: e.action?.href ? { label: e.action.label, href: e.action.href } : undefined,
    ministry: e.ministry,
    involvesChildren: e.involvesChildren,
    image: e.image,
    startDate: e.startDate,
    endDate: e.endDate,
    expires: e.endDate ?? e.startDate,
  }));

export const audienceFilters: Audience[] = ["Everyone", "Children", "Youth", "Women", "Men", "Families", "Parents"];
