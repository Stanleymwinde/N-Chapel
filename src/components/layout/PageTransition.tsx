"use client";

import { startTransition, useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

/**
 * Halftone circle page transition (after itagroupe.com).
 *
 * 1. Leave: a white disc grows from the click point until it covers the
 *    screen. Its edge is a 260px band of dots on a strict 14px grid: small gold
 *    dots at the outer edge, growing and blending into the white toward the
 *    inside so they merge into the solid with no seam.
 * 2. Covered: the next route is pushed and rendered behind the cover.
 * 3. Enter: the cover shrinks back into the click point with the same halftone
 *    edge, revealing the new page from the outside in.
 *
 * Colours come from CSS custom properties on :root (--dawn-cover, --dawn-accent);
 * the values here are fallbacks. Opt a link out with `data-no-transition`
 * (on the link or any ancestor).
 */
export const DAWN_CONFIG = {
  /** cover colour: white */
  cover: "#FFFFFF",
  /** dot colour at the outer edge of the band: brand gold */
  accent: "#F5C518",

  /** leave: the cover grows from the click point */
  leaveDuration: 0.4,
  leaveEase: "power2.inOut",
  /** pause once the new route has rendered, before the cover shrinks */
  enterDelay: 0,
  /** enter: the cover shrinks back into the click point */
  enterDuration: 0.45,
  enterEase: "power2.inOut",
  /** stop waiting for the next route after this long (ms) and reveal anyway */
  routeTimeout: 4000,

  /** grid spacing in CSS px; each dot sits at its cell centre */
  spacing: 14,
  /** width of the halftone band in CSS px */
  band: 260,
  /** the solid disc reaches this far into the band so the dots overlap it */
  discOverlap: 8.4,
  /** dot radius = dotScale × d^dotPower + dotMin, where d is 0 at the outer edge and 1 at the inner edge */
  dotScale: 10.36,
  dotPower: 0.85,
  dotMin: 0.6,
  /** highest device pixel ratio the canvas renders at */
  maxDpr: 1.5,
};

type State = { r: number };

function hexToRgb(hex: string, fallback: [number, number, number]): [number, number, number] {
  const h = hex.trim().replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return full.length !== 6 || Number.isNaN(n) ? fallback : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Files and API routes are not pages: let the browser handle them. */
const NOT_A_PAGE = /^\/(api|_next)\/|\.[a-z0-9]{2,5}$/i;

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const busy = useRef(false);
  const routeWaiter = useRef<{ from: string; resolve: () => void } | null>(null);
  const prefetched = useRef(new Set<string>());

  // Everything the draw loop needs, kept out of React state (redrawn on GSAP's ticker)
  const scene = useRef({
    w: 0,
    h: 0,
    dpr: 1,
    ox: 0,
    oy: 0,
    cover: hexToRgb(DAWN_CONFIG.cover, [255, 255, 255]),
    accent: hexToRgb(DAWN_CONFIG.accent, [245, 197, 24]),
  });
  const state = useRef<State>({ r: 0 });

  /* ---------------- canvas setup ---------------- */

  const layout = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = scene.current;
    s.dpr = Math.min(window.devicePixelRatio || 1, DAWN_CONFIG.maxDpr);
    s.w = window.innerWidth;
    s.h = window.innerHeight;
    canvas.width = Math.round(s.w * s.dpr);
    canvas.height = Math.round(s.h * s.dpr);
  }, []);

  /** Radius that covers the whole viewport from the origin, plus the band and one cell. */
  const maxRadius = useCallback(() => {
    const { w, h, ox, oy } = scene.current;
    const far = Math.max(Math.hypot(ox, oy), Math.hypot(w - ox, oy), Math.hypot(ox, h - oy), Math.hypot(w - ox, h - oy));
    return far + DAWN_CONFIG.band + DAWN_CONFIG.spacing;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const t0 = performance.now();
    const s = scene.current;
    const { r } = state.current;
    const { spacing, band, discOverlap, dotScale, dotPower, dotMin } = DAWN_CONFIG;
    const { ox, oy, cover, accent } = s;

    ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
    ctx.clearRect(0, 0, s.w, s.h);
    if (r <= 0) return;

    // Solid cover, reaching a little into the band so the dots overlap it (no seam)
    const inner = r - band;
    const disc = inner + discOverlap;
    if (disc > 0) {
      ctx.fillStyle = `rgb(${cover[0]}, ${cover[1]}, ${cover[2]})`;
      ctx.beginPath();
      ctx.arc(ox, oy, disc, 0, Math.PI * 2);
      ctx.fill();
    }

    // Halftone band: strict grid, dot at each cell centre; only cells inside the
    // circle's bounding box (clipped to the viewport) are visited
    const c0 = Math.max(0, Math.floor((ox - r) / spacing));
    const c1 = Math.min(Math.ceil(s.w / spacing), Math.ceil((ox + r) / spacing));
    const r0 = Math.max(0, Math.floor((oy - r) / spacing));
    const r1 = Math.min(Math.ceil(s.h / spacing), Math.ceil((oy + r) / spacing));
    const half = spacing / 2;
    for (let row = r0; row <= r1; row++) {
      const y = row * spacing + half;
      const dy = y - oy;
      for (let col = c0; col <= c1; col++) {
        const x = col * spacing + half;
        const u = Math.hypot(x - ox, dy);
        if (u > r || u < inner) continue;
        const d = (r - u) / band; // 0 at the outer edge, 1 at the inner edge
        const rad = dotScale * Math.pow(d, dotPower) + dotMin;
        const mix = clamp01((d - 0.15) / 0.6);
        const alpha = Math.min(1, 0.35 + 1.4 * d);
        const cr = Math.round(accent[0] + (cover[0] - accent[0]) * mix);
        const cg = Math.round(accent[1] + (cover[1] - accent[1]) * mix);
        const cb = Math.round(accent[2] + (cover[2] - accent[2]) * mix);
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (process.env.NODE_ENV !== "production") {
      const dbg = (window as unknown as { __dawn?: { frames: number[] } }).__dawn;
      dbg?.frames.push(performance.now() - t0);
    }
  }, []);

  const hide = useCallback(() => {
    const canvas = canvasRef.current;
    gsap.killTweensOf(state.current);
    if (canvas) {
      canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = "none";
      canvas.style.viewTransitionName = "";
    }
    state.current = { r: 0 };
    busy.current = false;
    routeWaiter.current = null;
  }, []);

  /* ---------------- the transition ---------------- */

  const run = useCallback(
    async (href: string, ox: number, oy: number) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        router.push(href);
        return;
      }
      busy.current = true;
      gsap.killTweensOf(state.current);
      const s = scene.current;
      const css = getComputedStyle(document.documentElement);
      s.cover = hexToRgb(css.getPropertyValue("--dawn-cover") || DAWN_CONFIG.cover, [255, 255, 255]);
      s.accent = hexToRgb(css.getPropertyValue("--dawn-accent") || DAWN_CONFIG.accent, [245, 197, 24]);
      s.ox = ox;
      s.oy = oy;
      layout();
      state.current = { r: 0 };
      canvas.style.display = "block";
      // Own view-transition layer: stays on top (and live) while React's
      // <ViewTransition> swaps the page underneath
      canvas.style.viewTransitionName = "dawn-light";
      const from = window.location.pathname;
      const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";

      try {
        // 1. Leave: grow from the click point
        await gsap.to(state.current, {
          r: maxRadius(),
          duration: DAWN_CONFIG.leaveDuration,
          ease: DAWN_CONFIG.leaveEase,
          onUpdate: draw,
        });

        // 2. Covered: push, then wait for the new route to render (with a safety timeout)
        const rendered = new Promise<void>((resolve) => {
          routeWaiter.current = { from, resolve };
        });
        startTransition(() => {
          router.push(href, { scroll: !hash, transitionTypes: ["dawn"] });
        });
        await Promise.race([rendered, new Promise((r) => setTimeout(r, DAWN_CONFIG.routeTimeout))]);
        routeWaiter.current = null;

        // 3. Enter: full cover for the current viewport, short pause, then shrink back
        layout();
        state.current.r = maxRadius();
        draw();
        if (hash) {
          document.getElementById(decodeURIComponent(hash))?.scrollIntoView({ behavior: "instant", block: "start" });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
        // Announce the new page: focus its main heading (or <main>)
        const target = document.querySelector<HTMLElement>("main h1") ?? document.getElementById("main");
        if (target) {
          if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        }
        await gsap.to(state.current, {
          r: 0,
          delay: DAWN_CONFIG.enterDelay,
          duration: DAWN_CONFIG.enterDuration,
          ease: DAWN_CONFIG.enterEase,
          onUpdate: draw,
        });
      } catch {
        // never leave the cover on screen; fall back to a normal page load if we never left
        if (window.location.pathname === from) window.location.assign(href);
      } finally {
        hide();
      }
    },
    [draw, hide, layout, maxRadius, router],
  );

  /* The new route has rendered once usePathname reports a different path */
  useEffect(() => {
    const w = routeWaiter.current;
    if (w && pathname !== w.from) w.resolve();
  }, [pathname]);

  /* ---------------- link interception ---------------- */

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __dawn: unknown }).__dawn = { frames: [] as number[], timeScale: (v: number) => gsap.globalTimeline.timeScale(v) };
    }

    /** The link and internal page URL it would navigate to, or null to leave it alone. */
    const eligible = (target: EventTarget | null): { a: HTMLAnchorElement; url: URL } | null => {
      const a = (target as Element | null)?.closest?.("a");
      if (!(a instanceof HTMLAnchorElement)) return null;
      if (a.closest("[data-no-transition]") || a.hasAttribute("download")) return null;
      if (a.target && a.target !== "_self") return null;
      const raw = a.getAttribute("href");
      if (!raw || raw.startsWith("#")) return null;
      const url = new URL(a.href, window.location.href);
      if (url.protocol !== "http:" && url.protocol !== "https:") return null; // mailto:, tel:, javascript:
      if (url.origin !== window.location.origin) return null;
      if (url.pathname === window.location.pathname) return null; // same page, incl. hash links
      if (NOT_A_PAGE.test(url.pathname)) return null; // PDFs, images, API routes
      return { a, url };
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const hit = eligible(e.target);
      if (!hit) return;
      if (reduced.matches) return; // plain navigation (the CSS view transition is off too)
      e.preventDefault(); // capture phase: next/link sees this and stands down
      if (busy.current) return; // ignore clicks until the current transition finishes
      const href = hit.url.pathname + hit.url.search + hit.url.hash;
      router.prefetch(href);
      let x = e.clientX;
      let y = e.clientY;
      if (e.detail === 0) {
        // keyboard activation: start from the centre of the link itself
        const box = hit.a.getBoundingClientRect();
        x = box.left + box.width / 2;
        y = box.top + box.height / 2;
      }
      run(href, x, y);
    };

    // Prefetch on hover/focus so the covered hold stays short
    const onIntent = (e: Event) => {
      const hit = eligible(e.target);
      if (!hit) return;
      const href = hit.url.pathname + hit.url.search;
      if (prefetched.current.has(href)) return;
      prefetched.current.add(href);
      router.prefetch(href);
    };

    // Back/forward from the bfcache: make sure the overlay is gone
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) hide();
    };
    const onResize = () => {
      if (!busy.current) return;
      layout();
      draw();
    };

    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("pointerover", onIntent, { capture: true, passive: true });
    document.addEventListener("focusin", onIntent, { capture: true });
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("pointerover", onIntent, { capture: true });
      document.removeEventListener("focusin", onIntent, { capture: true });
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("resize", onResize);
      hide();
    };
  }, [draw, hide, layout, router, run]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 10000, pointerEvents: "none", display: "none" }}
    />
  );
}
