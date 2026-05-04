# Chân dung & playbook — chỉ mục bố trí (2026)

Một trang **điều hướng**: ai làm gì, file ở đâu, pipeline ảnh nối chỗ nào.

---

## 1. Ba lớp chân dung

| Lớp | Vai trò | File nguồn | Khi nào đọc |
|-----|---------|------------|-------------|
| **Cá nhân (Long Sang)** | Authority, personal site, trust | [`../../01-MAIN-PRODUCTS/long-sang-ai/personal_website_playbook.md`](../../01-MAIN-PRODUCTS/long-sang-ai/personal_website_playbook.md) | Hero personal, speaking, founder story |
| **Doanh nghiệp (SABO M&T)** | Lead gen, B2B site sabo.com.vn | [`sabo_website_playbook.md`](sabo_website_playbook.md) | Copy site, services, case framing |
| **Trợ lý (Uyển Nhi)** | AI SABO, script đóng lead | [`uyen_nhi_lead_script.md`](uyen_nhi_lead_script.md) | Chat, form follow-up, voice thương hiệu |
| **Funnel** | Attention → Retention | [`funnel_system.md`](funnel_system.md) | Content theo stage, CTA, kênh |

---

## 2. Lead & AI chatbot (CRM + scoring)

| Nội dung | File |
|----------|------|
| Nhánh ngành, điểm 100, phân loại Cold/Warm/Hot, next action | [`lead_system_full.md`](lead_system_full.md) |
| DB đích + API + UI flow (Uyển Nhi-style) | [`sabo_ai_lead_chatbot_db_api_ui.md`](sabo_ai_lead_chatbot_db_api_ui.md) — **§11** = bảng spec vs code hiện tại |
| Form contact đang production | `src/app/api/contact/route.ts` + migration `supabase/migrations/20260429_init_leads.sql` |
| Kết quả chạy pipeline test (gateway + build) | [`tools/PIPELINE_TEST_NOTES.md`](tools/PIPELINE_TEST_NOTES.md) |

Funnel **Conversion** ↔ chi tiết: [`funnel_system.md`](funnel_system.md) — dòng CTA/form nối với `lead_system_full` + spec API.

---

## 3. Hình ảnh marketing (GPT Image 2)

| Nội dung | File |
|----------|------|
| Tham số **High · 1K · 2:3**, prompt “wow”, map persona → visual | [`MARKETING_IMAGE_WOW_PROMPTS.md`](MARKETING_IMAGE_WOW_PROMPTS.md) |
| Gateway mặc định + env | Repo **`higgfied-mcp/`** — `gateway/image-gateway.ts`, `.env.example`, `HIGGSFIELD_MCP_REFERENCE.md` |
| Poster-prompt (tiếng Việt → prompt GPT Image 2) | Repo **`Poster-prompt/`** — `README.md` |

**Gợi ý bố trí asset sau khi render:** export PNG đã duyệt vào **`public/images/marketing/`** (đã có `.gitkeep` — import trong page qua `/images/marketing/<file>.png`). Campaign **SABOHUB** giữ ảnh trong `sabo-hub/marketing/m1-launch/assets/` cho đến khi merge brand — đừng trộn nhãn B2B sabo.com.vn với pilot hub nếu chưa đồng bộ message.

---

## 4. SABOHUB (product riêng)

| Nội dung | Vị trí |
|----------|--------|
| Brief + handoff + launch checklist + ảnh M1 | `02-SABO-ECOSYSTEM/sabo-hub/` — `docs/m1-brief.json`, `docs/HANDOFF_IO_SABOHUB_M1.md`, `marketing/m1-launch/` |
| Agent marketing | `sabo-hub/MARKETING_AGENT.md` |

Tone SABOHUB (Company OS) **khác** tone SABO M&T site — luôn đọc `m1-brief.json` trước khi reuse visual từ playbook M&T.

---

## 5. Site code (nơi “gắn” trên production)

| Repo | Việc gắn chân dung lên UI |
|------|---------------------------|
| **sabo-mt-website** (repo này) | Hero / about / case: copy từ `sabo_website_playbook.md`; ảnh từ `MARKETING_IMAGE_WOW_PROMPTS` → `public/images/...`; giữ **Design.md** (LOUD) làm chuẩn layout |
| **sabohub-web** (trong sabo-hub) | Landing hub — theo `docs/handoff-spec-m1-hub-web.md` + `m1-brief.json` |
| **long-sang-ai** | Personal funnel — `personal_website_playbook.md`; tham chiếu [`CLAUDE.md`](../../01-MAIN-PRODUCTS/long-sang-ai/CLAUDE.md) mục Brand |

---

## 6. Thứ tự đọc cho agent mới

1. `PLAYBOOKS_INDEX.md` (file này)  
2. Playbook đúng vai (personal / SABO / funnel / Uyển Nhi)  
3. `lead_system_full.md` + `sabo_ai_lead_chatbot_db_api_ui.md` nếu task **lead / chatbot / CRM**  
4. `MARKETING_IMAGE_WOW_PROMPTS.md` nếu có task ảnh  
5. `Design.md` nếu chạm **sabo-mt-website**  
6. `sabo-hub/docs/m1-brief.json` nếu task **SABOHUB**

---

*Cập nhật khi thêm playbook mới — thêm dòng vào §1; lead mới → §2; asset ảnh → §3.*
