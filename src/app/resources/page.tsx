import { Suspense } from "react";
import { Box, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";
import { series } from "@content/library/series";
import { seasons } from "@content/library/seasons";
import { resources } from "@content/library/resources";
import { thisWeekPicks } from "@content/library/sections";
import { pageMetadata } from "@/lib/metadata";
import { NextStepBand } from "@/components/NextStepBand";
import { Section } from "@/components/layout/Section";
import { LibraryHero } from "@/components/library/LibraryHero";
import { ThisWeek } from "@/components/library/ThisWeek";
import { ResourceHub } from "@/components/library/ResourceHub";
import { LIBRARY_CTAS } from "@/components/library/SectionPage";

export const metadata = pageMetadata({
  title: "Resource Library",
  description:
    "Bible studies, prayer and fasting guides, family worship and Quest Kids crafts from Nairobi Chapel Ngong Road. Read online or download free.",
  path: "/resources",
});

function HubSkeleton() {
  return (
    <Stack gap="8" aria-hidden="true">
      <Skeleton height="180px" borderRadius="lg" />
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="5">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} height="340px" borderRadius="lg" />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

/** "This week" is worked out from today's date, so re-render daily */
export const revalidate = 86400;

export default function ResourcesPage() {
  const week = thisWeekPicks();
  const cta = LIBRARY_CTAS.hub;
  return (
    <>
      <LibraryHero
        crumbs={[{ label: "Resource Library" }]}
        display
        image="resources.hero"
        title="Resource Library"
        intro="Bible studies, prayer and fasting guides, family worship and Quest Kids crafts. Read online or download free."
      />

      <Section id="this-week" tone="warm" title="This week">
        <ThisWeek {...week} />
      </Section>

      <Section id="library" label="Browse the library">
        <Suspense fallback={<HubSkeleton />}>
          <ResourceHub series={series} seasons={seasons} resources={resources} featuredSlug={week.featured?.series.slug} />
        </Suspense>
        <Box mt="12" color="fg.muted" maxW="prose">
          Looking for something older? Ask us on WhatsApp at 0701 777 888 and we&apos;ll help you find it.
        </Box>
      </Section>

      <NextStepBand title={cta.title} text={cta.text} primary={cta.primary} secondary={cta.secondary} />
    </>
  );
}
