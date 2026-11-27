import type { FormDefinition } from "./types";

export const contact = {
  title: "Contact us",
  intro: "Call, WhatsApp, email or drop by. We’d love to hear from you.",
  waysTitle: "Other ways to reach us",
  waysIntro: "Prefer to talk, message or visit? Pick whatever works for you.",
  // Address line as given in the Figma design (content/site.ts still marks the landmark as to be confirmed)
  addressLine: "Ngong Road, Nairobi, near Raila Odinga Stadium, off the Jamhuri Road area.",
  responsePromise: "[TODO: confirm response time, e.g. we reply within 2 working days]",
};

export const contactForm: FormDefinition = {
  id: "contact",
  title: "Send us a message",
  fields: [
    { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
    { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
    {
      name: "subject",
      label: "What's it about?",
      type: "select",
      required: true,
      options: ["General", "Prayer", "Pastoral care", "Events", "Giving", "Media"],
    },
    { name: "message", label: "Message", type: "textarea", required: true },
  ],
  submitLabel: "Send message",
  successMessage: "Thank you! Your message has reached us and someone will reply soon.",
};
