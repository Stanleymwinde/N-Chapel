import NextLink from "next/link";
import { Box, Container, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { about } from "@content/about";
import { Section } from "@/components/layout/Section";
import { LinkButton } from "@/components/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { NextStepBand } from "@/components/NextStepBand";
import { RichText } from "@/components/RichText";
import { Img } from "@/components/Img";
import { Squiggle } from "@/components/home/Squiggle";
import { RoundBadge } from "@/components/about/RoundBadge";
import { pageMetadata } from "@/lib/metadata";
import { ChA, ChLi, ChOl, ChUl } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "About us",
  description: "Nairobi Chapel Ngong Road: being disciples and making disciples of Jesus Christ. Our story, mission, vision and values.",
  path: "/about",
});

const container = { maxW: "container", px: { base: "5", md: "8" } } as const;

/* 1. Light hero: tall photo left, title and a second photo right, round badge between */
function Hero() {
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "14", md: "20" }} overflow="hidden">
      <Container {...container}>
        <Breadcrumbs items={[{ label: "About" }]} tone="light" />
        <Grid
          mt={{ base: "6", md: "8" }}
          templateColumns={{ base: "1fr", md: "1.05fr 1fr" }}
          gap={{ base: "8", md: "12", lg: "16" }}
          alignItems="center"
        >
          {/* Tall photo with the round badge on its corner */}
          <Box position="relative" order={{ base: 1, md: 0 }}>
            <Box position="relative" aspectRatio={{ base: "4 / 3", md: "4 / 5" }} borderRadius="lg" overflow="hidden" bg="bg.tint">
              <Img slot="about.hero" priority sizes="(min-width: 768px) 560px, 100vw" />
            </Box>
            <Box position="absolute" top={{ base: "-10", md: "-12" }} right={{ base: "4", md: "-14" }} zIndex="1" display={{ base: "none", sm: "block" }}>
              <RoundBadge text="Being disciples · Making disciples · Ngong Road · " />
            </Box>
          </Box>

          {/* Title, intro and a second photo */}
          <Stack gap={{ base: "6", md: "8" }} order={{ base: 0, md: 1 }}>
            <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize="clamp(3rem, 1.8rem + 4.6vw, 5.5rem)" lineHeight="1" letterSpacing="-0.02em">
              <Squiggle>{about.title}</Squiggle>
            </Heading>
            <Text textStyle="lead" color="fg.muted" maxW="34rem">
              {about.intro}
            </Text>
            <Box position="relative" aspectRatio="4 / 3" maxW={{ md: "380px" }} borderRadius="lg" overflow="hidden" bg="bg.tint" display={{ base: "none", md: "block" }}>
              <Img slot="ministries.hero" sizes="380px" />
            </Box>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

/* 2. Gold band: mission and vision beside an arched photo */
function MissionVision() {
  const statement = { fontFamily: "heading", fontWeight: "700", fontSize: "clamp(2rem, 1.3rem + 2.6vw, 3.5rem)", lineHeight: "1.05", letterSpacing: "-0.02em", textWrap: "balance" } as const;
  return (
    <Box as="section" aria-labelledby="mission-vision" bg="accent.highlight" color="ink.900" py={{ base: "16", md: "28" }}>
      <Heading as="h2" id="mission-vision" className="sr-only">
        Mission and vision
      </Heading>
      <Container {...container}>
        <Grid templateColumns={{ base: "1fr", md: "0.85fr 1.15fr" }} gap={{ base: "12", md: "14", lg: "20" }} alignItems="center">
          <Box position="relative" maxW={{ base: "340px", md: "none" }}>
            {/* Arch: rounded top, square base, offset white block under it */}
            <Box position="relative" aspectRatio="4 / 5" borderTopRadius="full" overflow="hidden" bg="night.900">
              <Img slot="nextsteps.hero" sizes="(min-width: 768px) 460px, 340px" />
            </Box>
            <Box position="absolute" left={{ base: "6", md: "10" }} right={{ base: "-6", md: "-10" }} bottom="-5" h="10" bg="bg.canvas" borderRadius="sm" aria-hidden="true" />
          </Box>

          <Stack gap={{ base: "10", md: "14" }}>
            <Stack gap="4">
              <Text textStyle="label" color="ink.700">
                Our mission
              </Text>
              <Text {...statement}>{about.mission}</Text>
            </Stack>
            <Box h="2px" bg="ink.900" opacity={0.15} />
            <Stack gap="4">
              <Text textStyle="label" color="ink.700">
                Our vision
              </Text>
              <Text {...statement}>{about.vision}</Text>
              <Text maxW="prose" fontSize="1.0625rem" lineHeight="1.7">
                {about.visionDetail}
              </Text>
            </Stack>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

/* 2b. Our current season: TOUCH, set large across a dark band */
function Season() {
  const words = about.season.split(" ");
  const last = words.pop();
  return (
    <Box as="section" id="season" aria-labelledby="season-heading" bg="night.900" color="white" py={{ base: "16", md: "28" }} overflow="hidden">
      <Container {...container}>
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1.1fr) minmax(0, 0.9fr)" }} gap={{ base: "6", lg: "16" }} alignItems="end" mb={{ base: "12", md: "16" }}>
          <Stack gap="4">
            <Text fontSize="0.875rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="accent.highlight">
              Our current season
            </Text>
            <Heading as="h2" id="season-heading" fontFamily="heading" fontWeight="700" fontSize="clamp(2.25rem, 1.4rem + 3.4vw, 4.25rem)" lineHeight="1.02" letterSpacing="-0.02em" color="white" textWrap="balance">
              {words.join(" ")}{" "}
              <Box as="span" color="accent.highlight">
                {last}
              </Box>
            </Heading>
          </Stack>
          <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.7" color="rgba(255,255,255,0.85)" maxW="34rem">
            {about.touch.intro}
          </Text>
        </Grid>

        {/* The five letters, across the full width */}
        <ChUl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "repeat(2, minmax(0, 1fr))", lg: "repeat(5, minmax(0, 1fr))" }} columnGap={{ base: "5", lg: "0" }} borderTopWidth="1px" borderColor="rgba(255,255,255,0.18)">
          {about.touch.letters.map((l, i) => (
            <Box
              as="li"
              key={l.letter}
              py={{ base: "6", lg: "8" }}
              ps={{ base: "0", lg: i === 0 ? "0" : "6" }}
              pe={{ base: "0", lg: "6" }}
              borderBottomWidth={{ base: "1px", lg: "0" }}
              borderLeftWidth={{ base: "0", lg: i === 0 ? "0" : "1px" }}
              borderColor="rgba(255,255,255,0.18)"
            >
              <Text aria-hidden="true" fontFamily="heading" fontWeight="700" fontSize={{ base: "3.5rem", lg: "5rem" }} lineHeight="0.9" color="accent.highlight">
                {l.letter}
              </Text>
              <Text mt="4" fontFamily="heading" fontWeight="600" fontSize="1.375rem" lineHeight="1.2" color="white">
                {l.word}
              </Text>
              <Text mt="1" color="rgba(255,255,255,0.7)">
                {l.be}
              </Text>
            </Box>
          ))}
        </ChUl>

        <Box mt={{ base: "10", md: "12" }}>
          <LinkButton href="/about/compass" variant="accent" size="lg" arrow>
            Explore Our Compass
          </LinkButton>
        </Box>
      </Container>
    </Box>
  );
}

/* 3. Our story: heading and milestones left (sticky on desktop), the story right */
function Story() {
  const [lead, ...rest] = about.story.paragraphs;
  const { historyPdf, milestones } = about.story;
  return (
    <Section id="story" label={about.story.title}>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1.6fr" }} gap={{ base: "8", lg: "16" }} alignItems="start">
        <Stack gap="8" position={{ lg: "sticky" }} top={{ lg: "160px" }}>
          <Heading as="h2" textStyle="h2">
            {about.story.title}
          </Heading>
          {/* Three moments, on a gold line */}
          <ChOl listStyle="none" m="0" p="0" ps="6" position="relative" display="grid" gap="6" aria-label="Milestones">
            <Box as="span" aria-hidden="true" position="absolute" left="1.5" top="2" bottom="2" w="2px" bg="accent.highlight" />
            {milestones.map((m) => (
              <ChLi key={m.year} position="relative">
                <Box as="span" aria-hidden="true" position="absolute" left="-6" top="1.5" ms="-1px" w="3.5" h="3.5" bg="accent.highlight" transform="rotate(45deg)" boxShadow="0 0 0 4px var(--chakra-colors-bg-canvas)" />
                <Text fontFamily="heading" fontWeight="700" fontSize="1.5rem" lineHeight="1">
                  {m.year}
                </Text>
                <Text mt="1" color="fg.muted">
                  {m.text}
                </Text>
              </ChLi>
            ))}
          </ChOl>
        </Stack>
        <Stack gap="5" maxW="prose">
          <Text fontFamily="heading" fontWeight="500" fontSize={{ base: "1.25rem", md: "1.5rem" }} lineHeight="1.45">
            <RichText text={lead} />
          </Text>
          {rest.map((p) => (
            <Text key={p} fontSize="1.0625rem" lineHeight="1.75">
              <RichText text={p} />
            </Text>
          ))}
          <Box pt="2">
            <LinkButton href={historyPdf.href} variant="secondary" external>
              {historyPdf.label} (PDF, {historyPdf.size})
            </LinkButton>
          </Box>
        </Stack>
      </Grid>
    </Section>
  );
}

/* 3b. The Transformation Track: four stages, the details under Grow and Send */
function TTrack() {
  const { tTrack } = about;
  return (
    <Section tone="warm" id="t-track" title={tTrack.title} intro={tTrack.intro}>
      <ChOl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))", xl: "repeat(4, minmax(0, 1fr))" }} gap={{ base: "4", md: "5" }}>
        {tTrack.steps.map((s, i) => (
          <ChLi key={s.title} display="flex" flexDirection="column" gap="3" p={{ base: "6", md: "7" }} bg="bg.canvas" borderRadius="xl" position="relative">
            <HStack justifyContent="space-between" alignItems="center">
              <Box display="inline-flex" alignItems="center" justifyContent="center" w="11" h="11" borderRadius="full" bg="accent.highlight" color="ink.900" fontFamily="heading" fontWeight="700" aria-hidden="true">
                {i + 1}
              </Box>
              {i < tTrack.steps.length - 1 && (
                <Text as="span" aria-hidden="true" color="ink.300" fontSize="1.5rem" display={{ base: "none", xl: "inline" }}>
                  →
                </Text>
              )}
            </HStack>
            <Heading as="h3" fontFamily="heading" fontWeight="700" fontSize={{ base: "1.625rem", md: "1.875rem" }} lineHeight="1.1">
              <span className="sr-only">Stage {i + 1}: </span>
              {s.title}
            </Heading>
            <Text lineHeight="1.7">{s.text}</Text>
            {s.list && (
              <ChUl listStyle="none" m="0" p="0" display="grid" gap="2" borderTopWidth="1px" borderColor="border" pt="3">
                {s.list.map((item) => (
                  <ChLi key={item.lead + item.text} display="grid" gridTemplateColumns="auto 1fr" gap="2.5" alignItems="baseline" fontSize="0.9375rem" lineHeight="1.55">
                    <Box as="span" w="1.5" h="1.5" bg="brand.solid" transform="rotate(45deg) translateY(-2px)" aria-hidden="true" />
                    <span>
                      {item.lead && <strong>{item.lead}: </strong>}
                      {item.text}
                    </span>
                  </ChLi>
                ))}
              </ChUl>
            )}
          </ChLi>
        ))}
      </ChOl>
      <HStack mt={{ base: "8", md: "10" }} gap="3" flexWrap="wrap">
        <LinkButton href="/new-here/next-steps" variant="primary">
          Take your next step
        </LinkButton>
        <LinkButton href="/get-involved/groups" variant="secondary">
          Find an eGroup
        </LinkButton>
      </HStack>
    </Section>
  );
}

/* 4. D.E.E.P. and W.I.D.E.: two lettered columns */
function DeepWide() {
  const { purpose } = about;
  const panels = [
    { group: purpose.deep, dark: false },
    { group: purpose.wide, dark: true },
  ];
  return (
    <Box as="section" id="deep-wide" aria-labelledby="deep-wide-heading" bg="bg.canvas" py={{ base: "16", md: "24" }}>
      <Container {...container}>
        <Stack gap="4" textAlign="center" alignItems="center" maxW="46rem" mx="auto" mb={{ base: "10", md: "14" }}>
          <Heading as="h2" id="deep-wide-heading" fontFamily="heading" fontWeight="700" fontSize="clamp(2.25rem, 1.4rem + 3.4vw, 3.75rem)" lineHeight="1.05" letterSpacing="-0.02em" textWrap="balance">
            Grow <Squiggle>D.E.E.P.</Squiggle> to reach W.I.D.E.
          </Heading>
          <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.7" color="fg.muted">
            {purpose.explanation}
          </Text>
        </Stack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }} gap={{ base: "5", md: "6" }}>
          {panels.map(({ group, dark }) => (
            <Box key={group.title} p={{ base: "7", md: "10" }} borderRadius="2xl" bg={dark ? "brand.solid" : "bg.warm"} color={dark ? "white" : "fg"}>
              <Heading as="h3" fontFamily="heading" fontWeight="700" fontSize={{ base: "1.75rem", md: "2.25rem" }} lineHeight="1.1" color={dark ? "white" : "fg"}>
                {group.title}
              </Heading>
              <Text mt="2" mb="6" color={dark ? "rgba(255,255,255,0.82)" : "fg.muted"}>
                {group.summary}
              </Text>
              <ChUl listStyle="none" m="0" p="0">
                {group.letters.map((l, i) => (
                  <Box
                    as="li"
                    key={l.letter + "-" + i}
                    display="grid"
                    gridTemplateColumns="64px 1fr"
                    gap="4"
                    alignItems="center"
                    py="4"
                    borderTopWidth="1px"
                    borderColor={dark ? "rgba(255,255,255,0.2)" : "border"}
                  >
                    <Text aria-hidden="true" fontFamily="heading" fontWeight="700" fontSize="3rem" lineHeight="1" color={dark ? "accent.highlight" : "brand.fg"}>
                      {l.letter}
                    </Text>
                    <Text fontWeight="600" fontSize="1.0625rem" lineHeight="1.4">
                      {l.word}
                    </Text>
                  </Box>
                ))}
              </ChUl>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

/* 5. Core values: numbered grid */
function Values() {
  return (
    <Section id="values" tone="tint" title={about.values.title}>
      <SimpleGrid as="ol" listStyle="none" m="0" p="0" columns={{ base: 1, md: 2, lg: 3 }} columnGap="10" rowGap={{ base: "8", md: "12" }}>
        {about.values.items.map((v, i) => (
          <Box as="li" key={v.title} pt="5" borderTopWidth="2px" borderColor="ink.900">
            <Text aria-hidden="true" fontFamily="heading" fontWeight="600" fontSize="1rem" color="brand.fg" mb="3">
              {String(i + 1).padStart(2, "0")}
            </Text>
            <Heading as="h3" fontFamily="heading" fontWeight="700" fontSize={{ base: "1.375rem", md: "1.5rem" }} lineHeight="1.2" mb="2">
              {v.title}
            </Heading>
            <Text color="fg.muted" lineHeight="1.7">
              {v.text}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Section>
  );
}

/* 6. Get to know us: full-colour photo cards, title and line below each photo */
function Explore() {
  return (
    <Section tone="warm" id="explore" title="Get to know us">
      <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, sm: 2, lg: 4 }} gap={{ base: "10", md: "6" }} rowGap={{ md: "12" }}>
        {[...about.explore, ...about.more].map((c) => {
          const isPdf = "pdf" in c && c.pdf === true;
          return (
          <Box as="li" key={c.href}>
            <ChA
              asChild
              display="block"
              textDecoration="none"
              color="fg"
              borderRadius="lg"
              css={{
                "& .ph img": { transition: "transform 300ms cubic-bezier(0.23, 1, 0.32, 1)" },
                "@media (hover: hover) and (pointer: fine)": {
                  "&:hover .ph img": { transform: "scale(1.03)" },
                },
              }}
            >
              {/* PDFs open in a new tab; pages stay in the site */}
              <NextLink href={c.href} {...(isPdf ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <Box className="ph" position="relative" aspectRatio="4 / 3" borderRadius="lg" overflow="hidden" bg="bg.tint">
                  <Img slot={c.image} sizes="(min-width: 768px) 380px, 100vw" decorative />
                </Box>
                <Heading as="h3" textStyle="h4" mt="4" mb="1">
                  {c.title}
                </Heading>
                <Text color="fg.muted">{c.summary}</Text>
                <Text as="span" display="inline-block" mt="2" color="brand.fg" fontWeight="600" textDecoration="underline" textUnderlineOffset="0.25em">
                  {c.cta}
                  {isPdf && <span className="sr-only"> (opens in a new tab)</span>}
                </Text>
              </NextLink>
            </ChA>
          </Box>
          );
        })}
      </SimpleGrid>
    </Section>
  );
}

export default function AboutPage() {
  return (
    <>
      <Hero />
      <MissionVision />
      <Story />
      <Season />
      <TTrack />
      <DeepWide />
      <Values />
      <Explore />
      <NextStepBand
        tone="night"
        title="Come and see"
        text="The best way to get to know us is to join us on a Sunday."
        primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
