import Image from "next/image";
import { getMedia } from "@content/media";

type Props = {
  /** slot key from content/media-credits.json, e.g. "quest.hero" */
  slot: string;
  /** responsive sizes hint, e.g. "(min-width: 768px) 33vw, 100vw" */
  sizes?: string;
  priority?: boolean;
  /** decorative images get alt="" */
  decorative?: boolean;
  /** fill the parent (parent must be position: relative) */
  fill?: boolean;
  className?: string;
};

/**
 * next/image wrapper fed by the media registry. Keeps AVIF/WebP optimisation
 * for real photos; SVG placeholders are served as-is.
 */
export function Img({ slot, sizes = "100vw", priority, decorative, fill = true, className }: Props) {
  const m = getMedia(slot);
  const alt = decorative ? "" : m.altText;
  const unoptimized = m.file.endsWith(".svg");
  if (fill) {
    return (
      <Image
        src={m.file}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        className={className}
        style={{ objectFit: "cover", objectPosition: m.focus ?? (m.height > m.width ? "50% 22%" : "50% 50%") }}
      />
    );
  }
  return (
    <Image
      src={m.file}
      alt={alt}
      width={m.width}
      height={m.height}
      sizes={sizes}
      priority={priority}
      unoptimized={unoptimized}
      className={className}
      style={{ width: "100%", height: "auto" }}
    />
  );
}
