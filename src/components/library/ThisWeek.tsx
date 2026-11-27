import NextLink from "next/link";
import { Box, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import type { Resource } from "@content/library/types";
import { AUDIENCE_LABELS } from "@content/library/types";
import { monthLabel, weekLabel } from "@content/library/resources";
import { seriesPhoto } from "@content/library/photos";
import type { ThisWeekPicks } from "@content/library/sections";
import { LinkButton } from "../Button";
import { Img } from "../Img";
import { ChLi, ChUl } from "../primitives";
import { photoOf } from "./LibraryCards";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
/** Figma "Feature / Current series" overlay */
const FEATURE_WASH = "linear-gradient(to bottom, rgba(20,15,26,0.35) 0%, rgba(20,15,26,0.55) 45%, rgba(20,15,26,0.9) 100%)";

const tiny = { fontSize: "10px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: "normal" } as const;

/** A side card (Figma "Card"): a 120px photo with a white tag, then the title, when and who, and a quiet link. One link. */
function SideCard({ r, tag, cta }: { r: Resource; tag: string; cta: string }) {
  return (
    <Box
      asChild
      display="flex"
      flexDirection="column"
      borderRadius="10px"
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
        "& .side-cta svg": { transition: `transform 200ms ${EASE}` },
        "@media (hover: hover) and (pointer: fine)": {
          "&:hover": { borderColor: "var(--chakra-colors-border-strong)", transform: "translateY(-2px)", boxShadow: "0 14px 30px -18px rgba(20,16,30,0.45)" },
          "&:hover .lib-zoom": { transform: "scale(1.03)" },
          "&:hover .side-cta svg": { transform: "translateX(3px)" },
        },
        "@media (prefers-reduced-motion: reduce)": { "&:hover, &:active, &:hover .lib-zoom, &:hover .side-cta svg": { transform: "none" } },
        "&:focus-visible": { outline: "3px solid", outlineColor: "var(--chakra-colors-brand-solid)", outlineOffset: "3px" },
      }}
    >
      <NextLink href={`/resources/${r.slug}`} aria-label={`${cta}: ${r.title}`}>
        <Box position="relative" h="120px" overflow="hidden" bg="bg.muted" flexShrink={0}>
          <Box className="lib-zoom" position="absolute" inset="0">
            <Img slot={photoOf(r)} decorative sizes="(min-width: 1024px) 432px, 100vw" />
          </Box>
          <Text as="span" position="absolute" top="12px" left="12px" px="9px" py="4px" borderRadius="full" bg="white" color="brand.fg" {...tiny} fontSize="9px">
            {tag}
          </Text>
        </Box>
        <Stack gap="6px" pt="18px" px="5" pb="5">
          <Text fontFamily="heading" fontWeight="600" fontSize="1rem" lineHeight="1.3" lineClamp={2}>
            {r.title}
          </Text>
          <Text fontSize="0.75rem" color="fg.muted">
            {[monthLabel(r), r.audience.map((a) => AUDIENCE_LABELS[a]).join(", ")].filter(Boolean).join(" · ")}
          </Text>
          <HStack className="side-cta" gap="6px" pt="6px" fontSize="0.8125rem" fontWeight="500" color="brand.fg" aria-hidden="true">
            <span>{cta}</span>
            <ArrowRight size={13} strokeWidth={2.5} />
          </HStack>
        </Stack>
      </NextLink>
    </Box>
  );
}

/**
 * "This week" (see thisWeekPicks in content/library/sections.ts): the featured
 * Bible-study series over a photo with every week one tap away, and the newest
 * prayer & fasting guide and Quest craft beside it.
 */
export function ThisWeek({ featured, guide, craft }: ThisWeekPicks) {
  const s = featured?.series;
  const unit = s?.slug === "genesis" ? "part" : "week";
  const meta =
    featured && s
      ? [s.book, `${featured.weeks.length} ${unit}${featured.weeks.length === 1 ? "" : "s"}`, s.when, s.audience.map((a) => AUDIENCE_LABELS[a]).join(", ")].filter(Boolean).join(" · ")
      : "";

  return (
    <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 746fr) minmax(0, 432fr)" }} gap="22px" alignItems="start">
      {featured && s && (
        <Box position="relative" borderRadius="12px" overflow="hidden" bg="night.700" color="white" minH={{ base: "440px", md: "494px" }} display="flex" flexDirection="column" justifyContent="flex-end">
          <Box position="absolute" inset="0">
            <Img slot={seriesPhoto(s)} decorative sizes="(min-width: 1024px) 746px, 100vw" />
          </Box>
          <Box position="absolute" inset="0" bgImage={FEATURE_WASH} aria-hidden="true" />

          <Stack position="relative" gap="14px" p={{ base: "6", md: "9" }} alignItems="flex-start">
            <HStack gap="10px" flexWrap="wrap">
              {featured.isCurrent && (
                <Text as="span" px="10px" py="4px" borderRadius="full" bg="accent.highlight" color="ink.900" {...tiny}>
                  Current series
                </Text>
              )}
              <Text as="span" color="white" {...tiny}>
                Bible study
              </Text>
            </HStack>

            <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.75rem", md: "2.25rem" }} lineHeight="1.15" letterSpacing="-0.005em" color="white" maxW="504px">
              {s.title}
            </Heading>
            <Text fontSize="0.8125rem" color="white" opacity={0.8}>
              {meta}
            </Text>

            <Stack gap="2" pt="6px">
              <Text {...tiny} aria-hidden="true">
                {unit === "part" ? "Parts" : "Weeks"}
              </Text>
              <ChUl listStyle="none" m="0" p="0" display="flex" flexWrap="wrap" gap="2" aria-label={`${unit === "part" ? "Parts" : "Weeks"} of ${s.title}`}>
                {featured.weeks.map((w) => {
                  const isLatest = w.slug === featured.latest.slug;
                  return (
                    <ChLi key={w.slug}>
                      <Box
                        asChild
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                        minW="38px"
                        h="38px"
                        px="2"
                        borderRadius="full"
                        fontSize="0.9375rem"
                        fontWeight="600"
                        textDecoration="none"
                        borderWidth="1.5px"
                        borderColor={isLatest ? "accent.highlight" : "rgba(255,255,255,0.6)"}
                        bg={isLatest ? "accent.highlight" : "transparent"}
                        color={isLatest ? "ink.900" : "white"}
                        transition={`background-color 150ms ease, border-color 150ms ease, transform 160ms ${EASE}`}
                        _active={{ transform: "scale(0.95)" }}
                        css={{
                          "@media (hover: hover) and (pointer: fine)": { "&:hover": isLatest ? {} : { borderColor: "white" } },
                          "&:focus-visible": { outline: "3px solid", outlineColor: "white", outlineOffset: "2px" },
                        }}
                      >
                        <NextLink href={`/resources/${w.slug}`} aria-label={`${weekLabel(w)}${isLatest ? " (latest)" : ""}`} aria-current={isLatest ? "true" : undefined}>
                          {String(w.week)}
                        </NextLink>
                      </Box>
                    </ChLi>
                  );
                })}
              </ChUl>
            </Stack>

            <HStack gap="10px" pt="2" flexWrap="wrap">
              <LinkButton href={`/resources/${featured.latest.slug}`} variant="inverse" arrow>
                Read {weekLabel(featured.latest).toLowerCase()}
              </LinkButton>
              <LinkButton href={`/resources/series/${s.slug}`} variant="inverseOutline">
                See all {unit}s
              </LinkButton>
            </HStack>
          </Stack>
        </Box>
      )}

      <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1fr" }} gap="22px" alignItems="start">
        {guide && <SideCard r={guide} tag="Prayer & fasting" cta="Open the guide" />}
        {craft && <SideCard r={craft} tag="Quest Kids craft" cta="See the craft" />}
      </Grid>
    </Grid>
  );
}
