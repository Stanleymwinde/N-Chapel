import type { Fact, FormDefinition, PathwayStep } from "./types";

/* ---------------- Overview (/get-involved) ---------------- */
export const getInvolved = {
  title: "Get involved",
  intro: "Life is better together. Find a group where you can belong, grow and serve.",
  ways: [
    {
      title: "Find a group",
      summary: "eGroups, Binti, Jabari and support groups: a place to belong beyond Sunday.",
      href: "/get-involved/groups",
      image: "groups.egroups",
      cta: "Find a group",
    },
    {
      title: "Serve on a team",
      summary: "Use your time, talents and spiritual gifts to serve one another.",
      href: "/get-involved/serve",
      image: "serve.hero",
      cta: "Find a team",
    },
    {
      title: "Kinara leadership programme",
      summary: "A two-year programme for emerging leaders who want a life in ministry.",
      href: "/get-involved/kinara",
      image: "kinara.hero",
      cta: "Explore Kinara",
    },
    {
      title: "School of Ministry",
      summary: "Tools to lead, serve and transform lives, whether you're new to ministry or sharpening your skills.",
      href: "/get-involved/school-of-ministry",
      image: "school.hero",
      cta: "Explore School of Ministry",
    },
  ],
};

/* ---------------- Serve (/get-involved/serve) ---------------- */
export const serve = {
  title: "Serve on a team",
  intro: "We have been called to use our time, resources, talents and spiritual gifts to serve one another.",
  scripture: { reference: "1 Peter 4:10" },
  source: "From our “Serving Opportunities” publication.",
  // Moved here from the old "Our Publications" page. pdfUrl stays "TODO" until uploaded.
  document: {
    title: "Serving Opportunities at Nairobi Chapel – Ngong Road",
    description: "Our guide to serving at Nairobi Chapel Ngong Road.",
    pdfUrl: "TODO",
    fileSize: undefined as string | undefined,
  },
  teams: ["Greeters", "Ushers", "Worship", "Children (Quest)", "Youth (Next Gen)", "Outreach", "Media"],
  teamsTodo: "[TODO: confirm the full list of serving teams and each team's SMS sign-up code]",
  steps: [
    {
      title: "Choose a team",
      summary: "Look through the teams and pick one that fits your gifts and your week.",
    },
    {
      title: "Send us a message",
      summary: "SMS or WhatsApp your name and the team code to 0701 777 888.",
      cta: { label: "WhatsApp us", href: "https://wa.me/254701777888" },
    },
    {
      title: "Or use the form",
      summary: "Prefer to write it down? Fill in the form below and we'll get back to you.",
      cta: { label: "Go to the form", href: "#serve-form" },
    },
  ] satisfies PathwayStep[],
  form: {
    id: "serve",
    title: "I'd like to serve",
    submitLabel: "Send my details",
    successMessage: "Thanks for offering to serve! Someone from the team will be in touch.",
    privacyNote: "We only use your details to connect you with a serving team.",
    fields: [
      { name: "fullName", label: "Full name", type: "text", required: true, autoComplete: "name" },
      { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" },
      { name: "email", label: "Email", type: "email", autoComplete: "email" },
      {
        name: "team",
        label: "Team",
        type: "select",
        required: true,
        options: ["Greeters", "Ushers", "Worship", "Children (Quest)", "Youth (Next Gen)", "Outreach", "Media", "Not sure yet"],
      },
      { name: "message", label: "Anything we should know?", type: "textarea" },
    ],
  } satisfies FormDefinition,
};

/* ---------------- Kinara (/get-involved/kinara) ---------------- */
export const kinara = {
  title: "Kinara leadership programme",
  intro:
    "Kinara is a two-year leadership development programme for emerging leaders who are passionate about Jesus and want a life in ministry.",
  applicationFormUrl: "[TODO: Kinara application form PDF URL]",
  facts: [
    {
      icon: "users",
      label: "Who it's for",
      value: "University or college graduates who want to pursue full-time ministry in Kenya or beyond",
    },
    { icon: "calendar", label: "Length", value: "Two years" },
    { icon: "info", label: "Next intake", value: "[TODO: next Kinara intake and application deadline]" },
    { icon: "mail", label: "Contact", value: "[TODO: Kinara contact person / email]" },
  ] satisfies Fact[],
  steps: [
    {
      title: "Download the application form",
      summary: "Get the Kinara application form and fill it in.",
      cta: { label: "Download the application form", href: "[TODO: Kinara application form PDF URL]" },
    },
    {
      title: "Prepare your documents",
      summary: "Put together everything we need to review your application:",
      bullets: [
        "Your CV",
        "The completed application form",
        "Reference letters from at least two referees",
        "A passport photo",
      ],
    },
    {
      title: "Submit your application",
      summary: "[TODO: where and how to submit a Kinara application]",
    },
    {
      title: "First interview",
      summary: "Shortlisted applicants are invited for a first interview.",
    },
  ] satisfies PathwayStep[],
  levels: [
    {
      level: "Level 1",
      title: "Internship",
      focus: "Leading yourself",
      points: [
        "Self-management and work ethic",
        "Spiritual growth",
        "The right attitude to ministry",
        "Clarity of calling",
        "Alignment with the Nairobi Chapel vision",
        "Understanding our statement of faith, DNA and values",
        "Time management",
        "Getting the job done",
      ],
    },
    {
      level: "Level 2",
      title: "Pastoral trainee",
      focus: "Leading others",
      summary: "A year in the field with church planters.",
      points: [
        "Working with volunteers",
        "Strategic planning",
        "Event management",
        "Spiritual growth",
        "Multi-tasking",
        "Submission to authority",
      ],
    },
  ],
  questionForm: {
    id: "kinara-question",
    title: "Ask a question about Kinara",
    submitLabel: "Send my question",
    successMessage: "Thanks! The Kinara team will get back to you.",
    fields: [
      { name: "fullName", label: "Full name", type: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
      { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
      { name: "question", label: "Your question", type: "textarea", required: true },
    ],
  } satisfies FormDefinition,
};

/* ---------------- School of Ministry ---------------- */
export const schoolOfMinistry = {
  title: "School of Ministry",
  intro:
    "School of Ministry equips you with tools to lead, serve and transform lives through Christ, whether you are new to ministry or sharpening your skills.",
  facts: [
    { icon: "users", label: "Who it's for", value: "Anyone new to ministry, or serving already and wanting to sharpen their skills" },
    { icon: "book", label: "Courses", value: "[TODO: School of Ministry course list]" },
    { icon: "calendar", label: "Dates", value: "[TODO: next School of Ministry dates]" },
    { icon: "mapPin", label: "Where", value: "[TODO: School of Ministry venue]" },
  ] satisfies Fact[],
  form: {
    id: "school-of-ministry",
    title: "Register your interest",
    submitLabel: "Register my interest",
    successMessage: "Thanks! We'll let you know when the next School of Ministry intake opens.",
    fields: [
      { name: "fullName", label: "Full name", type: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
      { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
      { name: "message", label: "What would you like to learn?", type: "textarea" },
    ],
  } satisfies FormDefinition,
};

/* ---------------- Logos Scholarship Fund (template) ---------------- */
export const logosScholarship = {
  title: "Logos Scholarship Fund",
  intro: "[TODO: one-sentence description of the Logos Scholarship Fund]",
  sections: [
    { title: "About the fund", text: "[TODO: what the Logos Scholarship Fund supports and its history]" },
    { title: "Who can apply", text: "[TODO: eligibility criteria]" },
    { title: "How to apply", text: "[TODO: application steps, documents and deadlines]" },
  ],
  facts: [
    { icon: "calendar", label: "Application window", value: "[TODO: Logos application dates]" },
    { icon: "mail", label: "Contact", value: "[TODO: Logos Scholarship contact]" },
  ] satisfies Fact[],
};
