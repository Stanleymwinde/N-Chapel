import type { Series } from "./types";

/**
 * Bible study series. Add a series by adding one entry here, then list its
 * weeks in resources.ts (`studyWeeks`). Exactly one series should have
 * isCurrent: true. Descriptions and covers are TODO until supplied.
 */
const DESC_TODO = "[TODO: series description from the church]";

export const series: Series[] = [
  { title: "When MEANINGLESS is MEANINGFUL: A Study of Ecclesiastes", slug: "ecclesiastes", book: "Ecclesiastes", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: true, sortOrder: 1, year: 2026, when: "Sep–Oct 2026" },
  // The old site's title had a typo ("SOLID !0").
  { title: "SOLID 10: Timeless Truth", slug: "solid-10", type: "bible-study", audience: ["adults"], description: "Personal Devotion / Group Study Guide. [TODO: fuller description from the church]", coverImage: "TODO", isCurrent: false, sortOrder: 2, year: 2026, when: "Jul 2026" },
  { title: "John: Only Believe", slug: "john-only-believe", book: "John", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 3, year: 2026, when: "Mar 2026" },
  { title: "Faith", slug: "faith", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 4 },
  { title: "Hope", slug: "hope", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 5 },
  { title: "Love", slug: "love", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 6 },
  { title: "Jonah", slug: "jonah", book: "Jonah", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 7, year: 2025, when: "2025" },
  { title: "Genesis", slug: "genesis", book: "Genesis", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 8 },
  { title: "Exodus", slug: "exodus", book: "Exodus", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 9 },
  { title: "Judges", slug: "judges", book: "Judges", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 10 },
  { title: "Amos", slug: "amos", book: "Amos", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 11 },
  { title: "Ephesians", slug: "ephesians", book: "Ephesians", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 12 },
  { title: "Esther", slug: "esther", book: "Esther", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 13 },
  { title: "Luke", slug: "luke", book: "Luke", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 14 },
  { title: "Malachi", slug: "malachi", book: "Malachi", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 15 },
  { title: "Micah", slug: "micah", book: "Micah", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 16 },
  { title: "Obadiah", slug: "obadiah", book: "Obadiah", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 17 },
  { title: "Nehemiah", slug: "nehemiah", book: "Nehemiah", type: "bible-study", audience: ["adults"], description: DESC_TODO, coverImage: "TODO", isCurrent: false, sortOrder: 18 },
];

export const getSeries = (slug: string) => series.find((s) => s.slug === slug);
