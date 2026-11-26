# Nairobi Chapel Ngong Road: prototype link map

Every clickable element on the website and where it goes, for wiring the Figma design into a clickable prototype. Taken from the live build on 25 November 2026. Each page was visited and every link and button inside it recorded.

## How to read this

**Frames.** Each page of the site is one frame, named as in the frame list below (e.g. `Plan your visit`). Pages built from one template (events, blog posts, publications, resource items) need only **one frame per template**. Point every link of that kind at the template frame.

**Actions.** Each row says what the prototype should do:

| Action | Figma interaction |
|---|---|
| **Go to** `Frame` | On click → Navigate to that frame |
| **Go to** `Frame` → *Section* | Navigate to the frame, scrolled to that section (use "Scroll to" after navigate, or a frame copy scrolled to that point) |
| **Scroll to** *Section* | On click → Scroll to that section in the same frame |
| **Open URL** `…` | On click → Open link (external; opens in a new tab on the real site) |
| **Call** / **Email** | Open link with `tel:` or `mailto:`; optional in a prototype |
| **Toggle** | Change to the component's other variant (pressed / not pressed, open / closed) |
| **Overlay** | Open overlay (dropdown menus, mobile menu) |
| **Submit** | Change the form to its "sent" variant (see Forms at the end) |
| **Download** / **Open PDF** | Open link to the PDF (or leave inactive) |

Breadcrumbs are on every page except Home: `Home` → **Go to** `Home`, and the middle crumb goes to its parent page (listed per page as "Breadcrumb").

---

## 1. Frame list

| Frame | Route |
|---|---|
| Home | `/` |
| New here | `/new-here` |
| Plan your visit | `/new-here/plan-your-visit` |
| Next steps | `/new-here/next-steps` |
| Watch | `/watch` |
| Podcast | `/podcasts` |
| Get involved | `/get-involved` |
| Find a group | `/get-involved/groups` |
| Serve on a team | `/get-involved/serve` |
| Kinara | `/get-involved/kinara` |
| School of Ministry | `/get-involved/school-of-ministry` |
| Logos Scholarship | `/get-involved/logos-scholarship` |
| Ministries | `/ministries` |
| Quest children | `/ministries/quest-children` |
| Next Gen youth | `/ministries/next-gen-youth` |
| BLITZ young adults | `/ministries/blitz-young-adults` |
| Prayer | `/ministries/prayer` |
| Discipleship | `/ministries/discipleship` |
| Outreach | `/ministries/outreach` |
| Social justice | `/ministries/social-justice` |
| Counselling and care | `/ministries/counselling-care` |
| Marketplace Ministry | `/ministries/marketplace` |
| Enzi | `/ministries/enzi` |
| What's on | `/events` |
| Event detail *(template)* | `/events/<event>` |
| Resource Library | `/resources` |
| Bible studies | `/resources/bible-studies` |
| Prayer & fasting | `/resources/prayer-fasting` |
| Family worship | `/resources/family-worship` |
| Quest Kids | `/resources/quest-kids` |
| Series detail *(template)* | `/resources/series/<series>` |
| Season detail *(template)* | `/resources/season/<season>` |
| Resource item *(template)* | `/resources/<item>` |
| Blog | `/blog` |
| Blog post *(template)* | `/blog/<post>` |
| Publications | `/publications` |
| Publication detail *(template)* | `/publications/<publication>` |
| About us | `/about` |
| What we believe | `/about/beliefs` |
| Our Compass | `/about/compass` |
| Our team | `/about/team` |
| Financials | `/about/financials` |
| Marriage banns | `/info-desk/marriage-banns` |
| Contact | `/contact` |
| Give | `/give` |
| Privacy policy | `/privacy` |
| Safeguarding policy | `/safeguarding` |
| Terms | `/terms` |
| Image credits | `/credits` |

---

## 2. Global components (on every page)

### Top strip (dark bar above the header)
| Element | Action |
|---|---|
| Sundays 9:00 & 11:30 AM | Not clickable |
| Ngong Road, Nairobi | Not clickable |
| Get directions | **Open URL** `https://maps.app.goo.gl/n53TFwLMWmHSst6e6` |

### Header (desktop)
| Element | Action |
|---|---|
| Logo "Nairobi Chapel Ngong Road" | **Go to** `Home` |
| New Here ▾ | **Overlay** dropdown: Plan your visit → `Plan your visit` · Next steps → `Next steps` · What we believe → `What we believe` |
| Watch ▾ | **Overlay** dropdown: Watch sermons → `Watch` · Podcast → `Podcast` |
| Get Involved ▾ | **Overlay** dropdown: Find a group → `Find a group` · Serve on a team → `Serve on a team` · Kinara leadership → `Kinara` · School of Ministry → `School of Ministry` · Logos Scholarship Fund → `Logos Scholarship` |
| Ministries ▾ | **Overlay** dropdown: Quest children's ministry → `Quest children` · Next Gen youth church → `Next Gen youth` · BLITZ 5:16 young adults → `BLITZ young adults` · Prayer → `Prayer` · Discipleship → `Discipleship` · Outreach → `Outreach` · Social justice → `Social justice` · Counselling and care → `Counselling and care` · Marketplace Ministry → `Marketplace Ministry` · Enzi disability ministry → `Enzi` |
| Events | **Go to** `What's on` |
| Resources ▾ | **Overlay** mega-menu with 3 columns (below) |
| About ▾ | **Overlay** dropdown: About us → `About us` · What we believe → `What we believe` · Our Compass → `Our Compass` · Our team → `Our team` · Financials → `Financials` · Marriage banns → `Marriage banns` · Contact → `Contact` |
| New here? | **Go to** `New here` |
| Give (purple button) | **Go to** `Give` |

**Resources mega-menu**
- *Resource Library* (column title) → `Resource Library`; Bible Studies → `Bible studies`; Prayer & Fasting → `Prayer & fasting`; Family Worship → `Family worship`; Quest Kids → `Quest Kids`; All Resources → `Resource Library`
- *Blog* (column title) → `Blog`; the 3 newest posts → `Blog post`; View all posts → `Blog`
- *Publications* (column title) → `Publications`; each of the 6 publications → `Publication detail`; All publications → `Publications`

### Header (mobile)
| Element | Action |
|---|---|
| Logo | **Go to** `Home` |
| ☰ Menu | **Overlay** the mobile menu drawer. It holds the same items as the desktop header, as accordions (tap a group to expand), plus New here? and Give buttons at the foot. Close (×) → close overlay |

### Footer
| Element | Action |
|---|---|
| Logo | **Go to** `Home` |
| Get directions | **Open URL** Google Maps (as above) |
| +254 701 777 888 | **Call** `tel:+254701777888` |
| WhatsApp us | **Open URL** `https://wa.me/254701777888` |
| mail@nairobichapel.org | **Email** `mailto:mail@nairobichapel.org` |
| **About** column | About us → `About us` · What we believe → `What we believe` · Our team → `Our team` · Financials → `Financials` · Marriage banns → `Marriage banns` |
| **Get involved** column | Plan your visit → `Plan your visit` · Next steps → `Next steps` · Find a group → `Find a group` · Serve on a team → `Serve on a team` · Give → `Give` |
| **Resources** column | Watch sermons → `Watch` · Podcast → `Podcast` · Resource library → `Resource Library` · What's on → `What's on` · Blog → `Blog` · Publications → `Publications` |
| Bottom row | Privacy policy → `Privacy policy` · Safeguarding policy → `Safeguarding policy` · Terms → `Terms` · Image credits → `Image credits` |

### Floating button (bottom-right, every page)
| Element | Action |
|---|---|
| Chat on WhatsApp (green) | **Open URL** `https://wa.me/254701777888` |

### Closing band (purple or dark band at the foot of most pages)
Its two buttons differ per page and are listed in each page's table.

---

## 3. Page by page

### Home
| Section | Element | Action |
|---|---|---|
| Hero (video) | Pause background video | **Toggle** play/pause icon |
| Hero | Plan your visit | **Go to** `Plan your visit` |
| Hero | Watch live | **Go to** `Watch` |
| This Sunday | Ngong Road, Nairobi. Get directions | **Open URL** Google Maps |
| This Sunday | Quest for ages 2–11 | **Go to** `Quest children` |
| Featured events | Event card (title) and "See event details" | **Go to** `Event detail` |
| For every age and stage | See all ministries | **Go to** `Ministries` |
| For every age and stage | ‹ › arrows | Scroll the card row sideways (horizontal scroll in Figma) |
| For every age and stage | Quest card | **Go to** `Quest children` |
| | Next Gen card | **Go to** `Next Gen youth` |
| | BLITZ 5:16 card | **Go to** `BLITZ young adults` |
| | Binti card | **Go to** `Find a group` (filtered to Women) |
| | Jabari card | **Go to** `Find a group` (filtered to Men) |
| | Support and care card | **Go to** `Counselling and care` |
| Connect · Grow · Serve | Learn about our church | **Go to** `About us` |
| New here? Three simple steps | Plan your visit | **Go to** `Plan your visit` |
| | See next steps | **Go to** `Next steps` |
| | Find a group | **Go to** `Find a group` |
| | Need prayer? Talk to us | **Go to** `Prayer` → *Send a prayer request* |
| Watch the latest sermon | Video thumbnail | Plays the video in place (optional: **Open URL** YouTube) |
| | Watch all sermons | **Go to** `Watch` |
| We'd love to connect with you | New here? card | **Go to** `Plan your visit` |
| | eGroups card | **Go to** `Find a group` |
| | Join a team card | **Go to** `Serve on a team` |
| | Watch online card | **Go to** `Watch` |
| Give generously | Give now | **Go to** `Give` |
| Closing band | Plan your visit · Watch live | **Go to** `Plan your visit` · `Watch` |

### New here
Breadcrumb: Home.
| Section | Element | Action |
|---|---|---|
| Hero | Plan your visit | **Go to** `Plan your visit` |
| Hero | Watch online | **Go to** `Watch` |
| At a glance | Get directions | **Open URL** Google Maps |
| At a glance | About Quest | **Go to** `Quest children` |
| Your first visit | Plan your visit | **Go to** `Plan your visit` |
| | Get directions | **Open URL** Google Maps |
| | Take a next step | **Go to** `Next steps` |
| | What we believe | **Go to** `What we believe` |
| Got questions? (form) | Send my question | **Submit** |

### Plan your visit
Breadcrumb: Home › New Here (→ `New here`).
| Section | Element | Action |
|---|---|---|
| Hero | Let us know you're coming | **Scroll to** *Let us know you're coming* (form) |
| Hero | Get directions | **Open URL** Google Maps |
| Also on Sunday | Explore BLITZ 5:16 | **Go to** `BLITZ young adults` |
| Finding us | 0701 777 888 | **Call** `tel:+254701777888` |
| | Open in Google Maps | **Open URL** Google Maps |
| | Load the map | **Toggle** map placeholder → map image |
| Kids on Sunday | Explore Quest | **Go to** `Quest children` |
| | Safeguarding policy | **Go to** `Safeguarding policy` |
| Through the week | Explore prayer | **Go to** `Prayer` |
| Your questions, answered | 8 questions (When should I arrive? … Can someone pray with me?) | **Toggle** each accordion open/closed |
| | Ask on WhatsApp | **Open URL** `https://wa.me/254701777888` |
| | Send a question | **Go to** `New here` → *Got questions?* |
| Let us know you're coming (form) | Age bracket, How did you hear (dropdowns) | Dropdown (static in prototype) |
| | Let us know | **Submit** |
| | See next steps | **Go to** `Next steps` |
| Welcome ribbons | Not clickable (scrolling text) | — |

### Next steps
Breadcrumb: Home › New Here.
| Section | Element | Action |
|---|---|---|
| Hero | Sign up for a step | **Scroll to** *Sign up for a next step* (form) |
| Five steps to grow | Join the next Plug-In | **Scroll to** sign-up form |
| | Join a New Believers class | **Scroll to** sign-up form |
| | Ask about baptism | **Scroll to** sign-up form |
| | Find a group | **Go to** `Find a group` |
| | Find a team | **Go to** `Serve on a team` |
| Sign up form | Step dropdown | Dropdown |
| | Sign me up | **Submit** |

### Watch
Breadcrumb: Home.
| Section | Element | Action |
|---|---|---|
| Hero | Watch on YouTube | **Open URL** `https://www.youtube.com/@nairobichapelngongroad` |
| Hero | Browse sermons | **Scroll to** *GOD in Distress* (series) |
| Last Sunday (dark panel) | Play video | Plays in place (optional: **Open URL** the YouTube video) |
| | Watch the 9:00 AM service | **Open URL** that YouTube video |
| Series (episode cards) | Each episode card | **Open URL** its YouTube video |
| | See every sermon on YouTube | **Open URL** the YouTube channel |
| Podcast band (gold) | Listen to the podcast | **Go to** `Podcast` |
| | Listen on Spotify · Listen on Apple Podcasts | **Open URL** (see External destinations) |
| Services you can watch | Adult worship service | **Open URL** `https://www.youtube.com/@nairobichapelngongroad` |
| | Youth worship service | **Open URL** `https://www.youtube.com/@lightrepublicnairobichapel` |
| | Children's worship service | **Open URL** `https://www.youtube.com/@questnc7143` |
| Closing band | Plan your visit · Find a group | **Go to** `Plan your visit` · `Find a group` |

### Podcast
Breadcrumb: Home › Watch (→ `Watch`).
| Section | Element | Action |
|---|---|---|
| Hero (dark panel) | Listen on Spotify | **Open URL** `https://open.spotify.com/show/6e6NsBwNO6MW6roYG47rmK` |
| | Listen on Apple Podcasts | **Open URL** `https://podcasts.apple.com/ke/podcast/the-nairobi-chapel-ngong-road-podcast/id1788218999` |
| | Listen on Amazon Music | **Open URL** `https://music.amazon.co.uk/podcasts/27b28654-f133-49f8-84ee-4d186f2e5692/the-nairobi-chapel-ngong-road-podcast` |
| | Watch on YouTube | **Open URL** `https://www.youtube.com/playlist?list=PLs6ogvG_T9E3vc2VUueL_Ocnw0exjO2ng` |
| Latest episode card | Play · 45 min | **Toggle** to the playing variant (an audio player bar replaces the button) |
| Current series (episode rows) | Play · N min on each row | **Toggle** to the playing variant (only one episode plays at a time) |
| Earlier series | Each series row | **Toggle** accordion open; inside, each episode's Play works as above |
| | The four app buttons (repeated) | **Open URL** as in the hero |
| Closing band | Plan your visit · Watch sermons | **Go to** `Plan your visit` · `Watch` |

### Get involved
Breadcrumb: Home.
| Section | Element | Action |
|---|---|---|
| Hero | Find a group | **Go to** `Find a group` |
| Hero | Serve on a team | **Go to** `Serve on a team` |
| Ways to belong, grow and serve | Find a group | **Go to** `Find a group` |
| | Serve on a team / Find a team | **Go to** `Serve on a team` |
| | Kinara leadership programme / Explore Kinara | **Go to** `Kinara` |
| | School of Ministry / Explore School of Ministry | **Go to** `School of Ministry` |
| Find your community | Filter chips: All groups, Everyone, Women, Men, Young adults, Support | **Toggle** (only the chosen chip is pressed; the cards below filter) |
| | All areas (dropdown) | Dropdown |
| | Join this group (eGroups, Binti, Jabari, Addiction support group, GriefShare) | **Go to** `Find a group` → *Join a group* form, with that group preselected |
| | Explore BLITZ 5:16 | **Go to** `BLITZ young adults` |
| | See next steps | **Go to** `Next steps` |
| | Explore School of Ministry | **Go to** `School of Ministry` |
| | Explore Marketplace Ministry | **Go to** `Marketplace Ministry` |
| | Explore outreach | **Go to** `Outreach` |
| | Explore social justice | **Go to** `Social justice` |
| Closing band | Join a group | **Go to** `Find a group` → *Join a group* |
| | See next steps | **Go to** `Next steps` |

### Find a group
Breadcrumb: Home › Get involved (→ `Get involved`).
| Section | Element | Action |
|---|---|---|
| Hero | Join a group | **Scroll to** *Join a group* (form) |
| Groups for every season of life | Same chips, dropdown and cards as on `Get involved` | Join this group → **Scroll to** the form (group preselected); other links as on Get involved |
| Support groups | Explore counselling and care | **Go to** `Counselling and care` |
| Join a group (form) | Group, Area, Day dropdowns | Dropdowns |
| | Send my details | **Submit** |
| Closing band | Serve on a team · See next steps | **Go to** `Serve on a team` · `Next steps` |

### Serve on a team
Breadcrumb: Home › Get involved.
| Section | Element | Action |
|---|---|---|
| Hero | Sign up to serve | **Scroll to** the serve form |
| How to sign up | WhatsApp us | **Open URL** `https://wa.me/254701777888` |
| | Go to the form | **Scroll to** the serve form |
| I'd like to serve (form) | Team dropdown | Dropdown |
| | Send my details | **Submit** |
| | Learn about Plug-In | **Go to** `Next steps` |
| Closing band | Find a group · Join the next Plug-In | **Go to** `Find a group` · `Next steps` |

### Kinara
Breadcrumb: Home › Get involved.
| Section | Element | Action |
|---|---|---|
| Hero | Ask a question | **Scroll to** *Ask a question about Kinara* (form) |
| Form | Send my question | **Submit** |
| Closing band | Explore School of Ministry · Serve on a team | **Go to** `School of Ministry` · `Serve on a team` |

### School of Ministry
Breadcrumb: Home › Get involved.
| Section | Element | Action |
|---|---|---|
| Hero | Register your interest | **Scroll to** *Register your interest* (form) |
| Form | Register my interest | **Submit** |
| Closing band | Explore Kinara · Serve on a team | **Go to** `Kinara` · `Serve on a team` |

### Logos Scholarship
Breadcrumb: Home › Get involved.
| Section | Element | Action |
|---|---|---|
| Closing band | Give now · Ask a question | **Go to** `Give` · `Contact` |

### Ministries
Breadcrumb: Home.
| Section | Element | Action |
|---|---|---|
| For every age and stage | Quest card | **Go to** `Quest children` |
| | Next Gen card | **Go to** `Next Gen youth` |
| | BLITZ 5:16 card | **Go to** `BLITZ young adults` |
| By focus (cards, whole card clickable, "Learn more") | Prayer | **Go to** `Prayer` |
| | Discipleship | **Go to** `Discipleship` |
| | Outreach | **Go to** `Outreach` |
| | Social justice | **Go to** `Social justice` |
| | Counselling and care | **Go to** `Counselling and care` |
| | Marketplace Ministry | **Go to** `Marketplace Ministry` |
| | Enzi disability ministry | **Go to** `Enzi` |
| | Serve on a team | **Go to** `Serve on a team` |
| Closing band | Plan your visit · Find a group | **Go to** `Plan your visit` · `Find a group` |

### Ministry pages: shared parts
Every ministry page (Quest … Enzi) has:
- Breadcrumb: Home › Ministries (→ `Ministries`).
- **Explore more ministries**: "All ministries" → `Ministries`, plus three ministry cards. Each card → **Go to** that ministry's frame. The three shown for each page are listed below.

### Quest children
| Section | Element | Action |
|---|---|---|
| Hero | Plan your family's visit | **Go to** `Plan your visit` |
| Our strategy | Register for parenting classes | **Go to** `Contact` (subject preset to "Events") |
| | Volunteer with Quest | **Go to** `Serve on a team` |
| | See the age groups | **Scroll to** *Age groups* |
| Child safety | Read our safeguarding policy | **Go to** `Safeguarding policy` |
| Camps and events for kids | See all events for children | **Go to** `What's on` (Children chip pressed) |
| | Download children's resources | **Go to** `Resource Library` (Audience = Quest (children)) |
| Explore more | Next Gen · BLITZ 5:16 · Prayer | **Go to** those frames |
| Closing band | Plan your visit · Download children's resources | **Go to** `Plan your visit` · `Resource Library` (children) |

### Next Gen youth
| Section | Element | Action |
|---|---|---|
| Crossroads | See Moran Camp dates | **Go to** `Event detail` (Moran Camp, July 2027) |
| VUMA | Ask about VUMA | **Go to** `Contact` (subject "General") |
| Finished school? | BLITZ 5:16 card / Explore BLITZ 5:16 | **Go to** `BLITZ young adults` |
| | Read our safeguarding policy | **Go to** `Safeguarding policy` |
| Explore more | BLITZ 5:16 · Prayer · Discipleship | **Go to** those frames |
| Closing band | Plan your visit · Read our safeguarding policy | **Go to** `Plan your visit` · `Safeguarding policy` |

### BLITZ young adults
| Section | Element | Action |
|---|---|---|
| Explore more | Prayer · Discipleship · Outreach | **Go to** those frames |
| Closing band | Plan your visit · Find a group | **Go to** `Plan your visit` · `Find a group` |

### Prayer
| Section | Element | Action |
|---|---|---|
| Hero | Send a prayer request | **Scroll to** *Send a prayer request* (form) |
| Hero | WhatsApp 0701 777 888 | **Open URL** `https://wa.me/254701777888` |
| Prayer and fasting | Download a fasting guide | **Go to** `Prayer & fasting` |
| Send a prayer request (form) | Send my prayer request | **Submit** |
| Explore more | Discipleship · Outreach · Social justice | **Go to** those frames |
| Closing band | Plan your visit · Download a fasting guide | **Go to** `Plan your visit` · `Prayer & fasting` |

### Discipleship
| Section | Element | Action |
|---|---|---|
| Hero | mail@nairobichapel.org | **Email** |
| Ways to grow (cards) | Plug-In | **Go to** `Next steps` |
| | New Believers and baptism | **Go to** `Next steps` |
| | eGroups | **Go to** `Find a group` |
| | Marketplace Ministry | **Go to** `Marketplace Ministry` |
| | School of Ministry | **Go to** `School of Ministry` |
| | Kinara leadership programme | **Go to** `Kinara` |
| Explore more | Outreach · Social justice · Counselling and care | **Go to** those frames |
| Closing band | Join the next Plug-In · Find a group | **Go to** `Next steps` · `Find a group` |

### Outreach
| Section | Element | Action |
|---|---|---|
| Hero | Join an outreach team | **Scroll to** *Join an outreach team* (form) |
| Form | Team dropdown; Join an outreach team | Dropdown; **Submit** |
| Explore more | Social justice · Counselling and care · Marketplace Ministry | **Go to** those frames |
| Closing band | Join an outreach team | **Scroll to** the form |
| | See social justice work | **Go to** `Social justice` |

### Social justice
| Section | Element | Action |
|---|---|---|
| How we serve | Request support | **Scroll to** *Request support* (form) |
| Form | Need dropdown; Request support | Dropdown; **Submit** |
| Explore more | Counselling and care · Marketplace Ministry · Enzi | **Go to** those frames |
| Closing band | Join an outreach team | **Go to** `Outreach` → *Join an outreach team* |
| | Give now | **Go to** `Give` |

### Counselling and care
| Section | Element | Action |
|---|---|---|
| Need help right now? | 999 · 112 | **Call** `tel:999` · `tel:112` |
| Common questions | 3 questions | **Toggle** accordions |
| Explore more | Marketplace Ministry · Enzi · Quest children | **Go to** those frames |
| Closing band | Contact the care team | **Go to** `Contact` (subject "Pastoral care") |
| | Send a prayer request | **Go to** `Prayer` → *Send a prayer request* |

### Marketplace Ministry
| Section | Element | Action |
|---|---|---|
| Explore more | Enzi · Quest children · Next Gen youth | **Go to** those frames |
| Closing band | Contact the Marketplace team | **Go to** `Contact` (subject "General") |
| | Find a group | **Go to** `Find a group` |

### Enzi
| Section | Element | Action |
|---|---|---|
| Hero | See what we do | **Scroll to** *What we do* |
| Hero | info@nairobichapel.org | **Email** |
| What we do | WhatsApp to volunteer | **Open URL** `https://wa.me/254701777888?text=Hello%2C%20my%20name%20is%20______.%202Q%20(Enzi%20Volunteer)` |
| Contact details | info@nairobichapel.org | **Email** |
| | +254 701 777 888 / Call | **Call** `tel:+254701777888` |
| | WhatsApp | **Open URL** `https://wa.me/254701777888` |
| Learn more about Enzi | View PDF | **Open PDF** `/pdfs/enzi-disability-ministry-may-2025.pdf` |
| | Download · 189 KB | **Download** same PDF |
| | Publication cover card | **Go to** `Publication detail` (Enzi Disability Ministry) |
| Explore more | Quest children · Next Gen youth · BLITZ young adults | **Go to** those frames |
| Closing band | Plan your visit | **Go to** `Plan your visit` |
| | Read the Enzi publication | **Scroll to** *Learn more about Enzi* |

### What's on
Breadcrumb: Home.
| Section | Element | Action |
|---|---|---|
| Filters | Audience chips: All events, Everyone, Children, Youth, Women, Men, Families, Parents | **Toggle** (one pressed at a time; filters every group below) |
| Filters | Upcoming / Past events | **Toggle**. Past hides "Every week" and "Date to be announced" and shows past months |
| Every week (compact cards) | Card title | **Go to** `Event detail` |
| | "See details →" (Addiction Support Groups, Free Counselling, GriefShare Circle) | **Go to** `Event detail` |
| | PPI Bible Drive "Give a Bible →" | **Go to** `Give` → *M-Pesa* form, "PPI Bible Drive" preselected |
| Month bar | ‹ previous month / next month › | Swap to the other month's variant (only present when another month has events) |
| Month (event cards) | Card / "See details →" | **Go to** `Event detail` |
| Empty state (when a chip leaves nothing) | See all events | **Toggle** back to "All events" |
| Date to be announced | Card / "See details →" | **Go to** `Event detail` |
| Closing band | Plan your visit · Find a group | **Go to** `Plan your visit` · `Find a group` |

Cards with a known booking link show it instead of "See details" (e.g. "Register →", "Book your seat →"). None have links yet, so today they all say "See details".

### Event detail *(template)*
Breadcrumb: Home › What's on (→ `What's on`).
| Section | Element | Action |
|---|---|---|
| Details | Main action, only when the event has a link (e.g. "Give a Bible" on PPI Bible Drive) | **Go to** its target |
| | Contact phone / email (Moran Camp) | **Call** / **Email** |
| | Read our safeguarding policy (events with children) | **Go to** `Safeguarding policy` |
| | Explore the ministry behind this event | **Go to** that ministry's frame |
| Closing band | See all events · Plan your visit | **Go to** `What's on` · `Plan your visit` |

### Resource Library (hub)
Breadcrumb: Home.
| Section | Element | Action |
|---|---|---|
| This week (big purple card) | Week chips 1–4 | **Go to** `Resource item` |
| | Read week 4 | **Go to** `Resource item` |
| | View series | **Go to** `Series detail` |
| This week (side cards) | November 2026 Prayer & Fasting Guide | **Go to** `Resource item` |
| | November 2026 · Week 4 Craft | **Go to** `Resource item` |
| Filters | Search box | Text field (static) |
| | Type dropdown: Bible studies / Prayer & fasting / Family worship / Quest Kids | **Go to** that section's frame (`Bible studies`, `Prayer & fasting`, `Family worship`, `Quest Kids`) |
| | Audience, Series dropdowns | Filter the cards (a "results" variant, optional) |
| | Clear filters (appears after filtering) | Back to the unfiltered variant |
| Prayer & fasting | All prayer & fasting | **Go to** `Prayer & fasting` |
| | Single-guide cards ("Read →") | **Go to** `Resource item` |
| | Multi-guide cards ("View guides →") | **Go to** `Season detail` |
| Family worship | All family worship | **Go to** `Family worship` |
| | The Silent Prayer Devotional | **Go to** `Resource item` |
| Quest Kids | All Quest Kids crafts | **Go to** `Quest Kids` |
| | Craft cards | **Go to** `Resource item` |
| Past series | 2026 / 2025 / Earlier series | **Toggle** accordion open; inside, each series card → **Go to** `Series detail` |
| Closing band | Find a group · Read the blog | **Go to** `Find a group` · `Blog` |

### Library section pages (shared layout)
Bible studies, Prayer & fasting, Family worship and Quest Kids each have:
- Breadcrumb: Home › Resource Library (→ `Resource Library`) › section name.
- The same filter box. The Type dropdown switches to another section's frame; "All types" goes to `Resource Library`. Audience and search filter the cards.

| Frame | Cards | Closing band |
|---|---|---|
| Bible studies | 18 series cards, "View series →" → `Series detail` | Find a group → `Find a group` · Read the blog → `Blog` |
| Prayer & fasting | Newest first. "Read →" cards → `Resource item`; "View guides →" cards → `Season detail` | Plan your visit → `Plan your visit` · Prayer request → `Prayer` → *Send a prayer request* |
| Family worship | 1 card → `Resource item` | Plan your visit → `Plan your visit` · About Quest → `Quest children` |
| Quest Kids | Month groups (newest 6 months). Each "Week N" card → `Resource item`. **Show earlier months** → **Toggle** to reveal 6 more months | Plan your visit → `Plan your visit` · About Quest → `Quest children` |

### Series detail *(template)*
Breadcrumb: Home › Resource Library.
| Section | Element | Action |
|---|---|---|
| Hero | Share on WhatsApp | **Open URL** WhatsApp share link |
| Weeks | Read week N | **Go to** `Resource item` |
| | Download (shown once the PDF exists) | **Download** |
| Closing band | Find a group · Browse the library | **Go to** `Find a group` · `Resource Library` |

### Season detail *(template)*
Breadcrumb: Home › Resource Library.
| Section | Element | Action |
|---|---|---|
| Hero | Share on WhatsApp | **Open URL** WhatsApp share link |
| Audience switch (only when guides differ by age) | Adults / Youth / Children / Family | **Toggle** |
| Guides | Each guide | **Go to** `Resource item` |
| Closing band | Find a group · Browse the library | **Go to** `Find a group` · `Resource Library` |

### Resource item *(template)*
Breadcrumb: Home › Resource Library › its series or season (→ `Series detail` / `Season detail`, when it has one).
| Section | Element | Action |
|---|---|---|
| Hero | Mark as done | **Toggle** (✓ done) |
| | Share on WhatsApp | **Open URL** WhatsApp share link |
| Resource | View / Download PDF (shown once the file exists) | **Open PDF** / **Download** |
| | Previous / Next (in a series) | **Go to** `Resource item` |
| | All weeks of … | **Go to** `Series detail` |
| | All guides for … | **Go to** `Season detail` |
| | Back to the library | **Go to** `Resource Library` |
| Closing band | Find a group · Browse the library | **Go to** `Find a group` · `Resource Library` |

### Blog
Breadcrumb: Home.
| Section | Element | Action |
|---|---|---|
| Latest post | Post card | **Go to** `Blog post` |
| More posts | Chips: All, Devotional, Sermon Notes | **Toggle** |
| | Author dropdown | Dropdown |
| | Post cards | **Go to** `Blog post` |
| Closing band | Watch sermons · Browse resources | **Go to** `Watch` · `Resource Library` |

### Blog post *(template)*
Breadcrumb: Home › Blog (→ `Blog`).
| Section | Element | Action |
|---|---|---|
| Header | Share on WhatsApp | **Open URL** WhatsApp share link |
| Keep reading | All posts | **Go to** `Blog` |
| | Other post cards | **Go to** `Blog post` |
| Closing band | Find a group · Watch sermons | **Go to** `Find a group` · `Watch` |

### Publications
Breadcrumb: Home.
| Section | Element | Action |
|---|---|---|
| Annual reports, Strategy, Leadership, Ministries | Each publication card (6) | **Go to** `Publication detail` |
| Closing band | Open the Resource Library · Read the blog | **Go to** `Resource Library` · `Blog` |

### Publication detail *(template)*
Breadcrumb: Home › Publications (→ `Publications`).
| Section | Element | Action |
|---|---|---|
| Header | View PDF | **Open PDF** |
| | Download · size | **Download** |
| | Share on WhatsApp | **Open URL** WhatsApp share link |
| More publications | Cards | **Go to** `Publication detail` |
| | All publications | **Go to** `Publications` |

### About us
Breadcrumb: Home.
| Section | Element | Action |
|---|---|---|
| Our story | Read our full history (PDF, 7.5 MB) | **Open PDF** `/pdfs/nairobi-chapel-history.pdf` |
| Our current season (dark band) | Explore Our Compass | **Go to** `Our Compass` |
| The Transformation Track | Take your next step | **Go to** `Next steps` |
| | Find an eGroup | **Go to** `Find a group` |
| Get to know us (cards) | What we believe | **Go to** `What we believe` |
| | Our Compass | **Go to** `Our Compass` |
| | Our team | **Go to** `Our team` |
| | Financials | **Go to** `Financials` |
| | Publications | **Go to** `Publications` |
| | Marriage banns | **Go to** `Marriage banns` |
| | Our history | **Open PDF** `/pdfs/nairobi-chapel-history.pdf` |
| | Our Constitution | **Open PDF** `/pdfs/nairobi-chapel-constitution.pdf` |
| Closing band | Plan your visit · Contact us | **Go to** `Plan your visit` · `Contact` |

### What we believe
Breadcrumb: Home › About (→ `About us`).
| Section | Element | Action |
|---|---|---|
| Statement of faith (8 tiles) and "Jump to an article" list | 1 The Bible … 8 Satan | **Scroll to** that article on the same page |
| Closing band | See next steps · Talk to us | **Go to** `Next steps` · `Contact` |

### Our Compass
Breadcrumb: Home › About.
| Section | Element | Action |
|---|---|---|
| The five areas of Local TOUCH | T · O · U · C · H tiles | **Scroll to** that area (Teams, One on One, Under 18, Community, Health) |
| Read the full Compass | Read Our Compass | **Go to** `Publication detail` (Our Compass) |
| Closing band | Serve on a team · About us | **Go to** `Serve on a team` · `About us` |

### Our team
Breadcrumb: Home › About.
| Section | Element | Action |
|---|---|---|
| Leadership and every person card | Email (small link with a mail icon) | **Email** that person |
| Filter bar (sticky) | All (29) · Adults, discipleship & care (10) · Next Generation (11) · Missions & outreach (3) · Worship, media & production (5) | **Toggle**: show only that group (one variant per option) |
| Adults, discipleship & care | Visit Discipleship → | **Go to** `Discipleship` |
| Next Generation | Visit Next Gen → | **Go to** `Next Gen youth` |
| Missions & outreach | Visit Outreach → | **Go to** `Outreach` |
| Closing band | Contact us · Serve on a team | **Go to** `Contact` · `Serve on a team` |

### Financials
Breadcrumb: Home › About.
| Section | Element | Action |
|---|---|---|
| Hero | Download the annual reports | **Scroll to** *Annual reports* |
| On this page | 2025 at a glance · Where giving went · Governance | **Scroll to** that section |
| Independently audited (card) | Read the 2025 report | **Open PDF** `/reports/annual-report-2025.pdf` |
| 2025 at a glance | See the full statement, with 2024 figures | **Toggle** (expands a table) |
| Where giving went | See all ministry highlights | **Toggle** (expands the full list) |
| Governance | Download the 2025 report | **Download** `/reports/annual-report-2025.pdf` |
| Annual reports | Download (2025, 2024, 2023, 2022, 2021, 2019/2020) | **Download** `/reports/annual-report-<year>.pdf` |
| Closing band | Give now · Ask a question | **Go to** `Give` · `Contact` |

### Marriage banns
Breadcrumb: Home.
| Section | Element | Action |
|---|---|---|
| Closing band | Contact the church · Counselling and care | **Go to** `Contact` · `Counselling and care` |

### Contact
Breadcrumb: Home.
| Section | Element | Action |
|---|---|---|
| Hero tabs | General enquiries · Prayer request · New to faith | **Toggle**: swaps the form below |
| Send us a message (form) | Subject dropdown | Dropdown |
| | Send message | **Submit** |
| Other ways to reach us | Plan your visit | **Go to** `Plan your visit` |
| | +254 701 777 888 | **Call** |
| | Chat on WhatsApp | **Open URL** `https://wa.me/254701777888` |
| | Load the map | **Toggle** map |
| | Open in Google Maps | **Open URL** Google Maps |
| Closing band | Send a prayer request · Plan your visit | **Go to** `Prayer` → *Send a prayer request* · `Plan your visit` |

### Give
Breadcrumb: Home.
| Section | Element | Action |
|---|---|---|
| Hero quick links | Give by M-Pesa | **Scroll to** *Ways to give* |
| | Bank transfer | **Scroll to** the bank card |
| | Where it goes | **Scroll to** *PPI Bible Drive / where it goes* |
| | Our financials | **Go to** `Financials` |
| M-Pesa card | Reason cards (Tithe, Offering, LOGOS, Food Bank, PPI Bible Drive) | **Toggle** (one selected) |
| | Amount presets | **Toggle** |
| | Send M-Pesa prompt · KSh 1,000 | **Submit** → "Check your phone" variant → "Thank you for your gift" variant |
| Paybill | Copy Paybill number | Shows a "Copied" toast |
| | Step-by-step instructions | **Toggle** (expands the steps) |
| Bank card | Copy Account number · Copy SWIFT code | Shows a "Copied" toast |
| PPI Bible Drive | Give to the Bible Drive | **Scroll to** the M-Pesa form with "PPI Bible Drive" selected |
| | See the Bible Drive | **Go to** `Event detail` (PPI Bible Drive) |
| Accountability | See our financials | **Go to** `Financials` |
| | Read the AGM booklet | **Go to** `Publication detail` (2025 AGM Booklet) |
| Questions about giving | 4 questions | **Toggle** accordions |
| Closing band | Serve on a team · Contact us | **Go to** `Serve on a team` · `Contact` |

### Privacy policy · Safeguarding policy · Terms
Breadcrumb: Home.
| Section | Element | Action |
|---|---|---|
| Closing band | Contact us · Plan your visit | **Go to** `Contact` · `Plan your visit` |

### Image credits
Breadcrumb: Home. A long list. Each row's page link (e.g. "/new-here") → **Go to** that frame; each "Pexels" / "Unsplash" link → **Open URL** the photo's source page. Safe to leave inactive in the prototype.

---

## 4. Forms: what "Submit" shows

Every form below swaps to a **sent** panel (a ✓, a thank-you line and a "Send another" link) and shows a small "Sent" toast:
New here (Got questions?) · Plan your visit (Let us know you're coming) · Next steps (sign up) · Find a group (Join a group) · Serve on a team · Kinara (question) · School of Ministry (register interest) · Prayer (prayer request) · Outreach (join a team) · Social justice (request support) · Contact (message).

**Give → M-Pesa** has its own sequence: form → "Check your phone" (waiting) → "Thank you for your gift" (success), with a "Give again" button returning to the form. If payments aren't set up, it shows the Paybill details instead.

---

## 5. External destinations (one place to set them)

| Name | URL |
|---|---|
| Google Maps (directions) | `https://maps.app.goo.gl/n53TFwLMWmHSst6e6` |
| WhatsApp chat | `https://wa.me/254701777888` |
| Phone | `tel:+254701777888` |
| Church email | `mailto:mail@nairobichapel.org` |
| Enzi email | `mailto:info@nairobichapel.org` |
| YouTube: main channel | `https://www.youtube.com/@nairobichapelngongroad` |
| YouTube: youth (Light Republik) | `https://www.youtube.com/@lightrepublicnairobichapel` |
| Podcast: Spotify | `https://open.spotify.com/show/6e6NsBwNO6MW6roYG47rmK` |
| Podcast: Apple Podcasts | `https://podcasts.apple.com/ke/podcast/the-nairobi-chapel-ngong-road-podcast/id1788218999` |
| Podcast: Amazon Music | `https://music.amazon.co.uk/podcasts/27b28654-f133-49f8-84ee-4d186f2e5692/the-nairobi-chapel-ngong-road-podcast` |
| Podcast: YouTube playlist | `https://www.youtube.com/playlist?list=PLs6ogvG_T9E3vc2VUueL_Ocnw0exjO2ng` |
| YouTube: children (Quest) | `https://www.youtube.com/@questnc7143` |
| Emergency numbers | `tel:999`, `tel:112` |
| Staff emails (Our team) | `mailto:<name>@nairobichapel.org` (one per card) |

---

## 6. Notes for the prototype

- **Filtered destinations.** Some links land on a page with a filter already applied. Make a variant of the frame if you want to show it, or link to the plain frame:
  - Home "Binti" → Find a group (Women).
  - Home "Jabari" → Find a group (Men).
  - Quest "See all events for children" → What's on (Children).
  - Quest "Download children's resources" → Resource Library (Audience = Quest (children)).
  - Contact links with a subject (Events, General, Pastoral care).
  - What's on "Give a Bible" → Give with PPI preselected.
- **Old link format.** The Prayer page's "Download a fasting guide" buttons still point to `/resources?type=prayer-fasting`, which redirects to the `Prayer & fasting` page. Wire them straight to `Prayer & fasting`.
- **Check this link.** The 2025 AGM Booklet's PDF buttons open `/reports/annual-report-2024.pdf`. That may be correct (the 2025 AGM reports on 2024), but confirm before it goes in the prototype.
- **Not yet clickable on the site:** registration and booking buttons for events (Moran Camp "Register", High Tea "Book your seat", counselling "Book a session", support groups "Sign up") and the resource PDF downloads all wait on links and files from the church. Until then they show "See details" or no download button.
