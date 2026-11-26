import { Box, Container, Grid, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { publications, type PublicationCategory } from "@content/publications";
import { NextStepBand } from "@/components/NextStepBand";
import { LibraryHero } from "@/components/library/LibraryHero";
import { PublicationCard } from "@/components/publications/PublicationCard";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Publications",
  description: "Annual reports, strategy documents and guides from Nairobi Chapel Ngong Road, to read online or download.",
  path: "/publications",
});

/** Display order of categories; a category with no publications is not shown. */
const CATEGORIES: { key: PublicationCategory; title: string }[] = [
  { key: "Annual Report", title: "Annual reports" },
  { key: "Strategy", title: "Strategy" },
  { key: "Leadership", title: "Leadership" },
  { key: "Ministry", title: "Ministries" },
];

export default function PublicationsPage() {
  const groups = CATEGORIES.map((c) => ({
    ...c,
    items: publications.filter((p) => p.category === c.key).sort((a, b) => b.publishDate.localeCompare(a.publishDate)),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <LibraryHero
        crumbs={[{ label: "Publications" }]}
        display
        title="Publications"
        intro="Annual reports, our strategic direction, and leadership and ministry booklets from Nairobi Chapel Ngong Road. Read about each one here, then download the full PDF."
        image="pub.hero"
      />

      {/* One shelf: each category is a row, its label in the left column */}
      <Box as="section" aria-label="All publications" bg="bg.warm" py={{ base: "12", md: "20" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Stack gap="0" borderTopWidth="1px" borderColor="border.strong">
            {groups.map((g) => (
              <Grid
                key={g.key}
                as="section"
                aria-labelledby={`cat-${g.key.toLowerCase().replace(/s+/g, "-")}`}
                templateColumns={{ base: "1fr", lg: "260px 1fr" }}
                gap={{ base: "5", lg: "10" }}
                py={{ base: "8", md: "10" }}
                borderBottomWidth="1px"
                borderColor="border.strong"
              >
                <Stack gap="1">
                  <Heading as="h2" id={`cat-${g.key.toLowerCase().replace(/s+/g, "-")}`} fontFamily="heading" fontWeight="700" fontSize={{ base: "1.5rem", md: "1.75rem" }} lineHeight="1.15">
                    {g.title}
                  </Heading>
                  <Text color="fg.muted" fontSize="0.9375rem">
                    {g.items.length} {g.items.length === 1 ? "publication" : "publications"}
                  </Text>
                </Stack>
                <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, xl: 2 }} gap="5">
                  {g.items.map((p) => (
                    <li key={p.slug}>
                      <PublicationCard pub={p} />
                    </li>
                  ))}
                </SimpleGrid>
              </Grid>
            ))}
          </Stack>
        </Container>
      </Box>

      <NextStepBand
        tone="night"
        title="Looking for Bible studies and guides?"
        text="Weekly studies, prayer and fasting guides and kids' material live in the Resource Library."
        primary={{ label: "Open the Resource Library", href: "/resources" }}
        secondary={{ label: "Read the blog", href: "/blog" }}
      />
    </>
  );
}
