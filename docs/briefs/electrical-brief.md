# DESIGN BRIEF: Current Electric LLC — Demo Vertical

## What
Full redesign of the electrical demo vertical page at `app/demo/electrical/page.tsx`.
Standalone demo page — real premium electrician website feel.

---

## Design Identity

| Attribute | Value |
|---|---|
| Business name | Current Electric LLC |
| Genre | modern-minimal (clean, precise, professional) |
| Headline font | Inter 900 weight |
| Body font | Inter 400/500 |
| Accent color | `#00e5ff` (electric cyan) |
| Background | `#0a0a0f` (near-black with slight blue tint) |
| Surface/card | `#111118` |
| Text primary | `#f0f0f5` |
| Text secondary | `#8888a0` |
| Page personality | Precise, energetic, safe — like the flip of a switch |

---

## Signature Animation: Electrical Pulse Traces

Implement **electrical pulse traces** — thin bright lines that race across the page:
- 4–6 horizontal "conductive traces" at different Y positions
- Each trace is a thin (1–2px) cyan/white line that animates from left edge to right edge, then resets
- Traces fire at staggered intervals (not all at once) — randomized delay via CSS custom properties
- Between bursts: subtle ambient glow pulses on the traces (opacity oscillation)
- Small "node" dots at trace endpoints that pulse when a trace fires
- CSS-only: `@keyframes` + absolutely positioned divs
- position: fixed, z-index: 0, opacity: 0.4 — visible but not distracting
- NO particle drift — this is different from HVAC's upward mist

---

## Macrostructure: Service Page

```
[nav]                  — "Current Electric" logo left, emergency phone right, dark minimal
[hero section]         — "Power On." headline + subline + "Schedule Service" CTA
[services section]     — 3 service cards: Electrical Repair, Panel Upgrade, New Installation
[trust section]        — 3 badges: Licensed Electrician, Same-Day Service, Free Estimates
[instant quote form]   — Service type, property type, urgency level, name, phone, email
[footer]               — Contact, service area, hours, copyright
```

---

## Key Sections Detail

### Hero
- Headline: "Power On." (Inter 900, large, white with electric cyan glow/shadow)
- Subline: "Reliable electrical services for your home or business. From panel upgrades to emergency repairs — done right."
- CTA: "Schedule Service" → scrolls to form
- Background: electrical pulse traces running + dark overlay for text legibility
- NO hero image — text IS the hero

### Services Grid (3 cards, responsive)
Each card:
- Icon (inline SVG: wrench for repair, zap for panel, plug for installation)
- Service name
- 1-line description
- Hover: translateY(-4px) + cyan box-shadow glow
- Border: 1px solid rgba(0, 229, 255, 0.2)

### Trust Badges
3 inline badges:
- "Licensed Electrician" (badge icon)
- "Same-Day Service" (clock icon)
- "Free Estimates" (dollar icon)

### Instant Quote Form
Fields:
1. Name (text)
2. Phone (tel)
3. Email (email)
4. Service Type (select: Repair / Panel Upgrade / New Installation / Inspection / Other)
5. Property Type (select: Residential / Commercial / Industrial)
6. Urgency (select: Flexible / Within a week / Within 24 hours / Emergency)
7. Brief description (textarea)
Submit: "Get My Free Estimate" (electric cyan button, dark text, hover glow)
Success: form hides, "We'll contact you within 2 hours!" message shows

---

## Per-vertical Rules (same as HVAC but different)
- This animation is ONLY for electrical — do NOT reuse HVAC's mist particles
- NO hub orbital animation on this page
- CSS-only animation, no JS libraries
- Inline styles only — no Tailwind

---

## Technical Notes
- Font: Inter via next/font/google
- Explicit hex colors in inline styles (zinc-cascade fix from aexon-headline-spec.md)
- Responsive: single column mobile, service grid tablet+
- "Talk to us" anywhere → https://aexonai.com/#consultation

---

## Success Criteria
- Electrical pulse traces visible and animated in background
- "Power On." headline readable and prominent
- Services section shows 3 cards
- Form functional with success state
- No layout shifts, no broken styles
- Page feels like a premium electrician website