"use client";

import { Box, Tabs, Text } from "@chakra-ui/react";
import type { FormDefinition } from "@content/types";
import { Form } from "../Form";

type Tab = { value: string; label: string; form: FormDefinition; note?: string };

/**
 * Contact tabs: one form per kind of enquiry. Switching is instant (a direct
 * user action needs no animation). Keyboard: arrow keys move between tabs.
 */
export function ContactTabs({ tabs }: { tabs: Tab[] }) {
  return (
    <Tabs.Root defaultValue={tabs[0].value} variant="plain" fitted lazyMount={false}>
      <Tabs.List borderBottomWidth="1px" borderColor="border.strong" gap="0" position="relative">
        {tabs.map((t) => (
          <Tabs.Trigger
            key={t.value}
            value={t.value}
            minH="56px"
            px={{ base: "2", md: "4" }}
            fontFamily="body"
            fontSize={{ base: "0.9375rem", md: "1.125rem" }}
            fontWeight="500"
            color="fg.muted"
            textAlign="center"
            whiteSpace="normal"
            lineHeight="1.25"
            cursor="pointer"
            _selected={{ color: "fg", fontWeight: "600" }}
            _hover={{ color: "fg" }}
          >
            {t.label}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator h="3px" bottom="-2px" top="auto" bg="brand.solid" borderRadius="full" boxShadow="none" />
      </Tabs.List>
      {tabs.map((t) => (
        <Tabs.Content key={t.value} value={t.value} pt={{ base: "8", md: "10" }}>
          {(t.form.intro || t.note) && (
            <Box mb="6">
              {t.form.intro && <Text color="fg.muted">{t.form.intro}</Text>}
              {t.note && (
                <Text color="fg.muted" fontSize="0.9375rem" mt="1">
                  {t.note}
                </Text>
              )}
            </Box>
          )}
          <Form form={t.form} hideTitle plain />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
