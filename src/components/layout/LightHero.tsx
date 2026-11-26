import { Box, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Img } from "../Img";
import { RichText } from "../RichText";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

const enter = (delay: number) => ({ animation: `heroIn 700ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms both` });

type Props = {
  title: string;
  intro?: string;
  /** media slot shown beside the text (not behind it) */
  image: string;
  breadcrumbs?: Crumb[];
  /** buttons (LinkButton primary / secondary) */
  actions?: React.ReactNode;
};

/**
 * Light page header, matching the site's other inner pages: title, intro and
 * buttons on white, with the photograph beside them as a lifted, rounded
 * image rather than a dark background.
 */
export function LightHero({ title, intro, image, breadcrumbs, actions }: Props) {
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "14", md: "20" }}>
      <Container maxW="container" px={{ base: "5", md: "8" }}>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} tone="light" />}
        <Grid mt={{ base: "6", md: "10" }} templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) minmax(0, 1fr)" }} gap={{ base: "10", lg: "16" }} alignItems="center">
          <Stack gap={{ base: "5", md: "6" }}>
            <Heading
              as="h1"
              fontFamily="heading"
              fontWeight="700"
              fontSize="clamp(2.5rem, 1.5rem + 4vw, 4.5rem)"
              lineHeight="1.02"
              letterSpacing="-0.025em"
              textWrap="balance"
              css={enter(0)}
            >
              {title}
            </Heading>
            {intro && (
              <Text fontSize={{ base: "1.1875rem", md: "1.375rem" }} lineHeight="1.55" color="fg.muted" maxW="34rem" textWrap="pretty" css={enter(80)}>
                <RichText text={intro} />
              </Text>
            )}
            {actions && (
              <HStack gap="3" flexWrap="wrap" pt="1" css={enter(160)}>
                {actions}
              </HStack>
            )}
          </Stack>
          <Box position="relative" aspectRatio={{ base: "4 / 3", lg: "5 / 4" }} borderRadius="xl" overflow="hidden" bg="bg.muted" boxShadow="0 30px 60px -28px rgba(22, 18, 31, 0.45)" css={enter(120)}>
            <Img slot={image} priority sizes="(min-width: 1024px) 40rem, 100vw" />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
