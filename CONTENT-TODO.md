# Content TODO

Every fact the site still needs from the church. In the code these appear as `[TODO: …]` strings in `/content`; in development they render with a dashed amber outline, and in production as "details to be confirmed".

## Global facts, homepage and brand

| Page | Field | What's needed |
| --- | --- | --- |
| All pages (header/footer) | Logo | Official logo files in `public/brand/`: one for light backgrounds (dark wordmark) and one for dark backgrounds (white wordmark), SVG preferred. Replace `src/components/layout/Logo.tsx`'s temporary SVG mark. Then sample exact brand purple/gold from the artwork and update `src/theme/tokens.ts`. |
| content/site.ts | Street address | Full street address. |
| content/site.ts | Plus code | Google plus code for the campus. |
| content/site.ts | Geo coordinates | Exact latitude/longitude (left out of JSON-LD until confirmed). |
| content/site.ts | Google reviews link | The church's Google reviews URL (not a search results page). |
| content/site.ts | Social URLs | Exact Facebook, X, Instagram, YouTube and TikTok URLs (footer shows a text fallback until then). |
| content/site.ts | YouTube channel | Channel URL for "Watch live". |
| content/site.ts | Map embed | Confirm the Google Maps embed shows the correct pin (`mapEmbedUrl`). |
| / (Home) | Kids' programme | Confirm Quest runs during both Sunday services. |
| / (Home) | Our three rhythms | One-line description each for Connect with God, Grow in faith, Serve others. |
| / (Home) | Give impact story | One real impact story (e.g. PPI Bible Drive progress). |
| / (Home) | Pastor welcome | 2–3 sentence welcome, pastor's name and role, and a consented photo. |
| / (Home) | Hero video (optional) | ≤ 15 s, 720p muted clip (MP4 ≤ 4 MB + WebM + JPG poster) in `public/media/home/`; set `home.hero.video` in content/home.ts. |
| /api/forms | Form delivery | Connect the form endpoint to email or CRM (all forms currently only log on the server). |
| All pages | Photography | Every image is a generated placeholder (no internet access to licensed stock from the build environment). See `content/media-credits.json` for each slot's intended subject, alt text and search query; replace with the church's own photos or Unsplash/Pexels/Pixabay images and fill in source, author and licence. |

## Photos and video worth replacing

All 53 image slots now use free-licence photos from Pexels and Unsplash. Credits are in `content/media-credits.json` and on `/credits`. These are the weakest fits; replace them first, ideally with the church's own photography.

| Page | Slot | Why replace |
| --- | --- | --- |
| /ministries/social-justice | justice.hero | Food boxes clearly show another charity's name and logo ("Lagos Food Bank Initiative"); could imply a partnership. Replace before launch. |
| /ministries/social-justice | justice.benevolence | Volunteer's T-shirt carries a small charity logo. |
| / (Home) | home video | Pexels clip of a gospel choir in a US-style church (not an African setting). No suitable African worship clip was found on Pexels or Mixkit. Also add a WebM version and trim to ≤ 15 s if replaced. |
| /give | give.hero | Offering baskets on a wall (Boston), not an African church. |
| /give | give.ppi | Schoolgirls reading schoolbooks, not Bibles. |
| /contact | contact.hero | A hotel reception desk in Ghana, not a church welcome desk. |
| /about | about.hero | Gathering under a tarpaulin, not the church tent. Use a real photo of the Ngong Road tent. |
| /about/marriage-banns | banns.hero | "BIBLIA" printed on the Bible cover. |
| /ministries/enzi | enzi.hero | Amputee football team huddle (portrait crop); an image of Enzi members would be better. |
| /ministries/discipleship | discipleship.hero | Setting is probably not African. |
| Several | home.community, nextsteps.hero, groups.egroups | Look posed. |
| /ministries/outreach | outreach.prison, outreach.sports, outreach.community, outreach.mission | Portrait images cropped into landscape cards; check the crops. |

## New Here, About, Contact, Policies (Fork A)

| Page | Field | What's needed |
| --- | --- | --- |
| /new-here | Welcome paragraph (`content/new-here.ts` → `newHere.welcome`) | Warm welcome paragraph for first-time guests from the pastoral team |
| /new-here/plan-your-visit | Street address (`visit.location.street`) | Full street address and plus code |
| /new-here/plan-your-visit | Church @ 5 (`visit.otherGatherings[0]`) | Description, day, time, venue, who it's for |
| /new-here/plan-your-visit | Midweek Prayer Service venue | Confirm the venue on campus |
| /new-here/plan-your-visit | iPRAYSE (`visit.otherGatherings[2]`) | Description, day and time, venue, who it's for |
| /new-here/plan-your-visit | iPRAYse KESHA (`visit.otherGatherings[3]`) | Date pattern (e.g. last Friday monthly), venue, who it's for |
| /new-here/plan-your-visit | Kids on Sunday (`visit.kids.summary`) | Confirm Quest runs during both the 9:00 and 11:30 AM services |
| /new-here/plan-your-visit | FAQ: When should I arrive? | Recommended arrival time |
| /new-here/plan-your-visit | FAQ: Where do I park? | Parking arrangements, overflow parking, marshals |
| /new-here/plan-your-visit | FAQ: How long is the service? | Typical service length |
| /new-here/plan-your-visit | FAQ: What should I wear? | Dress guidance |
| /new-here/plan-your-visit | FAQ: Is the venue accessible? | Step-free access, accessible toilets, seating |
| /new-here/next-steps | Plug-In (`nextSteps.steps[0].when`) | Next Plug-In start date |
| /about/compass | Young Adults ages | The Compass lists Young Adults as 19–24, but the BLITZ 5:16 page says 19–26. Confirm which is current. |
| /about/compass | 5E Volunteer Model | The source said "SE Volunteer Model"; shown as "5E" (Enlist, Envision, Engage, Encourage, Evaluate). Confirm. |
| /about/team | Team photos (`team.groups[].members[].photo`) | Consented portrait photos for each person; initials are shown until then (never stock faces). Names, roles, ministries and emails follow the 2026 Pastoral Team bulletin. |
| /about/team | Hero photo (`team.hero`) | A real photo of the team to replace the current stand-in |
| /about/team | Senior Pastor welcome (`team.welcome`) | 1–2 sentence welcome from Rev. Nick Korir |
| /about/team | Spelling | Rev. Liz Mangeli (2026 bulletin) or Mang’eli (old site)? |
| /about/team | Titles not in the bulletin | Nelson Aseri and Rhoda Mushiyi (old site: Director), Gibson Gitonga, Andruga Sefu (old site: Production Assistant). Cards show no title line until confirmed |
| /about/team | Not in the 2026 bulletin | Bernice Kinuthia, Richard Mbukha, Simon Kimani, Allan Wafula are hidden (`published: false`). Confirm whether they still serve |
| /publications | PDF files (`publications[].pdfUrl`) | Upload to public/pdfs and set pdfUrl + fileSize: Ngong Road COMPASS, Elders presentation (Office Bearers). AGM Booklet is linked to public/reports/annual-report-2024.pdf; confirm this is the right file |
| /about/financials | Annual Report 2018 (`financials.reports`) | The 2018 report PDF: the current site only has its cover image. Put the file in `public/reports/annual-report-2018.pdf` and set its `file` and `size`. |
| /about/marriage-banns | New banns (`content/banns.ts`) | Add each new couple (with consent) and wedding date before the wedding; entries hide themselves after the date. The three April 2026 weddings are in and already past. Venue optional. |
| /contact | Response promise (`contact.responsePromise`) | Confirm reply time (e.g. within 2 working days) |
| /privacy | Body (`content/policies.ts`) | Privacy policy text (Kenya Data Protection Act, 2019) |
| /safeguarding | Body | Full safeguarding policy, safeguarding lead and how to report a concern |
| /terms | Body | Terms of use text |

## Ministries (Fork B)

| Page | Field | What's needed |
| --- | --- | --- |
| /ministries/quest-children | When | Confirm Quest runs at both the 9:00 and 11:30 AM services |
| /ministries/quest-children | Where | Confirm the Quest Centre is the Sunday venue |
| /ministries/quest-children | Contact | Quest contact phone or email |
| /ministries/quest-children | Age groups: Imani | Confirm Imani's age (old page said 3, same as Neema; likely 4–5) |
| /ministries/quest-children | F.A.I.T.H. "H" | The word and description for the "H" (missing on the old site) |
| /ministries/quest-children | PPI | Confirm PPI stands for "Pastoral Programme Instruction" |
| /ministries/quest-children | Quote | Confirm the source of "Jesus teaches that people must become humble like children…" (it paraphrases Matthew 18:3–4) |
| /ministries/quest-children | Parenting classes | Registration method (currently links to the contact form) |
| /ministries/next-gen-youth | Who | Confirm Next Gen age range |
| /ministries/next-gen-youth | When | Next Gen meeting day and time |
| /ministries/next-gen-youth | Where | Confirm the far-corner tent is the venue for all Next Gen programmes |
| /ministries/next-gen-youth | Contact | Next Gen contact |
| /ministries/next-gen-youth | Moran Camp age | Programme page says 12–14, camp page says 12–15; confirm |
| /ministries/next-gen-youth | Club Xpressions | "Ministry highlights" were promised on the old page but never listed; supply or drop |
| /ministries/next-gen-youth | VUMA | How to apply (currently links to the contact form) |
| /ministries/blitz-young-adults | Where | BLITZ 5:16 Sunday venue |
| /ministries/blitz-young-adults | Contact | BLITZ 5:16 contact and social media links |
| /ministries/prayer | Weekday Zoom | Zoom link or how people receive it |
| /ministries/discipleship | DEPTH | Course list (old site only showed an unreadable table image) |
| /ministries/discipleship | Plug-In video | YouTube ID of the Plug-In intro video |
| /ministries/outreach | When | Outreach team meeting times |
| /ministries/outreach | Contact | Outreach ministry contact |
| /ministries/social-justice | Contact | Social Justice ministry contact |
| /ministries/social-justice | Women Empowerment Program | Day, time and venue |
| /ministries/social-justice | Hands of Compassion | Next visit date |
| /ministries/counselling-care | Where | Counselling room location on campus |
| /ministries/counselling-care | Booking | How to book a session (phone, WhatsApp, form or walk-in) |
| /ministries/counselling-care | GriefShare | Schedule |
| /ministries/counselling-care | Helpline | A current, verified Kenya mental health helpline number |
| /ministries/counselling-care | FAQ | Confirm whether counselling is open to non-members |
| /ministries/marketplace | When / Where | No meeting days, times, forum dates or venue anywhere in the sources; ask the church |
| /ministries/marketplace | Contact | The 2026 Pastoral Team bulletin lists Tatiana Gitonga, Pastor, 9to5 Ministry & Volunteers (tatianawairimu@nairobichapel.org). Confirm she is the right contact to publish, then add her |
| /ministries/enzi | Accessibility | Venue access details (step-free routes, accessible toilets, seating, sign language) |

| /new-here/plan-your-visit | BLITZ 5:16 timing | Site says 11:30 AM – 1:00 PM, but also a 1-hour small-group Bible study plus a 2-hour service (3 hours). Ask which is right |
| /new-here/plan-your-visit | Landmark | "Near Raila Odinga Stadium, off the Jamhuri Road area" is not on the current site; removed from the footer, contact and visit pages until the church confirms it |
| /new-here/plan-your-visit | Address | No street address or plus code anywhere; only the Google Maps link (maps.app.goo.gl/n53TFwLMWmHSst6e6) |
| /new-here/plan-your-visit | Midweek Prayer | End time not given ("from 6:00 PM"); where on campus not given |
| /new-here/plan-your-visit | iPRAYse KESHA | Who it is for; and whether the Kesha replaces that month's iPRAYSE (same last Friday, 6:30 vs 6:00 PM) |
| /new-here/plan-your-visit | Quest at both services | Enzi flyer says the Enzi class runs at Quest "across both services"; confirm Quest runs at both |
| /new-here/plan-your-visit | Imani age | Listed as 3 years (same as Neema); probably 4–5 |
| /new-here/plan-your-visit | FAQ | Arrival time, parking, main service length, what to wear, physical access, and the wording on whether guests are expected to give |
| /new-here/plan-your-visit | Church @ 5 | 2026 bulletin lists Meshack Ochiel as pastor of the Saturday Service; add him as contact if wanted |

| /about | Our story | The history PDF covers 1952 to about 2005; the church to supply the years from about 2005 to now |
| /about | Mission statement | "Being disciples and making disciples of Jesus Christ" is not on the current site. The live TOUCH tab says: "to share God's love, grow in faith, and make a positive impact in the world through compassionate outreach and meaningful connections." Confirm which mission to publish |
| /about | W.I.D.E. | The numbers (1,000,000 / 100,000 / 300) are the old Vision 2020 targets and now read as current goals. The Compass W.I.D.E. has no numbers (witnessing, impacting all sectors of society, discipleship, church planting). Ask which version to publish |
| /about | Core value 02 | Current site says "Grow together"; the Compass says "Do life together". Ask which the church uses now |
| /about | Four focus icons | Optional: the live page shows Share God's Love, Foster Spiritual Growth, Serve Our Community, Build Strong Relationships. Left out (mission and values cover the same ground) |
| /about | Constitution | Linked from Get to know us (PDF from the current site). It carries no date; confirm it is the current (2014) version |

## Watch, Events, Resources, Blog, Give

| Page | Field | What's needed |
| --- | --- | --- |
| /watch | `site.youtubeChannelUrl` | YouTube channel URL for "Watch live on YouTube" |
| /watch, / | `sermons[].youtubeId` (content/sermons.ts) | YouTube video IDs for the three seeded sermons |
| /watch | `sermons[].date` | Dates for the three seeded sermons (then keep the list newest first; `latestSermon` = first entry) |
| /watch | `watchServices` children's service | Confirm children's ages (old Watch page said 4–12; Quest says 2–11) |
| /events | Moran Camp (both cohorts) `venue` | Camp venue |
| /events | Moran Camp age range | Next Gen page says 12–14, camp page says 12–15 |
| /events | Moran Camp July 2027 registration deadline | Old site says 21 July 2027, which is after the camp starts (18 July) |
| /events | Parenting classes 2027 (both seasons) | Exact start dates, day, time and venue (dates entered as month ranges) |
| /events | PPI Bible Drive `startDate` / `expires` | Real start and end dates (placeholder: listed 16 Nov 2026, expires 31 Dec 2026; shown as "Date to be confirmed") |
| /events | Kenya Peace Summit | One-line summary and venue (archive) |
| /events | Quest Day Adventure Camp "SPLASH" | Real dates and venue (archive; placeholder sort date 1 Aug 2026, shown as TBC) |
| /events | Moms & Daughters High Tea | Date, time and venue |
| /events | Community Outreach at Tujuane Community Centre | Date and time |
| /events | GriefShare (Every week strip) | Schedule |
| /events | Bookshop: "Around Africa on a Motorcycle" | Price |
| /resources | `resources[].fileUrl` (all 20) | Real PDF file URLs and file sizes |
| /resources | Undated seeds (Silent Prayer Devotional, Adults Quiet Time, Genesis, Exodus, Ecclesiastes, Born Again Believer, Family Worship Packs) | Confirm the month each is for (seed months are placeholders for sorting) |
| /resources | Fasting guides March–June 2026 | Exact titles (seeded as "{Month} 2026 Prayer & Fasting Guide"; duplicates removed) |
| /resources | `pinned` | Confirm which items are "this week" and keep updating weekly |
| /resources | Full import | Import the remaining ~260 items from the four old libraries, de-duplicated |
| /blog | `posts[].date`, `excerpt`, `body` | Dates, excerpts and full text for all five posts |
| /blog | "Haggai: Compassion over Judgement" | Confirm title: Watch lists "Zephaniah: Compassion over Judgement" as a series name |
| /give | Online giving | The current site (/donate) has a form: name, email, type (Tithe/Offering, LOGOS Scholarship Fund, Food Bank), KES or USD, amount, "Give Now". Its payment gateway is unknown; ask the church or whoever built the old site, then connect the same or a replacement. The form is off the new page until then |
| /give | Paybill number | Site text says 508701 (also on the live /watch footer), but a footer screenshot may read 308701. Confirm directly with the church before launch: a wrong Paybill sends money elsewhere |
| /give | Which accounts | The Paybill and NCBA account are Nairobi Chapel's central details, not Ngong Road–specific. Confirm that is intended |
| /give | M-Pesa prompt (STK push) | Built; switched off until the church supplies Daraja credentials for its Paybill: consumer key and secret, the Lipa na M-Pesa Online passkey (Safaricom issues it on request for the Paybill), then set MPESA_ENV=production, MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORTCODE, MPESA_PASSKEY, MPESA_CALLBACK_URL (https://<site>/api/give/mpesa/callback), MPESA_CALLBACK_TOKEN on the host. Test in sandbox first (shortcode 174379) |
| /give | Gift records | Successful M-Pesa prompts are only logged on the server; decide where gifts and receipt numbers should be recorded (finance system, CRM or email) |
| /give | Where your giving goes | Named funds and causes beyond the PPI Bible Drive, one line each |
| /give | FAQ: "Will I get a receipt?" | How and when receipts are issued |

### Get Involved (Fork D)

| Page | Field | What's needed |
| --- | --- | --- |
| /get-involved, /get-involved/groups | Area filter (`groupAreas` in content/groups.ts) | List of eGroup zones/areas across Nairobi; until supplied, the Area select is disabled |
| /get-involved/groups | eGroups: when | eGroup meeting days and times |
| /get-involved/groups | Binti: when / where | Binti meeting days, times and venue |
| /get-involved/groups | Jabari: when / where | Jabari meeting days, times and venue |
| /get-involved/groups | BLITZ 5:16: where | BLITZ 5:16 venue |
| /get-involved/groups | Addiction support group: where | Venue |
| /get-involved/groups | GriefShare: when / where | GriefShare schedule and venue |
| /get-involved/groups | Plug-In: when / where | Next Plug-In start date and venue |
| /get-involved/groups | School of Ministry card: when / where | Course dates and venue |
| /get-involved/groups | Marketplace Ministry card: when / where | Forum dates and venue |
| /get-involved/groups | Outreach teams card: when | Outreach team schedules |
| /get-involved/serve | Teams list and codes (`serve.teams`, `serve.teamsTodo`) | Confirm the full list of serving teams (currently greeters, ushers, worship, children, youth, outreach, media) and each team's SMS sign-up code |
| /get-involved/kinara | Application form (`kinara.applicationFormUrl`) | URL of the Kinara application form PDF |
| /get-involved/kinara | How to apply step 3 | Where and how to submit a Kinara application |
| /get-involved/kinara | Next intake | Next intake date and application deadline |
| /get-involved/kinara | Contact | Kinara contact person / email |
| /get-involved/school-of-ministry | Courses | School of Ministry course list |
| /get-involved/school-of-ministry | Dates / where | Next intake dates and venue |
| /get-involved/logos-scholarship | Intro | One-sentence description of the fund |
| /get-involved/logos-scholarship | About / who can apply / how to apply | All body content (no content available on the old site) |
| /get-involved/logos-scholarship | Application window / contact | Dates and contact |
| /resources | Bible-study week dates | No week has a posting date, so “This week” can’t mark a series as “Current series”. Add `publishDate` to each week as it is posted |
| /resources | File sizes | `fileSize` per PDF (shown as “PDF · 2.1 MB”) once files are uploaded |
| /resources/prayer-fasting | November 2026 guide | File URL (church site /prayer-fasting) and audience |
| /resources/prayer-fasting | Prayer & Fasting Pocket Book (July 2026) | File URL and audience |
| /resources/prayer-fasting | 21-Day Combined Guide & Pocket Book (Aug 2026) | File URL |
| /resources/quest-kids | November 2026 · Week 4 Craft | File URL |
| /resources/family-worship | Family Worship Pack, Adults Quiet Time Devotional | Not on the church site; hidden until a source is confirmed |
| /events | Moran Camp (Nov 2026, Jul 2027) | Registration links and venue |
| /events | Addiction Support Groups | One-line summary, venue, sign-up link |
| /events | Free Counselling | Which days each set of hours (10 AM–4 PM, 9 AM–2 PM) applies to; booking link |
| /events | GriefShare Circle | Day, time and venue |
| /events | Kenya Peace Summit | Venue |
| /events | Moms & Daughters High Tea, Tujuane outreach, Parenting Classes 2027 | One-line summaries, dates; High Tea booking link |
| /events | Quest holiday camp | “The King and I: December Quest Camp” vs the August “SPLASH” day camp: which is current? (hidden) |
| /events | Family Fun Day Picnic, Youth Worship Night, Women’s Prayer Breakfast, Community Clean-up Day | Not on the church site; hidden until confirmed |
