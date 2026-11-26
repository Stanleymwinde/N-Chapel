"use client";

import { Children, useId, useState } from "react";
import { Box, Button, SimpleGrid, type SimpleGridProps } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";

type Counts = { base: number; md: number; lg: number };

/**
 * A grid that shows only its first full row(s) and hides the rest behind a
 * "View all (N)" button. The number shown follows the grid's columns
 * (default: 4 on phones, 6 on tablets, 5 on desktop) so the collapsed rows are
 * always full, and the button only appears when something is actually hidden
 * at that width. Every item is rendered (search, in-page links); hidden ones
 * use display:none so assistive tech skips them until the grid is expanded.
 */
export function ViewAllGrid({
  label,
  initial = { base: 4, md: 6, lg: 5 },
  children,
  ...grid
}: { label: string; initial?: Counts; children: React.ReactNode } & Omit<SimpleGridProps, "children">) {
  const items = Children.toArray(children);
  const [open, setOpen] = useState(false);
  const id = useId();
  const n = items.length;
  const show = (hidden: boolean) => (hidden ? "none" : "block");

  return (
    <>
      <SimpleGrid as="ul" id={id} listStyle="none" m="0" p="0" {...grid}>
        {items.map((child, i) => (
          <Box
            as="li"
            key={i}
            display={open ? "block" : { base: show(i >= initial.base), md: show(i >= initial.md), lg: show(i >= initial.lg) }}
          >
            {child}
          </Box>
        ))}
      </SimpleGrid>
      <Box
        mt={{ base: "8", md: "10" }}
        display={open ? "block" : { base: show(n <= initial.base), md: show(n <= initial.md), lg: show(n <= initial.lg) }}
      >
        <Button
          variant="secondary"
          aria-expanded={open}
          aria-controls={id}
          aria-label={open ? `Show fewer: ${label}` : `View all ${n}: ${label}`}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Show fewer" : `View all (${n})`}
          <Box as="span" display="inline-flex" transition="transform 200ms cubic-bezier(0.23, 1, 0.32, 1)" transform={open ? "rotate(180deg)" : undefined}>
            <ChevronDown aria-hidden="true" />
          </Box>
        </Button>
      </Box>
    </>
  );
}
