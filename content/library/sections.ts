import type { Resource, ResourceType, Series } from "./types";
import { byNewest, resources, seriesResources } from "./resources";
import { series } from "./series";

/** The four Resource Library sections, each with its own page at /resources/<slug>. */
export type SectionKey = "bible-study" | "prayer-fasting" | "family-worship" | "quest-kids";

export type LibrarySection = {
  key: SectionKey;
  slug: string;
  title: string;
  /** the card's small type label */
  label: string;
  intro: string;
  types: ResourceType[];
};

export const SECTIONS: LibrarySection[] = [
  { key: "bible-study", slug: "bible-studies", title: "Bible studies", label: "Bible study", intro: "Weekly study guides for personal devotion and eGroups.", types: ["bible-study"] },
  {
    key: "prayer-fasting",
    slug: "prayer-fasting",
    title: "Prayer & fasting",
    label: "Prayer & fasting",
    intro: "Guides for our monthly prayer and fasting seasons, for adults, youth, children and families.",
    types: ["prayer-fasting"],
  },
  { key: "family-worship", slug: "family-worship", title: "Family worship", label: "Family worship", intro: "Devotionals to help families pray and worship together at home.", types: ["family-worship"] },
  { key: "quest-kids", slug: "quest-kids", title: "Quest Kids", label: "Quest Kids", intro: "Weekly craft guides that go with what children are learning at Quest.", types: ["kids-craft", "kids-devotional"] },
];

export const getSection = (key: SectionKey) => SECTIONS.find((s) => s.key === key)!;

/** Which section a resource type belongs to */
export const sectionOf = (type: ResourceType): LibrarySection => SECTIONS.find((s) => s.types.includes(type))!;

/** Older links used ?type=<resource type>; map them to a section */
export const sectionFromParam = (v: string | null): SectionKey | "" => {
  if (!v) return "";
  if (SECTIONS.some((s) => s.key === v)) return v as SectionKey;
  const s = SECTIONS.find((x) => x.types.includes(v as ResourceType));
  return s ? s.key : "";
};

/* ------------------------------------------------------------------ */
/* "This week"                                                          */
/* ------------------------------------------------------------------ */

/** How recent a week must be for its series to count as current */
export const CURRENT_WINDOW_DAYS = 42;

export type ThisWeekPicks = {
  /** the featured series, its weeks in order, and its latest week */
  featured?: { series: Series; weeks: Resource[]; latest: Resource; isCurrent: boolean };
  guide?: Resource;
  craft?: Resource;
};

/**
 * Everything "This week" shows, derived from the data (adjust the rules here):
 *
 * - Featured: the most recent Bible-study series with a week dated within the
 *   last 6 weeks, badged "Current series". If none qualifies, the series with
 *   isCurrent: true (also badged), else the most recent series (lowest
 *   sortOrder) without the badge. Its latest week is highlighted.
 * - The newest Prayer & fasting item and the newest Quest Kids craft.
 *
 * TODO(content): Bible-study weeks have no posting dates yet (publishDate is null),
 * so no series can count as "current" until those dates are added.
 */
export function thisWeekPicks(today: Date = new Date()): ThisWeekPicks {
  const cutoff = today.getTime() - CURRENT_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  const lastDated = (slug: string) =>
    Math.max(0, ...seriesResources(slug).map((w) => (w.publishDate ? new Date(w.publishDate).getTime() : 0)));

  const bySortOrder = [...series].filter((s) => s.type === "bible-study").sort((a, b) => a.sortOrder - b.sortOrder);
  const current = bySortOrder
    .map((s) => ({ s, last: lastDated(s.slug) }))
    .filter((x) => x.last >= cutoff && x.last <= today.getTime())
    .sort((a, b) => b.last - a.last)[0]?.s;
  // Until weeks carry dates, the series flagged isCurrent in series.ts stands in.
  const flagged = bySortOrder.find((s) => s.isCurrent && seriesResources(s.slug).length > 0);
  const pick = current ?? flagged ?? bySortOrder.find((s) => seriesResources(s.slug).length > 0);

  let featured: ThisWeekPicks["featured"];
  if (pick) {
    const weeks = seriesResources(pick.slug);
    featured = { series: pick, weeks, latest: weeks.at(-1)!, isCurrent: Boolean(current) || (!current && pick === flagged) };
  }

  const guide = resources.filter((r) => r.type === "prayer-fasting").sort(byNewest)[0];
  const craft = resources.filter((r) => r.type === "kids-craft").sort(byNewest)[0];
  return { featured, guide, craft };
}
