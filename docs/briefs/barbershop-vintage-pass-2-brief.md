# Barbershop Vertical — Pass 2 Brief (live 2026-06-19)

**Status:** Local main is at `6b82948` (vintage rebuild + plate fix). This brief is for the next pass.
**Repo:** `website-factory/demo-staged-website-factory/`
**Files in scope:** `app/barbershop/page.tsx`, `app/barbershop/page.module.css`, `public/barbershop/*`
**Do NOT touch:** any other vertical, the d-slug prospects, the landing page. Only the barbershop route.

## Why this brief exists

Bazzy viewed the live vintage barbershop on 2026-06-19 and called out 5 specific issues. The red/white barber-pole border stripes feel like a banner ad, not part of the page. Fonts fight the layout. The plate float is too subtle. The "Chrome plates" copy is jargon for jargon's sake. And there is a blank-looking section in dark mode. This pass fixes all five.

## Standing requirements (do not violate)

- This is a **vintage** barbershop. Walnut, chrome, brass, sepia, cream. No pastel, no neon, no Memphis.
- The persistent background barber-pole must read as **a real barber pole** — diagonal red/white stripes inside a cylinder — not a flat border. Reference: `https://en.wikipedia.org/wiki/Barber%27s_pole` (red/white helix, brass cap).
- All animations must respect `prefers-reduced-motion: reduce` (the existing media query handles this; do not break it).
- Dark mode contrast must hit WCAG AA — body text 4.5:1, large text 3:1. Verify before shipping.
- Mobile responsive (existing breakpoints at 900px and 520px must continue to work).
- LocalStorage theme persistence (`bayside-barber-theme`) stays.
- Standing vertical checklist (2026-06-15): unique color scheme ✓, background image ✓, persistent bg animation across full page ✓ (this is what pass 2 adds), tile animations on scroll-reveal ✓ (this is what pass 2 strengthens), AI feature embedded ✓, light + dark mode ✓, unique font pairing ✓ (Bodoni Moda + DM Serif Text + IBM Plex Mono), unique button + tile hover animations ✓.

## The 5 changes

### 1. Remove all red/white barber-pole border stripes

These currently appear in 4 places, all using `public/barbershop/marquee-stripe.svg` (red diagonal stripes on cream) with the `poleRotate` keyframe (96px horizontal scroll, 1.2s linear infinite):

- **`.fixedPole`** — fixed at top of viewport, full width, 10px tall. The "banner bar" Bazzy dislikes.
- **`.tickerStripe`** — absolute top of `.priceTicker`, full width, 0.45rem tall.
- **.rotatingPole inside `.heroPoster`** — a 1rem-tall stripe inside the "Today's board" sidebar.
- **`.footerStripe`** — absolute top of footer, full width, 0.75rem tall.

**Action:** Remove all 4 elements. Delete the corresponding divs in `page.tsx` (lines 169 `.fixedPole`, 218 `.rotatingPole`, 227 `.tickerStripe`, 389 `.footerStripe`). Delete the CSS rules for `.fixedPole`, `.tickerStripe`, `.rotatingPole`, `.footerStripe`. Remove these selectors from the `prefers-reduced-motion` block (lines 1022-1029). **The `marquee-stripe.svg` file stays** — pass-2 change 2 may reuse the stripe pattern inside the new persistent barber pole, just not as a border bar.

### 2. Add a persistent background barber pole that spins as you scroll

A real barber pole, full height of the page, fixed in the viewport so it stays in place as the user scrolls. Diagonal red/white helix inside a chrome cylinder. Spins continuously. Lives behind all content (z-index 0 or below), does not block interaction, does not compete with text.

**Implementation direction:**

- Create `public/barbershop/barber-pole-bg.svg` (or use the existing `marquee-stripe.svg` if the visual works at scale). The asset must be a tall, narrow, repeating pattern — taller than wide — that reads as a barber pole when tiled horizontally behind the page.
- Add a new element `<div className={styles.persistentPole} aria-hidden="true" />` in `page.tsx` next to the existing `.paperGrain` (line 168).
- CSS: `.persistentPole` is `position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 0; background-image: url(...); background-repeat: repeat-x; background-position: center center; background-size: auto 100vh; animation: poleRotate 18s linear infinite; opacity: 0.18; pointer-events: none;` — or whatever treatment makes the pole visible-but-subtle behind the page content.
- The slow 18s rotation (vs the 1.2s of the old border) keeps it as ambient motion, not a banner. **Do not make it visually loud.** A faint cylinder behind the page that you notice when you stop reading.
- The `paperGrain` element is already at z-index 0 with `pointer-events: none`. The new pole layer should be at z-index -1 or stacked behind it, so the grain still sits on top of the pole for texture.
- **CRITICAL: the pole must not interfere with legibility.** Section backgrounds (`.introBand`, `.services`, `.testimonials`, `.contact`, `.footer`) all need to remain readable. Either: (a) the pole is at very low opacity (~0.10-0.18) so the section bg covers it visually, or (b) add `background: var(--barber-paper)` to the section wrappers to make them opaque against the pole. **Option (b) is safer** because the existing `.introBand`, `.services`, `.teamSection`, `.concierge`, `.testimonials`, `.contact`, `.footer` already have `position: relative; z-index: 1;` — they will cover the pole correctly.
- **The hero image is the exception.** The hero has its own background image; the pole behind it should not bleed into the hero. The pole's z-index being lower than the hero's image handles this naturally.
- Reduced-motion: in the existing `@media (prefers-reduced-motion: reduce)` block, set the pole's `animation-duration: 150ms; animation-iteration-count: 1;` so it freezes on a single frame instead of animating.

**Visual reference for the asset:** a barber pole is a cylinder with three helical stripes — red, white, red — wrapping around it, topped with a brass cap and a finial. The repeating stripe pattern from `marquee-stripe.svg` (red diagonal stripes on cream) is the right texture, but it needs to be vertically tall (full page height) and repeated horizontally. If `marquee-stripe.svg` works as a horizontally-tiled full-page background, use it directly with `background-size: auto 100vh; background-repeat: repeat-x`. If it reads as flat stripes instead of a pole, create a new `barber-pole-bg.svg` that includes a subtle vertical gradient (lighter at center, darker at edges) to fake the cylinder curvature.

### 3. Tile float / come-to-center animation on scroll

The current `plateFloat` keyframe is `0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); }` — a 2px idle wobble. Bazzy wants something that **responds to scrolling**: tiles rise into center as the user scrolls toward them, and recede or stay as they pass.

**Implementation direction (judgement call — pick the strongest of these three):**

**Option A — `scale` + `translateY` on enter/exit, scroll-driven via IntersectionObserver (recommended):**
- The current scroll-reveal (opacity 0→1, translateY 24px→0) is the "enter" state. Extend it to a longer motion: `translateY(60px) scale(0.94)` → `translateY(0) scale(1)`, 800ms ease-out.
- Add a new `IntersectionObserver` that watches the same plates but with two thresholds (e.g. 0.1 and 0.6) and toggles a `data-emphasis` attribute. When the plate is in the middle of the viewport, `data-emphasis="true"`, scale up to 1.03 + a slight `translateY(-6px)`. When it leaves the middle, return to neutral.
- The idle `plateFloat` wobble stays (or is removed — judgement call), but the emphasis is the scroll-driven lift.

**Option B — Subtle vertical drift driven by scroll position:**
- Use a `useEffect` that listens to `window.scroll` (throttled with rAF) and applies a per-tile `transform: translateY(scrollDelta * 0.04)` proportional to how far the tile is from the viewport center. This gives a parallax-y "rise into center" feel without a heavy observer.
- More work, smoother feel, but a perf risk on slow devices.

**Option C — Keep the existing reveal + boost the idle float:**
- Just change `plateFloat` to a bigger motion: `0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px) scale(1.02); }`, 5s ease-in-out infinite. Tile is animated harder when it's "alive" in the viewport.
- Least work, weakest result, but it ships.

**Pick A. It matches the standing requirement "tile animations on scroll-reveal" and gives Bazzy the "float to center as you scroll" feel he asked for.** The existing scroll-reveal IntersectionObserver is already wired — extend it, don't replace it.

**Don't break:** the existing `data-visible` reveal on first view, the reduced-motion override (plates stop floating in reduce-motion), the `plateFallbackReveal` SSR safety net.

### 4. Remove "Chrome plates" copy from the prices section

Current: line 248 `<h2>Chrome plates. Clean prices.</h2>`

**Replace with:** `<h2>The menu. Clean prices.</h2>` (matches the section eyebrow "Menu board" on line 247, avoids the chrome-plates jargon).

That's the only text change for this rule. The CSS class `.sectionHeader h2` keeps its size; the "Chrome plates" wording was the issue, not the typography of the heading itself.

### 5. Dark mode: the contact section + blank-looking areas

The most likely culprit is the **contact section** (lines 352-385 in `page.tsx`, `.contact` CSS line 791):
- Background: `var(--barber-walnut)` = `#2b1d12` (dark walnut brown)
- Text: `var(--barber-cream)` = `#fff7ea` (cream)
- In light mode: cream-on-walnut = high contrast, looks great.
- **In dark mode the `.dark` class flips `--barber-paper` to `#1a1108` and `--barber-walnut` to `#fff7ea`. The `.contact` background stays `var(--barber-walnut)` — which is now cream — and the form input backgrounds are still dark brown, but the section is reading cream-on-cream, hence the "almost completely blank" look Bazzy saw.**

**Fix:** In `.dark .contact`, override the background back to a dark color. Use either `--barber-deep-walnut` (`#1a1108`) or a new dark value. Keep the form input/select backgrounds dark and the text cream, so the section reads as a dark panel with cream text — same as light mode just with deeper contrast.

While you're in there, audit the rest of dark mode:
- **`.testimonials`** uses `background: rgba(200, 194, 182, 0.32)` (chrome-tinted, semi-transparent). On a dark page this may look gray-on-dark. Add a `.dark .testimonials blockquote` override that uses a darker bg.
- **`.posterCallout`** (line 273-281) — verify the dark mode contrast on the "Walk-ins welcome" poster.
- **`.concierge chatPanel`** — verify the chat bubble colors in dark mode.
- **`.footer`** — already has `background: var(--barber-deep-walnut)` which is dark in both modes, should be fine, but verify cream text contrast.

For each fix, confirm WCAG AA on body text and large text. If a section has no text or only iconography, no contrast change is needed.

## Acceptance criteria (must pass before "done")

- [ ] The 4 red/white border stripes are gone. The page has no `.fixedPole`, `.tickerStripe`, `.rotatingPole`, or `.footerStripe` element.
- [ ] A new persistent background barber-pole image is visible behind the page content, faint enough not to fight legibility, spinning slowly (~18s loop) and continuously.
- [ ] Service tiles ("chrome plates" / menu items) animate with a noticeable scale + translateY motion on scroll, not just the existing 2px idle wobble. The motion responds to the tile entering and leaving the viewport.
- [ ] The services section heading reads "The menu. Clean prices." (no "Chrome plates" copy).
- [ ] In dark mode, the contact section is a dark panel with cream text. No section reads as "almost completely blank."
- [ ] `npm run build` passes with no new warnings.
- [ ] Local preview on a free port (pick one not in use — try 3053 first, then 3054, etc.) shows all 5 changes. Take a browser screenshot of:
  - Light mode hero (to confirm no top border stripe)
  - Dark mode contact section (to confirm the contrast fix)
  - Scrolled-to-midpage view (to confirm the new persistent barber pole is visible behind content)
  - Service tiles mid-scroll (to confirm the new tile motion)
- [ ] Show Bazzy the screenshots + the local preview URL. **Wait for "push" before doing anything else.**
- [ ] `prefers-reduced-motion: reduce` honored: pole stops spinning, plates stop floating, all decorative animation halts.

## Do NOT

- Do not push to git. Codex builds + commits locally, then stops.
- Do not touch any other vertical.
- Do not edit `app/d/[slug]/page.tsx` or any prospect data.
- Do not change the canonical font pair (Bodoni Moda + DM Serif Text + IBM Plex Mono).
- Do not change the dark/light mode toggle behavior or localStorage key.
- Do not add a new Tailwind utility, new dependency, or new package.

## Pitfalls to avoid

- **Marquee-stripe.svg removal:** the file is still referenced by `@media (prefers-reduced-motion: reduce)` selectors. Update the reduced-motion block to remove the deleted selectors. Don't leave dead references.
- **The new persistent pole's z-index:** if it's above any section, content becomes unreadable. Test by scrolling to the testimonials, contact, and footer in both light and dark mode.
- **The new tile motion + reduced-motion:** the `data-visible` reveal can stay (it's a 600ms enter animation, not an idle motion). The new emphasis-state observer should be disabled in reduce-motion (plates stay at neutral scale, no scroll-driven lift).
- **Dark mode input/select contrast:** the `.contactForm input` / `.contactForm select` use `min-height: 2.9rem; padding: 0.8rem;` but no explicit background. In light mode they inherit from the section bg (walnut). In dark mode the section bg changes but the inputs may not, or may inherit a conflicting color. Test that the dropdowns are readable.
- **Codex gpt-5.5 may sit at 0% CPU mid-reasoning 5-10 min.** Don't kill early.

## What success looks like

Bazzy opens `demo.aexonai.com/barbershop`, scrolls top to bottom. No banner-bar stripes anywhere. A faint barber-pole cylinder is visible behind the page, spinning slowly, ambient not aggressive. As he scrolls through the menu section, the tiles rise into center with a noticeable scale+lift motion — not just a wobble. The services heading says "The menu. Clean prices." In dark mode, the contact section is a dark panel with clear cream text — no blank area. The vintage barbershop atmosphere is preserved (walnut, chrome, brass, sepia), but the page no longer reads as a candy-cane border ad.
