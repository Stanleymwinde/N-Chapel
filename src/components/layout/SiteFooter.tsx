import NextLink from "next/link";
import { Box, Container, Grid, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { footerNav, legalNav } from "@content/navigation";
import { isTodo, site } from "@content/site";
import { currentYear } from "@/lib/dates";
import { BrandIcon } from "../icons";
import { ChA, ChNav, ChUl } from "@/components/primitives";

/** Ink-on-gold links (≈ 11:1 contrast), always underlined so they read as links. */
const linkStyles = {
  color: "ink.900",
  textDecoration: "underline",
  textDecorationThickness: "1px",
  textUnderlineOffset: "0.2em",
  _hover: { textDecorationThickness: "2px" },
} as const;

const legalLinkStyles = {
  color: "fg.muted",
  textDecoration: "none",
  _hover: { color: "fg", textDecoration: "underline", textUnderlineOffset: "0.2em" },
} as const;

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <Heading as="h2" fontFamily="heading" fontSize="0.9375rem" fontWeight="600" color="ink.900" lineHeight="normal">
      {children}
    </Heading>
  );
}

function ContactRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <HStack alignItems="flex-start" gap="2.5">
      <Box flexShrink={0} mt="0.5" aria-hidden="true">
        {icon}
      </Box>
      <Box>{children}</Box>
    </HStack>
  );
}

/** Gold footer with brand, contact and quick links; white legal bar with policies and socials. */
export function SiteFooter() {
  const socials = site.socials.filter((s) => !isTodo(s.url));
  return (
    <Box as="footer">
      <Box bg="accent.highlight" color="ink.900" py={{ base: "14", md: "72px" }}>
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)", lg: "408px repeat(3, 1fr)" }} gap={{ base: "10", lg: "56px" }}>
            <Stack gap="18px" gridColumn={{ sm: "1 / -1", lg: "auto" }} fontSize="0.875rem" lineHeight="1.5">
              <ChA asChild display="inline-flex" alignSelf="flex-start" borderRadius="sm">
                <NextLink href="/" aria-label={`${site.name}, home`}>
                  <Image src="/media/brand/logo-footer.svg" alt="" width="205.241px" height="62px" />
                </NextLink>
              </ChA>
              <Text>
                {site.name} is a church in Nairobi committed to {site.missionLine.charAt(0).toLowerCase() + site.missionLine.slice(1, -1)}. We&apos;d love to welcome
                you.
              </Text>
              <Stack gap="2.5" lineHeight="1.45">
                <ContactRow icon={<Clock size={16} />}>Sundays 9:00 AM &amp; 11:30 AM</ContactRow>
                <ContactRow icon={<MapPin size={16} />}>
                  Ngong Road, Nairobi, near Raila Odinga Stadium ·{" "}
                  <ChA href={site.mapUrl} target="_blank" rel="noopener noreferrer" {...linkStyles} fontWeight="500">
                    Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
                  </ChA>
                </ContactRow>
                <ContactRow icon={<Phone size={16} />}>
                  <ChA href={`tel:${site.phone.tel}`} color="ink.900" textDecoration="none" _hover={{ textDecoration: "underline" }}>
                    {site.phone.display}
                  </ChA>
                </ContactRow>
                <ContactRow icon={<MessageCircle size={16} />}>
                  <ChA href={site.whatsapp.url} target="_blank" rel="noopener noreferrer" {...linkStyles} fontWeight="500">
                    WhatsApp us<span className="sr-only"> (opens WhatsApp)</span>
                  </ChA>
                </ContactRow>
                <ContactRow icon={<Mail size={16} />}>
                  <ChA href={`mailto:${site.email}`} color="ink.900" textDecoration="none" _hover={{ textDecoration: "underline" }}>
                    {site.email}
                  </ChA>
                </ContactRow>
              </Stack>
            </Stack>

            {footerNav.map((col) => (
              <ChNav key={col.title} aria-label={col.title}>
                <Stack gap="3">
                  <FooterHeading>{col.title}</FooterHeading>
                  <ChUl listStyle="none" m="0" p="0" display="grid" gap="3" fontSize="0.875rem" lineHeight="normal">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <ChA asChild {...linkStyles}>
                          <NextLink href={l.href}>{l.label}</NextLink>
                        </ChA>
                      </li>
                    ))}
                  </ChUl>
                </Stack>
              </ChNav>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box bg="white" color="fg.muted" py="18px" fontSize="0.75rem" lineHeight="normal">
        <Container maxW="container" px={{ base: "5", md: "8" }}>
          <Stack direction={{ base: "column", lg: "row" }} justifyContent="space-between" alignItems={{ lg: "center" }} gap="3">
            <Stack direction={{ base: "column", md: "row" }} gap={{ base: "2", md: "5" }} alignItems={{ md: "center" }}>
              <Text>
                © {currentYear()} {site.name}
              </Text>
              <ChUl listStyle="none" m="0" p="0" display="flex" flexWrap="wrap" columnGap="5" rowGap="2">
                {legalNav.map((l) => (
                  <li key={l.href}>
                    <ChA asChild {...legalLinkStyles}>
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
                    <ChA href={s.url} target="_blank" rel="noopener noreferrer" {...legalLinkStyles} display="inline-flex" alignItems="center" justifyContent="center" minW="32px" minH="32px" aria-label={`${s.label} (opens in a new tab)`}>
                      <BrandIcon name={s.icon} size={16} />
                    </ChA>
                  </li>
                ))}
              </ChUl>
            ) : (
              <Text>Find us on Facebook, X, Instagram, YouTube and TikTok</Text>
            )}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
