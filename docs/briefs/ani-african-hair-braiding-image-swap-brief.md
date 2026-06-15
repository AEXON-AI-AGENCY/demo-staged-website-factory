# Ani African Hair Braiding — Prospect Image Swap Brief

## Context
Bazzy approved four generated images for the Ani African Hair Braiding prospect demo. He especially loves the 4th image (`cornrows-twists.png`). The current live Ani page still uses wrong stock imagery for an African braiding salon. Fix the prospect-specific images while preserving the original Salon vertical structure, typography, animation, and page behavior.

## Scope
Workdir: `/Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory`

Allowed files to edit:
- `app/d/[slug]/page.tsx` only, unless TypeScript requires a tiny related type-only change.

Assets already downloaded locally:
- `/prospects/ani-african-hair-braiding/hero-braids.png` — 1024x576
- `/prospects/ani-african-hair-braiding/box-braids.png` — 1024x1024
- `/prospects/ani-african-hair-braiding/knotless-braids.png` — 1024x1024
- `/prospects/ani-african-hair-braiding/cornrows-twists.png` — 1024x1024, Bazzy's favorite

## Non-negotiables
1. Do NOT edit `/salon` default behavior or original Glow Studio vertical.
2. Do NOT use Cloudinary for prospect site imagery. These assets are local Vercel-served repo assets.
3. Do NOT push to git or Vercel.
4. Do NOT touch the existing unrelated dirty files in the repo.
5. Preserve the existing original salon design/animations/layout. This is not a redesign.
6. The only goal is to make the Ani prospect page intelligently match an African hair braiding salon.

## Desired mapping
- Ani hero image: Prefer `cornrows-twists.png` if it crops well in the existing hero frame because Bazzy loved it most. If the existing hero aspect/crop makes that awkward, use `hero-braids.png` for the hero and keep `cornrows-twists.png` as the most prominent service tile.
- Service tiles:
  - Box Braids -> `/prospects/ani-african-hair-braiding/box-braids.png`
  - Knotless Braids -> `/prospects/ani-african-hair-braiding/knotless-braids.png`
  - Cornrows & Twists -> `/prospects/ani-african-hair-braiding/cornrows-twists.png`

## Verification
After edits, run:
- `npm run build`

Return a concise summary of files changed and the final image path mapping. Do not push.