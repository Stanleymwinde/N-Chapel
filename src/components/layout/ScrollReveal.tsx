"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll reveals for every page, in every browser.
 *
 * On each page, headings, cards and list items that start BELOW the first
 * screen are marked "pending" (hidden 28px low). As each one scrolls into
 * view it rises into place; siblings in the same grid arrive one after
 * another in a short cascade. Anything already on screen is left alone, so
 * there is never a flash of hidden content, and without JavaScript the page
 * simply shows as is. People who prefer reduced motion get no reveals.
 *
 * Opt an element out with data-no-reveal; opt one in with data-reveal.
 */
const SELECTOR = [
  "main h2",
  "main section ul > li",
  "main section ol > li",
  "main [data-reveal]",
  "main .nc-card__root",
].join(", ");

/** Items in a sideways-scrolling row are already partly out of sight; leave them as they are. */
function inSideScroller(el: HTMLElement) {
  for (let a = el.parentElement; a && a.tagName !== "MAIN"; a = a.parentElement) {
    if (/(auto|scroll)/.test(getComputedStyle(a).overflowX)) return true;
  }
  return false;
}

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // Let the new page paint first (and any page transition settle)
    let observer: IntersectionObserver | null = null;
    const timer = window.setTimeout(() => {
      const fold = window.innerHeight * 0.92;
      // Document order puts parents before children, so a card inside a revealed
      // list item is skipped (it rises with its parent instead of twice)
      const els: HTMLElement[] = [];
      for (const el of document.querySelectorAll<HTMLElement>(SELECTOR)) {
        if (el.closest("[data-no-reveal], header, footer, nav, [role='dialog'], [data-rv], .sr-only, details:not([open])")) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= fold || rect.width < 4 || rect.height < 4) continue;
        if (inSideScroller(el)) continue;
        el.dataset.rv = "pending";
        els.push(el);
      }

      // Stagger siblings that share a parent: 0, 70, 140, 210 ms, then repeat
      const seen = new Map<Element | null, number>();
      for (const el of els) {
        const i = seen.get(el.parentElement) ?? 0;
        seen.set(el.parentElement, i + 1);
        el.style.setProperty("--rv-delay", `${(i % 4) * 70}ms`);
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            observer?.unobserve(el);
            el.dataset.rv = "in";
            // Hand the element back its own transitions once it has arrived
            const done = () => {
              el.dataset.rv = "done";
              el.style.removeProperty("--rv-delay");
            };
            el.addEventListener("transitionend", done, { once: true });
            window.setTimeout(done, 1400);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      els.forEach((el) => observer?.observe(el));
    }, 120);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
      // Never leave anything hidden when leaving a page
      document.querySelectorAll<HTMLElement>("[data-rv='pending']").forEach((el) => (el.dataset.rv = "done"));
    };
  }, [pathname]);

  return null;
}
