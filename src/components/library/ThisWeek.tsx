import NextLink from "next/link";
import { Box, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import type { Resource } from "@content/library/types";
import { AUDIENCE_LABELS } from "@content/library/types";
import { monthLabel, weekLabel } from "@content/library/resources";
import type { ThisWeekPicks } from "@content/library/sections";
import { isTodo } from "@content/site";
import { LinkButton } from "../Button";
import { ChLi, ChUl } from "../primitives";
import { Chip, ResourceCover, seriesCoverText, TONES, toneOf } from "./LibraryCards";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

/** A side card: its tile on top, then a label, the title, when and who, and a quiet call to action. One link. */
function SideCard({ r, label, cta }: { r: Resource; label: string; cta: string }) {
  return (
    <Box
      asChild
      display="flex"
      flexDirection="column"
      h="100%"
      borderRadius="xl"
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
        "& > a > div:first-of-type": { aspectRatio: "auto", flex: "1", minHeight: "140px" },
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
        <ResourceCover r={r} />
        <Stack gap="1.5" p={{ base: "5", md: "6" }}>
          <Box>
            <Chip brand>{label}</Chip>
          </Box>
          <Text fontFamily="heading" fontWeight="650" fontSize="1.125rem" lineHeight="1.25" lineClamp={2}>
            {r.title}
          </Text>
          <Text fontSize="0.875rem" color="fg.muted">
            {[monthLabel(r), r.type === "prayer-fasting" ? r.audience.map((a) => AUDIENCE_LABELS[a]).join(", ") : ""].filter(Boolean).join(" · ")}
          </Text>
          <HStack className="side-cta" gap="1.5" pt="2" fontSize="0.9375rem" fontWeight="600" color="brand.fg" aria-hidden="true">
            <span>{cta}</span>
            <ArrowRight size={16} />
          </HStack>
        </Stack>
      </NextLink>
    </Box>
  );
}

/**
 * "This week" (see thisWeekPicks in content/library/sections.ts): the featured
 * Bible-study series as a large typographic cover with every week one tap
 * away, and the newest prayer & fasting guide and Quest craft beside it.
 */
export function ThisWeek({ featured, guide, craft }: ThisWeekPicks) {
  const s = featured?.series;
  const tone = TONES[toneOf(s)];
  const dark = tone.fg === "white";
  const unit = s?.slug === "genesis" ? "part" : "week";
  const cover = s ? seriesCoverText(s) : undefined;
  const meta = featured && s ? [s.book, `${featured.weeks.length} ${unit}${featured.weeks.length === 1 ? "" : "s"}`, s.when, "PDF"].filter(Boolean).join(" · ") : "";

  return (
    <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1.7fr) minmax(0, 1fr)" }} gap={{ base: "5", md: "6" }} alignItems="stretch">
      {featured && s && cover && (
        <Box position="relative" borderRadius="xl" overflow="hidden" bg={tone.bg} color={tone.fg} minH={{ base: "auto", md: "560px" }} display="flex">
          <Stack gap="6" p={{ base: "6", md: "10" }} justifyContent="space-between" w="full">
            <HStack gap="3" flexWrap="wrap">
              {featured.isCurrent && (
                <Text as="span" px="3" py="1" borderRadius="full" bg={dark ? "accent.highlight" : "ink.900"} color={dark ? "ink.900" : "white"} fontSize="0.75rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase">
                  Current series
                </Text>
              )}
              <Text as="span" fontSize="0.75rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color={tone.sub}>
                Bible study
              </Text>
            </HStack>

            {/* The cover type, set large */}
            <Box aria-hidden="true">
              <Text fontFamily="heading" fontWeight="700" letterSpacing="-0.02em" lineHeight="0.98" fontSize={cover.big.length > 14 ? "clamp(2.25rem, 1.4rem + 3vw, 4rem)" : "clamp(3rem, 2rem + 4vw, 5.5rem)"} textWrap="balance" maxW="14ch">
                {cover.big}
              </Text>
              {cover.sub && (
                <Text mt="3" fontWeight="600" fontSize={{ base: "1.0625rem", md: "1.25rem" }} color={tone.sub}>
                  {cover.sub}
                </Text>
              )}
            </Box>

            <Stack gap="5">
              <Stack gap="1.5">
                <Heading as="h3" fontFamily="heading" fontWeight="650" fontSize={{ base: "1.25rem", md: "1.5rem" }} lineHeight="1.2" color={tone.fg}>
                  {s.title}
                </Heading>
                <Text fontSize="0.9375rem" color={tone.sub}>
                  {meta}
                </Text>
                {!isTodo(s.description) && (
                  <Text lineClamp={2} maxW="34rem">
                    {s.description}
                  </Text>
                )}
              </Stack>

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
                        minW="44px"
                        h="44px"
                        px="3"
                        borderRadius="full"
                        fontWeight="700"
                        textDecoration="none"
                        borderWidth="1px"
                        borderColor={isLatest ? (dark ? "accent.highlight" : "ink.900") : dark ? "rgba(255,255,255,0.45)" : "rgba(22,18,31,0.35)"}
                        bg={isLatest ? (dark ? "accent.highlight" : "ink.900") : "transparent"}
                        color={isLatest ? (dark ? "ink.900" : "white") : tone.fg}
                        transition={`background-color 150ms ease, border-color 150ms ease, transform 160ms ${EASE}`}
                        _active={{ transform: "scale(0.95)" }}
                        css={{
                          "@media (hover: hover) and (pointer: fine)": { "&:hover": isLatest ? {} : { borderColor: dark ? "white" : "var(--chakra-colors-ink-900)" } },
                          "&:focus-visible": { outline: "3px solid", outlineColor: dark ? "white" : "var(--chakra-colors-ink-900)", outlineOffset: "2px" },
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

              <HStack gap="3" flexWrap="wrap">
                <LinkButton href={`/resources/${featured.latest.slug}`} variant={dark ? "inverse" : "primary"} arrow>
                  Read {weekLabel(featured.latest).toLowerCase()}
                </LinkButton>
                <LinkButton href={`/resources/series/${s.slug}`} variant={dark ? "inverseOutline" : "secondary"}>
                  View series
                </LinkButton>
              </HStack>
            </Stack>
          </Stack>
        </Box>
      )}

      <Grid templateRows={{ lg: "1fr 1fr" }} templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1fr" }} gap={{ base: "5", md: "6" }}>
        {guide && <SideCard r={guide} label="Prayer & fasting" cta="Read the guide" />}
        {craft && <SideCard r={craft} label="Quest Kids" cta="See the craft" />}
      </Grid>
    </Grid>
  );
}
