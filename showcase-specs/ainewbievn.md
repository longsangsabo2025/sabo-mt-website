# Showcase Spec — AINewbieVN ⚠️ NEEDS AGENT VERIFICATION

> **Slug:** `ainewbievn`
> **Endpoint:** `https://ainewbievn.shop/showcase.json`
> **Status:** Placeholder data từ forge migrations — chờ ainewbievn agent verify và fill
> **Snapshot:** `src/content/showcase-snapshot.json` — đang dùng data này làm fallback

---

## ⚠️ Hướng dẫn cho ainewbievn agent

Các field có `null` hoặc số liệu nghi ngờ (`500+`, `50+`, `10+`) cần được **verify và cập nhật bằng số thực tế**.  
Sau khi fill xong, đặt file này tại `public/showcase.json` trong repo và deploy.  
Rồi gọi webhook ở Bước 2.

---

## public/showcase.json (cần verify)

```json
{
  "_meta": {
    "version": "1.0",
    "slug": "ainewbievn",
    "updatedAt": "2026-04-30"
  },
  "slug": "ainewbievn",
  "name": "AINewbieVN",
  "description": "[⚠️ FILL: 1-2 câu mô tả thực tế ~120 chars]",
  "category": "Community Platform",
  "status": "live",
  "progress": 95,
  "production_url": "https://www.ainewbievn.shop",
  "github_url": null,

  "hero_title": "[⚠️ FILL: Headline thực tế — không dùng ALL CAPS, không superlative]",
  "hero_description": "[⚠️ FILL: 2-3 câu: problem + solution + core tech + differentiator]",
  "hero_stats": [
    { "label": "MEMBERS", "value": null },
    { "label": "WORKFLOWS", "value": null },
    { "label": "PROJECTS", "value": null }
  ],

  "overview_description": "[⚠️ FILL: ~150 words về problem context + giải pháp + kết quả đạt được]",

  "objectives": [
    "[⚠️ FILL: Objective 1 — mục tiêu cụ thể]",
    "[⚠️ FILL: Objective 2]",
    "[⚠️ FILL: Objective 3]"
  ],

  "impacts": [
    "[⚠️ FILL: Impact 1 với số liệu thực tế]",
    "[⚠️ FILL: Impact 2]",
    "[⚠️ FILL: Impact 3]"
  ],

  "features": [
    {
      "title": "[⚠️ FILL: Feature nhóm 1]",
      "points": [
        "[Bullet 1]",
        "[Bullet 2]",
        "[Bullet 3]"
      ]
    },
    {
      "title": "[⚠️ FILL: Feature nhóm 2]",
      "points": [
        "[Bullet 1]",
        "[Bullet 2]"
      ]
    }
  ],

  "metrics": [
    { "label": "Members", "value": null },
    { "label": "Workflows Published", "value": null },
    { "label": "Active Projects", "value": null }
  ],

  "tech_stack": [
    "React 18",
    "TypeScript",
    "Tailwind CSS",
    "[⚠️ FILL: thêm các lib/framework đang dùng + version]"
  ],

  "performance": [
    { "label": "Page Load", "value": null },
    { "label": "Bundle Size", "value": null }
  ],

  "infrastructure": [
    { "label": "Hosting", "value": "Vercel Edge" },
    { "label": "[⚠️ FILL: Database/Auth/CDN]", "value": "[⚠️ FILL]" }
  ],

  "industry": "Community / AI",
  "industry_slug": "community",
  "is_featured": true,
  "display_order": 3
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
curl https://ainewbievn.shop/showcase.json | python -m json.tool
```

Check UI: `https://sabo.com.vn/case-studies/ainewbievn`
