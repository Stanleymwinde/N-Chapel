import { Box, Container, Grid, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { compass, type CompassArea } from "@content/about";
import { getPublicationBySlug } from "@content/publications";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/layout/Section";
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

/* 1. Light hero */
function Hero() {
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "12", md: "16" }}>
      <Container {...container}>
        <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Our Compass" }]} tone="light" />
        <Grid mt={{ base: "6", md: "8" }} templateColumns={{ base: "1fr", md: "1.2fr 1fr" }} gap={{ base: "8", md: "12", lg: "16" }} alignItems="center">
          <Stack gap={{ base: "5", md: "6" }}>
            <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize="clamp(2.75rem, 1.6rem + 4.4vw, 5rem)" lineHeight="1" letterSpacing="-0.02em">
              <Squiggle>{compass.title}</Squiggle>
            </Heading>
            <Text textStyle="lead" color="fg.muted" maxW="36rem">
              {compass.intro}
            </Text>
            <Text maxW="36rem" fontSize={{ base: "1.0625rem", md: "1.125rem" }} lineHeight="1.65">
              {compass.identity}
            </Text>
            <Text as="blockquote" m="0" maxW="36rem" fontSize={{ base: "1.0625rem", md: "1.125rem" }} lineHeight="1.65">
              {compass.verse.text}
              <Text as="cite" display="block" mt="1" fontStyle="normal" textStyle="small" fontWeight="700" color="brand.fg">
                {compass.verse.ref}
              </Text>
            </Text>
          </Stack>
          <Box position="relative" aspectRatio={{ base: "16 / 9", md: "4 / 3" }} borderRadius="lg" overflow="hidden" bg="bg.tint">
            <Img slot="compass.hero" priority sizes="(min-width: 768px) 520px, 100vw" />
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
    <Section tone="warm" id="why" title={why.title} intro={why.intro}>
      <SimpleGrid as="ol" listStyle="none" m="0" p="0" columns={{ base: 1, md: 3 }} gap={{ base: "8", md: "10" }}>
        {why.realities.map((r, i) => (
          <Box as="li" key={r.title} pt="5" borderTopWidth="2px" borderColor="ink.900">
            <Text aria-hidden="true" fontFamily="heading" fontWeight="600" color="brand.fg" mb="3">
              {String(i + 1).padStart(2, "0")}
            </Text>
            <Heading as="h3" textStyle="h3" mb="3">
              {r.title}
            </Heading>
            <Text color="fg.muted">{r.text}</Text>
          </Box>
        ))}
      </SimpleGrid>
      <Text
        mt={{ base: "12", md: "16" }}
        maxW="52rem"
        fontFamily="heading"
        fontWeight="600"
        fontSize="clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem)"
        lineHeight="1.25"
        letterSpacing="-0.01em"
      >
        {why.response}
      </Text>
    </Section>
  );
}

/* 3. The T·O·U·C·H row: the page's one bold moment, and a jump menu */
function TouchRow() {
  return (
    <Box as="nav" aria-label="The five areas of Local TOUCH" mt={{ base: "2", md: "4" }} mb={{ base: "12", md: "16" }}>
      <ChUl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={{ base: "2", md: "4" }}>
        {compass.areas.map((a) => (
          <li key={a.letter}>
            <ChA
              href={`#${areaId(a)}`}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={{ base: "1", md: "2" }}
              py={{ base: "4", md: "6" }}
              borderRadius="lg"
              bg="brand.solid"
              color="white"
              textDecoration="none"
              transition="background-color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)"
              _active={{ transform: "scale(0.97)" }}
              css={{ "@media (hover: hover) and (pointer: fine)": { "&:hover": { bg: "var(--chakra-colors-purple-600)" } } }}
            >
              <Box as="span" aria-hidden="true" fontFamily="heading" fontWeight="700" fontSize="clamp(2.75rem, 1.4rem + 6vw, 6.5rem)" lineHeight="0.9">
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

/* 4. One area: big letter, name and tag, text, its list, its Scripture */
function Area({ a }: { a: CompassArea }) {
  return (
    <ChLi id={areaId(a)} scrollMarginTop="160px" py={{ base: "10", md: "14" }} borderTopWidth="1px" borderColor="border">
      <Grid templateColumns={{ base: "1fr", md: "160px 1fr", lg: "200px 1fr 1fr" }} gap={{ base: "4", md: "8", lg: "12" }} alignItems="start">
        <Text aria-hidden="true" fontFamily="heading" fontWeight="700" fontSize={{ base: "5rem", md: "7.5rem" }} lineHeight="0.85" color="brand.fg">
          {a.letter}
        </Text>
        <Stack gap="4" maxW="prose">
          <Box>
            <Text
              as="span"
              display="inline-block"
              mb="3"
              px="3"
              py="1"
              borderRadius="full"
              bg="accent.highlight"
              color="accent.contrast"
              fontSize="0.875rem"
              fontWeight="700"
            >
              {a.tag}
            </Text>
            <Heading as="h3" textStyle="h2">
              {a.word}
            </Heading>
          </Box>
          {a.paragraphs.map((p) => (
            <Text key={p} fontSize={{ base: "1.0625rem", md: "1.125rem" }} lineHeight="1.65">
              {p}
            </Text>
          ))}
          <Text textStyle="small" fontWeight="700" color="brand.fg">
            {a.scripture}
          </Text>
        </Stack>
        {a.list && (
          <Box gridColumn={{ base: "1", md: "2", lg: "auto" }} p={{ base: "5", md: "6" }} borderRadius="lg" bg="bg.tint">
            <Heading as="h4" fontFamily="body" fontSize="0.875rem" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" color="fg.muted" mb="4">
              {a.list.title}
            </Heading>
            <ChOl listStyle="none" m="0" p="0" display="grid" gap="3">
              {a.list.items.map((item, i) => (
                <Box as="li" key={typeof item === "string" ? item : item.title} display="grid" gridTemplateColumns="28px 1fr" gap="3" alignItems="baseline">
                  <Text as="span" aria-hidden="true" fontFamily="heading" fontWeight="700" color="brand.fg">
                    {i + 1}
                  </Text>
                  {typeof item === "string" ? (
                    <Text as="span" fontWeight="500">
                      {item}
                    </Text>
                  ) : (
                    <Text as="span">
                      <Text as="strong" display="block" fontWeight="700">
                        {item.title}
                      </Text>
                      <Text as="span" display="block" color="fg.muted">
                        {item.text}
                      </Text>
                    </Text>
                  )}
                </Box>
              ))}
            </ChOl>
          </Box>
        )}
      </Grid>
    </ChLi>
  );
}

export default function CompassPage() {
  const doc = getPublicationBySlug(compass.publication);
  return (
    <>
      <Hero />
      <Why />
      <Section id="areas" title={compass.areasTitle}>
        <TouchRow />
        <ChOl listStyle="none" m="0" p="0">
          {compass.areas.map((a) => (
            <Area key={a.letter} a={a} />
          ))}
        </ChOl>
      </Section>
      {doc && (
        <Section tone="warm" id="download" title="Read the full Compass">
          <Stack gap="4" maxW="prose" alignItems="flex-start">
            <Text color="fg.muted">{doc.description}</Text>
            <LinkButton href={"/publications/" + doc.slug} variant="primary">
              Read Our Compass
            </LinkButton>
          </Stack>
        </Section>
      )}
      <NextStepBand
        title="Be part of where we're going"
        text="Join us in a season of great responsibility as we see greater personal and community impact and transformation. Find a team to serve on and help carry the vision forward."
        primary={{ label: "Serve on a team", href: "/get-involved/serve" }}
        secondary={{ label: "About us", href: "/about" }}
      />
    </>
  );
}
