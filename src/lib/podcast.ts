import { site } from "@content/site";
import { tidy } from "./youtube";

/**
 * Reads the podcast's public RSS feed (anchor.fm, the same feed Spotify,
 * Apple and Amazon use). Episode titles follow "S70E8 | <Series> | <Title> |
 * <Speaker>"; older ones that don't are kept with the whole title as the message.
 *
 * Fetched at build time and refreshed at most once an hour. If the feed can't
 * be reached, the list comes back empty and the page shows the platform links.
 */

export type PodcastEpisode = {
  id: string;
  season?: number;
  episode?: number;
  series: string;
  message: string;
  speaker: string;
  /** plain-text paragraphs from the episode notes */
  notes: string[];
  published: string;
  /** "44 min" */
  duration: string;
  audio: string;
  image?: string;
};

const entities = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");

const cdata = (s = "") => s.replace(/^<!\[CDATA\[|\]\]>$/g, "").trim();
const tag = (xml: string, name: string) => cdata(xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1]);

/** HTML notes → plain paragraphs (no markup is ever rendered) */
const paragraphs = (html: string) =>
  entities(html)
    .split(/<\/p>|<br\s*\/?>/i)
    .map((p) => entities(p.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim())
    .filter(Boolean);

/** "00:44:42" or "2682" → "45 min" */
function minutes(d: string) {
  if (!d) return "";
  const parts = d.split(":").map(Number);
  const secs = parts.length === 1 ? parts[0] : parts.reduce((t, n) => t * 60 + n, 0);
  if (!secs) return "";
  return `${Math.max(1, Math.round(secs / 60))} min`;
}

export async function getPodcastEpisodes(): Promise<PodcastEpisode[]> {
  try {
    const res = await fetch(site.podcast.feedUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map(([, item]): PodcastEpisode | null => {
        const audio = item.match(/<enclosure[^>]*url="([^"]+)"/)?.[1];
        const title = entities(tag(item, "title")).replace(/\s+/g, " ").trim();
        if (!audio || !title) return null;
        const parts = title.split("|").map((p) => p.trim()).filter(Boolean);
        const code = parts[0]?.match(/^S(\d+)E(\d+)$/i);
        const structured = code && parts.length >= 4;
        const season = Number(item.match(/<itunes:season>(\d+)/)?.[1] ?? code?.[1]) || undefined;
        const episode = Number(item.match(/<itunes:episode>(\d+)/)?.[1] ?? code?.[2]) || undefined;
        return {
          id: tag(item, "guid") || audio,
          season,
          episode,
          series: structured ? tidy(parts[1]) : "",
          message: structured ? tidy(parts.slice(2, -1).join(" | ")) : title,
          speaker: structured ? parts[parts.length - 1].replace(/^(Rev|Pst|Dr)\.(?=\S)/i, "$1. ") : "",
          notes: paragraphs(tag(item, "description")),
          published: new Date(tag(item, "pubDate")).toISOString(),
          duration: minutes(tag(item, "itunes:duration")),
          audio: entities(audio),
          image: item.match(/<itunes:image href="([^"]+)"/)?.[1],
        };
      })
      .filter((e): e is PodcastEpisode => Boolean(e));
  } catch {
    return [];
  }
}

/** The episodes grouped by series, newest series first (episodes without a series are left out) */
export function groupBySeries(episodes: PodcastEpisode[]) {
  const map = new Map<string, PodcastEpisode[]>();
  for (const e of episodes) {
    if (!e.series) continue;
    const k = e.series.toLowerCase();
    map.set(k, [...(map.get(k) ?? []), e]);
  }
  return [...map.values()].map((list) => ({ series: list[0].series, episodes: list }));
}

/** "23 November 2026" */
export const formatEpisodeDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Nairobi" }).format(new Date(iso));
