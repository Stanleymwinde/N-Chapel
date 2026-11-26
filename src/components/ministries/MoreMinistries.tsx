import { Box, Container, Grid, Heading, HStack } from "@chakra-ui/react";
import { allMinistries } from "@content/ministries";
import { LinkButton } from "@/components/Button";
import { MinistryPhotoCard } from "./MinistryPhotoCard";

/**
 * "Explore more ministries" at the foot of every ministry page: the next three
 * ministries in the overview's order, so each page leads on to the others.
 */
export function MoreMinistries({ current }: { current: string }) {
  const i = allMinistries.findIndex((m) => m.href === current);
  const next = [1, 2, 3].map((k) => allMinistries[(i + k + allMinistries.length) % allMinistries.length]);

  return (
    <Box as="section" aria-labelledby="more-ministries" bg="bg.canvas" borderTopWidth="1px" borderColor="border" py={{ base: "16", md: "20", lg: "24" }}>
      <Container maxW="container" px={{ base: "5", md: "8" }}>
        <HStack justifyContent="space-between" alignItems="flex-end" gap="6" flexWrap="wrap" mb={{ base: "8", md: "10" }}>
          <Heading as="h2" id="more-ministries" textStyle="h2" textWrap="balance">
            Explore more ministries
          </Heading>
          <LinkButton href="/ministries" variant="link">
            All ministries
          </LinkButton>
        </HStack>
        <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }} gap={{ base: "10", md: "8" }}>
          {next.map((m, k) => (
            <Box as="li" key={m.href} display={{ base: "block", sm: k === 2 ? "none" : "block", lg: "block" }}>
              <MinistryPhotoCard m={m} ratio="3 / 2" size="md" />
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
