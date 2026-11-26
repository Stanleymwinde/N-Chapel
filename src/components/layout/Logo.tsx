import NextLink from "next/link";
import { Box, Text } from "@chakra-ui/react";
import { ChA } from "@/components/primitives";

/**
 * Temporary logo: the four-colour diamond mark + wordmark, drawn in SVG.
 * TODO: replace with the official artwork in public/brand/ (a version for
 * light backgrounds and one for dark backgrounds). See CONTENT-TODO.md.
 */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <g transform="rotate(45 20 20)">
        <rect x="6" y="6" width="13.4" height="13.4" fill="#5B2A9E" />
        <rect x="20.6" y="6" width="13.4" height="13.4" fill="#16121F" />
        <rect x="6" y="20.6" width="13.4" height="13.4" fill="#8C8794" />
        <rect x="20.6" y="20.6" width="13.4" height="13.4" fill="#F5C518" />
      </g>
    </svg>
  );
}

export function Logo({ tone = "dark", href = "/" }: { tone?: "dark" | "light"; href?: string }) {
  const color = tone === "dark" ? "fg" : "fg.inverted";
  return (
    <ChA
      asChild
      display="inline-flex"
      alignItems="center"
      gap="3"
      textDecoration="none"
      color={color}
      minH="44px"
      borderRadius="sm"
    >
      <NextLink href={href} aria-label="Nairobi Chapel Ngong Road, home">
        <LogoMark />
        <Box lineHeight="1" aria-hidden="true" whiteSpace="nowrap">
          <Text as="span" display="block" fontFamily="heading" fontWeight="700" fontSize="1.2rem" letterSpacing="-0.01em">
            Nairobi Chapel
          </Text>
          <Text as="span" display="block" fontSize="0.78rem" fontWeight="600" mt="1" color={tone === "dark" ? "fg.muted" : "fg.invertedMuted"}>
            Ngong Road
          </Text>
        </Box>
      </NextLink>
    </ChA>
  );
}
