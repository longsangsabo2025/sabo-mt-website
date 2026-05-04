# Marketing imagery — chuẩn Higgsfield + prompt “wow” (2026)

**Ngày:** 2026-05-03  
**Bố trí repo:** toàn bộ playbook + vị trí gắn UI/agent — [`PLAYBOOKS_INDEX.md`](PLAYBOOKS_INDEX.md).  
**Mục tiêu:** Một nơi gom **chân dung thương hiệu** (Long Sang · Uyển Nhi · SABO · funnel) → chỉ cần mô tả ý tưởng thật rõ, AI ảnh sẽ đẹp.

---

## 1. Chuẩn kỹ thuật (ghi nhớ — bắt buộc cho poster / hero marketing)

Theo Higgsfield UI và yêu cầu vận hành:

| Tham số | Giá trị |
|--------|---------|
| **Model** | `gpt_image_2` (GPT Image 2) |
| **Quality** | **High** |
| **Resolution** | **1K** (~4 credit / ảnh ở preset UI bạn dùng) |
| **Aspect** | **2:3** (portrait marketing, feed + web hero) |

**Gateway (`higgfied-mcp/`):** mặc định đã căn theo hướng này — `GET /health` → `mcp_image_defaults`. Env: `IMAGE_GATEWAY_DEFAULT_MODEL`, `IMAGE_GATEWAY_DEFAULT_ASPECT`, `UGC_IMAGE_RESOLUTION`, `UGC_IMAGE_QUALITY` (xem `.env.example`).

**Gợi ý Poster-prompt → pipeline:** dùng `aspectRatio: "1024x1536"` để map **2:3** sang Higgsfield.

---

## 2. Nguồn “chân dung” (đọc trước khi viết prompt)

| Layer | File | Ý cần thấy trong ảnh |
|-------|------|---------------------|
| **Cá nhân (Long Sang)** | [`../../01-MAIN-PRODUCTS/long-sang-ai/personal_website_playbook.md`](../../01-MAIN-PRODUCTS/long-sang-ai/personal_website_playbook.md) | Authority: *“I build AI systems that run real businesses.”* Show systems, không CV. |
| **Doanh nghiệp (SABO)** | [`sabo_website_playbook.md`](sabo_website_playbook.md) | Pain → automation, **system not services**, demo + proof. |
| **Funnel** | [`funnel_system.md`](funnel_system.md) | Attention → Retention — ảnh theo **giai đoạn** (hook / trust / intent). |
| **Trợ lý (Uyển Nhi)** | [`uyen_nhi_lead_script.md`](uyen_nhi_lead_script.md) | Warm, pro, SABO voice; insight: *“Doanh nghiệp không thiếu người, mà đang để con người làm việc lặp lại.”* |

---

## 3. Nguyên tắc prompt “wow” (ngắn gọn)

1. **Một câu mood** đầu dòng: cinematic / premium SaaS / dark editorial / glassmorphism.  
2. **Palette cố định:** deep navy `#0B1426`–`#0F172A`, accent electric coral `#FF5A4D`, white `#F8FAFC` — khớp SABO tech.  
3. **Ánh sáng:** single key light + soft volumetric; tránh “stock office 2010”.  
4. **Chữ trong ảnh:** GPT Image 2 render chữ tốt — vẫn nên **câu ngắn**, tránh đoạn dài tiếng Việt (post overlay SVG vẫn là lớp an toàn nhất).  
5. **Không liệt kê 10 ý** — 4–6 khối ý + negative space.

---

## 4. Prompt mẫu — copy & chỉnh `[]`

### 4.1 Long Sang — hero “authority + systems” (personal playbook)

```
Cinematic premium portrait, 2:3 vertical poster. Confident Vietnamese tech founder in his 30s–40s,
subtle smile, sharp eyes, wearing minimal dark blazer over black t-shirt. Not a stock photo pose —
slight three-quarter turn, relaxed shoulders.

Environment: dim futuristic office with a single coral (#FF5A4D) rim light and cool navy fill (#0B1426).
Behind him, floating translucent glass UI panels showing abstract automation flowcharts, agent nodes,
and KPI charts — no readable text, just glowing lines and nodes.

Mood: "I build AI systems that run real businesses" — serious but approachable, Apple-meets-Linear aesthetic.
Ultra detailed skin texture, shallow depth of field, editorial photography, 8k feel, no watermark.
```

### 4.2 SABO — hero “cut manual work” (sabo playbook)

```
Dark mode SaaS marketing hero, 2:3 portrait. Massive abstract "manual work" visualized as tangled grey
threads on the left, cleanly reorganized into glowing coral (#FF5A4D) pipelines and checkmarks on the right —
metaphor only, no logos, no text.

Center: sleek matte-black smartphone tilted 15°, screen shows minimal abstract dashboard UI blocks
(charts, timeline, bot icon) in coral + navy, no legible words.

Background: deep navy gradient with faint hex grid. Style: Stripe / Vercel launch campaign, hyper clean,
negative space top third for headline overlay later. Photoreal 3D + subtle bloom, no people, no clipart.
```

### 4.3 Uyển Nhi — “AI assistant đóng lead” (lead script)

```
Warm professional AI assistant portrait, 2:3 vertical. Young Vietnamese woman, natural makeup,
friendly confident expression, soft smile — looks like a real SABO team member, not generic AI robot.

Wearing simple modern blouse in off-white. Subtle holographic UI halo behind her ears suggesting AI —
thin coral (#FF5A4D) light lines, very tasteful, not sci-fi cheesy.

Background: soft gradient navy to charcoal, studio portrait lighting (large softbox), high-end LinkedIn
cover quality. Mood: trustworthy, calm, "I'll help you find what to automate first." No text on image.
```

### 4.4 Funnel — một ảnh / một giai đoạn (funnel_system)

**Attention (TikTok / Reels hook frame):**

```
Ultra bold vertical thumbnail 2:3, high contrast. Split screen: left side chaotic sticky notes and
messy chat bubbles in grey; right side one glowing coral (#FF5A4D) arrow piercing through to a clean
single dashboard silhouette. No text. Energy: STOP THE SCROLL — motion blur hint on edges only.
```

**Trust (website cá nhân):**

```
Editorial "proof wall" collage aesthetic, 2:3. Dark mood board: 4 floating glass cards with abstract
icons (flowchart, database, robot head, chart) connected by thin coral lines. Feels like a serious
systems integrator, not an influencer. Plenty of breathing room, museum lighting.
```

**Intent → Conversion (SABO site / demo CTA visual):**

```
Premium B2B conversion visual 2:3. One elegant calendar slot UI mock (abstract, no text) and a single
coral CTA pill shape (blank, no words) on deep navy. Subtle reflection on glass table. Mood: "book a
demo" without saying it — Fortune 500 polish, minimal.
```

### 4.5 Signature line — có chữ (GPT Image 2 typography)

```
Minimal typographic poster 2:3, dark navy background #0B1426, subtle dot grid. One centered quote in
clean geometric sans-serif, white text, small coral (#FF5A4D) accent line above quote:

"Doanh nghiệp không thiếu người, chỉ thiếu hệ thống."

Tiny footer: "Uyển Nhi · SABO" in muted grey, very small. No other text. Premium editorial, plenty of
negative space, perfect Vietnamese diacritics, kerning impeccable.
```

---

## 5. Gọi từ gateway (nhắc nhanh)

`POST /v1/images` — body tối thiểu:

```json
{
  "prompt": "<paste prompt section>",
  "model": "gpt_image_2",
  "aspect_ratio": "2:3",
  "resolution": "1k",
  "quality": "high",
  "filename": "sabo-hero-attention"
}
```

Pipeline: thêm `image` block tương tự nếu cần override; nếu bỏ trống, gateway dùng default env.

---

## 6. Checklist trước khi batch

- [ ] Đã đọc đúng playbook tương ứng (personal / SABO / funnel / Uyển Nhi)?  
- [ ] Prompt có mood + palette + negative space?  
- [ ] Model = **gpt_image_2**, High, 1K, 2:3?  
- [ ] Có chỗ để chữ overlay nếu cần bản song ngữ sau?

---

*Tài liệu này là single place cho team content + agent: cập nhận khi đổi palette hoặc khi Higgsfield đổi pricing UI.*
