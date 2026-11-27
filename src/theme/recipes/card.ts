import { defineSlotRecipe } from "@chakra-ui/react";

/** One card family; variants: ministry, event, resource, group, sermon. */
export const contentCardRecipe = defineSlotRecipe({
  className: "nc-card",
  slots: ["root", "media", "body", "eyebrow", "title", "description", "meta", "chips", "footer", "dateBlock"],
  base: {
    root: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      bg: "bg.canvas",
      color: "fg",
      borderWidth: "1px",
      borderColor: "border",
      borderRadius: "lg",
      overflow: "hidden",
      height: "100%",
      transition: "box-shadow 200ms ease, border-color 200ms ease, transform 200ms cubic-bezier(0.23, 1, 0.32, 1)",
      // A linked card lifts 2px and its photo zooms inside the frame (real pointers only)
      "@media (hover: hover) and (pointer: fine)": {
        "&:hover": { boxShadow: "card", borderColor: "border.strong", transform: "translateY(-2px)" },
        "&:hover img": { transform: "scale(1.03)" },
      },
      "&:focus-within img": { transform: "scale(1.03)" },
    },
    media: {
      position: "relative",
      aspectRatio: "16 / 10",
      bg: "bg.tint",
      overflow: "hidden",
      flexShrink: 0,
      "& img": { objectFit: "cover", width: "100%", height: "100%", transition: "transform 300ms cubic-bezier(0.23, 1, 0.32, 1)" },
    },
    body: { display: "flex", flexDirection: "column", gap: "3", p: { base: "5", md: "6" }, flex: "1" },
    eyebrow: { textStyle: "eyebrow", color: "brand.fg" },
    title: {
      textStyle: "h4",
      color: "fg",
      "& a": {
        textDecoration: "none",
        color: "inherit",
        _hover: { textDecoration: "underline", textUnderlineOffset: "0.2em" },
      },
    },
    description: { textStyle: "body", color: "fg.muted" },
    meta: {
      display: "grid",
      gap: "1.5",
      textStyle: "small",
      color: "fg.muted",
      listStyle: "none",
      m: "0",
      p: "0",
      "& svg": { width: "16px", height: "16px", color: "brand.fg", flexShrink: 0, mt: "2px" },
      "& > *": { display: "flex", alignItems: "flex-start", gap: "2" },
    },
    chips: { display: "flex", flexWrap: "wrap", gap: "2", listStyle: "none", m: "0", p: "0" },
    footer: {
      mt: "auto",
      pt: "2",
      display: "flex",
      flexWrap: "wrap",
      gap: "3",
      alignItems: "center",
    },
    dateBlock: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      minW: "68px",
      px: "3",
      py: "2",
      borderRadius: "md",
      bg: "brand.subtle",
      color: "brand.fg",
      lineHeight: "1.1",
      fontWeight: "700",
      textAlign: "center",
    },
  },
  variants: {
    variant: {
      ministry: {},
      event: {
        body: { flexDirection: { base: "column", sm: "row" }, alignItems: "flex-start", gap: { base: "4", sm: "5" } },
      },
      resource: {
        media: { aspectRatio: "4 / 3" },
        body: { gap: "2" },
      },
      group: {
        root: { borderTopWidth: "4px", borderTopColor: "brand.solid" },
      },
      /** Borderless image-first tile (the homepage scrolling row). */
      tile: {
        root: {
          borderWidth: "0",
          bg: "transparent",
          borderRadius: "0",
          overflow: "visible",
          "@media (hover: hover) and (pointer: fine)": { "&:hover": { boxShadow: "none" } },
          // the title link covers the whole tile; its focus ring moves to the tile
          "&:has(a:focus-visible)": { outline: "3px solid", outlineColor: "brand.solid", outlineOffset: "4px", borderRadius: "md" },
        },
        media: { aspectRatio: "4 / 3", borderRadius: "4px" },
        body: { p: "0", pt: "4", gap: "1" },
        eyebrow: { fontSize: "0.75rem", fontWeight: "500", textTransform: "none", letterSpacing: "0" },
        title: {
          fontFamily: "heading",
          fontWeight: "600",
          fontSize: "1.25rem",
          lineHeight: "normal",
          "& a::after": { content: '""', position: "absolute", inset: "0" },
          "& a:focus-visible": { outline: "none" },
        },
        description: { fontFamily: "body", fontSize: "1rem", lineHeight: "1.45" },
      },
      sermon: {
        media: { aspectRatio: "16 / 9" },
        body: { gap: "2" },
      },
    },
  },
  defaultVariants: { variant: "ministry" },
});
