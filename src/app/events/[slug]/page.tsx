import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Grid, HStack, Stack, Text } from "@chakra-ui/react";
import { ShieldCheck } from "lucide-react";
import { getEvent, publishedEvents } from "@content/events";
import { site } from "@content/site";
import type { Fact } from "@content/types";
import { formatRange, parseDate } from "@/lib/dates";
import { isUpcoming, nairobiToday } from "@/lib/events";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { FactList } from "@/components/FactList";
import { JsonLd } from "@/components/JsonLd";
import { NextStepBand } from "@/components/NextStepBand";
import { RichText, plainText } from "@/components/RichText";
import { PageHero } from "@/components/layout/PageHero";
import { Prose, Section } from "@/components/layout/Section";
import { AlertIndicator, AlertRoot, AlertTitle } from "@/components/primitives";

export const dynamicParams = false;

/** Re-render hourly so "this event has ended" follows today's date, not the build date */
export const revalidate = 3600;

export function generateStaticParams() {
  return publishedEvents.map((e) => ({ slug: e.slug }));
}

const find = getEvent;

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = find(slug);
  if (!event) return {};
  return pageMetadata({
    title: event.title,
    description: plainText(event.summary) || `${event.title} at ${site.name}.`,
    path: `/events/${event.slug}`,
  });
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const event = find(slug);
  if (!event) notFound();

  const past = !isUpcoming(event, nairobiToday());
  const dated = event.status === "dated" && event.startDate;
  const when = dated ? formatRange(event.startDate!, event.endDate) : event.status === "tba" ? "Date to be announced" : event.recurrence;
  const cta = event.action?.href ? { label: event.action.label, href: event.action.href } : undefined;

  const facts: Fact[] = [
    ...(when ? [{ icon: "calendar" as const, label: "When", value: when }] : []),
    ...(event.time ? [{ icon: "clock" as const, label: "Time", value: event.time }] : []),
    ...(event.location ? [{ icon: "mapPin" as const, label: "Where", value: event.location }] : []),
    { icon: "users", label: "Who it's for", value: event.audience.join(", ") },
    ...(event.contact?.phone ? [{ icon: "phone" as const, label: "Call", value: event.contact.phone, href: `tel:${event.contact.phone.replace(/\s/g, "")}` }] : []),
    ...(event.contact?.email ? [{ icon: "mail" as const, label: "Email", value: event.contact.email, href: `mailto:${event.contact.email}` }] : []),
  ];

  const venue = plainText(event.location ?? "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: plainText(event.summary),
    ...(dated ? { startDate: parseDate(event.startDate!).toISOString(), ...(event.endDate ? { endDate: parseDate(event.endDate).toISOString() } : {}) } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: /online/i.test(venue) ? "https://schema.org/MixedEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: venue || site.name,
      address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
    },
    organizer: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/events/${event.slug}`,
  };

  return (
    <>
      {dated && <JsonLd data={jsonLd} />}
      <PageHero
        eyebrow={event.type}
        title={event.title}
        intro={event.summary || undefined}
        image={event.image ?? "events.hero"}
        breadcrumbs={[{ label: "What's on", href: "/events" }, { label: event.title }]}
      />

      <Section id="details" title="Event details" label="Event details">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1.3fr" }} gap={{ base: "10", lg: "16" }} alignItems="start">
          <Stack gap="6">
            {past && (
              <AlertRoot status="info" borderRadius="md">
                <AlertIndicator />
                <AlertTitle>This event has ended. It&apos;s kept here for reference.</AlertTitle>
              </AlertRoot>
            )}
            <FactList facts={facts} />
          </Stack>
          <Stack gap="6">
            {event.body && event.body.length > 0 ? (
              <Prose>
                {event.body.map((p, i) => (
                  <p key={i}>
                    <RichText text={p} />
                  </p>
                ))}
              </Prose>
            ) : event.summary ? (
              <Prose>
                <p>
                  <RichText text={event.summary} />
                </p>
              </Prose>
            ) : (
              <Text color="fg.muted">More details will be added here soon.</Text>
            )}

            {event.involvesChildren && (
              <HStack
                alignItems="flex-start"
                gap="3"
                p="5"
                borderRadius="lg"
                bg="brand.subtle"
                borderWidth="1px"
                borderColor="purple.200"
                maxW="prose"
              >
                <Box color="brand.fg" mt="0.5" aria-hidden="true">
                  <ShieldCheck size={22} />
                </Box>
                <Stack gap="2">
                  <Text fontWeight="600">Keeping children safe</Text>
                  <Text color="fg.muted">This event involves children. Read how we keep children and young people safe.</Text>
                  <Box>
                    <LinkButton href="/safeguarding" variant="link">
                      Read our safeguarding policy
                    </LinkButton>
                  </Box>
                </Stack>
              </HStack>
            )}

            {!past && cta && (
              <HStack gap="3" flexWrap="wrap">
                <LinkButton href={cta.href} variant="primary" size="lg" aria-label={`${cta.label} for ${event.title}`}>
                  {cta.label}
                </LinkButton>
              </HStack>
            )}
            {event.ministry && (
              <Box>
                <LinkButton href={event.ministry} variant="link">
                  Explore the ministry behind this event
                </LinkButton>
              </Box>
            )}
          </Stack>
        </Grid>
      </Section>

      <NextStepBand
        title="See what else is on"
        text="Camps, classes and gatherings for every age, plus what happens every week."
        primary={{ label: "See all events", href: "/events" }}
        secondary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
      />
    </>
  );
}
