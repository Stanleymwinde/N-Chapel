import Image from "next/image";
import { Box, Container, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Gem, ScrollText } from "lucide-react";
import { banns, bannsPage } from "@content/banns";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/layout/Section";
import { HideWhenExpired } from "@/components/HideWhenExpired";
import { NextStepBand } from "@/components/NextStepBand";
import { Img } from "@/components/Img";
import { Squiggle } from "@/components/home/Squiggle";
import { dateParts, formatLongDate, isExpired, parseDate } from "@/lib/dates";
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
      <Box as="strong" color="fg" fontWeight="700">
        {key}
      </Box>
      {text.slice(i + key.length)}
    </>
  );
}

/* Light hero, in the About family */
function Hero() {
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "12", md: "16" }}>
      <Container {...container}>
        <Breadcrumbs items={[{ label: "Info Desk" }, { label: "Marriage banns" }]} tone="light" />
        <Grid mt={{ base: "6", md: "8" }} templateColumns={{ base: "1fr", md: "1.2fr 1fr" }} gap={{ base: "8", md: "12", lg: "16" }} alignItems="center">
          <Stack gap={{ base: "5", md: "6" }}>
            <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize="clamp(2.75rem, 1.6rem + 4.4vw, 5rem)" lineHeight="1" letterSpacing="-0.02em">
              <Squiggle>{bannsPage.title}</Squiggle>
            </Heading>
            <Text textStyle="lead" color="fg.muted" maxW="32rem">
              {bannsPage.intro}
            </Text>
          </Stack>
          <Box position="relative" aspectRatio={{ base: "16 / 9", md: "4 / 3" }} borderRadius="lg" overflow="hidden" bg="bg.tint">
            <Img slot="banns.hero" priority sizes="(min-width: 768px) 520px, 100vw" />
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
      <Stack gap={{ base: "12", md: "16" }} alignItems="center">
        <Text
          maxW="48rem"
          textAlign="center"
          fontFamily="heading"
          fontWeight="500"
          fontSize="clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem)"
          lineHeight="1.35"
          letterSpacing="-0.005em"
          textWrap="balance"
        >
          {celebration}
        </Text>
        {notices.map((n) => (
          <Grid
            key={n}
            w="100%"
            maxW="44rem"
            templateColumns="auto 1fr"
            gap="5"
            alignItems="start"
            p={{ base: "6", md: "8" }}
            borderRadius="lg"
            bg="bg.canvas"
            borderWidth="1px"
            borderColor="border"
            borderLeftWidth="4px"
            borderLeftColor="brand.solid"
          >
            <Box w="11" h="11" borderRadius="md" bg="brand.subtle" color="brand.fg" display="flex" alignItems="center" justifyContent="center" aria-hidden="true">
              <ScrollText size={22} />
            </Box>
            <Text color="fg.muted" fontSize={{ base: "1rem", md: "1.0625rem" }} lineHeight="1.7">
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

/* One bann: the couple's photo (or their initials), date badge, names */
function BannCard({ partnerOne, partnerTwo, weddingDate, venue, photo, sample }: { partnerOne: string; partnerTwo: string; weddingDate: string; venue?: string; photo?: string; sample?: boolean }) {
  const parts = dateParts(weddingDate);
  const year = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Nairobi", year: "numeric" }).format(parseDate(weddingDate));
  const couple = `${partnerOne} weds ${partnerTwo}`;
  return (
    <Box as="article" h="100%" display="flex" flexDirection="column" borderRadius="lg" overflow="hidden" bg="bg.canvas" borderWidth="1px" borderColor="border">
      {/* Photo frame */}
      <Box position="relative" aspectRatio="4 / 5" bg="bg.tint" overflow="hidden">
        {photo ? (
          <Image
            src={photo}
            alt={sample ? "" : couple}
            fill
            unoptimized={photo.endsWith(".svg")}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
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
        {sample && (
          <Text position="absolute" top="4" right="4" px="2.5" py="1" borderRadius="full" bg="accent.highlight" color="accent.contrast" fontSize="0.75rem" fontWeight="700">
            Sample
          </Text>
        )}
        {/* Date badge pinned to the photo */}
        <Stack
          position="absolute"
          top="4"
          left="4"
          gap="0"
          alignItems="center"
          minW="68px"
          py="2"
          px="3"
          borderRadius="md"
          bg="brand.solid"
          color="white"
          boxShadow="card"
          aria-hidden="true"
        >
          <Text fontSize="0.75rem" fontWeight="700" letterSpacing="0.08em">
            {parts.month}
          </Text>
          <Text fontFamily="heading" fontWeight="700" fontSize="1.875rem" lineHeight="1">
            {parts.day}
          </Text>
          <Text fontSize="0.75rem" opacity={0.85}>
            {year}
          </Text>
        </Stack>
      </Box>
      {/* Names and date */}
      <Stack gap="2" p={{ base: "5", md: "6" }} flex="1">
        <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.375rem", md: "1.5rem" }} lineHeight="1.25">
          {partnerOne}{" "}
          <Box as="span" fontStyle="italic" fontWeight="500" fontSize="0.72em" color="gold.600" px="0.5">
            weds
          </Box>{" "}
          {partnerTwo}
        </Heading>
        <Text color="fg.muted">
          Wedding on {formatLongDate(weddingDate)}
          {venue ? ` at ${venue}` : ""}
        </Text>
      </Stack>
    </Box>
  );
}

function Upcoming() {
  const isProd = process.env.NODE_ENV === "production";
  const current = banns
    .filter((b) => !(isProd && b.sample))
    .filter((b) => !isExpired({ expires: b.weddingDate }))
    .sort((a, b) => a.weddingDate.localeCompare(b.weddingDate));

  return (
    <Section id="upcoming" title="Upcoming weddings">
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
        <ChUl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={{ base: "5", md: "6" }}>
          {current.map((b) => (
            <HideWhenExpired key={b.id} expires={b.weddingDate}>
              <li>
                <BannCard partnerOne={b.partnerOne} partnerTwo={b.partnerTwo} weddingDate={b.weddingDate} venue={b.venue} photo={b.photo} sample={b.sample} />
              </li>
            </HideWhenExpired>
          ))}
        </ChUl>
      )}
    </Section>
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
        primary={{ label: "Contact the church", href: "/contact" }}
        secondary={{ label: "Counselling and care", href: "/ministries/counselling-care" }}
      />
    </>
  );
}
