# HVAC — Hallmark Design Brief
**Vertical:** CoolPro HVAC
**File:** `app/hvac/page.tsx`
**Status:** Exists but basic — needs Hallmark redesign
**Live:** `demo.aexonai.com/hvac`

## Spec (Non-Negotiable)

| Element | Value |
|---------|-------|
| Display font | Inter 900 |
| Body font | Inter 400 |
| Background | `#09090b` |
| Accent | `#22d3ee` cyan/ice |
| Warm accent | `#f97316` |
| Animation | Canvas mist particles (40+, slow upward drift, horizontal sway) |

## Sections (in order)

1. **Nav** — sticky, dark-glass, logo left, "Get Quote" CTA right
2. **Hero** — centered, manifesto style, Inter 900 large headline, cyan accent pill badge "CoolPro HVAC", radial gradient hero glow behind headline, single CTA
3. **Services** — 2×2 grid of cards, centered icons, soft borders, hover lifts with cyan glow
4. **AI Agent Demo** — "Your AI Scheduling Assistant Never Takes a Day Off" — live chat widget mockup showing a user booking a maintenance appointment, AI confirms time and asks for contact info
5. **Trust badges** — inline row: "EPA Certified", "Licensed & Insured", "4.8★ Google", "Family Owned"
6. **Contact form** — Name, Phone, Service dropdown (AC Repair / Maintenance / Installation / Emergency), Message
7. **Footer** — dark, logo, warning stripe bottom

## Canvas Animation
40+ mist particles drifting upward (speed 0.3–0.8), horizontal sine sway, fade in/out cycle. Mist particles like refrigerant vapor. Canvas fixed zIndex 0.

## Theme Toggle
Dark/light toggle, localStorage persist, `mounted` guard. Light mode: `#EFF6FF` bg, `#0369A1` accent, `#C2410C` warm.

## AI Agent Demo Section
- Dark glass card, centered
- "AI Scheduling Assistant" badge (cyan)
- Live chat mockup: user asks about AC maintenance → AI responds with same-day availability → books appointment with confirmation
- Typing indicator animation
- "This is what your customers experience" caption

## Rules
- All fonts via `next/font/google` — Inter (900, 400)
- All colors via `const c = isDark ? {...} : {...}` — no inline hex
- Canvas animation with `useRef` + `useEffect` + `requestAnimationFrame`
- No Tailwind utility classes
- `npm run build` must pass 0 errors before deploy