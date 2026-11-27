import { Box, Stack } from "@chakra-ui/react";
import { socialJustice as m } from "@content/ministries/social-justice";
import { pageMetadata } from "@/lib/metadata";
import { Form } from "@/components/Form";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { BulletList, MSection, SplitFeature } from "@/components/b/MinistryBlocks";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

export default function SocialJusticePage() {
  return (
    <>
      <MinistryHero
        m={m}
        crumb="Social justice"
      />

      <MSection id="focus" title="What we focus on" afterHero gap="5">
        <Box maxW="984px">
          <BulletList items={m.focusAreas} />
        </Box>
      </MSection>

      <MSection id="programmes" tone="warm" title="How we serve" gap="10">
        <Stack gap={{ base: "14", md: "18" }}>
          {m.programmes.map((p, i) => (
            <SplitFeature key={p.id} block={p} reverse={i % 2 === 1} bulletSize="0.9375rem" />
          ))}
        </Stack>
      </MSection>

      <MSection
        id="request-support"
        title="Request support"
        intro="If you or your family need help, tell us a little about your situation. Only the benevolence team will see this."
        headGap="3.5"
        gap="8"
      >
        <Box maxW="744px">
          <Form form={m.supportForm} hideTitle />
        </Box>
      </MSection>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} variant="design" />
    </>
  );
}
