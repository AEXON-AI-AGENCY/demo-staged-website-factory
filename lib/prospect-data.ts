// AEXON ProspectData — shared interface for all 19 verticals
//
// This file lives outside the per-vertical page.tsx files because
// "use client" pages can't export non-component values. By centralizing
// the type + per-vertical default + helper, every vertical can:
//   1. import the shared ProspectData type
//   2. declare its own DEFAULT_X_PROSPECT (vertical-specific values)
//   3. accept `prospect?:` prop
//   4. swap hardcoded business data with `shop.x` references
//
// Adding a new vertical to the prospect system: copy the pattern
// in app/recording-studio/page.tsx or app/salon/page.tsx.
//
// Per Bazzy 2026-06-22, all 19 verticals must accept prospect props
// from day 1 — no vertical ships without it.

export type ProspectData = {
  // Universal — every vertical uses these
  name: string;
  shortName?: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref?: string;
  city: string;
  state: string;
  address: string; // required — verticals that don't have an address use "" as a placeholder
  tagline?: string;

  // Common but optional — used by verticals that have them
  hours?: string;
  about?: string;
  ctaLabel?: string;
  ctaSubLabel?: string;
  ctaHref?: string;

  // Visual / brand
  heroImage?: string;
  heroImageAlt?: string;
  backgroundImage?: string;
  accentColor?: string;
  logoImage?: string;

  // Per-vertical extras (e.g. recording-studio's "liveRoomLabel",
  // barbershop's "tagline"). Each vertical defines its own
  // `extends ProspectData` type for type-safety on these.
  // Keeping the base loose means verticals can add their own
  // without modifying this file.

  // Services / products — used by verticals that render a service grid
  services?: Array<{
    eyebrow?: string;
    title: string;
    body?: string;
    copy?: string;
    image?: string;
    imageAlt?: string;
    tag?: string;
    [key: string]: unknown; // vertical-specific extras
  }>;

  // Tiered expiry (Bazzy 2026-06-22) — 14-day hard cap from email sent
  expires: string; // YYYY-MM-DD

  // Tiered expiry — 5-day from first visit clock (not yet built 2026-06-22)
  // first_visited_at?: string;

  // For the app/d/[slug]/page.tsx dispatcher
  vertical: string; // matches app/<vertical>/ segment
};

// Tiered expiry helper (Bazzy 2026-06-22)
// Compute the 14-day hard cap from email-sent date. The 5-day
// first-visit clock is not yet built; ship 14-day only.
export function expiresFromSentDate(sentDate: string, daysValid = 14): string {
  const d = new Date(sentDate);
  d.setUTCDate(d.getUTCDate() + daysValid);
  return d.toISOString().slice(0, 10);
}

// All 19 verticals — every one of these must have a DEFAULT_X_PROSPECT
// in its own page.tsx, and must accept prospect props. The list is the
// single source of truth for the dispatcher in app/d/[slug]/page.tsx.
export const ALL_VERTICALS = [
  "salon",
  "barbershop",
  "plumbing",
  "hvac",
  "electrical",
  "roofing",
  "auto-repair",
  "real-estate",
  "law-firm",
  "insurance",
  "clothing",
  "streetwear",
  "ecommerce",
  "tech-company",
  "recording-studio",
  "restaurant",
  "health-supplements",
  "food-brand",
  "influencer-brand",
] as const;
export type VerticalId = (typeof ALL_VERTICALS)[number];
