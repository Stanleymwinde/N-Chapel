"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, Button, chakra, Heading, HStack, Input, NativeSelect, SimpleGrid, Text } from "@chakra-ui/react";
import { Search } from "lucide-react";
import type { Post, PostCategory } from "@content/posts";
import { FilterBarChip, FilterBarChips, FilterBarRoot } from "../recipe-parts";
import { PostCard } from "./PostCard";

const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[“”"'’‘]/g, "")
    .replace(/[–—]/g, "-");

type Props = { posts: Post[]; categories: PostCategory[]; authors: string[] };

/**
 * Blog index: the newest post as a large featured card, then the rest in a
 * grid. Filters (?q=&category=&author=) live in the URL so a filtered view
 * can be shared. While any filter is on, every match shows in the grid.
 */
export function BlogFilters({ posts, categories, authors }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "";
  const author = params.get("author") ?? "";

  const [query, setQuery] = useState(q);
  const [lastQ, setLastQ] = useState(q);
  if (q !== lastQ) {
    setLastQ(q);
    setQuery(q);
  }

  const update = (next: Record<string, string>) => {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v) sp.set(k, v);
      else sp.delete(k);
    }
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const filtered = useMemo(() => {
    const tokens = normalise(q).split(/\s+/).filter(Boolean);
    return posts.filter((p) => {
      if (category && p.category !== category) return false;
      if (author && p.author !== author) return false;
      if (tokens.length) {
        const hay = normalise(`${p.title} ${p.scripture}`);
        return tokens.every((t) => hay.includes(t));
      }
      return true;
    });
  }, [posts, q, category, author]);

  const anyFilter = Boolean(q || category || author);
  const [featured, ...rest] = filtered;
  const showFeatured = !anyFilter && featured;
  const grid = showFeatured ? rest : filtered;

  return (
    <Box display="grid" gap={{ base: "12", md: "16" }}>
      {showFeatured && (
        <Box as="section" aria-labelledby="latest-post">
          <Text as="h2" id="latest-post" textStyle="eyebrow" color="brand.fg" mb="4">
            Latest post
          </Text>
          <PostCard post={featured} featured />
        </Box>
      )}

      <Box as="section" aria-labelledby="more-posts">
        {/* Heading on the left, one light toolbar on the right */}
        <HStack justifyContent="space-between" alignItems={{ base: "flex-start", lg: "flex-end" }} flexDirection={{ base: "column", lg: "row" }} gap="5" mb="6" pb="6" borderBottomWidth="1px" borderColor="border">
          <Box>
            <Heading as="h2" id="more-posts" textStyle="h3">
              {showFeatured ? "More posts" : anyFilter ? "Results" : "All posts"}
            </Heading>
            <Text textStyle="small" color="fg.muted" fontWeight="500" aria-live="polite" aria-atomic="true" mt="1">
              {anyFilter
                ? filtered.length === 0
                  ? "No posts found"
                  : `${filtered.length} post${filtered.length === 1 ? "" : "s"} found`
                : `${posts.length} post${posts.length === 1 ? "" : "s"}, newest first`}
            </Text>
          </Box>

          <FilterBarRoot role="search" aria-label="Search and filter blog posts" p="0" bg="transparent" borderWidth="0" w={{ base: "full", lg: "auto" }}>
            <HStack gap="3" flexWrap="wrap" alignItems="center" w="full">
              <FilterBarChips aria-label="Category">
                {(["", ...categories] as const).map((c) => (
                  <li key={c || "all"}>
                    <FilterBarChip type="button" aria-pressed={category === c} onClick={() => update({ category: c })}>
                      {c || "All"}
                    </FilterBarChip>
                  </li>
                ))}
              </FilterBarChips>
              <NativeSelect.Root size="md" w={{ base: "full", sm: "200px" }}>
                <NativeSelect.Field aria-label="Author" value={author} onChange={(e) => update({ author: e.target.value })} bg="bg.canvas" borderColor="border.strong" minH="44px">
                  <option value="">All authors</option>
                  {authors.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <chakra.form
                flex={{ base: "1 1 100%", sm: "1 1 220px" }}
                position="relative"
                onSubmit={(e) => {
                  e.preventDefault();
                  update({ q: query.trim() });
                }}
              >
                <Box position="absolute" left="3" top="50%" transform="translateY(-50%)" color="fg.muted" pointerEvents="none" aria-hidden="true" zIndex="1">
                  <Search size={18} />
                </Box>
                <Input
                  type="search"
                  name="q"
                  aria-label="Search by title or scripture"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (!e.target.value) update({ q: "" });
                  }}
                  onBlur={() => update({ q: query.trim() })}
                  placeholder="Title or scripture, e.g. Psalm 84"
                  minH="44px"
                  ps="10"
                  bg="bg.canvas"
                  borderColor="border.strong"
                />
              </chakra.form>
              {anyFilter && (
                <Button
                  variant="link"
                  onClick={() => {
                    setQuery("");
                    router.replace(pathname, { scroll: false });
                  }}
                >
                  Clear filters
                </Button>
              )}
            </HStack>
          </FilterBarRoot>
        </HStack>

        {grid.length > 0 ? (
          <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, sm: 2, lg: 3 }} gap="6">
            {grid.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </SimpleGrid>
        ) : (
          anyFilter && (
            <Box p="8" borderRadius="lg" borderWidth="1px" borderStyle="dashed" borderColor="border.strong" textAlign="center">
              <Text fontWeight="600">No posts match your search.</Text>
              <Text color="fg.muted" mt="1">
                Try a book of the Bible, fewer words, or clear the filters to see everything.
              </Text>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
}
