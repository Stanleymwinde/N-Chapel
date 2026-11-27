import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { groupAreas, groupAreasTodo, groupAudiences, groups, groupsIntro, joinGroupAside, joinGroupForm } from "@content/groups";
import { pageMetadata } from "@/lib/metadata";
import { LinkButton } from "@/components/Button";
import { Form } from "@/components/Form";
import { NextStepBand } from "@/components/NextStepBand";
import { GroupFinder } from "@/components/d/GroupFinder";
import { FormWithAside } from "@/components/get-involved/GetInvolvedParts";
import { LightHero } from "@/components/layout/LightHero";
import { Section } from "@/components/layout/Section";

export const metadata = pageMetadata({
  title: "Find a group",
  description:
    "eGroups, Binti for women, Jabari for men, BLITZ 5:16 for young adults, and support groups including GriefShare and addiction support. Find your community and join a group.",
  path: "/get-involved/groups",
});

const egroups = groups.find((g) => g.slug === "egroups");

export default function GroupsPage() {
  return (
    <>
      <LightHero
        title="Find a group"
        intro={groupsIntro}
        image="groups.egroups"
        media={{ width: 722, height: 401, bleed: 74 }}
        breadcrumbs={[{ label: "Get involved", href: "/get-involved" }, { label: "Find a group" }]}
        actions={
          <LinkButton href="#join" variant="primary" size="lg">
            Join a group
          </LinkButton>
        }
        flushBottom
      />

      <Section id="finder" title="Groups for every season of life" intro="Choose who the group is for, then pick one and tell us you’d like to join.">
        <GroupFinder groups={groups} audiences={groupAudiences} areas={groupAreas} areasTodo={groupAreasTodo} joinMode="form" />
      </Section>

      {egroups?.details && (
        <Section
          id="abcde"
          tone="tint"
          title="Five marks of an eGroup"
          intro="eGroups are where the life of the church happens. We call these marks the ABCDEs."
        >
          <Box
            as="dl"
            display="grid"
            gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(5, 1fr)" }}
            borderTopWidth="1.5px"
            borderColor="brand.solid"
          >
            {egroups.details.map((d, i) => (
              <Stack
                key={d.title}
                gap="2"
                py="6"
                pr={{ lg: "5" }}
                pl={{ lg: i === 0 ? "0" : "5" }}
                minH={{ lg: "253px" }}
                borderBottomWidth={{ base: "1px", lg: "0" }}
                borderRightWidth={{ base: "0", lg: i === egroups.details!.length - 1 ? "0" : "1px" }}
                borderColor="purple.200"
              >
                <Box as="dt" display="grid" gap="2">
                  <Text as="span" fontFamily="heading" fontWeight="700" fontSize="2.75rem" lineHeight="1.1" color="brand.fg" aria-hidden="true">
                    {d.title.charAt(0)}
                  </Text>
                  <Text as="span" fontFamily="heading" fontWeight="600" fontSize="1.0625rem" lineHeight="normal">
                    {d.title}
                  </Text>
                </Box>
                <Box as="dd" m="0" fontSize="0.9375rem" lineHeight="1.6" color="fg.muted">
                  {d.text}
                </Box>
              </Stack>
            ))}
          </Box>
        </Section>
      )}

      <Section id="support" tone="warm" title="Support groups">
        <Grid templateColumns={{ base: "1fr", lg: "648px auto" }} gap={{ base: "6", lg: "60px" }} alignItems="start" mt={{ md: "-3" }}>
          <Stack gap="14px">
            <Text fontSize={{ base: "1.125rem", md: "1.25rem" }} lineHeight="1.5" color="fg">
              Life&apos;s challenges can feel overwhelming, but you don&apos;t have to face them alone.
            </Text>
            <Text fontSize="1rem" lineHeight="1.65" color="fg.muted">
              Our counselling support groups include an addiction support group on Thursdays from 6:30 to 7:30 PM and GriefShare, for
              anyone grieving the loss of a loved one. Free, confidential counselling is also available.
            </Text>
          </Stack>
          <Stack gap="3" alignItems="flex-start">
            <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.0625rem" lineHeight="normal">
              Need to talk to someone?
            </Heading>
            <LinkButton href="/ministries/counselling-care" variant="secondary">
              Explore counselling and care
            </LinkButton>
          </Stack>
        </Grid>
      </Section>

      <Section id="join" title="Join a group" intro="Tell us a little about you and a group leader will get in touch within a week.">
        <FormWithAside aside={{ ...joinGroupAside, imageHeight: 440, imageFill: false }}>
          <Form form={joinGroupForm} prefillFromQuery={{ group: "group" }} hideTitle />
        </FormWithAside>
      </Section>

      <NextStepBand
        title="Ready to use your gifts too?"
        text="Many people find their group by serving alongside others."
        primary={{ label: "Serve on a team", href: "/get-involved/serve" }}
        secondary={{ label: "See next steps", href: "/new-here/next-steps" }}
      />
    </>
  );
}
