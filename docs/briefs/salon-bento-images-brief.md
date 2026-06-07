# Brief: Add Service Images to Salon Bento Tiles

## Goal
The salon's "Our Services" BentoGrid currently uses icons (Scissors, Sparkle, Droplet, Flower). The user wants **actual service photos** in the 4 bento tiles, one per service. The user said: *"You had images before you changed the tile style. Just add some appropriate images please."*

## Files to read first
- /Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/ORCHESTRATOR_RULES.md
- /Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/tools/shadcn.md
- /Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/tools/magicui.md
- /Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory/components/ui/bento-grid.tsx
- /Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory/app/demo/salon/page.tsx (focus on the BentoGrid section)

## Image source — Unsplash (recommended)
Use Unsplash's direct image URLs. These are free, no API key required, and work perfectly with Next.js. Format:
```
https://images.unsplash.com/photo-{ID}?w=1200&q=80&auto=format&fit=crop
```

Suggested Unsplash photos that match each service (verify they exist and look right by reading the URL response headers — but the photo IDs below are known-good as of the install date):

- **Hair Styling** (large tile, top-left, the pink-to-purple gradient cell): hair salon / stylist / scissors / haircut
  - `https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80&auto=format&fit=crop` (hair salon chair + mirror)
  - Backup: `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80&auto=format&fit=crop`
- **Facial & Skin** (top-right): facial treatment / spa skincare / esthetician
  - `https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80&auto=format&fit=crop` (facial treatment close-up)
  - Backup: `https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=80&auto=format&fit=crop`
- **Nails & Spa** (middle-right): manicure / nail polish / hands
  - `https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=80&auto=format&fit=crop` (manicure close-up)
  - Backup: `https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=80&auto=format&fit=crop`
- **Body Treatments** (bottom-left, smaller cell): spa / massage / body / towels / candles
  - `https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&auto=format&fit=crop` (spa massage)
  - Backup: `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80&auto=format&fit=crop`

If you want to use different photos, browse https://unsplash.com/s/photos/hair-salon etc. and pick a photo you can verify returns a 200. Use the photo's `images.unsplash.com/photo-...` URL.

Alternative: download each photo into `public/salon/{service}.jpg` and reference as `/salon/hair-styling.jpg`. This is more reliable (no third-party domain in production) and recommended if the file size isn't a concern. Use curl to download:
```bash
mkdir -p public/salon
curl -L -o public/salon/hair-styling.jpg "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80&auto=format&fit=crop"
curl -L -o public/salon/facial-skin.jpg "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80&auto=format&fit=crop"
curl -L -o public/salon/nails-spa.jpg "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=80&auto=format&fit=crop"
curl -L -o public/salon/body-treatments.jpg "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&auto=format&fit=crop"
```

**Pick one approach (download to public/ recommended) and stick with it.**

## Implementation
1. Read `components/ui/bento-grid.tsx` to see the exact prop API for `BentoCard`. It already supports an `Icon` prop — but for image tiles, you'll need a different approach. Options:
   - **Option A (cleanest):** Add a new prop `backgroundImage?: string` to `BentoCard`. When set, render a full-bleed background image inside the card with a dark overlay (`bg-gradient-to-t from-black/70 via-black/20 to-transparent`) and put the title/description/cta in the foreground. Title and price should be in white, description in white/80.
   - **Option B (faster):** In the salon page only, pass the image as a CSS background to the existing card's `background` prop, and use a wrapper to layer the text. Less reusable.

**Use Option A.** It keeps the bento-grid component reusable for other verticals.

2. In `app/demo/salon/page.tsx`:
   - Import the bento grid (already imported)
   - Pass `backgroundImage="/salon/hair-styling.jpg"` (or whatever path) to each `BentoCard`
   - Remove the `Icon` prop for the image cards (or keep it as a small badge in the corner if it adds value — your call)
   - Keep all the existing className overrides on the large Hair Styling cell (the `[&_h3]:!text-white [&_p]:!text-white/80 [&_svg]:!text-white` and `!bg-transparent`)

3. For the large Hair Styling cell (col-span-2 row-span-2):
   - The pink-to-purple gradient background was nice but with a real photo, the photo replaces the gradient
   - Keep the photo as the primary visual, and add a subtle pink-to-purple gradient overlay at the bottom (`bg-gradient-to-t from-pink-600/60 via-purple-500/20 to-transparent`) so the text is readable
   - Title "Hair Styling — From $85" in white, large
   - Description in white/80
   - "Book Now" button in white background with pink text (or transparent with white border + white text)

4. For the 3 normal cells (Facial & Skin, Nails & Spa, Body Treatments):
   - Full-bleed photo as the card background
   - Dark gradient overlay from bottom (similar to the large cell but stronger — `from-black/80 via-black/30 to-transparent`)
   - Title and price in white at the bottom
   - Description in white/70 above the title
   - Icon hidden or removed (the photo IS the icon now)

5. Ensure `next.config.ts` (or `next.config.mjs` / `next.config.js`) allows images from `images.unsplash.com` if you use Option A without downloading. If you go with downloading to `public/`, no config needed.

## CRITICAL CONSTRAINTS
- DO NOT touch PolishDripCanvas
- DO NOT touch the nav, footer, light/dark toggle, body bg logic
- DO NOT touch the hero text ("GLOW STUDIO", "SALON & SPA")
- DO NOT touch other verticals (plumbing, hvac, electrical)
- DO NOT change `app/layout.tsx` or font variables
- DO NOT change BlurFade delays or section structure
- DO NOT remove the existing `services` array or `ServiceCard` component (dead code is fine)
- DO NOT change the "From $X" price formatting — keep it appended to the name
- The bento card layout (col-span-2 row-span-2 for first cell) MUST be preserved

## Verify
Run from project root:
```
cd "/Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory" && npx tsc --noEmit
```
Must pass with zero errors.

Do NOT deploy — Hermes will deploy after reviewing.

## Return summary
Return:
1. Image source approach used (downloaded to public/ vs Unsplash URLs)
2. Files modified
3. New props added to BentoCard (if any)
4. Whether npx tsc --noEmit passed
5. Any deviations

If something blocks you, STOP and report.
