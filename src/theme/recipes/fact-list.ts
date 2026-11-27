import { defineSlotRecipe } from "@chakra-ui/react";

/** Icon + label + value rows: "When / Where / Who / Contact". */
export const factListRecipe = defineSlotRecipe({
  className: "nc-fact-list",
  slots: ["root", "item", "icon", "label", "value"],
  base: {
    root: { display: "grid", gap: "5", listStyle: "none", m: "0", p: "0" },
    item: { display: "grid", gridTemplateColumns: "auto 1fr", columnGap: "3", rowGap: "1", alignItems: "start" },
    icon: {
      display: "inline-flex",
      color: "brand.fg",
      gridRow: "span 2",
      "& svg": { width: "18px", height: "18px" },
    },
    label: { fontFamily: "body", fontSize: "0.6875rem", fontWeight: "500", lineHeight: "normal", letterSpacing: "0.08em", textTransform: "uppercase", color: "fg.muted" },
    value: {
      fontFamily: "body",
      fontSize: "0.9375rem",
      lineHeight: "normal",
      color: "fg",
      // standalone links get a 44px tap target
      "& a": { color: "brand.fg", textDecoration: "underline", textUnderlineOffset: "0.2em", display: "inline-flex", alignItems: "center", minH: "24px" },
    },
  },
  variants: {
    layout: {
      stack: {},
      grid: { root: { gridTemplateColumns: { base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }, gap: "6" } },
      // Figma "Info row": three items side by side, 64px apart, in a 1000px row
      inline: { root: { gridTemplateColumns: { base: "1fr", md: "repeat(3, auto)" }, justifyContent: { md: "start" }, columnGap: "64px", rowGap: "5", maxW: "1000px", mx: "auto" } },
    },
    tone: {
      light: {},
      dark: {
        icon: { color: "accent.highlight" },
        label: { color: "fg.invertedMuted" },
        value: { color: "fg.inverted", "& a": { color: "fg.inverted" } },
      },
    },
  },
  defaultVariants: { layout: "stack", tone: "light" },
});
