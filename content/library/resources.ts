import type { LibraryAudience, Resource } from "./types";
import { MONTHS } from "./types";
import { series } from "./series";

/**
 * Every resource in the library. See content/README.md.
 *
 * - Bible studies: add a week by adding its label to that series' list in
 *   `studyWeeks` below. Weeks sort by their label (1, 2, … 5, 5B, 6), never by date.
 * - Prayer & fasting, family worship and kids' devotionals: add one object.
 * - Quest crafts: add a month (or bump a month's week count) in `craftMonths`.
 * - pdfUrl stays "TODO" until the real file is uploaded.
 */
const PDF_TODO = "TODO";

/* ---------------- Bible studies ---------------- */

/** series slug → its week labels, in order */
const studyWeeks: Record<string, (number | string)[]> = {
  ecclesiastes: [1, 2, 3, 4],
  "solid-10": [1, 2],
  "john-only-believe": [1, 2, 3, 4],
  faith: [1, 2, 3, 4, 5, 6],
  hope: [1, 2, 3, 4, 5],
  love: [1, 2, 3, 4],
  jonah: [1, 2, 3],
  // Exodus week 7 is missing on the old site: the gap is deliberate, don't invent one.
  exodus: [1, 2, 3, 4, 5, 6, 8],
  // Judges: 1–12 plus 5B (the duplicate Week 3 from the old site removed).
  judges: [1, 2, 3, 4, 5, "5B", 6, 7, 8, 9, 10, 11, 12],
  // Amos: the duplicate Week 3 from the old site removed.
  amos: [1, 2, 3, 4, 5],
  ephesians: [1, 2, 3, 4, 5, 6, 7, 8],
  esther: [1, 2, 3, 4],
  luke: [1, 2, 3],
  malachi: [1],
  micah: [1, 2, 3, 4, 5],
  nehemiah: [1, 2, 3, 4, 5],
};

/** Known month/year per series week (only where the old site gives it). */
const studyDates: Record<string, { year: number; month?: number }> = {
  ecclesiastes: { year: 2026 },
  "solid-10": { year: 2026, month: 7 },
  "john-only-believe": { year: 2026, month: 3 },
  jonah: { year: 2025 },
};

const shortTitle: Record<string, string> = {
  ecclesiastes: "Ecclesiastes",
  "solid-10": "SOLID 10",
  "john-only-believe": "John: Only Believe",
};

const bibleStudies: Resource[] = [
  ...Object.entries(studyWeeks).flatMap(([slug, weeks]) => {
    const s = series.find((x) => x.slug === slug)!;
    const name = shortTitle[slug] ?? s.title;
    return weeks.map(
      (w): Resource => ({
        title: `${name}: Week ${w}`,
        slug: `${slug}-week-${String(w).toLowerCase()}`,
        seriesSlug: slug,
        type: "bible-study",
        audience: s.audience,
        week: w,
        ...studyDates[slug],
        publishDate: null,
        summary: "",
        pdfUrl: PDF_TODO,
      }),
    );
  }),
  // Genesis: the old site lists 17 identically titled entries. Seeded as Part 1–17.
  // TODO: the order of these 17 parts must be confirmed with the church.
  ...Array.from({ length: 17 }, (_, i): Resource => ({
    title: `Genesis: Part ${i + 1}`,
    slug: `genesis-part-${i + 1}`,
    seriesSlug: "genesis",
    type: "bible-study",
    audience: ["adults"],
    week: i + 1,
    publishDate: null,
    summary: "",
    pdfUrl: PDF_TODO,
  })),
  // Obadiah is a single study.
  { title: "Obadiah", slug: "obadiah-study", seriesSlug: "obadiah", type: "bible-study", audience: ["adults"], week: 1, publishDate: null, summary: "", pdfUrl: PDF_TODO },
];

/* ---------------- Prayer & fasting ---------------- */

const pf = (r: Omit<Resource, "type" | "publishDate" | "summary" | "pdfUrl"> & { summary?: string; publishDate?: string | null }): Resource => ({
  type: "prayer-fasting",
  publishDate: null,
  summary: "",
  pdfUrl: PDF_TODO,
  ...r,
});

const prayerFasting: Resource[] = [
  // January 2026: 21 Days of Prayer & Fasting
  ...[1, 2, 3].map((w) => pf({ title: `21 Days of Prayer & Fasting: Adults, Week ${w}`, slug: `january-2026-adults-week-${w}`, season: "january-2026", audience: ["adults"], week: w, month: 1, year: 2026 })),
  ...[1, 2, 3].map((w) => pf({ title: `21 Days of Prayer & Fasting: Light Republik, Week ${w}`, slug: `january-2026-youth-week-${w}`, season: "january-2026", audience: ["youth"], week: w, month: 1, year: 2026 })),
  pf({ title: "Quest Children’s January 2026 Prayer & Fasting Guide", slug: "january-2026-children", season: "january-2026", audience: ["children"], month: 1, year: 2026 }),
  // February 2026
  pf({ title: "February 2026 Adults’ Fasting Guide", slug: "february-2026-adults", season: "february-2026", audience: ["adults"], month: 2, year: 2026 }),
  pf({ title: "February 2026 Light Republik Fasting Guide", slug: "february-2026-youth", season: "february-2026", audience: ["youth"], month: 2, year: 2026 }),
  pf({ title: "February 2026 Quest Children’s Fasting Guide", slug: "february-2026-children", season: "february-2026", audience: ["children"], month: 2, year: 2026 }),
  // March–June 2026 (each appeared twice on the old site; listed once here)
  pf({ title: "March 2026 Multi-Generational Family Fasting Guide", slug: "march-2026-family", season: "march-2026", audience: ["family"], month: 3, year: 2026 }),
  pf({ title: "April 2026 Multi-Generational Family Fasting Guide", slug: "april-2026-family", season: "april-2026", audience: ["family"], month: 4, year: 2026 }),
  pf({ title: "May 2026 Multi-Generational Prayer & Fasting Guide", slug: "may-2026-family", season: "may-2026", audience: ["family"], month: 5, year: 2026 }),
  pf({ title: "June 2026 Multi-Generational Prayer & Fasting Guide", slug: "june-2026-family", season: "june-2026", audience: ["family"], month: 6, year: 2026 }),
  // November 2026
  // TODO(content): confirm who the November 2026 guide is for (audience)
  // TODO(content): file URL for the November 2026 guide (church site, /prayer-fasting)
  pf({ title: "November 2026 Prayer & Fasting Guide", slug: "november-2026-guide", audience: [], month: 11, year: 2026, publishDate: "2026-11-22" }),
  // July 2026: the Pocket Book is not one of the three July guides below, so it is listed on its own
  // TODO(content): file URL for the Prayer & Fasting Pocket Book
  // TODO(content): confirm who the Pocket Book is for (audience)
  pf({ title: "Prayer & Fasting Pocket Book", slug: "prayer-fasting-pocket-book-2026", audience: [], month: 7, year: 2026 }),
  // July 2026: 21 Days, Multi-Generational
  ...[1, 2, 3].map((w) => pf({ title: `21 Days of Prayer & Fasting: Multi-Generational Guide, Week ${w}`, slug: `july-2026-family-week-${w}`, season: "july-2026", audience: ["family"], week: w, month: 7, year: 2026 })),
  // August 2026
  pf({ title: "August 2026 Family Prayer & Fasting Guide", slug: "august-2026-family", season: "august-2026", audience: ["family"], month: 8, year: 2026 }),
  // TODO(content): file URL for the 21-Day Combined Guide & Pocket Book
  pf({ title: "21-Day Combined Prayer & Fasting Guide & Pocket Book", slug: "august-2026-21-day-combined", season: "august-2026", audience: ["family"], month: 8, year: 2026 }),
  // August 2026: Africa Children's Prayer Day
  pf({ title: "Africa Children’s Prayer Day: Prayer Guide", slug: "acpd-2026-prayer-guide", season: "africa-childrens-prayer-day-2026", audience: ["adults"], month: 8, year: 2026 }),
  pf({ title: "Africa Children’s Prayer Day: Prayer Guide for Children", slug: "acpd-2026-prayer-guide-children", season: "africa-childrens-prayer-day-2026", audience: ["children"], month: 8, year: 2026 }),
  // September and October 2026
  pf({ title: "September 2026 Family Prayer & Fasting Guide", slug: "september-2026-family", season: "september-2026", audience: ["family"], month: 9, year: 2026 }),
  pf({ title: "October 2026 Prayer & Fasting Week", slug: "october-2026-week", season: "october-2026", audience: ["adults"], month: 10, year: 2026 }),
  // October and November 2025
  pf({ title: "October 2025 Adults’ Prayer & Fasting Guide", slug: "october-2025-adults", season: "october-2025", audience: ["adults"], month: 10, year: 2025 }),
  pf({ title: "October 2025 Light Republik Prayer & Fasting Guide", slug: "october-2025-youth", season: "october-2025", audience: ["youth"], month: 10, year: 2025 }),
  pf({ title: "October 2025 Quest Children’s Prayer & Fasting Guide", slug: "october-2025-children", season: "october-2025", audience: ["children"], month: 10, year: 2025 }),
  pf({ title: "November 2025 Adults’ Prayer & Fasting Guide", slug: "november-2025-adults", season: "november-2025", audience: ["adults"], month: 11, year: 2025 }),
  pf({ title: "November 2025 Light Republik Prayer & Fasting Guide", slug: "november-2025-youth", season: "november-2025", audience: ["youth"], month: 11, year: 2025 }),
  pf({ title: "November 2025 Quest Children’s Prayer & Fasting Guide", slug: "november-2025-children", season: "november-2025", audience: ["children"], month: 11, year: 2025 }),
];

/* ---------------- Family worship ---------------- */
// The old site's "TRAVEL" tag is deliberately not carried over.
// The church's current site lists only The Silent Prayer Devotional (May 2025).
const familyWorship: Resource[] = [
  // TODO(content): not listed on church site, confirm source
  { title: "Family Worship Pack", slug: "family-worship-pack-may-2025", type: "family-worship", audience: ["family"], month: 5, year: 2025, publishDate: null, summary: "", pdfUrl: PDF_TODO, published: false },
  // Audience left empty: the source doesn't say it is for adults
  { title: "The Silent Prayer Devotional", slug: "the-silent-prayer-devotional", type: "family-worship", audience: [], month: 5, year: 2025, publishDate: null, summary: "", pdfUrl: PDF_TODO },
  // TODO(content): not listed on church site, confirm source
  { title: "Adults Quiet Time Devotional", slug: "adults-quiet-time-devotional", type: "family-worship", audience: ["adults"], publishDate: null, summary: "", pdfUrl: PDF_TODO, published: false },
];

/* ---------------- Quest Kids ---------------- */

/** year, month → number of weekly crafts. Add a month here. */
const craftMonths: { year: number; month: number; weeks: number }[] = [
  { year: 2025, month: 12, weeks: 4 },
  { year: 2026, month: 1, weeks: 4 },
  { year: 2026, month: 2, weeks: 3 },
  { year: 2026, month: 3, weeks: 5 },
  { year: 2026, month: 4, weeks: 4 },
  { year: 2026, month: 5, weeks: 5 },
  { year: 2026, month: 6, weeks: 4 },
  { year: 2026, month: 7, weeks: 4 },
  { year: 2026, month: 8, weeks: 5 }, // week 5 is a review lesson
  { year: 2026, month: 9, weeks: 4 },
  { year: 2026, month: 10, weeks: 4 },
  { year: 2026, month: 11, weeks: 4 },
];

/** Known posting dates for individual crafts ("YYYY-MM-week") */
const craftPosted: Record<string, string> = {
  // TODO(content): file URL for November 2026 · Week 4 Craft
  "2026-11-4": "2026-11-21",
};

const kidsAudience: LibraryAudience[] = ["children"];

const kidsCrafts: Resource[] = craftMonths.flatMap(({ year, month, weeks }) =>
  Array.from({ length: weeks }, (_, i): Resource => {
    const w = i + 1;
    const review = year === 2026 && month === 8 && w === 5;
    return {
      // Title format "November 2026 · Week 3 Craft" (the old typo "WEKK" fixed).
      title: `${MONTHS[month - 1]} ${year} · Week ${w} Craft${review ? " (review lesson)" : ""}`,
      slug: `quest-craft-${year}-${String(month).padStart(2, "0")}-week-${w}`,
      type: "kids-craft",
      audience: kidsAudience,
      week: w,
      month,
      year,
      publishDate: craftPosted[`${year}-${month}-${w}`] ?? null,
      summary: "",
      pdfUrl: PDF_TODO,
      // craftPhoto, materials, steps, ageRange, duration: add when supplied.
    };
  }),
);

const kidsDevotionals: Resource[] = [
  { title: "January 2026 Children’s Devotional", slug: "january-2026-childrens-devotional", type: "kids-devotional", audience: ["children"], month: 1, year: 2026, publishDate: null, summary: "", pdfUrl: PDF_TODO },
  { title: "February 2026 Quest Children’s Devotional", slug: "february-2026-quest-childrens-devotional", type: "kids-devotional", audience: ["children"], month: 2, year: 2026, publishDate: null, summary: "", pdfUrl: PDF_TODO },
];

/** Everything, including unpublished entries */
export const allResources: Resource[] = [...bibleStudies, ...prayerFasting, ...familyWorship, ...kidsCrafts, ...kidsDevotionals];

/** What the site shows */
export const resources: Resource[] = allResources.filter((r) => r.published !== false);

/* ---------------- Helpers ---------------- */

export const getResource = (slug: string) => resources.find((r) => r.slug === slug);

/** Week order: 1, 2, … 5, 5B, 6 (never by date). */
export function weekOrder(w: number | string | undefined): number {
  if (w === undefined) return 0;
  if (typeof w === "number") return w;
  const m = /^(\d+)\s*([A-Za-z]?)$/.exec(w.trim());
  if (!m) return 0;
  return Number(m[1]) + (m[2] ? (m[2].toUpperCase().charCodeAt(0) - 64) / 10 : 0);
}

/** A series' weeks in order. */
export const seriesResources = (slug: string) => resources.filter((r) => r.seriesSlug === slug).sort((a, b) => weekOrder(a.week) - weekOrder(b.week));

/** Monthly items: newest year, then month, then week. */
export const byNewest = (a: Resource, b: Resource) =>
  (b.year ?? 0) - (a.year ?? 0) || (b.month ?? 0) - (a.month ?? 0) || weekOrder(b.week) - weekOrder(a.week);

/** "Week 3", "Part 3" (Genesis), "5B" */
export const weekLabel = (r: Resource) => (r.seriesSlug === "genesis" ? `Part ${r.week}` : r.week !== undefined ? `Week ${r.week}` : "");

/** "September 2026" or "" */
export const monthLabel = (r: Pick<Resource, "month" | "year">) => (r.month && r.year ? `${MONTHS[r.month - 1]} ${r.year}` : r.year ? String(r.year) : "");
