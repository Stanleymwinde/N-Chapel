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
import { ArticleIndex } from "@/components/about/ArticleIndex";
import { CategoryTag, PostCard } from "@/components/blog/PostCard";
import { PostBody, postSections } from "@/components/blog/PostBody";
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
/** The reading column: about 68 characters at body size */
const column = "42rem";
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
      fontWeight="700"
      fontSize={size > 50 ? "1.25rem" : "0.9375rem"}
      letterSpacing="0.02em"
    >
      {initials(name)}
    </ChSpan>
  );
}

function Byline({ post }: { post: Post }) {
  return (
    <HStack gap="3" alignItems="center">
      <Avatar name={post.author} />
      <Box lineHeight="1.35">
        <Text fontWeight="700" color="fg">
          {post.author}
        </Text>
        <Text fontSize="0.9375rem" color="fg.muted" display="flex" flexWrap="wrap" columnGap="2">
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
              <ChSpan fontFamily="heading" fontWeight="700" fontSize="0.8125rem" color="brand.fg" minW="1.5rem">
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

function SeriesLink({ slug }: { slug: string }) {
  const s = getSeries(slug);
  if (!s) return null;
  return (
    <Box
      asChild
      display="grid"
      gridTemplateColumns={{ base: "1fr", sm: "180px minmax(0, 1fr)" }}
      borderRadius="xl"
      overflow="hidden"
      borderWidth="1px"
      borderColor="border"
      bg="bg.canvas"
      color="fg"
      textDecoration="none"
      transition={`border-color 150ms ease, transform 200ms ${EASE}`}
      _active={{ transform: "scale(0.985)" }}
      css={{
        "& .s-photo": { transition: `transform 300ms ${EASE}` },
        "& .s-cta svg": { transition: `transform 200ms ${EASE}` },
        "@media (hover: hover) and (pointer: fine)": {
          "&:hover": { borderColor: "var(--chakra-colors-border-strong)", transform: "translateY(-2px)" },
          "&:hover .s-photo": { transform: "scale(1.03)" },
          "&:hover .s-cta svg": { transform: "translateX(3px)" },
        },
        "@media (prefers-reduced-motion: reduce)": { "&:hover, &:active, &:hover .s-photo, &:hover .s-cta svg": { transform: "none" } },
      }}
    >
      <NextLink href={`/resources/series/${s.slug}`}>
        <Box position="relative" minH={{ base: "160px", sm: "100%" }} overflow="hidden" bg="night.900">
          <Box className="s-photo" position="absolute" inset="0">
            <Img slot={seriesPhoto(s)} decorative sizes="(min-width: 640px) 180px, 100vw" />
          </Box>
        </Box>
        <Stack gap="1.5" p={{ base: "5", md: "6" }}>
          <Text fontSize="0.75rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="fg.muted">
            Go deeper · Bible study series
          </Text>
          <Text fontFamily="heading" fontWeight="700" fontSize="1.25rem" lineHeight="1.25">
            {s.title}
          </Text>
          <Text color="fg.muted" fontSize="0.9375rem">
            Study guides for each week of the series, for eGroups and families.
          </Text>
          <HStack className="s-cta" gap="1.5" pt="1" fontWeight="600" color="brand.fg">
            <span>Open the series</span>
            <ArrowRight size={16} aria-hidden="true" />
          </HStack>
        </Stack>
      </NextLink>
    </Box>
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
  /** One frame for title, photo and text, so every left edge lines up */
  const frame = hasContents ? "62rem" : "52rem";

  return (
    <>
      <ReadingProgress targetId="post-body" />
      <Box as="article" aria-labelledby="post-title">
        {/* Header: what it is, who wrote it, then the photograph */}
        <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }}>
          <Container {...container}>
            <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} tone="light" />
            <Stack gap={{ base: "5", md: "6" }} mt={{ base: "8", md: "12" }} maxW={frame} mx="auto">
              <HStack gap="3" flexWrap="wrap">
                <CategoryTag category={post.category} />
                <HStack gap="1.5" color="brand.fg" fontWeight="600" fontSize="0.9375rem">
                  <BookOpen size={16} aria-hidden="true" />
                  <span>{post.scripture}</span>
                </HStack>
              </HStack>
              <Heading
                as="h1"
                maxW="52rem"
                id="post-title"
                fontFamily="heading"
                fontWeight="700"
                fontSize="clamp(2.125rem, 1.4rem + 3vw, 3.75rem)"
                lineHeight="1.05"
                letterSpacing="-0.025em"
                textWrap="balance"
              >
                {post.title}
              </Heading>
              {post.excerpt && (
                <Text fontSize={{ base: "1.125rem", md: "1.3125rem" }} lineHeight="1.55" color="fg.muted" maxW="44rem" textWrap="pretty">
                  {post.excerpt}
                </Text>
              )}
              <Box pt="1">
                <Byline post={post} />
              </Box>
            </Stack>
            <ViewTransition name={`post-${post.slug}`} share="morph" default="none">
            <Box
              position="relative"
              mt={{ base: "8", md: "12" }}
              maxW={frame}
              mx="auto"
              aspectRatio={{ base: "4 / 3", sm: "16 / 9", lg: "21 / 9" }}
              borderRadius="xl"
              overflow="hidden"
              bg="night.900"
            >
              <Img slot={post.heroImage} priority sizes="(min-width: 1024px) 992px, 100vw" />
            </Box>
            </ViewTransition>
          </Container>
        </Box>

        {/* Body: contents on the left on wide screens, one reading column */}
        <Box bg="bg.canvas" pt={{ base: "10", md: "16" }} pb={{ base: "14", md: "20" }}>
          <Container {...container}>
            <Grid
              templateColumns={hasContents ? { base: "minmax(0, 1fr)", lg: `minmax(0, 15rem) minmax(0, ${column})` } : `minmax(0, ${column})`}
              justifyContent="start"
              maxW={frame}
              mx="auto"
              columnGap={{ lg: "16", xl: "20" }}
            >
              {hasContents && (
                <Box display={{ base: "none", lg: "block" }}>
                  <ArticleIndex items={sections} label="In this post" compact />
                </Box>
              )}
              <Box id="post-body" minW="0">
                {hasContents && <MobileContents items={sections} />}
                <PostBody body={post.body} />

                {/* Close: who wrote it, share, then where to go next */}
                <Stack gap="8" mt={{ base: "14", md: "16" }} pt={{ base: "8", md: "10" }} borderTopWidth="1px" borderColor="border">
                  <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="5">
                    <HStack gap="4">
                      <Avatar name={post.author} size={56} />
                      <Box lineHeight="1.35">
                        <Text fontSize="0.75rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="fg.muted">
                          Written by
                        </Text>
                        <Text fontFamily="heading" fontWeight="700" fontSize="1.25rem">
                          {post.author}
                        </Text>
                        <Text fontSize="0.9375rem" color="fg.muted">
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
                      <ShareWhatsApp title={post.title} path={path} />
                    </HStack>
                  </HStack>
                  {post.relatedSeriesSlug && <SeriesLink slug={post.relatedSeriesSlug} />}
                </Stack>
              </Box>
            </Grid>
          </Container>
        </Box>
      </Box>

      {others.length > 0 && (
        <Box as="section" aria-labelledby="keep-reading" bg="bg.warm" py={{ base: "14", md: "20" }}>
          <Container {...container}>
            <HStack justifyContent="space-between" alignItems="flex-end" mb={{ base: "6", md: "8" }} gap="4" flexWrap="wrap">
              <Heading as="h2" id="keep-reading" textStyle="h3">
                Keep reading
              </Heading>
              <LinkButton href="/blog" variant="link" arrow>
                All posts
              </LinkButton>
            </HStack>
            <ChUl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }} gap={{ base: "5", md: "6" }}>
              {others.map((p) => (
                <ChLi key={p.slug}>
                  <PostCard post={p} />
                </ChLi>
              ))}
            </ChUl>
          </Container>
        </Box>
      )}

      <NextStepBand
        title="Go deeper with others"
        text="Talk about Sunday's message with an eGroup during the week."
        primary={{ label: "Find a group", href: "/get-involved/groups" }}
        secondary={{ label: "Watch sermons", href: "/watch" }}
      />
    </>
  );
}
