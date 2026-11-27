"use client";

import { useEffect, useState } from "react";
import { chakra, Text } from "@chakra-ui/react";

type Item = { id: string; title: string };

/**
 * Figma "In this post": a sticky, numbered contents list on a thin rule.
 * The section being read is marked in purple (IntersectionObserver);
 * colour-only change, no motion.
 */
export function PostContents({ items }: { items: Item[] }) {
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
    <chakra.nav aria-label="In this post" position="sticky" top="160px" maxH="calc(100vh - 190px)" overflowY="auto" overscrollBehavior="contain">
      <Text fontSize="0.8125rem" fontWeight="600" color="fg" mb="12px">
        In this post
      </Text>
      <chakra.ol listStyle="none" m="0" p="0" borderLeftWidth="1px" borderColor="border">
        {items.map((item, i) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <chakra.a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                display="flex"
                gap="10px"
                alignItems="baseline"
                py="6px"
                pl="14px"
                ml="-1px"
                borderLeftWidth="2px"
                borderColor={isActive ? "brand.solid" : "transparent"}
                color={isActive ? "brand.fg" : "fg.muted"}
                fontSize="0.8125rem"
                lineHeight="1.4"
                fontWeight={isActive ? "500" : "400"}
                textDecoration="none"
                transition="color 150ms ease, border-color 150ms ease"
                _hover={{ color: "brand.fg" }}
              >
                <chakra.span fontSize="0.75rem" lineHeight="1.5" aria-hidden="true" fontWeight="400">
                  {i + 1}
                </chakra.span>
                <span>{item.title}</span>
              </chakra.a>
            </li>
          );
        })}
      </chakra.ol>
    </chakra.nav>
  );
}
