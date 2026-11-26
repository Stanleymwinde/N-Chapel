import { Box, Container, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ChevronDown, ChevronRight, Download, ShieldCheck, Users } from "lucide-react";
import { financials } from "@content/about";
import { isTodo } from "@content/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/Button";
import { NextStepBand } from "@/components/NextStepBand";
import { Img } from "@/components/Img";
import { Squiggle } from "@/components/home/Squiggle";
import { pageMetadata } from "@/lib/metadata";
import { ChA, ChDetails, ChSummary, ChTable, ChTbody, ChTd, ChTh, ChThead, ChTr, ChUl } from "@/components/primitives";

export const metadata = pageMetadata({
  title: "Our Financials",
  description:
    "Nairobi Chapel Ngong Road's audited finances: 2025 at a glance, where giving went, ministry impact, governance, and annual reports to download.",
  path: "/about/financials",
});

const container = { maxW: "container", px: { base: "5", md: "8" } } as const;
const { glance, givingWent, impact, governance } = financials;
const isDown = (change: string) => /^[−-]/.test(change);
const latest = financials.reports.find((r) => !isTodo(r.file));

/* Small text link with a circled arrow, as in the reference ("Annual Report ›") */
function ArrowLink({ href, children, tone = "light" }: { href: string; children: React.ReactNode; tone?: "light" | "dark" }) {
  const onDark = tone === "dark";
  return (
    <ChA
      href={href}
      display="inline-flex"
      alignItems="center"
      gap="2"
      minH="44px"
      color={onDark ? "white" : "fg"}
      fontWeight="500"
      textDecoration="none"
      css={{
        "& .ring": { transition: "transform 200ms cubic-bezier(0.23, 1, 0.32, 1), background-color 150ms ease" },
        "@media (hover: hover) and (pointer: fine)": { "&:hover .ring": { transform: "translateX(2px)" } },
      }}
    >
      {children}
      <Box
        as="span"
        className="ring"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        w="22px"
        h="22px"
        borderRadius="full"
        borderWidth="1.5px"
        borderColor={onDark ? "whiteAlpha.700" : "border.strong"}
        aria-hidden="true"
      >
        <ChevronRight size={13} />
      </Box>
    </ChA>
  );
}

const heroIn = {
  "@media (prefers-reduced-motion: no-preference)": { animation: "heroIn 300ms cubic-bezier(0.23, 1, 0.32, 1) both" },
  "@media (prefers-reduced-motion: reduce)": { animation: "fade-in 200ms ease both" },
};

/** "+12%" → "12% more than in 2024" (people read words faster than signs) */
const inWords = (change: string) => {
  const n = change.replace(/^[+−-]/, "");
  return `${n} ${isDown(change) ? "less" : "more"} than in 2024`;
};

/* The hero card: the audit, in a sentence, before any figures */
function AuditCard() {
  return (
    <Box
      as="aside"
      aria-labelledby="audit-heading"
      bg="bg.canvas"
      borderRadius="xl"
      overflow="hidden"
      borderWidth="1px"
      borderColor="border"
      boxShadow="raised"
      css={{ ...heroIn, animationDelay: "60ms" }}
    >
      <Box h="6px" bg="accent.highlight" aria-hidden="true" />
      <Stack gap="5" p={{ base: "6", md: "8" }}>
        <HStack gap="3">
          <Box display="inline-flex" alignItems="center" justifyContent="center" w="12" h="12" borderRadius="full" bg="accent.subtle" color="ink.900" aria-hidden="true">
            <ShieldCheck size={24} />
          </Box>
          <Heading as="h2" id="audit-heading" fontFamily="heading" fontWeight="600" fontSize="1.5rem">
            Independently audited
          </Heading>
        </HStack>
        <Text lineHeight="1.7">{governance.opinion}</Text>
        {latest && (
          <Box>
            <LinkButton href={latest.file} variant="secondary" external>
              Read the {latest.year} report
            </LinkButton>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

/* 1. Light hero, in the same family as Our Compass and Marriage banns */
function Hero() {
  return (
    <Box as="header" bg="bg.canvas" pt={{ base: "6", md: "10" }} pb={{ base: "12", md: "16" }}>
      <Container {...container}>
        <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Financials" }]} tone="light" />
        <Grid mt={{ base: "6", md: "8" }} templateColumns={{ base: "1fr", md: "1.2fr 1fr" }} gap={{ base: "8", md: "12", lg: "16" }} alignItems="center">
          <Stack gap={{ base: "5", md: "6" }}>
            <Heading as="h1" fontFamily="heading" fontWeight="700" fontSize="clamp(2.75rem, 1.6rem + 4.4vw, 5rem)" lineHeight="1" letterSpacing="-0.02em">
              <Squiggle>{financials.title}</Squiggle>
            </Heading>
            <Text textStyle="lead" color="fg.muted" maxW="36rem">
              {financials.intro}
            </Text>
            <Stack gap="3" alignItems="flex-start" pt="1">
              <LinkButton href="#reports" variant="primary" size="lg" icon={<Download aria-hidden="true" />}>
                Download the annual reports
              </LinkButton>
              <HStack as="nav" aria-label="On this page" columnGap={{ base: "4", md: "5" }} rowGap="0" flexWrap="wrap">
                <ArrowLink href="#glance">2025 at a glance</ArrowLink>
                <ArrowLink href="#where">Where giving went</ArrowLink>
                <ArrowLink href="#governance">Governance</ArrowLink>
              </HStack>
            </Stack>
          </Stack>
          <AuditCard />
        </Grid>
      </Container>
    </Box>
  );
}

/* Centred section heading, as in "Ways To Give" */
function CentredHeading({ id, title, note }: { id: string; title: string; note?: string }) {
  return (
    <Stack gap="3" textAlign="center" alignItems="center" mb={{ base: "10", md: "14" }} maxW="44rem" mx="auto">
      <Heading as="h2" id={id} textStyle="h2">
        {title}
      </Heading>
      {note && (
        <Text color="fg.muted" textStyle="lead">
          {note}
        </Text>
      )}
    </Stack>
  );
}

function Change({ value }: { value: string }) {
  const down = isDown(value);
  return (
    <Box as="span" fontWeight="700" color="brand.fg" whiteSpace="nowrap">
      {value}
      <span className="sr-only">{down ? " lower" : " higher"} than 2024</span>
    </Box>
  );
}

/* 2. 2025 at a glance: three figures in plain words; the full statement folds away */
const headline = [
  { label: "Total income", says: "came in" },
  { label: "Total expenditure", says: "was spent on ministry and running the church" },
  { label: "Surplus", says: "was left over as a surplus" },
];

function Glance() {
  const row = (label: string) => glance.rows.find((r) => r.label === label)!;
  return (
    <Box as="section" id="glance" aria-labelledby="glance-heading" bg="bg.warm" py={{ base: "16", md: "24" }} scrollMarginTop="140px">
      <Container {...container}>
        <CentredHeading id="glance-heading" title={glance.title} note={glance.note} />

        {/* Three numbers, each with a plain sentence */}
        <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "repeat(3, minmax(0, 1fr))" }} gap={{ base: "4", md: "6" }} maxW="68rem" mx="auto">
          {headline.map((h) => {
            const r = row(h.label);
            return (
              <Stack as="li" key={h.label} gap="2" p={{ base: "6", md: "8" }} bg="bg.canvas" borderRadius="xl" textAlign="center" alignItems="center">
                <Text fontFamily="heading" fontWeight="700" fontSize="clamp(2.25rem, 1.6rem + 2vw, 3.25rem)" lineHeight="1" letterSpacing="-0.02em" whiteSpace="nowrap">
                  <Box as="span" fontSize="0.45em" fontWeight="600" color="fg.muted" mr="1.5">
                    KSh
                  </Box>
                  {r.y2025.replace(/^KSh\s*/, "")}
                </Text>
                <Text fontWeight="600" fontSize="1.0625rem">
                  {h.says}
                </Text>
                <Text fontSize="0.875rem" color="fg.muted">
                  {inWords(r.change)}
                </Text>
              </Stack>
            );
          })}
        </Grid>

        {/* Everything else, for anyone who wants it */}
        <ChDetails maxW="860px" mx="auto" mt={{ base: "8", md: "10" }} css={{ "& summary::-webkit-details-marker": { display: "none" }, "&[open] .chev": { transform: "rotate(180deg)" } }}>
          <ChSummary display="flex" alignItems="center" justifyContent="center" gap="2" minH="12" cursor="pointer" fontWeight="600" color="brand.fg" listStyle="none">
            See the full statement, with 2024 figures
            <Box as="span" className="chev" display="inline-flex" transition="transform 200ms cubic-bezier(0.23, 1, 0.32, 1)" aria-hidden="true">
              <ChevronDown size={18} />
            </Box>
          </ChSummary>

          <Box mt="6" p={{ base: "4", md: "8" }} bg="bg.canvas" borderRadius="xl">
            {/* Phones: the same figures as a stacked list */}
            <ChUl listStyle="none" m="0" p="0" display={{ base: "block", md: "none" }} aria-label={glance.title}>
              {glance.rows.map((r) => (
                <Box as="li" key={r.label} py="4" borderBottomWidth="1px" borderColor="border" _last={{ borderBottomWidth: "0" }}>
                  <Text fontWeight="600">{r.label}</Text>
                  {r.detail && (
                    <Text fontSize="0.875rem" color="fg.muted">
                      {r.detail}
                    </Text>
                  )}
                  <HStack mt="1.5" gap="3" flexWrap="wrap" fontSize="0.9375rem">
                    <Text as="span" fontWeight="700">
                      2025: {r.y2025}
                    </Text>
                    <Text as="span" color="fg.muted">
                      2024: {r.y2024}
                    </Text>
                    <Change value={r.change} />
                  </HStack>
                </Box>
              ))}
            </ChUl>

            <Box overflowX="auto" display={{ base: "none", md: "block" }}>
              <ChTable w="100%" minW="520px" css={{ borderCollapse: "collapse" }}>
                <caption className="sr-only">
                  {glance.title}: {glance.note}
                </caption>
                <ChThead>
                  <ChTr borderBottomWidth="2px" borderColor="ink.900">
                    <ChTh scope="col" textAlign="left" py="3" pr="4">
                      <span className="sr-only">Item</span>
                    </ChTh>
                    <ChTh scope="col" textAlign="right" py="3" px="4" fontWeight="700">
                      2025
                    </ChTh>
                    <ChTh scope="col" textAlign="right" py="3" px="4" fontWeight="600" color="fg.muted">
                      2024
                    </ChTh>
                    <ChTh scope="col" textAlign="right" py="3" pl="4" fontWeight="700">
                      Change
                    </ChTh>
                  </ChTr>
                </ChThead>
                <ChTbody>
                  {glance.rows.map((r) => (
                    <ChTr key={r.label} borderBottomWidth="1px" borderColor="border">
                      <ChTh scope="row" textAlign="left" py="4" pr="4" fontWeight="600">
                        {r.label}
                        {r.detail && (
                          <Text as="span" display="block" fontWeight="400" fontSize="0.875rem" color="fg.muted">
                            {r.detail}
                          </Text>
                        )}
                      </ChTh>
                      <ChTd textAlign="right" py="4" px="4" fontWeight="600" whiteSpace="nowrap">
                        {r.y2025}
                      </ChTd>
                      <ChTd textAlign="right" py="4" px="4" color="fg.muted" whiteSpace="nowrap">
                        {r.y2024}
                      </ChTd>
                      <ChTd textAlign="right" py="4" pl="4">
                        <Change value={r.change} />
                      </ChTd>
                    </ChTr>
                  ))}
                </ChTbody>
              </ChTable>
            </Box>
          </Box>
        </ChDetails>
      </Container>
    </Box>
  );
}

/* 3. Cream band: where giving went (photo cards with big figures) + impact card */
const wentCards = [
  { image: "about.hero", figure: "KSh 42.91M" },
  { image: "marketplace.hero", figure: "KSh 5.9M" },
  { image: "outreach.hero", figure: "+68%" },
  { image: "justice.women", figure: "KSh 452.56M" },
];

const highlightLabels = ["decisions for Christ", "baptisms", "LOGOS scholars"];

function Where() {
  return (
    <Box as="section" id="where" aria-labelledby="where-heading" bg="bg.tint" py={{ base: "16", md: "24" }} scrollMarginTop="140px">
      <Container {...container}>
        <Heading as="h2" id="where-heading" fontFamily="heading" fontWeight="700" fontSize="clamp(2.25rem, 1.4rem + 3.4vw, 3.75rem)" lineHeight="1.02" letterSpacing="-0.02em" mb={{ base: "8", md: "12" }}>
          {givingWent.title}
        </Heading>

        <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, sm: 2, lg: 4 }} gap={{ base: "10", md: "6" }}>
          {givingWent.items.map((item, i) => (
            <Stack as="li" key={item.title} gap="3">
              <Box position="relative" aspectRatio="3 / 2" borderRadius="md" overflow="hidden" bg="bg.tint">
                <Img slot={wentCards[i].image} sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw" decorative />
              </Box>
              <Heading as="h3" fontFamily="body" fontSize="1rem" fontWeight="700" mt="1">
                {item.title}
              </Heading>
              <Text fontStyle="italic" color="fg.muted" fontSize="0.9375rem" lineHeight="1.65">
                {item.text}
              </Text>
              <Text fontFamily="heading" fontWeight="700" fontSize="1.875rem" lineHeight="1.1" mt="auto" pt="2">
                {wentCards[i].figure}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>

        {/* White card floating in the band: three headline figures, then the rest on request */}
        <Box id="impact" mt={{ base: "14", md: "20" }} bg="bg.canvas" borderRadius="xl" p={{ base: "6", md: "12" }} boxShadow="card">
          <Stack gap="2" textAlign="center" alignItems="center" mb={{ base: "8", md: "12" }}>
            <Heading as="h2" textStyle="h3">
              {impact.title}
            </Heading>
            <Text color="fg.muted">{impact.note}</Text>
          </Stack>

          <Grid as="ul" listStyle="none" m="0" p="0" templateColumns={{ base: "1fr", md: "repeat(3, minmax(0, 1fr))" }} gap={{ base: "8", md: "6" }} maxW="860px" mx="auto" textAlign="center">
            {highlightLabels.map((label) => {
              const stat = impact.groups.flatMap((g) => g.stats).find((x) => x.label.startsWith(label));
              if (!stat) return null;
              return (
                <Box as="li" key={label}>
                  <Text fontFamily="heading" fontWeight="700" fontSize="clamp(2.75rem, 2rem + 2.4vw, 4rem)" lineHeight="1" letterSpacing="-0.02em" color="brand.fg">
                    {stat.value}
                  </Text>
                  <Text mt="2" fontSize="1.0625rem" fontWeight="600">
                    {label}
                  </Text>
                </Box>
              );
            })}
          </Grid>

          <ChDetails mt={{ base: "10", md: "12" }} maxW="960px" mx="auto" css={{ "& summary::-webkit-details-marker": { display: "none" }, "&[open] .chev": { transform: "rotate(180deg)" } }}>
            <ChSummary display="flex" alignItems="center" justifyContent="center" gap="2" minH="12" cursor="pointer" fontWeight="600" color="brand.fg" listStyle="none">
              See all ministry highlights
              <Box as="span" className="chev" display="inline-flex" transition="transform 200ms cubic-bezier(0.23, 1, 0.32, 1)" aria-hidden="true">
                <ChevronDown size={18} />
              </Box>
            </ChSummary>
            <Stack gap={{ base: "8", md: "10" }} mt="6">
              {impact.groups.map((g) => (
                <Grid key={g.title} templateColumns={{ base: "1fr", md: "200px 1fr" }} gap={{ base: "4", md: "8" }} pt="6" borderTopWidth="1px" borderColor="border">
                  <Heading as="h3" fontFamily="body" fontSize="1rem" fontWeight="700">
                    {g.title}
                  </Heading>
                  <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 2, md: g.stats.length > 3 ? 4 : g.stats.length }} gap={{ base: "6", md: "6" }}>
                    {g.stats.map((st) => (
                      <Box as="li" key={st.label}>
                        <Text fontFamily="heading" fontWeight="700" fontSize="clamp(1.5rem, 1.2rem + 1vw, 2rem)" lineHeight="1" color="brand.fg">
                          {st.value}
                        </Text>
                        <Text mt="1.5" fontSize="0.9375rem">
                          {st.label}
                        </Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Grid>
              ))}
            </Stack>
          </ChDetails>
        </Box>
      </Container>
    </Box>
  );
}

/* 4. Governance: two icon columns + a centred download button */
function Governance() {
  return (
    <Box as="section" id="governance" aria-labelledby="governance-heading" bg="bg.tint" pb={{ base: "16", md: "24" }} scrollMarginTop="140px">
      <Container {...container}>
        <Box pt={{ base: "4", md: "8" }}>
          <CentredHeading id="governance-heading" title={governance.title} />
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: "12", md: "16" }} maxW="1000px" mx="auto">
          <Stack gap="4" alignItems="center" textAlign="center">
            <Box aria-hidden="true" color="brand.fg">
              <ShieldCheck size={34} strokeWidth={1.4} />
            </Box>
            <Heading as="h3" textStyle="h4">
              Oversight
            </Heading>
            {governance.paragraphs.map((p) => (
              <Text key={p} color="fg.muted">
                {p}
              </Text>
            ))}
          </Stack>
          <Stack gap="4" alignItems="center" textAlign="center">
            <Box aria-hidden="true" color="brand.fg">
              <Users size={34} strokeWidth={1.4} />
            </Box>
            <Heading as="h3" textStyle="h4">
              Finance team and auditors
            </Heading>
            <Box as="dl" m="0" display="grid" gap="3">
              {governance.people.map((p) => (
                <Box key={p.role}>
                  <Text as="dt" fontWeight="700">
                    {p.role}
                  </Text>
                  <Text as="dd" m="0" color="fg.muted">
                    {p.name}
                  </Text>
                </Box>
              ))}
            </Box>
          </Stack>
        </SimpleGrid>
        {latest && (
          <Stack alignItems="center" mt={{ base: "12", md: "16" }} gap="3">
            <LinkButton href={latest.file} download variant="primary" size="lg" icon={<Download aria-hidden="true" />} aria-label={`Download ${latest.title} (PDF, ${latest.size})`}>
              Download the {latest.year} report
            </LinkButton>
            <Text textStyle="small" color="fg.muted">
              PDF · {latest.size}
            </Text>
          </Stack>
        )}
      </Container>
    </Box>
  );
}

/* 5. Annual reports: calm centred rows, like the reference's FAQ list */
function Reports() {
  return (
    <Box as="section" id="reports" aria-labelledby="reports-heading" bg="bg.muted" py={{ base: "16", md: "24" }} scrollMarginTop="140px">
      <Container {...container}>
        <CentredHeading id="reports-heading" title={financials.reportsTitle} note="Download any year as a PDF. The larger files are best opened on Wi-Fi." />
        <ChUl listStyle="none" m="0" p="0" maxW="720px" mx="auto" borderTopWidth="1px" borderColor="border.strong">
          {financials.reports.map((r, i) => {
            const available = !isTodo(r.file);
            return (
              <Box
                as="li"
                key={r.year}
                display="grid"
                gridTemplateColumns="1fr auto"
                alignItems="center"
                gap="4"
                py="4"
                borderBottomWidth="1px"
                borderColor="border.strong"
              >
                <Box>
                  <Text fontWeight="600" fontSize="1.0625rem">
                    {r.title}
                    {i === 0 && (
                      <Text as="span" ml="2" px="2" py="0.5" borderRadius="full" bg="accent.highlight" color="accent.contrast" fontSize="0.75rem" fontWeight="700" verticalAlign="middle">
                        Latest
                      </Text>
                    )}
                  </Text>
                  <Text fontSize="0.875rem" color="fg.muted">
                    {available ? `PDF · ${r.size}` : "Report file coming soon"}
                  </Text>
                </Box>
                {available && (
                  <ChA
                    href={r.file}
                    download
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    gap="2"
                    minH="44px"
                    minW="44px"
                    px={{ base: "0", sm: "4" }}
                    borderRadius="full"
                    borderWidth="1.5px"
                    borderColor="border.strong"
                    color="fg"
                    fontWeight="600"
                    fontSize="0.9375rem"
                    textDecoration="none"
                    transition="border-color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)"
                    _hover={{ borderColor: "brand.solid", color: "brand.fg" }}
                    _active={{ transform: "scale(0.97)" }}
                    aria-label={`Download ${r.title} (PDF, ${r.size})`}
                  >
                    <Download size={16} aria-hidden="true" />
                    <Box as="span" display={{ base: "none", sm: "inline" }}>
                      Download
                    </Box>
                  </ChA>
                )}
              </Box>
            );
          })}
        </ChUl>
      </Container>
    </Box>
  );
}

export default function FinancialsPage() {
  return (
    <>
      <Hero />
      <Glance />
      <Where />
      <Governance />
      <Reports />
      <NextStepBand
        tone="night"
        title="See where your giving goes"
        text="Give by M-Pesa, card or bank transfer."
        primary={{ label: "Give now", href: "/give" }}
        secondary={{ label: "Ask a question", href: "/contact" }}
      />
    </>
  );
}
