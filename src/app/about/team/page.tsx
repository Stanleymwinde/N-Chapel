import { Box, Container, Grid, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { team } from "@content/about";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/layout/Section";
import { NextStepBand } from "@/components/NextStepBand";
import { Img } from "@/components/Img";
import { Squiggle } from "@/components/home/Squiggle";
import { RichText } from "@/components/RichText";
import { FeaturedTeamCard, TeamCard } from "@/components/about/TeamCard";
import { TeamFilter } from "@/components/about/TeamFilter";
import { pageMetadata } from "@/lib/metadata";
import { ChA } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "Our team",
  description: "Meet the pastors and staff who serve Nairobi Chapel Ngong Road: leadership, adults, Next Generation, missions, worship and media.",
  path: "/about/team",
});

const container = { maxW: "container", px: { base: "5", md: "8" } } as const;

/** One card size everywhere: 2 / 3 / 4 / 5 columns */
const gridProps = {
  as: "ul",
  listStyle: "none",
  m: "0",
  p: "0",
  columns: { base: 2, md: 3, lg: 4, xl: 5 },
  columnGap: { base: "4", md: "6" },
  rowGap: { base: "8", md: "10" },
} as const;

const [leadership, ...groups] = team.groups;

/* Light hero */
function Hero() {
  const total = team.groups.reduce((n, g) => n + g.members.length, 0);
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "12", md: "16" }}>
      <Container {...container}>
        <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Our team" }]} tone="light" />
        <Grid mt={{ base: "6", md: "8" }} templateColumns={{ base: "1fr", md: "1.2fr 1fr" }} gap={{ base: "8", md: "12", lg: "16" }} alignItems="center">
          <Stack gap={{ base: "5", md: "6" }}>
            <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize="clamp(2.75rem, 1.6rem + 4.4vw, 5rem)" lineHeight="1" letterSpacing="-0.02em">
              <Squiggle>{team.title}</Squiggle>
            </Heading>
            <Text textStyle="lead" color="fg.muted" maxW="34rem">
              {team.intro}
            </Text>
            <Text textStyle="small" color="fg.muted">
              {total} pastors and staff
            </Text>
          </Stack>
          <Box position="relative" aspectRatio={{ base: "16 / 9", md: "4 / 3" }} borderRadius="lg" overflow="hidden" bg="bg.tint">
            {/* TODO(content): replace with a real team photo */}
            <Img slot="team.hero" priority sizes="(min-width: 768px) 520px, 100vw" />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

/* Leadership: always shown, above the filter. The Senior Pastor leads. */
function Leadership() {
  const [senior, ...others] = leadership.members;
  return (
    <Box as="section" id={leadership.id} aria-labelledby={`${leadership.id}-heading`} bg="accent.highlight" color="ink.900" py={{ base: "16", md: "24" }}>
      <Container {...container}>
        <Heading as="h2" id={`${leadership.id}-heading`} textStyle="h2" mb={{ base: "8", md: "10" }}>
          {leadership.title}
        </Heading>
        <FeaturedTeamCard m={senior} welcome={team.welcome} />
        {others.length > 0 && (
          <SimpleGrid {...gridProps} mt={{ base: "12", md: "16" }}>
            {others.map((m) => (
              <li key={m.id}>
                <TeamCard m={m} />
              </li>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}

export default function TeamPage() {
  return (
    <>
      <Hero />
      <Leadership />

      <TeamFilter options={groups.map((g) => ({ id: g.id, label: g.title, count: g.members.length }))}>
        {groups.map((g, i) => (
          <Box key={g.id} data-team-group={g.id}>
            {/* Cream and white alternate so the groups read apart */}
            <Section id={g.id} tone={i % 2 === 0 ? "warm" : "white"} title={g.title} intro={g.intro}>
              {g.link && (
                <ChA
                  href={g.link.href}
                  display="inline-flex"
                  alignItems="center"
                  gap="1.5"
                  minH="44px"
                  mt={{ base: "-4", md: "-6" }}
                  mb={{ base: "6", md: "8" }}
                  fontWeight="600"
                  color="brand.fg"
                  textDecoration="underline"
                  textUnderlineOffset="0.2em"
                >
                  Visit {g.link.label}
                  <span aria-hidden="true">→</span>
                </ChA>
              )}
              <SimpleGrid {...gridProps}>
                {g.members.map((m) => (
                  <li key={m.id}>
                    <TeamCard m={m} />
                  </li>
                ))}
              </SimpleGrid>
            </Section>
          </Box>
        ))}
      </TeamFilter>

      {/* Office Bearers: a separate section (moved from the old Publications page) */}
      <Section id="office-bearers" tone={groups.length % 2 === 0 ? "warm" : "white"} title={team.officeBearers.title} intro={team.officeBearers.intro}>
        {team.officeBearers.members.length > 0 ? (
          <SimpleGrid {...gridProps}>
            {team.officeBearers.members.map((m) => (
              <li key={m.id}>
                <TeamCard m={m} />
              </li>
            ))}
          </SimpleGrid>
        ) : (
          <Box p={{ base: "6", md: "8" }} borderRadius="lg" borderWidth="1px" borderStyle="dashed" borderColor="border.strong" maxW="44rem">
            <Text color="fg.muted">
              <RichText text={team.officeBearers.placeholder} />
            </Text>
          </Box>
        )}
      </Section>

      <NextStepBand
        tone="night"
        title="Want to talk to someone?"
        text="Get in touch and we'll connect you with the right person."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "Serve on a team", href: "/get-involved/serve" }}
      />
    </>
  );
}
