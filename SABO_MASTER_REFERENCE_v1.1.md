---
document_type: master_reference
entity: SABO Media & Technology Co., Ltd.
version: 1.1
last_updated: 2026-04-29
maintained_by: Võ Long Sang (Founder & CEO)
audience: AI Agents (Claude Code, sf-master, sf-* fleet, design agents, marketing agents)
purpose: Single source of truth cho mọi thông tin pháp lý, brand, sản phẩm, vận hành của SABO M&T
language: Vietnamese (primary), English (secondary)

changelog_v1.1:
  - Confirmed MST, ngày cấp GCN, email công ty, phone công ty
  - Removed section 5 (Brand & Identity) — sẽ được duy trì ở document riêng
  - Refactored service tiers: thêm tier "CREATE" (AI Media Production)
  - Rewrote positioning: Digital Transformation Studio → Custom AI Solutions Studio
  - Added Media production capabilities (50% của brand identity)
  - Fixed mission statement: reflect đúng business thật (build software + media)
  - Tagline pending decision (xem section 5.4)
---

# SABO MEDIA & TECHNOLOGY — MASTER REFERENCE

> **Tài liệu này là single source of truth.** Mọi AI agent khi cần thông tin về công ty SABO M&T phải tham chiếu file này. Không tự generate thông tin pháp lý/brand không có trong document. Khi thông tin có dấu `[NEEDS_VERIFICATION]` hoặc `[TBD]` → phải hỏi human trước khi sử dụng.

## Table of Contents

1. [Thông tin pháp lý cốt lõi](#1-thông-tin-pháp-lý-cốt-lõi)
2. [Cơ cấu tổ chức](#2-cơ-cấu-tổ-chức)
3. [Tài chính & Vốn điều lệ](#3-tài-chính--vốn-điều-lệ)
4. [Ngành nghề kinh doanh](#4-ngành-nghề-kinh-doanh)
5. [Positioning & Messaging](#5-positioning--messaging)
6. [Sản phẩm & Dịch vụ](#6-sản-phẩm--dịch-vụ)
7. [Case Studies](#7-case-studies)
8. [Tech Stack & Infrastructure](#8-tech-stack--infrastructure)
9. [Hệ sinh thái Domain](#9-hệ-sinh-thái-domain)
10. [Tuân thủ Pháp lý & Thuế](#10-tuân-thủ-pháp-lý--thuế)
11. [Hồ sơ Nội bộ & Compliance](#11-hồ-sơ-nội-bộ--compliance)
12. [Voice, Tone & Boundaries](#12-voice-tone--boundaries)
13. [Agent Operating Guidelines](#13-agent-operating-guidelines)
14. [Document Version Control](#14-document-version-control)

---

## 1. THÔNG TIN PHÁP LÝ CỐT LÕI

### 1.1 Định danh doanh nghiệp

| Field | Value |
|-------|-------|
| **Tên đầy đủ (VN)** | CÔNG TY TNHH SABO MEDIA & TECHNOLOGY |
| **Tên đầy đủ (EN)** | SABO MEDIA & TECHNOLOGY COMPANY LIMITED |
| **Tên giao dịch / Brand** | SABO Media & Technology |
| **Viết tắt** | SABO M&T |
| **Mã số doanh nghiệp / MST** | **3502578142** |
| **Loại hình pháp lý** | Công ty TNHH Một thành viên (Single-member LLC) |
| **Quốc gia đăng ký** | Việt Nam |
| **Cơ quan cấp** | Sở Tài chính TP HCM — Phòng Đăng ký Kinh doanh |
| **Ngày đăng ký lần đầu** | **25/03/2026** |
| **Năm tài chính** | 01/01 — 31/12 (dương lịch) |
| **Năm tài chính đầu tiên** | 25/03/2026 — 31/12/2026 |

### 1.2 Trụ sở chính

```
342/9 Nguyễn An Ninh
Phường Tam Thắng
Thành phố Hồ Chí Minh
Việt Nam
```

> **LƯU Ý CHO AGENTS**: Trụ sở công ty là TP HCM, KHÔNG phải Vũng Tàu. Vũng Tàu là chỗ ở hiện tại của founder (Căn hộ B22.40 The Sóng, 28 Thi Sách, P. Vũng Tàu). Khi nhắc tới "trụ sở SABO M&T" luôn dùng địa chỉ TP HCM.

### 1.3 Liên hệ chính thức

| Channel | Value | Note |
|---------|-------|------|
| **Email công ty (chính thức)** | **contact@sabo.com.vn** | Dùng cho mọi business communications |
| **Email founder (cá nhân)** | longsangsabo@gmail.com | KHÔNG dùng đại diện công ty |
| **Phone (liên hệ chính thức)** | **0798893333** | Số liên hệ business |
| **Phone (trên giấy tờ pháp lý)** | 0965746795 | Số trong GCN ĐKDN, KHÔNG quảng bá |
| **Domain công ty** | sabo.com.vn | `[chưa launch]` |

> **AGENTS**: Khi viết content marketing, hợp đồng, contact info → dùng `contact@sabo.com.vn` và `0798893333`. Số 0965746795 chỉ xuất hiện trên giấy tờ pháp lý gốc.

---

## 2. CƠ CẤU TỔ CHỨC

### 2.1 Chủ sở hữu / Chủ tịch / Giám đốc

```yaml
name: Võ Long Sang
gender: Nam
date_of_birth: 1996-02-04
nationality: Việt Nam
ethnicity: Kinh
id_number: 068096011511
id_issue_date: 2023-10-04
id_issued_by: Cục Cảnh sát Quản lý Hành chính về Trật tự Xã hội

permanent_address: Thôn Liên Đầm 3, Xã Di Linh, Tỉnh Lâm Đồng
current_address: Căn hộ B22.40, The Sóng, 28 Thi Sách, P. Vũng Tàu, TP HCM

role:
  - Chủ sở hữu công ty
  - Chủ tịch công ty
  - Giám đốc công ty
  - Người đại diện theo pháp luật
```

> **Theo Điều lệ Điều 8**: Chủ sở hữu công ty đồng thời là Chủ tịch công ty kiêm Giám đốc. Công ty có 01 người đại diện pháp luật duy nhất.

### 2.2 Kế toán trưởng

```yaml
name: Võ Ngọc Diễm
gender: Nữ
date_of_birth: 2003-12-11
nationality: Việt Nam
ethnicity: Kinh
id_number: 068303007384
id_issue_date: 2021-05-31

permanent_address: Thôn 3, Liên Đầm, Di Linh, Lâm Đồng
current_address: Căn hộ B22.40, The Sóng, 28 Thi Sách, P. Vũng Tàu, TP HCM

role: Kế toán trưởng
appointment_decision: 01/2026/QĐ-HĐTV
appointment_date: 2026-04-16
contract_status: Đang làm việc theo HĐLĐ (BHXH bắt buộc)
```

### 2.3 Quy mô nhân sự (public stance)

| Audience | Stance |
|----------|--------|
| **Public website (sabo.com.vn)** | "Đội ngũ chuyên gia" — không tiết lộ con số |
| **Đối tác B2B / khách doanh nghiệp** | Mơ hồ, không xác nhận solo |
| **Personal brand (longsang.org)** | Có thể show solo founder + AI agents (USP cá nhân) |
| **Cơ quan thuế / pháp lý** | Trung thực: 02 nhân sự (GĐ + KTT) tại thời điểm 04/2026 |

> **QUY TẮC CHO AGENTS**: Nếu khách hỏi quy mô qua website/email công ty → tránh confirm số cụ thể. Nếu họ hỏi qua kênh cá nhân của founder (longsang.org) → có thể minh bạch về mô hình AI-Powered Company.

---

## 3. TÀI CHÍNH & VỐN ĐIỀU LỆ

### 3.1 Vốn điều lệ

| Field | Value |
|-------|-------|
| **Tổng vốn điều lệ** | 1.000.000.000 VNĐ (Một tỷ đồng) |
| **Hình thức góp vốn (theo điều lệ)** | 100% tiền mặt |
| **Hình thức góp vốn (đang xem xét)** | Hybrid: Tiền mặt + TSCĐ vô hình (IP/source code) |
| **Deadline góp đủ vốn** | 11/06/2026 |
| **Trạng thái góp vốn** | `[IN_PROGRESS]` — chưa hoàn thành |

### 3.2 Cơ cấu vốn đề xuất (đang xem xét)

```yaml
proposed_capital_structure:
  cash:
    amount: 200_000_000 VNĐ
    purpose: Vận hành 6-12 tháng (server, marketing, dev tools)
  
  intangible_fixed_assets:
    amount: 700_000_000 VNĐ
    components:
      - Source code các sản phẩm đã build
      - Domain & websites
      - IP, technical know-how
    requires: Thẩm định giá độc lập
  
  tangible_fixed_assets:
    amount: 100_000_000 VNĐ
    components:
      - Laptop, thiết bị kỹ thuật đã sở hữu
  
  total: 1_000_000_000 VNĐ
```

### 3.3 Phân phối lợi nhuận (theo Điều lệ Điều 17)

```yaml
profit_allocation:
  reserve_fund: 5%        # Quỹ dự trữ bổ sung vốn điều lệ
  development_fund: 10%   # Quỹ phát triển kinh doanh
  bonus_welfare: 5%       # Quỹ khen thưởng phúc lợi
  other_funds: 0%         # Các quỹ khác theo pháp luật
  remaining: Chia cho chủ sở hữu (miễn thuế TNCN)
```

### 3.4 Quy định góp/rút vốn

- **Hoàn trả vốn**: Chỉ được sau khi DN hoạt động liên tục >2 năm (Điều lệ Điều 5)
- **Tăng vốn**: Chủ sở hữu đầu tư thêm hoặc huy động từ người khác
- **Nếu huy động từ bên ngoài**: Phải chuyển đổi loại hình thành TNHH 2TV+ hoặc CTCP (thông báo trong 10 ngày)

---

## 4. NGÀNH NGHỀ KINH DOANH

### 4.1 14 mã ngành đã đăng ký (theo Điều lệ Điều 3)

| STT | Mã | Tên ngành | Phục vụ mảng nào |
|-----|-----|-----------|------------------|
| 1 | 7211 | Nghiên cứu khoa học và phát triển công nghệ trong lĩnh vực khoa học tự nhiên | Tech R&D |
| 2 | 6211 | Phát triển trò chơi điện tử, phần mềm trò chơi điện tử | Tech / Software |
| 3 | **5911** | **Hoạt động sản xuất phim điện ảnh, video và chương trình truyền hình** | **Media** |
| 4 | **5912** | **Hoạt động hậu kỳ phim điện ảnh, video và chương trình truyền hình** | **Media** |
| 5 | 7410 | Hoạt động thiết kế chuyên dụng | Media / Tech |
| 6 | **7420** | **Hoạt động nhiếp ảnh** | **Media** |
| 7 | 6219 | Lập trình máy tính khác | Tech |
| 8 | 6220 | Tư vấn máy tính và quản lý cơ sở hạ tầng máy tính | Tech |
| 9 | 6290 | Hoạt động dịch vụ máy tính và công nghệ thông tin khác | Tech |
| 10 | 8299 | Hoạt động dịch vụ hỗ trợ kinh doanh khác | Hỗ trợ |
| 11 | 7320 | Nghiên cứu thị trường và thăm dò dư luận | Hỗ trợ |
| 12 | 7310 | Quảng cáo | Media / Marketing |
| 13 | 6310 | Cơ sở hạ tầng công nghệ thông tin, xử lý dữ liệu, lưu trữ | Tech |
| 14 | 6390 | Hoạt động cổng tìm kiếm web và các dịch vụ thông tin khác | Tech |

> **NOTE**: Mã 5911, 5912, 7420, 7310 là pháp lý cơ sở cho mảng **Media production** (hình ảnh, video, content). Đảm bảo có thể xuất hóa đơn cho dịch vụ media production.

### 4.2 Mã ngành cần BỔ SUNG (priority)

```yaml
priority_high:
  - code: 6201
    name: Lập trình máy vi tính
    reason: Bắt buộc theo Luật Thuế TNDN 2025 để qualify ưu đãi thuế DN sản xuất phần mềm
    deadline: ASAP — trước quyết toán thuế năm 2026
    process: Nộp online qua dangkyquamang.dkkd.gov.vn (free, 3-5 ngày)

priority_medium:
  - code: 8559
    name: Giáo dục khác chưa được phân vào đâu
    reason: Nếu push AINewbie (khóa học AI) phải có mã này để xuất hóa đơn dịch vụ giáo dục
    timing: Trước khi launch khóa học có thu phí
```

### 4.3 Hoạt động kinh doanh thực tế

> **Core business**: **Custom AI Solutions Studio**  
> **2 mảng chính**:  
> **(1) Technology** — Custom software (apps, websites, automation, AI integration)  
> **(2) Media** — AI-powered media production (images, videos, content pipelines)

---

## 5. POSITIONING & MESSAGING

### 5.1 Category Positioning

> **Custom AI Solutions Studio**

Lý do chọn category này:
- Bao gồm cả **Technology** (build) và **Media** (create) — match brand name
- "Custom" = USP thật (KHÔNG dùng template, mỗi giải pháp tùy chỉnh)
- "AI Solutions" = AI-native ngay từ đầu, không phải retrofit
- "Studio" = boutique + creative + technical (không phải agency vendor, không phải Big4)

KHÔNG dùng các từ sau khi mô tả công ty:
- ❌ "Agency" (sounds like service vendor)
- ❌ "Freelance studio"
- ❌ "Consulting firm"
- ❌ "Tech holding"
- ❌ "Software company" (commodity, miss Media)
- ❌ "Digital Transformation Studio" (claim quá rộng, khó back up)
- ❌ "AI consultancy" (oversaturated 2026)

### 5.2 Positioning Statement

**Vietnamese**:
> "Studio xây dựng giải pháp công nghệ và sản xuất media tùy chỉnh bằng AI — cho doanh nghiệp và cá nhân Việt Nam."

**English**:
> "A custom AI studio building software and media solutions for Vietnamese businesses and individuals."

### 5.3 Mission Statement (REVISED)

> **"SABO Media & Technology là Custom AI Solutions Studio. Chúng tôi xây dựng các giải pháp công nghệ tùy chỉnh — từ ứng dụng, website, hệ thống tự động hóa — đến các sản phẩm media chất lượng cao bằng AI — hình ảnh, video, và pipelines sản xuất nội dung tự động. Mỗi giải pháp được thiết kế riêng theo nhu cầu của khách hàng, không phải template lắp ghép. Chúng tôi tận dụng sức mạnh của AI để giải quyết những bài toán mà trước đây cần đội ngũ lớn và ngân sách cao."**

### 5.4 Tagline (PENDING DECISION)

```yaml
status: PENDING — đang chờ founder chọn

candidate_options:
  A:
    vn: "Tùy chỉnh. Bằng AI."
    en: "Custom-built. AI-powered."
    rationale: Ngắn nhất, nhấn USP customization
    
  B:
    vn: "Tự động hóa & Sáng tạo. Bằng AI."
    en: "Automate & Create. With AI."
    rationale: Cover cả tech (automate) + media (create)
    
  C:
    vn: "Build. Automate. Create."
    en: "Build. Automate. Create."
    rationale: 3 verbs match 3 service tiers
    
  D:
    vn: "Giải pháp AI tùy chỉnh cho doanh nghiệp Việt."
    en: "Custom AI solutions for Vietnamese businesses."
    rationale: Dài hơn, rõ target audience

current_default: B (Automate & Create)
```

> **AGENTS**: Khi cần dùng tagline, dùng option B làm default cho đến khi founder chốt option khác.

### 5.5 Key Differentiators (USP)

1. **Custom-built, not templates** — Mỗi giải pháp được build riêng cho khách
2. **AI-native** — AI tích hợp ngay từ thiết kế đầu, không phải bolt-on
3. **Tech + Media dual capability** — Hiếm có studio cover cả 2 mảng
4. **End-to-end** — Từ ý tưởng đến vận hành, một mối duy nhất
5. **Speed advantage** — Lean execution, ship trong tuần thay vì tháng

### 5.6 Voice — đại từ xưng hô

| Context | Pronoun |
|---------|---------|
| Website công ty (sabo.com.vn) | "Chúng tôi" / "SABO M&T" / "Đội ngũ" |
| Email B2B chính thức | "Chúng tôi" |
| Personal brand founder | "Tôi" (longsang.org only) |
| Hợp đồng pháp lý | "Bên A" / "SABO Media & Technology" |

> **TUYỆT ĐỐI KHÔNG** dùng "tôi" trong context công ty. KHÔNG đặt founder làm trung tâm narrative trên sabo.com.vn.

---

## 6. SẢN PHẨM & DỊCH VỤ

### 6.1 Service Architecture (3 Tiers)

```
╔══════════════════════════════════════════════════════════════╗
║                  SABO M&T SERVICE STACK                       ║
╠══════════════════════════════════════════════════════════════╣
║                                                                ║
║   ┌──────────┐    ┌──────────────┐    ┌──────────────────┐   ║
║   │  BUILD   │    │  AUTOMATE    │    │  CREATE          │   ║
║   │  (Tech)  │    │  (Tech + AI) │    │  (Media + AI)    │   ║
║   └──────────┘    └──────────────┘    └──────────────────┘   ║
║                                                                ║
║   • Custom apps   • Workflow auto    • AI image production    ║
║   • Websites      • AI agents        • AI video production    ║
║   • Web apps      • Tools tùy chỉnh  • Content pipelines      ║
║   • Internal      • System           • Custom media systems   ║
║     tools           integration        • Brand visual assets  ║
║                                                                ║
╚══════════════════════════════════════════════════════════════╝
```

### 6.2 TIER 1: BUILD — Custom Software Development

#### 6.2.1 Custom Applications

```yaml
service_id: BUILD-1
name_vn: Ứng dụng Tùy chỉnh
name_en: Custom Applications

description_vn: |
  Xây dựng ứng dụng quản lý khách hàng, bán hàng, vận hành nội bộ 
  thiết kế riêng theo quy trình của doanh nghiệp. Không dùng template — 
  code riêng theo nhu cầu thật.

description_en: |
  Custom apps for CRM, sales, internal operations — built to your exact 
  workflow, not from templates.

platforms: [iOS, Android, Windows, macOS, Web]
tech_categories: [Mobile App, Desktop App, Cross-platform]

use_cases:
  - Customer Relationship Management (CRM)
  - Inventory & Operations Management
  - Field service apps
  - Internal portals & dashboards
  - POS systems
  - Booking & scheduling

duration: 2-6 tháng
target: SMB 20+ nhân viên muốn thoát khỏi Excel/Google Sheets
```

#### 6.2.2 Website & Web Apps

```yaml
service_id: BUILD-2
name_vn: Website & Web App
name_en: Websites & Web Applications

description_vn: |
  Landing page, website giới thiệu, web app phức tạp — giao diện đẹp, 
  hiện đại, tốc độ cao, triển khai nhanh từ đơn giản đến phức tạp.

description_en: |
  Landing pages, marketing sites, complex web apps — modern design, 
  fast performance, rapid deployment.

tech_categories: [Marketing Site, E-commerce, Web App, SaaS Platform]

use_cases:
  - Marketing websites & landing pages
  - E-commerce platforms
  - Customer self-service portals
  - SaaS web applications
  - Real-time dashboards
  - Booking & reservation systems

duration: 1-3 tháng
target: Doanh nghiệp cần online presence chuyên nghiệp
```

### 6.3 TIER 2: AUTOMATE — Workflow Automation & AI Integration

#### 6.3.1 Workflow Automation

```yaml
service_id: AUTOMATE-1
name_vn: Tự động hóa Quy trình
name_en: Workflow Automation

description_vn: |
  Tự động hóa các quy trình lặp đi lặp lại — kết nối hệ thống, đồng bộ 
  dữ liệu, loại bỏ tác vụ thủ công. Giải phóng nhân sự cho công việc 
  giá trị cao.

description_en: |
  Custom workflow automation — connect systems, sync data, eliminate 
  manual tasks. Free up your team for high-value work.

tech_categories: [Process Automation, System Integration, ETL]

use_cases:
  - Sales operations automation (lead → CRM → email)
  - HR onboarding flows
  - Finance & accounting automation
  - Data sync giữa các hệ thống
  - Report generation automation
  - Customer support routing

duration: 4-12 tuần setup + monthly optimization
target: DN có quy trình rõ nhưng vận hành thủ công
```

#### 6.3.2 AI Integration & Custom AI Agents

```yaml
service_id: AUTOMATE-2
name_vn: Tích hợp AI & Trợ lý ảo
name_en: AI Integration & Custom AI Agents

description_vn: |
  Triển khai AI agents vào các điểm chạm khách hàng và quy trình nội bộ — 
  chatbot trả lời 24/7, trợ lý AI viết nội dung, tự động phân tích dữ liệu, 
  tools AI custom cho từng nhu cầu.

description_en: |
  Deploy AI agents into customer touchpoints and internal processes — 
  24/7 chatbots, AI writing assistants, automated analytics, 
  custom AI tools for specific needs.

tech_categories: [Conversational AI, Document Intelligence, Predictive Analytics]

use_cases:
  - Customer service AI agents (chatbot 24/7)
  - Content & marketing AI assistants
  - Document intelligence (hợp đồng, hóa đơn, báo cáo)
  - Sales intelligence & lead scoring
  - Custom AI tools cho team
  - Internal knowledge bases với RAG

duration: 6-16 tuần
target: DN muốn scale operations mà không tăng headcount
```

### 6.4 TIER 3: CREATE — AI Media Production

> **Đây là mảng quan trọng phản ánh "Media" trong tên công ty.**  
> Không chỉ technology — SABO M&T cũng là media production studio.

#### 6.4.1 AI Image Production

```yaml
service_id: CREATE-1
name_vn: Sản xuất Hình ảnh AI
name_en: AI Image Production

description_vn: |
  Tạo hình ảnh AI chất lượng cao tùy chỉnh theo brand và nhu cầu của 
  khách hàng — từ product shots, marketing visuals, social content, 
  đến branded illustration. Không dùng generic AI output, mọi hình ảnh 
  đều fine-tune để match identity của brand.

description_en: |
  Custom AI-generated images tailored to brand and use case — product 
  shots, marketing visuals, social content, branded illustrations. 
  No generic AI output — every image fine-tuned to brand identity.

deliverables:
  - Branded product visuals
  - Marketing campaign imagery
  - Social media content
  - E-commerce product photography
  - Custom illustrations
  - Brand visual assets

duration: 1-4 tuần (one-off) hoặc retainer model
target: E-commerce, brand muốn rich visual content nhưng không có budget photographer
```

#### 6.4.2 AI Video Production

```yaml
service_id: CREATE-2
name_vn: Sản xuất Video AI
name_en: AI Video Production

description_vn: |
  Sản xuất video bằng AI — từ short-form social content (TikTok, Reels, 
  Shorts) đến explainer video, product demo, thậm chí YouTube long-form. 
  Bao gồm script, voice, visuals, editing — tất cả AI-powered nhưng 
  vẫn giữ chất lượng broadcast.

description_en: |
  AI-powered video production — short-form social content, explainer 
  videos, product demos, long-form YouTube content. Script, voice, 
  visuals, editing — all AI-driven, broadcast quality.

deliverables:
  - Short-form social videos (TikTok, Reels, Shorts)
  - Product explainer videos
  - YouTube long-form content
  - Internal training videos
  - Marketing campaign videos
  - Animated visualizations

duration: 1-3 tuần per project hoặc retainer model
target: Brand cần volume video content cao nhưng budget hạn chế
```

#### 6.4.3 Custom AI Media Production Pipelines (PREMIUM)

```yaml
service_id: CREATE-3
name_vn: Hệ thống Sản xuất Media AI Tự động
name_en: Custom AI Media Production Pipelines

description_vn: |
  Cao cấp nhất — xây dựng hệ thống sản xuất hình ảnh/video/content tự 
  động hoàn toàn tùy chỉnh theo nhu cầu khách hàng. Pipeline end-to-end 
  từ idea generation → script → media generation → editing → publishing. 
  Khách sở hữu toàn bộ hệ thống, vận hành liên tục mà không cần can 
  thiệp thủ công.

description_en: |
  Our premium offering — fully custom AI media production systems built 
  for your business. End-to-end pipeline from idea generation to scripted 
  content, AI media creation, editing, and auto-publishing. Client owns 
  the system and runs it continuously without manual intervention.

reference_implementation: ĐỨNG DẬY ĐI YouTube channel (case study)

deliverables:
  - Custom production pipeline architecture
  - Content idea generation system
  - Auto script writing
  - AI image/video generation integration
  - Auto editing & post-production
  - Auto publishing & scheduling
  - Analytics dashboard
  - Documentation & training

duration: 8-20 tuần build + ongoing maintenance
target: 
  - Media companies cần scale content production
  - Brand muốn own một content channel độc lập
  - Agencies muốn offer service mới cho khách
```

### 6.5 Pricing Strategy

| Setting | Value |
|---------|-------|
| **Public display** | KHÔNG show giá trên website |
| **CTA mỗi service** | "Yêu cầu báo giá" / "Request a quote" |
| **Reason** | Force lead capture, qualify trong call, tránh price-shopping |

### 6.6 Internal Pricing Reference (KHÔNG public)

```yaml
BUILD_tier:
  custom_applications:
    range: 50_000_000 - 1_000_000_000 VNĐ
  websites_webapps:
    range: 15_000_000 - 200_000_000 VNĐ

AUTOMATE_tier:
  workflow_automation:
    setup: 10_000_000 - 100_000_000 VNĐ
    monthly_retainer: 3_000_000 - 20_000_000 VNĐ
  ai_integration:
    setup: 30_000_000 - 300_000_000 VNĐ
    monthly_retainer: 5_000_000 - 30_000_000 VNĐ

CREATE_tier:
  ai_image_production:
    one_off: 5_000_000 - 50_000_000 VNĐ per project
    retainer: 10_000_000 - 50_000_000 VNĐ/tháng (volume content)
  ai_video_production:
    one_off: 10_000_000 - 200_000_000 VNĐ per project
    retainer: 30_000_000 - 100_000_000 VNĐ/tháng
  custom_pipeline_premium:
    setup: 200_000_000 - 2_000_000_000 VNĐ
    monthly_maintenance: 20_000_000 - 100_000_000 VNĐ
```

---

## 7. CASE STUDIES

> **Lưu ý**: Các sản phẩm SABO Arena, SABOHUB, VT Dream Homes... được present trên sabo.com.vn dưới dạng **Case Studies** chứng minh năng lực, KHÔNG phải sản phẩm bán cho khách.

### 7.1 Case Study: Real-time Tournament Platform (BUILD)

```yaml
project_name: SABO Arena
url: saboarena.com
service_tier: BUILD (Web App)
industry: Sports & Entertainment
status: LIVE
challenge: |
  Cộng đồng billiards Việt Nam thiếu nền tảng thống nhất để tổ chức 
  và quản lý giải đấu, dẫn đến phân mảnh và khó scale.
solution: |
  Nền tảng web real-time cho phép tạo giải, quản lý bracket, 
  livestream tích hợp, xếp hạng người chơi.
impact:
  - Real-time tournament management
  - Multi-format support (single elim, double elim, round robin)
  - Community-driven ranking system
tech_category: Real-time Web Platform / Sports Tech
```

### 7.2 Case Study: Pool Hall Operations Platform (BUILD)

```yaml
project_name: SABOHUB
service_tier: BUILD (Custom App)
status: BETA (iOS + Android)
industry: Hospitality & Sports Venues
challenge: |
  Quán bida vận hành thủ công với sổ sách, không kiểm soát được 
  tình trạng bàn, doanh thu, ca làm nhân viên.
solution: |
  App cross-platform tích hợp đặt bàn, tính giờ tự động, POS, 
  quản lý nhân viên và báo cáo doanh thu real-time.
impact:
  - 100% digital operations
  - Real-time table tracking & billing
  - Cross-platform: iOS, Android
tech_category: Mobile Operations Platform / SaaS
```

### 7.3 Case Study: Regional Real Estate Platform (BUILD + AUTOMATE)

```yaml
project_name: VT Dream Homes
url: vungtauland.store
service_tier: BUILD + AUTOMATE
industry: Real Estate / PropTech
status: LIVE
challenge: |
  Thị trường BĐS Vũng Tàu thiếu nền tảng tập trung, khách phải duyệt 
  qua nhiều nguồn không đồng nhất.
solution: |
  Nền tảng BĐS chuyên về khu vực Vũng Tàu với AI search, 
  data verified, workflow giao dịch end-to-end.
impact:
  - Regional market focus
  - AI-powered property search
  - Verified listings
tech_category: AI-powered Marketplace / PropTech
```

### 7.4 Case Study: AI Education Platform (BUILD + AUTOMATE)

```yaml
project_name: AINewbie
url: ainewbievn.shop
service_tier: BUILD + AUTOMATE
industry: EdTech / AI
status: BUILDING
challenge: |
  Người Việt muốn học AI nhưng tài liệu chất lượng đa số bằng 
  tiếng Anh, thiếu hệ thống học structured.
solution: |
  Marketplace + Academy chuyên về AI bằng tiếng Việt — kết hợp 
  khóa học, tools, và community.
impact:
  - Vietnamese-first AI education
  - Marketplace model
  - AI tools integration
tech_category: EdTech Platform / AI Marketplace
```

### 7.5 Case Study: Auto Content Production Pipeline (CREATE — flagship)

```yaml
project_name: ĐỨNG DẬY ĐI YouTube Channel
service_tier: CREATE (Premium Custom Pipeline)
status: PRODUCTION
industry: Media & Content
challenge: |
  Sản xuất video YouTube long-form chất lượng cao đều đặn yêu cầu 
  team lớn, budget cao, và thời gian dài.
solution: |
  Pipeline tự động hóa end-to-end: ý tưởng → script → voice → 
  video → editing → publish. Vận hành 24/7 bằng AI agents, 
  output video ổn định không cần can thiệp thủ công.
impact:
  - End-to-end automation
  - Long-form video output ổn định
  - Minimal human intervention
  - Reference architecture cho service CREATE-3
tech_category: Content Automation / AI Media Pipeline / Custom Production System
```

> **AGENTS**: Khi pitch service CREATE-3 (Custom AI Media Production Pipelines), reference case study này như proof-of-concept thực tế.

### 7.6 INTERNAL TOOLS (KHÔNG public, không show case study)

```yaml
internal_only:
  - Brain RAG (knowledge management)
  - Travis AI
  - TTS Engines
  - Video Factory
  - Admin Dashboard
  - 20+ AI Agent Fleet (sf-master + specialized sub-agents)

usage: Mention thoáng trong "How We Build" section nếu cần. 
       KHÔNG list tên cụ thể trong public materials.
```

---

## 8. TECH STACK & INFRASTRUCTURE

### 8.1 Frontend

```yaml
web:
  - React 19
  - TypeScript
  - Vite (build tool)
  - Next.js 14+ (cho project mới cần SSR/SEO)
  - Tailwind CSS
  - shadcn/ui (component library)
  - Framer Motion (animations)
  - next-intl (i18n)

mobile:
  - Flutter / Dart (cross-platform)
  
desktop:
  - Tauri (lightweight desktop apps)
```

### 8.2 Backend & Infrastructure

```yaml
backend:
  - Express.js + Node.js
  - Supabase (PostgreSQL + Auth + Storage + Edge Functions)

deployment:
  - Vercel (frontend, serverless)
  - Render (backend services)

automation:
  - n8n (self-hosted) — primary automation engine
  - Telegram Bot Gateway

linting_formatting:
  - Biome
```

### 8.3 AI Providers (chia theo use case)

```yaml
text_and_reasoning:
  primary: Anthropic Claude (Claude API, Claude Code, Managed Agents)
  secondary: Google Gemini, OpenAI GPT
  orchestration: LangChain

image_generation:
  - Midjourney (premium quality)
  - Flux / Stable Diffusion (custom training)
  - DALL-E 3 (specific use cases)
  - Recraft (vector + branded)

video_generation:
  - Runway ML
  - Sora (when available)
  - Kling AI
  - Luma Dream Machine
  - Pika Labs

voice_and_audio:
  - ElevenLabs (voice cloning, TTS)
  - Custom TTS engines (internal)
  - Suno / Udio (music generation)

editing_and_post:
  - Custom Python + ffmpeg pipelines
  - DaVinci Resolve (when manual touch needed)
  - Adobe (premium projects)
```

### 8.4 OS & Working Directory

```yaml
os: Windows 11
working_directory: D:\0.PROJECTS
agent_fleet_directory: D:\0.PROJECTS\.claude\agents\
fleet_state: .soloforge/fleet-state.json
agent_naming_convention: sf-* (e.g., sf-master, sf-build, sf-deploy)
```

### 8.5 Tech Partners (public-facing logos)

```yaml
display_on_website:
  - Anthropic ("Powered by Claude")
  - OpenAI ("GPT integrated")
  - Google Cloud ("Gemini AI")
  - Vercel ("Deployment partner")
  - Supabase ("Database & Backend")
  - LangChain ("AI orchestration")
  - ElevenLabs ("Voice AI")
  - Runway ML ("Video AI")

internal_only:
  - n8n
  - Make / Zapier (used in some client implementations)
  - Cloudflare
```

---

## 9. HỆ SINH THÁI DOMAIN

| Domain | Purpose | Status | Note |
|--------|---------|--------|------|
| **sabo.com.vn** | Corporate site SABO M&T | `[NOT LAUNCHED]` | Cần đăng ký VNNIC + thông báo Bộ Công Thương |
| **saboarena.com** | SABO Arena product | LIVE | Portfolio case study |
| **vungtauland.store** | VT Dream Homes | LIVE | Portfolio case study |
| **longsang.org** | Personal brand founder | LIVE | TÁCH BIỆT khỏi corporate |
| **ainewbievn.shop** | AINewbie product | BUILDING | Portfolio case study |
| **SABOHUB** (app) | Pool hall management | BETA | iOS + Android, no .com domain |

### 9.1 Quy định Domain .com.vn

```yaml
sabo_com_vn_requirements:
  - Đăng ký với VNNIC (cần GCN ĐKDN)
  - Thông báo Bộ Công Thương nếu có thương mại điện tử
  - Host nước ngoài OK (Vercel)
  - Phải có người đại diện tại VN (founder đáp ứng)
```

---

## 10. TUÂN THỦ PHÁP LÝ & THUẾ

### 10.1 Lệ phí môn bài

```yaml
year_2026: MIỄN (năm thành lập, theo NĐ 22/2020)
year_2027_onwards: 2.000.000 VNĐ/năm
deadline: 30/01 hằng năm
applicable_to: Vốn điều lệ > 10 tỷ → 3tr/năm. SABO 1 tỷ → 2tr/năm
```

### 10.2 Thuế GTGT (VAT)

```yaml
method: Khấu trừ (đã đăng ký mẫu 01/ĐK-TCT)
filing_frequency: Quý
rate_default: 10%
rate_software_export: 0% (nếu xuất khẩu phần mềm)
exempt: Một số dịch vụ giáo dục (mã 8559 nếu đăng ký)
```

### 10.3 Thuế TNDN (Corporate Income Tax)

#### Default rate
```yaml
standard_rate: 20%
filing_frequency: Tạm nộp quý + Quyết toán năm
deadline_quarterly: ngày 30 tháng đầu quý sau
deadline_annual: 31/03 năm sau
```

#### Ưu đãi DN sản xuất phần mềm (PRIORITY HIGH)

```yaml
benefits:
  preferential_rate: 10% (thay vì 20%) trong 15 năm
  exemption: 100% miễn thuế trong 4 năm đầu có thu nhập chịu thuế
  reduction: 50% giảm trong 9 năm tiếp theo
  total_benefit_period: 13 năm

requirements:
  - Mã ngành 6201 (BẮT BUỘC theo Luật TNDN 2025) — CHƯA CÓ, cần bổ sung
  - Đăng ký hoạt động sản xuất phần mềm với cơ quan thuế
  - Chứng minh thực hiện ít nhất 1 trong 2 công đoạn: 
    - Xác định yêu cầu
    - Phân tích và thiết kế
  - Hạch toán doanh thu sản xuất PM tách biệt với hoạt động khác
  - Tài liệu chứng minh đầy đủ 7 công đoạn (theo TT 13/2020/TT-BTTTT)

estimated_4_year_savings: ~1 tỷ VNĐ (tùy doanh thu thực tế)

note_for_media_revenue: |
  Doanh thu từ Media Production (CREATE tier) KHÔNG qualify ưu đãi 
  thuế phần mềm. Phải hạch toán RIÊNG BIỆT:
  - Doanh thu sản xuất phần mềm (BUILD + AUTOMATE) → ưu đãi
  - Doanh thu media production (CREATE) → thuế suất 20% bình thường
```

### 10.4 Thuế TNCN (Personal Income Tax)

```yaml
founder_pay_strategy:
  preferred: Hybrid model
  details:
    - HĐLĐ với lương cơ bản (10-15tr/tháng) → đóng BHXH base
    - Phần còn lại nhận qua chia cổ tức (MIỄN thuế TNCN)
  reason: Tối ưu thuế, vẫn có safety net BHXH

dividends_to_owner:
  rate: 0% (miễn thuế TNCN khi cá nhân nhận từ công ty mình làm chủ)
  source: Điểm c khoản 3 Điều 2 Luật TNCN
```

### 10.5 BHXH/BHYT/BHTN

```yaml
ke_toan_truong (Võ Ngọc Diễm):
  status: Bắt buộc đóng (đã có HĐLĐ)
  rate: 32% trên lương (21.5% DN + 10.5% NLĐ)
  
founder (Võ Long Sang):
  current_status: Chưa ký HĐLĐ với công ty → KHÔNG bắt buộc BHXH
  future: Cân nhắc ký HĐLĐ với lương cơ bản để tham gia BHXH (hybrid strategy)
```

### 10.6 Hóa đơn điện tử (mandatory)

```yaml
provider: MISA meInvoice (đề xuất)
basis: NĐ 123/2020 + TT 78/2021 (BẮT BUỘC)
rules:
  - Giao dịch ≥ 200k VNĐ → xuất hóa đơn riêng
  - Giao dịch < 200k → gộp cuối ngày 1 hóa đơn tổng
  - Xuất ngay khi giao dịch hoàn tất, không chờ khách yêu cầu
  - Phạt đến 20tr nếu không xuất khi thanh tra phát hiện
```

### 10.7 Quy định thanh toán

```yaml
cash_payment_limit: 20.000.000 VNĐ
rule: Hóa đơn ≥ 20tr BẮT BUỘC chuyển khoản (không tiền mặt)
penalty: Loại khỏi chi phí được trừ thuế TNDN nếu vi phạm
```

### 10.8 Sở hữu trí tuệ (SHTT)

```yaml
priority_high:
  trademark_registration:
    targets: [SABO, SABO Arena, SABOHUB, SABO Media & Technology]
    cost: ~1-1.5tr VNĐ/nhãn/nhóm
    timeline: 18-24 tháng để có giấy
    portal: ipvietnam.gov.vn

priority_medium:
  software_copyright:
    targets: All SABO products (SABO Arena, SABOHUB, etc.)
    cost: ~1-2tr VNĐ/sản phẩm
    purpose: Evidence cho ưu đãi thuế DN sản xuất PM (công đoạn 5)
    issuer: Cục Bản quyền Tác giả
```

### 10.9 Bảo vệ dữ liệu cá nhân (NĐ 13/2023 PDPD)

```yaml
status: REQUIRED
applies_to: Mọi sản phẩm thu thập data user
requirements:
  - Privacy Policy công khai
  - Thông báo + sự đồng ý khi thu thập data
  - Hồ sơ đánh giá tác động (DPIA) gửi Bộ Công An
  - Quyền của chủ thể dữ liệu (xóa, sửa, rút lại đồng ý)
risk_level: HIGH (chưa compliance)
priority: Implement trước khi scale user base
```

---

## 11. HỒ SƠ NỘI BỘ & COMPLIANCE

### 11.1 Hồ sơ ĐÃ CÓ

- ✅ GCN Đăng ký Doanh nghiệp (cấp 25/03/2026)
- ✅ Điều lệ công ty (5 chương, 25 điều, ngày 13/03/2026)
- ✅ Quyết định bổ nhiệm Kế toán trưởng (01/2026/QĐ-HĐTV, ngày 16/04/2026)

### 11.2 Hồ sơ ĐANG THIẾU (PRIORITY HIGH)

```yaml
must_have_30_days:
  - Con dấu công ty + treo biển trụ sở
  - Tài khoản ngân hàng: MSB | STK: 49666888 | CTK: CONG TY TNHH SABO MEDIA & TECHNOLOGY ✅
  - Chữ ký số (Token) — Viettel-CA / VNPT-CA
  - Hóa đơn điện tử — MISA meInvoice
  - Tài khoản thuế điện tử (thuedientu.gdt.gov.vn)
  - HĐLĐ với Kế toán trưởng (Võ Ngọc Diễm)
  - Hồ sơ BHXH cho Kế toán trưởng
  - Thang bảng lương (đăng ký Phòng LĐTBXH quận)

must_have_3_months:
  - Hồ sơ đăng ký ưu đãi thuế DN phần mềm
  - Bổ sung mã ngành 6201
  - Nội quy lao động (nếu ≥10 NLĐ)
  - Quy chế lương thưởng
  - Quy chế công tác phí
  - Quy chế bảo mật thông tin

should_have_6_months:
  - ToS + Privacy Policy cho từng sản phẩm
  - Hồ sơ DPIA (NĐ 13/2023)
  - Đăng ký nhãn hiệu SHTT
  - Quy chế PCCC
```

### 11.3 Khai thuế Timeline 2026

| Kỳ | Deadline | Nội dung |
|----|----------|----------|
| Q2/2026 | 31/07/2026 | Tờ khai VAT quý |
| Q3/2026 | 31/10/2026 | VAT + tạm nộp TNDN |
| Q4/2026 | 31/01/2027 | VAT + tạm nộp TNDN + lệ phí môn bài 2027 |
| Cả năm 2026 | 31/03/2027 | Quyết toán TNDN + BCTC + hồ sơ ưu đãi |

---

## 12. VOICE, TONE & BOUNDARIES

### 12.1 Tone of Voice (Corporate)

```yaml
sabo_corporate_voice:
  attributes: [Professional, Confident, Outcomes-focused, Premium-but-approachable, Creative]
  avoid: [Casual, Self-deprecating, Founder-centric, Cute, Buzzword-heavy]
  
  good_examples:
    - "SABO M&T xây dựng giải pháp tùy chỉnh cho từng nhu cầu cụ thể."
    - "Mỗi dự án được thiết kế riêng — không phải template lắp ghép."
    - "Chúng tôi vừa làm tech, vừa làm media — bằng AI."
  
  bad_examples:
    - "Tôi sẽ giúp bạn..." (founder-centric)
    - "Mình hỗ trợ siêu nhiệt tình" (quá casual)
    - "Built by 1 founder + 20 AI agents" (ổn cho personal brand, KHÔNG OK cho corporate)
    - "AI-powered everything" (buzzword)
    - "Đo lường được ROI rõ ràng" (claim cần evidence chưa có)
```

### 12.2 Personal Brand vs Corporate Brand

| Aspect | longsang.org (personal) | sabo.com.vn (corporate) |
|--------|-------------------------|--------------------------|
| Pronoun | "Tôi" | "Chúng tôi" / "SABO M&T" |
| Hero greeting | "Chào bạn 👋" | Formal positioning statement |
| Founder visibility | Front-and-center | Hidden / About page only |
| Solo founder narrative | USP, show prominently | KHÔNG show |
| CTA style | "Liên hệ tư vấn" | "Yêu cầu báo giá" / "Đặt lịch" |
| Pricing | Có thể show ranges | Quote-based, không show |
| Audience | Individual freelancers, small biz | SMB 20+ employees, enterprise |

### 12.3 Cấm nói (HARD RULES cho corporate communications)

❌ KHÔNG dùng những phát biểu sau khi nói nhân danh SABO M&T:
- "Tôi làm một mình"
- "Solo founder"
- "Không có team"
- "1 person company"
- "Just me + AI"
- Tên specific tech tools internal (n8n, sf-master, fleet agents)
- Số doanh thu/khách thật nếu dưới mức impressive
- Internal projects names (Brain RAG, Travis AI, Video Factory)
- Claim "đo lường được ROI" KHI CHƯA có case study với data thật

### 12.4 Được nói (CAN SAY)

✅ Phát biểu OK cho corporate:
- "Đội ngũ chuyên gia của SABO M&T..."
- "Chúng tôi sử dụng các nền tảng công nghệ hàng đầu..."
- "Studio chuyên sâu về Custom AI Solutions..."
- "Mỗi giải pháp tùy chỉnh riêng theo nhu cầu khách hàng..."
- "Sản phẩm media chất lượng cao bằng AI..."

---

## 13. AGENT OPERATING GUIDELINES

### 13.1 Khi cần thông tin pháp lý

```yaml
rule: ALWAYS reference này document, KHÔNG generate độc lập

if_info_missing:
  - Đánh dấu [NEEDS_VERIFICATION] hoặc [TBD]
  - Hỏi human (Long Sang) trước khi sử dụng
  - KHÔNG fabricate (số MST, ngày tháng, người tên)

if_info_outdated:
  - Check last_updated date của file này
  - Nếu > 3 tháng cũ, flag và yêu cầu update
```

### 13.2 Khi tạo content marketing

```yaml
checklist:
  - ✅ Dùng "Chúng tôi" / "SABO M&T", không "tôi"
  - ✅ Positioning: Custom AI Solutions Studio
  - ✅ Cover cả 2 mảng: Technology + Media (đừng quên Media)
  - ✅ Reference 3 service tiers: BUILD / AUTOMATE / CREATE
  - ✅ Case studies dùng format chuẩn (Industry / Challenge / Solution / Impact)
  - ❌ KHÔNG show founder hero
  - ❌ KHÔNG dùng buzzword "AI agents fleet"
  - ❌ KHÔNG tiết lộ internal tools
  - ❌ KHÔNG claim "đo lường được ROI" nếu chưa có data thật
```

### 13.3 Khi tạo hợp đồng / văn bản pháp lý

```yaml
checklist:
  - ✅ Tên đầy đủ: CÔNG TY TNHH SABO MEDIA & TECHNOLOGY
  - ✅ Người đại diện: Võ Long Sang — Giám đốc
  - ✅ MST: 3502578142
  - ✅ Trụ sở: 342/9 Nguyễn An Ninh, P. Tam Thắng, TP HCM
  - ✅ Vốn điều lệ: 1.000.000.000 VNĐ
  - ✅ Email: contact@sabo.com.vn
  - ✅ Phone: 0798893333
  - ✅ Lưu hồ sơ vào "Legal Vault" Notion database
```

### 13.4 Khi xuất hóa đơn

```yaml
required_fields:
  seller:
    name: CÔNG TY TNHH SABO MEDIA & TECHNOLOGY
    tax_code: 3502578142
    address: 342/9 Nguyễn An Ninh, P. Tam Thắng, TP HCM
  
  buyer:
    name: [Khách hàng]
    tax_code: [MST khách - bắt buộc với B2B]
    address: [Địa chỉ khách]
  
  service:
    description: [Mô tả rõ dịch vụ - matching với mã ngành đã đăng ký]
    quantity: [Số lượng]
    unit_price: [Đơn giá]
    vat_rate: 10% (default cho most services)
    
  signature: Chữ ký số (token Viettel-CA / VNPT-CA)

revenue_segregation:
  - Doanh thu BUILD (custom apps, web) → mã 6211, 6219 → ưu đãi PM
  - Doanh thu AUTOMATE (workflow, AI integration) → mã 6219, 6290 → ưu đãi PM
  - Doanh thu CREATE Image (AI image production) → mã 7420, 7410 → 20%
  - Doanh thu CREATE Video (AI video production) → mã 5911, 5912 → 20%
  - Doanh thu CREATE Pipeline (custom system) → mã 6219 → ưu đãi PM (system delivery)
```

### 13.5 Khi code / tạo sản phẩm

```yaml
default_stack:
  frontend: React 19 + TypeScript + Vite + Tailwind + shadcn/ui
  backend: Express.js + Node.js + Supabase
  mobile: Flutter / Dart
  ai: Claude (primary), Gemini (secondary), OpenAI (fallback)
  automation: n8n (self-hosted)
  linting: Biome
  deployment: Vercel (frontend), Render (backend)

media_production_stack:
  image: Midjourney + Flux + Recraft
  video: Runway ML + Kling + Luma
  voice: ElevenLabs + Custom TTS
  pipeline: n8n + Python + ffmpeg + custom scripts

working_directory: D:\0.PROJECTS

agent_coordination:
  - Check AGENT_TASK_REGISTRY.yaml trước khi start task mới
  - Update fleet-state.json sau khi complete
  - Use sf-* naming convention cho agents mới
```

### 13.6 Privacy & Security

```yaml
never_expose:
  - Số định danh cá nhân founder (068096011511)
  - Số định danh cá nhân kế toán trưởng (068303007384)
  - Địa chỉ thường trú cá nhân (Lâm Đồng)
  - Email cá nhân founder (longsangsabo@gmail.com)
  - Phone trên giấy tờ pháp lý (0965746795) — chỉ dùng nội bộ
  - Internal repository structure (D:\0.PROJECTS path)
  - Internal agent names (sf-master, Brain RAG, etc.)
  - API keys, tokens, credentials (BAO GIỜ)

can_expose_publicly:
  - Tên công ty đầy đủ
  - MST: 3502578142
  - Trụ sở chính (TP HCM)
  - Tên founder + chức danh ("Võ Long Sang - Founder & CEO")
  - Email công ty: contact@sabo.com.vn
  - Phone công ty: 0798893333
  - Các domain công ty (sabo.com.vn, saboarena.com, etc.)
```

---

## 14. DOCUMENT VERSION CONTROL

### 14.1 Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-04-29 | Initial master reference document | Võ Long Sang + Claude |
| 1.1 | 2026-04-29 | Confirmed legal info; removed Brand & Identity section; refactored services to include CREATE tier (AI Media Production); fixed mission statement; tagline pending decision | Võ Long Sang + Claude |

### 14.2 Update Triggers

Document này phải được update khi:
- ✏️ Thay đổi GCN ĐKDN (vốn, ngành nghề, địa chỉ, người đại diện)
- ✏️ Sửa đổi điều lệ công ty
- ✏️ Bổ nhiệm/miễn nhiệm nhân sự cấp cao
- ✏️ Thay đổi positioning / tagline / brand identity
- ✏️ Add/remove sản phẩm trong portfolio
- ✏️ Thay đổi tech stack chính
- ✏️ Update trong quy định thuế / pháp lý ảnh hưởng đến công ty
- ✏️ Hoàn thành các milestones quan trọng (đăng ký SHTT, ưu đãi thuế, etc.)

### 14.3 Source Documents Reference

```yaml
source_documents:
  certificate_of_business_registration:
    filename: Certificate.pdf
    issued_by: Sở Tài chính TP HCM - Phòng Đăng ký Kinh doanh
    issue_date: 2026-03-25
  
  company_charter:
    filename: ĐieuLe_CongTy.pdf
    chapters: 5
    articles: 25
    effective_date: 2026-03-13
    location: Tp Hồ Chí Minh
  
  chief_accountant_appointment:
    filename: ke_toan.pdf
    decision_number: 01/2026/QĐ-HĐTV
    date: 2026-04-16
```

### 14.4 Trường thông tin còn cần Founder Decision

```yaml
pending_decisions:
  - [ ] Chốt tagline (chọn A/B/C/D ở section 5.4 hoặc đề xuất khác)
  - [ ] Logo SABO M&T file (corporate, không dùng "LS" của longsang.org)
  - [ ] Calendly link cho company
  - [ ] Photo founder professional cho About page
  - [ ] LinkedIn URL (personal + company page)
  - [ ] GitHub username public của company
  - [ ] Quyết định cuối về vốn điều lệ (hybrid hay 100% tiền)
  - [ ] Chốt thẩm định viên cho IP nếu góp tài sản

separate_brand_identity_doc:
  status: PENDING (sẽ tạo riêng khi cần)
  scope: Logo specs, color palette, typography rules, visual guidelines
```

---

## APPENDIX A: Quick Reference Card

```
╔═══════════════════════════════════════════════════════════╗
║              SABO M&T QUICK REFERENCE                      ║
╠═══════════════════════════════════════════════════════════╣
║  Tên: CÔNG TY TNHH SABO MEDIA & TECHNOLOGY                ║
║  MST: 3502578142                                           ║
║  Loại: TNHH 1 TV                                           ║
║  Vốn: 1.000.000.000 VNĐ                                   ║
║  Cấp ngày: 25/03/2026                                      ║
║                                                            ║
║  Trụ sở:                                                   ║
║    342/9 Nguyễn An Ninh                                   ║
║    P. Tam Thắng, TP HCM                                   ║
║                                                            ║
║  Liên hệ:                                                  ║
║    contact@sabo.com.vn                                    ║
║    0798893333                                              ║
║                                                            ║
║  Người đại diện:                                          ║
║    Võ Long Sang                                            ║
║    Chủ sở hữu / Chủ tịch / Giám đốc                       ║
║                                                            ║
║  Kế toán trưởng:                                          ║
║    Võ Ngọc Diễm (từ 16/04/2026)                          ║
║                                                            ║
║  Positioning:                                              ║
║    Custom AI Solutions Studio                              ║
║                                                            ║
║  Service Tiers:                                            ║
║    BUILD (Tech) / AUTOMATE (Tech+AI) / CREATE (Media+AI)   ║
║                                                            ║
║  Domain corporate: sabo.com.vn                             ║
╚═══════════════════════════════════════════════════════════╝
```

---

## APPENDIX B: How Agents Should Use This Document

### Pull-mode (Reference)

```python
# Pseudo-code cho agent loading reference
def load_sabo_context():
    return read_file("/path/to/SABO_MASTER_REFERENCE.md")

# Mọi agent task liên quan SABO M&T phải prepend context này
```

### Update-mode (Modification)

```yaml
when_to_update:
  - Thay đổi pháp lý quan trọng
  - Pivot positioning
  - Add/remove dịch vụ chính
  - Hoàn thành milestone

how_to_update:
  - Edit file này
  - Bump version trong frontmatter
  - Add entry vào Version History
  - Notify Long Sang để review
  - Distribute updated version cho agent fleet
```

### Validation

Trước khi agent emit content có thông tin SABO M&T, validate:

1. ✅ Thông tin có trong document này không?
2. ✅ Nếu có, version mới nhất chưa?
3. ✅ Nếu không có, đã hỏi human chưa?
4. ✅ Có phải thông tin được phép expose public không (xem 13.6)?
5. ✅ Tone of voice đúng context (corporate vs personal) chưa?
6. ✅ Cover đầy đủ Tech + Media nếu liên quan business overview?

---

**END OF MASTER REFERENCE v1.1**

> *Tài liệu này được duy trì bởi Võ Long Sang (Founder & CEO).  
> Mọi thay đổi phải được approve trước khi propagate cho agent fleet.  
> Last reviewed: 2026-04-29*
