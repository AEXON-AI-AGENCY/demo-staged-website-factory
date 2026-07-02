# Recording Studio V2 — Do It Right Cinematic Higgsfield Rebuild

## Why this exists
The first shipped pass failed the purpose of using Higgsfield: it used one static background image and ordinary landing-page sections. This pass must make Higgsfield visibly matter.

Do not make a normal landing page with a background image. Build a cinematic interactive studio trailer experience that still works as a website.

## Assets already generated and committed
Use local runtime assets, not remote Higgsfield URLs:

```txt
public/higgsfield/recording-studio/hero-poster-nano-banana-pro.png
public/higgsfield/recording-studio/hero-loop-kling-3.mp4
public/higgsfield/recording-studio/liquid-glass-material-gpt-image-2.png
public/higgsfield/recording-studio/manifest.json
```

Asset models:
- `hero-poster-nano-banana-pro.png` — Nano Banana Pro (`nano_banana_2`)
- `hero-loop-kling-3.mp4` — Kling v3.0 (`kling3_0`), 5-second image-to-video hero loop
- `liquid-glass-material-gpt-image-2.png` — GPT Image 2 material reference

## Hard critique to fix
The current page is terrible because:
- Higgsfield does not drive the experience.
- There is no cinematic animation system.
- It feels like a static Codex page, not a recording-studio trailer.
- The page has too much dead empty vertical space.
- The AI concierge is informative but not visually compelling.
- The room/package sections are ordinary cards.

## Frontend goal
Rebuild `app/recording-studio/page.tsx` into a premium cinematic microsite.

The first viewport must instantly show:
- a full-bleed autoplaying muted video loop from `/higgsfield/recording-studio/hero-loop-kling-3.mp4`
- poster fallback from `/higgsfield/recording-studio/hero-poster-nano-banana-pro.png`
- moving glass/refraction overlays
- animated waveform/meter language
- a real studio trailer feel
- large headline, but not so huge that it crowds the asset
- clear CTA and proof capsule

## Must preserve
- `export type RecordingStudioProspect`
- `export const DEFAULT_RECORDING_STUDIO_PROSPECT`
- default export accepting `{ prospect }`
- compatibility with existing prospect objects using either `businessName` or `name`, `heroImageUrl` or `heroImage`, service `name/description` or `title/body`
- mobile responsiveness
- reduced-motion support
- no `observer.unobserve()`
- no push from Codex

## Visual direction
Make it feel like:
- a Netflix-style studio trailer page
- Aave-grade liquid glass controls
- Bloomberg-terminal-meets-recording-console data panels
- Brooklyn studio at 2AM
- a premium motion design case study, not a brochure

Use:
- black/navy base
- lavender/cyan beams
- amber LEDs
- frosted glass overlays
- refraction-edge highlights
- animated scanlines/waveforms/meters
- diagonal composition
- short punchy copy

Avoid:
- a huge static headline swallowing the hero
- plain equal-height cards
- dead blank spaces
- generic SaaS layout
- fake artist credits
- relying on just CSS gradients

## Required sections / experience

### 1. Cinematic hero trailer
Use a `<video>` element:

```tsx
<video autoPlay muted loop playsInline preload="metadata" poster="/higgsfield/recording-studio/hero-poster-nano-banana-pro.png">
  <source src="/higgsfield/recording-studio/hero-loop-kling-3.mp4" type="video/mp4" />
</video>
```

Layer on top:
- smoke/light sweep pseudo elements
- animated glass nav
- animated REC indicator
- floating “Tonight’s session” glass card
- audio-meter strip that animates continuously
- headline: `Where rough vocals become finished records.`
- subcopy: `The room, quote, files, and engineer notes move before the artist walks in.`

Hero must not exceed about 100vh plus the next section peek. No giant empty gradient after it.

### 2. Motion proof strip
Instead of static metrics, create a horizontal console strip:
- 24/7 Intake
- Room Match
- Quote + Deposit
- Engineer Brief
- Files Ready
Each tile should have animated mini meters / progress beams.

### 3. AI concierge as animated command center
This section should be the strongest product proof.

Layout:
- left: animated chat transcript with typing cursor / active row glow
- center/right: booking pipeline nodes: Intent → Room → Quote → Deposit → Engineer Notes
- bottom: waveform / file upload rail

Must show exact concepts:
- artist asks for session
- AI picks room
- quote appears
- deposit link appears
- engineer notes get prepared

The section should look like a studio operations screen, not a chatbot card.

### 4. Room sequence, not cards
Use a cinematic room reel:
- Vocal Booth
- Control Room
- Mix/Master Suite
- Podcast / Voiceover

Each room should feel like a scene tile, with a glowing image/material panel from the Higgsfield still/material asset if useful. Use object-card composition, glass tabs, animated edge light, and an active service rail.

### 5. Liquid glass material section
Use `/higgsfield/recording-studio/liquid-glass-material-gpt-image-2.png` as an actual visual reference tile/background, not just CSS inspiration.

Show 3 component primitives visually:
- booking capsule
- quote card
- session-prep drawer

### 6. Final booking scene
End with a compact cinematic booking panel, not a huge blank gradient.

## Animation requirements
- Autoplaying video hero loop is mandatory.
- CSS animations for meters/waveforms/light sweeps are mandatory.
- Scroll reveals are allowed but must not cause invisible content or dead blank screens.
- Use bidirectional IntersectionObserver if used.
- Respect `prefers-reduced-motion`: video can remain poster-only and CSS animations stop/reduce.
- Keep animations smooth: transform/opacity/filter/background-position only.

## Performance
- Use committed local media assets.
- Video is ~4MB, acceptable for this demo; use `preload="metadata"`.
- Avoid importing new packages.
- Avoid next/font additions.

## QA checks
Run:

```bash
npm run build
```

Then verify:

```bash
grep -n "hero-loop-kling-3.mp4\|hero-poster-nano-banana-pro.png\|liquid-glass-material-gpt-image-2.png" app/recording-studio/page.tsx
grep -n "RecordingStudioProspect\|DEFAULT_RECORDING_STUDIO_PROSPECT\|businessName\|heroImageUrl\|heroImage" app/recording-studio/page.tsx
grep -n "deposit link\|engineer notes\|quote\|Room Match\|Files Ready" app/recording-studio/page.tsx
grep -n "unobserve" app/recording-studio/page.tsx || true
```

Expected:
- build passes
- local media paths are referenced
- no `unobserve`
- page route still renders
- no broken TypeScript

## Success bar
If a viewer cannot immediately tell Higgsfield made this feel more cinematic and motion-led, the build failed.
