# REAL ESTATE — Vertical Build Brief

**Vertical:** Horizon Realty Group
**File:** `app/real-estate/page.tsx` (does not exist yet — create it)
**Route:** `/real-estate` → `demo.aexonai.com/real-estate` after deploy
**Stack:** Next.js 16.2.6 (Turbopack), React 19, `next/font/google`, inline styles (NO Tailwind utilities — the established vertical pattern)
**Status:** Brand new file. Mirror the canonical `app/restaurant/page.tsx` structure (most recent vertical, cleanest pattern). The vertical data is already registered in `lib/verticals.ts` — use that, do not duplicate it.

---

## Brand & Data (from `lib/verticals.ts["real-estate"]`)

| Field | Value |
|-------|-------|
| Name | Horizon Realty Group |
| Tagline | Your Home. Our Mission. |
| Industry | Real Estate |
| Location | Denver, CO |
| Accent (dark) | `#2563EB` (royal blue) |
| Accent (light) | `#1D4ED8` (deeper royal blue) |
| Phone | `(303) 555-0847` |
| Email | `listings@horizonrealtyco.com` |
| Address | `1600 Champa St, Denver, CO 80202` |
| Hours | `Mon–Sun: 9AM–7PM` |
| Services | Home Buyers · Home Sellers · Investment Properties · Relocation Services · Property Management |
| About | Denver's most trusted boutique real estate team. Average 18 years experience per agent. |
| CTA | "Browse Listings" |
| CTA sub | "Free market analysis" |

---

## Voice & Content (real estate, NOT restaurant)

Use real-estate language: buyers, sellers, listings, agents, neighborhoods, comps, market analysis, walkthroughs, offers, closing. No "tasting menus" or "private dining". No restaurant references. No New York. All Denver.

---

## Spec (Non-Negotiable)

| Element | Value |
|---------|-------|
| Display font | Playfair Display (editorial, elegant serif — same as restaurant, fits luxury real estate) |
| Body font | DM Sans |
| Color palette | Same dual-theme `c = { dark, light }` structure as restaurant. Swap in `#2563EB` / `#1D4ED8` for the accent family. **Do not copy restaurant's amber/orange palette — blue is the brand.** |
| Background image | Unsplash photo of Denver mountain skyline, suburban neighborhood, or modern home exterior. Pick one that reads well with a blue accent. `center/cover no-repeat fixed` over a `linear-gradient(180deg, ${bg} 0%, rgba(0,0,0,0.0) 100%)` — same dark-image-fade trick as restaurant. |
| Dark mode | `#0a0e1a` bg, `#e6efff` text, blue accent |
| Light mode | `#f8fafc` bg, `#0f172a` text, blue accent |
| Animation | Subtle rising particles (one per neighborhood feel — e.g., soft blue "key" shapes or sparkle dots) OR a calm horizontal sweep. Keep it tasteful and short. Inline CSS keyframes, no canvas. |
| localStorage key | `horizon-realty-theme` |
| WCAG | AA contrast minimum across both modes. Use the same `bodyTextColor` / `eyebrowColor` helper pattern. |

---

## The 12 Components (in order — this is the canonical vertical layout)

1. **Theme toggle (light/dark)** — sun/moon button in nav, localStorage-persisted, with a `mounted` guard so the server-render matches hydration
2. **Sticky navigation** — logo + "Horizon Realty Group" + tagline pill left; 4 nav links center (Listings, AI Concierge, About, Contact); phone + theme toggle right
3. **Hero section** — eyebrow ("Now Selling — Denver Metro"), large H1 with accent on second phrase, subheadline, two CTAs (Browse Listings + Schedule a Walkthrough), right-side Unsplash image card with overlay label
4. **Hours + location strip** — 3 cards: "Office Hours" / "Office Location" / "Speak to an Agent" — same grid-strip pattern as restaurant
5. **Service cards 01–04** — exactly FOUR cards, numbered 01/02/03/04 in display font, accent color, low opacity, large. **Pick 4 of the 5 services** (drop one — "Property Management" is the natural one to drop for visual rhythm, or keep all 5 if you redesign the grid to `repeat(auto-fit, minmax(220px, 1fr))` like restaurant does)
6. **AI Concierge chat section** — 2-column: left = live mock conversation (5–6 turns) between a buyer and the AI; right = 4 feature highlights (Smart Search, Neighborhood Intel, Offer Strategy, Instant Tour Booking) — same `chatMessages` array structure as restaurant
7. **Process steps 01–04** — exactly FOUR cards: e.g., (1) Tell Us What You Want, (2) AI Matches Listings, (3) Tour Homes, (4) Close with Confidence
8. **Trust badges** — exactly FOUR badges with icon + label + sub. Real-estate-flavored: e.g., 🏔 "Denver's Top 1%" / 🏠 "$2B+ Sold" / ⭐ "5-Star Rated" / 🤝 "18 Years Avg Experience"
9. **Contact section** — same "Get in Touch" / "Schedule a Walkthrough" / 4-row info (Address, Phone, Hours, Email) layout as restaurant, **AND** apply the same opaque cream background panel fix from `d53aab5` to the outer `<section id="contact">` so the dark Unsplash photo doesn't bleed through the dark text. This fix is mandatory — learn from the prior restaurant contrast work.
10. **Footer** — 3-column: brand + tagline / contact summary / "Schedule a Walkthrough →" link. Bottom row: copyright. Same `colors.card` background as restaurant footer.
11. **Bidirectional scroll animation** — `IntersectionObserver` on `.scroll-animate` class, fires on first entry (one-way is fine — "bidirectional" just means it observes in both directions; the existing pattern is sufficient)
12. **SVG inline animation** — for the animation overlay (component #1's partner), use a simple inline SVG or CSS keyframes. **Do NOT pull in a heavy canvas animation like the roofing vertical** — keep it lightweight to match the restaurant pattern.

Plus the standard structural pieces: page wrapper with gradient + Unsplash, `<style>` block with keyframes, input class for placeholder color, mounted guard, theme persistence.

---

## Contact form (in component #9, right column)

Same structure as restaurant: 2-col name/email, 2-col phone/budget, single select ("I'm looking to: Buy / Sell / Both / Explore"), single select ("Timeline: 0–3 months / 3–6 / 6–12 / Just browsing"), textarea for "Tell us about your ideal home…", submit button "Schedule a Walkthrough" with `alert()` on submit.

---

## Chat conversation content (component #6, left column)

Write 5–6 real-estate turns. Example tone:

- **User:** "We're relocating from Austin with two kids. Looking for a 4-bed in Wash Park or Cherry Creek, budget around $1.2M, good schools."
- **AI:** "Welcome to Denver! Wash Park and Cherry Creek are both strong picks for families. For your budget, I'd flag three off-market listings that match — one with a finished basement and walkable to Steele Elementary. Want me to schedule private tours for this Saturday?"
- **User:** "Saturday works. Can you also pull the school ratings and recent comps for the streets we're seeing?"
- **AI:** "Done — I've attached GreatSchools ratings, the last 6 months of comps within a half-mile, and HOA notes for each property. The Cherry Creek one has the strongest value per square foot right now. I'll hold 10am, 1pm, and 3pm Saturday and confirm by end of day."
- **User:** "Perfect. Hold all three."
- **AI:** "Held. I'll text you Saturday morning with the addresses and a single tap to start each tour. Welcome to Denver — let's find you home."

(Codex can rewrite or polish. Just keep it real-estate, not restaurant.)

---

## Don't do

- **No restaurant vocabulary** (no tasting menu, no reservations, no private dining, no "Mon: Closed" hours)
- **No restaurant color palette** (no amber/orange/gold) — blue is the brand
- **No New York, no "14 West 46th Street"** — all Denver
- **No canvas animation** like the roofing vertical — keep the lightweight pattern from restaurant
- **No Tailwind utility classes** — inline styles only, matching the existing 8 vertical files
- **No changes to `lib/verticals.ts`** — the data is already registered correctly
- **No changes to any other vertical** (hvac, plumbing, electrical, roofing, salon, restaurant, auto-repair, clothing)
- **No changes to `app/demo/[vertical]/page.tsx`** — that route already works for real-estate via the registry
- **No changes to `app/page.tsx`** — the icon and listing for real-estate is already there
- **No fabricated test data** — use the actual values from `lib/verticals.ts["real-estate"]`

---

## Verification (all required)

1. `npm run build` — 0 errors
2. `npm run dev -- -p 3054` (or any open port) and visit `http://localhost:<port>/real-estate`
3. Confirm ALL 12 components render in order
4. Toggle light/dark — both modes readable, WCAG AA
5. Verify contact section has the opaque `colors.bg` panel (learned from `d53aab5` — do not regress)
6. Verify Unsplash image loads and the gradient fade looks good top-to-bottom
7. Scroll the page — `.scroll-animate` elements fade in as they enter viewport
8. Theme persists across page reload
9. Save a screenshot to `docs/briefs/screenshots/real-estate-light.png` and `real-estate-dark.png`
10. Commit with: `feat: real estate vertical — Horizon Realty Group (12 components)`

---

## Working Directory

`/Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory`

## Codex Invocation

```bash
codex exec --dangerously-bypass-approvals-and-sandbox --model gpt-5.5 "$(cat docs/briefs/real-estate-brief.md)"
```

Model: `gpt-5.5` (default in `~/.codex/config.toml`). Codex CLI 0.139.0 is required.
