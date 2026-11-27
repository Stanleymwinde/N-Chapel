import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Mail } from "lucide-react";
import type { TeamMember } from "@content/about";
import { Img } from "@/components/Img";
import { RichText } from "@/components/RichText";
import { ChA } from "@/components/primitives";

/** "Rev. Liz Mangeli" → "LM" (titles skipped) */
export const initials = (name: string) =>
  name
    .replace(/^(Rev\.?|Dr\.?|Pastor)\s+/i, "")
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/* Photo tile: a consented photo when supplied (faces kept near the top), else initials */
function Portrait({ m, sizes, aspect, big }: { m: TeamMember; sizes: string; aspect: string; big?: boolean }) {
  return (
    <Box
      position="relative"
      aspectRatio={aspect}
      borderRadius="12px"
      overflow="hidden"
      bg="bg.muted"
      color="fg.muted"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      aria-hidden="true"
    >
      {m.photo ? (
        <Img slot={m.photo} fill sizes={sizes} decorative />
      ) : (
        <Text fontFamily="heading" fontWeight="700" fontSize={big ? "clamp(3rem, 2rem + 3vw, 4.5rem)" : "clamp(1.75rem, 1.4rem + 1.2vw, 2.5rem)"} letterSpacing="0.02em">
          {initials(m.name)}
        </Text>
      )}
    </Box>
  );
}

/* Quiet email link (Figma "Email": 12px mail icon, 13px underlined); its accessible name is "Email {name}" */
function EmailLink({ m }: { m: TeamMember }) {
  if (!m.email) return null;
  return (
    <ChA
      href={`mailto:${m.email}`}
      display="inline-flex"
      alignItems="center"
      gap="1.5"
      minH="36px"
      alignSelf="flex-start"
      color="ink.700"
      fontSize="0.8125rem"
      lineHeight="20px"
      textDecoration="underline"
      textUnderlineOffset="0.2em"
      transition="color 150ms ease"
      css={{ "@media (hover: hover) and (pointer: fine)": { "&:hover": { color: "var(--chakra-colors-brand-fg)" } } }}
      title={m.email}
      aria-label={`Email ${m.name}`}
    >
      <Mail size={12} aria-hidden="true" style={{ flexShrink: 0 }} />
      Email
    </ChA>
  );
}

/* Name, ministry (two lines reserved so cards line up) and title */
function Details({ m }: { m: TeamMember }) {
  return (
    <Stack gap="1">
      <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.0625rem" lineHeight="22px" letterSpacing="-0.01em">
        {m.name}
      </Heading>
      <Text fontSize="0.875rem" lineHeight="20px" color="ink.700" minH="40px">
        {m.ministry}
      </Text>
      {m.role && (
        <Text fontSize="0.84375rem" lineHeight="19px" fontWeight="500" color="brand.fg">
          {m.role}
        </Text>
      )}
    </Stack>
  );
}

/** One person (Figma member card): cream card, photo tile, name, ministry, title, email */
export function TeamCard({ m }: { m: TeamMember }) {
  return (
    <Stack gap="3.5" h="full" pt="2.5" px="2.5" pb="18px" bg="bg.warm" borderWidth="1px" borderColor="ink.100" borderRadius="16px">
      <Portrait m={m} aspect="197 / 210" sizes="(min-width: 1280px) 200px, (min-width: 1024px) 230px, (min-width: 768px) 30vw, 50vw" />
      <Stack gap="0" flex="1" justifyContent="space-between" px="1">
        <Details m={m} />
        <Box pt="2">
          <EmailLink m={m} />
        </Box>
      </Stack>
    </Stack>
  );
}

/** A leader beside the Senior Pastor (Figma: white card, photo left) */
export function LeaderCard({ m }: { m: TeamMember }) {
  return (
    <Box display="flex" gap="18px" h="full" minH="176px" ps="3.5" pe="18px" py="3.5" bg="bg.canvas" borderRadius="18px">
      <Box w="118px" flexShrink={0}>
        <Portrait m={m} aspect="118 / 148" sizes="118px" />
      </Box>
      <Stack gap="0" flex="1" minW="0" justifyContent="space-between" pt="1.5" pb="1">
        <Details m={m} />
        <EmailLink m={m} />
      </Stack>
    </Box>
  );
}

/** The Senior Pastor: photo left; eyebrow, name, title, welcome quote and email right */
export function FeaturedTeamCard({ m, welcome }: { m: TeamMember; welcome?: string }) {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "minmax(0, 300px) 1fr", lg: "360px 1fr" }}
      gap={{ base: "6", md: "10", lg: "11" }}
      alignItems="center"
      ps={{ base: "4", md: "6" }}
      pe={{ base: "4", md: "10" }}
      py={{ base: "4", md: "6" }}
      bg="bg.canvas"
      borderRadius="24px"
    >
      <Box maxW={{ base: "320px", md: "none" }}>
        <Portrait m={m} big aspect="1 / 1" sizes="(min-width: 1024px) 360px, 320px" />
      </Box>
      <Stack gap="22px" alignItems="flex-start">
        <Text fontSize="0.75rem" fontWeight="600" letterSpacing="0.08em" textTransform="uppercase" color="brand.fg">
          A word from our Senior Pastor
        </Text>
        <Stack gap="2">
          <Heading as="h3" fontFamily="heading" fontWeight="700" fontSize="clamp(1.75rem, 1.4rem + 1.2vw, 2.125rem)" lineHeight="1.1" letterSpacing="-0.01em">
            {m.name}
          </Heading>
          {m.role && (
            <Text fontSize="1rem" lineHeight="20px" fontWeight="600" color="brand.fg">
              {m.role}
            </Text>
          )}
        </Stack>
        {welcome && (
          <Box as="figure" m="0" w="full" display="flex" flexDirection="column" gap="2.5" px="26px" pt="22px" pb="6" bg="bg.warm" borderRadius="16px">
            <Text aria-hidden="true" fontFamily="heading" fontWeight="700" fontSize="4rem" lineHeight="40px" h="40px" color="accent.highlight">
              “
            </Text>
            <Text as="blockquote" m="0" maxW="540px" fontWeight="500" fontSize={{ base: "1.125rem", md: "1.3125rem" }} lineHeight="1.45" color="fg">
              <RichText text={welcome} />
            </Text>
          </Box>
        )}
        <EmailLink m={m} />
      </Stack>
    </Grid>
  );
}
