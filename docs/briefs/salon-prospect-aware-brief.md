# /salon Vertical — Make It Prospect-Aware

**File:** `app/salon/page.tsx`
**Live:** `demo.aexonai.com/salon`
**Status:** Currently hardcoded to "Glow Studio Salon" (NYC editorial nail salon). When a hair-braiding prospect clicks the link, they see the wrong business details (NYC address, hair cut/color/nails services, "Glow. Glam. Go." tagline, fake stats like "15+ YEARS / 4.9 GOOGLE / 8K+ CLIENTS").

**Goal:** When the URL has `?name=X&phone=Y&email=Z&industry=hair-braiding&city=Phoenix&state=AZ` (or any industry that's NOT nails), the page should render the prospect's actual business details and adapt the content to match the industry. When industry is nails/barber/beauty, keep the existing Glow Studio layout.

## URL Params to Read (in priority order)

1. `name` — prospect's business name (already used in nav)
2. `phone` — prospect's phone (already used)
3. `email` — prospect's email (already used for AI concierge)
4. `industry` — NEW: `hair-braiding`, `barber`, `barbershop`, `nail-salon`, `beauty`, `spa`, etc.
5. `city` — NEW: e.g., `Phoenix`
6. `state` — NEW: e.g., `AZ`
7. `tagline` — NEW: optional custom tagline
8. `expires` — already used for 5-day expiry

## Industry-Specific Content Tables

When `?industry=hair-braiding` (or similar non-nail industries), swap the page content:

### Hair Braiding / Hair Salon (default fallback for "hair")
- **Tagline:** "Crown your confidence. Braids crafted with love."
- **Services:** Box Braids, Knotless Braids, Cornrows, Twists, Loc Maintenance, Braided Wigs
- **Service prices:** "from $85", "from $120", "from $60", "from $70", "from $50", "from $200"
- **Trust badges:** "5★ Google" (city-specific), "Licensed & Insured", "Same-Day Appointments", "All Hair Types Welcome"
- **Hero CTA:** "Book Your Braids" / "View Our Work"

### Barber / Barbershop
- **Tagline:** "Sharp cuts. Clean fades. Real conversation."
- **Services:** Classic Cut, Fade, Beard Trim, Hot Towel Shave, Line-Up, Kids Cut
- **Service prices:** "from $25", "from $30", "from $15", "from $35", "from $20", "from $18"
- **Trust badges:** "Master Barbers", "Walk-Ins Welcome", "Est. [year]", "Hot Towel Service"
- **Hero CTA:** "Book a Chair" / "Walk In Today"

### Nail Salon (DEFAULT — keep existing Glow Studio)
- **Tagline:** "Glow. Glam. Go." (existing)
- **Services:** Manicure, Pedicure, Nail Art (existing)
- Trust badges + CTAs unchanged.

### Beauty / Spa (broad fallback)
- **Tagline:** "Beauty rituals, your way."
- **Services:** Facials, Waxing, Lashes, Brows, Makeup, Skincare
- **Service prices:** "from $65", "from $35", "from $85", "from $45", "from $95", "from $120"
- **Trust badges:** "Licensed Estheticians", "Clean Products", "Est. [year]", "Gift Cards"
- **Hero CTA:** "Book a Treatment" / "Explore Services"

## City/State Display

- If `?city=X&state=Y` is provided, replace the NYC address (18 Mercer Row, Studio 4, New York, NY) with a city-specific block:
  - Header: "Proudly serving {city}, {state}"
  - Address section: "[city-specific neighborhood], {city}, {state}"
- If NOT provided, fall back to current NYC address.

## Prospect-Name Personalization

Already partially done — `useProspectParams` hook reads `name`. Keep this behavior, just extend it to also drive:
- Hero subhead (if no tagline provided): "Built for {prospect name} by AEXON AI"
- Trust badge: "{prospect name} — Live demo for 5 days"
- "AI Concierge" mock chat: greeting uses the prospect's first name ("Welcome to {first word of biz name}!")

## File Constraints (READ-ONLY)

- **DO NOT modify** `useProspectParams.ts` (or whatever the hook file is). It already reads `name`, `phone`, `email`. You'll likely need to extend it OR read the search params directly via `useSearchParams()` from `next/navigation` inside the page component.
- **DO NOT touch** other verticals (`/plumbing`, `/hvac`, `/electrical`, etc.).
- **DO NOT change** the existing Glow Studio design DNA (fonts: Cormorant Garamond, Cinzel, DM Sans; colors: `#0D0611` background, `#F472B6` pink, `#C084FC` purple). The variations should reuse the same design system — just swap content + taglines + service cards.
- **DO NOT add** new dependencies or npm packages.
- The `/salon` page already exists. **Read `app/salon/page.tsx` first** to see the current structure. Keep the canvas animation, theme toggle, AI Agent Demo section, and overall layout intact.

## Steps

1. **Read** `app/salon/page.tsx` (2037 lines) to understand the current structure.
2. **Find** the `useProspectParams` hook and see if it reads search params via `useSearchParams()` or `window.location.search`.
3. **Define** an `INDUSTRY_CONTENT` const table at the top of the file with the 4 industry variants (hair-braiding, barber, nail-salon, beauty/spa) + their taglines, services, prices, trust badges, CTAs.
4. **Add** a helper function `getProspectContent(searchParams)` that returns the right content object based on `industry` param (defaulting to nail-salon if missing).
5. **Replace** the hardcoded services, tagline, trust badges, address, hero CTA with values from the content table.
6. **City/state:** if `city` + `state` are in URL, replace the address block.
7. **Test** with these URLs locally (dev server is on port 3053):
   - `http://localhost:3053/salon?name=Ani+African+Hair+Braiding&phone=6025550199&email=ani@x.com&industry=hair-braiding&city=Phoenix&state=AZ&expires=2026-06-20` → should look like a hair braiding site in Phoenix
   - `http://localhost:3053/salon?name=Bayside+Barbershop&phone=7185550100&email=bay@x.com&industry=barber&city=Brooklyn&state=NY&expires=2026-06-20` → should look like a Brooklyn barbershop
   - `http://localhost:3053/salon` (no params) → should still look like Glow Studio Salon
8. **Run** `npm run build` — must pass with 0 errors.
9. **Commit** with message: "feat(salon): prospect-aware content via URL params (industry/city/state)"
10. **DO NOT PUSH** to GitHub. Just commit locally. The orchestrator (Hermes) will push after Bazzy approves the result.

## Design Quality Bar (non-negotiable)

- 8+/10 visual quality. Reuse the existing Glow Studio DNA (fonts, colors, animation). No new emoji icons. No reskinning — adapt content while keeping the same design language.
- All text must be WCAG AA contrast in both light and dark mode.
- Mobile responsive at 320/375/414/768px.
- Slop-test before output: no generic "AI built this" energy, no `<gradient-purple-mania>`, no Tailwind utility soup.

## Return Format

Write `REACH_MESSAGE.txt` to the repo root with:
- 1-2 sentence summary of what changed
- The 3 test URLs to verify
- A confirmation that `npm run build` passed clean
- Any design decisions made (e.g., "kept canvas animation, swapped service cards")
