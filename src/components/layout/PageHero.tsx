import { Box, Container, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Img } from "../Img";
import { RichText } from "../RichText";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type Props = {
  title: string;
  eyebrow?: string;
  intro?: string;
  /** media slot key; omit for a plain purple hero (policies etc.) */
  image?: string;
  breadcrumbs?: Crumb[];
  /** buttons (LinkButton with inverse / inverseOutline variants) */
  actions?: React.ReactNode;
};

/**
 * Short inner-page hero: 280–360px on mobile, ~40–50vh on desktop.
 * Text sits on a ≥ 60% dark overlay so white text passes AA on any photo.
 */
export function PageHero({ title, eyebrow, intro, image, breadcrumbs, actions }: Props) {
  return (
    <Box
      as="header"
      position="relative"
      bg="night.900"
      color="fg.inverted"
      minH={{ base: "300px", md: "380px", lg: "45vh" }}
      maxH={{ lg: "560px" }}
      display="flex"
      alignItems="flex-end"
      overflow="hidden"
    >
      {image && (
        <Box position="absolute" inset="0" aria-hidden="true">
          <Img slot={image} priority decorative sizes="100vw" />
        </Box>
      )}
      {/* Solid dark overlay (not a decorative gradient) for text contrast */}
      <Box position="absolute" inset="0" bg={image ? "rgba(22, 18, 31, 0.68)" : "night.900"} aria-hidden="true" />
      <Container maxW="container" px={{ base: "5", md: "8" }} position="relative" py={{ base: "10", md: "14" }}>
        <Stack gap="4" maxW="prose">
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          {eyebrow && (
            <Text textStyle="eyebrow" color="accent.highlight">
              {eyebrow}
            </Text>
          )}
          <Heading as="h1" textStyle="h1" color="fg.inverted">
            {title}
          </Heading>
          {intro && (
            <Text textStyle="lead" color="fg.inverted">
              <RichText text={intro} />
            </Text>
          )}
          {actions && (
            <HStack gap="3" flexWrap="wrap" pt="2">
              {actions}
            </HStack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
