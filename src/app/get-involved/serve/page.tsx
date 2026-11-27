import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { serve } from "@content/get-involved";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Form } from "@/components/Form";
import { NextStepBand } from "@/components/NextStepBand";
import { FormWithAside, SignUpSteps } from "@/components/get-involved/GetInvolvedParts";
import { TeamFinder } from "@/components/get-involved/TeamFinder";
import { LightHero } from "@/components/layout/LightHero";
import { Section } from "@/components/layout/Section";

export const metadata = pageMetadata({
  title: "Serve on a team",
  description:
    "Use your time, talents and spiritual gifts to serve at Nairobi Chapel Ngong Road: greeters, ushers, worship, children, youth, outreach and media teams.",
  path: "/get-involved/serve",
});

export default function ServePage() {
  return (
    <>
      <LightHero
        title={serve.title}
        intro={serve.heroIntro}
        image="serve.hero"
        breadcrumbs={[{ label: "Get involved", href: "/get-involved" }, { label: "Serve on a team" }]}
        actions={
          <LinkButton href="#serve-form" variant="primary" size="lg">
            Sign up to serve
          </LinkButton>
        }
      />

      <Box as="section" id="how" aria-labelledby="how-heading" bg="bg.warm" py={{ base: "16", md: "20", lg: "24" }}>
        <Box maxW="container" mx="auto" px={{ base: "5", md: "8" }}>
          <Grid templateColumns={{ base: "minmax(0, 1fr)", lg: "minmax(0, 508px) minmax(0, 620px)" }} justifyContent="space-between" gap={{ base: "10", lg: "8" }} alignItems="start">
            <Stack gap="5">
              <Text fontSize="0.78125rem" fontWeight="600" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg" lineHeight="normal">
                {serve.eyebrow}
              </Text>
              <Heading as="h2" id="how-heading" fontFamily="heading" fontWeight="700" fontSize={{ base: "2.25rem", md: "3rem" }} lineHeight="1.08" maxW="22rem">
                {serve.heading}
              </Heading>
              <Box as="figure" m="0" borderInlineStartWidth="3px" borderColor="accent.highlight" ps="18px" display="grid" gap="2">
                <Text as="blockquote" m="0" fontWeight="500" fontSize={{ base: "1.0625rem", md: "1.125rem" }} lineHeight="1.55" color="ink.700">
                  “{serve.intro}”
                </Text>
                <Text as="figcaption" fontSize="0.8125rem" color="fg.muted" lineHeight="normal">
                  {serve.scripture.reference} · {serve.source}
                </Text>
              </Box>
              <SignUpSteps steps={serve.steps} />
            </Stack>
            <TeamFinder teams={serve.teams} areas={serve.teamAreas} guide={serve.document} formId="serve-form" note={serve.teamsTodo} />
          </Grid>
        </Box>
      </Box>

      <Section id="serve-form" title="Tell us you’d like to serve">
        <Box mt={{ md: "-3" }}>
          <FormWithAside formWidth={708} aside={{ ...serve.formAside, imageHeight: 489 }}>
            <Form form={serve.form} prefillFromQuery={{ team: "team" }} hideTitle />
          </FormWithAside>
        </Box>
      </Section>

      <NextStepBand
        title="Serve alongside friends"
        text="Joining a group is the best way to keep growing while you serve."
        primary={{ label: "Find a group", href: "/get-involved/groups" }}
        secondary={{ label: "Join the next Plug-In", href: "/new-here/next-steps" }}
      />
    </>
  );
}
