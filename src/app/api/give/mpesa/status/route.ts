import { NextResponse } from "next/server";
import { mpesaConfigured, stkQuery } from "@/lib/mpesa";

/** GET /api/give/mpesa/status?id=<CheckoutRequestID> — how the prompt ended (or "pending"). */
export async function GET(request: Request) {
  if (!mpesaConfigured()) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!/^[\w-]{6,80}$/.test(id)) return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  try {
    const result = await stkQuery(id);
    return NextResponse.json({ ok: true, ...result }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("[give] STK query failed", e);
    // Treat a failed check as "still waiting"; the form gives up on its own after a while
    return NextResponse.json({ ok: true, state: "pending", message: "" }, { headers: { "Cache-Control": "no-store" } });
  }
}
