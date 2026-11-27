import { Box, Container, Grid, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { compass, type CompassArea } from "@content/about";
import { getPublication as getPublicationBySlug } from "@/lib/cms";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { NextStepBand } from "@/components/NextStepBand";
import { LinkButton } from "@/components/Button";
import { Img } from "@/components/Img";
import { Squiggle } from "@/components/home/Squiggle";
import { pageMetadata } from "@/lib/metadata";
import { ChA, ChLi, ChOl, ChUl } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "Our Compass",
  description:
    "Our Compass: Nairobi Chapel Ngong Road's strategic plan for Vision 2030, Global Reach through Local TOUCH. Teams, One on One, Under 18, Community and Health.",
  path: "/about/compass",
});

const container = { maxW: "container", px: { base: "5", md: "8" } } as const;
const areaId = (a: CompassArea) => `touch-${a.letter.toLowerCase()}`;
const sectionPy = { base: "16", md: "20", lg: "24" } as const;
/** Figma section headings on this page: 44px bold */
const h44 = { fontFamily: "heading", fontWeight: "700", fontSize: "clamp(2rem, 1.55rem + 1.6vw, 2.75rem)", lineHeight: "1.15", letterSpacing: "-0.01em" } as const;

/* 1. Light hero: title, intro, identity and verse left; the compass photo right */
function Hero() {
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={sectionPy}>
      <Container {...container}>
        <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Our Compass" }]} tone="light" />
        <Grid mt={{ base: "6", md: "8" }} templateColumns={{ base: "1fr", md: "minmax(0, 600px) minmax(0, 505px)" }} justifyContent="space-between" gap={{ base: "8", md: "12" }} alignItems="center">
          <Stack gap="5">
            <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize="clamp(2.75rem, 1.6rem + 4vw, 4.75rem)" lineHeight="1.05" letterSpacing="-0.02em">
              <Squiggle>{compass.title}</Squiggle>
            </Heading>
            <Text textStyle="lead" color="fg.muted">
              {compass.intro}
            </Text>
            <Text fontSize="1rem" lineHeight="1.6">
              {compass.identity}
            </Text>
            <Text as="blockquote" m="0" fontSize="1rem">
              {compass.verse.text}
              <Text as="cite" display="block" mt="1.5" fontStyle="normal" fontSize="0.875rem" fontWeight="600" color="brand.fg">
                {compass.verse.ref}
              </Text>
            </Text>
          </Stack>
          <Box position="relative" aspectRatio="505 / 316" borderRadius="16px" overflow="hidden" bg="bg.tint">
            <Img slot="compass.hero" priority sizes="(min-width: 768px) 505px, 100vw" />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

/* 2. Why a Compass: three realities, then the response set large */
function Why() {
  const { why } = compass;
  return (
    <Box as="section" id="why" aria-labelledby="why-heading" bg="bg.warm" py={sectionPy}>
      <Container {...container}>
        <Stack gap="3.5" mb="11" maxW="924px">
          <Heading as="h2" id="why-heading" {...h44}>
            {why.title}
          </Heading>
          <Text textStyle="lead" lineHeight="1.6" color="fg.muted">
            {why.intro}
          </Text>
        </Stack>
        <SimpleGrid as="ol" listStyle="none" m="0" p="0" columns={{ base: 1, md: 3 }} gap={{ base: "8", md: "34px" }}>
          {why.realities.map((r, i) => (
            <Box as="li" key={r.title} display="flex" flexDirection="column" gap="2.5" pt="5" borderTopWidth="2px" borderColor="fg">
              <Text aria-hidden="true" fontWeight="600" fontSize="0.875rem" color="brand.fg">
                {String(i + 1).padStart(2, "0")}
              </Text>
              <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.375rem" lineHeight="1.25">
                {r.title}
              </Heading>
              <Text color="fg.muted" fontSize="1rem" lineHeight="1.55">
                {r.text}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
        <Text mt="11" maxW="852px" fontFamily="heading" fontWeight="600" fontSize="clamp(1.5rem, 1.2rem + 1.1vw, 2rem)" lineHeight="1.25" letterSpacing="-0.005em">
          {why.response}
        </Text>
      </Container>
    </Box>
  );
}

/* 3. The T·O·U·C·H tiles: a jump menu to the five areas */
function TouchRow() {
  return (
    <Box as="nav" aria-label="The five areas of Local TOUCH" mb="10">
      <ChUl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns="repeat(5, minmax(0, 1fr))" gap={{ base: "2", md: "3" }}>
        {compass.areas.map((a) => (
          <li key={a.letter}>
            <ChA
              href={`#${areaId(a)}`}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap="1.5"
              h={{ base: "100px", md: "150px" }}
              borderRadius="12px"
              bg="brand.solid"
              color="white"
              textDecoration="none"
              transition="background-color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)"
              _active={{ transform: "scale(0.97)" }}
              css={{ "@media (hover: hover) and (pointer: fine)": { "&:hover": { bg: "var(--chakra-colors-purple-600)" } } }}
            >
              <Box as="span" aria-hidden="true" fontFamily="heading" fontWeight="700" fontSize={{ base: "2.75rem", md: "4.75rem" }} lineHeight="1">
                {a.letter}
              </Box>
              <Box as="span" fontSize={{ base: "0.75rem", md: "1rem" }} fontWeight="600" textAlign="center" px="1">
                {a.word}
              </Box>
            </ChA>
          </li>
        ))}
      </ChUl>
    </Box>
  );
}

/* 4. One area: big letter, tag, name, text and Scripture, then its list card */
function Area({ a }: { a: CompassArea }) {
  return (
    <ChLi id={areaId(a)} scrollMarginTop="160px" py={{ base: "10", md: "50px" }} borderTopWidth="1px" borderColor="border">
      <Grid templateColumns={{ base: "1fr", md: "160px minmax(0, 1fr)", lg: "210px minmax(0, 438px) minmax(0, 438px)" }} gap={{ base: "4", md: "8", lg: "10" }} alignItems="start">
        <Text aria-hidden="true" fontFamily="heading" fontWeight="700" fontSize={{ base: "5rem", md: "6.5rem" }} lineHeight="1" color="brand.fg">
          {a.letter}
        </Text>
        <Stack gap="3.5" alignItems="flex-start">
          <Text as="span" display="inline-block" px="2.5" py="1" borderRadius="full" bg="accent.highlight" color="accent.contrast" fontSize="0.78125rem" fontWeight="600" lineHeight="1.3">
            {a.tag}
          </Text>
          <Heading as="h3" fontFamily="heading" fontWeight="700" fontSize="clamp(2rem, 1.55rem + 1.6vw, 2.75rem)" lineHeight="1.1">
            {a.word}
          </Heading>
          {a.paragraphs.map((p) => (
            <Text key={p} fontSize="1rem" lineHeight="1.6">
              {p}
            </Text>
          ))}
          <Text pt="1" fontSize="0.875rem" fontWeight="600" color="brand.fg">
            {a.scripture}
          </Text>
        </Stack>
        {a.list && (
          <Stack gap="3.5" gridColumn={{ base: "1", md: "2", lg: "auto" }} px="5" pt="22px" pb="6" borderRadius="16px" bg="bg.tint">
            <Heading as="h4" fontFamily="body" fontSize="0.75rem" fontWeight="600" letterSpacing="0.05em" textTransform="uppercase" color="fg.muted">
              {a.list.title}
            </Heading>
            <ChOl listStyle="none" m="0" p="0" display="grid" gap="3.5">
              {a.list.items.map((item, i) => (
                <Box as="li" key={typeof item === "string" ? item : item.title} display="grid" gridTemplateColumns="34px 1fr" alignItems="baseline">
                  <Text as="span" aria-hidden="true" fontWeight="700" fontSize="0.9375rem" lineHeight="1.5" color="brand.fg">
                    {i + 1}
                  </Text>
                  {typeof item === "string" ? (
                    <Text as="span" fontSize="1rem" lineHeight="1.5">
                      {item}
                    </Text>
                  ) : (
                    <Text as="span" lineHeight="1.5">
                      <Text as="strong" display="block" fontWeight="600" fontSize="1rem">
                        {item.title}
                      </Text>
                      <Text as="span" display="block" color="fg.muted" fontSize="0.96875rem">
                        {item.text}
                      </Text>
                    </Text>
                  )}
                </Box>
              ))}
            </ChOl>
          </Stack>
        )}
      </Grid>
    </ChLi>
  );
}

export default async function CompassPage() {
  const doc = await getPublicationBySlug(compass.publication);
  return (
    <>
      <Hero />
      <Why />
      <Box as="section" id="areas" aria-labelledby="areas-heading" bg="bg.canvas" py={sectionPy}>
        <Container {...container}>
          <Heading as="h2" id="areas-heading" {...h44} mb="10">
            {compass.areasTitle}
          </Heading>
          <TouchRow />
          <ChOl listStyle="none" m="0" p="0">
            {compass.areas.map((a) => (
              <Area key={a.letter} a={a} />
            ))}
          </ChOl>
        </Container>
      </Box>
      {doc && (
        <Box as="section" id="download" aria-labelledby="download-heading" bg="bg.warm" py={sectionPy}>
          <Container {...container}>
            <Stack gap="4" alignItems="flex-start">
              <Heading as="h2" id="download-heading" {...h44}>
                Read the full Compass
              </Heading>
              <Text color="fg.muted" fontSize="1.0625rem" lineHeight="1.5">
                {doc.description}
              </Text>
              <LinkButton href={"/publications/" + doc.slug} variant="primary">
                Read Our Compass
              </LinkButton>
            </Stack>
          </Container>
        </Box>
      )}
      <NextStepBand
        title="Be part of where we’re going"
        text="Join us in a season of great responsibility as we see greater personal and community impact and transformation. Find a team to serve on and help carry the vision forward."
        primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
        secondary={{ label: "Get counselling", href: "/ministries/counselling-care" }}
      />
    </>
  );
}
