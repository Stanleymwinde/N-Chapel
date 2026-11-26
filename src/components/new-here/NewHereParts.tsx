import { Box, Container, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Img } from "@/components/Img";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";

const ease = "cubic-bezier(0.23, 1, 0.32, 1)";
export const enter = (delay: number) => ({ animation: `heroIn 700ms ${ease} ${delay}ms both` });

/* ------------------------------------------------------------------ */
/* Centred page header: big title, bold line under it, then actions     */
/* ------------------------------------------------------------------ */
export function CentreHeader({ crumbs, title, lead, children }: { crumbs: Crumb[]; title: React.ReactNode; lead?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "8" }} pb={{ base: "14", md: "20" }}>
      <Container maxW="container" px={{ base: "5", md: "8" }}>
        <Breadcrumbs items={crumbs} tone="light" />
        <Stack alignItems="center" textAlign="center" gap={{ base: "7", md: "9" }} pt={{ base: "12", md: "16" }} maxW="60rem" mx="auto">
          <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize="clamp(2.75rem, 1.4rem + 5vw, 5.5rem)" lineHeight="1.12" letterSpacing="-0.02em" textWrap="balance" css={enter(0)}>
            {title}
          </Heading>
          {lead && (
            <Text fontFamily="heading" fontWeight="600" fontSize={{ base: "1.25rem", md: "1.75rem" }} lineHeight="1.4" maxW="50rem" textWrap="balance" css={enter(90)}>
              {lead}
            </Text>
          )}
          {children && <Box css={enter(170)}>{children}</Box>}
        </Stack>
      </Container>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Text beside a lifted photograph (the reference site's split row)     */
/* ------------------------------------------------------------------ */
export function SplitRow({ image, imageAlt, reverse, ratio = "4 / 3", children }: { image: string; imageAlt?: boolean; reverse?: boolean; ratio?: string; children: React.ReactNode }) {
  return (
    <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) minmax(0, 1fr)" }} gap={{ base: "10", lg: "20" }} alignItems="center">
      <Box order={{ base: 0, lg: reverse ? 1 : 0 }} position="relative" aspectRatio={ratio} borderRadius="lg" overflow="hidden" bg="bg.muted" boxShadow="0 30px 60px -28px rgba(22, 18, 31, 0.45)">
        <Img slot={image} decorative={!imageAlt} sizes="(min-width: 1024px) 40rem, 100vw" />
      </Box>
      <Stack gap="5" maxW="34rem">
        {children}
      </Stack>
    </Grid>
  );
}

/* ------------------------------------------------------------------ */
/* "You are welcome here": two crossing ribbons, after the reference    */
/* ------------------------------------------------------------------ */
type Phrase = { text: string; ref?: string };

/** The welcome, a short verse, and the church's own words, taking turns on each ribbon. */
const GOLD: Phrase[] = [
  { text: "You are welcome here" },
  { text: "“Come to me, all you who are weary”", ref: "Matthew 11:28" },
  { text: "Being disciples, making disciples" },
];
const DARK: Phrase[] = [
  { text: "“Accept one another, just as Christ accepted you”", ref: "Romans 15:7" },
  { text: "You are welcome here" },
  { text: "Grow D.E.E.P. to reach W.I.D.E." },
];

function Ribbon({ dark, reverse, rotate }: { dark?: boolean; reverse?: boolean; rotate: string }) {
  const phrases = dark ? DARK : GOLD;
  // Enough repeats to overfill the widest screen; the track is doubled for a seamless loop
  const words = Array.from({ length: 3 }, (_, round) =>
    phrases.map((p, i) => (
      <Box as="span" key={`${round}-${i}`} display="inline-flex" alignItems="center" gap={{ base: "5", md: "8" }} pe={{ base: "5", md: "8" }}>
        <Box as="span" display="inline-flex" alignItems="baseline" gap={{ base: "2", md: "3" }}>
          {p.text}
          {p.ref && (
            <Box as="span" fontSize="0.42em" fontWeight="700" letterSpacing="0.1em" opacity={0.75}>
              {p.ref}
            </Box>
          )}
        </Box>
        <Box as="span" display="inline-block" w={{ base: "3", md: "4" }} h={{ base: "3", md: "4" }} bg={dark ? "accent.highlight" : "ink.900"} transform="rotate(45deg)" />
      </Box>
    )),
  );
  return (
    <Box
      position="relative"
      w="110%"
      ms="-5%"
      bg={dark ? "night.900" : "accent.highlight"}
      color={dark ? "accent.highlight" : "ink.900"}
      transform={`rotate(${rotate})`}
      py={{ base: "3", md: "5" }}
      overflow="hidden"
      boxShadow={dark ? "0 -10px 30px -10px rgba(0,0,0,0.25)" : undefined}
    >
      <Box
        display="flex"
        w="max-content"
        // start on a whole word (the ribbon is wider than the screen)
        ps="8vw"
        whiteSpace="nowrap"
        fontFamily="heading"
        fontWeight="700"
        textTransform="uppercase"
        fontSize={{ base: "1.75rem", md: "3.25rem" }}
        lineHeight="1"
        letterSpacing="0.01em"
        css={{ "@media (prefers-reduced-motion: no-preference)": { animation: `${reverse ? "marqueeReverse" : "marquee"} 110s linear infinite` } }}
      >
        {words}
        {words}
      </Box>
    </Box>
  );
}

export function WelcomeRibbons() {
  return (
    <Box as="section" aria-label="You are welcome here" position="relative" overflow="hidden" bg="bg.warm" pt={{ base: "10", md: "14" }} pb={{ base: "12", md: "16" }}>
      <Text className="sr-only">You are welcome here. “Come to me, all you who are weary” (Matthew 11:28). “Accept one another, just as Christ accepted you” (Romans 15:7).</Text>
      <Box aria-hidden="true">
        <Ribbon rotate="1.6deg" />
        {/* Opposite tilts: apart on the left, crossing on the right */}
        <Box mt={{ base: "1", md: "2" }}>
          <Ribbon dark reverse rotate="-1.6deg" />
        </Box>
      </Box>
    </Box>
  );
}
