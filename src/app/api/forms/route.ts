import { NextResponse } from "next/server";

/**
 * Single endpoint for every form on the site (visit, groups, prayer,
 * contact, giving, …). Each request carries a `formId` and `values`.
 *
 * TODO: connect to email/CRM (e.g. send to mail@nairobichapel.org via a
 * transactional email provider, or push into the church's CRM). Prayer
 * requests marked "prayer team only" must be routed only to the prayer team.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const { formId, values } = (body ?? {}) as { formId?: unknown; values?: unknown };
  if (typeof formId !== "string" || !/^[a-z0-9-]{2,40}$/.test(formId) || typeof values !== "object" || values === null) {
    return NextResponse.json({ ok: false, error: "Missing formId or values" }, { status: 400 });
  }
  // Basic size guard
  if (JSON.stringify(values).length > 10_000) {
    return NextResponse.json({ ok: false, error: "Submission too large" }, { status: 413 });
  }

  // TODO: connect to email/CRM. Until then submissions are only logged on the server.
  console.info(`[forms] ${formId}`, Object.keys(values as object));

  return NextResponse.json({ ok: true });
}
