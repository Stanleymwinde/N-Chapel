"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Button, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { WhatsOnEvent } from "@content/events";
import type { Audience } from "@content/types";
import { isUpcoming, monthKey, monthName, nairobiToday } from "@/lib/events";
import { FilterBarChip, FilterBarChips, FilterBarRoot } from "../recipe-parts";
import { WeeklyCard, WhatsOnCard } from "../events/WhatsOnCard";

type Props = { events: WhatsOnEvent[]; audiences: Audience[]; today: string };

const cardGrid = { as: "ul", listStyle: "none", m: "0", p: "0", columns: { base: 1, sm: 2, lg: 3 }, gap: { base: "5", md: "6" } } as const;

/**
 * What's on: audience chips and an Upcoming/Past switch over three groups,
 * in order: the "Every week" strip (ongoing), the month navigator (dated),
 * then "Date to be announced". `today` comes from the server render and is
 * re-read in the browser, so a page served from cache never shows an event
 * that has ended as upcoming.
 */
export function EventCalendar({ events, audiences, today: serverToday }: Props) {
  const [view, setView] = useState<"upcoming" | "past">("upcoming");
  const [audience, setAudience] = useState<Audience | "All">("All");
  const [today, setToday] = useState(serverToday);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = nairobiToday();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the clock must happen after hydration
    if (t !== serverToday) setToday(t);
  }, [serverToday]);

  // Also read ?audience=Children (used by links from ministry pages)
  useEffect(() => {
    const a = new URLSearchParams(window.location.search).get("audience");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the URL is only known in the browser
    if (a && (audiences as string[]).includes(a)) setAudience(a as Audience);
  }, [audiences]);

  const forAudience = (e: WhatsOnEvent) => audience === "All" || e.audience.includes(audience);

  const upcomingView = view === "upcoming";
  const weekly = upcomingView ? events.filter((e) => e.status === "ongoing" && forAudience(e)) : [];
  const tba = upcomingView ? events.filter((e) => e.status === "tba" && forAudience(e)) : [];

  // Months come from every dated event in this view, so the navigator stays put while filtering
  const months = useMemo(() => {
    const dated = events.filter((e) => e.status === "dated" && e.startDate && isUpcoming(e, today) === upcomingView);
    const map = new Map<string, WhatsOnEvent[]>();
    for (const e of dated) {
      const k = monthKey(e.startDate!);
      map.set(k, [...(map.get(k) ?? []), e]);
    }
    const keys = [...map.keys()].sort();
    if (!upcomingView) keys.reverse();
    return keys.map((k) => ({ key: k, events: map.get(k)!.sort((a, b) => (a.startDate! < b.startDate! ? -1 : 1) * (upcomingView ? 1 : -1)) }));
  }, [events, today, upcomingView]);

  const i = Math.min(index, Math.max(months.length - 1, 0));
  const current = months[i];
  const prev = months[i - 1];
  const next = months[i + 1];
  const shown = current ? current.events.filter(forAudience) : [];
  const clearAudience = () => setAudience("All");

  return (
    <Stack gap={{ base: "10", md: "14" }}>
      {/* Filters */}
      <FilterBarRoot role="group" aria-label="Filter events" p="0" bg="transparent" borderWidth="0" borderRadius="0" display="flex" flexDirection={{ base: "column", lg: "row" }} justifyContent="space-between" gap="4" alignItems={{ lg: "center" }}>
        <FilterBarChips aria-label="Who it's for">
          {(["All", ...audiences] as const).map((a) => (
            <li key={a}>
              <FilterBarChip type="button" aria-pressed={audience === a} onClick={() => setAudience(a)}>
                {a === "All" ? "All events" : a}
              </FilterBarChip>
            </li>
          ))}
        </FilterBarChips>
        <FilterBarChips aria-label="Show">
          {(["upcoming", "past"] as const).map((v) => (
            <li key={v}>
              <FilterBarChip
                type="button"
                aria-pressed={view === v}
                onClick={() => {
                  setView(v);
                  setIndex(0);
                }}
              >
                {v === "upcoming" ? "Upcoming" : "Past events"}
              </FilterBarChip>
            </li>
          ))}
        </FilterBarChips>
      </FilterBarRoot>

      {/* 1. Every week */}
      {weekly.length > 0 && (
        <Box as="section" aria-labelledby="every-week">
          <Heading as="h2" id="every-week" textStyle="h3" mb="5">
            Every week
          </Heading>
          <Box
            as="ul"
            listStyle="none"
            m="0"
            p="0"
            display={{ base: "flex", md: "grid" }}
            gridTemplateColumns={{ md: "repeat(2, minmax(0, 1fr))" }}
            gap={{ base: "4", md: "5" }}
            overflowX={{ base: "auto", md: "visible" }}
            mx={{ base: "-5", md: "0" }}
            px={{ base: "5", md: "0" }}
            pb={{ base: "2", md: "0" }}
            css={{ scrollSnapType: "x mandatory", scrollPaddingInline: "20px", "@media (min-width: 48em)": { scrollSnapType: "none" } }}
          >
            {weekly.map((e) => (
              <Box as="li" key={e.slug} flex={{ base: "0 0 85%", sm: "0 0 60%", md: "initial" }} css={{ scrollSnapAlign: "start" }}>
                <WeeklyCard e={e} />
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* 2. Month by month */}
      <Box as="section" aria-labelledby="month-heading">
        <Box position="relative" bg="bg.muted" borderRadius="lg" minH="64px" display="flex" alignItems="center" justifyContent="center" px={{ base: "16", md: "40" }} mb={{ base: "6", md: "8" }}>
          <Heading as="h2" id="month-heading" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.125rem", md: "1.375rem" }} textAlign="center" aria-live="polite">
            {current ? monthName(current.key) : upcomingView ? "No dated events coming up" : "No past events"}
          </Heading>
          <HStack position="absolute" left="3" top="50%" transform="translateY(-50%)">
            {prev && (
              <Button size="md" variant="secondary" bg="bg.canvas" borderWidth="1px" borderColor="border" color="fg" onClick={() => setIndex(i - 1)} aria-label={`Show ${monthName(prev.key)}`}>
                <ChevronLeft aria-hidden="true" />
                <Box as="span" display={{ base: "none", md: "inline" }} textTransform="uppercase" fontSize="0.75rem" letterSpacing="0.06em">
                  {monthName(prev.key).split(" ")[0]}
                </Box>
              </Button>
            )}
          </HStack>
          <HStack position="absolute" right="3" top="50%" transform="translateY(-50%)">
            {next && (
              <Button size="md" variant="secondary" bg="bg.canvas" borderWidth="1px" borderColor="border" color="fg" onClick={() => setIndex(i + 1)} aria-label={`Show ${monthName(next.key)}`}>
                <Box as="span" display={{ base: "none", md: "inline" }} textTransform="uppercase" fontSize="0.75rem" letterSpacing="0.06em">
                  {monthName(next.key).split(" ")[0]}
                </Box>
                <ChevronRight aria-hidden="true" />
              </Button>
            )}
          </HStack>
        </Box>

        {shown.length > 0 ? (
          <SimpleGrid {...cardGrid}>
            {shown.map((e) => (
              <li key={e.slug}>
                <WhatsOnCard e={e} past={!upcomingView} />
              </li>
            ))}
          </SimpleGrid>
        ) : (
          <Box p="8" borderRadius="lg" borderWidth="1px" borderStyle="dashed" borderColor="border.strong" textAlign="center">
            <Text fontWeight="600">
              {current && audience !== "All"
                ? `Nothing on for ${audience} this month.`
                : upcomingView
                  ? "No dated events yet. New dates will appear here."
                  : "Nothing in the archive yet."}
            </Text>
            {audience !== "All" && (
              <Button mt="4" variant="secondary" onClick={clearAudience}>
                See all events
              </Button>
            )}
          </Box>
        )}
      </Box>

      {/* 3. Date to be announced */}
      {tba.length > 0 && (
        <Box as="section" aria-labelledby="tba-heading">
          <Heading as="h2" id="tba-heading" textStyle="h3" mb="2">
            Date to be announced
          </Heading>
          <Text color="fg.muted" mb="5">
            Coming up. Dates will be added here as soon as they’re set.
          </Text>
          <SimpleGrid {...cardGrid}>
            {tba.map((e) => (
              <li key={e.slug}>
                <WhatsOnCard e={e} />
              </li>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Stack>
  );
}
