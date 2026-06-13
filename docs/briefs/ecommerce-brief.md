# E-COMMERCE — Vertical Build Brief (Pinterest-style masonry, image-first)

**Vertical:** Vitality Nutrition
**File:** `app/ecommerce/page.tsx` (does not exist yet — create it)
**Route:** `/ecommerce` → `demo.aexonai.com/ecommerce` after deploy
**Stack:** Next.js 16.2.6 (Turbopack), React 19, `next/font/google`, inline styles (NO Tailwind utilities)
**Status:** Brand new file. **DO NOT MIRROR `app/insurance/page.tsx` or any previous vertical.** Insurance was Carbon-flat / data-dense / IBM Plex. E-Commerce must be the opposite: image-first, color-driven, soft cards on a cream canvas, with the **same atmospheric production value** (background image, persistent particles, bidirectional tile-float, button hovers) the user just praised.

---

## Brand & Data (from `lib/verticals.ts["ecommerce"]`)

| Field | Value |
|-------|-------|
| Name | Vitality Nutrition |
| Tagline | Fuel Your Best Self. |
| Industry | E-Commerce |
| Location | Portland, OR |
| Accent (dark) | `#10b981` (emerald, on dark bg) |
| Accent (light) | `#059669` (deeper emerald, for light mode) |
| Phone | `(971) 555-0674` |
| Email | `support@vitalitynutrition.co` |
| Address | `2100 SE Burnside Rd, Portland, OR 97214` |
| Hours | `Mon–Fri: 8AM–8PM (Customer Support)` |
| Services | Protein Powders · Pre-Workout · Vitamins & Minerals · Meal Replacements · Gift Cards |
| About | Science-backed supplements made with clean ingredients. 60-day money-back guarantee. |
| CTA | "Shop Now" |
| CTA sub | "Free shipping on orders over $50" |

---

## Voice & Content (e-commerce, NOT insurance/copy-of-last-3)

E-commerce is a **product showcase + buy flow**. The page exists to drive a purchase, not a quote. Voice: confident, ingredient-nerd-friendly, customer-reviews-forward. Show products prominently, show prices, show reviews. No "30+ carriers", no "free case review", no "schedule a walkthrough."

Use e-com language: cart, checkout, add to bag, subscribe & save, ingredients, servings, scoop, RDA, NSF certified, lab-tested, customer reviews, free shipping over $X, money-back guarantee. Real product categories: Whey Protein, Plant Protein, Pre-Workout, Multivitamin, Magnesium Glycinate, Creatine Monohydrate, etc.

---

## Spec (Non-Negotiable — deliberately different from insurance)

| Element | Value | Why different |
|---------|-------|---------------|
| **Display font** | **Fraunces** (variable serif, soft & modern, fits editorial e-com like Glossier/Magic Spoon) | Insurance: IBM Plex Sans Light 300. E-Com: warm editorial serif. |
| **Body font** | **DM Sans** | Insurance: IBM Plex Sans. E-Com: humanist sans, friendlier. |
| **Border radius** | **Generous 16-24px** on cards, 999px (pill) on buttons, 12px on inputs | Insurance: 0px (Carbon rectangles). E-Com: friendly rounded. |
| **Shadows** | **Soft, multi-layered drop shadows** on cards: `0 4px 12px rgba(0,0,0,0.04), 0 12px 28px rgba(0,0,0,0.06)`. Shadows ARE the depth language here. | Insurance: zero shadows. E-Com: soft shadows. |
| **Background** | Warm cream `#faf7f2` light / `#0d1f17` (deep forest) dark + **Unsplash botanical photo overlay** (think lush green leaves, matcha powder, fresh ingredients) | Insurance: white/black + Miami. E-Com: warm cream + botanical. |
| **Persistent particles** | Small **leaf-shaped SVG** elements (or simple rounded squares in emerald) drifting upward | Insurance: shield outlines. E-Com: leaves. |
| **Accent** | Emerald `#059669` light / `#10b981` dark | Insurance: IBM Blue 60. |
| **localStorage key** | `vitality-nutrition-theme` | — |
| **WCAG** | AA contrast minimum. | — |

---

## Macrostructure: Visual Catalogue (deliberately NOT the insurance tool-led structure)

Insurance was: nav → quote tool hero → rate table → 3 product bands → AI advisor → trust grid → coverage stats → contact.

**E-Commerce is a visual catalogue pattern (Pinterest-masonry / Magic Spoon / Glossier style):**

1. **Nav** (sticky, semi-transparent white with backdrop blur on scroll, logo + 4 nav links + cart icon with badge + theme toggle)
2. **Hero with featured product** (NOT a tagline — a real product image card right on first paint, headline is a short brand promise: "Clean ingredients. Real results.", CTA "Shop Whey Protein →", right side shows one large product mockup card with rating stars and price)
3. **Product category filter strip** (horizontal pills: All · Protein · Pre-Workout · Vitamins · Bundles · Sale) — clicking a pill is a no-op visually but the active pill has the emerald accent. This is the e-com navigation pattern.
4. **Pinterest-style masonry product grid** (THE HERO of the page — 8-10 product cards in 3-column masonry layout with varying card heights, each card is a tall product photo + name + price + rating + "Add to cart" button). Real supplement products with realistic names like "Grass-Fed Whey Isolate", "Plant Protein Blend", "Pump Pre-Workout", "Daily Multivitamin", "Magnesium Glycinate 400mg", "Creatine Monohydrate Micronized", etc. Prices $24.99-$59.99. Ratings 4.6-4.9 stars.
5. **Bundle callout** (a single full-width card with a soft gradient background, two product mockups, "Build Your Bundle" headline, "Save 15%" tag, single CTA)
6. **Customer reviews strip** (3 review cards in a row, real-sounding: "Sarah M." 5 stars about Whey, "James K." about Pre-Workout, "Priya R." about Multivitamin. Avatar circles, verified-buyer badge, body text + product name)
7. **Science / Lab-tested section** (3 small cards: "NSF Certified", "Third-Party Lab Tested", "60-Day Money-Back Guarantee" with leaf icon — the e-com trust pattern, NOT 4 numbered steps)
8. **AI Supplement Quiz** (smaller card, like insurance's AI Advisor: "Find Your Stack" with a 2-3 turn mock conversation where the user describes a goal and the AI suggests a stack)
9. **FAQ accordion** (4 questions: "How do subscriptions work?" / "When will my order ship?" / "Is this safe if I'm pregnant?" / "What's your return policy?" — single-column, expand on click, the standard e-com Q&A pattern)
10. **Footer** (dark deep-forest `#0d1f17`, brand + tagline, 4-column link grid, social row, copyright)

That's 10 components, all visually distinct from insurance's pattern. **E-commerce doesn't need 12** — it needs a product grid and a buy flow.

---

## Required atmospheric production value (the things the user just praised on insurance)

All four must be present and working — but the **flavor** changes to match e-com:

1. **Background image** — Unsplash photo of botanical/fresh-ingredients vibe (think: matcha, fresh greens, herbs, mortar and pestle, fresh powder). Portland, OR brand voice. Cream gradient overlay at 0.65-0.80 alpha so the data is readable.

2. **Persistent background animation** — 12-16 small **leaf-shaped** (or simple emerald rounded-square) particles rising upward over 16-22s with staggered delays. Lower opacity (0.14) than insurance shields so the cream background reads more clearly. Different shape from insurance's rotated squares.

3. **Bidirectional scroll-in tile animations** — `.scroll-animate` class reworked same as insurance: opacity + translateY(36px) + scale(0.96) → 1, with IntersectionObserver that removes the class on exit so tiles re-float on re-entry. **20-30 tile-stagger children** (the 8-10 product cards, the 3 review cards, the 3 trust cards, the 4 FAQ items, etc.) — staggered per-child delays 50-90ms for cascade.

4. **Button hovers:**
   - **Primary "Shop Now" / "Add to cart" buttons**: emerald → deeper emerald (`#059669` → `#047857`), 2px lift, soft green glow shadow, animated shimmer sweep
   - **Category pill buttons**: bg flip to emerald with white text on hover, 2px lift
   - **Product cards**: lift -6px on hover, shadow intensifies, "Add to cart" button slides up into view from below the price
   - **FAQ questions**: emerald left-border grows from 0 to 4px on hover, subtle bg tint
   - **"Subscribe & Save" toggle**: slides to active state, color shift
   - **Footer link columns**: emerald underline animates in on hover
   - **"Bundle callout" CTA**: pulse glow on idle (subtle, 2s loop)

Plus the 4 things from the prior atmospheric set must still be present:
   - `prefers-reduced-motion: reduce` (collapse to 1ms)
   - Mobile responsive (collapse to 1-column at <640px, 2-column at <920px, 3-column at full)
   - WCAG AA contrast
   - Theme persistence in localStorage

---

## Pinterest-style masonry grid (component #4) — full spec

This is the visual signature. Implementation approach:
- Use CSS `column-count: 3` masonry (the modern CSS way) OR a JS-calculated absolute-positioned grid. **Prefer CSS `column-count` for simplicity** (works well in all modern browsers, no JS needed).
- 8-10 product cards, varying intrinsic heights (3-5 different heights so the masonry actually staggers)
- Each card: 
  - Tall product photo (Unsplash, e.g. `photo-1593095948071-474c5cc2989d` for supplement bottle on neutral background, or `photo-1622480916113-9000ac49b79d` for protein powder)
  - 4-5 star rating (★★★★½ style, 5 real Unicode stars with the last one possibly muted)
  - Product name (Fraunces serif, 18px, weight 600)
  - Short tagline (12-14px, DM Sans, color #525252, 1 line)
  - Price + per-serving helper (Fraunces 18px bold + small DM Sans 12px "$1.79/serving" helper)
  - "Add to cart" emerald button (999px pill, 36px tall, full-width within card)
  - Tag chip (top-left of photo): "Bestseller" / "New" / "Subscribe & save 15%" — small pill with soft background
- Cards have 16-24px border-radius, soft multi-layer shadow, on the cream background
- **Hover behavior on the product card** (this is the wow moment): the whole card lifts -6px, shadow deepens, AND the "Add to cart" button's bg transitions from emerald → deeper emerald with a 1px scale-up

Product data (use these names, prices, ratings — keep them realistic):
1. "Grass-Fed Whey Isolate" — 5lb bag — $54.99 — 4.9★ (2,847 reviews) — "25g protein · Unflavored" — Bestseller
2. "Plant Protein Blend" — 1.5lb bag — $42.99 — 4.7★ (1,203 reviews) — "20g plant protein · Vanilla" — New
3. "Pump Pre-Workout" — 30 servings — $34.99 — 4.8★ (876 reviews) — "200mg caffeine · Blue Raspberry" — 
4. "Daily Multivitamin" — 60 capsules — $24.99 — 4.6★ (3,102 reviews) — "Whole-food sourced" — Bestseller
5. "Magnesium Glycinate 400mg" — 90 capsules — $19.99 — 4.9★ (1,567 reviews) — "Sleep + recovery"
6. "Creatine Monohydrate Micronized" — 300g — $29.99 — 4.8★ (942 reviews) — "5g per serving · Unflavored"
7. "Hydration Electrolyte Powder" — 40 stick packs — $32.99 — 4.7★ (634 reviews) — "1,000mg sodium · Lemon" — New
8. "Sleep + Calm Blend" — 30 capsules — $27.99 — 4.8★ (489 reviews) — "L-theanine + GABA"
9. "Founders Bundle" — 3-pack — $119.99 — 4.9★ (412 reviews) — "Whey + Multivitamin + Magnesium" — Save 20% — Bundle
10. "Gift Card" — $50 / $100 / $150 — $50.00 — 4.9★ (87 reviews) — "Delivered instantly" —

Image URL pattern: use Unsplash supplement/bottles/powder product photos. Some real Unsplash IDs that work: `photo-1593095948071-474c5cc2989d`, `photo-1622480916113-9000ac49b79d`, `photo-1556909114-f6e7ad7d3136`, `photo-1579722820903-2db8c1f5a1ce`. Pick a variety — different sizes/angles.

---

## Bundle callout (component #5) — full spec

- Full-width card, soft gradient background (subtle emerald-to-cream diagonal, ~15deg)
- Left half: 2 stacked product photos (the whey + multivitamin, slightly overlapping)
- Right half: "Build Your Bundle" (Fraunces 36px serif), "Save 15% when you bundle 3+ products. Free shipping on every bundle." (DM Sans 16px), and an emerald "Build your stack →" pill button
- Tag: emerald pill in top-right "15% OFF"

---

## Customer reviews (component #6) — full spec

3 review cards in a row. Each:
- Avatar circle (initials, 48px, soft emerald bg, white text)
- "Verified Buyer" small badge
- 5 filled stars
- Quote (Fraunces italic serif 16px, 3-4 lines): real-sounding, product-specific
- Name + product name (DM Sans 14px)
- 16-20px border-radius, soft shadow, cream background

Example reviews (write 3 of these or similar):
- Sarah M. · "Whey Isolate" · ★★★★★ · "Tastes like nothing — which is exactly what I want. Mixes clean, no bloating, my recovery is noticeably faster. Subscribed monthly."
- James K. · "Pump Pre-Workout" · ★★★★★ · "I've tried 8 pre-workouts. This is the first one that doesn't make me crash. Clean energy for 90 minutes, no jitters. Worth every dollar."
- Priya R. · "Daily Multivitamin" · ★★★★★ · "Took a blood test before and 6 months after. My D and B12 levels are now in range for the first time in years. Whole-food sourced actually matters."

---

## Science / Lab-tested (component #7) — full spec

3 small cards on a soft emerald-tinted background panel:
- "NSF Certified for Sport" (leaf icon, Fraunces 18px, "Independently tested for banned substances")
- "Third-Party Lab Tested" (leaf icon, "Every batch tested for purity and potency")
- "60-Day Money-Back Guarantee" (leaf icon, "Don't love it? Full refund, no questions")

Each card: small leaf SVG (use a simple inline `<svg>` with 3 points making a stylized leaf shape in emerald) + label + helper text. NO emoji. The leaf SVG is the e-com equivalent of insurance's shield outline.

---

## AI Supplement Quiz (component #8) — full spec

Smaller card (the equivalent of insurance's AI Advisor — don't make this a giant 2-col layout). Single card on a soft cream background with a thin emerald border:
- Header: "AI SUPPLEMENT QUIZ" eyebrow in IBM Plex Mono 12px — wait, **NOT IBM Plex Mono here**, use DM Sans Mono or JetBrains Mono 12px with 0.32px letter-spacing, emerald color
- Headline: "Find your stack in 60 seconds." (Fraunces 24px)
- 2-3 turn conversation (data-driven, friendly, no corporate language):
  - **User:** "I'm 35, lift 4x/week, sleep poorly. What should I take?"
  - **AI:** "For your goals: Whey Isolate (recovery) + Magnesium Glycinate (sleep) + Creatine (strength). Want me to build a 3-pack bundle — saves you 15%?"
  - **User:** "Yes, build it."
  - **AI:** "Done. Founders Bundle added to your cart. 3 products, $119.99, free shipping. Want to keep shopping or checkout?"

---

## FAQ accordion (component #9) — full spec

4 questions, single-column. Each:
- Question (Fraunces 18px, weight 500, on click: emerald left-border grows 0→4px, background tints to soft emerald, +/- icon rotates)
- Answer (DM Sans 15px, color #525252, slides down on click)
- Use a small chevron SVG that rotates 0→180deg on open
- Questions:
  1. "How do Subscribe & Save orders work?"
  2. "When will my order ship?"
  3. "Are these safe if I'm pregnant or nursing?"
  4. "What's your return policy?"

State: only one open at a time. Click another to close the previous.

---

## Footer (component #10) — full spec

- Dark deep-forest `#0d1f17` background
- 4 columns: Shop (Protein, Pre-Workout, Vitamins, Bundles, Sale) / Learn (Science, Blog, Quiz, FAQ) / Company (About, Sustainability, Careers, Press) / Support (Contact, Shipping, Returns, Track Order)
- Brand name "Vitality Nutrition" + tagline "Fuel Your Best Self." (Fraunces 24px)
- Social row (3-4 simple SVG icons: Instagram, TikTok, YouTube, X — 24px, color #c6c6c6, hover emerald)
- Copyright: "© 2026 Vitality Nutrition · Made in Portland, OR · NSF Certified"

---

## Don't do (patterns banned because they were overused or wrong for this vertical)

- **NO IBM Plex Sans or IBM Plex Mono** (insurance's font — wrong voice for friendly e-com)
- **NO 0px border-radius** (Carbon rectangles — wrong voice)
- **NO shield-shaped particles** (use leaves or simple rounded squares)
- **NO "30+ carriers" / quote tool / rate comparison table** (insurance pattern)
- **NO 4 numbered process steps** (used 3x in a row in the previous verticals)
- **NO 4 emoji trust badges** (use leaf SVGs only)
- **NO Playfair Display** (restaurant/real-estate/law-firm)
- **NO Miami/coastal/blue palette** (insurance's Miami photo — wrong vibe for Portland botanical supplements)
- **NO inline emerald = use tailwind classes** — inline styles only
- **NO changes to `lib/verticals.ts`** — the data is already registered
- **NO changes to any other vertical**
- **NO changes to `app/demo/[vertical]/page.tsx`** — that route already works for ecommerce
- **NO changes to `app/page.tsx`** — the icon and listing for ecommerce is already there
- **NO fake reviews as if they're real** — label them clearly as "Sample reviews" in a small eyebrow OR use them as illustrative examples (per hallmark rules, do not invent testimonials without labeling them as placeholders)

---

## Verification (all required)

1. `npm run build` — 0 errors
2. `npm run dev -- -p 3057` (or any open port) and visit `http://localhost:<port>/ecommerce`
3. **The 5 structural checks that prove this is NOT a clone of insurance or the prior 3:**
   - Display font is **Fraunces** (serif), NOT IBM Plex Sans, NOT Playfair Display
   - Border-radius on cards is 16-24px (rounded), NOT 0px (Carbon rectangles)
   - Background is **botanical/cream/forest**, NOT blue Miami, NOT gray Carbon
   - The "products" section is a **Pinterest-style masonry grid**, NOT a rate table, NOT a 4-card service grid, NOT a 4-step process
   - Particles are **leaves or emerald rounded squares**, NOT shield outlines
4. The 4 atmospheric production-value features all present and working:
   - Background image (botanical) visible in gaps between cards
   - Persistent particle animation drifting upward
   - Bidirectional scroll-tile animation (verified: in-view = animated, scrolled-away = not, scroll-back = animated)
   - Button hovers: emerald → deeper emerald, lift, glow, shimmer on primary; bg flip + lift on product cards
5. Toggle light/dark — both modes readable, WCAG AA
6. The opaque contact/FAQ panel fix from `d53aab5` adapted for this vertical (cream background on FAQ/contact card so the dark botanical doesn't bleed through)
7. The "ESTIMATED SAVINGS" / "Add to cart" button hovers are responsive
8. Theme persists across reload (`vitality-nutrition-theme`)
9. Save screenshots to `docs/briefs/screenshots/ecommerce-light.png` and `ecommerce-dark.png`
10. Commit with: `feat: ecommerce vertical — Vitality Nutrition (Pinterest masonry, image-first)`

---

## Working Directory

`/Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory`

## Codex Invocation

```bash
codex exec --dangerously-bypass-approvals-and-sandbox --model gpt-5.5 "$(cat docs/briefs/ecommerce-brief.md)"
```

Model: `gpt-5.5` (default in `~/.codex/config.toml`). Codex CLI 0.139.0 is required.

## Hallmark pre-flight stamp to write at the top of the page's `<style>` block

```css
/* Hallmark · macrostructure: Visual Catalogue (Pinterest masonry) · tone: friendly-editorial
 * theme: Botanical Cream · accent: Emerald #059669 (light) / #10b981 (dark) · mono: JetBrains Mono
 * display: Fraunces (serif, soft & modern) · body: DM Sans
 * differs from insurance: serif display (was IBM Plex) · 16-24px radius (was 0px) · soft shadows ·
 *   botanical bg (was Miami blue) · Pinterest masonry grid (was rate table) · leaf particles
 *   (was shield outlines) · FAQ accordion (was 4 numbered process steps)
 */
```
