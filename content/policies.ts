export type Policy = {
  slug: "privacy" | "safeguarding" | "terms";
  title: string;
  description: string;
  intro: string;
  sections: { title: string; body: string }[];
};

export const policies: Record<Policy["slug"], Policy> = {
  privacy: {
    slug: "privacy",
    title: "Privacy policy",
    description: "How Nairobi Chapel Ngong Road collects, uses and protects your personal information.",
    intro: "How we collect, use and protect your personal information.",
    sections: [
      { title: "What we collect", body: "[TODO: privacy policy: what personal data is collected through forms, giving and events]" },
      { title: "How we use it", body: "[TODO: privacy policy: purposes and lawful basis under Kenya's Data Protection Act, 2019]" },
      { title: "Your rights", body: "[TODO: privacy policy: access, correction and deletion requests, and the contact for data protection]" },
    ],
  },
  safeguarding: {
    slug: "safeguarding",
    title: "Safeguarding policy",
    description: "How Nairobi Chapel Ngong Road keeps children, young people and vulnerable adults safe.",
    intro: "How we keep children, young people and vulnerable adults safe.",
    sections: [
      {
        title: "Our commitment",
        body: "Every parent signs their child in and out of Quest, and every Quest volunteer is trained and screened. [TODO: full safeguarding policy text]",
      },
      { title: "Raising a concern", body: "[TODO: safeguarding lead name, contact and how to report a concern]" },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms of use",
    description: "Terms for using the Nairobi Chapel Ngong Road website.",
    intro: "Terms for using this website.",
    sections: [{ title: "Using this website", body: "[TODO: terms of use text]" }],
  },
};
