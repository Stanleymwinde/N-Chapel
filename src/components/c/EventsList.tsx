"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Field, NativeSelect, SimpleGrid, Text } from "@chakra-ui/react";
import type { EventEntry } from "@content/events";
import type { Audience, EventType } from "@content/types";
import { isExpired } from "@/lib/dates";
import {
  FilterBarChip,
  FilterBarChips,
  FilterBarControls,
  FilterBarCount,
  FilterBarRoot,
} from "../recipe-parts";
import { EventItem } from "./EventItem";

type Props = {
  upcoming: EventEntry[];
  archived: EventEntry[];
  audiences: Audience[];
};

/**
 * Upcoming / past events with audience chips and a type select.
 * Lists are computed at build time; on load we re-check expiry in the
 * browser so anything that ended since the last build moves to "Past".
 */
export function EventsList({ upcoming, archived, audiences }: Props) {
  const [view, setView] = useState<"upcoming" | "past">("upcoming");
  const [audience, setAudience] = useState<Audience | "All">("All");
  const [type, setType] = useState<EventType | "">("");
  const [lists, setLists] = useState({ upcoming, archived });

  useEffect(() => {
    const now = new Date();
    const stillLive = upcoming.filter((e) => !isExpired(e, now));
    if (stillLive.length !== upcoming.length) {
      const ended = upcoming.filter((e) => isExpired(e, now));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the clock must happen after hydration
      setLists({ upcoming: stillLive, archived: [...ended, ...archived] });
    }
  }, [upcoming, archived]);

  const source = view === "upcoming" ? lists.upcoming : lists.archived;
  const types = useMemo(
    () => Array.from(new Set([...lists.upcoming, ...lists.archived].map((e) => e.type))).sort(),
    [lists],
  );
  const filtered = source.filter(
    (e) => (audience === "All" || e.audience.includes(audience)) && (!type || e.type === type),
  );

  const countLabel = `${filtered.length} ${view === "upcoming" ? "upcoming" : "past"} event${filtered.length === 1 ? "" : "s"}`;

  return (
    <Box display="grid" gap="8">
      <FilterBarRoot role="group" aria-label="Filter events">
        <FilterBarChips aria-label="Show">
          {(["upcoming", "past"] as const).map((v) => (
            <li key={v}>
              <FilterBarChip type="button" aria-pressed={view === v} onClick={() => setView(v)}>
                {v === "upcoming" ? "Upcoming" : "Past events"}
              </FilterBarChip>
            </li>
          ))}
        </FilterBarChips>
        <FilterBarControls>
          <Box>
            <Text id="audience-label" textStyle="label" mb="2">
              Who it&apos;s for
            </Text>
            <FilterBarChips aria-labelledby="audience-label">
              {(["All", ...audiences] as const).map((a) => (
                <li key={a}>
                  <FilterBarChip type="button" aria-pressed={audience === a} onClick={() => setAudience(a)}>
                    {a === "All" ? "Everyone and all ages" : a}
                  </FilterBarChip>
                </li>
              ))}
            </FilterBarChips>
          </Box>
          <Field.Root maxW={{ md: "260px" }}>
            <Field.Label textStyle="label">Type of event</Field.Label>
            <NativeSelect.Root size="lg">
              <NativeSelect.Field value={type} onChange={(e) => setType(e.target.value as EventType | "")} bg="bg.canvas" borderColor="border.strong">
                <option value="">All types</option>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>
        </FilterBarControls>
        <FilterBarCount aria-live="polite" aria-atomic="true">
          Showing {countLabel}
        </FilterBarCount>
      </FilterBarRoot>

      {filtered.length > 0 ? (
        <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, md: 2 }} gap="5">
          {filtered.map((e) => (
            <li key={e.slug}>
              <EventItem event={e} archived={view === "past"} />
            </li>
          ))}
        </SimpleGrid>
      ) : (
        <Box p="8" borderRadius="lg" borderWidth="1px" borderStyle="dashed" borderColor="border.strong" textAlign="center">
          <Text fontWeight="600">No {view === "upcoming" ? "upcoming" : "past"} events match these filters.</Text>
          <Text color="fg.muted" mt="1">
            Try “Everyone and all ages” or a different type of event.
          </Text>
        </Box>
      )}
    </Box>
  );
}
