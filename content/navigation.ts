/** Header, mobile menu and footer navigation. */
import { sortedPosts } from "./posts";
import { publications } from "./publications";

export type NavLink = { label: string; href: string; description?: string };
/** A titled column inside a dropdown (used by Resources). */
export type NavGroup = { label: string; href: string; links: NavLink[] };

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavLink[];
  /** dropdown made of titled columns instead of one list */
  groups?: NavGroup[];
};

/*
 * The Resources dropdown has three groups. Blog and Publications fill
 * themselves from content/posts.ts and content/publications.ts, so adding a
 * post or a publication updates the menu with no change here.
 */
const resourcesGroups: NavGroup[] = [
  {
    label: "Resource Library",
    href: "/resources",
    links: [
      { label: "Bible Studies", href: "/resources/bible-studies" },
      { label: "Prayer & Fasting", href: "/resources/prayer-fasting" },
      { label: "Family Worship", href: "/resources/family-worship" },
      { label: "Quest Kids", href: "/resources/quest-kids" },
      { label: "All Resources", href: "/resources" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    links: [
      ...sortedPosts()
        .slice(0, 3)
        .map((p) => ({ label: p.title, href: `/blog/${p.slug}`, description: p.author })),
      { label: "View all posts", href: "/blog" },
    ],
  },
  {
    label: "Publications",
    href: "/publications",
    links: [
      ...[...publications]
        .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
        .map((p) => ({ label: p.title, href: `/publications/${p.slug}` })),
      { label: "All publications", href: "/publications" },
    ],
  },
];

export const mainNav: NavItem[] = [
  {
    label: "New Here",
    href: "/new-here",
    children: [
      { label: "Plan your visit", href: "/new-here/plan-your-visit", description: "Times, parking, kids and what to expect" },
      { label: "Next steps", href: "/new-here/next-steps", description: "Plug-In, New Believers, baptism and more" },
      { label: "What we believe", href: "/about/beliefs", description: "The heart of our faith" },
    ],
  },
  {
    label: "Watch",
    href: "/watch",
    children: [
      { label: "Watch sermons", href: "/watch", description: "Live on Sundays, and every message since" },
      { label: "Podcast", href: "/podcasts", description: "The Compass Podcast: listen anywhere" },
    ],
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Find a group", href: "/get-involved/groups", description: "eGroups, Binti, Jabari and support groups" },
      { label: "Serve on a team", href: "/get-involved/serve", description: "Use your gifts to serve others" },
      { label: "Kinara leadership", href: "/get-involved/kinara", description: "Two-year programme for emerging leaders" },
      { label: "School of Ministry", href: "/get-involved/school-of-ministry", description: "Tools to lead and serve" },
      { label: "Logos Scholarship Fund", href: "/get-involved/logos-scholarship" },
    ],
  },
  {
    label: "Ministries",
    href: "/ministries",
    children: [
      { label: "Quest children's ministry", href: "/ministries/quest-children", description: "Ages 2–11" },
      { label: "Next Gen youth church", href: "/ministries/next-gen-youth", description: "Teens" },
      { label: "BLITZ 5:16 young adults", href: "/ministries/blitz-young-adults", description: "Ages 19–26" },
      { label: "Prayer", href: "/ministries/prayer" },
      { label: "Discipleship", href: "/ministries/discipleship" },
      { label: "Outreach", href: "/ministries/outreach" },
      { label: "Social justice", href: "/ministries/social-justice" },
      { label: "Counselling and care", href: "/ministries/counselling-care" },
      { label: "Marketplace Ministry", href: "/ministries/marketplace" },
      { label: "Enzi disability ministry", href: "/ministries/enzi" },
    ],
  },
  { label: "Events", href: "/events" },
  {
    label: "Resources",
    href: "/resources",
    groups: resourcesGroups,
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About us", href: "/about" },
      { label: "What we believe", href: "/about/beliefs" },
      { label: "Our Compass", href: "/about/compass" },
      { label: "Our team", href: "/about/team" },
      { label: "Financials", href: "/about/financials" },
      { label: "Marriage banns", href: "/info-desk/marriage-banns" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const footerNav = [
  {
    title: "About",
    links: [
      { label: "About us", href: "/about" },
      { label: "What we believe", href: "/about/beliefs" },
      { label: "Our team", href: "/about/team" },
      { label: "Financials", href: "/about/financials" },
      { label: "Marriage banns", href: "/info-desk/marriage-banns" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Plan your visit", href: "/new-here/plan-your-visit" },
      { label: "Next steps", href: "/new-here/next-steps" },
      { label: "Find a group", href: "/get-involved/groups" },
      { label: "Serve on a team", href: "/get-involved/serve" },
      { label: "Give", href: "/give" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Watch sermons", href: "/watch" },
      { label: "Podcast", href: "/podcasts" },
      { label: "Resource library", href: "/resources" },
      { label: "What's on", href: "/events" },
      { label: "Blog", href: "/blog" },
      { label: "Publications", href: "/publications" },
    ],
  },
];

export const legalNav = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Safeguarding policy", href: "/safeguarding" },
  { label: "Terms", href: "/terms" },
  { label: "Image credits", href: "/credits" },
];
