# Streetwear Brand Vertical Build Brief — NOIR Apparel

## Project / deploy target

Work in the actual Vercel deploy repo:

`/tmp/demo-staged-website-factory`

Live site deploys from GitHub repo:

`AEXON-AI-AGENCY/demo-staged-website-factory`

Do not edit the nested workspace copy.

## Goal

Complete the Streetwear Brand vertical as a full live demo with its own dedicated route and a landing-page tile that is no longer coming soon.

The live route must be:

`/streetwear`

The landing page must change from:

`15 live · 4 coming soon`

to:

`16 live · 3 coming soon`

The Streetwear Brand tile must be clickable and route to `/streetwear`.

## Files allowed

You may create/edit only:

- `app/streetwear/page.tsx`
- `app/streetwear/page.module.css` if using CSS modules
- `app/page.tsx` for tile count + staged flag only
- `docs/briefs/streetwear-build-brief.md` only if appending implementation notes
- `REACH_MESSAGE.txt` optional handoff summary

Do not modify other verticals.

## Business identity

Vertical: Streetwear Brand
Demo business: NOIR Apparel
Positioning: drop-driven Brooklyn streetwear label. Limited capsule releases, waitlist, lookbook, size guide, restock alerts, wholesale/creator inquiries.

This must NOT feel like the existing Clothing Brand demo. Streetwear should be rawer, sharper, more editorial, more drop-culture, more underground.

## Design direction to infer

Audience: young fashion buyers, local creatives, artists, stylists, streetwear shoppers, brand founders evaluating whether AEXON can build a hype-driven commerce site.

Use case: convert interest into drop waitlist signups, product exploration, lookbook browsing, and contact/wholesale inquiries.

Tone: editorial, underground, bold, high-contrast, fashion-magazine meets street poster. Think: blacktop, wheatpaste posters, garment tags, drop countdowns, flash photography, grid editorial, neon/yellow warning tape accents.

## Visual identity

Use a streetwear-specific design language:

- Base: carbon black / asphalt / bone white
- Primary accent: acid yellow or volt green
- Secondary accent: washed red / safety orange / electric violet used sparingly
- Texture: paper grain, halftone, stitch lines, garment tag labels, barcode marks, oversized type
- Layout: editorial lookbook / drop poster / irregular product cards, not SaaS cards
- Typography: bold condensed display + tight grotesk/mono utility type. Avoid generic Inter-only.

No emoji icons. Use SVG, CSS shapes, text treatments, garment tags, barcodes, or lucide-style icons.

## Required page components

Build a full `app/streetwear/page.tsx` demo with all required vertical components, adapted to streetwear:

1. Sticky nav with NOIR Apparel, Drop / Lookbook / AI Stylist / Join Waitlist anchors, inline light/dark toggle.
2. Hero: oversized fashion/drop headline, tagline, two CTAs: `Join Drop List` and `Chat with our Stylist`.
3. Drop/product cards: at least 4 cards for limited hoodie, utility jacket, graphic tee, cargo pant / capsule pieces.
4. AI Stylist chat demo: realistic conversation showing AI recommending sizes, fit, drop reminders, cart/help, and waitlist capture.
5. Trust/proof badges: limited-run capsule, secure checkout, size exchange, local pickup, drop alerts, creator/wholesale routing.
6. Contact/waitlist form: opaque/readable panel. Fields: name, phone/email, preferred size, item interest, drop alert preference, notes.
7. Footer with phone/email/CTA.
8. Bidirectional scroll animations via IntersectionObserver: add class on entry, remove on exit. No `unobserve()` in callback. `disconnect()` only in cleanup.
9. Persistent background image or atmospheric background relevant to streetwear/fashion that carries through the page. If using external images, ensure Vercel works with it or use a CSS/pattern background. Dark overlay required.
10. Always-visible vertical-specific animation. Good options: scrolling barcode strips, garment-tag swing, drop countdown pulse, sticker/poster layer drift, stitch-line scan. Use CSS/SVG, not canvas. Animation must remain visible and support reduced motion.
11. Responsive at 320/375/414/768 px.
12. WCAG AA contrast in light mode and dark mode.

## Landing page update

In `app/page.tsx`:

- Set `STAGED["streetwear"]` from `true` to `false`.
- Update badge from `15 live · 4 coming soon` to `16 live · 3 coming soon`.
- Keep `demoUrl: "/streetwear"`.
- Do not change other verticals.

## Anti-reskin constraints

Must differ clearly from:

- Clothing Brand: no soft ecommerce/fashion-forward brand look. Streetwear must be drop/hype/editorial.
- Recording Studio: no neon recording console motif.
- Barbershop: no vintage card/pole/chrome language.
- Tech/ecommerce: no generic SaaS cards or supplement ecommerce layout.

Specific differentiators:

- Hero can use poster/wheatpaste/drop-sheet layout.
- Product cards can feel like garment tags or lookbook contact sheets.
- Use oversized type, barcode/care-label details, price/drop/time markers.
- Form can feel like a drop-list signup sheet.

## Implementation constraints

- Next.js App Router.
- Client component allowed.
- Use `next/font/google` if fonts are added.
- Respect `prefers-reduced-motion`.
- No invented fake metrics. Use concrete drop/product labels instead.
- Do not add secrets, env files, node_modules, or generated junk.
- Build must pass: `npm run build`.

## Verification expected before handoff

After implementation:

1. `npm run build` passes.
2. `grep` confirms:
   - `/streetwear` route exists
   - `16 live · 3 coming soon` exists in `app/page.tsx`
   - `"streetwear": false` in `STAGED`
3. Commit locally with a clear message.
4. Do not claim live until the deploy is pushed and verified by curl/browser against `demo.aexonai.com`.

## Handoff summary

If writing `REACH_MESSAGE.txt`, keep it concise: what NOIR Apparel demonstrates, route path, and what makes the vertical distinct.
