import { Box, Text } from "@chakra-ui/react";
import { allMedia } from "@content/media";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { NextStepBand } from "@/components/NextStepBand";
import { pageMetadata } from "@/lib/metadata";
import { ChA, ChCaption, ChTable, ChTbody, ChTd, ChTh, ChThead, ChTr } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "Image credits",
  description: "Credits and licences for the photos and videos used on the Nairobi Chapel Ngong Road website.",
  path: "/credits",
});

export default function CreditsPage() {
  const placeholders = allMedia.filter((m) => m.isPlaceholder).length;
  return (
    <>
      <PageHero
        title="Image credits"
        intro="Where the photos and videos on this site come from, and who made them."
        breadcrumbs={[{ label: "Image credits" }]}
      />
      <Section tone="white" label="Media credits">
        <Text maxW="prose" color="fg.muted" mb="8">
          {placeholders > 0
            ? `${placeholders} of ${allMedia.length} images are still placeholders. They will be replaced with the church's own photography or properly licensed photos, credited below.`
            : "Every image is credited below."}
        </Text>
        <Box overflowX="auto" borderWidth="1px" borderColor="border" borderRadius="lg">
          <ChTable w="100%" minW="720px" borderCollapse="collapse" textStyle="small">
            <ChCaption className="sr-only">Media used on this website, with source, author and licence</ChCaption>
            <ChThead>
              <ChTr bg="bg.warm">
                <ChTh scope="col" px="4" py="3" textAlign="left" fontWeight="700">Image</ChTh>
                <ChTh scope="col" px="4" py="3" textAlign="left" fontWeight="700">Used on</ChTh>
                <ChTh scope="col" px="4" py="3" textAlign="left" fontWeight="700">Source and author</ChTh>
                <ChTh scope="col" px="4" py="3" textAlign="left" fontWeight="700">Licence</ChTh>
              </ChTr>
            </ChThead>
            <ChTbody>
              {allMedia.map((m) => (
                <ChTr key={m.key}>
                  <ChTd px="4" py="3" borderTopWidth="1px" borderColor="border" textAlign="left" verticalAlign="top">
                    <Text fontWeight="600">{m.altText}</Text>
                    {m.isPlaceholder && m.searchQuery && (
                      <Text textStyle="small" color="fg.muted">
                        Placeholder. Intended search: &ldquo;{m.searchQuery}&rdquo;
                      </Text>
                    )}
                  </ChTd>
                  <ChTd px="4" py="3" borderTopWidth="1px" borderColor="border" textAlign="left" verticalAlign="top">
                    {m.usedOn.map((p) => (
                      <ChA key={p} href={p} display="block" color="brand.fg" textDecoration="underline" textUnderlineOffset="0.2em">
                        {p}
                      </ChA>
                    ))}
                  </ChTd>
                  <ChTd px="4" py="3" borderTopWidth="1px" borderColor="border" textAlign="left" verticalAlign="top">
                    {m.isPlaceholder ? (
                      <Text color="fg.muted">Generated placeholder</Text>
                    ) : (
                      <>
                        {m.sourceUrl ? (
                          <ChA href={m.sourceUrl} target="_blank" rel="noopener noreferrer" color="brand.fg" textDecoration="underline">
                            {m.sourceSite ?? "Source"}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </ChA>
                        ) : (
                          <Text>{m.sourceSite}</Text>
                        )}
                        {m.author && <Text color="fg.muted">by {m.author}</Text>}
                      </>
                    )}
                  </ChTd>
                  <ChTd px="4" py="3" borderTopWidth="1px" borderColor="border" textAlign="left" verticalAlign="top">{m.licence ?? "Not applicable"}</ChTd>
                </ChTr>
              ))}
            </ChTbody>
          </ChTable>
        </Box>
      </Section>
      <NextStepBand
        title="See it for yourself"
        text="Nothing beats being there in person."
        primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
        secondary={{ label: "Watch live", href: "/watch" }}
      />
    </>
  );
}
