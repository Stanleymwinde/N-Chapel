/**
 * Talks to the Craft CMS GraphQL API (https://cms.nairobichapelngongroad.org/api).
 *
 * - Requests go out as GET so Next.js can cache them. Every Craft request is tagged
 *   "craft", so one call to /api/revalidate refreshes everything at once.
 * - Cached results are refreshed in the background every CRAFT_REVALIDATE seconds
 *   (default 300 = 5 minutes).
 * - If Craft is unreachable or returns an error, the caller gets `null` and falls
 *   back to the typed content in /content, so the site never goes blank.
 */

const ENDPOINT = process.env.CRAFT_GRAPHQL_URL ?? "";
const TOKEN = process.env.CRAFT_GRAPHQL_TOKEN ?? "";
const REVALIDATE = Number(process.env.CRAFT_REVALIDATE ?? 300);

export const CRAFT_TAG = "craft";

/** True when a Craft endpoint is configured. */
export const craftEnabled = ENDPOINT !== "";

export async function craftQuery<T>(query: string, variables: Record<string, unknown> = {}): Promise<T | null> {
  if (!craftEnabled) return null;

  const url = new URL(ENDPOINT);
  url.searchParams.set("query", query.replace(/\s+/g, " ").trim());
  if (Object.keys(variables).length) url.searchParams.set("variables", JSON.stringify(variables));

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
      next: { revalidate: REVALIDATE, tags: [CRAFT_TAG] },
    });
    if (!res.ok) {
      console.warn(`[craft] ${res.status} ${res.statusText} from ${url.origin}`);
      return null;
    }
    const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
    if (json.errors?.length) {
      console.warn(`[craft] GraphQL errors: ${json.errors.map((e) => e.message).join("; ")}`);
      return null;
    }
    return json.data ?? null;
  } catch (err) {
    console.warn(`[craft] could not reach ${url.origin}: ${(err as Error).message}`);
    return null;
  }
}
