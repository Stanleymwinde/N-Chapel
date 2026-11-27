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
function CentreHead({ id, eyebrow, title, text, mb }: { id: string; eyebrow?: string; title: string; text?: string; mb?: string }) {
  return (
    <Stack gap="10px" alignItems="center" textAlign="center" maxW="44rem" mx="auto" mb={mb ?? "8"}>
      {eyebrow && (
        <Text fontSize="12px" fontWeight="600" letterSpacing="0.72px" textTransform="uppercase" color="brand.fg">
          {eyebrow}
        </Text>
      )}
      <Heading as="h2" id={id} fontFamily="heading" fontWeight="600" fontSize={{ base: "2.25rem", md: "44px" }} lineHeight="1.15" letterSpacing="-0.66px" textWrap="balance">
        {title}
      </Heading>
      {text && (
        <Text fontSize="16px" lineHeight="1.5" color="fg.muted" textWrap="pretty">
          {text}
        </Text>
      )}
    </Stack>
  );
}

/** A gold outline icon over each way to give, as on the reference site. */
function WayIcon({ children }: { children: React.ReactNode }) {
  return (
    <Box display="inline-flex" alignItems="center" justifyContent="center" w="52px" h="52px" borderRadius="full" bg="#FDF1CC" color="ink.900" aria-hidden="true">
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
          <Box px={{ base: "1", md: "0" }} mb="6">
            <Breadcrumbs items={[{ label: "Give" }]} tone="light" />
          </Box>
          <Box position="relative" borderRadius="14px" overflow="hidden" bg="#3A2E2A" color="white">
            <Box position="absolute" inset="0">
              <Img slot="give.hero" priority decorative sizes="(min-width: 1280px) 1200px, 100vw" />
            </Box>
            <Box position="absolute" inset="0" bg="rgba(42, 31, 40, 0.7)" aria-hidden="true" />
            <Stack position="relative" alignItems="center" justifyContent="center" textAlign="center" gap="22px" px={{ base: "6", md: "10" }} py={{ base: "16", md: "12" }} minH={{ md: "512px" }}>
              <Heading as="h1" fontFamily="heading" fontWeight="600" fontSize={{ base: "2.75rem", md: "68px" }} lineHeight="1.05" letterSpacing={{ base: "-0.02em", md: "-1.36px" }} color="white" maxW="14ch" textWrap="balance" css={enter(0)}>
                {give.hero.title}
              </Heading>
              <Text fontSize={{ base: "1.0625rem", md: "18px" }} lineHeight="1.55" color="white" maxW="34rem" textWrap="pretty" css={enter(80)}>
                {give.hero.intro}
              </Text>
              <Stack direction={{ base: "column", md: "row" }} alignItems="center" gap={{ base: "5", md: "7" }} css={enter(160)}>
                <LinkButton href="#ways" variant="accent" px="26px" py="12px">
                  Give by M-Pesa
                </LinkButton>
                <HStack gap={{ base: "5", md: "7" }} flexWrap="wrap" justifyContent="center" fontSize="14px">
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

          <Grid templateColumns={{ base: "1fr", lg: "repeat(2, minmax(0, 1fr))" }} gap="6" maxW="1145px" mx="auto" alignItems="start">
            {/* M-Pesa */}
            <Stack id="mpesa" gap="3" p={{ base: "6", md: "8" }} borderRadius="16px" borderWidth="1px" borderColor="#E2DDE6" scrollMarginTop="120px">
              <Stack gap="3" alignItems="center" textAlign="center">
                <WayIcon>
                  <Smartphone size={20} strokeWidth={1.75} />
                </WayIcon>
                <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="24px" lineHeight="normal">
                  Give with M-Pesa
                </Heading>
                <Text color="fg.muted" maxW="408px" fontSize="15px" lineHeight="1.6">
                  Choose what you&apos;re giving towards, and we&apos;ll send the M-Pesa prompt to your phone.
                </Text>
              </Stack>

              <MpesaGiveForm paybill={site.giving.paybill} />

              {/* The Paybill, for anyone who prefers to pay from the M-Pesa menu */}
              <Box borderTopWidth="1px" borderColor="#E2DDE6" pt="18px" mt="3">
                <Text fontWeight="600" fontSize="15px" mb="3">
                  Or pay with the Paybill
                </Text>
                <Grid templateColumns={{ base: "1fr", sm: "180px 1fr" }} gap="6" p="4" bg="bg.warm" borderRadius="10px">
                  <CopyValue design label="Paybill number" value={site.giving.paybill} />
                  <Stack gap="6px">
                    <Text fontSize="10px" fontWeight="600" letterSpacing="0.6px" textTransform="uppercase" color="fg.muted">
                      Account
                    </Text>
                    <Text fontWeight="500" fontSize="15px" lineHeight="1.45">
                      {site.giving.accountHint}
                    </Text>
                  </Stack>
                </Grid>
                <ChDetails mt="1.5" css={{ "& summary::-webkit-details-marker": { display: "none" }, "&[open] .chev": { transform: "rotate(180deg)" } }}>
                  <ChSummary display="flex" alignItems="center" gap="1.5" minH="11" cursor="pointer" fontWeight="500" fontSize="15px" color="brand.fg" listStyle="none">
                    Step-by-step instructions
                    <Box as="span" className="chev" display="inline-flex" transition={`transform 200ms ${ease}`} aria-hidden="true">
                      <ChevronDown size={14} />
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
            <Stack id="bank" gap="3" p={{ base: "6", md: "8" }} borderRadius="16px" borderWidth="1px" borderColor="#E2DDE6" scrollMarginTop="120px">
              <Stack gap="3" alignItems="center" textAlign="center">
                <WayIcon>
                  <Landmark size={20} strokeWidth={1.75} />
                </WayIcon>
                <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="24px" lineHeight="normal">
                  Give by bank transfer
                </Heading>
                <Text color="fg.muted" maxW="408px" fontSize="15px" lineHeight="1.6">
                  Set this up with your bank or banking app. It works from outside Kenya too.
                </Text>
              </Stack>
              <Stack gap="14px" px="4" pt="4" pb="18px" mt="3" bg="bg.warm" borderRadius="10px">
                <CopyValue design label="Account number" value={bank.accountNumber} />
                <CopyValue design label="SWIFT code" value={bank.swift} />
              </Stack>
              <Box as="dl" m="0" mt="14px" display="grid" gap="0">
                {[
                  ["Account name", bank.accountName],
                  ["Bank", bank.bankName],
                  ["Branch", bank.branch],
                ].map(([k, v]) => (
                  <Grid key={k} templateColumns="144px 1fr" gap="0" py="14px" borderTopWidth="1px" borderColor="#E2DDE6" fontSize="14px">
                    <Text as="dt" color="fg.muted">
                      {k}
                    </Text>
                    <Text as="dd" m="0" fontWeight="500">
                      {v}
                    </Text>
                  </Grid>
                ))}
              </Box>
            </Stack>
          </Grid>

          {/* The verse, between the ways and the cause, as the reference site sets its note */}
          <Stack mt={{ base: "14", md: "24" }} gap="10px" alignItems="center" textAlign="center">
            <Text fontFamily="heading" fontWeight="600" fontSize={{ base: "1.75rem", md: "34px" }} lineHeight="1.2" letterSpacing="-0.17px">
              “{give.hero.scripture.text}”
            </Text>
            <Text fontSize="12px" fontWeight="600" letterSpacing="0.96px" textTransform="uppercase" color="brand.fg">
              {give.hero.scripture.reference}
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* 3. Where your giving goes: the current cause, on cream (hidden once the drive ends) */}
      <HideWhenExpired expires={drive?.expires ?? "2999-12-31"}>
      <Box as="section" id="impact" aria-labelledby="impact-heading" bg="bg.warm" py={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <CentreHead id="impact-heading" eyebrow="Where your giving goes" title={fund.title} mb="38px" />
            <Grid templateColumns={{ base: "1fr", lg: "540px minmax(0, 1fr)" }} gap={{ base: "10", lg: "12" }} alignItems="center" maxW="1152px" mx="auto">
              <Box position="relative" aspectRatio="540 / 336" borderRadius="12px" overflow="hidden" bg="bg.muted" boxShadow="0 14px 15px rgba(28, 23, 38, 0.16)">
                <Img slot={fund.image} sizes="(min-width: 1024px) 34rem, 100vw" />
              </Box>
              <Stack gap="5">
                <Text fontSize="17px" lineHeight="1.65">
                  <RichText text={fund.summary} />
                </Text>
                {/* The goal in two figures */}
                <Grid templateColumns="1fr 1fr" gap="14px">
                  {[
                    { n: "700", l: "Bibles for children in our community" },
                    { n: "KSh 1,000", l: "buys one Bible" },
                  ].map((s) => (
                    <Stack key={s.n} gap="6px" px="18px" pt="4" pb="18px" minH="116px" bg="bg.canvas" borderRadius="12px">
                      <Text fontFamily="heading" fontWeight="600" fontSize={{ base: "1.75rem", md: "32px" }} lineHeight="normal" letterSpacing="-0.32px">
                        {s.n}
                      </Text>
                      <Text fontSize="12px" lineHeight="1.5" color="fg.muted">
                        {s.l}
                      </Text>
                    </Stack>
                  ))}
                </Grid>
                <HStack gap="3" flexWrap="wrap">
                  <LinkButton href="/give?reason=ppi-bible#mpesa">
                    Give to the Bible Drive
                  </LinkButton>
                  <LinkButton href={fund.cta.href} variant="secondary">
                    {fund.cta.label}
                  </LinkButton>
                </HStack>
              </Stack>
            </Grid>
        </Container>
      </Box>
      </HideWhenExpired>

      {/* 4. Accountability */}
      <Box as="section" aria-labelledby="accountability-heading" bg="bg.canvas" pt={{ base: "16", md: "24" }} pb="14">
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Stack gap="14px" alignItems="center" textAlign="center" maxW="48rem" mx="auto">
            <Heading as="h2" id="accountability-heading" fontFamily="heading" fontWeight="600" fontSize={{ base: "2rem", md: "44px" }} lineHeight="1.15" letterSpacing="-0.66px" textWrap="balance">
              See how giving is accounted for
            </Heading>
            <Text fontSize="17px" color="fg.muted">
              Read our 2025 AGM booklet and other financial reports.
            </Text>
            <HStack gap="3" flexWrap="wrap" justifyContent="center" pt="10px">
              <LinkButton href="/about/financials">
                See our financials
              </LinkButton>
              <LinkButton href="/publications/agm-booklet-2025" variant="secondary">
                Read the AGM booklet
              </LinkButton>
            </HStack>
          </Stack>
        </Container>
      </Box>

      {/* 5. Questions, set centre */}
      <Box as="section" aria-labelledby="faq-heading" bg="bg.canvas" pb={{ base: "16", md: "24" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Box maxW="1080px" mx="auto" h="1px" bg="#E2DDE6" mb={{ base: "16", md: "24" }} />
          <CentreHead id="faq-heading" title="Questions about giving" />
          <Box maxW="864px" mx="auto" css={{ "& > div": { maxWidth: "none", borderColor: "#E2DDE6" }, "& [data-part=item]": { borderColor: "#E2DDE6" }, "& [data-part=item-trigger]": { fontWeight: "500", fontSize: "16px", minHeight: "0", paddingBlock: "16px" } }}>
            <Faq items={give.faq} />
          </Box>
        </Container>
      </Box>

      <MinistryClosing
        variant="design"
        title="Give your time, too"
        text="Serving on a team is another way to make a difference."
        primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
        secondary={{ label: "Get counselling", href: "/ministries/counselling-care" }}
      />
    </>
  );
}
