"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { FilterBarChip, FilterBarRoot } from "@/components/recipe-parts";

type Option = { id: string; label: string; count: number };

/**
 * Filter toggle buttons for the team groups. The groups themselves are
 * server-rendered children wrapped in [data-team-group="<id>"]; this only
 * sets data-filter on the wrapper and CSS hides the other groups. The choice
 * is kept in the URL hash (#all, #adults, …) so a link can open one group.
 */
export function TeamFilter({ options, children }: { options: Option[]; children: React.ReactNode }) {
  const total = options.reduce((n, o) => n + o.count, 0);
  const all: Option[] = [{ id: "all", label: "All", count: total }, ...options];
  const [active, setActive] = useState("all");
  const [message, setMessage] = useState("");
  const [top, setTop] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Stick just below the site header, whatever its height at this width
  useEffect(() => {
    const header = Array.from(document.querySelectorAll("header")).find((h) => getComputedStyle(h).position === "sticky");
    if (!header) return;
    const measure = () => setTop(Math.round(header.getBoundingClientRect().height));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Bring the start of the team area up under the header */
  // (An exact offset, not scrollIntoView: the page's global scroll-padding-top would add 160px.)
  const toTop = useCallback((smooth: boolean) => {
    const el = rootRef.current;
    if (!el) return;
    const header = Array.from(document.querySelectorAll("header")).find((h) => getComputedStyle(h).position === "sticky");
    const offset = header ? header.getBoundingClientRect().height : 0;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: smooth && !reduced() ? "smooth" : "auto" });
  }, []);

  const announce = useCallback(
    (id: string) => {
      const o = all.find((x) => x.id === id);
      if (!o) return;
      setMessage(id === "all" ? `Showing all ${o.count} people` : `Showing ${o.count} ${o.count === 1 ? "person" : "people"} in ${o.label}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options],
  );

  // Read the hash on load and whenever it changes
  useEffect(() => {
    const ids = new Set(["all", ...options.map((o) => o.id)]);
    const read = (initial: boolean) => {
      const h = decodeURIComponent(window.location.hash.slice(1));
      if (!ids.has(h)) return;
      setActive(h);
      if (!initial) announce(h);
      // The browser jumps to the group's own section; start at the bar instead
      requestAnimationFrame(() => toTop(false));
    };
    read(true);
    const onHash = () => read(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [options, announce, toTop]);

  // After the groups have re-rendered, bring the team area back to the top if it had scrolled past
  const pendingScroll = useRef(false);
  useEffect(() => {
    if (!pendingScroll.current) return;
    pendingScroll.current = false;
    toTop(true);
  }, [active, toTop]);

  // Keep the pressed button in view in the phone's sideways row
  useEffect(() => {
    const row = scrollerRef.current;
    const btn = row?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!row || !btn) return;
    const left = btn.offsetLeft - row.offsetLeft;
    if (left < row.scrollLeft || left + btn.offsetWidth > row.scrollLeft + row.clientWidth) {
      row.scrollTo({ left: Math.max(0, left - 20), behavior: reduced() ? "auto" : "smooth" });
    }
  }, [active]);

  const select = (id: string) => {
    if (id === active) return;
    setActive(id);
    announce(id);
    // replaceState: no history entry per click and no hashchange jump. Passing the
    // router's own state keeps Next.js from treating it as a navigation (and scrolling).
    window.history.replaceState(window.history.state, "", `#${id}`);
    // Only when the bar is stuck (the reader is inside the groups); measured before the groups collapse
    pendingScroll.current = (rootRef.current?.getBoundingClientRect().top ?? 1) <= top + 1;
  };

  // Hide every group but the chosen one
  const hide = Object.fromEntries(
    options.map((o) => [`&[data-filter="${o.id}"] [data-team-group]:not([data-team-group="${o.id}"])`, { display: "none" }]),
  );

  return (
    <Box
      ref={rootRef}
      data-filter={active}
      css={hide}
      style={{ "--team-top": `${top}px` } as React.CSSProperties}
    >
      <Box position="sticky" top="var(--team-top)" zIndex="docked" bg="bg.canvas" borderBottomWidth="1px" borderColor="border" py="3">
        <Container maxW="container" px={{ base: "0", md: "8" }}>
          <FilterBarRoot
            ref={scrollerRef}
            role="group"
            aria-label="Filter team by ministry"
            display="flex"
            flexWrap={{ base: "nowrap", md: "wrap" }}
            gap="2"
            p="0"
            px={{ base: "5", md: "0" }}
            bg="transparent"
            borderWidth="0"
            borderRadius="0"
            overflowX={{ base: "auto", md: "visible" }}
            css={{
              scrollSnapType: "x mandatory",
              scrollPaddingInline: "20px",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              "@media (min-width: 48em)": { scrollSnapType: "none" },
            }}
          >
            {all.map((o) => (
              <FilterBarChip
                key={o.id}
                type="button"
                aria-pressed={active === o.id}
                onClick={() => select(o.id)}
                flexShrink={0}
                whiteSpace="nowrap"
                css={{
                  scrollSnapAlign: "start",
                  transition: "background-color 150ms ease-out, border-color 150ms ease-out, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)",
                  "&:active": { transform: "scale(0.97)" },
                  "&:focus-visible": { outline: "2px solid var(--chakra-colors-brand-solid)", outlineOffset: "2px" },
                  "@media (prefers-reduced-motion: reduce)": { transition: "none", "&:active": { transform: "none" } },
                }}
              >
                {o.label} ({o.count})
              </FilterBarChip>
            ))}
          </FilterBarRoot>
        </Container>
      </Box>

      <Box aria-live="polite" className="sr-only">
        {message}
      </Box>

      {children}
    </Box>
  );
}
