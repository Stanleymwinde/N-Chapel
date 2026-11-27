import { ViewTransition } from "react";
import NextLink from "next/link";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import type { MinistrySummary } from "@content/ministries";
import { Img } from "@/components/Img";
import { ChA } from "@/components/primitives";
import { LearnMore, learnMoreHover } from "./Circled";

const ease = "cubic-bezier(0.23, 1, 0.32, 1)";

/**
 * Reference-site card: a rounded photograph, a large heading, a short line,
 * the practical details in bold, then "Learn more" with a ringed chevron.
 * The whole card is one link. On a mouse the photo eases in 3% and the ring
 * fills gold; on press the card gives slightly. Touch gets no hover state.
 */
export function MinistryPhotoCard({
  m,
  ratio = "16 / 10",
  size = "lg",
  headingLevel = "h3",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority,
}: {
  m: MinistrySummary;
  ratio?: string;
  size?: "lg" | "md";
  headingLevel?: "h2" | "h3";
  sizes?: string;
  /** load first: the card is in the first screen */
  priority?: boolean;
}) {
  const lg = size === "lg";
  const details = [m.who !== "Everyone" ? m.who : null, m.when].filter(Boolean).join(" · ");
  return (
    <ChA
      asChild
      display="block"
      h="full"
      textDecoration="none"
      color="fg"
      borderRadius="lg"
      transition={`transform 160ms ${ease}`}
      _active={{ transform: "scale(0.985)" }}
      css={{
        "& .photo img": { transition: `transform 600ms ${ease}` },
        "@media (hover: hover) and (pointer: fine)": {
          "&:hover .photo img": { transform: "scale(1.03)" },
          ...learnMoreHover["@media (hover: hover) and (pointer: fine)"],
        },
        "@media (prefers-reduced-motion: reduce)": { "&:hover .photo img, &:active, &:hover .ring": { transform: "none" } },
      }}
    >
      <NextLink href={m.href}>
        <Stack gap={lg ? "5" : "6"} h="full">
          {/* Travels into the ministry page header on navigation */}
          <ViewTransition name={`ministry-${m.href.split("/").pop()}`} share="morph" default="none">
            <Box className="photo" position="relative" aspectRatio={ratio} borderRadius={lg ? "lg" : "12px"} overflow="hidden" bg="bg.muted">
              {m.image && <Img slot={m.image} sizes={sizes} priority={priority} />}
            </Box>
          </ViewTransition>
          <Stack gap="2.5" flex="1">
            <Heading
              as={headingLevel}
              fontFamily="heading"
              fontWeight="600"
              fontSize={lg ? { base: "1.625rem", md: "2rem" } : "1.3125rem"}
              lineHeight={lg ? "1.15" : "1.25"}
              letterSpacing="-0.01em"
              textWrap="balance"
            >
              {m.name}
            </Heading>
            <Text color="fg" fontSize={lg ? "1rem" : "0.875rem"} lineHeight={lg ? "1.75" : "1.55"} textWrap="pretty">
              {m.summary}
            </Text>
            {lg && details && (
              <Text fontSize="0.9375rem" fontWeight="700" color="fg">
                {details}
              </Text>
            )}
          </Stack>
          <Box pt={lg ? "1" : "0"} mt={lg ? "0" : "-2px"}>
            <LearnMore size="sm" />
          </Box>
        </Stack>
      </NextLink>
    </ChA>
  );
}
