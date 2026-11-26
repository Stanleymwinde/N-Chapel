import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { serve } from "@content/get-involved";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Form } from "@/components/Form";
import { PdfDownload } from "@/components/share/PdfPreview";
import { NextStepBand } from "@/components/NextStepBand";
import { Pathway } from "@/components/Pathway";
import { RichText } from "@/components/RichText";
import { LightHero } from "@/components/layout/LightHero";
import { Section } from "@/components/layout/Section";
import { ChLi, ChUl } from "@/components/primitives";

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
        intro="Find a team where your time, talents and gifts make Sunday, and every day, better for others."
        image="serve.hero"
        breadcrumbs={[{ label: "Get involved", href: "/get-involved" }, { label: "Serve on a team" }]}
        actions={
          <LinkButton href="#serve-form" variant="primary" size="lg">
            Sign up to serve
          </LinkButton>
        }
      />

      <Section id="teams" title="Teams you can join">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1.4fr" }} gap={{ base: "8", lg: "16" }} alignItems="start">
          <Stack gap="4" maxW="prose">
            <Text as="blockquote" textStyle="h3" fontWeight="600" color="fg" borderInlineStartWidth="4px" borderColor="accent.highlight" pl="5">
              {serve.intro}
            </Text>
            <Text color="fg.muted">
              {serve.scripture.reference}. {serve.source}
            </Text>
          </Stack>
          <Box>
            <ChUl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} borderTopWidth="1px" borderColor="border">
              {serve.teams.map((t) => (
                <ChLi key={t} py="4" borderBottomWidth="1px" borderColor="border" textStyle="h4" pr="4">
                  {t}
                </ChLi>
              ))}
            </ChUl>
            <Text textStyle="small" color="fg.muted" mt="4">
              <RichText text={serve.teamsTodo} />
            </Text>
          </Box>
        </Grid>
      </Section>

      <Section id="how" tone="warm" title="How to sign up">
        <Pathway steps={serve.steps} />
      </Section>

      <Section id="serving-opportunities" title="Serving Opportunities" compact>
        <Stack gap="4" maxW="prose" alignItems="flex-start">
          <Heading as="h3" textStyle="h4">
            {serve.document.title}
          </Heading>
          <Text color="fg.muted">{serve.document.description}</Text>
          <PdfDownload pdfUrl={serve.document.pdfUrl} title={serve.document.title} fileSize={serve.document.fileSize} />
        </Stack>
      </Section>

      <Section id="serve-form" title="Tell us you'd like to serve">
        <Grid templateColumns={{ base: "1fr", lg: "1.5fr 1fr" }} gap={{ base: "8", lg: "12" }} alignItems="start">
          <Form form={serve.form} hideTitle />
          <Stack gap="3" p={{ base: "5", md: "6" }} borderRadius="lg" bg="bg.tint">
            <Heading as="h3" textStyle="h4">
              New to Nairobi Chapel?
            </Heading>
            <Text color="fg.muted">
              Plug-In, our 10-week course, includes a six-month internship serving as a greeter, usher, in outreach, or in adult, youth and
              children&apos;s ministries. It&apos;s a great way to start.
            </Text>
            <Box>
              <LinkButton href="/new-here/next-steps" variant="link">
                Learn about Plug-In
              </LinkButton>
            </Box>
          </Stack>
        </Grid>
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
