import { ViewTransition } from "react";
import { Box, Container, Heading, HStack, Stack, Text } from "@chakra-ui/react";
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
 * Ministry page header (Figma "Hero"): a 996px rounded photo banner with a
 * dark overlay, a gold uppercase line, a large white title set centre and a
 * gold button. The when / where / who facts sit on a 1032px white "Info card"
 * that overlaps the banner's foot by 56px, so they are answered on the first
 * screen.
 */
export function MinistryHero({ m, crumb, actions }: Props) {
  const summary = allMinistries.find((x) => x.href === m.href);
  const kicker = summary?.group === "age" ? `For ${summary.who.replace(/^Ages/, "ages").toLowerCase()} · Nairobi Chapel` : "Ministries at Nairobi Chapel";

  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "16", md: "24" }}>
      <Container maxW="container" px={{ base: "4", md: "8" }}>
        <Box pb="6" css={{ "& nav": { fontSize: "0.75rem" } }}>
          <Breadcrumbs items={[{ label: "Ministries", href: "/ministries" }, { label: crumb }]} tone="light" />
        </Box>

        {/* Figma "Hero banner": 996 × 530, 16px radius */}
        <Box
          position="relative"
          maxW="996px"
          mx="auto"
          minH={{ base: "auto", md: "530px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="16px"
          overflow="hidden"
          bg="night.900"
          color="white"
        >
          <ViewTransition name={`ministry-${m.href.split("/").pop()}`} share="morph" default="none">
            <Box position="absolute" inset="0">
              <Img slot={m.heroImage} priority sizes="(min-width: 1060px) 996px, 100vw" />
            </Box>
          </ViewTransition>
          {/* Overlay for text contrast (white on this passes AA over any photo) */}
          <Box position="absolute" inset="0" bg="rgba(20, 15, 26, 0.62)" aria-hidden="true" />

          <Stack
            position="relative"
            alignItems="center"
            textAlign="center"
            gap="5"
            maxW="44rem"
            mx="auto"
            px={{ base: "6", md: "10" }}
            pt={{ base: "16", md: "10" }}
            pb={{ base: "24", md: "calc(56px + 2.5rem)" }}
          >
            <Text fontSize="0.875rem" fontWeight="600" letterSpacing="0.06em" textTransform="uppercase" color="accent.highlight" css={enter(0)}>
              {kicker}
            </Text>
            <Heading
              as="h1"
              fontFamily="heading"
              fontWeight="600"
              fontSize="clamp(2.5rem, 1.6rem + 3.4vw, 4.25rem)"
              lineHeight="1.05"
              letterSpacing="-0.02em"
              color="white"
              textWrap="balance"
              maxW="36rem"
              css={enter(60)}
            >
              {m.title}
            </Heading>
            <Text fontSize="1.125rem" lineHeight="1.55" color="white" maxW="34rem" textWrap="pretty" css={enter(120)}>
              <RichText text={m.intro} />
            </Text>
            {actions && (
              <HStack gap="3" flexWrap="wrap" justifyContent="center" css={enter(180)}>
                {actions}
              </HStack>
            )}
          </Stack>
        </Box>

        {/* Figma "Info card": 1032px, overlapping the banner by 56px */}
        <Box
          as="dl"
          position="relative"
          zIndex="1"
          maxW="1032px"
          mt="-56px"
          mx={{ base: "3", md: "auto" }}
          display="grid"
          gridTemplateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: `repeat(${Math.min(m.facts.length, 4)}, minmax(0, 1fr))` }}
          bg="bg.canvas"
          borderRadius="16px"
          boxShadow="0 12px 16px rgba(28, 23, 38, 0.12)"
          overflow="hidden"
          css={enter(220)}
        >
          {m.facts.map((f, i) => (
            <Box
              key={`${f.label}-${f.value}`}
              display="flex"
              gap="3"
              alignItems="flex-start"
              pt="5"
              pb="22px"
              pl="5"
              pr="18px"
              borderColor="border"
              borderTopWidth={{ base: i === 0 ? "0" : "1px", sm: i < 2 ? "0" : "1px", lg: "0" }}
              borderLeftWidth={{ base: "0", sm: i % 2 === 1 ? "1px" : "0", lg: i === 0 ? "0" : "1px" }}
            >
              <Box display="inline-flex" flexShrink="0" alignItems="center" justifyContent="center" w="36px" h="36px" borderRadius="full" bg="accent.subtle" color="fg" aria-hidden="true">
                <Icon name={f.icon} size={16} />
              </Box>
              <Stack gap="6px" minW="0" flex="1">
                <Text as="dt" fontSize="0.6875rem" fontWeight="600" letterSpacing="0.06em" textTransform="uppercase" color="fg.muted">
                  {f.label}
                </Text>
                <Text as="dd" m="0" fontSize="0.9375rem" lineHeight="1.45" color="fg" textWrap="pretty">
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
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
