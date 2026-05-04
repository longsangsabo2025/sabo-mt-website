# Pipeline test notes — dữ kiện & tool đã có (2026-05-03)

Ghi lại lệnh đã chạy thật trên máy dev để chứng minh các pipeline **đang xanh** và chỗ **chưa khớp spec** lead/chatbot.

---

## 1. UGC / Poster / Image gateway (`higgfied-mcp/`)

| Lệnh | Kết quả | Ý nghĩa |
|------|---------|---------|
| `npm run test:e2e` | **PASS** (~7.5s) | Spawn gateway mock, smoke: validation 400, poster-jobs, cache, idempotency, pipeline `prompt_only`, `/v1/images` 503 khi MCP tắt |

**Repo:** `D:\0.PROJECTS\higgfied-mcp`  
**Không tốn credit** (Poster base `mock://`).

---

## 2. SABOHUB brief + launch assets (`sabo-hub/`)

| Lệnh | Kết quả |
|------|---------|
| `node docs/validate-brief.mjs` | **OK** — `docs/m1-brief.json` hợp lệ schema |
| `cd marketing/m1-launch && node status-check.mjs` | **exit 0** — 4 PNG + copy + handoff; token publish vẫn `FILL_ME` (expected) |

---

## 3. SABO M&T site (`sabo-mt-website/`)

| Lệnh | Kết quả |
|------|---------|
| `npx tsc --noEmit` | **exit 0** |
| `npm run build` | **exit 0** — `next build --webpack` (mặc định trong `package.json`; Turbopack có thể `npm run build:turbo`) |
| `npm run design-check` | **exit 0** — LOUD token check toàn site |
| `npm run migrate:lead-engine` | **OK** khi có `DATABASE_URL` trong `.env.local` — áp `20260503_lead_engine.sql` qua `pg` (không cần MCP/Docker) |
| `npm run smoke:lead-api` | `SMOKE_BASE=<vercel-preview-url>` đã **PASS** trên deployment mới; `sabo.com.vn` có thể 404 route mới cho đến khi production trùng build. |

**API (marketing site):**

- `POST /api/contact` — form → Supabase `leads` (base `20260429_init_leads.sql`) + Telegram.
- `POST /api/leads`, `GET /api/leads/[id]` — lead engine + scoring (`20260503_lead_engine.sql` cần apply trên Supabase).
- `POST /api/chat/session` — tạo `lead_id` cho phiên khảo sát widget.
- `POST /api/chat/message` — Uyển Nhi step machine + `lead_conversations` + PATCH `chat_state` (cùng migration).
- Widget `ChatWidget`: tab **Khảo sát** → session + message; tab **Hỏi AI** → `/api/chat`.
- `POST /api/demo-booking` — `demo_bookings` + cập nhật lead (cùng migration).
- `POST /api/chat` — Groq stream (không thay thế state machine; dùng khi cần chat tự do).
- `POST /api/booking` — Forge `consultations` (khác `demo_bookings`).

---

## 4. Chưa chạy trong session này (cần service / credential)

| Pipeline | Lý do skip |
|----------|------------|
| `higgfied-mcp` `npm run test:e2e:live` | Gọi Poster Forge thật + tốn quota |
| `POST /api/contact` curl local | Cần `next dev` + body hợp lệ + Turnstile nếu env bật |
| `POST /api/leads`, `/api/chat/session`, `/api/chat/message`, `/api/demo-booking` | Cần dev server + `SUPABASE_*` + **đã apply** `20260503_lead_engine.sql` |
| `POST /api/chat` | Cần `GROQ_API_KEY` |
| Poster-prompt `npm run dev:server` + smoke | Có thể chạy sau khi user bật dev server |

---

## 5. Kết luận cho `lead_system_full` + `sabo_ai_lead_chatbot_db_api_ui`

- **Build & type & design** của marketing site: **xanh**.  
- **Lead engine (migration + REST routes)**: **đã có trong repo**; production cần **push migration** + env `SUPABASE_URL` / `SUPABASE_SERVICE_KEY`.  
- **Khác spec có chủ đích**: `/api/chat` (Groq) vs `/api/chat/message` (state machine); `/api/booking` (Forge) vs `/api/demo-booking` (Supabase). Chi tiết: `sabo_ai_lead_chatbot_db_api_ui.md` **§11**.

---

*Cập nhật mỗi khi thêm migration lead hoặc đổi contract API.*
