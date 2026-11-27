import { Box, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { quest as m } from "@content/ministries/quest";
import { events } from "@content/events";
import { upcoming } from "@/lib/dates";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { EventCard } from "@/components/Cards";
import { HideWhenExpired } from "@/components/HideWhenExpired";
import { Img } from "@/components/Img";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { RichText } from "@/components/RichText";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { AgeGroupTable } from "@/components/b/AgeGroupTable";
import { AcronymList, BulletList, Callout, MSection, RuleList, ScriptureQuote, SplitFeature } from "@/components/b/MinistryBlocks";
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
      <MSection id="welcome" afterHero>
        <Grid templateColumns={{ base: "1fr", lg: "564px minmax(0, 1fr)" }} gap={{ base: "10", lg: "60px" }} alignItems="start">
          <Stack gap="18px">
            <Heading as="h2" textStyle="h2">
              Children matter to God
            </Heading>
            {m.welcome.map((p, i) => (
              <Text key={i} fontSize={i === 0 ? { base: "1.125rem", md: "1.25rem" } : "1rem"} lineHeight="1.6" color={i === 0 ? "fg" : "fg.muted"}>
                <RichText text={p} />
              </Text>
            ))}
          </Stack>
          <ChFigure m="0" display="flex" flexDirection="column" gap="2" px={{ base: "7", md: "9" }} pt="7" pb="9" bg="bg.warm" borderRadius="14px">
            <ChSpan aria-hidden="true" fontFamily="heading" fontWeight="700" fontSize="4rem" lineHeight="0.6" pt="5" color="accent.highlight">
              “
            </ChSpan>
            <ChBlockquote m="0" maxW="396px" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.5rem", md: "1.6875rem" }} lineHeight="1.25" textWrap="balance">
              <RichText text={m.quote} />
            </ChBlockquote>
          </ChFigure>
        </Grid>
      </MSection>

      {/* Vision and F.A.I.T.H. */}
      <MSection id="vision" tone="warm">
        <Grid templateColumns={{ base: "1fr", lg: "516px minmax(0, 1fr)" }} gap={{ base: "10", lg: "20" }} alignItems="start">
          <Stack gap="6">
            <Heading as="h2" textStyle="h2">
              Our vision
            </Heading>
            <Text fontSize={{ base: "1.125rem", md: "1.25rem" }} lineHeight="1.6" color="fg" maxW="504px">
              {m.vision}
            </Text>
            <ScriptureQuote scripture={m.visionVerse} />
          </Stack>
          <Stack gap="3">
            <Text fontSize="0.6875rem" fontWeight="600" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg">
              F.A.I.T.H. stands for
            </Text>
            <AcronymList letters={m.faith} label="What F.A.I.T.H. stands for" />
          </Stack>
        </Grid>
      </MSection>

      {/* Strategy: three numbered columns */}
      <MSection id="strategy" title="Our strategy" gap="10">
        <Grid as="ol" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", lg: "repeat(3, minmax(0, 1fr))" }} gap={{ base: "10", lg: "34px" }}>
          {m.strategy.map((s, i) => (
            <Stack as="li" key={s.title} gap="14px" pt="6" borderTopWidth="1.5px" borderColor="fg">
              <Text aria-hidden="true" fontWeight="600" fontSize="0.75rem" letterSpacing="0.06em" color="brand.fg">
                {String(i + 1).padStart(2, "0")}
              </Text>
              <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.375rem" lineHeight="1.25">
                {s.title}
              </Heading>
              {s.paragraphs.map((p, k) => (
                <Text key={k} fontSize="1rem" lineHeight="1.6" color="fg.muted">
                  <RichText text={p} />
                </Text>
              ))}
              {i === 0 && (
                <Stack gap="2.5" p="4" bg="bg.warm" borderRadius="12px">
                  <BulletList items={m.parents.details.slice(1)} />
                  <Text fontSize="0.9375rem" lineHeight="1.5" fontWeight="600">
                    {m.parents.requirement}
                  </Text>
                </Stack>
              )}
              {s.note && (
                <Text fontSize="0.9375rem" lineHeight="1.5" fontWeight="600" color="fg" ps="4" borderInlineStartWidth="3px" borderColor="accent.highlight">
                  {s.note}
                </Text>
              )}
              {s.cta && (
                <Box pt={i === 0 ? "1.5" : "0"}>
                  <LinkButton href={s.cta.href} variant="link">
                    {s.cta.label}
                  </LinkButton>
                </Box>
              )}
            </Stack>
          ))}
        </Grid>
      </MSection>

      <MSection id="age-groups" tone="warm" title="Age groups" intro={m.programmesIntro} introSize="1.0625rem" gap="8">
        <Grid templateColumns={{ base: "1fr", lg: "648px minmax(0, 1fr)" }} gap="8" alignItems="stretch">
          <AgeGroupTable groups={m.ageGroups} caption="Quest classes by age" />
          <Box position="relative" minH={{ base: "260px", lg: "372px" }} borderRadius="16px" overflow="hidden" bg="bg.tint">
            <Img slot="quest.ages" sizes="(min-width: 1024px) 520px, 100vw" />
          </Box>
        </Grid>
      </MSection>

      {/* A Quest service, with child safety beside it */}
      <MSection id="sunday">
        <Grid templateColumns={{ base: "1fr", lg: "569px minmax(0, 1fr)" }} gap={{ base: "10", lg: "52px" }} alignItems="start">
          <Stack gap="14px">
            <Heading as="h2" textStyle="h2" maxW="22rem">
              What happens in a Quest service
            </Heading>
            <Text fontSize="0.9375rem" color="fg.muted">
              Each Quest service contains five major components.
            </Text>
            <Box as="ol" m="0" mt="2.5" p="0" listStyle="none" display="grid" borderBottomWidth="1px" borderColor="border">
              {m.serviceFlow.map((s, i) => (
                <HStack as="li" key={s} gap="18px" py="4" borderTopWidth="1px" borderColor="border" fontWeight="600">
                  <Text as="span" fontSize="0.75rem" letterSpacing="0.04em" color="brand.fg" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </Text>
                  <Text as="span" fontSize="1rem">
                    {s}
                  </Text>
                </HStack>
              ))}
            </Box>
          </Stack>
          <Callout id="safety" title={m.safety.title}>
            <BulletList items={m.safety.points} />
            <Box pt="1.5">
              <LinkButton href="/safeguarding" variant="link">
                Read our safeguarding policy
              </LinkButton>
            </Box>
          </Callout>
        </Grid>
      </MSection>

      <MSection id="grow-deep" tone="tint" title="Growing D.E.E.P." intro={m.deepIntro} gap="9">
        <RuleList items={m.moreForKids.map((b) => ({ title: b.title, text: b.summary }))} columns={2} />
      </MSection>

      <MSection id="community" tone="warm" title="Quest outreach programmes" intro="Quest serves children beyond our Sunday classrooms." introSize="1.0625rem" headGap="2.5" gap="16">
        <Stack gap="16">
          {m.community.map((b, i) => (
            <SplitFeature key={b.title} block={b} reverse={i % 2 === 1} />
          ))}
        </Stack>
      </MSection>

      <MSection id="camps" title="Camps and events for kids" gap="8">
        {camps.length > 0 ? (
          <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, md: 2, lg: 3 }} gap="4">
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
        <HStack gap="4" mt="8" flexWrap="wrap">
          <LinkButton href="/events?audience=Children" variant="secondary">
            See all events for children
          </LinkButton>
          <LinkButton href="/resources?audience=children" variant="link">
            Download children’s resources
          </LinkButton>
        </HStack>
      </MSection>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} variant="design" />
    </>
  );
}
