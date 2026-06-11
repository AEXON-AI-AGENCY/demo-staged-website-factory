# LAW FIRM — Vertical Build Brief

**Vertical:** Morrison & Associates Law
**File:** `app/law-firm/page.tsx` (does not exist yet — create it)
**Route:** `/law-firm` → `demo.aexonai.com/law-firm` after deploy
**Stack:** Next.js 16.2.6 (Turbopack), React 19, `next/font/google`, inline styles (NO Tailwind utilities — the established vertical pattern)
**Status:** Brand new file. Mirror the canonical `app/real-estate/page.tsx` structure (most recent vertical). The vertical data is already registered in `lib/verticals.ts` — use that, do not duplicate it.

---

## Brand & Data (from `lib/verticals.ts["law-firm"]`)

| Field | Value |
|-------|-------|
| Name | Morrison & Associates Law |
| Tagline | Fighting for You. Every Step. |
| Industry | Law Firm |
| Location | Chicago, IL |
| Accent (dark) | `#1E3A5F` (deep navy — serious, trustworthy) |
| Accent (light) | `#15294a` (darker navy for light mode contrast) |
| Phone | `(312) 555-0923` |
| Email | `intake@morrisonlawchicago.com` |
| Address | `225 W Wacker Dr, Chicago, IL 60606` |
| Hours | `Mon–Fri: 8AM–6PM` |
| Services | Personal Injury · Family Law · Criminal Defense · Estate Planning · Business Litigation |
| About | Award-winning Chicago law firm. Contingency-fee personal injury cases. Free consultations. |
| CTA | "Get Free Consultation" |
| CTA sub | "Se habla español" |

---

## Voice & Content (law firm, NOT real estate / NOT restaurant)

Use law-firm language: attorneys, practice areas, consultations, case reviews, statutes, depositions, settlements, verdicts, contingency fees, retainer, "no fee unless you win." No "tasting menus" / "listings" / "walkthroughs." No NYC/Denver — all Chicago.

Tone: serious, trustworthy, professional. No emojis in body copy. Icons sparingly in trust badges only. No playful language. The "Se habla español" line in CTA sub should be present (it's in the registry data, and it signals accessibility).

---

## Spec (Non-Negotiable)

| Element | Value |
|---------|-------|
| Display font | Playfair Display (same as real estate + restaurant — editorial, serious, fits legal) |
| Body font | DM Sans |
| Color palette | Same dual-theme `c = { dark, light }` structure as restaurant/real estate. Swap in `#1E3A5F` / `#15294a` for the accent family. **Do not copy restaurant's amber nor real estate's blue** — navy is the brand. |
| Background image | Unsplash photo of Chicago skyline (river + skyscrapers, or a serious architectural shot). Pick one that reads well with a navy accent. `center/cover no-repeat fixed` over a `linear-gradient(180deg, ${bg} 0%, rgba(0,0,0,0.0) 100%)` — same dark-image-fade trick as restaurant/real estate. |
| Dark mode | `#080d18` bg, `#e6efff` text, navy accent |
| Light mode | `#f5f7fb` bg, `#0a1428` text, navy accent |
| Animation | Subtle rising particles or calm vertical drift (sparkle or "scale of justice" dots — keep tasteful, law firm is more restrained). Inline CSS keyframes, no canvas. |
| localStorage key | `morrison-law-theme` |
| WCAG | AA contrast minimum across both modes. Use the same `bodyTextColor` / `eyebrowColor` helper pattern. |

---

## The 12 Components (in order — same canonical vertical layout)

1. **Theme toggle (light/dark)** — sun/moon button in nav, localStorage-persisted, with a `mounted` guard
2. **Sticky navigation** — logo + "Morrison & Associates Law" + tagline pill left; 4 nav links center (Practice Areas, AI Intake, About, Contact); phone + theme toggle right
3. **Hero section** — eyebrow ("Free Consultations — Chicago Metro"), large H1 with accent on second phrase, subheadline, two CTAs (Free Case Review + Meet Our Attorneys), right-side Unsplash image card with overlay label
4. **Hours + location strip** — 3 cards: "Office Hours" / "Office Location" / "Speak to an Attorney" — same grid-strip pattern
5. **Service cards 01–04** — exactly FOUR cards numbered 01/02/03/04, large display numbers, navy accent. **Pick 4 of the 5 practice areas** — recommended: (1) Personal Injury, (2) Family Law, (3) Criminal Defense, (4) Business Litigation. Drop "Estate Planning" for visual rhythm (or keep all 5 with `repeat(auto-fit, minmax(220px, 1fr))` grid like real estate does)
6. **AI Concierge chat section** — 2-column: left = live mock conversation (5–6 turns) between a potential client and the AI; right = 4 feature highlights (Instant Case Evaluation, Attorney Matching, Statute of Limitations Alerts, Confidential Intake) — same `chatMessages` array structure
7. **Process steps 01–04** — exactly FOUR cards: e.g., (1) Free Case Review, (2) Attorney Match, (3) Strategy Session, (4) Resolution
8. **Trust badges** — exactly FOUR badges with icon + label + sub. Law-firm-flavored, restrained (no emoji overload): e.g., 🏛 "Super Lawyers 2024" / ⚖ "AV Preeminent Rating" / 🎓 "25+ Years Combined" / 🤝 "Se Habla Español" (or swap the last one for "Free Consultations" if you prefer)
9. **Contact section** — same "Get in Touch" / "Schedule a Free Consultation" / 4-row info (Address, Phone, Hours, Email) layout, **AND** apply the same opaque `colors.bg` panel fix from `d53aab5` to the outer `<section id="contact">` so the dark Unsplash photo doesn't bleed through. This fix is mandatory.
10. **Footer** — 3-column: brand + tagline / contact summary / "Free Case Review →" link. Bottom row: copyright. Same `colors.card` background.
11. **Bidirectional scroll animation** — `IntersectionObserver` on `.scroll-animate` class
12. **SVG inline animation / CSS keyframe overlay** — subtle, legal-themed, low key (e.g., slow rising "particles" or a calm horizontal sweep). NOT the heavy canvas from the roofing vertical.

---

## Contact form (in component #9, right column)

Same structure as restaurant/real estate: 2-col name/email, 2-col phone/best time, single select ("Practice area: Personal Injury / Family Law / Criminal Defense / Business Litigation / Other"), single select ("How urgent: Emergency / Within a week / Within a month / Just researching"), textarea for "Briefly describe your situation…", submit button "Request Free Consultation" with `alert()` on submit.

**Privacy note (optional but on-brand for law firms):** Add a small italicized line below the form: "Your information is confidential and protected by attorney-client privilege. We respond within 1 business hour." This is a trust signal that fits the vertical.

---

## Chat conversation content (component #6, left column)

Write 5–6 turns. Example tone (serious, supportive, professional):

- **User:** "I was rear-ended on the Kennedy Expressway last Tuesday. Other driver's insurance is calling me already. I have a herniated disc and missed a week of work. What should I do?"
- **AI:** "I'm sorry to hear that. First, don't give a recorded statement to the other insurer until you've spoken with an attorney — anything you say can be used to minimize your claim. Second, document everything: medical visits, lost wages, photos of the damage. I'd like to connect you with a personal injury attorney from our team for a free case review. Same-day appointments are available. Want me to hold one for you?"
- **User:** "Yes please. And does it cost anything upfront?"
- **AI:** "No. We handle personal injury cases on contingency — you pay nothing unless we recover for you. The initial consultation is free, and there's no obligation. I'm holding a 3pm slot today with Attorney Chen, who specializes in auto accident cases. I'll text you the address and a one-tap calendar invite."
- **User:** "3pm works. Thank you."
- **AI:** "Confirmed. Attorney Chen's office is at 225 W Wacker Dr, Suite 1500. Bring any medical records and the police report if you have them. He'll review your case, explain your options, and answer every question at no cost. If you can't make 3pm, I can rebook — just reply here."

(Codex can rewrite or polish. Keep it legal/serious, not restaurant/real estate.)

---

## Don't do

- **No restaurant vocabulary** (no reservations, no tasting menus, no dining)
- **No real estate vocabulary** (no listings, no walkthroughs, no buyers/sellers)
- **No amber/orange/blue palettes** — navy is the brand
- **No New York, no Denver** — all Chicago
- **No canvas animation** like the roofing vertical
- **No Tailwind utility classes** — inline styles only
- **No changes to `lib/verticals.ts`** — the data is already registered correctly
- **No changes to any other vertical** (hvac, plumbing, electrical, roofing, salon, restaurant, auto-repair, clothing, real-estate)
- **No changes to `app/demo/[vertical]/page.tsx`** — that route already works for law-firm via the registry
- **No changes to `app/page.tsx`** — the icon and listing for law-firm is already there
- **No fabricated test data** — use the actual values from `lib/verticals.ts["law-firm"]`

---

## Verification (all required)

1. `npm run build` — 0 errors
2. `npm run dev -- -p 3055` (or any open port) and visit `http://localhost:<port>/law-firm`
3. Confirm ALL 12 components render in order
4. Toggle light/dark — both modes readable, WCAG AA
5. Verify contact section has the opaque `colors.bg` panel (learned from `d53aab5`)
6. Verify Unsplash image loads and the gradient fade looks good top-to-bottom
7. Scroll the page — `.scroll-animate` elements fade in as they enter viewport
8. Theme persists across page reload
9. Save a screenshot to `docs/briefs/screenshots/law-firm-light.png` and `law-firm-dark.png`
10. Commit with: `feat: law firm vertical — Morrison & Associates (12 components)`

---

## Working Directory

`/Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory`

## Codex Invocation

```bash
codex exec --dangerously-bypass-approvals-and-sandbox --model gpt-5.5 "$(cat docs/briefs/law-firm-brief.md)"
```

Model: `gpt-5.5` (default in `~/.codex/config.toml`). Codex CLI 0.139.0 is required.
