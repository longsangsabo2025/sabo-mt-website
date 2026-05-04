# MASTER DISPATCH PROMPT — sabo-mt-website × sabo-hub

> Gửi toàn bộ prompt này cho coordinator agent.
> Coordinator đọc, phân loại task, spawn đúng sub-agent, báo cáo kết quả.

---

## CONTEXT — Trạng thái hiện tại

**Ngày**: 2026-04-30
**Ecosystem**: SABO Ecosystem — `D:\0.PROJECTS\02-SABO-ECOSYSTEM\`

### Hai project cần xử lý

| Project | Path | Agent fleet |
| --- | --- | --- |
| sabo-mt-website | `D:\0.PROJECTS\02-SABO-ECOSYSTEM\sabo-mt-website\` | `.claude/agents/` có đủ: sf-dev, sf-linter, sf-content, sf-seo, sf-debugger, sf-git |
| sabo-hub | `D:\0.PROJECTS\02-SABO-ECOSYSTEM\sabo-hub\` | `.claude/agents/` có đủ: flutter-dev, sf-linter, sf-debugger, sf-git, sf-auditor |

### Files bắt buộc đọc trước khi làm bất kỳ task nào

1. `D:\0.PROJECTS\02-SABO-ECOSYSTEM\ECOSYSTEM_CONTRACTS.md` — interface giữa các project
2. `sabo-mt-website/DEVLOG.md` — 5 session gần nhất
3. `sabo-hub/DEVLOG.md` — 3 session gần nhất
4. `.soloforge/AGENT_TASK_REGISTRY.yaml` của project liên quan — tránh conflict

---

## TASK LIST — Phân loại theo project và agent

### 🔴 P0 — UI CONSISTENCY SWEEP (new)

#### TASK-UI-001 | sabo-mt-website | **sf-ui-polish**
**Việc**: Chạy batch UI consistency trên toàn bộ marketing pages theo `Design.md` section 13 (Icon System).

Scope pages:
- `src/app/page.tsx`
- `src/app/about/page.tsx` + `src/app/en/about/page.tsx`
- `src/app/services/page.tsx` + `src/app/en/services/page.tsx`
- `src/app/services/[slug]/page.tsx` + `src/app/en/services/[slug]/page.tsx`
- `src/app/case-studies/page.tsx` + `src/app/en/case-studies/page.tsx`
- `src/app/case-studies/[slug]/page.tsx` + `src/app/en/case-studies/[slug]/page.tsx`
- `src/app/contact/page.tsx` + `src/app/en/contact/page.tsx`
- `src/app/industries/page.tsx` + `src/app/en/industries/page.tsx`
- `src/app/booking/page.tsx`

Rules:
- Chỉ sửa UI consistency: icon placement, typography hierarchy, spacing rhythm
- Không đụng logic API, data flow, hoặc business rules
- VI thay đổi gì thì EN mirror phải update ngay

Verification bắt buộc:
```bash
npx tsc --noEmit
npm run design-check
npm run build
```

---

### 🔴 P0 — Blocking (làm trước, theo thứ tự)

#### TASK-001 | sabo-mt-website | **sf-dev**
**Việc**: Migrate toàn bộ `/en/*` pages sang LOUD design system.

Pages cần migrate (theo thứ tự ưu tiên):
- `src/app/en/about/page.tsx` — mirror `app/about/page.tsx`
- `src/app/en/industries/page.tsx` — mirror `app/industries/page.tsx`
- `src/app/en/services/[slug]/page.tsx` — mirror VI slug pages
- `src/app/en/case-studies/[slug]/page.tsx`

Rules:
- Dùng toàn bộ primitives từ `src/components/ui/*` và `src/components/sections/*`
- Pass `locale="en"` prop cho mọi section component đã hỗ trợ
- Content lấy từ `src/content/site.en.ts`
- Sau mỗi page: chạy `npm run design-check` → 0 violations
- Cuối cùng: `npx tsc --noEmit` + `npm run build`

Verification: `npm run design-check` phải pass tất cả EN pages.

---

#### TASK-002 | sabo-hub/sabohub-app | **flutter-dev**
**Việc**: Verify `flutter analyze` sau khi thêm `OpenInWebFab` vào 2 dashboard pages.

Files đã sửa (session trước):
- `lib/pages/ceo/ceo_dashboard_page.dart` — import + `floatingActionButton: const OpenInWebFab()`
- `lib/pages/manager/manager_dashboard_page.dart` — tương tự
- `lib/shared/widgets/open_in_web_fab.dart` — widget mới

Việc cần làm:
1. Chạy `flutter analyze` — expect 0 errors
2. Nếu có lỗi import path (`../../shared/widgets/open_in_web_fab.dart`) → fix đường dẫn cho đúng
3. Báo cáo kết quả

---

### 🟡 P1 — Important (làm sau P0)

#### TASK-003 | sabo-mt-website | **sf-content**
**Việc**: Fix bank account placeholder trong booking email.

File: `src/app/api/booking/route.ts`
Tìm: `Vietcombank` hoặc `1234567890` hoặc placeholder tương tự
Thay bằng: `MSB | 49666888 | CONG TY TNHH SABO MEDIA & TECHNOLOGY`

Sau fix: `npx tsc --noEmit` pass → update DEVLOG.

---

#### TASK-004 | sabo-mt-website | **sf-dev**
**Việc**: Deploy production sau khi TASK-001 xong.

Steps:
```bash
cd D:\0.PROJECTS\02-SABO-ECOSYSTEM\sabo-mt-website
npx tsc --noEmit          # phải 0 errors
npm run build             # phải exit 0
npm run design-check      # phải 0 violations
vercel --prod             # chỉ chạy sau khi 3 lệnh trên pass
```

Sau deploy: smoke test các route chính:
- `https://sabo.com.vn` → 200
- `https://sabo.com.vn/en` → 200
- `https://sabo.com.vn/portal` → 200
- `https://sabo.com.vn/en/about` → 200

---

#### TASK-005 | sabo-hub/sabohub-web | **sf-dev** (sabohub-web)
**Việc**: Update DEVLOG `sabo-hub/DEVLOG.md` — ghi lại Supabase Auth config đã đổi (Session 22 của sabo-mt-website đã update nhưng chưa ghi vào sabo-hub DEVLOG).

Entry cần thêm (prepend, Session 4):
```markdown
## Session 4 — 2026-04-30 (Supabase Auth config update)

**Trigger:** Cross-project change từ sabo-mt-website Session 22.

### Delivered
- Supabase project `dqddxowyikefqcdiioyh`: `site_url` → `https://hub.sabo.com.vn`
- Supabase `uri_allow_list`: thêm `https://hub.sabo.com.vn/**`, `localhost:3000/**`, `localhost:5173/**`
- Domain `hub.sabo.com.vn` live (HTTP 200 confirmed)

### Verification
- hub.sabo.com.vn: HTTP 200 ✅ (confirmed session 22)

### Pending
- ⏳ flutter analyze sau khi thêm OpenInWebFab (TASK-002)
```

---

### 🟢 P2 — Nice to have (làm sau nếu còn thời gian)

#### TASK-006 | sabo-mt-website | **sf-seo**
**Việc**: Audit SEO cho các pages mới được thêm/sửa gần đây.

Pages cần check:
- `src/app/portal/page.tsx` — không cần SEO (login page, noindex)
- `src/app/about/page.tsx` — verify metadata đã dùng keywords VI
- `src/app/industries/page.tsx` — verify metadata

Thêm `robots: { index: false }` vào portal page để tránh index.

---

#### TASK-007 | sabo-hub/sabohub-web | **sf-content** (sabohub-web)
**Việc**: Update `public/showcase.json` — đổi `hero_stats` từ "9 vai trò" → "4 vai trò" (CEO, Manager, ShiftLeader, Staff — đã confirmed từ `src/constants/roles.ts`).

File: `sabo-hub/sabohub-web/public/showcase.json`
Tìm: `"9 vai trò"`
Đổi: `"4 vai trò"`

Sau fix: POST revalidate webhook đến `https://sabo.com.vn/api/revalidate` với tag `showcase`.

---

## COORDINATION RULES cho Coordinator

### Thứ tự thực hiện
```
TASK-001 (EN migration) → chạy song song với TASK-002 (flutter analyze)
TASK-003 (bank account) → chạy song song với TASK-002
TASK-004 (deploy) → CHỈ sau khi TASK-001 và TASK-003 xong
TASK-005 (DEVLOG sabo-hub) → bất cứ lúc nào
TASK-006 và TASK-007 → sau cùng, không blocking
```

### Conflict check
Trước khi spawn agent, kiểm tra:
- `sabo-mt-website/.soloforge/AGENT_TASK_REGISTRY.yaml` — có task nào đang active không
- `sabo-hub/.soloforge/AGENT_TASK_REGISTRY.yaml` — tương tự

### Báo cáo về
Sau khi tất cả tasks xong, tổng hợp:
```
DISPATCH REPORT — [ngày]

✅ COMPLETED:
- TASK-001: [kết quả]
- TASK-002: [kết quả]
...

⚠️ BLOCKED / FAILED:
- TASK-XXX: [lý do]

📋 DEVLOG updated: sabo-mt-website ✅ / sabo-hub ✅
🚀 Production: deployed ✅ / skipped (lý do)
```

### Những thứ KHÔNG làm (manual — chờ user)
- DNS Nhanhoa: thêm CNAME `hub` cho `sabo.com.vn` — cần login nhanhoa.com
- Vercel env `NEXT_PUBLIC_SABOHUB_SUPABASE_ANON_KEY` nếu chưa set — cần Vercel token
- Real product images — cần user cung cấp screenshots

---

## Quick Reference

| Lệnh | Project | Ý nghĩa |
| --- | --- | --- |
| `npx tsc --noEmit` | sabo-mt-website | TypeScript check |
| `npm run design-check` | sabo-mt-website | Design token violations |
| `npm run build` | sabo-mt-website | Production build |
| `flutter analyze` | sabo-hub/sabohub-app/SABOHUB | Dart analysis |
| `vercel --prod` | sabo-mt-website | Deploy (chỉ sau khi build pass) |

**Supabase instances**:
- `ffouuqklkoszpdaelowr` → sabo-mt-website leads only
- `dqddxowyikefqcdiioyh` → SaboHub (web + app + portal auth)
- `mogjjvscxjwvhtpkrlqr` → SABO Arena only
