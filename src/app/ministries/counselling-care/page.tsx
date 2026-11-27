import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Phone } from "lucide-react";
import { counselling as m } from "@content/ministries/counselling";
import { pageMetadata } from "@/lib/metadata";
import { Faq } from "@/components/Faq";
import { MinistryClosing } from "@/components/ministries/MinistryClosing";
import { RichText } from "@/components/RichText";
import { MinistryHero } from "@/components/ministries/MinistryHero";
import { MoreMinistries } from "@/components/ministries/MoreMinistries";
import { ChA, ChDd, ChDiv, ChDl, ChDt } from "@/components/primitives";
import { Callout, MSection } from "@/components/b/MinistryBlocks";

export const metadata = pageMetadata({ title: m.meta.title, description: m.meta.description, path: m.href });

export default function CounsellingPage() {
  return (
    <>
      <MinistryHero
        m={m}
        crumb="Counselling and care"
      />

      <MSection id="urgent" afterHero label="Urgent help">
        <Callout id="emergency" title="Need help right now?" tone="alert" icon={<Phone size={18} />}>
          <Text fontSize="1.125rem" fontWeight="500">
            If you are in immediate danger, call{" "}
            <ChA href="tel:999" textDecoration="underline" textUnderlineOffset="0.2em">
              999
            </ChA>{" "}
            or{" "}
            <ChA href="tel:112" textDecoration="underline" textUnderlineOffset="0.2em">
              112
            </ChA>
            .
          </Text>
          <Text fontSize="0.875rem" color="fg.muted">
            Mental health helpline: <RichText text={m.emergency.helpline} />
          </Text>
        </Callout>
      </MSection>

      <MSection id="support" tone="warm" title="Support we offer" gap="8">
        <Grid templateColumns={{ base: "1fr", lg: "repeat(3, minmax(0, 1fr))" }} gap="18px">
          {m.services.map((s) => (
            <Stack key={s.title} gap="3" p="22px" minH={{ lg: "313px" }} bg="bg.canvas" borderWidth="1px" borderColor="border" borderRadius="12px">
              <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="1.375rem" lineHeight="1.25">
                {s.title}
              </Heading>
              <Text fontSize="0.9375rem" lineHeight="1.6" color="fg.muted">
                {s.summary}
              </Text>
              <ChDl m="0" display="grid" gap="1.5" mt="auto" pt="14px" borderTopWidth="1px" borderColor="border">
                <ChDiv>
                  <ChDt fontSize="0.6875rem" fontWeight="600" color="fg" mb="1">
                    When
                  </ChDt>
                  <ChDd m="0" fontSize="0.9375rem" lineHeight="1.5">
                    <RichText text={s.when} />
                  </ChDd>
                </ChDiv>
                <ChDiv>
                  <ChDt fontSize="0.6875rem" fontWeight="600" color="fg" mb="1">
                    Who it&apos;s for
                  </ChDt>
                  <ChDd m="0" fontSize="0.9375rem">
                    {s.who}
                  </ChDd>
                </ChDiv>
              </ChDl>
            </Stack>
          ))}
        </Grid>
        <Text mt="8" fontSize="0.9375rem">
          <Text as="span" fontWeight="600">
            How to book:{" "}
          </Text>
          <RichText text={m.booking} />
        </Text>
      </MSection>

      <MSection id="questions" title="Common questions">
        <Box maxW="864px">
          <Faq items={m.faq} />
        </Box>
      </MSection>

      <MoreMinistries current={m.href} />

      <MinistryClosing {...m.nextStep} variant="design" />
    </>
  );
}
