import { Box, Container, Grid, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { team } from "@content/about";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { NextStepBand } from "@/components/NextStepBand";
import { Img } from "@/components/Img";
import { Squiggle } from "@/components/home/Squiggle";
import { RichText } from "@/components/RichText";
import { FeaturedTeamCard, LeaderCard, TeamCard } from "@/components/about/TeamCard";
import { TeamFilter } from "@/components/about/TeamFilter";
import { pageMetadata } from "@/lib/metadata";
import { ChLi, ChUl } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "Our team",
  description: "Meet the pastors and staff who serve Nairobi Chapel Ngong Road: leadership, adults, Next Generation, missions, worship and media.",
  path: "/about/team",
});

const container = { maxW: "container", px: { base: "5", md: "8" } } as const;
const sectionPy = { base: "16", md: "20", lg: "24" } as const;
/** Figma section headings on this page: 44px bold, tight tracking */
const h44 = { fontFamily: "heading", fontWeight: "700", fontSize: "clamp(2rem, 1.55rem + 1.6vw, 2.75rem)", lineHeight: "1.27", letterSpacing: "-0.025em" } as const;

/** Member cards: 2 / 3 / 4 / 5 columns (Figma: 221px cards, 20px apart, rows 24px apart) */
const gridProps = {
  as: "ul",
  listStyle: "none",
  m: "0",
  p: "0",
  columns: { base: 2, md: 3, lg: 4, xl: 5 },
  columnGap: { base: "3", md: "5" },
  rowGap: { base: "4", md: "6" },
} as const;

const [leadership, ...groups] = team.groups;

/* Light hero: title, intro and head-count left; the team photo right */
function Hero() {
  const total = team.groups.reduce((n, g) => n + g.members.length, 0);
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={sectionPy}>
      <Container {...container}>
        <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Our team" }]} tone="light" />
        <Grid mt={{ base: "6", md: "7" }} templateColumns={{ base: "1fr", md: "minmax(0, 440px) minmax(0, 695px)" }} justifyContent="space-between" gap={{ base: "8", md: "10" }} alignItems="center">
          <Stack gap="5">
            <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize="clamp(2.75rem, 1.6rem + 4vw, 4.75rem)" lineHeight="1.05" letterSpacing="-0.02em">
              <Squiggle>{team.title}</Squiggle>
            </Heading>
            <Text textStyle="lead" color="fg.muted">
              {team.intro}
            </Text>
            <Text fontSize="1rem" color="fg.muted">
              {total} pastors and staff
            </Text>
          </Stack>
          {/* Figma shows this photo mirrored */}
          <Box position="relative" aspectRatio="695 / 391" borderRadius="12px" overflow="hidden" bg="bg.tint" transform="scaleX(-1)">
            <Img slot="team.hero-group" priority sizes="(min-width: 768px) 695px, 100vw" />
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
    <Box as="section" id={leadership.id} aria-labelledby={`${leadership.id}-heading`} bg="accent.highlight" color="fg" py={sectionPy}>
      <Container {...container}>
        <Heading as="h2" id={`${leadership.id}-heading`} {...h44} mb="9">
          {leadership.title}
        </Heading>
        <FeaturedTeamCard m={senior} welcome={team.welcome} />
        {others.length > 0 && (
          <SimpleGrid as="ul" listStyle="none" m="0" p="0" mt="6" columns={{ base: 1, md: 2, lg: 3 }} gap="5">
            {others.map((m) => (
              <li key={m.id}>
                <LeaderCard m={m} />
              </li>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}

/* Office Bearers: a name / role table */
function OfficeBearers() {
  const ob = team.officeBearers;
  return (
    <Box as="section" id="office-bearers" aria-labelledby="office-bearers-heading" bg="bg.warm" py={sectionPy}>
      <Container {...container}>
        <Stack gap="3" maxW="864px">
          <Heading as="h2" id="office-bearers-heading" {...h44} letterSpacing="-0.01em">
            {ob.title}
          </Heading>
          <Text fontSize="1.125rem" lineHeight="1.55" color="fg.muted">
            <RichText text={ob.intro} />
          </Text>
          {ob.members.length > 0 ? (
            <Box mt="5" px={{ base: "5", md: "7" }} py="2" bg="bg.canvas" borderWidth="1px" borderColor="border" borderRadius="14px">
              <Grid aria-hidden="true" templateColumns={{ base: "1fr 1fr", md: "408px 1fr" }} gap="3" py="3.5" borderBottomWidth="1px" borderColor="border" fontSize="0.75rem" fontWeight="600" letterSpacing="0.06em" textTransform="uppercase" color="fg.muted">
                <span>Name</span>
                <span>Role</span>
              </Grid>
              <ChUl listStyle="none" m="0" p="0">
                {ob.members.map((m, i) => (
                  <ChLi key={m.id} display="grid" gridTemplateColumns={{ base: "1fr 1fr", md: "408px 1fr" }} gap="3" alignItems="center" py="4" borderBottomWidth={i < ob.members.length - 1 ? "1px" : "0"} borderColor="border">
                    <Text fontWeight="600" fontSize="1rem">
                      {m.name}
                    </Text>
                    <Text fontWeight="500" fontSize="0.9375rem" color="brand.fg">
                      <span className="sr-only">, </span>
                      {m.role}
                    </Text>
                  </ChLi>
                ))}
              </ChUl>
            </Box>
          ) : (
            <Box mt="5" p={{ base: "6", md: "8" }} borderRadius="lg" borderWidth="1px" borderStyle="dashed" borderColor="border.strong">
              <Text color="fg.muted">
                <RichText text={ob.placeholder} />
              </Text>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default function TeamPage() {
  return (
    <>
      <Hero />
      <Leadership />

      <TeamFilter options={groups.map((g) => ({ id: g.id, label: g.label ?? g.title, count: g.members.length }))}>
        {groups.map((g) => (
          <Box key={g.id} data-team-group={g.id}>
            <Box as="section" id={g.id} aria-labelledby={`${g.id}-heading`} bg="bg.canvas" pt={{ base: "10", md: "12" }} pb={{ base: "6", md: "12" }}>
              <Container {...container}>
                <Stack gap="3" mb="9">
                  <Heading as="h2" id={`${g.id}-heading`} {...h44}>
                    {g.title}
                  </Heading>
                  {g.intro && (
                    <Text textStyle="lead" color="fg.muted">
                      <RichText text={g.intro} />
                    </Text>
                  )}
                </Stack>
                <SimpleGrid {...gridProps}>
                  {g.members.map((m) => (
                    <li key={m.id}>
                      <TeamCard m={m} />
                    </li>
                  ))}
                </SimpleGrid>
              </Container>
            </Box>
          </Box>
        ))}
        <Box h={{ base: "10", md: "12" }} aria-hidden="true" />
      </TeamFilter>

      <OfficeBearers />

      <NextStepBand
        title="Want to talk to someone?"
        text="Get in touch and we’ll connect you with the right person."
        primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
        secondary={{ label: "Get counselling", href: "/ministries/counselling-care" }}
      />
    </>
  );
}
