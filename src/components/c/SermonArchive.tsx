"use client";

import { useState } from "react";
import { Box, Field, NativeSelect, SimpleGrid, Text } from "@chakra-ui/react";
import type { Sermon } from "@content/types";
import { SermonCard } from "../Cards";
import { FilterBarControls, FilterBarCount, FilterBarRoot } from "../recipe-parts";

/** Sermon archive filtered by series and speaker. */
export function SermonArchive({ sermons, series, speakers }: { sermons: Sermon[]; series: string[]; speakers: string[] }) {
  const [s, setS] = useState("");
  const [sp, setSp] = useState("");
  const filtered = sermons.filter((x) => (!s || x.series === s) && (!sp || x.speaker === sp));
  const selectProps = { bg: "bg.canvas", borderColor: "border.strong" } as const;

  return (
    <Box display="grid" gap="8">
      <FilterBarRoot role="group" aria-label="Filter sermons">
        <FilterBarControls>
          <Field.Root>
            <Field.Label textStyle="label">Series</Field.Label>
            <NativeSelect.Root size="lg">
              <NativeSelect.Field value={s} onChange={(e) => setS(e.target.value)} {...selectProps}>
                <option value="">All series</option>
                {series.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label textStyle="label">Speaker</Field.Label>
            <NativeSelect.Root size="lg">
              <NativeSelect.Field value={sp} onChange={(e) => setSp(e.target.value)} {...selectProps}>
                <option value="">All speakers</option>
                {speakers.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>
        </FilterBarControls>
        <FilterBarCount aria-live="polite" aria-atomic="true">
          Showing {filtered.length} sermon{filtered.length === 1 ? "" : "s"}
        </FilterBarCount>
      </FilterBarRoot>

      {filtered.length > 0 ? (
        <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, sm: 2, lg: 3 }} gap="5">
          {filtered.map((x) => (
            <li key={x.slug}>
              <SermonCard sermon={x} />
            </li>
          ))}
        </SimpleGrid>
      ) : (
        <Box p="8" borderRadius="lg" borderWidth="1px" borderStyle="dashed" borderColor="border.strong" textAlign="center">
          <Text fontWeight="600">No sermons match this series and speaker.</Text>
          <Text color="fg.muted" mt="1">
            Choose “All series” or “All speakers” to see more.
          </Text>
        </Box>
      )}
    </Box>
  );
}
