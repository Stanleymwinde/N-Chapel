import { Suspense } from "react";
import { Box, Container, Heading, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react";
import { series } from "@content/library/series";
import { seasons } from "@content/library/seasons";
import { resources } from "@content/library/resources";
import { getSection, thisWeekPicks, type SectionKey } from "@content/library/sections";
import type { Link } from "@content/types";
import { NextStepBand } from "../NextStepBand";
import { LibraryHero } from "./LibraryHero";
import { ThisWeek } from "./ThisWeek";
import { ResourceHub } from "./ResourceHub";

/** The closing band on every Resource Library page (Figma "Next step") */
export const LIBRARY_CTA: { title: string; text: string; primary: Link; secondary: Link } = {
  title: "Study the Bible with others",
  text: "An eGroup is a great place to talk through this week’s study.",
  primary: { label: "Plan your visit", href: "/new-here/plan-your-visit" },
  secondary: { label: "Get counselling", href: "/ministries/counselling-care" },
};

function Loading() {
  return (
    <Stack gap="14" aria-hidden="true">
      <Skeleton height="140px" borderRadius="10px" />
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="6">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} height="252px" borderRadius="8px" />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

/**
 * A Resource Library page (Figma "Resource Library", "Bible studies", "Prayer &
 * fasting", "Family worship", "Quest Kids"): the library hero, "This week",
 * then the filters and cards. On a section page the Type filter is fixed by
 * the route and the results show straight away.
 */
export function LibraryPage({ section }: { section?: SectionKey }) {
  const week = thisWeekPicks();
  const s = section ? getSection(section) : undefined;
  return (
    <>
      <LibraryHero
        split
        crumbs={s ? [{ label: "Resource Library", href: "/resources" }, { label: s.title }] : [{ label: "Resource Library" }]}
        image="resources.hero"
        title="Resource Library"
        intro="Bible studies, prayer and fasting guides, family worship and Quest Kids crafts. Read online or download free."
      />

      <Box as="section" aria-labelledby="this-week-heading" bg="bg.warm" py={{ base: "16", md: "20", lg: "24" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Heading as="h2" id="this-week-heading" fontFamily="heading" fontWeight="600" fontSize={{ base: "2.25rem", md: "3rem" }} lineHeight="1.1" letterSpacing="-0.015em" mb="8">
            This week
          </Heading>
          <ThisWeek {...week} />
        </Container>
      </Box>

      <Box as="section" aria-label={s ? `Browse ${s.title.toLowerCase()}` : "Browse the library"} bg="bg.canvas" py={{ base: "16", md: "20", lg: "24" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Suspense fallback={<Loading />}>
            <ResourceHub series={series} seasons={seasons} resources={resources} section={section} featuredSlug={week.featured?.series.slug} />
          </Suspense>
          <Text mt={s ? "14" : "9"} fontSize="0.9375rem" color="fg.muted">
            Looking for something older? Ask us on WhatsApp at 0701 777 888 and we&apos;ll help you find it.
          </Text>
        </Container>
      </Box>

      <NextStepBand title={LIBRARY_CTA.title} text={LIBRARY_CTA.text} primary={LIBRARY_CTA.primary} secondary={LIBRARY_CTA.secondary} />
    </>
  );
}

/** Kept for the section routes */
export function SectionPage({ section }: { section: SectionKey }) {
  return <LibraryPage section={section} />;
}
