import { Box, Container, Grid, Heading, Text } from "@chakra-ui/react";
import { ministriesOverview as page } from "@content/ministries";
import { pageMetadata } from "@/lib/metadata";
import { RichText } from "@/components/RichText";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Circled } from "@/components/ministries/Circled";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { MinistryPhotoCard } from "@/components/ministries/MinistryPhotoCard";

export const metadata = pageMetadata({ title: page.meta.title, description: page.meta.description, path: "/ministries" });

const enter = (delay: number) => ({ animation: `heroIn 700ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms both` });

/** Section heading after the reference site: large, left, with one plain line beside it. */
function SectionHead({ id, title, text }: { id: string; title: string; text: string }) {
  return (
    <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) minmax(0, 1fr)" }} gap={{ base: "3", lg: "16" }} alignItems="end" mb={{ base: "8", md: "12" }}>
      <Heading as="h2" id={id} textStyle="h2">
        {title}
      </Heading>
      <Text fontSize={{ base: "1.0625rem", md: "1.125rem" }} lineHeight="1.6" color="fg.muted" maxW="32rem" textWrap="pretty">
        {text}
      </Text>
    </Grid>
  );
}

export default function MinistriesPage() {
  // The index closes on an invitation to serve, so the grid fills evenly (4 × 2)
  const focus = [
    ...page.byFocus,
    { name: "Serve on a team", href: "/get-involved/serve", summary: "Find a serving team that fits your gifts and your time.", who: "Everyone", image: "serve.hero" },
  ];

  return (
    <>
      {/* Header: the title ringed in gold, set centre, with one bold line under it */}
      <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "14", md: "20" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          {/* 12px breadcrumb, as on the ministry pages */}
          <Box css={{ "& nav": { fontSize: "0.75rem" } }}>
            <Breadcrumbs items={[{ label: "Ministries" }]} tone="light" />
          </Box>
          <Box textAlign="center" pt={{ base: "12", md: "16" }} maxW="56rem" mx="auto">
            <Heading as="h1" fontFamily="heading" fontWeight="600" fontSize="clamp(3rem, 1.6rem + 5.4vw, 6rem)" lineHeight="1.1" letterSpacing="-0.02em" css={enter(0)}>
              <Circled>{page.title}</Circled>
            </Heading>
            <Text mt={{ base: "8", md: "10" }} fontFamily="heading" fontWeight="500" fontSize={{ base: "1.25rem", md: "1.625rem" }} lineHeight="1.4" textWrap="balance" css={enter(100)}>
              <RichText text={page.intro} />
            </Text>
          </Box>
        </Container>
      </Box>

      {/* For every age and stage: three large cards */}
      <Box as="section" aria-labelledby="by-age-heading" id="by-age" bg="bg.canvas" pb={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <SectionHead id="by-age-heading" title="For every age and stage" text="Children, teenagers and young adults each have a ministry of their own." />
          <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "repeat(3, minmax(0, 1fr))" }} gap={{ base: "14", md: "8" }}>
            {page.byAge.map((m) => (
              <li key={m.href}>
                <MinistryPhotoCard m={m} ratio="4 / 3" priority />
              </li>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* By focus: a grid of smaller cards */}
      <Box as="section" aria-labelledby="by-focus-heading" id="by-focus" bg="bg.canvas" pb={{ base: "16", md: "24" }} scrollMarginTop="96px">
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Box borderTopWidth="1px" borderColor="border" pt={{ base: "14", md: "20" }}>
            <SectionHead id="by-focus-heading" title="By focus" text="Ways to pray, grow, care and serve, whatever your age." />
          </Box>
          <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }} columnGap="6" rowGap={{ base: "12", md: "14" }}>
            {focus.map((m) => (
              <li key={m.href}>
                <MinistryPhotoCard m={m} size="md" ratio="4 / 3" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
              </li>
            ))}
          </Grid>
        </Container>
      </Box>

      <MinistryClosing {...page.nextStep} variant="design" />
    </>
  );
}
