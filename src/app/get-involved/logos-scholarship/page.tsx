import { Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { logosScholarship } from "@content/get-involved";
import { pageMetadata } from "@/lib/metadata";
import { FactList } from "@/components/FactList";
import { NextStepBand } from "@/components/NextStepBand";
import { RichText } from "@/components/RichText";
import { LightHero } from "@/components/layout/LightHero";
import { Section } from "@/components/layout/Section";

export const metadata = pageMetadata({
  title: "Logos Scholarship Fund",
  description: "The Logos Scholarship Fund at Nairobi Chapel Ngong Road. Details on eligibility and how to apply are coming soon.",
  path: "/get-involved/logos-scholarship",
});

export default function LogosScholarshipPage() {
  return (
    <>
      <LightHero
        title={logosScholarship.title}
        intro={logosScholarship.intro}
        image="logos.hero"
        breadcrumbs={[{ label: "Get involved", href: "/get-involved" }, { label: "Logos Scholarship Fund" }]}
        flushBottom
      />

      <Section id="about-fund">
        <Grid templateColumns={{ base: "1fr", lg: "1.5fr 1fr" }} gap={{ base: "10", lg: "16" }} alignItems="start">
          <Stack gap="8" maxW="prose">
            {logosScholarship.sections.map((s) => (
              <Stack key={s.title} gap="2">
                <Heading as="h2" textStyle="h3">
                  {s.title}
                </Heading>
                <Text color="fg.muted">
                  <RichText text={s.text} />
                </Text>
              </Stack>
            ))}
          </Stack>
          <FactList facts={logosScholarship.facts} />
        </Grid>
      </Section>

      <NextStepBand
        title="Help a student study"
        text="Gifts to the church support programmes like this one."
        primary={{ label: "Give now", href: "/give" }}
        secondary={{ label: "Ask a question", href: "/contact" }}
      />
    </>
  );
}
