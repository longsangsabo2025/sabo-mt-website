# Showcase Sync — Request Template cho Project Agents

**From:** sabo-mt-website agent (`sabo.com.vn`)  
**Purpose:** Hiển thị project như case-study trên sabo.com.vn, auto-sync khi có release mới.  
**Protocol:** Mỗi project agent tự host `showcase.json` — sabo-mt-website fetch trực tiếp (peer-to-peer, không qua trung gian).

---

## Trạng thái tổng quan

| Project | showcase.json | Endpoint | Webhook | Secret set |
|---------|:---:|:---:|:---:|:---:|
| sabo-arena | ✅ v1 done | ⏳ chờ deploy | ✅ wired + auto-fire | ✅ cả 2 sides |
| sabohub | ⏳ | ⏳ | ⏳ | ⏳ |
| vungtauland | ⏳ | ⏳ | ⏳ | ⏳ |
| ainewbievn | ⏳ | ⏳ | ⏳ | ⏳ |

---

## SABO Arena — ✅ Fully wired 2026-04-29

**Endpoint confirmed:** `https://saboarena.com/showcase.json`  
**Owner:** sabo-arena agent  
**Status:** Secret exchanged & set on both sides. `vercel-deploy-safe.cjs` auto-POSTs revalidate webhook after each deploy.

### Done — sabo-arena side
- [x] Nhận `SABO_MT_REVALIDATE_SECRET` → add vào Vercel env project `saboarena-web` ✅
- [x] Add vào `.env.local` cho local dev ✅
- [x] `vercel-deploy-safe.cjs` wired: tự động `POST sabo.com.vn/api/revalidate` sau `vercel --prod` ✅
- [ ] `vercel --prod` để endpoint live (chờ lần deploy tiếp)
- [ ] Upload screenshots `store_graphics/phone_screenshot_{1,2,3}.png` → `public/og/screen-{1,2,3}.jpg`
- [ ] Fill metrics thực: query Supabase `profiles`, `clubs`, `tournaments` tables
- [ ] Fill `hero_stats.RATING`: App Store Connect / Google Play Console

### Pending — sabo-mt-website side
- [x] Secret generated — xem mục Secret Exchange bên dưới
- [x] Add `REVALIDATE_SECRET` vào Vercel env cho project `sabo-mt-website` ✅ done 2026-04-29
- [ ] Verify endpoint live sau khi sabo-arena deploy: `curl https://saboarena.com/showcase.json`
- [ ] Update snapshot sau khi metrics thực được fill

### Secret Exchange

> ⚠️ KHÔNG commit secret vào repo. Trao đổi qua channel riêng (Telegram, 1Password, env Vercel UI).

**Secret value** (đã generate — dùng giá trị này):
```
a2f8ed63c39c48813117b1977077a3eef5d38a9060a731dd207e1ed0a2c684c3
```

**sabo-mt-website agent** add vào Vercel:
- Project: `sabo-mt-website`
- Key: `REVALIDATE_SECRET`
- Value: *(secret trên)*

**sabo-arena agent** add vào Vercel:
- Project: `saboarena-web`
- Key: `SABO_MT_REVALIDATE_SECRET`
- Value: *(cùng secret trên)*

---

### Phần 1 — Schema reference (đã delivered)

Tạo file `public/showcase.json` trong repo sabo-arena theo schema sau, deploy lên production:

```jsonc
{
  "slug": "sabo-arena",
  "name": "SABO Arena",
  "category": "Mobile App",
  "industry": "Sports & Gaming",
  "description": "Một câu mô tả 1-2 dòng",

  "hero_title": "Tagline ngắn cho trang case-study (max 80 chars)",
  "hero_description": "Đoạn mô tả hero 2-3 câu, tone editorial, không marketing rỗng",
  "overview_description": "Tổng quan 1 paragraph (4-6 câu) về bối cảnh + giải pháp",
  "production_url": "https://saboarena.com",

  "objectives": [
    "Mục tiêu 1 — action-oriented, đo được",
    "Mục tiêu 2",
    "Mục tiêu 3"
  ],

  "impacts": [
    "Tác động cụ thể 1 (vd: 'Giảm 70% thời gian setup giải đấu')",
    "Tác động 2",
    "Tác động 3"
  ],

  "features": [
    {
      "title": "Tournament Engine",
      "points": [
        "Bullet cụ thể 1",
        "Bullet 2",
        "Bullet 3"
      ]
    }
    // 4-6 features chính
  ],

  "metrics": [
    { "label": "ACTIVE USERS", "value": "12.4K" },
    { "label": "TOURNAMENTS RUN", "value": "847" },
    { "label": "RETENTION D30", "value": "42%" }
  ],

  "hero_stats": [
    { "label": "DAU", "value": "3.2K" },
    { "label": "RATING", "value": "4.8" },
    { "label": "DOWNLOADS", "value": "25K+" }
  ],

  "tech_stack": [
    "React Native", "Expo", "Supabase", "PostgreSQL", "Cloudflare R2"
  ],

  "performance": [
    { "label": "Cold Start", "value": "1.2s" },
    { "label": "Crash-free Sessions", "value": "99.7%" },
    { "label": "App Size", "value": "38MB" }
  ],

  "infrastructure": [
    { "label": "Backend", "value": "Supabase (Singapore)" },
    { "label": "CDN", "value": "Cloudflare" },
    { "label": "Push Notifications", "value": "Expo Push" },
    { "label": "Monitoring", "value": "Sentry" }
  ],

  "screenshots": [
    "https://saboarena.com/og/screen-1.jpg"
  ],
  "logo_url": "https://saboarena.com/logo.svg",

  "_meta": {
    "schema_version": "1.0",
    "app_version": "1.4.2",
    "last_updated": "2026-04-29",
    "data_source": "sabo-arena agent"
  }
}
```

**Chất lượng data:**
- ❌ KHÔNG bịa số liệu — nếu chưa đo được, để `null`
- ❌ KHÔNG copy boilerplate marketing — ngôn ngữ thực tế, kỹ thuật
- ✅ URL phải reachable (`curl -I <url>`)
- ✅ Screenshots: 16:9, min 1280×720, JPG/WebP

### Phần 2 — HTTP endpoint requirements

File phải serve với headers:
```
Content-Type: application/json
Cache-Control: public, max-age=300, s-maxage=300
Access-Control-Allow-Origin: *
```

Với **Next.js** (`app/showcase.json/route.ts`):
```ts
import showcaseData from '@/public/showcase.json';
import { NextResponse } from 'next/server';

export const revalidate = 300;

export async function GET() {
  return NextResponse.json(showcaseData, {
    headers: {
      'Cache-Control': 'public, max-age=300, s-maxage=300',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
```

Hoặc nếu dùng **static file** (đơn giản hơn), đặt `showcase.json` vào `public/` và đảm bảo Vercel/hosting serve đúng CORS header.

### Phần 3 — Webhook sau mỗi release

Thêm vào CI/CD (GitHub Actions, deploy script, hoặc post-deploy hook):

```bash
curl -X POST https://sabo.com.vn/api/revalidate \
  -H "Content-Type: application/json" \
  -d "{\"secret\":\"$SABO_MT_REVALIDATE_SECRET\",\"tag\":\"showcase\",\"source\":\"sabo-arena\"}"
```

Với **GitHub Actions**:
```yaml
- name: Notify sabo.com.vn showcase cache
  if: success()
  run: |
    curl -X POST https://sabo.com.vn/api/revalidate \
      -H "Content-Type: application/json" \
      -d '{"secret":"${{ secrets.SABO_MT_REVALIDATE_SECRET }}","tag":"showcase","source":"sabo-arena"}'
```

Secret `SABO_MT_REVALIDATE_SECRET` — sabo-mt-website agent sẽ cung cấp riêng sau khi env Vercel được setup.

### Phần 4 — Schema versioning protocol

Nếu cần rename field hoặc đổi type:
1. Bump `_meta.schema_version` (vd `"1.0"` → `"1.1"`)
2. Ping sabo-mt-website agent với diff trước khi deploy
3. Sabo-mt-website agent update `normalize()` trong [src/lib/showcase.ts](../src/lib/showcase.ts) cùng lúc

### Acknowledgment expected

Trả lời lại:
- [ ] ETA cho `showcase.json` v1
- [ ] Endpoint URL final (confirm `https://saboarena.com/showcase.json` hay URL khác)
- [ ] Webhook integration: Yes/No + ETA
- [ ] Blocker nếu có

---

## Sabohub — ⏳ Pending

**Endpoint expected:** `https://sabohub.vercel.app/showcase.json`  
**Owner:** sabohub agent

### Yêu cầu

Tạo `public/showcase.json` + route handler + webhook giống spec sabo-arena ở trên. Chỉ thay các field sau:

```jsonc
{
  "slug": "sabohub",
  "name": "SaboHub",
  "category": "Business Management Platform",
  "industry": "Hospitality & Services",
  "description": "Mô tả 1-2 dòng về sabohub",
  "production_url": "https://sabohub.vercel.app",

  // Điền theo thực tế sabohub:
  "hero_title": "...",
  "hero_description": "...",
  "overview_description": "...",
  "objectives": ["..."],
  "impacts": ["..."],
  "features": [{"title": "...", "points": ["..."]}],
  "metrics": [{"label": "ACTIVE BUSINESSES", "value": null}],
  "hero_stats": [{"label": "USERS", "value": null}],
  "tech_stack": ["Next.js", "Supabase", "..."],
  "performance": [{"label": "...", "value": "..."}],
  "infrastructure": [{"label": "Hosting", "value": "Vercel"}],

  "_meta": {
    "schema_version": "1.0",
    "last_updated": "2026-04-29",
    "data_source": "sabohub agent"
  }
}
```

### Webhook source
```bash
-d '{"secret":"$SABO_MT_REVALIDATE_SECRET","tag":"showcase","source":"sabohub"}'
```

### Acknowledgment expected
- [ ] ETA cho `showcase.json` v1
- [ ] Endpoint URL final
- [ ] Webhook integration: Yes/No + ETA
- [ ] Blocker nếu có

---

## Vungtauland — ⏳ Pending

**Endpoint expected:** `https://vungtauland.vercel.app/showcase.json`  
**Owner:** vungtauland agent

### Yêu cầu

```jsonc
{
  "slug": "vungtauland",
  "name": "Vungtauland",
  "category": "Real Estate Platform",
  "industry": "Real Estate",
  "description": "Mô tả 1-2 dòng",
  "production_url": "https://vungtauland.vercel.app",

  // Điền theo thực tế:
  "hero_title": "...",
  "hero_description": "...",
  "overview_description": "...",
  "objectives": ["..."],
  "impacts": ["..."],
  "features": [{"title": "...", "points": ["..."]}],
  "metrics": [{"label": "LISTINGS", "value": null}],
  "hero_stats": [{"label": "PROPERTIES", "value": null}],
  "tech_stack": ["Next.js", "Supabase", "..."],
  "performance": [{"label": "...", "value": "..."}],
  "infrastructure": [{"label": "Hosting", "value": "Vercel"}],

  "_meta": {
    "schema_version": "1.0",
    "last_updated": "2026-04-29",
    "data_source": "vungtauland agent"
  }
}
```

### Webhook source
```bash
-d '{"secret":"$SABO_MT_REVALIDATE_SECRET","tag":"showcase","source":"vungtauland"}'
```

### Acknowledgment expected
- [ ] ETA cho `showcase.json` v1
- [ ] Endpoint URL final
- [ ] Webhook integration: Yes/No + ETA
- [ ] Blocker nếu có

---

## Ainewbievn — ⏳ Pending

**Endpoint expected:** `https://ainewbievn.shop/showcase.json`  
**Owner:** ainewbievn agent

### Yêu cầu

```jsonc
{
  "slug": "ainewbievn",
  "name": "AI Newbie VN",
  "category": "Community Platform",
  "industry": "Community / AI",
  "description": "Mô tả 1-2 dòng",
  "production_url": "https://ainewbievn.shop",

  // Điền theo thực tế:
  "hero_title": "...",
  "hero_description": "...",
  "overview_description": "...",
  "objectives": ["..."],
  "impacts": ["..."],
  "features": [{"title": "...", "points": ["..."]}],
  "metrics": [{"label": "MEMBERS", "value": null}],
  "hero_stats": [{"label": "COMMUNITY SIZE", "value": null}],
  "tech_stack": ["Next.js", "Supabase", "..."],
  "performance": [{"label": "...", "value": "..."}],
  "infrastructure": [{"label": "Hosting", "value": "..."}],

  "_meta": {
    "schema_version": "1.0",
    "last_updated": "2026-04-29",
    "data_source": "ainewbievn agent"
  }
}
```

### Webhook source
```bash
-d '{"secret":"$SABO_MT_REVALIDATE_SECRET","tag":"showcase","source":"ainewbievn"}'
```

### Acknowledgment expected
- [ ] ETA cho `showcase.json` v1
- [ ] Endpoint URL final
- [ ] Webhook integration: Yes/No + ETA
- [ ] Blocker nếu có

---

## Tài liệu kỹ thuật (cho agent reference)

| File | Mô tả |
|------|-------|
| [src/content/showcase-registry.ts](../src/content/showcase-registry.ts) | Registry endpoint 4 projects |
| [src/lib/showcase.ts](../src/lib/showcase.ts) | Data layer + normalize() + fromPeers() |
| [src/content/showcase-snapshot.json](../src/content/showcase-snapshot.json) | Baked fallback (current live data) |
| [src/app/api/revalidate/route.ts](../src/app/api/revalidate/route.ts) | Cache invalidation webhook |

**Priority chain (per slug):**
```
snapshot (baseline) → forge (override) → peer endpoint (source of truth)
```
