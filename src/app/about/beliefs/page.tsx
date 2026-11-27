import { Box, Container, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { beliefs } from "@content/beliefs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { NextStepBand } from "@/components/NextStepBand";
import { Img } from "@/components/Img";
import { Squiggle } from "@/components/home/Squiggle";
import { ArticleIndex } from "@/components/about/ArticleIndex";
import { pageMetadata } from "@/lib/metadata";
import { ChA, ChLi, ChOl, ChUl } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "What we believe",
  description: "What Nairobi Chapel Ngong Road believes about God, Jesus Christ, the Bible and the church.",
  path: "/about/beliefs",
});

const container = { maxW: "container", px: { base: "5", md: "8" } } as const;

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const articles = beliefs.items.map((b) => ({ ...b, id: slug(b.title) }));

/** "John 3:5–8; John 16:8–11" → ["John 3:5–8", "John 16:8–11"] */
const splitRefs = (refs: string) => refs.split(/;\s*/).filter(Boolean);

/* Light hero: title, swoosh and intro left; the open Bible right (Figma rotates the portrait photo to landscape) */
function Hero() {
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "12", md: "16", lg: "24" }} borderBottomWidth="1px" borderColor="border">
      <Container {...container}>
        <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "What we believe" }]} tone="light" />
        <Grid mt={{ base: "6", md: "8" }} templateColumns={{ base: "1fr", md: "minmax(0, 528fr) minmax(0, 586fr)" }} gap={{ base: "8", md: "12", lg: "94px" }} alignItems="center">
          <Stack gap="5">
            <Heading as="h1" fontFamily="heading" fontWeight="600" fontSize="clamp(2.75rem, 1.7rem + 3.6vw, 4.25rem)" lineHeight="1.05" letterSpacing="-0.02em">
              <Squiggle>{beliefs.title}</Squiggle>
            </Heading>
            <Text textStyle="lead" lineHeight="1.55" color="fg.muted" maxW="528px">
              {beliefs.intro}
            </Text>
          </Stack>
          <Box position="relative" aspectRatio="586.5 / 469" borderRadius="10px" overflow="hidden" bg="bg.tint">
            <Box position="absolute" top="50%" left="50%" w="79.97%" h="125.05%" transform="translate(-50%, -50%) rotate(-90deg)">
              <Img slot="beliefs.hero" priority sizes="(min-width: 768px) 470px, 80vw" />
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

/* Phones: a compact "Jump to" list instead of the sticky index */
function MobileJump() {
  return (
    <Box as="nav" aria-label="Jump to an article" display={{ base: "block", lg: "none" }} mb="10">
      <Text textStyle="label" color="fg.muted" mb="3">
        Jump to
      </Text>
      <ChUl listStyle="none" m="0" p="0" display="flex" flexWrap="wrap" gap="2">
        {articles.map((a, i) => (
          <li key={a.id}>
            <ChA
              href={`#${a.id}`}
              display="inline-flex"
              alignItems="center"
              gap="2"
              minH="44px"
              px="4"
              borderRadius="full"
              borderWidth="1px"
              borderColor="border.strong"
              color="fg"
              fontSize="0.9375rem"
              fontWeight="500"
              textDecoration="none"
              _active={{ transform: "scale(0.97)" }}
              transition="transform 160ms cubic-bezier(0.23, 1, 0.32, 1)"
            >
              <Box as="span" color="brand.fg" fontWeight="700" aria-hidden="true">
                {i + 1}
              </Box>
              {a.title}
            </ChA>
          </li>
        ))}
      </ChUl>
    </Box>
  );
}

/* One article: outlined numeral beside the title, the summary, grouped Scripture chips */
function Article({ a, n, last }: { a: (typeof articles)[number]; n: number; last: boolean }) {
  return (
    <ChLi id={a.id} scrollMarginTop="160px" display="flex" flexDirection="column" gap="18px" py={{ base: "10", md: "12" }} borderBottomWidth={last ? "0" : "1px"} borderColor="border" _first={{ pt: "0" }}>
      <Heading as="h2" display="flex" alignItems="center" gap={{ base: "4", md: "5" }} fontFamily="heading" fontWeight="600" fontSize="clamp(1.875rem, 1.45rem + 1.4vw, 2.5rem)" lineHeight="1.2" letterSpacing="-0.01em">
        <Box
          as="span"
          aria-hidden="true"
          flexShrink={0}
          fontWeight="300"
          fontSize="clamp(2.5rem, 1.9rem + 2vw, 3.375rem)"
          lineHeight="1"
          letterSpacing="0.02em"
          color="transparent"
          css={{ WebkitTextStroke: "1px var(--chakra-colors-purple-700)" }}
        >
          {String(n).padStart(2, "0")}
        </Box>
        <span className="sr-only">{n}. </span>
        {a.title}
      </Heading>
      <Text fontSize={{ base: "1.125rem", md: "1.25rem" }} lineHeight="1.6" color="fg">
        {a.summary}
      </Text>
      {a.scriptures.length > 0 && (
        <Stack gap="3.5" px="5" pt="18px" pb="5" borderRadius="8px" bg="bg.warm" borderWidth="1px" borderColor="border">
          <Heading as="h3" fontFamily="body" fontSize="0.6875rem" lineHeight="1.2" fontWeight="600" letterSpacing="0.08em" textTransform="uppercase" color="fg">
            Scripture
          </Heading>
          {a.scriptures.map((g) => (
            <Stack key={(g.label ?? "") + g.references} gap="2">
              {g.label && (
                <Text fontWeight="500" color="brand.fg" fontSize="0.75rem">
                  {g.label}
                </Text>
              )}
              <ChUl listStyle="none" m="0" p="0" display="flex" flexWrap="wrap" gap="2">
                {splitRefs(g.references).map((r) => (
                  <Box as="li" key={r} px="2.5" py="5px" borderRadius="full" bg="bg.canvas" borderWidth="1px" borderColor="border" fontSize="0.6875rem" lineHeight="1.3" color="fg" whiteSpace="nowrap">
                    {r}
                  </Box>
                ))}
              </ChUl>
            </Stack>
          ))}
        </Stack>
      )}
    </ChLi>
  );
}

export default function BeliefsPage() {
  return (
    <>
      <Hero />

      <Box as="section" aria-label="Statement of faith" pt={{ base: "12", lg: "0" }} pb={{ base: "16", md: "20", lg: "24" }}>
        <Container {...container}>
          <Grid templateColumns={{ base: "1fr", lg: "312px minmax(0, 1fr)" }} gap={{ base: "0", lg: "16", xl: "124px" }} alignItems="start">
            <Box display={{ base: "none", lg: "block" }} alignSelf="stretch">
              <ArticleIndex items={articles.map(({ id, title }) => ({ id, title }))} label="Statement of faith" variant="contents" />
            </Box>
            <Box>
              <MobileJump />
              <ChOl listStyle="none" m="0" p="0">
                {articles.map((a, i) => (
                  <Article key={a.id} a={a} n={i + 1} last={i === articles.length - 1} />
                ))}
              </ChOl>
            </Box>
          </Grid>
        </Container>
      </Box>

      <NextStepBand
        title="Ready to take a step of faith?"
        text="The New Believers class and baptism are simple next steps, and a facilitator walks with you."
        primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
        secondary={{ label: "Get counselling", href: "/ministries/counselling-care" }}
      />
    </>
  );
}
