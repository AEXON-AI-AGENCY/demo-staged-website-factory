# Restaurant Vertical — Font & Contrast Fix Brief

**Vertical:** restaurant (The Golden Fork)
**Page:** `app/restaurant/page.tsx`
**Issue:** Body text throughout the page is hard to read in BOTH dark and light modes — thin font weight, low-contrast gray text on backgrounds, and small secondary copy that disappears against the warm color story.
**Priority:** P1 — this is the most-recent vertical and prospects are looking at it right now.

## Visual Evidence (screenshots saved to `docs/briefs/screenshots/`)

- `restaurant-dark.png` — dark mode full page
- `restaurant-light.png` — light mode full page

Both screenshots are reference for what NOT to ship. Read them before writing code.

## Specific Problem Areas (from screenshot QA, both modes)

| Section | Element | Problem |
|---|---|---|
| Nav | Phone number, nav links | Light gray on dark/light bg, weight 500 — too thin |
| Hero | Subheadline paragraph | "Farm-to-table fine dining…" — gray, weight 400, blends into bg |
| Hours/Location/Reservations strip | Values text (`Tue–Sun: 5pm–11pm`, addresses) | textSoft at 60% opacity, too light |
| Dining Experiences | Card descriptions (1-2 sentence copy) | textSoft, weight 400, small |
| Reservation Agent | Feature card descriptions | textSoft, weight 400, blends |
| Chat input | Placeholder text ("Describe your perfect dinner...") | Hard to read placeholder |
| Process steps | Step descriptions | textSoft, weight 400, light |
| Trust badges | Sub-labels (e.g. "2023, 2024, 2025", "Local sourcing within 50 mi") | textMuted at 38% opacity — nearly invisible |
| Contact | "For private events…" paragraph | textSoft, weight 400 |
| Contact info rows | Address/Phone/Hours/Email values | textSoft, weight 400, low contrast |
| Footer | Address + phone line, copyright | textMuted at 38% opacity |

## What "Fixed" Looks Like (Requirements)

### Dark Mode (default)
- **Body text (paragraphs, descriptions):** weight 400 → 500 minimum, color `c.text` (full opacity `#fef3e2`) instead of `textSoft` (60% opacity). OR keep at 60% but use weight 600.
- **Headings (h1, h2, h3):** Already use `c.text` (full opacity) — verify and keep. May bump weight 700 → 800 for h3 process step titles.
- **Muted metadata (trust badge sub-labels, footer copyright):** Bump from 38% → 55% minimum opacity. Use `c.textSoft` (60%) for these instead of `c.textMuted` (38%).
- **Placeholders:** Add explicit `placeholderStyle` color: `rgba(254,243,226,0.5)` with font-weight 500.
- **Nav links:** `textMuted` (38%) → `textSoft` (60%), weight 500 → 500 (no change, but higher contrast).
- **Phone in nav:** Same as nav links.

### Light Mode
- **Body text:** `c.text` is already `#1a1209` (near-black) — fine. Bump description weights 400 → 500.
- **Muted text (textSoft 60% on `#fffbf5`):** Acceptable for body in light mode. Verify trust badge sub-labels are visible.
- **Eyebrow text (uppercase, 0.72rem, accent color):** Verify WCAG AA on light bg — `c.accent` is `#d97706`, on `#fffbf5` this is ~3.5:1 — bump to `c.accentDark` (`#b45309`) for eyebrows in light mode to hit 4.5:1.
- **Hours/Location/Reservations values text:** light mode `textSoft` is `rgba(26,18,9,0.6)` — on `colors.card` (`rgba(255,255,255,0.96)`) → ~7:1, fine.

### General rules
- **Never use `c.textMuted` (38% opacity) for any text the user needs to read.** Reserve it for disabled states, dividers, or non-essential meta only.
- **Body text minimum weight: 500.** Hero h1, h2 can stay 700+. h3 subheads in cards should be 700.
- **WCAG AA target: 4.5:1 for body, 3:1 for large text (18pt+).** The current color palette supports this — the issue is opacity + weight, not hue.

## Per-Vertical DNA (DO NOT CHANGE)

This is a **text-only fix**. Do not:
- Change fonts (DM Sans body + Playfair Display headings is the design)
- Change color palette
- Change layout, macrostructure, or component structure
- Change animations
- Change the business name, copy, or content
- Add new sections

The only changes should be: opacity values, font weights, and color choices (e.g. switching from `textMuted` to `textSoft` for specific elements). Section structure stays identical.

## File to Edit

`app/restaurant/page.tsx` — ONLY this file.

Do not touch:
- `app/page.tsx` (demo hub)
- `app/layout.tsx`
- `globals.css`
- Any other vertical
- Any component file

## Verification

1. `npm run build` — must pass clean (0 errors)
2. `npm run dev` on port 3050 → browser preview
3. Toggle dark/light via the nav button
4. For every section in the table above, confirm the text is now easily readable
5. Run the build before committing

## Deliverable

- Updated `app/restaurant/page.tsx`
- `REACH_MESSAGE.txt` at repo root with:
  - "Font & contrast fix shipped to restaurant vertical"
  - What changed (2-3 bullets, e.g. "Bumped body text weight 400→500 across all sections", "Trust badge sub-labels now 55% opacity")
  - Live URL: `https://demo.aexonai.com/restaurant`
- Commit with: `fix: restaurant — text contrast (body weight 400→500, textMuted→textSoft)`

## Working Directory

`/Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory`

## Codex Invocation

```bash
codex exec --dangerously-bypass-approvals-and-sandbox "$(cat docs/briefs/restaurant-font-contrast-brief.md)"
```

The model is `gpt-5.5` (set in `~/.codex/config.toml`).
