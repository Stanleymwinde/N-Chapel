import { Box, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Img } from "../Img";
import { Breadcrumbs } from "../layout/Breadcrumbs";
import { Squiggle } from "../home/Squiggle";

/**
 * Landing header for /blog and /publications (Figma "Hero"): breadcrumb, a
 * large title with the gold swoosh and an intro on the left, a 518 × 322
 * photo on the right.
 */
export function IndexHero({ title, intro, image, introMaxW = "576px" }: { title: string; intro: string; image: string; introMaxW?: string }) {
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "12", md: "96px" }}>
      <Container maxW="container" px={{ base: "5", md: "8" }}>
        <Breadcrumbs items={[{ label: title }]} tone="light" />
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "stretch", md: "center" }}
          justifyContent="space-between"
          gap={{ base: "8", md: "10" }}
          mt="28px"
        >
          <Stack gap="18px" flex="1" minW="0">
            <Heading
              as="h1"
              fontFamily="heading"
              fontWeight="600"
              fontSize={{ base: "3rem", md: "4rem", lg: "4.75rem" }}
              lineHeight="1.05"
              letterSpacing="-0.02em"
              pb="2"
            >
              <Squiggle>{title}</Squiggle>
            </Heading>
            <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.55" color="fg.muted" maxW={introMaxW}>
              {intro}
            </Text>
          </Stack>
          <Box
            position="relative"
            flexShrink="0"
            w={{ base: "full", md: "44%", lg: "518px" }}
            aspectRatio={{ base: "16 / 10", md: "518 / 322" }}
            borderRadius="12px"
            overflow="hidden"
            bg="bg.tint"
            data-hero-photo=""
          >
            <Img slot={image} priority sizes="(min-width: 1024px) 518px, (min-width: 768px) 44vw, 100vw" />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
