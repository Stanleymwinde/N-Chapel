import { notFound } from "next/navigation";
import { Box, Container, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { publications, getPublicationBySlug } from "@content/publications";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/layout/Section";
import { LinkButton } from "@/components/Button";
import { RichText } from "@/components/RichText";
import { PdfDownload } from "@/components/share/PdfPreview";
import { ShareWhatsApp } from "@/components/share/ShareWhatsApp";
import { PublicationCard } from "@/components/publications/PublicationCard";
import { PublicationCover } from "@/components/publications/PublicationCover";
import { pagesLabel, publishedLabel, sizeLabel } from "@/components/publications/meta";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pub = getPublicationBySlug(slug);
  if (!pub) return {};
  return pageMetadata({
    title: pub.title,
    description: pub.description,
    path: `/publications/${pub.slug}`,
    image: pub.coverImage !== "TODO" ? pub.coverImage : undefined,
  });
}

/** Summary shown above the PDF for Our Compass, until the text is supplied from the PDF itself. */
const COMPASS_SUMMARY = [
  { title: "Mission", text: "[TODO: from the Our Compass PDF]" },
  { title: "Vision", text: "[TODO: from the Our Compass PDF]" },
  { title: "Strategic Priorities", text: "[TODO: from the Our Compass PDF]" },
];

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pub = getPublicationBySlug(slug);
  if (!pub) notFound();

  const path = `/publications/${pub.slug}`;
  const facts = [
    { label: "Category", value: pub.category },
    { label: "Year", value: String(pub.year) },
    { label: "Published", value: publishedLabel(pub) },
    { label: "Pages", value: pagesLabel(pub)?.replace(" pages", "") ?? null },
    { label: "File size", value: sizeLabel(pub) },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));
  const fileSize = sizeLabel(pub) ?? undefined;
  const others = publications.filter((o) => o.slug !== pub.slug).sort((a, b) => b.publishDate.localeCompare(a.publishDate)).slice(0, 4);

  return (
    <>
      <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "12", md: "16" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Breadcrumbs items={[{ label: "Publications", href: "/publications" }, { label: pub.title }]} tone="light" />
          <Grid mt={{ base: "6", md: "8" }} templateColumns={{ base: "1fr", md: "minmax(0, 1fr) 340px", lg: "minmax(0, 1fr) 400px" }} gap={{ base: "10", md: "12", lg: "16" }} alignItems="center">
            <Stack gap={{ base: "5", md: "6" }}>
              <Text fontSize="0.875rem" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" color="brand.fg">
                {pub.category}
              </Text>
              <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize="clamp(2.25rem, 1.4rem + 3.4vw, 4rem)" lineHeight="1.05" letterSpacing="-0.02em">
                {pub.title}
              </Heading>
              <Text textStyle="lead" color="fg.muted" maxW="36rem">
                {pub.description}
              </Text>
              <Box as="dl" display="grid" gridTemplateColumns={{ base: "repeat(2, minmax(0, 1fr))", sm: "repeat(3, minmax(0, 1fr))" }} gap="5" pt="5" borderTopWidth="1px" borderColor="border" maxW="36rem">
                {facts.map((f) => (
                  <div key={f.label}>
                    <Text as="dt" fontSize="0.8125rem" fontWeight="600" color="fg.muted">
                      {f.label}
                    </Text>
                    <Text as="dd" m="0" fontWeight="600">
                      {f.value}
                    </Text>
                  </div>
                ))}
              </Box>
              <HStack gap="3" flexWrap="wrap" pt="1">
                <PdfDownload pdfUrl={pub.pdfUrl} title={pub.title} fileSize={fileSize} variant="primary" />
                <ShareWhatsApp title={pub.title} path={path} />
              </HStack>
            </Stack>
            {/* The cover rests on a warm panel, like a book on a table */}
            <Box bg="bg.warm" borderRadius="xl" px={{ base: "10", md: "12" }} py={{ base: "10", md: "14" }} display="flex" justifyContent="center">
              <Box w="full" maxW={{ base: "240px", md: "300px" }}>
                <PublicationCover pub={pub} size="lg" priority />
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>

      {pub.slug === "our-compass" && (
        <Section tone="warm" id="summary" title="In summary">
          <Stack gap={{ base: "8", md: "10" }}>
            <Grid as="ol" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "repeat(3, minmax(0, 1fr))" }} gap={{ base: "8", md: "10" }}>
              {COMPASS_SUMMARY.map((s, i) => (
                <Box as="li" key={s.title} pt="5" borderTopWidth="2px" borderColor="ink.900">
                  <Text aria-hidden="true" fontFamily="heading" fontWeight="600" color="brand.fg" mb="3">
                    {String(i + 1).padStart(2, "0")}
                  </Text>
                  <Heading as="h3" textStyle="h3" mb="3">
                    {s.title}
                  </Heading>
                  <Text color="fg.muted">
                    <RichText text={s.text} />
                  </Text>
                </Box>
              ))}
            </Grid>
            <Box>
              <LinkButton href="/about/compass" variant="secondary">
                Explore Our Compass
              </LinkButton>
            </Box>
          </Stack>
        </Section>
      )}


      <Section tone="warm" id="more" title="More publications">
        <Stack gap="8">
          {others.length > 0 && (
            <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, lg: 2 }} gap="5">
              {others.map((o) => (
                <li key={o.slug}>
                  <PublicationCard pub={o} />
                </li>
              ))}
            </SimpleGrid>
          )}
          <Box>
            <LinkButton href="/publications" variant="secondary">
              All publications
            </LinkButton>
          </Box>
        </Stack>
      </Section>
    </>
  );
}
