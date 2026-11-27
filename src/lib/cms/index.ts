/**
 * Content that staff edit in Craft CMS: events, sermons, blog posts, marriage banns,
 * publications, groups and the team.
 *
 * Each getter returns the same shape as the typed files in /content. For each
 * collection, if Craft has at least one entry, Craft's entries are used; otherwise
 * (or if Craft can't be reached) the /content file is used, so the site never goes blank.
 * Server-only: call these from server components, generateMetadata, generateStaticParams,
 * sitemap.ts or route handlers, and pass the results to client components as props.
 */
import { cache } from "react";
import { craftQuery } from "@/lib/craft/client";
import { htmlToBlocks, paragraphs, formatBytes, youtubeIdOf } from "./html";
import { craftMediaKey } from "@content/media";
import { publishedEvents as fbEvents, toEventEntries, type WhatsOnEvent, type EventStatus } from "@content/events";
import { sermons as fbSermons } from "@content/sermons";
import { posts as fbPosts, sortedPosts, type Post, type PostCategory } from "@content/posts";
import { banns as fbBanns } from "@content/banns";
import { publications as fbPublications, type Publication, type PublicationCategory } from "@content/publications";
import { groups as fbGroups } from "@content/groups";
import { team as fbTeam, type TeamGroup, type TeamMember } from "@content/about";
import type { Audience, BannsEntry, EventType, Group, GroupAudience, Sermon } from "@content/types";

/* ------------------------------------------------------------------ helpers */

type CraftAsset = { url: string; width?: number | null; height?: number | null; alt?: string | null; title?: string | null; size?: number | null };
const ASSET = "url width height alt title";

const media = (a: CraftAsset[] | null | undefined): string | undefined => {
  const x = a?.[0];
  return x?.url ? craftMediaKey({ url: x.url, width: x.width, height: x.height, alt: x.alt || x.title || "" }) : undefined;
};
const str = (v: string | null | undefined): string | undefined => (v && v.trim() ? v.trim() : undefined);
const list = <T,>(cms: T[] | null | undefined, fallback: T[]): T[] => (cms && cms.length ? cms : fallback);

/** Query a channel; null when Craft is off or failed, [] when it simply has no entries. */
async function entries<T>(section: string, fields: string, orderBy = "postDate DESC"): Promise<T[] | null> {
  const data = await craftQuery<{ entries: T[] }>(`{ entries(section: "${section}", limit: null, orderBy: "${orderBy}") { ${fields} } }`);
  return data?.entries ?? null;
}

/* ------------------------------------------------------------------ events */

type CraftEvent = {
  slug: string; title: string; summary: string | null; eventType: string | null; audiences: string[] | null;
  eventStatus: string | null; eventDate: string | null; eventEndDate: string | null; timeText: string | null;
  location: string | null; recurrence: string | null; weekday: string | null; linkLabel: string | null; linkUrl: string | null;
  details: string | null; contactPhone: string | null; contactEmail: string | null; ministryPage: string | null;
  involvesChildren: boolean | null; image: CraftAsset[] | null;
};

export const getPublishedEvents = cache(async (): Promise<WhatsOnEvent[]> => {
  const cms = await entries<CraftEvent>("events", `slug title ... on event_Entry {
    summary eventType audiences eventStatus
    eventDate @formatDateTime(format: "Y-m-d") eventEndDate @formatDateTime(format: "Y-m-d")
    timeText location recurrence weekday linkLabel linkUrl details contactPhone contactEmail ministryPage involvesChildren
    image { ${ASSET} } }`, "eventDate ASC");
  return list(cms?.map((e): WhatsOnEvent => {
    const status = (e.eventStatus as EventStatus) || (e.eventDate ? "dated" : "tba");
    const contact = e.contactPhone || e.contactEmail ? { phone: str(e.contactPhone), email: str(e.contactEmail) } : undefined;
    return {
      slug: e.slug,
      title: e.title,
      summary: e.summary ?? "",
      type: (e.eventType as EventType) || "Service",
      audience: (e.audiences ?? []) as Audience[],
      status,
      startDate: str(e.eventDate),
      endDate: str(e.eventEndDate),
      time: str(e.timeText),
      location: str(e.location),
      recurrence: str(e.recurrence),
      weekday: str(e.weekday)?.toUpperCase(),
      action: e.linkLabel ? { label: e.linkLabel, href: str(e.linkUrl) } : undefined,
      published: true,
      body: paragraphs(e.details).length ? paragraphs(e.details) : undefined,
      contact,
      ministry: str(e.ministryPage),
      involvesChildren: e.involvesChildren ?? undefined,
      image: media(e.image),
    };
  }), fbEvents);
});

export const getEvent = async (slug: string) => (await getPublishedEvents()).find((e) => e.slug === slug);

/** Dated events in the older ChurchEvent shape (home, Give, ministry pages). */
export const getEventEntries = async () => toEventEntries(await getPublishedEvents());

/* ------------------------------------------------------------------ sermons */

type CraftSermon = { slug: string; title: string; series: string | null; speaker: string | null; sermonDate: string | null; postDate: string; videoUrl: string | null; summary: string | null };

/** Newest first. */
export const getSermons = cache(async (): Promise<Sermon[]> => {
  const cms = await entries<CraftSermon>("sermons", `slug title postDate @formatDateTime(format: "Y-m-d") ... on sermon_Entry {
    series speaker sermonDate @formatDateTime(format: "Y-m-d") videoUrl summary }`);
  const mapped = cms?.map((s): Sermon => ({
    slug: s.slug,
    title: s.title,
    series: s.series ?? "",
    speaker: s.speaker ?? "",
    date: s.sermonDate || s.postDate,
    youtubeId: youtubeIdOf(s.videoUrl) ?? "[TODO: YouTube video ID]",
    summary: str(s.summary),
  })).sort((a, b) => b.date.localeCompare(a.date));
  return list(mapped, fbSermons);
});

export const getLatestSermon = async () => (await getSermons())[0];

/* ------------------------------------------------------------------ blog */

type CraftPost = {
  slug: string; title: string; postDate: string | null; authorName: string | null; authorRole: string | null; postCategory: string | null;
  scripture: string | null; summary: string | null; image: CraftAsset[] | null; body: { html: string } | null;
  relatedSeriesSlug: string | null; videoUrl: string | null;
};

/** Dated posts newest first, then undated ones (same order as sortedPosts()). */
export const getPosts = cache(async (): Promise<Post[]> => {
  const cms = await entries<CraftPost>("blog", `slug title postDate @formatDateTime(format: "Y-m-d") ... on blogPost_Entry {
    authorName authorRole postCategory scripture summary image { ${ASSET} } body { html } relatedSeriesSlug videoUrl }`);
  const mapped = cms?.map((p): Post => ({
    title: p.title,
    slug: p.slug,
    author: p.authorName ?? "",
    authorRole: str(p.authorRole),
    publishDate: p.postDate ?? null,
    category: (p.postCategory as PostCategory) || "Devotional",
    scripture: p.scripture ?? "",
    excerpt: p.summary ?? "",
    heroImage: media(p.image) ?? "blog.hero",
    body: htmlToBlocks(p.body?.html),
    relatedSeriesSlug: str(p.relatedSeriesSlug),
    sermonVideoUrl: str(p.videoUrl),
  }));
  return sortedPosts(list(mapped, fbPosts));
});

export const getPost = async (slug: string) => (await getPosts()).find((p) => p.slug === slug);

/* ------------------------------------------------------------------ marriage banns */

type CraftWedding = { slug: string; title: string; partnerOne: string | null; partnerTwo: string | null; weddingDate: string | null; venue: string | null; image: CraftAsset[] | null };

export const getBanns = cache(async (): Promise<BannsEntry[]> => {
  const cms = await entries<CraftWedding>("weddings", `slug title ... on wedding_Entry {
    partnerOne partnerTwo weddingDate @formatDateTime(format: "Y-m-d") venue image { ${ASSET} } }`, "weddingDate ASC");
  return list(cms?.filter((w) => w.weddingDate).map((w): BannsEntry => {
    const [one, two] = w.partnerOne || w.partnerTwo ? [w.partnerOne ?? "", w.partnerTwo ?? ""] : w.title.split(/\s+(?:&|and|weds)\s+/i);
    return { id: w.slug, partnerOne: one ?? w.title, partnerTwo: two ?? "", weddingDate: w.weddingDate!, venue: str(w.venue), photo: w.image?.[0]?.url };
  }), fbBanns);
});

/* ------------------------------------------------------------------ publications */

type CraftPublication = {
  slug: string; title: string; postDate: string; publicationCategory: string | null; summary: string | null;
  image: CraftAsset[] | null; pageCount: number | null; document: (CraftAsset & { size?: number | null })[] | null;
};

export const getPublications = cache(async (): Promise<Publication[]> => {
  const cms = await entries<CraftPublication>("publications", `slug title postDate @formatDateTime(format: "Y-m-d") ... on publication_Entry {
    publicationCategory summary image { ${ASSET} } pageCount document { url size } }`);
  return list(cms?.map((p): Publication => ({
    title: p.title,
    slug: p.slug,
    category: (p.publicationCategory as PublicationCategory) || "Ministry",
    year: Number(p.postDate.slice(0, 4)),
    publishDate: p.postDate,
    description: p.summary ?? "",
    coverImage: media(p.image) ?? "TODO",
    pageCount: p.pageCount ?? "TODO",
    fileSize: formatBytes(p.document?.[0]?.size) ?? "TODO",
    pdfUrl: p.document?.[0]?.url ?? "TODO",
  })), fbPublications);
});

export const getPublication = async (slug: string) => (await getPublications()).find((p) => p.slug === slug);

/* ------------------------------------------------------------------ groups */

type CraftGroup = {
  slug: string; title: string; summary: string | null; groupAudience: string | null; whenText: string | null; whereText: string | null;
  area: string | null; image: CraftAsset[] | null; items: { title: string; summary: string | null }[] | null; linkLabel: string | null; linkUrl: string | null;
};

export const getGroups = cache(async (): Promise<Group[]> => {
  const cms = await entries<CraftGroup>("groups", `slug title ... on group_Entry {
    summary groupAudience whenText whereText area image { ${ASSET} } linkLabel linkUrl
    items { ... on item_Entry { title summary } } }`, "title ASC");
  return list(cms?.map((g): Group => ({
    // the join form preselects a group by its name in this format
    slug: g.title.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, ""),
    name: g.title,
    summary: g.summary ?? "",
    audience: (g.groupAudience as GroupAudience) || "Everyone",
    when: g.whenText ?? "",
    where: g.whereText ?? "",
    area: str(g.area),
    image: media(g.image),
    details: g.items?.length ? g.items.map((d) => ({ title: d.title, text: d.summary ?? "" })) : undefined,
    link: g.linkLabel && g.linkUrl ? { label: g.linkLabel, href: g.linkUrl } : undefined,
  })), fbGroups);
});

/* ------------------------------------------------------------------ team */

type CraftPerson = { slug: string; title: string; role: string | null; department: string | null; email: string | null; team: string | null; image: CraftAsset[] | null };

/** Craft's Team dropdown value → the team page's group id */
const TEAM_IDS: Record<string, string> = {
  leadership: "leadership", adults: "adults", nextGen: "next-generation", missions: "missions", worship: "worship-media", support: "support",
};

export type TeamData = { groups: TeamGroup[]; officeBearers: TeamMember[] };

/** Team groups (titles and intros stay in content/about.ts) filled with people from Craft. */
export const getTeam = cache(async (): Promise<TeamData> => {
  const cms = await entries<CraftPerson>("people", `slug title ... on person_Entry { role department email team image { ${ASSET} } }`, "postDate ASC");
  const fallback: TeamData = { groups: fbTeam.groups, officeBearers: fbTeam.officeBearers.members };
  if (!cms?.length) return fallback;

  const member = (p: CraftPerson): TeamMember => ({ id: p.slug, name: p.title, role: str(p.role), ministry: str(p.department), email: str(p.email), photo: media(p.image) });
  const groups = fbTeam.allGroups
    .map((g) => ({ ...g, members: cms.filter((p) => TEAM_IDS[p.team ?? "leadership"] === g.id).map(member) }))
    .filter((g) => g.members.length > 0);
  const officeBearers = cms.filter((p) => p.team === "officeBearers").map(member);
  return { groups: groups.length ? groups : fallback.groups, officeBearers: officeBearers.length ? officeBearers : fallback.officeBearers };
});
