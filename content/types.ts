/**
 * Shared content types. Every page reads from typed objects in /content so
 * non-developers can edit facts without touching components, and so the
 * data can move to a headless CMS (e.g. Sanity) later with the same shapes.
 *
 * TODO convention: any unknown fact is written inline as
 *   "[TODO: confirm iPRAYSE time]"
 * The <RichText> component renders it with a dashed amber outline in
 * development and as "Details to be confirmed" in production.
 * Every TODO is also listed in /CONTENT-TODO.md.
 */

/** ISO date string, e.g. "2026-11-08" or "2026-11-08T09:00:00+03:00" */
export type ISODate = string;

/** Slot key into /content/media-credits.json (see content/media.ts) */
export type MediaKey = string;

export type Link = {
  label: string;
  href: string;
  /** opens an external site */
  external?: boolean;
};

export type Fact = {
  /** Lucide icon name from src/components/icons.ts */
  icon: IconName;
  label: string;
  value: string;
  href?: string;
};

export type IconName =
  | "clock"
  | "calendar"
  | "mapPin"
  | "users"
  | "phone"
  | "mail"
  | "whatsapp"
  | "baby"
  | "heart"
  | "info"
  | "shield"
  | "repeat"
  | "video"
  | "book"
  | "car"
  | "accessibility"
  | "user"
  | "hand";

export type FaqItem = {
  question: string;
  answer: string;
};

export type PathwayStep = {
  title: string;
  summary: string;
  when?: string;
  bullets?: string[];
  cta?: Link;
};

/** A short section of a ministry/info page. */
export type InfoBlock = {
  id?: string;
  title: string;
  /** one-sentence summary */
  summary: string;
  bullets?: string[];
  facts?: Fact[];
  image?: MediaKey;
  cta?: Link;
};

export type Scripture = {
  text?: string;
  reference: string;
};

/** Anything that disappears automatically when `expires` has passed. */
export type Expiring = {
  startDate: ISODate;
  endDate?: ISODate;
  /** after this moment the item is only shown in archive views */
  expires: ISODate;
};

export type Audience =
  | "Everyone"
  | "Children"
  | "Youth"
  | "Young adults"
  | "Women"
  | "Men"
  | "Families"
  | "Parents";

export type FormFieldType = "text" | "email" | "tel" | "number" | "textarea" | "select" | "checkbox";

export type FormField = {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  helper?: string;
  options?: string[];
  autoComplete?: string;
  placeholder?: string;
  defaultValue?: string;
};

export type FormDefinition = {
  /** identifies the form in /api/forms */
  id: string;
  title: string;
  intro?: string;
  fields: FormField[];
  submitLabel: string;
  successMessage: string;
  privacyNote?: string;
};

/* ---------- Domain types used by cards and listing pages ---------- */

export type EventType = "Camp" | "Class" | "Fundraiser" | "Fellowship" | "Outreach" | "Conference" | "Service";

export type ChurchEvent = Expiring & {
  slug: string;
  title: string;
  summary: string;
  /** longer description paragraphs */
  body?: string[];
  type: EventType;
  audience: Audience[];
  /** human-readable time, e.g. "9:00 AM – 1:00 PM" */
  time?: string;
  venue: string;
  contact?: { phone?: string; email?: string };
  cta?: Link;
  /** related ministry page, e.g. "/ministries/quest-children" */
  ministry?: string;
  /** shows a safeguarding link on the event page */
  involvesChildren?: boolean;
  image?: MediaKey;
  /** optional poster download; all poster text must also be in summary/body */
  posterUrl?: string;
  /** fictional preview entry: shown in development only, never in production */
  sample?: boolean;
};

export type GroupAudience = "Everyone" | "Women" | "Men" | "Young adults" | "Support";

export type Group = {
  slug: string;
  name: string;
  summary: string;
  audience: GroupAudience;
  when: string;
  where: string;
  area?: string;
  image?: MediaKey;
  /** extra detail shown on the groups page */
  details?: { title: string; text: string }[];
  /** link instead of the join form (e.g. Plug-In → Next Steps) */
  link?: Link;
};

export type Sermon = {
  slug: string;
  title: string;
  series: string;
  speaker: string;
  date: ISODate;
  youtubeId: string;
  summary?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  author: string;
  date: ISODate;
  series?: string;
  excerpt: string;
  body: string[];
};

export type BannsEntry = {
  id: string;
  partnerOne: string;
  partnerTwo: string;
  /** ISO date; the entry hides automatically the day after this date */
  weddingDate: ISODate;
  /** optional: shown only when the church gives one */
  venue?: string;
  /** optional couple photo, e.g. "/media/banns/dorothy-kelvin.jpg" (with the couple's consent) */
  photo?: string;
  /** fictional sample entries are hidden in production */
  sample?: boolean;
};
