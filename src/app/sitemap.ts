import type { MetadataRoute } from "next";
import { site } from "@content/site";
import { publishedEvents } from "@content/events";
import { resources } from "@content/library/resources";
import { series } from "@content/library/series";
import { seasons } from "@content/library/seasons";
import { posts } from "@content/posts";
import { publications } from "@content/publications";
import { parseDate } from "@/lib/dates";
import { isUpcoming, nairobiToday } from "@/lib/events";

/** lastModified only when the content date is a real date (not a TODO). */
const validDate = (iso: string) => {
  const d = parseDate(iso);
  return Number.isNaN(d.getTime()) ? {} : { lastModified: d };
};

const staticRoutes = [
  "/",
  "/new-here",
  "/new-here/plan-your-visit",
  "/new-here/next-steps",
  "/watch",
  "/podcasts",
  "/get-involved",
  "/get-involved/groups",
  "/get-involved/serve",
  "/get-involved/kinara",
  "/get-involved/school-of-ministry",
  "/get-involved/logos-scholarship",
  "/ministries",
  "/ministries/quest-children",
  "/ministries/next-gen-youth",
  "/ministries/blitz-young-adults",
  "/ministries/prayer",
  "/ministries/discipleship",
  "/ministries/outreach",
  "/ministries/social-justice",
  "/ministries/counselling-care",
  "/ministries/marketplace",
  "/ministries/enzi",
  "/events",
  "/resources",
  "/blog",
  "/about",
  "/about/beliefs",
  "/about/compass",
  "/about/team",
  "/about/financials",
  "/publications",
  "/info-desk/marriage-banns",
  "/give",
  "/contact",
  "/privacy",
  "/safeguarding",
  "/terms",
  "/credits",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;
  return [
    ...staticRoutes.map((path) => ({
      url: url(path),
      lastModified: now,
      changeFrequency: (path === "/" || path === "/events" || path === "/resources" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "/" ? 1 : path.startsWith("/new-here") || path === "/give" || path === "/watch" ? 0.9 : 0.6,
    })),
    ...publishedEvents
      .filter((e) => isUpcoming(e, nairobiToday(now)))
      .map((e) => ({ url: url(`/events/${e.slug}`), lastModified: now, changeFrequency: "weekly" as const, priority: 0.5 })),
    ...series.map((x) => ({ url: url(`/resources/series/${x.slug}`), priority: 0.5 })),
    ...seasons.map((x) => ({ url: url(`/resources/season/${x.slug}`), priority: 0.5 })),
    ...resources.map((r) => ({ url: url(`/resources/${r.slug}`), ...(r.publishDate ? validDate(r.publishDate) : {}), priority: 0.4 })),
    ...posts.map((p) => ({ url: url(`/blog/${p.slug}`), ...(p.publishDate ? validDate(p.publishDate) : {}), priority: 0.5 })),
    ...publications.map((x) => ({ url: url(`/publications/${x.slug}`), priority: 0.5 })),
  ];
}
