"use client";

import { useEffect, useState } from "react";
import { Box, chakra, Text } from "@chakra-ui/react";

type Item = { id: string; title: string };

/**
 * Sticky table of contents for a long document. Highlights the article
 * currently being read (IntersectionObserver). Colour-only change, no motion.
 */
export function ArticleIndex({
  items,
  label,
  compact = false,
  variant = "default",
}: {
  items: Item[];
  label: string;
  compact?: boolean;
  /** "contents": the Figma "Statement of faith" list (1px rule, small numerals, ink titles) */
  variant?: "default" | "contents";
}) {
  const contents = variant === "contents";
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <chakra.nav aria-label={label} position="sticky" top="160px" maxH={compact ? "calc(100vh - 190px)" : undefined} overflowY={compact ? "auto" : undefined} overscrollBehavior="contain">
      <Text textStyle="label" color="fg.muted" mb={contents ? "3.5" : "4"} {...(contents ? { fontSize: "1rem", fontWeight: "700" } : {})}>
        {label}
      </Text>
      <chakra.ol listStyle="none" m="0" p="0" borderLeftWidth={contents ? "1px" : "2px"} borderColor="border">
        {items.map((item, i) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <chakra.a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                display="flex"
                gap="3"
                alignItems={contents ? "flex-start" : "baseline"}
                minH={contents ? "36px" : compact ? "36px" : "40px"}
                py={contents ? "7px" : compact ? "1.5" : "2"}
                fontSize={contents ? "1rem" : compact ? "0.9375rem" : undefined}
                pl={contents ? "3.5" : "4"}
                ml={contents ? "-1px" : "-2px"}
                borderLeftWidth="2px"
                borderColor={isActive ? "brand.solid" : "transparent"}
                color={isActive ? "brand.fg" : contents ? "fg" : "fg.muted"}
                fontWeight={contents ? (isActive ? "500" : "400") : isActive ? "600" : "500"}
                lineHeight={contents ? "1.4" : compact ? "1.4" : undefined}
                textDecoration="none"
                transition="color 150ms ease, border-color 150ms ease"
                _hover={{ color: "brand.fg" }}
              >
                <Box as="span" fontFamily="heading" fontSize={contents ? "0.6875rem" : "0.875rem"} minW={contents ? "auto" : "1.25rem"} color={contents && !isActive ? "fg.muted" : undefined} aria-hidden="true">
                  {i + 1}
                </Box>
                <span>{item.title}</span>
              </chakra.a>
            </li>
          );
        })}
      </chakra.ol>
    </chakra.nav>
  );
}
