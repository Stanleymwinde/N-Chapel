import { Box, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { prayer as m } from "@content/ministries/prayer";
import { getEventEntries } from "@/lib/cms";
import { formatRange, upcoming } from "@/lib/dates";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Form } from "@/components/Form";
import { HideWhenExpired } from "@/components/HideWhenExpired";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { RichText } from "@/components/RichText";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { MSection, RuleList, ScriptureQuote } from "@/components/b/MinistryBlocks";
import { ChDd, ChDt } from "@/components/primitives";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

export default async function PrayerPage() {
  const fasting = upcoming((await getEventEntries()).filter((e) => e.ministry === m.href || /fasting/i.test(e.title)))[0];
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

      {/* Figma: sits straight under the hero (no top padding of its own) */}
      <MSection id="house-of-prayer" afterHero>
          <Grid templateColumns={{ base: "1fr", lg: "552px minmax(0, 1fr)" }} gap={{ base: "10", lg: "20" }} alignItems="center">
            {m.scripture && <ScriptureQuote scripture={m.scripture} />}
            <Stack gap="14px" maxW="552px">
              <Heading as="h2" id="house-of-prayer-heading" textStyle="h2" maxW="20rem">
                Someone will pray with you
              </Heading>
              <Text fontSize="1.125rem" lineHeight="1.6" color="fg.muted">
                {m.pastoralCare}
              </Text>
            </Stack>
          </Grid>
      </MSection>

      <MSection id="weekly" tone="warm" title="Pray with us each week">
        <Box as="dl" m="0" borderTopWidth="1.5px" borderColor="fg">
          {m.weekly.map((w) => (
            <Grid
              key={w.day}
              templateColumns={{ base: "1fr", md: "288px 240px minmax(0, 1fr)" }}
              gap={{ base: "1", md: "0" }}
              py="5"
              borderBottomWidth="1px"
              borderColor="border"
            >
              <ChDt fontWeight="600" fontSize="1rem">
                {w.day}
              </ChDt>
              <ChDd m="0" fontWeight="500" fontSize="0.9375rem" lineHeight="1.5" color="brand.fg" pr={{ md: "9" }}>
                {w.time}
              </ChDd>
              <ChDd m="0" fontSize="0.9375rem" lineHeight="1.55" color="fg.muted">
                <Text as="span" fontWeight="500" color="fg">
                  {w.mode}.
                </Text>{" "}
                <RichText text={w.detail} />
              </ChDd>
            </Grid>
          ))}
        </Box>
        <Text mt="7" fontSize="1rem" fontWeight="600">
          {m.joinNote}
        </Text>
      </MSection>

      <MSection id="focus" title="Our focus">
        <RuleList items={m.focus.map((f) => ({ title: f.title, text: `${f.text} (${f.references})` }))} columns={2} />
        <Text mt="7" fontSize="1.1875rem" lineHeight="1.55" color="fg.muted" maxW="936px">
          {m.mobilise}
        </Text>
        <Text mt="7" fontSize="0.75rem" lineHeight="1.5" color="fg.muted">
          <RichText text={m.touch} />
        </Text>
      </MSection>

      <MSection id="fasting" tone="tint" title="Prayer and fasting" introSize="1.1875rem" intro="We set aside regular seasons of prayer and fasting as a church, with guides for adults, families and children.">
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
      </MSection>

      <MSection id="request" title="Send a prayer request" intro="Tell us how we can pray for you. You don't have to give your name." headGap="3.5" gap="8">
        <Box maxW="744px">
          <Form form={m.requestForm} hideTitle />
        </Box>
      </MSection>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} variant="design" />
    </>
  );
}
