# MULTI-BRANCH CHATBOT + LEAD SCORING + CRM SYSTEM

> **Spec kỹ thuật (DB + API + UI):** [`sabo_ai_lead_chatbot_db_api_ui.md`](sabo_ai_lead_chatbot_db_api_ui.md)  
> **Chỉ mục monorepo (funnel · Uyển Nhi · ảnh · SABOHUB):** [`PLAYBOOKS_INDEX.md`](PLAYBOOKS_INDEX.md)

## 1. Multi-Branch Script (Industry-based)

### Step 1: Identify Industry
- Retail / E-commerce
- Service (Spa, Clinic, Gym)
- Real Estate
- Education
- F&B
- Agency / Creator

### Step 2: Ask Pain by Industry
Each industry has:
- Key pain options
- Follow-up question
- Suggested automation solution

---

## 2. Lead Scoring System (100 points)

### Pain Level (30)
- Low curiosity → 0–10
- Clear problem → 11–20
- Urgent pain → 21–30

### Business Size (20)
- Solo → 5
- 2–5 → 10
- 6–20 → 15
- 20+ → 20

### Budget (20)
- Unknown → 5
- <5M → 8
- 5–15M → 12
- 15–50M → 17
- 50M+ → 20

### Readiness (20)
- Researching → 5
- Interested → 10
- Wants demo → 15
- Ready now → 20

### Decision Role (10)
- Staff → 3
- Manager → 6
- Founder → 10

---

## 3. Lead Classification

- 0–39 → Cold
- 40–69 → Warm
- 70–100 → Hot

---

## 4. Action Logic

IF score >= 70:
→ Book demo immediately

ELSE IF score >= 40:
→ Offer audit call

ELSE:
→ Send free resource

---

## 5. CRM Fields

- name
- phone
- email
- company
- industry
- size
- pain
- budget
- role
- urgency
- score
- status
- next_action
- notes

---

## 6. CRM Status

- new_lead
- qualified
- demo_booked
- demo_done
- proposal_sent
- negotiating
- won
- lost
- nurture

---

## 7. Core Principle

“Right message + right timing + right lead = conversion”
