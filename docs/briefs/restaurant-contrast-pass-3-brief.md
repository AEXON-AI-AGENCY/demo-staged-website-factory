# Restaurant Vertical — Process Step Description Final Fix

**Vertical:** restaurant (The Golden Fork)
**Page:** `app/restaurant/page.tsx`
**Status:** Pass 1 (textMuted→textSoft + weight 500) ✓. Pass 2 (footer + process steps) ✓ for footer, but process steps STILL fail.

## The actual problem

Pass 2 instructed using `bodyTextColor` for process step descriptions. But `bodyTextColor` is defined as:
```ts
const bodyTextColor = theme === "dark" ? colors.text : colors.textSoft;
```

In **light mode**, this resolves to `colors.textSoft` = `rgba(26,18,9,0.6)` — 60% black on cream. That's 6:1 contrast (WCAG AAA), but for small text in cards it still reads as faint gray. The user feedback is "footer still hard to see" and "process step descriptions still hard to see" — both elements are now using `bodyTextColor` (footer got `colors.text` directly, but process steps got `bodyTextColor`).

## The fix

Update the helper definition so `bodyTextColor` in light mode uses **full opacity** like the footer copyright now does:

```ts
// BEFORE
const bodyTextColor = theme === "dark" ? colors.text : colors.textSoft;

// AFTER
const bodyTextColor = colors.text;  // full opacity in BOTH modes
```

This is a one-line change. It will improve readability of:
- Process step descriptions (line 301)
- Reservation Agent descriptive paragraph (line 211)
- Contact section "For private events…" paragraph (line 325)
- Contact info values (Address, Phone, Hours, Email) (line 336)
- Hours/Location/Reservations strip values (line 207)
- Hero subheadline (line 175)
- Trust badge sub-labels (currently using `textSoft` directly — NOT bodyTextColor, so they will NOT change)

## Why this is the right move

- Footer copyright is now at `colors.text` (full opacity) and scored 9/10 readability
- All other body text elements were moved to `bodyTextColor` in pass 1, but that helper falls back to 60% in light mode
- Making `bodyTextColor` always-full-opacity means all those elements get the same 9/10 readability the footer got
- The dark-mode `colors.text` is already full opacity — no change there
- Light-mode `colors.text` = `#1a1209` on `#fffbf5` = ~14:1 contrast (WCAG AAA easily)

## Do NOT change

- The `c` color object
- `eyebrowColor` (using accent in dark, accentDark in light — this is correct)
- `placeholderColor` (works fine)
- Any other vertical, file, or component
- Trust badge sub-labels (they use `textSoft` directly and scored 5/10 — acceptable, do not touch)
- Layout, structure, animations

## Verification

1. `npm run build` — 0 errors
2. `npm run dev` on port 3053 → browser preview
3. Toggle to light mode
4. Verify process step descriptions are now as readable as the footer copyright
5. Verify dark mode still looks good (no regression — dark already used full opacity)
6. Commit with: `fix: restaurant — bodyTextColor full opacity for all light-mode descriptions`

## Working Directory

`/Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory`

## Codex Invocation

```bash
codex exec --dangerously-bypass-approvals-and-sandbox "$(cat docs/briefs/restaurant-contrast-pass-3-brief.md)"
```

Model: `gpt-5.5` (default).
