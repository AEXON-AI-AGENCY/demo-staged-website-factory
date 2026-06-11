# INSURANCE — Vertical Build Brief (deliberate macrostructure break)

**Vertical:** Shield Insurance Partners
**File:** `app/insurance/page.tsx` (does not exist yet — create it)
**Route:** `/insurance` → `demo.aexonai.com/insurance` after deploy
**Stack:** Next.js 16.2.6 (Turbopack), React 19, `next/font/google`, inline styles (NO Tailwind utilities — the established vertical pattern)
**Status:** Brand new file. **DO NOT MIRROR `app/real-estate/page.tsx` or `app/law-firm/page.tsx`.** The user has flagged that the last 3 verticals (restaurant, real estate, law firm) shipped with the same 12-component rhythm — hero 2-col text + image, hours strip, 4 service cards, AI chat left + features right, 4 process steps, 4 trust badges, contact panel, footer. Just different colors and copy. Insurance MUST be structurally different.

---

## Brand & Data (from `lib/verticals.ts["insurance"]`)

| Field | Value |
|-------|-------|
| Name | Shield Insurance Partners |
| Tagline | Protection You Can Count On. |
| Industry | Insurance |
| Location | Miami, FL |
| Accent (dark) | `#4589ff` (Carbon Blue 50 — for dark mode contrast) |
| Accent (light) | `#0f62fe` (IBM Blue 60 / Carbon Blue 60 — THE accent) |
| Phone | `(305) 555-0176` |
| Email | `quotes@shieldinsurancepartners.com` |
| Address | `1000 Brickell Ave, Miami, FL 33131` |
| Hours | `Mon–Fri: 9AM–5PM` |
| Services | Auto Insurance · Homeowners Insurance · Business Insurance · Life Insurance · Health Plans |
| About | Independent agency representing 30+ carriers. We'll shop the best rates for you. |
| CTA | "Get a Quote" |
| CTA sub | "No spam, no pressure" |

---

## Voice & Content (insurance, NOT a copy of the last 3)

Insurance is a **comparison-shopping product**. The page exists to drive a quote, not to tell a brand story. Voice: institutional, no-nonsense, numbers-first, no marketing fluff. No "your home our mission." No "serious counsel relentless advocacy." No "where every meal becomes a memory."

Use insurance language: premium, deductible, coverage limit, carrier, policy, claim, quote, bind, endorsement, rider, term, beneficiary. Show numbers wherever possible. Real numbers from the registry + realistic placeholders clearly labeled as "your rate" / "based on your inputs."

---

## Spec (Non-Negotiable — deliberately different from the last 3 verticals)

| Element | Value | Why different |
|---------|-------|---------------|
| **Display font** | IBM Plex Sans weight **300 (Light)** at display sizes (60px+), weight 400 at body | Carbon uses light-weight display type — gives institutional/engineering feel. NOT Playfair (used by last 3). |
| **Body font** | IBM Plex Sans weight 400 | Same family as display, no second family. |
| **Mono font** | IBM Plex Mono (NEW — last 3 had no monospace) | Used for premium numbers, rate tables, policy codes, ZIP code inputs. Loads with `IBM_Plex_Mono` from `next/font/google`. |
| **Border radius** | **0px on EVERYTHING** — buttons, inputs, cards, tags (the only exception: 24px on pill tags) | Carbon is fundamentally rectangular. Last 3 used 14-20px rounded corners. This is the most visible single change. |
| **Shadows** | **NONE on cards/panels/sections.** Depth via background-color layering only (`#ffffff` → `#f4f4f4` → `#e0e0e0`). Shadows reserved for floating elements (dropdowns, tooltips) only. | Last 3 used `boxShadow` freely. |
| **Accent** | IBM Blue 60 `#0f62fe` (light mode) / `#4589ff` (dark mode) — the SOLE accent. No secondary hues. | Real-estate had multiple blues; law firm was navy. |
| **Spacing** | 8px base unit. All margins/paddings divisible by 8 (with 2px/4px micro-adjustments). | Last 3 used ad-hoc spacing. |
| **Background image** | **NONE.** Pure flat backgrounds with alternating `#ffffff` / `#f4f4f4` bands. Last 3 had Unsplash photos bleeding through. | This is a structural break — insurance is about data, not atmosphere. |
| **localStorage key** | `shield-insurance-theme` | — |
| **WCAG** | AA contrast minimum. | — |

---

## Macrostructure: Tool-Led (deliberately NOT the same as the last 3)

The last 3 verticals all used: Nav → Hero 2-col text+image → Hours strip → 4 service cards → AI chat left + features right → 4 process steps → 4 trust badges → Contact panel → Footer.

**Insurance uses a different macrostructure:**

1. **Nav** (sticky, dark `#161616` background, 48px tall, IBM Plex Sans links, Blue 60 active indicator — Carbon-style)
2. **Quote tool hero** (NOT a tagline hero): the first thing the user sees is a **3-step quote form** (ZIP → coverage type → basic info) embedded in the page, with a live "estimated savings" ticker in IBM Plex Mono. The headline is short and direct: "30+ Carriers. One Form. Best Rate."
3. **Live rate comparison table** (NOT 4 service cards): a real table with columns `Carrier | Annual Premium | Deductible | Coverage | Rating`, with 4-5 realistic carrier rows (e.g. "Progressive", "GEICO", "State Farm", "Allstate", "Liberty Mutual"). User clicks a row to select. Numbers are placeholders but formatted like real quotes ($1,847/yr, $500 deductible, etc.).
4. **3 product line dark bands** (NOT a 4-step process): full-bleed alternating dark `#161616` / mid `#262626` bands, one per product line (Auto, Home, Business). Each band has a left-aligned IBM Plex Sans 300 display headline (42px), 3 short bullet features, and a "Get a [type] quote →" link in Blue 60. Vertical stack with generous 96px padding. Feels like a technical product page, not a marketing page.
5. **AI Advisor chat** (smaller, embedded — NOT the dominant 2-col layout): a single full-width card with the chat on the left and a small "What Shield's AI can do" sidebar on the right. 3-4 turns of mock conversation. Tone: data-driven, asks for ZIP first.
6. **Trust strip** (NOT 4 trust badges): a **carrier logo wall** — 12-16 grayscale carrier/partner logos in a 4×3 grid (use realistic carrier names: Progressive, GEICO, State Farm, Allstate, Liberty Mutual, Nationwide, Travelers, Chubb, AIG, MetLife, Prudential, Humana). Below the grid, a 3-cell ratings strip: "A+ BBB Rated" / "AM Best A++" / "4.8★ Google Reviews" — rendered as IBM Plex Mono stat blocks, not emoji badges.
7. **Coverage map / rate-by-state stats** (NEW section type): a dark band with a 3-column "rate stats" grid showing 3 sample metro rates in IBM Plex Mono large numerals: "Miami: $2,140/yr avg auto", "Orlando: $1,890/yr", "Tampa: $1,975/yr". Use the "—" placeholder pattern from hallmark rules where real data isn't supplied.
8. **Contact section** (keeps the structural fix from `d53aab5`): the opaque `colors.bg` panel pattern is REQUIRED so contact text is readable. But the design here is Carbon-styled: 2-column grid, left column has Address/Phone/Hours/Email in 12px IBM Plex Sans with 0.32px letter-spacing, right column is a quote-request form with bottom-border-only inputs (NO boxes — Carbon input pattern).
9. **Footer** (Carbon-style): dark `#161616` background, IBM Plex Mono for the bottom copyright line, 3-column link grid, no rounded corners anywhere.

That's **9 components**, not 12. Fewer is fine — insurance doesn't need 12, it needs a quote flow. The brief's "12 components" is not a religion; the user's actual complaint is "they all look the same," not "you have too few." Use what serves the product.

---

## Quote tool hero (component #2) — full spec

This is the heart of the page. The above-the-fold area should be ~70vh, split into:
- **Left 60%:** Eyebrow "INDEPENDENT AGENCY · MIAMI FL", H1 "30+ Carriers. One Form. Best Rate." in IBM Plex Sans weight 300, 60px. Sub: "We shop 30+ top-rated carriers so you don't have to. Average customer saves $847/yr." Then a 3-step inline form:
  - Step 1: ZIP code input (5 digits, IBM Plex Mono, bottom-border input)
  - Step 2: Coverage type select (Auto / Home / Bundle / Other)
  - Step 3: "See my quotes →" primary button (Blue 60, 0px radius, 48px tall, white text)
- **Right 40%:** A dark `#161616` panel showing a **live "ESTIMATED SAVINGS"** counter in IBM Plex Mono 48px weight 400, ticking up from `$0` to `$847` with a tiny spinner-style animation. Below it, a small monospace list: "✓ 30+ carriers compared" / "✓ No spam, no obligation" / "✓ A+ BBB rated agency". This panel is the visual hook — it's the "Shield saves you money" promise made literal and animated.

The form should be functional (state-driven), not just decorative. On submit, the table in component #3 should "highlight" via a brief flash to draw the eye down.

---

## Rate comparison table (component #3) — full spec

A real HTML-style table (use CSS grid or `<table>` — your call, but it MUST look like a comparison tool, not a marketing graphic):
- Header row: `Carrier | Annual | Semi-Annual | Monthly | Deductible | Coverage | Rating | [Select]`
- 5 rows of data:
  - Progressive: $1,847 / $947 / $167 / $500 / Liability + Collision / A+ / [Select →]
  - GEICO: $1,923 / $985 / $173 / $500 / Liability + Collision / A++ / [Select →]
  - State Farm: $1,756 / $899 / $158 / $1,000 / Liability + Collision / A+ / [Select →]
  - Allstate: $2,012 / $1,030 / $181 / $250 / Premium / A+ / [Select →]
  - Liberty Mutual: $1,694 / $868 / $152 / $1,000 / Standard / A / [Select →]
- Right column "Select →" is a Blue 60 link that "selects" the row (state change: row gets a 2px Blue 60 left-border + background tint)
- Numbers in IBM Plex Mono. Carrier names in IBM Plex Sans weight 400.
- Below the table: "Showing estimated rates for ZIP 33131 · 30yr old driver · clean record · 2022 Honda Civic. Adjust in step 2 →"
- The "30yr old driver · clean record" etc. is the hallmark-style realistic placeholder — not invented, just a single example profile labeled clearly.

---

## Product line dark bands (component #4) — full spec

Three full-bleed bands, alternating between `#161616` (Gray 100) and `#262626` (Gray 90) backgrounds. Each band:
- Vertical padding 96px top/bottom (Carbon expressive)
- Max content width 1200px centered
- Left-aligned content (NOT center)
- Display headline in IBM Plex Sans weight 300, 42px, color `#f4f4f4` (Gray 10)
- 3 bullet features below in IBM Plex Sans 400, 16px, color `#c6c6c6` (Gray 30), each prefixed with a small `→` in Blue 60 (`#4589ff` for dark mode)
- Bottom-right "Get a [type] quote →" link in Blue 60, weight 400, 16px
- Bands in order: Auto · Home · Business (drop Life and Health from the 5-service list — they're not the agency's primary lines per the registry's emphasis on auto/home)

---

## AI Advisor chat (component #5) — full spec

Smaller than the last 3 verticals' AI sections. Single full-width card, dark `#161616` background:
- Header: "AI ADVISOR" eyebrow in IBM Plex Mono 12px + "Ask anything. We respond in 60 seconds." in IBM Plex Sans 18px weight 400
- Left ~60%: 3-4 turn chat (shorter than the last 3's 6 turns). Example:
  - **User:** "ZIP 33131, 30yo driver, clean record, 2022 Civic. Auto only. Best rate?"
  - **AI:** "Scanning 30 carriers... Best match: State Farm at $1,756/yr with $1,000 deductible. Runner-up: Liberty Mutual at $1,694/yr. Want me to lock in a quote with your real info?"
  - **User:** "Lock State Farm. Call me."
  - **AI:** "Locked. An agent will call you within 1 business hour at the number on file. Reference: SH-7842. Anything else?"
- Right ~40%: "WHAT SHIELD'S AI DOES" sidebar with 3 short bullets in IBM Plex Sans 14px weight 400 color `#c6c6c6`: "Compares 30+ carriers in 4 seconds" / "Pre-fills your application from quote data" / "Routes you to a licensed agent for binding"

---

## Trust strip (component #6) — full spec

- Section title: "RATED & CERTIFIED" eyebrow + "Carriers & Ratings" h2 in IBM Plex Sans 300, 32px
- 4×3 grid of carrier names rendered in IBM Plex Sans 600, 14px, color `#161616` light / `#f4f4f4` dark, on alternating `#f4f4f4` / `#ffffff` cells (no borders, just background layering). Carrier names: Progressive, GEICO, State Farm, Allstate, Liberty Mutual, Nationwide, Travelers, Chubb, AIG, MetLife, Prudential, Humana
- Below the grid: 3-cell stat strip on `#f4f4f4` background, no borders. Each cell: huge IBM Plex Mono 48px weight 400 number on top (e.g. "A+", "A++", "4.8★"), IBM Plex Sans 12px caption below ("BBB Rating", "AM Best", "Google Reviews"). NO emoji badges. NO shield emojis. NO handshake emojis. Just type.

---

## Coverage stats band (component #7) — full spec

Full-bleed dark `#161616` band, 96px padding:
- Eyebrow: "FLORIDA COVERAGE" in IBM Plex Mono 12px color `#8d8d8d`
- 3-column grid of large stat cells:
  - "MIAMI 33131" (mono 14px caption) / "$2,140" (mono 48px) / "avg annual auto premium" (sans 12px)
  - "ORLANDO 32801" / "$1,890" / "avg annual auto premium"
  - "TAMPA 33602" / "$1,975" / "avg annual auto premium"
- All numbers in IBM Plex Mono 48px weight 400, color `#f4f4f4`
- Numbers should be CLEARLY LABELED as sample/illustrative in the eyebrow or a small disclaimer ("Illustrative averages · your rate varies by profile")

---

## Contact section (component #8) — full spec

Keeps the opaque `colors.bg` panel fix from `d53aab5` (structural readability fix, not stylistic). But Carbon-styled:
- 2-column grid, 4rem gap
- Left column: 
  - "GET IN TOUCH" eyebrow in IBM Plex Mono 12px, 0.32px letter-spacing
  - "Request a Callback" h2 in IBM Plex Sans 300, 32px
  - Sub-paragraph: "An independent agent — not a call center — will return your request within 1 business hour."
  - 4 info rows (Address, Phone, Hours, Email) in IBM Plex Sans 12px weight 400, color `#525252`, with 0.32px letter-spacing. Each row: small mono label left (70px) + value right.
- Right column: quote request form, Carbon-style inputs:
  - Inputs are bottom-border ONLY (no boxed borders, no rounded corners). 40px tall. Background `#f4f4f4`. Bottom-border: 2px solid transparent default, 2px solid `#0f62fe` on focus.
  - Fields: Your Name, Email, Phone, ZIP (mono), Coverage type (Auto/Home/Bundle/Other), "Best time to call" (select)
  - Submit button: Blue 60 background, 0px radius, 48px tall, white text, 14px 63px 14px 15px padding (Carbon's signature asymmetric padding)
  - Below the form: small IBM Plex Sans 12px caption: "By submitting, you consent to a callback from a Shield Insurance Partners agent. We do not sell your data."

---

## Footer (component #9) — full spec

- Dark `#161616` background, full-bleed
- 3-column link grid: "Coverage" (Auto, Home, Business, Life, Health) / "Company" (About, Careers, Press, Contact) / "Resources" (FAQ, Claims, Carrier Login, Privacy)
- 32px IBM Plex Sans 300 brand name "Shield Insurance Partners" + tagline "Protection You Can Count On."
- Bottom row, IBM Plex Mono 12px 0.32px letter-spacing: "© 2026 Shield Insurance Partners · Licensed in FL, NY, TX · CA License #0G84829"
- 0px border-radius on everything. No social icons row. No badge.

---

## Animation — deliberately different from the last 3

- **No sparkle particles** (restaurant), **no "rising key" shapes** (real estate), **no "rising scale"** (law firm). Those were decoration.
- **One animation only:** a small monospace ticker in the hero's right panel that increments the "ESTIMATED SAVINGS" counter from `$0` to `$847` on first mount (1.5s, ease-out, IBM Plex Mono, no easing on the digits). Subtle. The "we save you money" promise made literal.
- Standard scroll-animate (`.scroll-animate` class, IntersectionObserver, opacity + translateY) is fine for the rest of the page.
- All animations respect `prefers-reduced-motion: reduce` (collapse to 0ms opacity crossfade).

---

## Chat conversation content (component #5)

See spec above. Keep it data-driven, short, no warm-fuzzy language. Insurance shoppers want answers not empathy.

---

## Don't do

- **NO 4-card service grid** (the most overused pattern from the last 3)
- **NO 4-step process strip** ("01 / 02 / 03 / 04" with circles — used 3x in a row)
- **NO 4 trust badges with emoji** (🏔⭐🤝💎 — used 3x in a row)
- **NO Playfair Display** (used 3x in a row — restaurant, real estate, law firm)
- **NO 14-20px rounded corners** (used 3x in a row — Carbon is 0px)
- **NO Unsplash background photo bleeding through** (used 3x in a row — Carbon is flat backgrounds)
- **NO sparkle/rising-particle CSS animation** (used 3x in a row)
- **NO tagline hero** ("Serious Counsel, Relentless Advocacy" / "Your Denver Move, Guided with Precision" / "Where Every Meal Becomes a Memory" — the "where X, Y" pattern is now banned for new verticals)
- **NO restaurant/real-estate/law-firm vocabulary** (no reservations, no listings, no walkthroughs, no case reviews)
- **NO amber/orange/emerald/navy accent** (last 3 used amber, blue, navy) — IBM Blue 60 only
- **NO Tailwind utility classes** — inline styles only
- **NO changes to `lib/verticals.ts`** — the data is already registered
- **NO changes to any other vertical**
- **NO changes to `app/demo/[vertical]/page.tsx`** — that route already works for insurance
- **NO changes to `app/page.tsx`** — the icon and listing for insurance is already there
- **NO invented testimonials, logos as fake images, or made-up metrics without a "—" placeholder label**

---

## Verification (all required)

1. `npm run build` — 0 errors
2. `npm run dev -- -p 3056` (or any open port) and visit `http://localhost:<port>/insurance`
3. **The 5 structural checks that prove this is NOT a clone of the last 3:**
   - Display font is IBM Plex Sans, NOT Playfair Display
   - Border-radius on buttons/inputs/cards is 0px, NOT 14-20px
   - There is NO full-page Unsplash background photo (the page is flat bands of white / `#f4f4f4` / `#161616`)
   - The hero is a quote form, NOT a 2-col text + image layout
   - The "service" section is a comparison table OR 3 product bands, NOT a 4-card grid
4. Toggle light/dark — both modes readable, WCAG AA
5. The opaque contact panel fix from `d53aab5` is still applied (mandatory structural fix)
6. The "ESTIMATED SAVINGS" ticker in the hero animates from $0 → $847 on first mount
7. The rate comparison table is a real table with 5 carrier rows and 8 columns
8. Theme persists across reload (`shield-insurance-theme`)
9. Save screenshots to `docs/briefs/screenshots/insurance-light.png` and `insurance-dark.png`
10. Commit with: `feat: insurance vertical — Shield Insurance Partners (Carbon-style, data-dense)`

---

## Working Directory

`/Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory`

## Codex Invocation

```bash
codex exec --dangerously-bypass-approvals-and-sandbox --model gpt-5.5 "$(cat docs/briefs/insurance-brief.md)"
```

Model: `gpt-5.5` (default in `~/.codex/config.toml`). Codex CLI 0.139.0 is required.

## Hallmark pre-flight stamp to write at the top of the page's `<style>` block

```css
/* Hallmark · macrostructure: Tool-Led Hero · tone: institutional-engineering
 * theme: IBM Carbon · accent: IBM Blue 60 (#0f62fe) · mono: IBM Plex Mono
 * display: IBM Plex Sans weight 300 · body: IBM Plex Sans weight 400
 * differs from last 3: 0px radius (was 14-20px) · flat bands (was Unsplash) ·
 *   tool-led hero (was 2-col text+image) · IBM Plex (was Playfair+DM Sans) ·
 *   data-table (was 4-card grid) · 3 dark product bands (was 4 process steps)
 */
```
