import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Mail } from "lucide-react";
import type { TeamMember } from "@content/about";
import { Img } from "@/components/Img";
import { RichText } from "@/components/RichText";
import { ChA } from "@/components/primitives";

/** "Rev. Liz Mangeli" → "LM" (titles skipped) */
export const initials = (name: string) =>
  name
    .replace(/^(Rev\.|Dr\.|Pastor)\s+/i, "")
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/* 4:5 portrait: a consented photo when supplied (faces kept near the top), else initials */
function Portrait({ m, sizes, big }: { m: TeamMember; sizes: string; big?: boolean }) {
  return (
    <Box
      position="relative"
      aspectRatio="4 / 5"
      borderRadius="lg"
      overflow="hidden"
      bg="bg.muted"
      color="fg.muted"
      display="flex"
      alignItems="center"
      justifyContent="center"
      aria-hidden="true"
      css={{ "& img": { objectFit: "cover", objectPosition: "top" } }}
    >
      {m.photo ? (
        <Img slot={m.photo} fill sizes={sizes} decorative />
      ) : (
        <Text fontFamily="heading" fontWeight="700" fontSize={big ? "clamp(3rem, 2rem + 3vw, 4.5rem)" : "clamp(2rem, 1.5rem + 1.6vw, 2.75rem)"} letterSpacing="0.02em">
          {initials(m.name)}
        </Text>
      )}
    </Box>
  );
}

/* Quiet email link; its accessible name is "Email {name}" */
function EmailLink({ m }: { m: TeamMember }) {
  if (!m.email) return null;
  return (
    <ChA
      href={`mailto:${m.email}`}
      display="inline-flex"
      alignItems="center"
      gap="1.5"
      minH="44px"
      alignSelf="flex-start"
      color="fg.muted"
      fontSize="0.9375rem"
      textDecoration="underline"
      textUnderlineOffset="0.2em"
      transition="color 150ms ease"
      css={{ "@media (hover: hover) and (pointer: fine)": { "&:hover": { color: "var(--chakra-colors-brand-fg)" } } }}
      title={m.email}
      aria-label={`Email ${m.name}`}
    >
      <Mail size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
      Email
    </ChA>
  );
}

/** One person: name, then ministry, then title (no title line when unconfirmed) */
export function TeamCard({ m }: { m: TeamMember }) {
  return (
    <Stack gap="0" h="full">
      <Portrait m={m} sizes="(min-width: 1280px) 220px, (min-width: 1024px) 230px, (min-width: 768px) 30vw, 50vw" />
      <Stack gap="1" mt="4" flex="1">
        <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize={{ base: "1.125rem", md: "1.25rem" }} lineHeight="1.25">
          {m.name}
        </Heading>
        {m.ministry && (
          <Text fontSize={{ base: "0.9375rem", md: "1rem" }} lineHeight="1.45">
            {m.ministry}
          </Text>
        )}
        {m.role && (
          <Text fontSize="0.9375rem" fontWeight="600" color="brand.fg">
            {m.role}
          </Text>
        )}
        <Box mt="auto" pt="1">
          <EmailLink m={m} />
        </Box>
      </Stack>
    </Stack>
  );
}

/** The Senior Pastor: photo left, name, title and a short welcome */
export function FeaturedTeamCard({ m, welcome }: { m: TeamMember; welcome?: string }) {
  return (
    <Grid templateColumns={{ base: "1fr", sm: "minmax(0, 240px) 1fr", md: "minmax(0, 300px) 1fr" }} gap={{ base: "5", sm: "8", md: "12" }} alignItems="center">
      <Box maxW={{ base: "260px", sm: "none" }}>
        <Portrait m={m} big sizes="(min-width: 768px) 300px, 260px" />
      </Box>
      <Stack gap="3" maxW="36rem">
        <Heading as="h3" fontFamily="heading" fontWeight="700" fontSize="clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem)" lineHeight="1.1" letterSpacing="-0.01em">
          {m.name}
        </Heading>
        {m.role && (
          <Text fontSize="1.125rem" fontWeight="600" color="brand.fg">
            {m.role}
          </Text>
        )}
        {welcome && (
          <Text fontSize={{ base: "1.0625rem", md: "1.1875rem" }} lineHeight="1.6">
            <RichText text={welcome} />
          </Text>
        )}
        <EmailLink m={m} />
      </Stack>
    </Grid>
  );
}
