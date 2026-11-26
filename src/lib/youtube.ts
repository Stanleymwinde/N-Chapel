/**
 * Reads the church's public YouTube channel feed (no API key needed) and
 * sorts the uploads into what the Watch page shows:
 *
 * - services: full Sunday services, titled "<Series> | Sunday Worship Service | 9:00AM Worship Service"
 * - episodes: sermon episodes, titled "S70E7 | <Series> | <Title> | <Speaker>"
 *
 * Fetched at build time and refreshed at most once an hour, so the page stays
 * static and still picks up each Sunday's uploads. If YouTube can't be
 * reached, every list comes back empty and the page falls back to links.
 */

export const CHANNELS = {
  adult: {
    id: "UCHFRjuT0oBt6l1vsVnldBJw",
    url: "https://www.youtube.com/@nairobichapelngongroad",
  },
  youth: { url: "https://www.youtube.com/@lightrepublicnairobichapel" },
  children: { url: "https://www.youtube.com/@questnc7143" },
} as const;

export type Video = { id: string; title: string; published: string };
export type ServiceVideo = Video & { series: string; time: string };
export type Episode = Video & { season: number; episode: number; series: string; message: string; speaker: string };

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

/** "GOD in Distress" stays as written; "THE SECRET TO X" becomes "The Secret to X". */
export function tidy(s: string) {
  const t = s.trim();
  if (t !== t.toUpperCase() || !/[A-Z]{4}/.test(t)) return t;
  const small = new Set(["to", "of", "and", "in", "the", "a", "an", "for", "on", "with"]);
  return t
    .toLowerCase()
    .split(" ")
    .map((w, i) => (i > 0 && small.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ")
    .replace(/\bGod\b/g, "GOD");
}

export async function getChannelVideos(channelId: string = CHANNELS.adult.id): Promise<Video[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .map(([, e]) => ({
        id: e.match(/<yt:videoId>([^<]+)/)?.[1] ?? "",
        title: decode(e.match(/<title>([^<]+)/)?.[1] ?? ""),
        published: e.match(/<published>([^<]+)/)?.[1] ?? "",
      }))
      .filter((v) => v.id && v.title);
  } catch {
    return [];
  }
}

export function splitVideos(videos: Video[]) {
  const services: ServiceVideo[] = [];
  const episodes: Episode[] = [];
  for (const v of videos) {
    const parts = v.title.split("|").map((p) => p.trim()).filter(Boolean);
    const ep = parts[0]?.match(/^S(\d+)E(\d+)$/i);
    if (ep && parts.length >= 4) {
      episodes.push({
        ...v,
        season: Number(ep[1]),
        episode: Number(ep[2]),
        series: tidy(parts[1]),
        message: tidy(parts.slice(2, -1).join(" | ")),
        speaker: parts[parts.length - 1].replace(/^(Rev|Pst|Dr)\.(?=\S)/i, "$1. "),
      });
      continue;
    }
    if (/worship service/i.test(v.title)) {
      const time = v.title.match(/(\d{1,2}:\d{2}\s*[AP]M)/i)?.[1]?.replace(/\s*([AP]M)/i, " $1").toUpperCase() ?? "";
      services.push({ ...v, series: tidy(parts[0] ?? ""), time });
    }
  }
  return { services, episodes };
}

/** "16 November 2026" in Nairobi time. */
export const formatVideoDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Nairobi" }).format(new Date(iso));

export const thumb = (id: string, size: "hq" | "sd" | "maxres" = "hq") => `https://i.ytimg.com/vi/${id}/${size === "hq" ? "hqdefault" : size === "sd" ? "sddefault" : "maxresdefault"}.jpg`;
export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
