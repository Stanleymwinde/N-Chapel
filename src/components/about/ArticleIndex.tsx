"use client";

import { useEffect, useState } from "react";
import { Box, chakra, Text } from "@chakra-ui/react";

type Item = { id: string; title: string };

/**
 * Sticky table of contents for a long document. Highlights the article
 * currently being read (IntersectionObserver). Colour-only change, no motion.
 */
export function ArticleIndex({ items, label, compact = false }: { items: Item[]; label: string; compact?: boolean }) {
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
      <Text textStyle="label" color="fg.muted" mb="4">
        {label}
      </Text>
      <chakra.ol listStyle="none" m="0" p="0" borderLeftWidth="2px" borderColor="border">
        {items.map((item, i) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <chakra.a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                display="flex"
                gap="3"
                alignItems="baseline"
                minH={compact ? "36px" : "40px"}
                py={compact ? "1.5" : "2"}
                fontSize={compact ? "0.9375rem" : undefined}
                lineHeight={compact ? "1.4" : undefined}
                pl="4"
                ml="-2px"
                borderLeftWidth="2px"
                borderColor={isActive ? "brand.solid" : "transparent"}
                color={isActive ? "brand.fg" : "fg.muted"}
                fontWeight={isActive ? "600" : "500"}
                textDecoration="none"
                transition="color 150ms ease, border-color 150ms ease"
                _hover={{ color: "brand.fg" }}
              >
                <Box as="span" fontFamily="heading" fontSize="0.875rem" minW="1.25rem" aria-hidden="true">
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
