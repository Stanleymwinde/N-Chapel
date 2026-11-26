import type { BannsEntry } from "./types";

export const bannsPage = {
  title: "Marriage banns",
  intro: "Couples planning to marry at Nairobi Chapel Ngong Road.",
  explanation: [
    "God established marriage from the beginning as a holy, God-ordained vocation, and Nairobi Chapel celebrates and honours it.",
    "If you have any legal objection to any of the couples below getting married, please inform the church in writing at least 14 days before the wedding.",
  ],
  emptyState: "No marriage banns are currently being published.",
};

/**
 * Banns entries. Each entry disappears automatically after its wedding date
 * (checked at build time and again in the browser). Add couples here only
 * with their consent, newest wedding last. Each entry is partnerOne,
 * partnerTwo and weddingDate; it hides the day after the wedding.
 * `venue` is optional: leave it out when the church hasn't given one.
 * `photo` is optional: put the couple's photo (shared with their consent) in
 * public/media/banns/ and set e.g. photo: "/media/banns/dorothy-kelvin.jpg".
 * Without a photo the card shows the couple's initials.
 */
export const banns: BannsEntry[] = [
  { id: "dorothy-kelvin-2026-04-04", partnerOne: "Dorothy", partnerTwo: "Kelvin", weddingDate: "2026-04-04" },
  { id: "maureen-dylan-2026-04-24", partnerOne: "Maureen Wanjiku", partnerTwo: "Dylan Keribo", weddingDate: "2026-04-24" },
  { id: "brenda-sidney-2026-04-25", partnerOne: "Brenda Onyango", partnerTwo: "Sidney Ochieng", weddingDate: "2026-04-25" },

  /*
   * SAMPLES: fictional couples to preview the design. They show only in
   * development (pnpm dev) and are hidden in production builds, so they can
   * never be published as real banns. Delete them once real banns exist.
   */
  { id: "sample-1", partnerOne: "Amani Wanjiru", partnerTwo: "Baraka Otieno", weddingDate: "2027-01-16", photo: "/media/banns/couple-placeholder.svg", sample: true },
  { id: "sample-2", partnerOne: "Zawadi Achieng", partnerTwo: "Imani Kiprop", weddingDate: "2027-02-13", photo: "/media/banns/couple-placeholder.svg", sample: true },
  { id: "sample-3", partnerOne: "Neema Mwende", partnerTwo: "Jabali Mutua", weddingDate: "2027-03-20", photo: "/media/banns/couple-placeholder.svg", sample: true },
];
