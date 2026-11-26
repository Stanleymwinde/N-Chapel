import { Box, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ShieldCheck } from "lucide-react";
import type { Fact, InfoBlock, Scripture } from "@content/types";
import { LinkButton } from "@/components/Button";
import { FactList } from "@/components/FactList";
import { Img } from "@/components/Img";
import { RichText } from "@/components/RichText";
import { ChBlockquote, ChDd, ChDl, ChDt, ChFigcaption, ChFigure, ChLi, ChSpan, ChUl } from "@/components/primitives";

/* ------------------------------------------------------------------ */
/* At-a-glance facts band directly under the hero                      */
/* ------------------------------------------------------------------ */
export function FactsBand({ facts, title = "At a glance" }: { facts: readonly Fact[]; title?: string }) {
  return (
    <Box as="section" aria-labelledby="at-a-glance" bg="bg.warm" borderBottomWidth="1px" borderColor="border">
      <Container maxW="container" px={{ base: "5", md: "8" }} py={{ base: "8", md: "10" }}>
        <Heading as="h2" id="at-a-glance" className="sr-only">
          {title}
        </Heading>
        <FactList facts={facts} layout="grid" />
      </Container>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Bullets                                                              */
/* ------------------------------------------------------------------ */
export function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ChUl m="0" pl="0" listStyle="none" display="grid" gap="2.5">
      {items.map((b) => (
        <ChLi key={b} display="grid" gridTemplateColumns="auto 1fr" gap="3" alignItems="baseline" color="fg">
          {/* small diamond bullet, echoing the logo mark */}
          <ChSpan aria-hidden="true" w="2" h="2" bg="brand.solid" transform="rotate(45deg) translateY(-2px)" display="inline-block" />
          <span>
            <RichText text={b} />
          </span>
        </ChLi>
      ))}
    </ChUl>
  );
}

/* ------------------------------------------------------------------ */
/* Split image/text feature for an InfoBlock                           */
/* ------------------------------------------------------------------ */
export function SplitFeature({
  block,
  reverse,
  label,
  headingLevel = "h3",
  children,
}: {
  block: InfoBlock;
  reverse?: boolean;
  /** small informative label above the title, e.g. "2-year programme" */
  label?: string;
  headingLevel?: "h2" | "h3";
  children?: React.ReactNode;
}) {
  return (
    <Grid
      id={block.id}
      templateColumns={{ base: "1fr", md: block.image ? "1fr 1fr" : "1fr" }}
      gap={{ base: "6", md: "10", lg: "16" }}
      alignItems="center"
      scrollMarginTop="120px"
    >
      {block.image && (
        <Box
          position="relative"
          aspectRatio="4 / 3"
          borderRadius="lg"
          overflow="hidden"
          bg="bg.tint"
          // Lifted off the page, as on the reference site
          boxShadow="0 30px 60px -28px rgba(22, 18, 31, 0.45)"
          order={{ base: 0, md: reverse ? 1 : 0 }}
        >
          <Img slot={block.image} sizes="(min-width: 768px) 50vw, 100vw" />
        </Box>
      )}
      <Stack gap="4" maxW="prose">
        {label && (
          <Text textStyle="small" fontWeight="600" color="brand.fg">
            {label}
          </Text>
        )}
        <Heading as={headingLevel} textStyle={headingLevel === "h2" ? "h2" : "h3"}>
          {block.title}
        </Heading>
        <Text textStyle="lead" color="fg.muted">
          <RichText text={block.summary} />
        </Text>
        {block.bullets && <BulletList items={block.bullets} />}
        {block.facts && <FactList facts={block.facts} />}
        {children}
        {block.cta && (
          <Box pt="1">
            <LinkButton href={block.cta.href} variant="secondary">
              {block.cta.label}
            </LinkButton>
          </Box>
        )}
      </Stack>
    </Grid>
  );
}

/* ------------------------------------------------------------------ */
/* Prominent callout (safety, emergency)                               */
/* ------------------------------------------------------------------ */
export function Callout({
  title,
  icon,
  tone = "brand",
  children,
  id,
}: {
  title: string;
  icon?: React.ReactNode;
  tone?: "brand" | "alert";
  children: React.ReactNode;
  id?: string;
}) {
  const alert = tone === "alert";
  return (
    <Box
      as="aside"
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      borderWidth="2px"
      borderColor={alert ? "fg" : "brand.solid"}
      bg={alert ? "accent.subtle" : "brand.subtle"}
      borderRadius="lg"
      p={{ base: "5", md: "8" }}
    >
      <Grid templateColumns={{ base: "1fr", sm: "auto 1fr" }} gap={{ base: "4", md: "6" }} alignItems="start">
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          w="12"
          h="12"
          borderRadius="full"
          bg={alert ? "fg" : "brand.solid"}
          color={alert ? "accent.highlight" : "brand.contrast"}
          aria-hidden="true"
        >
          {icon ?? <ShieldCheck size={24} />}
        </Box>
        <Stack gap="3" maxW="prose">
          <Heading as="h2" id={id ? `${id}-title` : undefined} textStyle="h3">
            {title}
          </Heading>
          {children}
        </Stack>
      </Grid>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Scripture / quotation                                               */
/* ------------------------------------------------------------------ */
export function ScriptureQuote({ scripture, tone = "light" }: { scripture: Scripture; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ChFigure m="0" maxW="44rem" borderInlineStartWidth="4px" borderColor="accent.highlight" pl={{ base: "5", md: "8" }}>
      {scripture.text && (
        <ChBlockquote m="0">
          <Text
            fontFamily="heading"
            fontWeight="600"
            fontSize="clamp(1.375rem, 1.15rem + 1vw, 2rem)"
            lineHeight="1.3"
            color={dark ? "fg.inverted" : "fg"}
            textWrap="balance"
          >
            “{scripture.text}”
          </Text>
        </ChBlockquote>
      )}
      <ChFigcaption mt="3" textStyle="small" fontWeight="600" color={dark ? "fg.invertedMuted" : "fg.muted"}>
        {scripture.reference}
      </ChFigcaption>
    </ChFigure>
  );
}

/* ------------------------------------------------------------------ */
/* Acronym expansion (F.A.I.T.H., V.U.M.A.)                             */
/* ------------------------------------------------------------------ */
export function AcronymList({ letters, label }: { letters: readonly { letter: string; word: string; text: string }[]; label: string }) {
  return (
    <ChDl aria-label={label} m="0" display="grid" gap="0" borderTopWidth="1px" borderColor="border">
      {letters.map((l) => (
        <Grid
          key={l.letter}
          templateColumns="3.5rem 1fr"
          gap="4"
          alignItems="baseline"
          py="4"
          borderBottomWidth="1px"
          borderColor="border"
        >
          <ChDt fontFamily="heading" fontWeight="700" fontSize="2.25rem" lineHeight="1" color="brand.fg">
            {l.letter}
          </ChDt>
          <ChDd m="0">
            <Text as="span" fontWeight="600" color="fg">
              <RichText text={l.word} />
            </Text>{" "}
            <Text as="span" color="fg.muted">
              <RichText text={l.text} />
            </Text>
          </ChDd>
        </Grid>
      ))}
    </ChDl>
  );
}

/* ------------------------------------------------------------------ */
/* Rule-separated editorial list of short items                         */
/* ------------------------------------------------------------------ */
export function RuleList({
  items,
  columns = 3,
  headingLevel = "h3",
}: {
  items: readonly { title: string; text: string }[];
  columns?: 2 | 3;
  headingLevel?: "h3" | "h4";
}) {
  return (
    <Grid
      as="ul"
      listStyle="none"
      m="0"
      p="0"
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: `repeat(${columns}, 1fr)` }}
      columnGap="10"
      borderTopWidth="2px"
      borderColor="fg"
    >
      {items.map((it, i) => (
        <Box as="li" key={it.title} py={{ base: "6", md: "7" }} borderBottomWidth="1px" borderColor="border">
          <Text aria-hidden="true" fontFamily="heading" fontWeight="700" fontSize="0.875rem" letterSpacing="0.06em" color="brand.fg" mb="3">
            {String(i + 1).padStart(2, "0")}
          </Text>
          <Heading as={headingLevel} fontFamily="heading" fontWeight="700" fontSize={{ base: "1.1875rem", md: "1.3125rem" }} lineHeight="1.25" letterSpacing="-0.01em" mb="2">
            {it.title}
          </Heading>
          <Text color="fg.muted">
            <RichText text={it.text} />
          </Text>
        </Box>
      ))}
    </Grid>
  );
}

/* ------------------------------------------------------------------ */
/* Simple row of related-page links                                     */
/* ------------------------------------------------------------------ */
export function LinkRow({ links }: { links: readonly { label: string; href: string }[] }) {
  return (
    <HStack gap="3" flexWrap="wrap">
      {links.map((l, i) => (
        <LinkButton key={l.href + l.label} href={l.href} variant={i === 0 ? "secondary" : "link"}>
          {l.label}
        </LinkButton>
      ))}
    </HStack>
  );
}
