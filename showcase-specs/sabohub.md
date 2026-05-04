# Showcase Spec — SaboHub ✅ CONFIRMED

> **Slug:** `sabohub`
> **Endpoint:** `https://hub.sabo.com.vn/showcase.json`
> **Status:** Data confirmed by SaboHub agent — 2026-04-30
> **Snapshot:** Updated in `src/content/showcase-snapshot.json`

---

## public/showcase.json

```json
{
  "_meta": {
    "version": "1.0",
    "slug": "sabohub",
    "updatedAt": "2026-04-30"
  },
  "slug": "sabohub",
  "name": "SaboHub",
  "description": "Nền tảng quản lý doanh nghiệp đa ngành — phân phối B2B, giải trí F&B, sản xuất. Web app + mobile app (iOS/Android), phân quyền 9 vai trò.",
  "category": "Business Management Platform",
  "status": "live",
  "progress": 75,
  "production_url": "https://hub.sabo.com.vn",
  "github_url": null,

  "hero_title": "Quản lý toàn diện từ CEO đến vận hành thực địa",
  "hero_description": "SaboHub thống nhất 3 mô hình kinh doanh (phân phối B2B, giải trí F&B, sản xuất) trên 2 platform: web app (React) tại hub.sabo.com.vn và mobile app (Flutter) cho iOS/Android. Phân quyền 9 vai trò — mỗi user sau khi đăng nhập được điều hướng tự động đến giao diện đúng với vai trò. Sắp tích hợp SSO vào sabo.com.vn.",
  "hero_stats": [
    { "label": "ROLES", "value": "9 vai trò" },
    { "label": "BUSINESS TYPES", "value": "7 loại hình" },
    { "label": "PLATFORM", "value": "Web + Mobile" }
  ],

  "overview_description": "Nhiều doanh nghiệp phải vận hành 3-4 phần mềm riêng biệt cho phân phối, F&B và sản xuất — dữ liệu phân tán, quy trình không nhất quán. SaboHub giải quyết bằng 2 platform dùng chung 1 backend Supabase: web app (React) tại hub.sabo.com.vn cho PC và mobile app (Flutter) trên iOS/Android cho staff ngoài thực địa. User đăng nhập bằng tài khoản công ty → hệ thống tự động điều hướng đến giao diện đúng vai trò: CEO thấy dashboard đa công ty, Manager thấy orders và tồn kho, Driver thấy danh sách giao hàng hôm nay, Finance thấy công nợ aging. Dữ liệu giữa các công ty được cách ly hoàn toàn qua Row-Level Security ở tầng database. Roadmap: tích hợp SSO vào sabo.com.vn.",

  "objectives": [
    "Thống nhất quản lý 3 mô hình kinh doanh (phân phối B2B, giải trí F&B, sản xuất) trên một nền tảng duy nhất, cách ly dữ liệu đa công ty qua Row-Level Security.",
    "Xây dựng hệ thống phân quyền role-based linh hoạt cho 9 vai trò, mỗi vai trò có giao diện và quyền truy cập riêng biệt, không cần training phức tạp.",
    "Tích hợp AI assistant (Gemini), gamification quest/leaderboard, và SABO Token blockchain để tạo hệ thống engagement và reward nội bộ có thể đo lường."
  ],

  "impacts": [
    "Một hệ thống thay thế hoàn toàn các phần mềm rời rạc: order management, delivery tracking, inventory, F&B session, receivables aging đều trong cùng một nền tảng.",
    "Driver flow hoàn chỉnh end-to-end: từ packing (warehouse) → giao hàng GPS → xác nhận thanh toán → tự động cập nhật công nợ khách hàng.",
    "CEO quản lý nhiều công ty cùng lúc trên một giao diện duy nhất, dữ liệu mỗi công ty hoàn toàn cách ly."
  ],

  "features": [
    {
      "title": "Distribution Management",
      "points": [
        "B2B sales orders với discount, approval flow và delivery status tracking",
        "Customer management: credit limit, công nợ aging (current/1-30/31-60/61-90/90+), GPS, tier (bronze/silver/gold/diamond)",
        "GPS-based journey planning cho sales: lộ trình tối ưu, check-in khách hàng, visit activity",
        "Driver portal: danh sách giao hàng, xác nhận thanh toán (cash/transfer/debt), tự động cập nhật công nợ",
        "Receivables management: aging analysis, ghi nhận thanh toán, write-off"
      ]
    },
    {
      "title": "Entertainment & F&B",
      "points": [
        "Table session management cho billiards/restaurant/hotel/cafe: start/pause/end, tính tiền theo giờ",
        "Menu management CRUD, reservation/booking system, shift scheduling",
        "Daily cashflow import, monthly P&L tracking, OCR invoice scanning",
        "Staff daily reports, shift leader review, manager approval workflow"
      ]
    },
    {
      "title": "Manufacturing",
      "points": [
        "Bill of Materials (BOM), production orders, material tracking",
        "Quality inspection (QC) với workflow approve/reject",
        "Supplier management, purchase orders, payables tracking"
      ]
    },
    {
      "title": "AI & CEO Analytics",
      "points": [
        "AI assistant (Gemini-powered) — company AI riêng cho từng doanh nghiệp",
        "CEO multi-company dashboard: revenue, KPI, attendance, analytics cross-company",
        "PDF report generation, KanBan task board, commission rules"
      ]
    },
    {
      "title": "Gamification & SABO Token",
      "points": [
        "Quest system: daily/weekly quests, XP rewards, season pass, leaderboard",
        "UyTin store — internal reward shop cho nhân viên",
        "SABO Token wallet trên Base Sepolia: earn, spend, transfer, NFT achievements"
      ]
    }
  ],

  "metrics": [
    { "label": "Business Roles", "value": "9 vai trò" },
    { "label": "Business Types", "value": "7 loại hình" },
    { "label": "Monthly Active Users", "value": null }
  ],

  "tech_stack": [
    "React 18.3 + TypeScript + Vite (Web)",
    "Flutter 3.5 + Dart 3.5 (Mobile iOS/Android)",
    "Supabase 2.x (PostgreSQL + Auth + Storage + Realtime)",
    "TanStack Query 5",
    "Radix UI + shadcn/ui + Tailwind CSS",
    "Riverpod 3.x (Flutter state management)",
    "Framer Motion",
    "Leaflet + flutter_map (OpenStreetMap)",
    "Sentry (Web + Mobile)",
    "Gemini AI",
    "Base Sepolia (SABO Token blockchain)"
  ],

  "performance": [
    { "label": "Web", "value": "hub.sabo.com.vn (Vercel CDN)" },
    { "label": "Mobile", "value": "iOS + Android (Flutter)" }
  ],

  "infrastructure": [
    { "label": "Database", "value": "Supabase PostgreSQL (ap-southeast-2)" },
    { "label": "Auth", "value": "Custom RPC employee_login + Supabase Auth (CEO)" },
    { "label": "Hosting", "value": "Vercel" },
    { "label": "Error Tracking", "value": "Sentry" },
    { "label": "Push Notifications", "value": "Firebase Cloud Messaging" },
    { "label": "Blockchain", "value": "Base Sepolia Testnet — 4 contracts" }
  ],

  "industry": "Hospitality & Services",
  "industry_slug": "hospitality",
  "is_featured": true,
  "display_order": 2
}
```
