import { Box, Container, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Img } from "../Img";
import { Breadcrumbs } from "../layout/Breadcrumbs";
import { Squiggle } from "../home/Squiggle";

type Crumb = { label: string; href?: string };

/** Light page header shared by the Resource Library, Blog and Publications detail pages. */
export function LibraryHero({ crumbs, eyebrow, title, intro, children, centered, display, image }: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  centered?: boolean;
  /** section landing pages: larger title with the gold underline (as Blog and Publications) */
  display?: boolean;
  /** media slot shown beside the text (stacks under it on phones) */
  image?: string;
}) {
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "8", md: "12" }}>
      <Container maxW="container" px={{ base: "5", md: "8" }}>
        <Breadcrumbs items={crumbs} tone="light" />
        <Grid templateColumns={{ base: "1fr", md: image ? "minmax(0, 1.15fr) minmax(0, 1fr)" : "1fr" }} gap={{ base: "8", md: "12", lg: "16" }} alignItems="center" mt={{ base: "8", md: "12" }}>
        <Stack gap="4" maxW="48rem" mx={centered ? "auto" : undefined} textAlign={centered ? "center" : "start"} alignItems={centered ? "center" : "flex-start"}>
          {eyebrow && (
            <Text textStyle="eyebrow" color="brand.fg">
              {eyebrow}
            </Text>
          )}
          <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize={display ? "clamp(2.75rem, 1.6rem + 4.4vw, 5rem)" : "clamp(2.25rem, 1.5rem + 3.2vw, 4rem)"} lineHeight={display ? "1" : "1.05"} letterSpacing="-0.02em">
            {display ? <Squiggle>{title}</Squiggle> : title}
          </Heading>
          {intro && (
            <Text textStyle="lead" color="fg.muted">
              {intro}
            </Text>
          )}
          {children}
        </Stack>
        {image && (
          <Box position="relative" aspectRatio={{ base: "16 / 10", md: "4 / 3" }} borderRadius="xl" overflow="hidden" bg="bg.tint" data-hero-photo="">
            <Img slot={image} priority sizes="(min-width: 768px) 560px, 100vw" />
          </Box>
        )}
        </Grid>
      </Container>
    </Box>
  );
}
