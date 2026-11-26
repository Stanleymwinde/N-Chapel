import { Box, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { prayer as m } from "@content/ministries/prayer";
import { events } from "@content/events";
import { formatRange, upcoming } from "@/lib/dates";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Form } from "@/components/Form";
import { HideWhenExpired } from "@/components/HideWhenExpired";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { RichText } from "@/components/RichText";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { Section } from "@/components/layout/Section";
import { RuleList, ScriptureQuote } from "@/components/b/MinistryBlocks";
import { ChDd, ChDt } from "@/components/primitives";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

export default function PrayerPage() {
  const fasting = upcoming(events.filter((e) => e.ministry === m.href || /fasting/i.test(e.title)))[0];
  return (
    <>
      <MinistryHero
        m={m}
        crumb="Prayer"
        actions={
          <LinkButton href="#request" variant="accent" size="lg">
            Send a prayer request
          </LinkButton>
        }
      />

      <Section id="house-of-prayer">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: "10", lg: "16" }} alignItems="center">
          {m.scripture && <ScriptureQuote scripture={m.scripture} />}
          <Stack gap="4" maxW="prose">
            <Heading as="h2" textStyle="h2">
              Someone will pray with you
            </Heading>
            <Text textStyle="lead" color="fg.muted">
              {m.pastoralCare}
            </Text>
          </Stack>
        </Grid>
      </Section>

      <Section id="weekly" tone="warm" title="Pray with us each week">
        <Box as="dl" m="0" borderTopWidth="2px" borderColor="fg">
          {m.weekly.map((w) => (
            <Grid
              key={w.day}
              templateColumns={{ base: "1fr", md: "14rem 12rem 1fr" }}
              gap={{ base: "1", md: "6" }}
              py="5"
              borderBottomWidth="1px"
              borderColor="border"
            >
              <ChDt fontFamily="heading" fontWeight="650" fontSize="1.25rem">
                {w.day}
              </ChDt>
              <ChDd m="0" fontWeight="600" color="brand.fg">
                {w.time}
              </ChDd>
              <ChDd m="0" color="fg.muted">
                <Text as="span" fontWeight="600" color="fg">
                  {w.mode}.
                </Text>{" "}
                <RichText text={w.detail} />
              </ChDd>
            </Grid>
          ))}
        </Box>
        <Text mt="6" fontWeight="600">
          {m.joinNote}
        </Text>
      </Section>

      <Section id="focus" title="Our focus">
        <RuleList items={m.focus.map((f) => ({ title: f.title, text: `${f.text} (${f.references})` }))} columns={2} />
        <Text mt="8" textStyle="lead" color="fg.muted" maxW="prose">
          {m.mobilise}
        </Text>
        <Text mt="3" textStyle="small" color="fg.muted">
          <RichText text={m.touch} />
        </Text>
      </Section>

      <Section id="fasting" tone="tint" title="Prayer and fasting" intro="We set aside regular seasons of prayer and fasting as a church, with guides for adults, families and children.">
        {fasting && (
          <HideWhenExpired expires={fasting.expires}>
            <Box mb="6" p={{ base: "5", md: "6" }} bg="bg.canvas" borderWidth="1px" borderColor="border" borderRadius="lg" maxW="prose">
              <Text textStyle="small" fontWeight="600" color="brand.fg">
                Next season
              </Text>
              <Heading as="h3" textStyle="h4" mt="1">
                {fasting.title}
              </Heading>
              <Text color="fg.muted" mt="1">
                {formatRange(fasting.startDate, fasting.endDate)}
              </Text>
              <Box mt="3">
                <LinkButton href={`/events/${fasting.slug}`} variant="link">
                  See the details
                </LinkButton>
              </Box>
            </Box>
          </HideWhenExpired>
        )}
        <HStack gap="3" flexWrap="wrap">
          <LinkButton href="/resources?type=prayer-fasting" variant="primary">
            Download a fasting guide
          </LinkButton>
        </HStack>
      </Section>

      <Section id="request" title="Send a prayer request" intro="Tell us how we can pray for you. You don't have to give your name.">
        <Form form={m.requestForm} hideTitle />
      </Section>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} />
    </>
  );
}
