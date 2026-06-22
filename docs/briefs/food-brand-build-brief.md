# Food / Beverage Brand Vertical Build Brief — Ember & Oak Hot Sauce

## Project / deploy target

Work in the actual Vercel deploy repo:

`/tmp/demo-staged-website-factory`

Live site deploys from:

`AEXON-AI-AGENCY/demo-staged-website-factory`

Do not edit the nested workspace copy.

## Goal

Build the final staged vertical: Food / Beverage Brand.

Dedicated route:

`/food-brand`

Landing page must update from:

`18 live · 1 coming soon`

to:

`19 live · 0 coming soon`

Flip `food-brand` from staged to live/clickable.

## Files allowed

You may create/edit only:

- `app/food-brand/page.tsx`
- `app/food-brand/page.module.css`
- `app/page.tsx` for count + staged flag only
- `public/food-brand/*` for real downloaded image assets
- `docs/briefs/food-brand-build-brief.md`
- `REACH_MESSAGE.txt` optional summary

Do not modify other verticals.

## Business identity

Vertical: Food / Beverage Brand
Demo business: Ember & Oak Hot Sauce
Positioning: a DTC hot sauce / food brand that sells bottles, bundles, recipes, stockist routing, wholesale inquiries, and subscription/restock capture.

This is not a restaurant. This is not a generic ecommerce store. It is a packaged food brand with heat levels, batch notes, recipe pairing, stockist maps, and wholesale routing.

## Original design direction — hard requirement

Bazzy asked to keep getting more original. This is the final vertical, so make it feel like a different company made it.

Use a **Pepper Dispatch / Batch Ledger / Heat Route Map** design metaphor.

The page should feel like a field-to-bottle command board from a small-batch hot sauce company:

- farmer-market crate labels
- stamped batch cards
- Scoville heat route map
- bottle label tears
- recipe pairing tickets
- stockist dispatch slips
- wholesale order clipboard
- charred oak / ember marks
- vinegar-stained paper over deep chili red
- hand-stamped lot codes and flame index

The UI should be punchy and tactile: risograph/neo-brutalist food packaging energy, not warm cream serif restaurant elegance.

## Visual identity

Avoid the generic warm cream + burnt orange + serif “Claude food” look.

Use:

- Canvas: charred black / smoked paprika red / vinegar paper / kraft label / firebrick.
- Accent: fermented chili red, charred oak black, pickle-brine green, label-yellow, small cobalt or blue stamp only if needed.
- Typography: heavy condensed display or chunky grotesk for heat labels; mono for batch/lot codes; readable sans for body. No Playfair, no Fraunces, no restaurant script.
- Radius: mix torn-label rectangles, hard 2px corners, circular bottle-cap seals. Not 16-24px ecommerce cards.
- Texture: paper grain, label tears, halftone pepper dots, stamp borders, scorch marks.
- Motion: conveyor belt of bottle caps, heat-wave line, pepper seed drift, route-map dash animation. Always visible CSS/SVG, no canvas, reduced motion respected.

## Strong anti-reskin bans

Do NOT use:

- Health/Supplements: no dark dosing cockpit, acid-lime lab screen, supplement facts panels, medical/ingredient warning language.
- Influencer Brand: no soft skincare glass/founder dossier/contact-sheet beauty layout.
- Streetwear: no black/yellow drop poster/barcode capsule language.
- Restaurant: no reservation, dining room, catering, table booking, Italian kitchen, chef menu structure.
- Ecommerce/supplements: no generic product grid / subscription cards / botanical greens / Pinterest masonry.
- Tech company: no cyan glow SaaS, no customer-logo strips, no bento dashboard.

This should read as a packaged hot-sauce/food brand with stockists and recipes.

## Content strategy

Ember & Oak should showcase:

- 4 sauces / products with real images: Ember Original, Smoked Oak, Mango Ghost, Verde Spark or similar.
- Heat levels and batch numbers, not fake sales metrics.
- Recipe pairings: tacos, wings, eggs, roasted vegetables, grilled meat, cocktails/mocktails if relevant.
- Stockist / wholesale routing: independent grocers, restaurants, specialty markets.
- AI Sauce Concierge: recommends sauces by heat tolerance, meal, dietary restrictions, and routes to bundle/restock/stockist.
- Trust: small-batch labels, ingredient transparency, allergen notes, shelf-stable shipping, wholesale case routing, secure checkout.

No fake awards, no fake celebrity endorsements, no invented “sold 50k bottles” numbers.

## Required page components

1. Sticky nav with Ember & Oak, Sauces / Heat Map / Sauce Concierge / Stockists anchors, inline light/dark toggle.
2. Hero as a `Pepper Dispatch / Batch Ledger`: massive heat-forward headline, real bottle/pepper/food imagery, batch card, heat route strip. CTAs: `Build a Heat Pack` and `Ask the Sauce Concierge`.
3. Four sauce/product modules with real images, each with batch number, heat index, flavor notes, pairing, allergen/diet note.
4. Heat Route Map section: distinct visual section showing Scoville/heat path or flavor route, not just more cards.
5. Recipe Pairing / Dispatch Tickets section: 3–4 tickets linking sauces to meals.
6. AI Sauce Concierge chat demo: customer describes meal + heat tolerance; AI recommends sauce/bundle, suggests pairing, captures stockist/restock/wholesale preference.
7. Trust/proof badges: ingredient transparency, small-batch labels, allergen notes, shelf-stable shipping, wholesale case routing, secure checkout path.
8. Stockist / wholesale / contact form: name, email/phone, buyer type, heat tolerance, product interest, stockist/wholesale inquiry, notes.
9. Footer with email/phone/CTA.
10. Bidirectional scroll reveal: IntersectionObserver adds class on entry and removes on exit. No `unobserve()` in callback. `disconnect()` only in cleanup.
11. Persistent background image relevant to peppers/hot sauce/kitchen/market with overlay; visible in page gaps.
12. Always-visible CSS/SVG animation: pepper seed drift, bottle-cap conveyor, heat route dash, or flame index sweep.
13. Mobile responsive at 320/375/414/768 px; no horizontal scroll; buttons do not wrap awkwardly.
14. WCAG AA contrast in light and dark mode.

## Image requirements

Download real public images into `public/food-brand/` and use them visibly.

Need at least:

- hero image: hot sauce bottles / peppers / food prep
- sauce image 1
- sauce image 2
- sauce image 3
- sauce image 4
- background image: peppers / market / kitchen / charred food
- optional recipe images for pairing tickets

Unsplash is fine. If any URL fails, choose another. Do not ship blank cards, SVG-only bottles, or placeholder gradients.

## Landing page update

In `app/page.tsx`:

- Set `STAGED["food-brand"]` from `true` to `false`.
- Update `18 live · 1 coming soon` to `19 live · 0 coming soon`.
- Keep `demoUrl: "/food-brand"`.
- Do not touch any other vertical tile.

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
   - route exists at `app/food-brand/page.tsx`
   - landing says `19 live · 0 coming soon`
   - `"food-brand": false`
   - real `/food-brand/*.jpg` paths exist in page/CSS
   - no `unobserve` in new page
3. Browser-check `/food-brand` locally or live: real images render, design does NOT resemble health, influencer, streetwear, restaurant, or ecommerce.
4. Commit locally.
5. Push to origin and verify live HTML after Vercel rebuild.

## Handoff summary

Return concise proof: commit hash, build pass, live URL, exact live `curl` matches, and the originality delta.
