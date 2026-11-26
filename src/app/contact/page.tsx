import { Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { contact, contactForm } from "@content/contact";
import { nextStepsForm } from "@content/new-here";
import { prayer } from "@content/ministries/prayer";
import { site, isTodo } from "@content/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd, churchJsonLd } from "@/components/JsonLd";
import { LinkButton } from "@/components/Button";
import { MapEmbed } from "@/components/MapEmbed";
import { NextStepBand } from "@/components/NextStepBand";
import { RichText } from "@/components/RichText";
import { ContactTabs } from "@/components/contact/ContactTabs";
import { pageMetadata } from "@/lib/metadata";
import { ChA } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "Contact us",
  description: "Call or WhatsApp +254 701 777 888, email mail@nairobichapel.org, or visit us on Ngong Road, Nairobi on Sundays at 9:00 and 11:30 AM.",
  path: "/contact",
});

const container = { maxW: "container", px: { base: "5", md: "8" } } as const;

/* A centred way-to-reach-us column */
function Way({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <Stack gap="3" alignItems="center" textAlign="center">
      <Box aria-hidden="true" color="brand.fg">
        {icon}
      </Box>
      <Heading as="h3" textStyle="h4">
        {title}
      </Heading>
      {children}
    </Stack>
  );
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={churchJsonLd()} />

      {/* Warm page: big centred heading, then the tabbed forms */}
      <Box as="section" aria-labelledby="contact-title" bg="bg.warm" pt={{ base: "6", md: "10" }} pb={{ base: "16", md: "24" }}>
        <Container {...container}>
          <Breadcrumbs items={[{ label: "Contact" }]} tone="light" />
          <Stack gap="5" alignItems="center" textAlign="center" mt={{ base: "12", md: "20" }} mb={{ base: "12", md: "16" }}>
            <Heading
              as="h1"
              id="contact-title"
              fontFamily="heading"
              fontWeight="700"
              fontSize="clamp(3rem, 1.8rem + 5vw, 6rem)"
              lineHeight="1"
              letterSpacing="-0.025em"
            >
              {contact.title}
            </Heading>
            <Text textStyle="lead" color="fg.muted" maxW="36rem">
              {contact.intro}
            </Text>
          </Stack>

          <Box maxW="960px" mx="auto">
            <ContactTabs
              tabs={[
                {
                  value: "general",
                  label: "General enquiries",
                  form: contactForm,
                  note: isTodo(contact.responsePromise) ? undefined : contact.responsePromise,
                },
                { value: "prayer", label: "Prayer request", form: prayer.requestForm },
                { value: "faith", label: "New to faith", form: nextStepsForm },
              ]}
            />
          </Box>
        </Container>
      </Box>

      {/* Other ways to reach us, then the map */}
      <Box as="section" aria-labelledby="ways-heading" bg="bg.canvas" py={{ base: "16", md: "24" }}>
        <Container {...container}>
          <Heading as="h2" id="ways-heading" textStyle="h2" textAlign="center" mb={{ base: "10", md: "14" }}>
            Other ways to reach us
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "12", md: "8" }} maxW="1000px" mx="auto">
            <Way icon={<Clock size={32} strokeWidth={1.5} />} title="Visit on Sunday">
              <Text>Sundays at 9:00 AM and 11:30 AM</Text>
              <Text color="fg.muted">Ngong Road, Nairobi.</Text>
              <LinkButton href="/new-here/plan-your-visit" variant="link">
                Plan your visit
              </LinkButton>
            </Way>
            <Way icon={<Phone size={32} strokeWidth={1.5} />} title="Call or WhatsApp">
              <Text fontWeight="600">
                <ChA href={`tel:${site.phone.tel}`} textDecoration="underline" textUnderlineOffset="0.2em" display="inline-flex" minH="44px" alignItems="center">
                  {site.phone.display}
                </ChA>
              </Text>
              <LinkButton href={site.whatsapp.url} variant="secondary" icon={<MessageCircle aria-hidden="true" />}>
                Chat on WhatsApp
              </LinkButton>
            </Way>
            <Way icon={<Mail size={32} strokeWidth={1.5} />} title="Email">
              <Text fontWeight="600" wordBreak="break-word">
                <ChA href={`mailto:${site.email}`} textDecoration="underline" textUnderlineOffset="0.2em" display="inline-flex" minH="44px" alignItems="center">
                  {site.email}
                </ChA>
              </Text>
              <Text color="fg.muted" textStyle="small">
                <RichText text={contact.responsePromise} />
              </Text>
            </Way>
          </SimpleGrid>

          <Box maxW="1000px" mx="auto" mt={{ base: "14", md: "20" }}>
            <Heading as="h2" textStyle="h3" mb="5">
              Find us
            </Heading>
            <MapEmbed />
          </Box>
        </Container>
      </Box>

      <NextStepBand
        title="Need prayer?"
        text="Pastors are available every Sunday at the pastoral care tent, or send a request any time."
        primary={{ label: "Send a prayer request", href: "/ministries/prayer#request" }}
        secondary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
      />
    </>
  );
}
