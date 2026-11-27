import { Box, Container, Grid, HStack, Stack, Text } from "@chakra-ui/react";
import { Img } from "@/components/Img";
import { Form } from "@/components/Form";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import type { FormDefinition } from "@content/types";

const ease = "cubic-bezier(0.23, 1, 0.32, 1)";
export const enter = (delay: number) => ({ animation: `heroIn 700ms ${ease} ${delay}ms both` });

/** Figma section heading on these pages: 44px semibold, slightly tight. */
export const sectionHeading = {
  fontFamily: "heading",
  fontWeight: "600",
  fontSize: { base: "2rem", md: "2.75rem" },
  lineHeight: "1.1",
  letterSpacing: "-0.015em",
  textWrap: "balance",
} as const;

/** Figma "Info" label: small, tracked, uppercase, muted. */
export const infoLabel = { fontSize: "0.6875rem", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "fg.muted", lineHeight: "normal" } as const;

/** The 1200px content column (container token includes the 32px gutters). */
export function Wrap({ children, ...rest }: { children: React.ReactNode } & React.ComponentProps<typeof Container>) {
  return (
    <Container maxW="container" px={{ base: "5", md: "8" }} {...rest}>
      {children}
    </Container>
  );
}

/** Small Figma breadcrumb (12px). */
export function SmallCrumbs({ items }: { items: Crumb[] }) {
  return (
    <Box css={{ "& nav": { fontSize: "0.75rem" }, "& svg": { width: "12px", height: "12px" } }}>
      <Breadcrumbs items={items} tone="light" />
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Hand-drawn marks from the Figma file                                 */
/* ------------------------------------------------------------------ */

/** A word inside the gold ring (Figma "New (ringed)" / "Circled word"). */
export function Ringed({ children, variant = "loop" }: { children: React.ReactNode; variant?: "ellipse" | "loop" }) {
  const ellipse = variant === "ellipse";
  return (
    <Box as="span" position="relative" display="inline-block" whiteSpace="nowrap" px={ellipse ? "0.06em" : "0.26em"}>
      <Box
        as="img"
        // decorative: the ring adds no meaning
        {...{ src: ellipse ? "/media/newhere/ring-new.svg" : "/media/newhere/ring-next.svg", alt: "" }}
        aria-hidden="true"
        position="absolute"
        pointerEvents="none"
        maxW="none"
        {...(ellipse
          ? { left: "-0.29em", top: "0.02em", width: "calc(100% + 0.55em)", height: "1.13em", transform: "rotate(3deg)" }
          : { left: "-0.13em", top: "-0.1em", width: "calc(100% + 0.2em)", height: "1.53em" })}
      />
      <Box as="span" position="relative">
        {children}
      </Box>
    </Box>
  );
}

/** Gold swoosh under a phrase (Figma "Swoosh"). */
export function Swooshed({ children, src = "/media/newhere/swoosh-faith.svg" }: { children: React.ReactNode; src?: string }) {
  return (
    <Box as="span" position="relative" display="inline-block" whiteSpace="nowrap">
      <Box as="img" {...{ src, alt: "" }} aria-hidden="true" position="absolute" left="0.04em" top="0.8em" w="calc(100% - 0.1em)" h="0.32em" maxW="none" pointerEvents="none" />
      <Box as="span" position="relative">
        {children}
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Text beside a photograph (Figma "Row": copy + 559×400 photo slot)   */
/* ------------------------------------------------------------------ */
export function SplitRow({ image, imageAlt, photoFirst, children }: { image: string; imageAlt?: boolean; photoFirst?: boolean; children: React.ReactNode }) {
  return (
    <Grid
      templateColumns={{ base: "minmax(0, 1fr)", lg: photoFirst ? "minmax(0, 559px) minmax(0, 1fr)" : "minmax(0, 1fr) minmax(0, 559px)" }}
      gap={{ base: "10", lg: "64px" }}
      alignItems="center"
    >
      <Box order={{ base: 0, lg: photoFirst ? 0 : 1 }} position="relative" aspectRatio="559 / 400" borderRadius="16px" overflow="hidden" bg="bg.muted">
        <Img slot={image} decorative={!imageAlt} sizes="(min-width: 1024px) 559px, 100vw" />
      </Box>
      <Stack gap="4" maxW="564px">
        {children}
      </Stack>
    </Grid>
  );
}

/* ------------------------------------------------------------------ */
/* Form card                                                            */
/* ------------------------------------------------------------------ */
export function FormCard({ form, large }: { form: FormDefinition; large?: boolean }) {
  return (
    <Box
      w="full"
      maxW={large ? "864px" : "828px"}
      mx="auto"
      p={{ base: "6", md: "10" }}
      bg="bg.canvas"
      borderRadius={large ? "20px" : "16px"}
      boxShadow={large ? undefined : "0 10px 15px rgba(28, 23, 38, 0.08)"}
      css={{
        "& h3": large
          ? { fontSize: { base: "1.75rem", md: "2.25rem" }, fontWeight: "700", lineHeight: "1.2" }
          : { fontSize: "1.625rem", fontWeight: "600", lineHeight: "1.25" },
        "& h3 + p": { fontSize: large ? "1.0625rem" : "1rem", lineHeight: "1.55" },
        // Figma "Form field": 14px medium labels, 46px fields with 6px corners
        "& label": { fontSize: "0.875rem", fontWeight: "500" },
        "& input, & select": { height: "46px", borderRadius: "6px" },
        "& textarea": { borderRadius: "6px" },
      }}
    >
      <Form form={form} plain />
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* "You are welcome here": two crossing bands (Figma "Welcome banners") */
/* ------------------------------------------------------------------ */
type Phrase = { text: string; ref?: string };

const GOLD: Phrase[] = [{ text: "You are welcome here" }, { text: "“Come to me, all you who are weary”" }];
const DARK: Phrase[] = [{ text: "“Accept one another, just as Christ accepted you”", ref: "Romans 15:7" }, { text: "“Accept one another”" }];

function Band({ dark, reverse, rotate }: { dark?: boolean; reverse?: boolean; rotate: string }) {
  const phrases = dark ? DARK : GOLD;
  // Enough repeats to overfill the widest screen; the track is doubled for a seamless loop
  const words = Array.from({ length: 4 }, (_, round) =>
    phrases.map((p, i) => (
      <Box as="span" key={`${round}-${i}`} display="inline-flex" alignItems="center" gap="0.5em" pe="0.5em">
        <span>
          {p.text}
          {p.ref && <>&nbsp;&nbsp;{p.ref}</>}
        </span>
        <span>◆</span>
      </Box>
    )),
  );
  return (
    <Box position="relative" w="112%" ms="-6%" bg={dark ? "night.900" : "accent.highlight"} color={dark ? "accent.highlight" : "ink.900"} transform={`rotate(${rotate})`} py={{ base: "3", md: "18px" }} overflow="hidden">
      <Box
        display="flex"
        w="max-content"
        ps="40px"
        whiteSpace="pre"
        fontFamily="heading"
        fontWeight="800"
        textTransform="uppercase"
        fontSize={{ base: "1.625rem", md: "2.625rem" }}
        lineHeight="normal"
        letterSpacing="0.02em"
        css={{ "@media (prefers-reduced-motion: no-preference)": { animation: `${reverse ? "marqueeReverse" : "marquee"} 110s linear infinite` } }}
      >
        {words}
        {words}
      </Box>
    </Box>
  );
}

export function WelcomeRibbons({ tall }: { tall?: boolean }) {
  return (
    <Box as="section" aria-label="You are welcome here" position="relative" overflow="hidden" bg="bg.warm" pt={{ base: "6", md: "6" }} pb={{ base: "10", md: tall ? "16" : "10" }}>
      <Text className="sr-only">You are welcome here. “Come to me, all you who are weary.” “Accept one another, just as Christ accepted you” (Romans 15:7).</Text>
      <Box aria-hidden="true">
        <Band rotate="1deg" />
        {/* Opposite tilts: the dark band crosses the gold one */}
        <Box mt={{ base: "-1", md: "-2" }}>
          <Band dark reverse rotate="-1.3deg" />
        </Box>
      </Box>
    </Box>
  );
}

/** Row of buttons with Figma's 12px gap. */
export function Ctas({ children, pt = "3" }: { children: React.ReactNode; pt?: string }) {
  return (
    <HStack gap="3" flexWrap="wrap" pt={pt}>
      {children}
    </HStack>
  );
}

