import type { Publication } from "@content/publications";

/** "2025-12" or "2025-12-04" → "December 2025" */
export function publishedLabel(pub: Publication): string {
  const [y, m, d] = pub.publishDate.split("-");
  if (!y || !m) return String(pub.year);
  return new Intl.DateTimeFormat("en-GB", { ...(d ? { day: "numeric" } : {}), month: "long", year: "numeric", timeZone: "Africa/Nairobi" }).format(
    new Date(`${y}-${m}-${d ?? "15"}T12:00:00+03:00`),
  );
}

/** "48 pages", or null while the page count is "TODO" */
export const pagesLabel = (pub: Publication) => (typeof pub.pageCount === "number" ? `${pub.pageCount} pages` : null);

/** "3.4 MB", or null while the file size is "TODO" */
export const sizeLabel = (pub: Publication) => (pub.fileSize && pub.fileSize !== "TODO" ? pub.fileSize : null);
