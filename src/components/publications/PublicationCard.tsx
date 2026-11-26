import NextLink from "next/link";
import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import type { Publication } from "@content/publications";
import { ChA } from "../primitives";
import { PublicationCover } from "./PublicationCover";
import { pagesLabel, sizeLabel } from "./meta";

/**
 * Publication card: a book-like cover beside its title, line and facts.
 * The whole card is the link; the cover lifts 2px and the arrow steps on hover.
 */
export function PublicationCard({ pub, headingLevel = "h3" }: { pub: Publication; headingLevel?: "h2" | "h3" | "h4" }) {
  const facts = [pagesLabel(pub), sizeLabel(pub)].filter(Boolean).join(" · ");
  return (
    <ChA
      asChild
      display="grid"
      gridTemplateColumns={{ base: "112px 1fr", md: "144px 1fr" }}
      gap={{ base: "5", md: "6" }}
      alignItems="center"
      h="100%"
      p={{ base: "4", md: "5" }}
      borderRadius="lg"
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
        },
        "@media (prefers-reduced-motion: reduce)": { "&:hover .cover, &:hover .arrow": { transform: "none" } },
      }}
    >
      <NextLink href={`/publications/${pub.slug}`}>
        <Box className="cover">
          <PublicationCover pub={pub} size="sm" />
        </Box>
        <Stack gap="2" minW="0">
          <Text fontSize="0.8125rem" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" color="brand.fg">
            {pub.category} · {pub.year}
          </Text>
          <Heading as={headingLevel} fontFamily="heading" fontWeight="650" fontSize={{ base: "1.125rem", md: "1.25rem" }} lineHeight="1.25">
            {pub.title}
          </Heading>
          <Text color="fg.muted" fontSize="0.9375rem" lineClamp={3}>
            {pub.description}
          </Text>
          <HStack columnGap="4" rowGap="1" pt="1" fontSize="0.875rem" flexWrap="wrap">
            <HStack gap="1.5" fontWeight="600" color="brand.fg" whiteSpace="nowrap">
              <span>Read more</span>
              <Box as="span" className="arrow" display="inline-flex">
                <ArrowRight size={16} aria-hidden="true" />
              </Box>
            </HStack>
            {facts && (
              <Text as="span" color="fg.muted" whiteSpace="nowrap">
                {facts}
              </Text>
            )}
          </HStack>
        </Stack>
      </NextLink>
    </ChA>
  );
}
