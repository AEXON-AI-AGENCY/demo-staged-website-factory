# TECH COMPANY — Vertical Build Brief (Stripe-style enterprise landing, final vertical)

**Vertical:** Nexus AI
**File:** `app/tech-company/page.tsx` (does not exist yet — create it)
**Route:** `/tech-company` → `demo.aexonai.com/tech-company` after deploy
**Stack:** Next.js 16.2.6 (Turbopack), React 19, `next/font/google`, inline styles (NO Tailwind utilities)
**Status:** **THE 13TH AND FINAL VERTICAL.** This is the last demo site in the set. **DO NOT MIRROR ANY PRIOR VERTICAL.** Insurance was Carbon-flat / data-dense. E-commerce was Pinterest-masonry / image-first / warm. Tech Company must be the third distinct mood: **Stripe-style enterprise B2B landing** — elegant, technical, premium, big gradients, weight-300 display type, demo video mockup, "Trusted by N enterprises" stat bar, integrated pricing tiers.

---

## Brand & Data (from `lib/verticals.ts["tech-company"]`)

| Field | Value |
|-------|-------|
| Name | Nexus AI |
| Tagline | Intelligent Automation for Modern Enterprises |
| Industry | Tech Company |
| Location | Austin, TX |
| Accent (dark) | `#22d3ee` (Tailwind cyan-400 — bright cyan on dark) |
| Accent (light) | `#0891b2` (cyan-600 — deeper cyan for light mode) |
| Phone | `(512) 555-0192` |
| Email | `contact@nexus-ai.com` |
| Address | `8901 Data Blvd, Austin, TX 78701` |
| Hours | `Mon–Fri: 8AM–6PM` |
| Services | Agentic Workflows · Data Intelligence · Scalable Automation · Custom Software · Cloud Infrastructure |
| About | Enterprise AI platform helping businesses deploy intelligent automation at scale. Trusted by 200+ enterprises worldwide. |
| CTA | "Request Demo" |
| CTA sub | "Trusted by 200+ enterprises" |

---

## Voice & Content (B2B enterprise SaaS, NOT any prior vertical)

Tech Company is a **buy-enterprise-software product**. The page exists to drive a demo request and a sales conversation, not a quote, not a purchase, not a case review, not a tour, not a transaction. Voice: confident, technical-but-accessible, results-oriented, premium. No emoji. No "warm". No "tasty". No "trust the process".

Use SaaS enterprise language: platform, workflow, automation, agent, integration, deployment, scale, SLA, SOC 2, GDPR, API, infrastructure, observability, "shipped in days not months", ROI, time-to-value, "trusted by N enterprises", demo, sales-led.

---

## Spec (Non-Negotiable — deliberately different from all 4 prior moods)

| Element | Value | Why different |
|---------|-------|---------------|
| **Display font** | **Inter** (variable, weight 200-900, the modern SaaS standard) — display headlines at **weight 200 (ExtraLight)** for elegant Stripe-feel | NOT IBM Plex (insurance), NOT Fraunces serif (e-com), NOT Playfair (the 3 prior). Inter at 200 weight is signature enterprise SaaS. |
| **Body font** | **Inter** (same family — single-font page, like Stripe) | NOT DM Sans (e-com), NOT IBM Plex (insurance). |
| **Mono font** | **JetBrains Mono** (technical, code-feel, for the API endpoint, schema snippets, deployment stats) | NOT IBM Plex Mono (insurance), NOT DM Mono (e-com). |
| **Border radius** | **12px** on cards, **8px** on buttons, **8px** on inputs — modest, modern SaaS | NOT 0px (insurance), NOT 24px (e-com), NOT 14-20px (the 3 prior). |
| **Shadows** | **Multi-layer with cyan tint** on cards: `0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(34, 211, 238, 0.08)` — subtle, modern, hint of brand color in shadow | NOT none (insurance), NOT big soft (e-com). Cyan-tinted shadow is a Stripe/Linear hallmark. |
| **Background** | White `#ffffff` light / `#0a0a0a` near-black dark + **a very subtle large cyan radial gradient** in the hero area (like Stripe's hero glow), NOT a full photo | NOT cream (e-com), NOT Carbon-gray (insurance), NOT Miami (insurance). Tech-company gets a "glow" hero, not a photo. |
| **Persistent particles** | Tiny **hexagonal outlines** (3px) in cyan, 0.16 opacity, drifting upward over 18-24s with staggered delays. Or, alternative: small "code bracket" shapes `<>` `</>` drifting up. Hexagons preferred — they read as "data/network/tech" and pair with the cyan accent. | NOT shield (insurance), NOT leaf (e-com). |
| **Accent** | Cyan `#22d3ee` (dark) / `#0891b2` (light) | NOT IBM blue (insurance), NOT emerald (e-com), NOT navy/blue (the 3 prior). |
| **localStorage key** | `nexus-ai-theme` | — |
| **WCAG** | AA contrast minimum. | — |

---

## Macrostructure: Stripe-Style Enterprise Landing (deliberately NOT a clone of any prior)

Insurance was: nav → quote tool → rate table → 3 product bands → AI → trust grid → coverage stats → contact.
E-commerce was: nav → hero w/ featured product → filter pills → masonry grid → bundle → reviews → trust cards → AI quiz → FAQ → footer.

**Tech Company uses the Stripe pattern:**

1. **Nav** (sticky, white/dark with subtle backdrop blur, 64px tall — taller than the other verticals for breathing room, logo + 5 nav links + "Sign in" text link + "Request Demo →" pill button on the right)
2. **Hero with integrated gradient glow** (NOT a tagline, NOT a quote tool, NOT a featured product): centered headline at Inter weight 200, ~72px, with a **soft cyan radial gradient glow** behind it (a 600px circle of cyan-to-transparent behind the headline). Subtitle in Inter 400 20px. Two CTAs side by side: primary "Request Demo →" (cyan pill) + secondary "View Documentation" (ghost text link with arrow). Below the CTAs: a tiny eyebrow "TRUSTED BY 200+ ENTERPRISES" with 6 grayscale customer logo placeholders (use real-sounding names: Acme Corp, Globex, Initech, Umbrella, Hooli, Stark Industries). Below that: a small demo video mockup card — a 16:9 frame with a faux terminal/IDE screen showing "nexus deploy workflow.json" in JetBrains Mono on a dark bg with a tiny "▶ Watch 2-min demo" overlay button.
3. **3-up product feature row** (3 cards in a row, NOT 4 — Stripe uses 3-ups heavily): each card has a small cyan-tinted icon area at the top, a 1-line value prop title, 2-3 line description, and a "Learn more →" cyan link. The 3 features map to the top 3 services (Agentic Workflows, Data Intelligence, Scalable Automation) — drop the 2 less-frequent ones.
4. **Bento-style feature grid** (THE signature Stripe component — a 2x2 or asymmetric bento grid showing 4-5 capabilities, each tile with its own visual treatment): tiles for "Real-time observability dashboard" (with a tiny SVG line chart), "Multi-cloud deployment" (with a 3-cloud-icon row), "SOC 2 + GDPR + HIPAA compliance" (with 3 small badges), "Custom integrations via API" (with a tiny code snippet in JetBrains Mono on a dark tile), "Sub-second agent response times" (with a stat: "<800ms p99"). Each bento tile is a card with cyan accents. **This is the technical "show me the platform" section** — visually dense, asymmetric, technical.
5. **Code/terminal mockup section** (a full-width dark band with a faux terminal/IDE window showing real-looking code): header bar with traffic lights (red/yellow/green dots — this is the ONE place fake chrome is allowed because it's a real terminal metaphor, not a fake browser), then a JetBrains Mono code snippet:
   ```
   $ nexus deploy workflow.json --target prod
   ✓ Validating workflow...
   ✓ Provisioning agent cluster (3 nodes)
   ✓ Loading knowledge base (12.4k docs)
   ✓ Establishing integrations (Salesforce, Slack, Snowflake)
   ✓ Deploy complete — first run in 4.2s
   ```
   Below the code: a tiny "View on GitHub →" link. This is the "see it in action" proof section.
6. **Customer proof / stat band** (a single-row horizontal strip on a subtle cyan-tinted background): 4 large stats in Inter weight 200, 72px:
   - "200+" / "enterprises deployed"
   - "4.2s" / "median first-run latency"
   - "99.99%" / "platform uptime SLA"
   - "12B" / "agent invocations / month"
   No emoji. No logos. Just typography. The Stripe/Linear pattern: let the numbers speak.
7. **Pricing tiers** (3-column table, Stripe-style: Starter / Growth / Enterprise, each in a card): each tier has a tier name, a 1-line description, a price (Free / $2,400/mo / Custom), a feature list with checkmarks, a CTA button ("Start free" / "Start 30-day trial" / "Contact sales"). The Growth tier is the highlighted/featured one with a cyan border + "Most popular" tag. **No fake prices that imply per-seat complexity** — keep it simple SaaS pricing.
8. **Testimonials** (3 quote cards with avatar + name + title + company — label them clearly as sample/illustrative per hallmark rules): heads of platform, head of data, head of ops at fictional enterprise customers.
9. **FAQ** (smaller than e-com — only 3 questions, single column, expand on click, "How does pricing work?" / "What about data security?" / "Can I self-host?"): same accordion pattern as e-com, but with cyan accents.
10. **Final CTA band** (a single full-width cyan-to-blue gradient band, white text): "Ready to deploy intelligent automation?" headline (Inter 300, 48px), "Request Demo →" pill button (white on cyan), 1-line of trust copy.
11. **Footer** (dark `#0a0a0a`, 5-column link grid: Product / Solutions / Resources / Company / Legal + brand + tagline + small "© 2026 Nexus AI" mono)

That's 11 components — the Stripe pattern doesn't need 12, it needs a clear hero→features→proof→pricing→CTA flow.

---

## Required atmospheric production value (the 4 the user just praised, tech-company-flavored)

1. **Background "glow"** — instead of an Unsplash photo (which would feel too marketing-y for a Stripe-style page), use a **large soft cyan radial gradient** centered behind the hero headline (a 600-800px radial-gradient blob at 0.18 alpha) that fades to nothing. This is Stripe's signature hero treatment. The rest of the page is plain white/dark.

2. **Persistent background animation** — 18-22 small **hexagonal outlines** (3-4px, cyan, 0.16 opacity) drifting upward over 18-26s with staggered delays. Hexagons read as "network/tech/data". If hexagons feel too much, fallback to small `<>` bracket shapes (a single character each) in JetBrains Mono, drifting up. **NOT leaves, NOT shields, NOT sparkles.**

3. **Bidirectional scroll-in tile animations** — `.scroll-animate` class reworked same as insurance/ecommerce: opacity + translateY(36px) + scale(0.96) → 1, IntersectionObserver removes the class on exit so tiles re-float on re-entry. **30+ tile-stagger children** (3 product cards, 5 bento tiles, 4 stat cells, 3 pricing tiers, 3 testimonials, 3 FAQ items, 6 nav-feature links) — staggered 60-90ms per child for cascade.

4. **Button hovers:**
   - **Primary "Request Demo →" button** (cyan pill): cyan → deeper cyan (`#22d3ee` → `#0891b2`), 2px lift, cyan glow shadow that intensifies, animated shimmer sweep across the pill
   - **Secondary "View Documentation →"** (ghost): underline animates in, slight right-shift
   - **Bento tiles**: subtle 2px lift, cyan border lights up, internal element pulses briefly
   - **Pricing tier "Start free" / "Start trial" / "Contact sales" buttons**: same cyan hover pattern; the highlighted Growth tier button gets a 1.05x scale-up on hover
   - **"Learn more →" links under features**: cyan → deeper cyan, 3px right-slide
   - **Customer logo placeholders**: grayscale → full color on hover
   - **Nav links**: 2px bottom-border grows in cyan on hover

Plus the 4 standard atmospheric production features from the prior set:
- `prefers-reduced-motion: reduce` (collapse to 1ms)
- Mobile responsive (3-col → 2-col → 1-col at <640/920/1200)
- WCAG AA contrast
- Theme persistence in localStorage

---

## Code/terminal mockup (component #5) — full spec

This is the "show, don't tell" moment. Full-width dark `#0a0a0a` band, white text:

- Top: section title in white Inter 300, 32px, centered: "Deploy in minutes, scale globally"
- Below: a 16:9 dark card with a faux terminal/IDE header (3 traffic-light dots red/yellow/green on the left, a fake filename "nexus-cli — 80×24" in the center, white-on-dark). The body is JetBrains Mono 14px, 6 lines as specified above.
- Below the code: a "↳ Try the CLI" link in cyan and a "View full documentation →" link in white
- Subtle scanline overlay (1px horizontal line repeating at 4px intervals, cyan at 0.04 opacity) for retro-terminal feel

The traffic-light dots are allowed because they're a real terminal metaphor — not fake browser chrome. The brief's anti-pattern says "re-drawn UI chrome" is banned (fake browser bars, fake phone frames, fake code-block windows with a fake title bar wrapping a `<pre>`). For a tech-company site the terminal IS the content, not chrome — it's the right move. **Document this explicitly in the brief verification step so a human reviewer doesn't flag it.**

---

## Customer proof / stat band (component #6) — full spec

A single full-width band with a very subtle cyan-to-transparent radial gradient on the left side. 4 columns. Each column:
- Big number in Inter 200 (thin elegant), 72px, color `#22d3ee` cyan
- Label below in Inter 400, 13px, uppercase, 0.32px letter-spacing, color `#a1a1aa` (zinc-400)
- NO icons, NO emoji, NO company logos — just type

Stats (use these):
- **"200+"** / "ENTERPRISES DEPLOYED"
- **"4.2s"** / "MEDIAN FIRST-RUN LATENCY"  
- **"99.99%"** / "PLATFORM UPTIME SLA"
- **"12B"** / "AGENT INVOCATIONS / MONTH"

These are illustrative per hallmark rules (clearly labeled as "Sample platform stats — your real metrics here" in a small eyebrow above the band, or in the section's `data-` attribute). The pattern of "impressive SaaS numbers" is real; the specific numbers are placeholders.

---

## Bento feature grid (component #4) — full spec

This is the visual signature. Asymmetric 2x2 or 2x3 bento grid, each tile with its own internal layout:

- **Tile 1 (large, top-left, 2-col wide):** "Real-time observability dashboard" — title in Inter 600 24px, description, and a **tiny inline SVG line chart** (1 line going up, 1 line going up faster, x-axis 8 ticks, all cyan with low-opacity grid). The chart is real SVG (~50 lines of `<path d="..."/>`), not a placeholder.
- **Tile 2 (top-right, 1-col):** "Multi-cloud deployment" — title, description, 3 small cloud icon row (use simple inline SVGs of AWS/Azure/GCP-like shapes, NOT real logos — just generic cloud shapes in cyan)
- **Tile 3 (bottom-left, 1-col):** "SOC 2 + GDPR + HIPAA" — title, description, 3 small badge pills (white-on-cyan: "SOC 2", "GDPR", "HIPAA")
- **Tile 4 (bottom-right, 2-col wide):** "Custom integrations via API" — title, description, and a JetBrains Mono code snippet on a dark `#0a0a0a` inset: `import { Nexus } from '@nexus-ai/sdk' \n const agent = await Nexus.create({ \n   workflow: 'sales-intel', \n   integrations: ['salesforce', 'slack'] \n });`
- **Tile 5 (full-width, bottom):** "Sub-second agent response times" — title, description, big `<800ms p99` stat in Inter 200 56px cyan

Each tile is a card with the 12px radius, cyan-tinted shadow, cyan border that brightens on hover.

---

## Pricing tiers (component #7) — full spec

3 cards in a row. Each card has:
- Tier name (Inter 600, 18px): "Starter" / "Growth" / "Enterprise"
- 1-line description (Inter 400, 14px, color zinc-500): "For teams exploring agentic AI" / "For teams scaling automation" / "For organizations with custom needs"
- Price (Inter 200, 56px): "Free" / "$2,400" / "Custom" (with "/month" small text under Starter+Growth)
- "Most popular" cyan pill tag on Growth (with a small "←" arrow visual)
- Feature list, 5-6 items each, with cyan checkmarks (use small inline SVG check, not emoji ✓):
  - Starter: "Up to 5 agents", "10k invocations/month", "Community support", "1 integration", "Basic observability"
  - Growth: "Up to 50 agents", "500k invocations/month", "Priority support (4h SLA)", "Unlimited integrations", "Advanced observability + alerts", "SOC 2 + GDPR reports"
  - Enterprise: "Unlimited agents", "Custom invocation volume", "Dedicated CSM", "Custom integrations", "On-prem / VPC deployment option", "Custom SLAs"
- CTA button: "Start free" / "Start 30-day trial" / "Contact sales" — all cyan pill buttons; Growth has a stronger cyan border + scale-up on hover

Highlighted card: Growth tier gets a `2px solid #22d3ee` border and a "← MOST POPULAR" tag in cyan at the top, slightly elevated (translateY(-8px) by default).

---

## Final CTA band (component #10) — full spec

A full-width band, ~280px tall, with a horizontal **cyan-to-blue gradient** (`linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)`):
- Headline: "Ready to deploy intelligent automation?" — Inter 200, 48px, white
- Sub: "Get a 30-minute demo with a platform engineer. No slide decks." — Inter 400, 16px, white at 0.85 opacity
- CTA: "Request Demo →" — white pill button, on hover: 1px lift + slight scale + white-glow shadow + shimmer sweep
- Centered layout, 64px vertical padding

---

## Footer (component #11) — full spec

- Dark `#0a0a0a` background, full-bleed
- 5 columns: Product (Platform, Workflows, Data, Automation, Integrations) / Solutions (By industry, By role, By use case, Migration guide) / Resources (Documentation, API reference, Blog, Status, Changelog) / Company (About, Customers, Careers, Press, Contact) / Legal (Privacy, Terms, Security, DPA, Cookie policy)
- Brand name "Nexus AI" in Inter 600, 20px, color `#22d3ee` cyan
- Tagline: "Intelligent automation for modern enterprises." — Inter 400, 14px, color zinc-500
- Bottom: 12px JetBrains Mono: "© 2026 Nexus AI · Made in Austin, TX · SOC 2 Type II · GDPR · HIPAA"
- 0 social icons row (enterprise B2B doesn't need them) — or, if desired, just 2: GitHub and LinkedIn as tiny SVG icons in zinc-500

---

## Don't do (patterns banned because they were overused or wrong for this vertical)

- **NO Fraunces / Playfair / IBM Plex** (used by the prior 5 in some form)
- **NO 0px border-radius** (insurance)
- **NO 16-24px radius** (e-com)
- **NO 14-20px radius** (the 3 prior)
- **NO shield / leaf / sparkle particles** — use hexagons or `<>` brackets
- **NO botanical / Miami / city photo background** — use the cyan radial gradient
- **NO "30+ carriers" / "shop now" / "your home our mission" / "fighting for you" / "fuel your best self"** — wrong voice
- **NO 4-card service grid** (used 3x)
- **NO 4 numbered process steps** (used 3x)
- **NO 4 emoji trust badges** (used 3x) — use cyan checkmarks or 3-letter compliance badges
- **NO masonry grid, NO rate table, NO quote tool, NO contact form on first paint** (each of those was the previous verticals' signature)
- **NO "where X, Y" / "your X our Y" tagline pattern** (used 3x)
- **NO invented enterprise logos as real images** — use grayscale placeholder text names, not fake company logo SVGs
- **NO Tailwind utility classes** — inline styles only
- **NO changes to `lib/verticals.ts`** — the data is already registered
- **NO changes to any other vertical**
- **NO changes to `app/demo/[vertical]/page.tsx`** — that route already works for tech-company
- **NO changes to `app/page.tsx`** — the icon and listing for tech-company is already there

---

## Verification (all required)

1. `npm run build` — 0 errors
2. `npm run dev -- -p 3058` (or any open port) and visit `http://localhost:<port>/tech-company`
3. **The 5 structural checks that prove this is NOT a clone of insurance or ecommerce or the prior 3:**
   - Display font is **Inter** weight 200/300, NOT Fraunces, NOT Playfair, NOT IBM Plex
   - Border-radius on cards is 8-12px, NOT 0px, NOT 16-24px, NOT 14-20px
   - Background uses a **subtle cyan radial gradient** behind the hero, NOT a full photo of any kind
   - The "products/services" section is a **Bento grid** (asymmetric 2x2/2x3), NOT a Pinterest masonry, NOT a rate table, NOT a 4-card service grid, NOT a 4-step process
   - Particles are **hexagonal outlines or `<>` brackets** in cyan, NOT shield outlines, NOT leaf shapes
4. The 4 atmospheric production-value features all present and working:
   - Cyan radial gradient glow visible in the hero behind the headline
   - Persistent hexagon/bracket particle animation drifting upward
   - Bidirectional scroll-tile animation (verified: in-view = animated, scrolled-away = not, scroll-back = animated)
   - Button hovers: cyan → deeper cyan, lift, glow, shimmer on primary; bento tiles lift; pricing tier hover (Growth scales up)
5. The bento grid is **asymmetric** (not a uniform 2x2) — at least one tile spans 2 columns
6. The terminal/code section has a real-looking 6-line `nexus deploy` command with real output
7. The stat band uses Inter weight 200 (very thin) large numerals — verify the font-weight is actually 200 in the DOM
8. The pricing tier Growth card has the cyan border + "Most popular" tag + translateY(-8px) elevation
9. Theme persists across reload (`nexus-ai-theme`)
10. Save screenshots to `docs/briefs/screenshots/tech-company-light.png` and `tech-company-dark.png`
11. Commit with: `feat: tech-company vertical — Nexus AI (Stripe-style enterprise, 11 components, final vertical)`

---

## Working Directory

`/Users/odinclaw/VS Code/AEXON-AI-Workspace/website-factory/demo-staged-website-factory`

## Codex Invocation

```bash
codex exec --dangerously-bypass-approvals-and-sandbox --model gpt-5.5 "$(cat docs/briefs/tech-company-brief.md)"
```

Model: `gpt-5.5` (default in `~/.codex/config.toml`). Codex CLI 0.139.0 is required.

## Hallmark pre-flight stamp to write at the top of the page's `<style>` block

```css
/* Hallmark · macrostructure: Stripe-Style Enterprise Landing · tone: elegant-technical
 * theme: Nexus Cyan · accent: Cyan #22d3ee (dark) / #0891b2 (light) · mono: JetBrains Mono
 * display: Inter weight 200-300 · body: Inter weight 400 · single-font page
 * differs from last 4: cyan accent (was blue/emerald/amber/navy) · Inter (was Plex/Fraunces/Playfair) ·
 *   8-12px radius (was 0/14-20/16-24) · cyan radial glow (was photo bg) · bento grid
 *   (was masonry/rate table/4-card) · hex/bracket particles (was shield/leaf) · 11 components
 *   (not 12 — Stripe pattern doesn't need that many)
 */
```
