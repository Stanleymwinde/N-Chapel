import { Box, Container, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { nextSteps, nextStepsForm } from "@content/new-here";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Form } from "@/components/Form";
import { Img } from "@/components/Img";
import { RichText } from "@/components/RichText";
import { Circled } from "@/components/ministries/Circled";
import { CentreHeader, WelcomeRibbons } from "@/components/new-here/NewHereParts";
import { ChLi, ChOl } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "Next steps",
  description: "Plug-In, the New Believers class, baptism, eGroups and serving: simple next steps to grow in faith at Nairobi Chapel Ngong Road.",
  path: "/new-here/next-steps",
});

export default function NextStepsPage() {
  return (
    <>
      <CentreHeader
        crumbs={[{ label: "New Here", href: "/new-here" }, { label: "Next steps" }]}
        title={
          <>
            Your <Circled>next</Circled> step
          </>
        }
        lead={nextSteps.intro}
      >
        <LinkButton href="#sign-up" variant="accent" size="lg" arrow>
          Sign up for a step
        </LinkButton>
      </CentreHeader>

      {/* A wide photograph, then the five steps as numbered rows */}
      <Box as="section" aria-labelledby="steps-heading" bg="bg.canvas" pb={{ base: "20", md: "28" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Box position="relative" aspectRatio={{ base: "4 / 3", md: "21 / 9" }} borderRadius={{ base: "xl", md: "2xl" }} overflow="hidden" bg="bg.muted" mb={{ base: "16", md: "24" }}>
            <Img slot="nextsteps.hero" priority sizes="(min-width: 1280px) 1200px, 100vw" />
          </Box>

          <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) minmax(0, 1fr)" }} gap={{ base: "3", lg: "16" }} alignItems="end" mb={{ base: "6", md: "10" }}>
            <Heading as="h2" id="steps-heading" fontFamily="heading" fontWeight="700" fontSize={{ base: "2.25rem", md: "3.25rem" }} lineHeight="1.05" letterSpacing="-0.02em">
              Five steps to grow
            </Heading>
            <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.7" maxW="32rem">
              Take them in order, or start where you are. Each one has a team ready to walk with you.
            </Text>
          </Grid>

          <ChOl listStyle="none" m="0" p="0" borderTopWidth="2px" borderColor="ink.900">
            {nextSteps.steps.map((s, i) => (
              <ChLi
                key={s.title}
                display="grid"
                gridTemplateColumns={{ base: "1fr", md: "6rem minmax(0, 1fr)", lg: "8rem minmax(0, 1fr) 15rem" }}
                gap={{ base: "4", md: "8" }}
                alignItems="start"
                py={{ base: "10", md: "12" }}
                borderBottomWidth="1px"
                borderColor="border"
              >
                <Text aria-hidden="true" fontFamily="heading" fontWeight="700" fontSize={{ base: "3rem", md: "4.5rem" }} lineHeight="0.9" letterSpacing="-0.04em" color="accent.highlight" css={{ WebkitTextStroke: "1.5px var(--chakra-colors-ink-900)" }}>
                  {String(i + 1).padStart(2, "0")}
                </Text>
                <Stack gap="3" minW="0">
                  <Heading as="h3" fontFamily="heading" fontWeight="700" fontSize={{ base: "1.75rem", md: "2.25rem" }} lineHeight="1.1" letterSpacing="-0.015em">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </Heading>
                  {s.when && (
                    <Text fontWeight="700" color="brand.fg">
                      <RichText text={s.when} />
                    </Text>
                  )}
                  <Text fontSize={{ base: "1.0625rem", md: "1.125rem" }} lineHeight="1.75" maxW="44rem">
                    <RichText text={s.summary} />
                  </Text>
                  {s.bullets && (
                    <Grid as="ul" listStyle="none" m="0" mt="2" p="0" templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="3" maxW="48rem">
                      {s.bullets.map((b) => {
                        const [head, ...rest] = b.split(":");
                        return (
                          <Box as="li" key={b} p="4" borderRadius="lg" bg="bg.warm" lineHeight="1.6">
                            {rest.length ? (
                              <>
                                <Text as="span" display="block" fontWeight="700" mb="1">
                                  {head}
                                </Text>
                                <Text as="span" color="fg.muted">
                                  {rest.join(":").trim().replace(/^\p{L}/u, (c) => c.toUpperCase())}
                                </Text>
                              </>
                            ) : (
                              b
                            )}
                          </Box>
                        );
                      })}
                    </Grid>
                  )}
                </Stack>
                {s.cta && (
                  <Box gridColumn={{ base: "1", md: "2", lg: "3" }} justifySelf={{ lg: "end" }} pt={{ lg: "2" }}>
                    <LinkButton href={s.cta.href} variant={i === 0 ? "primary" : "secondary"}>
                      {s.cta.label}
                    </LinkButton>
                  </Box>
                )}
              </ChLi>
            ))}
          </ChOl>
        </Container>
      </Box>

      <WelcomeRibbons />

      <Box as="section" id="sign-up" aria-label="Sign up for a next step" bg="bg.warm" pb={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Container maxW="48rem" px={{ base: "5", md: "8" }}>
          <Box p={{ base: "6", md: "10" }} bg="bg.canvas" borderRadius="xl" boxShadow="0 24px 60px -30px rgba(22, 18, 31, 0.3)">
            <Form form={nextStepsForm} plain />
          </Box>
        </Container>
      </Box>
    </>
  );
}
