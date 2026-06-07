# ELECTRICAL — Hallmark Design Brief
**Vertical:** Current Electric LLC
**File:** `app/electrical/page.tsx`
**Status:** Exists but basic — needs Hallmark redesign (wrong fonts, needs polish)
**Live:** `demo.aexonai.com/electrical`

## Spec (Non-Negotiable)

| Element | Value |
|---------|-------|
| Display font | Bebas Neue (all-caps, industrial) |
| Mono label font | JetBrains Mono |
| Body font | DM Sans |
| Background | `#050507` (near-black with blue tint) |
| Surface | `rgba(255,255,255,0.02)` |
| Accent | `#fbbf24` amber/gold |
| Secondary accent | `#f97316` electric orange |
| Animation | Canvas lightning bolts (5 bolts, diagonal, staggered flash) |

## Sections (in order)

1. **Nav** — sticky, dark-glass, amber lightning bolt logo left, "Get Quote" CTA right (amber outline button)
2. **Hero** — Bebas Neue all-caps, "CURRENT / ELECTRIC" two-line, amber accent on second line, emergency badge, two CTAs
3. **Services** — numbered 01-04 cards, top accent border (3px amber), industrial tag labels (JetBrains Mono), amber hover glow
4. **AI Agent Demo** — "AI Electrician That Never Sleeps" — live chat widget mockup showing user asking about panel upgrade → AI responds with quote range → books inspection
5. **Stats row** — Bebas Neue large numbers: "25+" Years, "100K+" Jobs, "4.9★" Google, "24/7" Emergency
6. **Trust badges** — JetBrains Mono, inline with sep bars: "Licensed", "Bonded", "Insured", "Same-Day"
7. **Contact form** — Name, Phone, Email, Service dropdown, Message
8. **Footer** — warning stripe divider (repeating amber/black 45deg stripes)

## Canvas Animation
5 lightning bolts striking diagonally from top, staggered flash (0.15s intervals), amber ambient glow pulse. Canvas fixed zIndex 0. Bottom hazard stripe.

## Theme Toggle
Dark/light toggle, localStorage persist, `mounted` guard. Light mode: amber/dark on cream. Same animation at reduced opacity.

## AI Agent Demo Section
- Dark glass card, centered
- "AI Electrician" badge (amber)
- Live chat mockup: user asks about panel upgrade → AI provides quote range and schedules inspection
- Typing indicator animation
- "This is what your customers experience" caption

## Rules
- All fonts via `next/font/google` — Bebas Neue, JetBrains_Mono, DM_Sans
- All colors via `const c = isDark ? {...} : {...}` — no inline hex
- Canvas animation with `useRef` + `useEffect` + `requestAnimationFrame`
- No Tailwind utility classes
- `npm run build` must pass 0 errors before deploy