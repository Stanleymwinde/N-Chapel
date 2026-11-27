import { Box, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { latestSermon, watchServices } from "@content/sermons";
import { pageMetadata } from "@/lib/metadata";
import { CHANNELS, formatVideoDate, getChannelVideos, splitVideos, thumb, watchUrl, type Episode } from "@/lib/youtube";
import { LinkButton } from "@/components/Button";
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

/** Figma "Watch on YouTube": 13px semibold label and a 22px ringed chevron */
const smallLink = {
  "& .learn-more": { fontSize: "13px", fontWeight: "600", gap: "8px" },
  "& .learn-more .ring": { width: "22px", height: "22px", borderColor: "#E2DDE6" },
  "& .learn-more .ring svg": { width: "11px", height: "11px" },
} as const;

/** Hover and press for a card that is one big link (mouse-only hover). */
const cardLink = {
  ...smallLink,
  "& .thumb img": { transition: `transform 600ms ${ease}` },
  "@media (hover: hover) and (pointer: fine)": {
    "&:hover .thumb img": { transform: "scale(1.03)" },
    ...learnMoreHover["@media (hover: hover) and (pointer: fine)"],
  },
  "@media (prefers-reduced-motion: reduce)": { "&:hover .thumb img, &:hover .ring, &:active": { transform: "none" } },
} as const;

/** Photographs for the three services (stand-ins until the church supplies its own). */
const servicePhotos = ["events.hero", "nextgen.hero", "quest.hero"];
const serviceLinks = [CHANNELS.adult.url, CHANNELS.youth.url, CHANNELS.children.url];

type Look = "featured" | "compact" | "wide";

/** Speaker in ink semibold, then the date (Figma 12px meta line) */
function Meta({ e }: { e: Episode }) {
  return (
    <Text fontSize="12px" color="fg.muted">
      <Text as="span" fontWeight="600" color="fg">
        {e.speaker}
      </Text>
      {" · "}
      {formatVideoDate(e.published)}
    </Text>
  );
}

/** One sermon: the Figma "Episode" (featured 563px, compact 211×100 beside text, wide 2-up) */
function EpisodeCard({ e, look }: { e: Episode; look: Look }) {
  const compact = look === "compact";
  return (
    <ChA
      href={watchUrl(e.id)}
      target="_blank"
      rel="noopener noreferrer"
      display="flex"
      flexDirection={compact ? { base: "column", sm: "row" } : "column"}
      alignItems={compact ? { sm: "flex-start" } : undefined}
      gap={compact ? "18px" : "10px"}
      color="fg"
      textDecoration="none"
      borderRadius="12px"
      transition={`transform 160ms ${ease}`}
      _active={{ transform: "scale(0.985)" }}
      css={cardLink}
    >
      <Box
        className="thumb"
        position="relative"
        flexShrink={0}
        w={compact ? { base: "full", sm: "211px" } : "full"}
        aspectRatio={compact ? "211 / 100" : look === "featured" ? "563 / 264" : "583 / 272"}
        borderRadius={compact ? "8px" : look === "featured" ? "12px" : "10px"}
        overflow="hidden"
        bg="#2A2233"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb(e.id, look === "compact" ? "hq" : "maxres")} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      </Box>
      <Stack gap={compact ? "6px" : "10px"} minW="0" maxW={compact ? { sm: "216px" } : undefined}>
        <Heading
          as="h3"
          fontFamily="heading"
          fontWeight="600"
          fontSize={look === "featured" ? { base: "22px", md: "26px" } : look === "compact" ? "15px" : "17px"}
          lineHeight={look === "featured" ? "1.2" : look === "compact" ? "1.3" : "normal"}
          maxW={look === "featured" ? "22ch" : undefined}
          textWrap="balance"
        >
          {e.message}
        </Heading>
        <Meta e={e} />
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

  return (
    <>
      {/* 1. The dark banner: live times, the title, and last Sunday's service inside it */}
      <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "16", md: "24" }}>
        <Container maxW="container" px={{ base: "4", md: "8" }}>
          <Box maxW="1000px" mx="auto">
            <Box px={{ base: "1", md: "0" }} mb="6">
              <Breadcrumbs items={[{ label: "Watch" }]} tone="light" />
            </Box>
            <Box position="relative" borderRadius="14px" overflow="hidden" bg="#2A2233" color="white">
              <Box position="absolute" inset="0">
                <Img slot="watch.hero" priority decorative sizes="(min-width: 1064px) 1000px, 100vw" />
              </Box>
              <Box position="absolute" inset="0" bg="rgba(20, 15, 26, 0.78)" aria-hidden="true" />

              <Stack position="relative" alignItems="center" textAlign="center" gap="5" px={{ base: "5", md: "11" }} pt={{ base: "12", md: "16" }} pb="10">
                <HStack gap="2" fontSize="13px" fontWeight="600" letterSpacing="0.52px" textTransform="uppercase" color="accent.highlight" css={enter(0)}>
                  <Box as="span" aria-hidden="true" w="2" h="2" borderRadius="full" bg="#FF4D4D" />
                  <span>Live every Sunday · 9:00 & 11:30 AM</span>
                </HStack>
                <Heading as="h1" fontFamily="heading" fontWeight="600" fontSize={{ base: "2.75rem", md: "68px" }} lineHeight="1.05" letterSpacing={{ base: "-0.02em", md: "-1.36px" }} color="white" textWrap="balance" css={enter(60)}>
                  Worship with us
                </Heading>
                <Text fontSize={{ base: "1.0625rem", md: "18px" }} lineHeight="1.55" color="white" maxW="31rem" textWrap="pretty" css={enter(120)}>
                  Stream our services from anywhere and be part of vibrant worship, prayer and God&apos;s word.
                </Text>
                <HStack gap="3" flexWrap="wrap" justifyContent="center" css={enter(180)}>
                  <LinkButton href={CHANNELS.adult.url} variant="accent" external py="12px">
                    Watch Livestream
                  </LinkButton>
                  <LinkButton href="#series" variant="inverseOutline">
                    Browse sermons
                  </LinkButton>
                </HStack>

                {/* Last Sunday, set inside the banner */}
                <Box w="full" maxW="912px" css={enter(240)}>
                  {latest ? (
                    <Stack gap="5">
                      <Text fontFamily="heading" fontWeight="600" fontSize="17px" color="accent.highlight">
                        Last Sunday: {latest.series}
                      </Text>
                      <Box borderRadius="12px" overflow="hidden">
                        <LiteYouTube id={latest.id} title={`${latest.series}: ${latest.time} service, ${formatVideoDate(latest.published)}`} hd />
                      </Box>
                      <HStack justifyContent="center" columnGap="5" rowGap="2" flexWrap="wrap" fontSize="13px" pt="1">
                        <Text as="span" color="white" opacity={0.8}>
                          {latest.time} service · {formatVideoDate(latest.published)}
                        </Text>
                        {sameSunday.map((s) => (
                          <ChA key={s.id} href={watchUrl(s.id)} target="_blank" rel="noopener noreferrer" color="white" textDecoration="none" css={{ ...smallLink, ...learnMoreHover }}>
                            <Box as="span" css={{ "& .learn-more": { color: "white" }, "& .learn-more .ring": { borderColor: "rgba(255,255,255,0.6)" } }}>
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
          </Box>
        </Container>
      </Box>

      {/* 2. The current series, newest message first */}
      {featured && (
        <Box as="section" id="series" aria-labelledby="series-heading" bg="bg.canvas" pb={{ base: "16", md: "24" }} scrollMarginTop="96px">
          <Container maxW="container" px={{ base: "5", md: "8" }}>
            <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) auto" }} gap={{ base: "3", lg: "16" }} alignItems="end" mb="7">
              <Stack gap="6px">
                <Text fontSize="12px" fontWeight="600" letterSpacing="0.72px" textTransform="uppercase" color="brand.fg">
                  Current sermon series
                </Text>
                <Heading as="h2" id="series-heading" fontFamily="heading" fontWeight="600" fontSize={{ base: "2.25rem", md: "46px" }} lineHeight="1.1" letterSpacing="-0.69px">
                  {currentSeries}
                </Heading>
              </Stack>
              <Text fontSize="16px" lineHeight="1.6" color="fg.muted" maxW="25rem">
                Catch up on every message in the series, newest first. Each one opens on YouTube.
              </Text>
            </Grid>

            <Grid templateColumns={{ base: "1fr", lg: "563px minmax(0, 1fr)" }} gap="10" alignItems="start">
              <EpisodeCard e={featured} look="featured" />
              <Stack as="ul" listStyle="none" m="0" p="0" gap="6">
                {rest.slice(0, 3).map((e) => (
                  <li key={e.id}>
                    <EpisodeCard e={e} look="compact" />
                  </li>
                ))}
              </Stack>
            </Grid>

            {rest.length > 3 && (
              <Grid as="ul" listStyle="none" m="0" p="0" mt="7" pt="7" borderTopWidth="1px" borderColor="#E2DDE6" templateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 1fr))" }} columnGap="7" rowGap="10">
                {rest.slice(3).map((e) => (
                  <li key={e.id}>
                    <EpisodeCard e={e} look="wide" />
                  </li>
                ))}
              </Grid>
            )}

            <HStack mt="11" justifyContent="center">
              <LinkButton href={CHANNELS.adult.url} variant="secondary" external>
                See every sermon on YouTube
              </LinkButton>
            </HStack>
          </Container>
        </Box>
      )}

      {/* 3. The three services, each with its own channel */}
      <Box as="section" id="services" aria-labelledby="services-heading" bg="bg.warm" py={{ base: "16", md: "24" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Heading as="h2" id="services-heading" fontFamily="heading" fontWeight="600" fontSize={{ base: "2.25rem", md: "44px" }} lineHeight="1.15" letterSpacing="-0.66px" mb="8">
            Services you can watch
          </Heading>
          <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "repeat(3, minmax(0, 1fr))" }} gap={{ base: "10", md: "7" }}>
            {watchServices.map((s, i) => (
              <li key={s.title}>
                <ChA
                  href={serviceLinks[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  display="flex"
                  flexDirection="column"
                  h="full"
                  color="fg"
                  textDecoration="none"
                  borderRadius="8px"
                  transition={`transform 160ms ${ease}`}
                  _active={{ transform: "scale(0.985)" }}
                  css={cardLink}
                >
                  <Box className="thumb" position="relative" aspectRatio="378 / 236" borderRadius="8px" overflow="hidden" bg="bg.muted">
                    <Img slot={servicePhotos[i]} decorative sizes="(min-width: 768px) 33vw, 100vw" />
                  </Box>
                  <Stack gap="10px" pt="5" flex="1">
                    <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="24px" lineHeight="1.25">
                      {s.title}
                    </Heading>
                    <Text fontSize="15px" lineHeight="1.65" color="fg.muted">
                      <RichText text={s.summary} />
                    </Text>
                  </Stack>
                  <Box pt="18px">
                    <LearnMore label="Watch on YouTube" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </Box>
                </ChA>
              </li>
            ))}
          </Grid>
        </Container>
      </Box>

      <MinistryClosing
        variant="design"
        bg="bg.canvas"
        title="Watching from Nairobi? Come in person"
        text="We'd love to meet you this Sunday at 9:00 or 11:30 AM on Ngong Road."
        primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
        secondary={{ label: "Get counselling", href: "/ministries/counselling-care" }}
      />
    </>
  );
}
