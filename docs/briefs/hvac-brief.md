# DESIGN BRIEF: CoolPro HVAC — Demo Vertical

## What
Full redesign of the HVAC demo vertical page at `app/demo/hvac/page.tsx`.
This is a standalone demo page — NOT the hub. It should look and feel like a real premium HVAC contractor website, not a template.

---

## Design Identity

| Attribute | Value |
|---|---|
| Business name | CoolPro HVAC |
| Genre | modern-minimal (clean, trustworthy, service-focused) |
| Headline font | Inter 900 weight |
| Body font | Inter 400/500 |
| Accent color | `#22d3ee` (cyan/ice blue) |
| Background | `#09090b` (near-black) |
| Text primary | `#f4f4f5` |
| Text secondary | `#a1a1aa` |
| Page personality | Professional, cool, reliable — the way ice cold air feels on a hot day |

---

## Signature Animation: Airflow Mist Particles

Implement a subtle **airflow/mist particle system** in the background:
- 30–50 translucent particles (droplets of "refrigerant vapor")
- Colors: rgba(34, 211, 238, 0.15) to rgba(255, 255, 255, 0.08)
- Movement: slow upward drift (like vapor rising) + gentle horizontal sway
- Particles fade in at bottom, fade out at top of viewport
- CSS-only implementation using `@keyframes` and absolutely positioned divs
- Animation runs continuously as ambient background — position: fixed, z-index: 0, opacity: 0.6
- Particles should be small (3–8px circles), not distracting, visible but not noisy

---

## Macrostructure: Clean Service Page

```
[nav]                  — Logo "CoolPro HVAC" left, phone number right, dark minimal
[hero section]         — Large headline "Cool Air. Always." + subline + CTA "Get a Quote"
[services section]    — 4 service cards in a 2x2 grid: AC Repair, Heating, Maintenance, Installation
[why us section]      — 3 trust badges inline: Licensed & Insured, 24/7 Service, 15+ Years
[ai quote form]        — Lead capture: name, address, AC unit age/type, service needed, urgency
[footer]               — Minimal: contact info, service area, copyright
```

---

## Key Sections Detail

### Hero
- Headline: "Cool Air. Always." (Inter 900, large, white with subtle cyan glow)
- Subline: "Professional HVAC services you can trust. Repairs, installations, and maintenance — done right, on time."
- CTA: "Get a Free Quote" → scrolls to quote form
- Background: airflow mist particles running + dark gradient overlay for text legibility
- NO hero image — text IS the hero (Hallmark principle)

### Services Grid (2x2)
4 cards, each with:
- Icon (inline SVG: wrench/gear for repair, flame for heating, shield for maintenance, bolt for install)
- Service name
- 1-line description
- Hover: translateY(-4px) + cyan box-shadow glow
- Border: 1px solid rgba(34, 211, 238, 0.2)

### Trust Badges
3 inline badges with icons:
- "Licensed & Insured" (shield icon)
- "24/7 Emergency Service" (clock icon)
- "15+ Years Experience" (star icon)

### AI Quote Request Form
Form fields:
1. Name (text)
2. Phone (tel)
3. Email (email)
4. Address (text)
5. AC Unit Age (select: Under 5 yrs / 5–10 yrs / 10–15 yrs / 15+ yrs)
6. Service Needed (select: Repair / Installation / Maintenance / Replacement)
7. Urgency (select: Not urgent / Some urgency / Urgent / Emergency)
8. Additional notes (textarea)
Submit button: "Get My Free Quote" (cyan background, dark text, hover glow)
Success state: "We'll be in touch within 2 hours!" (no page reload — form hides, success message shows)

---

## Per-vertical Animation Rules (from Hallmark Codex skill)

- Signatures are UNIQUE per vertical — this airflow animation is ONLY for HVAC
- Animation is CSS-only, no JS libraries
- position: fixed, z-index: 0, low opacity so it doesn't compete with content
- Particles should feel ambient, not decorative

---

## Technical Notes

- Use ONLY inline styles — no Tailwind utilities on this page
- Font: Inter via `next/font/google` (already in globals.css for the hub)
- All text colors via explicit hex (follow the color map in aexon-headline-spec.md to avoid zinc cascade issues)
- No mockup images in cards
- Responsive: single column on mobile, 2-column service grid on tablet+
- Form: controlled React state, no backend needed for demo (form shows success state on submit)
- "Talk to us" CTA anywhere in footer/nav → https://aexonai.com/#consultation

---

## What NOT to do
- Do NOT use the hub's orbital animation on this page — use the airflow particles
- Do NOT copy the hub's bento grid layout — this is a SERVICE page, not a demo hub
- Do NOT use emoji icons — inline SVGs only
- Do NOT add unnecessary sections (testimonials carousel, etc.) unless they fit the service page structure

---

## Success Criteria
- Page loads with airflow particles visible but subtle in background
- Hero headline "Cool Air. Always." is readable and prominent
- Services section shows 4 cards in clean grid
- Quote form is functional (submit shows success state)
- No layout shifts, no broken styles, no visual glitches
- Page feels like a premium HVAC contractor website — not a generic template