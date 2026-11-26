import type { Metadata } from "next";
import { site } from "@content/site";
import { getMedia } from "@content/media";

/**
 * Per-page metadata: unique title + description, canonical URL and Open
 * Graph. The default OG image comes from src/app/opengraph-image.tsx.
 *
 * `image` (a media slot key such as "blog.hero", or a /public path) gives a
 * detail page its own preview picture, used by WhatsApp, Facebook and X.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  let images: { url: string; width?: number; height?: number; alt?: string }[] | undefined;
  if (image) {
    if (image.startsWith("/")) {
      images = [{ url: image }];
    } else {
      try {
        const m = getMedia(image);
        images = [{ url: m.file, width: m.width, height: m.height, alt: m.altText }];
      } catch {
        images = undefined;
      }
    }
  }
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: "en_KE",
      type,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
}
