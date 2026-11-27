import { Box, Container, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { type PublicationCategory } from "@content/publications";
import { getPublications } from "@/lib/cms";
import { NextStepBand } from "@/components/NextStepBand";
import { IndexHero } from "@/components/blog/IndexHero";
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

export default async function PublicationsPage() {
  const publications = await getPublications();
  const groups = CATEGORIES.map((c) => ({
    ...c,
    items: publications.filter((p) => p.category === c.key).sort((a, b) => b.publishDate.localeCompare(a.publishDate)),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <IndexHero
        introMaxW="600px"
        title="Publications"
        intro="Annual reports, our strategic direction, and leadership and ministry booklets from Nairobi Chapel Ngong Road. Read about each one here, then download the full PDF."
        image="pub.hero"
      />

      {/* One shelf: each category is a row, its label in the left column */}
      <Box as="section" aria-label="All publications" bg="bg.warm" py={{ base: "16", md: "96px" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Stack gap="0" borderBottomWidth="1px" borderColor="border">
            {groups.map((g) => (
              <Grid
                key={g.key}
                as="section"
                aria-labelledby={`cat-${g.key.toLowerCase().replace(/\s+/g, "-")}`}
                templateColumns={{ base: "1fr", lg: "318px 1fr" }}
                gap={{ base: "5", lg: "0" }}
                py="32px"
                borderTopWidth="1px"
                borderColor="border"
              >
                <Stack gap="6px" pt={{ lg: "12px" }}>
                  <Heading as="h2" id={`cat-${g.key.toLowerCase().replace(/\s+/g, "-")}`} fontFamily="heading" fontWeight="600" fontSize={{ base: "1.5rem", md: "1.625rem" }} lineHeight="normal" letterSpacing="-0.005em">
                    {g.title}
                  </Heading>
                  <Text color="fg.muted" fontSize="0.875rem">
                    {g.items.length} {g.items.length === 1 ? "publication" : "publications"}
                  </Text>
                </Stack>
                <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 430px))" }} gap="18px" alignItems="stretch">
                  {g.items.map((p) => (
                    <li key={p.slug}>
                      <PublicationCard pub={p} />
                    </li>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Stack>
        </Container>
      </Box>

      <NextStepBand
        title="Looking for Bible studies and guides?"
        text="Weekly studies, prayer and fasting guides and kids’ material live in the Resource Library."
        primary={{ label: "Open the Resource Library", href: "/resources" }}
        secondary={{ label: "Read the blog", href: "/blog" }}
      />
    </>
  );
}
