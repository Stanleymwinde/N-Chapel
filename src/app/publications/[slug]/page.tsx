import { notFound } from "next/navigation";
import { Box, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
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
    // Figma shows "TBC" while the file size is unknown
    { label: "File size", value: sizeLabel(pub) ?? "TBC" },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));
  const fileSize = sizeLabel(pub) ?? undefined;
  const others = publications.filter((o) => o.slug !== pub.slug).sort((a, b) => b.publishDate.localeCompare(a.publishDate)).slice(0, 4);

  return (
    <>
      <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "16", md: "96px" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Breadcrumbs items={[{ label: "Publications", href: "/publications" }, { label: pub.title }]} tone="light" />
          <Grid mt="32px" templateColumns={{ base: "1fr", md: "minmax(0, 1fr) 320px", lg: "minmax(0, 696px) 414px" }} justifyContent="space-between" columnGap={{ base: "10", lg: "12" }} rowGap="10" alignItems="center">
            <Stack gap="22px" alignItems="flex-start">
              <Text fontSize="0.8125rem" fontWeight="600" letterSpacing="0.06em" textTransform="uppercase" color="brand.fg" lineHeight="normal">
                {pub.category}
              </Text>
              <Heading as="h1" fontFamily="heading" fontWeight="600" fontSize={{ base: "2.25rem", md: "3rem", lg: "3.625rem" }} lineHeight="1.06" letterSpacing="-0.015em">
                {pub.title}
              </Heading>
              <Text fontSize={{ base: "1.125rem", md: "1.25rem" }} lineHeight="1.65" color="fg.muted" maxW="600px">
                {pub.description}
              </Text>
              <Box w="full" maxW="500px" h="1px" bg="border" />
              <Box as="dl" display="grid" gridTemplateColumns={{ base: "repeat(2, minmax(0, 1fr))", sm: "repeat(3, 204px)" }} rowGap="20px" m="0">
                {facts.map((f) => (
                  <Box key={f.label} display="grid" gap="4px" lineHeight="normal">
                    <Text as="dt" fontSize="0.75rem" color="fg.muted">
                      {f.label}
                    </Text>
                    <Text as="dd" m="0" fontSize="1.0625rem" color="fg">
                      {f.value}
                    </Text>
                  </Box>
                ))}
              </Box>
              <HStack gap="12px" flexWrap="wrap">
                <PdfDownload pdfUrl={pub.pdfUrl} title={pub.title} fileSize={fileSize} variant="primary" />
                <ShareWhatsApp title={pub.title} path={path} />
              </HStack>
            </Stack>
            <Box w="full" maxW={{ base: "320px", md: "none" }} mx={{ base: "auto", md: "0" }}>
              <PublicationCover pub={pub} size="lg" design="flat" priority />
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


      <Box as="section" aria-labelledby="more-publications" bg="bg.warm" py={{ base: "16", md: "96px" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
        <Stack gap="32px">
          <Heading as="h2" id="more-publications" fontFamily="heading" fontWeight="600" fontSize={{ base: "2rem", md: "2.75rem", lg: "3.25rem" }} lineHeight="normal" letterSpacing="-0.015em">
            More publications
          </Heading>
          {others.length > 0 && (
            <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", lg: "repeat(2, minmax(0, 1fr))" }} gap="18px">
              {others.map((o) => (
                <li key={o.slug}>
                  <PublicationCard pub={o} roomy />
                </li>
              ))}
            </Grid>
          )}
          <Box>
            <LinkButton href="/publications" variant="secondary">
              All publications
            </LinkButton>
          </Box>
        </Stack>
        </Container>
      </Box>
    </>
  );
}
