import NextLink from "next/link";
import { Box, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { enzi as m } from "@content/ministries/enzi";
import { getPublication as getPublicationBySlug } from "@/lib/cms";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Icon } from "@/components/icons";
import { PdfDownload } from "@/components/share/PdfPreview";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { PublicationCover } from "@/components/publications/PublicationCover";
import { BulletList, MSection, ScriptureQuote } from "@/components/b/MinistryBlocks";
import { ChA } from "@/components/primitives";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

/** Figma "Icon": a 36px gold disc holding a 16px line icon. */
function IconDisc({ name, dark }: { name: Parameters<typeof Icon>[0]["name"]; dark?: boolean }) {
  return (
    <Box display="inline-flex" alignItems="center" justifyContent="center" w="36px" h="36px" borderRadius="full" bg={dark ? "accent.highlight" : "accent.subtle"} color="ink.900" aria-hidden="true" flexShrink={0}>
      <Icon name={name} size={16} />
    </Box>
  );
}

export default async function EnziPage() {
  const pub = await getPublicationBySlug("enzi-disability-ministry");
  const volunteerText = encodeURIComponent("Hello, my name is ______. 2Q (Enzi Volunteer)");

  return (
    <>
      <MinistryHero
        m={m}
        crumb="Enzi"
        actions={
          <LinkButton href="#what-we-do" variant="accent" size="lg">
            See what we do
          </LinkButton>
        }
      />

      <MSection id="why" afterHero>
        <Grid templateColumns={{ base: "1fr", lg: "564px minmax(0, 1fr)" }} gap={{ base: "10", lg: "20" }} alignItems="center">
          <Stack gap="4">
            <Heading as="h2" textStyle="h2">
              Why Enzi matters
            </Heading>
            <BulletList items={m.why} />
          </Stack>
          {m.scripture && <ScriptureQuote scripture={m.scripture} />}
        </Grid>
      </MSection>

      {/* What we do: five cards, and the sixth cell invites people to serve */}
      <MSection id="what-we-do" tone="warm" title="What we do" gap="8">
        <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }} gap="4">
          {m.activities.map((a) => (
            <Stack as="li" key={a.title} gap="3" px="22px" py="6" bg="bg.canvas" borderRadius="12px" borderWidth="1px" borderColor="border">
              <IconDisc name={a.icon} />
              <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.125rem" lineHeight="1.25">
                {a.title}
              </Heading>
              <Text fontSize="0.875rem" lineHeight="1.6" color="fg.muted">
                {a.text}
              </Text>
            </Stack>
          ))}

          <Stack as="li" id="serve" gap="3" px="22px" py="6" bg="fg" color="white" borderRadius="12px" scrollMarginTop="120px">
            <IconDisc name="heart" dark />
            <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.125rem" lineHeight="1.25" color="white">
              {m.serve.title}
            </Heading>
            <Text fontSize="0.875rem" lineHeight="1.6" color="rgba(255,255,255,0.85)">
              {m.serve.text}
            </Text>
            <Box as="dl" m="0" pt="1" display="grid" gap="2">
              {m.serve.codes.map((c) => (
                <HStack key={c.code} gap="2.5">
                  <Text as="dt" fontWeight="700" fontSize="0.75rem" bg="accent.highlight" color="ink.900" borderRadius="4px" px="7px" py="2px">
                    {c.code}
                  </Text>
                  <Text as="dd" m="0" fontSize="0.875rem" color="white">
                    {c.label}
                  </Text>
                </HStack>
              ))}
            </Box>
            <Box pt="1.5" mt="auto">
              <LinkButton href={`https://wa.me/254701777888?text=${volunteerText}`} variant="accent" external>
                WhatsApp to volunteer
              </LinkButton>
            </Box>
          </Stack>
        </Grid>
      </MSection>

      {/* Contact: two cards */}
      <MSection id="contact" title="Contact details">
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 444px))" }} gap="4">
          {m.contact.map((c) => (
            <HStack key={c.label} alignItems="flex-start" gap="14px" px="22px" pt="22px" pb="6" minH={{ md: "157px" }} borderRadius="12px" borderWidth="1px" borderColor="border">
              <IconDisc name={c.icon} />
              <Stack gap="1.5" minW="0">
                <Text fontSize="0.625rem" fontWeight="600" letterSpacing="0.06em" textTransform="uppercase" color="fg.muted">
                  {c.label}
                </Text>
                <ChA
                  href={c.href}
                  fontWeight="600"
                  fontSize="1.125rem"
                  color="fg"
                  textDecoration="underline"
                  textUnderlineOffset="0.2em"
                  overflowWrap="anywhere"
                  _hover={{ color: "brand.fg" }}
                >
                  {c.value}
                </ChA>
                {c.note && (
                  <Text fontSize="0.875rem" color="fg.muted">
                    {c.note}
                  </Text>
                )}
                {c.whatsapp && (
                  // Figma: small 13px outline pills
                  <HStack gap="2" pt="1.5" flexWrap="wrap" css={{ "& .nc-button": { minH: "0", px: "14px", py: "6px", fontSize: "0.8125rem" } }}>
                    <LinkButton href={c.href} variant="secondary">
                      Call
                    </LinkButton>
                    <LinkButton href={c.whatsapp} variant="secondary" external>
                      WhatsApp
                    </LinkButton>
                  </HStack>
                )}
              </Stack>
            </HStack>
          ))}
        </Grid>
      </MSection>

      {/* The Enzi publication, its cover resting on a warm panel */}
      <MSection id="publication" tone="warm">
        <Grid templateColumns={{ base: "1fr", md: "minmax(0, 1fr) 312px" }} gap={{ base: "10", lg: "16" }} alignItems="center">
          <Stack gap="14px" alignItems="flex-start">
            <Heading as="h2" textStyle="h2">
              Learn more about Enzi
            </Heading>
            <Text fontSize={{ base: "1rem", md: "1.0625rem" }} lineHeight="1.6" color="fg.muted" maxW="600px">
              {m.document.description}
            </Text>
            <Text fontSize="0.875rem" fontWeight="600">
              {m.document.title} (PDF, {m.document.date})
            </Text>
            <PdfDownload pdfUrl={m.document.pdfUrl} title={m.document.title} fileSize={m.document.fileSize} variant="primary" />
          </Stack>
          {pub && (
            <ChA asChild display="block" maxW={{ base: "240px", md: "none" }} borderRadius="md" transition="transform 200ms cubic-bezier(0.23, 1, 0.32, 1)" _active={{ transform: "scale(0.98)" }} css={{ "@media (hover: hover) and (pointer: fine)": { "&:hover": { transform: "translateY(-3px)" } } }}>
              <NextLink href={`/publications/${pub.slug}`} aria-label={`${pub.title} publication page`}>
                <PublicationCover pub={pub} size="lg" />
              </NextLink>
            </ChA>
          )}
        </Grid>
      </MSection>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} variant="design" />
    </>
  );
}
