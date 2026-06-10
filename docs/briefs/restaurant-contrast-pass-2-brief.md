# Restaurant Vertical — Follow-up Contrast Pass

**Vertical:** restaurant (The Golden Fork)
**Page:** `app/restaurant/page.tsx`
**Status:** First pass shipped (commit 1d23e5f). Build clean. 4 of 5 elements fixed well. **Two specific elements still fail casual-readability QA in light mode.**

## What's NOT working after first pass

Vision QA on the live page scored these as "would not read casually" (out of 10):
- **Footer copyright** ("© 2025 The Golden Fork. All rights reserved."): 3/10
- **Process step descriptions** (4 cards: "Tasting menu, à la carte, or let our AI build something custom based on your preferences." etc.): 4/10

Both are using `color: colors.textSoft` which is `rgba(26,18,9,0.6)` (60% black) on light cream `#fffbf5`. That's mathematically 6:1 contrast (passes WCAG AA), but visually it reads as gray-on-gray for secondary content.

## What to change (scope: 2 elements, ONE file)

### 1. Footer copyright
**Current (line 376):**
```tsx
<div style={{ maxWidth: "1200px", margin: "1.5rem auto 0", textAlign: "center", fontSize: "0.75rem", color: colors.textSoft, fontWeight: 500 }}>
  © 2025 The Golden Fork. All rights reserved.
</div>
```
**Change to:**
- `color: colors.textSoft` → `color: colors.text` (full opacity)
- OR add a new `colors.secondaryText` definition at e.g. `rgba(26,18,9,0.75)` for dark and `rgba(254,243,226,0.75)` for light
- `fontWeight: 500` → `fontWeight: 600`
- Bump `fontSize: "0.75rem"` → `fontSize: "0.8rem"` if it doesn't disturb the layout

### 2. Process step descriptions
**Current (line ~305):**
```tsx
<p style={{ fontSize: "0.85rem", color: colors.textSoft, lineHeight: 1.65 }}>{step.desc}</p>
```
**Change to:**
- `color: colors.textSoft` → `color: bodyTextColor` (the existing helper that already handles dark/light mode cleanly)
- `fontWeight` not set → add `fontWeight: 500`

## Why these specific changes

- `bodyTextColor` is already defined in the file (line 37): `const bodyTextColor = theme === "dark" ? colors.text : colors.textSoft;`
- Reusing it keeps the dark-mode logic consistent (dark mode uses full `colors.text`, light mode uses `colors.textSoft` at 60%)
- For light mode footer, this is the ONE place we want full `colors.text` opacity (not textSoft) because it's tiny text and needs maximum punch
- Bumping weight 500→600 for the footer makes the © line feel like a deliberate signature, not metadata

## Do NOT change

- The `c` color object itself
- Trust badge sub-labels (already at textSoft + 500, score 5/10, acceptable for "supporting text" in trust badges)
- Hero, service cards, contact info, reservation form — all reading well, no need to touch
- Any layout, structure, or component order
- Any other vertical
- Animations, scroll behavior, theme toggle logic

## Verification

1. `npm run build` — 0 errors
2. `npm run dev` on port 3052 → browser preview
3. Toggle to light mode
4. Scroll to footer — © line should be clearly readable
5. Scroll to "Your Evening, Perfected" section — 4 step descriptions should be clearly readable
6. Confirm dark mode still looks good (changes should also improve dark mode readability)
7. Commit with: `fix: restaurant — footer copyright + process step descriptions contrast`

## Working Directory

`/Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory`

## Codex Invocation

```bash
codex exec --dangerously-bypass-approvals-and-sandbox "$(cat docs/briefs/restaurant-contrast-pass-2-brief.md)"
```

Model: `gpt-5.5` (default in `~/.codex/config.toml`).
