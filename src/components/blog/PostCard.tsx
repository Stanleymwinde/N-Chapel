import { ViewTransition } from "react";
import NextLink from "next/link";
import { Box, Heading, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { readingTime, type Post } from "@content/posts";
import { Img } from "@/components/Img";
import { ChSpan, ChTime } from "@/components/primitives";
import { formatLongDate } from "@/lib/dates";

type Props = {
  post: Post;
  featured?: boolean;
  headingLevel?: "h2" | "h3";
  /** photo height on wide screens (Figma: 190px in the blog grid, 240px under a post) */
  photoHeight?: string;
};

/** "Rev. Liz Mang’eli · Haggai 1 · 4 min read · 12 March 2026" (no date when unknown) */
export function PostMeta({ post }: { post: Post }) {
  const parts: React.ReactNode[] = [
    <ChSpan key="a" fontWeight="500" color="fg">
      {post.author}
    </ChSpan>,
    <ChSpan key="s">{post.scripture}</ChSpan>,
    <ChSpan key="r">{readingTime(post)} min read</ChSpan>,
  ];
  if (post.publishDate) {
    parts.push(
      <ChTime key="d" dateTime={post.publishDate}>
        {formatLongDate(post.publishDate as Parameters<typeof formatLongDate>[0])}
      </ChTime>,
    );
  }
  return (
    <Text as="p" fontSize="0.8125rem" lineHeight="1.4" color="fg.muted" display="flex" flexWrap="wrap" columnGap="2" rowGap="1">
      {parts.map((p, i) => (
        <ChSpan key={i} display="inline-flex" gap="2">
          {i > 0 && <span aria-hidden="true">·</span>}
          {p}
        </ChSpan>
      ))}
    </Text>
  );
}

/** Figma "Category": a gold pill, 12px medium */
export function CategoryTag({ category }: { category: Post["category"] }) {
  return (
    <ChSpan
      display="inline-block"
      alignSelf="flex-start"
      px="10px"
      py="4px"
      borderRadius="full"
      bg="accent.highlight"
      color="accent.contrast"
      fontSize="0.75rem"
      fontWeight="500"
      lineHeight="normal"
    >
      {category}
    </ChSpan>
  );
}

/** The card's "Read article" button. Decorative: the stretched title link is the real target. */
function ReadButton({ featured }: { featured?: boolean }) {
  return (
    <ChSpan
      className="post-card-cta"
      aria-hidden="true"
      display="inline-flex"
      alignItems="center"
      alignSelf="flex-start"
      gap="8px"
      borderRadius="full"
      fontWeight="600"
      lineHeight="normal"
      whiteSpace="nowrap"
      transition="background-color 150ms ease"
      {...(featured
        ? { bg: "brand.solid", color: "brand.contrast", ps: "22px", pe: "20px", py: "12px", fontSize: "0.9375rem" }
        : { borderWidth: "1.5px", borderColor: "brand.solid", color: "brand.fg", ps: "18px", pe: "16px", py: "9px", fontSize: "0.875rem" })}
    >
      Read article
      <ArrowRight size={featured ? 15 : 14} />
    </ChSpan>
  );
}

/**
 * Blog card (Figma "Post" / "Latest post"). The title link is stretched over
 * the whole card, so the card is one tab stop and one click target.
 * `featured` lays the photo beside the text.
 */
export function PostCard({ post, featured, headingLevel = "h3", photoHeight = "190px" }: Props) {
  const href = `/blog/${post.slug}`;
  return (
    <Box
      as="article"
      position="relative"
      display="grid"
      gridTemplateColumns={featured ? { base: "1fr", md: "minmax(0, 614fr) minmax(0, 584fr)" } : "1fr"}
      gridTemplateRows={featured ? undefined : "auto 1fr"}
      alignItems={featured ? "center" : undefined}
      h="full"
      bg="bg.canvas"
      borderWidth="1px"
      borderColor="border"
      borderRadius={featured ? "12px" : "10px"}
      overflow="hidden"
      transition="border-color 150ms ease, transform 200ms cubic-bezier(0.23, 1, 0.32, 1)"
      _focusWithin={{ outline: "3px solid", outlineColor: "brand.solid", outlineOffset: "2px" }}
      css={{
        "@media (hover: hover) and (pointer: fine)": {
          "&:hover": { borderColor: "var(--chakra-colors-border-strong)", transform: "translateY(-2px)" },
          "&:hover .post-card-title": { textDecoration: "underline", textUnderlineOffset: "0.15em" },
          "&:hover .post-card-cta": featured ? { backgroundColor: "var(--chakra-colors-brand-hover)" } : { backgroundColor: "var(--chakra-colors-brand-subtle)" },
        },
        "@media (prefers-reduced-motion: reduce)": { "&:hover": { transform: "none" } },
      }}
    >
      <ViewTransition name={`post-${post.slug}`} share="morph" default="none">
        <Box
          position="relative"
          alignSelf="stretch"
          h={featured ? { base: "auto", md: "100%" } : { base: "auto", md: photoHeight }}
          minH={featured ? { md: "410px" } : undefined}
          aspectRatio={featured ? { base: "16 / 9", md: "auto" } : { base: "16 / 9", md: "auto" }}
          borderRadius={featured ? "12px" : undefined}
          overflow="hidden"
          bg="bg.tint"
        >
          <Img
            slot={post.heroImage}
            decorative
            priority={featured}
            sizes={featured ? "(min-width: 768px) 614px, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
          />
        </Box>
      </ViewTransition>
      <Box
        display="flex"
        flexDirection="column"
        gap={featured ? "16px" : "12px"}
        p={featured ? { base: "5", md: "36px" } : undefined}
        pt={featured ? undefined : "20px"}
        px={featured ? undefined : "20px"}
        pb={featured ? undefined : "22px"}
      >
        <CategoryTag category={post.category} />
        <Heading
          as={headingLevel}
          fontFamily="heading"
          fontWeight="600"
          fontSize={featured ? { base: "1.75rem", md: "2rem", lg: "2.375rem" } : "1.1875rem"}
          lineHeight={featured ? "1.12" : "1.25"}
          letterSpacing={featured ? "-0.005em" : undefined}
        >
          <NextLink href={href} className="post-card-title" style={{ color: "inherit", textDecoration: "none", outline: "none" }}>
            <ChSpan position="static" _after={{ content: '""', position: "absolute", inset: "0", zIndex: "1" }}>
              {post.title}
            </ChSpan>
          </NextLink>
        </Heading>
        {featured && (
          <Text color="fg.muted" fontSize="1rem" lineHeight="1.6">
            {post.excerpt}
          </Text>
        )}
        <Box mt={featured ? undefined : "auto"}>
          <PostMeta post={post} />
        </Box>
        <Box pt={featured ? "6px" : "4px"}>
          <ReadButton featured={featured} />
        </Box>
      </Box>
    </Box>
  );
}
