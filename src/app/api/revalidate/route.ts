import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { CRAFT_TAG } from "@/lib/craft/client";

/**
 * Called by Craft when content is saved, so changes show without waiting for the
 * 5-minute refresh:
 *
 *   POST https://<site>/api/revalidate?secret=<CRAFT_REVALIDATE_SECRET>
 *
 * Pages refresh as they're next visited (stale-while-revalidate).
 */
export async function POST(request: Request) {
  const secret = process.env.CRAFT_REVALIDATE_SECRET;
  const given = new URL(request.url).searchParams.get("secret") ?? request.headers.get("x-revalidate-secret");
  if (!secret || given !== secret) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }
  revalidateTag(CRAFT_TAG, "max");
  // Pages that list Craft content are revalidated with their data; this also refreshes
  // pages whose list of slugs changed (new or deleted entries).
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, revalidated: CRAFT_TAG, at: new Date().toISOString() });
}

export const GET = POST;
