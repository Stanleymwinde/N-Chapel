import type { FormDefinition, Group, GroupAudience } from "./types";

/**
 * Groups shown in the group finder (/get-involved and /get-involved/groups).
 * `slug` must equal the group name lower-cased with non-letters as "-"
 * (e.g. "Addiction support group" → "addiction-support-group") so that
 * "Join this group" can preselect it in the join form.
 */

/** eGroup zones / areas. TODO: the church to supply the list of zones. */
export const groupAreas: string[] = [];
export const groupAreasTodo = "[TODO: list the eGroup zones/areas across Nairobi]";

export const groupAudiences: GroupAudience[] = ["Everyone", "Women", "Men", "Young adults", "Support"];

export const groupsIntro = "Life is better together. Find a group where you can belong, grow and serve.";

export const groups: Group[] = [
  {
    slug: "egroups",
    name: "eGroups",
    audience: "Everyone",
    summary:
      "Small groups across Nairobi and its outskirts where the life of the church happens. Members meet in homes to grow, build friendships and serve.",
    when: "[TODO: eGroup meeting days and times]",
    where: "Homes across Nairobi and its outskirts",
    image: "groups.egroups",
    details: [
      { title: "Accountability", text: "Honest relationships where we encourage one another to live what we believe." },
      { title: "Belonging", text: "A place to connect beyond Sunday, where you can say: “This is my family.”" },
      { title: "Care", text: "Supporting one another through bereavement, illness, weddings, job loss and other life moments." },
      { title: "Discipleship", text: "Applying Sunday's teaching through real conversation and follow-up." },
      { title: "Evangelism", text: "Reaching our neighbours, colleagues and communities together." },
    ],
  },
  {
    slug: "binti",
    name: "Binti",
    audience: "Women",
    summary:
      "When women walk together, it's a bond unlike any other. A community where women stand together, lift each other up and pray, building strength, stamina and perseverance with God.",
    when: "[TODO: Binti meeting days and times]",
    where: "[TODO: Binti venue]",
    image: "groups.binti",
  },
  {
    slug: "jabari",
    name: "Jabari",
    audience: "Men",
    summary:
      "A brotherhood calling men to live courageous, uncommon Christian lives, like the warriors who rallied to David: “brave warriors, ready for battle… swift as gazelles” (1 Chronicles 12:8).",
    when: "[TODO: Jabari meeting days and times]",
    where: "[TODO: Jabari venue]",
    image: "groups.jabari",
  },
  {
    slug: "blitz-5-16",
    name: "BLITZ 5:16",
    audience: "Young adults",
    summary:
      "For young men and women aged 19–26: college students and early-career young people building a deeper relationship with God.",
    when: "Friday evening Bible study; Sundays 11:30 AM–1:00 PM",
    where: "[TODO: BLITZ 5:16 venue]",
    link: { label: "Explore BLITZ 5:16", href: "/ministries/blitz-young-adults" },
  },
  {
    slug: "addiction-support-group",
    name: "Addiction support group",
    audience: "Support",
    summary:
      "Life's challenges can feel overwhelming, but you don't have to face them alone. A confidential group for people walking the road to recovery.",
    when: "Thursdays, 6:30–7:30 PM",
    where: "[TODO: addiction support group venue]",
    image: "groups.support",
  },
  {
    slug: "griefshare",
    name: "GriefShare",
    audience: "Support",
    summary: "Support after the loss of a loved one, with others who understand what grief is like.",
    when: "[TODO: GriefShare schedule]",
    where: "[TODO: GriefShare venue]",
  },
  {
    slug: "plug-in",
    name: "Plug-In",
    audience: "Everyone",
    summary:
      "A 10-week course to connect with God, community, church and your purpose. The best first step after you start attending.",
    when: "10 weeks. [TODO: next Plug-In start date]",
    where: "[TODO: Plug-In venue]",
    link: { label: "See next steps", href: "/new-here/next-steps" },
  },
  {
    slug: "school-of-ministry",
    name: "School of Ministry",
    audience: "Everyone",
    summary:
      "Equips you with tools to lead, serve and transform lives through Christ, whether you are new to ministry or sharpening your skills.",
    when: "[TODO: School of Ministry course dates]",
    where: "[TODO: School of Ministry venue]",
    link: { label: "Explore School of Ministry", href: "/get-involved/school-of-ministry" },
  },
  {
    slug: "marketplace",
    name: "Marketplace Ministry",
    audience: "Everyone",
    summary: "Equips professionals to represent God's kingdom at work through stories, forums, training and networks.",
    when: "[TODO: forum dates]",
    where: "[TODO: venue]",
    link: { label: "Explore Marketplace Ministry", href: "/ministries/marketplace" },
  },
  {
    slug: "outreach",
    name: "Outreach teams",
    audience: "Everyone",
    summary: "Prison, sports, community and mission teams that share the good news and introduce people to Jesus Christ.",
    when: "[TODO: outreach team schedules]",
    where: "Ngong Road and the surrounding community",
    link: { label: "Explore outreach", href: "/ministries/outreach" },
  },
  {
    slug: "social-justice",
    name: "Social justice",
    audience: "Everyone",
    summary: "Benevolence, the Women Empowerment Program and Hands of Compassion: caring for people spiritually, emotionally and physically.",
    when: "Weekly and monthly programmes",
    where: "Ngong Road and neighbouring communities",
    link: { label: "Explore social justice", href: "/ministries/social-justice" },
  },
];

/** Groups people can join through the form (link-only cards are excluded). */
export const joinableGroups = groups.filter((g) => !g.link);

export const joinGroupForm: FormDefinition = {
  id: "join-group",
  title: "Join a group",
  intro: "Tell us a little about you and a group leader will get in touch.",
  submitLabel: "Send my details",
  successMessage: "Thanks! A group leader will contact you within a week.",
  privacyNote: "We only use your details to connect you with a group.",
  fields: [
    { name: "fullName", label: "Full name", type: "text", required: true, autoComplete: "name" },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
    { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", helper: "We may call or WhatsApp you." },
    {
      name: "group",
      label: "Community",
      type: "select",
      required: true,
      options: [...joinableGroups.map((g) => g.name), "Not sure yet"],
    },
    {
      name: "area",
      label: "Area",
      type: "select",
      options: [...groupAreas, "Not sure yet"],
      helper: "Where you live or work, so we can suggest a group near you.",
    },
    {
      name: "preferredDay",
      label: "Preferred day",
      type: "select",
      options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Any day"],
    },
    { name: "message", label: "Message", type: "textarea", helper: "Anything you'd like the group leader to know." },
  ],
};
