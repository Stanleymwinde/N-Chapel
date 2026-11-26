import { Box, Container, Heading, HStack, Text } from "@chakra-ui/react";
import type { Link } from "@content/types";
import { LinkButton } from "@/components/Button";
import { RichText } from "@/components/RichText";

/**
 * The close of every ministry page, after the reference site's "Got
 * questions?": a quiet grey band, a short bold question set centre, one line,
 * and the next step. No page ends without somewhere to go.
 */
export function MinistryClosing({ title, text, primary, secondary }: { title: string; text?: string; primary: Link; secondary?: Link }) {
  return (
    <Box as="section" aria-labelledby="next-step-heading" bg="bg.warm" py={{ base: "16", md: "24" }}>
      <Container maxW="40rem" px={{ base: "5", md: "8" }} textAlign="center">
        <Text fontSize="0.875rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg" mb="3">
          Your next step
        </Text>
        <Heading as="h2" id="next-step-heading" fontFamily="heading" fontWeight="700" fontSize={{ base: "2rem", md: "2.75rem" }} lineHeight="1.1" letterSpacing="-0.015em" textWrap="balance">
          {title}
        </Heading>
        {text && (
          <Text mt="4" fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.7" color="fg" textWrap="pretty">
            <RichText text={text} />
          </Text>
        )}
        <HStack mt="8" gap="3" flexWrap="wrap" justifyContent="center">
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
