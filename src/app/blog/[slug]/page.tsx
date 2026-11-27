import { ViewTransition } from "react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Box, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ArrowRight, BookOpen, ChevronDown, PlayCircle } from "lucide-react";
import { readingTime, sortedPosts, type Post } from "@content/posts";
import { getSeries } from "@content/library/series";
import { seriesPhoto } from "@content/library/photos";
import { pageMetadata } from "@/lib/metadata";
import { formatLongDate } from "@/lib/dates";
import { LinkButton } from "@/components/Button";
import { NextStepBand } from "@/components/NextStepBand";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Img } from "@/components/Img";
import { ShareWhatsApp } from "@/components/share/ShareWhatsApp";
import { CategoryTag, PostCard } from "@/components/blog/PostCard";
import { PostBody, postSections } from "@/components/blog/PostBody";
import { PostContents } from "@/components/blog/PostContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ChA, ChLi, ChOl, ChSpan, ChTime, ChUl } from "@/components/primitives";

export const dynamicParams = false;

export function generateStaticParams() {
  return sortedPosts().map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => sortedPosts().find((p) => p.slug === slug);

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = find(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.excerpt || `${post.title}, by ${post.author}. From the Nairobi Chapel Ngong Road blog.`,
    path: `/blog/${post.slug}`,
    image: post.heroImage,
    type: "article",
  });
}

const container = { maxW: "container", px: { base: "5", md: "8" } } as const;
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

/** "Rev. Gedion Kadu" → "GK" */
const initials = (name: string) =>
  name
    .replace(/^(Rev\.|Pastor|Ps\.|Dr\.|Bishop)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  return (
    <ChSpan
      aria-hidden="true"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      flexShrink="0"
      w={`${size}px`}
      h={`${size}px`}
      borderRadius="full"
      bg="brand.solid"
      color="white"
      fontFamily="heading"
      fontWeight="600"
      fontSize={`${Math.round(size * 0.36)}px`}
    >
      {initials(name)}
    </ChSpan>
  );
}

function Byline({ post }: { post: Post }) {
  return (
    <HStack gap="12px" alignItems="center">
      <Avatar name={post.author} />
      <Box lineHeight="normal" display="grid" gap="2px">
        <Text fontWeight="600" fontSize="0.9375rem" color="fg">
          {post.author}
        </Text>
        <Text fontSize="0.8125rem" color="fg.muted" display="flex" flexWrap="wrap" columnGap="1.5">
          {post.publishDate && (
            <>
              <ChTime dateTime={post.publishDate}>{formatLongDate(post.publishDate as Parameters<typeof formatLongDate>[0])}</ChTime>
              <span aria-hidden="true">·</span>
            </>
          )}
          <span>{readingTime(post)} min read</span>
        </Text>
      </Box>
    </HStack>
  );
}

/** On small screens the contents sit above the text, folded. */
function MobileContents({ items }: { items: { id: string; title: string }[] }) {
  return (
    <Box
      as="details"
      display={{ base: "block", lg: "none" }}
      mb="10"
      borderWidth="1px"
      borderColor="border"
      borderRadius="lg"
      bg="bg.canvas"
      css={{ "&[open] .toc-chevron": { transform: "rotate(180deg)" }, "& summary::-webkit-details-marker": { display: "none" } }}
    >
      <Box as="summary" display="flex" alignItems="center" justifyContent="space-between" gap="3" minH="52px" px="5" cursor="pointer" listStyle="none" fontWeight="600">
        <span>
          In this post{" "}
          <ChSpan color="fg.muted" fontWeight="500">
            · {items.length} sections
          </ChSpan>
        </span>
        <Box as="span" className="toc-chevron" display="inline-flex" transition={`transform 200ms ${EASE}`}>
          <ChevronDown size={18} aria-hidden="true" />
        </Box>
      </Box>
      <ChOl listStyle="none" m="0" px="5" pb="3">
        {items.map((it, i) => (
          <ChLi key={it.id}>
            <ChA href={`#${it.id}`} display="flex" gap="3" alignItems="baseline" minH="44px" py="2.5" color="fg" textDecoration="none" borderTopWidth={i ? "1px" : "0"} borderColor="border">
              <ChSpan fontFamily="heading" fontWeight="600" fontSize="0.8125rem" color="brand.fg" minW="1.5rem">
                {String(i + 1).padStart(2, "0")}
              </ChSpan>
              <span>{it.title}</span>
            </ChA>
          </ChLi>
        ))}
      </ChOl>
    </Box>
  );
}

/** Figma "Series card": tinted panel, photo on the left, "Explore the series" */
function SeriesLink({ slug }: { slug: string }) {
  const s = getSeries(slug);
  if (!s) return null;
  return (
    <Box
      asChild
      display="grid"
      gridTemplateColumns={{ base: "1fr", sm: "216px minmax(0, 1fr)" }}
      columnGap="20px"
      alignItems="center"
      borderRadius="12px"
      overflow="hidden"
      bg="bg.tint"
      color="fg"
      textDecoration="none"
      transition={`transform 200ms ${EASE}`}
      _active={{ transform: "scale(0.985)" }}
      css={{
        "& .s-photo": { transition: `transform 300ms ${EASE}` },
        "& .s-cta svg": { transition: `transform 200ms ${EASE}` },
        "@media (hover: hover) and (pointer: fine)": {
          "&:hover .s-photo": { transform: "scale(1.03)" },
          "&:hover .s-cta": { textDecoration: "underline" },
          "&:hover .s-cta svg": { transform: "translateX(3px)" },
        },
        "@media (prefers-reduced-motion: reduce)": { "&:active, &:hover .s-photo, &:hover .s-cta svg": { transform: "none" } },
      }}
    >
      <NextLink href={`/resources/series/${s.slug}`}>
        <Box position="relative" h={{ base: "160px", sm: "140px" }} overflow="hidden" bg="night.900">
          <Box className="s-photo" position="absolute" inset="0">
            <Img slot={seriesPhoto(s)} decorative sizes="(min-width: 640px) 216px, 100vw" />
          </Box>
        </Box>
        <Stack gap="6px" py="18px" pe="20px" ps={{ base: "20px", sm: "0" }}>
          <Text fontSize="0.625rem" fontWeight="600" letterSpacing="0.06em" textTransform="uppercase" color="brand.fg">
            Go deeper · Sermon series
          </Text>
          <Text fontFamily="heading" fontWeight="600" fontSize="1.25rem" lineHeight="normal">
            {s.title}
          </Text>
          <Text color="fg.muted" fontSize="0.875rem" lineHeight="1.5">
            More sermons, studies and resources from the series this post belongs to.
          </Text>
          <HStack className="s-cta" gap="6px" pt="4px" fontSize="0.875rem" fontWeight="500" color="brand.fg">
            <span>Explore the series</span>
            <ArrowRight size={13} aria-hidden="true" />
          </HStack>
        </Stack>
      </NextLink>
    </Box>
  );
}

/** Who wrote it, and the share button: a ruled row on a short post, a bordered card on a long one */
function AuthorRow({ post, path, boxed }: { post: Post; path: string; boxed: boolean }) {
  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap="4"
      {...(boxed
        ? { borderWidth: "1px", borderColor: "border", borderRadius: "12px", px: "20px", py: "18px" }
        : { borderTopWidth: "1px", borderColor: "border", pt: "24px" })}
    >
      <HStack gap="12px">
        <Avatar name={post.author} size={boxed ? 52 : 48} />
        <Box lineHeight="normal" display="grid" gap="2px">
          <Text fontSize="0.625rem" fontWeight="600" letterSpacing="0.06em" textTransform="uppercase" color="fg.muted">
            Written by
          </Text>
          <Text fontWeight="600" fontSize="1rem">
            {post.author}
          </Text>
          <Text fontSize="0.8125rem" color="fg.muted">
            Nairobi Chapel Ngong Road
          </Text>
        </Box>
      </HStack>
      <HStack gap="3" flexWrap="wrap">
        {post.sermonVideoUrl && (
          <LinkButton href={post.sermonVideoUrl} variant="primary" external icon={<PlayCircle aria-hidden="true" />}>
            Watch the sermon
          </LinkButton>
        )}
        <ShareWhatsApp title={post.title} path={path} compact />
      </HStack>
    </HStack>
  );
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const all = sortedPosts();
  const post = all.find((p) => p.slug === slug);
  if (!post) notFound();
  const others = all.filter((p) => p.slug !== post.slug).slice(0, 2);
  const path = `/blog/${post.slug}`;
  const sections = postSections(post.body);
  const hasContents = sections.length >= 3;

  return (
    <>
      <ReadingProgress targetId="post-body" />
      <Box as="article" aria-labelledby="post-title" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "16", md: "96px" }}>
        <Container {...container}>
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} tone="light" />

          {/* Header: what it is, who wrote it */}
          <Stack as="header" gap="20px" pt={{ base: "8", md: "36px" }} pb={{ base: "8", md: "36px" }}>
            <HStack gap="10px" flexWrap="wrap">
              <CategoryTag category={post.category} />
              <HStack gap="5px" color="brand.fg" fontWeight="500" fontSize="0.8125rem">
                <BookOpen size={13} aria-hidden="true" />
                <span>{post.scripture}</span>
              </HStack>
            </HStack>
            <Heading
              as="h1"
              id="post-title"
              maxW="984px"
              fontFamily="heading"
              fontWeight="600"
              fontSize={{ base: "2.25rem", md: "3rem", lg: "3.75rem" }}
              lineHeight="1.08"
              letterSpacing="-0.015em"
              textWrap="balance"
            >
              {post.title}
            </Heading>
            {post.excerpt && (
              <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.55" color="fg.muted" maxW="864px" textWrap="pretty">
                {post.excerpt}
              </Text>
            )}
            <Byline post={post} />
          </Stack>

          {/* The photograph, full container width */}
          <ViewTransition name={`post-${post.slug}`} share="morph" default="none">
            <Box
              position="relative"
              h={{ base: "auto", md: hasContents ? "440px" : "400px" }}
              aspectRatio={{ base: "4 / 3", sm: "16 / 9", md: "auto" }}
              borderRadius="12px"
              overflow="hidden"
              bg="night.900"
            >
              <Img slot={post.heroImage} priority sizes="(min-width: 1264px) 1200px, 100vw" />
            </Box>
          </ViewTransition>

          {/* Body: contents on the left of long posts, then the text */}
          <Grid
            templateColumns={hasContents ? { base: "minmax(0, 1fr)", lg: "288px minmax(0, 1fr)" } : "minmax(0, 1fr)"}
            columnGap="80px"
            pt={{ base: "10", md: hasContents ? "56px" : "44px" }}
            pe={hasContents ? undefined : { lg: "120px" }}
          >
            {hasContents && (
              <Box display={{ base: "none", lg: "block" }}>
                <PostContents items={sections} />
              </Box>
            )}
            <Box id="post-body" minW="0">
              {hasContents && <MobileContents items={sections} />}
              <PostBody body={post.body} />

              {/* Close: who wrote it, share, then where to go next */}
              <Stack gap="20px" mt={hasContents ? "8px" : "22px"}>
                <AuthorRow post={post} path={path} boxed={hasContents} />
                {post.relatedSeriesSlug && <SeriesLink slug={post.relatedSeriesSlug} />}
              </Stack>
            </Box>
          </Grid>
        </Container>
      </Box>

      {others.length > 0 && (
        <Box as="section" aria-labelledby="keep-reading" bg="bg.warm" py={{ base: "16", md: "96px" }}>
          <Container {...container}>
            <HStack justifyContent="space-between" alignItems="center" mb="28px" gap="4" flexWrap="wrap">
              <Heading as="h2" id="keep-reading" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.625rem", md: "1.875rem" }} lineHeight="normal" letterSpacing="-0.005em">
                Keep reading
              </Heading>
              <LinkButton href="/blog" variant="link" arrow>
                All posts
              </LinkButton>
            </HStack>
            <ChUl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }} gap="24px">
              {others.map((p) => (
                <ChLi key={p.slug}>
                  <PostCard post={p} photoHeight="240px" />
                </ChLi>
              ))}
            </ChUl>
          </Container>
        </Box>
      )}

      <NextStepBand
        title="Go deeper with others"
        text="Talk about Sunday’s message with an eGroup during the week."
        primary={{ label: "Find a group", href: "/get-involved/groups" }}
        secondary={{ label: "Watch sermons", href: "/watch" }}
      />
    </>
  );
}
