import type { MinistryBase } from "./types";

/**
 * Marketplace Ministry. Copy follows the church's content guide
 * (Nov 2026), which stays close to the church's own source text.
 */
export const marketplace: MinistryBase & {
  purpose: string;
  how: { title: string; text: string }[];
  sectors: [string, string][];
} = {
  slug: "marketplace",
  href: "/ministries/marketplace",
  name: "Marketplace Ministry",
  title: "Marketplace Ministry",
  meta: {
    title: "Marketplace Ministry",
    description:
      "Marketplace Ministry equips professionals at Nairobi Chapel Ngong Road to represent God's kingdom at work through sharing, sharpening, impact and spiritual nurture.",
  },
  intro: "Marketplace Ministry equips professionals to represent God's kingdom at work.",
  heroImage: "marketplace.hero",
  facts: [
    { icon: "users", label: "Who", value: "Professionals and business people in every field" },
    { icon: "clock", label: "When", value: "[TODO: meeting days, times or forum dates]" },
    { icon: "mapPin", label: "Where", value: "[TODO: where the ministry meets]" },
    { icon: "phone", label: "Contact", value: "[TODO: confirm the Marketplace Ministry contact]" },
  ],
  purpose:
    "We believe work has a God-given purpose. God is the originator of work and created us to work, and He calls us to represent His kingdom and be a light to the nations, including in the marketplace. As followers of Christ, we have the opportunity to restore the moral compass of our society by being salt and light where we work.",
  how: [
    {
      title: "Sharing",
      text: "Professionals are inspired to take part in transforming their workplaces by hearing how others are doing it and how they've faced the challenges.",
    },
    { title: "Sharpening", text: "Forums that sharpen professionals in their areas of expertise." },
    { title: "Impact", text: "Pooling wisdom, resources, and networks to address issues and solve problems in each sector." },
    { title: "Spiritual nurture", text: "A place where members are equipped and discipled to represent Christ." },
  ],
  // Six sectors, each pairing two areas
  sectors: [
    ["Education", "Family"],
    ["Politics", "Governance"],
    ["Business", "Commerce"],
    ["Arts", "Media"],
    ["Science", "Medicine"],
    ["Church", "Religion"],
  ],
  nextStep: {
    title: "Bring your faith to work",
    text: "Connect with other professionals who want to represent God's kingdom where they work.",
    primary: { label: "Contact the Marketplace team", href: "/contact?subject=General" },
    secondary: { label: "Find a group", href: "/get-involved/groups" },
  },
};
