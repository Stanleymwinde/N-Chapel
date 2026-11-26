"use client";

import { useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { Pause, Play } from "lucide-react";

type Props = { mp4: string; webm?: string; poster: string };

/**
 * Optional muted background video. Only plays on tablet/desktop widths, and
 * never when the visitor prefers reduced motion or has Save-Data on (phones on
 * mobile data keep the still photo underneath). Always has a visible pause button.
 */
export function HeroVideo({ mp4, webm, poster }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- media queries are only readable on the client
    setAllowed(wide && !reduce && !saveData);
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      {allowed && (
        <>
          <Box position="absolute" inset="0" aria-hidden="true">
          <video ref={ref} autoPlay muted loop playsInline poster={poster} preload="none" style={{ width: "100%", height: "100%", objectFit: "cover" }}>
            {webm && <source src={webm} type="video/webm" />}
            <source src={mp4} type="video/mp4" />
          </video>
          </Box>
          <IconButton
            zIndex="2"
            onClick={toggle}
            aria-label={playing ? "Pause background video" : "Play background video"}
            position="absolute"
            left={{ base: "4", md: "6" }}
            bottom={{ base: "4", md: "6" }}
            variant="inverseOutline"
            borderRadius="full"
          >
            {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </IconButton>
        </>
      )}
    </>
  );
}
