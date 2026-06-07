# SALON — Hallmark Design Brief
**Vertical:** Glow Studio Salon
**File:** `app/salon/page.tsx`
**Status:** Exists but basic — needs Hallmark redesign
**Live:** `demo.aexonai.com/salon`

## Spec (Non-Negotiable)

| Element | Value |
|---------|-------|
| Display font | Cormorant Garamond (editorial, elegant serif) |
| Mono label font | Cinzel (labels, tags) |
| Body font | DM Sans |
| Background | `#0D0611` (deep plum) |
| Surface | `rgba(255,255,255,0.04)` |
| Text | `#F5F0F7` |
| Accent | `#F472B6` hot pink |
| Secondary | `#C084FC` soft purple |
| Warm accent | `#EC4899` |
| Animation | Canvas polish drip (8 vertical streaks) + shimmer particles (4 floating upward) |

## Sections (in order)

1. **Nav** — sticky, dark-glass, elegant logo left, "Book Now" CTA right (pink gradient pill)
2. **Hero** — Cormorant Garamond large editorial, "GLAMOUR / Redefined" two-line, gradient accent on "Redefined", eyebrow pill "Glow Studio Salon", editorial layout
3. **Services** — image-forward cards (icon + service name + short desc), minimal text, rounded corners, shimmer on hover
4. **AI Agent Demo** — "Your AI Stylist Coordinator" — live chat widget mockup showing user booking a hair appointment → AI shows availability → confirms with time and stylist preference
5. **Trust badges** — Cinzel inline badges: "Since 2018", "5★ Yelp", "Organic Products", "Gift Cards Available"
6. **Contact form** — Name, Phone, Service dropdown (Hair / Nails / Spa / Makeup), preferred date, Message
7. **Footer** — plum dark, elegant, social links

## Canvas Animation
8 polish drips falling vertically from top (pink/purple, slow fall), 4 shimmer particles floating upward diagonally (sparkle). Canvas fixed zIndex 0.

## Theme Toggle
Dark/light toggle, localStorage persist, `mounted` guard. Light mode: pink/purple on cream/white. Same animation at reduced opacity.

## AI Agent Demo Section
- Dark glass card, centered
- "AI Stylist Coordinator" badge (pink gradient)
- Live chat mockup: user asks about weekend appointment → AI shows available slots → confirms booking
- Typing indicator animation
- "This is what your clients experience" caption

## Rules
- All fonts via `next/font/google` — Cormorant_Garamond, Cinzel, DM_Sans
- All colors via `const c = isDark ? {...} : {...}` — no inline hex
- Canvas animation with `useRef` + `useEffect` + `requestAnimationFrame`
- No Tailwind utility classes
- `npm run build` must pass 0 errors before deploy