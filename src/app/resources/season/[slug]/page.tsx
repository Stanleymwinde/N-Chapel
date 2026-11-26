import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Container, Stack, Text } from "@chakra-ui/react";
import { resources } from "@content/library/resources";
import { getSeason, seasons, sortedSeasons } from "@content/library/seasons";
import { seasonPhoto } from "@content/library/photos";
import { MONTHS } from "@content/library/types";
import { getPublicationBySlug } from "@content/publications";
import { pageMetadata } from "@/lib/metadata";
import { RichText, plainText } from "@/components/RichText";
import { LinkButton } from "@/components/Button";
import { NextStepBand } from "@/components/NextStepBand";
import { LibraryHero } from "@/components/library/LibraryHero";
import { SeasonView } from "@/components/library/SeasonView";
import { ShareWhatsApp } from "@/components/share/ShareWhatsApp";

export const dynamicParams = false;

export function generateStaticParams() {
  return seasons.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/season/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSeason(slug);
  if (!s) return {};
  return pageMetadata({
    title: s.title,
    description: plainText(s.description) || `Prayer and fasting guides for ${MONTHS[s.month - 1]} ${s.year} from Nairobi Chapel Ngong Road, for adults, youth and children.`,
    path: `/resources/season/${s.slug}`,
  });
}

export default async function SeasonPage({ params }: PageProps<"/resources/season/[slug]">) {
  const { slug } = await params;
  const s = getSeason(slug);
  if (!s) notFound();
  const guides = resources.filter((r) => r.season === s.slug);
  const pub = s.relatedPublicationSlug ? getPublicationBySlug(s.relatedPublicationSlug) : undefined;

  return (
    <>
      <LibraryHero crumbs={[{ label: "Resource Library", href: "/resources" }, { label: s.title }]} eyebrow={`Prayer & fasting · ${MONTHS[s.month - 1]} ${s.year}`} title={s.title} image={seasonPhoto(s, sortedSeasons().findIndex((x) => x.slug === s.slug))}>
        <Box textStyle="lead" color="fg.muted">
          <RichText text={s.description} />
        </Box>
        <Box pt="2">
          <ShareWhatsApp title={s.title} path={`/resources/season/${s.slug}`} />
        </Box>
      </LibraryHero>

      <Box as="section" aria-label="Guides" bg="bg.canvas" pb={{ base: "14", md: "20" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Stack gap="10" maxW="56rem">
            <SeasonView season={s} guides={guides} />
            {pub && (
              <Box p={{ base: "5", md: "6" }} borderRadius="lg" bg="bg.tint">
                <Text fontWeight="600" mb="3">
                  Take the {pub.title} with you through the season.
                </Text>
                <LinkButton href={`/publications/${pub.slug}`} variant="secondary">
                  Open the {pub.title}
                </LinkButton>
              </Box>
            )}
          </Stack>
        </Container>
      </Box>

      <NextStepBand
        title="Pray together"
        text="Join an eGroup and walk through the season with others."
        primary={{ label: "Find a group", href: "/get-involved/groups" }}
        secondary={{ label: "Browse the library", href: "/resources" }}
      />
    </>
  );
}
