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
import { Section } from "@/components/layout/Section";
import { ChA, ChLi, ChOl } from "@/components/primitives";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

export default function DiscipleshipPage() {
  return (
    <>
      <MinistryHero
        m={m}
        crumb="Discipleship"
      />

      <Section id="pathways" title="Ways to grow" intro="Each of these has its own page with times and how to join.">
        <ChOl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} columnGap="10" borderTopWidth="2px" borderColor="fg">
          {m.pathways.map((p) => (
            <ChLi key={p.title} borderBottomWidth="1px" borderColor="border">
              <ChA
                asChild
                display="grid"
                gridTemplateColumns="1fr auto"
                gap="4"
                alignItems="center"
                py="5"
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
                    <Heading as="h3" textStyle="h4" mb="1" transition="color 150ms ease-out">
                      {p.title}
                    </Heading>
                    <Text as="span" display="block" color="fg.muted">
                      {p.summary}
                    </Text>
                  </span>
                  <Box color="brand.fg" aria-hidden="true">
                    <ArrowRight size={22} />
                  </Box>
                </NextLink>
              </ChA>
            </ChLi>
          ))}
        </ChOl>
      </Section>

      <Section id="plug-in-video" tone="warm">
        <Grid templateColumns={{ base: "1fr", lg: "1.4fr 1fr" }} gap={{ base: "8", lg: "12" }} alignItems="center">
          <LiteYouTube id={m.plugInVideo.id} title={m.plugInVideo.title} poster="school.hero" />
          <Stack gap="4">
            <Heading as="h2" textStyle="h2">
              New here? Start with Plug-In
            </Heading>
            <Text color="fg.muted">
              Plug-In is a 10-week course that helps you connect to God, to community, to church and to your destiny.
            </Text>
          </Stack>
        </Grid>
      </Section>

      <Section id="depth" title="DEPTH teaching">
        <Stack gap="4" maxW="prose">
          <Text textStyle="lead" color="fg.muted">
            {m.depth.summary}
          </Text>
          <Text>
            <RichText text={m.depth.courses} />
          </Text>
        </Stack>
      </Section>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} />
    </>
  );
}
