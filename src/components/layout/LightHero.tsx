import { Box, Container, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Img } from "../Img";
import { RichText } from "../RichText";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

const enter = (delay: number) => ({ animation: `heroIn 700ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms both` });

/** Desktop size of the photo (Figma px) and how it sits. */
type Media = {
  width: number;
  height: number;
  /** lifted "photo slot" look (soft drop shadow, 14px corners) */
  lifted?: boolean;
  /** px the photo extends past the right edge of the content column on wide screens */
  bleed?: number;
};

const defaultMedia: Media = { width: 564, height: 376, lifted: true };

type Props = {
  title: string;
  intro?: string;
  /** media slot shown beside the text (not behind it) */
  image: string;
  /** Figma size of the photo; defaults to the 564 × 376 lifted photo slot */
  media?: Media;
  breadcrumbs?: Crumb[];
  /** buttons (LinkButton primary / secondary) */
  actions?: React.ReactNode;
  /**
   * No bottom padding: use when the next section is also white, so the
   * section's own top padding gives the 96px gap (as in Figma).
   */
  flushBottom?: boolean;
  /** narrower title box to force the Figma line breaks (e.g. "School of / Ministry") */
  titleMaxW?: string;
};

/**
 * Light page header (Figma "Hero" on the Get involved pages): breadcrumb,
 * 64px title, 19px intro and buttons on white, with the photograph beside
 * them rather than behind the text.
 */
export function LightHero({ title, intro, image, media = defaultMedia, breadcrumbs, actions, flushBottom, titleMaxW }: Props) {
  const { width, height, lifted, bleed = 0 } = media;
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={flushBottom ? "0" : { base: "16", md: "20", lg: "24" }}>
      <Container maxW="container" px={{ base: "5", md: "8" }}>
        {breadcrumbs && (
          <Box css={{ "& nav": { fontSize: "0.75rem", lineHeight: "normal" }, "& svg": { width: "12px", height: "12px" } }}>
            <Breadcrumbs items={breadcrumbs} tone="light" />
          </Box>
        )}
        <Flex
          mt="5"
          direction={{ base: "column", lg: "row" }}
          alignItems={{ base: "stretch", lg: "center" }}
          justifyContent="space-between"
          gap={{ base: "10", lg: "8" }}
        >
          <Stack gap="18px" flex={{ lg: "0 1 552px" }} minW="0" alignItems="flex-start">
            <Heading
              as="h1"
              fontFamily="heading"
              fontWeight="600"
              fontSize={{ base: "2.75rem", md: "3.5rem", lg: "4rem" }}
              lineHeight="1.02"
              letterSpacing="-0.02em"
              textWrap="balance"
              maxW={{ lg: titleMaxW }}
              css={enter(0)}
            >
              {title}
            </Heading>
            {intro && (
              <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.55" color="fg.muted" textWrap="pretty" css={enter(80)}>
                <RichText text={intro} />
              </Text>
            )}
            {actions && (
              <HStack gap="3" flexWrap="wrap" css={enter(160)}>
                {actions}
              </HStack>
            )}
          </Stack>
          <Box
            position="relative"
            flexShrink={{ lg: 1 }}
            w={{ base: "100%", lg: `${width}px` }}
            maxW={{ lg: "calc(100% - 584px)" }}
            // Only bleed where the page margin is wide enough to take it (no sideways scroll)
            css={{
              ...enter(120),
              ...(bleed ? { "@media (min-width: 1360px)": { maxWidth: "none", marginRight: `-${bleed}px` } } : {}),
            }}
            aspectRatio={`${width} / ${height}`}
            borderRadius={lifted ? "14px" : "12px"}
            overflow="hidden"
            bg="bg.muted"
            boxShadow={lifted ? "0 14px 15px rgba(28, 23, 38, 0.18)" : undefined}
          >
            <Img slot={image} priority sizes={`(min-width: 1024px) ${width}px, 100vw`} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
