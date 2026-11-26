import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { tokens, semanticTokens } from "./tokens";
import { textStyles } from "./text-styles";
import { buttonRecipe } from "./recipes/button";
import { contentCardRecipe } from "./recipes/card";
import { factListRecipe } from "./recipes/fact-list";
import { filterBarRecipe } from "./recipes/filter-bar";
import { pathwayStepRecipe } from "./recipes/pathway-step";

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: "purple",
      scrollBehavior: "smooth",
      scrollPaddingTop: "160px",
      colorScheme: "light",
      _motionReduce: { scrollBehavior: "auto" },
    },
    body: {
      bg: "bg.canvas",
      color: "fg",
      fontFamily: "body",
      fontSize: "clamp(1.0625rem, 1.04rem + 0.1vw, 1.125rem)",
      lineHeight: "1.6",
      overflowX: "clip",
    },
    ":where(a, button, input, select, textarea, summary, [tabindex]):focus-visible": {
      outline: "3px solid",
      outlineColor: "brand.solid",
      outlineOffset: "2px",
    },
    "::selection": { bg: "purple.200", color: "ink.900" },
    ".sr-only": {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      border: "0",
    },
    "body[data-menu-open] [data-whatsapp-fab]": { display: "none" },
    "*, *::before, *::after": {
      _motionReduce: {
        animationDuration: "0.01ms !important",
        animationIterationCount: "1 !important",
        transitionDuration: "0.01ms !important",
      },
    },
  },
  theme: {
    keyframes: {
      // The homepage hero's one entrance on load (each line rises 8px and fades in)
      heroIn: {
        from: { opacity: 0, transform: "translateY(8px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
      // "You are welcome here" ribbons: the text track holds two copies, so -50% loops seamlessly
      marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      marqueeReverse: { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
      // A soft ring while waiting for the M-Pesa prompt
      pulseRing: {
        "0%, 100%": { boxShadow: "0 0 0 0 rgba(245, 197, 24, 0.45)" },
        "50%": { boxShadow: "0 0 0 12px rgba(245, 197, 24, 0)" },
      },
    },
    tokens,
    semanticTokens,
    textStyles,
    recipes: {
      button: buttonRecipe,
    },
    slotRecipes: {
      contentCard: contentCardRecipe,
      factList: factListRecipe,
      filterBar: filterBarRecipe,
      pathwayStep: pathwayStepRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, config);
export default system;
