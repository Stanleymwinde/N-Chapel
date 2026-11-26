import type { Expiring, ISODate } from "@content/types";

export const TIME_ZONE = "Africa/Nairobi";

/** Parses an ISO date; bare dates ("2026-11-08") are treated as Nairobi midnight. */
export function parseDate(iso: ISODate): Date {
  return /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(`${iso}T00:00:00+03:00`) : new Date(iso);
}

/** An item is live until its `expires` moment. A bare-date expiry lasts to the end of that day. */
export function isExpired(item: Pick<Expiring, "expires">, now: Date = new Date()): boolean {
  const end = /^\d{4}-\d{2}-\d{2}$/.test(item.expires)
    ? new Date(`${item.expires}T23:59:59+03:00`)
    : new Date(item.expires);
  return end.getTime() < now.getTime();
}

export function upcoming<T extends Expiring>(items: readonly T[], now: Date = new Date()): T[] {
  return items
    .filter((i) => !isExpired(i, now))
    .sort((a, b) => parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime());
}

export function archived<T extends Expiring>(items: readonly T[], now: Date = new Date()): T[] {
  return items
    .filter((i) => isExpired(i, now))
    .sort((a, b) => parseDate(b.startDate).getTime() - parseDate(a.startDate).getTime());
}

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, ...opts });

/** "Sunday 8 November 2026" */
export const formatLongDate = (iso: ISODate) =>
  fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(parseDate(iso));

/** "8 Nov 2026" */
export const formatShortDate = (iso: ISODate) => fmt({ day: "numeric", month: "short", year: "numeric" }).format(parseDate(iso));

/** "November 2026" */
export const formatMonthYear = (iso: ISODate) => fmt({ month: "long", year: "numeric" }).format(parseDate(iso));

/** { month: "NOV", day: "8" } for date blocks */
export function dateParts(iso: ISODate) {
  const d = parseDate(iso);
  return {
    month: fmt({ month: "short" }).format(d).toUpperCase(),
    day: fmt({ day: "numeric" }).format(d),
  };
}

/** "8–20 November 2026", "29 Oct – 1 Nov 2026" */
export function formatRange(start: ISODate, end?: ISODate): string {
  if (!end || end === start) return formatLongDate(start);
  const s = parseDate(start);
  const e = parseDate(end);
  const sameYear = s.getFullYear() === e.getFullYear();
  const sameMonth = sameYear && fmt({ month: "numeric" }).format(s) === fmt({ month: "numeric" }).format(e);
  if (sameMonth) return `${fmt({ day: "numeric" }).format(s)}–${fmt({ day: "numeric", month: "long", year: "numeric" }).format(e)}`;
  if (sameYear) return `${fmt({ day: "numeric", month: "short" }).format(s)} – ${fmt({ day: "numeric", month: "short", year: "numeric" }).format(e)}`;
  return `${formatShortDate(start)} – ${formatShortDate(end)}`;
}

/** Copyright year, computed at build time. */
export const currentYear = () => new Date().getFullYear();
