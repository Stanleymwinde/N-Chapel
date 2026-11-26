import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { RichText } from "../RichText";

export type SectionTone = "white" | "warm" | "tint" | "night";

const toneBg: Record<SectionTone, string> = {
  white: "bg.canvas",
  warm: "bg.warm",
  tint: "bg.tint",
  night: "bg.night",
};

type Props = {
  id?: string;
  tone?: SectionTone;
  eyebrow?: string;
  title?: string;
  intro?: string;
  /** centre the short heading + one-line intro */
  centered?: boolean;
  /** heading level for the title (default h2) */
  as?: "h2" | "h3";
  children?: React.ReactNode;
  /** reduce vertical padding */
  compact?: boolean;
  /** aria-label when there is no visible title */
  label?: string;
};

/** Page section with the standard rhythm: alternating backgrounds, 64–96px padding. */
export function Section({ id, tone = "white", eyebrow, title, intro, centered, as = "h2", children, compact, label }: Props) {
  const headingId = id ? `${id}-heading` : undefined;
  const dark = tone === "night";
  return (
    <Box
      as="section"
      id={id}
      aria-labelledby={title && headingId ? headingId : undefined}
      aria-label={!title ? label : undefined}
      bg={toneBg[tone]}
      color={dark ? "fg.inverted" : "fg"}
      py={compact ? { base: "10", md: "12" } : { base: "16", md: "20", lg: "24" }}
    >
      <Container maxW="container" px={{ base: "5", md: "8" }}>
        {(eyebrow || title || intro) && (
          <Stack
            gap="3"
            mb={{ base: "8", md: "10" }}
            textAlign={centered ? "center" : "left"}
            alignItems={centered ? "center" : "flex-start"}
            maxW="prose"
            mx={centered ? "auto" : undefined}
          >
            {eyebrow && (
              <Text textStyle="eyebrow" color={dark ? "accent.highlight" : "brand.fg"}>
                {eyebrow}
              </Text>
            )}
            {title && (
              <Heading as={as} id={headingId} textStyle={as === "h2" ? "h2" : "h3"} color={dark ? "fg.inverted" : "fg"}>
                {title}
              </Heading>
            )}
            {intro && (
              <Text textStyle="lead" color={dark ? "fg.invertedMuted" : "fg.muted"}>
                <RichText text={intro} />
              </Text>
            )}
          </Stack>
        )}
        {children}
      </Container>
    </Box>
  );
}

/** Long-form text column (max 68ch, left-aligned). */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <Box
      maxW="prose"
      css={{
        "& > * + *": { marginTop: "1em" },
        "& h2": { textStyle: "h3", marginTop: "1.6em" },
        "& h3": { textStyle: "h4", marginTop: "1.4em" },
        "& ul, & ol": { paddingInlineStart: "1.4em" },
        "& li + li": { marginTop: "0.4em" },
        "& a": { color: "brand.fg", textDecoration: "underline", textUnderlineOffset: "0.2em" },
        "& blockquote": {
          borderInlineStartWidth: "4px",
          borderColor: "accent.highlight",
          paddingInlineStart: "1em",
          fontStyle: "italic",
          color: "fg.muted",
        },
      }}
    >
      {children}
    </Box>
  );
}
