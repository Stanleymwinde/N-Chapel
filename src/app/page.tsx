import NextLink from "next/link";
import { Box, Container, Flex, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { Heart } from "lucide-react";
import { home } from "@content/home";
import { isTodo, site } from "@content/site";
import { events, type EventEntry } from "@content/events";
import { latestSermon } from "@content/sermons";
import { formatRange, upcoming } from "@/lib/dates";
import { HEADER_HEIGHT } from "@/lib/layout";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { MinistryCard } from "@/components/Cards";
import { FactList } from "@/components/FactList";
import { HideWhenExpired } from "@/components/HideWhenExpired";
import { Img } from "@/components/Img";
import { JsonLd, churchJsonLd } from "@/components/JsonLd";
import { LiteYouTube } from "@/components/LiteYouTube";
import { Pathway } from "@/components/Pathway";
import { RichText } from "@/components/RichText";
import { FeatureRow } from "@/components/home/FeatureRow";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { HeroVideo } from "@/components/home/HeroVideo";
import { StepTiles } from "@/components/home/StepTiles";
import { ScrollRow } from "@/components/home/ScrollRow";
import { Section } from "@/components/layout/Section";
import { ChA, ChBlockquote, ChFigcaption, ChFigure } from "@/components/primitives";

export const metadata = {
  ...pageMetadata({ title: home.meta.title, description: home.meta.description, path: "/" }),
  title: { absolute: `${site.name} | Sundays 9:00 & 11:30 AM` },
};

const container = { maxW: "container", px: { base: "5", md: "8" } } as const;

/* 1. Full-bleed hero under the floating header (Figma: 786px tall) ------- */
function Hero() {
  const { hero } = home;
  return (
    <Box
      as="section"
      aria-labelledby="hero-title"
      position="relative"
      bg="night.900"
      color="fg.inverted"
      overflow="hidden"
      mt={{ base: `-${HEADER_HEIGHT.base}`, lg: `-${HEADER_HEIGHT.lg}` }}
      pt={{ base: HEADER_HEIGHT.base, lg: HEADER_HEIGHT.lg }}
      minH={{ base: "560px", md: "786px" }}
      display="flex"
      alignItems="center"
    >
      <Box position="absolute" inset="0" aria-hidden="true">
        <Img slot="home.hero" priority decorative sizes="(orientation: portrait) 330vw, 100vw" />
      </Box>
      {hero.video && <HeroVideo {...hero.video} />}
      {/* Figma scrim: 45% → 70% ink, top to bottom */}
      <Box position="absolute" inset="0" bgGradient="to-b" gradientFrom="rgba(20, 15, 26, 0.45)" gradientTo="rgba(20, 15, 26, 0.7)" aria-hidden="true" />
      <Container {...container} position="relative" py={{ base: "16", md: "20" }}>
        <Stack
          gap="5"
          alignItems="center"
          textAlign="center"
          maxW="56rem"
          mx="auto"
          css={{
            "& > *": { animation: "heroIn 300ms cubic-bezier(0.23, 1, 0.32, 1) both" },
            "& > *:nth-child(2)": { animationDelay: "60ms" },
            "& > *:nth-child(3)": { animationDelay: "110ms" },
            "& > *:nth-child(n + 4)": { animationDelay: "150ms" },
            // reduced motion: gentler, not none (opacity only)
            "@media (prefers-reduced-motion: reduce)": { "& > *": { animation: "fade-in 200ms ease both" } },
          }}
        >
          <Heading
            as="h1"
            id="hero-title"
            fontFamily="heading"
            fontWeight="600"
            lineHeight="1"
            letterSpacing="-0.02em"
            fontSize="clamp(2.75rem, 1.5rem + 4.6vw, 5rem)"
            color="fg.inverted"
            textWrap="balance"
          >
            {hero.title}
          </Heading>
          <Text as="p" bg="brand.solid" color="white" borderRadius="full" px="4" py="1.5" fontWeight="500" fontSize="0.875rem" whiteSpace="pre-wrap">
            {site.serviceTimesShort}  ·  Ngong Road, Nairobi
          </Text>
          <Text color="fg.inverted" fontSize={{ base: "1.0625rem", md: "1.125rem" }} lineHeight="1.5" maxW="33rem">
            {hero.subline}
          </Text>
          <HStack gap="3" flexWrap="wrap" justifyContent="center">
            <LinkButton href={hero.primary.href} variant="inverse">
              {hero.primary.label}
            </LinkButton>
            <LinkButton href={hero.secondary.href} variant="inverseOutline">
              {hero.secondary.label}
            </LinkButton>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}

/* 2. Service info strip ------------------------------------------------------ */
function ThisSunday() {
  return (
    <Box as="section" aria-labelledby="this-sunday" bg="bg.warm">
      <Container {...container} py="10">
        <Heading as="h2" id="this-sunday" className="sr-only">
          This Sunday
        </Heading>
        <FactList facts={home.thisSunday} layout="inline" />
      </Container>
    </Box>
  );
}

/* 3. What's on: heading, intro and featured events slider ------------------ */
function eventDate(e: EventEntry): string {
  const date = e.dateTbc ? "Date to be confirmed" : formatRange(e.startDate, e.endDate);
  return e.time ? `${date}, ${e.time}` : date;
}

function Featured() {
  const next = upcoming(events).slice(0, 4);
  const used = new Set<string>();
  const imageFor = (e: EventEntry) => {
    const preferred = (e.ministry && home.featuredImages[e.ministry]) || "events.hero";
    const slot = used.has(preferred) ? "events.hero" : preferred;
    used.add(slot);
    return slot;
  };
  if (next.length === 0) return null;
  return (
    <Box as="section" aria-labelledby="featured-heading" py={{ base: "16", md: "24" }}>
      <Container {...container}>
        <Stack gap="10px" mb="8" maxW="620px">
          <Heading as="h2" id="featured-heading" textStyle="h2">
            {home.whatsOn.title}
          </Heading>
          <Text textStyle="lead" color="fg.muted">
            {home.whatsOn.intro}
          </Text>
        </Stack>
        <FeaturedCarousel label="Featured events">
          {next.map((e) => (
            <HideWhenExpired key={e.slug} expires={e.expires}>
              <FeatureRow
                image={imageFor(e)}
                eyebrow={`${e.type}  ·  For ${e.audience.join(", ").toLowerCase()}`}
                title={e.title}
                href={`/events/${e.slug}`}
                summary={e.summary}
                date={eventDate(e)}
                extra={[e.venue]}
                cta="See event details"
              />
            </HideWhenExpired>
          ))}
        </FeaturedCarousel>
      </Container>
    </Box>
  );
}

/* 4. Every age and stage: heading + sideways-scrolling row ------------------ */
function AgesRow() {
  return (
    <ScrollRow
      id="ages-heading"
      title={home.ministries.title}
      label={home.ministries.title + ": scroll sideways for more"}
      link={
        <LinkButton href="/ministries" variant="link">
          See all ministries
        </LinkButton>
      }
    >
      {home.ministries.items.map((m) => (
        <Box as="li" key={m.title} scrollSnapAlign="start" position="relative">
          <MinistryCard variant="tile" title={m.title} summary={m.summary} who={m.who} href={m.href} image={m.image} cta={m.cta} />
        </Box>
      ))}
    </ScrollRow>
  );
}

/* 5. Mission over a photo (Figma: 500px, 56px heading, gold underline) ----- */
function Mission() {
  const { rhythms, pastor } = home;
  const last = rhythms.items.length - 1;
  return (
    <Box as="section" aria-labelledby="mission-heading" position="relative" bg="night.900" color="fg.inverted" overflow="hidden">
      <Box position="absolute" inset="0" aria-hidden="true">
        <Img slot="visit.expect" decorative sizes="(orientation: portrait) 160vw, 100vw" />
      </Box>
      <Box position="absolute" inset="0" bgGradient="to-r" gradientFrom="rgba(20, 15, 26, 0.8)" gradientTo="rgba(20, 15, 26, 0.3)" aria-hidden="true" />
      <Container {...container} position="relative" minH={{ md: "500px" }} display="flex" alignItems="center" py={{ base: "20", md: "16" }}>
        <Stack gap="8" maxW="40rem">
          <Stack gap="5" alignItems="flex-start">
            <Text fontSize="0.8125rem" fontWeight="500" color="accent.highlight">
              {rhythms.title}
            </Text>
            <Heading
              as="h2"
              id="mission-heading"
              fontFamily="heading"
              fontWeight="600"
              lineHeight="1.1"
              letterSpacing="-0.015em"
              fontSize="clamp(2.25rem, 1.5rem + 2.6vw, 3.5rem)"
              color="fg.inverted"
            >
              {rhythms.items.map((r, i) =>
                i === last ? (
                  <Box as="span" key={r.title} display="inline-block">
                    {r.title}.
                    <Box as="span" display="block" h="5px" mt="2px" bg="accent.highlight" aria-hidden="true" />
                  </Box>
                ) : (
                  <Box as="span" key={r.title} display="block">
                    {r.title},
                  </Box>
                ),
              )}
            </Heading>
            <Text color="fg.inverted" fontSize={{ base: "1.125rem", md: "1.25rem" }}>
              {site.missionLine}
            </Text>
            <LinkButton href="/about" variant="inverseOutline">
              Learn about our church
            </LinkButton>
          </Stack>
          {/* The pastor's welcome shows once the real words exist (no placeholder quote) */}
          {!isTodo(pastor.message) && (
            <>
              <Box h="1px" bg="whiteAlpha.300" />
              <ChFigure m="0">
                <ChBlockquote m="0" color="fg.inverted" fontSize="1.0625rem" lineHeight="1.6">
                  “<RichText text={pastor.message} />”
                </ChBlockquote>
                <ChFigcaption mt="5" display="flex" alignItems="center" gap="3">
                  <Box
                    w="44px"
                    h="44px"
                    borderRadius="full"
                    bg="whiteAlpha.200"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontFamily="heading"
                    fontWeight="600"
                    role="img"
                    aria-label="Photo of our pastor coming soon"
                  >
                    {pastor.initials}
                  </Box>
                  <Box>
                    <Text fontWeight="600">
                      <RichText text={pastor.name} />
                    </Text>
                    <Text textStyle="small" color="fg.inverted">
                      <RichText text={pastor.role} />
                    </Text>
                  </Box>
                </ChFigcaption>
              </ChFigure>
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

/* 6. Closing CTA band (Figma: 80px padding, 36px heading) ------------------ */
function InviteBand({ id, title }: { id: string; title: string }) {
  return (
    <Box as="section" aria-labelledby={id} bg="brand.solid" color="fg.inverted" py={{ base: "14", md: "20" }}>
      <Container {...container}>
        <Stack gap="6" alignItems="center" textAlign="center">
          <Heading
            as="h2"
            id={id}
            fontFamily="heading"
            fontWeight="600"
            fontSize="clamp(1.625rem, 1.3rem + 1.2vw, 2.25rem)"
            letterSpacing="-0.01em"
            lineHeight="1.2"
            color="fg.inverted"
            maxW="44rem"
          >
            {title}
          </Heading>
          <HStack gap="3" flexWrap="wrap" justifyContent="center">
            <LinkButton href={home.nextStep.primary.href} variant="inverse">
              {home.nextStep.primary.label}
            </LinkButton>
            <LinkButton href={home.nextStep.secondary.href} variant="inverseOutline">
              {home.nextStep.secondary.label}
            </LinkButton>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}

/* 7. New here? Three steps ----------------------------------------------- */
function Steps() {
  return (
    <Section id="new-here" title={home.steps.title} intro={home.steps.intro}>
      <Pathway steps={home.steps.items} />
      <HStack mt="10" gap="2" color="brand.fg">
        <Heart size={16} aria-hidden="true" />
        <LinkButton href={home.steps.prayer.href} variant="link">
          {home.steps.prayer.label}
        </LinkButton>
      </HStack>
    </Section>
  );
}

/* 8. Latest sermon (Figma: 560px video beside the details, 48px apart) ------ */
function LatestSermon() {
  return (
    <Section id="latest-sermon" tone="warm" title="Watch the latest sermon">
      <Flex direction={{ base: "column", lg: "row" }} gap={{ base: "6", lg: "48px" }} alignItems={{ lg: "center" }}>
        <Box w={{ base: "100%", lg: "560px" }} flexShrink={0}>
          <LiteYouTube id={latestSermon.youtubeId} title={latestSermon.title} />
        </Box>
        <Stack gap="3" alignItems="flex-start">
          <Text fontSize="0.9375rem" fontWeight="500" color="brand.fg">
            Series: {latestSermon.series}
          </Text>
          <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.5rem", md: "1.75rem" }} lineHeight="1.2" maxW="22ch">
            {latestSermon.title}
          </Heading>
          <Text color="fg.muted" fontSize="1rem">
            {latestSermon.speaker}
          </Text>
          <LinkButton href="/watch" variant="secondary">
            Watch all sermons
          </LinkButton>
        </Stack>
      </Flex>
    </Section>
  );
}

/* 9. Connect tiles ------------------------------------------------------- */
function Connect() {
  return (
    <Box as="section" aria-labelledby="connect-heading" py={{ base: "16", md: "24" }}>
      <Container {...container}>
        <Heading
          as="h2"
          id="connect-heading"
          textAlign="center"
          fontFamily="heading"
          fontWeight="500"
          letterSpacing="-0.005em"
          fontSize={{ base: "1.375rem", md: "1.75rem" }}
          mb="9"
        >
          We&apos;d love to connect with you
        </Heading>
        <StepTiles tiles={home.tiles} />
      </Container>
    </Box>
  );
}

/* 10. Give (Figma: 964px row, 56px verse, 440px copy with M-Pesa mark) ------ */
function Give() {
  return (
    <Section id="give" tone="tint" label="Give">
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={{ base: "8", lg: "6" }}
        alignItems={{ lg: "center" }}
        justifyContent="space-between"
        maxW="964px"
        mx="auto"
      >
        <ChFigure m="0">
          <ChBlockquote
            m="0"
            fontFamily="heading"
            fontWeight="600"
            lineHeight="1.05"
            letterSpacing="-0.015em"
            fontSize="clamp(2.25rem, 1.5rem + 2.6vw, 3.5rem)"
            color="brand.fg"
          >
            {/* Figma breaks the verse after its third word */}
            “{home.give.verse.split(" ").slice(0, 3).join(" ")}
            <br />
            {home.give.verse.split(" ").slice(3).join(" ")}”
          </ChBlockquote>
          <ChFigcaption mt="3" fontSize="0.875rem" fontWeight="500" color="brand.fg">
            {home.give.reference}
          </ChFigcaption>
        </ChFigure>
        <Stack gap="4" w={{ lg: "440px" }} flexShrink={0}>
          <Heading as="h2" fontFamily="heading" fontWeight="600" fontSize="1.25rem" lineHeight="normal">
            Give generously
          </Heading>
          <Text color="fg.muted" fontSize={{ base: "1.125rem", md: "1.25rem" }} lineHeight="1.55">
            <RichText text={home.give.text} />{" "}
            <ChA asChild color="brand.fg" textDecoration="underline" textUnderlineOffset="0.2em">
              <NextLink href={home.give.story.href}>{home.give.story.label}</NextLink>
            </ChA>
          </Text>
          <HStack gap="5" flexWrap="wrap">
            <LinkButton href={home.give.cta.href}>{home.give.cta.label}</LinkButton>
            <HStack gap="10px">
              <Image src="/media/brand/mpesa.png" alt="M-Pesa" width="103px" height="38px" objectFit="contain" />
              <Text fontWeight="700" fontSize="1rem">
                Paybill {site.giving.paybill}
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Flex>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={churchJsonLd()} />
      <Hero />
      <ThisSunday />
      <Featured />
      <AgesRow />
      <Mission />
      <Steps />
      <LatestSermon />
      <Connect />
      <Give />
      <InviteBand id="invite-bottom" title={home.nextStep.title} />
    </>
  );
}
