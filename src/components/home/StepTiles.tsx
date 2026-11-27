import NextLink from "next/link";
import { Box, Grid, Text } from "@chakra-ui/react";
import { Img } from "../Img";
import { ChA } from "../primitives";

export type StepTile = { title: string; text: string; detail: string; href: string; cta: string; image: string };

/**
 * Figma "Connect card": 232×310 portrait photo tiles, title and one line set
 * over a bottom gradient (clear to 85% ink from 40% down).
 */
export function StepTiles({ tiles }: { tiles: readonly StepTile[] }) {
  return (
    <Grid
      as="ul"
      listStyle="none"
      m="0"
      p="0"
      templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 232px)" }}
      gap={{ base: "3", md: "5", lg: "49px" }}
    >
      {tiles.map((t) => (
        <Box as="li" key={t.title}>
          <ChA
            asChild
            position="relative"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            gap="1"
            aspectRatio="232 / 310"
            p={{ base: "4", md: "5" }}
            borderRadius="6px"
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
              <Img slot={t.image} sizes="(min-width: 1024px) 232px, 50vw" decorative />
              <Box position="absolute" inset="0" bgGradient="to-b" gradientFrom="rgba(28, 23, 38, 0) 40%" gradientTo="rgba(28, 23, 38, 0.85)" aria-hidden="true" />
              <Text position="relative" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.125rem", md: "1.375rem" }} lineHeight="normal">
                {t.title}
              </Text>
              <Text position="relative" fontSize={{ base: "0.875rem", md: "1rem" }} lineHeight="1.4" opacity={0.85}>
                {t.text}
              </Text>
            </NextLink>
          </ChA>
        </Box>
      ))}
    </Grid>
  );
}
