import type { MinistryBase } from "./types";

export const blitz: MinistryBase & {
  rhythm: { title: string; text: string }[];
  sunday: string[];
} = {
  slug: "blitz-young-adults",
  href: "/ministries/blitz-young-adults",
  name: "BLITZ 5:16",
  title: "BLITZ 5:16 young adults",
  meta: {
    title: "BLITZ 5:16 young adults (19–26)",
    description:
      "BLITZ 5:16 is a ministry for young adults aged 19–26: college students and early-career young people. Sunday service 11:30 AM–1:00 PM, Friday Bible study and more.",
  },
  intro:
    "A vibrant ministry for young men and women aged 19–26: college students and early-career young people building a deeper relationship with God.",
  heroImage: "blitz.hero",
  facts: [
    { icon: "users", label: "Who", value: "Young adults aged 19–26" },
    { icon: "clock", label: "Sunday", value: "11:30 AM–1:00 PM, with a 1-hour small-group Bible study first" },
    { icon: "mapPin", label: "Where", value: "[TODO: BLITZ 5:16 Sunday venue]" },
    { icon: "phone", label: "Contact", value: "[TODO: BLITZ 5:16 contact and social media]" },
  ],
  rhythm: [
    { title: "Friday evening Bible study", text: "Dig into the Word together at the end of the week." },
    { title: "House visits", text: "Time in each other's homes, building real friendships." },
    { title: "MANTLE and GLOW", text: "Fellowships for men (MANTLE) and for ladies (GLOW)." },
    { title: "Hikes, camps and team buildings", text: "Getting outdoors and growing closer." },
    { title: "Hangouts", text: "Simply enjoying life together." },
    { title: "Missions", text: "Serving others and sharing the good news." },
  ],
  sunday: [
    "A 1-hour interactive small-group Bible study",
    "Then the BLITZ 5:16 service, led by volunteers, 11:30 AM–1:00 PM",
  ],
  nextStep: {
    title: "Join us at BLITZ 5:16 this Sunday",
    text: "Come for the Bible study, stay for the service, and you'll leave with friends.",
    primary: { label: "Plan your visit", href: "/new-here/plan-your-visit" },
    secondary: { label: "Find a group", href: "/get-involved/groups" },
  },
};
