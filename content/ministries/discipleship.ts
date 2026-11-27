import type { MinistryBase } from "./types";

export const discipleship: MinistryBase & {
  pathways: { title: string; summary: string; href: string; cta: string }[];
  depth: { summary: string; courses: string };
  plugInVideo: { id: string; title: string };
} = {
  slug: "discipleship",
  href: "/ministries/discipleship",
  name: "Discipleship",
  title: "Discipleship",
  meta: {
    title: "Discipleship",
    description:
      "Grow as a follower of Jesus at Nairobi Chapel Ngong Road: Plug-In, New Believers and baptism, eGroups, DEPTH teaching, School of Ministry, Kinara and the Marketplace ministry.",
  },
  intro:
    "Our mission is being disciples and making disciples of Jesus Christ. Wherever you are on the journey, there is a next step for you.",
  heroImage: "discipleship.hero",
  facts: [
    { icon: "users", label: "Who", value: "Everyone, from first-time guests to long-time members" },
    { icon: "clock", label: "When", value: "Programmes run on Sundays and through the week" },
    { icon: "mapPin", label: "Where", value: "Nairobi Chapel Ngong Road and eGroups in homes across Nairobi" },
    { icon: "mail", label: "Contact", value: "mail@nairobichapel.org", href: "mailto:mail@nairobichapel.org" },
  ],
  pathways: [
    {
      title: "Plug-In",
      summary: "A 10-week course to connect with God, community, church and your destiny.",
      href: "/new-here/next-steps",
      cta: "Join the next Plug-In",
    },
    {
      title: "New Believers and baptism",
      summary: "A five-Sunday class for anyone who has decided to follow Jesus, and the next step of baptism.",
      href: "/new-here/next-steps",
      cta: "See the next steps",
    },
    {
      title: "eGroups",
      summary: "Small groups in homes across Nairobi where the life of the church happens.",
      href: "/get-involved/groups",
      cta: "Find a group",
    },
    {
      title: "9to5 Marketplace Ministry",
      summary: "Equipping professionals to represent God's kingdom at work.",
      href: "/ministries/marketplace",
      cta: "Explore Marketplace",
    },
    {
      title: "School of Ministry",
      summary: "Tools to lead, serve and transform lives through Christ.",
      href: "/get-involved/school-of-ministry",
      cta: "Explore School of Ministry",
    },
    {
      title: "Kinara leadership programme",
      summary: "A two-year programme for emerging leaders called to full-time ministry.",
      href: "/get-involved/kinara",
      cta: "Explore Kinara",
    },
  ],
  depth: {
    summary:
      "DEPTH is a teaching ministry of Nairobi Chapel that guides members through a journey of growth in knowledge and understanding of the faith.",
    courses: "[TODO: DEPTH course list (the old site only showed it as an unreadable table image)]",
  },
  plugInVideo: { id: "[TODO: YouTube ID of the Plug-In intro video]", title: "Introducing Plug-In" },
  nextStep: {
    title: "Take your next step",
    text: "Plug-In is the best place to start if you're new to Nairobi Chapel.",
    primary: { label: "Join the next Plug-In", href: "/new-here/next-steps" },
    secondary: { label: "Find a group", href: "/get-involved/groups" },
  },
};
