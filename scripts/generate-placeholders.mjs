// Generates on-brand placeholder images for every media slot and keeps
// content/media-credits.json in sync.
//
//   pnpm placeholders
//
// - New slots defined below are added to media-credits.json.
// - Existing entries in media-credits.json are NEVER overwritten, so once a
//   real photo is dropped in (and its entry edited: file, sourceUrl, author,
//   licence, isPlaceholder: false) re-running this script is safe.
// - An SVG placeholder is only written when the entry's file is an .svg that
//   doesn't exist yet.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const creditsPath = join(root, "content", "media-credits.json");

/** [key, usedOn, intended subject / alt text, search query, aspect] */
const SLOTS = [
  ["home.hero", "/", "Congregation worshipping together under the tent on a Sunday morning", "African church worship tent congregation", "wide"],
  ["home.together", "/", "Friends greeting each other with hugs after a service", "African church friends greeting hug", "card"],
  ["home.community", "/", "A small group sharing a meal and a Bible study in a home", "Bible study group Africa home", "card"],
  ["home.give", "/", "Children holding new Bibles at a school", "African children holding Bibles school", "card"],
  ["newhere.hero", "/new-here", "Greeters welcoming families at the church entrance", "African church welcome greeters smiling", "wide"],
  ["visit.hero", "/new-here/plan-your-visit", "People arriving at church on a sunny Sunday morning", "Kenya church congregation arriving Sunday", "wide"],
  ["visit.expect", "/new-here/plan-your-visit", "Worship team leading songs on stage in a tent", "African choir singing worship", "card"],
  ["nextsteps.hero", "/new-here/next-steps", "A small group studying the Bible together", "Bible study group Africa", "wide"],
  ["watch.hero", "/watch", "Camera operator filming a church service for the livestream", "church livestream camera worship Africa", "wide"],
  ["getinvolved.hero", "/get-involved", "Friends laughing together after a church gathering", "African friends community fellowship", "wide"],
  ["groups.egroups", "/get-involved/groups", "An eGroup meeting in a living room", "Bible study group Africa living room", "card"],
  ["groups.binti", "/get-involved/groups", "Women praying together in a circle", "African women praying together", "card"],
  ["groups.jabari", "/get-involved/groups", "Men in conversation at a fellowship breakfast", "African men fellowship", "card"],
  ["groups.support", "/get-involved/groups", "Two people talking quietly on a bench, faces not shown", "support group conversation hands", "card"],
  ["serve.hero", "/get-involved/serve", "Volunteers in matching shirts serving at a church event", "community volunteers Africa", "wide"],
  ["kinara.hero", "/get-involved/kinara", "A trainer teaching a group of young leaders in a classroom", "African leadership training classroom", "wide"],
  ["school.hero", "/get-involved/school-of-ministry", "Adults taking notes during a teaching session", "adult Bible class Africa teaching", "wide"],
  ["logos.hero", "/get-involved/logos-scholarship", "A student studying with books at a desk", "African student studying books", "wide"],
  ["ministries.hero", "/ministries", "People of all ages gathered outside after a service", "Kenya church congregation outdoors", "wide"],
  ["quest.hero", "/ministries/quest-children", "Children singing and clapping in Sunday school", "African children Sunday school", "wide"],
  ["quest.worship", "/ministries/quest-children", "Children doing a Bible craft at a table", "African children crafts Sunday school", "card"],
  ["quest.community", "/ministries/quest-children", "Children reading together at a holiday reading camp", "African children reading books school", "card"],
  ["nextgen.hero", "/ministries/next-gen-youth", "Teenagers worshipping with raised hands at a youth service", "African youth worship concert", "wide"],
  ["nextgen.clubxp", "/ministries/next-gen-youth", "Teen worship band playing in a tent", "African teens band worship", "card"],
  ["nextgen.crossroads", "/ministries/next-gen-youth", "Young teens on an outdoor adventure expedition", "African teenagers outdoor camp hiking", "card"],
  ["nextgen.vuma", "/ministries/next-gen-youth", "School leavers in a mentoring discussion", "African young adults mentoring discussion", "card"],
  ["blitz.hero", "/ministries/blitz-young-adults", "Young adults hiking together on a hill", "African young adults hiking group", "wide"],
  ["prayer.hero", "/ministries/prayer", "Hands folded in prayer over an open Bible", "hands praying Bible", "wide"],
  ["discipleship.hero", "/ministries/discipleship", "A mentor and a younger person reading the Bible together", "mentoring Bible reading Africa", "wide"],
  ["outreach.hero", "/ministries/outreach", "Church members walking through a neighbourhood on an outreach day", "community outreach Africa church", "wide"],
  ["outreach.prison", "/ministries/outreach", "A chapel with empty benches and an open Bible, no people shown", "empty chapel benches Bible", "card"],
  ["outreach.sports", "/ministries/outreach", "A youth football team training on a dusty pitch", "football team Kenya youth", "card"],
  ["outreach.community", "/ministries/outreach", "Volunteers collecting litter during a community clean-up", "community clean-up volunteers Africa", "card"],
  ["outreach.mission", "/ministries/outreach", "A speaker addressing students at a school assembly", "African high school students assembly", "card"],
  ["justice.hero", "/ministries/social-justice", "Volunteers handing out food parcels", "food donation volunteers Africa", "wide"],
  ["justice.community", "/ministries/social-justice", "A community meeting under a tree", "African community meeting outdoors", "card"],
  ["justice.benevolence", "/ministries/social-justice", "A volunteer delivering groceries to a family", "volunteer delivering groceries Africa", "card"],
  ["justice.women", "/ministries/social-justice", "Women in a savings group meeting with notebooks", "African women savings group meeting", "card"],
  ["justice.compassion", "/ministries/social-justice", "Volunteers spending time with elderly residents", "volunteers elderly care Africa", "card"],
  ["counselling.hero", "/ministries/counselling-care", "A calm room with two chairs and soft daylight", "calm counselling room chairs", "wide"],
  ["marketplace.hero", "/ministries/marketplace", "Professionals in conversation at a business forum", "African professionals business meeting", "wide"],
  ["enzi.hero", "/ministries/enzi", "A wheelchair user and friends laughing together at a gathering", "wheelchair user friends Africa inclusion", "wide"],
  ["events.hero", "/events", "A crowd enjoying an outdoor church event", "outdoor church event Africa crowd", "wide"],
  ["resources.hero", "/resources", "An open Bible with a notebook and pen", "open Bible notebook devotional", "wide"],
  ["blog.hero", "/blog", "A preacher speaking from a pulpit", "African pastor preaching", "wide"],
  ["about.hero", "/about", "The church tent and grounds on a bright day", "tent church outdoor Africa", "wide"],
  ["beliefs.hero", "/about/beliefs", "An open Bible in soft light", "open Bible soft light", "wide"],
  ["compass.hero", "/about/compass", "A compass resting on a map", "compass on map", "wide"],
  ["team.hero", "/about/team", "A church staff team meeting around a table, faces not identifiable", "team meeting table hands", "wide"],
  ["banns.hero", "/about/marriage-banns", "Wedding rings resting on an open Bible", "wedding rings Bible", "wide"],
  ["give.hero", "/give", "Hands placing an envelope in an offering basket", "offering basket church giving", "wide"],
  ["give.ppi", "/give", "Children reading Bibles in a classroom", "African children reading Bible classroom", "card"],
  ["contact.hero", "/contact", "A welcome desk with a friendly volunteer", "African church welcome desk volunteer", "wide"],
];

const SIZES = { wide: [1600, 900], card: [1200, 800] };

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function wrap(text, max = 42) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max) {
      lines.push(line.trim());
      line = w;
    } else line += " " + w;
  }
  if (line.trim()) lines.push(line.trim());
  return lines.slice(0, 3);
}

function svg(subject, [w, h]) {
  const lines = wrap(subject);
  const startY = h / 2 + 10 - (lines.length - 1) * 24;
  const tspans = lines
    .map((l, i) => `<tspan x="${w / 2}" y="${startY + i * 48}">${escape(l)}</tspan>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs><pattern id="p" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="#CDB8EC" opacity="0.55"/></pattern></defs>
<rect width="${w}" height="${h}" fill="#F4EFFB"/><rect width="${w}" height="${h}" fill="url(#p)"/>
<g transform="translate(${w / 2 - 28} ${h / 2 - 120})" fill="none" stroke="#5B2A9E" stroke-width="3"><rect x="0" y="8" width="56" height="42" rx="6"/><circle cx="28" cy="29" r="11"/><path d="M18 8l5-8h10l5 8"/></g>
<text font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="22" font-weight="600" fill="#5B2A9E" text-anchor="middle" letter-spacing="2" x="${w / 2}" y="${h / 2 - 36}">PHOTO PLACEHOLDER</text>
<text font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="36" fill="#332D3F" text-anchor="middle">${tspans}</text>
</svg>`;
}

const credits = existsSync(creditsPath) ? JSON.parse(readFileSync(creditsPath, "utf8")) : { items: [] };
const byKey = new Map(credits.items.map((i) => [i.key, i]));
let added = 0;
let written = 0;

for (const [key, usedOn, subject, query, aspect] of SLOTS) {
  const [page, name] = key.split(".");
  const [w, h] = SIZES[aspect];
  if (!byKey.has(key)) {
    const entry = {
      key,
      file: `/media/${page}/${name}.svg`,
      width: w,
      height: h,
      sourceSite: null,
      sourceUrl: null,
      author: null,
      licence: null,
      searchQuery: query,
      usedOn: [usedOn],
      altText: subject,
      isPlaceholder: true,
    };
    credits.items.push(entry);
    byKey.set(key, entry);
    added++;
  }
  const entry = byKey.get(key);
  if (entry.file.endsWith(".svg")) {
    const out = join(root, "public", entry.file);
    if (!existsSync(out)) {
      mkdirSync(dirname(out), { recursive: true });
      writeFileSync(out, svg(subject, [entry.width, entry.height]));
      written++;
    }
  }
}

credits.note =
  "Every image is a placeholder until the church supplies its own photography. " +
  "To swap: put the photo in public/media/{page}/, update `file`, `width`, `height`, " +
  "`sourceSite`, `sourceUrl`, `author`, `licence`, `altText` and set `isPlaceholder` to false.";
writeFileSync(creditsPath, JSON.stringify(credits, null, 2) + "\n");
console.log(`media-credits.json: ${credits.items.length} slots (${added} new); ${written} placeholder SVGs written.`);
