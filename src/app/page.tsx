import { Box, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { HeartHandshake } from "lucide-react";
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
import { Squiggle } from "@/components/home/Squiggle";
import { StepTiles } from "@/components/home/StepTiles";
import { ScrollRow } from "@/components/home/ScrollRow";
import { Section } from "@/components/layout/Section";
import { ChBlockquote, ChFigcaption, ChFigure } from "@/components/primitives";

export const metadata = {
  ...pageMetadata({ title: home.meta.title, description: home.meta.description, path: "/" }),
  title: { absolute: `${site.name} | Sundays 9:00 & 11:30 AM` },
};

const container = { maxW: "container", px: { base: "5", md: "8" } } as const;

/* 1. Full-bleed hero under the floating header ------------------------- */
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
      minH={{ base: "max(560px, 100vh)", md: "100vh" }}
      css={{ "@supports (height: 100svh)": { minHeight: "max(560px, 100svh)" } }}
      display="flex"
      alignItems="center"
    >
      <Box position="absolute" inset="0" aria-hidden="true">
        <Img slot="home.hero" priority decorative sizes="(orientation: portrait) 330vw, 100vw" />
      </Box>
      {hero.video && <HeroVideo {...hero.video} />}
      {/* Solid scrim (not a gradient) so white text passes AA on any frame */}
      <Box position="absolute" inset="0" bg="rgba(22, 18, 31, 0.62)" aria-hidden="true" />
      <Container {...container} position="relative" py={{ base: "16", md: "20" }}>
        <Stack
          gap="5"
          alignItems="center"
          textAlign="center"
          maxW="52rem"
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
            lineHeight="1.02"
            letterSpacing="-0.01em"
            fontSize="clamp(2.75rem, 1.5rem + 5.6vw, 5.5rem)"
            color="fg.inverted"
            textWrap="balance"
          >
            {hero.title}
          </Heading>
          <Text
            as="p"
            bg="brand.solid"
            color="white"
            borderRadius="full"
            px="4"
            py="1.5"
            fontWeight="600"
            fontSize={{ base: "0.875rem", md: "0.9375rem" }}
          >
            {site.serviceTimesShort} · Ngong Road, Nairobi
          </Text>
          <Text textStyle="lead" color="fg.inverted" maxW="34rem">
            {hero.subline}
          </Text>
          <HStack gap="3" flexWrap="wrap" justifyContent="center" pt="1">
            <LinkButton href={hero.primary.href} variant="inverse" size="lg">
              {hero.primary.label}
            </LinkButton>
            <LinkButton href={hero.secondary.href} variant="inverseOutline" size="lg">
              {hero.secondary.label}
            </LinkButton>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}

/* 2. This Sunday --------------------------------------------------------- */
function ThisSunday() {
  return (
    <Box as="section" aria-labelledby="this-sunday" bg="bg.warm" borderBottomWidth="1px" borderColor="border">
      <Container {...container} py={{ base: "8", md: "10" }}>
        <Heading as="h2" id="this-sunday" className="sr-only">
          This Sunday
        </Heading>
        <FactList facts={home.thisSunday} layout="inline" />
      </Container>
    </Box>
  );
}

/* 3. Featured events slider ---------------------------------------------- */
function eventDetails(e: EventEntry): string[] {
  const lines = [e.dateTbc ? "Date to be confirmed" : formatRange(e.startDate, e.endDate)];
  if (e.time) lines.push(e.time);
  lines.push(e.venue);
  return lines;
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
    <Box as="section" aria-labelledby="featured-heading" py={{ base: "14", md: "20" }}>
      <Container {...container}>
        <Heading as="h2" id="featured-heading" className="sr-only">
          Featured events
        </Heading>
        <FeaturedCarousel label="Featured events">
          {next.map((e) => (
            <HideWhenExpired key={e.slug} expires={e.expires}>
              <FeatureRow
                image={imageFor(e)}
                eyebrow={`${e.type} · For ${e.audience.join(", ").toLowerCase()}`}
                title={e.title}
                href={`/events/${e.slug}`}
                summary={e.summary}
                details={eventDetails(e)}
                cta="See event details"
              />
            </HideWhenExpired>
          ))}
        </FeaturedCarousel>
      </Container>
    </Box>
  );
}

/* 4. Every age and stage: big heading + sideways-scrolling row ------------ */
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

/* 5. Mission over a dark photo, with the pastor's welcome ---------------- */
function Mission() {
  const { rhythms, pastor } = home;
  return (
    <Box as="section" aria-labelledby="mission-heading" position="relative" bg="night.900" color="fg.inverted" overflow="hidden">
      <Box position="absolute" inset="0" aria-hidden="true">
        <Img slot="visit.expect" decorative sizes="(orientation: portrait) 160vw, 100vw" />
      </Box>
      <Box position="absolute" inset="0" bg="rgba(22, 18, 31, 0.72)" aria-hidden="true" />
      <Container {...container} position="relative" py={{ base: "20", md: "28" }}>
        <Stack gap="8" maxW="40rem">
          <Stack gap="3">
            <Text textStyle="small" fontWeight="600" color="accent.highlight">
              {rhythms.title}
            </Text>
            <Heading as="h2" id="mission-heading" fontFamily="heading" fontWeight="600" lineHeight="1.08" fontSize="clamp(2.25rem, 1.4rem + 3.6vw, 4rem)" color="fg.inverted">
              {rhythms.items.map((r, i) => (
                <Box as="span" key={r.title} display="block">
                  {i === rhythms.items.length - 1 ? <Squiggle>{r.title}.</Squiggle> : `${r.title},`}
                </Box>
              ))}
            </Heading>
            <Text color="night.300" maxW="prose">
              {site.missionLine}
            </Text>
            <Box pt="3">
              <LinkButton href="/about" variant="inverseOutline">
                Learn about our church
              </LinkButton>
            </Box>
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

/* 6. Invitation band ------------------------------------------------------ */
function InviteBand({ id, title }: { id: string; title: string }) {
  return (
    <Box as="section" aria-labelledby={id} bg="brand.solid" color="fg.inverted" py={{ base: "14", md: "20" }}>
      <Container {...container}>
        <Stack gap="6" alignItems="center" textAlign="center">
          <Heading as="h2" id={id} fontFamily="heading" fontWeight="600" fontSize="clamp(1.625rem, 1.2rem + 1.8vw, 2.5rem)" lineHeight="1.15" color="fg.inverted" maxW="44rem">
            {title}
          </Heading>
          <HStack gap="3" flexWrap="wrap" justifyContent="center">
            <LinkButton href="/new-here/plan-your-visit" variant="inverse">
              Plan your visit
            </LinkButton>
            <LinkButton href="/watch" variant="inverseOutline">
              Watch live
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
      <HStack mt="10" gap="2" color="fg.muted">
        <HeartHandshake size={20} aria-hidden="true" />
        <LinkButton href={home.steps.prayer.href} variant="link">
          {home.steps.prayer.label}
        </LinkButton>
      </HStack>
    </Section>
  );
}

/* 8. Latest sermon ---------------------------------------------------------- */
function LatestSermon() {
  return (
    <Section id="latest-sermon" tone="warm" title="Watch the latest sermon">
      <Grid templateColumns={{ base: "1fr", lg: "1.5fr 1fr" }} gap={{ base: "6", lg: "12" }} alignItems="center">
        <LiteYouTube id={latestSermon.youtubeId} title={latestSermon.title} />
        <Stack gap="3">
          <Text textStyle="small" fontWeight="600" color="brand.fg">
            Series: {latestSermon.series}
          </Text>
          <Heading as="h3" textStyle="h3">
            {latestSermon.title}
          </Heading>
          <Text color="fg.muted">{latestSermon.speaker}</Text>
          <Box pt="2">
            <LinkButton href="/watch" variant="secondary">
              Watch all sermons
            </LinkButton>
          </Box>
        </Stack>
      </Grid>
    </Section>
  );
}

/* 9. Connect tiles ------------------------------------------------------- */
function Connect() {
  return (
    <Box as="section" aria-labelledby="connect-heading" py={{ base: "16", md: "24" }}>
      <Container {...container}>
        <Heading as="h2" id="connect-heading" textAlign="center" fontFamily="heading" fontWeight="500" fontSize={{ base: "1.25rem", md: "1.5rem" }} mb={{ base: "6", md: "10" }}>
          We&apos;d love to connect with you
        </Heading>
        <StepTiles tiles={home.tiles} />
      </Container>
    </Box>
  );
}

/* 10. Give ------------------------------------------------------------------ */
function Give() {
  return (
    <Section id="give" tone="tint" label="Give">
      <Grid templateColumns={{ base: "1fr", lg: "1.2fr 1fr" }} gap={{ base: "6", lg: "16" }} alignItems="end">
        <ChFigure m="0">
          <ChBlockquote m="0" fontFamily="heading" fontWeight="600" lineHeight="1.05" fontSize="clamp(2.25rem, 1.5rem + 3.5vw, 4rem)" color="purple.900">
            “{home.give.verse}”
          </ChBlockquote>
          <ChFigcaption mt="4" textStyle="label" color="brand.fg">
            {home.give.reference}
          </ChFigcaption>
        </ChFigure>
        <Stack gap="5" maxW="prose">
          <Heading as="h2" textStyle="h3">
            Give generously
          </Heading>
          <Text color="fg.muted">
            <RichText text={home.give.text} />
          </Text>
          <HStack gap="4" flexWrap="wrap">
            <LinkButton href={home.give.cta.href} size="lg">
              {home.give.cta.label}
            </LinkButton>
            <Text textStyle="small" color="fg.muted">
              M-Pesa Paybill {site.giving.paybill}
            </Text>
          </HStack>
        </Stack>
      </Grid>
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
