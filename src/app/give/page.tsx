import NextLink from "next/link";
import { Box, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ChevronDown, Landmark, Smartphone } from "lucide-react";
import { give } from "@content/give";
import { events } from "@content/events";
import { site } from "@content/site";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { CopyValue } from "@/components/CopyValue";
import { MpesaGiveForm } from "@/components/c/MpesaGiveForm";
import { Faq } from "@/components/Faq";
import { HideWhenExpired } from "@/components/HideWhenExpired";
import { Img } from "@/components/Img";
import { RichText } from "@/components/RichText";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LearnMore, learnMoreHover } from "@/components/ministries/Circled";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { ChA, ChDetails, ChLi, ChOl, ChSummary } from "@/components/primitives";

export const metadata = pageMetadata({
  title: give.meta.title,
  description: give.meta.description,
  path: "/give",
});

const ease = "cubic-bezier(0.23, 1, 0.32, 1)";
const enter = (delay: number) => ({ animation: `heroIn 700ms ${ease} ${delay}ms both` });

/** Heading + one line, set centre, as on the reference site's "Ways to Give". */
function CentreHead({ id, eyebrow, title, text }: { id: string; eyebrow?: string; title: string; text?: string }) {
  return (
    <Stack gap="3" alignItems="center" textAlign="center" maxW="44rem" mx="auto" mb={{ base: "10", md: "14" }}>
      {eyebrow && (
        <Text fontSize="0.875rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg">
          {eyebrow}
        </Text>
      )}
      <Heading as="h2" id={id} fontFamily="heading" fontWeight="700" fontSize={{ base: "2.25rem", md: "3.25rem" }} lineHeight="1.05" letterSpacing="-0.02em" textWrap="balance">
        {title}
      </Heading>
      {text && (
        <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.7" color="fg.muted" textWrap="pretty">
          {text}
        </Text>
      )}
    </Stack>
  );
}

/** A gold outline icon over each way to give, as on the reference site. */
function WayIcon({ children }: { children: React.ReactNode }) {
  return (
    <Box display="inline-flex" alignItems="center" justifyContent="center" w="16" h="16" borderRadius="full" bg="accent.subtle" color="ink.900" aria-hidden="true">
      {children}
    </Box>
  );
}

export default function GivePage() {
  const { bank } = site.giving;
  const drive = events.find((e) => e.slug === "ppi-bible-drive");
  const fund = give.funds[0];

  const quickLinks = [
    { label: "Bank transfer", href: "#bank" },
    { label: "Where it goes", href: "#impact" },
    { label: "Our financials", href: "/about/financials" },
  ];

  return (
    <>
      {/* 1. The promise, on a dark panel, with the quick links under it */}
      <Box as="header" bg="bg.canvas" pt={{ base: "5", md: "8" }} pb={{ base: "16", md: "24" }}>
        <Container maxW="container" px={{ base: "4", md: "8" }}>
          <Box px={{ base: "1", md: "0" }} mb={{ base: "4", md: "5" }}>
            <Breadcrumbs items={[{ label: "Give" }]} tone="light" />
          </Box>
          <Box position="relative" borderRadius={{ base: "xl", md: "2xl" }} overflow="hidden" bg="night.900" color="white">
            <Box position="absolute" inset="0">
              <Img slot="give.hero" priority decorative sizes="(min-width: 1280px) 1200px, 100vw" />
            </Box>
            <Box position="absolute" inset="0" bg="rgba(12, 9, 18, 0.7)" aria-hidden="true" />
            <Stack position="relative" alignItems="center" textAlign="center" gap={{ base: "6", md: "7" }} px={{ base: "6", md: "10" }} py={{ base: "16", md: "24", lg: "28" }}>
              <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize="clamp(2.75rem, 1.4rem + 5vw, 5.5rem)" lineHeight="1" letterSpacing="-0.025em" color="white" maxW="14ch" textWrap="balance" css={enter(0)}>
                {give.hero.title}
              </Heading>
              <Text fontSize={{ base: "1.0625rem", md: "1.25rem" }} lineHeight="1.65" color="rgba(255,255,255,0.9)" maxW="36rem" textWrap="pretty" css={enter(80)}>
                {give.hero.intro}
              </Text>
              <Stack direction={{ base: "column", md: "row" }} alignItems="center" gap={{ base: "5", md: "8" }} pt="2" css={enter(160)}>
                <LinkButton href="#ways" variant="accent" size="lg">
                  Give by M-Pesa
                </LinkButton>
                <HStack gap={{ base: "5", md: "7" }} flexWrap="wrap" justifyContent="center">
                  {quickLinks.map((l) => (
                    <ChA key={l.href} asChild color="white" textDecoration="none" css={{ ...learnMoreHover, "& .learn-more": { color: "white" }, "& .ring": { borderColor: "rgba(255,255,255,0.55)" } }}>
                      <NextLink href={l.href}>
                        <LearnMore label={l.label} />
                      </NextLink>
                    </ChA>
                  ))}
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* 2. Ways to give: two columns under gold icons */}
      <Box as="section" id="ways" aria-labelledby="ways-heading" bg="bg.canvas" pb={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <CentreHead id="ways-heading" title="Ways to give" text="Choose the way that works best for you." />

          <Grid templateColumns={{ base: "1fr", lg: "repeat(2, minmax(0, 1fr))" }} gap={{ base: "6", md: "8" }} maxW="68rem" mx="auto" alignItems="start">
            {/* M-Pesa */}
            <Stack id="mpesa" gap="6" p={{ base: "6", md: "10" }} borderRadius="xl" borderWidth="1px" borderColor="border" scrollMarginTop="120px">
              <Stack gap="4" alignItems="center" textAlign="center">
                <WayIcon>
                  <Smartphone size={28} strokeWidth={1.75} />
                </WayIcon>
                <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.625rem", md: "1.875rem" }}>
                  Give with M-Pesa
                </Heading>
                <Text color="fg.muted" maxW="26rem">
                  Choose what you&apos;re giving towards, and we&apos;ll send the M-Pesa prompt to your phone.
                </Text>
              </Stack>

              <MpesaGiveForm paybill={site.giving.paybill} />

              {/* The Paybill, for anyone who prefers to pay from the M-Pesa menu */}
              <Box borderTopWidth="1px" borderColor="border" pt="6">
                <Text fontWeight="700" mb="4">
                  Or pay with the Paybill
                </Text>
                <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap="5" p="5" bg="bg.warm" borderRadius="lg">
                  <CopyValue label="Paybill number" value={site.giving.paybill} />
                  <Stack gap="0.5">
                    <Text textStyle="eyebrow" color="fg.muted">
                      Account
                    </Text>
                    <Text fontWeight="600" lineHeight="1.45">
                      {site.giving.accountHint}
                    </Text>
                  </Stack>
                </Grid>
                <ChDetails mt="3" css={{ "& summary::-webkit-details-marker": { display: "none" }, "&[open] .chev": { transform: "rotate(180deg)" } }}>
                  <ChSummary display="flex" alignItems="center" gap="2" minH="11" cursor="pointer" fontWeight="600" color="brand.fg" listStyle="none">
                    Step-by-step instructions
                    <Box as="span" className="chev" display="inline-flex" transition={`transform 200ms ${ease}`} aria-hidden="true">
                      <ChevronDown size={18} />
                    </Box>
                  </ChSummary>
                  <ChOl listStyle="none" m="0" mt="2" p="0" display="grid" gap="0" borderTopWidth="1px" borderColor="border">
                    {give.mpesa.steps.map((s, i) => (
                      <ChLi key={s} display="grid" gridTemplateColumns="2rem 1fr" gap="3" alignItems="baseline" py="3" borderBottomWidth="1px" borderColor="border">
                        <Text as="span" fontFamily="heading" fontWeight="700" fontSize="0.875rem" color="brand.fg" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </Text>
                        <Text as="span">{s}</Text>
                      </ChLi>
                    ))}
                  </ChOl>
                </ChDetails>
              </Box>
            </Stack>

            {/* Bank transfer */}
            <Stack id="bank" gap="6" p={{ base: "6", md: "10" }} borderRadius="xl" borderWidth="1px" borderColor="border" scrollMarginTop="120px">
              <Stack gap="4" alignItems="center" textAlign="center">
                <WayIcon>
                  <Landmark size={28} strokeWidth={1.75} />
                </WayIcon>
                <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.625rem", md: "1.875rem" }}>
                  Give by bank transfer
                </Heading>
                <Text color="fg.muted" maxW="26rem">
                  Set this up with your bank or banking app. It works from outside Kenya too.
                </Text>
              </Stack>
              <Stack gap="5" p="5" bg="bg.warm" borderRadius="lg">
                <CopyValue label="Account number" value={bank.accountNumber} />
                <CopyValue label="SWIFT code" value={bank.swift} />
              </Stack>
              <Box as="dl" m="0" display="grid" gap="0" borderTopWidth="1px" borderColor="border">
                {[
                  ["Account name", bank.accountName],
                  ["Bank", bank.bankName],
                  ["Branch", bank.branch],
                ].map(([k, v]) => (
                  <Grid key={k} templateColumns="8rem 1fr" gap="3" py="3" borderBottomWidth="1px" borderColor="border">
                    <Text as="dt" color="fg.muted">
                      {k}
                    </Text>
                    <Text as="dd" m="0" fontWeight="600">
                      {v}
                    </Text>
                  </Grid>
                ))}
              </Box>
            </Stack>
          </Grid>

          {/* The verse, between the ways and the cause, as the reference site sets its note */}
          <Stack mt={{ base: "14", md: "20" }} gap="3" alignItems="center" textAlign="center">
            <Text fontFamily="heading" fontWeight="600" fontSize={{ base: "1.75rem", md: "2.5rem" }} lineHeight="1.15" letterSpacing="-0.015em">
              “{give.hero.scripture.text}”
            </Text>
            <Text fontSize="0.875rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg">
              {give.hero.scripture.reference}
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* 3. Where your giving goes: the current cause, on cream (hidden once the drive ends) */}
      <HideWhenExpired expires={drive?.expires ?? "2999-12-31"}>
      <Box as="section" id="impact" aria-labelledby="impact-heading" bg="bg.warm" py={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <CentreHead id="impact-heading" eyebrow="Where your giving goes" title={fund.title} />
            <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) minmax(0, 1fr)" }} gap={{ base: "10", lg: "16" }} alignItems="center" maxW="68rem" mx="auto">
              <Box position="relative" aspectRatio="4 / 3" borderRadius="lg" overflow="hidden" bg="bg.muted" boxShadow="0 30px 60px -28px rgba(22, 18, 31, 0.45)">
                <Img slot={fund.image} sizes="(min-width: 1024px) 34rem, 100vw" />
              </Box>
              <Stack gap="6">
                <Text fontSize={{ base: "1.125rem", md: "1.25rem" }} lineHeight="1.7">
                  <RichText text={fund.summary} />
                </Text>
                {/* The goal in two figures */}
                <Grid templateColumns="1fr 1fr" gap="4">
                  {[
                    { n: "700", l: "Bibles for children in our community" },
                    { n: "KSh 1,000", l: "buys one Bible" },
                  ].map((s) => (
                    <Stack key={s.n} gap="1" p="5" bg="bg.canvas" borderRadius="lg">
                      <Text fontFamily="heading" fontWeight="700" fontSize={{ base: "1.875rem", md: "2.5rem" }} lineHeight="1" letterSpacing="-0.02em">
                        {s.n}
                      </Text>
                      <Text fontSize="0.9375rem" color="fg.muted">
                        {s.l}
                      </Text>
                    </Stack>
                  ))}
                </Grid>
                <HStack gap="3" flexWrap="wrap">
                  <LinkButton href="/give?reason=ppi-bible#mpesa" size="lg">
                    Give to the Bible Drive
                  </LinkButton>
                  <LinkButton href={fund.cta.href} variant="secondary" size="lg">
                    {fund.cta.label}
                  </LinkButton>
                </HStack>
              </Stack>
            </Grid>
        </Container>
      </Box>
      </HideWhenExpired>

      {/* 4. Accountability */}
      <Box as="section" aria-labelledby="accountability-heading" bg="bg.canvas" py={{ base: "16", md: "24" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Stack gap="6" alignItems="center" textAlign="center" maxW="40rem" mx="auto">
            <Heading as="h2" id="accountability-heading" fontFamily="heading" fontWeight="700" fontSize={{ base: "2rem", md: "2.75rem" }} lineHeight="1.1" letterSpacing="-0.015em" textWrap="balance">
              See how giving is accounted for
            </Heading>
            <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} color="fg.muted">
              Read our 2025 AGM booklet and other financial reports.
            </Text>
            <HStack gap="3" flexWrap="wrap" justifyContent="center">
              <LinkButton href="/about/financials" size="lg">
                See our financials
              </LinkButton>
              <LinkButton href="/publications/agm-booklet-2025" variant="secondary" size="lg">
                Read the AGM booklet
              </LinkButton>
            </HStack>
          </Stack>
        </Container>
      </Box>

      {/* 5. Questions, set centre */}
      <Box as="section" aria-labelledby="faq-heading" bg="bg.canvas" pb={{ base: "16", md: "24" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }} borderTopWidth="1px" borderColor="border" pt={{ base: "16", md: "24" }}>
          <CentreHead id="faq-heading" title="Questions about giving" />
          <Box maxW="44rem" mx="auto" css={{ "& > div": { maxWidth: "none" } }}>
            <Faq items={give.faq} />
          </Box>
        </Container>
      </Box>

      <MinistryClosing
        title="Give your time, too"
        text="Serving on a team is another way to make a difference."
        primary={{ label: "Serve on a team", href: "/get-involved/serve" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
