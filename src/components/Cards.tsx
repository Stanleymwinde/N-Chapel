import NextLink from "next/link";
import { Badge, Box, Text } from "@chakra-ui/react";
import { Calendar, Clock, MapPin, User, Users } from "lucide-react";
import type { ChurchEvent, Group, Sermon } from "@content/types";
import { isTodo } from "@content/site";
import { dateParts, formatRange, formatShortDate } from "@/lib/dates";
import { LinkButton } from "./Button";
import { Img } from "./Img";
import { RichText } from "./RichText";
import { ChP } from "@/components/primitives";
import {
  CardBody,
  CardChips,
  CardDateBlock,
  CardDescription,
  CardEyebrow,
  CardFooter,
  CardMedia,
  CardMeta,
  CardRoot,
  CardTitle,
} from "./recipe-parts";

const sizes = "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw";

export function Chip({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "accent" | "neutral" }) {
  const styles = {
    brand: { bg: "brand.subtle", color: "brand.fg" },
    accent: { bg: "accent.highlight", color: "accent.contrast" },
    neutral: { bg: "bg.muted", color: "fg" },
  }[tone];
  return (
    <Badge as="li" {...styles} borderRadius="full" px="3" py="1" fontSize="0.8125rem" fontWeight="600" textTransform="none" letterSpacing="0">
      {children}
    </Badge>
  );
}

/* ---------------- Ministry ---------------- */
export type MinistryCardProps = {
  title: string;
  summary: string;
  href: string;
  image?: string;
  who?: string;
  when?: string;
  /** link label, a verb ("Explore Quest") */
  cta?: string;
  headingLevel?: "h2" | "h3";
  /** "tile" = borderless image-first card (homepage scrolling row) */
  variant?: "ministry" | "tile";
};

export function MinistryCard({ title, summary, href, image, who, when, cta, headingLevel = "h3", variant = "ministry" }: MinistryCardProps) {
  // Tile: image, audience, title, one line. The title link covers the whole tile.
  if (variant === "tile") {
    return (
      <CardRoot variant="tile">
        {image && (
          <CardMedia>
            <Img slot={image} sizes="(min-width: 1024px) 400px, 80vw" decorative />
          </CardMedia>
        )}
        <CardBody>
          {who && (
            <CardEyebrow textTransform="none" letterSpacing="0" fontSize="0.875rem">
              <RichText text={who} />
            </CardEyebrow>
          )}
          <CardTitle as={headingLevel}>
            <NextLink href={href}>{title}</NextLink>
          </CardTitle>
          <CardDescription>
            <RichText text={summary} />
          </CardDescription>
        </CardBody>
      </CardRoot>
    );
  }
  return (
    <CardRoot variant={variant}>
      {image && (
        <CardMedia>
          <Img slot={image} sizes={sizes} decorative />
        </CardMedia>
      )}
      <CardBody>
        <CardTitle as={headingLevel}>
          <NextLink href={href}>{title}</NextLink>
        </CardTitle>
        <CardDescription>
          <RichText text={summary} />
        </CardDescription>
        {(who || when) && (
          <CardChips aria-label="Details">
            {who && (
              <Chip>
                <RichText text={who} />
              </Chip>
            )}
            {when && (
              <Chip tone="neutral">
                <RichText text={when} />
              </Chip>
            )}
          </CardChips>
        )}
        <CardFooter>
          <LinkButton href={href} variant="link" aria-label={`${cta ?? "Explore"}: ${title}`}>
            {cta ?? `Explore ${title}`}
          </LinkButton>
        </CardFooter>
      </CardBody>
    </CardRoot>
  );
}

/* ---------------- Event ---------------- */
export function EventCard({ event, headingLevel = "h3", archived }: { event: ChurchEvent; headingLevel?: "h2" | "h3"; archived?: boolean }) {
  const parts = dateParts(event.startDate);
  return (
    <CardRoot variant="event" opacity={archived ? 0.85 : 1}>
      <CardBody>
        <CardDateBlock aria-hidden="true">
          <Text as="span" textStyle="eyebrow">
            {parts.month}
          </Text>
          <Text as="span" fontFamily="heading" fontSize="1.75rem">
            {parts.day}
          </Text>
        </CardDateBlock>
        <Box display="flex" flexDirection="column" gap="3" flex="1" minW="0">
          <CardEyebrow>
            {event.type}
            {archived ? " · Past event" : ""}
          </CardEyebrow>
          <CardTitle as={headingLevel}>
            <NextLink href={`/events/${event.slug}`}>{event.title}</NextLink>
          </CardTitle>
          <CardMeta>
            <li>
              <Calendar aria-hidden="true" />
              <span>{formatRange(event.startDate, event.endDate)}</span>
            </li>
            {event.time && (
              <li>
                <Clock aria-hidden="true" />
                <span>
                  <RichText text={event.time} />
                </span>
              </li>
            )}
            <li>
              <MapPin aria-hidden="true" />
              <span>
                <RichText text={event.venue} />
              </span>
            </li>
            <li>
              <Users aria-hidden="true" />
              <span>For: {event.audience.join(", ")}</span>
            </li>
          </CardMeta>
          <CardDescription>
            <RichText text={event.summary} />
          </CardDescription>
          <CardFooter>
            <LinkButton href={`/events/${event.slug}`} variant="link" aria-label={`See details: ${event.title}`}>
              See details
            </LinkButton>
          </CardFooter>
        </Box>
      </CardBody>
    </CardRoot>
  );
}

/* ---------------- Group ---------------- */
export function GroupCard({
  group,
  joinHref,
  headingLevel = "h3",
}: {
  group: Group;
  /** e.g. "?group=binti#join" */
  joinHref: string;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <CardRoot variant="group">
      {group.image && (
        <CardMedia>
          <Img slot={group.image} sizes={sizes} decorative />
        </CardMedia>
      )}
      <CardBody>
        <CardEyebrow>For: {group.audience}</CardEyebrow>
        <CardTitle as={headingLevel}>{group.name}</CardTitle>
        <CardDescription>
          <RichText text={group.summary} />
        </CardDescription>
        <CardMeta>
          <li>
            <Clock aria-hidden="true" />
            <span>
              <RichText text={group.when} />
            </span>
          </li>
          <li>
            <MapPin aria-hidden="true" />
            <span>
              <RichText text={group.where} />
            </span>
          </li>
        </CardMeta>
        <CardFooter>
          {group.link ? (
            <LinkButton href={group.link.href} variant="secondary">
              {group.link.label}
            </LinkButton>
          ) : (
            <LinkButton href={joinHref} variant="primary" aria-label={`Join this group: ${group.name}`}>
              Join this group
            </LinkButton>
          )}
        </CardFooter>
      </CardBody>
    </CardRoot>
  );
}

/* ---------------- Sermon ---------------- */
export function SermonCard({ sermon, headingLevel = "h3" }: { sermon: Sermon; headingLevel?: "h2" | "h3" }) {
  const hasVideo = !isTodo(sermon.youtubeId);
  return (
    <CardRoot variant="sermon">
      <CardMedia>
        {hasVideo ? (
          // YouTube thumbnail; lightweight, no iframe until play
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`https://i.ytimg.com/vi/${sermon.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" width={480} height={360} />
        ) : (
          <Box position="absolute" inset="0" bg="night.900" display="flex" alignItems="center" justifyContent="center" p="5">
            <Text fontFamily="heading" fontSize="1.25rem" color="fg.inverted" textAlign="center" lineClamp={3}>
              {sermon.series}
            </Text>
          </Box>
        )}
      </CardMedia>
      <CardBody>
        <CardEyebrow>Series: {sermon.series}</CardEyebrow>
        <CardTitle as={headingLevel}>
          {hasVideo ? (
            <a href={`https://www.youtube.com/watch?v=${sermon.youtubeId}`} target="_blank" rel="noopener noreferrer">
              {sermon.title}
              <span className="sr-only"> (opens YouTube in a new tab)</span>
            </a>
          ) : (
            sermon.title
          )}
        </CardTitle>
        <CardMeta>
          <li>
            <User aria-hidden="true" />
            <span>{sermon.speaker}</span>
          </li>
          <li>
            <Calendar aria-hidden="true" />
            <span>{isTodo(sermon.date) ? <RichText text={sermon.date} /> : formatShortDate(sermon.date)}</span>
          </li>
        </CardMeta>
        {!hasVideo && (
          <ChP textStyle="small" color="fg.muted">
            <RichText text={sermon.youtubeId} />
          </ChP>
        )}
      </CardBody>
    </CardRoot>
  );
}
