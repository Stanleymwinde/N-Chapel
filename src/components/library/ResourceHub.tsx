"use client";

import { useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Accordion, Box, Button, Field, Heading, HStack, Input, NativeSelect, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ChevronDown, Search } from "lucide-react";
import type { LibraryAudience, Resource, Season, Series } from "@content/library/types";
import { AUDIENCE_LABELS, MONTHS } from "@content/library/types";
import { byNewest } from "@content/library/resources";
import { getSection, SECTIONS, sectionFromParam, type SectionKey } from "@content/library/sections";
import { QuestWeekCard, ResourceCard, SeasonCard, SeriesCard } from "./LibraryCards";

type Props = {
  series: Series[];
  seasons: Season[];
  resources: Resource[];
  /** set on a section page (/resources/bible-studies …): the Type filter comes from the route */
  section?: SectionKey;
  /** the series featured in "This week" (left out of Past series) */
  featuredSlug?: string;
};

const PAGE_SIZE = 24;
const AUDIENCES = Object.keys(AUDIENCE_LABELS) as LibraryAudience[];
/** Quest Kids: months shown before "Show earlier months" */
const MONTHS_SHOWN = 6;

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

function Grid({ children, count }: { children: React.ReactNode; count?: number }) {
  // Three items fill a three-column row instead of leaving a hole in four.
  return (
    <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, sm: 2, lg: count === 3 ? 3 : 4 }} gap={{ base: "5", md: "6" }}>
      {children}
    </SimpleGrid>
  );
}

function Block({ id, title, more, children }: { id: string; title: string; more?: { href: string; label: string }; children: React.ReactNode }) {
  return (
    <Box as="section" aria-labelledby={id}>
      <HStack justifyContent="space-between" alignItems="baseline" mb="5" gap="4" flexWrap="wrap">
        <Heading as="h2" id={id} textStyle="h3">
          {title}
        </Heading>
        {more && (
          <Box asChild color="brand.fg" fontWeight="600" textDecoration="underline" textUnderlineOffset="0.25em" minH="44px" display="inline-flex" alignItems="center">
            <NextLink href={more.href}>{more.label}</NextLink>
          </Box>
        )}
      </HStack>
      {children}
    </Box>
  );
}

/** A prayer & fasting entry: a season of several guides, or one guide on its own */
type PfEntry = { kind: "season"; season: Season; guides: Resource[]; audiences: LibraryAudience[] } | { kind: "item"; r: Resource };
const pfYm = (e: PfEntry) => (e.kind === "season" ? e.season.year * 100 + e.season.month : (e.r.year ?? 0) * 100 + (e.r.month ?? 0));

function PfCard({ e }: { e: PfEntry }) {
  return e.kind === "season" ? <SeasonCard season={e.season} audiences={e.audiences} guideCount={e.guides.length} /> : <ResourceCard r={e.r} />;
}

/** Quest Kids, grouped by month (newest first), with the older months behind a button */
function QuestMonths({ items }: { items: Resource[] }) {
  const [all, setAll] = useState(false);
  const groups = useMemo(() => {
    const m = new Map<number, Resource[]>();
    for (const r of items) {
      const k = (r.year ?? 0) * 100 + (r.month ?? 0);
      m.set(k, [...(m.get(k) ?? []), r]);
    }
    return [...m.entries()]
      .sort(([a], [b]) => b - a)
      .map(([k, list]) => ({
        key: k,
        label: k % 100 ? `${MONTHS[(k % 100) - 1]} ${Math.floor(k / 100)}` : "Undated",
        // crafts by week, then the devotional
        list: list.sort((a, b) => Number(a.type === "kids-devotional") - Number(b.type === "kids-devotional") || Number(a.week ?? 0) - Number(b.week ?? 0)),
      }));
  }, [items]);
  const shown = all ? groups : groups.slice(0, MONTHS_SHOWN);
  return (
    <Stack gap={{ base: "10", md: "12" }}>
      {shown.map((g) => (
        <Box as="section" key={g.key} aria-labelledby={`qm-${g.key}`}>
          <Heading as="h2" id={`qm-${g.key}`} textStyle="h3" mb="4">
            {g.label}
          </Heading>
          <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 2, sm: 3, md: 4, lg: 5 }} gap={{ base: "4", md: "5" }}>
            {g.list.map((r) => (
              <li key={r.slug}>
                <QuestWeekCard r={r} />
              </li>
            ))}
          </SimpleGrid>
        </Box>
      ))}
      {groups.length > MONTHS_SHOWN && (
        <Box>
          <Button variant="secondary" aria-expanded={all} onClick={() => setAll((v) => !v)}>
            {all ? "Show fewer months" : `Show earlier months (${groups.length - MONTHS_SHOWN})`}
            <Box as="span" display="inline-flex" transition="transform 200ms cubic-bezier(0.23, 1, 0.32, 1)" transform={all ? "rotate(180deg)" : undefined}>
              <ChevronDown aria-hidden="true" />
            </Box>
          </Button>
        </Box>
      )}
    </Stack>
  );
}

/**
 * Resource Library browser: Type / Audience / Series filters and a search box,
 * synced to the URL. On the hub, choosing a Type opens that section's page; on
 * a section page the Type comes from the route. With no other filters, the hub
 * shows the browse blocks and the past-series archive, and a section page shows
 * its own view (Quest Kids by month).
 */
export function ResourceHub({ series, seasons, resources, section, featuredSlug }: Props) {
  const params = useSearchParams();
  const router = useRouter();
  // Until hydrated, keep the site-wide scroll reveal off these cards (it would change their attributes mid-hydration)
  const [hydrated, setHydrated] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- marks hydration
  useEffect(() => setHydrated(true), []);
  const pathname = usePathname();

  const type: SectionKey | "" = section ?? sectionFromParam(params.get("type"));
  const typeSection = type ? getSection(type) : undefined;
  const audience = (params.get("audience") as LibraryAudience | null) ?? "";
  const seriesSlug = params.get("series") ?? "";
  const q = params.get("q") ?? "";
  const page = Math.max(1, Number(params.get("page") ?? 1) || 1);
  const extra = Boolean(audience || seriesSlug || q);
  const filtered = Boolean(type || extra);

  const rest = (drop: string[]) => {
    const next = new URLSearchParams(params.toString());
    for (const k of drop) next.delete(k);
    return next.toString() ? `?${next}` : "";
  };

  const set = (key: string, value: string) => {
    if (key === "type") {
      // A Type is a page of its own
      const target = value ? `/resources/${getSection(value as SectionKey).slug}` : "/resources";
      router.push(`${target}${rest(["type", "page", ...(value && value !== "bible-study" ? ["series"] : [])])}`, { scroll: false });
      return;
    }
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.delete("page");
    router.replace(`${pathname}${next.toString() ? `?${next}` : ""}`, { scroll: false });
  };

  const inType = (t: Resource["type"]) => !typeSection || typeSection.types.includes(t);

  const weekCount = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of resources) if (r.seriesSlug) m.set(r.seriesSlug, (m.get(r.seriesSlug) ?? 0) + 1);
    return m;
  }, [resources]);

  const seasonInfo = useMemo(() => {
    const m = new Map<string, { audiences: LibraryAudience[]; guides: Resource[] }>();
    for (const r of resources) {
      if (!r.season) continue;
      const cur = m.get(r.season) ?? { audiences: [], guides: [] };
      cur.guides.push(r);
      for (const a of r.audience) if (!cur.audiences.includes(a)) cur.audiences.push(a);
      m.set(r.season, cur);
    }
    return m;
  }, [resources]);

  /** Seasons with one guide show that guide; seasons with several show as one card */
  const multi = (slug: string) => (seasonInfo.get(slug)?.guides.length ?? 0) > 1;

  // ---------- filtered results ----------
  const results = useMemo(() => {
    const nq = norm(q.trim());
    const hit = (...fields: (string | undefined)[]) => !nq || fields.some((f) => f && norm(f).includes(nq));

    const matchSeries = series
      .filter((s) => inType(s.type) && (!audience || s.audience.includes(audience)) && (!seriesSlug || s.slug === seriesSlug))
      .filter((s) => hit(s.title, s.book))
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const matchSeasons: PfEntry[] = [...seasons]
      .filter((s) => !seriesSlug && inType("prayer-fasting") && multi(s.slug))
      .map((s) => ({ s, info: seasonInfo.get(s.slug)! }))
      .filter(({ s, info }) => (!audience || info.audiences.includes(audience)) && hit(s.title, ...info.guides.map((g) => g.title)))
      .map(({ s, info }) => ({ kind: "season" as const, season: s, guides: info.guides, audiences: info.audiences }));

    const matchItems = resources
      .filter((r) => {
        if (seriesSlug) return r.seriesSlug === seriesSlug && hit(r.title);
        if (r.seriesSlug || (r.season && multi(r.season))) return false; // shown through their series/season card
        return inType(r.type) && (!audience || r.audience.includes(audience)) && hit(r.title);
      })
      .sort(seriesSlug ? () => 0 : byNewest);

    return { matchSeries: seriesSlug ? [] : matchSeries, matchSeasons, matchItems, seriesOnly: seriesSlug ? series.find((s) => s.slug === seriesSlug) : undefined };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, type, audience, seriesSlug, series, seasons, resources, seasonInfo]);

  // Prayer & fasting: seasons and single guides in one list, newest first
  const pfMerged = useMemo(
    () =>
      [...results.matchSeasons, ...results.matchItems.filter((r) => r.type === "prayer-fasting").map((r) => ({ kind: "item" as const, r }))].sort(
        (a, b) => pfYm(b) - pfYm(a),
      ),
    [results],
  );
  const otherItems = type === "prayer-fasting" ? results.matchItems.filter((r) => r.type !== "prayer-fasting") : results.matchItems;

  const totalItems = otherItems.length;
  const pages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const pageItems = otherItems.slice((Math.min(page, pages) - 1) * PAGE_SIZE, Math.min(page, pages) * PAGE_SIZE);
  const count = results.matchSeries.length + (type === "prayer-fasting" ? pfMerged.length : results.matchSeasons.length) + totalItems;
  const questView = type === "quest-kids" && !extra;

  // ---------- default (unfiltered hub) ----------
  const latestPf = useMemo(() => {
    const all: PfEntry[] = [
      ...seasons.filter((s) => multi(s.slug)).map((s) => ({ kind: "season" as const, season: s, guides: seasonInfo.get(s.slug)!.guides, audiences: seasonInfo.get(s.slug)!.audiences })),
      ...resources.filter((r) => r.type === "prayer-fasting" && !(r.season && multi(r.season))).map((r) => ({ kind: "item" as const, r })),
    ];
    return all.sort((a, b) => pfYm(b) - pfYm(a)).slice(0, 4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seasons, resources, seasonInfo]);
  const family = resources.filter((r) => r.type === "family-worship").sort(byNewest);
  const kids = resources.filter((r) => (r.type === "kids-craft" || r.type === "kids-devotional") && !r.season).sort(byNewest).slice(0, 4);
  const past = useMemo(() => {
    const EARLIER = "Earlier series";
    const groups = new Map<string, Series[]>();
    for (const s of series.filter((x) => x.slug !== featuredSlug).sort((a, b) => a.sortOrder - b.sortOrder)) {
      const k = s.year ? String(s.year) : EARLIER;
      groups.set(k, [...(groups.get(k) ?? []), s]);
    }
    return [...groups.entries()].sort(([a], [b]) => (a === EARLIER ? 1 : b === EARLIER ? -1 : Number(b) - Number(a)));
  }, [series, featuredSlug]);

  const selectStyle = { bg: "bg.canvas", borderColor: "border.strong" } as const;
  const showSeriesFilter = !type || type === "bible-study";
  const sectionName = typeSection?.title;

  return (
    <Stack gap={{ base: "10", md: "14" }} data-no-reveal={hydrated ? undefined : ""}>
      {/* Filter bar */}
      <Box as="form" role="search" aria-label="Filter the resource library" onSubmit={(e) => e.preventDefault()} p={{ base: "4", md: "5" }} borderRadius="lg" bg="bg.warm" borderWidth="1px" borderColor="border">
        <SimpleGrid columns={{ base: 1, md: 2, lg: showSeriesFilter ? 4 : 3 }} gap="4" alignItems="end">
          <Field.Root>
            <Field.Label fontWeight="600">Search</Field.Label>
            <Box position="relative" w="100%">
              <Box position="absolute" left="3" top="50%" transform="translateY(-50%)" color="fg.muted" aria-hidden="true" zIndex="1">
                <Search size={18} />
              </Box>
              <Input type="search" size="lg" ps="10" placeholder="Title, book or month" value={q} onChange={(e) => set("q", e.target.value)} {...selectStyle} />
            </Box>
          </Field.Root>
          <Field.Root>
            <Field.Label fontWeight="600">Type</Field.Label>
            <NativeSelect.Root size="lg">
              <NativeSelect.Field value={type} onChange={(e) => set("type", e.target.value)} {...selectStyle}>
                <option value="">All types</option>
                {SECTIONS.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.title}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label fontWeight="600">Audience</Field.Label>
            <NativeSelect.Root size="lg">
              <NativeSelect.Field value={audience} onChange={(e) => set("audience", e.target.value)} {...selectStyle}>
                <option value="">Everyone</option>
                {AUDIENCES.map((a) => (
                  <option key={a} value={a}>
                    {AUDIENCE_LABELS[a]}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>
          {showSeriesFilter && (
            <Field.Root>
              <Field.Label fontWeight="600">Series</Field.Label>
              <NativeSelect.Root size="lg">
                <NativeSelect.Field value={seriesSlug} onChange={(e) => set("series", e.target.value)} {...selectStyle}>
                  <option value="">All series</option>
                  {[...series].sort((a, b) => a.sortOrder - b.sortOrder).map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
          )}
        </SimpleGrid>
        <HStack justifyContent="space-between" mt="4" gap="3" flexWrap="wrap">
          <Text fontSize="0.9375rem" color="fg.muted" aria-live="polite" aria-atomic="true">
            {extra || (type && !section) ? `${count} result${count === 1 ? "" : "s"}` : section ? `Showing everything in ${sectionName}` : "Showing everything"}
          </Text>
          {(extra || (type && !section)) && (
            <Button variant="link" onClick={() => router.replace(pathname, { scroll: false })}>
              Clear filters
            </Button>
          )}
        </HStack>
      </Box>

      {questView ? (
        <QuestMonths items={resources.filter((r) => r.type === "kids-craft" || r.type === "kids-devotional")} />
      ) : filtered ? (
        <Stack gap={{ base: "10", md: "12" }}>
          {results.seriesOnly && (
            <Box>
              <Text color="fg.muted">
                Showing every week of{" "}
                <Box asChild color="brand.fg" fontWeight="600" textDecoration="underline" textUnderlineOffset="0.2em">
                  <NextLink href={`/resources/series/${results.seriesOnly.slug}`}>{results.seriesOnly.title}</NextLink>
                </Box>
                .
              </Text>
            </Box>
          )}
          {results.matchSeries.length > 0 && (
            <Block id="r-series" title="Bible study series">
              <Grid>
                {results.matchSeries.map((s) => (
                  <li key={s.slug}>
                    <SeriesCard s={s} weekCount={weekCount.get(s.slug) ?? 0} />
                  </li>
                ))}
              </Grid>
            </Block>
          )}
          {type === "prayer-fasting"
            ? pfMerged.length > 0 && (
                <Block id="r-pf" title="Guides, newest first">
                  <Grid>
                    {pfMerged.map((e) => (
                      <li key={e.kind === "season" ? e.season.slug : e.r.slug}>
                        <PfCard e={e} />
                      </li>
                    ))}
                  </Grid>
                </Block>
              )
            : results.matchSeasons.length > 0 && (
                <Block id="r-seasons" title="Prayer & fasting seasons">
                  <Grid>
                    {results.matchSeasons.map((e) => (
                      <li key={e.kind === "season" ? e.season.slug : ""}>
                        <PfCard e={e} />
                      </li>
                    ))}
                  </Grid>
                </Block>
              )}
          {totalItems > 0 && (
            <Block id="r-items" title={results.seriesOnly ? "Weeks" : type && section ? typeSection!.title : "Resources"}>
              <Grid count={totalItems}>
                {pageItems.map((r) => (
                  <li key={r.slug}>
                    <ResourceCard r={r} />
                  </li>
                ))}
              </Grid>
              {pages > 1 && (
                <HStack as="nav" aria-label="Pages" justifyContent="center" gap="2" mt="8" flexWrap="wrap">
                  {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                    <Button key={n} size="md" variant={n === Math.min(page, pages) ? "primary" : "secondary"} aria-current={n === Math.min(page, pages) ? "page" : undefined} onClick={() => set("page", String(n))}>
                      {n}
                    </Button>
                  ))}
                </HStack>
              )}
            </Block>
          )}
          {count === 0 && (
            <Box p="8" borderRadius="lg" borderWidth="1px" borderStyle="dashed" borderColor="border.strong" textAlign="center">
              <Text fontWeight="600">Nothing matches these filters.</Text>
              <Text color="fg.muted" mt="1">
                Try a different audience or search, or clear the filters.
              </Text>
            </Box>
          )}
        </Stack>
      ) : (
        <Stack gap={{ base: "12", md: "16" }}>
          <Block id="b-seasons" title="Prayer & fasting" more={{ href: "/resources/prayer-fasting", label: "All prayer & fasting" }}>
            <Grid>
              {latestPf.map((e) => (
                <li key={e.kind === "season" ? e.season.slug : e.r.slug}>
                  <PfCard e={e} />
                </li>
              ))}
            </Grid>
          </Block>
          <Block id="b-family" title="Family worship" more={{ href: "/resources/family-worship", label: "All family worship" }}>
            <Grid count={family.length}>
              {family.map((r) => (
                <li key={r.slug}>
                  <ResourceCard r={r} />
                </li>
              ))}
            </Grid>
          </Block>
          <Block id="b-kids" title="Quest Kids" more={{ href: "/resources/quest-kids", label: "All Quest Kids crafts" }}>
            <Grid>
              {kids.map((r) => (
                <li key={r.slug}>
                  <ResourceCard r={r} />
                </li>
              ))}
            </Grid>
          </Block>

          {/* Past series archive, collapsed by year */}
          <Box as="section" aria-labelledby="b-past">
            <Heading as="h2" id="b-past" textStyle="h3" mb="5">
              Past series
            </Heading>
            <Accordion.Root multiple collapsible variant="plain" borderTopWidth="1px" borderColor="border">
              {past.map(([year, list]) => (
                <Accordion.Item key={year} value={year} borderBottomWidth="1px" borderColor="border">
                  <Accordion.ItemTrigger minH="56px" py="3" cursor="pointer" fontWeight="600" fontSize="1.0625rem" justifyContent="space-between">
                    <span>
                      {year}{" "}
                      <Text as="span" color="fg.muted" fontWeight="400">
                        ({list.length} series)
                      </Text>
                    </span>
                    <Accordion.ItemIndicator>
                      <ChevronDown aria-hidden="true" />
                    </Accordion.ItemIndicator>
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody pb="6">
                      <Grid>
                        {list.map((s) => (
                          <li key={s.slug}>
                            <SeriesCard s={s} weekCount={weekCount.get(s.slug) ?? 0} />
                          </li>
                        ))}
                      </Grid>
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
