# Influencer Brand Vertical Build Brief — Maya Cole Skincare

## Project / deploy target

Work in the actual Vercel deploy repo:

`/tmp/demo-staged-website-factory`

Live site deploys from GitHub repo:

`AEXON-AI-AGENCY/demo-staged-website-factory`

Do not edit the nested workspace copy.

## Goal

Complete the Influencer Brand vertical as a full live demo with its own dedicated route and a landing-page tile that is no longer coming soon.

The live route must be:

`/influencer-brand`

The landing page must change from:

`16 live · 3 coming soon`

to:

`17 live · 2 coming soon`

The Influencer Brand tile must be clickable and route to `/influencer-brand`.

## Files allowed

You may create/edit only:

- `app/influencer-brand/page.tsx`
- `app/influencer-brand/page.module.css` if using CSS modules
- `app/page.tsx` for tile count + staged flag only
- `public/influencer-brand/*` for real image assets if downloading public/Unsplash images
- `docs/briefs/influencer-brand-build-brief.md` only if appending implementation notes
- `REACH_MESSAGE.txt` optional handoff summary

Do not modify other verticals.

## Business identity

Vertical: Influencer Brand
Demo business: Maya Cole Skincare
Positioning: creator-led skincare line that turns an audience into a real DTC list and product education hub, not just a Linktree.

Maya is a founder/influencer who sells skincare drops, explains routines, routes shade/skin-type questions, captures email/SMS waitlist, and handles creator/retailer inquiries.

This is not a generic beauty salon. This is not a soft ecommerce clone. This is a creator-native skincare brand where story, education, product proof, and list capture all live on one polished site.

## Design direction to infer

Audience: followers, skincare buyers, beauty creators, boutique retailers, founders evaluating whether AEXON can turn creator traffic into owned ecommerce leads.

Use case: convert social traffic into email/SMS signups, product discovery, skin routine recommendations, and wholesale/creator inquiries.

Tone: intimate founder dossier meets glossy skincare lab. Editorial but social-native. Think: mirror selfie contact sheets, ingredient lab cards, creator notes, vertical video reel strips, product shelf closeups, translucent overlays, not a generic pink DTC template.

## Visual identity

Use a creator/skincare-specific design language:

- Base: porcelain, warm ivory, espresso ink, translucent glass, chrome/silver micro-lines
- Primary accent: clay rose / guava / muted berry, not neon pink
- Secondary accent: soft sage or mineral blue for ingredient/skin-barrier cues
- Texture: dewy glass, serum droplets, contact sheet borders, creator note cards, product label stickers, phone-video frame marks
- Layout: creator dispatch board / routine finder / product lab shelf. Not a 4-card SaaS grid. Not streetwear poster. Not supplement ecommerce.
- Typography: elegant high-contrast serif for founder/editorial moments + grounded grotesk for utility + mono only for SKU/ingredient labels. Avoid Playfair/DM Sans clone and avoid Inter-only.

No emoji icons. Use SVG, CSS shapes, product photos, skincare/lab imagery, vertical reel frames, label strips, or line icons.

## Image requirements

Use actual images in the first pass, not abstract placeholders.

Preferred approach:

- Download public Unsplash images into `public/influencer-brand/` with descriptive filenames.
- Use real visible images for:
  1. founder/creator hero or portrait-style visual
  2. product/serum/cream card imagery
  3. routine/lookbook/reel tiles
  4. persistent full-page/background skincare/vanity/lab image layer

If an image URL fails, pick a different public Unsplash image. Do not ship blank cards.

Images should support the tone: skincare bottles, beauty routine, soft bathroom/vanity, creator portrait, product shelf/lab textures. Keep overlays strong enough for WCAG readability.

## Required page components

Build a full `app/influencer-brand/page.tsx` demo with all required vertical components, adapted to influencer-brand skincare:

1. Sticky nav with Maya Cole Skincare, Story / Products / Routine AI / Join List anchors, inline light/dark toggle.
2. Hero: founder-led headline, product/founder image composition, two CTAs: `Join the Drop List` and `Chat with our Routine AI`.
3. Product/routine cards: at least 4 real-image cards for serum, barrier cream, cleanser, SPF/mist or launch bundle. Include specific skin-use labels, not fake metrics.
4. AI Routine chat demo: realistic conversation showing AI asking skin type/concerns, recommending a routine, explaining ingredient fit, and capturing email/SMS waitlist.
5. Trust/proof badges: owned list capture, ingredient transparency, routine quiz, creator/retailer routing, secure checkout, sample shade/skin match guidance. Avoid invented big follower counts.
6. Contact/waitlist form: opaque/readable panel. Fields: name, email/phone, skin concern, product interest, alert preference, creator/retailer inquiry, notes.
7. Footer with email/phone/CTA.
8. Bidirectional scroll animations via IntersectionObserver: add class on entry, remove on exit. No `unobserve()` in callback. `disconnect()` only in cleanup.
9. Persistent background image relevant to skincare/beauty/lab/vanity that carries through the page. Dark/light overlay required; image must be visible in gaps between sections.
10. Always-visible vertical-specific animation. Good options: serum droplet drift, vertical reel-strip scroll, chrome highlight sweep, ingredient ticker, comment-card float. Use CSS/SVG, not canvas. Reduced motion respected.
11. Responsive at 320/375/414/768 px. No horizontal scroll; nav collapses gracefully.
12. WCAG AA contrast in light mode and dark mode. Body text must be readable; avoid low-opacity beige-on-cream.

## Landing page update

In `app/page.tsx`:

- Set `STAGED["influencer-brand"]` from `true` to `false`.
- Update badge from `16 live · 3 coming soon` to `17 live · 2 coming soon`.
- Keep `demoUrl: "/influencer-brand"`.
- Do not change other verticals.

## Anti-reskin constraints

Must differ clearly from:

- Streetwear: no poster/barcode/drop-sheet/yellow-black capsule language.
- Recording Studio: no neon console/dark music motif.
- Ecommerce/supplements: no generic product grid/subscription store layout.
- Salon: no spa-service menu/stylist portfolio structure.
- Law/restaurant/real-estate: no Playfair + two-column editorial hero clone.

Specific differentiators:

- Hero should feel like a founder dispatch board or creator dossier, with real imagery.
- Product cards should feel like product shelf/lab cards, not SaaS cards or streetwear tags.
- Include a vertical reel/contact-sheet section or creator notes panel.
- The AI demo should be a routine finder, not a generic chatbot.
- Forms should feel like a drop-list/routine quiz hybrid.

## Implementation constraints

- Next.js App Router.
- Client component allowed.
- Use `next/font/google` if fonts are added.
- Respect `prefers-reduced-motion` by collapsing animation durations or disabling spatial motion.
- No invented fake metrics, fake follower counts, fake testimonials, or real celebrity names. Use labeled sample content if needed.
- Do not add secrets, env files, node_modules, or generated junk.
- Build must pass: `npm run build`.

## Verification expected before handoff

After implementation:

1. `npm run build` passes.
2. Grep confirms:
   - `/influencer-brand` route exists
   - `17 live · 2 coming soon` exists in `app/page.tsx`
   - `"influencer-brand": false` or equivalent in `STAGED`
   - real image paths appear in `app/influencer-brand/page.tsx` or CSS
   - `unobserve` does not appear in the new page
3. Browser check the route locally or live to confirm real images render and the page does not look like Streetwear.
4. Commit locally with a clear message.
5. Push and verify live only after the local build/browser check passes.

## Handoff summary

If writing `REACH_MESSAGE.txt`, keep it concise: what Maya Cole Skincare demonstrates, route path, what makes it distinct, and verification proof.
