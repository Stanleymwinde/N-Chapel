import { NextResponse } from "next/server";
import { GIVING_REASONS, MAX_AMOUNT, MIN_AMOUNT, mpesaConfigured, normalisePhone, stkPush } from "@/lib/mpesa";

/**
 * POST /api/give/mpesa — send an M-Pesa PIN prompt (STK push) to the giver's phone.
 * Body: { reason, amount, phone, name? }. Returns { checkoutId } to poll /api/give/mpesa/status.
 */

// A light guard against repeated prompts: 5 per phone or address per 10 minutes.
const recent = new Map<string, number[]>();
function limited(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  recent.set(key, hits);
  return hits.length > 5;
}

export async function POST(request: Request) {
  if (!mpesaConfigured()) {
    return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  }

  let body: { reason?: unknown; amount?: unknown; phone?: unknown; name?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const reason = GIVING_REASONS.find((r) => r.id === body.reason);
  const amount = Number(body.amount);
  const phone = typeof body.phone === "string" ? normalisePhone(body.phone) : null;

  const errors: Record<string, string> = {};
  if (!reason) errors.reason = "Please choose what you're giving towards.";
  if (!Number.isInteger(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) errors.amount = `Please enter a whole amount between KSh ${MIN_AMOUNT} and KSh ${MAX_AMOUNT.toLocaleString("en-KE")}.`;
  if (!phone) errors.phone = "Please enter a Safaricom number like 0712 345 678.";
  if (!reason || !phone || Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(`ip:${ip}`) || limited(`phone:${phone}`)) {
    return NextResponse.json({ ok: false, error: "Too many prompts in a short time. Please wait a few minutes and try again." }, { status: 429 });
  }

  try {
    const { checkoutId } = await stkPush({ phone, amount, accountRef: reason.ref });
    // TODO: once the church chooses an email/CRM, record { name, reason, amount, checkoutId } there for receipts.
    console.info(`[give] STK push sent: ${reason.ref}, KSh ${amount}`);
    return NextResponse.json({ ok: true, checkoutId });
  } catch (e) {
    console.error("[give] STK push failed", e);
    return NextResponse.json({ ok: false, error: "We couldn't send the M-Pesa prompt just now. Please try again, or use the Paybill below." }, { status: 502 });
  }
}
