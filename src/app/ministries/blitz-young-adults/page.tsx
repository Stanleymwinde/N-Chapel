import { Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { blitz as m } from "@content/ministries/blitz";
import { pageMetadata } from "@/lib/metadata";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { BulletList, MSection, RuleList } from "@/components/b/MinistryBlocks";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

export default function BlitzPage() {
  return (
    <>
      <MinistryHero
        m={m}
        crumb="BLITZ 5:16"
      />

      <MSection id="sunday" afterHero>
        <Grid templateColumns={{ base: "1fr", lg: "564px minmax(0, 1fr)" }} gap={{ base: "8", lg: "60px" }} alignItems="start">
          <Stack gap="4">
            <Heading as="h2" textStyle="h2">
              Sundays at BLITZ 5:16
            </Heading>
            <Text fontSize={{ base: "1.0625rem", md: "1.125rem" }} lineHeight="1.6" color="fg.muted">
              Our Sunday service runs from 11:30 AM to 1:00 PM and is led by volunteers from the community.
            </Text>
          </Stack>
          <Stack gap="3" px="7" pt="26px" pb="7" borderWidth="1px" borderColor="border" borderRadius="14px" bg="bg.warm">
            <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1rem">
              How the morning runs
            </Heading>
            <BulletList items={m.sunday} gap="3" />
          </Stack>
        </Grid>
      </MSection>

      <MSection id="rhythm" tone="warm" title="Through the week" intro="BLITZ 5:16 is more than a Sunday service. Here's what else happens." headGap="3.5" gap="9">
        <RuleList items={m.rhythm} titleSize="1.0625rem" />
      </MSection>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} variant="design" />
    </>
  );
}
