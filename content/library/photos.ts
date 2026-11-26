import type { Resource, ResourceType, Season, Series } from "./types";

/**
 * Stand-in photographs for library covers (free Pexels / Unsplash photos,
 * credited in media-credits.json). A real cover always wins: set
 * `coverImage` on a series or `craftPhoto` on a craft and that is shown.
 *
 * Photos are picked in sequence (by week, month or position), so cards that
 * sit next to each other never show the same picture.
 */
const POOLS: Record<ResourceType, string[]> = {
  "bible-study": ["library.study-1", "library.study-2", "library.study-3", "library.study-4", "library.study-5", "library.study-6", "library.study-7", "library.study-8"],
  "prayer-fasting": ["library.prayer-1", "library.prayer-2", "library.prayer-3", "library.prayer-4", "library.prayer-5", "library.prayer-6"],
  "family-worship": ["library.family-1", "library.family-2", "library.family-3"],
  "kids-craft": ["library.kids-1", "library.kids-2", "library.kids-3", "library.kids-4", "library.kids-5", "library.kids-6"],
  "kids-devotional": ["library.kids-4", "library.kids-2", "library.kids-6"],
};

/** Family worship items shown side by side get different photos. */
const FAMILY_ORDER = ["family-worship-pack-may-2025", "the-silent-prayer-devotional", "adults-quiet-time-devotional"];

const pick = (type: ResourceType, n: number) => {
  const pool = POOLS[type];
  return pool[((Math.round(n) % pool.length) + pool.length) % pool.length];
};

const has = (v?: string) => Boolean(v && v !== "TODO");
const num = (w: Resource["week"]) => (typeof w === "number" ? w : parseInt(String(w ?? "0"), 10) || 0);

export function seriesPhoto(s: Series): string {
  return has(s.coverImage) ? s.coverImage : pick(s.type, s.sortOrder);
}

export function seasonPhoto(season: Season, index: number): string {
  return pick("prayer-fasting", index);
}

export function resourcePhoto(r: Resource, seriesSortOrder = 0): string {
  if (has(r.craftPhoto)) return r.craftPhoto!;
  switch (r.type) {
    case "bible-study":
      return pick(r.type, seriesSortOrder + num(r.week) - 1);
    case "kids-craft":
      return pick(r.type, (r.month ?? 0) * 5 + num(r.week));
    case "prayer-fasting":
      return pick(r.type, (r.month ?? 0) + num(r.week));
    case "kids-devotional":
      return pick(r.type, r.month ?? 0);
    default:
      return pick(r.type, FAMILY_ORDER.indexOf(r.slug) >= 0 ? FAMILY_ORDER.indexOf(r.slug) : [...r.slug].reduce((a, c) => a + c.charCodeAt(0), 0));
  }
}
