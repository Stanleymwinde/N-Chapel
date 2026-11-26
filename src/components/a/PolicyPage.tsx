import { Heading, Stack, Text } from "@chakra-ui/react";
import type { Policy } from "@content/policies";
import { PageHero } from "../layout/PageHero";
import { Section } from "../layout/Section";
import { NextStepBand } from "../NextStepBand";
import { RichText } from "../RichText";

export function PolicyPage({ policy }: { policy: Policy }) {
  return (
    <>
      <PageHero title={policy.title} intro={policy.intro} breadcrumbs={[{ label: policy.title }]} />
      <Section tone="white" label={policy.title}>
        <Stack gap="8" maxW="prose">
          {policy.sections.map((s) => (
            <Stack key={s.title} gap="2">
              <Heading as="h2" textStyle="h3">
                {s.title}
              </Heading>
              <Text>
                <RichText text={s.body} />
              </Text>
            </Stack>
          ))}
        </Stack>
      </Section>
      <NextStepBand
        title="Questions about this policy?"
        text="Get in touch and we'll help."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
      />
    </>
  );
}
