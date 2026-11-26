import { Box } from "@chakra-ui/react";

/**
 * A word ringed by a hand-drawn gold loop, the way a pen circles a word on
 * paper. The loop overshoots where it closes, so it reads as drawn, not drawn
 * by a computer. It draws itself on when the page loads (motion.css).
 * Purely decorative.
 */
export function Circled({ children }: { children: React.ReactNode }) {
  return (
    <Box as="span" position="relative" display="inline-block" px="0.35em" whiteSpace="nowrap">
      <Box
        as="span"
        aria-hidden="true"
        data-draw
        position="absolute"
        left="-0.32em"
        right="-0.32em"
        top="-0.16em"
        bottom="-0.2em"
        color="accent.highlight"
        pointerEvents="none"
        zIndex="0"
        css={{ "& svg": { width: "100%", height: "100%", display: "block", overflow: "visible" } }}
      >
        <svg viewBox="0 0 400 120" preserveAspectRatio="none" fill="none">
          <path
            d="M232 10 C 330 8, 396 30, 394 60 C 392 94, 300 114, 196 112 C 92 110, 6 92, 8 60 C 10 28, 96 10, 190 9 C 230 8, 268 11, 300 18"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            // pathLength=1 lets the CSS draw-on use dasharray 1 at any size
            pathLength={1}
          />
        </svg>
      </Box>
      <Box as="span" position="relative" zIndex="1">
        {children}
      </Box>
    </Box>
  );
}

/**
 * "Learn more" with a small ringed chevron, as on the reference site. Render it
 * inside a link (it is a span); the ring fills gold when the link is hovered.
 */
export function LearnMore({ label = "Learn more" }: { label?: string }) {
  return (
    <Box as="span" className="learn-more" display="inline-flex" alignItems="center" gap="2.5" fontSize="0.9375rem" fontWeight="700" color="fg">
      {label}
      <Box
        as="span"
        className="ring"
        aria-hidden="true"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        w="7"
        h="7"
        borderRadius="full"
        borderWidth="1.5px"
        borderColor="ink.300"
        transition="background-color 150ms ease, border-color 150ms ease, transform 200ms cubic-bezier(0.23, 1, 0.32, 1)"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </Box>
    </Box>
  );
}

/** Hover rules for any link that contains a LearnMore (mouse only). */
export const learnMoreHover = {
  "@media (hover: hover) and (pointer: fine)": {
    "&:hover .learn-more .ring": {
      backgroundColor: "var(--chakra-colors-accent-highlight)",
      borderColor: "var(--chakra-colors-accent-highlight)",
      transform: "translateX(3px)",
    },
  },
} as const;
