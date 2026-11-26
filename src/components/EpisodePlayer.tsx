"use client";

import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { Play } from "lucide-react";

/**
 * A podcast episode player. Nothing loads until "Play" is pressed (so a page
 * of episodes stays light); then the browser's own audio controls take its
 * place, which are keyboard and screen-reader accessible. Starting one
 * episode pauses any other that is playing.
 */
export function EpisodePlayer({ src, title, duration, tone = "light", size = "md" }: { src: string; title: string; duration?: string; tone?: "light" | "dark"; size?: "md" | "lg" }) {
  const [on, setOn] = useState(false);

  if (on) {
    return (
      <Box w="full" maxW="34rem">
        <audio
          controls
          autoPlay
          preload="metadata"
          src={src}
          aria-label={`Play ${title}`}
          style={{ width: "100%", colorScheme: tone === "dark" ? "dark" : "light" }}
          onPlay={(e) => {
            document.querySelectorAll("audio").forEach((a) => {
              if (a !== e.currentTarget) a.pause();
            });
          }}
        >
          <a href={src}>Download the episode</a>
        </audio>
      </Box>
    );
  }

  return (
    <Button
      type="button"
      onClick={() => setOn(true)}
      variant={tone === "dark" ? "accent" : "primary"}
      size={size}
      aria-label={`Play ${title}${duration ? ` (${duration})` : ""}`}
    >
      <Play size={size === "lg" ? 18 : 16} fill="currentColor" aria-hidden="true" />
      Play{duration ? ` · ${duration}` : ""}
    </Button>
  );
}
