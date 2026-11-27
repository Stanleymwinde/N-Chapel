import NextLink from "next/link";
import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import type { Publication } from "@content/publications";
import { ChA } from "../primitives";
import { PublicationCover } from "./PublicationCover";
import { pagesLabel, sizeLabel } from "./meta";

/**
 * Publication card (Figma "Publication"): a 150px cover beside its kicker,
 * title, line and facts. The whole card is the link; the cover lifts and
 * the arrow steps on hover. `roomy` is the wider card under a publication
 * (19px title, 14px line).
 */
export function PublicationCard({ pub, headingLevel = "h3", roomy }: { pub: Publication; headingLevel?: "h2" | "h3" | "h4"; roomy?: boolean }) {
  const facts = [pagesLabel(pub), sizeLabel(pub)].filter(Boolean).join(" · ");
  return (
    <ChA
      asChild
      display="grid"
      gridTemplateColumns={{ base: "112px 1fr", sm: "150px 1fr" }}
      gap="20px"
      alignItems="center"
      h="100%"
      ps="16px"
      pe="18px"
      py="18px"
      borderRadius="10px"
      bg="bg.canvas"
      borderWidth="1px"
      borderColor="border"
      textDecoration="none"
      color="fg"
      transition="border-color 150ms ease"
      _active={{ transform: "scale(0.99)" }}
      css={{
        "& .cover, & .arrow": { transition: "transform 200ms cubic-bezier(0.23, 1, 0.32, 1)" },
        "@media (hover: hover) and (pointer: fine)": {
          "&:hover": { borderColor: "var(--chakra-colors-border-strong)" },
          "&:hover .cover": { transform: "translateY(-3px)" },
          "&:hover .arrow": { transform: "translateX(3px)" },
          "&:hover .read-more": { textDecoration: "underline" },
        },
        "@media (prefers-reduced-motion: reduce)": { "&:hover .cover, &:hover .arrow": { transform: "none" } },
      }}
    >
      <NextLink href={`/publications/${pub.slug}`}>
        <Box className="cover">
          <PublicationCover pub={pub} size="sm" design="flat" />
        </Box>
        <Stack gap="8px" minW="0">
          <Text fontSize="0.6875rem" fontWeight="600" letterSpacing="0.06em" textTransform="uppercase" color="brand.fg" lineHeight="normal">
            {pub.category} · {pub.year}
          </Text>
          <Heading as={headingLevel} fontFamily="heading" fontWeight="600" fontSize={roomy ? "1.1875rem" : "1.0625rem"} lineHeight="1.25">
            {pub.title}
          </Heading>
          <Text color="fg.muted" fontSize={roomy ? "0.875rem" : "0.8125rem"} lineHeight="1.55" lineClamp={3}>
            {pub.description}
          </Text>
          <HStack columnGap="14px" rowGap="6px" pt="2px" flexWrap="wrap" lineHeight="normal">
            <HStack className="read-more" gap="5px" fontSize="0.8125rem" fontWeight="500" color="brand.fg" whiteSpace="nowrap">
              <span>Read more</span>
              <Box as="span" className="arrow" display="inline-flex">
                <ArrowRight size={12} aria-hidden="true" />
              </Box>
            </HStack>
            {facts && (
              <Text as="span" fontSize="0.75rem" color="fg.muted" whiteSpace="nowrap">
                {facts}
              </Text>
            )}
          </HStack>
        </Stack>
      </NextLink>
    </ChA>
  );
}
