"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Button, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { WhatsOnEvent } from "@content/events";
import type { Audience } from "@content/types";
import { isUpcoming, monthKey, monthName, nairobiToday } from "@/lib/events";
import { FilterBarChip, FilterBarChips, FilterBarRoot } from "../recipe-parts";
import { WhatsOnCard } from "../events/WhatsOnCard";

type Props = { events: WhatsOnEvent[]; audiences: Audience[]; today: string };

const cardGrid = { as: "ul", listStyle: "none", m: "0", p: "0", columns: { base: 1, sm: 2, lg: 3 }, gap: "6" } as const;

/** Figma "Filter chip": 16×10 padding, 15px regular, #D9D3DF border */
const chip = { minH: "40px", px: "4", py: "2.5", fontWeight: "400", borderColor: "#D9D3DF", lineHeight: "normal" } as const;

/**
 * What's on: audience chips and an Upcoming/Past switch, then the month bar
 * and that month's events (as in the Figma "Listing"), then the "Every week"
 * events (ongoing) and "Date to be announced", all as the same card.
 * `today` comes from the server render and is re-read in the browser, so a
 * page served from cache never shows an event that has ended as upcoming.
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

  /** Figma "Next month": white pill, 12px semibold tracked caps + chevron */
  const monthButton = (target: { key: string }, dir: "prev" | "next") => (
    <Box
      as="button"
      onClick={() => setIndex(dir === "prev" ? i - 1 : i + 1)}
      aria-label={`Show ${monthName(target.key)}`}
      display="inline-flex"
      alignItems="center"
      gap="2"
      minH="36px"
      pl={dir === "next" ? "18px" : "14px"}
      pr={dir === "next" ? "14px" : "18px"}
      py="9px"
      borderRadius="full"
      bg="bg.canvas"
      color="fg"
      fontFamily="heading"
      fontSize="12px"
      fontWeight="600"
      letterSpacing="0.72px"
      textTransform="uppercase"
      cursor="pointer"
      transition="background-color 150ms ease, color 150ms ease"
      _hover={{ bg: "brand.solid", color: "white" }}
      _focusVisible={{ outline: "3px solid var(--chakra-colors-brand-solid)", outlineOffset: "2px" }}
    >
      {dir === "prev" && <ChevronLeft size={13} aria-hidden="true" />}
      <Box as="span" display={{ base: "none", md: "inline" }}>
        {monthName(target.key).split(" ")[0]}
      </Box>
      {dir === "next" && <ChevronRight size={13} aria-hidden="true" />}
    </Box>
  );

  return (
    <Stack gap={{ base: "14", md: "20" }}>
      {/* Filters, month bar and this month's events */}
      <Stack gap="7">
        <FilterBarRoot role="group" aria-label="Filter events" p="0" bg="transparent" borderWidth="0" borderRadius="0" display="flex" flexDirection={{ base: "column", lg: "row" }} justifyContent="space-between" gap="4" alignItems={{ lg: "center" }}>
          <FilterBarChips aria-label="Who it's for">
            {(["All", ...audiences] as const).map((a) => (
              <li key={a}>
                <FilterBarChip type="button" {...chip} aria-pressed={audience === a} onClick={() => setAudience(a)}>
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
                  {...chip}
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

        <Box as="section" aria-labelledby="month-heading" display="grid" gap="7">
          <Box display="grid" gridTemplateColumns="1fr auto 1fr" alignItems="center" gap="3" bg="#EEEDF2" borderRadius="12px" px="3" py="10px" minH="56px">
            <Box justifySelf="start">{prev && monthButton(prev, "prev")}</Box>
            <Heading as="h2" id="month-heading" fontFamily="heading" fontWeight="500" fontSize={{ base: "18px", md: "21px" }} lineHeight="normal" textAlign="center" aria-live="polite">
              {current ? monthName(current.key) : upcomingView ? "No dated events coming up" : "No past events"}
            </Heading>
            <Box justifySelf="end">{next && monthButton(next, "next")}</Box>
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
            <Box p="8" borderRadius="16px" borderWidth="1px" borderStyle="dashed" borderColor="border.strong" textAlign="center">
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
      </Stack>

      {/* Every week */}
      {weekly.length > 0 && (
        <Box as="section" aria-labelledby="every-week">
          <Heading as="h2" id="every-week" textStyle="h3" mb="6">
            Every week
          </Heading>
          <SimpleGrid {...cardGrid}>
            {weekly.map((e) => (
              <li key={e.slug}>
                <WhatsOnCard e={e} />
              </li>
            ))}
          </SimpleGrid>
        </Box>
      )}

      {/* Date to be announced */}
      {tba.length > 0 && (
        <Box as="section" aria-labelledby="tba-heading">
          <Heading as="h2" id="tba-heading" textStyle="h3" mb="2">
            Date to be announced
          </Heading>
          <Text color="fg.muted" mb="6">
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
