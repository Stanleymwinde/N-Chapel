import { ViewTransition } from "react";
import { Box, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { allMinistries } from "@content/ministries";
import type { MinistryBase } from "@content/ministries/types";
import { isTodo } from "@content/site";
import { Icon } from "@/components/icons";
import { Img } from "@/components/Img";
import { RichText } from "@/components/RichText";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ChA } from "@/components/primitives";

/** One entrance on load: each part rises 8px and fades in, a beat apart. */
const enter = (delay: number) => ({
  animation: `heroIn 700ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms both`,
});

type Props = {
  m: Pick<MinistryBase, "title" | "intro" | "heroImage" | "facts" | "href">;
  /** last breadcrumb, the ministry's short name */
  crumb: string;
  /** buttons (LinkButton variant="accent" reads best on the dark panel) */
  actions?: React.ReactNode;
};

/**
 * Ministry page header, after the reference site: a rounded dark photo panel
 * inset from the page edges, a gold uppercase line, a large white title set
 * centre, and gold buttons. The when / where / who facts sit on a white card
 * that overlaps the panel's foot, so they are answered on the first screen.
 */
export function MinistryHero({ m, crumb, actions }: Props) {
  const summary = allMinistries.find((x) => x.href === m.href);
  const kicker = summary?.group === "age" ? `For ${summary.who.replace(/^Ages/, "ages").toLowerCase()} · Nairobi Chapel` : "Ministries at Nairobi Chapel";
  const cols = Math.min(m.facts.length, 4);

  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "5", md: "8" }} pb={{ base: "12", md: "16" }}>
      <Container maxW="container" px={{ base: "4", md: "8" }}>
        <Box px={{ base: "1", md: "0" }} mb={{ base: "4", md: "5" }}>
          <Breadcrumbs items={[{ label: "Ministries", href: "/ministries" }, { label: crumb }]} tone="light" />
        </Box>

        {/* The dark photo panel */}
        <Box position="relative" borderRadius={{ base: "xl", md: "2xl" }} overflow="hidden" bg="night.900" color="white">
          <ViewTransition name={`ministry-${m.href.split("/").pop()}`} share="morph" default="none">
            <Box position="absolute" inset="0">
              <Img slot={m.heroImage} priority sizes="(min-width: 1280px) 1200px, 100vw" />
            </Box>
          </ViewTransition>
          {/* Solid scrim for text contrast (white on this passes AA over any photo) */}
          <Box position="absolute" inset="0" bg="rgba(12, 9, 18, 0.68)" aria-hidden="true" />

          <Stack
            position="relative"
            alignItems="center"
            textAlign="center"
            gap={{ base: "5", md: "6" }}
            maxW="48rem"
            mx="auto"
            px={{ base: "6", md: "10" }}
            pt={{ base: "16", md: "24", lg: "28" }}
            pb={{ base: "24", md: "32", lg: "36" }}
          >
            <Text fontSize={{ base: "0.875rem", md: "1rem" }} fontWeight="600" letterSpacing="0.06em" textTransform="uppercase" color="accent.highlight" css={enter(0)}>
              {kicker}
            </Text>
            <Heading
              as="h1"
              fontFamily="heading"
              fontWeight="700"
              fontSize="clamp(2.5rem, 1.4rem + 4.4vw, 5rem)"
              lineHeight="1.02"
              letterSpacing="-0.02em"
              color="white"
              textWrap="balance"
              css={enter(60)}
            >
              {m.title}
            </Heading>
            <Text fontSize={{ base: "1.0625rem", md: "1.25rem" }} lineHeight="1.65" color="rgba(255,255,255,0.9)" maxW="40rem" textWrap="pretty" css={enter(120)}>
              <RichText text={m.intro} />
            </Text>
            {actions && (
              <HStack gap="3" flexWrap="wrap" justifyContent="center" pt="1" css={enter(180)}>
                {actions}
              </HStack>
            )}
          </Stack>
        </Box>

        {/* At a glance: a white card over the panel's foot */}
        <Box
          as="dl"
          position="relative"
          zIndex="1"
          mt={{ base: "-12", md: "-16" }}
          mx={{ base: "3", md: "8", lg: "12" }}
          display="grid"
          gridTemplateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: `repeat(${cols}, minmax(0, 1fr))` }}
          bg="bg.canvas"
          borderRadius="xl"
          boxShadow="0 24px 60px -24px rgba(22, 18, 31, 0.35), 0 2px 6px rgba(22, 18, 31, 0.06)"
          overflow="hidden"
          css={{
            ...enter(220),
            "& > div": { borderColor: "var(--chakra-colors-border)" },
          }}
        >
          {m.facts.map((f, i) => (
            <Grid
              key={`${f.label}-${f.value}`}
              templateColumns="auto minmax(0, 1fr)"
              gap="4"
              alignItems="start"
              p={{ base: "5", md: "6" }}
              borderTopWidth={{ base: i === 0 ? "0" : "1px", sm: i < 2 ? "0" : "1px", lg: "0" }}
              borderLeftWidth={{ base: "0", sm: i % 2 === 1 ? "1px" : "0", lg: i === 0 ? "0" : "1px" }}
            >
              <Box display="inline-flex" alignItems="center" justifyContent="center" w="10" h="10" borderRadius="full" bg="accent.subtle" color="ink.900" aria-hidden="true">
                <Icon name={f.icon} size={18} />
              </Box>
              <Box minW="0">
                <Text as="dt" fontSize="0.75rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="fg.muted" mb="1">
                  {f.label}
                </Text>
                <Text as="dd" m="0" fontWeight="600" lineHeight="1.45" color="fg" textWrap="pretty">
                  {f.href && !isTodo(f.href) ? (
                    <ChA
                      href={f.href}
                      color="brand.fg"
                      textDecoration="underline"
                      textUnderlineOffset="0.2em"
                      _hover={{ textDecorationThickness: "2px" }}
                      {...(/^https?:/.test(f.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <RichText text={f.value} />
                    </ChA>
                  ) : (
                    <RichText text={f.value} />
                  )}
                </Text>
              </Box>
            </Grid>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
