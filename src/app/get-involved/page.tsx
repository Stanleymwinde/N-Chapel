import { SimpleGrid } from "@chakra-ui/react";
import { getInvolved } from "@content/get-involved";
import { groupAreas, groupAreasTodo, groupAudiences, groups } from "@content/groups";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { MinistryCard } from "@/components/Cards";
import { NextStepBand } from "@/components/NextStepBand";
import { GroupFinder } from "@/components/d/GroupFinder";
import { LightHero } from "@/components/layout/LightHero";
import { Section } from "@/components/layout/Section";

export const metadata = pageMetadata({
  title: "Get involved",
  description:
    "Find a group where you can belong, grow and serve at Nairobi Chapel Ngong Road: eGroups, Binti, Jabari, serving teams, Kinara and School of Ministry.",
  path: "/get-involved",
});

export default function GetInvolvedPage() {
  return (
    <>
      <LightHero
        title={getInvolved.title}
        intro={getInvolved.intro}
        image="getinvolved.hero"
        breadcrumbs={[{ label: "Get involved" }]}
        flushBottom
        actions={
          <>
            <LinkButton href="/get-involved/groups" variant="primary" size="lg">
              Find a group
            </LinkButton>
            <LinkButton href="/get-involved/serve" variant="secondary" size="lg">
              Serve on a team
            </LinkButton>
          </>
        }
      />

      <Section id="ways" title="Ways to belong, grow and serve">
        <SimpleGrid as="ul" listStyle="none" m="0" p="0" columns={{ base: 1, sm: 2, lg: 4 }} gap={{ base: "5", md: "6" }}>
          {getInvolved.ways.map((w) => (
            <li key={w.href}>
              <MinistryCard title={w.title} summary={w.summary} href={w.href} image={w.image} cta={w.cta} />
            </li>
          ))}
        </SimpleGrid>
      </Section>

      <Section
        id="finder"
        tone="warm"
        title="Find your community"
        intro="Filter by who the group is for. Every group is open to newcomers."
      >
        <GroupFinder groups={groups} audiences={groupAudiences} areas={groupAreas} areasTodo={groupAreasTodo} joinMode="page" />
      </Section>

      <NextStepBand
        title="Not sure where to start?"
        text="Tell us a little about you and we'll help you find a group that fits."
        primary={{ label: "Join a group", href: "/get-involved/groups#join" }}
        secondary={{ label: "See next steps", href: "/new-here/next-steps" }}
      />
    </>
  );
}
