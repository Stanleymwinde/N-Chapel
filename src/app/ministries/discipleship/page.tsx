import NextLink from "next/link";
import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { discipleship as m } from "@content/ministries/discipleship";
import { pageMetadata } from "@/lib/metadata";
import { LiteYouTube } from "@/components/LiteYouTube";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { RichText } from "@/components/RichText";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { MSection } from "@/components/b/MinistryBlocks";
import { ChA, ChLi, ChOl } from "@/components/primitives";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

export default function DiscipleshipPage() {
  return (
    <>
      <MinistryHero
        m={m}
        crumb="Discipleship"
      />

      <MSection id="pathways" title="Ways to grow" intro="Each of these has its own page with times and how to join." afterHero headGap="3.5" gap="9">
        <ChOl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }} columnGap="34px" borderTopWidth="1.5px" borderColor="fg">
          {m.pathways.map((p) => (
            <ChLi key={p.title} borderBottomWidth="1px" borderColor="border">
              <ChA
                asChild
                display="grid"
                gridTemplateColumns="1fr auto"
                gap="5"
                alignItems="center"
                minH={{ md: "107px" }}
                py="18px"
                textDecoration="none"
                color="fg"
                css={{
                  "& svg": { transition: "transform 150ms ease-out" },
                  "&:hover svg, &:focus-visible svg": { transform: "translateX(4px)" },
                  "&:hover h3": { color: "brand.fg" },
                }}
              >
                <NextLink href={p.href} aria-label={`${p.cta}: ${p.title}`}>
                  <span>
                    <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1rem" mb="1" transition="color 150ms ease-out">
                      {p.title}
                    </Heading>
                    <Text as="span" display="block" fontSize="0.9375rem" lineHeight="1.55" color="fg.muted">
                      {p.summary}
                    </Text>
                  </span>
                  <Box color="brand.fg" aria-hidden="true">
                    <ArrowRight size={16} />
                  </Box>
                </NextLink>
              </ChA>
            </ChLi>
          ))}
        </ChOl>
      </MSection>

      <MSection id="plug-in-video" tone="warm">
        <Grid templateColumns={{ base: "1fr", lg: "672px minmax(0, 1fr)" }} gap={{ base: "8", lg: "56px" }} alignItems="center">
          {/* Figma: a 672 × 315 frame with a 10px radius */}
          <Box css={{ "& > *": { aspectRatio: { base: "16 / 9", lg: "672 / 315" }, borderRadius: "10px" } }}>
            <LiteYouTube id={m.plugInVideo.id} title={m.plugInVideo.title} poster="school.hero" />
          </Box>
          <Stack gap="4">
            <Heading as="h2" textStyle="h2" maxW="20rem">
              New here? Start with Plug-In
            </Heading>
            <Text fontSize={{ base: "1rem", md: "1.0625rem" }} lineHeight="1.6" color="fg.muted" maxW="456px">
              Plug-In is a 10-week course that helps you connect to God, to community, to church and to your destiny.
            </Text>
          </Stack>
        </Grid>
      </MSection>

      <MSection id="depth" title="DEPTH teaching" headGap="22px" gap="22px">
        <Stack gap="22px" maxW="888px">
          <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.6" color="fg.muted">
            {m.depth.summary}
          </Text>
          <Text fontSize="0.9375rem" color="fg.muted">
            <RichText text={m.depth.courses} />
          </Text>
        </Stack>
      </MSection>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} variant="design" />
    </>
  );
}
