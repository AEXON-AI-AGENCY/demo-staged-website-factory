# Recording Studio Vertical Build Brief — Backblock Studioz

## Project / deploy target

Work in the actual Vercel deploy repo:

`/tmp/demo-staged-website-factory`

Live site deploys from GitHub repo:

`AEXON-AI-AGENCY/demo-staged-website-factory`

Do not edit the nested workspace copy.

## Goal

Complete the Recording Studio vertical as a full live demo with its own dedicated route and a landing-page tile that is no longer coming soon.

The live route must be:

`/recording-studio`

The landing page must change from:

`14 live · 5 coming soon`

to:

`15 live · 4 coming soon`

The Recording Studio tile must be clickable and route to `/recording-studio`.

## Files allowed

You may create/edit only:

- `app/recording-studio/page.tsx`
- `app/recording-studio/page.module.css` if using CSS modules
- `app/page.tsx` for tile count + staged flag only
- `docs/briefs/recording-studio-build-brief.md` only if appending implementation notes
- `REACH_MESSAGE.txt` optional handoff summary

Do not modify other verticals.

## Business identity

Vertical: Recording Studio
Demo business: Backblock Studioz
Location feel: Brooklyn / basement-to-premium creative room, late-night sessions, vocal booth glass, analog warmth, clean booking operations.

This must NOT feel like a generic SaaS site, the electrical site, the barbershop site, or a reskin. It needs its own identity.

## Design direction to infer

Audience: independent artists, podcasters, managers, producers, local labels, and studio owners evaluating whether AEXON can build a studio site that converts session interest into booked time.

Use case: drive bookings for sessions, mixing/mastering, podcast blocks, and beat-store/artist services while showcasing vibe and trust.

Tone: atmospheric, premium, tactile, nocturnal, music-industry credible. Think: analog console glow + modern booking system.

## Visual identity

Use a recording-studio-specific design language:

- Deep charcoal / near-black base
- Warm amber VU-meter glow
- Muted red recording light accent
- Cream/off-white readable text
- Metal/graphite panel surfaces
- Waveform, tape reel, mixer channel, and glass-booth motifs
- Typography should feel distinct from the other verticals: strong condensed or editorial display plus readable modern body. Avoid just Inter everywhere.

Do not use emoji icons. Use SVG, CSS shapes, lucide-react icons, or hand-built shapes.

## Required page components

Build a full `app/recording-studio/page.tsx` demo with all 12 required vertical components:

1. Sticky nav with Backblock Studioz, Services / AI Concierge / Book Session anchors, phone, inline light/dark toggle.
2. Hero section: strong recording-studio headline, tagline, two CTAs: `Book Studio Time` and `Chat with our Concierge`.
3. Services: at least 4 cards covering recording sessions, mixing/mastering, podcast production, beat/artist packages.
4. AI Concierge chat demo: realistic studio booking flow. User asks for a 2-hour vocal session or mix/master package; AI confirms room, engineer, price/time window, deposit or callback.
5. Trust badges: treated booth, engineer included, same-day rough bounce, secure file delivery, etc.
6. Contact/book-session section: opaque panel, readable in light and dark. Form fields: name, phone/email, service type, session length, preferred date/time, project notes.
7. Footer with phone, email, CTA.
8. Bidirectional scroll animations via IntersectionObserver: add class on entry, remove on exit. No `unobserve()` in callback. `disconnect()` only in cleanup.
9. Background image or atmospheric background relevant to recording studios. If using external images, ensure Next/Vercel works with it or download to `public/recording-studio/`. Dark overlay required.
10. Always-visible vertical-specific animation. Use CSS/SVG, not canvas. Good options: rotating tape reels, live VU meter bars, waveform sweep, red REC light pulse. Animation must remain visible, never opacity 0 for most of cycle.
11. Responsive at 320/375/414/768 px.
12. WCAG AA contrast in light mode and dark mode.

## Landing page update

In `app/page.tsx`:

- Set `STAGED["recording-studio"]` from `true` to `false`.
- Update badge from `14 live · 5 coming soon` to `15 live · 4 coming soon`.
- Keep `demoUrl: "/recording-studio"`.
- Do not change other verticals.

## Anti-reskin constraints

Must differ clearly from:

- Barbershop: no vintage barber cards, no cream/red pole language, no salon/barber service menu styling.
- Electrical: no similar charcoal/yellow utility grid feel.
- Tech-company: no generic orbital SaaS/AI node visuals.
- Restaurant/law/insurance: no recycled structure.

Specific differentiators:

- Use studio-console / analog gear layout language.
- Hero can have split-stage composition: left copy, right interactive mixer/VU/tape-deck card.
- Service cards can feel like rack units or channel strips.
- Chat demo can feel like a session booking console.
- Use waveform/meter animation as page signature.

## Implementation constraints

- Next.js App Router.
- Client component allowed.
- Use `next/font/google` if fonts are added.
- Respect `prefers-reduced-motion`.
- No invented fake metrics like `10x faster` unless clearly framed as placeholder. Use concrete service labels instead.
- Do not add secrets, env files, node_modules, or generated junk.
- Build must pass: `npm run build`.

## Verification expected before handoff

After implementation:

1. `npm run build` passes.
2. `grep` confirms:
   - `/recording-studio` route exists
   - `15 live · 4 coming soon` exists in `app/page.tsx`
   - `"recording-studio": false` in `STAGED`
3. Commit locally with a clear message.
4. Do not claim live until the deploy is pushed and verified by curl against `demo.aexonai.com`.

## Handoff summary

If writing `REACH_MESSAGE.txt`, keep it punchy and human: what Backblock Studioz now demonstrates, route path, and what makes it different.
