This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
Accept Incoming Change

## Page transition: halftone circle

When someone clicks a link to another page on the site, a white circle grows from the point they clicked until it covers the screen. Its edge is a 260px band of dots on an even 14px grid. The dots are small and gold at the outer edge, then grow and blend into white toward the inside, so they merge into the solid circle with no visible line. Once the next page has loaded, the circle shrinks back into the click point with the same dotted edge, revealing the new page from the outside in.

The code is in `src/components/layout/PageTransition.tsx`, mounted once in `src/app/layout.tsx`.

### How it works

- **One canvas over the whole site.** It's hidden when idle, never blocks clicks (`pointer-events: none`), and is hidden from screen readers.
- **One click listener on the page.** It catches internal link clicks before Next's `<Link>` handles them.
- **The transition runs in three steps:**
  1. **Leave:** the circle grows over 0.4 s.
  2. **Covered:** the next page is requested, and the screen stays covered until it has rendered. If that takes longer than 4 s, the circle reveals the page anyway.
  3. **Enter:** the circle shrinks back over 0.45 s.
- **GSAP drives the animation.**
- **Where it starts:** a mouse click starts the circle where the pointer is. Pressing Enter on a link starts it from the centre of that link.
- **Links to a `#section` on another page** jump to that section just before the circle shrinks.
- **Focus moves to the new page's main heading**, so screen readers announce the new page.
- **These are left alone and navigate normally:**
  - New-tab and modified clicks (Ctrl, ⌘, Shift, Alt, middle-click)
  - `target="_blank"` and `download` links
  - `mailto:`, `tel:` and links to other websites
  - Same-page `#` links and links to the page you're already on
  - Files such as PDFs, and `/api` routes
  - Back and forward buttons
- **Visitors with reduced motion turned on** (`prefers-reduced-motion: reduce`) never see the canvas: links navigate straight away.
- **The site's existing page fade** (React `<ViewTransition>`) still plays for back/forward and other navigations, but is switched off during this transition so the two don't overlap.

### Tuning colours and timing

**Colours.** Set these CSS custom properties in `src/app/motion.css`:

```css
:root {
  --dawn-cover: #FFFFFF;  /* the circle (white) */
  --dawn-accent: #F5C518; /* dots at the band's outer edge (brand gold) */
}
```

**Everything else** is in the `DAWN_CONFIG` object at the top of `PageTransition.tsx`:

| Setting | What it controls |
|---|---|
| `leaveDuration`, `leaveEase` | how the circle grows (0.4 s, `power2.inOut`) |
| `enterDelay`, `enterDuration`, `enterEase` | an optional pause, then how the circle shrinks (0 s, 0.45 s, `power2.inOut`) |
| `routeTimeout` | longest wait for the next page (4000 ms) |
| `spacing` | grid spacing (14 px) |
| `band` | width of the dotted edge (260 px) |
| `discOverlap` | how far the solid circle reaches into the dots (8.4 px) |
| `dotScale`, `dotPower`, `dotMin` | dot size: `dotScale × d^dotPower + dotMin`, where `d` is 0 at the outer edge and 1 at the inner edge |
| `maxDpr` | highest pixel ratio the canvas renders at (1.5) |

### Opting a link out

Add `data-no-transition` to a link, or to anything around it, and it will navigate normally with no transition:

```tsx
<Link href="/watch" data-no-transition>Watch live</Link>

<div data-no-transition>
  {/* every link in here skips the transition */}
</div>
```
