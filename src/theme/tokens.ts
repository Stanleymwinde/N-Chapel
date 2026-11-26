import { defineTokens, defineSemanticTokens } from "@chakra-ui/react";

/**
 * Brand tokens (section 2 of the brief).
 * Purple/gold approximate the logo; sample exact values from the
 * final logo artwork when it is supplied (see CONTENT-TODO.md).
 */
export const tokens = defineTokens({
  colors: {
    purple: {
      50: { value: "#F4EFFB" },
      100: { value: "#E6DBF6" },
      200: { value: "#CDB8EC" },
      300: { value: "#AE8EDF" },
      400: { value: "#8F64D2" },
      500: { value: "#8050CB" },
      600: { value: "#7440C4" },
      700: { value: "#5B2A9E" },
      800: { value: "#47207C" },
      900: { value: "#33175A" },
      950: { value: "#220F3C" },
    },
    gold: {
      100: { value: "#FDF3C4" },
      300: { value: "#F8D965" },
      400: { value: "#F5C518" },
      600: { value: "#B38D00" },
    },
    ink: {
      900: { value: "#16121F" },
      700: { value: "#332D3F" },
      600: { value: "#4D4759" },
      300: { value: "#BDB7C8" },
      200: { value: "#DDD8E4" },
      100: { value: "#ECE9F0" },
    },
    paper: {
      white: { value: "#FFFFFF" },
      warm: { value: "#FAF8F5" },
    },
    /** the grey quadrant of the logo diamond */
    stone: {
      500: { value: "#8C8794" },
    },
    night: {
      900: { value: "#1A1426" },
      700: { value: "#2A2238" },
      300: { value: "#CFC8DC" },
    },
    /** WhatsApp button only (white text passes AA: 6.3:1) */
    whatsapp: {
      600: { value: "#0B6E4F" },
      700: { value: "#095C42" },
    },
    amber: {
      todo: { value: "#B45309" },
    },
  },
  fonts: {
    heading: { value: "var(--font-heading), 'Futura', 'Century Gothic', system-ui, sans-serif" },
    body: { value: "var(--font-jakarta), system-ui, -apple-system, 'Segoe UI', sans-serif" },
  },
  // 8px spacing scale (Chakra's numeric scale stays available: 1 = 4px, 2 = 8px …)
  spacing: {
    "s-1": { value: "8px" },
    "s-2": { value: "16px" },
    "s-3": { value: "24px" },
    "s-4": { value: "32px" },
    "s-5": { value: "40px" },
    "s-6": { value: "48px" },
    "s-8": { value: "64px" },
    "s-10": { value: "80px" },
    "s-12": { value: "96px" },
  },
  sizes: {
    container: { value: "1200px" },
    prose: { value: "68ch" },
  },
  radii: {
    sm: { value: "6px" },
    md: { value: "10px" },
    lg: { value: "16px" },
    xl: { value: "24px" },
  },
  shadows: {
    card: { value: "0 1px 2px rgba(22,18,31,0.06), 0 4px 16px rgba(22,18,31,0.06)" },
    raised: { value: "0 2px 4px rgba(22,18,31,0.08), 0 12px 32px rgba(22,18,31,0.12)" },
  },
  // Motion tokens: 100/150/200/300ms only; ease-out on enter, ease-in on exit.
  durations: {
    instant: { value: "100ms" },
    fast: { value: "150ms" },
    normal: { value: "200ms" },
    slow: { value: "300ms" },
  },
  easings: {
    /** strong ease-out for UI (Emil Kowalski) */
    enter: { value: "cubic-bezier(0.23, 1, 0.32, 1)" },
    /** on-screen movement */
    move: { value: "cubic-bezier(0.77, 0, 0.175, 1)" },
    exit: { value: "cubic-bezier(0.23, 1, 0.32, 1)" },
  },
});

/**
 * Semantic tokens. Light theme only for now; every value is a reference
 * so a `_dark` condition can be added later without touching components.
 */
export const semanticTokens = defineSemanticTokens({
  colors: {
    bg: {
      DEFAULT: { value: "{colors.paper.white}" },
      canvas: { value: "{colors.paper.white}" },
      warm: { value: "{colors.paper.warm}" },
      tint: { value: "{colors.purple.50}" },
      night: { value: "{colors.night.900}" },
      nightRaised: { value: "{colors.night.700}" },
      muted: { value: "{colors.ink.100}" },
    },
    fg: {
      DEFAULT: { value: "{colors.ink.900}" },
      default: { value: "{colors.ink.900}" },
      muted: { value: "{colors.ink.600}" },
      inverted: { value: "{colors.paper.white}" },
      invertedMuted: { value: "{colors.night.300}" },
    },
    border: {
      DEFAULT: { value: "{colors.ink.200}" },
      strong: { value: "{colors.ink.300}" },
    },
    brand: {
      solid: { value: "{colors.purple.700}" },
      hover: { value: "{colors.purple.600}" },
      fg: { value: "{colors.purple.700}" },
      subtle: { value: "{colors.purple.50}" },
      muted: { value: "{colors.purple.100}" },
      contrast: { value: "{colors.paper.white}" },
    },
    accent: {
      highlight: { value: "{colors.gold.400}" },
      subtle: { value: "{colors.gold.100}" },
      contrast: { value: "{colors.ink.900}" },
    },
    todo: {
      outline: { value: "{colors.amber.todo}" },
    },
    // Chakra components that use colorPalette="purple" pick these up
    purple: {
      solid: { value: "{colors.purple.700}" },
      contrast: { value: "{colors.paper.white}" },
      fg: { value: "{colors.purple.700}" },
      muted: { value: "{colors.purple.100}" },
      subtle: { value: "{colors.purple.50}" },
      emphasized: { value: "{colors.purple.200}" },
      focusRing: { value: "{colors.purple.700}" },
    },
  },
});
