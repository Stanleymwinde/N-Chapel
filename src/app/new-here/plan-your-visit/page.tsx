import { Box, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ShieldCheck } from "lucide-react";
import { visit, visitForm } from "@content/new-here";
import { site } from "@content/site";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Faq } from "@/components/Faq";
import { Form } from "@/components/Form";
import { Icon } from "@/components/icons";
import { Img } from "@/components/Img";
import { MapEmbed } from "@/components/MapEmbed";
import { RichText } from "@/components/RichText";
import { Squiggle } from "@/components/home/Squiggle";
import { CentreHeader, SplitRow, WelcomeRibbons } from "@/components/new-here/NewHereParts";
import { ChA, ChLi, ChUl } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "Plan your visit",
  description:
    "Sunday services at 9:00 and 11:30 AM on Ngong Road, Nairobi, plus Church @ 5 on Saturdays. Directions, kids, what to expect, and a form to let us know you're coming.",
  path: "/new-here/plan-your-visit",
});

/** Section heading: large, left, with an optional line beside it. */
function Head({ id, title, text }: { id: string; title: string; text?: string }) {
  return (
    <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) minmax(0, 1fr)" }} gap={{ base: "3", lg: "16" }} alignItems="end" mb={{ base: "8", md: "12" }}>
      <Heading as="h2" id={id} fontFamily="heading" fontWeight="700" fontSize={{ base: "2.25rem", md: "3.25rem" }} lineHeight="1.05" letterSpacing="-0.02em" textWrap="balance">
        {title}
      </Heading>
      {text && (
        <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.7" maxW="32rem" textWrap="pretty">
          {text}
        </Text>
      )}
    </Grid>
  );
}

const label = { fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "fg.muted" } as const;

export default function PlanYourVisitPage() {
  return (
    <>
      <CentreHeader
        crumbs={[{ label: "New Here", href: "/new-here" }, { label: "Plan your visit" }]}
        title={
          <>
            <Squiggle>Welcome</Squiggle> to Nairobi Chapel
          </>
        }
      />

      {/* 1. Sunday: a photograph beside the two service times */}
      <Box as="section" id="times" aria-labelledby="times-heading" bg="bg.canvas" pb={{ base: "20", md: "28" }} scrollMarginTop="96px">
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <SplitRow image="visit.hero" imageAlt ratio="5 / 4">
            <Heading as="h2" id="times-heading" fontFamily="heading" fontWeight="700" fontSize={{ base: "2rem", md: "2.75rem" }} lineHeight="1.12" letterSpacing="-0.015em" textWrap="balance">
              We&apos;d love to welcome you at one of our Sunday services.
            </Heading>
            <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.75">
              Whether it&apos;s your first time in a church or you&apos;ve been many times before, here&apos;s everything you need for your visit.
            </Text>
            <Grid templateColumns="1fr 1fr" gap="3" pt="1">
              {visit.serviceTimes.map((s) => (
                <Box key={s.time} p={{ base: "4", md: "5" }} borderRadius="lg" bg="accent.highlight" color="ink.900">
                  <Text fontSize="0.8125rem" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase">
                    {s.label}
                  </Text>
                  <Text fontFamily="heading" fontWeight="700" fontSize={{ base: "1.875rem", md: "2.25rem", xl: "2.5rem" }} lineHeight="1.05" letterSpacing="-0.02em" whiteSpace="nowrap">
                    {s.time}
                  </Text>
                </Box>
              ))}
            </Grid>
            <HStack gap="3" flexWrap="wrap" pt="2">
              <LinkButton href="#coming" size="lg">
                Let us know you&apos;re coming
              </LinkButton>
              <LinkButton href={site.mapUrl} variant="secondary" size="lg">
                Get directions
              </LinkButton>
            </HStack>
          </SplitRow>
        </Container>
      </Box>

      {/* 2. Also on Sunday */}
      <Box as="section" aria-labelledby="also-heading" bg="bg.canvas" pb={{ base: "20", md: "28" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Box borderTopWidth="1px" borderColor="border" pt={{ base: "14", md: "20" }}>
            <Head id="also-heading" title="Also on Sunday" />
          </Box>
          <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }} gap={{ base: "5", md: "6" }}>
            {visit.alsoOnSunday.map((g) => (
              <Stack as="li" key={g.title} gap="3" p={{ base: "6", md: "8" }} borderRadius="xl" borderWidth="1px" borderColor="border">
                <Text fontFamily="heading" fontWeight="700" fontSize={{ base: "1.375rem", md: "1.625rem" }} color="brand.fg">
                  {g.when}
                </Text>
                <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.25rem", md: "1.375rem" }}>
                  {g.title}
                </Heading>
                <Text lineHeight="1.7">{g.detail}</Text>
                {"href" in g && g.href && (
                  <Box pt="1">
                    <LinkButton href={g.href} variant="link">
                      {g.cta}
                    </LinkButton>
                  </Box>
                )}
              </Stack>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 3. Finding us */}
      <Box as="section" id="directions" aria-labelledby="directions-heading" bg="bg.warm" py={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 0.8fr) minmax(0, 1.2fr)" }} gap={{ base: "10", lg: "16" }} alignItems="center">
            <Stack gap="6">
              <Heading as="h2" id="directions-heading" fontFamily="heading" fontWeight="700" fontSize={{ base: "2.25rem", md: "3.25rem" }} lineHeight="1.05" letterSpacing="-0.02em">
                {visit.location.title}
              </Heading>
              <Stack gap="1">
                <Text {...label}>Address</Text>
                <Text fontFamily="heading" fontWeight="600" fontSize={{ base: "1.375rem", md: "1.625rem" }}>
                  {visit.location.address}
                </Text>
              </Stack>
              <Stack gap="1">
                <Text {...label}>Lost on the way?</Text>
                <Text fontSize="1.0625rem" lineHeight="1.7">
                  Call or WhatsApp us on{" "}
                  <ChA href={`tel:${site.phone.tel}`} fontWeight="700" color="fg" textDecoration="underline" textDecorationColor="accent.highlight" textDecorationThickness="2px" textUnderlineOffset="0.22em">
                    {site.phone.local}
                  </ChA>
                  .
                </Text>
              </Stack>
              <Box>
                <LinkButton href={site.mapUrl} variant="accent" size="lg" external>
                  Open in Google Maps
                </LinkButton>
              </Box>
            </Stack>
            <Box borderRadius="lg" overflow="hidden" boxShadow="0 30px 60px -28px rgba(22, 18, 31, 0.45)">
              <MapEmbed />
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* 4. Kids on Sunday */}
      <Box as="section" id="kids" aria-labelledby="kids-heading" bg="bg.canvas" py={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Head id="kids-heading" title={visit.kids.title} text={visit.kids.summary} />
          <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1.4fr) minmax(0, 1fr)" }} gap={{ base: "8", lg: "10" }} alignItems="start">
            <Stack gap="6">
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="5">
                {visit.kids.groups.map((g) => (
                  <Box key={g.name} p={{ base: "6", md: "7" }} borderRadius="xl" bg="bg.warm">
                    <Text fontFamily="heading" fontWeight="700" fontSize="2rem" lineHeight="1" color="brand.fg">
                      {g.name}
                    </Text>
                    <Text mt="1.5" fontSize="0.9375rem" color="fg.muted">
                      {g.meaning} · <strong>{g.ages}</strong>
                    </Text>
                    <ChUl listStyle="none" m="0" mt="5" p="0" display="grid" borderTopWidth="1px" borderColor="border">
                      {g.classes.map((c) => (
                        <ChLi key={c.name} display="grid" gridTemplateColumns="minmax(0, 1fr) auto" gap="3" alignItems="baseline" py="3" borderBottomWidth="1px" borderColor="border">
                          <span>
                            <strong>{c.name}</strong>{" "}
                            <Text as="span" color="fg.muted">
                              ({c.meaning})
                            </Text>
                          </span>
                          <Text as="span" fontWeight="600" textAlign="right">
                            <RichText text={c.age} />
                          </Text>
                        </ChLi>
                      ))}
                    </ChUl>
                  </Box>
                ))}
              </Grid>
              <Stack gap="3">
                <Text fontWeight="700">Every session includes</Text>
                <HStack gap="2" flexWrap="wrap">
                  {visit.kids.session.map((s) => (
                    <Text key={s} as="span" px="4" py="1.5" borderRadius="full" borderWidth="1px" borderColor="border.strong" fontWeight="600" fontSize="0.9375rem">
                      {s}
                    </Text>
                  ))}
                </HStack>
              </Stack>
            </Stack>

            <Stack gap="5" p={{ base: "6", md: "8" }} borderRadius="xl" bg="night.900" color="white">
              <HStack gap="3">
                <Box display="inline-flex" alignItems="center" justifyContent="center" w="11" h="11" borderRadius="full" bg="accent.highlight" color="ink.900" aria-hidden="true">
                  <ShieldCheck size={22} />
                </Box>
                <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.5rem" color="white">
                  Safety first
                </Heading>
              </HStack>
              <ChUl listStyle="none" m="0" p="0" display="grid" gap="4">
                {visit.kids.safety.map((s) => (
                  <ChLi key={s} display="grid" gridTemplateColumns="auto 1fr" gap="3" alignItems="baseline" color="rgba(255,255,255,0.92)" lineHeight="1.6">
                    <Box as="span" w="2" h="2" bg="accent.highlight" transform="rotate(45deg) translateY(-2px)" aria-hidden="true" />
                    {s}
                  </ChLi>
                ))}
              </ChUl>
              <HStack gap="4" flexWrap="wrap" pt="2">
                <LinkButton href="/ministries/quest-children" variant="accent">
                  Explore Quest
                </LinkButton>
                <LinkButton href="/safeguarding" variant="inverseOutline">
                  Safeguarding policy
                </LinkButton>
              </HStack>
            </Stack>
          </Grid>
        </Container>
      </Box>

      {/* 5. Through the week */}
      <Box as="section" id="gatherings" aria-labelledby="week-heading" bg="bg.warm" py={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Head id="week-heading" title="Through the week" text="Beyond Sunday mornings, there are more ways to worship and pray together." />
          <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }} gap={{ base: "5", md: "6" }}>
            {visit.otherGatherings.map((g) => (
              <Stack as="li" key={g.title} gap="4" p={{ base: "6", md: "8" }} bg="bg.canvas" borderRadius="xl">
                <Stack gap="0.5">
                  <Text fontSize="0.8125rem" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" color="brand.fg">
                    {g.day}
                  </Text>
                  <Text fontFamily="heading" fontWeight="700" fontSize={{ base: "1.75rem", md: "2.25rem" }} lineHeight="1.1" letterSpacing="-0.015em">
                    {g.time}
                  </Text>
                </Stack>
                <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.25rem", md: "1.375rem" }}>
                  {g.title}
                </Heading>
                <Text lineHeight="1.7">{g.summary}</Text>
                <Stack gap="2" pt="3" mt="auto" borderTopWidth="1px" borderColor="border" fontSize="0.9375rem">
                  <HStack gap="2.5">
                    <Box color="brand.fg" display="inline-flex" aria-hidden="true">
                      <Icon name="mapPin" size={16} />
                    </Box>
                    <span>{g.where}</span>
                  </HStack>
                  {"who" in g && g.who && (
                    <HStack gap="2.5">
                      <Box color="brand.fg" display="inline-flex" aria-hidden="true">
                        <Icon name="users" size={16} />
                      </Box>
                      <span>{g.who}</span>
                    </HStack>
                  )}
                </Stack>
                {"cta" in g && g.cta && (
                  <Box>
                    <LinkButton href={g.cta.href} variant="link">
                      {g.cta.label}
                    </LinkButton>
                  </Box>
                )}
              </Stack>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 6. Questions beside a photograph, as on the reference site */}
      <Box as="section" id="faq" aria-labelledby="faq-heading" bg="bg.canvas" py={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Heading as="h2" id="faq-heading" textAlign="center" fontFamily="heading" fontWeight="700" fontSize={{ base: "2.25rem", md: "3.25rem" }} lineHeight="1.05" letterSpacing="-0.02em" mb={{ base: "10", md: "14" }}>
            Your questions, answered
          </Heading>
          <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1.15fr) minmax(0, 1fr)" }} gap={{ base: "10", lg: "16" }} alignItems="center">
            <Faq items={visit.faq} />
            <Stack gap="5">
              <Box position="relative" aspectRatio="4 / 3" borderRadius="lg" overflow="hidden" bg="bg.muted" boxShadow="0 30px 60px -28px rgba(22, 18, 31, 0.45)">
                <Img slot="visit.expect" sizes="(min-width: 1024px) 34rem, 100vw" />
              </Box>
              <Text color="fg.muted">Still wondering about something? We&apos;re happy to help.</Text>
              <HStack gap="3" flexWrap="wrap">
                <LinkButton href={site.whatsapp.url} variant="secondary" external>
                  Ask on WhatsApp
                </LinkButton>
                <LinkButton href="/new-here#questions" variant="link">
                  Send a question
                </LinkButton>
              </HStack>
            </Stack>
          </Grid>
        </Container>
      </Box>

      <WelcomeRibbons />

      {/* 7. Let us know you're coming */}
      <Box as="section" id="coming" aria-label="Let us know you're coming" bg="bg.warm" pb={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Container maxW="48rem" px={{ base: "5", md: "8" }}>
          <Box p={{ base: "6", md: "10" }} bg="bg.canvas" borderRadius="xl" boxShadow="0 24px 60px -30px rgba(22, 18, 31, 0.3)">
            <Form form={visitForm} plain />
          </Box>
          <Stack mt={{ base: "10", md: "12" }} alignItems="center" textAlign="center" gap="3">
            <Text fontFamily="heading" fontWeight="600" fontSize={{ base: "1.25rem", md: "1.5rem" }}>
              After your first Sunday
            </Text>
            <Text color="fg.muted" maxW="30rem">
              Plug-In, the New Believers class, baptism and eGroups help you belong and grow.
            </Text>
            <LinkButton href="/new-here/next-steps" variant="link">
              See next steps
            </LinkButton>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
