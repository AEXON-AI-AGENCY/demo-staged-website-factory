# CLAUDE.md — Demo Staged Website Factory

## Context
This repo builds demo landing pages for each AEXON AI vertical. Each demo must look like a completely different website — not a reskin with different colors. If two demos look like the same template, that's a failure.

## The Rule: Full Reinvention Every Time

| Element | HVAC | Electrical | Salon | Plumbing | Auto Repair | ... |
|---------|------|------------|-------|----------|-------------|-----|
| Font | Inter | Bebas Neue + IBM Plex Mono | _new_ | _new_ | _new_ | _new_ |
| Color story | Cyan/ice on dark | Amber/charcoal | _new_ | _new_ | _new_ | _new_ |
| Layout | Centered hero, 2×2 grid | Angled sections, numbered | _new_ | _new_ | _new_ | _new_ |
| Animation | Mist particles rising | Lightning + charge lines | _new_ | _new_ | _new_ | _new_ |
| Card style | Icon top, centered | Numbered 01–04, industrial | _new_ | _new_ | _new_ | _new_ |

**If it looks like a previous demo → redesign, don't ship it.**

## Per-Vertical Build Process

1. **Design brief** → `docs/briefs/[vertical]-brief.md` with font families, full color palette, signature animation, layout structure. No reusing fonts/colors/animations from existing verticals.
2. **Hallmark** → load `~/.hermes/skills/hallmark/SKILL.md` and references before writing UI. The "Reskin Trap" rule is in Hallmark — it will reject a vertical that just swaps hex codes.
3. **Build** → `app/demo/[vertical]/page.tsx`. Inline styles only. NO Tailwind on demo pages (zinc-cascade bug).
4. **Build** → `npm run build` must pass clean.
5. **Commit** → descriptive message, push to origin main.
6. **Deploy** → wait for Vercel READY state.
7. **Inspect** → browser_vision before posting to Discord.
8. **Post** → link to aexon-staged-demos Discord (`1509645301953069236`).
9. **Cleanup** → delete REACH_MESSAGE.txt.

## Tech Rules

- Font: `next/font/google` — NOT `@import` in globals.css
- Inline styles only — no Tailwind utilities on demo pages
- Controlled React form with success state
- "Talk to us" → `https://aexonai.com/#consultation`
- `prefers-reduced-motion` respected

## Hallmark Integration

Hallmark lives at `~/.hermes/skills/hallmark/` and is the design authority:
- Run `codex "hallmark audit app/demo/[vertical]/page.tsx"` to check for AI slop before committing
- The "Per-Vertical Design Diversity — Non-Negotiable" section in Hallmark's SKILL.md is the enforcement mechanism
- If Hallmark would call it a reskin, it's a reskin — rebuild

## Design Briefs

All briefs live at `docs/briefs/[vertical]-brief.md`. Each brief must specify:
- Font families (heading + body, both Google Fonts)
- Full color palette (background, surface, text, text-secondary, accent — 5 hex codes)
- Signature animation (CSS-only, specific to the industry)
- Layout structure (which Hallmark macrostructure)
- Form fields and AI feature