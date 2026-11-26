import { NextResponse } from "next/server";
import { callbackTokenOk } from "@/lib/mpesa";

/**
 * POST /api/give/mpesa/callback — Safaricom posts the final result of each
 * STK push here. The form reads the result with an STK query instead, so this
 * only records it. Always answer 200 so Safaricom doesn't retry.
 */
export async function POST(request: Request) {
  if (!callbackTokenOk(new URL(request.url).searchParams.get("token"))) {
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Rejected" }, { status: 403 });
  }
  try {
    const body = (await request.json()) as { Body?: { stkCallback?: { CheckoutRequestID?: string; ResultCode?: number; ResultDesc?: string } } };
    const cb = body.Body?.stkCallback;
    // TODO: store successful gifts (CheckoutRequestID, amount, M-Pesa receipt number) in the church's finance system or CRM.
    console.info(`[give] STK callback ${cb?.CheckoutRequestID}: ${cb?.ResultCode} ${cb?.ResultDesc}`);
  } catch {
    // Ignore malformed bodies
  }
  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
