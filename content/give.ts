import type { FaqItem } from "./types";
import { site } from "./site";

/**
 * Reasons for giving on the M-Pesa prompt form. `ref` is the M-Pesa account
 * reference the finance team sees (Daraja allows at most 12 characters).
 */
export const GIVING_REASONS = [
  { id: "tithe", label: "Tithe", ref: "Tithe" },
  { id: "offering", label: "Offering", ref: "Offering" },
  { id: "logos", label: "LOGOS Scholarship Fund", ref: "LOGOS" },
  { id: "food-bank", label: "Food Bank", ref: "Food Bank" },
  { id: "ppi-bible", label: "PPI Bible Drive", ref: "PPI Bible" },
] as const;

export type ReasonId = (typeof GIVING_REASONS)[number]["id"];

/** KES limits for one M-Pesa prompt (Safaricom's per-transaction maximum is 250,000). */
export const MIN_AMOUNT = 10;
export const MAX_AMOUNT = 250_000;

/** Content for /give. Payment numbers come from content/site.ts. */
export const give = {
  meta: {
    title: "Give",
    description:
      "Give to Nairobi Chapel Ngong Road by M-Pesa (Paybill 508701), card or bank transfer. See where your giving goes.",
  },
  hero: {
    title: "Your giving makes a difference.",
    intro: "Every gift supports our mission of being disciples and making disciples of Jesus Christ.",
    scripture: { text: "A generous soul will prosper.", reference: "Proverbs 11:25" },
  },

  mpesa: {
    steps: [
      "Open M-Pesa and choose Lipa na M-Pesa.",
      "Choose Pay Bill.",
      `Enter business number ${site.giving.paybill}.`,
      "For the account, enter the purpose of your gift: Tithe, Offering, Building, PPI Bible or another purpose.",
      "Enter the amount.",
      "Enter your M-Pesa PIN and confirm.",
    ],
    stkNote: "[TODO: STK push (pay from this page) is planned; integration not built yet]",
  },

  card: {
    // As on the current site's online giving form (/donate)
    givingTypes: ["Tithe/Offering", "LOGOS Scholarship Fund", "Food Bank"],
    givingTypesNote: "",
    currencies: ["KES", "USD"] as const,
    presets: [500, 1000, 5000],
    providerNote: "[TODO: the current site's form (name, email, giving type, KES/USD, amount) runs on an unknown payment gateway; ask the church or the old site's builder, then connect the same or a replacement]",
    successMessage: "Thank you. We've received your details. [TODO: confirm what happens next once the payment provider is connected]",
  },

  funds: [
    {
      title: "PPI Bible Drive",
      summary:
        "Our goal is 700 Bibles for children in the surrounding community. KSh 1,000 buys one Bible. Give by M-Pesa with the account “PPI Bible”, or drop Bibles at the Quest Centre.",
      image: "give.ppi",
      cta: { label: "See the Bible Drive", href: "/events/ppi-bible-drive" },
    },
  ],
  fundsTodo: "[TODO: named funds and causes (e.g. building, missions) with one line each]",

  faq: [
    {
      question: "Can I give from outside Kenya?",
      answer: `Yes. Give by bank transfer to ${site.giving.bank.accountName}, account ${site.giving.bank.accountNumber}, ${site.giving.bank.bankName}, ${site.giving.bank.branch}, SWIFT code ${site.giving.bank.swift}. Online giving in KES and USD will also be available here once our payment provider is connected.`,
    },
    {
      question: "Will I get a receipt?",
      answer: "[TODO: how and when givers receive a receipt]",
    },
    {
      question: "What should I put as the M-Pesa account?",
      answer:
        "Put the purpose of your gift, for example Tithe, Offering, Building or PPI Bible. This tells us where your gift should go.",
    },
    {
      question: "Do visitors need to give?",
      answer: "No. Guests are never expected to give. We're simply glad you're with us.",
    },
  ] satisfies FaqItem[],
};
