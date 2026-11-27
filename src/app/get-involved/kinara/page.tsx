import { Box, Grid } from "@chakra-ui/react";
import { kinara } from "@content/get-involved";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Form } from "@/components/Form";
import { NextStepBand } from "@/components/NextStepBand";
import { ApplySteps, FormWithAside, IntroWithFacts, LevelCard } from "@/components/get-involved/GetInvolvedParts";
import { LightHero } from "@/components/layout/LightHero";
import { Section } from "@/components/layout/Section";

export const metadata = pageMetadata({
  title: "Kinara leadership programme",
  description:
    "Kinara is a two-year leadership development programme for graduates who are passionate about Jesus and want a life in full-time ministry. See how to apply.",
  path: "/get-involved/kinara",
});

export default function KinaraPage() {
  return (
    <>
      <LightHero
        title={kinara.title}
        intro={kinara.intro}
        image="kinara.hero"
        media={{ width: 535, height: 429 }}
        titleMaxW="400px"
        breadcrumbs={[{ label: "Get involved", href: "/get-involved" }, { label: "Kinara" }]}
        actions={
          <>
            <LinkButton href={kinara.applicationFormUrl} variant="primary" size="lg">
              Download the application form
            </LinkButton>
            <LinkButton href="#ask" variant="secondary" size="lg">
              Ask a question
            </LinkButton>
          </>
        }
        flushBottom
      />

      <Section id="overview" title="Is Kinara for you?">
        <Box mt={{ md: "-2" }}>
          <IntroWithFacts text={kinara.overview} facts={kinara.facts} />
        </Box>
      </Section>

      <Section id="apply" tone="warm" title="How to apply">
        <ApplySteps steps={kinara.steps} />
      </Section>

      <Section id="pipeline" title="The leadership pipeline" intro="Two levels, each with a clear focus.">
        <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="5">
          {kinara.levels.map((l) => (
            <li key={l.level}>
              <LevelCard level={l.level} title={l.title} focus={l.focus} summary={"summary" in l ? l.summary : undefined} points={l.points} />
            </li>
          ))}
        </Grid>
      </Section>

      <Section id="ask" tone="tint" title="Ask a question">
        <Box mt={{ md: "-3" }}>
          <FormWithAside aside={{ ...kinara.questionAside, imageHeight: 364, tone: "white" }}>
            <Form form={kinara.questionForm} hideTitle />
          </FormWithAside>
        </Box>
      </Section>

      <NextStepBand
        title="Not ready for full-time ministry yet?"
        text="School of Ministry equips you to lead and serve wherever you are."
        primary={{ label: "Explore School of Ministry", href: "/get-involved/school-of-ministry" }}
        secondary={{ label: "Serve on a team", href: "/get-involved/serve" }}
      />
    </>
  );
}
