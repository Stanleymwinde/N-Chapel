import { defineSlotRecipe } from "@chakra-ui/react";

/** Chips + selects + search, with a live result count. */
export const filterBarRecipe = defineSlotRecipe({
  className: "nc-filter-bar",
  slots: ["root", "controls", "chips", "chip", "count"],
  base: {
    root: {
      display: "grid",
      gap: "4",
      p: { base: "4", md: "5" },
      borderRadius: "lg",
      bg: "bg.warm",
      borderWidth: "1px",
      borderColor: "border",
    },
    controls: {
      display: "grid",
      gap: "4",
      gridTemplateColumns: { base: "1fr", md: "repeat(auto-fit, minmax(180px, 1fr))" },
      alignItems: "end",
    },
    chips: { display: "flex", flexWrap: "wrap", gap: "2", listStyle: "none", m: "0", p: "0" },
    chip: {
      display: "inline-flex",
      alignItems: "center",
      minH: "44px",
      px: "4",
      borderRadius: "full",
      borderWidth: "1px",
      borderColor: "border.strong",
      bg: "bg.canvas",
      color: "fg",
      fontWeight: "500",
      fontSize: "0.9375rem",
      cursor: "pointer",
      transition: "background-color 150ms ease-out, border-color 150ms ease-out",
      _hover: { borderColor: "brand.solid" },
      "&[aria-pressed=true]": { bg: "brand.solid", color: "brand.contrast", borderColor: "brand.solid" },
    },
    count: { textStyle: "small", color: "fg.muted", fontWeight: "500" },
  },
});
