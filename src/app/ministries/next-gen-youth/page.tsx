import { Box, Stack, Text } from "@chakra-ui/react";
import { nextGen as m } from "@content/ministries/next-gen";
import { events } from "@content/events";
import { upcoming } from "@/lib/dates";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { MinistryCard } from "@/components/Cards";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { Section } from "@/components/layout/Section";
import { AcronymList, SplitFeature } from "@/components/b/MinistryBlocks";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

export default function NextGenPage() {
  const moran = upcoming(events).find((e) => /moran/i.test(e.title));
  const tones = ["white", "warm", "white"] as const;
  return (
    <>
      <MinistryHero
        m={m}
        crumb="Next Gen"
      />

      {m.programmes.map((p, i) => {
        const block = p.id === "crossroads" && moran ? { ...p, cta: { label: "See Moran Camp dates", href: `/events/${moran.slug}` } } : p;
        return (
          <Section key={p.id} id={`${p.id}-section`} tone={tones[i % tones.length]}>
            <SplitFeature block={block} reverse={i % 2 === 1} label={p.label} headingLevel="h2">
              {p.id === "crossroads" && (
                <Text textStyle="small" color="fg.muted">
                  ROPES stands for Rites of Passage Experiences. Parents can find full camp details on the event page.
                </Text>
              )}
              {p.acronym && (
                <Stack gap="3">
                  <Text fontWeight="600">V.U.M.A. stands for:</Text>
                  <AcronymList letters={p.acronym} label="What V.U.M.A. stands for" />
                </Stack>
              )}
              {p.outcome && (
                <Text fontWeight="600" color="fg">
                  The outcome: {p.outcome}
                </Text>
              )}
            </SplitFeature>
          </Section>
        );
      })}

      <Section id="young-adults" tone="tint" title="Finished school?" intro="Young adults aged 19–26 have their own community at BLITZ 5:16.">
        <Box maxW="md">
          <MinistryCard
            title="BLITZ 5:16 young adults"
            summary="College students and early-career young people building a deeper relationship with God."
            href="/ministries/blitz-young-adults"
            image="blitz.hero"
            who="Ages 19–26"
            when="Sundays 11:30 AM"
            cta="Explore BLITZ 5:16"
            headingLevel="h3"
          />
        </Box>
        <Box mt="6">
          <LinkButton href="/safeguarding" variant="link">
            Read our safeguarding policy
          </LinkButton>
        </Box>
      </Section>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} />
    </>
  );
}
