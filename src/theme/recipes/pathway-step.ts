import { defineSlotRecipe } from "@chakra-ui/react";

/** Numbered steps: vertical on mobile, horizontal on desktop. */
export const pathwayStepRecipe = defineSlotRecipe({
  className: "nc-pathway",
  slots: ["root", "step", "number", "content", "title", "body", "meta"],
  base: {
    root: { listStyle: "none", m: "0", p: "0", display: "grid", gap: { base: "8", lg: "6" } },
    step: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: { base: "auto 1fr", lg: "1fr" },
      gap: "4",
      alignItems: "start",
    },
    // A small diamond, echoing the logo mark (the steps are a real sequence)
    number: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      w: "10",
      h: "10",
      m: "2",
      borderRadius: "4px",
      transform: "rotate(45deg)",
      bg: "brand.solid",
      color: "brand.contrast",
      fontFamily: "heading",
      fontWeight: "700",
      fontSize: "1.125rem",
      position: "relative",
      zIndex: "1",
      "& > span": { transform: "rotate(-45deg)" },
      "li:last-child > &": { bg: "accent.highlight", color: "accent.contrast" },
    },
    content: { display: "grid", gap: "2", alignContent: "start" },
    title: { textStyle: "h4", color: "fg" },
    body: { textStyle: "body", color: "fg.muted" },
    meta: { textStyle: "small", color: "fg.muted", fontWeight: "600" },
  },
  variants: {
    columns: {
      "3": { root: { gridTemplateColumns: { base: "1fr", lg: "repeat(3, 1fr)" } } },
      "4": { root: { gridTemplateColumns: { base: "1fr", lg: "repeat(4, 1fr)" } } },
      "5": { root: { gridTemplateColumns: { base: "1fr", lg: "repeat(5, 1fr)" } } },
    },
    connector: {
      true: {
        step: {
          _after: {
            content: '""',
            position: "absolute",
            bg: "brand.muted",
            left: { base: "27px", lg: "64px" },
            top: { base: "64px", lg: "27px" },
            width: { base: "2px", lg: "calc(100% - 72px + 24px)" },
            height: { base: "calc(100% - 72px + 32px)", lg: "2px" },
          },
          _last: { _after: { display: "none" } },
        },
      },
      false: {},
    },
  },
  defaultVariants: { columns: "3", connector: true },
});
