import { Suspense } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { sortedPosts, type PostCategory } from "@content/posts";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/layout/Section";
import { NextStepBand } from "@/components/NextStepBand";
import { LibraryHero } from "@/components/library/LibraryHero";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { PostCard } from "@/components/blog/PostCard";

export const metadata = pageMetadata({
  title: "Blog",
  description: "Sermon notes and devotionals from the pastors of Nairobi Chapel Ngong Road, to help you keep thinking about Sunday's message through the week.",
  path: "/blog",
});


/* Shown before the filters hydrate (and without JavaScript): the same layout, unfiltered. */
function StaticList({ posts }: { posts: ReturnType<typeof sortedPosts> }) {
  const [featured, ...rest] = posts;
  return (
    <Box display="grid" gap={{ base: "8", md: "10" }}>
      {featured && <PostCard post={featured} featured />}
      <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, sm: 2, lg: 3 }} gap="5">
        {rest.map((p) => (
          <li key={p.slug}>
            <PostCard post={p} />
          </li>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default function BlogPage() {
  const posts = sortedPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category))) as PostCategory[];
  const authors = Array.from(new Set(posts.map((p) => p.author))).sort((a, b) => a.localeCompare(b));

  return (
    <>
      <LibraryHero
        crumbs={[{ label: "Blog" }]}
        display
        title="Blog"
        intro="Sermon notes and devotionals from our pastors, to help you keep thinking about Sunday's message through the week."
        image="blog.index"
      />

      <Section tone="warm" id="posts" label="Blog posts">
        <Suspense fallback={<StaticList posts={posts} />}>
          <BlogFilters posts={posts} categories={categories} authors={authors} />
        </Suspense>
      </Section>

      <NextStepBand
        title="Hear the full message"
        text="Most posts follow a sermon. Watch the sermons online."
        primary={{ label: "Watch sermons", href: "/watch" }}
        secondary={{ label: "Browse resources", href: "/resources" }}
      />
    </>
  );
}
