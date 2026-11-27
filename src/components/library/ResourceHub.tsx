"use client";

import { useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Accordion, Box, Field, Heading, HStack, Input, NativeSelect, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ChevronDown, Search } from "lucide-react";
import type { LibraryAudience, Resource, Season, Series } from "@content/library/types";
import { AUDIENCE_LABELS } from "@content/library/types";
import { byNewest } from "@content/library/resources";
import { getSection, SECTIONS, sectionFromParam, type SectionKey } from "@content/library/sections";
import { ResourceCard, SeasonCard, SeriesCard } from "./LibraryCards";

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

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

function Grid({ children, cols = 4 }: { children: React.ReactNode; cols?: 3 | 4 }) {
  return (
    <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, sm: 2, lg: cols }} gap="6">
      {children}
    </SimpleGrid>
  );
}

/** Figma "Text link" style, used for "All seasons" and "Clear filters" */
const textLink = {
  color: "brand.fg",
  fontWeight: "500",
  textDecoration: "underline",
  textUnderlineOffset: "0.2em",
  _hover: { textDecorationThickness: "2px" },
} as const;

function Block({ id, title, more, children }: { id: string; title: string; more?: { href: string; label: string }; children: React.ReactNode }) {
  return (
    <Box as="section" aria-labelledby={id}>
      <HStack justifyContent="space-between" alignItems="center" mb="5" gap="4" flexWrap="wrap">
        <Heading as="h2" id={id} fontFamily="heading" fontWeight="600" fontSize="1.5rem" lineHeight="1.2" letterSpacing="-0.005em">
          {title}
        </Heading>
        {more && (
          <Box asChild {...textLink} fontSize="0.875rem">
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
  return e.kind === "season" ? <SeasonCard season={e.season} /> : <ResourceCard r={e.r} />;
}

const field = { bg: "bg.canvas", borderColor: "border", h: "40px", fontSize: "0.8125rem", borderRadius: "6px", color: "fg" } as const;
const fieldLabel = { fontSize: "0.75rem", fontWeight: "500", color: "fg", mb: "0" } as const;

/**
 * Resource Library browser: Type / Audience / Series filters and a search box,
 * synced to the URL. On the hub, choosing a Type opens that section's page; on
 * a section page the Type comes from the route. With no filters, the hub shows
 * the browse blocks and the past-series archive.
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

  const clear = () => (section ? router.push("/resources", { scroll: false }) : router.replace(pathname, { scroll: false }));

  const inType = (t: Resource["type"]) => !typeSection || typeSection.types.includes(t);

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
  const cur = Math.min(page, pages);
  const pageItems = otherItems.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE);
  const count = results.matchSeries.length + (type === "prayer-fasting" ? pfMerged.length : results.matchSeasons.length) + totalItems;

  // ---------- default (unfiltered hub) ----------
  const latestPf = useMemo(() => {
    const all: PfEntry[] = [
      ...seasons.filter((s) => multi(s.slug)).map((s) => ({ kind: "season" as const, season: s, guides: seasonInfo.get(s.slug)!.guides, audiences: seasonInfo.get(s.slug)!.audiences })),
      ...resources.filter((r) => r.type === "prayer-fasting" && !(r.season && multi(r.season))).map((r) => ({ kind: "item" as const, r })),
    ];
    return all.sort((a, b) => pfYm(b) - pfYm(a)).slice(0, 4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seasons, resources, seasonInfo]);
  const family = resources.filter((r) => r.type === "family-worship").sort(byNewest).slice(0, 3);
  const kids = resources.filter((r) => (r.type === "kids-craft" || r.type === "kids-devotional") && !r.season).sort(byNewest).slice(0, 4);
  const past = useMemo(() => {
    const UNDATED = "Year to be confirmed";
    const groups = new Map<string, Series[]>();
    for (const s of series.filter((x) => x.slug !== featuredSlug).sort((a, b) => a.sortOrder - b.sortOrder)) {
      const k = s.year ? String(s.year) : UNDATED;
      groups.set(k, [...(groups.get(k) ?? []), s]);
    }
    return [...groups.entries()].sort(([a], [b]) => (a === UNDATED ? 1 : b === UNDATED ? -1 : Number(b) - Number(a)));
  }, [series, featuredSlug]);

  return (
    <Stack gap="14" data-no-reveal={hydrated ? undefined : ""}>
      {/* Filter bar */}
      <Box as="form" role="search" aria-label="Filter the resource library" onSubmit={(e) => e.preventDefault()} p="18px" borderRadius="10px" bg="bg.warm" borderWidth="1px" borderColor="border">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="14px" alignItems="end">
          <Field.Root gap="2">
            <Field.Label {...fieldLabel}>Search</Field.Label>
            <Box position="relative" w="100%">
              <Box position="absolute" left="12px" top="50%" transform="translateY(-50%)" color="fg.muted" aria-hidden="true" zIndex="1" display="flex">
                <Search size={14} />
              </Box>
              <Input type="search" ps="34px" placeholder="Title, book or month" value={q} onChange={(e) => set("q", e.target.value)} {...field} _placeholder={{ color: "fg.muted" }} />
            </Box>
          </Field.Root>
          <Field.Root gap="2">
            <Field.Label {...fieldLabel}>Type</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field value={type} onChange={(e) => set("type", e.target.value)} {...field}>
                <option value="">All types</option>
                {SECTIONS.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>
          <Field.Root gap="2">
            <Field.Label {...fieldLabel}>Audience</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field value={audience} onChange={(e) => set("audience", e.target.value)} {...field}>
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
          <Field.Root gap="2" disabled={Boolean(type && type !== "bible-study")}>
            <Field.Label {...fieldLabel}>Series</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field value={seriesSlug} onChange={(e) => set("series", e.target.value)} {...field}>
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
        </SimpleGrid>
        <HStack justifyContent="space-between" mt="14px" gap="3" flexWrap="wrap" fontSize="0.8125rem">
          <Text color="fg.muted" aria-live="polite" aria-atomic="true">
            {filtered ? `${count} result${count === 1 ? "" : "s"}` : "Showing everything"}
          </Text>
          {filtered && (
            <Box asChild {...textLink} cursor="pointer" bg="transparent" p="0" border="0">
              <button type="button" onClick={clear}>
                Clear filters
              </button>
            </Box>
          )}
        </HStack>
      </Box>

      {filtered ? (
        <Stack gap="14">
          {results.seriesOnly && (
            <Text color="fg.muted">
              Showing every week of{" "}
              <Box asChild {...textLink} fontWeight="600">
                <NextLink href={`/resources/series/${results.seriesOnly.slug}`}>{results.seriesOnly.title}</NextLink>
              </Box>
              .
            </Text>
          )}
          {results.matchSeries.length > 0 && (
            <Block id="r-series" title="Bible study series">
              <Grid>
                {results.matchSeries.map((s) => (
                  <li key={s.slug}>
                    <SeriesCard s={s} />
                  </li>
                ))}
              </Grid>
            </Block>
          )}
          {(type === "prayer-fasting" ? pfMerged : results.matchSeasons).length > 0 && (
            <Block id="r-pf" title="Prayer & fasting seasons">
              <Grid>
                {(type === "prayer-fasting" ? pfMerged : results.matchSeasons).map((e) => (
                  <li key={e.kind === "season" ? e.season.slug : e.r.slug}>
                    <PfCard e={e} />
                  </li>
                ))}
              </Grid>
            </Block>
          )}
          {totalItems > 0 && (
            <Block id="r-items" title={results.seriesOnly ? "Weeks" : "Resources"}>
              <Grid>
                {pageItems.map((r) => (
                  <li key={r.slug}>
                    <ResourceCard r={r} />
                  </li>
                ))}
              </Grid>
              {pages > 1 && (
                <HStack as="nav" aria-label="Pages" justifyContent="center" gap="10px" mt="9" flexWrap="wrap">
                  {Array.from({ length: pages }, (_, i) => i + 1).map((n) => {
                    const on = n === cur;
                    return (
                      <Box
                        asChild
                        key={n}
                        w="36px"
                        h="36px"
                        borderRadius="full"
                        borderWidth="1.5px"
                        borderColor="brand.solid"
                        bg={on ? "brand.solid" : "bg.canvas"}
                        color={on ? "white" : "brand.fg"}
                        fontSize="0.875rem"
                        fontWeight="500"
                        cursor="pointer"
                        transition="background-color 150ms ease"
                        _hover={on ? undefined : { bg: "brand.subtle" }}
                        _focusVisible={{ outline: "3px solid", outlineColor: "brand.solid", outlineOffset: "2px" }}
                      >
                        <button type="button" aria-current={on ? "page" : undefined} aria-label={`Page ${n}`} onClick={() => set("page", String(n))}>
                          {n}
                        </button>
                      </Box>
                    );
                  })}
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
        <Stack gap="14">
          <Block id="b-seasons" title="Prayer & fasting" more={{ href: "/resources/prayer-fasting", label: "All seasons" }}>
            <Grid>
              {latestPf.map((e) => (
                <li key={e.kind === "season" ? e.season.slug : e.r.slug}>
                  <PfCard e={e} />
                </li>
              ))}
            </Grid>
          </Block>
          <Block id="b-family" title="Family worship" more={{ href: "/resources/family-worship", label: "All family worship" }}>
            <Grid cols={3}>
              {family.map((r) => (
                <li key={r.slug}>
                  <ResourceCard r={r} />
                </li>
              ))}
            </Grid>
          </Block>
          <Block id="b-kids" title="Quest Kids" more={{ href: "/resources/quest-kids", label: "All Quest Kids resources" }}>
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
            <Heading as="h2" id="b-past" fontFamily="heading" fontWeight="600" fontSize="1.5rem" lineHeight="1.2" letterSpacing="-0.005em" mb="14px">
              Past series
            </Heading>
            <Accordion.Root multiple collapsible variant="plain">
              {past.map(([year, list]) => (
                <Accordion.Item key={year} value={year} borderBottomWidth="1px" borderColor="border">
                  <Accordion.ItemTrigger py="4" minH="44px" cursor="pointer" fontSize="0.9375rem" justifyContent="space-between">
                    <span>
                      <Text as="span" fontWeight="500">
                        {year}
                      </Text>{" "}
                      <Text as="span" color="fg.muted" fontWeight="400">
                        ({list.length} series)
                      </Text>
                    </span>
                    <Accordion.ItemIndicator color="fg.muted">
                      <ChevronDown size={16} aria-hidden="true" />
                    </Accordion.ItemIndicator>
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody pt="2" pb="6">
                      <Grid>
                        {list.map((s) => (
                          <li key={s.slug}>
                            <SeriesCard s={s} />
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
