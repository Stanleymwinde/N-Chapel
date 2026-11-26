# Website content

All the words on the site live in this folder as typed TypeScript files. There is no CMS. To add something, you add one entry to an array, save, and redeploy. If you make a mistake in a field (a typo in a type, a missing required field), `pnpm build` stops and tells you which line is wrong, so nothing broken can go live.

**Two rules for everything here:**

1. **Never invent facts.** If you don't have a value yet, write `"TODO"` for a file, image or number, or `"[TODO: what is missing]"` for text. The site shows a quiet "coming soon" or "to be confirmed" note in its place instead of the raw TODO.
2. **Order comes from the data, not from upload dates.** Bible-study weeks sort by week number. Monthly items sort by year, then month. Upload dates on the old site were unreliable.

---

## Files: PDFs and images

- **PDFs:** put the file in `public/pdfs/` (for example `public/pdfs/ecclesiastes-week-3.pdf`) and set `pdfUrl: "/pdfs/ecclesiastes-week-3.pdf"`. Add `fileSize: "1.2 MB"` so the download button can show the size. While `pdfUrl` is `"TODO"`, the page shows "PDF coming soon" instead of a broken link.
- **Images:** add the image to `content/media-credits.json` (see the existing entries) and use its key, for example `coverImage: "resources.ecclesiastes"`. While a cover is `"TODO"`, the site draws a typographic cover in the brand colours.

---

## Resource Library: `content/library/`

| File | What it holds |
|---|---|
| `series.ts` | Bible-study series (Ecclesiastes, Exodus, Judges …) |
| `resources.ts` | Every single item: study weeks, prayer & fasting guides, family worship, Quest Kids crafts and devotionals |
| `seasons.ts` | Prayer & fasting seasons (21 days in January, monthly guides …) |
| `types.ts` | The shape of each entry and the labels shown on the site |

### Start a new Bible-study series

1. In `series.ts`, add an entry:
   ```ts
   { title: "Ruth", slug: "ruth", book: "Ruth", type: "bible-study", audience: ["adults"],
     description: "[TODO: series description]", coverImage: "TODO", isCurrent: true, sortOrder: 0, year: 2026, when: "Nov–Dec 2026" },
   ```
2. Set `isCurrent: false` on the previous current series. The current series' latest week appears in the **This week** strip on /resources; the rest go to **Past series**, grouped by `year`.
3. In `resources.ts`, add the weeks to `studyWeeks` (for example `ruth: [1, 2, 3, 4]`; labels such as `"5B"` are fine) and, optionally, the month and year to `studyDates`. Every week then gets its own page at `/resources/ruth-week-1` and so on.

### Add a single resource

Add an entry to the right list in `resources.ts`. The required fields are `title`, `slug` (lowercase-with-dashes, never changed once live), `type`, `audience`, `publishDate` (`null` when unknown), `summary` (can be `""`) and `pdfUrl`.

- **Types:** `"bible-study"`, `"prayer-fasting"`, `"family-worship"`, `"kids-craft"`, `"kids-devotional"`.
- **Audiences:** `"adults"`, `"youth"` (shown as Light Republik), `"children"` (shown as Quest), `"family"`.
- **Optional:**
  - `seriesSlug` and `week` place an item in a series.
  - `month` and `year` place monthly items in order.
  - `season` links a prayer & fasting guide to its season.

**Readable studies.** Add a `body` and the page becomes a reading view, with a Personal / Group switch that hides the discussion questions:

```ts
body: {
  passage: { reference: "Ecclesiastes 3:1–8", text: "…" },
  reflection: ["First paragraph…", "Second paragraph…"],
  discussionQuestions: ["…", "…"],
  prayer: "…",
},
```

**Quest Kids crafts.** Add a month to `craftMonths` (`{ year: 2026, month: 12, weeks: 4 }`) and the weekly craft pages, named "December 2026 · Week 1 Craft", are created for you. To show a craft card instead of only the PDF, add any of these to that week's entry: `craftPhoto`, `materials`, `steps`, `ageRange`, `duration`.

### Add a prayer & fasting season

1. In `seasons.ts`, add `{ title, slug, year, month, kind, description }`. `kind` is one of:
   - `"21-day"`: draws a three-week calendar.
   - `"monthly"`, `"week"` or `"day"`: lists the guides.
2. Optionally add `relatedPublicationSlug` to link a publication, such as the Pocket Book.
3. In `resources.ts`, add the guides with `pf({ … season: "your-season-slug", audience: [...] })`. The season page shows an audience switch with only the audiences that have a guide.

---

## Blog: `content/posts.ts`

Add an entry to `posts`. The Resources menu automatically shows the three latest posts, with title and author.

- `author` is a real name, never "Admin". `authorRole` is optional.
- `category` is `"Sermon Notes"` or `"Devotional"`.
- `publishDate` is an ISO date (`"2026-11-16"`), or `null` until confirmed.
- `scripture`, `excerpt` and `heroImage` (a media key) are required.
- `body` is a list of blocks:
  - `{ type: "paragraph", text }`
  - `{ type: "heading", text }`
  - `{ type: "list", items }`
  - `{ type: "quote", text, cite }`: shown as a pull quote
  - `{ type: "prayer", text }`: the closing prayer
- Optional:
  - `relatedSeriesSlug` adds a "Go deeper" card linking to a Resource Library series.
  - `sermonVideoUrl` adds "Watch the sermon".

---

## Publications: `content/publications.ts`

Add an entry with:

- `title` and `slug`
- `category`: `"Annual Report"`, `"Strategy"` or `"Guide"`
- `year` and `publishDate` (`"2025-12"` is fine)
- `description`
- `coverImage`, `pageCount`, `fileSize` and `pdfUrl`: each `"TODO"` until known

The Resources menu, `/publications` and its own page at `/publications/your-slug` update automatically. A category with no entries is hidden.

Pastoral team, office bearers, serving opportunities, Enzi and marriage banns are **not** publications. They live on their own pages (About → Our team, Get involved → Serve, Ministries → Enzi, Info Desk → Marriage banns).

---

## Marriage banns: `content/banns.ts`

Add `{ id, partnerOne, partnerTwo, weddingDate: "2026-12-12" }`, with the couple's consent. Each couple disappears automatically the day after their wedding. When no banns are left, the page says "No marriage banns are currently being published." Entries marked `sample: true` are fictional design previews: they show only in development and never in production.

---

## Events: `content/events.ts`

Add an entry to `realEvents`. Events disappear automatically after their `expires` date. `sampleEvents` are development-only previews.
