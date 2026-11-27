import { Box, Container, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { contact, contactForm } from "@content/contact";
import { nextStepsForm } from "@content/new-here";
import { prayer } from "@content/ministries/prayer";
import { site, isTodo } from "@content/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd, churchJsonLd } from "@/components/JsonLd";
import { Button, LinkButton } from "@/components/Button";
import { NextStepBand } from "@/components/NextStepBand";
import { RichText } from "@/components/RichText";
import { Img } from "@/components/Img";
import { ContactTabs } from "@/components/contact/ContactTabs";
import { pageMetadata } from "@/lib/metadata";
import { ChA } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "Contact us",
  description: "Call or WhatsApp +254 701 777 888, email mail@nairobichapel.org, or visit us on Ngong Road, Nairobi on Sundays at 9:00 and 11:30 AM.",
  path: "/contact",
});

const container = { maxW: "container", px: { base: "5", md: "8" } } as const;
const sectionPy = { base: "16", md: "20", lg: "24" } as const;

/* One way to reach us (Figma channel card): purple icon disc and title, body, action at the foot */
function Channel({ icon, title, children, action }: { icon: React.ReactNode; title: string; children: React.ReactNode; action: React.ReactNode }) {
  return (
    <Stack as="li" gap="4" minH={{ md: "278px" }} px="26px" py="7" bg="bg.warm" borderRadius="18px">
      <HStack gap="3.5">
        <Box display="inline-flex" p="3" borderRadius="full" bg="brand.solid" color="white" aria-hidden="true">
          {icon}
        </Box>
        <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.25rem">
          {title}
        </Heading>
      </HStack>
      <Stack gap="1.5" flex="1">
        {children}
      </Stack>
      <Box>{action}</Box>
    </Stack>
  );
}

/* Find us: an info row with a tinted icon tile */
function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <HStack gap="3" alignItems="flex-start">
      <Box display="inline-flex" p="2" borderRadius="10px" bg="bg.tint" color="brand.fg" aria-hidden="true">
        {icon}
      </Box>
      <Stack gap="0.5">
        <Text fontWeight="600" fontSize="0.96875rem">
          {label}
        </Text>
        <Text color="fg.muted" fontSize="0.9375rem" lineHeight="1.5">
          {children}
        </Text>
      </Stack>
    </HStack>
  );
}

const linkStyle = { textDecoration: "underline", textUnderlineOffset: "0.2em", display: "inline-flex", alignItems: "center", minH: "44px" } as const;

export default function ContactPage() {
  return (
    <>
      <JsonLd data={churchJsonLd()} />

      {/* Warm page: big centred heading, then the tabbed forms */}
      <Box as="section" aria-labelledby="contact-title" bg="bg.warm" pt={{ base: "6", md: "10" }} pb={sectionPy}>
        <Container {...container}>
          <Breadcrumbs items={[{ label: "Contact" }]} tone="light" />
          <Stack gap="4" alignItems="center" textAlign="center" py={{ base: "10", md: "14" }}>
            <Heading as="h1" id="contact-title" fontFamily="heading" fontWeight="600" fontSize="clamp(3rem, 1.8rem + 4.4vw, 5.25rem)" lineHeight="1.05" letterSpacing="-0.025em">
              {contact.title}
            </Heading>
            <Text color="fg.muted" fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.5" maxW="500px">
              {contact.intro}
            </Text>
          </Stack>

          <Box maxW="830px" mx="auto">
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

      {/* Other ways to reach us: three cards */}
      <Box as="section" aria-labelledby="ways-heading" bg="bg.canvas" py={sectionPy}>
        <Container {...container}>
          <Stack gap="3" mb="10">
            <Heading as="h2" id="ways-heading" fontFamily="heading" fontWeight="700" fontSize="clamp(2rem, 1.55rem + 1.6vw, 2.75rem)" lineHeight="1.15" letterSpacing="-0.015em">
              {contact.waysTitle}
            </Heading>
            <Text color="fg.muted" fontSize="1.125rem" lineHeight="1.5">
              {contact.waysIntro}
            </Text>
          </Stack>
          <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, md: 3 }} gap="5">
            <Channel
              icon={<MapPin size={20} />}
              title="Visit on Sunday"
              action={
                <LinkButton href="/new-here/plan-your-visit" variant="link">
                  Plan your visit
                </LinkButton>
              }
            >
              <Text fontWeight="600" fontSize="1.03125rem" lineHeight="1.4">
                Sundays at 9:00 AM and 11:30 AM
              </Text>
              <Text color="fg.muted" fontSize="0.96875rem" lineHeight="1.55">
                {contact.addressLine}
              </Text>
            </Channel>
            <Channel
              icon={<Phone size={20} />}
              title="Call or WhatsApp"
              action={
                <LinkButton href={site.whatsapp.url} variant="secondary" icon={<MessageCircle aria-hidden="true" />}>
                  Chat on WhatsApp
                </LinkButton>
              }
            >
              <Text fontWeight="600" fontSize="1.125rem" lineHeight="1.4">
                <ChA href={`tel:${site.phone.tel}`} color="fg" {...linkStyle} minH="auto">
                  {site.phone.display}
                </ChA>
              </Text>
            </Channel>
            <Channel
              icon={<Mail size={20} />}
              title="Email"
              action={
                <LinkButton href={`mailto:${site.email}`} variant="secondary" icon={<Mail aria-hidden="true" />}>
                  Send an email
                </LinkButton>
              }
            >
              <Text fontWeight="600" fontSize="1.125rem" lineHeight="1.4" wordBreak="break-word">
                <ChA href={`mailto:${site.email}`} color="fg" {...linkStyle} minH="auto">
                  {site.email}
                </ChA>
              </Text>
              <Text color="fg.muted" fontSize="0.84375rem" lineHeight="1.4">
                <RichText text={contact.responsePromise} />
              </Text>
            </Channel>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Find us: details and directions beside a map */}
      <Box as="section" aria-labelledby="find-us-heading" bg="bg.tint" py={sectionPy}>
        <Container {...container}>
          <Grid templateColumns={{ base: "1fr", md: "minmax(0, 456px) minmax(0, 1fr)" }} bg="bg.canvas" borderRadius="24px" overflow="hidden" boxShadow="0 16px 40px rgba(92, 41, 158, 0.08)">
            <Stack gap="22px" ps={{ base: "6", md: "10" }} pe={{ base: "6", md: "9" }} py={{ base: "8", md: "10" }}>
              <Text fontSize="0.75rem" fontWeight="600" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg">
                Find us
              </Text>
              <Heading as="h2" id="find-us-heading" fontFamily="heading" fontWeight="700" fontSize={{ base: "1.875rem", md: "2.25rem" }} lineHeight="1.15">
                {site.name}
              </Heading>
              <InfoRow icon={<MapPin size={16} />} label="Address">
                {contact.addressLine}
              </InfoRow>
              <InfoRow icon={<Clock size={16} />} label="Sunday services">
                9:00 AM and 11:30 AM
              </InfoRow>
              <Stack gap="2.5" pt="1.5">
                {/* No external-link icon here (Figma); the new-tab hint is for screen readers */}
                <Button asChild variant="primary" w="full">
                  <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation aria-hidden="true" />
                    Get directions
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
                <LinkButton href={site.mapUrl} variant="secondary" w="full">
                  Open in Google Maps
                </LinkButton>
              </Stack>
            </Stack>
            <Box position="relative" minH={{ base: "260px", md: "auto" }} overflow="hidden" bg="bg.muted">
              {/* Figma crops the map to its centre-right, around the church pin */}
              <Box position="absolute" left="-38.57%" top="-15%" w="142.86%" h="125%">
                <Img slot="contact.map" sizes="(min-width: 768px) 1060px, 140vw" />
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>

      <NextStepBand
        title="Need prayer?"
        text="Pastors are available every Sunday at the pastoral care tent, or send a request any time."
        primary={{ label: "Plan your visit", href: "/new-here/plan-your-visit" }}
        secondary={{ label: "Get counselling", href: "/ministries/counselling-care" }}
      />
    </>
  );
}
