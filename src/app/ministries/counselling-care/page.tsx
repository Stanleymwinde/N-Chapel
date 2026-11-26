import { Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Phone } from "lucide-react";
import { counselling as m } from "@content/ministries/counselling";
import { pageMetadata } from "@/lib/metadata";
import { Faq } from "@/components/Faq";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { RichText } from "@/components/RichText";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { Section } from "@/components/layout/Section";
import { ChA, ChDd, ChDiv, ChDl, ChDt } from "@/components/primitives";
import { Callout } from "@/components/b/MinistryBlocks";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

export default function CounsellingPage() {
  return (
    <>
      <MinistryHero
        m={m}
        crumb="Counselling and care"
      />

      <Section id="urgent" compact label="Urgent help">
        <Callout id="emergency" title="Need help right now?" tone="alert" icon={<Phone size={24} />}>
          <Text textStyle="lead" fontWeight="600">
            If you are in immediate danger, call{" "}
            <ChA href="tel:999" textDecoration="underline" textUnderlineOffset="0.2em">
              999
            </ChA>{" "}
            or{" "}
            <ChA href="tel:112" textDecoration="underline" textUnderlineOffset="0.2em">
              112
            </ChA>
            .
          </Text>
          <Text color="fg.muted">
            Mental health helpline: <RichText text={m.emergency.helpline} />
          </Text>
        </Callout>
      </Section>

      <Section id="support" tone="warm" title="Support we offer">
        <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap="5">
          {m.services.map((s) => (
            <Stack key={s.title} gap="4" p={{ base: "5", md: "6" }} bg="bg.canvas" borderWidth="1px" borderColor="border" borderRadius="lg">
              <Heading as="h3" textStyle="h3">
                {s.title}
              </Heading>
              <Text color="fg.muted">{s.summary}</Text>
              <ChDl m="0" display="grid" gap="3" mt="auto" pt="2" borderTopWidth="1px" borderColor="border">
                <ChDiv>
                  <ChDt textStyle="small" fontWeight="700" color="fg">
                    When
                  </ChDt>
                  <ChDd m="0">
                    <RichText text={s.when} />
                  </ChDd>
                </ChDiv>
                <ChDiv>
                  <ChDt textStyle="small" fontWeight="700" color="fg">
                    Who it&apos;s for
                  </ChDt>
                  <ChDd m="0">{s.who}</ChDd>
                </ChDiv>
              </ChDl>
            </Stack>
          ))}
        </Grid>
        <Text mt="8" maxW="prose">
          <Text as="span" fontWeight="600">
            How to book:{" "}
          </Text>
          <RichText text={m.booking} />
        </Text>
      </Section>

      <Section id="questions" title="Common questions">
        <Faq items={m.faq} />
      </Section>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} />
    </>
  );
}
