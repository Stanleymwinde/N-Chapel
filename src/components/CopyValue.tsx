"use client";

import { Clipboard, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { Check, Copy } from "lucide-react";

/**
 * Label + value with a copy-to-clipboard button (Paybill, bank numbers).
 * `design` opts into the Figma Give page look: 10px tracked label, 19px bold
 * value and a 30px purple-ringed copy button. The default look is unchanged.
 */
export function CopyValue({ label, value, copyValue, design }: { label: string; value: string; copyValue?: string; design?: boolean }) {
  return (
    <Stack gap={design ? "6px" : "0.5"}>
      {design ? (
        <Text fontSize="10px" fontWeight="600" letterSpacing="0.6px" textTransform="uppercase" color="fg.muted" lineHeight="normal">
          {label}
        </Text>
      ) : (
        <Text textStyle="eyebrow" color="fg.muted">
          {label}
        </Text>
      )}
      <HStack gap={design ? "10px" : "2"}>
        <Text fontFamily="heading" fontWeight={design ? "700" : "650"} fontSize={design ? "19px" : "1.375rem"} lineHeight={design ? "normal" : undefined} color="fg">
          {value}
        </Text>
        <Clipboard.Root value={copyValue ?? value.replace(/\s/g, "")} timeout={2000}>
          <Clipboard.Trigger asChild>
            <IconButton
              variant="secondary"
              size="md"
              aria-label={`Copy ${label}`}
              borderRadius="full"
              {...(design ? { minW: "30px", w: "30px", h: "30px", minH: "30px", maxH: "30px", p: "0", borderWidth: "1.5px", borderColor: "brand.solid", color: "brand.fg", bg: "transparent", css: { "& svg": { width: "14px", height: "14px" } } } : {})}
            >
              <Clipboard.Indicator copied={<Check aria-hidden="true" data-anim="icon-pop" />}>
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
