# Recording Studio Neon Palette + Persistent Background Revision

## Context

The first Recording Studio vertical is structurally approved, but Bazzy rejected two visual issues:

1. The palette feels brown/sepia/analog and he wants something more vibrant / neon.
2. The page is missing the persistent background image that should carry through the whole page.

Preserve the successful page structure and copy. This is a focused visual revision.

## Project / deploy target

Work in:

`/tmp/demo-staged-website-factory`

This is the actual Vercel deploy repo for `demo.aexonai.com`.

## Files allowed

Prefer editing only:

- `app/recording-studio/page.module.css`

Only edit `app/recording-studio/page.tsx` if absolutely needed for the persistent background layer. Do not edit landing page counts, other verticals, or unrelated files.

## Keep unchanged

- The `/recording-studio` route
- Current sections and structure
- Backblock Studioz copy
- Service cards
- AI Concierge flow
- Form fields
- Landing page status (`15 live · 4 coming soon`, `recording-studio: false`) — already correct
- Build compatibility

## Visual target

Move away from brown/sepia into a vibrant neon recording-studio identity.

New palette direction:

- Base: near-black / blue-black / ink-black
- Primary neon: electric cyan / aqua
- Secondary neon: magenta / hot pink
- Accent: violet / ultraviolet
- Recording light: red can remain, but it should feel like neon REC, not earthy red
- Text: crisp off-white and cool-muted blue/lavender, not tan/brown
- Panels: glassy black, dark navy, graphite, subtle transparency over image

Avoid:

- Brown, tan, parchment, amber-as-main-accent
- Cream light mode that turns the whole page beige
- Any sepia / old paper / coffee / leather feeling

This should feel like a late-night vocal booth with LED strips, console lights, neon waveform, and city/studio glow.

## Persistent background image requirement

Add a full-page background image/atmosphere that persists through the whole page.

Preferred implementation:

- Add a page-level `::before` or `::after` fixed/absolute background layer in CSS.
- Use a relevant recording-studio image URL or downloaded local asset.
- It must be visible subtly throughout the page behind the hero and lower sections.
- Overlay it with dark gradients so all text remains readable.
- Inner panels/cards can stay opaque/glassy for readability, but the overall background image should still be perceptible across the page.

If using a remote CSS background image, use a stable Unsplash source URL for recording studio / soundboard / microphone / mixing console. If downloading an asset is easier, place it under `public/recording-studio/` and reference it locally.

## Motion / identity

Keep and improve existing tape deck / waveform / VU meter motifs. Make them neon:

- Cyan waveform sweep
- Magenta/violet meter glow
- Red REC light pulse
- Subtle neon border/glow on deck and channel strips

Animation must remain always visible and support reduced motion.

## Light mode

Light mode should not become beige. If light mode exists, make it a cool neon-light variant:

- Pale icy background / blue-white surfaces
- Deep navy text
- Cyan/magenta accents
- No brown/tan variables

Maintain WCAG AA contrast.

## Required verification before handoff

Run:

```sh
npm run build
```

Also grep to prove brown/tan values are gone or no longer dominant:

```sh
grep -n -E "#f6eddf|#eadac2|#fff8ec|#9a4f00|#b79f78|#6a5434|#120f0d|#1d1915|#282119|#34291d" app/recording-studio/page.module.css
```

Expected: no matches or only comments explaining old palette removal.

Commit the revision locally with a clear message. Do not push.
