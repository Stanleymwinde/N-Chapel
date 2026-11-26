import type { FormDefinition, InfoBlock, MinistryBase } from "./types";

export const socialJustice: MinistryBase & {
  focusAreas: string[];
  programmes: InfoBlock[];
  supportForm: FormDefinition;
} = {
  slug: "social-justice",
  href: "/ministries/social-justice",
  name: "Social justice",
  title: "Social justice",
  meta: {
    title: "Social justice",
    description:
      "Social Justice at Nairobi Chapel Ngong Road: community outreach, benevolence for families in need, the Women Empowerment Program and Hands of Compassion.",
  },
  intro:
    "Social Justice connects Nairobi Chapel Ngong Road with the community, caring for people spiritually, emotionally and physically.",
  heroImage: "justice.hero",
  facts: [
    { icon: "users", label: "Who", value: "Individuals and families in our congregation and neighbouring communities" },
    { icon: "clock", label: "When", value: "Women Empowerment Program weekly; Hands of Compassion monthly" },
    { icon: "mapPin", label: "Where", value: "Nairobi Chapel Ngong Road and the surrounding community" },
    { icon: "phone", label: "Contact", value: "[TODO: Social Justice ministry contact]" },
  ],
  focusAreas: [
    "Access to quality, affordable healthcare for vulnerable and marginalised communities",
    "Responding to social justice cases and linking people to the right channels",
  ],
  programmes: [
    {
      id: "community",
      title: "Community Outreach",
      summary: "We take part in community programmes, schools and local administration initiatives.",
      image: "justice.community",
    },
    {
      id: "benevolence",
      title: "Benevolence",
      summary:
        "Help for individuals and families in immediate need, in our congregation and in neighbouring communities.",
      bullets: [
        "Pastoral care, counselling and home visits",
        "Immediate relief such as food and shelter",
        "Recovery toward economic empowerment: job placement and skills training",
      ],
      image: "justice.benevolence",
      cta: { label: "Request support", href: "#request-support" },
    },
    {
      id: "women",
      title: "Women Empowerment Program",
      summary: "A weekly programme for spiritual, social and economic empowerment.",
      bullets: [
        "Fellowship and counselling",
        "Saving and financial literacy",
        "Income-generating activities",
        "Access to training and financial services",
        "Collective action",
      ],
      facts: [{ icon: "repeat", label: "How often", value: "Weekly [TODO: day, time and venue]" }],
      image: "justice.women",
    },
    {
      id: "compassion",
      title: "Hands of Compassion",
      summary:
        "Each month we serve children's homes, elderly homes, rehabilitation centres and community groups, with mentorship and one-on-one discipleship.",
      facts: [{ icon: "repeat", label: "How often", value: "Monthly [TODO: next visit date]" }],
      image: "justice.compassion",
    },
  ],
  supportForm: {
    id: "benevolence-support",
    title: "Request support",
    intro: "If you or your family need help, tell us a little about your situation. Only the benevolence team will see this.",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
      { name: "phone", label: "Phone number", type: "tel", required: true, autoComplete: "tel" },
      { name: "email", label: "Email", type: "email", autoComplete: "email" },
      {
        name: "need",
        label: "What kind of help do you need?",
        type: "select",
        required: true,
        options: ["Food", "Shelter", "Counselling", "A home visit", "Job or skills support", "Something else"],
      },
      { name: "message", label: "Tell us about your situation", type: "textarea", required: true },
    ],
    submitLabel: "Request support",
    successMessage: "Thank you for reaching out. A member of the benevolence team will contact you confidentially.",
    privacyNote: "Your request is confidential and only shared with the benevolence team.",
  },
  nextStep: {
    title: "Be part of the answer",
    text: "Volunteer with an outreach team or give to support families in need.",
    primary: { label: "Join an outreach team", href: "/ministries/outreach#join" },
    secondary: { label: "Give now", href: "/give" },
  },
};
