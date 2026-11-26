"use client";

import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

/**
 * A 3px bar along the top of the window that fills as the article is read.
 * It tracks the scroll directly (no easing), so it never lags the reader.
 * Purely visual: hidden from assistive technology.
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = document.getElementById(targetId);
      if (!el || !bar.current) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <Box aria-hidden="true" position="fixed" top="0" left="0" right="0" h="3px" zIndex="2000" pointerEvents="none">
      <Box ref={bar} h="100%" bg="accent.highlight" transformOrigin="left" transform="scaleX(0)" />
    </Box>
  );
}
