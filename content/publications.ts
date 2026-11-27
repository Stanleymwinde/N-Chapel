/**
 * Publications: annual reports, strategy, leadership and ministry documents. Add one by
 * adding an entry to `publications`; the Resources menu and /publications
 * update automatically. See content/README.md.
 */

export type PublicationCategory = "Annual Report" | "Strategy" | "Leadership" | "Ministry";

export type Publication = {
  title: string;
  slug: string;
  category: PublicationCategory;
  year: number;
  /** ISO date ("2026-01-25"), or "YYYY-MM" when only the month is known */
  publishDate: string;
  description: string;
  /** media slot key, or "TODO" until a cover image exists */
  coverImage: string;
  /** stand-in photo (media slot) drawn behind the title until a real cover exists */
  photo?: string;
  /** number, or "TODO" */
  pageCount: number | "TODO";
  /** e.g. "3.4 MB", or "TODO" */
  fileSize: string;
  /** "TODO" until the file is uploaded */
  pdfUrl: string;
};

export const publications: Publication[] = [
  {
    title: "Our Pastoral Team",
    slug: "our-pastoral-team",
    photo: "team.hero",
    category: "Leadership",
    year: 2026,
    publishDate: "2026-01-25",
    description:
      "The 2026 staff bulletin introducing the pastors, directors and administrators who lead each ministry at Nairobi Chapel Ngong Road, with their email addresses.",
    // Source file: NC Staff Bulletin, Jan 2026
    coverImage: "TODO",
    pageCount: 4,
    fileSize: "535 KB",
    pdfUrl: "/pdfs/our-pastoral-team-2026.pdf",
  },
  {
    title: "Serving Opportunities at Nairobi Chapel – Ngong Road",
    slug: "serving-opportunities",
    photo: "serve.hero",
    category: "Ministry",
    year: 2026,
    publishDate: "2026-02-20",
    description:
      "Every serving team at the church, from the crèche and Quest children’s ministry to missions, the LOGOS Scholarship Fund and communications. To join a team, send a text or WhatsApp message with your name and the team’s code to 0701 777 888.",
    // Source file: Volunteers Serving Opportunities, Feb 2026
    coverImage: "TODO",
    pageCount: 4,
    fileSize: "367 KB",
    pdfUrl: "/pdfs/serving-opportunities-feb-2026.pdf",
  },
  {
    title: "Our Compass – Strategic Direction",
    slug: "our-compass",
    photo: "pub.compass",
    category: "Strategy",
    year: 2025,
    publishDate: "2025-10-31",
    description: "The church’s strategic plan: where we are heading and the priorities that shape it.",
    // Source file: Ngong Road COMPASS
    coverImage: "TODO",
    pageCount: 48,
    fileSize: "TODO",
    pdfUrl: "TODO",
  },
  {
    title: "Enzi Disability Ministry",
    slug: "enzi-disability-ministry",
    photo: "enzi.hero",
    category: "Ministry",
    year: 2025,
    publishDate: "2025-05-26",
    description: "A flyer introducing Enzi, the church’s disability ministry.",
    // Source file: Enzi flyer (nairobichapelngongroad.org asset 24be54ca…)
    coverImage: "TODO",
    pageCount: 2,
    fileSize: "189 KB",
    pdfUrl: "/pdfs/enzi-disability-ministry-may-2025.pdf",
  },
  {
    title: "2025 Nairobi Chapel AGM Booklet",
    slug: "agm-booklet-2025",
    photo: "pub.agm",
    category: "Annual Report",
    year: 2025,
    publishDate: "2025-12-04",
    description: "The booklet presented to members at the 2025 Annual General Meeting, with the Annual Report for 2024.",
    // Source file: Annual Report 2024 (public/reports/annual-report-2024.pdf)
    coverImage: "TODO",
    pageCount: 20,
    fileSize: "3.4 MB",
    pdfUrl: "/reports/annual-report-2024.pdf",
  },
  {
    title: "Nairobi Chapel Office Bearers",
    slug: "office-bearers",
    photo: "about.hero",
    category: "Leadership",
    year: 2025,
    publishDate: "2025-12-04",
    description: "The presentation of the church’s elders and office bearers.",
    // Source file: Elders presentation
    coverImage: "TODO",
    pageCount: 11,
    fileSize: "TODO",
    pdfUrl: "TODO",
  },
];

export const getPublicationBySlug = (slug: string) => publications.find((p) => p.slug === slug);
