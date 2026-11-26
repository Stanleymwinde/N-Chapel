import { defineRecipe } from "@chakra-ui/react";

/**
 * The single button system: primary, secondary, link, plus inverse
 * versions for dark bands. Labels must be verbs ("Plan your visit").
 */
export const buttonRecipe = defineRecipe({
  className: "nc-button",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    fontFamily: "body",
    fontWeight: "600",
    borderRadius: "full",
    borderWidth: "2px",
    borderColor: "transparent",
    whiteSpace: "nowrap",
    textDecoration: "none",
    cursor: "pointer",
    userSelect: "none",
    transitionProperty: "background-color, color, border-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
    // Hover step only on real pointers (touch taps fire hover); press always answers
    "@media (hover: hover) and (pointer: fine)": { "&:hover": { transform: "translateY(-1px)" } },
    _active: { transform: "scale(0.97)" },
    _disabled: { opacity: 0.55, cursor: "not-allowed", transform: "none" },
    "& svg": { flexShrink: 0, width: "1.1em", height: "1.1em" },
  },
  variants: {
    variant: {
      primary: {
        bg: "brand.solid",
        color: "brand.contrast",
        _hover: { bg: "brand.hover" },
        _active: { bg: "purple.800" },
      },
      secondary: {
        bg: "transparent",
        color: "brand.fg",
        borderColor: "brand.solid",
        _hover: { bg: "brand.subtle" },
      },
      link: {
        bg: "transparent",
        color: "brand.fg",
        borderRadius: "sm",
        paddingInline: "0 !important",
        textDecoration: "underline",
        textDecorationThickness: "1px",
        textUnderlineOffset: "0.25em",
        "& svg": { transition: "transform 200ms ease-out" },
        "@media (hover: hover) and (pointer: fine)": { "&:hover": { transform: "none" } },
        _hover: { textDecorationThickness: "2px", "& svg": { transform: "translateX(3px)" } },
        _active: { transform: "none" },
      },
      // Gold, for dark photo panels (ink text on gold passes AA)
      accent: {
        bg: "accent.highlight",
        color: "ink.900",
        _hover: { bg: "gold.300" },
        _active: { bg: "gold.600", color: "ink.900" },
      },
      inverse: {
        bg: "paper.white",
        color: "purple.800",
        _hover: { bg: "purple.50" },
      },
      inverseOutline: {
        bg: "transparent",
        color: "fg.inverted",
        borderColor: "paper.white",
        _hover: { bg: "whiteAlpha.200" },
      },
    },
    size: {
      md: { minH: "44px", minW: "44px", px: "5", fontSize: "1rem" },
      lg: { minH: "52px", minW: "52px", px: "7", fontSize: "1.0625rem" },
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});
