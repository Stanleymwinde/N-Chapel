import { Box, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { quest as m } from "@content/ministries/quest";
import { events } from "@content/events";
import { upcoming } from "@/lib/dates";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { EventCard } from "@/components/Cards";
import { HideWhenExpired } from "@/components/HideWhenExpired";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { RichText } from "@/components/RichText";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { Section } from "@/components/layout/Section";
import { AgeGroupTable } from "@/components/b/AgeGroupTable";
import { AcronymList, BulletList, Callout, RuleList, ScriptureQuote, SplitFeature } from "@/components/b/MinistryBlocks";
import { ChBlockquote, ChFigure, ChSpan } from "@/components/primitives";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

export default function QuestPage() {
  const camps = upcoming(events.filter((e) => e.ministry === m.href));
  return (
    <>
      <MinistryHero
        m={m}
        crumb="Quest"
        actions={
          <LinkButton href="/new-here/plan-your-visit" variant="accent" size="lg">
            Plan your family’s visit
          </LinkButton>
        }
      />

      {/* Why Quest: the belief, and the line that sums it up */}
      <Section id="welcome">
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) minmax(0, 1fr)" }} gap={{ base: "10", lg: "16" }} alignItems="center">
          <Stack gap="5" maxW="prose">
            <Heading as="h2" textStyle="h2">
              Children matter to God
            </Heading>
            {m.welcome.map((p, i) => (
              <Text key={i} textStyle={i === 0 ? "lead" : undefined} color={i === 0 ? "fg" : "fg.muted"}>
                <RichText text={p} />
              </Text>
            ))}
          </Stack>
          <ChFigure position="relative" m="0" px={{ base: "7", md: "12" }} pt={{ base: "14", md: "16" }} pb={{ base: "8", md: "12" }} bg="bg.warm" borderRadius="2xl">
            <ChSpan
              aria-hidden="true"
              position="absolute"
              top={{ base: "2", md: "3" }}
              left={{ base: "6", md: "11" }}
              fontFamily="Georgia, 'Times New Roman', serif"
              fontWeight="700"
              fontSize={{ base: "5rem", md: "6rem" }}
              lineHeight="1"
              color="accent.highlight"
            >
              “
            </ChSpan>
            <ChBlockquote m="0" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.5rem", md: "2rem" }} lineHeight="1.25" letterSpacing="-0.015em" textWrap="balance">
              <RichText text={m.quote} />
            </ChBlockquote>
          </ChFigure>
        </Grid>
      </Section>

      {/* Vision and F.A.I.T.H. */}
      <Section id="vision" tone="warm">
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 5fr) minmax(0, 6fr)" }} gap={{ base: "10", lg: "16" }} alignItems="start">
          <Stack gap="6">
            <Heading as="h2" textStyle="h2">
              Our vision
            </Heading>
            <Text textStyle="lead" color="fg">
              {m.vision}
            </Text>
            <Box pt="2">
              <ScriptureQuote scripture={m.visionVerse} />
            </Box>
          </Stack>
          <Stack gap="4">
            <Text fontSize="0.8125rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg">
              F.A.I.T.H. stands for
            </Text>
            <AcronymList letters={m.faith} label="What F.A.I.T.H. stands for" />
          </Stack>
        </Grid>
      </Section>

      {/* Strategy: three numbered columns */}
      <Section id="strategy" title="Our strategy">
        <Grid as="ol" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", lg: "repeat(3, minmax(0, 1fr))" }} gap={{ base: "10", lg: "10" }}>
          {m.strategy.map((s, i) => (
            <Stack as="li" key={s.title} gap="4" pt="6" borderTopWidth="2px" borderColor="ink.900">
              <Text aria-hidden="true" fontFamily="heading" fontWeight="700" fontSize="0.875rem" letterSpacing="0.06em" color="brand.fg">
                {String(i + 1).padStart(2, "0")}
              </Text>
              <Heading as="h3" textStyle="h3">
                {s.title}
              </Heading>
              {s.paragraphs.map((p, k) => (
                <Text key={k} color="fg.muted">
                  <RichText text={p} />
                </Text>
              ))}
              {i === 0 && (
                <Box p="5" bg="bg.warm" borderRadius="lg">
                  <BulletList items={m.parents.details.slice(1)} />
                  <Text mt="3" fontWeight="600">
                    {m.parents.requirement}
                  </Text>
                </Box>
              )}
              {s.note && (
                <Text fontWeight="600" color="fg" ps="4" borderInlineStartWidth="3px" borderColor="accent.highlight">
                  {s.note}
                </Text>
              )}
              {s.cta && (
                <Box pt="1">
                  <LinkButton href={s.cta.href} variant="link">
                    {s.cta.label}
                  </LinkButton>
                </Box>
              )}
            </Stack>
          ))}
        </Grid>
      </Section>

      <Section id="age-groups" tone="warm" title="Age groups" intro={m.programmesIntro}>
        <AgeGroupTable groups={m.ageGroups} caption="Quest classes by age" />
      </Section>

      {/* A Quest service, with child safety beside it */}
      <Section id="sunday">
        <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) minmax(0, 1fr)" }} gap={{ base: "10", lg: "16" }} alignItems="start">
          <Stack gap="4">
            <Heading as="h2" textStyle="h2">
              What happens in a Quest service
            </Heading>
            <Text color="fg.muted">Each Quest service contains five major components.</Text>
            <Box as="ol" m="0" p="0" listStyle="none" display="grid" borderTopWidth="1px" borderColor="border">
              {m.serviceFlow.map((s, i) => (
                <HStack as="li" key={s} gap="5" py="4" borderBottomWidth="1px" borderColor="border">
                  <Text as="span" fontFamily="heading" fontWeight="700" fontSize="0.875rem" color="brand.fg" minW="6" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </Text>
                  <Text as="span" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.125rem", md: "1.25rem" }}>
                    {s}
                  </Text>
                </HStack>
              ))}
            </Box>
          </Stack>
          <Callout id="safety" title={m.safety.title}>
            <BulletList items={m.safety.points} />
            <Box pt="1">
              <LinkButton href="/safeguarding" variant="link">
                Read our safeguarding policy
              </LinkButton>
            </Box>
          </Callout>
        </Grid>
      </Section>

      <Section id="grow-deep" tone="tint" title="Growing D.E.E.P." intro={m.deepIntro}>
        <RuleList items={m.moreForKids.map((b) => ({ title: b.title, text: b.summary }))} columns={2} />
      </Section>

      <Section id="community" tone="warm" title="Quest outreach programmes" intro="Quest serves children beyond our Sunday classrooms.">
        <Stack gap={{ base: "14", md: "20" }}>
          {m.community.map((b, i) => (
            <SplitFeature key={b.title} block={b} reverse={i % 2 === 1} />
          ))}
        </Stack>
      </Section>

      <Section id="camps" title="Camps and events for kids">
        {camps.length > 0 ? (
          <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, md: 2, lg: 3 }} gap="5">
            {camps.map((e) => (
              <HideWhenExpired key={e.slug} expires={e.expires}>
                <li>
                  <EventCard event={e} />
                </li>
              </HideWhenExpired>
            ))}
          </SimpleGrid>
        ) : (
          <Text color="fg.muted">There are no Quest camps scheduled right now. New dates will appear here.</Text>
        )}
        <HStack gap="3" mt="8" flexWrap="wrap">
          <LinkButton href="/events?audience=Children" variant="secondary">
            See all events for children
          </LinkButton>
          <LinkButton href="/resources?audience=children" variant="link">
            Download children’s resources
          </LinkButton>
        </HStack>
      </Section>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} />
    </>
  );
}
