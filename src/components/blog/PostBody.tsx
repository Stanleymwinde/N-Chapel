import { Box, Heading, Text } from "@chakra-ui/react";
import type { PostBlock } from "@content/posts";
import { ChBlockquote, ChFigcaption, ChFigure, ChLi, ChOl, ChP, ChSection, ChSpan, ChUl } from "@/components/primitives";

/**
 * A post's body, set for long reading: a lead first paragraph, numbered
 * sections (one per heading, each with an id for the contents list), and
 * distinct treatments for scripture, "from → to" lists, short emphatic
 * lists and the closing prayer, so a sermon of short lines keeps a rhythm.
 */

const bodyText = { fontSize: { base: "1.0625rem", md: "1.1875rem" }, lineHeight: "1.75", color: "fg" } as const;

export const sectionId = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);

/** The headings of a post, for the contents list. */
export function postSections(body: PostBlock[]) {
  return body.filter((b): b is Extract<PostBlock, { type: "heading" }> => b.type === "heading").map((b) => ({ id: sectionId(b.text), title: b.text }));
}

const isArrowList = (items: string[]) => items.length > 1 && items.every((i) => i.includes("→"));
const isShortList = (items: string[]) => items.length <= 5 && items.every((i) => i.length <= 34);

/** A small diamond, the logo's shape, used as a bullet. */
const diamondBullet = {
  position: "relative",
  paddingInlineStart: "1.75rem",
  "&::before": {
    content: '""',
    position: "absolute",
    insetInlineStart: "0.25rem",
    top: "0.72em",
    width: "0.5rem",
    height: "0.5rem",
    background: "var(--chakra-colors-brand-solid)",
    transform: "rotate(45deg)",
  },
} as const;

function List({ items, ordered }: { items: string[]; ordered?: boolean }) {
  if (isArrowList(items)) {
    // "Walking away → running back": the turn, set as from / to rows
    return (
      <ChUl listStyle="none" m="0" p="0" display="grid" gap="0" borderRadius="xl" borderWidth="1px" borderColor="border" overflow="hidden">
        {items.map((item) => {
          const [from, ...rest] = item.split("→");
          return (
            <ChLi
              key={item}
              display="grid"
              gridTemplateColumns="minmax(0, 1fr) auto minmax(0, 1fr)"
              alignItems="center"
              gap={{ base: "3", md: "5" }}
              px={{ base: "4", md: "6" }}
              py="4"
              bg="bg.canvas"
              css={{ "&:not(:last-child)": { borderBottom: "1px solid var(--chakra-colors-border)" } }}
            >
              <ChSpan color="fg.muted" fontSize={{ base: "1rem", md: "1.0625rem" }}>
                {from.trim()}
              </ChSpan>
              <ChSpan aria-hidden="true" color="brand.fg" fontWeight="700" fontSize="1.25rem">
                →
              </ChSpan>
              <ChSpan className="sr-only" css={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                to
              </ChSpan>
              <ChSpan fontFamily="heading" fontWeight="700" fontSize={{ base: "1.0625rem", md: "1.1875rem" }} color="fg">
                {rest.join("→").trim()}
              </ChSpan>
            </ChLi>
          );
        })}
      </ChUl>
    );
  }

  if (!ordered && isShortList(items)) {
    // Short lines read like a litany: one per line, set larger, on a rule
    return (
      <ChUl listStyle="none" m="0" py="1" ps={{ base: "5", md: "6" }} display="grid" gap="2" borderLeftWidth="3px" borderColor="accent.highlight">
        {items.map((item) => (
          <ChLi key={item} fontFamily="heading" fontWeight="600" fontSize={{ base: "1.1875rem", md: "1.3125rem" }} lineHeight="1.4" color="fg">
            {item}
          </ChLi>
        ))}
      </ChUl>
    );
  }

  const L = ordered ? ChOl : ChUl;
  return (
    <L {...bodyText} m="0" p="0" listStyle={ordered ? "decimal" : "none"} ps={ordered ? "6" : "0"} display="grid" gap="3">
      {items.map((item) => (
        <ChLi key={item} css={ordered ? undefined : diamondBullet}>
          {item}
        </ChLi>
      ))}
    </L>
  );
}

function Quote({ text, cite }: { text: string; cite?: string }) {
  return (
    <ChFigure position="relative" my={{ base: "3", md: "5" }} mx="0" px={{ base: "6", md: "10" }} pt={{ base: "10", md: "12" }} pb={{ base: "6", md: "8" }} bg="bg.warm" borderRadius="xl">
      <ChSpan
        aria-hidden="true"
        position="absolute"
        top={{ base: "1", md: "2" }}
        left={{ base: "5", md: "9" }}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize={{ base: "4.5rem", md: "5.5rem" }}
        lineHeight="1"
        color="accent.highlight"
      >
        “
      </ChSpan>
      <ChBlockquote m="0" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.375rem", md: "1.75rem" }} lineHeight="1.3" letterSpacing="-0.01em" color="fg" textWrap="balance">
        {text}
      </ChBlockquote>
      {cite && (
        <ChFigcaption mt="4" fontSize="0.8125rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg">
          {cite}
        </ChFigcaption>
      )}
    </ChFigure>
  );
}

function Prayer({ title, text }: { title?: string; text: string }) {
  const lines = text.split("\n").filter(Boolean);
  return (
    <Box as="aside" aria-label={title ?? "Prayer"} mt={{ base: "4", md: "6" }} p={{ base: "7", md: "10" }} bg="night.900" color="white" borderRadius="xl">
      <Text as="p" fontSize="0.8125rem" fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color="accent.highlight" mb={{ base: "4", md: "5" }}>
        {title ?? "Prayer"}
      </Text>
      <Text as="p" fontSize={{ base: "1.125rem", md: "1.25rem" }} lineHeight="1.55" display="grid" gap={{ base: "2.5", md: "3" }} maxW="36rem">
        {lines.map((line, i) => {
          const last = i === lines.length - 1;
          return (
            <ChSpan key={i} display="block" textWrap="pretty" mt={last ? "2" : "0"} fontFamily={last ? "heading" : undefined} fontWeight={last ? "700" : "400"} color={last ? "accent.highlight" : "rgba(255,255,255,0.92)"}>
              {line}
            </ChSpan>
          );
        })}
      </Text>
    </Box>
  );
}

function Block({ block, lead }: { block: PostBlock; lead?: boolean }) {
  switch (block.type) {
    case "paragraph":
      return lead ? (
        <ChP fontSize={{ base: "1.25rem", md: "1.4375rem" }} lineHeight="1.55" color="fg" fontWeight="500">
          {block.text}
        </ChP>
      ) : (
        <ChP {...bodyText}>{block.text}</ChP>
      );
    case "heading":
      return null; // rendered by the section
    case "list":
      return <List items={block.items} ordered={block.ordered} />;
    case "quote":
      return <Quote text={block.text} cite={block.cite} />;
    case "prayer":
      return <Prayer title={block.title} text={block.text} />;
    case "placeholder":
      return (
        <Box role="note" p="5" borderWidth="1px" borderStyle="dashed" borderColor="border.strong" borderRadius="lg">
          <Text fontWeight="700">Content coming soon</Text>
          <Text color="fg.muted" mt="1">
            {block.text}
          </Text>
        </Box>
      );
  }
}

type Section = { heading?: string; blocks: PostBlock[] };

function split(body: PostBlock[]): Section[] {
  const out: Section[] = [{ blocks: [] }];
  for (const b of body) {
    if (b.type === "heading") out.push({ heading: b.text, blocks: [] });
    else out[out.length - 1].blocks.push(b);
  }
  return out.filter((s) => s.heading || s.blocks.length);
}

const flow = { display: "grid", gap: { base: "5", md: "6" } } as const;

export function PostBody({ body }: { body: PostBlock[] }) {
  const sections = split(body);
  const firstPara = body.findIndex((b) => b.type === "paragraph");
  const leadBlock = firstPara >= 0 ? body[firstPara] : undefined;
  const offset = sections[0]?.heading ? 1 : 0;

  return (
    <Box display="grid" gap={{ base: "12", md: "16" }}>
      {sections.map((s, si) => {
        const content = (
          <Box {...flow}>
            {s.blocks.map((b, i) => (
              <Block key={i} block={b} lead={b === leadBlock} />
            ))}
          </Box>
        );
        if (!s.heading) return <Box key={si}>{content}</Box>;
        const n = si + offset;
        const id = sectionId(s.heading);
        return (
          <ChSection key={si} aria-labelledby={id} display="grid" gap={{ base: "5", md: "6" }} pt={si === 0 ? "0" : { base: "10", md: "12" }} borderTopWidth={si === 0 ? "0" : "1px"} borderColor="border">
            <Box>
              <Text as="p" aria-hidden="true" fontFamily="heading" fontWeight="700" fontSize="0.875rem" letterSpacing="0.08em" color="brand.fg" mb="2">
                {String(n).padStart(2, "0")}
              </Text>
              <Heading as="h2" id={id} scrollMarginTop="150px" fontFamily="heading" fontWeight="700" fontSize={{ base: "1.625rem", md: "2rem" }} lineHeight="1.15" letterSpacing="-0.015em" textWrap="balance">
                {s.heading}
              </Heading>
            </Box>
            {content}
          </ChSection>
        );
      })}
    </Box>
  );
}
