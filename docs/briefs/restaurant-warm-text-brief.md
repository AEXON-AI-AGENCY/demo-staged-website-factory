# Restaurant Vertical — Body Text Tone Fix (Light Mode)

**Vertical:** restaurant (The Golden Fork)
**Page:** `app/restaurant/page.tsx`
**Status:** Pass 3 (5bd37c3) made body text `colors.text` = `#1a1209` in BOTH modes for max contrast. Build clean, WCAG AAA. BUT — a normal user looking at the live page in light mode sees it as **harsh pure-black on cream**, which is technically readable but visually aggressive. Screenshot confirms it. Functionally fine, aesthetically wrong.

## The actual problem

`colors.text` in light mode is `#1a1209` (near-pure black). On `#fffbf5` (cream) that's a 14:1 contrast ratio. Pass. But the result is eye-stabbing — pure black on warm cream feels disjointed from the burnt-orange / amber / warm-brown palette of the rest of the page.

The other content on the page uses warm hues:
- Accent: `#d97706` (burnt orange)
- AccentDark: `#b45309` (deeper orange)
- Border tints: `rgba(217,119,6,0.18)` (warm amber)

A pure-black body text fights that warmth.

## The fix

Add a new color to the `c.light` palette: `textWarm` = `#3a2a1a` (warm dark brown). Then change the `bodyTextColor` helper in light mode to use it.

In dark mode, `bodyTextColor` stays as `colors.text` (cream — `colors.text` is already warm).

### Exact change

In the `c` object (around line 17-23), add to `light`:

```ts
light: {
  bg: "#fffbf5", nav: "rgba(255,251,245,0.92)", card: "rgba(255,255,255,0.96)", border: "rgba(245,158,11,0.18)",
  text: "#1a1209", textSoft: "rgba(26,18,9,0.6)", textMuted: "rgba(26,18,9,0.38)",
  textWarm: "#3a2a1a",   // ← ADD THIS
  ...
}
```

Then in the helper definitions (around line 37):

```ts
// BEFORE
const bodyTextColor = colors.text;

// AFTER
const bodyTextColor = theme === "dark" ? colors.text : colors.textWarm;
```

That's it. Two small edits.

## Why this works

- **Dark mode:** unchanged (still uses `colors.text` cream — was already warm)
- **Light mode:** `#3a2a1a` on `#fffbf5` = ~10.5:1 contrast (still WCAG AAA, still well above 7:1 AA Large)
- **Visually:** warm dark brown on cream feels like part of the same palette as the burnt-orange accents. Reads as "elegant restaurant menu" instead of "office Word document"
- **Scope:** 1 file, 2 line edits. Trivially reversible if Bazzy wants to test different values.

## Suggested variants if Bazzy wants to A/B test

| Value | Hex | Contrast on cream | Vibe |
|---|---|---|---|
| Current (pass 3) | `#1a1209` | 14:1 | Pure black, harsh |
| This fix | `#3a2a1a` | ~10.5:1 | Warm dark brown, elegant |
| Softer variant | `#4a3520` | ~8.5:1 | Cocoa brown, very soft |
| Punchier variant | `#2a1a0a` | ~12:1 | Deep espresso, still warm |

Pick `#3a2a1a` unless the visual feels off.

## Do NOT change

- The `c.dark` object
- Eyebrow colors (accentDark in light is correct)
- Placeholder color (works fine)
- Trust badge sub-labels (still using `textSoft` directly — they should stay muted)
- Footer copyright (still using `colors.text` directly — leave as-is, it's a signature line)
- Heading colors (still using `colors.text` — they SHOULD stay near-black for impact)
- Any other vertical, file, layout, animation, structure

## Verification

1. `npm run build` — 0 errors
2. `npm run dev` on port 3060 → browser preview
3. Toggle to light mode
4. Verify body text is now warm dark brown, not pure black
5. Verify dark mode looks identical (no regression)
6. Verify headings (h1, h2, h3) are still near-black for impact
7. Verify trust badge sub-labels and footer copyright are unaffected

Commit message: `fix: restaurant — body text warm-brown in light mode (was pure black, felt harsh)`

## Working Directory

`/Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory`

## Codex Invocation

```bash
codex exec --dangerously-bypass-approvals-and-sandbox "$(cat docs/briefs/restaurant-warm-text-brief.md)"
```

Model: `gpt-5.5` (default in `~/.codex/config.toml`).
