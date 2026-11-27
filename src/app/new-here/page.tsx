import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { newHere, questionsForm } from "@content/new-here";
import { site } from "@content/site";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Icon } from "@/components/icons";
import { Ctas, enter, FormCard, Ringed, SplitRow, Swooshed, WelcomeRibbons, Wrap } from "@/components/new-here/NewHereParts";

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

const rowHeading = { fontFamily: "heading", fontWeight: "700", fontSize: { base: "2.25rem", md: "2.75rem" }, lineHeight: "1.1", letterSpacing: "-0.01em" } as const;
const rowText = { fontSize: "1.0625rem", lineHeight: "1.6", color: "fg.muted" } as const;

export default function NewHerePage() {
  return (
    <>
      {/* Hero: tinted band, title left, the three answers in a card */}
      <Box as="header" bg="bg.tint" pt={{ base: "8", md: "10" }} pb={{ base: "16", md: "24" }}>
        <Wrap display="flex" flexDirection="column" gap="6" alignItems="flex-start">
          <Heading as="h1" fontFamily="heading" fontWeight="800" fontSize={{ base: "2.75rem", md: "4.25rem" }} lineHeight="1.05" letterSpacing="-0.01em" textWrap="balance" css={enter(0)}>
            <Ringed variant="ellipse">New</Ringed>
            <Box as="span" display="inline-block" w="22px" />
            to Nairobi Chapel?
          </Heading>
          <Text fontSize={{ base: "1.125rem", md: "1.25rem" }} lineHeight="1.5" color="fg.muted" maxW="768px" css={enter(90)}>
            {newHere.welcome}
          </Text>
          <Box css={enter(150)}>
            <Ctas pt="2">
              <LinkButton href="/new-here/plan-your-visit" variant="accent" arrow>
                Plan your visit
              </LinkButton>
              <LinkButton href="/watch" variant="secondary" bg="bg.canvas">
                Watch online
              </LinkButton>
            </Ctas>
          </Box>

          <Grid
            as="dl"
            aria-label="At a glance"
            m="0"
            w="full"
            templateColumns={{ base: "1fr", md: "repeat(3, minmax(0, 1fr))" }}
            gap={{ base: "6", md: "8" }}
            p={{ base: "6", md: "8" }}
            bg="bg.canvas"
            borderWidth="1px"
            borderColor="border"
            borderRadius="20px"
            boxShadow="0 12px 32px rgba(92, 41, 158, 0.08)"
            css={enter(210)}
          >
            {glance.map((g) => (
              <Grid key={g.label} templateColumns="auto minmax(0, 1fr)" gap="4" alignItems="start">
                <Box display="inline-flex" p="3" borderRadius="full" bg="bg.tint" color="brand.fg" aria-hidden="true">
                  <Icon name={g.icon} size={20} />
                </Box>
                <Box display="grid" gap="1">
                  <Text as="dt" fontSize="0.75rem" fontWeight="600" letterSpacing="0.08em" textTransform="uppercase" color="fg.muted" lineHeight="normal">
                    {g.label}
                  </Text>
                  <Text as="dd" m="0" fontWeight="600" fontSize="1.0625rem" lineHeight="1.35">
                    {g.value}
                  </Text>
                  {g.link && (
                    <Box as="dd" m="0">
                      <LinkButton href={g.link.href} variant="link" arrow>
                        {g.link.label}
                      </LinkButton>
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Wrap>
      </Box>

      {/* Your first visit: copy left, photo right */}
      <Box as="section" aria-labelledby="first-visit" bg="bg.canvas" py={{ base: "16", md: "24" }}>
        <Wrap>
          <SplitRow image="newhere.hero" imageAlt>
            <Heading as="h2" id="first-visit" {...rowHeading}>
              Your first visit
            </Heading>
            <Text {...rowText}>{newHere.visitIntro}</Text>
            <Text {...rowText}>{newHere.saturday}</Text>
            <Ctas>
              <LinkButton href="/new-here/plan-your-visit">Plan your visit</LinkButton>
              <LinkButton href={site.mapUrl} variant="secondary">
                Get directions
              </LinkButton>
            </Ctas>
          </SplitRow>
        </Wrap>
      </Box>

      {/* Exploring faith: photo left, copy right, on warm */}
      <Box as="section" aria-labelledby="exploring-faith" bg="bg.warm" py={{ base: "16", md: "24" }}>
        <Wrap>
          <SplitRow image="nextsteps.hero" imageAlt photoFirst>
            <Heading as="h2" id="exploring-faith" {...rowHeading}>
              <Swooshed>Exploring faith,</Swooshed>
              <br />
              or new to faith?
            </Heading>
            <Text {...rowText}>{newHere.faithIntro}</Text>
            <Ctas>
              <LinkButton href="/new-here/next-steps">Take a next step</LinkButton>
              <LinkButton href="/about/beliefs" variant="secondary" bg="bg.canvas">
                What we believe
              </LinkButton>
            </Ctas>
          </SplitRow>
        </Wrap>
      </Box>

      <WelcomeRibbons />

      {/* Got questions? */}
      <Box as="section" id="questions" aria-label="Got questions?" bg="bg.tint" py={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Wrap>
          <FormCard form={questionsForm} large />
        </Wrap>
      </Box>
    </>
  );
}
