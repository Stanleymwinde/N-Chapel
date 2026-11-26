import { Box, Container, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import type { Link } from "@content/types";
import { LinkButton } from "./Button";
import { RichText } from "./RichText";

type Props = {
  title: string;
  text?: string;
  primary: Link;
  secondary?: Link;
  /** brand purple (default) or night black */
  tone?: "brand" | "night";
};

/** Closing band on every page so no page is a dead end. */
export function NextStepBand({ title, text, primary, secondary, tone = "brand" }: Props) {
  return (
    <Box as="section" aria-labelledby="next-step-heading" bg={tone === "night" ? "night.900" : "brand.solid"} color="fg.inverted" py={{ base: "14", md: "16" }}>
      <Container maxW="container" px={{ base: "5", md: "8" }}>
        <Stack
          direction={{ base: "column", md: "row" }}
          gap={{ base: "6", md: "10" }}
          alignItems={{ base: "flex-start", md: "center" }}
          justifyContent="space-between"
        >
          <Stack gap="2" maxW="prose">
            <Text textStyle="eyebrow" color="accent.highlight">
              Your next step
            </Text>
            <Heading as="h2" id="next-step-heading" textStyle="h2" color="fg.inverted">
              {title}
            </Heading>
            {text && (
              <Text textStyle="lead" color="purple.50">
                <RichText text={text} />
              </Text>
            )}
          </Stack>
          <HStack gap="3" flexWrap="wrap" flexShrink={0}>
            <LinkButton href={primary.href} variant="inverse" size="lg">
              {primary.label}
            </LinkButton>
            {secondary && (
              <LinkButton href={secondary.href} variant="inverseOutline" size="lg">
                {secondary.label}
              </LinkButton>
            )}
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
