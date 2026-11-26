import type { IconName } from "../types";
import type { MinistryBase } from "./types";

/**
 * Enzi disability ministry. "What we do", contact and the publication are the
 * church's own text (supplied Nov 2026), matching the Enzi flyer (May 2025).
 */
export const enzi: MinistryBase & {
  why: string[];
  activities: { icon: IconName; title: string; text: string }[];
  serve: { title: string; text: string; codes: { code: string; label: string }[]; phone: string };
  contact: { icon: IconName; label: string; value: string; href: string; whatsapp?: string; note?: string }[];
  document: { title: string; description: string; pdfUrl: string; fileSize?: string; date: string };
} = {
  slug: "enzi",
  href: "/ministries/enzi",
  name: "Enzi",
  title: "Enzi disability ministry",
  meta: {
    title: "Enzi disability ministry",
    description:
      "Enzi means treasured. Nairobi Chapel Ngong Road's disability ministry: the Enzi Class at Quest, Enzi Parents' Meetings, sign language interpretation at the 11:30am service, and wheelchair distribution with Hope Mobility Kenya.",
  },
  intro: "Enzi means treasured. Every person is treasured by God, and belongs in His church.",
  heroImage: "enzi.hero",
  scripture: {
    text: "But when you give a banquet, invite the poor, the crippled, the lame, the blind, and you will be blessed.",
    reference: "Luke 14:13–14",
  },
  facts: [
    { icon: "accessibility", label: "Who", value: "People with disabilities, their families and friends" },
    { icon: "clock", label: "When", value: "Enzi Class at both Sunday services; parents meet every two months" },
    { icon: "mapPin", label: "Where", value: "Nairobi Chapel Ngong Road" },
    { icon: "mail", label: "Contact", value: "info@nairobichapel.org", href: "mailto:info@nairobichapel.org" },
  ],
  why: [
    "Enzi shapes attitudes toward disability according to God's heart (Luke 14:12–14).",
    "People with disabilities are often overlooked in society and in churches.",
    "Enzi works for inclusion and access, so everyone can take part fully in the life of the church.",
  ],

  activities: [
    {
      icon: "baby",
      title: "Enzi Class",
      text: "Special needs classes for children at Quest, our children's ministry, during both Sunday services. When you register your child, ask about the Enzi Class at the Quest Karibu/sign-in area.",
    },
    {
      icon: "users",
      title: "Enzi Parents' Meeting",
      text: "Every two months, Enzi families meet to pray, learn, and support one another.",
    },
    {
      icon: "hand",
      title: "Sign language interpretation",
      text: "Available at the 11:30am adult service.",
    },
    {
      icon: "book",
      title: "Biblical teaching and training",
      text: "We teach on disability from our pulpits so the whole church shares a biblical view of it, and we train our volunteers to serve people of all abilities.",
    },
    {
      icon: "accessibility",
      title: "Wheelchair distribution",
      text: "In partnership with Hope Mobility Kenya, we give wheelchairs to people in our community who need mobility devices, and share the hope of Christ with them.",
    },
  ],

  serve: {
    title: "Serve with Enzi",
    text: "To volunteer, send a Text/WhatsApp with your name and code 2Q (Enzi Volunteer) to 0701 777 888. Sign language interpreters can use code 7R.",
    codes: [
      { code: "2Q", label: "Enzi Volunteer" },
      { code: "7R", label: "Sign language interpreter" },
    ],
    phone: "0701 777 888",
  },

  contact: [
    { icon: "mail", label: "Email", value: "info@nairobichapel.org", href: "mailto:info@nairobichapel.org" },
    { icon: "phone", label: "Phone / WhatsApp", value: "+254 701 777 888", href: "tel:+254701777888", whatsapp: "https://wa.me/254701777888", note: "Main church line" },
  ],

  // Same file as the Enzi Disability Ministry publication; downloaded from the church's site
  document: {
    title: "Enzi Disability Ministry",
    description: "Our Enzi publication explains the ministry and how the church can include people with disabilities.",
    pdfUrl: "/pdfs/enzi-disability-ministry-may-2025.pdf",
    fileSize: "189 KB",
    date: "May 2025",
  },

  nextStep: {
    title: "You are welcome here",
    text: "Tell us about any access needs before you visit and we'll be ready to welcome you.",
    primary: { label: "Plan your visit", href: "/new-here/plan-your-visit" },
    secondary: { label: "Read the Enzi publication", href: "#publication" },
  },
};
