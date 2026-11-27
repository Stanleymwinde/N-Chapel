import { Box, Container, Heading, HStack, Text } from "@chakra-ui/react";
import type { Link } from "@content/types";
import { LinkButton } from "@/components/Button";
import { RichText } from "@/components/RichText";

type Props = {
  title: string;
  text?: string;
  primary: Link;
  secondary?: Link;
  /**
   * "design" = the Figma "Next step" band used on the ministry pages (80px
   * padding, 46px semibold title, 20px line, standard buttons). The default
   * keeps the original look for the other pages that use this band.
   */
  variant?: "default" | "design";
  /** band background (default warm cream); the Figma Watch and Podcast pages use white */
  bg?: string;
};

/**
 * The close of every ministry page, after the reference site's "Got
 * questions?": a quiet warm band, a short bold question set centre, one line,
 * and the next step. No page ends without somewhere to go.
 */
export function MinistryClosing({ title, text, primary, secondary, variant = "default", bg = "bg.warm" }: Props) {
  const design = variant === "design";
  return (
    <Box as="section" aria-labelledby="next-step-heading" bg={bg} py={design ? { base: "16", md: "20" } : { base: "16", md: "24" }}>
      <Container maxW={design ? "42rem" : "40rem"} px={{ base: "5", md: "8" }} textAlign="center">
        <Text
          fontSize={design ? "0.75rem" : "0.875rem"}
          fontWeight={design ? "600" : "700"}
          letterSpacing="0.08em"
          textTransform="uppercase"
          color="brand.fg"
          mb={design ? "18px" : "3"}
        >
          Your next step
        </Text>
        <Heading
          as="h2"
          id="next-step-heading"
          fontFamily="heading"
          fontWeight={design ? "600" : "700"}
          fontSize={design ? { base: "2rem", md: "2.875rem" } : { base: "2rem", md: "2.75rem" }}
          lineHeight="1.1"
          letterSpacing="-0.015em"
          textWrap="balance"
        >
          {title}
        </Heading>
        {text && (
          <Text
            mt={design ? "18px" : "4"}
            fontSize={design ? { base: "1.125rem", md: "1.25rem" } : { base: "1.0625rem", md: "1.1875rem" }}
            lineHeight={design ? "1.55" : "1.7"}
            color="fg"
            textWrap="pretty"
          >
            <RichText text={text} />
          </Text>
        )}
        <HStack mt={design ? "30px" : "8"} gap="3" flexWrap="wrap" justifyContent="center">
          <LinkButton href={primary.href} size="lg">
            {primary.label}
          </LinkButton>
          {secondary && (
            <LinkButton href={secondary.href} variant="secondary" size="lg">
              {secondary.label}
            </LinkButton>
          )}
        </HStack>
      </Container>
    </Box>
  );
}
