import { Suspense } from "react";
import { Box, Container, Heading, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react";
import { series } from "@content/library/series";
import { seasons } from "@content/library/seasons";
import { resources } from "@content/library/resources";
import { getSection, type SectionKey } from "@content/library/sections";
import type { Link } from "@content/types";
import { Breadcrumbs } from "../layout/Breadcrumbs";
import { NextStepBand } from "../NextStepBand";
import { ResourceHub } from "./ResourceHub";

/** The closing band, matched to each part of the library (only routes that exist) */
export const LIBRARY_CTAS: Record<SectionKey | "hub", { title: string; text: string; primary: Link; secondary?: Link }> = {
  hub: {
    title: "Study the Bible with others",
    text: "An eGroup is a great place to talk through this week's study.",
    primary: { label: "Find a group", href: "/get-involved/groups" },
    secondary: { label: "Read the blog", href: "/blog" },
  },
  "bible-study": {
    title: "Study the Bible with others",
    text: "An eGroup is a great place to talk through this week's study.",
    primary: { label: "Find a group", href: "/get-involved/groups" },
    secondary: { label: "Read the blog", href: "/blog" },
  },
  "prayer-fasting": {
    title: "Pray with us",
    text: "Join our Wednesday Midweek Prayer Service, 6:00 PM.",
    primary: { label: "Plan your visit", href: "/new-here/plan-your-visit" },
    secondary: { label: "Prayer request", href: "/ministries/prayer#request" },
  },
  "family-worship": {
    title: "Bring your kids to Quest",
    text: "Age-grouped classes for ages 2–11 during our Sunday services.",
    primary: { label: "Plan your visit", href: "/new-here/plan-your-visit" },
    secondary: { label: "About Quest", href: "/ministries/quest-children" },
  },
  "quest-kids": {
    title: "Bring your kids to Quest",
    text: "Age-grouped classes for ages 2–11 during our Sunday services.",
    primary: { label: "Plan your visit", href: "/new-here/plan-your-visit" },
    secondary: { label: "About Quest", href: "/ministries/quest-children" },
  },
};

function Loading() {
  return (
    <Stack gap="8" aria-hidden="true">
      <Skeleton height="140px" borderRadius="lg" />
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="5">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} height="340px" borderRadius="lg" />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

/**
 * A Resource Library section page (Bible studies, Prayer & fasting, Family
 * worship, Quest Kids): a compact header, then straight into the filters and
 * cards, with the Type filter fixed by the route.
 */
export function SectionPage({ section }: { section: SectionKey }) {
  const s = getSection(section);
  const cta = LIBRARY_CTAS[section];
  return (
    <>
      <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "6", md: "8" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Breadcrumbs items={[{ label: "Resource Library", href: "/resources" }, { label: s.title }]} tone="light" />
          <Stack gap="3" mt={{ base: "6", md: "8" }} maxW="48rem">
            <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize="clamp(2.25rem, 1.6rem + 2.4vw, 3.5rem)" lineHeight="1.05" letterSpacing="-0.02em">
              {s.title}
            </Heading>
            <Text textStyle="lead" color="fg.muted">
              {s.intro}
            </Text>
          </Stack>
        </Container>
      </Box>

      <Box as="section" aria-label={`Browse ${s.title.toLowerCase()}`} bg="bg.canvas" pb={{ base: "16", md: "24" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Suspense fallback={<Loading />}>
            <ResourceHub series={series} seasons={seasons} resources={resources} section={section} />
          </Suspense>
        </Container>
      </Box>

      <NextStepBand title={cta.title} text={cta.text} primary={cta.primary} secondary={cta.secondary} />
    </>
  );
}
