import { Box } from "@chakra-ui/react";

/** A hand-drawn gold underline under one phrase (used once, on the mission). */
export function Squiggle({ children }: { children: React.ReactNode }) {
  return (
    <Box as="span" position="relative" display="inline-block" whiteSpace="nowrap">
      {children}
      <Box
        as="span"
        aria-hidden="true"
        data-draw
        position="absolute"
        left="-2%"
        right="-2%"
        bottom="-0.18em"
        height="0.32em"
        color="accent.highlight"
        css={{ "& svg": { width: "100%", height: "100%", display: "block" } }}
      >
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" fill="none">
          <path d="M3 14 C 40 4, 70 18, 105 9 S 165 4, 197 11" stroke="currentColor" strokeWidth="5" strokeLinecap="round" pathLength={1} />
        </svg>
      </Box>
    </Box>
  );
}
