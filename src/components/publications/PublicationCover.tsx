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
export function PublicationCover({ pub, size = "md", priority, design = "book" }: {
  pub: Publication;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  /** "flat": the Figma publication cover (photo, dark wash, rule, title, accent bar; no spine or mark) */
  design?: "book" | "flat";
}) {
  if (design === "flat") return <FlatCover pub={pub} size={size === "sm" ? "sm" : "lg"} priority={priority} />;
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
      data-tilt=""
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

/**
 * Figma "Cover": a photo under a dark wash, the kicker at the top, a short
 * rule and the title at the foot, and an accent bar along the bottom edge.
 * sm = 150 × 165 (cards), lg = 414 × 444 (publication page). Used by the
 * publication cards and pages; the Enzi page keeps the "book" design.
 */
function FlatCover({ pub, size, priority }: { pub: Publication; size: "sm" | "lg"; priority?: boolean }) {
  const hasCover = pub.coverImage && pub.coverImage !== "TODO";
  const t = tones[pub.category];
  const sm = size === "sm";
  const photo = hasCover ? pub.coverImage : pub.photo;
  return (
    <ViewTransition name={`pub-${pub.slug}`} share="morph" default="none">
      <Box
        position="relative"
        aspectRatio={sm ? "150 / 165" : "414 / 444"}
        borderRadius={sm ? "4px" : "12px"}
        overflow="hidden"
        bg="night.700"
        boxShadow={sm ? "0 6px 14px rgba(28,23,38,0.18)" : "0 12px 28px rgba(28,23,38,0.22)"}
        data-tilt=""
        aria-hidden="true"
      >
        {photo && <Img slot={photo} priority={priority} decorative sizes={sm ? "150px" : "(min-width: 768px) 414px, 90vw"} />}
        {!hasCover && (
          <>
            <Box position="absolute" inset="0" bgGradient="to-b" gradientFrom={sm ? "rgba(20,15,26,0.55)" : "rgba(20,15,26,0.6)"} gradientVia={sm ? "rgba(20,15,26,0.55)" : "rgba(20,15,26,0.5)"} gradientTo="rgba(20,15,26,0.85)" />
            <Box
              position="absolute"
              inset="0"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              ps={sm ? "16px" : "28px"}
              pe={sm ? "14px" : "24px"}
              py={sm ? "16px" : "28px"}
              color="white"
            >
              <Text fontSize={sm ? "0.5rem" : "0.6875rem"} lineHeight={sm ? "1.5" : "normal"} fontWeight="600" letterSpacing={sm ? "0.06em" : "0.08em"} textTransform="uppercase" maxW={sm ? "95px" : undefined}>
                {pub.category} · {pub.year}
              </Text>
              <Box display="flex" flexDirection="column" gap={sm ? "8px" : "14px"}>
                <Box w={sm ? "22px" : "32px"} h={sm ? "2px" : "3px"} bg={sm ? "accent.highlight" : t.rule} />
                <Text fontFamily="heading" fontWeight="700" fontSize={sm ? "0.75rem" : { base: "1.5rem", md: "1.6875rem" }} lineHeight={sm ? "1.15" : "1.12"} maxW={sm ? "95px" : "250px"} lineClamp={sm ? 4 : 5}>
                  {pub.title}
                </Text>
              </Box>
            </Box>
          </>
        )}
        {pub.category !== "Strategy" && <Box position="absolute" left="0" right="0" bottom="0" h={sm ? "3px" : "5px"} bg={t.bg} />}
      </Box>
    </ViewTransition>
  );
}
