# Prospect Personalization Process (5-day vertical demo)

> **Owner:** Bazzy · **Last verified:** 2026-06-15 · **Reference build:** Ani African Hair Braiding

## What this process produces

A live, per-prospect URL on `https://demo.aexonai.com/d/<slug>/` that:

- Renders the **original** vertical design (typography, animations, layout, copy, trust badges, AI concierge) **as-built** — never reskinned or industry-rewritten.
- Substitutes only the **prospect-specific** data and imagery (name, phone, email, city, hero image, service-tile images, service copy that genuinely fits the prospect's business).
- Expires after **5 days** via the existing dedicated route's `data-expires` check.
- Coexists with the original `/salon`, `/barbershop`, etc. verticals untouched. Every prospect gets their **own** URL, never a parameter-mutated version of the canonical vertical.

## When to use it

For any local-business prospect in the AEXON AI cold-outreach pipeline who:

- Has confirmed real contact data (name, email, phone, city).
- Has a real, on-brand business that maps to one of the existing verticals (salon, barbershop, plumbing, HVAC, electrical, roofing, restaurant, real estate, law firm, insurance, ecommerce, tech company, auto repair, clothing).
- Is being added to a new outreach run.

## Inputs

| Input | Source | Required |
|---|---|---|
| Prospect business name | Sheet / discovery | ✓ |
| City + State | Sheet / discovery | ✓ |
| Phone (formatted) | Sheet | ✓ |
| Email (prospect + sender) | Sheet | ✓ |
| Vertical match | Sheet `vertical` column | ✓ |
| 5-day expiry date | Today + 5 | ✓ (auto) |
| 4 prospect images (hero + 3 service tiles) | `image_generate` (preferred) **or** approved photo library | ✓ |

## The process — 7 steps

### 1. Pick the vertical
Match the prospect to the existing vertical whose design DNA best fits the business type.

- Hair-braiding, beauty, nails → `salon`
- Barber, men's grooming → `barbershop`
- Plumber, drain, water heater → `plumbing`
- …etc

If the existing vertical is wrong for the prospect's business type, **do not retrofit**. Create a new vertical first (separate process — `vertical-creation.md`), then personalize.

### 2. Generate prospect-specific imagery
**Always use `image_generate` for the prospect's hero + service tiles** — never grab random Unsplash photos. The prospect's demo site should show people/products that look like the prospect's actual business, not stock models from the wrong demographic.

- Hero: 1024×576 (landscape, 16:9)
- Service tiles: 1024×1024 (square, 1:1)
- Generate 4 candidates, let Bazzy pick the strongest.
- Download approved candidates to `public/prospects/<slug>/`.

### 3. Write the personalization brief
Create `docs/briefs/<slug>-image-swap-brief.md` with:

- Scope: which files may be edited (Ani pattern: only `app/d/[slug]/page.tsx`).
- Non-negotiables: do not touch other verticals, do not push without Bazzy approval, do not change the canonical vertical's default behavior.
- Desired image mapping (hero → which file, each service → which file).
- Bazzy's stated preferences (favorite image, color hints, cultural cues).

### 4. Codex gpt-5.5 executes the wiring
- Workdir: `website-factory/demo-staged-website-factory/`
- Codex CLI: `codex-cli >= 0.139.0`, model = `gpt-5.5`
- Flag: `--dangerously-bypass-approvals-and-sandbox` (required in this env; `approval = "never"` blocks writes otherwise)
- Codex reads the brief, edits only the prospect data block in `app/d/[slug]/page.tsx`, runs `npm run build`, reports the final image-path mapping.
- Codex never pushes.

### 5. Local preview
- Start `npm start -- -p 3053` (or another free port) in the demo factory repo.
- Verify: page returns 200, every local asset returns 200, the rendered HTML contains the local asset paths, and the old stock-image URLs are gone.
- Take a browser screenshot of the hero and the service tiles for Bazzy.
- Show Bazzy the screenshots + local URL. **Wait for explicit "push" before doing anything else.**

### 6. Push (only on Bazzy's explicit "push" command)
- `git add` only the Ani files: `app/d/[slug]/page.tsx`, `public/prospects/<slug>/*`, `docs/briefs/<slug>-image-swap-brief.md`.
- Do **not** stage unrelated dirty files. Other verticals in the working tree are Bazzy's in-progress work.
- Commit message format: `feat(<slug>): swap <prospect> prospect imagery to local <vertical> assets`
- Push to `origin main`. Wait for Vercel deploy to reach `READY` (typically <30s).
- Verify on the live URL: page + all assets return 200, rendered HTML references the local images, no stock URLs remain.

### 7. Hand off to the email/approval-gate flow
Once the live URL is verified, the prospect moves into the email + approval-gate stage (separate process — see `outreach-approval-gate.md`). **No prospect email goes out without a real Ani-style (or equivalent) live URL and a Bazzy-approved draft.**

## What this process deliberately does NOT do

- **No industry-content swap on the original vertical.** A braiding shop gets the original salon design with braids imagery — not a redesigned "braiding salon" template.
- **No `?industry=…` URL params.** Every prospect gets a dedicated static URL via the existing `/d/[slug]/` dynamic route.
- **No push without explicit Bazzy approval.**
- **No editing of unrelated dirty files in the working tree.**
- **No substitution of the original vertical's typography, animation, or layout.** Bazzy built those for a reason; the personalization layer is imagery + prospect data only.

## Pitfalls & lessons learned

1. **Don't reskin the vertical.** A previous attempt rewrote `/salon` with industry-specific copy ("Crown your confidence", "Box Braids" service list) — Bazzy rejected that. The vertical stays as built; only the prospect data + imagery change.
2. **Don't ship random stock photos for a prospect's industry.** A braiding shop with white women and straight hair is insulting. Always `image_generate` for the prospect's actual business + demographic.
3. **Trailing slash 308.** Next.js dynamic routes can return a 308 on the trailing slash mismatch. Use `-L` in curl, and configure `trailingSlash: false` if needed in `next.config.ts`.
4. **Vision tool hardcoded model.** The current session's `vision_analyze` / `browser_vision` may 404 because the tool itself pins a deprecated slug. The fix is in `config.yaml` and takes effect after a session restart. Don't let a 404 from vision stall the build — curl + `sips` + the screenshot files are sufficient.
5. **Anthropic OAuth, not API key.** Routing `claude-opus-4-8` (or Sonnet 4.5) uses Bazzy's Anthropic subscription OAuth credentials in `~/.hermes/auth.json`. There is no `ANTHROPIC_API_KEY` in `.env`.
6. **Cron jobs keep their pinned model.** Don't change `cronjob model` overrides for outreach jobs — they should stay on whatever they were scheduled with.

## Quick checklist for any new prospect

- [ ] Vertical matched to business type (don't force a wrong fit)
- [ ] 4 images generated with `image_generate` and approved by Bazzy
- [ ] Approved images saved to `public/prospects/<slug>/`
- [ ] Brief written at `docs/briefs/<slug>-image-swap-brief.md`
- [ ] Codex gpt-5.5 wired assets into `app/d/[slug]/page.tsx` only
- [ ] `npm run build` passes
- [ ] Local preview on port 3053 verified (200s + correct image refs)
- [ ] Browser screenshot of hero + tiles captured
- [ ] Bazzy approved the local preview
- [ ] Staged only the prospect files; commit + push
- [ ] Vercel deploy reached `READY`
- [ ] Live URL verified (page + 4 assets all 200, no stock URLs)
- [ ] Handed off to outreach approval-gate flow
