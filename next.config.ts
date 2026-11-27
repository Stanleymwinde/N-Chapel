import type { NextConfig } from "next";

/** Permanent 301 redirect from an old URL. */
const moved = (source: string, destination: string) => ({ source, destination, statusCode: 301 as const });

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Photos uploaded in the Craft CMS (CRAFT_ASSETS_HOST: e.g. "localhost" for a local copy)
    remotePatterns: [
      { protocol: "https", hostname: "cms.nairobichapelngongroad.org" },
      ...(process.env.CRAFT_ASSETS_HOST ? [{ protocol: "http" as const, hostname: process.env.CRAFT_ASSETS_HOST }] : []),
    ],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react", "lucide-react"],
  },
  async redirects() {
    return [
      moved("/visit", "/new-here/plan-your-visit"),
      moved("/connect", "/get-involved"),
      moved("/info-desk", "/events"),
      moved("/donate", "/give"),
      moved("/podcast", "/podcasts"),
      // Resource Library (old WordPress pages)
      moved("/family-worship-pack", "/resources/family-worship"),
      moved("/family-worship-packs", "/resources/family-worship"),
      moved("/quest-childrens-material", "/resources/quest-kids"),
      moved("/childrens-material", "/resources/quest-kids"),
      moved("/children-material", "/resources/quest-kids"),
      moved("/bible-study-devotionals", "/resources/bible-studies"),
      moved("/devotionals", "/resources/bible-studies"),
      moved("/prayer-fasting", "/resources/prayer-fasting"),
      moved("/prayer-and-fasting", "/resources/prayer-fasting"),
      // Older in-site links to filtered views (/resources?type=…) now have pages of their own
      ...[
        ["bible-study", "bible-studies"],
        ["prayer-fasting", "prayer-fasting"],
        ["family-worship", "family-worship"],
        ["kids-craft", "quest-kids"],
        ["kids-devotional", "quest-kids"],
        ["quest-kids", "quest-kids"],
      ].map(([type, slug]) => ({ source: "/resources", has: [{ type: "query" as const, key: "type", value: type }], destination: `/resources/${slug}`, permanent: false })),
      // Blog posts that got new slugs
      moved("/blog/blog-detail-the-merciful", "/blog/when-baca-becomes-berakah"),
      moved("/blog/kenya-tanzania-malawi-zambia-zimbabwe-botswana-eswatini-lesotho-and-south-africa", "/blog/haggai-compassion-over-judgement"),
      moved("/blog/hope-misappropriated-luke-24", "/blog/hope-misappropriated"),
      // Publications and marriage banns
      moved("/our-publications", "/publications"),
      moved("/about/publications", "/publications"),
      moved("/marriage-banns", "/info-desk/marriage-banns"),
      moved("/about/marriage-banns", "/info-desk/marriage-banns"),
    ];
  },
};

export default nextConfig;
