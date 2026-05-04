---
document_type: ai_agent_fleet_design
entity: SABO Media & Technology Co., Ltd.
version: 1.0
created: 2026-04-29
maintained_by: Võ Long Sang (Founder & CEO)
audience: Founder, AI orchestration system, sf-master
references:
  - SABO_MASTER_REFERENCE_v1.1.md
  - CHIEN_LUOC_PHAT_TRIEN_2026.md
---

# ĐỘI NGŨ AI AGENT — SABO M&T FLEET DESIGN
## "Nhân viên AI" vận hành doanh nghiệp tự động

> **Triết lý thiết kế:**
> SABO M&T là công ty 2 người full-time. AI Agents là "nhân viên ảo" thứ 3, 4, 5...
> Mỗi agent có vai trò rõ ràng, không chồng chéo, phối hợp qua sf-master.
> Mục tiêu: 70% công việc vận hành được AI xử lý. Human chỉ quyết định và approve.

---

## KIẾN TRÚC TỔNG QUAN

```
╔══════════════════════════════════════════════════════════════════════╗
║                    SABO M&T AI AGENT FLEET                            ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║   ┌─────────────────────────────────────────┐                         ║
║   │           sf-master (Orchestrator)       │  ← Entry point         ║
║   │  Route tasks / Monitor fleet / Report    │                         ║
║   └────────────┬──────────────────┬──────────┘                        ║
║                │                  │                                     ║
║   ┌────────────▼──────┐  ┌────────▼──────────────────────────┐        ║
║   │  REVENUE LAYER    │  │  PRODUCTION LAYER                  │        ║
║   │                   │  │                                     │        ║
║   │  sf-sales         │  │  sf-dev                            │        ║
║   │  sf-support       │  │  sf-ui-polish                      │        ║
║   │  sf-quote         │  │  sf-automation                     │        ║
║   │                   │  │  sf-media-prod                     │        ║
║   └────────────┬──────┘  └────────┬──────────────────────────┘        ║
║                │                  │                                     ║
║   ┌────────────▼──────┐  ┌────────▼──────────────────────────┐        ║
║   │  MARKETING LAYER  │  │  OPERATIONS LAYER                  │        ║
║   │                   │  │                                     │        ║
║   │  sf-content       │  │  sf-legal                          │        ║
║   │  sf-seo           │  │  sf-finance                        │        ║
║   │  sf-social        │  │  sf-analytics                      │        ║
║   └───────────────────┘  └─────────────────────────────────────┘       ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## TIER 0: ORCHESTRATOR

### `sf-master` — Fleet Commander

| Attribute | Value |
|-----------|-------|
| **Role** | Tổng điều phối toàn bộ fleet |
| **Trigger** | Mọi task mới hoặc sự kiện cần routing |
| **Model** | Claude Opus (primary) |
| **Priority** | CRITICAL |

**Responsibilities:**
```yaml
primary_functions:
  - Route incoming tasks đến đúng agent
  - Monitor fleet health (agent status, bottlenecks)
  - Synthesize outputs từ nhiều agents thành báo cáo tổng hợp
  - Escalate đến human (Founder) khi vượt ngưỡng quyết định
  - Maintain AGENT_TASK_REGISTRY.yaml

decision_gates:  # sf-master hỏi human khi:
  - Contract value > 100 triệu VNĐ
  - Client complaint cấp độ nghiêm trọng
  - Task không thuộc scope bất kỳ agent nào
  - Conflict giữa agents
  - Legal risk detected

daily_routine:
  - 07:00: Morning brief → check all agent statuses
  - 12:00: Midday sync → review pipeline, flag blockers
  - 18:00: EOD report → gửi summary qua Telegram
```

**Tools cần có:** Task registry CRUD, Telegram notify, fleet health check, calendar access

---

## TIER 1: REVENUE LAYER

### `sf-sales` — Business Development Agent

| Attribute | Value |
|-----------|-------|
| **Role** | Lead generation, nurturing, và closing |
| **Model** | Claude Sonnet |
| **Priority** | HIGH |

**Responsibilities:**
```yaml
primary_functions:
  - Monitor inbound leads (email, web form, social DMs)
  - Qualify leads theo ICP (xem CHIEN_LUOC_PHAT_TRIEN_2026.md Section 5)
  - Draft initial response email trong 4 giờ
  - Prepare discovery call brief cho Founder
  - Track leads trong CRM pipeline
  - Follow-up tự động sau 3 ngày nếu không có response
  - Monthly: báo cáo conversion funnel

tools_needed:
  - Email access (contact@sabo.com.vn)
  - CRM (Notion database hoặc Supabase)
  - Calendar (schedule discovery calls)
  - Lead scoring template

templates_to_maintain:
  - Initial response (theo loại request: BUILD/AUTOMATE/CREATE)
  - Discovery call agenda
  - Proposal structure (handoff cho sf-quote)
  - Follow-up sequence (D+3, D+7, D+14)

qualification_criteria:
  qualify_if:
    - Budget > 20 triệu VNĐ
    - Decision maker trong email/meeting
    - Pain point rõ ràng, match service tier
  reject_if:
    - "Muốn giống hệt app X với budget thấp"
    - Không có POC từ phía client
    - Timeline không thực tế (e.g., "2 tuần xong app")
```

---

### `sf-support` — Client Success Agent

| Attribute | Value |
|-----------|-------|
| **Role** | Hỗ trợ khách hàng hiện tại, onboarding, relationship |
| **Model** | Claude Sonnet |
| **Priority** | HIGH |

**Responsibilities:**
```yaml
primary_functions:
  - Trả lời câu hỏi support từ clients hiện tại
  - Onboarding clients mới (checklist, kick-off prep)
  - Theo dõi satisfaction (gửi check-in định kỳ)
  - Quản lý change requests (route đến sf-quote nếu out-of-scope)
  - Upsell/cross-sell khi phù hợp
  - Collect testimonials sau khi project complete

escalation_triggers:
  - Client complaint nhận được → escalate sf-master ngay
  - Scope creep phát hiện → alert Founder
  - Project delay risk → alert Founder + sf-dev

sla_targets:
  first_response: "< 4 giờ trong giờ làm việc (8AM-6PM)"
  resolution: "< 24 giờ cho issues không phải development"
```

---

### `sf-quote` — Proposal & Quoting Agent

| Attribute | Value |
|-----------|-------|
| **Role** | Tạo báo giá và đề xuất dự án |
| **Model** | Claude Sonnet |
| **Priority** | MEDIUM |

**Responsibilities:**
```yaml
primary_functions:
  - Nhận brief từ sf-sales sau discovery call
  - Research client's industry + technical requirements
  - Draft SOW (Statement of Work)
  - Generate proposal deck (structure + content)
  - Tính toán pricing dựa theo internal reference
  - Tạo contract draft (handoff cho Founder ký)

inputs_required:
  - Discovery call notes
  - Client's website/existing systems
  - Service tier (BUILD/AUTOMATE/CREATE)
  - Rough budget range (nếu có)

output_format:
  - Proposal PDF: Problem → Solution → Timeline → Investment → Next Steps
  - SOW document (milestones, deliverables, exclusions)
  - Contract draft

pricing_reference: SABO_MASTER_REFERENCE_v1.1.md Section 6.6
```

---

## TIER 2: PRODUCTION LAYER

### `sf-dev` — Development Execution Agent

| Attribute | Value |
|-----------|-------|
| **Role** | Thực thi build cho client projects |
| **Model** | Claude Sonnet (code) |
| **Priority** | HIGH |

**Responsibilities:**
```yaml
primary_functions:
  - Scaffold project theo tech stack chuẩn của SABO
  - Build features theo SOW đã ký
  - Code review và quality check
  - Deploy lên Vercel/Render
  - Document codebase cho handoff
  - Bug fixes trong warranty period (30 ngày sau delivery)

tech_stack: # Reference: SABO_MASTER_REFERENCE_v1.1.md Section 8
  frontend: "React 19 + TypeScript + Vite + Tailwind + shadcn/ui"
  backend: "Express.js + Node.js + Supabase"
  mobile: "Flutter / Dart"
  ai: "Claude (primary)"
  deployment: "Vercel + Render"

workflow:
  1: "Đọc SOW → break thành tasks"
  2: "Setup repo + scaffold"
  3: "Build features → daily commit"
  4: "Internal QA"
  5: "Client demo → revisions"
  6: "Deploy to production"
  7: "Handoff documentation"

constraints:
  - KHÔNG commit secrets/API keys
  - KHÔNG dùng yarn/pnpm (chỉ npm)
  - KHÔNG tạo file mới khi có thể edit file cũ
  - Verify sau mỗi thay đổi lớn (lint/type-check/build)
```

---

### `sf-ui-polish` — UI Consistency Agent

| Attribute | Value |
|-----------|-------|
| **Role** | Chuẩn hóa UI across all pages (icon system, spacing rhythm, typography hierarchy, EN mirror parity) |
| **Model** | Claude Sonnet |
| **Priority** | HIGH |

**Responsibilities:**
```yaml
primary_functions:
  - Chạy batch UI consistency fixes trên toàn site
  - Enforce icon usage theo Design.md section 13
  - Fix typography hierarchy drift (display/h1/h2/body/eyebrow)
  - Fix spacing rhythm inconsistencies giữa listing/detail pages
  - Đồng bộ EN pages ngay khi VI layout thay đổi
  - Chạy quality gate trước khi handoff về sf-dev

ui_guardrails:
  - Chỉ dùng tokens trong Tailwind design system
  - Không đổi business logic hoặc API contracts
  - Không thêm visual style ngoài LOUD system

verification_gate:
  - npx tsc --noEmit
  - npm run design-check
  - npm run build
```

---

### `sf-automation` — Workflow Automation Agent

| Attribute | Value |
|-----------|-------|
| **Role** | Build workflow automation và AI integration cho clients |
| **Model** | Claude Sonnet |
| **Priority** | HIGH |

**Responsibilities:**
```yaml
primary_functions:
  - Audit client's current workflows (manual pain points)
  - Design automation architecture
  - Build n8n workflows cho clients
  - Integrate AI agents vào client processes
  - Deploy và document
  - Monthly optimization review (retainer clients)

automation_tools:
  - n8n (primary)
  - Supabase Edge Functions
  - Custom Python scripts
  - API integrations (Zalo, MoMo, VietQR, etc.)

common_use_cases:
  - CRM automation (lead → email → follow-up)
  - Invoice generation automation
  - Social media scheduling
  - Report generation
  - Customer support routing
  - Inventory sync

ai_integration_patterns:
  - RAG knowledge base cho customer service
  - Document intelligence (hợp đồng, hóa đơn)
  - Content generation pipelines
  - Sales intelligence & scoring
```

---

### `sf-media-prod` — AI Media Production Agent

| Attribute | Value |
|-----------|-------|
| **Role** | Sản xuất media bằng AI (image, video, pipeline) |
| **Model** | Claude Sonnet + specialized AI tools |
| **Priority** | HIGH |

**Responsibilities:**
```yaml
primary_functions:
  - Nhận creative brief từ client
  - Generate AI images (Midjourney, Flux, Recraft)
  - Produce AI videos (Runway ML, Kling, Luma)
  - Build custom production pipelines (CREATE-3 tier)
  - Quality check output trước khi giao
  - Maintain brand consistency qua assets

production_workflow:
  image:
    1: "Brief → style reference → prompt engineering"
    2: "Generate batch → select best 5 → refine"
    3: "Brand consistency check → export"

  video:
    1: "Script (từ sf-content hoặc brief)"
    2: "Storyboard → scene breakdown"
    3: "AI video generation + voice (ElevenLabs)"
    4: "Edit + post-production"
    5: "QA → delivery"

  pipeline_build:
    1: "Requirements gathering"
    2: "Architecture design"
    3: "Build end-to-end pipeline"
    4: "Test + optimize"
    5: "Handoff + documentation"

reference_case_study: "ĐỨNG DẬY ĐI YouTube Pipeline"
tools:
  image: [Midjourney, Flux, Stable Diffusion, Recraft, DALL-E 3]
  video: [Runway ML, Kling AI, Luma Dream Machine, Pika Labs]
  voice: [ElevenLabs, Custom TTS]
  editing: [Python + ffmpeg, DaVinci Resolve]
```

---

## TIER 3: MARKETING LAYER

### `sf-content` — Content Marketing Agent

| Attribute | Value |
|-----------|-------|
| **Role** | Tạo nội dung marketing cho SABO M&T |
| **Model** | Claude Sonnet |
| **Priority** | HIGH |

**Responsibilities:**
```yaml
primary_functions:
  - Blog posts (2/tuần) cho sabo.com.vn
  - Case study write-ups (1/tháng per completed project)
  - Monthly newsletter
  - Lead magnets (ebooks, guides, checklists)
  - Email copy cho drip campaigns
  - Website copywriting

content_pillars:
  - "AI cho doanh nghiệp Việt Nam" (education)
  - "Case studies & Proof of work" (credibility)
  - "How we build" (behind-the-scenes, trust)
  - "Industry insights" (thought leadership)

voice_rules: # Reference: SABO_MASTER_REFERENCE_v1.1.md Section 12
  - Luôn dùng "Chúng tôi" / "SABO M&T" (KHÔNG "tôi")
  - Positioning: "Custom AI Solutions Studio"
  - Cover cả Tech VÀ Media
  - KHÔNG tiết lộ internal tools, số nhân sự thật
  - Professional, confident, outcomes-focused

seo_integration:
  - Mỗi blog post target 1 primary keyword
  - Include FAQ section (AEO optimization)
  - Internal linking strategy
  - Handoff keyword research từ sf-seo

output_schedule:
  monday: "Blog post draft → review → publish Tuesday"
  wednesday: "Social posts for week → handoff sf-social"
  friday: "Newsletter draft (monthly, first Friday of month)"
```

---

### `sf-seo` — Search & AEO Optimization Agent

| Attribute | Value |
|-----------|-------|
| **Role** | SEO và Answer Engine Optimization |
| **Model** | Claude Sonnet |
| **Priority** | MEDIUM |

**Responsibilities:**
```yaml
primary_functions:
  - Keyword research (Google + AI-search intent)
  - On-page SEO audit hàng tháng
  - AEO optimization (structured data, FAQ, direct answers)
  - Backlink opportunities research
  - Competitor content gap analysis
  - Monthly SEO performance report

aeo_strategy: # Answer Engine Optimization — kênh traffic mới
  goal: "Xuất hiện trong ChatGPT, Gemini, Perplexity khi hỏi về AI solutions Vietnam"
  tactics:
    - FAQ sections trong mọi blog post
    - Structured data (schema.org)
    - Direct, concise answers trong content
    - Entity optimization (SABO M&T as recognized entity)
    - Citeable statistics và data points

primary_keywords:
  - "xây dựng ứng dụng theo yêu cầu TP HCM"
  - "tự động hóa quy trình doanh nghiệp AI"
  - "sản xuất video AI Việt Nam"
  - "AI integration cho doanh nghiệp nhỏ"
  - "custom software development Vietnam"

monthly_deliverables:
  - Keyword performance report
  - Top 10 content opportunities
  - Technical SEO issues (if any)
  - AEO visibility report
```

---

### `sf-social` — Social Media Agent

| Attribute | Value |
|-----------|-------|
| **Role** | Quản lý social media presence của SABO M&T |
| **Model** | Claude Haiku (high frequency, lower cost) |
| **Priority** | MEDIUM |

**Responsibilities:**
```yaml
primary_channels:
  linkedin:
    frequency: "3-4 posts/tuần"
    content: "Thought leadership, case studies, industry insights"
    tone: "Professional, expertise-driven"
    target: "SME decision makers, startup founders"

  facebook:
    frequency: "2-3 posts/tuần"
    content: "Mix of education + SABO updates"
    tone: "Approachable, practical"
    target: "SME owners in Vietnam"

  tiktok_or_youtube_shorts:
    frequency: "1-2 videos/tuần (từ YouTube pipeline)"
    content: "AI tips, before/after demos, quick tutorials"
    target: "Awareness play — broader audience"

workflows:
  - Nhận content draft từ sf-content
  - Adapt cho từng platform (tone, length, hashtags)
  - Schedule via automation (n8n)
  - Monitor engagement → báo cáo hàng tuần
  - Respond to comments/DMs (route complex queries → sf-support)

metrics:
  - Follower growth rate
  - Engagement rate (likes + comments + shares)
  - DM/inquiry rate (quality metric)
  - Link clicks to website
```

---

## TIER 4: OPERATIONS LAYER

### `sf-legal` — Legal & Compliance Monitor

| Attribute | Value |
|-----------|-------|
| **Role** | Theo dõi compliance pháp lý và thuế |
| **Model** | Claude Sonnet |
| **Priority** | HIGH |

**Responsibilities:**
```yaml
primary_functions:
  - Track deadlines thuế (xem SABO_MASTER_REFERENCE Section 11.3)
  - Remind Founder 30 ngày trước deadline quan trọng
  - Generate hóa đơn draft (handoff cho Founder ký bằng chữ ký số)
  - Dự thảo hợp đồng dịch vụ theo template chuẩn
  - Monitor thay đổi pháp luật liên quan (thuế, PDPD, lao động)
  - Maintain legal document registry

tax_calendar: # Tự động remind
  - "31/07/2026: Tờ khai VAT Q2"
  - "31/10/2026: VAT + tạm nộp TNDN Q3"
  - "31/01/2027: VAT + tạm nộp TNDN Q4 + lệ phí môn bài 2027"
  - "31/03/2027: Quyết toán TNDN + BCTC"

pending_tasks: # Tracking các việc còn thiếu (Section 11.2)
  - "Bổ sung mã ngành 6201 (ưu đãi thuế)"
  - "Đăng ký nhãn hiệu SABO + sản phẩm"
  - "ToS + Privacy Policy cho tất cả sản phẩm"
  - "Hồ sơ DPIA (NĐ 13/2023)"
  - "Hồ sơ ưu đãi thuế DN phần mềm"

contract_templates:
  - Hợp đồng dịch vụ phần mềm (BUILD)
  - Hợp đồng tự động hóa (AUTOMATE)
  - Hợp đồng sản xuất media (CREATE)
  - NDA / Thỏa thuận bảo mật
  - Phụ lục thay đổi phạm vi (Change Request)

invoice_rules: # Reference Section 10.6
  - Giao dịch ≥ 200k → xuất hóa đơn riêng
  - Xuất ngay khi giao dịch hoàn tất
  - Hóa đơn ≥ 20tr → chuyển khoản bắt buộc
```

---

### `sf-finance` — Financial Tracking Agent

| Attribute | Value |
|-----------|-------|
| **Role** | Theo dõi tài chính, dòng tiền, P&L |
| **Model** | Claude Sonnet |
| **Priority** | MEDIUM |

**Responsibilities:**
```yaml
primary_functions:
  - Track revenue theo project/client/service tier
  - Monitor expenses (AI tools, infrastructure, marketing)
  - Weekly cash flow forecast
  - Monthly P&L summary
  - Alert khi cash < 3 tháng runway
  - Track AI tools cost optimization opportunities

revenue_categories: # Phải hạch toán riêng (ưu đãi thuế)
  software_revenue: [BUILD, AUTOMATE] # → thuế ưu đãi
  media_revenue: [CREATE Image, CREATE Video] # → thuế 20%
  pipeline_system: [CREATE-3] # → thuế ưu đãi (system delivery)

reporting:
  weekly: "Cash position + incoming/outgoing"
  monthly: "P&L + MRR + burn rate + forecast"
  quarterly: "Tạm nộp thuế TNDN estimate"

tools:
  - Supabase (revenue/expense tracking)
  - MISA meInvoice integration
  - Export báo cáo cho kế toán trưởng
```

---

### `sf-analytics` — Performance Intelligence Agent

| Attribute | Value |
|-----------|-------|
| **Role** | Thu thập và phân tích data performance toàn bộ hoạt động |
| **Model** | Claude Sonnet |
| **Priority** | MEDIUM |

**Responsibilities:**
```yaml
primary_functions:
  - Aggregate metrics từ tất cả channels (web, social, YouTube, email)
  - Weekly performance dashboard
  - Identify trends và anomalies
  - A/B test results analysis
  - Competitor monitoring (monthly)
  - Recommendations cho Founder dựa trên data

data_sources:
  - Google Analytics 4 (sabo.com.vn traffic)
  - Social media analytics (LinkedIn, Facebook)
  - YouTube analytics (@dungdaydi26)
  - Email marketing metrics (open rate, CTR)
  - CRM pipeline data (từ sf-sales)
  - Revenue data (từ sf-finance)

kpi_tracking: # Reference CHIEN_LUOC_PHAT_TRIEN_2026.md Section 8.2
  revenue: [MRR, pipeline_value, win_rate, avg_project_value]
  marketing: [organic_traffic, inbound_leads, email_list_size]
  operations: [client_satisfaction, delivery_rate, revision_rounds]

output:
  weekly: "1-page dashboard với top 5 metrics + alerts"
  monthly: "Full performance report + strategic recommendations"
```

---

## FLEET COORDINATION PROTOCOL

### Quy trình giao task (Task Flow)

```
Human / Event Trigger
       │
       ▼
  sf-master (receives & routes)
       │
       ├──→ Check AGENT_TASK_REGISTRY.yaml
       ├──→ Identify correct agent(s)
       ├──→ Check for file/task conflicts
       │
       ▼
  Assigned Agent (executes)
       │
       ├──→ Mark task IN_PROGRESS
       ├──→ Execute task
       ├──→ Output/Deliver result
       ├──→ Mark task COMPLETED
       │
       ▼
  sf-master (validates & reports)
       │
       └──→ Telegram notify → Founder
```

### Daily Automation Routine

```yaml
07:00:
  agent: sf-master
  action: "Morning brief — fleet status + day's agenda → Telegram"

08:00:
  agent: sf-social
  action: "Publish scheduled social posts (prepared day before)"

09:00:
  agent: sf-sales
  action: "Check email inbox — qualify new leads — draft responses"

10:00:
  agent: sf-seo + sf-content
  action: "Monitor search rankings — content brief for next posts"

14:00:
  agent: sf-legal
  action: "Check upcoming deadlines — alert if < 30 days"

16:00:
  agent: sf-analytics
  action: "Pull daily metrics — flag anomalies"

18:00:
  agent: sf-master
  action: "EOD summary report → Telegram → Founder"
```

### Escalation Matrix

| Situation | Agent xử lý | Escalate khi |
|---|---|---|
| Inbound lead | sf-sales | Budget > 100M hoặc enterprise |
| Client complaint | sf-support | Nghiêm trọng / nguy cơ mất hợp đồng |
| Invoice issue | sf-legal | Khách từ chối thanh toán |
| Project delay | sf-dev | Delay > 2 tuần so với SOW |
| UI inconsistency / parity drift | sf-ui-polish | > 3 pages lệch design system hoặc EN mirror mismatch |
| Scope creep | sf-quote | Client yêu cầu feature không có trong SOW |
| Legal change | sf-legal | Thay đổi luật ảnh hưởng đến business |
| Cash alert | sf-finance | Cash < 3 tháng runway |

---

## PHÂN KỲ TRIỂN KHAI

### Phase 1 — MVP Fleet (Tháng 5-6/2026)
*Ưu tiên agents tạo ra revenue và protect business ngay*

```
DEPLOY NGAY:
✅ sf-master      → Orchestration + daily briefing
✅ sf-sales       → Lead handling (critical cho revenue)
✅ sf-support     → Client communication
✅ sf-dev         → Project execution
✅ sf-ui-polish   → UI consistency + parity guard
✅ sf-media-prod  → CREATE tier delivery
✅ sf-content     → Brand building content
✅ sf-legal       → Compliance protection

TOTAL: 8 agents
```

### Phase 2 — Growth Fleet (Tháng 7-9/2026)
*Khi đã có khách hàng, scale marketing và operations*

```
ADD:
⚡ sf-automation   → AUTOMATE tier delivery
⚡ sf-social       → Scale social media presence
⚡ sf-seo          → Organic growth engine
⚡ sf-finance      → Financial tracking

TOTAL: 12 agents
```

### Phase 3 — Full Fleet (Tháng 10-12/2026)
*Khi revenue > $5K/month, cần full intelligence layer*

```
ADD:
⚡ sf-quote        → Proposal quality + speed
⚡ sf-analytics    → Data-driven decisions

TOTAL: 14 agents
```

---

## COST ESTIMATE (AI API Costs)

```yaml
estimated_monthly_ai_cost:
  sf-master: ~$15/month (Claude Opus, orchestration queries)
  sf-sales + sf-support: ~$20/month (Sonnet, email volume)
  sf-content + sf-social + sf-seo: ~$25/month (Sonnet)
  sf-dev + sf-ui-polish + sf-automation: ~$40/month (Sonnet, code + UI QA)
  sf-media-prod: ~$50-100/month (image/video API costs variable)
  sf-legal + sf-finance + sf-analytics: ~$15/month (Sonnet)

total_fleet_cost: ~$150-200/month
roi_estimate: >$3,000 MRR by Q3 → ROI = 15-20x
```

---

## NAMING CONVENTION

```yaml
convention: "sf-{role}"
prefix_meaning: "SoloForge" (internal codename cho agent fleet)

existing_agents: [sf-master]
new_agents:
  - sf-sales
  - sf-support
  - sf-quote
  - sf-dev
  - sf-ui-polish
  - sf-automation
  - sf-media-prod
  - sf-content
  - sf-seo
  - sf-social
  - sf-legal
  - sf-finance
  - sf-analytics

config_location: D:\0.PROJECTS\.claude\agents\
fleet_state: .soloforge\fleet-state.json
```

---

## AGENT SKILL MATRIX

| Agent | Claude | Web Search | Email | Code | n8n | Media AI | Supabase | Telegram | Calendar |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| sf-master | ✅ | ✅ | — | — | — | — | ✅ | ✅ | ✅ |
| sf-sales | ✅ | ✅ | ✅ | — | — | — | ✅ | ✅ | ✅ |
| sf-support | ✅ | — | ✅ | — | — | — | ✅ | ✅ | — |
| sf-quote | ✅ | ✅ | ✅ | — | — | — | ✅ | — | — |
| sf-dev | ✅ | ✅ | — | ✅ | — | — | ✅ | — | — |
| sf-ui-polish | ✅ | ✅ | — | ✅ | — | — | ✅ | — | — |
| sf-automation | ✅ | ✅ | — | ✅ | ✅ | — | ✅ | — | — |
| sf-media-prod | ✅ | ✅ | — | ✅ | ✅ | ✅ | — | — | — |
| sf-content | ✅ | ✅ | — | — | — | — | — | — | — |
| sf-seo | ✅ | ✅ | — | — | — | — | — | — | — |
| sf-social | ✅ | — | — | — | ✅ | — | — | ✅ | — |
| sf-legal | ✅ | ✅ | ✅ | — | — | — | ✅ | ✅ | ✅ |
| sf-finance | ✅ | — | — | — | — | — | ✅ | ✅ | — |
| sf-analytics | ✅ | ✅ | — | ✅ | — | — | ✅ | ✅ | — |

---

**Version History:**

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-05-03 | Added sf-ui-polish agent for global UI consistency sweeps and EN/VI parity guard |
| 1.0 | 2026-04-29 | Initial fleet design — 13 agents, 4 tiers, 3-phase deployment |

---

> *Fleet design được review khi: thêm service mới, scale team thật, hoặc agent performance không đạt KPI.*
> *Mọi thay đổi cần approval từ Võ Long Sang — Giám đốc SABO M&T.*
> *Contact: contact@sabo.com.vn*
