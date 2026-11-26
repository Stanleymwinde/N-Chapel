import { Box, Container, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { site } from "@content/site";
import { pageMetadata } from "@/lib/metadata";
import { formatEpisodeDate, getPodcastEpisodes, groupBySeries, type PodcastEpisode } from "@/lib/podcast";
import { LinkButton } from "@/components/Button";
import { EpisodePlayer } from "@/components/EpisodePlayer";
import { PLATFORM_MARKS } from "@/components/BrandMarks";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { ChDetails, ChSummary } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "Podcast",
  description:
    "Listen to the Compass Podcast, The Nairobi Chapel Ngong Road Podcast: Sunday messages from Nairobi Chapel Ngong Road on Spotify, Apple Podcasts, Amazon Music and YouTube, or play them here.",
  path: "/podcasts",
});

/** New episodes appear within the hour; the page itself stays static. */
export const revalidate = 3600;

const ease = "cubic-bezier(0.23, 1, 0.32, 1)";
const enter = (delay: number) => ({ animation: `heroIn 700ms ${ease} ${delay}ms both` });
/** How many earlier series to list before sending people to the apps */
const EARLIER_SERIES = 6;

/** The show's own description, from its feed */
const ABOUT = "A podcast to edify you in your faith and discipleship journey and inspire global reach through a local TOUCH.";

const meta = (e: PodcastEpisode) => [e.speaker, formatEpisodeDate(e.published), e.duration].filter(Boolean).join(" · ");
/** Episode notes, unless they only repeat the title */
const notesOf = (e: PodcastEpisode) => {
  const text = e.notes.join(" ");
  return text.toLowerCase().replace(/W/g, "") === e.message.toLowerCase().replace(/W/g, "") ? "" : text;
};
const label = (e: PodcastEpisode) => [e.series, e.episode ? `episode ${e.episode}` : "", e.message].filter(Boolean).join(", ");

/** One episode as a row: number, title and notes, then Play */
function EpisodeRow({ e, compact }: { e: PodcastEpisode; compact?: boolean }) {
  return (
    <Grid
      as="li"
      templateColumns={{ base: "1fr", md: compact ? "56px minmax(0, 1fr) auto" : "80px minmax(0, 1fr) auto" }}
      columnGap={{ md: "6" }}
      rowGap="3"
      alignItems="center"
      py={compact ? "5" : { base: "6", md: "7" }}
      borderTopWidth="1px"
      borderColor="border"
    >
      <Text aria-hidden="true" display={{ base: "none", md: "block" }} fontFamily="heading" fontWeight="700" fontSize={compact ? "1.5rem" : "2.25rem"} lineHeight="1" color="brand.fg">
        {e.episode ? String(e.episode).padStart(2, "0") : "·"}
      </Text>
      <Stack gap="1.5" minW="0">
        {e.episode && (
          <Text display={{ base: "block", md: "none" }} fontSize="0.75rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg">
            Episode {e.episode}
          </Text>
        )}
        <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={compact ? "1.0625rem" : { base: "1.1875rem", md: "1.375rem" }} lineHeight="1.25" textWrap="balance">
          {e.message}
        </Heading>
        <Text fontSize="0.9375rem" color="fg.muted">
          {meta(e)}
        </Text>
        {!compact && notesOf(e) && (
          <Text fontSize="0.9375rem" lineHeight="1.6" lineClamp={2} maxW="46rem">
            {notesOf(e)}
          </Text>
        )}
      </Stack>
      <Box justifySelf={{ base: "start", md: "end" }}>
        <EpisodePlayer src={e.audio} title={label(e)} duration={e.duration} size="md" />
      </Box>
    </Grid>
  );
}

function Platforms({ tone }: { tone: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <Stack gap="3" alignItems={dark ? "flex-start" : "center"} w="full">
      <Text id={`listen-on-${tone}`} fontSize="0.8125rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color={dark ? "rgba(255,255,255,0.7)" : "fg.muted"}>
        Listen on
      </Text>
      {/* White pills so each brand logo shows in its own colour; the logo and the name say which app */}
      <Box
        role="group"
        aria-labelledby={`listen-on-${tone}`}
        display={dark ? "grid" : "flex"}
        gridTemplateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 1fr))" }}
        maxW={dark ? "30rem" : undefined}
        w={dark ? "full" : undefined}
        flexWrap="wrap"
        gap="3"
        justifyContent={dark ? "flex-start" : "center"}
      >
        {site.podcast.platforms.map((p) => {
          const Mark = PLATFORM_MARKS[p.platform];
          return (
            <LinkButton
              key={p.platform}
              href={p.url}
              external
              size={dark ? "md" : "lg"}
              w={dark ? "full" : undefined}
              variant={dark ? "inverse" : "secondary"}
              bg={dark ? undefined : "bg.canvas"}
              justifyContent={dark ? "flex-start" : undefined}
              aria-label={`${p.label} (opens in a new tab)`}
              icon={Mark ? <Mark size={22} /> : undefined}
            >
              {p.platform}
            </LinkButton>
          );
        })}
      </Box>
    </Stack>
  );
}

export default async function PodcastPage() {
  const episodes = await getPodcastEpisodes();
  const latest = episodes[0];
  const series = groupBySeries(episodes);
  const current = latest?.series ? series.find((s) => s.series.toLowerCase() === latest.series.toLowerCase()) : undefined;
  const earlier = series.filter((s) => s !== current).slice(0, EARLIER_SERIES);

  return (
    <>
      {/* 1. The dark panel: what the podcast is, where to listen, and the newest episode */}
      <Box as="header" bg="bg.canvas" pt={{ base: "5", md: "8" }} pb={{ base: "16", md: "24" }}>
        <Container maxW="container" px={{ base: "4", md: "8" }}>
          <Box px={{ base: "1", md: "0" }} mb={{ base: "4", md: "5" }}>
            <Breadcrumbs items={[{ label: "Watch", href: "/watch" }, { label: "Podcast" }]} tone="light" />
          </Box>
          <Box borderRadius={{ base: "xl", md: "2xl" }} overflow="hidden" bg="night.900" color="white">
            <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1.05fr) minmax(0, 1fr)" }} gap={{ base: "10", lg: "14" }} alignItems="center" px={{ base: "5", md: "10", lg: "14" }} py={{ base: "12", md: "16", lg: "20" }}>
              <Stack gap={{ base: "5", md: "6" }}>
                <Text fontSize={{ base: "0.875rem", md: "1rem" }} fontWeight="600" letterSpacing="0.06em" textTransform="uppercase" color="accent.highlight" css={enter(0)}>
                  {site.podcast.name}
                </Text>
                <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize="clamp(2.5rem, 1.5rem + 3.6vw, 4.25rem)" lineHeight="1" letterSpacing="-0.02em" color="white" textWrap="balance" css={enter(60)}>
                  Nairobi Chapel Podcast
                </Heading>
                <Text fontSize={{ base: "1.0625rem", md: "1.25rem" }} lineHeight="1.65" color="rgba(255,255,255,0.88)" maxW="34rem" textWrap="pretty" css={enter(120)}>
                  {ABOUT} Listen on your favourite app, or play any episode right here.
                </Text>
                <Box css={enter(180)}>
                  <Platforms tone="dark" />
                </Box>
              </Stack>

              {/* The newest episode, like an album on the reference site */}
              {latest && (
                <Box bg="rgba(255,255,255,0.06)" borderWidth="1px" borderColor="rgba(255,255,255,0.12)" borderRadius="xl" p={{ base: "5", md: "7" }} css={enter(240)}>
                  <Grid templateColumns={{ base: "1fr", sm: "140px minmax(0, 1fr)" }} gap={{ base: "5", sm: "6" }} alignItems="center">
                    {latest.image && (
                      <Box aspectRatio="1" maxW={{ base: "180px", sm: "none" }} borderRadius="lg" overflow="hidden" bg="night.700" boxShadow="0 24px 50px -20px rgba(0,0,0,0.7)">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={latest.image} alt="" loading="eager" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </Box>
                    )}
                    <Stack gap="2" minW="0">
                      <Text fontSize="0.75rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="accent.highlight">
                        Latest episode{latest.series ? ` · ${latest.series}` : ""}
                      </Text>
                      <Heading as="h2" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.375rem", md: "1.625rem" }} lineHeight="1.2" color="white" textWrap="balance">
                        {latest.message}
                      </Heading>
                      <Text fontSize="0.9375rem" color="rgba(255,255,255,0.75)">
                        {meta(latest)}
                      </Text>
                    </Stack>
                  </Grid>
                  {notesOf(latest) && (
                    <Text mt="5" lineHeight="1.65" color="rgba(255,255,255,0.85)" lineClamp={3}>
                      {notesOf(latest)}
                    </Text>
                  )}
                  <Box mt="5">
                    <EpisodePlayer src={latest.audio} title={label(latest)} duration={latest.duration} tone="dark" size="lg" />
                  </Box>
                </Box>
              )}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* 2. The current series, newest first */}
      {current && (
        <Box as="section" id="series" aria-labelledby="series-heading" bg="bg.canvas" pb={{ base: "16", md: "24" }}>
          <Container maxW="container" px={{ base: "5", md: "8" }}>
            <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) minmax(0, 1fr)" }} gap={{ base: "3", lg: "16" }} alignItems="end" mb={{ base: "6", md: "10" }}>
              <Stack gap="2">
                <Text fontSize="0.875rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg">
                  Current series
                </Text>
                <Heading as="h2" id="series-heading" fontFamily="heading" fontWeight="700" fontSize={{ base: "2.5rem", md: "3.5rem" }} lineHeight="1.02" letterSpacing="-0.02em">
                  {current.series}
                </Heading>
              </Stack>
              <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.7" maxW="32rem">
                Every message in the series so far, newest first. Press play to listen here.
              </Text>
            </Grid>
            <Box as="ul" listStyle="none" m="0" p="0" borderBottomWidth="1px" borderColor="border">
              {current.episodes.map((e) => (
                <EpisodeRow key={e.id} e={e} />
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* 3. Earlier series, folded */}
      {earlier.length > 0 && (
        <Box as="section" id="earlier" aria-labelledby="earlier-heading" bg="bg.warm" py={{ base: "16", md: "24" }}>
          <Container maxW="container" px={{ base: "5", md: "8" }}>
            <Heading as="h2" id="earlier-heading" fontFamily="heading" fontWeight="700" fontSize={{ base: "2.25rem", md: "3.25rem" }} lineHeight="1.05" letterSpacing="-0.02em" mb={{ base: "6", md: "10" }}>
              Earlier series
            </Heading>
            <Box borderTopWidth="1px" borderColor="border.strong">
              {earlier.map((s) => (
                <ChDetails
                  key={s.series}
                  borderBottomWidth="1px"
                  borderColor="border.strong"
                  css={{ "& summary::-webkit-details-marker": { display: "none" }, "&[open] .chev": { transform: "rotate(180deg)" } }}
                >
                  <ChSummary display="flex" alignItems="center" justifyContent="space-between" gap="4" minH="64px" py="4" cursor="pointer" listStyle="none">
                    <Box>
                      <Text as="span" display="block" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.25rem", md: "1.5rem" }} lineHeight="1.2">
                        {s.series}
                      </Text>
                      <Text as="span" display="block" mt="1" fontSize="0.9375rem" color="fg.muted">
                        {s.episodes.length} episode{s.episodes.length === 1 ? "" : "s"}
                      </Text>
                    </Box>
                    <Box as="span" className="chev" display="inline-flex" color="brand.fg" transition={`transform 200ms ${ease}`} aria-hidden="true">
                      <ChevronDown size={22} />
                    </Box>
                  </ChSummary>
                  <Box as="ul" listStyle="none" m="0" p="0" pb="4">
                    {s.episodes.map((e) => (
                      <EpisodeRow key={e.id} e={e} compact />
                    ))}
                  </Box>
                </ChDetails>
              ))}
            </Box>
            <Stack mt={{ base: "10", md: "12" }} gap="4" alignItems="center" textAlign="center">
              <Text fontSize="1.0625rem" maxW="34rem">
                All {episodes.length} episodes are on the apps, back to the very first.
              </Text>
              <Platforms tone="light" />
            </Stack>
          </Container>
        </Box>
      )}

      {/* If the feed can't be reached, the apps still work */}
      {episodes.length === 0 && (
        <Box as="section" aria-label="Where to listen" bg="bg.canvas" pb={{ base: "16", md: "24" }}>
          <Container maxW="container" px={{ base: "5", md: "8" }}>
            <Stack gap="4" alignItems="center" textAlign="center">
              <Text fontSize="1.0625rem">Episodes can&apos;t be shown right now. Every episode is on the apps.</Text>
              <Platforms tone="light" />
            </Stack>
          </Container>
        </Box>
      )}

      <MinistryClosing
        title="Listen, then come and worship with us"
        text="Join us this Sunday at 9:00 or 11:30 AM on Ngong Road."
        primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
        secondary={{ label: "Watch sermons", href: "/watch" }}
      />
    </>
  );
}
