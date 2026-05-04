# SABO M&T — Marketing Website

Proprietary marketing site for SABO Media & Technology · sabo.com.vn

> All rights reserved. Not open-source. Internal use only.

## Stack
- Next.js 16 (App Router) · TypeScript strict · Tailwind 3
- Editorial design system (LOUD-inspired) — see [Design.md](Design.md)
- GSAP + Lenis smooth scroll + split-type word/letter reveals
- Supabase (leads) · Vercel (sin1)

## Design language (current)
- **Pure black canvas** (`bg-ink` = #000) with white text (`text-paper` = #fff)
- **Per-pillar accent** (burgundy / navy / forest / gold) — only on pillar/industry detail hero
- **Type pairing**: Instrument Serif (display) + DM Sans (body) + DM Mono (eyebrow/caption)
- **Editorial typography** — `display-1` (clamp 84–176px), `h1`/`h2`/`h3`, `body-lg`/`md`/`sm`, `eyebrow`, `caption`
- **Slow intentional motion** — `--dur-hero 1200ms`, `--ease-expo cubic-bezier(0.16, 1, 0.3, 1)`
- **No CSS gradient gimmicks** — flat color sections only
- See [Design.md](Design.md) for the full 12-section spec

## Brand & marketing playbooks (markdown, repo root)

Điều hướng tập trung — **đọc trước khi viết copy hoặc brief ảnh:** [PLAYBOOKS_INDEX.md](PLAYBOOKS_INDEX.md)  
Chân dung + prompt GPT Image 2: [MARKETING_IMAGE_WOW_PROMPTS.md](MARKETING_IMAGE_WOW_PROMPTS.md)  
Playbook chi tiết: `sabo_website_playbook.md`, `funnel_system.md`, `uyen_nhi_lead_script.md` · personal: `../01-MAIN-PRODUCTS/long-sang-ai/personal_website_playbook.md`  
Lead + CRM + chatbot spec: `lead_system_full.md`, `sabo_ai_lead_chatbot_db_api_ui.md` · kết quả test pipeline: `tools/PIPELINE_TEST_NOTES.md`

## Project layout
```
sabo-mt-website/
├── Design.md                  # Canonical design system spec
├── PLAYBOOKS_INDEX.md         # Hub: chân dung + vị trí file + pipeline ảnh
├── MARKETING_IMAGE_WOW_PROMPTS.md  # GPT Image 2 defaults + prompt mẫu
├── sabo_website_playbook.md   # B2B site narrative
├── funnel_system.md           # Funnel Attention → Retention
├── uyen_nhi_lead_script.md    # AI assistant voice + close
├── lead_system_full.md        # Scoring + CRM logic (100 pts)
├── sabo_ai_lead_chatbot_db_api_ui.md  # DB/API/UI spec + §11 implementation map
├── tools/
│   ├── PIPELINE_TEST_NOTES.md # Log lệnh test pipeline thực tế
│   └── smoke-lead-api.mjs     # Smoke: session → chat/message → GET lead (needs dev server)
├── DEVLOG.md                  # Session-by-session change log
├── AGENTS.md                  # Guidance for AI agents
├── public/
│   ├── images/
│   │   ├── industries/        # real-estate, sports, ai, ecommerce (.svg)
│   │   └── cases/             # pool, realty, ai (.svg)
│   └── logos/                 # placeholder.svg
├── src/
│   ├── app/
│   │   ├── page.tsx                       # Homepage (LOUD)
│   │   ├── layout.tsx                     # Fonts, SEO, JSON-LD
│   │   ├── globals.css
│   │   ├── about/page.tsx
│   │   ├── industries/page.tsx
│   │   ├── services/page.tsx + [slug]/    # SSG service detail
│   │   ├── case-studies/page.tsx + [slug]/
│   │   ├── contact/page.tsx
│   │   ├── legal/{privacy,terms,cookies}/
│   │   ├── en/                            # English mirror (legacy design)
│   │   ├── api/contact/route.ts           # Supabase + Telegram (leads; scoring when migration 20260503 on)
│   │   ├── api/leads/…                    # POST lead + GET by id (lead engine)
│   │   ├── api/chat/route.ts              # Groq stream (free-form assistant)
│   │   ├── api/chat/session/route.ts      # Anonymous lead for widget “Khảo sát”
│   │   ├── api/chat/message/route.ts      # Uyển Nhi step machine + lead_conversations
│   │   ├── api/demo-booking/route.ts      # demo_bookings + PATCH lead
│   │   ├── api/booking/route.ts           # Consultation slots → Forge Supabase
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/                # PillCTA, EyebrowLabel, MarqueeText,
│   │   │                      # ExpandPanel, LogoCloud, CaseStudyCard,
│   │   │                      # IndustryCard
│   │   ├── sections/          # Hero, IndustriesBand, PillarsIntro,
│   │   │                      # CasesRow, LogoStrip, MarqueeBand, FinalCta
│   │   ├── layout/            # Header, Footer
│   │   ├── providers/         # LenisProvider
│   │   └── forms/             # ContactForm, ContactFormLoud
│   ├── hooks/                 # useWordReveal, useLetterReveal,
│   │                          # useMagneticHover, useExpandPanel
│   ├── lib/                   # cn, lenis
│   └── content/               # site.ts (VI), site.en.ts (EN)
├── supabase/migrations/
└── scripts/
```

## Local dev
```bash
npm install
npm run dev   # http://localhost:3210
```

## Build & test
```bash
npm run build      # production build (webpack; use npm run build:turbo to try Turbopack)
npx tsc --noEmit   # strict type check
npm run smoke:lead-api   # optional: needs `npm run dev` + SUPABASE_* in .env.local (SMOKE_BASE to override URL)
```
`npm run build` and `tsc` should exit 0 before deploy.

## Environment
Copy `.env.example` to `.env.local`, then fill from master keystore at `D:\0.PROJECTS\00-MASTER-ADMIN\admin\.env`:
- `SUPABASE_URL` / `SUPABASE_SERVICE_KEY` — dedicated project (NOT shared)
- `TELEGRAM_BOT_TOKEN` / `TELEGRAM_ADMIN_CHAT_ID` — lead notification
- `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — optional anti-spam

## Supabase
Dedicated project (see `.env.example`). Apply migrations **in order**:
1. `supabase/migrations/20260429_init_leads.sql` — `leads` + `leads_recent` + RLS deny-by-default.
2. `supabase/migrations/20260503_lead_engine.sql` — scoring columns, `lead_conversations`, `demo_bookings`, trigger `updated_at`, refreshed `leads_recent`.

Without (2), `/api/contact` still inserts using a **minimal** row fallback; `/api/chat/session`, `/api/chat/message`, `/api/demo-booking` need (2).

Apply (2) locally (uses `DATABASE_URL` in `.env.local`, no Supabase MCP):

```bash
npm run migrate:lead-engine
```

Alternative if Docker is running: `npm run migrate:lead-engine:docker`.

## Deploy (BLOCKED until QA approval)
Vercel project: `dsmhs-projects/sabo-mt-website` → https://sabo.com.vn · region `sin1`.
Deploy ONLY when explicitly approved:
```bash
vercel deploy --prod
```

## Status
- Homepage + 7 inner pages: rebuilt in LOUD style
- EN mirrors at `/en/*`: still use OLD design — pending redesign
- See [DEVLOG.md](DEVLOG.md) for session history

## See also
- [PLAYBOOKS_INDEX.md](PLAYBOOKS_INDEX.md) — chân dung + lead + nơi gắn trong monorepo
- [tools/PIPELINE_TEST_NOTES.md](tools/PIPELINE_TEST_NOTES.md) — kết quả test thực tế (gateway, sabo-hub, build site)
- [MARKETING_IMAGE_WOW_PROMPTS.md](MARKETING_IMAGE_WOW_PROMPTS.md) — ảnh marketing / GPT Image 2
- [Design.md](Design.md) — design system source of truth
- [AGENTS.md](AGENTS.md) — guidance for AI agents working on this repo
- [DEVLOG.md](DEVLOG.md) — session-by-session change log
