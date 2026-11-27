import { Box, Container, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { site } from "@content/site";
import { pageMetadata } from "@/lib/metadata";
import { formatEpisodeDate, getPodcastEpisodes, groupBySeries, type PodcastEpisode } from "@/lib/podcast";
import { EpisodePlayer } from "@/components/EpisodePlayer";
import { PLATFORM_MARKS } from "@/components/BrandMarks";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { ChA, ChDetails, ChSummary } from "@/components/primitives";

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

/** Figma "Episode" row: 72px number, title / meta / notes, then Play */
function EpisodeRow({ e, compact }: { e: PodcastEpisode; compact?: boolean }) {
  return (
    <Grid
      as="li"
      templateColumns={{ base: "1fr", md: compact ? "56px minmax(0, 1fr) auto" : "72px minmax(0, 1fr) auto" }}
      columnGap={{ md: compact ? "6" : "10" }}
      rowGap="3"
      alignItems="center"
      py={compact ? "5" : "26px"}
      borderBottomWidth="1px"
      borderColor="#E2DDE6"
      css={compact ? { "&:last-child": { borderBottomWidth: 0 } } : undefined}
    >
      <Text aria-hidden="true" display={{ base: "none", md: "block" }} fontFamily="heading" fontWeight="700" fontSize={compact ? "24px" : "34px"} lineHeight="normal" color="brand.fg">
        {e.episode ? String(e.episode).padStart(2, "0") : "·"}
      </Text>
      <Stack gap="6px" minW="0">
        {e.episode && (
          <Text display={{ base: "block", md: "none" }} fontSize="0.75rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg">
            Episode {e.episode}
          </Text>
        )}
        <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={compact ? "17px" : "19px"} lineHeight="1.3" textWrap="balance">
          {e.message}
        </Heading>
        <Text fontSize="13.5px" color="fg.muted">
          {meta(e)}
        </Text>
        {!compact && notesOf(e) && (
          <Text fontSize="14.5px" lineHeight="1.55" color="#3A3445" lineClamp={2} maxW="720px">
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

/** Figma "Listen on" pills: white on the dark card, purple outline on cream */
function Platforms({ tone }: { tone: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <Stack gap="3" alignItems={dark ? "flex-start" : "center"} w="full" pt={dark ? "2" : "0"}>
      <Text id={`listen-on-${tone}`} fontSize="11.5px" fontWeight="600" letterSpacing="0.92px" textTransform="uppercase" color={dark ? "#B8B0C4" : "fg.muted"}>
        Listen on
      </Text>
      <Box
        as="ul"
        listStyle="none"
        m="0"
        p="0"
        aria-labelledby={`listen-on-${tone}`}
        display={dark ? "grid" : "flex"}
        gridTemplateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 230px))" }}
        flexWrap="wrap"
        gap={dark ? "10px" : "3"}
        justifyContent={dark ? "flex-start" : "center"}
      >
        {site.podcast.platforms.map((p) => {
          const Mark = PLATFORM_MARKS[p.platform];
          return (
            <li key={p.platform}>
              <ChA
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.label} (opens in a new tab)`}
                display="flex"
                alignItems="center"
                gap="2"
                w={dark ? "full" : undefined}
                minH="40px"
                px={dark ? "4" : "5"}
                py={dark ? "10px" : "12px"}
                borderRadius="full"
                bg={dark ? "white" : "transparent"}
                borderWidth={dark ? "0" : "1.5px"}
                borderColor="brand.solid"
                color="brand.fg"
                fontFamily="heading"
                fontWeight="500"
                fontSize="14.5px"
                lineHeight="normal"
                textDecoration="none"
                transition="background-color 150ms ease, color 150ms ease"
                _hover={dark ? { bg: "purple.50" } : { bg: "brand.solid", color: "white" }}
                _focusVisible={{ outline: "3px solid", outlineColor: dark ? "accent.highlight" : "brand.solid", outlineOffset: "2px" }}
              >
                {Mark ? <Mark size={16} /> : null}
                {p.platform}
                <ExternalLink size={13} aria-hidden="true" />
              </ChA>
            </li>
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
      {/* 1. The dark card: what the podcast is, where to listen, and the newest episode */}
      <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "16", md: "24" }}>
        <Container maxW="container" px={{ base: "4", md: "8" }}>
          <Box px={{ base: "1", md: "0" }} mb="7">
            <Breadcrumbs items={[{ label: "Watch", href: "/watch" }, { label: "Podcast" }]} tone="light" />
          </Box>
          <Box borderRadius={{ base: "xl", md: "24px" }} overflow="hidden" bg="#1C1726" color="white">
            <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) 460px" }} gap={{ base: "10", lg: "14" }} alignItems="center" px={{ base: "5", md: "10", lg: "16" }} py={{ base: "12", md: "16", lg: "72px" }}>
              <Stack gap="22px">
                <Text fontSize="13px" fontWeight="600" letterSpacing="1.04px" textTransform="uppercase" color="accent.highlight" css={enter(0)}>
                  {site.podcast.name}
                </Text>
                <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize={{ base: "2.75rem", md: "60px" }} lineHeight="1.05" color="white" css={enter(60)}>
                  Nairobi Chapel Podcast
                </Heading>
                <Text fontSize={{ base: "1.0625rem", md: "18px" }} lineHeight="1.6" color="#E6E1EC" maxW="470px" textWrap="pretty" css={enter(120)}>
                  {ABOUT} Listen on your favourite app, or play any episode right here.
                </Text>
                <Box css={enter(180)}>
                  <Platforms tone="dark" />
                </Box>
              </Stack>

              {/* The newest episode */}
              {latest && (
                <Stack gap="18px" bg="#2A2433" borderWidth="1px" borderColor="rgba(255,255,255,0.08)" borderRadius="20px" p={{ base: "5", md: "7" }} css={enter(240)}>
                  <Grid templateColumns={latest.image ? "108px minmax(0, 1fr)" : "1fr"} gap="18px" alignItems="start">
                    {latest.image && (
                      <Box w="108px" h="108px" borderRadius="12px" overflow="hidden" bg="night.700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={latest.image} alt="" loading="eager" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </Box>
                    )}
                    <Stack gap="6px" minW="0">
                      <Text fontSize="11px" fontWeight="600" letterSpacing="0.66px" textTransform="uppercase" color="accent.highlight">
                        Latest episode{latest.series ? ` · ${latest.series}` : ""}
                      </Text>
                      <Heading as="h2" fontFamily="heading" fontWeight="600" fontSize="22px" lineHeight="1.2" color="white">
                        {latest.message}
                      </Heading>
                      <Text fontSize="13px" lineHeight="1.45" color="#B8B0C4">
                        {meta(latest)}
                      </Text>
                    </Stack>
                  </Grid>
                  {notesOf(latest) && (
                    <Text fontSize="15px" lineHeight="1.6" color="#E6E1EC" lineClamp={3}>
                      {notesOf(latest)}
                    </Text>
                  )}
                  <Box>
                    <EpisodePlayer src={latest.audio} title={label(latest)} duration={latest.duration} tone="dark" size="lg" />
                  </Box>
                </Stack>
              )}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* 2. The current series, newest first */}
      {current && (
        <Box as="section" id="series" aria-labelledby="series-heading" bg="bg.canvas" pb={{ base: "16", md: "24" }}>
          <Container maxW="container" px={{ base: "5", md: "8" }}>
            <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) 420px" }} gap={{ base: "3", lg: "16" }} alignItems="end" mb="9">
              <Stack gap="2">
                <Text fontSize="12.5px" fontWeight="600" letterSpacing="1px" textTransform="uppercase" color="brand.fg">
                  Current series
                </Text>
                <Heading as="h2" id="series-heading" fontFamily="heading" fontWeight="700" fontSize={{ base: "2.5rem", md: "48px" }} lineHeight="1.1">
                  {current.series}
                </Heading>
              </Stack>
              <Text fontSize={{ base: "1.0625rem", md: "18px" }} lineHeight="1.55" color="#3A3445">
                Every message in the series so far, newest first. Press play to listen here.
              </Text>
            </Grid>
            <Box as="ul" listStyle="none" m="0" p="0" borderTopWidth="1px" borderColor="#E2DDE6">
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
            <Heading as="h2" id="earlier-heading" fontFamily="heading" fontWeight="700" fontSize={{ base: "2.25rem", md: "48px" }} lineHeight="1.1" mb="8">
              Earlier series
            </Heading>
            <Box borderTopWidth="1px" borderColor="#D9D3DF">
              {earlier.map((s) => (
                <ChDetails
                  key={s.series}
                  borderBottomWidth="1px"
                  borderColor="#D9D3DF"
                  css={{ "& summary::-webkit-details-marker": { display: "none" }, "&[open] .chev": { transform: "rotate(180deg)" } }}
                >
                  <ChSummary display="flex" alignItems="center" justifyContent="space-between" gap="4" py="22px" cursor="pointer" listStyle="none">
                    <Box>
                      <Text as="span" display="block" fontFamily="heading" fontWeight="600" fontSize="20px" lineHeight="normal">
                        {s.series}
                      </Text>
                      <Text as="span" display="block" mt="1" fontSize="13.5px" color="fg.muted">
                        {s.episodes.length} episode{s.episodes.length === 1 ? "" : "s"}
                      </Text>
                    </Box>
                    <Box as="span" className="chev" display="inline-flex" p="2" borderRadius="full" bg="bg.canvas" color="brand.fg" transition={`transform 200ms ${ease}`} aria-hidden="true">
                      <ChevronDown size={18} />
                    </Box>
                  </ChSummary>
                  <Box as="ul" listStyle="none" m="0" p="0" pb="4" borderTopWidth="1px" borderColor="#E2DDE6">
                    {s.episodes.map((e) => (
                      <EpisodeRow key={e.id} e={e} compact />
                    ))}
                  </Box>
                </ChDetails>
              ))}
            </Box>
            <Stack pt="12" gap="14px" alignItems="center" textAlign="center">
              <Text fontSize="16px" color="#3A3445">
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
        variant="design"
        bg="bg.canvas"
        title="Listen, then come and worship with us"
        text="Join us this Sunday at 9:00 or 11:30 AM on Ngong Road."
        primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
        secondary={{ label: "Get counselling", href: "/ministries/counselling-care" }}
      />
    </>
  );
}
