import { defineTextStyles } from "@chakra-ui/react";

const heading = {
  fontFamily: "heading",
  fontWeight: "600",
  lineHeight: "1.15",
  letterSpacing: "-0.005em",
  textWrap: "balance",
} as const;

/** Fluid type scale: mobile → desktop values from the brief. */
export const textStyles = defineTextStyles({
  h1: { value: { ...heading, fontWeight: "700", fontSize: "clamp(2.25rem, 1.65rem + 2.6vw, 3.5rem)" } },
  // Figma: section headings 40px, -1% tracking
  h2: { value: { ...heading, fontSize: "clamp(1.875rem, 1.45rem + 1.4vw, 2.5rem)", lineHeight: "1.15", letterSpacing: "-0.01em" } },
  h3: { value: { ...heading, fontSize: "clamp(1.375rem, 1.2rem + 0.75vw, 1.75rem)", lineHeight: "1.2" } },
  h4: { value: { ...heading, fontSize: "1.25rem" } },
  // Figma: section intros 20px / 1.5
  lead: { value: { fontFamily: "body", fontSize: "clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)", lineHeight: "1.5" } },
  body: { value: { fontFamily: "body", fontSize: "clamp(1.0625rem, 1.04rem + 0.1vw, 1.125rem)", lineHeight: "1.6" } },
  small: { value: { fontFamily: "body", fontSize: "0.875rem", lineHeight: "1.5" } },
  eyebrow: {
    value: {
      fontFamily: "body",
      fontSize: "0.8125rem",
      fontWeight: "600",
      lineHeight: "1.4",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
  },
  label: { value: { fontFamily: "body", fontSize: "0.9375rem", fontWeight: "600", lineHeight: "1.4" } },
});
