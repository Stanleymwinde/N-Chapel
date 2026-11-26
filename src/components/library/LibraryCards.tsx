import NextLink from "next/link";
import { Box, Stack, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import type { Resource, Season, Series } from "@content/library/types";
import { AUDIENCE_LABELS, MONTHS } from "@content/library/types";
import { monthLabel, weekLabel } from "@content/library/resources";
import { getSeries } from "@content/library/series";
import { sectionOf } from "@content/library/sections";
import { resourcePhoto } from "@content/library/photos";
import { Img } from "../Img";

/**
 * Library cards. One family: a cover on top (a real image with no overlay, or
 * a typographic tile), then a small type label, the title, when, what you get,
 * and an action pinned to the bottom. The whole card is one link.
 * Used by server and client components.
 */

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const has = (v?: string) => Boolean(v && v !== "TODO");

/* ---------------- Covers ---------------- */

/** New Testament books get the dark tile; other books the purple; topical series (no book) the gold */
const NT = new Set(["Matthew", "Mark", "Luke", "John", "Acts", "Romans", "Galatians", "Ephesians", "Philippians", "Colossians", "Hebrews", "James", "Revelation"]);

export type Tone = "ot" | "nt" | "topical";
export const toneOf = (s?: Series): Tone => (!s?.book ? "topical" : NT.has(s.book) ? "nt" : "ot");

/** All pairs pass WCAG AA: white on purple.700 (9.4:1), white on night.900 (17:1), ink.900 on gold.400 (11:1) */
export const TONES: Record<Tone, { bg: string; fg: string; sub: string }> = {
  ot: { bg: "brand.solid", fg: "white", sub: "purple.100" },
  nt: { bg: "night.900", fg: "white", sub: "night.300" },
  topical: { bg: "accent.highlight", fg: "ink.900", sub: "ink.700" },
};

/** "When MEANINGLESS is MEANINGFUL: A Study of Ecclesiastes" → { big: "When MEANINGLESS is MEANINGFUL", sub: "Ecclesiastes" } */
export function seriesCoverText(s: Series): { big: string; sub?: string } {
  const [head, ...rest] = s.title.split(": ");
  const tail = rest.join(": ");
  if (s.book && s.book !== head) return { big: head, sub: s.book };
  return { big: head, sub: tail || undefined };
}

const cover = { position: "relative", aspectRatio: "4 / 3", overflow: "hidden" } as const;

/** A solid tile with the name set large (the "book cover") */
export function BookTile({ big, sub, tone, size = "md" }: { big: string; sub?: string; tone: Tone; size?: "md" | "lg" }) {
  const t = TONES[tone];
  const long = big.length > 14;
  return (
    <Box {...cover} aria-hidden="true" bg={t.bg} color={t.fg} display="flex" flexDirection="column" justifyContent="flex-end" p={size === "lg" ? { base: "6", md: "8" } : "5"}>
      <Text
        className="lib-zoom"
        fontFamily="heading"
        fontWeight="700"
        letterSpacing="-0.02em"
        lineHeight="1"
        lineClamp={3}
        textWrap="balance"
        fontSize={size === "lg" ? (long ? "clamp(2rem, 1.4rem + 2vw, 3rem)" : "clamp(2.5rem, 1.6rem + 3vw, 4rem)") : long ? "1.625rem" : "2.25rem"}
      >
        {big}
      </Text>
      {sub && (
        <Text mt="2" fontWeight="600" fontSize={size === "lg" ? "1.0625rem" : "0.9375rem"} color={t.sub} lineClamp={1}>
          {sub}
        </Text>
      )}
    </Box>
  );
}

/** A soft tile with one large line ("Nov 2026", "Week 3") */
function WordTile({ big, bg, fg, playful }: { big: string; bg: string; fg: string; playful?: boolean }) {
  return (
    <Box {...cover} aria-hidden="true" bg={bg} color={fg} display="flex" alignItems="flex-end" p="5">
      <Text className="lib-zoom" fontFamily="heading" fontWeight="700" letterSpacing="-0.02em" lineHeight="0.95" fontSize={big.length > 8 ? "1.75rem" : playful ? "3rem" : "2.5rem"} transform={playful ? "rotate(-3deg)" : undefined} transformOrigin="left bottom">
        {big}
      </Text>
    </Box>
  );
}

/** A real cover image, shown as it is (no overlay) */
function ImageCover({ slot, alt }: { slot: string; alt?: boolean }) {
  return (
    <Box {...cover} bg="bg.muted">
      <Box className="lib-zoom" position="absolute" inset="0">
        <Img slot={slot} decorative={!alt} sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" />
      </Box>
    </Box>
  );
}

const shortMonth = (m?: number, y?: number) => (m && y ? `${MONTHS[m - 1].slice(0, 3)} ${y}` : y ? String(y) : "");

/** The cover for a single resource */
export function ResourceCover({ r }: { r: Resource }) {
  const img = r.coverImage ?? r.craftPhoto;
  if (has(img)) return <ImageCover slot={img!} />;
  switch (r.type) {
    case "bible-study": {
      const s = r.seriesSlug ? getSeries(r.seriesSlug) : undefined;
      return <BookTile big={weekLabel(r) || "Study"} sub={s ? seriesCoverText(s).big : undefined} tone={toneOf(s)} />;
    }
    case "prayer-fasting":
      return <WordTile big={shortMonth(r.month, r.year) || "Guide"} bg="accent.subtle" fg="ink.900" />;
    case "kids-craft":
    case "kids-devotional":
      return <WordTile big={r.type === "kids-devotional" ? "Devotional" : weekLabel(r) || "Craft"} bg="accent.highlight" fg="ink.900" playful />;
    default:
      return <WordTile big={shortMonth(r.month, r.year) || "Devotional"} bg="bg.tint" fg="brand.fg" />;
  }
}

/* ---------------- Card shell and body ---------------- */

function CardShell({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Box
      asChild
      display="flex"
      flexDirection="column"
      h="100%"
      borderRadius="lg"
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

/** Small pill (the site's tag style) */
export function Chip({ children, brand }: { children: React.ReactNode; brand?: boolean }) {
  return (
    <Text as="span" display="inline-block" px="2" py="0.5" borderRadius="full" bg={brand ? "brand.subtle" : "bg.muted"} color={brand ? "brand.fg" : "fg"} fontSize="0.75rem" fontWeight="700">
      {children}
    </Text>
  );
}

function Body({ type, title, when, meta, tags, action }: { type: string; title: string; when?: string; meta: string; tags?: string[]; action: string }) {
  return (
    <Stack gap="1.5" p="5" flex="1">
      <Box mb="1">
        <Chip brand>{type}</Chip>
      </Box>
      <Text fontFamily="heading" fontWeight="600" fontSize="1.0625rem" lineHeight="1.3" lineClamp={2}>
        {title}
      </Text>
      {when && (
        <Text fontSize="0.875rem" color="fg.muted">
          {when}
        </Text>
      )}
      <Text fontSize="0.875rem" fontWeight="600" color="fg.muted">
        {meta}
      </Text>
      {tags && tags.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap="1.5" pt="1">
          {tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </Box>
      )}
      <Box className="lib-cta" mt="auto" pt="3" display="inline-flex" alignItems="center" gap="1.5" fontWeight="600" color="brand.fg" aria-hidden="true">
        {action}
        <ArrowRight size={16} />
      </Box>
    </Stack>
  );
}

const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"}`;
const unitOf = (slug: string) => (slug === "genesis" ? "part" : "week");
const pdfMeta = (r: Resource) => (r.fileSize ? `PDF · ${r.fileSize}` : "PDF");

/* ---------------- Cards ---------------- */

export function SeriesCard({ s, weekCount }: { s: Series; weekCount: number }) {
  const c = seriesCoverText(s);
  const count = plural(weekCount, unitOf(s.slug));
  const when = s.when ?? (s.year ? String(s.year) : undefined);
  return (
    <CardShell href={`/resources/series/${s.slug}`} label={`View series: ${s.title}, ${count}`}>
      <BookTile big={c.big} sub={c.sub} tone={toneOf(s)} />
      <Body type="Bible study" title={s.title} when={when} meta={`${count} · PDF`} action="View series" />
    </CardShell>
  );
}

export function SeasonCard({ season, audiences, guideCount }: { season: Season; audiences: Resource["audience"]; guideCount: number; index?: number }) {
  const when = `${MONTHS[season.month - 1]} ${season.year}`;
  return (
    <CardShell href={`/resources/season/${season.slug}`} label={`View guides: ${season.title}, ${when}, ${plural(guideCount, "guide")}`}>
      <WordTile big={shortMonth(season.month, season.year)} bg="accent.subtle" fg="ink.900" />
      <Body type="Prayer & fasting" title={season.title} when={when} meta={`${plural(guideCount, "guide")} · PDF`} tags={audiences.map((a) => AUDIENCE_LABELS[a])} action="View guides" />
    </CardShell>
  );
}

export function ResourceCard({ r }: { r: Resource; seriesTitle?: string }) {
  const posted = r.publishDate ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${r.publishDate}T12:00:00+03:00`)) : "";
  const when = [monthLabel(r), posted ? `posted ${posted}` : ""].filter(Boolean).join(" · ");
  // Audience tags only where audiences vary (prayer & fasting)
  const tags = r.type === "prayer-fasting" ? r.audience.map((a) => AUDIENCE_LABELS[a]) : undefined;
  return (
    <CardShell href={`/resources/${r.slug}`} label={`Read: ${r.title}`}>
      <ResourceCover r={r} />
      <Body type={sectionOf(r.type).label} title={r.title} when={when || undefined} meta={pdfMeta(r)} tags={tags} action="Read" />
    </CardShell>
  );
}

/** Compact Quest Kids card for the month groups: "Week 1", "Review lesson", "Devotional" */
export function QuestWeekCard({ r }: { r: Resource }) {
  const review = /review lesson/i.test(r.title);
  const label = r.type === "kids-devotional" ? "Devotional" : review ? "Review lesson" : weekLabel(r) || "Craft";
  return (
    <CardShell href={`/resources/${r.slug}`} label={`Read: ${r.title}`}>
      {has(r.coverImage ?? r.craftPhoto) ? <ImageCover slot={(r.coverImage ?? r.craftPhoto)!} /> : <WordTile big={review ? "Review" : r.type === "kids-devotional" ? "Devotional" : String(r.week ?? "")} bg="accent.highlight" fg="ink.900" playful />}
      <Stack gap="1" p="4" flex="1">
        <Text fontFamily="heading" fontWeight="600" fontSize="1rem" lineHeight="1.25">
          {label}
        </Text>
        <Text fontSize="0.8125rem" fontWeight="600" color="fg.muted">
          {pdfMeta(r)}
        </Text>
        <Box className="lib-cta" mt="auto" pt="2" display="inline-flex" alignItems="center" gap="1.5" fontSize="0.9375rem" fontWeight="600" color="brand.fg" aria-hidden="true">
          Read
          <ArrowRight size={16} />
        </Box>
      </Stack>
    </CardShell>
  );
}

/** The stand-in photo for a resource's own page header (a real cover wins). */
export const photoOf = (r: Resource) => (has(r.coverImage) ? r.coverImage! : resourcePhoto(r, r.seriesSlug ? (getSeries(r.seriesSlug)?.sortOrder ?? 0) : 0));
