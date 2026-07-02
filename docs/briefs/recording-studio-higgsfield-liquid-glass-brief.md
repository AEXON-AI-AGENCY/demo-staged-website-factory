# Recording Studio Vertical — Higgsfield + Liquid Glass Build Brief

**Date:** 2026-06-28  
**Vertical:** Recording Studio  
**Canonical route:** `/recording-studio`  
**Target file:** `app/recording-studio/page.tsx`  
**Placeholder brand:** Backblock Studioz  
**Owner/domain expertise:** Bazzy / BackblockStudioz, Brooklyn NY  
**Frontend owner:** Codex CLI, `gpt-5.5` only  
**Orchestrator:** Hermes / Odin  

---

## 0. Core mandate

Build the Recording Studio vertical as the first **Higgsfield-assisted AEXON website factory demo**.

This is not a generic studio site and not a color-swapped version of prior verticals. It should feel like:

> **An immersive cinematic Brooklyn recording studio with Aave-grade liquid glass UI, Dirtverse-style creative confidence, and Platinum Sound-level music legacy energy.**

The current staged color scheme is rejected. Do **not** use the existing red accent (`#ef4444`) as the main identity. Red can appear only as a tiny recording LED accent if needed.

---

## 1. Design references studied

### Platinum Sound NYC — `https://platinumsoundny.com/`
Use for:
- Music-history storytelling
- Vinyl / record / timeline atmosphere
- Cinematic hero ritual
- Proof language: plaques, years, sessions, credits
- Studio as a cultural landmark, not just a room rental

Do **not** copy:
- The exact pale blue / platinum anniversary scheme
- The “25th anniversary” concept
- Any artist names, credits, or specific copy

### Webild Creative Portfolio
Use for:
- Oversized clean typography
- Floating stacked visual cards
- White-space confidence
- Soft card shadows and pill CTAs

Do **not** copy:
- Generic personal-portfolio copy
- The exact black-on-white creative portfolio layout

### Webild SaaS
Use for:
- Dark purple atmospheric SaaS hero
- Glowing pill buttons
- Floating nav / CTA rhythm
- Soft violet highlights

Do **not** copy:
- Generic SaaS “build faster” language
- Repeated logo pill row

### Webild Landscaping
Use for:
- Full-bleed cinematic hero image
- Testimonial / proof card floating over hero imagery
- Navigation layered directly on the image

Translate to studio:
- Control room / vocal booth hero
- Floating glass “artist testimonial / booking proof” card

### Dirtverse — `https://dirtverse.co/`
Use for:
- Big blunt creative-studio typography
- Minimal pill nav
- Weird kinetic object row / media row
- Large irregular image grid
- Editorial confidence
- Short, punchy copy

Translate to studio:
- Make the site feel like a creative ecosystem, not just a studio rental brochure.
- Use a large, irregular “inside the rooms” grid with studio visuals, waveforms, artist/session moments, gear, and service cards.

### Silo — `https://www.silosilosilo.com/`
Use for:
- Product/object seriousness
- Metallic material language
- Minimal type
- Sticky purchase/action logic
- Large isolated product/service modules

Translate to studio:
- Room tiers / session packages should feel like premium objects.
- Gear list and rates can use precise metallic cards rather than generic pricing boxes.

### Aave — `https://aave.com/` + `https://github.com/aave/interface`
Use for:
- True soft liquid-glass component language
- Tokenized surfaces
- Lavender/cyan gradient identity
- Rounded pill buttons
- Low-contrast borders
- Soft cards and subtle shadows
- Dark-mode app-panel confidence

Observed usable Aave values / patterns:
- Lavender: `#978EFF`
- Secondary lavender: `#BCBBFF`
- Pale lavender: `#E5E5FF`
- Cyan side of app gradient: `#2EBAC6`
- Magenta side of app gradient: `#B6509E`
- Dark app bg: `#1B2030`
- Dark app paper: `#292E41`
- Dark surface: `#383D51`
- Soft white card shadow from marketing site: `0 8px 20px rgba(33, 29, 29, 0.05), 0 0 6px rgba(0,0,0,.08)`
- Interface dark subtle divider: `#EBEBEF14`
- Drawer blur pattern: `backdrop-filter: blur(20px)` over nearly opaque dark surface
- Public site uses `color(display-p3 ...)` where possible, but normal hex/RGBA fallback is fine.

Do **not** copy:
- Aave brand, icons, logos, DeFi language, exact layout, or exact product cards.
- Aave’s content. Only translate the material/component system.

---

## 2. New recording studio color system

Reject the red scheme. Use this palette:

```ts
const studioTokens = {
  bgVoid: "#050711",          // near-black cinematic base
  bgNavy: "#0B1020",          // deep studio navy
  bgPanel: "rgba(20, 24, 38, 0.66)",
  bgPanelStrong: "rgba(24, 29, 45, 0.84)",
  glassBorder: "rgba(229, 229, 255, 0.16)",
  glassBorderStrong: "rgba(229, 229, 255, 0.28)",
  ink: "#F8FAFF",
  muted: "rgba(248, 250, 255, 0.68)",
  dim: "rgba(248, 250, 255, 0.42)",
  platinum: "#E5E5FF",
  lavender: "#978EFF",
  lavenderSoft: "#BCBBFF",
  cyan: "#2EBAC6",
  magenta: "#B6509E",
  amberLed: "#FFC857",        // tiny LEDs only
  recordRed: "#FF3B30",       // tiny recording indicator only, NOT main brand
};
```

Primary gradient:

```css
background: linear-gradient(135deg, #978EFF 0%, #B6509E 42%, #2EBAC6 100%);
```

Studio atmospheric gradient:

```css
background:
  radial-gradient(circle at 18% 18%, rgba(151, 142, 255, 0.22), transparent 34%),
  radial-gradient(circle at 82% 22%, rgba(46, 186, 198, 0.16), transparent 30%),
  linear-gradient(180deg, #050711 0%, #0B1020 46%, #050711 100%);
```

---

## 3. Liquid glass component rules

This is the signature technical/design layer. Components should feel like smoked acrylic over studio light.

### Base glass card

```css
.liquidGlass {
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.14),
    rgba(255,255,255,0.055) 42%,
    rgba(151,142,255,0.08)
  );
  border: 1px solid rgba(229,229,255,0.16);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.18),
    inset 0 -1px 0 rgba(0,0,0,0.22),
    0 20px 60px rgba(0,0,0,0.34),
    0 0 28px rgba(151,142,255,0.10);
  backdrop-filter: blur(22px) saturate(150%);
  -webkit-backdrop-filter: blur(22px) saturate(150%);
}
```

### Liquid edge highlight

Add a pseudo-element to key cards/buttons:

```css
.liquidGlass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background:
    linear-gradient(120deg, rgba(255,255,255,.38), transparent 24%, transparent 72%, rgba(46,186,198,.18)),
    radial-gradient(circle at 12% 0%, rgba(255,255,255,.34), transparent 28%);
  opacity: .65;
  mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 1px;
}
```

### Button material

- Primary CTA: pill, lavender/cyan gradient, glow, inset highlight.
- Secondary CTA: transparent smoked glass pill.
- Hover: translateY(-1px), increase glow subtly. No bouncy scale.
- Focus-visible: crisp lavender ring.

### Forms/input material

- Inputs are dark glass, not plain white.
- Border glows lavender on focus.
- Text must remain WCAG AA.

### Avoid

- Generic “glassmorphism” with white translucent cards on random backgrounds.
- Huge blur on text-heavy cards that reduces readability.
- Overusing glass everywhere; use it for nav, hero proof, concierge demo, pricing/package cards, and final booking panel.

---

## 4. Typography direction

Avoid prior vertical font repetition. Do not use Playfair + DM Sans.

Preferred stack:
- Display: **Space Grotesk** or **Bricolage Grotesque**
- Body: **Inter** or **Manrope**
- Mono labels: **JetBrains Mono**

Style:
- Big blunt headlines like Dirtverse.
- Tight tracking on hero display.
- Mono micro-labels for studio/gear/session details.
- No generic “Where every sound becomes a story” tagline pattern.

Suggested hero headline:

> **Where rough vocals become finished records.**

Alternates:
- **Book the room. Capture the take. Ship the record.**
- **A private room for records that need to feel expensive.**
- **The studio that books, briefs, and moves at artist speed.**

Use the first unless Bazzy redirects.

---

## 5. Macrostructure

Use a custom hybrid macrostructure:

> **Cinematic Hero → Signal Strip → AI Concierge Demo → Rooms as Objects → Creative Grid → Packages → Final Booking Panel**

This must differ from recent verticals:
- Not a 2-column hero text + image card.
- Not a 4-card service grid.
- Not a generic trust-badge row.
- Not Playfair/DM Sans.
- Not cream Unsplash background.
- Not sparkles/rising particles.

---

## 6. Required sections

### 1. Hero — cinematic studio control room

Requirements:
- Full-bleed dark cinematic studio background.
- Higgsfield-generated hero still/video when available; otherwise use a temporary CSS/gradient placeholder but structure must support swapping in the asset.
- Liquid glass nav.
- Hero headline + subcopy + two CTAs.
- Floating glass proof/testimonial card over the hero.
- Tiny recording LED is allowed.

Copy draft:

```text
Backblock Studioz
Where rough vocals become finished records.

A cinematic recording studio demo built for artists who need booking, rates, files, and follow-up handled before they even step in the booth.

[Book a session] [Hear the AI concierge]
```

Floating proof card draft:

```text
Tonight's session
7:30 PM · Vocal booth
AI concierge collected the artist brief, selected the room, quoted the block, and prepped the engineer notes.
```

### 2. Signal strip / proof metrics

Use Aave-like soft stat cards, not badges.

Draft metrics:
- `24/7` booking intake
- `4 hr` mix revision window placeholder
- `3 rooms` recording / podcast / mix
- `1 AI` concierge for booking + prep

Avoid invented claims like Grammy credits or plaque counts unless supplied.

### 3. AI Concierge demo — core product section

This is the actual AEXON value. It must feel real.

Layout:
- Large liquid glass chat panel.
- Side rail with “booking intent”, “room match”, “quote”, “engineer notes”.
- The AI should recommend a package and book a session.

Conversation draft:

```text
Artist: I need two hours tonight to cut vocals. Melodic rap, I have the beat and rough lyrics.

Concierge: I can get you into the vocal booth at 7:30 PM. For melodic rap, I’d book the vocal chain with light tuning prep and a 30-minute engineer setup.

Artist: What’s the total?

Concierge: Two-hour vocal session: $180. Optional same-night rough mix: +$75. Want me to hold the 7:30 slot and send the deposit link?

Artist: Yes, hold it.

Concierge: Locked. I sent the deposit link, added your beat upload request, and gave the engineer your session notes.
```

Must show quote + booking + prep. No placeholder chatbot.

### 4. Rooms as premium objects

Silo-inspired service modules, not generic cards.

Cards:
- Vocal Booth
- Control Room
- Mix/Master Suite
- Podcast / Voiceover Room

Each should include:
- Use case
- Best for
- Starting rate placeholder
- AI concierge action

### 5. Creative grid / inside the rooms

Dirtverse-inspired irregular media grid.

Possible tiles:
- Console LEDs / meters
- Vocal booth glass
- Artist headphones silhouette
- Waveform strip
- Gear rack
- Session notes / booking prep

Use a mix of visual tiles and text tiles. Avoid equal 4-card service grid.

### 6. Packages / rates

Aave/Silo material language.

Suggested packages:
- **Record** — hourly room + engineer
- **Polish** — vocal comp + rough mix
- **Release** — mix/master package
- **Content** — podcast / voiceover block

Use honest placeholder rates or “from $—” if not confirmed. Do not invent exact business rates unless Bazzy supplies them.

### 7. Final booking CTA

Dark cinematic close with liquid glass booking panel.

Copy draft:

```text
Tell the concierge what you’re making.
It will recommend the room, quote the session, collect the files, and prep the engineer before the artist arrives.

[Start a booking]
```

### 8. Footer

Minimal. Include:
- Backblock Studioz
- Brooklyn, NY
- Services
- Booking
- AEXON demo CTA: `https://aexonai.com/#consultation`

---

## 7. Higgsfield asset plan

Generate these before final Codex build if possible. If assets are not generated yet, Codex should implement stable placeholders and document exact replacement points.

### Generated asset URLs — 2026-06-29

Hero still generated with `gpt_image_2`:

```text
https://d8j0ntlcm91z4.cloudfront.net/user_3F3JYuspwrqOd8cxGsJUj4NHi61/hf_20260629_003646_99d7c46f-bb56-48d5-a456-b48718d405dc.png
```

Liquid glass material reference generated with `gpt_image_2`:

```text
https://d8j0ntlcm91z4.cloudfront.net/user_3F3JYuspwrqOd8cxGsJUj4NHi61/hf_20260629_003852_142feb6b-5711-4bb8-b1f6-03404231941d.png
```

Video motion loop attempted with `seedance_2_0`; current Higgsfield starter plan rejected it with `"Pro" or "Ultimate" plan required`. Use the hero still as the static hero until video is available, or retry video generation after the plan supports Seedance 2.0 image-to-video.

### Asset 1 — Hero still

Model default: `gpt_image_2` or `soul_location`.

Prompt:

```text
Cinematic Brooklyn recording studio control room at night, dark navy and black atmosphere, smoked glass vocal booth, large analog mixing console with tiny amber LEDs, platinum metallic details, lavender and cyan light reflections, premium high-end music production space, shallow depth of field, no people, no logos, no readable text, immersive film still, ultra realistic, wide 16:9 composition, space for headline on the left
```

### Asset 2 — Motion loop

Model default: `seedance_2_0` after hero still is approved.

Prompt:

```text
Slow cinematic dolly through a dark Brooklyn recording studio control room, console LEDs softly pulsing, lavender and cyan reflections moving across smoked glass, vocal booth light glowing in the background, subtle waveform-like light movement, premium music studio atmosphere, no people, no text, smooth 6 second loop, restrained motion
```

### Asset 3 — Liquid glass material reference

Prompt:

```text
Abstract liquid glass UI panels floating over dark recording studio equipment, smoked acrylic, rounded corners, refractive edge highlights, lavender and cyan glow, platinum reflections, premium app interface material study, no text, no logos
```

### Asset 4 — Room cards

Prompts:

```text
Premium vocal booth interior, dark acoustic panels, smoked glass window, single microphone silhouette, lavender cyan LED accent, cinematic, no people, no text
```

```text
Close-up of analog mixing console, faders and VU meters, amber LEDs, dark navy room, platinum highlights, shallow depth of field, cinematic, no text
```

```text
Mastering desk with studio monitors, clean dark premium environment, subtle violet glow, glass reflections, cinematic, no text
```

```text
Podcast and voiceover recording room, two microphones, dark acoustic treatment, premium lighting, cyan/lavender accents, no people, no text
```

---

## 8. Implementation requirements

### File architecture

Create:

```text
app/recording-studio/page.tsx
```

The page must export:

```ts
export type RecordingStudioProspect = {
  businessName: string;
  city?: string;
  phone?: string;
  email?: string;
  bookingUrl?: string;
  heroImageUrl?: string;
  services?: Array<{
    name: string;
    description: string;
    price?: string;
  }>;
};

export const DEFAULT_RECORDING_STUDIO_PROSPECT: RecordingStudioProspect = {
  businessName: "Backblock Studioz",
  city: "Brooklyn, NY",
};

export default function RecordingStudioPage({ prospect = DEFAULT_RECORDING_STUDIO_PROSPECT }: { prospect?: RecordingStudioProspect }) {
  // ...
}
```

Plug-and-play readiness is mandatory. This vertical must be able to accept prospect props for `/d/<slug>/` later.

### App hub update after build

After `app/recording-studio/page.tsx` exists and passes build:
- Flip `STAGED["recording-studio"]` from `true` to `false` in `app/page.tsx`.
- Change recording-studio accent away from red to lavender/cyan; suggested tile accent: `#978EFF`.
- Verify `demoUrl` remains `/recording-studio`, not `/demo/recording-studio`.

Do not push without Bazzy saying “push”.

---

## 9. Accessibility / responsive requirements

- Mobile-first responsive at 320 / 375 / 414 / 768 widths.
- No horizontal scroll.
- All text on glass must pass WCAG AA.
- Glass cards must include dark fallback background when backdrop-filter is unsupported.
- Respect `prefers-reduced-motion`.
- Do not animate layout properties; use `transform` and `opacity` only.
- Focus rings visible on every button/link/input.
- Buttons must not wrap to unreadable two-line pills on mobile.

---

## 10. Motion rules

Use restrained, cinematic movement:
- Slow light sweeps across glass panels.
- Subtle waveform shimmer.
- Console LED pulse.
- Scroll reveal with bidirectional IntersectionObserver.

Do not use:
- Sparkles
- Confetti
- Bouncy hovers
- Fast parallax that hurts readability
- One-time `unobserve()` scroll animations

IntersectionObserver must add class when visible and remove it when leaving viewport. No `observer.unobserve()` in callback.

---

## 11. Copy voice

Tone:
- Cinematic
- Confident
- Brooklyn creative
- Premium but not corporate
- Short, direct, artist-aware

Avoid:
- “Transform your sound” cliché
- “Where every X becomes Y” pattern
- Fake metrics
- Fake artist credits
- Generic “state of the art facility” filler

Preferred copy fragments:

```text
Book the room. Capture the take. Ship the record.
```

```text
The concierge handles the intake before the engineer hits record.
```

```text
Rates, rooms, files, and session notes — organized before the artist arrives.
```

```text
Built for studios that lose time to DMs, missed calls, and half-written booking requests.
```

---

## 12. QA checklist before commit

Run from `demo-staged-website-factory`:

```bash
npm run build
```

Then verify:

```bash
# Page exists
[ -f app/recording-studio/page.tsx ] && echo OK

# Plug-and-play exports
grep -n "RecordingStudioProspect\|DEFAULT_RECORDING_STUDIO_PROSPECT\|prospect" app/recording-studio/page.tsx

# No old red identity as primary accent
grep -n "#ef4444\|red-" app/recording-studio/page.tsx app/page.tsx

# Required product demo language
grep -n "concierge\|quote\|deposit\|engineer\|booking\|session" app/recording-studio/page.tsx

# Scroll animation pitfall check — no unobserve
grep -n "unobserve" app/recording-studio/page.tsx

# Demo hub route pattern
grep -n "recording-studio" app/page.tsx
```

Expected:
- `npm run build` exits 0.
- `unobserve` returns no matches.
- `#ef4444` is not used as recording-studio primary accent.
- Recording studio tile is no longer staged only after page exists and build passes.

Browser QA:
- Hero glass nav readable over background.
- Liquid glass effect visible but not muddy.
- Mobile hero CTA fits.
- AI concierge section clearly shows quote + booking + engineer prep.
- Light mode is optional only if this vertical uses a dark-only cinematic theme, but if a theme toggle exists both modes must be AA.

---

## 13. Codex handoff command shape

Codex must be invoked with `gpt-5.5`.

Suggested prompt:

```bash
codex exec --full-auto "Read docs/briefs/recording-studio-higgsfield-liquid-glass-brief.md and build the Recording Studio vertical exactly as specified. Create app/recording-studio/page.tsx, make it prospect-prop-ready, update app/page.tsx only after the route exists, run npm run build, and report changed files plus verification output. Use gpt-5.5."
```

If Codex times out:
1. Check whether `app/recording-studio/page.tsx` was created.
2. If created, run `npm run build` and fix mechanical errors.
3. If not created, do not re-delegate repeatedly; controller can build from this brief.

---

## 14. Success definition

This build succeeds if:

- It looks nothing like the current AEXON verticals.
- The old red recording-studio scheme is gone.
- It has a real liquid-glass component language inspired by Aave, not generic blur cards.
- It feels cinematic and immersive, like a studio artists want to book.
- Higgsfield assets have clear slots and prompts.
- The AI concierge demo is obviously the product.
- It is plug-and-play-ready for prospect personalization.
- Build passes.
- No push happens until Bazzy explicitly says `push`.
