import { Box } from "@chakra-ui/react";
import { Img } from "../Img";

/**
 * Giant statement set over a full-bleed photo. Each line is drawn as SVG
 * text fitted to the full width of the screen (textLength), so the whole
 * phrase is always visible edge to edge at any size. As the band scrolls
 * past, its lines glide gently in opposite directions (motion.css, CSS only).
 */
export function StatementBand({ lines, image }: { lines: readonly string[]; image: string }) {
  const lineHeight = 124;
  const height = lines.length * lineHeight + 8;
  return (
    <Box as="section" id="statement" aria-label={lines.join(" ")} position="relative" bg="night.900" overflow="hidden" py={{ base: "16", md: "28" }}>
      <Box position="absolute" inset="0" aria-hidden="true">
        <Img slot={image} decorative sizes="100vw" />
      </Box>
      <Box position="absolute" inset="0" bg="rgba(22, 18, 31, 0.55)" aria-hidden="true" />
      <Box position="relative" px={{ base: "3", md: "6" }} aria-hidden="true">
        <svg data-drift viewBox={`0 0 1000 ${height}`} width="100%" role="presentation" style={{ display: "block", overflow: "visible" }}>
          {lines.map((line, i) => (
            <text
              key={line}
              x="0"
              y={(i + 1) * lineHeight - 22}
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fill="#FFFFFF"
              style={{
                fontFamily: "var(--font-heading), Futura, 'Century Gothic', sans-serif",
                fontWeight: 700,
                fontSize: "108px",
                textTransform: "uppercase",
              }}
            >
              {line}
            </text>
          ))}
        </svg>
      </Box>
    </Box>
  );
}
