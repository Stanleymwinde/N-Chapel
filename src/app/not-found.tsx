import { Box, Container, Heading, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { LinkButton, Button } from "@/components/Button";
import { ChForm, ChLabel } from "@/components/primitives";

export const metadata = {
  title: "Page not found",
  description: "We couldn't find that page. Plan your visit, watch a sermon or search our resources.",
};

export default function NotFound() {
  return (
    <Box as="section" aria-labelledby="nf-title" bg="bg.warm" py={{ base: "16", md: "24" }}>
      <Container maxW="container" px={{ base: "5", md: "8" }}>
        <Stack gap="6" maxW="prose">
          <Text textStyle="eyebrow" color="brand.fg">
            Error 404
          </Text>
          <Heading as="h1" id="nf-title" textStyle="h1">
            We couldn&apos;t find that page
          </Heading>
          <Text textStyle="lead" color="fg.muted">
            It may have moved when we rebuilt the website. Try one of these instead.
          </Text>
          <HStack gap="3" flexWrap="wrap">
            <LinkButton href="/new-here/plan-your-visit" variant="primary" size="lg">
              Plan your visit
            </LinkButton>
            <LinkButton href="/watch" variant="secondary" size="lg">
              Watch a sermon
            </LinkButton>
          </HStack>
          <ChForm action="/resources" method="get" role="search" aria-label="Search resources" pt="4">
            <ChLabel htmlFor="nf-search" display="block" fontWeight="600" mb="2">
              Search devotionals, guides and resources
            </ChLabel>
            <HStack gap="2" alignItems="stretch">
              <Input id="nf-search" name="q" type="search" size="lg" bg="bg.canvas" borderColor="border.strong" flex="1" />
              <Button type="submit" variant="primary" size="lg" aria-label="Search">
                <Search aria-hidden="true" />
                Search
              </Button>
            </HStack>
          </ChForm>
        </Stack>
      </Container>
    </Box>
  );
}
