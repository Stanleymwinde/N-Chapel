"use client";

import { Clipboard, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { Check, Copy } from "lucide-react";

/** Label + value with a copy-to-clipboard button (Paybill, bank numbers). */
export function CopyValue({ label, value, copyValue }: { label: string; value: string; copyValue?: string }) {
  return (
    <Stack gap="0.5">
      <Text textStyle="eyebrow" color="fg.muted">
        {label}
      </Text>
      <HStack gap="2">
        <Text fontFamily="heading" fontWeight="650" fontSize="1.375rem" color="fg">
          {value}
        </Text>
        <Clipboard.Root value={copyValue ?? value.replace(/\s/g, "")} timeout={2000}>
          <Clipboard.Trigger asChild>
            <IconButton variant="secondary" size="md" aria-label={`Copy ${label}`} borderRadius="full">
              <Clipboard.Indicator copied={<Check aria-hidden="true" />}>
                <Copy aria-hidden="true" />
              </Clipboard.Indicator>
            </IconButton>
          </Clipboard.Trigger>
          <Clipboard.Context>
            {(api) => (
              <span role="status" className="sr-only">
                {api.copied ? `${label} copied` : ""}
              </span>
            )}
          </Clipboard.Context>
        </Clipboard.Root>
      </HStack>
    </Stack>
  );
}
