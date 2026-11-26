import { Box, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Play } from "lucide-react";
import { isTodo, site } from "@content/site";
import { latestSermon, watchServices } from "@content/sermons";
import { pageMetadata } from "@/lib/metadata";
import { CHANNELS, formatVideoDate, getChannelVideos, splitVideos, thumb, watchUrl, type Episode } from "@/lib/youtube";
import { LinkButton } from "@/components/Button";
import { PLATFORM_MARKS } from "@/components/BrandMarks";
import { Img } from "@/components/Img";
import { LiteYouTube } from "@/components/LiteYouTube";
import { RichText } from "@/components/RichText";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LearnMore, learnMoreHover } from "@/components/ministries/Circled";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { ChA } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "Watch",
  description:
    "Watch Nairobi Chapel Ngong Road live on Sundays at 9:00 and 11:30 AM, catch up on the current sermon series, and find the youth and children's services online.",
  path: "/watch",
});

/** New uploads appear within the hour; the page itself stays static. */
export const revalidate = 3600;

const ease = "cubic-bezier(0.23, 1, 0.32, 1)";
const enter = (delay: number) => ({ animation: `heroIn 700ms ${ease} ${delay}ms both` });

/** Hover and press for a card that is one big link (mouse-only hover). */
const cardLink = {
  "& .thumb img": { transition: `transform 600ms ${ease}` },
  "& .play": { transition: `transform 200ms ${ease}, background-color 150ms ease` },
  "@media (hover: hover) and (pointer: fine)": {
    "&:hover .thumb img": { transform: "scale(1.03)" },
    "&:hover .play": { transform: "scale(1.08)", backgroundColor: "var(--chakra-colors-accent-highlight)", color: "var(--chakra-colors-ink-900)" },
    ...learnMoreHover["@media (hover: hover) and (pointer: fine)"],
  },
  "@media (prefers-reduced-motion: reduce)": { "&:hover .thumb img, &:hover .play, &:hover .ring, &:active": { transform: "none" } },
} as const;

/** Photographs for the three services (stand-ins until the church supplies its own). */
const servicePhotos = ["events.hero", "nextgen.hero", "quest.hero"];
const serviceLinks = [CHANNELS.adult.url, CHANNELS.youth.url, CHANNELS.children.url];

function EpisodeCard({ e, featured, compact }: { e: Episode; featured?: boolean; /** thumbnail beside the text on desktop */ compact?: boolean }) {
  return (
    <ChA
      href={watchUrl(e.id)}
      target="_blank"
      rel="noopener noreferrer"
      display="flex"
      flexDirection={compact ? { base: "column", lg: "row" } : "column"}
      alignItems={compact ? { lg: "center" } : undefined}
      gap={compact ? { base: "4", lg: "5" } : "4"}
      h={featured || compact ? undefined : "full"}
      color="fg"
      textDecoration="none"
      borderRadius="lg"
      transition={`transform 160ms ${ease}`}
      _active={{ transform: "scale(0.985)" }}
      css={cardLink}
    >
      <Box className="thumb" position="relative" aspectRatio="16 / 9" w={compact ? { base: "full", lg: "46%" } : "full"} flexShrink={0} borderRadius="lg" overflow="hidden" bg="night.900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb(e.id, featured ? "maxres" : "hq")} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <Text as="span" display={compact ? { base: "inline", lg: "none" } : "inline"} position="absolute" top="3" left="3" px="2.5" py="0.5" borderRadius="full" bg="rgba(255,255,255,0.94)" color="ink.900" fontSize="0.8125rem" fontWeight="700">
          Episode {e.episode}
        </Text>
        <Box
          className="play"
          aria-hidden="true"
          position="absolute"
          right="3"
          bottom="3"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          w={featured ? "14" : compact ? { base: "11", lg: "9" } : "11"}
          h={featured ? "14" : compact ? { base: "11", lg: "9" } : "11"}
          borderRadius="full"
          bg="rgba(22, 18, 31, 0.78)"
          color="white"
        >
          <Play size={featured ? 22 : 18} fill="currentColor" />
        </Box>
      </Box>
      <Stack gap={compact ? "2.5" : "4"} flex={featured || compact ? undefined : "1"} minW="0" h={featured || compact ? undefined : "full"}>
        <Stack gap="2" flex={featured || compact ? undefined : "1"}>
          {compact && (
            <Text display={{ base: "none", lg: "block" }} fontSize="0.75rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg">
              Episode {e.episode}
            </Text>
          )}
          <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={featured ? { base: "1.5rem", md: "2rem" } : compact ? { base: "1.25rem", lg: "1.1875rem" } : { base: "1.25rem", md: "1.375rem" }} lineHeight="1.2" letterSpacing="-0.01em" textWrap="balance">
            {e.message}
          </Heading>
          <Text fontSize={compact ? "0.875rem" : "0.9375rem"} fontWeight="700">
            {e.speaker}
            <Text as="span" fontWeight="400" color="fg.muted">
              {" "}
              · {formatVideoDate(e.published)}
            </Text>
          </Text>
        </Stack>
        <Box>
          <LearnMore label="Watch on YouTube" />
          <span className="sr-only"> (opens in a new tab)</span>
        </Box>
      </Stack>
    </ChA>
  );
}

export default async function WatchPage() {
  const { services, episodes } = splitVideos(await getChannelVideos());
  const latest = services[0];
  const sameSunday = services.filter((s) => latest && s.series.toLowerCase() === latest.series.toLowerCase() && s.published.slice(0, 10) === latest.published.slice(0, 10) && s.id !== latest.id);
  const currentSeries = episodes[0]?.series;
  const seriesEpisodes = episodes.filter((e) => e.series.toLowerCase() === currentSeries?.toLowerCase());
  const [featured, ...rest] = seriesEpisodes;
  // The podcast band shows once at least one platform link is real
  const podcastLinks = site.podcast.platforms.filter((p) => !isTodo(p.url));

  return (
    <>
      {/* 1. The dark panel: live times, the title, and last Sunday's service inside it */}
      <Box as="header" bg="bg.canvas" pt={{ base: "5", md: "8" }} pb={{ base: "16", md: "24" }}>
        <Container maxW="container" px={{ base: "4", md: "8" }}>
          <Box px={{ base: "1", md: "0" }} mb={{ base: "4", md: "5" }}>
            <Breadcrumbs items={[{ label: "Watch" }]} tone="light" />
          </Box>
          <Box position="relative" borderRadius={{ base: "xl", md: "2xl" }} overflow="hidden" bg="night.900" color="white">
            <Box position="absolute" inset="0" opacity={0.5}>
              <Img slot="watch.hero" priority decorative sizes="100vw" />
            </Box>
            <Box position="absolute" inset="0" bg="rgba(12, 9, 18, 0.72)" aria-hidden="true" />

            <Stack position="relative" alignItems="center" textAlign="center" gap={{ base: "5", md: "6" }} px={{ base: "5", md: "10" }} pt={{ base: "14", md: "20" }} pb={{ base: "8", md: "14" }}>
              <HStack gap="2.5" fontSize={{ base: "0.875rem", md: "1rem" }} fontWeight="600" letterSpacing="0.06em" textTransform="uppercase" color="accent.highlight" css={enter(0)}>
                <Box as="span" aria-hidden="true" w="2" h="2" borderRadius="full" bg="#FF4D4D" boxShadow="0 0 0 4px rgba(255, 77, 77, 0.25)" />
                <span>Live every Sunday · 9:00 & 11:30 AM</span>
              </HStack>
              <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize="clamp(2.75rem, 1.5rem + 4.8vw, 5.25rem)" lineHeight="1" letterSpacing="-0.02em" color="white" textWrap="balance" css={enter(60)}>
                Worship with us
              </Heading>
              <Text fontSize={{ base: "1.0625rem", md: "1.25rem" }} lineHeight="1.65" color="rgba(255,255,255,0.9)" maxW="38rem" textWrap="pretty" css={enter(120)}>
                Stream our services from anywhere and be part of vibrant worship, prayer and God&apos;s word.
              </Text>
              <HStack gap="3" flexWrap="wrap" justifyContent="center" css={enter(180)}>
                <LinkButton href={CHANNELS.adult.url} variant="accent" size="lg" external>
                  Watch on YouTube
                </LinkButton>
                <LinkButton href="#series" variant="inverseOutline" size="lg">
                  Browse sermons
                </LinkButton>
              </HStack>

              {/* Last Sunday, set inside the panel like an album on the reference site */}
              <Box w="full" maxW="60rem" pt={{ base: "8", md: "12" }} css={enter(240)}>
                {latest ? (
                  <Stack gap="4">
                    <Text fontFamily="heading" fontWeight="600" fontSize={{ base: "1.125rem", md: "1.375rem" }} color="accent.highlight">
                      Last Sunday: {latest.series}
                    </Text>
                    <Box borderRadius="xl" overflow="hidden" boxShadow="0 40px 80px -30px rgba(0,0,0,0.7)">
                      <LiteYouTube id={latest.id} title={`${latest.series}: ${latest.time} service, ${formatVideoDate(latest.published)}`} hd />
                    </Box>
                    <HStack justifyContent="center" columnGap="6" rowGap="2" flexWrap="wrap" fontSize="0.9375rem" color="rgba(255,255,255,0.85)">
                      <span>
                        {latest.time} service · {formatVideoDate(latest.published)}
                      </span>
                      {sameSunday.map((s) => (
                        <ChA key={s.id} href={watchUrl(s.id)} target="_blank" rel="noopener noreferrer" color="white" fontWeight="700" textDecoration="none" css={learnMoreHover}>
                          <Box as="span" css={{ "& .learn-more": { color: "white" }, "& .ring": { borderColor: "rgba(255,255,255,0.5)" } }}>
                            <LearnMore label={`Watch the ${s.time} service`} />
                          </Box>
                          <span className="sr-only"> (opens YouTube in a new tab)</span>
                        </ChA>
                      ))}
                    </HStack>
                  </Stack>
                ) : (
                  <LiteYouTube id={latestSermon.youtubeId} title={latestSermon.title} poster="watch.hero" />
                )}
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* 2. The current series, newest message first */}
      {featured && (
        <Box as="section" id="series" aria-labelledby="series-heading" bg="bg.canvas" pb={{ base: "16", md: "24" }} scrollMarginTop="96px">
          <Container maxW="container" px={{ base: "5", md: "8" }}>
            <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) minmax(0, 1fr)" }} gap={{ base: "3", lg: "16" }} alignItems="end" mb={{ base: "8", md: "12" }}>
              <Stack gap="2">
                <Text fontSize="0.875rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg">
                  Current sermon series
                </Text>
                <Heading as="h2" id="series-heading" fontFamily="heading" fontWeight="700" fontSize={{ base: "2.5rem", md: "3.5rem" }} lineHeight="1.02" letterSpacing="-0.02em">
                  {currentSeries}
                </Heading>
              </Stack>
              <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.7" maxW="32rem">
                Catch up on every message in the series, newest first. Each one opens on YouTube.
              </Text>
            </Grid>

            <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1.5fr) minmax(0, 1fr)" }} gap={{ base: "12", lg: "12" }} alignItems="start">
              <EpisodeCard e={featured} featured />
              <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "1fr" }} gap={{ base: "10", lg: "7" }}>
                {rest.slice(0, 3).map((e) => (
                  <li key={e.id}>
                    <EpisodeCard e={e} compact />
                  </li>
                ))}
              </Grid>
            </Grid>

            {rest.length > 3 && (
              <Grid as="ul" listStyle="none" m="0" p="0" mt={{ base: "12", md: "16" }} pt={{ base: "10", md: "12" }} borderTopWidth="1px" borderColor="border" templateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: `repeat(${Math.min(rest.length - 3, 3)}, minmax(0, 1fr))` }} columnGap="8" rowGap="12">
                {rest.slice(3).map((e) => (
                  <li key={e.id}>
                    <EpisodeCard e={e} />
                  </li>
                ))}
              </Grid>
            )}

            <HStack mt={{ base: "12", md: "14" }} justifyContent="center">
              <LinkButton href={CHANNELS.adult.url} variant="secondary" size="lg" external>
                See every sermon on YouTube
              </LinkButton>
            </HStack>
          </Container>
        </Box>
      )}

      {/* 3. The three services, each with its own channel */}
      <Box as="section" id="services" aria-labelledby="services-heading" bg="bg.warm" py={{ base: "16", md: "24" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Heading as="h2" id="services-heading" fontFamily="heading" fontWeight="700" fontSize={{ base: "2.25rem", md: "3.25rem" }} lineHeight="1.05" letterSpacing="-0.02em" mb={{ base: "8", md: "12" }}>
            Services you can watch
          </Heading>
          <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "repeat(3, minmax(0, 1fr))" }} gap={{ base: "12", md: "8" }}>
            {watchServices.map((s, i) => (
              <li key={s.title}>
                <ChA
                  href={serviceLinks[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  display="flex"
                  flexDirection="column"
                  gap="5"
                  h="full"
                  color="fg"
                  textDecoration="none"
                  borderRadius="lg"
                  transition={`transform 160ms ${ease}`}
                  _active={{ transform: "scale(0.985)" }}
                  css={cardLink}
                >
                  <Box className="thumb" position="relative" aspectRatio="4 / 3" borderRadius="lg" overflow="hidden" bg="bg.muted">
                    <Img slot={servicePhotos[i]} decorative sizes="(min-width: 768px) 33vw, 100vw" />
                  </Box>
                  <Stack gap="2.5" flex="1">
                    <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.625rem", md: "1.875rem" }} lineHeight="1.15">
                      {s.title}
                    </Heading>
                    <Text lineHeight="1.75">
                      <RichText text={s.summary} />
                    </Text>
                  </Stack>
                  <Box>
                    <LearnMore label="Watch on YouTube" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </Box>
                </ChA>
              </li>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. The podcast, on the gold of the brand */}
      {podcastLinks.length > 0 && (
      <Box as="section" id="podcast" aria-labelledby="podcast-heading" bg="bg.canvas" py={{ base: "16", md: "20" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) minmax(0, 1.4fr)" }} gap={{ base: "6", lg: "12" }} alignItems="center" p={{ base: "8", md: "12" }} bg="accent.highlight" color="ink.900" borderRadius={{ base: "xl", md: "2xl" }}>
            <Stack gap="2">
              <Text fontSize="0.875rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase">
                Listen on the go
              </Text>
              <Heading as="h2" id="podcast-heading" fontFamily="heading" fontWeight="700" fontSize={{ base: "2rem", md: "2.75rem" }} lineHeight="1.05" letterSpacing="-0.015em">
                {site.podcast.name}
              </Heading>
            </Stack>
            <Stack gap="4">
              <Text fontSize={{ base: "1.0625rem", md: "1.125rem" }} lineHeight="1.6">
                Every Sunday message as a podcast. Play episodes here, or follow on your favourite app.
              </Text>
              <HStack gap="3" flexWrap="wrap">
                <LinkButton href="/podcasts" variant="primary" arrow>
                  Listen to the podcast
                </LinkButton>
                {podcastLinks.slice(0, 2).map((p) => {
                  const Mark = PLATFORM_MARKS[p.platform];
                  return (
                    <LinkButton key={p.platform} href={p.url} variant="inverse" external icon={Mark ? <Mark size={22} /> : undefined}>
                      {p.label}
                    </LinkButton>
                  );
                })}
              </HStack>
            </Stack>
          </Grid>
        </Container>
      </Box>
      )}

      <MinistryClosing
        title="Watching from Nairobi? Come in person"
        text="We'd love to meet you this Sunday at 9:00 or 11:30 AM on Ngong Road."
        primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
        secondary={{ label: "Find a group", href: "/get-involved/groups" }}
      />
    </>
  );
}
