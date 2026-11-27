import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { marketplace as m } from "@content/ministries/marketplace";
import { pageMetadata } from "@/lib/metadata";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { MSection } from "@/components/b/MinistryBlocks";
import { ChLi, ChOl, ChUl } from "@/components/primitives";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

export default function MarketplacePage() {
  return (
    <>
      <MinistryHero m={m} crumb="Marketplace Ministry" />

      {/* Why work matters: one statement, set large and centre */}
      <MSection id="purpose" afterHero label="Why work matters">
        <Stack gap="18px" maxW="720px" mx="auto" textAlign="center" alignItems="center">
          <Text fontSize="0.75rem" fontWeight="600" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg">
            Why work matters
          </Text>
          <Text fontFamily="heading" fontWeight="500" fontSize={{ base: "1.375rem", md: "1.625rem" }} lineHeight="1.5" textWrap="pretty">
            {m.purpose}
          </Text>
        </Stack>
      </MSection>

      {/* How we do it: four numbered cards */}
      <MSection id="how" tone="warm" title="How we do it" gap="8">
        <ChOl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }} gap="4">
          {m.how.map((h, i) => (
            <ChLi key={h.title} display="flex" flexDirection="column" gap="3" px="22px" pt="6" pb="26px" minH={{ lg: "280px" }} bg="bg.canvas" borderRadius="14px" borderWidth="1px" borderColor="border">
              <Box display="inline-flex" alignItems="center" justifyContent="center" w="36px" h="36px" borderRadius="full" bg="accent.highlight" color="ink.900" fontSize="0.8125rem" fontWeight="600" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </Box>
              <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.1875rem" lineHeight="1.25">
                {h.title}
              </Heading>
              <Text fontSize="0.9375rem" lineHeight="1.6" color="fg.muted">
                {h.text}
              </Text>
            </ChLi>
          ))}
        </ChOl>
      </MSection>

      {/* Six sectors, each a pair of areas */}
      <MSection id="sectors" title="Every sector of society" intro="We serve professionals across six sectors, each pairing two areas." headGap="3.5" gap="7">
        <ChUl listStyle="none" m="0" p="0" display="grid" gridTemplateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }} borderTopWidth="1.5px" borderColor="fg" columnGap="34px">
          {m.sectors.map(([a, b], i) => (
            // Figma: rules under the first row only
            <ChLi key={a} py="22px" borderBottomWidth={{ base: "1px", lg: i < 3 ? "1px" : "0" }} borderColor="border" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.25rem", md: "1.375rem" }} lineHeight="1.25">
              {a}{" "}
              <Text as="span" color="brand.fg" fontWeight="400">
                and
              </Text>{" "}
              {b}
            </ChLi>
          ))}
        </ChUl>
      </MSection>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} variant="design" />
    </>
  );
}
