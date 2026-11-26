import { Box } from "@chakra-ui/react";
import { LogoMark } from "../layout/Logo";

/**
 * A round text badge (text set on a circle around the logo mark). Static on
 * purpose: no spinning loop. Decorative; the words repeat the mission line.
 */
export function RoundBadge({ text, size = 132 }: { text: string; size?: number }) {
  const id = "round-badge-path";
  return (
    <Box
      aria-hidden="true"
      position="relative"
      w={`${size}px`}
      h={`${size}px`}
      borderRadius="full"
      bg="bg.canvas"
      boxShadow="card"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <svg viewBox="0 0 120 120" width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text
          fill="#16121F"
          style={{
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: "9.2px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <textPath href={`#${id}`} startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
      <LogoMark size={40} />
    </Box>
  );
}
