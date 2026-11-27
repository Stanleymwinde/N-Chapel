import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { nextSteps, nextStepsForm } from "@content/new-here";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Img } from "@/components/Img";
import { RichText } from "@/components/RichText";
import { enter, FormCard, Ringed, sectionHeading, SmallCrumbs, WelcomeRibbons, Wrap } from "@/components/new-here/NewHereParts";
import { ChLi, ChOl } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "Next steps",
  description: "Plug-In, the New Believers class, baptism, eGroups and serving: simple next steps to grow in faith at Nairobi Chapel Ngong Road.",
  path: "/new-here/next-steps",
});

export default function NextStepsPage() {
  return (
    <>
      {/* Hero: centred title with "next" ringed, then a wide photograph */}
      <Box as="header" bg="bg.canvas" pt={{ base: "8", md: "10" }} pb={{ base: "16", md: "24" }}>
        <Wrap>
          <SmallCrumbs items={[{ label: "New Here", href: "/new-here" }, { label: "Next steps" }]} />
          <Stack alignItems="center" textAlign="center" gap="0" pt={{ base: "10", md: "60px" }}>
            <Heading as="h1" fontFamily="heading" fontWeight="600" fontSize={{ base: "3rem", md: "4.75rem" }} lineHeight="1.25" letterSpacing="-0.02em" css={enter(0)}>
              Your <Ringed>next</Ringed> step
            </Heading>
            <Text pt="22px" pb="6" fontWeight="500" fontSize={{ base: "1.25rem", md: "1.375rem" }} lineHeight="1.4" maxW="440px" css={enter(90)}>
              {nextSteps.intro}
            </Text>
            <Box css={enter(150)}>
              <LinkButton href="#sign-up" variant="accent" arrow>
                Sign up for a step
              </LinkButton>
            </Box>
          </Stack>
          <Box position="relative" mt={{ base: "10", md: "16" }} aspectRatio={{ base: "4 / 3", md: "1200 / 423" }} borderRadius="14px" overflow="hidden" bg="bg.muted" css={enter(210)}>
            <Img slot="nextsteps.hero" priority sizes="(min-width: 1280px) 1200px, 100vw" />
          </Box>
        </Wrap>
      </Box>

      {/* Five steps as numbered rows */}
      <Box as="section" aria-labelledby="steps-heading" bg="bg.canvas" pb={{ base: "16", md: "24" }}>
        <Wrap>
          <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) 564px" }} gap={{ base: "3", lg: "16" }} alignItems="start">
            <Heading as="h2" id="steps-heading" {...sectionHeading}>
              Five steps to grow
            </Heading>
            <Text fontSize="1.0625rem" lineHeight="1.55" color="fg.muted" pt={{ lg: "1" }}>
              Take them in order, or start where you are. Each one has a team ready to walk with you.
            </Text>
          </Grid>

          <ChOl listStyle="none" m="0" p="0">
            {nextSteps.steps.map((s, i) => (
              <ChLi
                key={s.title}
                display="grid"
                gridTemplateColumns={{ base: "1fr", md: "120px minmax(0, 1fr)", lg: "168px minmax(0, 744px) minmax(0, 1fr)" }}
                gap={{ base: "4", md: "0" }}
                alignItems="start"
                py="10"
                borderBottomWidth="1px"
                borderColor="border"
              >
                <Text
                  aria-hidden="true"
                  fontFamily="heading"
                  fontWeight="600"
                  fontSize={{ base: "3rem", md: "4rem" }}
                  lineHeight="1"
                  color="transparent"
                  css={{ WebkitTextStroke: "1.5px var(--chakra-colors-accent-highlight)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </Text>
                <Stack gap={s.bullets ? "3" : "2.5"} minW="0">
                  <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.625rem", md: "1.875rem" }} lineHeight="1.25" letterSpacing="-0.005em">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </Heading>
                  {s.when && (
                    <Text fontWeight="600" color="brand.fg">
                      <RichText text={s.when} />
                    </Text>
                  )}
                  <Text lineHeight="1.65">
                    <RichText text={s.summary} />
                  </Text>
                  {s.bullets && (
                    <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="10px">
                      {s.bullets.map((b) => {
                        const [head, ...rest] = b.split(":");
                        return (
                          <Box as="li" key={b} p="4" borderRadius="10px" bg="bg.warm" display="grid" gap="1.5" alignContent="start">
                            <Text as="span" fontWeight="600" fontSize="0.9375rem">
                              {head}
                            </Text>
                            <Text as="span" color="fg.muted" fontSize="0.875rem" lineHeight="1.55">
                              {rest.join(":").trim().replace(/^\p{L}/u, (c) => c.toUpperCase())}
                            </Text>
                          </Box>
                        );
                      })}
                    </Grid>
                  )}
                </Stack>
                {s.cta && (
                  <Box gridColumn={{ base: "1", md: "2", lg: "3" }} justifySelf={{ lg: "end" }} pt={{ md: "4", lg: "0" }}>
                    <LinkButton href={s.cta.href} variant={i === 0 ? "primary" : "secondary"}>
                      {s.cta.label}
                    </LinkButton>
                  </Box>
                )}
              </ChLi>
            ))}
          </ChOl>
        </Wrap>
      </Box>

      <WelcomeRibbons tall />

      <Box as="section" id="sign-up" aria-label="Sign up for a next step" bg="bg.warm" pb={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Wrap>
          <FormCard form={nextStepsForm} />
        </Wrap>
      </Box>
    </>
  );
}
