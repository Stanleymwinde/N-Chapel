import type { Season } from "./types";

/**
 * Prayer & fasting seasons. Each guide in resources.ts points to its season
 * with `season: "<slug>"`. Add a season here, then add its guides.
 */
const DESC_TODO = "[TODO: season description from the church]";

export const seasons: Season[] = [
  { title: "21 Days of Prayer & Fasting", slug: "january-2026", year: 2026, month: 1, kind: "21-day", description: DESC_TODO },
  { title: "February 2026 Prayer & Fasting", slug: "february-2026", year: 2026, month: 2, kind: "monthly", description: DESC_TODO },
  { title: "Multi-Generational Family Fasting Guide", slug: "march-2026", year: 2026, month: 3, kind: "monthly", description: DESC_TODO },
  { title: "Multi-Generational Family Fasting Guide", slug: "april-2026", year: 2026, month: 4, kind: "monthly", description: DESC_TODO },
  { title: "Multi-Generational Prayer & Fasting Guide", slug: "may-2026", year: 2026, month: 5, kind: "monthly", description: DESC_TODO },
  { title: "Multi-Generational Prayer & Fasting Guide", slug: "june-2026", year: 2026, month: 6, kind: "monthly", description: DESC_TODO },
  { title: "21 Days of Prayer & Fasting: Multi-Generational Guide", slug: "july-2026", year: 2026, month: 7, kind: "21-day", description: DESC_TODO },
  { title: "August 2026 Prayer & Fasting", slug: "august-2026", year: 2026, month: 8, kind: "monthly", description: DESC_TODO },
  { title: "Africa Children’s Prayer Day", slug: "africa-childrens-prayer-day-2026", year: 2026, month: 8, kind: "day", description: DESC_TODO },
  { title: "Family Prayer & Fasting Guide", slug: "september-2026", year: 2026, month: 9, kind: "monthly", description: DESC_TODO },
  { title: "Prayer & Fasting Week", slug: "october-2026", year: 2026, month: 10, kind: "week", description: DESC_TODO },
  { title: "October 2025 Prayer & Fasting", slug: "october-2025", year: 2025, month: 10, kind: "monthly", description: DESC_TODO },
  { title: "November 2025 Prayer & Fasting", slug: "november-2025", year: 2025, month: 11, kind: "monthly", description: DESC_TODO },
];

export const getSeason = (slug: string) => seasons.find((s) => s.slug === slug);

/** Newest first: by year, then month. */
export const sortedSeasons = () => [...seasons].sort((a, b) => b.year - a.year || b.month - a.month);
