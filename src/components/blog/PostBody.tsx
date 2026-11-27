import { Box, Heading, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import type { PostBlock } from "@content/posts";
import { ChBlockquote, ChFigcaption, ChFigure, ChLi, ChOl, ChP, ChSection, ChSpan, ChStrong, ChUl } from "@/components/primitives";

/**
 * A post's body, set as in the Figma post templates: a lead first paragraph,
 * numbered sections (one per heading, each with an id for the contents
 * list) divided by rules, and distinct treatments for scripture, "from → to"
 * comparisons, short emphatic lists and the closing prayer.
 */

const bodyText = { fontSize: "1.0625rem", lineHeight: "1.7", color: "fg" } as const;

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

/** "**Nostalgia:** Some elders…" → a bold lead-in, then the rest */
function ItemText({ text }: { text: string }) {
  const m = /^\*\*(.+?)\*\*\s*([\s\S]*)$/.exec(text);
  if (!m) return <>{text}</>;
  return (
    <>
      <ChStrong fontWeight="600">{m[1]}</ChStrong> {m[2]}
    </>
  );
}

function List({ items, ordered }: { items: string[]; ordered?: boolean }) {
  if (isArrowList(items)) {
    // Figma "Comparison": "Walking away → running back", one row each, alternate rows warm
    return (
      <ChUl listStyle="none" m="0" p="0" borderRadius="10px" borderWidth="1px" borderColor="border" overflow="hidden">
        {items.map((item, i) => {
          const [from, ...rest] = item.split("→");
          return (
            <ChLi
              key={item}
              display="grid"
              gridTemplateColumns={{ base: "minmax(0, 1fr) 16px minmax(0, 1fr)", sm: "minmax(0, 264px) 16px minmax(0, 1fr)" }}
              alignItems="center"
              gap="16px"
              px="20px"
              py="14px"
              bg={i % 2 === 0 ? "bg.warm" : "bg.canvas"}
              fontSize="0.9375rem"
              lineHeight="1.3"
            >
              <ChSpan color="fg.muted">{from.trim()}</ChSpan>
              <ChSpan aria-hidden="true" color="brand.fg" display="inline-flex">
                <ArrowRight size={16} />
              </ChSpan>
              <ChSpan position="absolute" width="1px" height="1px" overflow="hidden" css={{ clip: "rect(0 0 0 0)" }}>
                to
              </ChSpan>
              <ChSpan fontWeight="600" color="brand.fg">
                {rest.join("→").trim()}
              </ChSpan>
            </ChLi>
          );
        })}
      </ChUl>
    );
  }

  if (!ordered && isShortList(items)) {
    // Figma "Emphasis list": short lines on a gold rule
    return (
      <ChUl listStyle="none" m="0" py="2px" ps="16px" display="grid" gap="6px" borderLeftWidth="3px" borderColor="accent.highlight">
        {items.map((item) => (
          <ChLi key={item} fontWeight="600" fontSize="1.0625rem" lineHeight="1.3" color="fg">
            {item}
          </ChLi>
        ))}
      </ChUl>
    );
  }

  if (ordered) {
    return (
      <ChOl {...bodyText} m="0" ps="6" listStyle="decimal" display="grid" gap="8px">
        {items.map((item) => (
          <ChLi key={item} ps="1" css={{ "&::marker": { color: "var(--chakra-colors-brand-fg)", fontWeight: 700 } }}>
            <ItemText text={item} />
          </ChLi>
        ))}
      </ChOl>
    );
  }

  // Figma "List": a purple bullet, 12px from the text
  return (
    <ChUl {...bodyText} m="0" p="0" ps="4px" listStyle="none" display="grid" gap="8px">
      {items.map((item) => (
        <ChLi key={item} display="flex" gap="12px" alignItems="flex-start">
          <ChSpan aria-hidden="true" color="brand.fg" fontWeight="700" flexShrink="0">
            •
          </ChSpan>
          <ChSpan flex="1" minW="0">
            <ItemText text={item} />
          </ChSpan>
        </ChLi>
      ))}
    </ChUl>
  );
}

/** Figma "Quote": warm panel, gold quote mark, 24px semibold verse, reference below */
function Quote({ text, cite }: { text: string; cite?: string }) {
  return (
    <ChFigure m="0" display="flex" flexDirection="column" gap="12px" px={{ base: "6", md: "32px" }} py="28px" bg="bg.warm" borderRadius="12px">
      <ChSpan aria-hidden="true" fontFamily="heading" fontWeight="700" fontSize="3.75rem" lineHeight="0.6" color="accent.highlight" pt="10px" h="36px">
        “
      </ChSpan>
      <ChBlockquote m="0" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.25rem", md: "1.5rem" }} lineHeight="1.35" color="fg">
        {text}
      </ChBlockquote>
      {cite && (
        <ChFigcaption fontSize="0.8125rem" fontWeight="500" color="fg.muted">
          {cite}
        </ChFigcaption>
      )}
    </ChFigure>
  );
}

/** Figma "Prayer": a dark panel, gold label, white lines, "Amen." in gold */
function Prayer({ title, text }: { title?: string; text: string }) {
  const lines = text.split("\n").filter(Boolean);
  const last = lines.length > 1 && /^amen\.?$/i.test(lines[lines.length - 1].trim()) ? lines.pop() : undefined;
  return (
    <Box as="aside" aria-label={title ?? "Prayer"} display="flex" flexDirection="column" gap="12px" px={{ base: "6", md: "32px" }} pt="28px" pb="30px" bg="night.900" color="white" borderRadius="12px">
      <Text as="p" fontSize="0.6875rem" fontWeight="600" letterSpacing="0.08em" textTransform="uppercase" color="accent.highlight">
        {title ?? "Prayer"}
      </Text>
      <Text as="p" fontSize="1.0625rem" lineHeight="1.75" color="white">
        {lines.map((line, i) => (
          <ChSpan key={i} display="block">
            {line}
          </ChSpan>
        ))}
      </Text>
      {last && (
        <Text as="p" fontSize="1.0625rem" fontWeight="600" color="accent.highlight">
          {last}
        </Text>
      )}
    </Box>
  );
}

function Block({ block, lead, leadTone }: { block: PostBlock; lead?: boolean; leadTone: "strong" | "plain" }) {
  switch (block.type) {
    case "paragraph":
      if (lead) {
        return leadTone === "strong" ? (
          <ChP fontSize={{ base: "1.25rem", md: "1.375rem" }} lineHeight="1.35" fontWeight="600" color="fg">
            {block.text}
          </ChP>
        ) : (
          <ChP fontSize={{ base: "1.1875rem", md: "1.3125rem" }} lineHeight="1.6" color="fg">
            {block.text}
          </ChP>
        );
      }
      return (
        <ChP {...bodyText} fontWeight={block.emphasis ? "600" : undefined}>
          {block.text}
        </ChP>
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

export function PostBody({ body }: { body: PostBlock[] }) {
  const sections = split(body);
  const hasHeadings = sections.some((s) => s.heading);
  const firstPara = body.findIndex((b) => b.type === "paragraph");
  // Only a post that opens with text (before any heading) gets a lead paragraph
  const leadBlock = firstPara >= 0 && !sections[0]?.heading ? body[firstPara] : undefined;
  const offset = sections[0]?.heading ? 1 : 0;
  const leadTone = hasHeadings ? "strong" : "plain";

  // A short devotional without headings: one column, 22px between blocks
  if (!hasHeadings) {
    return (
      <Box display="grid" gap="22px">
        {sections[0]?.blocks.map((b, i) => (
          <Block key={i} block={b} lead={b === leadBlock} leadTone={leadTone} />
        ))}
      </Box>
    );
  }

  return (
    <Box>
      {sections.map((s, si) => {
        const first = si === 0;
        const last = si === sections.length - 1;
        const frame = {
          display: "grid",
          gap: "20px",
          pt: first ? "0" : "48px",
          pb: "48px",
          borderBottomWidth: last ? "0" : "1px",
          borderColor: "border",
        } as const;
        const content = s.blocks.map((b, i) => <Block key={i} block={b} lead={b === leadBlock} leadTone={leadTone} />);
        if (!s.heading) return <Box key={si} {...frame}>{content}</Box>;
        const n = si + offset;
        const id = sectionId(s.heading);
        return (
          <ChSection key={si} aria-labelledby={id} {...frame}>
            <Box display="grid" gap="8px">
              <Text as="p" aria-hidden="true" fontFamily="heading" fontWeight="600" fontSize="0.8125rem" letterSpacing="0.04em" color="brand.fg">
                {String(n).padStart(2, "0")}
              </Text>
              <Heading as="h2" id={id} scrollMarginTop="150px" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.625rem", md: "1.875rem" }} lineHeight="1.2" letterSpacing="-0.005em" textWrap="balance">
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
