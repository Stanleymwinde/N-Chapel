import NextLink from "next/link";
import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Img } from "../Img";
import { LinkButton } from "../Button";
import { RichText } from "../RichText";
import { ChA } from "../primitives";

type Props = {
  image: string;
  eyebrow?: string;
  title: string;
  href: string;
  summary: string;
  /** bold practical lines, e.g. date / time / venue */
  details: string[];
  cta: string;
  /** image on the right instead of the left */
  reverse?: boolean;
};

/** Large featured row: 16:9 image beside heading, summary, bold details and a link. */
export function FeatureRow({ image, eyebrow, title, href, summary, details, cta, reverse }: Props) {
  return (
    <Grid as="article" templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: "6", lg: "12" }} alignItems="center">
      <Box
        position="relative"
        aspectRatio="16 / 9"
        borderRadius="md"
        overflow="hidden"
        bg="bg.tint"
        order={{ base: 0, lg: reverse ? 1 : 0 }}
      >
        <Img slot={image} sizes="(min-width: 1024px) 640px, 100vw" decorative />
      </Box>
      <Stack gap="4" maxW="prose">
        {eyebrow && (
          <Text textStyle="small" fontWeight="600" color="brand.fg">
            {eyebrow}
          </Text>
        )}
        <Heading as="h3" textStyle="h3">
          <ChA asChild textDecoration="none" _hover={{ color: "brand.fg" }}>
            <NextLink href={href}>{title}</NextLink>
          </ChA>
        </Heading>
        <Text color="fg.muted" textStyle="small" fontSize="0.9375rem">
          <RichText text={summary} />
        </Text>
        <Stack gap="0.5" fontWeight="700" textStyle="small" fontSize="0.9375rem">
          {details.map((d) => (
            <Text key={d}>
              <RichText text={d} />
            </Text>
          ))}
        </Stack>
        <Box pt="1">
          <LinkButton href={href} variant="link" aria-label={`${cta}: ${title}`}>
            {cta}
          </LinkButton>
        </Box>
      </Stack>
    </Grid>
  );
}
