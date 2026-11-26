import NextLink from "next/link";
import { Box, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { footerNav, legalNav } from "@content/navigation";
import { isTodo, site } from "@content/site";
import { currentYear } from "@/lib/dates";
import { BrandIcon } from "../icons";
import { Logo } from "./Logo";
import { ChA, ChNav, ChUl } from "@/components/primitives";

/** Ink-on-gold links (≈ 11:1 contrast), always underlined so they read as links. */
const linkStyles = {
  color: "ink.900",
  textDecoration: "underline",
  textDecorationThickness: "1px",
  textUnderlineOffset: "0.25em",
  display: "inline-flex",
  alignItems: "center",
  minH: "36px",
  _hover: { textDecorationThickness: "2px" },
} as const;

const darkLinkStyles = {
  color: "night.300",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  minH: "44px",
  _hover: { color: "white", textDecoration: "underline", textUnderlineOffset: "0.2em" },
} as const;

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <Heading as="h2" fontFamily="heading" fontSize="1.375rem" fontWeight="600" color="ink.900" mb="3">
      {children}
    </Heading>
  );
}

/** Gold footer with quick links, visit and contact; dark bottom bar with policies and socials. */
export function SiteFooter() {
  const socials = site.socials.filter((s) => !isTodo(s.url));
  return (
    <Box as="footer">
      <Box bg="accent.highlight" color="ink.900" pt={{ base: "14", md: "20" }} pb={{ base: "12", md: "16" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "1.5fr repeat(3, 1fr)" }} gap={{ base: "10", lg: "10" }}>
            <Stack gap="5" gridColumn={{ sm: "1 / -1", lg: "auto" }} textStyle="small" fontSize="0.9375rem">
              <Logo />
              <Text maxW="38ch">
                {site.name} is a church in Nairobi committed to {site.missionLine.charAt(0).toLowerCase() + site.missionLine.slice(1, -1)}. We&apos;d love to welcome
                you.
              </Text>
              <Stack gap="0">
                <HStack alignItems="flex-start" gap="2">
                  <Clock size={16} aria-hidden="true" style={{ marginTop: 3, flexShrink: 0 }} />
                  <span>Sundays 9:00 AM &amp; 11:30 AM</span>
                </HStack>
                <HStack alignItems="flex-start" gap="2">
                  <MapPin size={16} aria-hidden="true" style={{ marginTop: 3, flexShrink: 0 }} />
                  <span>
                    Ngong Road, Nairobi.{" "}
                    <ChA href={site.mapUrl} target="_blank" rel="noopener noreferrer" {...linkStyles} display="inline" minH="0" fontWeight="600">
                      Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
                    </ChA>
                  </span>
                </HStack>
                <HStack alignItems="center" gap="2">
                  <Phone size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <ChA href={`tel:${site.phone.tel}`} {...linkStyles} minH="44px">
                    {site.phone.display}
                  </ChA>
                </HStack>
                <HStack alignItems="center" gap="2">
                  <MessageCircle size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <ChA href={site.whatsapp.url} target="_blank" rel="noopener noreferrer" {...linkStyles} minH="44px">
                    WhatsApp us<span className="sr-only"> (opens WhatsApp)</span>
                  </ChA>
                </HStack>
                <HStack alignItems="center" gap="2">
                  <Mail size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <ChA href={`mailto:${site.email}`} {...linkStyles} minH="44px">
                    {site.email}
                  </ChA>
                </HStack>
              </Stack>
            </Stack>

            {footerNav.map((col) => (
              <ChNav key={col.title} aria-label={col.title}>
                <FooterHeading>{col.title}</FooterHeading>
                <ChUl listStyle="none" m="0" p="0" display="grid" gap="0.5" textStyle="small" fontSize="0.9375rem">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <ChA asChild {...linkStyles}>
                        <NextLink href={l.href}>{l.label}</NextLink>
                      </ChA>
                    </li>
                  ))}
                </ChUl>
              </ChNav>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box bg="night.900" color="night.300" py="4" textStyle="small">
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Stack direction={{ base: "column", lg: "row" }} justifyContent="space-between" alignItems={{ lg: "center" }} gap="3">
            <Stack direction={{ base: "column", md: "row" }} gap={{ base: "1", md: "6" }} alignItems={{ md: "center" }}>
              <Text>
                © {currentYear()} {site.name}
              </Text>
              <ChUl listStyle="none" m="0" p="0" display="flex" flexWrap="wrap" columnGap="5">
                {legalNav.map((l) => (
                  <li key={l.href}>
                    <ChA asChild {...darkLinkStyles}>
                      <NextLink href={l.href}>{l.label}</NextLink>
                    </ChA>
                  </li>
                ))}
              </ChUl>
            </Stack>
            {socials.length > 0 ? (
              <ChUl listStyle="none" m="0" p="0" display="flex" gap="1" aria-label="Social media">
                {socials.map((s) => (
                  <li key={s.label}>
                    <ChA href={s.url} target="_blank" rel="noopener noreferrer" {...darkLinkStyles} justifyContent="center" minW="44px" aria-label={`${s.label} (opens in a new tab)`}>
                      <BrandIcon name={s.icon} size={18} />
                    </ChA>
                  </li>
                ))}
              </ChUl>
            ) : (
              <Text>Find us on Facebook, X, Instagram, YouTube and TikTok.</Text>
            )}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
