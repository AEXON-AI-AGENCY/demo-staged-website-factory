# Plumbing Demo — Design Brief

**Vertical:** Plumbing Services
**Date:** 2026-05-30
**Designer:** AEXON AI Design System (Hallmark-influenced)

---

## 1. Concept & Vision

A premium, trustworthy plumbing service demo that feels like a high-end home service brand — not a generic contractor page. The design communicates reliability, cleanliness, and expertise through crisp typography, water-inspired motion, and a palette that reads as both professional and approachable. Light mode should feel fresh and clinical (like clean pipes), dark mode should feel like a premium emergency service at night.

---

## 2. Design Language

### Aesthetic Direction
**Reference:** Modern utility meets editorial — think "if a luxury appliance brand did plumbing websites." Clean grid layouts, deliberate whitespace, strong typographic hierarchy. Not a typical blue-clipart plumber site.

### Color Palette

**Dark Mode:**
- `--bg`: `#060D1A` (deep navy)
- `--bg-secondary`: `#0B1829` (card surfaces)
- `--bg-tertiary`: `#0F2040` (hover states)
- `--text-primary`: `#F0F6FF` (near-white blue tint)
- `--text-secondary`: `#8BA3C7` (muted blue-grey)
- `--accent`: `#0EA5E9` (sky blue — primary accent)
- `--accent-secondary`: `#38BDF8` (lighter blue)
- `--accent-glow`: `rgba(14, 165, 233, 0.25)`
- `--accent-warm`: `#F97316` (orange — emergency/urgency, CTA buttons)
- `--border`: `rgba(14, 165, 233, 0.15)`

**Light Mode:**
- `--bg`: `#F4F9FF` (cool off-white)
- `--bg-secondary`: `#E8F4FF` (light blue tint cards)
- `--bg-tertiary`: `#D0E8FF` (hover)
- `--text-primary`: `#060D1A` (deep navy)
- `--text-secondary`: `#3D6B8A` (muted steel blue)
- `--accent`: `#0284C7` (deeper sky blue — more saturated on white)
- `--accent-secondary`: `#0EA5E9`
- `--accent-glow`: `rgba(2, 132, 199, 0.15)`
- `--accent-warm`: `#EA580C` (deeper orange on white)
- `--border`: `rgba(2, 132, 199, 0.2)`

### Typography
- **Display/Headings:** `Manrope` (extra-bold 800) — geometric, modern, slightly industrial
- **Body:** `DM Sans` — clean, highly readable
- **Labels/Tags/Mono:** `JetBrains Mono` — for numbers, badges, service codes

### Spatial System
- Container max-width: 1200px, centered
- Section padding: 80px top/bottom (desktop), 48px (mobile)
- Card gap: 24px
- Border radius: 12px (cards), 8px (buttons), 50% (badges)

### Motion Philosophy
**Theme:** Water in motion — droplets, ripples, pressure, flow.
- **Background:** Animated water droplets (falling from top, splash on landing) + ripple rings expanding from drip points
- **Cards:** Hover lifts with a "surface tension" ease (slight scale + glow)
- **CTA:** Pulsing water-drop glow on primary buttons
- **Numbers:** Odometer-style count-up on stats
- **Page load:** Staggered fade-up with ripple timing (100ms delays)

---

## 3. Layout & Structure

```
Hero Section:
- Overline tag: "24/7 Emergency Service" (badge, pulsing orange dot)
- H1: "Plumbing Done Right." (Manrope 800, large)
- Subhead: "Licensed pros. Transparent pricing. No surprises."
- Two CTAs: "Book Service" (orange, filled) + "Call (555) 742-9103" (outlined)
- Trust row: "Licensed & Insured" | "20+ Years" | "4.9★ Google" | "Same-Day Arrival"

Services Grid (2x2):
- Drain Cleaning (icon: droplet)
- Water Heater (icon: flame/droplet)
- Leak Repair (icon: alert drop)
- Fixture Installation (icon: wrench)
Each card: icon, title, short desc, "Learn more →"

Why Us Section (3 columns):
- Transparent Pricing (icon: dollar)
- No Hidden Fees (icon: check-shield)
- Guaranteed Work (icon: medal)

Stats Row:
- "20+ Years" | "50,000+ Jobs" | "4.9★ Rating" | "24/7 Availability"

CTA Banner:
- "Got a Plumbing Emergency?" (Manrope, large)
- "Don't wait — our team is standing by." (DM Sans)
- "Get Emergency Service →" button

Footer:
- Contact info, hours, tagline
- "AEXON AI" branding subtle
```

---

## 4. Features & Interactions

### Theme Toggle
- Fixed top-right button (44px circle)
- Sun/moon icon swap
- Persists via localStorage
- Instant switch, no page reload

### Water Droplet Background Animation
- 8 droplets at staggered X positions (10%, 22%, 35%, 48%, 61%, 74%, 87%, 95%)
- Each droplet: starts at Y: -20px, falls to Y: 110vh over 3-5s (varied), loops with delay
- Each droplet: blue circle (4–8px), slight horizontal wobble
- On "landing": small ripple ring expands (CSS animation, 0.6s, fades out)
- Droplets visible in both light + dark (opacity slightly reduced in light mode)

### Card Hover States
- `translateY(-4px) scale(1.01)`
- Box shadow: `0 8px 32px rgba(14, 165, 233, 0.15)` (dark) / `0 8px 32px rgba(2, 132, 199, 0.12)` (light)
- Icon: color shifts to `--accent-warm`
- Arrow: slides 4px right

### CTA Buttons
- Primary (orange): subtle pulsing glow animation
- Hover: scale 1.02, intensified glow
- Outlined: border brightens on hover

---

## 5. Component Inventory

### ThemeToggle
- Fixed position top-right
- States: dark (moon icon) / light (sun icon)
- Hover: border becomes accent color, glow appears

### NavBar
- Logo text: "AQUAFLOW PLUMBING" (Manrope, 700, accent color)
- Phone: "(555) 742-9103" (JetBrains Mono)
- "Get Quote" button (outlined, small)

### HeroBadge
- Pill shape, orange bg, white text
- Pulsing orange dot animation (left of text)
- Used for "24/7 Emergency" callout

### ServiceCard
- Icon (droplet SVG, accent blue)
- Title (Manrope 700)
- Description (DM Sans, text-secondary)
- "Learn more →" link with arrow
- States: default / hover (lift + glow)

### StatItem
- Large number (Manrope 800, 48px)
- Label below (DM Sans, text-secondary)
- Orange accent line above

### CTAButton
- Primary: orange bg, dark text, rounded 8px, pulsing glow
- Outlined: transparent bg, accent border, accent text

---

## 6. Technical Approach

- **Framework:** Next.js App Router (TypeScript)
- **Styling:** Pure inline styles (no Tailwind) with CSS custom properties for theming
- **Fonts:** `next/font/google` — Manrope, DM Sans, JetBrains Mono
- **Theme system:** `data-theme="dark|light"` on `<div>` wrapper in layout; ThemeToggle component; CSS variables scoped to `[data-theme]` selectors in globals.css
- **Components:** All inline in page.tsx for portability (single-file simplicity)
- **Form:** Service request form (name, phone, service type, message) with blue focus rings
- **No external dependencies** beyond Next.js + Google Fonts

---

## 7. Light Mode Adaptation

Same structure, same content — colors shift to light palette:
- Background becomes cool off-white (#F4F9FF)
- Cards become light blue-tinted (#E8F4FF)
- Headings stay dark navy (#060D1A)
- Accent blue becomes deeper (#0284C7) for contrast on white
- Orange CTA stays warm but deeper (#EA580C) for readability
- Droplet animation stays but is slightly subtler (opacity 0.4 vs 0.6)
- Card hover glow becomes lighter (rgba(2, 132, 199, 0.12))