import { Box, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ShieldCheck } from "lucide-react";
import type { Fact, InfoBlock, Scripture } from "@content/types";
import { LinkButton } from "@/components/Button";
import { FactList } from "@/components/FactList";
import { Icon } from "@/components/icons";
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
export function BulletList({ items, fontSize = "0.9375rem", gap = "2.5" }: { items: readonly string[]; fontSize?: string; gap?: string }) {
  return (
    <ChUl m="0" pl="0" listStyle="none" display="grid" gap={gap}>
      {items.map((b) => (
        <ChLi key={b} display="grid" gridTemplateColumns="auto 1fr" gap="2.5" alignItems="baseline" color="fg" fontSize={fontSize} lineHeight="1.55">
          {/* small diamond bullet (Figma "◆"), echoing the logo mark */}
          <ChSpan aria-hidden="true" w="6px" h="6px" bg="brand.solid" transform="rotate(45deg) translateY(-2px)" display="inline-block" />
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
  bulletSize,
  children,
}: {
  block: InfoBlock;
  /** override the bullet text size (Figma varies 14–15px) */
  bulletSize?: string;
  reverse?: boolean;
  /** small informative label above the title, e.g. "2-year programme" */
  label?: string;
  headingLevel?: "h2" | "h3";
  children?: React.ReactNode;
}) {
  // Figma has two sizes: a programme row with an h2 (44px title, 18px copy,
  // 569 × 356 photo, 56px gap) and a smaller one with an h3 (23px, 17px,
  // 569 × 330, 52px gap).
  const big = headingLevel === "h2";
  return (
    <Grid
      id={block.id}
      templateColumns={{ base: "1fr", md: block.image ? "1fr 1fr" : "1fr" }}
      gap={{ base: "6", md: "10", lg: big ? "56px" : "52px" }}
      alignItems="center"
      scrollMarginTop="120px"
    >
      {block.image && (
        <Box
          position="relative"
          aspectRatio={big ? "569 / 356" : "569 / 330"}
          borderRadius="14px"
          overflow="hidden"
          bg="bg.tint"
          // Figma: drop shadow 0 14 15 rgba(28,23,38,.14)
          boxShadow={big ? "0 14px 15px rgba(28, 23, 38, 0.16)" : "0 14px 15px rgba(28, 23, 38, 0.14)"}
          order={{ base: 0, md: reverse ? 1 : 0 }}
        >
          <Img slot={block.image} sizes="(min-width: 768px) 50vw, 100vw" />
        </Box>
      )}
      <Stack gap={big ? "14px" : "4"}>
        {label && (
          <Text fontSize="0.8125rem" fontWeight="500" color="brand.fg">
            {label}
          </Text>
        )}
        <Heading as={headingLevel} {...(headingLevel === "h2" ? { textStyle: "h2" } : { fontFamily: "heading", fontWeight: "600", fontSize: { base: "1.3125rem", md: "1.4375rem" }, lineHeight: "1.25" })}>
          {block.title}
        </Heading>
        <Text fontSize={big ? { base: "1.0625rem", md: "1.125rem" } : { base: "1rem", md: "1.0625rem" }} lineHeight={big ? "1.6" : "1.65"} color="fg.muted">
          <RichText text={block.summary} />
        </Text>
        {block.bullets && (
          <Box pt={big ? "1" : "0"}>
            <BulletList items={block.bullets} fontSize={bulletSize ?? (big ? "0.9375rem" : "0.875rem")} gap="2" />
          </Box>
        )}
        {block.facts?.map((f) => (
          // Figma "How often": 32px tinted icon, 10px label, 15px value
          <HStack key={f.label} gap="3" pt="1" alignItems="center">
            <Box display="inline-flex" flexShrink="0" alignItems="center" justifyContent="center" w="8" h="8" borderRadius="full" bg="bg.tint" color="brand.fg" aria-hidden="true">
              <Icon name={f.icon} size={14} />
            </Box>
            <ChDl m="0" display="flex" flexDirection="column" gap="2px">
              <ChDt fontSize="0.625rem" fontWeight="600" letterSpacing="0.06em" textTransform="uppercase" color="fg.muted">
                {f.label}
              </ChDt>
              <ChDd m="0" fontSize="0.9375rem" color="fg">
                <RichText text={f.value} />
              </ChDd>
            </ChDl>
          </HStack>
        ))}
        {children}
        {block.cta && (
          <Box pt="2">
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
      borderWidth="1.5px"
      borderColor={alert ? "fg" : "brand.solid"}
      bg={alert ? "accent.subtle" : "brand.subtle"}
      borderRadius={alert ? "12px" : "14px"}
      p={{ base: "5", md: "7" }}
    >
      <Grid templateColumns="auto 1fr" columnGap="14px" rowGap="14px" alignItems="center">
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          w={alert ? "44px" : "10"}
          h={alert ? "44px" : "10"}
          borderRadius="full"
          bg={alert ? "fg" : "brand.solid"}
          color={alert ? "accent.highlight" : "brand.contrast"}
          aria-hidden="true"
        >
          {icon ?? <ShieldCheck size={18} />}
        </Box>
        <Heading as="h2" id={id ? `${id}-title` : undefined} fontFamily="heading" fontWeight="600" fontSize="1.375rem" lineHeight="1.25">
          {title}
        </Heading>
        <Stack gap="3" gridColumn={{ base: "1 / -1", sm: "2" }} maxW="prose">
          {children}
        </Stack>
      </Grid>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Scripture / quotation                                               */
/* ------------------------------------------------------------------ */
export function ScriptureQuote({ scripture, tone = "light", wide }: { scripture: Scripture; tone?: "light" | "dark"; /** Figma "Quote" band: 28px text, 624px measure */ wide?: boolean }) {
  const dark = tone === "dark";
  return (
    <ChFigure m="0" maxW={wide ? "680px" : "552px"} borderInlineStartWidth="3px" borderColor="accent.highlight" pl={{ base: "5", md: "26px" }} py="1">
      {scripture.text && (
        <ChBlockquote m="0">
          <Text
            fontFamily="heading"
            fontWeight="600"
            fontSize={wide ? "clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem)" : "clamp(1.375rem, 1.2rem + 0.6vw, 1.6875rem)"}
            lineHeight="1.28"
            maxW={wide ? "624px" : "480px"}
            color={dark ? "fg.inverted" : "fg"}
            textWrap="balance"
          >
            “{scripture.text}”
          </Text>
        </ChBlockquote>
      )}
      <ChFigcaption mt="3" fontSize="0.75rem" fontWeight="500" color={dark ? "fg.inverted" : "fg.muted"} opacity={dark ? 0.7 : 1}>
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
    <ChDl aria-label={label} m="0" display="grid" gap="0" borderBottomWidth="1px" borderColor="border">
      {letters.map((l) => (
        <Grid
          key={l.letter}
          templateColumns="56px 1fr"
          gap="0"
          alignItems="start"
          py="4"
          borderTopWidth="1px"
          borderColor="border"
        >
          <ChDt fontFamily="heading" fontWeight="700" fontSize="1.625rem" lineHeight="1" color="brand.fg">
            {l.letter}
          </ChDt>
          <ChDd m="0" fontSize="0.9375rem" lineHeight="1.55">
            <Text as="span" fontWeight="500" color="fg">
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
  titleSize = "1.125rem",
}: {
  items: readonly { title: string; text: string }[];
  columns?: 2 | 3;
  headingLevel?: "h3" | "h4";
  /** Figma uses 18px (2 columns) or 17px (3 columns) */
  titleSize?: string;
}) {
  return (
    <Grid
      as="ul"
      listStyle="none"
      m="0"
      p="0"
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: `repeat(${columns}, 1fr)` }}
      columnGap="34px"
      borderTopWidth="1.5px"
      borderColor="fg"
    >
      {items.map((it, i) => (
        <Box as="li" key={it.title} py="26px" borderBottomWidth="1px" borderColor="border" display="flex" flexDirection="column" gap="2">
          <Text aria-hidden="true" fontWeight="600" fontSize="0.75rem" letterSpacing="0.06em" color="brand.fg">
            {String(i + 1).padStart(2, "0")}
          </Text>
          <Heading as={headingLevel} fontFamily="heading" fontWeight="600" fontSize={titleSize} lineHeight="1.3">
            {it.title}
          </Heading>
          <Text color="fg.muted" fontSize="0.9375rem" lineHeight="1.6">
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

/* ------------------------------------------------------------------ */
/* Ministry page section (Figma section rhythm)                         */
/* ------------------------------------------------------------------ */
const toneBg = { white: "bg.canvas", warm: "bg.warm", tint: "bg.tint", ink: "fg" } as const;

/**
 * A ministry page section as drawn in Figma: 96px vertical padding (none on
 * top when it sits straight under the hero), a 40px heading, an optional
 * muted intro (17–19px) 16px below it, and the content `gap` below that.
 */
export function MSection({
  id,
  tone = "white",
  title,
  intro,
  introSize = "1.125rem",
  headGap = "4",
  gap = "7",
  afterHero,
  label,
  children,
}: {
  /** aria-label when the section has no visible title */
  label?: string;
  id?: string;
  tone?: keyof typeof toneBg;
  title?: string;
  intro?: string;
  /** Figma intro size, e.g. "1.0625rem" (17px) or "1.1875rem" (19px) */
  introSize?: string;
  /** space between heading and intro */
  headGap?: string;
  /** space between the heading block and the content */
  gap?: string;
  /** directly under the hero: no top padding */
  afterHero?: boolean;
  children?: React.ReactNode;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <Box
      as="section"
      id={id}
      aria-labelledby={title ? headingId : undefined}
      aria-label={!title ? label : undefined}
      bg={toneBg[tone]}
      pt={afterHero ? "0" : { base: "16", md: "20", lg: "24" }}
      pb={{ base: "16", md: "20", lg: "24" }}
      scrollMarginTop="96px"
    >
      <Container maxW="container" px={{ base: "5", md: "8" }}>
        {title && (
          <Stack gap={headGap} mb={gap} maxW="62rem">
            <Heading as="h2" id={headingId} textStyle="h2">
              {title}
            </Heading>
            {intro && (
              <Text fontSize={{ base: "1.0625rem", md: introSize }} lineHeight="1.55" color="fg.muted" maxW="56rem">
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
