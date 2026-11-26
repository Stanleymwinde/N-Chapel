import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { marketplace as m } from "@content/ministries/marketplace";
import { pageMetadata } from "@/lib/metadata";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { Section } from "@/components/layout/Section";
import { ChLi, ChOl, ChUl } from "@/components/primitives";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

export default function MarketplacePage() {
  return (
    <>
      <MinistryHero m={m} crumb="Marketplace Ministry" />

      {/* Why work matters: one statement, set large and centre */}
      <Section id="purpose" label="Why work matters">
        <Stack gap="5" maxW="52rem" mx="auto" textAlign="center" alignItems="center">
          <Text fontSize="0.875rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg">
            Why work matters
          </Text>
          <Text fontFamily="heading" fontWeight="600" fontSize={{ base: "1.375rem", md: "1.875rem" }} lineHeight="1.45" letterSpacing="-0.005em" textWrap="pretty">
            {m.purpose}
          </Text>
        </Stack>
      </Section>

      {/* How we do it: four numbered cards */}
      <Section id="how" tone="warm" title="How we do it">
        <ChOl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }} gap={{ base: "4", md: "5" }}>
          {m.how.map((h, i) => (
            <ChLi key={h.title} display="flex" flexDirection="column" gap="4" p={{ base: "6", md: "8" }} bg="bg.canvas" borderRadius="lg" borderWidth="1px" borderColor="border">
              <Box display="inline-flex" alignItems="center" justifyContent="center" w="12" h="12" borderRadius="full" bg="accent.highlight" color="ink.900" fontFamily="heading" fontWeight="700" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </Box>
              <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.375rem", md: "1.5rem" }} lineHeight="1.2">
                {h.title}
              </Heading>
              <Text lineHeight="1.7">{h.text}</Text>
            </ChLi>
          ))}
        </ChOl>
      </Section>

      {/* Six sectors, each a pair of areas */}
      <Section id="sectors" title="Every sector of society" intro="We serve professionals across six sectors, each pairing two areas.">
        <ChUl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }} borderTopWidth="2px" borderColor="ink.900" columnGap="10">
          {m.sectors.map(([a, b]) => (
            <ChLi key={a} py={{ base: "5", md: "7" }} borderBottomWidth="1px" borderColor="border" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.375rem", md: "1.75rem" }} lineHeight="1.2" letterSpacing="-0.01em">
              {a}{" "}
              <Text as="span" color="brand.fg" fontWeight="500">
                and
              </Text>{" "}
              {b}
            </ChLi>
          ))}
        </ChUl>
      </Section>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} />
    </>
  );
}
