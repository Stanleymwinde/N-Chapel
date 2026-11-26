import type { InfoBlock, MinistryBase } from "./types";

export const outreach: MinistryBase & {
  areas: InfoBlock[];
  quote: { text: string; author: string };
  joinForm: {
    id: string;
    title: string;
    intro: string;
    fields: import("../types").FormField[];
    submitLabel: string;
    successMessage: string;
  };
} = {
  slug: "outreach",
  href: "/ministries/outreach",
  name: "Outreach",
  title: "Outreach",
  meta: {
    title: "Outreach",
    description:
      "Nairobi Chapel Ngong Road reaches out through prison ministry, sports ministry, community outreach and mission in high schools and beyond.",
  },
  intro: "We reach out, share the good news and introduce people to Jesus Christ.",
  heroImage: "outreach.hero",
  scripture: {
    text: "Therefore go and make disciples of all nations, baptising them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you.",
    reference: "Matthew 28:19–20",
  },
  facts: [
    { icon: "users", label: "Who", value: "Anyone who wants to share their faith and serve" },
    { icon: "clock", label: "When", value: "[TODO: outreach team meeting times]" },
    { icon: "mapPin", label: "Where", value: "Jamhuri Short Term Prisons, schools, sports grounds and our neighbourhood" },
    { icon: "phone", label: "Contact", value: "[TODO: outreach ministry contact]" },
  ],
  areas: [
    {
      id: "prison",
      title: "Prison Ministry",
      summary:
        "Since March 2011 we have served at Jamhuri Short Term Prisons, among male inmates serving sentences of up to three years.",
      bullets: [
        "Sunday services, weekly discipleship classes and skills training with inmates and prison staff",
        "Pastoral care for inmates' families",
        "Help with reintegration after release",
      ],
      image: "outreach.prison",
    },
    {
      id: "sports",
      title: "Sports Ministry",
      summary: "We disciple, mentor and raise talent through sport.",
      bullets: [
        "A football team with weekly clinics, discipleship and training",
        "Leadership training for sports teams: team leadership, events, finance and discipleship",
        "Plays in the Football Kenya Federation league and the Church League",
      ],
      image: "outreach.sports",
    },
    {
      id: "community",
      title: "Community Outreach",
      summary: "We build bridges between the church and the community around us.",
      bullets: ["Partnerships with local leaders", "Medical camps", "Clean-ups", "Hands of Compassion visits"],
      image: "outreach.community",
    },
    {
      id: "mission",
      title: "Mission",
      summary: "We share the good news through evangelistic events, missions and evangelism, near and far.",
      bullets: [
        "Short- and long-term missions",
        "Mass and one-on-one evangelism",
        "In high schools: leadership training, missions, weekend challenges, Sunday services and rallies, walking with students through their four years",
      ],
      image: "outreach.mission",
    },
  ],
  quote: {
    text: "Evangelism is not a professional job for a few trained men, but is instead the unrelenting responsibility of every person who belongs to the company of Jesus.",
    author: "Elton Trueblood",
  },
  joinForm: {
    id: "outreach-team",
    title: "Join an outreach team",
    intro: "Tell us where you'd like to serve and someone from the outreach team will get in touch.",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
      { name: "phone", label: "Phone number", type: "tel", required: true, autoComplete: "tel" },
      { name: "email", label: "Email", type: "email", autoComplete: "email" },
      {
        name: "team",
        label: "Which team?",
        type: "select",
        required: true,
        options: ["Prison Ministry", "Sports Ministry", "Community Outreach", "Mission", "Not sure yet"],
      },
      { name: "message", label: "Anything you'd like us to know", type: "textarea" },
    ],
    submitLabel: "Join an outreach team",
    successMessage: "Thank you! Someone from the outreach team will contact you soon.",
  },
  nextStep: {
    title: "Serve beyond Sunday",
    text: "There's a place for your gifts, whether that's on a football pitch, in a prison chapel or in a school hall.",
    primary: { label: "Join an outreach team", href: "#join" },
    secondary: { label: "See social justice work", href: "/ministries/social-justice" },
  },
};
