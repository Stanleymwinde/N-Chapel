import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { blitz as m } from "@content/ministries/blitz";
import { pageMetadata } from "@/lib/metadata";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { Section } from "@/components/layout/Section";
import { BulletList, RuleList } from "@/components/b/MinistryBlocks";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

export default function BlitzPage() {
  return (
    <>
      <MinistryHero
        m={m}
        crumb="BLITZ 5:16"
      />

      <Section id="sunday">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: "8", lg: "16" }} alignItems="start">
          <Stack gap="4" maxW="prose">
            <Heading as="h2" textStyle="h2">
              Sundays at BLITZ 5:16
            </Heading>
            <Text textStyle="lead" color="fg.muted">
              Our Sunday service runs from 11:30 AM to 1:00 PM and is led by volunteers from the community.
            </Text>
          </Stack>
          <Box p={{ base: "5", md: "8" }} borderWidth="1px" borderColor="border" borderRadius="lg" bg="bg.warm">
            <Heading as="h3" textStyle="h4" mb="4">
              How the morning runs
            </Heading>
            <BulletList items={m.sunday} />
          </Box>
        </Grid>
      </Section>

      <Section id="rhythm" tone="warm" title="Through the week" intro="BLITZ 5:16 is more than a Sunday service. Here's what else happens.">
        <RuleList items={m.rhythm} />
      </Section>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} />
    </>
  );
}
