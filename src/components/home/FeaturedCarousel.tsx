"use client";

import { Children, useState } from "react";
import { Box, HStack, IconButton } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Featured slider: one slide at a time, dots + previous/next. No autoplay
 * (nothing moves unless the visitor asks), keyboard and screen-reader friendly.
 * Slides are rendered on the server and passed in as children.
 */
export function FeaturedCarousel({ label, children }: { label: string; children: React.ReactNode }) {
  const slides = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const go = (i: number) => setIndex((i + count) % count);

  if (count === 0) return null;

  return (
    <Box as="section" aria-roledescription="carousel" aria-label={label}>
      <Box position="relative">
        {slides.map((slide, i) => (
          <Box
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            hidden={i !== index}
            animation={i === index ? "fade-in 200ms {easings.enter}" : undefined}
          >
            {slide}
          </Box>
        ))}
      </Box>
      {count > 1 && (
        <HStack justifyContent="center" gap="2" mt="8">
          <IconButton variant="secondary" size="md" borderRadius="full" aria-label="Previous featured event" onClick={() => go(index - 1)}>
            <ChevronLeft aria-hidden="true" />
          </IconButton>
          <HStack gap="0">
            {slides.map((_, i) => (
              <Box
                as="button"
                key={i}
                onClick={() => go(i)}
                aria-label={`Show featured event ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                w="44px"
                h="44px"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                borderRadius="full"
              >
                <Box
                  w={i === index ? "12px" : "8px"}
                  h={i === index ? "12px" : "8px"}
                  borderRadius="full"
                  borderWidth="2px"
                  borderColor="brand.solid"
                  bg={i === index ? "transparent" : "border.strong"}
                  transition="width 150ms ease-out, height 150ms ease-out"
                />
              </Box>
            ))}
          </HStack>
          <IconButton variant="secondary" size="md" borderRadius="full" aria-label="Next featured event" onClick={() => go(index + 1)}>
            <ChevronRight aria-hidden="true" />
          </IconButton>
        </HStack>
      )}
    </Box>
  );
}
