"use client";

import { useState } from "react";
import { AspectRatio, Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { Map as MapIcon } from "lucide-react";
import { site } from "@content/site";
import { LinkButton } from "./Button";

/**
 * Click-to-load map: nothing heavy is downloaded until the visitor asks,
 * which saves mobile data. "Open in Google Maps" is always available.
 */
export function MapEmbed({ title = `Map showing ${site.name}` }: { title?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Stack gap="3">
      <AspectRatio ratio={{ base: 4 / 3, md: 16 / 9 }} borderRadius="lg" overflow="hidden" bg="bg.tint" borderWidth="1px" borderColor="border">
        {loaded ? (
          <iframe src={site.mapEmbedUrl} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: 0 }} allowFullScreen />
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="4" p="6" textAlign="center">
            <Box color="brand.fg" aria-hidden="true">
              <MapIcon size={40} />
            </Box>
            <Text color="fg.muted" maxW="40ch">
              The map loads from Google and uses some mobile data.
            </Text>
            <Button variant="secondary" onClick={() => setLoaded(true)}>
              Load the map
            </Button>
          </Box>
        )}
      </AspectRatio>
      <HStack gap="3" flexWrap="wrap">
        <LinkButton href={site.mapUrl} variant="primary">
          Open in Google Maps
        </LinkButton>
      </HStack>
    </Stack>
  );
}
