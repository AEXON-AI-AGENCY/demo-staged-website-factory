# /d/[slug] — Per-Prospect Dedicated Demo URL

**Goal:** Bazzy wants every prospect to have a DEDICATED URL on Vercel that renders the EXACT same /salon page Bazzy built and approved — just with the prospect's name/phone/email/city plugged into the same template fields. No new design. No industry content swaps. The page must look IDENTICAL to the original /salon, only the prospect-specific data differs.

**Live target:** `https://demo.aexonai.com/d/ani-african-hair-braiding/` should look like `https://demo.aexonai.com/salon/` but say "Ani African Hair Braiding" instead of "Glow Studio Salon", "Phoenix, AZ" instead of "18 Mercer Row, Studio 4, New York, NY", etc.

## Why this approach

- Earlier Codex (ced2ece commit) added industry-specific content tables for hair-braiding, barber, etc. **Bazzy rejected this** — he wants the vertical preserved as-is, with prospect data overlaid. We're reverting that. The original /salon was just reverted to c752c30.
- A previous static-HTML approach (in `public/d/ani-african-hair-braiding/index.html`) wrote a CUSTOM page from scratch. **Bazzy rejected that too** — it doesn't look like the vertical he built. We're replacing it with a proper Next.js dynamic route.

## Implementation

### Step 1 — Refactor `app/salon/page.tsx` to accept prospect data as props

The page is currently `"use client"` with hardcoded "Glow Studio Salon" defaults. The refactor:

1. **Find every hardcoded "Glow Studio Salon" / "Glow Studio" / "Glow. Glam. Go." / "212-555-0123" / "hello@glowstudiosalon.com" / "18 Mercer Row, Studio 4, New York, NY" string in the file.** Replace them with values from a `prospect` prop.
2. **Change the page signature** from `export default function SalonPage()` to `export default function SalonPage({ prospect }: { prospect: ProspectData })` where `ProspectData` is `{ name: string; phone: string; phoneHref: string; email: string; city: string; state: string; address: string; tagline?: string; }`.
3. **Default the `prospect` prop to the original Glow Studio values** so `app/salon/page.tsx` continues to render the same thing at `/salon` — just sourced from the prop, not hardcoded.
4. **For services / trust badges / hero copy** — keep the EXACT original Glow Studio copy. No industry-specific content tables. No "Box Braids" / "Knotless" / "Fade" / "Beard" / etc. The page looks like a nail salon demo always; only the business name, phone, email, and address change.

### Step 2 — Build the dynamic route `app/d/[slug]/page.tsx`

```tsx
import { notFound } from "next/navigation";
import SalonPage from "../../salon/page";

// Hardcoded prospect data — the source of truth for each slug.
// Add a new entry here per prospect, regenerate the static page via
// `generateStaticParams`, deploy.
const PROSPECTS: Record<string, ProspectData & { expires: string }> = {
  "ani-african-hair-braiding": {
    name: "Ani African Hair Braiding",
    phone: "(602) 555-0199",
    phoneHref: "tel:+16025550199",
    email: "aniafricanhairbraiding@gmail.com",
    city: "Phoenix",
    state: "AZ",
    address: "Phoenix, AZ",  // short form — we don't have a real street
    expires: "2026-06-20",   // ISO date — page shows "expired" if today > this
  },
  "bayside-barbershop": { ... },
  "glow-studio-salon": { ... original Glow Studio data ... },
};

export function generateStaticParams() {
  return Object.keys(PROSPECTS).map(slug => ({ slug }));
}

export default function ProspectDemo({ params }: { params: { slug: string } }) {
  const prospect = PROSPECTS[params.slug];
  if (!prospect) notFound();
  // 5-day expiry check — if today is past `expires`, render the expired state
  // instead of the page.
  const today = new Date().toISOString().slice(0, 10);
  if (today > prospect.expires) {
    return <ExpiredPage prospectName={prospect.name} expires={prospect.expires} />;
  }
  return <SalonPage prospect={prospect} />;
}
```

The expired state is a simple full-page overlay: "This demo expired on {expires}. Want a site like this? [Talk to AEXON AI →](https://aexonai.com/#consultation)".

### Step 3 — Delete the old static HTML files

- `public/d/ani-african-hair-braiding/index.html` (custom-template version Bazzy rejected)
- `public/d/bayside-barbershop/index.html`
- `public/d/glow-studio-salon/index.html`

The new dynamic route replaces all of them.

## Critical constraints

- **DO NOT change the visual design** of /salon. The page should look IDENTICAL at `/salon` (Glow Studio branding, original tagline, original services, original layout, original animations, original images, original everything).
- **DO NOT add industry-specific content tables.** The salon page stays a nail salon demo. We're not making it "look like hair braiding" — we're just swapping in the prospect's business name, phone, email, and city.
- **DO NOT touch other verticals** (plumbing, hvac, electrical, etc.).
- **DO NOT change the salon page's existing animations, canvas, or images.** The only thing that changes is the data displayed in the hardcoded fields.
- **DO NOT push to GitHub.** Commit locally. The orchestrator (Hermes) will push after Bazzy approves.
- All 3 prospect entries should be in the `PROSPECTS` dict for now: Ani, Bayside, Glow Studio.

## Test URLs (after build)

1. `https://demo.aexonai.com/salon` — must look IDENTICAL to before (Glow Studio, no prospect overrides)
2. `https://demo.aexonai.com/d/ani-african-hair-braiding/` — must look identical to /salon but with "Ani African Hair Braiding" / "(602) 555-0199" / "aniafricanhairbraiding@gmail.com" / "Phoenix, AZ"
3. `https://demo.aexonai.com/d/bayside-barbershop/` — same with Bayside data
4. `https://demo.aexonai.com/d/glow-studio-salon/` — same as /salon

## Verification

- `npm run build` must pass clean
- All 4 URLs above must render successfully
- Use `browser_vision` or curl to confirm the Ani URL says "Ani African Hair Braiding" not "Glow Studio Salon"

## Return format

Write `REACH_MESSAGE.txt` at repo root with:
- 1-2 sentence summary
- Confirmation `npm run build` passed
- The 4 test URLs
- Any design decisions (should be none — we're preserving the original exactly)
