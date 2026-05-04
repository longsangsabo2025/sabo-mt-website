---
name: _common
description: Shared rules cho TẤT CẢ sabo-mt-website agents. KHÔNG invoke trực tiếp.
---

> Rules nền chung. Mọi sub-agent đều phải tuân thủ. Không được nới lỏng.

---

## AGENT STARTUP SEQUENCE (BẮT BUỘC — theo thứ tự)

```
BƯỚC 1: Đọc .soloforge/AGENT_TASK_REGISTRY.yaml  → check conflict
BƯỚC 2: Đọc AGENTS.md                            → design rules + primitives
BƯỚC 3: Đọc DEVLOG.md (10 entry gần nhất)        → session context
BƯỚC 4: Nếu cross-project → đọc ECOSYSTEM_CONTRACTS.md
BƯỚC 5: Register task vào active_tasks
BƯỚC 6: Bắt đầu làm việc
```

---

## Project Identity

- **Site**: sabo.com.vn — marketing site SABO M&T
- **Stack**: Next.js 14 App Router + TypeScript strict + Tailwind 3 + Supabase
- **Aesthetic**: LOUD editorial — `bg-ink` (#000), `text-paper` (#fff), serif display
- **Supabase leads**: `ffouuqklkoszpdaelowr` (marketing site only)
- **Supabase auth/hub**: `dqddxowyikefqcdiioyh` (SaboHub — dùng ở `/portal` page)
- **Deploy**: Vercel, domain `sabo.com.vn`

## Design Tokens (MANDATORY)

| Token | Dùng cho |
| --- | --- |
| `bg-ink` | Background tối (default body) |
| `text-paper` | Text trên nền tối |
| `font-serif` | Display headings (Cormorant Garamond) |
| `font-sans` | Body, UI, nav (DM Sans) |
| `font-mono` | Eyebrow, caption, labels (DM Mono) |
| `text-display-1/2` | Hero/section opener |
| `text-h1/2/3` | Page/section/sub headings |
| `text-eyebrow` | Mono uppercase labels |
| `ease-expo` | Default easing |

## FORBIDDEN — Design

```
❌ radial-gradient, mesh gradient, glassmorphism
❌ bg-white, text-slate-*, bg-navy-dark, text-gold (ngoài accent context)
❌ font-display (dùng font-serif thay)
❌ border-radius 16px → chỉ pill (full) hoặc sharp (0)
❌ Arbitrary color hex trong JSX — phải qua Tailwind token
❌ Emoji trong UI text (eyebrow, heading, body)
```

## Verification BẮT BUỘC sau mỗi thay đổi

```bash
npx tsc --noEmit      # 0 errors — BẮT BUỘC
npm run design-check  # 0 violations — BẮT BUỘC
npm run build         # exit 0 — nếu thay đổi lớn
```

## Reporting Format

```
DONE: [mô tả]
Files changed: [danh sách từ git diff --stat]
Side effects: [none / liệt kê]
Verification: tsc ✅ | design-check ✅ | build ✅
```

## FORBIDDEN — Operations

```
❌ git push
❌ vercel deploy trừ khi user nói rõ
❌ Hardcode secrets/API keys
❌ Tạo file mới khi có thể edit file cũ
❌ Thêm feature ngoài scope
❌ Dùng yarn/pnpm — chỉ npm
```

## Registry Discipline

- **TRƯỚC task**: thêm vào `active_tasks` với `files_planned`
- **SAU task**: move sang `completed_tasks` với `files_touched` thực tế
- Dùng `git diff --stat` để lấy danh sách files thực tế trước khi report
