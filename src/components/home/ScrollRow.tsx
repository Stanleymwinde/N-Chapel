"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Container, Heading, HStack, IconButton } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * A shelf of tiles that scrolls sideways (swipe on touch, arrow buttons on
 * desktop). The row starts on the page's content edge and bleeds off the
 * right edge. Buttons disable at either end.
 */
export function ScrollRow({
  id,
  title,
  link,
  label,
  children,
}: {
  id: string;
  title: string;
  /** e.g. a "See all" LinkButton, rendered server-side */
  link?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const item = el.querySelector("li");
    const amount = item ? item.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * amount, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <Box as="section" aria-labelledby={id} pt="0" pb={{ base: "16", md: "24" }}>
      <Container maxW="container" px={{ base: "5", md: "8" }}>
        <HStack justifyContent="space-between" alignItems="center" gap="4" mb="8" flexWrap="wrap">
          <Heading as="h2" id={id} textStyle="h2" color="brand.fg">
            {title}
          </Heading>
          <HStack gap="3">
            {link}
            <HStack gap="2" display={{ base: "none", md: "flex" }}>
              <IconButton variant="secondary" borderRadius="full" minW="36px" minH="36px" w="36px" h="36px" px="0" py="0" css={{ "& svg": { width: "16px", height: "16px" } }} aria-label="Scroll back" onClick={() => step(-1)} disabled={atStart}>
                <ChevronLeft aria-hidden="true" />
              </IconButton>
              <IconButton variant="secondary" borderRadius="full" minW="36px" minH="36px" w="36px" h="36px" px="0" py="0" css={{ "& svg": { width: "16px", height: "16px" } }} aria-label="Scroll forward" onClick={() => step(1)} disabled={atEnd}>
                <ChevronRight aria-hidden="true" />
              </IconButton>
            </HStack>
          </HStack>
        </HStack>
      </Container>
      <Box
        as="ul"
        ref={ref}
        role="list"
        aria-label={label}
        listStyle="none"
        m="0"
        display="grid"
        gridAutoFlow="column"
        gridAutoColumns={{ base: "78%", sm: "44%", lg: "280px" }}
        gap={{ base: "4", md: "6" }}
        overflowX="auto"
        scrollSnapType="x mandatory"
        scrollPaddingInline={{ base: "20px", md: "32px", lg: "max(32px, calc((100vw - 1264px) / 2 + 32px))" }}
        paddingInlineStart={{ base: "20px", md: "32px", lg: "max(32px, calc((100vw - 1264px) / 2 + 32px))" }}
        paddingInlineEnd={{ base: "20px", md: "32px" }}
        pt="1"
        pb="4"
        css={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
      >
        {children}
      </Box>
    </Box>
  );
}
