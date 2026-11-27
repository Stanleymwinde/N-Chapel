import NextLink from "next/link";
import { Image } from "@chakra-ui/react";
import { ChA } from "@/components/primitives";

/**
 * Small four-colour diamond mark, drawn in SVG (used by the About page badge).
 * The full logo below uses the official artwork in public/media/brand/.
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

/** Official Nairobi Chapel Ngong Road logo (from the Figma file), used in the navbar. */
export function Logo({ href = "/" }: { href?: string }) {
  return (
    <ChA asChild display="inline-flex" alignItems="center" flexShrink={0} textDecoration="none" minH="44px" borderRadius="sm">
      <NextLink href={href} aria-label="Nairobi Chapel Ngong Road, home">
        {/* 158.9 × 48 in Figma; width follows the SVG's own proportions */}
        <Image src="/media/brand/logo.svg" alt="" h={{ base: "40px", lg: "48px" }} w="auto" />
      </NextLink>
    </ChA>
  );
}
