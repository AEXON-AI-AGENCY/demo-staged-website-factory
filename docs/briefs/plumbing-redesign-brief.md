# PLUMBING — Hallmark Design Brief
**Vertical:** Bay Area Plumbing Co.
**File:** `app/plumbing/page.tsx`
**Status:** Exists but basic — needs Hallmark redesign
**Live:** `demo.aexonai.com/plumbing`

## Spec (Non-Negotiable)

| Element | Value |
|---------|-------|
| Display font | Manrope 800 (via `next/font/google`) |
| Mono label font | JetBrains Mono |
| Body font | DM Sans |
| Background dark | `#060D1A` |
| Background light | `#EFF6FF` |
| Surface dark | `#0B1829` |
| Accent | `#0EA5E9` sky blue |
| Warm accent | `#F97316` orange |
| Animation | Canvas drops+bubbles+ripples (plumbing canonical) |

## Sections (in order)

1. **Nav** — sticky, dark-glass, logo left, "Get Quote" CTA right
2. **Hero** — "Plumbing / Done Right." two-line h1, Manrope 800, accent color on second line, 24/7 badge, two CTAs (Book + Call)
3. **Services** — numbered 01-04 cards, blue-tinted borders, shimmer sweep on hover, JetBrains Mono numbers
4. **AI Agent Demo** — "Meet Your 24/7 AI Receptionist" section with a live chat widget demo showing a simulated booking conversation (user asks about emergency service, AI responds with availability and books). This is a UI mockup demo showing what the AI would do — not a real integration yet.
5. **Trust row** — JetBrains Mono badges: "20+ Years", "50K+ Jobs", "4.9★ Google", "24/7"
6. **Contact form** — Name, Phone, Service dropdown, Message, Submit
7. **Footer** — dark, logo, links, warning stripe

## Canvas Animation
Canonical pattern — 14 water drops (radial glow halos, horizontal wobble), 8 bubbles (specular highlight), ripple ellipses at bottom. Top animated line (`pipeFlow`), bottom hazard stripe.

## Theme Toggle
Canonical toggle — dark/light, localStorage persist, `mounted` guard. Body background set synchronously before `setTheme()`.

## AI Agent Demo Section
- Dark glass card centered on page
- "AI Receptionist" badge top-left
- Live chat mockup: alternating user/AI messages
- Conversation: user asks "Do you handle emergency leaks?" → AI says "Yes, 24/7 emergency service, what's your address?" → user types address → AI confirms "Plumber dispatched, arrival in ~45 min"
- Subtle typing indicator animation
- "This is what your customers experience" caption below

## Rules
- All fonts via `next/font/google` — Manrope, JetBrains_Mono, DM_Sans
- All colors via `const c = isDark ? {...} : {...}` object — no inline hex
- Canvas animation with `useRef` + `useEffect` + `requestAnimationFrame`
- No Tailwind utility classes
- `npm run build` must pass 0 errors before deploy