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

/* Light hero, in the same family as the About page */
function Hero() {
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "12", md: "16" }} borderBottomWidth="1px" borderColor="border">
      <Container {...container}>
        <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "What we believe" }]} tone="light" />
        <Grid mt={{ base: "6", md: "8" }} templateColumns={{ base: "1fr", md: "1.2fr 1fr" }} gap={{ base: "8", md: "12", lg: "16" }} alignItems="center">
          <Stack gap={{ base: "5", md: "6" }}>
            <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize="clamp(2.75rem, 1.6rem + 4.4vw, 5rem)" lineHeight="1" letterSpacing="-0.02em">
              <Squiggle>{beliefs.title}</Squiggle>
            </Heading>
            <Text textStyle="lead" color="fg.muted" maxW="34rem">
              {beliefs.intro}
            </Text>
          </Stack>
          <Box position="relative" aspectRatio={{ base: "16 / 9", md: "4 / 3" }} borderRadius="lg" overflow="hidden" bg="bg.tint">
            <Img slot="beliefs.hero" priority sizes="(min-width: 768px) 520px, 100vw" />
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

/* One article: outlined numeral, title, lead summary, grouped Scripture pills */
function Article({ a, n }: { a: (typeof articles)[number]; n: number }) {
  return (
    <ChLi id={a.id} scrollMarginTop="160px" py={{ base: "10", md: "14" }} borderTopWidth="1px" borderColor="border" _first={{ borderTopWidth: "0", pt: "0" }}>
      <Grid templateColumns={{ base: "1fr", md: "120px 1fr" }} gap={{ base: "3", md: "6" }} alignItems="start">
        <Text
          aria-hidden="true"
          fontFamily="heading"
          fontWeight="700"
          fontSize={{ base: "3.5rem", md: "4.5rem" }}
          lineHeight="0.9"
          whiteSpace="nowrap"
          color="transparent"
          css={{ WebkitTextStroke: "1.5px var(--chakra-colors-purple-700)" }}
        >
          {String(n).padStart(2, "0")}
        </Text>
        <Stack gap="5" maxW="prose">
          <Heading as="h2" textStyle="h2">
            <span className="sr-only">{n}. </span>
            {a.title}
          </Heading>
          <Text fontSize={{ base: "1.125rem", md: "1.25rem" }} lineHeight="1.65" color="fg">
            {a.summary}
          </Text>
          {a.scriptures.length > 0 && (
            <Box mt="2" p={{ base: "5", md: "6" }} borderRadius="lg" bg="bg.warm" borderWidth="1px" borderColor="border">
              <Heading as="h3" fontFamily="body" fontSize="0.875rem" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" color="fg.muted" mb="4">
                Scripture
              </Heading>
              <Stack gap="4">
                {a.scriptures.map((g) => (
                  <Box key={(g.label ?? "") + g.references}>
                    {g.label && (
                      <Text fontWeight="700" color="brand.fg" fontSize="0.9375rem" mb="2">
                        {g.label}
                      </Text>
                    )}
                    <ChUl listStyle="none" m="0" p="0" display="flex" flexWrap="wrap" gap="2">
                      {splitRefs(g.references).map((r) => (
                        <Box
                          as="li"
                          key={r}
                          px="3"
                          py="1"
                          borderRadius="full"
                          bg="bg.canvas"
                          borderWidth="1px"
                          borderColor="purple.200"
                          fontSize="0.875rem"
                          fontWeight="500"
                          color="ink.700"
                          whiteSpace="nowrap"
                        >
                          {r}
                        </Box>
                      ))}
                    </ChUl>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      </Grid>
    </ChLi>
  );
}

export default function BeliefsPage() {
  return (
    <>
      <Hero />

      <Box as="section" aria-label="Statement of faith" py={{ base: "12", md: "20" }}>
        <Container {...container}>
          <Grid templateColumns={{ base: "1fr", lg: "240px 1fr" }} gap={{ base: "0", lg: "16" }} alignItems="start">
            <Box display={{ base: "none", lg: "block" }} alignSelf="stretch">
              <ArticleIndex items={articles.map(({ id, title }) => ({ id, title }))} label="Statement of faith" />
            </Box>
            <Box>
              <MobileJump />
              <ChOl listStyle="none" m="0" p="0">
                {articles.map((a, i) => (
                  <Article key={a.id} a={a} n={i + 1} />
                ))}
              </ChOl>
            </Box>
          </Grid>
        </Container>
      </Box>

      <NextStepBand
        title="Ready to take a step of faith?"
        text="The New Believers class and baptism are simple next steps, and a facilitator walks with you."
        primary={{ label: "See next steps", href: "/new-here/next-steps" }}
        secondary={{ label: "Talk to us", href: "/contact" }}
      />
    </>
  );
}
