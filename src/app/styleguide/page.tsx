import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Download } from "lucide-react";
import type { ChurchEvent, Group, Sermon } from "@content/types";
import { joinGroupForm } from "@content/groups";
import { Button, LinkButton } from "@/components/Button";
import { EventCard, GroupCard, MinistryCard, SermonCard } from "@/components/Cards";
import { ResourceCard } from "@/components/library/LibraryCards";
import type { Resource } from "@content/library/types";
import { CopyValue } from "@/components/CopyValue";
import { FactList } from "@/components/FactList";
import { Faq } from "@/components/Faq";
import { Form } from "@/components/Form";
import { LiteYouTube } from "@/components/LiteYouTube";
import { MapEmbed } from "@/components/MapEmbed";
import { NextStepBand } from "@/components/NextStepBand";
import { Pathway } from "@/components/Pathway";
import { RichText } from "@/components/RichText";
import { Todo } from "@/components/Todo";
import { StyleguideFieldStates } from "@/components/d/StyleguideFieldStates";
import { Section } from "@/components/layout/Section";
import { FilterBarChip, FilterBarChips, FilterBarCount, FilterBarRoot } from "@/components/recipe-parts";
import { ChLi, ChSpan } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

/* Colour tokens with approximate WCAG contrast notes. */
const colours: { token: string; hex: string; note: string; dark?: boolean }[] = [
  { token: "purple.700", hex: "#5B2A9E", note: "Primary buttons, links, active nav. White text ≈ 9.3:1 (AA).", dark: true },
  { token: "purple.600", hex: "#7440C4", note: "Hover / secondary accents. White text ≈ 6.4:1 (AA).", dark: true },
  { token: "purple.50", hex: "#F4EFFB", note: "Tinted sections. Ink text ≈ 17:1." },
  { token: "gold.400", hex: "#F5C518", note: "Highlights only. Ink on gold ≈ 11:1; gold text on white ≈ 1.6:1, never use for text on white." },
  { token: "ink.900", hex: "#16121F", note: "Headings and body. On white ≈ 18:1.", dark: true },
  { token: "ink.600", hex: "#4D4759", note: "Secondary text. On white ≈ 8.9:1 (AA).", dark: true },
  { token: "paper.warm", hex: "#FAF8F5", note: "Alternating section background." },
  { token: "night.900", hex: "#1A1426", note: "Footer and dark bands. White ≈ 17:1; night.300 text ≈ 11:1.", dark: true },
  { token: "stone.500", hex: "#8C8794", note: "Logo grey quadrant only. Not for text.", dark: true },
];

const typeScale = [
  { style: "h1", label: "H1 · 36 → 56px · Fraunces 700" },
  { style: "h2", label: "H2 · 28 → 40px · Fraunces 650" },
  { style: "h3", label: "H3 · 22 → 28px" },
  { style: "h4", label: "H4 · 20px" },
  { style: "lead", label: "Lead · 18 → 21px" },
  { style: "body", label: "Body · 17 → 18px · Plus Jakarta Sans, line-height 1.6" },
  { style: "small", label: "Small · 14px" },
  { style: "eyebrow", label: "Eyebrow · 13px uppercase, 0.08em" },
] as const;

/* Sample data (fictional, for the styleguide only) */
const sampleEvent: ChurchEvent = {
  slug: "styleguide-sample",
  title: "Sample event title",
  summary: "One or two sentences describing the event, written to the visitor.",
  type: "Fellowship",
  audience: ["Everyone"],
  time: "9:00 AM – 1:00 PM",
  venue: "Ngong Road campus",
  startDate: "2030-01-15",
  expires: "2030-01-15",
};
const sampleResource: Resource = {
  slug: "styleguide-sample",
  title: "Sample study: Week 1",
  type: "bible-study",
  audience: ["adults"],
  week: 1,
  month: 11,
  year: 2026,
  publishDate: null,
  summary: "",
  pdfUrl: "TODO",
};
const sampleGroup: Group = {
  slug: "sample",
  name: "Sample group",
  audience: "Everyone",
  summary: "A one-line summary of who the group is for and what it does.",
  when: "Thursdays, 6:30–7:30 PM",
  where: "Ngong Road campus",
};
const sampleSermon: Sermon = {
  slug: "sample",
  title: "Sample sermon title",
  series: "Sample series",
  speaker: "Speaker name",
  date: "2026-11-01",
  youtubeId: "[TODO: YouTube video ID]",
};

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack gap="5" py="10" borderTopWidth="1px" borderColor="border">
      <Heading as="h2" textStyle="h3">
        {title}
      </Heading>
      {children}
    </Stack>
  );
}

export default function StyleguidePage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <Section id="styleguide" title="Styleguide" intro="Every shared component and state. Development only; this page returns 404 in production.">
        <Block title="Colour tokens">
          <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, sm: 2, lg: 3 }} gap="4">
            {colours.map((c) => (
              <ChLi key={c.token} borderWidth="1px" borderColor="border" borderRadius="lg" overflow="hidden">
                <Box bg={c.token} h="20" display="flex" alignItems="flex-end" p="3" color={c.dark ? "white" : "ink.900"} fontWeight="600">
                  Aa {c.token}
                </Box>
                <Stack gap="1" p="4">
                  <Text fontWeight="600">
                    {c.token} <ChSpan color="fg.muted">{c.hex}</ChSpan>
                  </Text>
                  <Text textStyle="small" color="fg.muted">
                    {c.note}
                  </Text>
                </Stack>
              </ChLi>
            ))}
          </SimpleGrid>
        </Block>

        <Block title="Type scale">
          <Stack gap="5">
            {typeScale.map((t) => (
              <Grid key={t.style} templateColumns={{ base: "1fr", md: "220px 1fr" }} gap="2" alignItems="baseline">
                <Text textStyle="small" color="fg.muted">
                  {t.label}
                </Text>
                <Text textStyle={t.style}>Being disciples and making disciples</Text>
              </Grid>
            ))}
          </Stack>
        </Block>

        <Block title="Buttons">
          <Stack gap="5">
            <HStack gap="3" flexWrap="wrap">
              <Button variant="primary">Plan your visit</Button>
              <Button variant="secondary">Watch live</Button>
              <LinkButton href="/events" variant="link">
                See what&apos;s on
              </LinkButton>
            </HStack>
            <HStack gap="3" flexWrap="wrap">
              <Button variant="primary" size="lg">
                Give now
              </Button>
              <Button variant="secondary" size="lg">
                Join a group
              </Button>
              <Button variant="primary" size="lg">
                <Download aria-hidden="true" />
                Download the guide
              </Button>
            </HStack>
            <HStack gap="3" flexWrap="wrap">
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Button variant="primary" loading loadingText="Sending…">
                Send
              </Button>
              <LinkButton href="https://www.youtube.com" variant="secondary">
                External link
              </LinkButton>
              <LinkButton href="[TODO: link not yet supplied]" variant="secondary">
                Link with TODO
              </LinkButton>
            </HStack>
            <HStack gap="3" flexWrap="wrap" p="5" bg="night.900" borderRadius="lg">
              <Button variant="inverse">Inverse</Button>
              <Button variant="inverseOutline">Inverse outline</Button>
            </HStack>
          </Stack>
        </Block>

        <Block title="Cards">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
            <MinistryCard title="Quest" summary="The great adventure of knowing God, for ages 2–11." href="/ministries/quest-children" image="quest.hero" who="Ages 2–11" when="Sundays" cta="Explore Quest" />
            <EventCard event={sampleEvent} />
            <ResourceCard r={sampleResource} />
            <GroupCard group={sampleGroup} joinHref="#" />
            <SermonCard sermon={sampleSermon} />
          </SimpleGrid>
        </Block>

        <Block title="Fact list">
          <FactList
            layout="grid"
            facts={[
              { icon: "clock", label: "When", value: "Sundays 9:00 & 11:30 AM" },
              { icon: "mapPin", label: "Where", value: "Ngong Road, Nairobi" },
              { icon: "users", label: "Who", value: "Everyone" },
              { icon: "phone", label: "Contact", value: "0701 777 888", href: "tel:+254701777888" },
            ]}
          />
          <Box p="6" bg="night.900" borderRadius="lg">
            <FactList tone="dark" layout="inline" facts={[{ icon: "clock", label: "When", value: "Wednesdays, 6:00–7:30 PM" }, { icon: "info", label: "Note", value: "[TODO: example TODO in a fact]" }]} />
          </Box>
        </Block>

        <Block title="Pathway stepper">
          <Pathway
            steps={[
              { title: "Visit on a Sunday", summary: "Join us at 9:00 or 11:30 AM.", cta: { label: "Plan your visit", href: "/new-here/plan-your-visit" } },
              { title: "Join Plug-In", summary: "Ten weeks to connect with God and community.", when: "10 weeks" },
              { title: "Find your community", summary: "Belong to an eGroup." },
            ]}
          />
        </Block>

        <Block title="Filter bar">
          <FilterBarRoot>
            <FilterBarChips aria-label="Example filters">
              <li>
                <FilterBarChip type="button" aria-pressed>
                  All
                </FilterBarChip>
              </li>
              <li>
                <FilterBarChip type="button" aria-pressed={false}>
                  Women
                </FilterBarChip>
              </li>
              <li>
                <FilterBarChip type="button" aria-pressed={false}>
                  Men
                </FilterBarChip>
              </li>
            </FilterBarChips>
            <FilterBarCount>12 groups</FilterBarCount>
          </FilterBarRoot>
        </Block>

        <Block title="FAQ accordion">
          <Faq
            items={[
              { question: "Do I need to give?", answer: "No. Guests are never expected to give." },
              { question: "Example with a TODO", answer: "[TODO: example answer to confirm]" },
            ]}
          />
        </Block>

        <Block title="Form fields and states">
          <StyleguideFieldStates />
          <Text color="fg.muted">Full form (submit it empty to see validation, focus on the first error and error text):</Text>
          <Form form={joinGroupForm} />
        </Block>

        <Block title="Copy to clipboard">
          <HStack gap="10" flexWrap="wrap">
            <CopyValue label="Paybill number" value="508701" />
            <CopyValue label="Account number" value="100 023 6906" />
          </HStack>
        </Block>

        <Block title="Map (click to load) and YouTube facade">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
            <MapEmbed />
            <LiteYouTube id="[TODO: YouTube video ID]" title="Sample sermon" />
          </SimpleGrid>
        </Block>

        <Block title="TODO marker">
          <Text>
            Inline placeholder: <Todo note="confirm iPRAYSE time" />. From content: <RichText text="Starts at [TODO: confirm start time] every week." />
          </Text>
        </Block>
      </Section>

      <NextStepBand
        title="Next step band"
        text="Every page ends with one of these."
        primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
        secondary={{ label: "Watch live", href: "/watch" }}
      />
    </>
  );
}
