import type { Fact, FaqItem, FormDefinition, PathwayStep } from "./types";

/* ------------------------------------------------------------------ */
/* /new-here                                                           */
/* ------------------------------------------------------------------ */

export const newHere = {
  title: "New to Nairobi Chapel?",
  // From the welcome copy on the church's current New Here page
  welcome:
    "However you found us, welcome. Here we walk together, pray together, laugh together and go through the seasons of life together, growing deeper together to reach wider together.",
  visitIntro:
    "Visiting a new church can feel daunting, so we've put everything you need in one place: service times, directions, what happens for your children, and answers to the questions people ask most.",
  saturday: "Can't make it on a Sunday? Church @ 5 meets every Saturday from 5:00 to 6:45 PM.",
  faithTitle: "Exploring faith, or new to faith?",
  faithIntro:
    "If you have questions about Jesus, or you've recently decided to follow Him, we'd love to walk with you. Plug-In, the New Believers class and baptism are simple steps to take, one at a time.",
  cards: [
    { title: "Plan your visit", summary: "Service times, directions, kids and what to expect.", href: "/new-here/plan-your-visit", image: "visit.hero" },
    { title: "Take a next step", summary: "Plug-In, the New Believers class, baptism, eGroups and serving.", href: "/new-here/next-steps", image: "nextsteps.hero" },
    { title: "What we believe", summary: "The heart of our faith in Jesus Christ, and the Scriptures it stands on.", href: "/about/beliefs", image: "beliefs.hero" },
  ],
};

export const questionsForm: FormDefinition = {
  id: "new-here-question",
  title: "Got questions?",
  intro: "Ask us anything about visiting, faith or church life. A real person will reply.",
  fields: [
    { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
    {
      name: "contact",
      label: "Phone or email",
      type: "text",
      required: true,
      autoComplete: "email",
      helper: "So we can get back to you.",
    },
    { name: "question", label: "Your question", type: "textarea", required: true },
  ],
  submitLabel: "Send my question",
  successMessage: "Thank you! Someone from our welcome team will get back to you soon.",
};

/* ------------------------------------------------------------------ */
/* /new-here/plan-your-visit                                           */
/* ------------------------------------------------------------------ */

export const visit = {
  title: "Welcome to Nairobi Chapel",
  intro: "We'd love to welcome you at one of our Sunday services. Here's everything you need for your first visit.",

  serviceTimes: [
    { time: "9:00 AM", label: "First service" },
    { time: "11:30 AM", label: "Second service" },
  ],
  alsoOnSunday: [
    {
      title: "BLITZ 5:16 young adults service",
      when: "Sundays, 11:30 AM – 1:00 PM",
      detail: "For ages 19–26: college students and young people early in their careers who want a deeper relationship with God.",
      href: "/ministries/blitz-young-adults",
      cta: "Explore BLITZ 5:16",
    },
    {
      title: "Car Bazaar Sunday Service",
      when: "Sundays, 11:00 AM – 12:00 noon",
      detail: "At the Car Bazaar grounds, next to the Talanta Centre.",
    },
  ],

  location: {
    title: "Finding us",
    address: "Ngong Road, Nairobi",
  },

  /** Gatherings on other days of the week */
  otherGatherings: [
    {
      title: "Nairobi Chapel Church @ 5",
      day: "Saturdays",
      time: "5:00 – 6:45 PM",
      summary:
        "A Saturday evening service to connect with God and community and be refreshed, for anyone who can't make it on Sunday because of work, school, travel or anything else. Rooted, Relevant and Real.",
      where: "Nairobi Chapel Ngong Road",
      who: "Anyone who can't attend on Sundays",
    },
    {
      title: "Midweek Prayer Service",
      day: "Wednesdays",
      time: "From 6:00 PM",
      summary: "A time to pause, seek God's presence and recharge through worship, Scripture and intercession. Open to anyone needing encouragement, healing or a moment to reflect.",
      where: "Nairobi Chapel",
      who: "Everyone",
      cta: { label: "Explore prayer", href: "/ministries/prayer" },
    },
    {
      title: "iPRAYSE",
      day: "Last Friday of every month",
      time: "6:00 PM",
      summary: "A night of worship and prayer: lifting our voices in praise, surrendering in prayer and meeting God more deeply.",
      where: "Nairobi Chapel",
      who: "Everyone",
    },
    {
      title: "iPRAYse KESHA",
      day: "Last Friday of every quarter",
      time: "6:30 PM",
      summary: "A night of prayer, worship and spiritual renewal, with extended time to seek God, intercede and realign our hearts.",
      where: "Ngong Road campus",
    },
  ],

  kids: {
    title: "Kids on Sunday",
    summary: "Quest, our children's ministry, runs age-grouped classes for children aged 2–11 during Sunday services.",
    session: ["Worship", "Bible teaching", "Small groups", "Memory verses", "Crafts"],
    groups: [
      {
        name: "Kiota",
        meaning: "“nest” in Swahili",
        ages: "Ages 2–5",
        classes: [
          { name: "Itibari", meaning: "Faith bud", age: "2 years" },
          { name: "Neema", meaning: "Grace", age: "3 years" },
          { name: "Imani", meaning: "Faith", age: "[TODO: confirm age]" },
        ],
      },
      {
        name: "Jasiri",
        meaning: "“courage” in Swahili",
        ages: "Ages 6–11",
        classes: [
          { name: "Sifa", meaning: "Praise", age: "6–7 years" },
          { name: "Shangwe", meaning: "Jubilation", age: "8–9 years" },
          { name: "Johari", meaning: "Gem", age: "10–11 years" },
        ],
      },
    ],
    safety: [
      "Parents sign children in when they drop them off, and sign them out at pick-up.",
      "When you register, you receive a tag with a special code. Show it at pick-up.",
      "All volunteers are trained and screened.",
    ],
  },

  faq: [
    {
      question: "When should I arrive?",
      answer: "[TODO: recommended arrival time, e.g. 15 minutes before the service to park and check children in]",
    },
    {
      question: "Where do I park?",
      answer: "[TODO: parking arrangements on Sunday, including overflow parking and any marshals]",
    },
    {
      question: "How long is the service?",
      answer: "[TODO: typical length of the 9:00 and 11:30 AM services] Church @ 5 on Saturdays runs from 5:00 to 6:45 PM.",
    },
    {
      question: "What should I wear?",
      answer: "[TODO: confirm dress guidance, e.g. come as you are]",
    },
    {
      question: "What happens to my kids?",
      answer:
        "Quest runs age-grouped classes for children aged 2–11: Kiota for ages 2–5 and Jasiri for ages 6–11. You sign your child in and out, and when you register you receive a tag with a special code to show at pick-up.",
    },
    {
      question: "Is the venue accessible?",
      answer:
        "Sign language interpretation is available at the 11:30 AM service, and the Enzi Class at Quest serves children with special needs. [TODO: physical access details: step-free routes, accessible toilets, seating]",
    },
    {
      question: "Do I need to give?",
      answer:
        "[TODO: confirm the church's wording on whether guests are expected to give] If you'd like to give, you can use M-Pesa Paybill 508701, a bank transfer, or the Give page.",
    },
    {
      question: "Can someone pray with me?",
      answer:
        "Yes. Tick “I'd like someone to pray with me” on the form below, or send a prayer request. On Sundays, pastors pray with people at the pastoral care tent before and after each service.",
    },
  ] satisfies FaqItem[],
};

/** The Visitors Welcome Form, with the fields of the church's current one. */
export const visitForm: FormDefinition = {
  id: "plan-visit",
  title: "Let us know you're coming",
  intro: "Optional, but it helps us welcome you, and follow up if you'd like us to.",
  fields: [
    { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
    { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
    { name: "ageBracket", label: "Age bracket", type: "select", options: ["13–18", "19–29", "30s", "40s", "50s", "60s", "70s"] },
    { name: "lookingForChurch", label: "I'm looking for a home church", type: "checkbox" },
    { name: "visitingBriefly", label: "I'm visiting briefly and have a home church", type: "checkbox" },
    { name: "prayWithMe", label: "I'd like someone to pray with me", type: "checkbox" },
    { name: "knowJesus", label: "I'd like to know more about Jesus and the Christian faith", type: "checkbox" },
    {
      name: "heardFrom",
      label: "How did you hear about us?",
      type: "select",
      options: ["A member of the church", "Social media or the website", "Family, a friend or a colleague", "I live in the area", "Other"],
    },
  ],
  submitLabel: "Let us know",
  successMessage: "Thank you! Someone from our welcome team will be in touch.",
};

/* ------------------------------------------------------------------ */
/* /new-here/next-steps                                                */
/* ------------------------------------------------------------------ */

export const nextSteps = {
  title: "Next steps",
  intro: "Faith grows step by step. Here's a simple path to help you belong, grow and serve.",
  steps: [
    {
      title: "Plug-In",
      when: "10 weeks · next start: [TODO: next Plug-In start date]",
      summary:
        "We desire that you will not only attend church on Sunday, but get the opportunity to live out what the Bible says.",
      bullets: [
        "Connect to God: reflection, Bible study, prayer and journaling for an hour a day.",
        "Connect to community: bond with your group during meetings and Saturday activities.",
        "Connect to church: discover your spiritual gifts, then serve in a 6-month internship as a greeter, usher, in outreach, or in adult, youth and children's ministries.",
        "Connect to destiny: seek your purpose and the difference you can make.",
      ],
      cta: { label: "Join the next Plug-In", href: "#sign-up" },
    },
    {
      title: "New Believers class",
      when: "Five Sundays, 10:30 AM – 12:50 PM",
      summary:
        "For anyone who has decided to follow Jesus. Covers salvation, the Word of God, prayer, fellowship and serving God. A facilitator walks with you.",
      cta: { label: "Join a New Believers class", href: "#sign-up" },
    },
    {
      title: "Baptism",
      summary:
        "An outward sign of inward and invisible grace; a public testimony of what God has done; an act of obedience, commitment, and a public confession of faith.",
      cta: { label: "Ask about baptism", href: "#sign-up" },
    },
    {
      title: "Join an eGroup",
      summary: "Small groups across Nairobi where you can belong, grow and care for one another.",
      cta: { label: "Find a group", href: "/get-involved/groups" },
    },
    {
      title: "Serve on a team",
      summary: "Use your time, talents and spiritual gifts to serve others.",
      cta: { label: "Find a team", href: "/get-involved/serve" },
    },
  ] satisfies PathwayStep[],
};

export const nextStepsForm: FormDefinition = {
  id: "next-steps",
  title: "Sign up for a next step",
  intro: "Tell us which step you'd like to take and we'll be in touch with dates and details.",
  fields: [
    { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
    { name: "phone", label: "Phone number", type: "tel", required: true, autoComplete: "tel" },
    { name: "email", label: "Email", type: "email", autoComplete: "email" },
    {
      name: "step",
      label: "Which step?",
      type: "select",
      required: true,
      options: ["Plug-In", "New Believers class", "Baptism", "Join an eGroup", "Serve on a team", "Not sure yet"],
    },
    { name: "message", label: "Anything you'd like us to know?", type: "textarea" },
  ],
  submitLabel: "Sign me up",
  successMessage: "Thank you! We'll be in touch with the next dates and details.",
};

export const visitFacts: Fact[] = [
  { icon: "clock", label: "Sunday services", value: "9:00 AM and 11:30 AM" },
  { icon: "mapPin", label: "Where", value: "Ngong Road, Nairobi" },
  { icon: "baby", label: "Kids", value: "Quest classes for ages 2–11" },
];
