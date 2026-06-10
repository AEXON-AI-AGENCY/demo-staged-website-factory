# Restaurant Vertical — Contact Section Background Fix (Light Mode Only)

**Vertical:** restaurant (The Golden Fork)
**Page:** `app/restaurant/page.tsx`
**Scope:** ONE section. ONE file. The "Get in Touch" / "Reserve Your Table" / contact info block at the bottom of the page (lines 321–365). Nothing else changes.

## What the user said (exact)

> YOURE NOT CHANGING THE FONT IN THE SPECIFIC SECTION IM TALKING ABOUT!!!!!!!!!!
> THE ONLY FONT THAT NEEDS TO BE ADJUSTED TO BE VISIBLE IS THE PART THAT SAYS
> "Get in Touch / Reserve Your Table / For private events… / Address / Phone / Hours / Email"
>
> Its near the bottom of the page and what makes it difficult to see is the font color. Because, the background image is of a dark bread basket on a dark table. This means the 2 similar colors make it hard to read. **thats the ONLY portion i want fixed.** Not the font of the whole page or other sections. This is specifically in light mode.

Translation: the user is asking for the *text to be visible* in the contact section. They identified font color + dark background image as the cause. They are **not** asking for a different font family, not asking for any other section touched, and not asking for dark mode changes. The visible element they want fixed is exclusively the contact section in light mode.

## Root cause (verified by reading the file + vision QA of latest screenshot)

The page wrapper (line 88) sets a single background that combines a `linear-gradient(180deg, ${colors.bg} 0%, rgba(0,0,0,0.0) 100%)` with a fixed dark Unsplash food photo. The gradient goes from opaque cream at the top to **fully transparent at the bottom**. As the user scrolls down, the dark photo progressively bleeds through. The contact section sits at the very bottom, where the gradient is 100% transparent — so the dark photo IS the background for that section.

The contact text uses `colors.text` / `bodyTextColor` which are dark (`#1a1209` in light mode). Dark text on a dark photo = unreadable. This affects ONLY the contact section because every other section above it still has cream gradient overlay covering the photo.

The right-hand form inside the contact section is already readable because it has its own opaque `background: colors.card` card. The left-hand text column has NO card and is directly on the bleeding-through dark photo.

## The fix (very narrow, surgical)

Wrap the entire `<section id="contact">` (line 322) — the outer section element only — with an opaque cream background so the dark photo cannot bleed through behind the contact text. Two acceptable approaches — pick ONE:

**Option A (preferred — minimal change):** Add `background: colors.bg` and a subtle inset border to the outer `<section id="contact">` element. Increase the section's `padding` slightly to keep the same visual rhythm. No other styles change.

```tsx
<section
  id="contact"
  style={{
    position: "relative",
    zIndex: 2,
    padding: "5rem 2rem",
    maxWidth: "1200px",
    margin: "2rem auto",          // gap from the section above
    background: colors.bg,        // opaque cream — blocks dark photo bleed
    borderRadius: "20px",         // matches the form card's language
    border: `1px solid ${colors.border}`,
    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
  }}
>
```

**Option B (only if Option A causes layout shift complaints):** Keep the section transparent, but wrap the inner 2-column `<div>` (line 323) in a card with `background: colors.card` and `borderRadius: "20px"` + `padding: "2.5rem"`. This isolates the bleed fix to the column wrapper.

Use Option A. The form card on the right will then visually pair with the new section background — a balanced, intentional contact "panel."

## Things to KEEP unchanged (do not touch)

- The `c` color object
- `eyebrowColor`, `bodyTextColor`, `placeholderColor` helpers
- Font families, font weights, font sizes in the contact section text
- Text colors (`colors.text`, `bodyTextColor`, `eyebrowColor`) — these are correct; the issue is the background bleeding through, not the text color value
- All sections ABOVE the contact section (hero, services, AI agent, process steps, trust badges) — they are readable, do not add backgrounds to them
- The form (lines 342–363) — its own `colors.card` background is fine
- The footer (lines 367–379) — it already has its own `background: colors.card`
- The page wrapper background (line 88) — the gradient + photo design is intentional elsewhere
- Dark mode — the fix uses `colors.bg` which is opaque in BOTH modes (`#fffbf5` light, `#0f0a05` dark), so the contact section will also get a proper dark-mode background panel. This is a small bonus, not a regression.
- All other verticals (hvac, electrical, salon, plumbing, auto-repair, roofing, clothing) — do not touch
- Any layout, structure, animation, scroll behavior, theme toggle logic, form behavior, or component order

## Verification (do all of these)

1. `npm run build` — 0 errors
2. `npm run dev` (Next will pick an open port; Vercel subdirectory routing serves it at `demo.aexonai.com/restaurant`)
3. Open the restaurant page in a browser
4. Toggle to **light mode** (the moon/sun toggle in the nav)
5. Scroll to the bottom — the "Get in Touch" / "Reserve Your Table" section
6. Confirm: the section has a solid cream panel background, and ALL of the following text is clearly readable:
   - "Get in Touch" (eyebrow)
   - "Reserve Your Table" (heading)
   - "For private events, large party reservations…" (body paragraph)
   - "Address", "Phone", "Hours", "Email" labels and their values
7. Toggle back to **dark mode** — the contact section should also have a dark panel background (`#0f0a05`); text should still be readable, no regression
8. Scroll up and confirm the hero, process steps, trust badges, and footer look IDENTICAL to before — no other section changed
9. Take a fresh light-mode screenshot of the contact section and save it to `docs/briefs/screenshots/restaurant-light-contact-fix.png` (overwriting is fine)

## Commit message

`fix: restaurant — opaque contact section background (light mode readability)`

## Working Directory

`/Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory`

## Codex Invocation

```bash
codex exec --dangerously-bypass-approvals-and-sandbox "$(cat docs/briefs/restaurant-contact-section-bg-brief.md)"
```

Model: `gpt-5.5` (default in `~/.codex/config.toml`).
