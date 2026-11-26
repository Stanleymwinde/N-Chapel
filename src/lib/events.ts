import type { WhatsOnEvent } from "@content/events";
import { parseDate, TIME_ZONE } from "./dates";

/** Today in Nairobi as "YYYY-MM-DD" (en-CA formats dates that way). */
export const nairobiToday = (now: Date = new Date()) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);

/** Ongoing and "to be announced" events are always upcoming; dated ones until (endDate ?? startDate) has passed. */
export function isUpcoming(e: WhatsOnEvent, today: string): boolean {
  if (e.status !== "dated") return true;
  const last = e.endDate ?? e.startDate;
  return Boolean(last && last >= today);
}

const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, ...o });
const mon = (iso: string) => fmt({ month: "short" }).format(parseDate(iso)).toUpperCase();
const day = (iso: string) => fmt({ day: "numeric" }).format(parseDate(iso));

/** The card's date block: { top: "NOV", main: "8–20" }, { main: "TBA" }, { main: "THU" } or null (ongoing, no fixed day) */
export function dateBlock(e: WhatsOnEvent): { top?: string; main: string } | null {
  if (e.status === "tba") return { main: "TBA" };
  if (e.status === "ongoing") return e.weekday ? { top: "Every", main: e.weekday } : null;
  if (!e.startDate) return null;
  if (!e.endDate || e.endDate === e.startDate) return { top: mon(e.startDate), main: day(e.startDate) };
  const sameMonth = mon(e.startDate) === mon(e.endDate);
  return { top: sameMonth ? mon(e.startDate) : `${mon(e.startDate)}–${mon(e.endDate)}`, main: `${day(e.startDate)}–${day(e.endDate)}` };
}

/** "YYYY-MM" for grouping dated events by the month they start */
export const monthKey = (iso: string) => iso.slice(0, 7);

/** "July 2027" */
export const monthName = (key: string) => fmt({ month: "long", year: "numeric" }).format(new Date(`${key}-15T12:00:00+03:00`));
