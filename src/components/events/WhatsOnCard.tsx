import NextLink from "next/link";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { ArrowRight, Clock, MapPin, Repeat } from "lucide-react";
import type { WhatsOnEvent } from "@content/events";
import { formatRange } from "@/lib/dates";
import { dateBlock } from "@/lib/events";
import { Img } from "../Img";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

/**
 * Card shell: the title is the one link to the event page, stretched over the
 * whole card with ::after; the action sits above it as its own link, so the
 * two never nest. The focus ring is drawn on the card.
 */
const shell = {
  position: "relative",
  display: "flex",
  h: "100%",
  borderRadius: "lg",
  overflow: "hidden",
  borderWidth: "1px",
  borderColor: "border",
  bg: "bg.canvas",
  transition: `border-color 150ms ease, transform 200ms ${EASE}, box-shadow 200ms ${EASE}`,
  css: {
    "& .ev-title-link::after": { content: '""', position: "absolute", inset: "0", zIndex: "0" },
    "& .ev-title-link:focus-visible": { outline: "none" },
    "&:has(.ev-title-link:focus-visible)": { outline: "3px solid var(--chakra-colors-brand-solid)", outlineOffset: "3px" },
    "& .ev-action": { position: "relative", zIndex: "1" },
    "& .ev-photo": { transition: `transform 300ms ${EASE}` },
    "& .ev-action svg": { transition: `transform 200ms ${EASE}` },
    "@media (hover: hover) and (pointer: fine)": {
      "&:hover": { borderColor: "var(--chakra-colors-border-strong)", transform: "translateY(-2px)", boxShadow: "0 14px 30px -18px rgba(20,16,30,0.45)" },
      "&:hover .ev-photo": { transform: "scale(1.03)" },
      "& .ev-action:hover svg": { transform: "translateX(3px)" },
    },
    "&:active": { transform: "scale(0.985)" },
    "@media (prefers-reduced-motion: reduce)": { "&, &:hover, &:active, &:hover .ev-photo, & .ev-action:hover svg": { transform: "none" } },
  },
} as const;

/** The action: the event's own link when known, else its page */
function Action({ e, past }: { e: WhatsOnEvent; past?: boolean }) {
  const own = !past && e.action?.href;
  const label = own ? e.action!.label : "See details";
  const href = own ? e.action!.href! : `/events/${e.slug}`;
  return (
    <Box mt="auto" pt="3">
      <Box
        asChild
        className="ev-action"
        display="inline-flex"
        alignItems="center"
        gap="1.5"
        minH="44px"
        fontWeight="600"
        color="brand.fg"
        textDecoration="none"
        css={{ "&:focus-visible": { outline: "3px solid var(--chakra-colors-brand-solid)", outlineOffset: "2px", borderRadius: "4px" } }}
      >
        <NextLink href={href} aria-label={own ? `${label} for ${e.title}` : `See details: ${e.title}`}>
          {label}
          <ArrowRight size={16} aria-hidden="true" />
        </NextLink>
      </Box>
    </Box>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <Box as="ul" listStyle="none" m="0" p="0" display="flex" flexWrap="wrap" gap="1.5" aria-label="Who it’s for">
      {items.map((a) => (
        <Box as="li" key={a} px="2" py="0.5" borderRadius="full" bg="bg.muted" fontSize="0.75rem" fontWeight="600" color="fg">
          {a}
        </Box>
      ))}
    </Box>
  );
}

/** The date block (decorative: the same facts are in the text) */
function DateBlock({ e, small }: { e: WhatsOnEvent; small?: boolean }) {
  const b = dateBlock(e);
  return (
    <Box
      aria-hidden="true"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minW={small ? "64px" : "68px"}
      px="2.5"
      py="2"
      borderRadius="md"
      bg="bg.canvas"
      color="fg"
      boxShadow={small ? undefined : "0 4px 14px -6px rgba(20,16,30,0.35)"}
      borderWidth={small ? "1px" : "0"}
      borderColor="border"
      textAlign="center"
      lineHeight="1"
    >
      {b ? (
        <>
          {b.top && (
            <Text as="span" fontSize="0.6875rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg" mb="1">
              {b.top}
            </Text>
          )}
          <Text as="span" fontFamily="heading" fontWeight="700" fontSize={b.main.length > 4 ? "1.125rem" : "1.5rem"}>
            {b.main}
          </Text>
        </>
      ) : (
        <Box color="brand.fg">
          <Repeat size={22} />
        </Box>
      )}
    </Box>
  );
}

/** When, in words, for the meta row and screen readers */
function whenText(e: WhatsOnEvent) {
  if (e.status === "tba") return "Date to be announced";
  if (e.status === "ongoing") return e.recurrence ?? "";
  return e.startDate ? formatRange(e.startDate, e.endDate) : "";
}

/** The full event card (month sections and "Date to be announced") */
export function WhatsOnCard({ e, past }: { e: WhatsOnEvent; past?: boolean }) {
  const when = whenText(e);
  return (
    <Box as="article" {...shell} flexDirection="column">
      <Box position="relative" aspectRatio="16 / 10" overflow="hidden" bg={past ? "night.700" : "brand.solid"}>
        {e.image ? (
          <Box className="ev-photo" position="absolute" inset="0" filter={past ? "grayscale(0.6)" : undefined}>
            <Img slot={e.image} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
          </Box>
        ) : (
          /* No photo of this event: a brand tile with its first letter */
          <Box aria-hidden="true" position="absolute" inset="0" display="flex" alignItems="flex-end" justifyContent="flex-end" p="4" overflow="hidden">
            <Text fontFamily="heading" fontWeight="700" fontSize="9rem" lineHeight="0.75" color="accent.highlight" opacity={past ? 0.5 : 1} transform="translate(6%, 12%)">
              {e.title.replace(/^[^A-Za-z0-9]+/, "").charAt(0)}
            </Text>
          </Box>
        )}
        <Box position="absolute" top="3" left="3">
          <DateBlock e={e} />
        </Box>
      </Box>

      <Stack gap="2.5" p="5" flex="1">
        <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.1875rem" lineHeight="1.25" lineClamp={2}>
          <NextLink href={`/events/${e.slug}`} className="ev-title-link">
            {e.title}
          </NextLink>
        </Heading>
        <Stack as="ul" listStyle="none" m="0" p="0" gap="1.5" fontSize="0.9375rem" color="fg.muted">
          {when && (
            <Box as="li" display="flex" gap="2" alignItems="flex-start">
              <Box as="span" mt="0.5" flexShrink={0} aria-hidden="true">
                <Clock size={16} />
              </Box>
              <span>
                {e.status === "tba" ? <strong>{when}</strong> : when}
                {e.time ? `, ${e.time}` : ""}
                {past ? " (past event)" : ""}
              </span>
            </Box>
          )}
          {e.location && (
            <Box as="li" display="flex" gap="2" alignItems="flex-start">
              <Box as="span" mt="0.5" flexShrink={0} aria-hidden="true">
                <MapPin size={16} />
              </Box>
              <span>{e.location}</span>
            </Box>
          )}
        </Stack>
        <Chips items={e.audience} />
        {e.summary && (
          <Text fontSize="0.9375rem" lineHeight="1.55" lineClamp={2}>
            {e.summary}
          </Text>
        )}
        <Action e={e} past={past} />
      </Stack>
    </Box>
  );
}

/** Compact horizontal card for the "Every week" strip */
export function WeeklyCard({ e }: { e: WhatsOnEvent }) {
  const line = [e.recurrence, e.time].filter(Boolean).join(", ");
  return (
    <Box as="article" {...shell} flexDirection="row" gap="4" p="4" alignItems="stretch">
      <Box flexShrink={0}>
        <DateBlock e={e} small />
      </Box>
      <Stack gap="1.5" flex="1" minW="0">
        <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.0625rem" lineHeight="1.25" lineClamp={2}>
          <NextLink href={`/events/${e.slug}`} className="ev-title-link">
            {e.title}
          </NextLink>
        </Heading>
        {line && (
          <Text fontSize="0.875rem" fontWeight="600" color="fg.muted">
            {line}
          </Text>
        )}
        {e.summary && (
          <Text fontSize="0.875rem" lineHeight="1.5" lineClamp={2}>
            {e.summary}
          </Text>
        )}
        <Action e={e} />
      </Stack>
    </Box>
  );
}
