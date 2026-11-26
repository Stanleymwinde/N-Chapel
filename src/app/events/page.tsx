import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { audienceFilters, publishedEvents } from "@content/events";
import { nairobiToday } from "@/lib/events";
import { pageMetadata } from "@/lib/metadata";
import { NextStepBand } from "@/components/NextStepBand";
import { Section } from "@/components/layout/Section";
import { EventCalendar } from "@/components/c/EventCalendar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Squiggle } from "@/components/home/Squiggle";

export const metadata = pageMetadata({
  title: "What's on",
  description: "Upcoming events at Nairobi Chapel Ngong Road: camps, classes, outreach and gatherings for every age.",
  path: "/events",
});

/** Re-render at least hourly so "today" (Nairobi time) is never a build-time date */
export const revalidate = 3600;

export default function EventsPage() {
  // The browser re-reads today as well, so a cached page can't show an ended event as upcoming.
  const today = nairobiToday();

  return (
    <>
      {/* Light, centred hero (in the spirit of the LIFE Church What's On page) */}
      <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "10", md: "14" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Breadcrumbs items={[{ label: "What's on" }]} tone="light" />
          <Stack gap="5" alignItems="center" textAlign="center" mt={{ base: "10", md: "16" }} maxW="44rem" mx="auto">
            <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize="clamp(2.75rem, 1.6rem + 4.4vw, 5rem)" lineHeight="1" letterSpacing="-0.02em">
              <Squiggle>What&apos;s on</Squiggle>
            </Heading>
            <Text textStyle="lead" color="fg.muted" mt="3">
              Camps, classes, outreach and gatherings for every age, plus what happens every week. Past events move to the archive automatically.
            </Text>
          </Stack>
        </Container>
      </Box>

      <Section id="events" label="Events calendar" compact>
        <EventCalendar events={publishedEvents} audiences={audienceFilters} today={today} />
      </Section>

      <NextStepBand
        title="Don't wait for an event to say hello"
        text="Join us this Sunday at 9:00 or 11:30 AM on Ngong Road."
        primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
        secondary={{ label: "Find a group", href: "/get-involved/groups" }}
      />
    </>
  );
}
