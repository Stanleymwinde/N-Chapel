import { Grid, Stack, Text } from "@chakra-ui/react";
import { kinara } from "@content/get-involved";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { FactList } from "@/components/FactList";
import { Form } from "@/components/Form";
import { NextStepBand } from "@/components/NextStepBand";
import { Pathway } from "@/components/Pathway";
import { LightHero } from "@/components/layout/LightHero";
import { Section } from "@/components/layout/Section";
import { CardBody, CardDescription, CardEyebrow, CardRoot, CardTitle } from "@/components/recipe-parts";
import { ChUl } from "@/components/primitives";

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
      />

      <Section id="overview" title="Is Kinara for you?">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: "8", lg: "16" }} alignItems="start">
          <Text textStyle="lead" color="fg.muted" maxW="prose">
            Kinara is for university or college graduates who want to pursue full-time ministry in Kenya or beyond. Over two years you
            grow from leading yourself to leading others.
          </Text>
          <FactList facts={kinara.facts} />
        </Grid>
      </Section>

      <Section id="apply" tone="warm" title="How to apply">
        <Pathway steps={kinara.steps} />
      </Section>

      <Section id="pipeline" title="The leadership pipeline" intro="Two levels, each with a clear focus.">
        <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: "5", md: "6" }}>
          {kinara.levels.map((l) => (
            <li key={l.level}>
              <CardRoot variant="group">
                <CardBody>
                  <CardEyebrow>{l.level}</CardEyebrow>
                  <CardTitle>{l.title}</CardTitle>
                  <CardDescription>
                    Focus: <strong>{l.focus.toLowerCase()}</strong>.{"summary" in l && l.summary ? ` ${l.summary}` : ""}
                  </CardDescription>
                  <ChUl pl="5" display="grid" gap="1.5" color="fg">
                    {l.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ChUl>
                </CardBody>
              </CardRoot>
            </li>
          ))}
        </Grid>
      </Section>

      <Section id="ask" tone="tint" title="Ask a question">
        <Stack gap="6">
          <Form form={kinara.questionForm} hideTitle />
        </Stack>
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
