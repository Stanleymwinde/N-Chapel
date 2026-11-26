// Merges sourced-media results into content/media-credits.json.
//
//   node scripts/apply-media-results.mjs results-1.json [results-2.json …]
//
// Each results file is a JSON array of
//   { key, file, width, height, sourceSite, sourceUrl, author, licence, altText }
// The image must already be saved under public/ at `file`.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const creditsPath = join(root, "content", "media-credits.json");
const credits = JSON.parse(readFileSync(creditsPath, "utf8"));
const byKey = new Map(credits.items.map((i) => [i.key, i]));

let applied = 0;
const skipped = [];
for (const path of process.argv.slice(2)) {
  if (!existsSync(path)) {
    skipped.push(`${path} (missing results file)`);
    continue;
  }
  for (const r of JSON.parse(readFileSync(path, "utf8"))) {
    if (r.key === "home.video") continue; // handled in content/home.ts
    const entry = byKey.get(r.key);
    if (!entry) {
      skipped.push(`${r.key} (unknown slot)`);
      continue;
    }
    if (!existsSync(join(root, "public", r.file))) {
      skipped.push(`${r.key} (file not found: ${r.file})`);
      continue;
    }
    Object.assign(entry, {
      file: r.file,
      width: r.width,
      height: r.height,
      sourceSite: r.sourceSite,
      sourceUrl: r.sourceUrl,
      author: r.author,
      licence: r.licence,
      altText: r.altText,
      isPlaceholder: false,
    });
    applied++;
  }
}
writeFileSync(creditsPath, JSON.stringify(credits, null, 2) + "\n");
const left = credits.items.filter((i) => i.isPlaceholder).map((i) => i.key);
console.log(`Applied ${applied} photos. Still placeholders (${left.length}): ${left.join(", ") || "none"}`);
if (skipped.length) console.log("Skipped:\n  " + skipped.join("\n  "));
