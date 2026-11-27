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
  /** bold practical line, e.g. the date */
  date: string;
  /** smaller underlined line under the date, e.g. venue or time */
  extra?: string[];
  cta: string;
  /** image on the right instead of the left */
  reverse?: boolean;
};

/** Figma "Event card": 442×294 photo beside eyebrow, 28px title, 20px summary, date, venue and a text link. */
export function FeatureRow({ image, eyebrow, title, href, summary, date, extra = [], cta, reverse }: Props) {
  return (
    <Grid as="article" templateColumns={{ base: "1fr", lg: "442px 1fr" }} gap={{ base: "6", lg: "40px" }} alignItems="center">
      <Box
        position="relative"
        aspectRatio="442 / 294"
        borderRadius="6px"
        overflow="hidden"
        bg="bg.tint"
        order={{ base: 0, lg: reverse ? 1 : 0 }}
      >
        <Img slot={image} sizes="(min-width: 1024px) 442px, 100vw" decorative />
      </Box>
      <Stack gap="10px" alignItems="flex-start">
        {eyebrow && (
          <Text fontSize="0.9375rem" fontWeight="500" color="brand.fg" whiteSpace="pre-wrap">
            {eyebrow}
          </Text>
        )}
        <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.5rem", md: "1.75rem" }} lineHeight="1.2">
          <ChA asChild textDecoration="none" _hover={{ color: "brand.fg" }}>
            <NextLink href={href}>{title}</NextLink>
          </ChA>
        </Heading>
        <Text color="fg.muted" fontSize={{ base: "1.125rem", md: "1.25rem" }} lineHeight="1.5">
          <RichText text={summary} />
        </Text>
        <Text fontWeight="600" fontSize="0.9375rem">
          <RichText text={date} />
        </Text>
        {extra.map((d) => (
          <Text key={d} fontSize="0.8125rem" fontWeight="500" textDecoration="underline" textUnderlineOffset="0.2em">
            <RichText text={d} />
          </Text>
        ))}
        <LinkButton href={href} variant="link" aria-label={`${cta}: ${title}`}>
          {cta}
        </LinkButton>
      </Stack>
    </Grid>
  );
}
