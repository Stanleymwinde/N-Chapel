/** Resource Library types. See content/README.md for how to add content. */

export type ResourceType = "bible-study" | "prayer-fasting" | "family-worship" | "kids-craft" | "kids-devotional";
export type LibraryAudience = "adults" | "youth" | "children" | "family";

/** A media slot key (see content/media-credits.json) or "TODO" until a cover exists. */
export type Cover = string;

export type Series = {
  title: string;
  slug: string;
  /** Bible book, when the series studies one */
  book?: string;
  type: ResourceType;
  audience: LibraryAudience[];
  /** "[TODO: …]" until the church supplies a description */
  description: string;
  coverImage: Cover;
  /** the series running now (its latest week shows in "This week") */
  isCurrent: boolean;
  /** lower shows first */
  sortOrder: number;
  /** year it ran (groups the "Past series" archive); omit when unknown */
  year?: number;
  /** e.g. "Sep–Oct 2026" when known */
  when?: string;
};

export type StudyBody = {
  passage?: { reference: string; text?: string };
  reflection?: string[];
  discussionQuestions?: string[];
  prayer?: string;
};

export type Resource = {
  title: string;
  slug: string;
  seriesSlug?: string;
  type: ResourceType;
  audience: LibraryAudience[];
  /** week number, or a label such as "5B" */
  week?: number | string;
  /** 1–12, for monthly items */
  month?: number;
  year?: number;
  /** prayer & fasting season slug (see seasons.ts) */
  season?: string;
  /** dates on the old site are unreliable (many items share an upload date) */
  publishDate: string | null;
  summary: string;
  /** "TODO" until the file is uploaded */
  pdfUrl: string;
  /** e.g. "2.1 MB"; shown on cards as "PDF · 2.1 MB". TODO(content): add each file's size once it is uploaded */
  fileSize?: string;
  /** a real cover image (media slot); without one the card shows a typographic tile */
  coverImage?: string;
  /** false: kept in the data but not shown anywhere */
  published?: boolean;
  /** optional readable content */
  body?: StudyBody;
  /** kids' craft extras (empty until supplied) */
  craftPhoto?: string;
  materials?: string[];
  steps?: string[];
  ageRange?: string;
  duration?: string;
};

export type Season = {
  title: string;
  slug: string;
  year: number;
  month: number;
  /** "21-day" seasons get a day calendar; others list their guides */
  kind: "21-day" | "monthly" | "week" | "day";
  description: string;
  /** publication to cross-link (content/publications.ts) */
  relatedPublicationSlug?: string;
};

export const TYPE_LABELS: Record<ResourceType, string> = {
  "bible-study": "Bible study",
  "prayer-fasting": "Prayer & fasting",
  "family-worship": "Family worship",
  "kids-craft": "Quest Kids craft",
  "kids-devotional": "Quest Kids devotional",
};

/** Youth content is branded Light Republik; children's content is Quest. */
export const AUDIENCE_LABELS: Record<LibraryAudience, string> = {
  adults: "Adults",
  youth: "Light Republik (youth)",
  children: "Quest (children)",
  family: "Family",
};

export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
