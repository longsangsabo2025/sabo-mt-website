# Showcase JSON Spec — sabo-mt-website Integration

> **Gửi:** Agent phụ trách project **SaboHub**
> **Từ:** sabo-mt-website agent
> **Mục đích:** Để `sabo.com.vn` tự động hiển thị thông tin chính xác và cập nhật từ project của bạn.

---

## Tại sao cần file này?

`sabo.com.vn` fetch trực tiếp từ `https://<your-domain>/showcase.json` — không qua trung gian. Khi bạn update file này và deploy, trang chủ tự đồng bộ trong vòng 1 giờ (hoặc ngay lập tức nếu gọi webhook bên dưới).

---

## Bước 1 — Tạo `public/showcase.json`

Đặt file tại `public/showcase.json` trong repo của bạn. URL sẽ là `https://<your-domain>/showcase.json`.

Thay toàn bộ `[...]` bằng thông tin thực tế:

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
  "production_url": "https://sabo.com.vn",
  "github_url": null,

  "hero_title": "Quản lý toàn diện từ CEO đến vận hành thực địa",
  "hero_description": "SaboHub thống nhất 3 mô hình kinh doanh (phân phối B2B, giải trí F&B, sản xuất) trên 2 platform: web app (React) tại sabo.com.vn và mobile app (Flutter) cho iOS/Android. Phân quyền 9 vai trò — mỗi user sau khi đăng nhập được điều hướng tự động đến giao diện đúng với vai trò.",
  "hero_stats": [
    { "label": "ROLES", "value": "9 vai trò" },
    { "label": "BUSINESS TYPES", "value": "7 loại hình" },
    { "label": "PLATFORM", "value": "Web + Mobile" }
  ],

  "overview_description": "Doanh nghiệp đa ngành gặp khó khăn khi phải dùng nhiều phần mềm riêng lẻ cho từng mảng — phân phối dùng Excel, F&B dùng POS riêng, sản xuất quản lý thủ công. SaboHub thay thế toàn bộ bằng một nền tảng duy nhất: web app React tại sabo.com.vn và mobile app Flutter (iOS/Android). Hệ thống phân quyền 9 vai trò (superAdmin, CEO, manager, shiftLeader, staff, driver, warehouse, finance, shareholder) điều hướng từng user về giao diện phù hợp sau khi đăng nhập. Backend là Supabase Postgres với PostgREST — mọi query đều qua RLS. Hiện đang live với 3 business type: distribution (B2B Odori), service (billiards/restaurant/café/hotel/retail), manufacturing. CEO có thể quản lý nhiều công ty cùng lúc trên một tài khoản.",

  "objectives": [
    "Thay thế Excel + POS rời rạc bằng một nền tảng thống nhất cho doanh nghiệp đa ngành",
    "Phân quyền chi tiết theo vai trò — mỗi role thấy đúng giao diện và data mình cần",
    "Hỗ trợ cả web (React) và mobile (Flutter iOS/Android) từ cùng một Supabase backend"
  ],

  "impacts": [
    "Driver xác nhận giao hàng và ghi nhận thanh toán (tiền mặt/chuyển khoản/công nợ) trực tiếp trên app — không cần gọi về văn phòng",
    "Sales tạo đơn hàng B2B tại hiện trường, warehouse nhận picking list realtime",
    "CEO theo dõi dashboard đa công ty, xem P&L, duyệt công nợ — không cần hỏi từng quản lý"
  ],

  "features": [
    {
      "title": "Distribution (B2B Odori)",
      "points": [
        "Tạo đơn hàng B2B tại hiện trường, chiết khấu linh hoạt theo khách hàng",
        "Warehouse: picking list, packing, xác nhận xuất kho",
        "Driver: route giao hàng, xác nhận từng điểm dừng, ghi nhận thanh toán cash/transfer/debt",
        "Finance: xác nhận chuyển khoản, quản lý công nợ aging analysis, tạo receivable thủ công"
      ]
    },
    {
      "title": "F&B & Entertainment (Service)",
      "points": [
        "Quản lý session bàn (billiards, café, nhà hàng) — tính giờ, gộp bill, thanh toán",
        "Menu CRUD, import cashflow hàng ngày, P&L tháng",
        "Đặt bàn (reservation), quản lý ca làm việc (shift scheduling)",
        "OCR scan hóa đơn nhập hàng"
      ]
    },
    {
      "title": "Manufacturing",
      "points": [
        "BOM (Bill of Materials), quản lý nguyên vật liệu và nhà cung cấp",
        "Lệnh sản xuất và lệnh mua hàng",
        "Kiểm tra chất lượng (QC) và quản lý công nợ phải trả"
      ]
    },
    {
      "title": "CEO & AI",
      "points": [
        "Dashboard đa công ty, scorecard hiệu suất, báo cáo PDF",
        "Travis AI — assistant tích hợp Gemini, chat theo ngữ cảnh công ty",
        "Quản lý AI agents, prompts, projects"
      ]
    },
    {
      "title": "Gamification & Token",
      "points": [
        "Quest hub, leaderboard, season pass, UyTin store",
        "SABO Token — ví blockchain, token store, achievements (Base Sepolia)"
      ]
    }
  ],

  "metrics": [
    { "label": "Dart files", "value": "559 files" },
    { "label": "Business roles", "value": "9" },
    { "label": "Business types", "value": "7" },
    { "label": "Flutter version", "value": "3.5+" }
  ],

  "tech_stack": [
    "React 18.3 + TypeScript (Web)",
    "Vite 6.x",
    "Flutter 3.5 + Dart 3.5 (Mobile iOS/Android)",
    "Supabase 2.x (Postgres + PostgREST + Realtime + Storage)",
    "TanStack Query 5",
    "Radix UI + shadcn/ui",
    "Tailwind CSS",
    "Riverpod 3.x (Flutter state)",
    "GoRouter 14.x",
    "Framer Motion",
    "Leaflet + flutter_map",
    "Sentry 10 (Web) + Sentry Flutter",
    "Firebase Messaging",
    "Gemini AI (Travis assistant)",
    "Base Sepolia (SABO Token)"
  ],

  "performance": [
    { "label": "Flutter analyze", "value": "0 errors" },
    { "label": "Auth", "value": "employee_login RPC — không dùng Supabase auth trực tiếp" }
  ],

  "infrastructure": [
    { "label": "Database", "value": "Supabase Postgres (ap-southeast-2, Sydney)" },
    { "label": "Web Hosting", "value": "Vercel" },
    { "label": "Mobile", "value": "Flutter build iOS + Android" },
    { "label": "Error Tracking", "value": "Sentry" },
    { "label": "Push Notifications", "value": "Firebase Messaging" }
  ],

  "industry": "Hospitality & Services",
  "industry_slug": "hospitality",
  "is_featured": true,
  "display_order": 2
}
```

> **Lưu ý cho sabo-mt-website team**: Bảng slug đang ghi endpoint `https://sabohub.vercel.app/showcase.json` — cần cập nhật thành `https://sabo.com.vn/showcase.json`.

---

## Bước 2 — Gọi webhook sau mỗi deploy

```
POST https://sabo.com.vn/api/revalidate
Content-Type: application/json

{
  "secret": "a2f8ed63c39c48813117b1977077a3eef5d38a9060a731dd207e1ed0a2c684c3",
  "tag": "showcase"
}
```

Hoặc thêm vào deploy script:

```js
// Thêm vào cuối vercel-post-deploy.js (chạy sau vercel --prod)
await fetch('https://sabo.com.vn/api/revalidate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    secret: process.env.SABO_MT_REVALIDATE_SECRET,
    tag: 'showcase',
  }),
});
```

Lưu `SABO_MT_REVALIDATE_SECRET` = `a2f8ed63c39c48813117b1977077a3eef5d38a9060a731dd207e1ed0a2c684c3` vào Vercel env của project.

---

## Slug đã đăng ký

| Project | Slug | Endpoint expected |
|---------|------|-------------------|
| SABO Arena | `sabo-arena` | `https://saboarena.com/showcase.json` |
| SaboHub | `sabohub` | `https://sabohub.vercel.app/showcase.json` |
| Vũng Tàu Land | `vungtauland` | `https://vungtauland.vercel.app/showcase.json` |
| AINewbieVN | `ainewbievn` | `https://ainewbievn.shop/showcase.json` |

---

## Rules

| Rule | Chi tiết |
|------|----------|
| **No superlatives** | Không dùng "số 1", "tốt nhất", "duy nhất" — chỉ dùng fact |
| **Số liệu thực tế** | `null` thay vì bịa con số — `null` sẽ bị ẩn tự động trên UI |
| **Version chính xác** | `tech_stack` ghi đúng version production |
| **`updatedAt`** | Update mỗi lần push, format `YYYY-MM-DD` |
| **UTF-8** | Valid JSON, UTF-8, không BOM |

---

## Verify

```bash
curl https://<your-domain>/showcase.json | python -m json.tool
```

Trả về JSON valid → gọi webhook → check `https://sabo.com.vn/case-studies/<slug>`.

---

*Xem ví dụ đã hoàn chỉnh trong `showcase-specs/` folder.*
