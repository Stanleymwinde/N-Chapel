import type { FormDefinition, MinistryBase } from "./types";

export const prayer: MinistryBase & {
  pastoralCare: string;
  weekly: { day: string; time: string; mode: string; detail: string }[];
  joinNote: string;
  focus: { title: string; text: string; references: string }[];
  mobilise: string;
  touch: string;
  requestForm: FormDefinition;
} = {
  slug: "prayer",
  href: "/ministries/prayer",
  name: "Prayer",
  title: "Prayer",
  meta: {
    title: "Prayer",
    description:
      "Pray with Nairobi Chapel Ngong Road: weekday morning prayer on Zoom, Wednesday Midweek Prayer Service in person, prayer at the pastoral care tent every Sunday, and a confidential prayer request form.",
  },
  intro: "Prayer undergirds every part of our ministry.",
  heroImage: "prayer.hero",
  scripture: { text: "My house will be called a house of prayer for all nations.", reference: "Mark 11:17" },
  pastoralCare:
    "Every Sunday, before and after each service, pastors are available at the pastoral care tent to pray with you.",
  facts: [
    { icon: "clock", label: "Weekdays", value: "Monday–Friday, 5:00–6:00 AM on Zoom" },
    { icon: "users", label: "Midweek", value: "Wednesdays, 6:00–7:30 PM, in person" },
    { icon: "heart", label: "Sundays", value: "Pastors pray with you at the pastoral care tent, before and after each service" },
    { icon: "whatsapp", label: "Join", value: "WhatsApp 0701 777 888", href: "https://wa.me/254701777888" },
  ],
  weekly: [
    {
      day: "Monday–Friday",
      time: "5:00–6:00 AM",
      mode: "Online on Zoom",
      detail: "Start the day in prayer together. [TODO: Zoom link or how to receive it]",
    },
    {
      day: "Wednesday",
      time: "6:00–7:30 PM",
      mode: "In person",
      detail: "Midweek Prayer Service at Nairobi Chapel Ngong Road.",
    },
    {
      day: "Sunday",
      time: "Before and after each service",
      mode: "Pastoral care tent",
      detail: "Pastors are available to pray with you.",
    },
  ],
  joinNote: "To join weekday prayer, WhatsApp 0701 777 888.",
  focus: [
    {
      title: "Prayer as a way of life",
      text: "We encourage personal prayer as a lifestyle, not just an event.",
      references: "Psalm 51:10; 1 Thessalonians 5:16–19",
    },
    {
      title: "A house of prayer with a heart for the lost",
      text: "We want the church to be a house of prayer, with a passion for people who don't yet know Jesus.",
      references: "Mark 11:17; Luke 19:10",
    },
  ],
  mobilise:
    "Prayer mobilises the church toward transformation, here at Nairobi Chapel Ngong Road and in mission beyond.",
  touch: "Our current season is “Global Reach through Local TOUCH”: Teams, One on One, Under 18, Community and Health. Our Compass sets out each area.",
  requestForm: {
    id: "prayer-request",
    title: "Send a prayer request",
    intro: "Tell us how we can pray for you. You don't have to give your name.",
    fields: [
      { name: "name", label: "Your name", type: "text", autoComplete: "name" },
      { name: "contact", label: "Phone or email, if you'd like us to follow up", type: "text", autoComplete: "email" },
      { name: "request", label: "Your prayer request", type: "textarea", required: true },
      {
        name: "teamOnly",
        label: "Share with the prayer team only",
        type: "checkbox",
        helper: "Ticked: only the prayer team sees your request. Unticked: a pastor may also follow up with you.",
      },
    ],
    submitLabel: "Send my prayer request",
    successMessage: "Thank you. Our prayer team will be praying for you.",
    privacyNote:
      "Your request is confidential. It is only shared with the people who pray for it and is never published.",
  },
  nextStep: {
    title: "Pray with us this Wednesday",
    text: "Midweek Prayer Service, 6:00–7:30 PM, in person. Everyone is welcome.",
    primary: { label: "Plan your visit", href: "/new-here/plan-your-visit" },
    secondary: { label: "Download a fasting guide", href: "/resources?type=prayer-fasting" },
  },
};
