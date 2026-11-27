import { Box, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Shield } from "lucide-react";
import { visit, visitForm } from "@content/new-here";
import { site } from "@content/site";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/icons";
import { Img } from "@/components/Img";
import { RichText } from "@/components/RichText";
import { enter, FormCard, infoLabel, sectionHeading, SmallCrumbs, Swooshed, WelcomeRibbons, Wrap } from "@/components/new-here/NewHereParts";
import { ChA, ChLi, ChUl } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "Plan your visit",
  description:
    "Sunday services at 9:00 and 11:30 AM on Ngong Road, Nairobi, plus Church @ 5 on Saturdays. Directions, kids, what to expect, and a form to let us know you're coming.",
  path: "/new-here/plan-your-visit",
});

/** Heading on the left, a short line of text on the right (Figma "Header" rows). */
function Head({ id, title, text, textW }: { id: string; title: string; text: string; textW: string }) {
  return (
    <Grid templateColumns={{ base: "1fr", lg: `minmax(0, 1fr) ${textW}` }} gap={{ base: "3", lg: "10" }} alignItems="center">
      <Heading as="h2" id={id} {...sectionHeading}>
        {title}
      </Heading>
      <Text lineHeight="1.65">{text}</Text>
    </Grid>
  );
}

/** Small pill buttons inside cards (Figma: 18 × 10 padding, 14px label). */
const smallButton = { px: "18px", py: "10px", minH: "0", fontSize: "0.875rem" } as const;

export default function PlanYourVisitPage() {
  return (
    <>
      {/* 1. Welcome: centred title, photograph beside the two service times */}
      <Box as="header" bg="bg.canvas" pt={{ base: "8", md: "10" }} pb={{ base: "16", md: "24" }}>
        <Wrap>
          <SmallCrumbs items={[{ label: "New Here", href: "/new-here" }, { label: "Plan your visit" }]} />
          <Heading
            as="h1"
            py={{ base: "10", md: "14" }}
            textAlign="center"
            fontFamily="heading"
            fontWeight="600"
            fontSize={{ base: "3rem", md: "4.5rem" }}
            lineHeight="1.05"
            letterSpacing="-0.02em"
            css={enter(0)}
          >
            <Swooshed src="/media/newhere/swoosh.svg">Welcome to</Swooshed>
            <br />
            Nairobi Chapel
          </Heading>

          <Grid id="times" scrollMarginTop="96px" templateColumns={{ base: "minmax(0, 1fr)", lg: "minmax(0, 592px) minmax(0, 1fr)" }} gap={{ base: "8", lg: "12" }} alignItems="center" css={enter(120)}>
            <Box position="relative" aspectRatio="592 / 328" borderRadius="12px" overflow="hidden" bg="bg.muted">
              <Img slot="visit.expect" priority sizes="(min-width: 1024px) 592px, 100vw" />
            </Box>
            <Stack gap="18px">
              <Heading as="h2" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.75rem", md: "2.25rem" }} lineHeight="1.15" letterSpacing="-0.01em" textWrap="balance">
                We&apos;d love to welcome you at one of our Sunday services.
              </Heading>
              <Text lineHeight="1.6" color="fg.muted">
                Whether it&apos;s your first time in a church or you&apos;ve been many times before, here&apos;s everything you need for your visit.
              </Text>
              <Grid as="dl" m="0" templateColumns="1fr 1fr" gap="3">
                {visit.serviceTimes.map((s) => (
                  <Box key={s.time} pt="14px" pb="4" px="18px" borderRadius="8px" bg="accent.highlight" color="ink.900">
                    <Text as="dt" fontSize="0.625rem" fontWeight="600" letterSpacing="0.06em" textTransform="uppercase">
                      {s.label}
                    </Text>
                    <Text as="dd" m="0" mt="0.5" fontFamily="heading" fontWeight="700" fontSize={{ base: "1.75rem", md: "2rem" }} lineHeight="normal" letterSpacing="-0.01em" whiteSpace="nowrap">
                      {s.time}
                    </Text>
                  </Box>
                ))}
              </Grid>
              <HStack gap="3" flexWrap="wrap">
                <LinkButton href="#coming" px="20px">
                  Let us know you&apos;re coming
                </LinkButton>
                <LinkButton href={site.mapUrl} variant="secondary" px="20px">
                  Get directions
                </LinkButton>
              </HStack>
            </Stack>
          </Grid>

          <Box pt={{ base: "14", md: "20" }}>
            <Box h="1px" bg="border" maxW="1000px" />
          </Box>
        </Wrap>
      </Box>

      {/* 2. Also on Sunday */}
      <Box as="section" aria-labelledby="also-heading" bg="bg.canvas" pb={{ base: "16", md: "24" }}>
        <Wrap>
          <Heading as="h2" id="also-heading" {...sectionHeading} mb="8">
            Also on Sunday
          </Heading>
          <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }} gap="6">
            {visit.alsoOnSunday.map((g) => (
              <Stack as="li" key={g.title} gap="3" pt="7" pb="30px" px="7" borderRadius="14px" borderWidth="1px" borderColor="border">
                <Text fontFamily="heading" fontWeight="600" fontSize="1.375rem" lineHeight="normal" color="brand.fg">
                  {g.when}
                </Text>
                <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.0625rem" lineHeight="normal">
                  {g.title}
                </Heading>
                <Text fontSize="0.9375rem" lineHeight="1.6">
                  {g.detail}
                </Text>
                {"href" in g && g.href && (
                  <Box pt="2">
                    <LinkButton href={g.href} variant="link">
                      {g.cta}
                    </LinkButton>
                  </Box>
                )}
              </Stack>
            ))}
          </Grid>
        </Wrap>
      </Box>

      {/* 3. Finding us */}
      <Box as="section" id="directions" aria-labelledby="directions-heading" bg="bg.warm" py={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Wrap>
          <Grid templateColumns={{ base: "minmax(0, 1fr)", lg: "456px minmax(0, 1fr)" }} gap={{ base: "10", lg: "20" }} alignItems="center">
            <Stack gap="10px">
              <Heading as="h2" id="directions-heading" {...sectionHeading} mb="5">
                {visit.location.title}
              </Heading>
              <Text {...infoLabel}>Address</Text>
              <Text fontFamily="heading" fontWeight="600" fontSize="1.375rem" lineHeight="normal" mb="5">
                {visit.location.address}
              </Text>
              <Text {...infoLabel}>Lost on the way?</Text>
              <Text fontSize="0.9375rem">
                Call or WhatsApp us on{" "}
                <ChA href={`tel:${site.phone.tel}`} fontWeight="600" color="fg" textDecoration="underline" textUnderlineOffset="0.2em">
                  {site.phone.local}
                </ChA>
                .
              </Text>
            </Stack>
            {/* Map card: a static map that opens Google Maps (no heavy embed) */}
            <ChA
              href={site.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              display="block"
              position="relative"
              aspectRatio="648 / 305"
              borderRadius="14px"
              borderWidth="1px"
              borderColor="brand.solid"
              overflow="hidden"
              bg="bg.warm"
              boxShadow="0 12px 30px rgba(28, 23, 38, 0.12)"
              transition="transform 200ms cubic-bezier(0.23, 1, 0.32, 1)"
              _hover={{ transform: "translateY(-2px)" }}
              _focusVisible={{ outline: "3px solid", outlineColor: "brand.solid", outlineOffset: "3px" }}
            >
              <Img slot="newhere.visit-map" sizes="(min-width: 1024px) 648px, 100vw" />
              <span className="sr-only"> Open in Google Maps (opens in a new tab)</span>
            </ChA>
          </Grid>
        </Wrap>
      </Box>

      {/* 4. Kids on Sunday */}
      <Box as="section" id="kids" aria-labelledby="kids-heading" bg="bg.canvas" py={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Wrap display="grid" gap="7">
          <Head id="kids-heading" title={visit.kids.title} text={visit.kids.summary} textW="430px" />
          <Grid templateColumns={{ base: "minmax(0, 1fr)", md: "1fr 1fr", xl: "296px 296px minmax(0, 1fr)" }} gap="4" alignItems="stretch">
            {visit.kids.groups.map((g) => (
              <Box key={g.name} p="22px" borderRadius="14px" bg="bg.warm">
                <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.5rem" lineHeight="normal" color="brand.fg">
                  {g.name}
                </Heading>
                <Text mt="1" fontSize="0.75rem" color="fg.muted">
                  {g.meaning} ·{" "}
                  <Text as="strong" fontWeight="600" color="fg">
                    {g.ages}
                  </Text>
                </Text>
                <ChUl listStyle="none" m="0" mt="2.5" p="0" display="grid" fontSize="0.875rem">
                  {g.classes.map((c) => (
                    <ChLi key={c.name} display="flex" justifyContent="space-between" gap="3" py="3" borderTopWidth="1px" borderColor="border">
                      <span>
                        <Text as="span" fontWeight="500">
                          {c.name}
                        </Text>{" "}
                        <Text as="span" color="fg.muted">
                          ({c.meaning})
                        </Text>
                      </span>
                      <Text as="span" textAlign="right">
                        <RichText text={c.age} />
                      </Text>
                    </ChLi>
                  ))}
                </ChUl>
              </Box>
            ))}

            <Stack gridColumn={{ md: "1 / -1", xl: "auto" }} gap="14px" p="26px" borderRadius="14px" bg="night.900" color="white">
              <HStack gap="3">
                <Box display="inline-flex" alignItems="center" justifyContent="center" w="9" h="9" borderRadius="full" bg="accent.highlight" color="ink.900" aria-hidden="true">
                  <Shield size={16} />
                </Box>
                <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.25rem" color="white">
                  Safety first
                </Heading>
              </HStack>
              <ChUl listStyle="none" m="0" p="0" display="grid" gap="14px">
                {visit.kids.safety.map((s) => (
                  <ChLi key={s} display="grid" gridTemplateColumns="auto 1fr" gap="10px" alignItems="baseline" fontSize="0.875rem" lineHeight="1.55">
                    <Box as="span" color="accent.highlight" fontSize="9px" aria-hidden="true">
                      ◆
                    </Box>
                    {s}
                  </ChLi>
                ))}
              </ChUl>
              <HStack gap="10px" flexWrap="wrap" pt="1.5">
                <LinkButton href="/ministries/quest-children" variant="accent" {...smallButton}>
                  Explore Quest
                </LinkButton>
                <LinkButton href="/safeguarding" variant="inverseOutline" {...smallButton}>
                  Safeguarding policy
                </LinkButton>
              </HStack>
            </Stack>
          </Grid>
          <Stack gap="10px">
            <Text fontWeight="600" fontSize="0.9375rem">
              Every session includes
            </Text>
            <HStack as="ul" listStyle="none" m="0" p="0" gap="2" flexWrap="wrap">
              {visit.kids.session.map((s) => (
                <Box as="li" key={s} px="14px" py="7px" borderRadius="full" borderWidth="1px" borderColor="border" fontSize="0.8125rem" lineHeight="normal">
                  {s}
                </Box>
              ))}
            </HStack>
          </Stack>
        </Wrap>
      </Box>

      {/* 5. Through the week */}
      <Box as="section" id="gatherings" aria-labelledby="week-heading" bg="bg.warm" py={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Wrap display="grid" gap="7">
          <Head id="week-heading" title="Through the week" text="Beyond Sunday mornings, there are more ways to worship and pray together." textW="516px" />
          <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }} gap="6">
            {visit.otherGatherings.map((g) => (
              <Stack as="li" key={g.title} gap="10px" p="26px" bg="bg.canvas" borderRadius="14px">
                <Text fontSize="0.6875rem" fontWeight="600" letterSpacing="0.04em" textTransform="uppercase" color="brand.fg" lineHeight="normal">
                  {g.day}
                </Text>
                <Text fontFamily="heading" fontWeight="600" fontSize={{ base: "1.625rem", md: "1.875rem" }} lineHeight="normal" letterSpacing="-0.005em">
                  {g.time}
                </Text>
                <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.125rem" lineHeight="normal">
                  {g.title}
                </Heading>
                <Text fontSize="0.9375rem" lineHeight="1.65">
                  {g.summary}
                </Text>
                <Stack gap="2" pt="14px" mt="auto" borderTopWidth="1px" borderColor="border" fontSize="0.8125rem">
                  <HStack gap="2">
                    <Box display="inline-flex" aria-hidden="true">
                      <Icon name="mapPin" size={13} />
                    </Box>
                    <span>{g.where}</span>
                  </HStack>
                  {"who" in g && g.who && (
                    <HStack gap="2">
                      <Box display="inline-flex" aria-hidden="true">
                        <Icon name="users" size={13} />
                      </Box>
                      <span>{g.who}</span>
                    </HStack>
                  )}
                  {"cta" in g && g.cta && (
                    <Box pt="2">
                      <LinkButton href={g.cta.href} variant="link">
                        {g.cta.label}
                      </LinkButton>
                    </Box>
                  )}
                </Stack>
              </Stack>
            ))}
          </Grid>
        </Wrap>
      </Box>

      {/* 6. Questions beside a photograph */}
      <Box as="section" id="faq" aria-labelledby="faq-heading" bg="bg.canvas" py={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Wrap>
          <Heading as="h2" id="faq-heading" {...sectionHeading} textAlign="center" mb="10">
            Your questions, answered
          </Heading>
          <Grid templateColumns={{ base: "minmax(0, 1fr)", lg: "600px minmax(0, 1fr)" }} gap={{ base: "10", lg: "12" }} alignItems="start">
            <Box
              css={{
                "& > div": { maxWidth: "none" },
                "& button": { fontSize: "0.9375rem", fontWeight: "500", minHeight: "0", paddingBlock: "16px", paddingInline: "0" },
                "& button svg": { width: "15px", height: "15px" },
              }}
            >
              <Faq items={visit.faq} />
            </Box>
            <Stack gap="14px" alignItems="flex-start">
              <Box position="relative" w="full" aspectRatio="608 / 338" borderRadius="12px" overflow="hidden" bg="bg.muted">
                <Img slot="newhere.visit-worship" sizes="(min-width: 1024px) 608px, 100vw" />
              </Box>
              <Text fontSize="0.9375rem" color="fg.muted">
                Still wondering about something? We&apos;re happy to help.
              </Text>
              <HStack gap="14px" flexWrap="wrap">
                <LinkButton href={site.whatsapp.url} variant="secondary" external {...smallButton}>
                  Ask on WhatsApp
                </LinkButton>
                <LinkButton href="/new-here#questions" variant="link">
                  Send a question
                </LinkButton>
              </HStack>
            </Stack>
          </Grid>
        </Wrap>
      </Box>

      <WelcomeRibbons tall />

      {/* 7. Let us know you're coming */}
      <Box as="section" id="coming" aria-label="Let us know you're coming" bg="bg.warm" pb={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Wrap>
          <FormCard form={visitForm} />
          <Stack mt="12" alignItems="center" textAlign="center" gap="3">
            <Text fontFamily="heading" fontWeight="600" fontSize="1.375rem">
              After your first Sunday
            </Text>
            <Text color="fg.muted" lineHeight="1.6" maxW="458px">
              Plug-In, the New Believers class, baptism and eGroups help you belong and grow.
            </Text>
            <LinkButton href="/new-here/next-steps" variant="link">
              See next steps
            </LinkButton>
          </Stack>
        </Wrap>
      </Box>
    </>
  );
}
