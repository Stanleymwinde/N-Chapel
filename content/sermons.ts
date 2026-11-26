import type { Sermon } from "./types";

/**
 * Sermons shown on /watch and the homepage. Newest first.
 * Add a sermon by copying an entry; `youtubeId` is the part after "v=" in
 * the YouTube URL. Dates are ISO ("2026-11-15").
 */
export const sermons: Sermon[] = [
  {
    slug: "the-merciful-and-just-god",
    title: "The Merciful and Just God: Lessons from Zephaniah",
    series: "Zephaniah: Compassion over Judgement",
    speaker: "Pastor Eric Wanjala",
    date: "[TODO: sermon date]",
    youtubeId: "[TODO: YouTube video ID]",
  },
  {
    slug: "the-call-of-the-king",
    title: "The Call of the King",
    series: "Haggai",
    speaker: "Rev. Ken Kamau",
    date: "[TODO: sermon date]",
    youtubeId: "[TODO: YouTube video ID]",
  },
  {
    slug: "hope-misappropriated",
    title: "Hope Misappropriated",
    series: "Missed",
    speaker: "Rev. Gedion Kadu",
    date: "[TODO: sermon date]",
    youtubeId: "[TODO: YouTube video ID]",
  },
];

/** The sermon featured on the homepage and /watch. Keep sermons newest first. */
export const latestSermon: Sermon = sermons[0];

/** Sermon series, in the order they appear in `sermons`. */
export const series: string[] = Array.from(new Set(sermons.map((s) => s.series)));

/** Speakers, for the archive filter. */
export const speakers: string[] = Array.from(new Set(sermons.map((s) => s.speaker)));

/** Services people can watch online (from the current Watch page). */
export const watchServices = [
  {
    title: "Adult worship service",
    summary: "Our Sunday services at 9:00 and 11:30 AM, with worship, prayer and teaching from God's word.",
  },
  {
    title: "Youth worship service",
    summary: "Engaging teens in faith, fellowship and growth.",
  },
  {
    title: "Children's worship service",
    summary: "Fun, faith-filled worship for kids aged 2–11. [TODO: confirm ages; the old Watch page said 4–12, Quest says 2–11]",
  },
];
