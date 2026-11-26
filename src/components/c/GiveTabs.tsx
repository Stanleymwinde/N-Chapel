"use client";

import { Box, Grid, Heading, Stack, Tabs, Text } from "@chakra-ui/react";
import { Landmark, CreditCard, Smartphone } from "lucide-react";
import { CopyValue } from "../CopyValue";
import { RichText } from "../RichText";
import { CardGiveForm } from "./CardGiveForm";

type Props = {
  paybill: string;
  accountHint: string;
  mpesaSteps: string[];
  stkNote: string;
  bank: { accountName: string; accountNumber: string; bankName: string; branch: string; swift: string };
  card: {
    givingTypes: string[];
    givingTypesNote: string;
    currencies: readonly string[];
    presets: number[];
    providerNote: string;
    successMessage: string;
  };
};

const triggerStyles = {
  minH: "52px",
  px: { base: "3", md: "5" },
  gap: "2",
  fontWeight: "600",
  fontSize: { base: "0.9375rem", md: "1rem" },
  color: "fg.muted",
  _selected: { color: "brand.fg" },
} as const;

/** M-Pesa / card / bank tabs on /give. */
export function GiveTabs({ paybill, accountHint, mpesaSteps, stkNote, bank, card }: Props) {
  return (
    <Tabs.Root defaultValue="mpesa" variant="line" colorPalette="purple" lazyMount={false}>
      <Tabs.List overflowX="auto" borderColor="border">
        <Tabs.Trigger value="mpesa" {...triggerStyles}>
          <Smartphone size={18} aria-hidden="true" />
          M-Pesa
        </Tabs.Trigger>
        <Tabs.Trigger value="card" {...triggerStyles}>
          <CreditCard size={18} aria-hidden="true" />
          Card / online
        </Tabs.Trigger>
        <Tabs.Trigger value="bank" {...triggerStyles}>
          <Landmark size={18} aria-hidden="true" />
          Bank transfer
        </Tabs.Trigger>
        <Tabs.Indicator bg="brand.solid" height="3px" bottom="-1px" />
      </Tabs.List>

      <Tabs.Content value="mpesa" pt="8">
        <Grid templateColumns={{ base: "1fr", lg: "1.3fr 1fr" }} gap={{ base: "8", lg: "12" }} alignItems="start">
          <Stack gap="4">
            <Heading as="h3" textStyle="h3">
              Give with M-Pesa
            </Heading>
            <Box as="ol" display="grid" gap="3" pl="0" listStyle="none" css={{ counterReset: "step" }}>
              {mpesaSteps.map((s, i) => (
                <Box as="li" key={s} display="grid" gridTemplateColumns="32px 1fr" gap="3" alignItems="start">
                  <Box
                    aria-hidden="true"
                    w="8"
                    h="8"
                    borderRadius="full"
                    bg="brand.subtle"
                    color="brand.fg"
                    fontWeight="700"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {i + 1}
                  </Box>
                  <Text pt="0.5">{s}</Text>
                </Box>
              ))}
            </Box>
            <Text textStyle="small" color="fg.muted">
              <RichText text={stkNote} />
            </Text>
          </Stack>
          <Stack gap="5" p={{ base: "5", md: "6" }} borderRadius="lg" borderWidth="1px" borderColor="border" bg="bg.warm">
            <CopyValue label="Paybill business number" value={paybill} />
            <Stack gap="0.5">
              <Text textStyle="eyebrow" color="fg.muted">
                Account
              </Text>
              <Text>{accountHint}</Text>
            </Stack>
          </Stack>
        </Grid>
      </Tabs.Content>

      <Tabs.Content value="card" pt="8">
        <Stack gap="4">
          <Heading as="h3" textStyle="h3">
            Give by card
          </Heading>
          <CardGiveForm {...card} />
        </Stack>
      </Tabs.Content>

      <Tabs.Content value="bank" pt="8">
        <Stack gap="5" maxW="640px">
          <Heading as="h3" textStyle="h3">
            Give by bank transfer
          </Heading>
          <Text color="fg.muted">Works from Kenya and from abroad. Use the SWIFT code for international transfers.</Text>
          <Stack gap="5" p={{ base: "5", md: "6" }} borderRadius="lg" borderWidth="1px" borderColor="border" bg="bg.warm">
            <Stack gap="0.5">
              <Text textStyle="eyebrow" color="fg.muted">
                Account name
              </Text>
              <Text fontWeight="600">{bank.accountName}</Text>
            </Stack>
            <CopyValue label="Account number" value={bank.accountNumber} />
            <Stack gap="0.5">
              <Text textStyle="eyebrow" color="fg.muted">
                Bank and branch
              </Text>
              <Text fontWeight="600">
                {bank.bankName}, {bank.branch}
              </Text>
            </Stack>
            <CopyValue label="SWIFT code" value={bank.swift} />
          </Stack>
        </Stack>
      </Tabs.Content>
    </Tabs.Root>
  );
}
