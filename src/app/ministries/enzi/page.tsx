import NextLink from "next/link";
import { Box, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { enzi as m } from "@content/ministries/enzi";
import { getPublicationBySlug } from "@content/publications";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Icon } from "@/components/icons";
import { PdfDownload } from "@/components/share/PdfPreview";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { PublicationCover } from "@/components/publications/PublicationCover";
import { Section } from "@/components/layout/Section";
import { BulletList, ScriptureQuote } from "@/components/b/MinistryBlocks";
import { ChA } from "@/components/primitives";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

/** A gold disc holding a line icon, as used across the ministry pages. */
function IconDisc({ name, dark }: { name: Parameters<typeof Icon>[0]["name"]; dark?: boolean }) {
  return (
    <Box display="inline-flex" alignItems="center" justifyContent="center" w="12" h="12" borderRadius="full" bg={dark ? "accent.highlight" : "accent.subtle"} color="ink.900" aria-hidden="true" flexShrink={0}>
      <Icon name={name} size={22} />
    </Box>
  );
}

export default function EnziPage() {
  const pub = getPublicationBySlug("enzi-disability-ministry");
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

      <Section id="why">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: "10", lg: "16" }} alignItems="center">
          <Stack gap="5" maxW="prose">
            <Heading as="h2" textStyle="h2">
              Why Enzi matters
            </Heading>
            <BulletList items={m.why} />
          </Stack>
          {m.scripture && <ScriptureQuote scripture={m.scripture} />}
        </Grid>
      </Section>

      {/* What we do: five cards, and the sixth cell invites people to serve */}
      <Section id="what-we-do" tone="warm" title="What we do">
        <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }} gap={{ base: "4", md: "5" }}>
          {m.activities.map((a) => (
            <Stack as="li" key={a.title} gap="4" p={{ base: "6", md: "8" }} bg="bg.canvas" borderRadius="lg" borderWidth="1px" borderColor="border">
              <IconDisc name={a.icon} />
              <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.375rem", md: "1.5rem" }} lineHeight="1.2">
                {a.title}
              </Heading>
              <Text lineHeight="1.7">{a.text}</Text>
            </Stack>
          ))}

          <Stack as="li" id="serve" gap="4" p={{ base: "6", md: "8" }} bg="night.900" color="white" borderRadius="lg" scrollMarginTop="120px">
            <IconDisc name="heart" dark />
            <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.375rem", md: "1.5rem" }} lineHeight="1.2" color="white">
              {m.serve.title}
            </Heading>
            <Text lineHeight="1.7" color="rgba(255,255,255,0.9)">
              {m.serve.text}
            </Text>
            <Box as="dl" m="0" display="grid" gap="2">
              {m.serve.codes.map((c) => (
                <HStack key={c.code} gap="3">
                  <Text as="dt" fontFamily="heading" fontWeight="700" fontSize="1.125rem" bg="accent.highlight" color="ink.900" borderRadius="md" px="2.5" lineHeight="1.6">
                    {c.code}
                  </Text>
                  <Text as="dd" m="0" color="rgba(255,255,255,0.9)">
                    {c.label}
                  </Text>
                </HStack>
              ))}
            </Box>
            <Box pt="2" mt="auto">
              <LinkButton href={`https://wa.me/254701777888?text=${volunteerText}`} variant="accent" external>
                WhatsApp to volunteer
              </LinkButton>
            </Box>
          </Stack>
        </Grid>
      </Section>

      {/* Contact: two cards, the way the reference site sets its two paths */}
      <Section id="contact" title="Contact details">
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }} gap="5" maxW="56rem">
          {m.contact.map((c) => (
            <HStack key={c.label} alignItems="flex-start" gap="5" p={{ base: "6", md: "8" }} borderRadius="lg" borderWidth="1px" borderColor="border">
              <IconDisc name={c.icon} />
              <Stack gap="1.5" minW="0">
                <Text fontSize="0.75rem" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="fg.muted">
                  {c.label}
                </Text>
                <ChA
                  href={c.href}
                  fontFamily="heading"
                  fontWeight="600"
                  fontSize={{ base: "1.25rem", md: "1.5rem" }}
                  color="fg"
                  textDecoration="underline"
                  textDecorationColor="accent.highlight"
                  textDecorationThickness="2px"
                  textUnderlineOffset="0.22em"
                  overflowWrap="anywhere"
                  _hover={{ color: "brand.fg" }}
                >
                  {c.value}
                </ChA>
                {c.note && <Text color="fg.muted">{c.note}</Text>}
                {c.whatsapp && (
                  <HStack gap="3" pt="3" flexWrap="wrap">
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
      </Section>

      {/* The Enzi publication, its cover resting on a warm panel */}
      <Section id="publication" tone="warm">
        <Grid templateColumns={{ base: "1fr", md: "minmax(0, 1fr) 320px" }} gap={{ base: "10", lg: "16" }} alignItems="center">
          <Stack gap="5" maxW="prose" alignItems="flex-start">
            <Heading as="h2" textStyle="h2">
              Learn more about Enzi
            </Heading>
            <Text textStyle="lead">{m.document.description}</Text>
            <Text fontWeight="700">
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
      </Section>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} />
    </>
  );
}
