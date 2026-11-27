import NextLink from "next/link";
import { Box, Stack, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import type { Resource, ResourceType, Season, Series } from "@content/library/types";
import { MONTHS } from "@content/library/types";
import { getSeries } from "@content/library/series";
import { sortedSeasons } from "@content/library/seasons";
import { resourcePhoto, seasonPhoto, seriesPhoto } from "@content/library/photos";
import { Img } from "../Img";

/**
 * Library cards (Figma "Resource" card): a photo cover under a soft dark wash,
 * a thin colour accent for the section (purple for Bible studies and family
 * worship, gold for Quest Kids, none for prayer & fasting), then the title and
 * a "Read" link pinned to the bottom. The whole card is one link.
 * Used by server and client components.
 */

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const has = (v?: string) => Boolean(v && v !== "TODO");

/** Same wash as the Figma "Overlay (locked)" layer */
export const COVER_WASH = "linear-gradient(to bottom, rgba(20,15,26,0.55) 0%, rgba(20,15,26,0.15) 40%, rgba(20,15,26,0.75) 100%)";

const ACCENT: Record<ResourceType, string | undefined> = {
  "bible-study": "brand.solid",
  "family-worship": "brand.solid",
  "kids-craft": "accent.highlight",
  "kids-devotional": "accent.highlight",
  "prayer-fasting": undefined,
};

/** The stand-in photo for a resource (a real cover wins). */
export const photoOf = (r: Resource) => (has(r.coverImage) ? r.coverImage! : resourcePhoto(r, r.seriesSlug ? (getSeries(r.seriesSlug)?.sortOrder ?? 0) : 0));

/** A photo under the dark wash, 278 × 142 like the Figma card */
export function PhotoCover({ slot, ratio = "278 / 142" }: { slot: string; ratio?: string }) {
  return (
    <Box position="relative" aspectRatio={ratio} overflow="hidden" bg="night.700" flexShrink={0}>
      <Box className="lib-zoom" position="absolute" inset="0">
        <Img slot={slot} decorative sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
      </Box>
      <Box position="absolute" inset="0" bgImage={COVER_WASH} aria-hidden="true" />
    </Box>
  );
}

function CardShell({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Box
      asChild
      display="flex"
      flexDirection="column"
      h="100%"
      borderRadius="8px"
      overflow="hidden"
      borderWidth="1px"
      borderColor="border"
      bg="bg.canvas"
      color="fg"
      textDecoration="none"
      transition={`border-color 150ms ease, transform 200ms ${EASE}, box-shadow 200ms ${EASE}`}
      _active={{ transform: "scale(0.985)" }}
      css={{
        "& .lib-zoom": { transition: `transform 300ms ${EASE}` },
        "& .lib-cta svg": { transition: `transform 200ms ${EASE}` },
        "@media (hover: hover) and (pointer: fine)": {
          "&:hover": { borderColor: "var(--chakra-colors-border-strong)", transform: "translateY(-2px)", boxShadow: "0 14px 30px -18px rgba(20,16,30,0.45)" },
          "&:hover .lib-zoom": { transform: "scale(1.03)" },
          "&:hover .lib-cta svg": { transform: "translateX(3px)" },
        },
        "@media (prefers-reduced-motion: reduce)": { "&:hover, &:active, &:hover .lib-zoom, &:hover .lib-cta svg": { transform: "none" } },
        "&:focus-visible": { outline: "3px solid", outlineColor: "var(--chakra-colors-brand-solid)", outlineOffset: "3px" },
      }}
    >
      <NextLink href={href} aria-label={label}>
        {children}
      </NextLink>
    </Box>
  );
}

/** "Read →" (Figma "Read link") */
export function ReadLink({ children = "Read" }: { children?: React.ReactNode }) {
  return (
    <Box className="lib-cta" display="inline-flex" alignItems="center" gap="6px" fontSize="0.875rem" fontWeight="600" color="brand.fg" aria-hidden="true">
      {children}
      <ArrowRight size={15} strokeWidth={2.5} />
    </Box>
  );
}

function Card({ href, label, photo, accent, title }: { href: string; label: string; photo: string; accent?: string; title: string }) {
  return (
    <CardShell href={href} label={label}>
      <PhotoCover slot={photo} />
      {accent && <Box h="3px" bg={accent} flexShrink={0} aria-hidden="true" />}
      <Stack flex="1" minH="106px" gap="4" justifyContent="space-between" pt="4" px="4" pb="18px">
        <Text fontFamily="heading" fontWeight="600" fontSize="0.875rem" lineHeight="1.4" lineClamp={3}>
          {title}
        </Text>
        <ReadLink />
      </Stack>
    </CardShell>
  );
}

/* ---------------- Cards ---------------- */

export function SeriesCard({ s }: { s: Series; weekCount?: number }) {
  return <Card href={`/resources/series/${s.slug}`} label={`Read: ${s.title}`} photo={seriesPhoto(s)} accent={ACCENT[s.type]} title={s.title} />;
}

export function SeasonCard({ season }: { season: Season; audiences?: Resource["audience"]; guideCount?: number }) {
  const index = sortedSeasons().findIndex((x) => x.slug === season.slug);
  return (
    <Card
      href={`/resources/season/${season.slug}`}
      label={`Read: ${season.title}, ${MONTHS[season.month - 1]} ${season.year}`}
      photo={seasonPhoto(season, index)}
      accent={ACCENT["prayer-fasting"]}
      title={season.title}
    />
  );
}

export function ResourceCard({ r }: { r: Resource; seriesTitle?: string }) {
  return <Card href={`/resources/${r.slug}`} label={`Read: ${r.title}`} photo={photoOf(r)} accent={ACCENT[r.type]} title={r.title} />;
}
