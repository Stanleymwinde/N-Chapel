import NextLink from "next/link";
import { Box, Container, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { about } from "@content/about";
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
/** Figma section rhythm: 96px top and bottom on desktop */
const sectionPy = { base: "16", md: "20", lg: "24" } as const;
/** Figma large section headings (48px / 54px) */
const h48 = { fontFamily: "heading", fontWeight: "700", fontSize: "clamp(2.125rem, 1.6rem + 1.9vw, 3rem)", lineHeight: "1.1" } as const;
const h54 = { fontFamily: "heading", fontWeight: "700", fontSize: "clamp(2.25rem, 1.6rem + 2.4vw, 3.375rem)", lineHeight: "1.05", letterSpacing: "-0.01em" } as const;

/* 1. Hero: tall photo left with the round badge on its corner; title, intro and a B&W photo right */
function Hero() {
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={sectionPy} overflow="hidden">
      <Container {...container}>
        <Breadcrumbs items={[{ label: "About" }]} tone="light" />
        <Grid mt={{ base: "6", md: "10" }} templateColumns={{ base: "1fr", md: "minmax(0, 570fr) minmax(0, 574fr)" }} gap={{ base: "8", md: "10", lg: "14" }} alignItems="start">
          <Box position="relative" order={{ base: 1, md: 0 }}>
            <Box position="relative" aspectRatio={{ base: "4 / 3", md: "570 / 602" }} borderRadius="10px" overflow="hidden" bg="bg.tint">
              <Img slot="about.hero-tent" priority sizes="(min-width: 768px) 570px, 100vw" />
            </Box>
            <Box position="absolute" top="-28px" right="-52px" zIndex="1" display={{ base: "none", md: "block" }} css={{ "& > div": { boxShadow: "0 4px 6px rgba(0,0,0,0.12)" } }}>
              <RoundBadge text="· Disciples · Making disciples " size={104} markSize={28} />
            </Box>
          </Box>

          <Stack gap="6" pt={{ md: "10" }} order={{ base: 0, md: 1 }}>
            <Box>
              <Heading as="h1" display="inline-block" fontFamily="heading" fontWeight="700" fontSize="clamp(3rem, 1.9rem + 3.8vw, 4.75rem)" lineHeight="1.05" letterSpacing="-0.02em" pb="0.5">
                {about.title}
                <Box aria-hidden="true" mt="0.5" h="6px" bg="accent.highlight" />
              </Heading>
            </Box>
            <Text textStyle="lead" lineHeight="1.55" color="fg.muted" maxW="504px">
              {about.intro}
            </Text>
            <Box position="relative" w="full" maxW="396px" aspectRatio="396 / 246" borderRadius="16px" overflow="hidden" bg="bg.tint" display={{ base: "none", md: "block" }}>
              <Img slot="ministries.hero" sizes="396px" />
            </Box>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

/* 2. Gold band: arched photo beside mission and vision */
function MissionVision() {
  const statement = { fontFamily: "heading", fontWeight: "700", fontSize: "clamp(2rem, 1.5rem + 1.6vw, 2.75rem)", lineHeight: "1.1", letterSpacing: "-0.005em", textWrap: "balance" } as const;
  const label = { fontSize: "1rem", fontWeight: "500", color: "fg" } as const;
  return (
    <Box as="section" aria-labelledby="mission-vision" bg="accent.highlight" color="fg" py={sectionPy}>
      <Heading as="h2" id="mission-vision" className="sr-only">
        Mission and vision
      </Heading>
      <Container {...container}>
        <Grid templateColumns={{ base: "1fr", md: "minmax(0, 450px) minmax(0, 1fr)" }} gap={{ base: "12", md: "12", lg: "70px" }} alignItems="center">
          <Box position="relative" w="full" maxW={{ base: "340px", md: "416px" }} aspectRatio="416 / 503" borderTopRadius="full" overflow="hidden" bg="night.900">
            <Img slot="nextsteps.hero" sizes="(min-width: 768px) 416px, 340px" />
          </Box>

          <Stack gap="4">
            <Text {...label}>Our mission</Text>
            <Text {...statement}>{about.mission}</Text>
            <Box h="1px" bg="rgba(28,23,38,0.2)" my="2" />
            <Text {...label}>Our vision</Text>
            <Text {...statement}>{about.vision}</Text>
            <Text textStyle="lead" lineHeight="1.55">
              {about.visionDetail}
            </Text>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

/* 3. Our story: heading and milestones left, the story right */
function Story() {
  const [lead, ...rest] = about.story.paragraphs;
  const { historyPdf, milestones } = about.story;
  return (
    <Box as="section" id="story" aria-labelledby="story-heading" bg="bg.canvas" py={sectionPy}>
      <Container {...container}>
        <Grid templateColumns={{ base: "1fr", lg: "432px minmax(0, 1fr)" }} gap={{ base: "8", lg: "16" }} alignItems="start">
          <Stack gap="7">
            <Heading as="h2" id="story-heading" {...h48}>
              {about.story.title}
            </Heading>
            {/* Three moments on a gold line */}
            <ChOl listStyle="none" m="0" p="0" aria-label="Milestones">
              {milestones.map((m) => (
                <ChLi key={m.year} display="flex" gap="3.5" alignItems="stretch">
                  <Box display="flex" flexDirection="column" alignItems="center" pt="7px" aria-hidden="true">
                    <Box w="16px" h="16px" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                      <Box w="11px" h="11px" bg="accent.highlight" transform="rotate(45deg)" />
                    </Box>
                    <Box flex="1" w="2px" bg="accent.highlight" />
                  </Box>
                  <Stack gap="1" pb="18px">
                    <Text fontFamily="heading" fontWeight="700" fontSize="1.5rem" lineHeight="1.25">
                      {m.year}
                    </Text>
                    <Text color="fg.muted" fontSize="1rem" lineHeight="1.45" maxW="348px">
                      {m.text}
                    </Text>
                  </Stack>
                </ChLi>
              ))}
            </ChOl>
          </Stack>
          <Stack gap="22px" alignItems="flex-start">
            <Text fontWeight="500" fontSize={{ base: "1.125rem", md: "1.25rem" }} lineHeight="1.5">
              <RichText text={lead} />
            </Text>
            {rest.map((p) => (
              <Text key={p} fontSize={{ base: "1.125rem", md: "1.25rem" }} lineHeight="1.65" color="ink.700">
                <RichText text={p} />
              </Text>
            ))}
            <Box pt="1">
              <LinkButton href={historyPdf.href} variant="secondary" external>
                {historyPdf.label}
                <span className="sr-only"> (PDF, {historyPdf.size})</span>
              </LinkButton>
            </Box>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
}

/* 4. Our current season: TOUCH, set large across a dark band */
function Season() {
  return (
    <Box as="section" id="season" aria-labelledby="season-heading" bg="night.900" color="white" py={sectionPy} overflow="hidden">
      <Container {...container}>
        <Stack gap="12">
          <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) 504px" }} gap={{ base: "6", lg: "16" }} alignItems="end">
            <Stack gap="3.5">
              <Text fontSize="0.875rem" fontWeight="600" letterSpacing="0.06em" textTransform="uppercase" color="accent.highlight">
                Our current season
              </Text>
              <Heading as="h2" id="season-heading" fontFamily="heading" fontWeight="700" fontSize="clamp(2.5rem, 1.7rem + 3vw, 4rem)" lineHeight="1.05" color="white">
                Global Reach
                <br />
                through
                <br />
                Local{" "}
                <Box as="span" color="accent.highlight">
                  TOUCH
                </Box>
              </Heading>
            </Stack>
            <Text textStyle="lead" lineHeight="1.6" color="night.300">
              {about.touch.intro}
            </Text>
          </Grid>

          {/* The five letters, across the full width */}
          <ChUl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "repeat(2, minmax(0, 1fr))", lg: "repeat(5, minmax(0, 1fr))" }} borderTopWidth="1px" borderColor="rgba(255,255,255,0.15)">
            {about.touch.letters.map((l, i) => (
              <Box
                as="li"
                key={l.letter}
                display="flex"
                flexDirection="column"
                gap="1.5"
                pt="7"
                pb="9"
                ps={{ base: i % 2 === 0 ? "0" : "5", lg: i === 0 ? "0" : "5" }}
                pe="4"
                borderBottomWidth={{ base: "1px", lg: "0" }}
                borderLeftWidth={{ base: i % 2 === 0 ? "0" : "1px", lg: i === 0 ? "0" : "1px" }}
                borderColor="rgba(255,255,255,0.15)"
              >
                <Text aria-hidden="true" fontFamily="heading" fontWeight="700" fontSize="4rem" lineHeight="1" color="accent.highlight" pb="3">
                  {l.letter}
                </Text>
                <Text fontFamily="heading" fontWeight="600" fontSize="1.125rem" lineHeight="1.25" color="white">
                  {l.word}
                </Text>
                <Text fontSize="1rem" color="ink.300">
                  {l.be}
                </Text>
              </Box>
            ))}
          </ChUl>

          <Box>
            <LinkButton href="/about/compass" variant="accent" arrow>
              Explore Our Compass
            </LinkButton>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

/* 5. The Transformation Track: four stages, the details under Grow and Send */
function TTrack() {
  const { tTrack } = about;
  return (
    <Box as="section" id="t-track" aria-labelledby="t-track-heading" bg="bg.warm" py={sectionPy}>
      <Container {...container}>
        <Stack gap="3" mb="10">
          <Heading as="h2" id="t-track-heading" {...h48}>
            {tTrack.title}
          </Heading>
          <Text textStyle="lead" color="fg.muted">
            {tTrack.intro}
          </Text>
        </Stack>
        <ChOl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))", xl: "repeat(4, minmax(0, 1fr))" }} gap="4">
          {tTrack.steps.map((s, i) => (
            <ChLi key={s.title} display="flex" flexDirection="column" gap="3.5" px="6" pt="6" pb="7" bg="bg.canvas" borderRadius="18px">
              <HStack justifyContent="space-between" alignItems="center">
                <Box display="inline-flex" alignItems="center" justifyContent="center" w="8" h="8" borderRadius="full" bg="accent.highlight" color="fg" fontFamily="heading" fontWeight="700" fontSize="0.875rem" aria-hidden="true">
                  {i + 1}
                </Box>
                {i < tTrack.steps.length - 1 && (
                  <Text as="span" aria-hidden="true" color="ink.300" fontSize="1.125rem">
                    →
                  </Text>
                )}
              </HStack>
              <Heading as="h3" fontFamily="heading" fontWeight="700" fontSize="1.625rem" lineHeight="1.2">
                <span className="sr-only">Stage {i + 1}: </span>
                {s.title}
              </Heading>
              <Text fontSize="1rem" lineHeight="1.55" color="ink.700">
                {s.text}
              </Text>
              {s.list && (
                <ChUl listStyle="none" m="0" p="0" display="grid" gap="2" borderTopWidth="1px" borderColor="border" pt="3.5">
                  {s.list.map((item) => (
                    <ChLi key={item.lead + item.text} display="flex" gap="2" alignItems="flex-start" fontSize="0.84375rem" lineHeight="1.5" color="ink.700">
                      <Box as="span" flexShrink={0} w="5px" h="5px" m="6px 1px 0" bg="brand.solid" transform="rotate(45deg)" aria-hidden="true" />
                      <span>
                        {item.lead && (
                          <Box as="strong" fontWeight="600" color="fg">
                            {item.lead}:
                          </Box>
                        )}
                        {item.lead ? " " : ""}
                        {item.text}
                      </span>
                    </ChLi>
                  ))}
                </ChUl>
              )}
            </ChLi>
          ))}
        </ChOl>
        <HStack mt="11" gap="3" flexWrap="wrap">
          <LinkButton href="/new-here/next-steps" variant="primary">
            Take your next step
          </LinkButton>
          <LinkButton href="/get-involved/groups" variant="secondary">
            Find an eGroup
          </LinkButton>
        </HStack>
      </Container>
    </Box>
  );
}

/* 6. Full-width photo band */
function ImageBand() {
  return (
    <Box position="relative" h={{ base: "280px", md: "460px", lg: "640px" }} overflow="hidden" bg="night.900">
      <Img slot="visit.expect" sizes="100vw" decorative />
    </Box>
  );
}

/* 7. D.E.E.P. and W.I.D.E.: two lettered panels */
function DeepWide() {
  const { purpose } = about;
  const panels = [
    { group: purpose.deep, dark: false },
    { group: purpose.wide, dark: true },
  ];
  return (
    <Box as="section" id="deep-wide" aria-labelledby="deep-wide-heading" bg="bg.canvas" py={sectionPy}>
      <Container {...container}>
        <Stack gap="5" textAlign="center" alignItems="center" maxW="640px" mx="auto" mb={{ base: "12", md: "88px" }}>
          <Heading as="h2" id="deep-wide-heading" {...h54} textWrap="balance">
            Grow <Squiggle>D.E.E.P.</Squiggle> to
            <br />
            reach W.I.D.E.
          </Heading>
          <Text textStyle="lead" lineHeight="1.6" color="fg.muted">
            {purpose.explanation}
          </Text>
        </Stack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }} gap="7">
          {panels.map(({ group, dark }) => (
            <Box key={group.title} p={{ base: "7", md: "9" }} borderRadius="20px" bg={dark ? "brand.solid" : "bg.warm"} color={dark ? "white" : "fg"}>
              <Stack gap="2" pb="6" borderBottomWidth="1px" borderColor={dark ? "rgba(255,255,255,0.2)" : "border"}>
                <Heading as="h3" fontFamily="heading" fontWeight="700" fontSize={{ base: "1.75rem", md: "2rem" }} lineHeight="1.2" color={dark ? "white" : "fg"}>
                  {group.title}
                </Heading>
                <Text textStyle="lead" color={dark ? "purple.100" : "fg.muted"}>
                  {group.summary}
                </Text>
              </Stack>
              <ChUl listStyle="none" m="0" p="0">
                {group.letters.map((l, i) => (
                  <Box
                    as="li"
                    key={l.letter + "-" + i}
                    display="flex"
                    gap="5"
                    alignItems="center"
                    minH="60px"
                    py="2"
                    borderBottomWidth={i < group.letters.length - 1 ? "1px" : "0"}
                    borderColor={dark ? "rgba(255,255,255,0.15)" : "border"}
                  >
                    <Text aria-hidden="true" w="28px" flexShrink={0} fontFamily="heading" fontWeight="700" fontSize="2.5rem" lineHeight="1" color={dark ? "accent.highlight" : "brand.fg"}>
                      {l.letter}
                    </Text>
                    <Text fontWeight="500" fontSize="1rem" lineHeight="1.4">
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

/* 8. Core values: numbered grid */
function Values() {
  return (
    <Box as="section" id="values" aria-labelledby="values-heading" bg="bg.tint" py={sectionPy}>
      <Container {...container}>
        <Heading as="h2" id="values-heading" {...h54} mb="12">
          {about.values.title}
        </Heading>
        <SimpleGrid as="ol" listStyle="none" m="0" p="0" columns={{ base: 1, md: 2, lg: 3 }} gap="12">
          {about.values.items.map((v, i) => (
            <Box as="li" key={v.title} display="flex" flexDirection="column" gap="2" minH={{ lg: "184px" }} pt="4" borderTopWidth="2px" borderColor="fg">
              <Text aria-hidden="true" fontWeight="600" fontSize="0.875rem" color="brand.fg">
                {String(i + 1).padStart(2, "0")}
              </Text>
              <Heading as="h3" fontFamily="heading" fontWeight="700" fontSize="1.375rem" lineHeight="1.25">
                {v.title}
              </Heading>
              <Text color="fg.muted" fontSize="1rem" lineHeight="1.6">
                {v.text}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

/* 9. Get to know us: photo cards, title, line and text link below each photo */
function Explore() {
  return (
    <Box as="section" id="explore" aria-labelledby="explore-heading" bg="bg.warm" py={sectionPy}>
      <Container {...container}>
        <Heading as="h2" id="explore-heading" {...h54} mb="10">
          Get to know us
        </Heading>
        <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, sm: 2, lg: 4 }} columnGap="6" rowGap="10">
          {[...about.explore, ...about.more].map((c) => {
            const isPdf = "pdf" in c && c.pdf === true;
            const size = "size" in c ? c.size : undefined;
            return (
              <Box as="li" key={c.href}>
                <ChA
                  asChild
                  display="flex"
                  flexDirection="column"
                  gap="3.5"
                  textDecoration="none"
                  color="fg"
                  borderRadius="12px"
                  css={{
                    "& .ph img": { transition: "transform 300ms cubic-bezier(0.23, 1, 0.32, 1)" },
                    "@media (hover: hover) and (pointer: fine)": {
                      "&:hover .ph img": { transform: "scale(1.03)" },
                    },
                  }}
                >
                  {/* PDFs open in a new tab; pages stay in the site */}
                  <NextLink href={c.href} {...(isPdf ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    <Box className="ph" position="relative" aspectRatio="278 / 176" borderRadius="12px" overflow="hidden" bg="bg.tint">
                      <Img slot={c.image} sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw" decorative />
                    </Box>
                    <Stack gap="1.5">
                      <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.1875rem" lineHeight="1.3">
                        {c.title}
                      </Heading>
                      <Text color="fg.muted" fontSize="1rem" lineHeight="1.5" minH={{ lg: "48px" }}>
                        {c.summary}
                      </Text>
                      <Text as="span" color="brand.fg" fontWeight="500" fontSize="1rem" lineHeight="20px" textDecoration="underline" textUnderlineOffset="0.2em">
                        {c.cta}
                        {isPdf && <span className="sr-only"> (PDF{size ? `, ${size}` : ""}, opens in a new tab)</span>}
                      </Text>
                    </Stack>
                  </NextLink>
                </ChA>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
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
      <ImageBand />
      <DeepWide />
      <Values />
      <Explore />
      <NextStepBand
        title="Come and see"
        text="The best way to get to know us is to join us on a Sunday."
        primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
        secondary={{ label: "Get counselling", href: "/ministries/counselling-care" }}
      />
    </>
  );
}
