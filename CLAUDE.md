# Claude Code Instructions — Demo Staged Website Factory

This repo contains AEXON AI's demo website verticals (plumbing, HVAC, electrician, roofing, auto-repair, restaurant, law firm, insurance, real estate, clothing, ecommerce, music brand). Each vertical gets a beautiful demo site + an AI receptionist demo.

## Agent Division of Labor

| Layer | Agent | Role |
|-------|-------|------|
| **Frontend** | Codex | Building all beautiful website UIs, landing pages, demo verticals. Uses Hallmark design skill (`skills/hallmark/`) for all UI work. |
| **Backend** | Claude Code (this agent, Hermes/Odin) | Orchestrating the overall build, AI agents, backend systems, deployment pipeline, integrations, and any Go/Node/Python services. |

**Rule:** When a client signs, Codex builds the frontend from the demo design system. Claude Code handles backend/AI agentic services. The demo stage = frontend only = Codex.

## Design System — Hallmark

All frontend work uses **Hallmark** (`skills/hallmark/`), the anti-AI-slop design skill by Together AI. Hallmark produces UIs that look **made, not generated**.

**Quick Hallmark invocation via Codex:**
```
codex "hallmark redesign ./app --mood editorial"
codex "build a beautiful landing page for a Brooklyn salon following Hallmark rules"
codex "hallmark audit ./components/hero.tsx"
```

## Current Demo Vertical Sites

```
/app/page.tsx             ← Hub page linking all demos (build new beautiful one with Hallmark)
/app/demo/[vertical]/     ← Per-vertical demo pages
  clothing/
  ecommerce/
  insurance/
  law-firm/
  music-brand/
  real-estate/
  restaurant/
```

## Vertical-Specific Design

Each demo should reflect its vertical:
- **Restaurant** — warm, atmospheric, full-bleed food photography
- **Law Firm** — editorial, refined, trust-inducing navy + cream
- **Insurance** — clean, modern-minimal, professional
- **Ecommerce/Clothing** — bold, photographic, fashion-forward
- **Music Brand** — dark, atmospheric, cinematic
- **Real Estate** — clean, photography-led, aspirational

## Design Pass Process

1. Read Hallmark skill → `skills/hallmark/SKILL.md`
2. Study reference design for that vertical type
3. Pick macrostructure (21 options) + theme (22 options)
4. Codex builds the frontend
5. Slop test (65 gates) before handing back.

## On Client Conversion

When a prospect converts:
1. **Frontend**: Codex takes the demo design and personalizes it (colors, copy, photos) for the client's brand
2. **Backend**: Claude Code attaches agentic services (AI receptionist, booking, CRM, messaging, etc.)
3. **Result**: A complete, beautiful, functional website

The demo-to-production gap should be minimal — that's the business model.

## No Hallmark Override Without Asking

Hallmark is the design system. Before overriding its rules (adding fake browser chrome, fabricating metrics, skipping mobile testing), flag it explicitly.

## Pre-flight Always

Before touching any existing code, Codex scans for: `design.md`, font stack, palette, motion library, framework. Those get preserved. Hallmark introduces macrostructure, microinteraction discipline, slop-test gates.
