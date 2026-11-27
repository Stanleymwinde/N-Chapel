import type { PostBlock } from "@content/posts";

/**
 * Turns the HTML from Craft's rich-text (CKEditor) field into the site's post blocks.
 *
 * In Craft's editor:
 *  - Paragraph          → paragraph (a paragraph that is entirely bold → the emphasised line)
 *  - Heading 2 / 3      → heading
 *  - Bulleted / numbered list → list
 *  - Quote              → pull quote; a last line starting with "—" or "–" becomes its reference
 *  - Heading 4 “Prayer” (or any Heading 4) followed by paragraphs → the closing prayer
 */
const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", apos: "'", nbsp: " ", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", ndash: "–", mdash: "—", hellip: "…" };

export function textOf(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (m, e: string) =>
      e.startsWith("#x") ? String.fromCodePoint(parseInt(e.slice(2), 16)) : e.startsWith("#") && e !== "#39" ? String.fromCodePoint(Number(e.slice(1))) : ENTITIES[e.toLowerCase()] ?? m)
    .replace(/[ \t]+/g, " ")
    .trim();
}

export function htmlToBlocks(html: string | null | undefined): PostBlock[] {
  if (!html) return [];
  const blocks: PostBlock[] = [];
  const re = /<(p|h[1-6]|ul|ol|blockquote|figure)[^>]*>([\s\S]*?)<\/\1>/gi;
  let prayerTitle: string | null = null;
  for (const m of html.matchAll(re)) {
    const tag = m[1].toLowerCase();
    const inner = m[2];
    if (tag === "h4") {
      prayerTitle = textOf(inner) || "Prayer";
      continue;
    }
    if (prayerTitle !== null && tag === "p") {
      const last = blocks[blocks.length - 1];
      const text = textOf(inner);
      if (last?.type === "prayer" && last.title === prayerTitle) last.text += `\n\n${text}`;
      else blocks.push({ type: "prayer", title: prayerTitle === "Prayer" ? undefined : prayerTitle, text });
      continue;
    }
    prayerTitle = null;
    if (tag === "p") {
      const text = textOf(inner);
      if (!text) continue;
      const emphasis = /^\s*<(strong|b)>[\s\S]*<\/\1>\s*$/i.test(inner);
      blocks.push(emphasis ? { type: "paragraph", text, emphasis: true } : { type: "paragraph", text });
    } else if (/^h[1-3]$/.test(tag) || tag === "h5" || tag === "h6") {
      blocks.push({ type: "heading", text: textOf(inner) });
    } else if (tag === "ul" || tag === "ol") {
      const items = [...inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((li) => textOf(li[1])).filter(Boolean);
      blocks.push(tag === "ol" ? { type: "list", items, ordered: true } : { type: "list", items });
    } else if (tag === "blockquote") {
      const lines = [...inner.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((p) => textOf(p[1])).filter(Boolean);
      const parts = lines.length ? lines : [textOf(inner)];
      const last = parts[parts.length - 1];
      if (parts.length > 1 && /^[—–-]\s*/.test(last)) {
        blocks.push({ type: "quote", text: parts.slice(0, -1).join("\n"), cite: last.replace(/^[—–-]\s*/, "") });
      } else {
        blocks.push({ type: "quote", text: parts.join("\n") });
      }
    }
  }
  return blocks;
}

/** Plain-text field with blank lines between paragraphs → paragraphs. */
export const paragraphs = (s: string | null | undefined): string[] =>
  (s ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

/** 1234567 bytes → "1.2 MB" */
export function formatBytes(bytes: number | null | undefined): string | undefined {
  if (!bytes) return undefined;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** YouTube URL or bare ID → ID */
export function youtubeIdOf(v: string | null | undefined): string | undefined {
  if (!v) return undefined;
  const m = v.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([\w-]{11})/);
  return m ? m[1] : /^[\w-]{11}$/.test(v.trim()) ? v.trim() : undefined;
}
