"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Box, Button, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import type { LibraryAudience, Resource, Season } from "@content/library/types";
import { AUDIENCE_LABELS } from "@content/library/types";

const ORDER: LibraryAudience[] = ["adults", "youth", "children", "family"];
const SWITCH_LABELS: Record<LibraryAudience, string> = { adults: "Adults", youth: "Youth", children: "Children", family: "Family" };

function GuideLink({ r, label }: { r: Resource; label: string }) {
  return (
    <Box
      asChild
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap="3"
      minH="56px"
      px="5"
      py="3"
      borderRadius="md"
      borderWidth="1px"
      borderColor="border"
      bg="bg.canvas"
      color="fg"
      fontWeight="600"
      textDecoration="none"
      transition="border-color 150ms ease"
      css={{ "@media (hover: hover) and (pointer: fine)": { "&:hover": { borderColor: "var(--chakra-colors-brand-solid)" } } }}
    >
      <NextLink href={`/resources/${r.slug}`}>
        <span>{label}</span>
        <ArrowRight size={18} aria-hidden="true" />
      </NextLink>
    </Box>
  );
}

/**
 * A prayer & fasting season. An audience switch (only audiences that have a
 * guide) swaps the guides shown. 21-day seasons show a three-week, 21-day
 * calendar where each week links to that week's guide.
 */
export function SeasonView({ season, guides }: { season: Season; guides: Resource[] }) {
  const audiences = ORDER.filter((a) => guides.some((g) => g.audience.includes(a)));
  const [aud, setAud] = useState<LibraryAudience>(audiences[0] ?? "adults");
  const mine = guides.filter((g) => g.audience.includes(aud));
  const weekly = mine.filter((g) => g.week !== undefined).sort((a, b) => Number(a.week) - Number(b.week));
  const single = mine.filter((g) => g.week === undefined);
  const isCalendar = season.kind === "21-day" && weekly.length > 0;

  return (
    <Stack gap={{ base: "8", md: "10" }}>
      {audiences.length > 1 && (
        <HStack role="group" aria-label="Show guides for" gap="1" p="1" borderRadius="full" bg="bg.muted" alignSelf="flex-start" flexWrap="wrap">
          {audiences.map((a) => (
            <Button
              key={a}
              size="sm"
              minH="40px"
              px="5"
              borderRadius="full"
              variant="plain"
              aria-pressed={aud === a}
              bg={aud === a ? "bg.canvas" : "transparent"}
              color={aud === a ? "fg" : "fg.muted"}
              boxShadow={aud === a ? "sm" : "none"}
              fontWeight="600"
              onClick={() => setAud(a)}
            >
              {SWITCH_LABELS[a]}
            </Button>
          ))}
        </HStack>
      )}

      <Text color="fg.muted" aria-live="polite">
        Guides for {AUDIENCE_LABELS[aud]}
      </Text>

      {isCalendar && (
        <Stack as="ol" listStyle="none" m="0" p="0" gap="6" aria-label="21-day calendar">
          {[1, 2, 3].map((w) => {
            const guide = weekly.find((g) => Number(g.week) === w);
            return (
              <Box as="li" key={w} p={{ base: "4", md: "5" }} borderRadius="lg" borderWidth="1px" borderColor="border" bg="bg.warm">
                <HStack justifyContent="space-between" mb="4" gap="3" flexWrap="wrap">
                  <Heading as="h3" fontFamily="heading" fontSize="1.25rem" fontWeight="700">
                    Week {w}
                  </Heading>
                  <Text fontSize="0.875rem" color="fg.muted">
                    Days {(w - 1) * 7 + 1}–{w * 7}
                  </Text>
                </HStack>
                <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={7} gap={{ base: "1", md: "2" }} mb="4" aria-hidden="true">
                  {Array.from({ length: 7 }, (_, d) => (
                    <Box as="li" key={d} textAlign="center" py={{ base: "2", md: "3" }} borderRadius="md" bg={guide ? "bg.canvas" : "bg.muted"} fontFamily="heading" fontWeight="600" fontSize={{ base: "0.875rem", md: "1rem" }}>
                      {(w - 1) * 7 + d + 1}
                    </Box>
                  ))}
                </SimpleGrid>
                {guide ? <GuideLink r={guide} label={`Open the week ${w} guide`} /> : <Text color="fg.muted">This week&apos;s guide isn&apos;t available for this group.</Text>}
              </Box>
            );
          })}
        </Stack>
      )}

      {(single.length > 0 || (!isCalendar && weekly.length > 0)) && (
        <Stack as="ul" listStyle="none" m="0" p="0" gap="3">
          {[...(isCalendar ? [] : weekly), ...single].map((g) => (
            <li key={g.slug}>
              <GuideLink r={g} label={g.title} />
            </li>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
