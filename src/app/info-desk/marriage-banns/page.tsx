import Image from "next/image";
import { Box, Container, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Gem, ScrollText } from "lucide-react";
import { bannsPage } from "@content/banns";
import { getBanns } from "@/lib/cms";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/layout/Section";
import { HideWhenExpired } from "@/components/HideWhenExpired";
import { NextStepBand } from "@/components/NextStepBand";
import { Img } from "@/components/Img";
import { Squiggle } from "@/components/home/Squiggle";
import { formatLongDate, isExpired } from "@/lib/dates";
import { pageMetadata } from "@/lib/metadata";
import { ChUl } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "Marriage banns",
  description: "Marriage banns for couples planning to marry at Nairobi Chapel Ngong Road.",
  path: "/info-desk/marriage-banns",
});

const container = { maxW: "container", px: { base: "5", md: "8" } } as const;

/** Emphasise the deadline inside the notice without changing its words. */
function Notice({ text }: { text: string }) {
  const key = "14 days before the wedding";
  const i = text.indexOf(key);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <Box as="strong" color="fg" fontWeight="600">
        {key}
      </Box>
      {text.slice(i + key.length)}
    </>
  );
}

const sectionPy = { base: "16", md: "20", lg: "24" } as const;

/* Light hero: title and intro left, the rings photo right */
function Hero() {
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={sectionPy}>
      <Container {...container}>
        <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Marriage banns" }]} tone="light" />
        <Grid mt={{ base: "6", md: "7" }} templateColumns={{ base: "1fr", md: "minmax(0, 1fr) minmax(0, 614px)" }} gap={{ base: "8", md: "10", lg: "57px" }} alignItems="center">
          <Stack gap="5">
            <Heading as="h1" fontFamily="heading" fontWeight="600" fontSize="clamp(2.75rem, 1.6rem + 3.8vw, 4.5rem)" lineHeight="1.05" letterSpacing="-0.02em">
              <Squiggle>{bannsPage.title}</Squiggle>
            </Heading>
            <Text textStyle="lead" color="fg.muted" maxW="564px">
              {bannsPage.intro}
            </Text>
          </Stack>
          <Box position="relative" aspectRatio="614 / 341" borderRadius="10px" overflow="hidden" bg="bg.tint">
            <Img slot="banns.hero" priority sizes="(min-width: 768px) 614px, 100vw" />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

/* The explanation: a celebration (set large) and a notice (its own calm card) */
function Explanation() {
  const [celebration, ...notices] = bannsPage.explanation;
  return (
    <Section tone="warm" label="About marriage banns">
      <Stack gap={{ base: "10", md: "14" }} alignItems="center">
        <Text
          maxW="680px"
          textAlign="center"
          fontFamily="heading"
          fontWeight="500"
          fontSize="clamp(1.5rem, 1.2rem + 1.1vw, 2rem)"
          lineHeight="1.4"
          letterSpacing="-0.005em"
          whiteSpace="pre-line"
        >
          {celebration}
        </Text>
        {notices.map((n) => (
          <Grid
            key={n}
            w="100%"
            maxW="768px"
            templateColumns="auto 1fr"
            gap="5"
            alignItems="start"
            p={{ base: "5", md: "7" }}
            borderRadius="10px"
            bg="bg.canvas"
            borderWidth="1px"
            borderColor="border"
            borderLeftWidth="3px"
            borderLeftColor="brand.solid"
          >
            <Box w="10" h="10" borderRadius="8px" bg="bg.tint" color="brand.fg" display="flex" alignItems="center" justifyContent="center" aria-hidden="true">
              <ScrollText size={18} />
            </Box>
            <Text color="fg.muted" fontSize="0.9375rem" lineHeight="1.6">
              <Notice text={n} />
            </Text>
          </Grid>
        ))}
      </Stack>
    </Section>
  );
}

/** "Dorothy", "Kelvin" → "D & K" */
const coupleInitials = (first: string, second: string) => [first, second].map((n) => n.trim()[0]?.toUpperCase()).join(" & ");

/* One bann (Figma "Bann card"): the couple's photo (or their initials), names, date */
function BannCard({ partnerOne, partnerTwo, weddingDate, venue, photo, sample }: { partnerOne: string; partnerTwo: string; weddingDate: string; venue?: string; photo?: string; sample?: boolean }) {
  const couple = `${partnerOne} weds ${partnerTwo}`;
  return (
    <Box as="article" h="100%" display="flex" flexDirection="column" borderRadius="10px" overflow="hidden" bg="bg.canvas" borderWidth="1px" borderColor="border">
      <Box position="relative" aspectRatio="317 / 385" bg="bg.tint" overflow="hidden">
        {photo ? (
          <Image
            src={photo}
            alt={sample ? "" : couple}
            fill
            unoptimized={photo.endsWith(".svg")}
            sizes="(min-width: 1024px) 317px, (min-width: 640px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <Stack position="absolute" inset="0" alignItems="center" justifyContent="center" gap="3" color="brand.fg" aria-hidden="true">
            <Gem size={28} strokeWidth={1.5} />
            <Text fontFamily="heading" fontWeight="700" fontSize="clamp(2.5rem, 2rem + 2vw, 3.5rem)" lineHeight="1" letterSpacing="0.02em">
              {coupleInitials(partnerOne, partnerTwo)}
            </Text>
          </Stack>
        )}
        {/* Dev-only samples are flagged so they can never pass for real banns */}
        {sample && (
          <Text position="absolute" top="4" right="4" px="2.5" py="1" borderRadius="full" bg="accent.highlight" color="accent.contrast" fontSize="0.75rem" fontWeight="700">
            Sample
          </Text>
        )}
      </Box>
      <Stack gap="2.5" px="22px" pt="22px" pb="6" flex="1">
        <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.25rem", md: "1.3125rem" }} lineHeight="1.3">
          {partnerOne}{" "}
          <Box as="span" fontFamily="body" fontWeight="400" fontSize="0.875rem" color="gold.600" px="1">
            weds
          </Box>{" "}
          {partnerTwo}
        </Heading>
        <Text color="fg.muted" fontSize="1rem" lineHeight="1.5">
          Wedding on {formatLongDate(weddingDate)}
          {venue ? ` at ${venue}` : ""}
        </Text>
      </Stack>
    </Box>
  );
}

async function Upcoming() {
  const isProd = process.env.NODE_ENV === "production";
  const current = (await getBanns())
    .filter((b) => !(isProd && b.sample))
    .filter((b) => !isExpired({ expires: b.weddingDate }))
    .sort((a, b) => a.weddingDate.localeCompare(b.weddingDate));

  return (
    <Box as="section" id="upcoming" aria-labelledby="upcoming-heading" bg="bg.canvas" py={sectionPy}>
      <Container {...container}>
      <Heading as="h2" id="upcoming-heading" fontFamily="heading" fontWeight="600" fontSize="clamp(2.125rem, 1.6rem + 1.9vw, 3rem)" lineHeight="1.2" letterSpacing="-0.015em" mb="9">
        Upcoming weddings
      </Heading>
      {current.length === 0 ? (
        <Stack
          alignItems="center"
          textAlign="center"
          gap="4"
          py={{ base: "10", md: "14" }}
          px="6"
          borderRadius="lg"
          borderWidth="1px"
          borderStyle="dashed"
          borderColor="border.strong"
          maxW="44rem"
        >
          <Box w="14" h="14" borderRadius="full" bg="bg.tint" color="brand.fg" display="flex" alignItems="center" justifyContent="center" aria-hidden="true">
            <Gem size={26} strokeWidth={1.6} />
          </Box>
          <Text color="fg.muted" fontSize="1.0625rem">
            {bannsPage.emptyState}
          </Text>
        </Stack>
      ) : (
        <ChUl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 317px))" }} gap={{ base: "5", md: "6" }}>
          {current.map((b) => (
            <HideWhenExpired key={b.id} expires={b.weddingDate}>
              <li>
                <BannCard partnerOne={b.partnerOne} partnerTwo={b.partnerTwo} weddingDate={b.weddingDate} venue={b.venue} photo={b.photo} sample={b.sample} />
              </li>
            </HideWhenExpired>
          ))}
        </ChUl>
      )}
      </Container>
    </Box>
  );
}

export default function MarriageBannsPage() {
  return (
    <>
      <Hero />
      <Explanation />
      <Upcoming />
      <NextStepBand
        title="Preparing for marriage?"
        text="Talk to us about weddings and pastoral support."
        primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
        secondary={{ label: "Get counselling", href: "/ministries/counselling-care" }}
      />
    </>
  );
}
