import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Box, Container, Grid, HStack, Stack, Text } from "@chakra-ui/react";
import { seriesResources } from "@content/library/resources";
import { getSeries, series } from "@content/library/series";
import { AUDIENCE_LABELS, TYPE_LABELS } from "@content/library/types";
import { pageMetadata } from "@/lib/metadata";
import { RichText, plainText } from "@/components/RichText";
import { NextStepBand } from "@/components/NextStepBand";
import { ChLi, ChOl } from "@/components/primitives";
import { LibraryHero } from "@/components/library/LibraryHero";
import { seriesPhoto } from "@content/library/photos";
import { PdfDownload } from "@/components/share/PdfPreview";
import { ShareWhatsApp } from "@/components/share/ShareWhatsApp";

export const dynamicParams = false;

export function generateStaticParams() {
  return series.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/series/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSeries(slug);
  if (!s) return {};
  const desc = plainText(s.description);
  return pageMetadata({
    title: s.title,
    description: desc || `${TYPE_LABELS[s.type]} series${s.book ? ` in ${s.book}` : ""} from Nairobi Chapel Ngong Road. Read each week online or download free.`,
    path: `/resources/series/${s.slug}`,
    image: s.coverImage !== "TODO" ? s.coverImage : undefined,
  });
}

export default async function SeriesPage({ params }: PageProps<"/resources/series/[slug]">) {
  const { slug } = await params;
  const s = getSeries(slug);
  if (!s) notFound();
  const weeks = seriesResources(s.slug);
  const unit = s.slug === "genesis" ? "part" : "week";

  return (
    <>
      <LibraryHero crumbs={[{ label: "Resource Library", href: "/resources" }, { label: s.title }]} eyebrow={s.isCurrent ? "Current series" : TYPE_LABELS[s.type]} title={s.title} image={seriesPhoto(s)}>
        <Text color="fg.muted">
          {[s.book, `${weeks.length} ${unit}${weeks.length === 1 ? "" : "s"}`, s.when, s.audience.map((a) => AUDIENCE_LABELS[a]).join(", ")].filter(Boolean).join(" · ")}
        </Text>
        <Box textStyle="lead" color="fg.muted">
          <RichText text={s.description} />
        </Box>
        <Box pt="2">
          <ShareWhatsApp title={s.title} path={`/resources/series/${s.slug}`} />
        </Box>
      </LibraryHero>

      <Box as="section" aria-labelledby="weeks" bg="bg.canvas" pb={{ base: "14", md: "20" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Grid templateColumns="1fr">
            <Stack gap="4">
              <Text as="h2" id="weeks" textStyle="h3" fontFamily="heading" fontWeight="700">
                {unit === "part" ? "Parts" : "Weeks"}
              </Text>
              {s.slug === "genesis" && (
                <Text fontSize="0.9375rem" color="fg.muted">
                  The order of these parts is being confirmed.
                </Text>
              )}
              <ChOl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }} columnGap="12" borderTopWidth="1px" borderColor="border">
                {weeks.map((w) => (
                  <ChLi key={w.slug} borderBottomWidth="1px" borderColor="border" py="4">
                    <HStack justifyContent="space-between" gap="4" flexWrap="wrap">
                      <HStack gap="4" minW="0" flex="1">
                        <Text as="span" aria-hidden="true" fontFamily="heading" fontWeight="700" fontSize="1.5rem" color="brand.fg" minW="3.5rem">
                          {String(w.week)}
                        </Text>
                        <Box
                          asChild
                          fontWeight="600"
                          fontSize="1.0625rem"
                          color="fg"
                          textDecoration="underline"
                          textDecorationColor="transparent"
                          textUnderlineOffset="0.2em"
                          minH="44px"
                          display="inline-flex"
                          alignItems="center"
                          css={{ "@media (hover: hover) and (pointer: fine)": { "&:hover": { textDecorationColor: "currentColor" } } }}
                        >
                          <NextLink href={`/resources/${w.slug}`}>Read {unit === "part" ? `part ${w.week}` : `week ${w.week}`}</NextLink>
                        </Box>
                      </HStack>
                      <PdfDownload pdfUrl={w.pdfUrl} title={w.title} fileSize={w.fileSize} />
                    </HStack>
                  </ChLi>
                ))}
              </ChOl>
            </Stack>
          </Grid>
        </Container>
      </Box>

      <NextStepBand
        title="Study the Bible with others"
        text="An eGroup is a great place to talk through this series."
        primary={{ label: "Find a group", href: "/get-involved/groups" }}
        secondary={{ label: "Browse the library", href: "/resources" }}
      />
    </>
  );
}
