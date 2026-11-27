import { Box, Stack, Text } from "@chakra-ui/react";
import { outreach as m } from "@content/ministries/outreach";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Form } from "@/components/Form";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { MSection, ScriptureQuote, SplitFeature } from "@/components/b/MinistryBlocks";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

export default function OutreachPage() {
  return (
    <>
      <MinistryHero
        m={m}
        crumb="Outreach"
        actions={
          <LinkButton href="#join" variant="accent" size="lg">
            Join an outreach team
          </LinkButton>
        }
      />

      {m.scripture && (
        <MSection id="great-commission" afterHero label="The Great Commission">
          <ScriptureQuote scripture={m.scripture} wide />
        </MSection>
      )}

      <MSection id="areas" tone="warm" title="Where we serve" gap="10">
        <Stack gap={{ base: "14", md: "18" }}>
          {m.areas.map((a, i) => (
            <SplitFeature key={a.id} block={a} reverse={i % 2 === 1} />
          ))}
        </Stack>
      </MSection>

      <MSection id="quote" tone="ink" label="A word on evangelism">
        <ScriptureQuote scripture={{ text: m.quote.text, reference: m.quote.author }} tone="dark" wide />
      </MSection>

      <MSection id="join" title="Join an outreach team" intro="Tell us where you'd like to serve and someone from the outreach team will get in touch." headGap="3.5" gap="8">
        <Box maxW="744px">
          <Form form={m.joinForm} hideTitle />
        </Box>
        <Text mt="6" fontSize="0.9375rem" color="fg.muted">
          Prefer to talk first? WhatsApp us on 0701 777 888.
        </Text>
      </MSection>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} variant="design" />
    </>
  );
}
