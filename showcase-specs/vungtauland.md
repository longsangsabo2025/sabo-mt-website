# Showcase Spec — Vũng Tàu Land ⚠️ NEEDS AGENT VERIFICATION

> **Slug:** `vungtauland`
> **Endpoint:** `https://vungtauland.vercel.app/showcase.json`
> **Status:** Placeholder data từ forge migrations — chờ vungtauland agent verify và fill
> **Snapshot:** `src/content/showcase-snapshot.json` — đang dùng data này làm fallback

---

## ⚠️ Hướng dẫn cho vungtauland agent

Các field có `null` hoặc số liệu nghi ngờ (`200+`, `500+`) cần được **verify và cập nhật bằng số thực tế**.  
Sau khi fill xong, đặt file này tại `public/showcase.json` trong repo và deploy.  
Rồi gọi webhook ở Bước 2.

---

## public/showcase.json (cần verify)

```json
{
  "_meta": {
    "version": "1.0",
    "slug": "vungtauland",
    "updatedAt": "2026-04-30"
  },
  "slug": "vungtauland",
  "name": "Vũng Tàu Dream Homes",
  "description": "Nền tảng bất động sản Vũng Tàu — Tìm kiếm, đăng tin và quản lý bất động sản với giao diện hiện đại",
  "category": "Real Estate Platform",
  "status": "live",
  "progress": 92,
  "production_url": "https://vungtauland.vercel.app",
  "github_url": null,

  "hero_title": "[⚠️ FILL: Headline thực tế — không dùng ALL CAPS, không superlative]",
  "hero_description": "[⚠️ FILL: 2-3 câu mô tả đầy đủ: problem + solution + tech]",
  "hero_stats": [
    { "label": "LISTINGS", "value": null },
    { "label": "USERS", "value": null },
    { "label": "LOCATIONS", "value": null }
  ],

  "overview_description": "[⚠️ FILL: ~150 words về problem context + giải pháp kỹ thuật + kết quả]",

  "objectives": [
    "Xây dựng nền tảng bất động sản hiện đại cho thị trường Vũng Tàu",
    "Hệ thống tìm kiếm và lọc thông minh theo nhiều tiêu chí",
    "Giao diện responsive tối ưu cho mọi thiết bị",
    "Tích hợp xác thực và quản lý người dùng an toàn"
  ],

  "impacts": [
    "[⚠️ FILL: Impact 1 với số liệu thực tế — nếu chưa có dùng null ở metrics thay vì bịa]",
    "[⚠️ FILL: Impact 2]",
    "[⚠️ FILL: Impact 3]"
  ],

  "features": [
    {
      "title": "Tìm Kiếm Thông Minh",
      "points": [
        "Lọc theo loại BĐS, khu vực, giá, diện tích",
        "Lọc theo trạng thái: Bán, Cho thuê",
        "Sắp xếp theo nhiều tiêu chí"
      ]
    },
    {
      "title": "Đăng Tin",
      "points": [
        "Form đăng tin trực quan với validation",
        "Upload nhiều hình ảnh chất lượng cao",
        "Mô tả chi tiết với rich text"
      ]
    },
    {
      "title": "User Dashboard",
      "points": [
        "Quản lý tin đăng cá nhân",
        "Theo dõi lượt xem và tương tác",
        "Lịch sử hoạt động"
      ]
    },
    {
      "title": "Admin Panel",
      "points": [
        "Duyệt và quản lý tin đăng",
        "Quản lý người dùng",
        "Thống kê và báo cáo"
      ]
    }
  ],

  "metrics": [
    { "label": "Listings", "value": null },
    { "label": "Registered Users", "value": null },
    { "label": "Locations Covered", "value": null }
  ],

  "tech_stack": [
    "React 18",
    "TypeScript",
    "Vite 7",
    "Tailwind CSS",
    "shadcn/ui",
    "Supabase",
    "TanStack Query",
    "Vitest",
    "Sentry"
  ],

  "performance": [
    { "label": "Build Time", "value": "2.31s" },
    { "label": "Bundle Size", "value": "806 KB" },
    { "label": "Test Coverage", "value": "50%+" },
    { "label": "Lighthouse Score", "value": "95+" }
  ],

  "infrastructure": [
    { "label": "Hosting", "value": "Vercel Edge" },
    { "label": "Database", "value": "Supabase PostgreSQL" },
    { "label": "Auth", "value": "Supabase Auth" },
    { "label": "Monitoring", "value": "Sentry + GA4" }
  ],

  "industry": "Real Estate",
  "industry_slug": "real-estate",
  "is_featured": true,
  "display_order": 4
}
```

---

## Bước 2 — Webhook sau deploy

```
POST https://sabo.com.vn/api/revalidate
Content-Type: application/json

{
  "secret": "a2f8ed63c39c48813117b1977077a3eef5d38a9060a731dd207e1ed0a2c684c3",
  "tag": "showcase"
}
```

```js
// vercel-post-deploy.js
await fetch('https://sabo.com.vn/api/revalidate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    secret: process.env.SABO_MT_REVALIDATE_SECRET,
    tag: 'showcase',
  }),
});
```

`SABO_MT_REVALIDATE_SECRET` = `a2f8ed63c39c48813117b1977077a3eef5d38a9060a731dd207e1ed0a2c684c3`

---

## Verify

```bash
curl https://vungtauland.vercel.app/showcase.json | python -m json.tool
```

Check UI: `https://sabo.com.vn/case-studies/vungtauland`
