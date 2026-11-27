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

/**
 * Images uploaded in Craft don't have a slot in media-credits.json. The CMS data layer
 * turns each one into a self-describing key ("craft:" + encoded url/size/alt), which
 * works anywhere a slot key does, including in client components.
 */
const CRAFT_PREFIX = "craft:";

export type CraftImage = { url: string; width?: number | null; height?: number | null; alt?: string | null; focus?: string | null };

export function craftMediaKey(img: CraftImage): string {
  const payload = JSON.stringify([img.url, img.width ?? 1600, img.height ?? 1067, img.alt ?? "", img.focus ?? ""]);
  return CRAFT_PREFIX + encodeURIComponent(payload);
}

function fromCraftKey(key: string): MediaItem {
  const [file, width, height, altText, focus] = JSON.parse(decodeURIComponent(key.slice(CRAFT_PREFIX.length))) as [string, number, number, string, string];
  return {
    key, file, width, height, altText, focus: focus || undefined,
    isPlaceholder: false, sourceSite: null, sourceUrl: null, author: null, licence: null, usedOn: [],
  };
}

export function getMedia(key: string): MediaItem {
  if (key.startsWith(CRAFT_PREFIX)) return fromCraftKey(key);
  const item = byKey.get(key);
  if (!item) {
    throw new Error(`Unknown media slot "${key}". Add it in scripts/generate-placeholders.mjs and run pnpm placeholders.`);
  }
  return item;
}

export const allMedia = items;
