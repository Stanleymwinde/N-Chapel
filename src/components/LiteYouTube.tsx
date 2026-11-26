"use client";

import { useState } from "react";
import { AspectRatio, Box, chakra, Text } from "@chakra-ui/react";
import { Play } from "lucide-react";
import { isTodo } from "@content/site";
import { Img } from "./Img";

/**
 * Lite YouTube facade: shows a thumbnail and only loads the YouTube
 * player (≈ 1 MB) when the visitor presses play.
 */
export function LiteYouTube({
  id,
  title,
  poster = "blog.hero",
  hd,
}: {
  id: string;
  title: string;
  /** media slot shown as the thumbnail until the YouTube video ID is known */
  poster?: string;
  /** use the full-size YouTube cover (falls back to the standard one if missing) */
  hd?: boolean;
}) {
  const [active, setActive] = useState(false);
  if (isTodo(id)) {
    return (
      <AspectRatio ratio={16 / 9} borderRadius="lg" overflow="hidden" bg="night.900">
        <Box position="relative" color="fg.inverted">
          <Img slot={poster} sizes="(min-width: 1024px) 720px, 100vw" decorative />
          <Box position="absolute" inset="0" bg="rgba(22, 18, 31, 0.55)" aria-hidden="true" />
          <Box
            position="absolute"
            inset="0"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="4"
            p="6"
            textAlign="center"
          >
            <Box
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w={{ base: "56px", md: "72px" }}
              h={{ base: "56px", md: "72px" }}
              borderRadius="full"
              bg="whiteAlpha.300"
              borderWidth="2px"
              borderColor="whiteAlpha.700"
              aria-hidden="true"
            >
              <Play size={28} fill="currentColor" />
            </Box>
            <Text fontFamily="heading" fontWeight="600" fontSize={{ base: "1.125rem", md: "1.375rem" }} lineHeight="1.25" maxW="32ch">
              {title}
            </Text>
            <Text textStyle="small" bg="blackAlpha.500" px="3" py="1" borderRadius="full">
              Video coming soon
            </Text>
          </Box>
        </Box>
      </AspectRatio>
    );
  }
  return (
    <AspectRatio ratio={16 / 9} borderRadius="lg" overflow="hidden" bg="night.900">
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 0 }}
        />
      ) : (
        <chakra.button
          type="button"
          onClick={() => setActive(true)}
          position="relative"
          cursor="pointer"
          aria-label={`Play video: ${title}`}
          css={{ "&:hover .play, &:focus-visible .play": { bg: "brand.hover" } }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/${hd ? "maxresdefault" : "hqdefault"}.jpg`}
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.src.includes("hqdefault")) img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
            }}
            alt=""
            loading="lazy"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box
            className="play"
            position="relative"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w="72px"
            h="72px"
            borderRadius="full"
            bg="brand.solid"
            color="white"
            transition="background-color 200ms ease-out"
          >
            <Play size={32} aria-hidden="true" fill="currentColor" />
          </Box>
        </chakra.button>
      )}
    </AspectRatio>
  );
}
