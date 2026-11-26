import type { MinistryBase } from "./types";

export const counselling: MinistryBase & {
  emergency: { text: string; helpline: string };
  services: { title: string; summary: string; when: string; who: string }[];
  booking: string;
  faq: { question: string; answer: string }[];
} = {
  slug: "counselling-care",
  href: "/ministries/counselling-care",
  name: "Counselling and care",
  title: "Counselling and care",
  meta: {
    title: "Counselling and care",
    description:
      "Free, confidential counselling at Nairobi Chapel Ngong Road (personal, marriage, teens, mental health), plus an addiction support group and GriefShare.",
  },
  intro: "Life's challenges can feel overwhelming, but you don't have to face them alone.",
  heroImage: "counselling.hero",
  facts: [
    { icon: "clock", label: "Counselling hours", value: "Wednesday and Friday 10 AM–4 PM; Saturday 9 AM–2 PM" },
    { icon: "heart", label: "Cost", value: "Free and confidential" },
    { icon: "mapPin", label: "Where", value: "Nairobi Chapel Ngong Road [TODO: counselling room location on campus]" },
    { icon: "phone", label: "Book", value: "[TODO: how to book a counselling session]" },
  ],
  emergency: {
    text: "If you are in immediate danger, call 999 or 112.",
    helpline: "[TODO: confirm a current Kenya mental health helpline number before publishing]",
  },
  services: [
    {
      title: "Counselling",
      summary: "Free, confidential support for personal concerns, marriage, teens and mental health.",
      when: "Wednesday and Friday 10 AM–4 PM; Saturday 9 AM–2 PM",
      who: "Individuals, couples and teens",
    },
    {
      title: "Addiction support group",
      summary: "A safe, confidential group for people working toward freedom from addiction.",
      when: "Thursdays, 6:30–7:30 PM",
      who: "Anyone affected by addiction",
    },
    {
      title: "GriefShare",
      summary: "A support circle for people who have lost a loved one.",
      when: "[TODO: GriefShare schedule]",
      who: "Anyone grieving a loss",
    },
  ],
  booking: "[TODO: booking method (phone, WhatsApp, form or walk-in)]",
  faq: [
    {
      question: "Does counselling cost anything?",
      answer: "No. Counselling is free.",
    },
    {
      question: "Is what I share kept private?",
      answer: "Yes. Counselling is confidential.",
    },
    {
      question: "Do I need to be a member of the church?",
      answer: "[TODO: confirm whether counselling is open to non-members]",
    },
  ],
  nextStep: {
    title: "Talk to someone",
    text: "Reach out in confidence. We'll help you find the right support.",
    primary: { label: "Contact the care team", href: "/contact?subject=Pastoral%20care" },
    secondary: { label: "Send a prayer request", href: "/ministries/prayer#request" },
  },
};
