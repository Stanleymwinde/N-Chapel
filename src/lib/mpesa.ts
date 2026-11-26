import "server-only";
export { GIVING_REASONS, MIN_AMOUNT, MAX_AMOUNT } from "@content/give";

/**
 * M-Pesa Express (STK push) through Safaricom's Daraja API.
 *
 * Set these environment variables (never commit them; use the host's
 * secret settings, or .env.local for local testing):
 *
 *   MPESA_ENV              "sandbox" or "production" (default: sandbox)
 *   MPESA_CONSUMER_KEY     from the Daraja app
 *   MPESA_CONSUMER_SECRET  from the Daraja app
 *   MPESA_SHORTCODE        the Paybill (production: the church's own Paybill; sandbox: 174379)
 *   MPESA_PASSKEY          the Lipa na M-Pesa Online passkey Safaricom issues for that Paybill
 *   MPESA_CALLBACK_URL     public https URL of /api/give/mpesa/callback (Safaricom must reach it)
 *   MPESA_CALLBACK_TOKEN   any long random string; added to the callback URL and checked on receipt
 *
 * Without them the API answers 503 and the form tells people to use the Paybill instead.
 */

const env = () => ({
  base: process.env.MPESA_ENV === "production" ? "https://api.safaricom.co.ke" : "https://sandbox.safaricom.co.ke",
  key: process.env.MPESA_CONSUMER_KEY ?? "",
  secret: process.env.MPESA_CONSUMER_SECRET ?? "",
  shortcode: process.env.MPESA_SHORTCODE ?? "",
  passkey: process.env.MPESA_PASSKEY ?? "",
  callbackUrl: process.env.MPESA_CALLBACK_URL ?? "",
  callbackToken: process.env.MPESA_CALLBACK_TOKEN ?? "",
});

export const mpesaConfigured = () => {
  const e = env();
  return Boolean(e.key && e.secret && e.shortcode && e.passkey && e.callbackUrl);
};

export const callbackTokenOk = (token: string | null) => {
  const expected = env().callbackToken;
  return !expected || token === expected;
};



/** 0712 345 678, +254712345678, 254112345678 or 712345678 → 254712345678; null if not a Kenyan mobile. */
export function normalisePhone(input: string): string | null {
  const d = input.replace(/[^\d]/g, "");
  const local = d.startsWith("254") ? d.slice(3) : d.startsWith("0") ? d.slice(1) : d;
  return /^(7|1)\d{8}$/.test(local) ? `254${local}` : null;
}

let cached: { token: string; expires: number } | null = null;

async function token() {
  if (cached && cached.expires > Date.now() + 30_000) return cached.token;
  const e = env();
  const res = await fetch(`${e.base}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${Buffer.from(`${e.key}:${e.secret}`).toString("base64")}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`M-Pesa auth failed (${res.status})`);
  const data = (await res.json()) as { access_token: string; expires_in: string };
  cached = { token: data.access_token, expires: Date.now() + Number(data.expires_in) * 1000 };
  return cached.token;
}

/** Daraja's timestamp (yyyyMMddHHmmss, Nairobi time) and password. */
function stamp() {
  const e = env();
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  const timestamp = `${get("year")}${get("month")}${get("day")}${get("hour")}${get("minute")}${get("second")}`;
  const password = Buffer.from(`${e.shortcode}${e.passkey}${timestamp}`).toString("base64");
  return { timestamp, password };
}

export async function stkPush({ phone, amount, accountRef }: { phone: string; amount: number; accountRef: string }) {
  const e = env();
  const { timestamp, password } = stamp();
  const callback = new URL(e.callbackUrl);
  if (e.callbackToken) callback.searchParams.set("token", e.callbackToken);
  const res = await fetch(`${e.base}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: { Authorization: `Bearer ${await token()}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      BusinessShortCode: e.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: e.shortcode,
      PhoneNumber: phone,
      CallBackURL: callback.toString(),
      AccountReference: accountRef.slice(0, 12),
      TransactionDesc: "Giving",
    }),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as { ResponseCode?: string; CheckoutRequestID?: string; errorMessage?: string; CustomerMessage?: string };
  if (!res.ok || data.ResponseCode !== "0" || !data.CheckoutRequestID) {
    throw new Error(data.errorMessage ?? "M-Pesa could not send the prompt");
  }
  return { checkoutId: data.CheckoutRequestID };
}

export type StkState = "pending" | "success" | "cancelled" | "timeout" | "failed";

/** Ask Daraja how an STK push ended. While the person is still on the prompt, it is "pending". */
export async function stkQuery(checkoutId: string): Promise<{ state: StkState; message: string }> {
  const e = env();
  const { timestamp, password } = stamp();
  const res = await fetch(`${e.base}/mpesa/stkpushquery/v1/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${await token()}`, "Content-Type": "application/json" },
    body: JSON.stringify({ BusinessShortCode: e.shortcode, Password: password, Timestamp: timestamp, CheckoutRequestID: checkoutId }),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as { ResultCode?: string | number; ResultDesc?: string; errorCode?: string; errorMessage?: string };
  // "The transaction is being processed" comes back as an error until the person answers
  if (data.errorCode === "500.001.1001" || (!res.ok && /process/i.test(data.errorMessage ?? ""))) return { state: "pending", message: "" };
  const code = String(data.ResultCode ?? "");
  if (code === "0") return { state: "success", message: data.ResultDesc ?? "" };
  if (code === "1032") return { state: "cancelled", message: "The prompt was cancelled on the phone." };
  if (code === "1037") return { state: "timeout", message: "The phone didn't respond in time." };
  if (code === "1") return { state: "failed", message: "The M-Pesa balance wasn't enough for this gift." };
  if (code === "2001") return { state: "failed", message: "The M-Pesa PIN was incorrect." };
  if (!code) return { state: "pending", message: "" };
  return { state: "failed", message: data.ResultDesc ?? "M-Pesa couldn't complete the payment." };
}
