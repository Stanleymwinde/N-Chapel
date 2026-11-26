"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/theme";
import { EmotionRegistry } from "./emotion-registry";

/**
 * Light theme only for now (set explicitly; system dark mode is ignored).
 * Semantic tokens are structured so a dark theme can be added later.
 * EmotionRegistry moves Chakra's styles into <head> during server rendering.
 */
export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </EmotionRegistry>
  );
}
