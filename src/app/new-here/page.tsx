import { Box, Container, Grid, Heading, HStack, Text } from "@chakra-ui/react";
import { newHere, questionsForm } from "@content/new-here";
import { site } from "@content/site";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Form } from "@/components/Form";
import { Icon } from "@/components/icons";
import { Squiggle } from "@/components/home/Squiggle";
import { Circled } from "@/components/ministries/Circled";
import { CentreHeader, SplitRow, WelcomeRibbons } from "@/components/new-here/NewHereParts";

export const metadata = pageMetadata({
  title: "New here?",
  description: "First time at Nairobi Chapel Ngong Road? Sunday services at 9:00 and 11:30 AM. Plan your visit, take a next step, and learn what we believe.",
  path: "/new-here",
});

/** The three things a first-time guest asks first. */
const glance = [
  { icon: "clock" as const, label: "Sunday services", value: "9:00 AM and 11:30 AM" },
  { icon: "mapPin" as const, label: "Where", value: "Ngong Road, Nairobi", link: { label: "Get directions", href: site.mapUrl } },
  { icon: "baby" as const, label: "Kids", value: "Quest classes for ages 2–11", link: { label: "About Quest", href: "/ministries/quest-children" } },
];

export default function NewHerePage() {
  return (
    <>
      <CentreHeader
        crumbs={[{ label: "New Here" }]}
        title={
          <>
            <Circled>New</Circled> to Nairobi Chapel?
          </>
        }
        lead={newHere.welcome}
      >
        <HStack gap="3" flexWrap="wrap" justifyContent="center">
          <LinkButton href="/new-here/plan-your-visit" variant="accent" size="lg" arrow>
            Plan your visit
          </LinkButton>
          <LinkButton href="/watch" variant="secondary" size="lg">
            Watch online
          </LinkButton>
        </HStack>
      </CentreHeader>

      {/* At a glance: one card, three answers */}
      <Box as="section" aria-label="At a glance" bg="bg.canvas" pb={{ base: "16", md: "24" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Grid
            as="dl"
            m="0"
            templateColumns={{ base: "1fr", md: "repeat(3, minmax(0, 1fr))" }}
            maxW="64rem"
            mx="auto"
            borderRadius="xl"
            bg="bg.canvas"
            boxShadow="0 24px 60px -24px rgba(22, 18, 31, 0.3), 0 2px 6px rgba(22, 18, 31, 0.06)"
            overflow="hidden"
          >
            {glance.map((g, i) => (
              <Grid key={g.label} templateColumns="auto minmax(0, 1fr)" gap="4" p={{ base: "6", md: "7" }} borderTopWidth={{ base: i ? "1px" : "0", md: "0" }} borderLeftWidth={{ base: "0", md: i ? "1px" : "0" }} borderColor="border">
                <Box display="inline-flex" alignItems="center" justifyContent="center" w="11" h="11" borderRadius="full" bg="accent.subtle" color="ink.900" aria-hidden="true">
                  <Icon name={g.icon} size={20} />
                </Box>
                <Box>
                  <Text as="dt" fontSize="0.75rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="fg.muted" mb="1">
                    {g.label}
                  </Text>
                  <Text as="dd" m="0" fontFamily="heading" fontWeight="600" fontSize="1.1875rem" lineHeight="1.3">
                    {g.value}
                  </Text>
                  {g.link && (
                    <Box mt="2">
                      <LinkButton href={g.link.href} variant="link" size="md">
                        {g.link.label}
                      </LinkButton>
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Two rows of text beside a photograph */}
      <Box as="section" aria-labelledby="first-visit" bg="bg.canvas" pb={{ base: "20", md: "28" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }} display="grid" gap={{ base: "20", md: "28" }}>
          <SplitRow image="newhere.hero" imageAlt reverse>
            <Heading as="h2" id="first-visit" fontFamily="heading" fontWeight="700" fontSize={{ base: "2rem", md: "2.75rem" }} lineHeight="1.1" letterSpacing="-0.015em">
              Your first visit
            </Heading>
            <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.75">
              {newHere.visitIntro}
            </Text>
            <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.75" fontWeight="600">
              {newHere.saturday}
            </Text>
            <HStack gap="3" flexWrap="wrap" pt="1">
              <LinkButton href="/new-here/plan-your-visit" size="lg">
                Plan your visit
              </LinkButton>
              <LinkButton href={site.mapUrl} variant="secondary" size="lg">
                Get directions
              </LinkButton>
            </HStack>
          </SplitRow>

          <SplitRow image="nextsteps.hero" imageAlt>
            <Heading as="h2" fontFamily="heading" fontWeight="700" fontSize={{ base: "2rem", md: "2.75rem" }} lineHeight="1.15" letterSpacing="-0.015em">
              <Squiggle>Exploring faith</Squiggle>, or new to faith?
            </Heading>
            <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.75">
              {newHere.faithIntro}
            </Text>
            <HStack gap="3" flexWrap="wrap" pt="1">
              <LinkButton href="/new-here/next-steps" size="lg">
                Take a next step
              </LinkButton>
              <LinkButton href="/about/beliefs" variant="secondary" size="lg">
                What we believe
              </LinkButton>
            </HStack>
          </SplitRow>
        </Container>
      </Box>

      <WelcomeRibbons />

      {/* Got questions? A real person replies */}
      <Box as="section" id="questions" aria-label="Got questions?" bg="bg.warm" pb={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Container maxW="44rem" px={{ base: "5", md: "8" }}>
          <Box p={{ base: "6", md: "10" }} bg="bg.canvas" borderRadius="xl" boxShadow="0 24px 60px -30px rgba(22, 18, 31, 0.3)">
            <Form form={questionsForm} plain />
          </Box>
        </Container>
      </Box>
    </>
  );
}
