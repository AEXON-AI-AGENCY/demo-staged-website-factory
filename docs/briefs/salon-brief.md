# Salon Demo Design Brief

## Vertical: Nail Salon / Beauty Studio

## Design Language

### Font
- **Headings:** Cormorant Garamond (elegant serif — editorial/luxury feel)
- **Body/UI:** DM Sans (clean, modern, pairs beautifully with Cormorant)
- **Accent:** Cinzel (for labels, tags, nav — classical roman caps)

### Color Palette
| Role       | Hex       | Usage                            |
|------------|-----------|----------------------------------|
| Background | `#0D0611` | Deep plum-black                  |
| Surface    | `#1A0E26` | Elevated cards                   |
| Primary    | `#F472B6` | Hot pink — CTAs, accents         |
| Secondary  | `#C084FC` | Soft purple — secondary accents  |
| Gradient   | `#F472B6 → #C084FC` | Gradient fills      |
| Text       | `#FAF5FF` | Near-white with violet tint      |
| Muted      | `#A78BFA` | Labels, secondary text           |
| Glow       | `rgba(244,114,182,0.15)` | Ambient glows |

### Layout Structure: Editorial Columns
- Full-bleed hero with centered text over animated background
- Three-column service cards with image-forward aesthetic
- Diagonal/angled section dividers (use `clip-path` polygons)
- Ribbon-style trust badges
- Pink-purple gradient footer with brand accent

### Signature Animation: Polish Drip + Particle Shimmer
1. **Polish drip** — vertical shimmer lines fall like nail polish dripping down the screen. Subtle, continuous, slow. CSS `@keyframes` drip animation using `::before` pseudo-elements on each card.
2. **Shimmer highlight** — horizontal highlight sweeps across card surfaces on hover (gradient moving left to right)
3. **Floating sparkle particles** — 6–8 small `*` or `✦` emoji floating up slowly with varying speeds and opacity
4. **Ambient glow orbs** — two slow-pulsing radial gradient orbs (pink + purple) behind the hero content

### Card Hover Effects
- Scale 1.02 + translateY(-8px)
- Pink glow box-shadow on hover
- Shimmer gradient sweeps left-to-right across card surface
- Border shifts from muted to primary pink

### Form Style
- Dark surface cards with pink focus rings
- Gradient submit button (pink→purple)
- Floating labels (DM Sans)

## Sections
1. **Nav** — Logo left, phone right (Cinzel font), sticky with blur backdrop
2. **Hero** — "GLOW. GLAM. GO." headline in Cormorant Garamond 900, sparkle particles, ambient orbs, two CTAs
3. **Services** — 3-column grid: Manicure, Pedicure, Nail Art. Each card has an icon, title, short description, price range tag
4. **Trust bar** — "15+ Years | 4.9 Google | 8K+ Clients" — horizontal, pill badges
5. **Quote form** — Name, phone, email, service dropdown, date picker, message. Gradient CTA button
6. **Footer** — Dark with pink/purple gradient top border, hours, address, social links

## AI Feature
- "Book by Chat" — conversational booking form that asks for preferred date/time, service, and contact info

## File
- `app/demo/salon/page.tsx` — full inline-styles React page
- Routes: `/demo/salon`