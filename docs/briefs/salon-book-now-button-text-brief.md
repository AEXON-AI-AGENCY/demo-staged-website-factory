# Brief: Fix Salon "Book Now" Nav Button Text Color

## Goal
In `/Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory/app/demo/salon/page.tsx`, the "Book Now" link/button in the **top-right of the sticky nav** has reddish/pinkish text that's hard to read. The user said: *"the button color itself is fine but the redish font makes the 'book now' message hard to see."*

**Required fix:** Change the "Book Now" button **text color to white** (`#FFFFFF`). Keep the button background color and any other styling exactly as-is.

## Files to read first
- /Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/ORCHESTRATOR_RULES.md
- /Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory/app/demo/salon/page.tsx (focus on the nav area, around line 745 where the sticky nav is)

## How to find the right element
The "Book Now" is in the sticky nav, top-right. Look for the `<a>` or `<Link>` element with text "Book Now" inside the nav. Currently it likely has `color: c.accent` or a similar reddish/pink value. The button background may be transparent, a pill, or a solid color — that part STAYS.

The fix is to set `color: '#FFFFFF'` (or `color: 'white'`) on that link/button's inline style. The button shape, background, padding, border, hover effect — all unchanged.

## CRITICAL CONSTRAINTS
- DO NOT touch PolishDripCanvas
- DO NOT touch the "GLOW STUDIO" / "SALON & SPA" hero text
- DO NOT touch the bento grid (the just-added service photos)
- DO NOT touch the light/dark toggle, body bg logic
- DO NOT touch the booking form ("Reserve Your Spot")
- DO NOT change the button's `background`, `padding`, `border`, `borderRadius`, hover effects
- DO NOT change other verticals

## Verify
Run from project root:
```
cd "/Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory" && npx tsc --noEmit
```
Must pass with zero errors.

Do NOT deploy — Hermes will deploy after reviewing.

## Return summary
Return:
1. The line number / location of the change
2. The exact color value you used
3. Whether npx tsc --noEmit passed
4. Any deviations

If something blocks you, STOP and report.
