import NextLink from "next/link";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Img } from "../Img";
import { ChA } from "../primitives";

export type StepTile = { title: string; text: string; detail: string; href: string; cta: string; image: string };

/**
 * Four portrait photo tiles with the title set over the photo. A solid
 * 60% scrim (no gradient) keeps the large white title readable.
 */
export function StepTiles({ tiles }: { tiles: readonly StepTile[] }) {
  return (
    <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 2, lg: 4 }} gap={{ base: "3", md: "5" }}>
      {tiles.map((t) => (
        <Box as="li" key={t.title}>
          <ChA
            asChild
            position="relative"
            display="block"
            aspectRatio="3 / 4"
            borderRadius="md"
            overflow="hidden"
            bg="night.900"
            color="fg.inverted"
            textDecoration="none"
            css={{
              "& img": { transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)" },
              "&:hover img, &:focus-visible img": { transform: "scale(1.03)" },
            }}
          >
            <NextLink href={t.href}>
              <Img slot={t.image} sizes="(min-width: 1024px) 560px, 100vw" decorative />
              <Box position="absolute" inset="0" bg="rgba(22, 18, 31, 0.6)" aria-hidden="true" />
              <Box position="absolute" left="0" right="0" bottom="0" p={{ base: "4", md: "6" }}>
                <Text fontFamily="heading" fontWeight="600" fontSize={{ base: "1.375rem", md: "1.75rem" }} lineHeight="1.1">
                  {t.title}
                </Text>
                <Text textStyle="small" mt="1" display={{ base: "none", md: "block" }}>
                  {t.text}
                </Text>
              </Box>
            </NextLink>
          </ChA>
        </Box>
      ))}
    </SimpleGrid>
  );
}
