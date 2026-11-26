import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Box, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getResource, monthLabel, resources, seriesResources, weekLabel } from "@content/library/resources";
import { getSeries } from "@content/library/series";
import { getSeason } from "@content/library/seasons";
import { AUDIENCE_LABELS, TYPE_LABELS, type Resource } from "@content/library/types";
import { getPublicationBySlug } from "@content/publications";
import { pageMetadata } from "@/lib/metadata";
import { NextStepBand } from "@/components/NextStepBand";
import { LinkButton } from "@/components/Button";
import { Img } from "@/components/Img";
import { ChLi, ChOl, ChUl } from "@/components/primitives";
import { LibraryHero } from "@/components/library/LibraryHero";
import { photoOf } from "@/components/library/LibraryCards";
import { MarkDone } from "@/components/library/MarkDone";
import { StudyReader } from "@/components/library/StudyReader";
import { PdfDownload, PdfPreview } from "@/components/share/PdfPreview";
import { ShareWhatsApp } from "@/components/share/ShareWhatsApp";

export const dynamicParams = false;

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

function describe(r: Resource) {
  if (r.summary) return r.summary;
  const s = r.seriesSlug ? getSeries(r.seriesSlug) : undefined;
  const parts = [TYPE_LABELS[r.type], s ? `${s.title}${r.week !== undefined ? `, ${weekLabel(r).toLowerCase()}` : ""}` : "", monthLabel(r)].filter(Boolean);
  return `${parts.join(" · ")}. For ${r.audience.map((a) => AUDIENCE_LABELS[a]).join(", ")}. Free from Nairobi Chapel Ngong Road.`;
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) return {};
  return pageMetadata({ title: r.title, description: describe(r), path: `/resources/${r.slug}`, image: r.craftPhoto, type: "article" });
}

function PrevNext({ prev, next }: { prev?: Resource; next?: Resource }) {
  if (!prev && !next) return null;
  const link = (r: Resource, dir: "prev" | "next") => (
    <Box
      asChild
      display="flex"
      flexDirection="column"
      alignItems={dir === "next" ? "flex-end" : "flex-start"}
      textAlign={dir === "next" ? "end" : "start"}
      gap="1"
      p="5"
      minH="44px"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="border"
      color="fg"
      textDecoration="none"
      gridColumn={dir === "next" ? { md: "2" } : undefined}
      css={{ "@media (hover: hover) and (pointer: fine)": { "&:hover": { borderColor: "var(--chakra-colors-brand-solid)" } } }}
    >
      <NextLink href={`/resources/${r.slug}`} rel={dir}>
        <HStack gap="2" fontSize="0.875rem" color="fg.muted">
          {dir === "prev" && <ArrowLeft size={16} aria-hidden="true" />}
          <span>{dir === "prev" ? "Previous" : "Next"}</span>
          {dir === "next" && <ArrowRight size={16} aria-hidden="true" />}
        </HStack>
        <Text fontWeight="600">{weekLabel(r) || r.title}</Text>
      </NextLink>
    </Box>
  );
  return (
    <Grid as="nav" aria-label="Previous and next in this series" templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="4">
      {prev && link(prev, "prev")}
      {next && link(next, "next")}
    </Grid>
  );
}

function CraftCard({ r }: { r: Resource }) {
  return (
    <Stack gap="8">
      {r.craftPhoto && (
        <Box position="relative" aspectRatio="4 / 3" borderRadius="lg" overflow="hidden" bg="bg.tint" maxW="40rem">
          <Img slot={r.craftPhoto} sizes="(min-width: 768px) 640px, 100vw" />
        </Box>
      )}
      {(r.ageRange || r.duration) && (
        <HStack gap="6" flexWrap="wrap" fontWeight="600">
          {r.ageRange && <Text>Ages {r.ageRange}</Text>}
          {r.duration && <Text>{r.duration}</Text>}
        </HStack>
      )}
      {r.materials && r.materials.length > 0 && (
        <Box as="section" aria-labelledby="c-materials">
          <Heading as="h2" id="c-materials" textStyle="h3" mb="3">
            You will need
          </Heading>
          <ChUl ps="5" display="grid" gap="2">
            {r.materials.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ChUl>
        </Box>
      )}
      {r.steps && r.steps.length > 0 && (
        <Box as="section" aria-labelledby="c-steps">
          <Heading as="h2" id="c-steps" textStyle="h3" mb="3">
            Steps
          </Heading>
          <ChOl ps="5" display="grid" gap="3">
            {r.steps.map((s) => (
              <ChLi key={s} lineHeight="1.6">
                {s}
              </ChLi>
            ))}
          </ChOl>
        </Box>
      )}
    </Stack>
  );
}

export default async function ResourcePage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) notFound();

  const s = r.seriesSlug ? getSeries(r.seriesSlug) : undefined;
  const season = r.season ? getSeason(r.season) : undefined;
  const weeks = s ? seriesResources(s.slug) : [];
  const i = weeks.findIndex((w) => w.slug === r.slug);
  const prev = i > 0 ? weeks[i - 1] : undefined;
  const next = i >= 0 && i < weeks.length - 1 ? weeks[i + 1] : undefined;

  const pub = season?.relatedPublicationSlug ? getPublicationBySlug(season.relatedPublicationSlug) : undefined;
  const hasCraftContent = r.type === "kids-craft" && Boolean(r.craftPhoto || r.materials?.length || r.steps?.length);
  const meta = [s ? `${s.title} · ${weekLabel(r)}` : "", season && !s ? season.title : "", monthLabel(r), r.audience.map((a) => AUDIENCE_LABELS[a]).join(", ")].filter(Boolean);

  const crumbs = [
    { label: "Resource Library", href: "/resources" },
    ...(s ? [{ label: s.title, href: `/resources/series/${s.slug}` }] : season ? [{ label: season.title, href: `/resources/season/${season.slug}` }] : []),
    { label: r.title },
  ];

  return (
    <>
      <LibraryHero crumbs={crumbs} eyebrow={TYPE_LABELS[r.type]} title={r.title} image={photoOf(r)}>
        <Text color="fg.muted">{meta.join(" · ")}</Text>
        <HStack gap="3" flexWrap="wrap" pt="2">
          <MarkDone slug={r.slug} />
          <ShareWhatsApp title={r.title} path={`/resources/${r.slug}`} />
        </HStack>
      </LibraryHero>

      <Box as="section" aria-label="Resource" bg="bg.canvas" pb={{ base: "14", md: "20" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Stack gap={{ base: "10", md: "14" }}>
            {r.body ? (
              <Stack gap="8">
                <StudyReader body={r.body} />
                <HStack gap="3" flexWrap="wrap">
                  <PdfDownload pdfUrl={r.pdfUrl} title={r.title} fileSize={r.fileSize} />
                </HStack>
              </Stack>
            ) : hasCraftContent ? (
              <Stack gap="8">
                <CraftCard r={r} />
                <PdfDownload pdfUrl={r.pdfUrl} title={r.title} fileSize={r.fileSize} />
              </Stack>
            ) : (
              <Stack gap="6" minW="0">
                  {r.summary && (
                    <Text fontSize="1.125rem" lineHeight="1.7" maxW="65ch">
                      {r.summary}
                    </Text>
                  )}
                  <PdfPreview pdfUrl={r.pdfUrl} title={r.title} fileSize={r.fileSize} image="resources.hero" />
              </Stack>
            )}

            {pub && (
              <Box p={{ base: "5", md: "6" }} borderRadius="lg" bg="bg.tint" maxW="48rem">
                <Text fontWeight="600" mb="3">
                  Take the {pub.title} with you through the season.
                </Text>
                <LinkButton href={`/publications/${pub.slug}`} variant="secondary">
                  Open the {pub.title}
                </LinkButton>
              </Box>
            )}

            <PrevNext prev={prev} next={next} />

            <HStack gap="3" flexWrap="wrap">
              {s && (
                <LinkButton href={`/resources/series/${s.slug}`} variant="secondary">
                  All weeks of {s.title}
                </LinkButton>
              )}
              {season && (
                <LinkButton href={`/resources/season/${season.slug}`} variant="secondary">
                  All guides for {season.title}
                </LinkButton>
              )}
              <LinkButton href="/resources" variant="secondary">
                Back to the library
              </LinkButton>
            </HStack>
          </Stack>
        </Container>
      </Box>

      <NextStepBand
        title="Study the Bible with others"
        text="An eGroup is a great place to talk through what you're reading."
        primary={{ label: "Find a group", href: "/get-involved/groups" }}
        secondary={{ label: "Browse the library", href: "/resources" }}
      />
    </>
  );
}
