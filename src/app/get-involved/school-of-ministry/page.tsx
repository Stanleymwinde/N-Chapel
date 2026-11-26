import { Grid, Text } from "@chakra-ui/react";
import { schoolOfMinistry } from "@content/get-involved";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { FactList } from "@/components/FactList";
import { Form } from "@/components/Form";
import { NextStepBand } from "@/components/NextStepBand";
import { LightHero } from "@/components/layout/LightHero";
import { Section } from "@/components/layout/Section";

export const metadata = pageMetadata({
  title: "School of Ministry",
  description:
    "School of Ministry at Nairobi Chapel Ngong Road equips you with tools to lead, serve and transform lives through Christ, whether you're new to ministry or sharpening your skills.",
  path: "/get-involved/school-of-ministry",
});

export default function SchoolOfMinistryPage() {
  return (
    <>
      <LightHero
        title={schoolOfMinistry.title}
        intro={schoolOfMinistry.intro}
        image="school.hero"
        breadcrumbs={[{ label: "Get involved", href: "/get-involved" }, { label: "School of Ministry" }]}
        actions={
          <LinkButton href="#register" variant="primary" size="lg">
            Register your interest
          </LinkButton>
        }
      />

      <Section id="details" title="Course details">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1.2fr" }} gap={{ base: "8", lg: "16" }} alignItems="start">
          <Text textStyle="lead" color="fg.muted" maxW="prose">
            Whether you&apos;re taking your first steps in ministry or have served for years, School of Ministry gives you practical tools
            to lead and serve well.
          </Text>
          <FactList facts={schoolOfMinistry.facts} />
        </Grid>
      </Section>

      <Section id="register" tone="warm" title="Register your interest" intro="We'll let you know when the next intake opens.">
        <Form form={schoolOfMinistry.form} hideTitle />
      </Section>

      <NextStepBand
        title="Ready for more?"
        text="Kinara is a two-year leadership programme for graduates called to full-time ministry."
        primary={{ label: "Explore Kinara", href: "/get-involved/kinara" }}
        secondary={{ label: "Serve on a team", href: "/get-involved/serve" }}
      />
    </>
  );
}
