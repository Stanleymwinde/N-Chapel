import credits from "./media-credits.json";

/**
 * Media registry. Pages refer to images by slot key (e.g. "quest.hero");
 * the file, size and alt text live in media-credits.json so photos can be
 * swapped without touching page code. Run `pnpm placeholders` after adding
 * a slot.
 */
export type MediaItem = {
  key: string;
  file: string;
  width: number;
  height: number;
  altText: string;
  isPlaceholder: boolean;
  sourceSite: string | null;
  sourceUrl: string | null;
  author: string | null;
  licence: string | null;
  searchQuery?: string;
  /** CSS object-position for crops, e.g. "50% 20%" (portraits default to near the top) */
  focus?: string;
  usedOn: string[];
};

const items = credits.items as MediaItem[];
const byKey = new Map(items.map((m) => [m.key, m]));

export function getMedia(key: string): MediaItem {
  const item = byKey.get(key);
  if (!item) {
    throw new Error(`Unknown media slot "${key}". Add it in scripts/generate-placeholders.mjs and run pnpm placeholders.`);
  }
  return item;
}

export const allMedia = items;
