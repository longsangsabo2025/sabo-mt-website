# SABO AI LEAD CHATBOT – DB SCHEMA + API SPEC + UI LOGIC

Date: 2026-05-03

> **Logic nghiệp vụ (nhánh ngành + điểm + CRM):** [`lead_system_full.md`](lead_system_full.md)  
> **Chỉ mục monorepo:** [`PLAYBOOKS_INDEX.md`](PLAYBOOKS_INDEX.md)

## 1. Database Schema

### Table: leads

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT,
  phone TEXT,
  email TEXT,
  company_name TEXT,
  industry TEXT,
  business_size TEXT,
  main_pain TEXT,
  current_process TEXT,
  budget_range TEXT,
  decision_role TEXT,
  urgency TEXT,
  preferred_channel TEXT,
  source TEXT,
  lead_score INTEGER DEFAULT 0,
  lead_status TEXT DEFAULT 'new_lead',
  next_action TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### Table: lead_conversations

```sql
CREATE TABLE lead_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  session_id TEXT,
  message_role TEXT CHECK (message_role IN ('user', 'assistant', 'system')),
  message_content TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Table: demo_bookings

```sql
CREATE TABLE demo_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  booking_time TIMESTAMPTZ,
  meeting_channel TEXT,
  meeting_link TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 2. Lead Status

```txt
new_lead
qualified
demo_booked
demo_done
proposal_sent
negotiating
won
lost
nurture
```

---

## 3. Lead Scoring Logic

```ts
type LeadInput = {
  painLevel: number;      // 0-30
  businessSize: number;   // 0-20
  budget: number;         // 0-20
  readiness: number;      // 0-20
  decisionRole: number;   // 0-10
};

export function calculateLeadScore(input: LeadInput) {
  return (
    input.painLevel +
    input.businessSize +
    input.budget +
    input.readiness +
    input.decisionRole
  );
}

export function classifyLead(score: number) {
  if (score >= 70) return 'hot_lead';
  if (score >= 40) return 'warm_lead';
  return 'cold_lead';
}

export function getNextAction(score: number) {
  if (score >= 70) return 'book_demo_now';
  if (score >= 40) return 'offer_audit';
  return 'send_lead_magnet';
}
```

---

## 4. API Spec

### POST /api/leads

Create or update lead.

Request:

```json
{
  "full_name": "Nguyen Van A",
  "phone": "0900000000",
  "email": "a@example.com",
  "company_name": "ABC Co",
  "industry": "retail",
  "business_size": "6-20",
  "main_pain": "CSKH chậm",
  "budget_range": "15-50M",
  "decision_role": "founder",
  "urgency": "this_month",
  "preferred_channel": "zalo",
  "source": "website_chatbot"
}
```

Response:

```json
{
  "lead_id": "uuid",
  "lead_score": 78,
  "lead_status": "hot_lead",
  "next_action": "book_demo_now"
}
```

---

### POST /api/chat/message

Send chatbot message.

Request:

```json
{
  "session_id": "session_123",
  "lead_id": "uuid",
  "message": "Tôi muốn làm automation cho CSKH",
  "current_step": "identify_pain"
}
```

Response:

```json
{
  "reply": "Dạ, hiện tại mình đang trả lời khách qua kênh nào nhiều nhất ạ?",
  "next_step": "ask_channel",
  "collected_data": {
    "main_pain": "CSKH"
  }
}
```

---

### POST /api/demo-booking

Book demo.

Request:

```json
{
  "lead_id": "uuid",
  "booking_time": "2026-05-04T10:00:00+07:00",
  "meeting_channel": "google_meet"
}
```

Response:

```json
{
  "booking_id": "uuid",
  "status": "pending",
  "message": "Demo booking created"
}
```

---

### GET /api/leads/:id

Get lead detail.

Response:

```json
{
  "id": "uuid",
  "full_name": "Nguyen Van A",
  "industry": "retail",
  "lead_score": 78,
  "lead_status": "hot_lead",
  "next_action": "book_demo_now"
}
```

---

## 5. UI Chatbot Logic

### Step Flow

```txt
start
→ ask_name
→ ask_industry
→ ask_main_pain
→ ask_business_size
→ ask_budget
→ ask_decision_role
→ ask_urgency
→ calculate_score
→ recommend_action
→ collect_contact
→ book_demo / send_resource / offer_audit
```

---

## 6. UI States

```ts
type ChatStep =
  | 'start'
  | 'ask_name'
  | 'ask_industry'
  | 'ask_main_pain'
  | 'ask_business_size'
  | 'ask_budget'
  | 'ask_decision_role'
  | 'ask_urgency'
  | 'calculate_score'
  | 'recommend_action'
  | 'collect_contact'
  | 'book_demo'
  | 'done';
```

---

## 7. Industry Branching

```ts
const industryPainMap = {
  retail: [
    'Trả lời inbox chậm',
    'Chốt đơn thủ công',
    'Quản lý đơn hàng rối',
    'Thiếu content bán hàng'
  ],
  service: [
    'Đặt lịch thủ công',
    'Chăm sóc khách cũ yếu',
    'Tư vấn dịch vụ lặp lại',
    'Không có follow-up'
  ],
  real_estate: [
    'Lọc khách kém',
    'Data khách rời rạc',
    'Tạo content mất thời gian',
    'Không chăm lại lead cũ'
  ],
  education: [
    'Tư vấn khóa học lặp lại',
    'Follow-up học viên yếu',
    'Quản lý lớp thủ công',
    'Tạo content tuyển sinh chậm'
  ],
  fnb: [
    'Đặt bàn thủ công',
    'Feedback rời rạc',
    'Không chăm khách cũ',
    'Content món ăn thiếu đều'
  ],
  agency: [
    'Thiếu idea',
    'Viết script mất thời gian',
    'Đăng bài đa nền tảng thủ công',
    'Báo cáo performance mất công'
  ]
};
```

---

## 8. Recommended CTA by Score

### Cold Lead
```txt
Em gửi mình checklist automation miễn phí trước nhé.
```

### Warm Lead
```txt
Trường hợp của mình có tiềm năng automation khá rõ.
Em đề xuất một buổi audit 15 phút.
```

### Hot Lead
```txt
Phần này nên demo trực tiếp luôn để tiết kiệm thời gian.
Em đặt lịch với team SABO cho mình hôm nay hoặc ngày mai được không ạ?
```

---

## 9. Dev Notes

- Store all messages in `lead_conversations`
- Never expose internal score logic to user directly
- Always respond within 1–2 seconds if possible
- Hot lead should trigger notification to founder/team
- Sync lead to CRM immediately after contact info is captured

---

## 10. Core Principle

“Chatbot không chỉ trả lời. Chatbot phải phân loại, định hướng, và đẩy lead đến hành động tiếp theo.”

---

## 11. Implementation map (2026-05-03) — spec vs code hiện tại

| Thành phần | Spec trong doc này | Đã có trong repo | Ghi chú |
|-------------|-------------------|-----------------|---------|
| Bảng `leads` đầy đủ (score, status, industry, …) | §1 `leads` | **Có migration** — `supabase/migrations/20260503_lead_engine.sql` trên nền `20260429_init_leads.sql` | Thêm cột: `full_name`, `industry`, `main_pain`, `budget_range`, `urgency`, `lead_score`, `lead_status`, `next_action`, `notes`, `chat_state`, `updated_at`, … + trigger `updated_at`. **Phải chạy SQL** trên project Supabase trước khi API mới hoạt động. |
| `lead_conversations` | §1 | **Có** | Migration + `POST /api/chat/message` (ghi user/assistant, PATCH `chat_state`). |
| `demo_bookings` | §1 | **Có** | Migration + `POST /api/demo-booking`. |
| `POST /api/leads` | §4 | **Có** — `src/app/api/leads/route.ts` | Tạo lead + scoring; Telegram khi `lead_score >= 70`. Form marketing vẫn có thể dùng `POST /api/contact` (payload cũ). |
| `GET /api/leads/:id` | §4 | **Có** — `src/app/api/leads/[id]/route.ts` | Đọc lead theo UUID (PostgREST). |
| `POST /api/chat/session` | §4 (tiền đề `lead_id`) | **Có** — `src/app/api/chat/session/route.ts` | Tạo lead tối thiểu (`lead-*@invalid`) cho phiên khảo sát widget. |
| `POST /api/chat/message` (session, `lead_id`, step machine §5–6) | §4 | **Có** — `src/lib/chat-lead-flow.ts` + route | Vẫn song song **`POST /api/chat`** (Groq stream, không state machine, không `lead_conversations`). |
| Widget UI (Uyển Nhi) | §7–8 (khái niệm) | **Có** — `src/components/ui/ChatWidget.tsx` tab **Khảo sát** | Gọi `session` → `message`; tab **Hỏi AI** = Groq như cũ. |
| `POST /api/demo-booking` (spec: `lead_id` + `demo_bookings`) | §4 | **Có** — `src/app/api/demo-booking/route.ts` | **`POST /api/booking`** vẫn là luồng Forge (`consultations`); hai API phục vụ hai kênh khác nhau. |
| Lưu lead + Telegram | §9 | **Có** — `src/app/api/contact/route.ts` + `/api/leads` | Form `/contact`: insert + `full_name`, `main_pain` (từ message), `lead_score` / `lead_status` / `next_action` (cùng heuristic `lead-scoring`) khi migration đã apply. |

**Pipeline test thực tế** (không cần chatbot): xem [`tools/PIPELINE_TEST_NOTES.md`](tools/PIPELINE_TEST_NOTES.md).

---
