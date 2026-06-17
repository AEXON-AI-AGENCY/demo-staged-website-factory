# /barbershop Vertical — VINTAGE REBUILD (replaces the reskin in commit 051c13c)

> **Status:** REPLACES the brief in `barbershop-and-ani-tile-swap-brief.md`. That brief
> produced a reskin of the electrical vertical (charcoal/amber/Bebas Neue/IBM Plex).
> This brief produces a genuinely new design language.
>
> **Hard rule from Bazzy (2026-06-17):** "Looks way too similar to electrical, has
> no background animation, no floating or animated tiles as you scroll, no proper
> background image, no button animations as you hover over them, doesn't actually
> feel like a barbershop theme with barber shop colors. Did you also even try new
> design components?" — Build to FIX all 7.

---

## 1. Design direction — VINTAGE BARBERSHOP, not industrial

**Genre:** editorial (Hallmark)
**Macrostructure:** Marquee Hero (Hallmark name — single full-bleed cinematic hero
with a marquee-style price ticker under it, then sections break the page rhythm
asymmetrically)
**Theme:** custom-build inspired by **Hallmark Studio + Salon** (warm paper #faf9f7
+ walnut #2b1d12 + chrome #c8c2b6 + barber-pole red #c0392b) — NOT a reskin of any
existing vertical

**Design DNA borrowed from real references:**
- **Type pairing** (not Inter + Inter, not Bebas + Plex — these are banned as
  electrical's family):
  - Display: **Bodoni Moda** (high-contrast display serif, Vogue / 1940s magazine)
  - Body: **DM Serif Text** (warm, readable serif) OR **Inter** (only as a UI
    fallback for nav, buttons, form fields — never headlines)
  - Mono: **IBM Plex Mono** for price tags and "Est. 2014" type eyebrows ONLY
- **Color story** (full palette, not a hue rotation of dark+amber):
  - Warm paper `#faf9f7` — the canvas
  - Walnut `#2b1d12` — primary text, headlines
  - Chrome `#c8c2b6` — metallic accent on cards, dividers
  - Barber-pole red `#c0392b` — the SINGLE accent (use it like punctuation, not
    a wash — see Clay's swatch palette rules)
  - Brass `#a07a3c` — secondary accent for hover/active states
  - Ink black `#0a0a0a` — body text on warm paper
- **NOT this:** charcoal + amber + Bebas Neue + IBM Plex. That is the
  electrical/salon pattern. Do not use it here. If you find yourself importing
  from `app/electrical` or `app/salon`, stop.

## 2. Standing requirements (Bazzy's checklist for every vertical)

1. **Unique color scheme** — full palette above; not a hue rotation of any other
   vertical. (✓ planned: warm-paper + walnut + chrome + barber-pole red + brass)
2. **Background image per vertical** — full-bleed vintage barbershop photograph
   (1920s-1950s shop interior — leather chairs, marble counters, ornate mirrors,
   warm tungsten lighting). **NOT a stock photo of a single chair in a border
   box.** Use the popular-web-designs pattern of full-bleed photography with
   dark gradient overlay for text legibility.
3. **Persistent background animation across the full page** — **rotating
   barber-pole stripes** at the top of the viewport (or as a fixed side rail)
   that animates continuously, ALWAYS VISIBLE per the codex skill's
   "no-fading-out" rule (opacity never below 0.6). Also include a slow
   Ken-Burns drift on the hero photograph. Below the fold, include subtle
   paper-grain noise texture that drifts very slowly.
4. **Tile animations as you approach that section** of the page (on-scroll
   reveal) — **chrome service plates** that:
   - Are hidden (translateY 24px, opacity 0) until they enter the viewport
   - On intersect: spring up with a chrome-shine animation (background-position
     shift from left to right) and reveal copy
   - On idle (visible but not hovered): subtle float (translateY ±2px on a
     4-second cycle, staggered per tile)
5. **An AI solution embedded** — "Bayside AI" virtual barber concierge chat
   (replace the existing demoMessages array) — the chat opens in a slide-up
   panel from the bottom-right, has a vintage-typography header, and shows
   the booking flow conversation.
6. **Light + dark mode** — toggled, persisted in localStorage. The dark mode
   inverts the warm paper to a deep walnut (`#1a1108`), the chrome becomes
   a brighter `#e6e0d2`, and the barber-pole red stays as the accent.
   (Vintage barbershop in dark mode = late-night leather-and-brass speakeasy
   feel.)
7. **Unique font pairing** — Bodoni Moda display + DM Serif Text body + IBM
   Plex Mono for prices. See §1.
8. **Unique button + tile hover animations** — buttons do **NOT** just shift
   color. They:
   - Slight `translateY(-2px)` lift
   - Chrome shine sweep (a `linear-gradient` overlay that translates from
     `-100%` to `100%` on hover, 600ms)
   - Box-shadow: `0 8px 24px rgba(43, 29, 18, 0.18)` on hover, `0 1px 2px
     rgba(43, 29, 18, 0.06)` default
   - Active state: `translateY(0)` and inset highlight
   - Tile hover: scale 1.02 + chrome shine + reveal "Book" CTA inside the tile
9. **Design source is NOT limited to hallmark** — pull from popular-web-designs
   (54 design systems), the 22 Hallmark themes, the shadcn-magicui-factory
   components, and any custom SVG/canvas you build. The shadcn components
   already in the repo (animated-number, cosmic-button, dither-image,
   grid-beam, lightboard, etc.) are a real resource — USE at least 3 of them
   in ways that fit the vintage barbershop context.
10. **Genuinely different design language, not a reskin** — if a user
    screenshots the barbershop page and the electrical page side by side,
    they should look like they came from different companies. Different font,
    different palette, different animation, different layout, different
    component DNA.

## 3. Per-vertical personality notes (barbershop-specific)

- **Headline voice:** short, declarative, slightly cocky — "Sharp cuts. Clean
  fades. Real conversation." (NOT aspirational SaaS voice like "Transform
  your experience")
- **Service cards** (the chrome plates): each card is a single service
  ("Classic Cut" / "Skin Fade" / "Beard Trim" / "Hot Towel Shave" / "Kids
  Cut" / "Line-Up Only") with:
  - A vintage engraved-style price tag (IBM Plex Mono, all-caps, $25/$30/etc)
  - A one-line description in DM Serif Text
  - A small "Book" CTA that reveals on hover
  - On hover: chrome shine sweep + lift
- **Trust badges** (in marquee strip, not static grid): "Master Barbers" /
  "Walk-Ins Welcome" / "Hot Towel Service" / "Est. 2014" — set in IBM Plex
  Mono, all-caps, with bullet separators
- **Marquee price ticker** (under the hero): a continuously scrolling strip
  showing services + prices, the barber-pole animation riding along the top
  edge, with the services text scrolling slowly to the right
- **Hero composition:**
  - Full-bleed vintage barbershop photograph (download a free-license image
    from Unsplash — search "vintage barbershop interior" or "1950s barber
    shop"; per codex skill: download via curl, no Unsplash hotlink)
  - Dark gradient overlay (`rgba(10, 10, 10, 0.55)`) for text legibility
  - Headline: "Sharp cuts. / Clean fades. / Real conversation." (Bodoni Moda,
    ~6-8rem, walnut, line-height 0.95, letter-spacing -0.02em)
  - Subhead: "A modern neighborhood barbershop built for clean blends, steady
    hands, and booking that gets you in the chair without phone tag." (DM
    Serif Text, ~1.2rem, ink)
  - CTAs: "Book a chair" (primary — chrome shine hover) + "See prices"
    (ghost — barber-pole red border on hover)
  - Right side or bottom: the rotating barber-pole SVG (custom-built, not a
    stock image)
- **AI concierge chat:**
  - Slides up from bottom-right corner (240px square panel)
  - Vintage typography header: "Bayside AI" in Bodoni Moda italic
  - Demo conversation thread (replace the existing demoMessages) — the AI
    helps book an appointment, suggests services based on what the user wants
  - Input field styled like a vintage telegram form
- **Contact form section:**
  - Walnut background, cream text
  - Heading: "Step into the chair" (Bodoni Moda)
  - Single-column form: name, phone, preferred barber, preferred service
  - Submit button: chrome shine hover
- **Footer:**
  - Deep walnut (#1a1108)
  - A red+white barber-pole stripe runs across the top edge of the footer
    (rotating animation continues into footer)
  - Small hours-of-operation table, address, phone — all in IBM Plex Mono

## 4. Files to modify / create

**Primary:**
- `app/barbershop/page.tsx` — full rewrite (current is 273 lines, ~16KB; new
  will be 800-1200 lines for the chrome plate, marquee, AI chat, etc.)

**Do NOT touch (per orchestrator's role):**
- `app/salon/page.tsx`
- `app/d/[slug]/page.tsx` (the dynamic route that picks vertical — already
  routes `vertical: "barber"` → `BarbershopPage` per the current commit)
- `app/demo/page.tsx` (the demo hub)
- `app/electrical/page.tsx`, `app/hvac/page.tsx`, etc.

**Reference for component DNA (look at, don't copy from):**
- `app/salon/page.tsx` — for the "salon" macrostructure pattern (vertical
  routing already works)
- `components/ui/cosmic-button.tsx` — chrome shine hover pattern
- `components/ui/animated-number.tsx` — for the marquee price ticker
- `components/ui/dither-image.tsx` — for the hero photo treatment
- `components/ui/lightboard.tsx` — for the AI chat panel
- `components/ui/grid-beam.tsx` — for background grid texture under the
  marquee
- `components/ui/bg-animated-gradient.tsx` — for the persistent background
  animation under the page

**Required assets:**
- `public/barbershop/hero-vintage.jpg` — full-bleed vintage barbershop photo
  (download from Unsplash, save to `public/barbershop/`, do NOT hotlink)
- `public/barbershop/marquee-stripe.svg` — barber-pole pattern for the
  rotating animation
- `public/barbershop/scissors-icon.svg` — for the AI chat icon (custom
  vintage-style, not a stock icon)

## 5. Component breakdown (8 mandatory components per vertical-build-checklist)

1. **Top nav** — Sticky. Wordmark "Bayside" left (Bodoni Moda italic), nav
   links center (DM Sans as UI-only fallback), "Book" CTA right (chrome
   shine button). Hairline border-bottom (`1px solid rgba(43, 29, 18, 0.1)`)
   on warm paper, becomes `rgba(230, 224, 210, 0.1)` in dark mode.
2. **Hero (Marquee Hero macrostructure)** — Full-bleed photo + dark overlay,
   Bodoni Moda headline, subhead, dual CTA, rotating barber-pole on the
   right or bottom edge. Slow Ken-Burns drift on the photo.
3. **Marquee price ticker** — Continuously scrolling strip under the hero,
   IBM Plex Mono prices in a single line, barber-pole animation riding
   along the top edge. Pauses on hover.
4. **Services grid (6 chrome plates)** — 3-column on desktop, 2 on tablet,
   1 on mobile. Each plate is a scroll-reveal chrome plate with engraved
   price tag, description, and "Book" CTA revealed on hover.
5. **AI concierge chat** — Slide-up panel from bottom-right, vintage
   typography header, demo conversation thread, telegram-style input field.
   Show as a "preview" state with 4 messages pre-loaded (replace
   `demoMessages` content).
6. **Trust marquee strip** — Single-line scrolling marquee (separate from
   price ticker) with "Master Barbers / Walk-Ins Welcome / Hot Towel Service
   / Est. 2014" — IBM Plex Mono, all-caps, bullet separators. Continuous
   left-to-right scroll.
7. **Contact form section** — Walnut background, cream text, "Step into the
   chair" heading (Bodoni Moda), single-column form (name, phone,
   preferred barber, preferred service), chrome-shine submit button.
8. **Footer** — Deep walnut (#1a1108) with a red+white barber-pole stripe
   along the top edge, hours/address/phone in IBM Plex Mono, "Bayside
   Barbershop" wordmark in Bodoni Moda, "Talk to AEXON AI" CTA linking to
   aexonai.com (per aexon brand integration rule).

**Bonus components (use 2+ of these for variety):**
- **Testimonial scroll** — 2-3 short customer quotes in Bodoni Moda italic,
  on a chrome-tinted background
- **"Meet the barbers" mini-section** — 2-3 barber portraits + names +
  specialties
- **"Walk-ins welcome" big-type callout** — A poster-style section with
  massive Bodoni Moda type declaring the walk-in policy

## 6. Animation requirements (specific timings)

- **Barber-pole rotation:** 1.2s linear infinite, always visible (opacity
  1.0), 8 stripes (4 red, 4 white alternating)
- **Hero Ken-Burns drift:** 30s ease-in-out infinite alternate, scale 1.0
  → 1.05
- **Marquee price ticker:** 40s linear infinite (full sweep)
- **Service plate scroll-reveal:** 600ms cubic-bezier(0.16, 1, 0.3, 1)
  (ease-out-quart), translateY 24px → 0, opacity 0 → 1, with chrome-shine
  background-position shift (0% → 100%) over 800ms
- **Service plate idle float:** 4s ease-in-out infinite, translateY 0 →
  -2px → 0, staggered by 200ms per plate
- **Button chrome shine:** 600ms ease-out, linear-gradient overlay
  translateX(-100%) → translateX(100%)
- **AI chat open/close:** 350ms cubic-bezier(0.16, 1, 0.3, 1),
  translateY(100%) → 0
- **Trust marquee:** 30s linear infinite
- **Reduced motion:** all animations collapse to ≤150ms opacity crossfade

## 7. Hard constraints (DO NOT VIOLATE)

- **No emoji icons anywhere** — use proper SVG icons
- **No inline OKLCH/hex mid-render** — declare all colors as CSS custom
  properties on `:root` of `app/globals.css` (or a new `app/barbershop/
  tokens.css` if appropriate) and reference by name
- **No re-drawn chrome** (fake browser bars, fake phone frames, etc.) —
  Hallmark rule
- **No blue/purple gradients** — brand-trends-2026 hard ban
- **No "warm cream + burnt-orange + serif"** — the Claude look
- **No Bebas Neue or IBM Plex Sans for headlines** — those are electrical's
  family. Use Bodoni Moda.
- **No `opacity: 0` for more than the first/last 15% of any keyframe** —
  always-visible animation rule from codex skill
- **No horizontal scroll at 320/375/414/768px** — Hallmark mobile rules
- **No two-line clickable text** (buttons, nav links) — Hallmark mobile rule
- **`getComputedStyle` verification** — after build, run the recipe in
  `references/codex-css-verification.md` on every text color in light +
  dark mode. All body text must be `rgb(...)` at full opacity, not
  `rgba(..., 0.6)`.

## 8. Verification checklist before handing back

- [ ] `npm run build` passes clean (0 errors)
- [ ] Lighthouse: all 4 scores ≥ 90 in light mode
- [ ] No horizontal scroll at 320 / 375 / 414 / 768 / 1024 / 1440px
- [ ] Light mode + dark mode both verified via browser preview
- [ ] Every animation visibly plays (no invisible-by-opacity failures)
- [ ] `getComputedStyle().color` returns `rgb()` at full opacity for every
  body text element
- [ ] Page renders the original Bazzy-approved /barbershop structure (top
  nav → hero → marquee → services grid → AI chat panel → trust marquee →
  contact form → footer) but with the NEW vintage visual language
- [ ] The page is recognizably NOT a reskin of the electrical vertical
- [ ] `/d/bayside-barbershop/` still routes correctly to this new component
  (the dynamic route in `app/d/[slug]/page.tsx` should not need changes)
- [ ] `REACH_MESSAGE.txt` written to repo root with: (a) what changed,
  (b) the live preview URL after local dev server starts, (c) the demo
  route for prospects
- [ ] All 10 standing requirements from §2 verified
- [ ] All 8 component parts from §5 implemented
- [ ] All animation timings from §6 match

## 9. What this brief is NOT

- Not a hue rotation of the previous barbershop file (charcoal + amber
  + Bebas Neue)
- Not a reuse of the electrical or salon's component DNA
- Not a stripped-down "good enough" version — Bazzy's bar is
  "BEAUTIFUL and Well Designed"
- Not a v1 — this is a full rebuild of `app/barbershop/page.tsx`,
  not an incremental patch
- Not pushed to Vercel without explicit "push" command from Bazzy

## 10. Open questions for the orchestrator (if Codex hits them)

- If Unsplash returns no acceptable vintage barbershop photo, use the
  `image_generate` skill to create one (or fall back to a generic
  warm-lit interior photo with heavy sepia treatment)
- If `npm run build` fails on font imports, fall back to Bodoni FLF or
  Big Caslon via Adobe Fonts, then Cormorant Garamond as last resort
  (still a serif, still a 1940s magazine feel)
- If the shadcn `cosmic-button` or `grid-beam` components don't fit the
  vintage aesthetic, build custom CSS animations instead — do not force
  the shadcn components if they read as "AI-generated"
