import { ViewTransition } from "react";
import { Box, Text } from "@chakra-ui/react";
import type { Publication, PublicationCategory } from "@content/publications";
import { Img } from "../Img";

/** Each category gets its own cover tone, so the shelf reads at a glance. */
const tones: Record<PublicationCategory, { bg: string; fg: string; rule: string; kicker: string }> = {
  "Annual Report": { bg: "brand.solid", fg: "white", rule: "accent.highlight", kicker: "rgba(255,255,255,0.8)" },
  Strategy: { bg: "night.900", fg: "white", rule: "accent.highlight", kicker: "rgba(255,255,255,0.75)" },
  Leadership: { bg: "brand.solid", fg: "white", rule: "white", kicker: "rgba(255,255,255,0.8)" },
  Ministry: { bg: "accent.highlight", fg: "ink.900", rule: "brand.solid", kicker: "rgba(20,16,30,0.7)" },
};

/** The four-quadrant mark from the logo, drawn small as a printer's device. */
function Mark({ color }: { color: string }) {
  return (
    <Box as="span" display="inline-flex" color={color} aria-hidden="true" flexShrink="0">
      <svg viewBox="0 0 20 20" width="18" height="18">
      <path d="M10 0 20 10 10 20 0 10Z" fill="currentColor" opacity="0.35" />
      <path d="M10 0 20 10H10Z" fill="currentColor" />
      <path d="M0 10H10V20Z" fill="currentColor" opacity="0.7" />
    </svg>
    </Box>
  );
}

/**
 * A publication's cover. Until a real cover exists (coverImage "TODO") it
 * draws a book-like typographic cover: a spine shadow on the left, category
 * and year at the top, the title, and the church's mark at the foot.
 */
export function PublicationCover({ pub, size = "md", priority }: { pub: Publication; size?: "sm" | "md" | "lg"; priority?: boolean }) {
  const hasCover = pub.coverImage && pub.coverImage !== "TODO";
  const t = tones[pub.category];
  // On a photo, text is always white; the category tone survives as the rule and the foot band.
  const fg = pub.photo ? "white" : t.fg;
  const kickerColor = pub.photo ? "rgba(255,255,255,0.85)" : t.kicker;
  const pad = size === "lg" ? { base: "6", md: "8" } : size === "sm" ? "4" : "6";
  // Long titles step down a size, so a word is never split across lines
  const long = pub.title.length > 32;
  const titleSize =
    size === "lg"
      ? long
        ? "clamp(1.5rem, 1.2rem + 1vw, 2rem)"
        : "clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem)"
      : size === "sm"
        ? long
          ? "0.875rem"
          : "1rem"
        : long
          ? "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)"
          : "clamp(1.375rem, 1.1rem + 0.8vw, 1.75rem)";
  return (
    // The same cover on the card and the publication page: it travels between them on navigation
    <ViewTransition name={`pub-${pub.slug}`} share="morph" default="none">
    <Box
      position="relative"
      aspectRatio="3 / 4"
      borderRadius={size === "sm" ? "md" : "lg"}
      overflow="hidden"
      bg={t.bg}
      boxShadow="0 1px 2px rgba(20,16,30,0.08), 0 12px 28px -12px rgba(20,16,30,0.35)"
      aria-hidden="true"
      borderBottomWidth={pub.photo ? (size === "sm" ? "4px" : "6px") : undefined}
      borderBottomColor={t.bg}
    >
      {hasCover ? (
        <Img slot={pub.coverImage} priority={priority} decorative sizes={size === "lg" ? "(min-width: 768px) 420px, 100vw" : "240px"} />
      ) : (
        <>
        {pub.photo && (
          <>
            <Img slot={pub.photo} priority={priority} decorative sizes={size === "lg" ? "(min-width: 768px) 320px, 70vw" : "160px"} />
            <Box position="absolute" inset="0" bgGradient="to-t" gradientFrom="rgba(15,10,26,0.9)" gradientVia="rgba(15,10,26,0.35)" gradientTo="rgba(15,10,26,0.55)" />
          </>
        )}
        <Box position="absolute" inset="0" display="flex" flexDirection="column" justifyContent="space-between" p={pad} ps={size === "sm" ? "5" : "8"} color={fg}>
          <Text fontSize={size === "sm" ? "0.625rem" : "0.75rem"} fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color={kickerColor}>
            {pub.category} · {pub.year}
          </Text>
          <Box>
            <Box w="8" h="3px" bg={t.rule} mb={size === "sm" ? "2" : "4"} borderRadius="full" />
            <Text fontFamily="heading" fontWeight="700" fontSize={titleSize} lineHeight="1.08" letterSpacing="-0.01em" wordBreak="normal" overflowWrap="normal" hyphens="manual" textWrap="balance" lineClamp={size === "sm" ? 5 : 6}>
              {pub.title}
            </Text>
          </Box>
          <Mark color={fg} />
        </Box>
        </>
      )}
      {/* spine: a soft fold and highlight down the left edge */}
      <Box
        position="absolute"
        insetY="0"
        left="0"
        w={size === "sm" ? "10px" : "16px"}
        bgGradient="to-r"
        gradientFrom="rgba(0,0,0,0.28)"
        gradientVia="rgba(255,255,255,0.12)"
        gradientTo="transparent"
        pointerEvents="none"
      />
    </Box>
    </ViewTransition>
  );
}
