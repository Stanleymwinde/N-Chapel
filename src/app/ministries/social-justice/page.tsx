import { Stack } from "@chakra-ui/react";
import { socialJustice as m } from "@content/ministries/social-justice";
import { pageMetadata } from "@/lib/metadata";
import { Form } from "@/components/Form";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { Section } from "@/components/layout/Section";
import { BulletList, SplitFeature } from "@/components/b/MinistryBlocks";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

export default function SocialJusticePage() {
  return (
    <>
      <MinistryHero
        m={m}
        crumb="Social justice"
      />

      <Section id="focus" title="What we focus on">
        <Stack maxW="prose">
          <BulletList items={m.focusAreas} />
        </Stack>
      </Section>

      <Section id="programmes" tone="warm" title="How we serve">
        <Stack gap={{ base: "14", md: "20" }}>
          {m.programmes.map((p, i) => (
            <SplitFeature key={p.id} block={p} reverse={i % 2 === 1} />
          ))}
        </Stack>
      </Section>

      <Section
        id="request-support"
        title="Request support"
        intro="If you or your family need help, tell us a little about your situation. Only the benevolence team will see this."
      >
        <Form form={m.supportForm} hideTitle />
      </Section>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} />
    </>
  );
}
