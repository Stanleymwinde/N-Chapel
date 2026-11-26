import NextLink from "next/link";
import { Box, Text } from "@chakra-ui/react";
import { CalendarClock, MapPin, Users } from "lucide-react";
import type { EventEntry } from "@content/events";
import { EventCard } from "../Cards";
import { LinkButton } from "../Button";
import { RichText } from "../RichText";
import {
  CardBody,
  CardDateBlock,
  CardDescription,
  CardEyebrow,
  CardFooter,
  CardMeta,
  CardRoot,
  CardTitle,
} from "../recipe-parts";

/**
 * Event card that never shows a placeholder date: events with `dateTbc`
 * (or undated "to be announced" items) say "Date to be confirmed".
 */
export function EventItem({ event, archived }: { event: EventEntry; archived?: boolean }) {
  if (!event.dateTbc) return <EventCard event={event} archived={archived} />;
  return (
    <TbcCard
      title={event.title}
      href={`/events/${event.slug}`}
      eyebrow={`${event.type}${archived ? " · Past event" : ""}`}
      summary={event.summary}
      venue={event.venue}
      audience={event.audience.join(", ")}
      note={event.dateTbc}
    />
  );
}

export function TbcCard({
  title,
  href,
  eyebrow,
  summary,
  venue,
  audience,
  note,
}: {
  title: string;
  href?: string;
  eyebrow: string;
  summary: string;
  venue?: string;
  audience: string;
  note: string;
}) {
  return (
    <CardRoot variant="event">
      <CardBody>
        <CardDateBlock aria-hidden="true">
          <Text as="span" textStyle="eyebrow">
            Date
          </Text>
          <Text as="span" fontFamily="heading" fontSize="1.125rem">
            TBC
          </Text>
        </CardDateBlock>
        <Box display="flex" flexDirection="column" gap="3" flex="1" minW="0">
          <CardEyebrow>{eyebrow}</CardEyebrow>
          <CardTitle as="h3">{href ? <NextLink href={href}>{title}</NextLink> : title}</CardTitle>
          <CardMeta>
            <li>
              <CalendarClock aria-hidden="true" />
              <span>
                Date to be confirmed. <RichText text={note} />
              </span>
            </li>
            {venue && (
              <li>
                <MapPin aria-hidden="true" />
                <span>
                  <RichText text={venue} />
                </span>
              </li>
            )}
            <li>
              <Users aria-hidden="true" />
              <span>For: {audience}</span>
            </li>
          </CardMeta>
          <CardDescription>
            <RichText text={summary} />
          </CardDescription>
          {href && (
            <CardFooter>
              <LinkButton href={href} variant="link" aria-label={`See details: ${title}`}>
                See details
              </LinkButton>
            </CardFooter>
          )}
        </Box>
      </CardBody>
    </CardRoot>
  );
}
