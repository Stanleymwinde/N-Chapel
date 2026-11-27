import NextLink from "next/link";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import type { WhatsOnEvent } from "@content/events";
import { parseDate, TIME_ZONE } from "@/lib/dates";
import { Img } from "../Img";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

const fmt = (o: Intl.DateTimeFormatOptions, iso: string) => new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, ...o }).format(parseDate(iso));

/** The purple line above the title: "8–20 NOV", "SATURDAY 21 NOV", "EVERY THURSDAY", "DATE TO BE ANNOUNCED" */
function eyebrow(e: WhatsOnEvent): string {
  if (e.status === "tba") return "Date to be announced";
  if (e.status === "ongoing") return e.recurrence ?? "Ongoing";
  if (!e.startDate) return "";
  const s = e.startDate;
  const end = e.endDate && e.endDate !== s ? e.endDate : undefined;
  if (!end) return fmt({ weekday: "long", day: "numeric", month: "short" }, s).replace(",", "");
  const sameMonth = fmt({ month: "short", year: "numeric" }, s) === fmt({ month: "short", year: "numeric" }, end);
  return sameMonth
    ? `${fmt({ day: "numeric" }, s)}–${fmt({ day: "numeric", month: "short" }, end)}`
    : `${fmt({ day: "numeric", month: "short" }, s)} – ${fmt({ day: "numeric", month: "short" }, end)}`;
}

/**
 * The Figma "Event" card: 180px photo, purple date line, title, time, and a
 * small outline "View event" pill. The title is the one link (stretched over
 * the card with ::after); the pill is its visual cue, so it isn't a second link.
 */
export function WhatsOnCard({ e, past }: { e: WhatsOnEvent; past?: boolean }) {
  const when = eyebrow(e);
  const time = e.time;
  return (
    <Box
      as="article"
      position="relative"
      display="flex"
      flexDirection="column"
      h="100%"
      minH={{ md: "355px" }}
      borderRadius="16px"
      overflow="hidden"
      borderWidth="1px"
      borderColor="#E8E2EE"
      bg="bg.canvas"
      transition={`border-color 150ms ease, transform 200ms ${EASE}, box-shadow 200ms ${EASE}`}
      css={{
        "& .ev-title-link::after": { content: '""', position: "absolute", inset: "0", zIndex: "0" },
        "& .ev-title-link:focus-visible": { outline: "none" },
        "&:has(.ev-title-link:focus-visible)": { outline: "3px solid var(--chakra-colors-brand-solid)", outlineOffset: "3px" },
        "& .ev-photo": { transition: `transform 300ms ${EASE}` },
        "& .ev-pill": { transition: `background-color 150ms ease, color 150ms ease` },
        "& .ev-pill svg": { transition: `transform 200ms ${EASE}` },
        "@media (hover: hover) and (pointer: fine)": {
          "&:hover": { borderColor: "var(--chakra-colors-border-strong)", transform: "translateY(-2px)", boxShadow: "0 14px 30px -18px rgba(20,16,30,0.45)" },
          "&:hover .ev-photo": { transform: "scale(1.03)" },
          "&:hover .ev-pill": { backgroundColor: "var(--chakra-colors-brand-solid)", color: "white" },
          "&:hover .ev-pill svg": { transform: "translateX(3px)" },
        },
        "&:active": { transform: "scale(0.985)" },
        "@media (prefers-reduced-motion: reduce)": { "&, &:hover, &:active, &:hover .ev-photo, &:hover .ev-pill svg": { transform: "none" } },
      }}
    >
      <Box position="relative" h="180px" flexShrink={0} overflow="hidden" bg={past ? "night.700" : "brand.solid"}>
        {e.image ? (
          <Box className="ev-photo" position="absolute" inset="0" filter={past ? "grayscale(0.6)" : undefined}>
            <Img slot={e.image} decorative sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw" />
          </Box>
        ) : (
          /* No photo of this event: a brand tile with its first letter */
          <Box aria-hidden="true" position="absolute" inset="0" display="flex" alignItems="flex-end" justifyContent="flex-end" p="4" overflow="hidden">
            <Text fontFamily="heading" fontWeight="700" fontSize="8rem" lineHeight="0.75" color="accent.highlight" opacity={past ? 0.5 : 1} transform="translate(6%, 14%)">
              {e.title.replace(/^[^A-Za-z0-9]+/, "").charAt(0)}
            </Text>
          </Box>
        )}
      </Box>

      <Stack p="5" flex="1" gap="5" justifyContent="space-between">
        <Stack gap="2">
          {when && (
            <Text fontFamily="heading" fontSize="11px" lineHeight="16px" fontWeight="600" letterSpacing="0.8px" textTransform="uppercase" color="brand.fg">
              {when}
              {past && <span className="sr-only"> (past event)</span>}
            </Text>
          )}
          <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="20px" lineHeight="26px" letterSpacing="-0.25px" color="fg" lineClamp={2}>
            <NextLink href={`/events/${e.slug}`} className="ev-title-link">
              {e.title}
            </NextLink>
          </Heading>
          {time && (
            <Text fontSize="14px" color="fg.muted" lineClamp={2}>
              {time}
            </Text>
          )}
        </Stack>
        <Box>
          <Box
            className="ev-pill"
            aria-hidden="true"
            display="inline-flex"
            alignItems="center"
            gap="2"
            pl="18px"
            pr="16px"
            py="9px"
            borderRadius="full"
            borderWidth="1.5px"
            borderColor="brand.solid"
            color="brand.fg"
            fontFamily="heading"
            fontSize="14px"
            fontWeight="600"
            lineHeight="normal"
          >
            View event
            <ArrowRight size={14} />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
