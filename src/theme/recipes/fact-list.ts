import { defineSlotRecipe } from "@chakra-ui/react";

/** Icon + label + value rows: "When / Where / Who / Contact". */
export const factListRecipe = defineSlotRecipe({
  className: "nc-fact-list",
  slots: ["root", "item", "icon", "label", "value"],
  base: {
    root: { display: "grid", gap: "5", listStyle: "none", m: "0", p: "0" },
    item: { display: "grid", gridTemplateColumns: "auto 1fr", columnGap: "3", rowGap: "0.5", alignItems: "start" },
    icon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      w: "10",
      h: "10",
      borderRadius: "full",
      bg: "brand.subtle",
      color: "brand.fg",
      gridRow: "span 2",
      "& svg": { width: "20px", height: "20px" },
    },
    label: { textStyle: "eyebrow", color: "fg.muted", alignSelf: "end" },
    value: {
      textStyle: "body",
      color: "fg",
      // standalone links get a 44px tap target
      "& a": { color: "brand.fg", textDecoration: "underline", textUnderlineOffset: "0.2em", display: "inline-flex", alignItems: "center", minH: "44px" },
    },
  },
  variants: {
    layout: {
      stack: {},
      grid: { root: { gridTemplateColumns: { base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }, gap: "6" } },
      inline: { root: { gridTemplateColumns: { base: "1fr", md: "repeat(3, 1fr)" }, gap: "6" } },
    },
    tone: {
      light: {},
      dark: {
        icon: { bg: "whiteAlpha.200", color: "accent.highlight" },
        label: { color: "fg.invertedMuted" },
        value: { color: "fg.inverted", "& a": { color: "fg.inverted" } },
      },
    },
  },
  defaultVariants: { layout: "stack", tone: "light" },
});
