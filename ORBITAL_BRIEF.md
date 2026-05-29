# AEXON Demo Hub — Orbital Animation + Landing Page Redesign

## Context
- Repo: `AEXON-AI-Workspace/website-factory/demo-staged-website-factory`
- Live URL: `https://demo-staged-website-factory-g2jzjeyi4.vercel.app`
- GitHub: `AEXON-AI-AGENCY/demo-staged-website-factory`

---

## PRIORITY 1: Replace the AEXON Brain Animation

The current brain animation (`components/AexonBrainAnimation.tsx`) is **not acceptable**. Replace it with this exact orbital animation:

### Visual Reference
A futuristic 3D animated logo for "AEXON - Intelligent Business Systems":
- **"A" Letter**: Bright white volumetric 3D letter, clean sans-serif with thick strokes
  - Core: intense white
  - Edge glow: bright cyan/blue (#00FFFF)
  - Outer glow: soft volumetric halo
  - Multiple layers of light emission (bright core, medium glow, soft outer radiance)
- **3 Orbital Rings** at different angles:
  - Ring 1: Nearly horizontal, ~15-20° tilt
  - Ring 2: Diagonal, ~45-60° angle
  - Ring 3: Nearly vertical, ~70-80° angle
  - All rings intersect through the center "A" letter
  - Thin cyan/teal glowing lines (#00FFFF / #22d3ee)
- **8-10 Glowing Nodes** along orbital paths:
  - Bright white/cyan dots
  - Varying sizes (larger primaries, smaller secondaries)
  - Smooth orbital motion at differential speeds
- **Background**: Deep space — dark navy (#0A1428) to black radial gradient, soft particle/scattered light effects
- **Color palette**: white core, cyan (#00FFFF, #22d3ee), deep navy (#030711, #0A1428)
- **Motion**: Slow continuous orbital rotation, counterclockwise from above, nodes travel along ring paths, smooth ~10-30 second loop cycles

### Implementation
- Create new file: `components/AexonOrbitalAnimation.tsx` (or replace `AexonBrainAnimation.tsx`)
- Use: SVG + CSS animations, or CSS with transforms/gradients
- Must be `position: fixed` so it wraps the entire page as a persistent background
- Works from z-index 0 behind all content
- Mobile-friendly (no performance issues)
- Clean, well-organized code

---

## PRIORITY 2: Landing Page — Keep current Manifesto structure, fix these issues

### Current State (mostly good)
- Dark Studio theme (#09090b background)
- Cursor spotlight hero
- Per-vertical accent color cards
- AEXON logo in nav ✓ (keep this)
- Brain animation as persistent background (replace with new Orbital)
- Gradient headline
- 13-vertical bento grid
- All 4 rows of cards

### Fixes Needed
1. **Replace** `AexonBrainAnimation.tsx` with `AexonOrbitalAnimation.tsx` — entire page background
2. **Remove mockup images from cards entirely** — no screenshots in any card. The user's template images do NOT belong in the vertical tiles. Strip the mockup section from VerticalCard and remove mockup data from `lib/verticals.ts` fields
3. **Logo in nav**: Use `public/aexon-logo.png`. Keep the "AEXON" text logo in nav (no change needed)
4. **Brain/Orbital animation z-index**: position:fixed behind everything (z-index: 0)
5. **Build must pass**: `npm run build` → 0 errors before pushing

---

## Hallmark Design Rules (mandatory)
- Use Hallmark's dark Studio theme tokens
- No emoji icons
- Lock all colors to CSS variables from `globals.css`
- Mobile verified: 320/375/414/768px
- No AI-slop — must look designed, not generated

---

## Build + Deploy Process
1. `npm run build` — must pass clean (17/17 pages)
2. Commit with message: "Orbital animation + design cleanup"
3. Push to GitHub → Vercel auto-deploys
4. Verify with browser_vision before posting

## Discord Announcement (post as `aexon-staged-demos` channel 1509645301953069236)
Format:
```
**[AEXON Demo Hub]** is live! 🔗 [URL]

[One-line description of the update]
```
