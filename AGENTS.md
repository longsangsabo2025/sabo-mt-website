# AGENTS.md — Hướng dẫn cho AI agents

Reference cho mọi AI agent (GitHub Copilot, Claude, ChatGPT, Cursor, …) khi làm việc trên repo này.

## Quick context
Proprietary marketing site cho **sabo.com.vn**. Stack: **Next.js 16.2.4 App Router**, **TypeScript strict**, **Tailwind 3**. Editorial **LOUD-style** aesthetic (pure black canvas, serif display, mono labels). Tiếng Việt là primary language; English mirror tại `/en/*`.

## Brand & marketing playbooks (đọc khi viết copy / chọn ảnh)

1. **[PLAYBOOKS_INDEX.md](PLAYBOOKS_INDEX.md)** — chỉ mục: personal (Long Sang) · SABO site · funnel · Uyển Nhi · SABOHUB · gateway ảnh.  
2. **[MARKETING_IMAGE_WOW_PROMPTS.md](MARKETING_IMAGE_WOW_PROMPTS.md)** — GPT Image 2 (High · 1K · 2:3) + prompt mẫu; export ảnh duyệt vào `public/images/marketing/` khi dùng trên site.  
3. Root markdown: `sabo_website_playbook.md`, `funnel_system.md`, `uyen_nhi_lead_script.md` — không thay **Design.md** token; playbook chỉ định **message**, Design định **visual system**.  
4. Lead / chatbot / scoring: `lead_system_full.md`, `sabo_ai_lead_chatbot_db_api_ui.md` (đọc **§11**). Migrations: `20260429_init_leads.sql` then `20260503_lead_engine.sql`. Smoke (dev server + env): `npm run smoke:lead-api`. Widget: `src/components/ui/ChatWidget.tsx` (tab Khảo sát → `/api/chat/session` + `/api/chat/message`).

## MANDATORY rules

1. **Always read [Design.md](Design.md) FIRST.** Đây là canonical design spec. Không tự bịa token mới — nếu thiếu, hỏi user trước khi thêm.
2. **Always update [DEVLOG.md](DEVLOG.md) at end of session.** Append entry mới `## Session N — YYYY-MM-DD` với 4 mục: Trigger, Delivered, Verification, Pending.
3. **Run `npx tsc --noEmit` and `npm run build` before declaring done.** Cả hai phải exit 0.
4. **Run `npm run design-check` before declaring done.** Must exit 0. Catches forbidden legacy tokens (`radial-gradient`, `bg-surface`, `font-display`, `text-slate-*`, old `Eyebrow`/`Cta` imports, `card`, `btn`, etc.) across ALL pages — VI and EN.
5. **Do NOT deploy** trừ khi user nói rõ "deploy". Default chỉ build + local QA.
5. **Use existing primitives.** Import từ `src/components/ui/*`, `src/hooks/*`, `src/lib/*`. Không duplicate.
6. **Use Tailwind tokens only.** `bg-ink`, `text-paper`, `accent`, `font-serif|sans|mono`, `text-display-1/2`, `text-h1/2/3`, `text-body-*`, `text-eyebrow`, `text-caption`, `ease-expo`, `duration-1200`. Không dùng arbitrary values cho spacing/color đã có token.
7. **Server components by default.** Chỉ mark `'use client'` khi cần state / effects / refs / event handlers.
8. **Strict TypeScript.** Cấm `any`, cấm `// @ts-ignore` mà không có comment giải thích.
9. **No hardcoded secrets.** Mọi key đọc từ env, mọi env phải có trong `.env.example`.

## Project structure (src/)
```
src/
├── app/                      # Next.js App Router routes
│   ├── page.tsx              # Homepage = composition of sections/
│   ├── layout.tsx            # Root layout, fonts, SEO, JSON-LD
│   ├── globals.css           # Tailwind base + custom utilities
│   ├── about/  industries/  contact/
│   ├── services/             # + [slug]/ SSG
│   ├── case-studies/         # + [slug]/ SSG
│   ├── legal/{privacy,terms,cookies}/
│   ├── en/                   # English mirror (legacy design)
│   ├── api/contact/route.ts  # Supabase + Telegram; extended row + fallback minimal
│   ├── api/leads/  api/chat/  api/chat/session/  api/chat/message/  api/demo-booking/
│   ├── sitemap.ts  robots.ts
│   └── not-found.tsx
├── components/
│   ├── ui/                   # Atoms (see primitives below)
│   ├── sections/             # Composed page sections
│   ├── layout/               # Header, Footer
│   ├── providers/            # LenisProvider
│   └── forms/                # ContactForm, ContactFormLoud
├── hooks/                    # GSAP / scroll / hover hooks
├── lib/                      # cn, lenis singletons
└── content/                  # site.ts (VI), site.en.ts (EN)
```

## Available primitives

### UI components (`src/components/ui/`)
| Component | Purpose |
| --- | --- |
| `PillCTA` | Pill-shaped CTA. Props: `href`, `variant: 'dark' \| 'light' \| 'outline'`, `size: 'sm' \| 'md'`. |
| `EyebrowLabel` | Mono uppercase eyebrow above headings. |
| `MarqueeText` | Horizontal marquee strip (uses `marquee` keyframe). |
| `ExpandPanel` | Click-to-expand accordion panel. |
| `LogoCloud` | Grayscale logo grid. |
| `CaseStudyCard` | Editorial case study card with hover reveal. |
| `IndustryCard` | Industry tile (image + serif title + caption). |

### Sections (`src/components/sections/`)
`Hero` · `IndustriesBand` · `PillarsIntro` · `CasesRow` · `LogoStrip` · `MarqueeBand` · `FinalCta` — homepage composes these in this exact order.

### Hooks (`src/hooks/`)
| Hook | Use |
| --- | --- |
| `useWordReveal` | GSAP word-by-word reveal on scroll. |
| `useLetterReveal` | GSAP letter-by-letter reveal (display headings). |
| `useMagneticHover` | Cursor magnetic effect on CTAs. |
| `useExpandPanel` | State + animation cho `ExpandPanel`. |

### Lib (`src/lib/`)
- `cn()` — clsx + tailwind-merge wrapper.
- `lenis` — Lenis smooth-scroll singleton (used by `LenisProvider`).

## Tailwind tokens reference

| Token | CSS / value | Use case |
| --- | --- | --- |
| `bg-ink` | `#000000` | Default body / dark sections |
| `text-paper` | `#FFFFFF` | Default text on ink |
| `accent` | per-pillar (burgundy/navy/forest/gold) | Pillar & industry detail hero only |
| `font-serif` | Instrument Serif | Display headings (`display-1`, `display-2`, `h1`) |
| `font-sans` | DM Sans | Body, UI, nav |
| `font-mono` | DM Mono | Eyebrow, caption, labels (uppercase) |
| `text-display-1` | clamp 84–176px | Hero wordmark |
| `text-display-2` | clamp 64–128px | Section opener |
| `text-h1`/`h2`/`h3` | scaled headings | Page / section / sub |
| `text-body-lg`/`md`/`sm` | body sizes | Paragraphs |
| `text-eyebrow` | mono uppercase | Section labels |
| `text-caption` | mono small | Footnotes, meta |
| `ease-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default easing |
| `duration-1200` | 1200ms | Hero / large reveals |
| `marquee` keyframe | infinite x-translate | `MarqueeText`, `MarqueeBand` |

## Design DON'Ts
- ❌ Không dùng CSS gradient gimmicks (mesh, radial blob, conic) — flat color only
- ❌ Không dùng `#FFFFFF` làm default body bg — body is `bg-ink`
- ❌ Không nhập font Inter / Crimson Pro / JetBrains Mono — đã thay bằng DM Sans / Instrument Serif / DM Mono
- ❌ Không dùng emoji trong UI text (eyebrow, headings, body) — chỉ trong DEVLOG/dev tooling
- ❌ Không glassmorphism / frosted backdrop blur as decoration — chỉ header `backdrop-blur-md` cho legibility
- ❌ Không dùng `text-gold` ngoài accent contexts (pillar/industry detail hero)
- ❌ Không thêm border-radius cap 16px — LOUD style dùng pill-shaped (full radius) hoặc sharp 0px
- ❌ Không tự thêm shadow / glow effect — nếu cần depth, dùng border `border-white/10`
- ❌ Không drop arbitrary color hex vào JSX — phải qua Tailwind token

## Common tasks

| Task | Guidance |
| --- | --- |
| Add a new page | Tạo `src/app/<route>/page.tsx`, server component, compose từ existing sections. |
| Add a new section | Đặt trong `src/components/sections/`, dark-on-ink first, có eyebrow + display heading + body. |
| Add a CTA | `<PillCTA href="..." variant="dark\|light\|outline" size="sm\|md">{label}</PillCTA>`. |
| Add new content | Edit `src/content/site.ts` (VI) hoặc `site.en.ts` (EN). Type stay synced. |
| Add SVG asset | Đặt vào `public/images/...` hoặc `public/logos/`, valid standalone XML, < 2KB. |
| Add an env var | Thêm vào `.env.example` + document trong README; sync key vào master keystore. |

## Known gaps / TODO
- ⏳ Chúa có `knip` / dead-code tooling
- ⏳ Vercel deploy của new design pending user approval
- ⏳ GSAP scroll-trigger animations chúa có visual smoke test trong viewport thực té
- ⏳ Real production images (current SVGs là stylized typographic placeholders)
- ⏳ npm audit: 2 moderate vulnerabilities remain after Next 16.2.4 upgrade — review separately with dependency-risk context

## EN ↔ VI page parity rule

Every `/en/*` page MUST mirror its `/app/*` VI counterpart in design system.
- When you modify a VI page's layout/structure → **also update the EN mirror immediately in the same session**.
- VI reference pages: `about/`, `services/`, `contact/`, `industries/`, `case-studies/`, `services/[slug]`, `case-studies/[slug]`.
- Content comes from `src/content/site.en.ts`; structure comes from the VI file.
- Run `npm run design-check` to verify both VI and EN files are clean.

## Anti-patterns to reject (review checklist)
- 🚫 Thêm `text-slate-*`, `bg-white`, `bg-navy-dark`, `text-gold` vào NEW code (legacy backcompat tokens — chỉ giữ cho old EN pages)
- 🚫 Dùng `font-display` class (legacy alias — dùng `font-serif` cho Instrument Serif)
- 🚫 Tạo lại component đã có trong `src/components/ui/`
- 🚫 Thêm GSAP animation mà không qua existing hooks
- 🚫 Bỏ qua DEVLOG update ở cuối session
- 🚫 Push to git hoặc deploy mà không có explicit approval
- 🚫 Thêm `console.log` còn sót trong production code
- 🚫 Thêm `any` type hoặc `// @ts-ignore` không có comment giải thích
