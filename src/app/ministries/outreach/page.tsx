import { Box, Stack, Text } from "@chakra-ui/react";
import { outreach as m } from "@content/ministries/outreach";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Form } from "@/components/Form";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { Section } from "@/components/layout/Section";
import { ScriptureQuote, SplitFeature } from "@/components/b/MinistryBlocks";

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
        <Section id="great-commission" compact label="The Great Commission">
          <ScriptureQuote scripture={m.scripture} />
        </Section>
      )}

      <Section id="areas" tone="warm" title="Where we serve">
        <Stack gap={{ base: "14", md: "20" }}>
          {m.areas.map((a, i) => (
            <SplitFeature key={a.id} block={a} reverse={i % 2 === 1} />
          ))}
        </Stack>
      </Section>

      <Section id="quote" tone="night" compact label="A word on evangelism">
        <ScriptureQuote scripture={{ text: m.quote.text, reference: m.quote.author }} tone="dark" />
      </Section>

      <Section id="join" title="Join an outreach team" intro="Tell us where you'd like to serve and someone from the outreach team will get in touch.">
        <Box>
          <Form form={m.joinForm} hideTitle />
        </Box>
        <Text mt="6" color="fg.muted">
          Prefer to talk first? WhatsApp us on 0701 777 888.
        </Text>
      </Section>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} />
    </>
  );
}
