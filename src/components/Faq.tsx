"use client";

import { Accordion, Box } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@content/types";
import { RichText } from "./RichText";

/** Accessible FAQ accordion (button + aria-expanded + region, via Chakra/Ark). */
export function Faq({ items, headingLevel = "h3" }: { items: readonly FaqItem[]; headingLevel?: "h3" | "h4" }) {
  const H = headingLevel;
  return (
    <Accordion.Root collapsible multiple variant="plain" maxW="prose" borderTopWidth="1px" borderColor="border">
      {items.map((item, i) => (
        <Accordion.Item key={item.question} value={`faq-${i}`} borderBottomWidth="1px" borderColor="border">
          <H style={{ margin: 0 }}>
            <Accordion.ItemTrigger
              minH="56px"
              py="4"
              px="1"
              cursor="pointer"
              textAlign="left"
              fontFamily="body"
              fontWeight="600"
              fontSize="1.0625rem"
              color="fg"
              justifyContent="space-between"
              gap="4"
              _hover={{ color: "brand.fg" }}
            >
              {item.question}
              <Accordion.ItemIndicator color="brand.fg">
                <ChevronDown aria-hidden="true" />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
          </H>
          <Accordion.ItemContent>
            <Accordion.ItemBody px="1" pb="5" pt="0" color="fg.muted" textStyle="body">
              <Box>
                <RichText text={item.answer} />
              </Box>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
