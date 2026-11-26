"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Field, NativeSelect, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import type { Group, GroupAudience } from "@content/types";
import { GroupCard } from "../Cards";
import { Button } from "../Button";
import { RichText } from "../RichText";
import { FilterBarChip, FilterBarChips, FilterBarControls, FilterBarCount, FilterBarRoot } from "../recipe-parts";

type Props = {
  groups: Group[];
  audiences: GroupAudience[];
  areas: string[];
  /** shown under the Area select when no zones are configured yet */
  areasTodo?: string;
  /**
   * "form": the join form is on this page at #join (prefills via event).
   * "page": links to /get-involved/groups?group=…#join.
   */
  joinMode: "form" | "page";
  headingLevel?: "h2" | "h3";
};

const ALL = "All";

function readParams() {
  const p = new URLSearchParams(window.location.search);
  return { who: p.get("who"), area: p.get("area") };
}

/**
 * Group finder: "Who it's for" chips + Area select. Filters are kept in the
 * URL (?who=Women&area=…) so results are shareable; the count is announced
 * via aria-live.
 */
export function GroupFinder({ groups, audiences, areas, areasTodo, joinMode, headingLevel = "h3" }: Props) {
  const [who, setWho] = useState<string>(ALL);
  const [area, setArea] = useState<string>("");

  // Read filters from the URL after hydration (pages are statically generated)
  useEffect(() => {
    const { who: w, area: a } = readParams();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL is only readable after hydration
    if (w && (audiences as string[]).includes(w)) setWho(w);
    if (a && areas.includes(a)) setArea(a);
  }, [audiences, areas]);

  const update = (nextWho: string, nextArea: string) => {
    setWho(nextWho);
    setArea(nextArea);
    const url = new URL(window.location.href);
    if (nextWho === ALL) url.searchParams.delete("who");
    else url.searchParams.set("who", nextWho);
    if (!nextArea) url.searchParams.delete("area");
    else url.searchParams.set("area", nextArea);
    window.history.replaceState(null, "", url);
  };

  const results = useMemo(
    () => groups.filter((g) => (who === ALL || g.audience === who) && (!area || !g.area || g.area === area)),
    [groups, who, area],
  );

  // "Join this group" on the same page: preselect the group in the form, then let the #join link scroll
  const onResultsClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (joinMode !== "form") return;
    const a = (e.target as HTMLElement).closest("a");
    if (!a) return;
    const href = a.getAttribute("href") ?? "";
    if (!href.includes("#join")) return;
    const slug = new URL(href, window.location.href).searchParams.get("group");
    const group = groups.find((g) => g.slug === slug);
    if (group) window.dispatchEvent(new CustomEvent("nc:prefill", { detail: { group: group.name } }));
  };

  const joinHref = (g: Group) => (joinMode === "form" ? `?group=${g.slug}#join` : `/get-involved/groups?group=${g.slug}#join`);
  const noAreas = areas.length === 0;

  return (
    <Stack gap="8">
      <FilterBarRoot role="search" aria-label="Filter groups">
        <Stack gap="3">
          <Text id="who-label" textStyle="label" color="fg">
            Who it&apos;s for
          </Text>
          <FilterBarChips role="group" aria-labelledby="who-label">
            {[ALL, ...audiences].map((a) => (
              <li key={a}>
                <FilterBarChip type="button" aria-pressed={who === a} onClick={() => update(a, area)}>
                  {a === ALL ? "All groups" : a}
                </FilterBarChip>
              </li>
            ))}
          </FilterBarChips>
        </Stack>
        <FilterBarControls>
          <Field.Root disabled={noAreas}>
            <Field.Label textStyle="label">Area</Field.Label>
            <NativeSelect.Root size="lg">
              <NativeSelect.Field value={area} onChange={(e) => update(who, e.target.value)} bg="bg.canvas" borderColor="border.strong">
                <option value="">All areas</option>
                {areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            {noAreas && areasTodo && (
              <Field.HelperText color="fg.muted">
                Area filtering is coming soon. <RichText text={areasTodo} />
              </Field.HelperText>
            )}
          </Field.Root>
        </FilterBarControls>
        <FilterBarCount aria-live="polite" aria-atomic="true">
          {results.length === 1 ? "1 group" : `${results.length} groups`}
          {who !== ALL ? ` for ${who.toLowerCase()}` : ""}
          {area ? ` in ${area}` : ""}
        </FilterBarCount>
      </FilterBarRoot>

      {results.length === 0 ? (
        <Box p={{ base: "6", md: "8" }} borderRadius="lg" borderWidth="1px" borderStyle="dashed" borderColor="border.strong">
          <Stack gap="3" alignItems="flex-start">
            <Text textStyle="h4">No groups match those filters yet</Text>
            <Text color="fg.muted">Try another filter, or tell us what you&apos;re looking for and we&apos;ll help you find a group.</Text>
            <Button variant="secondary" onClick={() => update(ALL, "")}>
              Show all groups
            </Button>
          </Stack>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: "5", md: "6" }} onClick={onResultsClick}>
          {results.map((g) => (
            // Images are reserved for featured cards; the finder stays light on data
            <GroupCard key={g.slug} group={{ ...g, image: undefined }} joinHref={joinHref(g)} headingLevel={headingLevel} />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
}
