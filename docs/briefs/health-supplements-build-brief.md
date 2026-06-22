# Health / Supplements Vertical Build Brief — Vitality Nutrition

## Project / deploy target

Work in the actual Vercel deploy repo:

`/tmp/demo-staged-website-factory`

Live site deploys from:

`AEXON-AI-AGENCY/demo-staged-website-factory`

Do not edit the nested workspace copy.

## Goal

Build the Health / Supplements vertical as a full live demo with a dedicated route:

`/health-supplements`

Update the demo landing page from:

`17 live · 2 coming soon`

to:

`18 live · 1 coming soon`

Flip the Health / Supplements tile from coming soon to live/clickable.

## Files allowed

You may create/edit only:

- `app/health-supplements/page.tsx`
- `app/health-supplements/page.module.css`
- `app/page.tsx` for count + staged flag only
- `public/health-supplements/*` for real downloaded image assets
- `docs/briefs/health-supplements-build-brief.md`
- `REACH_MESSAGE.txt` optional summary

Do not modify other verticals.

## Business identity

Vertical: Health / Supplements
Demo business: Vitality Nutrition
Positioning: a DTC supplement company that needs ingredient transparency, protocol guidance, subscription/bundle clarity, and trust-building education.

This route must feel like a supplement brand that takes efficacy, labels, and routine compliance seriously — not a generic wellness ecommerce shop.

## Original design direction — IMPORTANT

Bazzy explicitly asked the next verticals to be more original. Do not make another soft ecommerce product grid, skincare page, streetwear poster, or green wellness landing page.

Use a **Supplement Facts Operating System** design language:

- Page as a giant supplement label + protocol dashboard + lab bench.
- Macrostructure: `Dosing Protocol Cockpit`, not a hero → cards → chat clone.
- Visual references: ClickHouse/NVIDIA density and high contrast, but translated into nutrition packaging and lab verification.
- Base canvas: off-black / graphite / recycled-white label surfaces.
- Accent: acid-lime or electrolyte-cyan used like a lab marker, plus a small safety-orange warning/accent. Avoid generic green leaf wellness.
- Shapes: squared label panels, perforated seals, dosage ticks, capsule-slot grids, nutrition-facts rules, lot-code labels, tamper-evident strips.
- Typography: condensed industrial display or heavy sans for hero + mono for labels/lot codes + readable sans for body.
- Motion: capsule conveyor / dosage tick scan / electrolyte pulse line. Always visible, CSS/SVG only, reduced motion respected.
- Imagery: real supplement/product/lab/fitness nutrition photos. No blank placeholders.

The page should look like a high-performance nutrition lab system — almost like a label inspection screen — not a lifestyle wellness site.

## Strong anti-reskin bans

Do NOT use:

- Maya Cole skincare’s soft founder dossier, pink/clay glass, creator contact-sheet layout.
- Streetwear’s black/yellow barcode poster/drop language.
- E-commerce’s botanical product grid / Pinterest masonry.
- Insurance’s quote tool / Carbon table clone.
- Restaurant/real-estate/law-firm two-column editorial hero.
- Generic supplement tropes: leaves, yoga silhouettes, vague “clean energy”, big invented clinical metrics, green gradients.

This should look like a different company made it.

## Content strategy

Vitality Nutrition should showcase:

- Transparent product protocols: hydration, protein, magnesium/sleep, greens/daily stack.
- Ingredient clarity: what it does, when to take it, what to avoid mixing, sample supplement-facts style fields.
- Subscription / bundle guidance without fake claims.
- AI Stack Coach: asks goals, dietary restrictions, training schedule, stimulant sensitivity, then recommends a sample protocol and captures subscription/drop reminder.
- Trust language: third-party testing placeholder, lot code lookup, allergen flags, subscription pause, batch transparency. Label placeholders clearly as sample/illustrative when needed.

No fake scientific claims. No invented clinical efficacy percentages. No fake testimonials.

## Required page components

1. Sticky nav with Vitality Nutrition, Protocols / Label Lab / Stack Coach / Subscribe anchors, inline light/dark toggle.
2. Hero as an original protocol cockpit: huge industrial headline, label panel, dosage ticks, real product/lab imagery, CTAs: `Build My Stack` and `Ask the Stack Coach`.
3. At least 4 product/protocol modules with real images: Hydration Primer, Daily Greens, Night Magnesium, Protein Repair or similar. Each module must include use case, timing, caffeine/stimulant/allergen flags, and sample label-style details.
4. Label Lab section: supplement-facts inspired panel/table/cards showing ingredient transparency and warnings. This is a distinct section, not just more cards.
5. AI Stack Coach chat demo: realistic conversation where user describes goals/restrictions, AI recommends a stack + timing and captures subscription/reminder preference.
6. Trust/proof badges: lot lookup, allergen flagging, third-party testing placeholder, easy subscription pause, ingredient education, secure checkout path.
7. Subscribe/contact form: fields for name, email/phone, goal, dietary restriction, stimulant sensitivity, subscription preference, notes.
8. Footer with email/phone/CTA.
9. Bidirectional scroll reveal: IntersectionObserver adds class on entry and removes on exit. No `unobserve()` in callback. `disconnect()` only in cleanup.
10. Persistent background image relevant to supplement/lab/nutrition with overlay; visible in page gaps.
11. Always-visible CSS/SVG animation: capsule conveyor, dosage tick scan, lot-code ticker, or electrolyte pulse. No canvas.
12. Mobile responsive at 320/375/414/768 px; no horizontal scroll; buttons do not wrap awkwardly.
13. WCAG AA light and dark contrast.

## Image requirements

Download real public images into `public/health-supplements/` and use them visibly.

Need at least:

- hero/lab/product image
- product/protocol image 1
- product/protocol image 2
- product/protocol image 3
- background/lab/supplement shelf image

Unsplash is fine. If any URL fails, choose another. Do not ship cards without images.

## Landing page update

In `app/page.tsx`:

- Set `STAGED["health-supplements"]` from `true` to `false`.
- Update `17 live · 2 coming soon` to `18 live · 1 coming soon`.
- Keep `demoUrl: "/health-supplements"`.
- Do not touch food-brand except it remains coming soon.

## Implementation constraints

- Next.js App Router.
- Client component allowed.
- CSS module preferred to keep scope isolated.
- Use `next/image` for real images.
- Use `next/font/google` only if needed and safe with existing build.
- No secrets, env files, generated junk, or unrelated edits.
- `npm run build` must pass.

## Verification expected

Before handoff:

1. `npm run build` passes.
2. Grep confirms:
   - route exists at `app/health-supplements/page.tsx`
   - landing says `18 live · 1 coming soon`
   - `"health-supplements": false`
   - real `/health-supplements/*.jpg` paths exist in page/CSS
   - no `unobserve` in new page
3. Browser-check `/health-supplements` locally or live: real images render, top-of-fold does NOT resemble influencer/skincare/streetwear.
4. Commit locally.
5. Push to origin and verify live HTML after Vercel rebuild.

## Handoff summary

Return concise proof: commit hash, build pass, live URL, exact live `curl` matches, and the originality delta.
