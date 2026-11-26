import { ViewTransition } from "react";
import NextLink from "next/link";
import { Box, Heading, Text } from "@chakra-ui/react";
import { readingTime, type Post } from "@content/posts";
import { Img } from "@/components/Img";
import { ChSpan, ChTime } from "@/components/primitives";
import { formatLongDate } from "@/lib/dates";

type Props = { post: Post; featured?: boolean; headingLevel?: "h2" | "h3" };

/** "Rev. Liz Mang’eli · Haggai 1 · 6 min read · 12 March 2026" (no date when unknown) */
export function PostMeta({ post }: { post: Post }) {
  const parts: React.ReactNode[] = [
    <ChSpan key="a" fontWeight="600" color="fg">
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
    <Text as="p" textStyle="small" color="fg.muted" display="flex" flexWrap="wrap" columnGap="2" rowGap="1">
      {parts.map((p, i) => (
        <ChSpan key={i} display="inline-flex" gap="2">
          {i > 0 && <span aria-hidden="true">·</span>}
          {p}
        </ChSpan>
      ))}
    </Text>
  );
}

export function CategoryTag({ category }: { category: Post["category"] }) {
  return (
    <ChSpan
      display="inline-block"
      alignSelf="flex-start"
      px="3"
      py="1"
      borderRadius="full"
      bg="accent.highlight"
      color="accent.contrast"
      fontSize="0.8125rem"
      fontWeight="700"
      letterSpacing="0.02em"
    >
      {category}
    </ChSpan>
  );
}

/**
 * Blog card. The title link is stretched over the whole card, so the card is
 * one tab stop and one click target. `featured` lays out image beside text.
 */
export function PostCard({ post, featured, headingLevel = "h3" }: Props) {
  const href = `/blog/${post.slug}`;
  return (
    <Box
      as="article"
      position="relative"
      display="grid"
      gridTemplateColumns={featured ? { base: "1fr", md: "1.25fr 1fr" } : "1fr"}
      gridTemplateRows={featured ? undefined : "auto 1fr"}
      h="full"
      bg="bg.canvas"
      borderWidth="1px"
      borderColor="border"
      borderRadius="lg"
      overflow="hidden"
      transition="border-color 150ms ease, transform 200ms cubic-bezier(0.23, 1, 0.32, 1)"
      _focusWithin={{ outline: "3px solid", outlineColor: "brand.solid", outlineOffset: "2px" }}
      css={{
        "@media (hover: hover) and (pointer: fine)": {
          "&:hover": { borderColor: "var(--chakra-colors-border-strong)", transform: "translateY(-2px)" },
          "&:hover .post-card-title": { textDecoration: "underline", textUnderlineOffset: "0.15em" },
        },
      }}
    >
      <ViewTransition name={`post-${post.slug}`} share="morph" default="none">
      <Box position="relative" aspectRatio={featured ? { base: "16 / 9", md: "auto" } : "16 / 9"} minH={featured ? { md: "320px" } : undefined} bg="bg.tint">
        <Img
          slot={post.heroImage}
          decorative
          priority={featured}
          sizes={featured ? "(min-width: 768px) 640px, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
        />
      </Box>
      </ViewTransition>
      <Box display="flex" flexDirection="column" gap="3" p={featured ? { base: "5", md: "8", lg: "10" } : "5"} justifyContent={featured ? "center" : "flex-start"}>
        <CategoryTag category={post.category} />
        <Heading
          as={headingLevel}
          fontFamily="heading"
          fontWeight="700"
          fontSize={featured ? "clamp(1.625rem, 1.2rem + 1.8vw, 2.5rem)" : "1.375rem"}
          lineHeight="1.15"
          letterSpacing="-0.01em"
        >
          <NextLink
            href={href}
            className="post-card-title"
            style={{ color: "inherit", textDecoration: "none", outline: "none" }}
          >
            <ChSpan position="static" _after={{ content: '""', position: "absolute", inset: "0", zIndex: "1" }}>
              {post.title}
            </ChSpan>
          </NextLink>
        </Heading>
        {featured && (
          <Text color="fg.muted" fontSize={{ base: "1rem", md: "1.125rem" }} lineHeight="1.6" maxW="38rem">
            {post.excerpt}
          </Text>
        )}
        <Box mt={featured ? "1" : "auto"}>
          <PostMeta post={post} />
        </Box>
      </Box>
    </Box>
  );
}
