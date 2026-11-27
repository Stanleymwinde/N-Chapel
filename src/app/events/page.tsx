import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { audienceFilters, publishedEvents } from "@content/events";
import { nairobiToday } from "@/lib/events";
import { pageMetadata } from "@/lib/metadata";
import { NextStepBand } from "@/components/NextStepBand";
import { EventCalendar } from "@/components/c/EventCalendar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

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
    <Box bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "16", md: "24" }}>
      <Container maxW="container" px={{ base: "5", md: "8" }}>
        {/* Light, centred heading with the gold swoosh (Figma "What's on") */}
        <Box as="header">
          <Breadcrumbs items={[{ label: "What's on" }]} tone="light" />
          <Stack gap="18px" alignItems="center" textAlign="center" pt={{ base: "10", md: "14" }} pb={{ base: "10", md: "16" }}>
            <Stack gap="0" alignItems="center">
              <Heading as="h1" fontFamily="heading" fontWeight="600" fontSize={{ base: "3.25rem", md: "5rem" }} lineHeight="1.05" letterSpacing={{ base: "-1px", md: "-2px" }}>
                What&apos;s on
              </Heading>
              {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size decorative SVG */}
              <img src="/media/events/swoosh.svg" alt="" width={346} height={16} style={{ display: "block", maxWidth: "80vw", height: "16px" }} />
            </Stack>
            <Text fontSize={{ base: "17px", md: "19px" }} lineHeight="1.55" color="fg.muted" maxW="600px">
              Camps, classes, outreach and gatherings for every age. Past events move to the archive automatically.
            </Text>
          </Stack>
        </Box>

        <Box id="events" aria-label="Events calendar">
          <EventCalendar events={publishedEvents} audiences={audienceFilters} today={today} />
        </Box>
      </Container>
    </Box>

    <NextStepBand
      title="Don't wait for an event to say hello"
      text="Join us this Sunday at 9:00 or 11:30 AM on Ngong Road."
      primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
      secondary={{ label: "Get counselling", href: "/ministries/counselling-care" }}
    />
    </>
  );
}
