import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import type { Fact, Link, PathwayStep } from "@content/types";
import { LinkButton } from "../Button";
import { Icon } from "../icons";
import { Img } from "../Img";
import { RichText } from "../RichText";
import { CardBody, CardDescription, CardEyebrow, CardRoot, CardTitle } from "../recipe-parts";
import { ChLi, ChUl } from "../primitives";

/* ---------------- Form + aside (write-up card and photo) ---------------- */

type AsideProps = {
  title: string;
  text: string;
  link: Link;
  image: string;
  /** Figma photo height at desktop */
  imageHeight: number;
  /** "tint" (purple wash) on white/warm sections, "white" (bordered) on tint sections */
  tone?: "tint" | "white";
  /** photo grows to line up with the bottom of the form (default) */
  imageFill?: boolean;
};

/**
 * Figma "Row": the form card on the left and an aside on the right (a short
 * write-up pointing to a related page, then a photo).
 */
export function FormWithAside({ children, aside, formWidth = 744 }: { children: React.ReactNode; aside: AsideProps; formWidth?: number }) {
  const { title, text, link, image, imageHeight, tone = "tint", imageFill = true } = aside;
  return (
    <Grid templateColumns={{ base: "minmax(0, 1fr)", lg: `minmax(0, ${formWidth}fr) minmax(0, ${1200 - 40 - formWidth}fr)` }} gap={{ base: "8", lg: "40px" }} alignItems={imageFill ? "stretch" : "start"}>
      {/* the shared Form caps itself at 720px; here it fills the Figma column */}
      <Box css={{ "& > form": { maxWidth: "none", borderRadius: "12px", borderColor: "border" } }}>{children}</Box>
      <Stack as="aside" aria-label={title} gap="5">
        <Stack
          gap="3"
          px="6"
          pt="6"
          pb="26px"
          borderRadius="14px"
          bg={tone === "white" ? "bg.canvas" : "bg.tint"}
          borderWidth={tone === "white" ? "1px" : "0"}
          borderColor="border"
          alignItems="flex-start"
        >
          <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.125rem" lineHeight="normal">
            {title}
          </Heading>
          <Text fontSize="0.9375rem" lineHeight="1.65" color="fg.muted">
            <RichText text={text} />
          </Text>
          <LinkButton href={link.href} variant="link">
            {link.label}
          </LinkButton>
        </Stack>
        <Box
          position="relative"
          flex={{ lg: "1" }}
          minH={{ base: "280px", lg: `${imageHeight}px` }}
          aspectRatio={{ base: "4 / 3", lg: "auto" }}
          borderRadius="lg"
          overflow="hidden"
          bg="bg.muted"
        >
          <Img slot={image} sizes="(min-width: 1024px) 452px, 100vw" />
        </Box>
      </Stack>
    </Grid>
  );
}

/* ---------------- Facts with round icons (Kinara, School of Ministry) ---------------- */

/** Figma "Fact" rows: 32px tinted circle icon, 11px tracked label, 16px value. */
export function RoundIconFacts({ facts }: { facts: readonly Fact[] }) {
  return (
    <Box as="dl" display="grid" gap="18px" m="0">
      {facts.map((f) => (
        <Grid key={f.label} templateColumns="32px minmax(0, 1fr)" columnGap="14px" alignItems="start">
          <Box
            gridRow="span 2"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w="32px"
            h="32px"
            borderRadius="full"
            bg="bg.tint"
            color="brand.fg"
            aria-hidden="true"
          >
            <Icon name={f.icon} size={14} />
          </Box>
          <Text as="dt" fontSize="0.6875rem" fontWeight="600" letterSpacing="0.06em" textTransform="uppercase" color="fg.muted" lineHeight="normal">
            {f.label}
          </Text>
          <Box as="dd" m="0" mt="1" fontSize="1rem" lineHeight="1.5" color="fg" maxW="456px">
            <RichText text={f.value} />
          </Box>
        </Grid>
      ))}
    </Box>
  );
}

/** Intro paragraph + facts side by side (Figma "Row", 564px text, 64px gap). */
export function IntroWithFacts({ text, facts }: { text: string; facts: readonly Fact[] }) {
  return (
    <Grid templateColumns={{ base: "minmax(0, 1fr)", lg: "564px minmax(0, 1fr)" }} gap={{ base: "8", lg: "64px" }} alignItems="start">
      <Text fontSize={{ base: "1.0625rem", md: "1.125rem" }} lineHeight="1.65" color="fg.muted">
        <RichText text={text} />
      </Text>
      <RoundIconFacts facts={facts} />
    </Grid>
  );
}

/* ---------------- Diamond number (Figma "Diamond") ---------------- */

function Diamond({ n, size, last }: { n: number; size: 36 | 44; last?: boolean }) {
  const inner = size === 44 ? 31 : 25;
  return (
    <Box position="relative" w={`${size}px`} h={`${size}px`} flexShrink={0} display="flex" alignItems="center" justifyContent="center" aria-hidden="true">
      <Box position="absolute" w={`${inner}px`} h={`${inner}px`} borderRadius="3px" transform="rotate(45deg)" bg={last ? "accent.highlight" : "brand.solid"} />
      <Text as="span" position="relative" fontFamily="heading" fontWeight={size === 36 ? "700" : "600"} fontSize="0.875rem" lineHeight="1" color={last ? "accent.contrast" : "brand.contrast"}>
        {n}
      </Text>
    </Box>
  );
}

/* ---------------- Horizontal steps with connector (Kinara "How to apply") ---------------- */

export function ApplySteps({ steps }: { steps: readonly PathwayStep[] }) {
  return (
    <Box as="ol" listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: `repeat(${steps.length}, minmax(0, 278px))` }} gap={{ base: "8", lg: "24px" }}>
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <Stack as="li" key={s.title} gap="10px" alignItems="flex-start">
            <Box display="flex" alignItems="center" gap="12px" pb="14px" w="100%">
              <Diamond n={i + 1} size={44} last={last} />
              {!last && <Box flex="1" h="1.5px" bg="purple.200" display={{ base: "none", lg: "block" }} />}
            </Box>
            <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.0625rem" lineHeight="normal">
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </Heading>
            <Text fontSize="0.9375rem" lineHeight="1.6" color="fg.muted" maxW="266px">
              <RichText text={s.summary} />
            </Text>
            {s.bullets && (
              <ChUl listStyle="none" m="0" pl="14px" display="grid" gap="6px" fontSize="0.9375rem" lineHeight="1.5" color="fg.muted" maxW="256px">
                {s.bullets.map((b) => (
                  <li key={b}>
                    <RichText text={b} />
                  </li>
                ))}
              </ChUl>
            )}
            {s.cta && (
              <Box pt="6px">
                <LinkButton href={s.cta.href} variant="link" arrow={false}>
                  {s.cta.label}
                </LinkButton>
              </Box>
            )}
          </Stack>
        );
      })}
    </Box>
  );
}

/* ---------------- Vertical steps with connector (Serve "How to sign up") ---------------- */

export function SignUpSteps({ steps }: { steps: readonly PathwayStep[] }) {
  return (
    <Box as="ol" listStyle="none" m="0" p="0" pt="3">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <Box as="li" key={s.title} display="flex" gap="18px" alignItems="stretch">
            <Box display="flex" flexDirection="column" alignItems="center" flexShrink={0}>
              <Diamond n={i + 1} size={36} last={last} />
              {!last && <Box flex="1" w="2px" bg="border" />}
            </Box>
            <Stack gap="6px" pt="6px" pb={last ? "0" : "28px"} flex="1" minW="0" alignItems="flex-start">
              <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.125rem" lineHeight="normal">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </Heading>
              <Text fontSize="0.96875rem" lineHeight="1.55" color="ink.700">
                <RichText text={s.summary} />
              </Text>
              {s.cta && (
                <Box pt="2px">
                  <LinkButton href={s.cta.href} variant="link" fontSize="0.9375rem" fontWeight="600">
                    {s.cta.label}
                  </LinkButton>
                </Box>
              )}
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
}

/* ---------------- Level card (Kinara "The leadership pipeline") ---------------- */

export function LevelCard({ level, title, focus, summary, points }: { level: string; title: string; focus: string; summary?: string; points: readonly string[] }) {
  return (
    <CardRoot variant="group" borderRadius="12px">
      <CardBody px="22px" py="26px" gap="10px">
        <CardEyebrow fontSize="0.6875rem" letterSpacing="0.06em" lineHeight="normal">
          {level}
        </CardEyebrow>
        <CardTitle fontSize="1.125rem" lineHeight="normal">
          {title}
        </CardTitle>
        <CardDescription fontSize="0.9375rem" lineHeight="1.6">
          Focus:{" "}
          <Text as="strong" fontWeight="600" color="fg">
            {focus.toLowerCase()}
          </Text>
          .{summary ? ` ${summary}` : ""}
        </CardDescription>
        <ChUl listStyle="none" m="0" pl="14px" pt="1" display="grid" gap="8px" fontSize="0.9375rem" lineHeight="normal" color="fg">
          {points.map((p) => (
            <ChLi key={p}>{p}</ChLi>
          ))}
        </ChUl>
      </CardBody>
    </CardRoot>
  );
}
