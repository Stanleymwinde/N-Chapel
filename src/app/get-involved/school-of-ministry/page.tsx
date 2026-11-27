import { Box } from "@chakra-ui/react";
import { schoolOfMinistry } from "@content/get-involved";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Form } from "@/components/Form";
import { NextStepBand } from "@/components/NextStepBand";
import { FormWithAside, IntroWithFacts } from "@/components/get-involved/GetInvolvedParts";
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
        titleMaxW="360px"
        breadcrumbs={[{ label: "Get involved", href: "/get-involved" }, { label: "School of Ministry" }]}
        actions={
          <LinkButton href="#register" variant="primary" size="lg">
            Register your interest
          </LinkButton>
        }
        flushBottom
      />

      <Section id="details" title="Course details">
        <Box mt={{ md: "-2" }}>
          <IntroWithFacts text={schoolOfMinistry.overview} facts={schoolOfMinistry.facts} />
        </Box>
      </Section>

      <Section id="register" tone="warm" title="Register your interest" intro="We’ll let you know when the next intake opens.">
        <FormWithAside aside={{ ...schoolOfMinistry.formAside, imageHeight: 366 }}>
          <Form form={schoolOfMinistry.form} hideTitle />
        </FormWithAside>
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
