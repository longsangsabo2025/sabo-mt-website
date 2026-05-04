# SABO MT — Design System

**Source of truth** cho redesign sabo.com.vn theo phong cách của [loudsrl.com](https://loudsrl.com/).

> Triết lý: **Say less, mean more.** Nội dung gọn — súc tích — đúng trọng tâm. Mỗi pixel có lý do tồn tại. Khách hàng không bao giờ phải đoán "click vào đâu tiếp theo".

---

## 1. Triết lý thiết kế (lấy từ LOUD)

| Nguyên tắc | Ý nghĩa | Áp dụng cho SABO |
|---|---|---|
| **Editorial minimalism** | Nhiều khoảng trắng, ít elements, mỗi section 1 ý duy nhất | Hero chỉ headline + 1 CTA, không banner-spam |
| **Mono + Sans pairing** | DM Mono cho label/eyebrow (kỹ thuật), DM Sans cho body (đọc thoải mái) | Eyebrow `THINK.`, body sans-serif gần gũi |
| **Per-pillar color theme** | Mỗi trang con có 1 màu nền chủ đạo (Think = burgundy) | Mỗi industry/service một accent riêng |
| **Slow + intentional motion** | GSAP smooth scroll, word-by-word reveal, marquee chậm | Không "popup loè loẹt", chuyển động phục vụ kể chuyện |
| **No gradients gimmicks** | Background phẳng (đen / trắng / màu solid). Texture qua video/ảnh, không qua CSS gradient | Bỏ neon glow, glassmorphism của v1 |
| **Letterform = identity** | Logo chữ + dấu chấm cuối câu (`LOUD.`) — typographic statement | `SABO.` thay vì logo iconic |
| **Periodic numbering** | "I • VI PILLARS", "01 / 04" — gợi tài liệu, sách, archive | Đánh số rõ services/industries |

---

## 2. Color System

### 2.1 Core palette
```
--ink            #000000    /* Pure black — body bg */
--paper          #FFFFFF    /* Pure white — section bg */
--ink-soft       #0A0A0A    /* Near-black — overlay */
--paper-soft     #F4F4F2    /* Warm off-white — card bg in white sections */
--rule           rgba(255,255,255,0.12)   /* Hairline divider trên đen */
--rule-dark      rgba(0,0,0,0.10)         /* Hairline divider trên trắng */
```

### 2.2 Per-section accent (mỗi pillar 1 màu — như LOUD)
```
--accent-think    #6E2A21   /* burgundy — Tư vấn */
--accent-design   #1F3A5C   /* navy — Thiết kế */
--accent-build    #2A5C3C   /* forest green — Phát triển */
--accent-grow     #C9A961   /* gold — Tăng trưởng */
```
> Quy tắc: **Mỗi page con (industry / service detail) chọn DUY NHẤT 1 accent**. Không trộn 2 accent trong cùng trang.

### 2.3 Functional
```
--success   #2D7A4A
--warn      #B5651D
--danger    #B33A3A
```

### 2.4 Quy tắc dùng màu
- Homepage hero = `--ink` 100%, text trắng
- Section "white scroll" = `--paper`, text `--ink`
- Pillar/industry detail = accent solid 100% phủ hero, text trắng. Section dưới chuyển sang `--paper`
- KHÔNG dùng gradient nhiều stop. Tối đa: solid → solid khi scroll giữa 2 section
- Logos cloud luôn render đen monochrome trên nền trắng (như LOUD)

---

## 3. Typography

### 3.1 Font families (Google Fonts)
```css
--font-sans:  "DM Sans", ui-sans-serif, system-ui;     /* body, headlines */
--font-mono:  "DM Mono", ui-monospace, monospace;       /* eyebrows, labels, nav */
--font-serif: "Instrument Serif", Georgia, serif;       /* (optional) editorial accent in case studies */
```
> Nạp qua `next/font/google`: weights DM Sans `400, 500, 700`, DM Mono `400, 500`.

### 3.1.a Header typography rule (mandatory)
- Header navigation and top-bar utility text (`VI/EN`, menu labels) dùng **DM Mono** mặc định.
- Tracking chuẩn header nav: `0.14em–0.16em`, uppercase để giữ technical/editorial tone.
- Không dùng serif cho header menu items.

### 3.2 Type scale (mobile → desktop)
| Token | Size | Weight | Family | Use |
|---|---|---|---|---|
| `display-1` | 56 → 96px | 400 | mono **OR** sans | Hero headline (ví dụ "We make digital products.") |
| `display-2` | 40 → 64px | 400 | sans | Section heading |
| `h1` | 32 → 48px | 500 | sans | Page title |
| `h2` | 24 → 36px | 500 | sans | Card title, sub-heading |
| `h3` | 18 → 22px | 500 | sans | Inline heading |
| `body-lg` | 18 → 22px | 400 | sans | Long-form body |
| `body` | 15 → 16px | 400 | sans | Default paragraph |
| `body-sm` | 13 → 14px | 400 | sans | Card body |
| `eyebrow` | 11 → 12px | 500 | **mono** | UPPERCASE labels, tracking 0.16em |
| `caption` | 10 → 11px | 400 | mono | Metadata (4:09 PM, "I • VI PILLARS") |

### 3.3 Letter spacing
```
--tracking-tighter   -0.05em    /* display-1 */
--tracking-tight     -0.02em    /* display-2, h1 */
--tracking-normal     0
--tracking-mono       0.04em    /* mono body */
--tracking-eyebrow    0.16em    /* mono eyebrow UPPERCASE */
--tracking-widest     0.20em    /* nav buttons */
```

### 3.4 Line height
- Display: `1.05` (tight)
- Heading: `1.15`
- Body: `1.55` (long-form `1.65`)

### 3.5 Headline rules (giống LOUD)
- Headline thường kết thúc bằng dấu `.` để trông như tuyên ngôn (statement)
- Capitalization: **Sentence case** ("We make digital products."), KHÔNG title case
- Mono headline (như "Making something that people want.") chỉ dùng cho hero của pillar/industry pages
- Sans headline cho homepage và body-content

---

## 4. Spacing & Grid

### 4.1 Spacing scale (multiples of 4)
```
--s-1   4px    --s-7   48px
--s-2   8px    --s-8   64px
--s-3   12px   --s-9   96px
--s-4   16px   --s-10  128px
--s-5   24px   --s-11  192px
--s-6   32px   --s-12  256px
```

### 4.2 Grid
- 12-col grid, gutter 24px desktop / 16px mobile
- Container max: `1440px` (`--container-7xl: 80rem`)
- Section vertical padding: 96–192px desktop, 64–96px mobile

### 4.3 Layout patterns
- **Hero**: full viewport height (`100svh`), content centered hoặc bottom-anchored
- **Big-text sections**: 2 cột (60/40) — heading bên trái, body nhỏ phải
- **Card grid**: 2 cột desktop / 1 cột mobile, gap 16px
- **Logo strip**: 7 cột logo, height 80px, marquee infinite scroll

---

## 5. Animation Library (GSAP + Lenis)

### 5.1 Dependencies cần cài
```bash
npm i gsap @studio-freight/lenis split-type
```

### 5.2 Smooth scroll (Lenis)
- Init Lenis ở `<RootLayout>`, gắn vào `requestAnimationFrame`
- Duration `1.2s`, easing `(t) => Math.min(1, 1.001 - 2 ** (-10 * t))`
- Hook GSAP ScrollTrigger với Lenis: `lenis.on("scroll", ScrollTrigger.update)`

### 5.3 Animation primitives (mỗi cái = 1 hook tái dùng)

| Hook | Behavior | Trigger |
|---|---|---|
| `useWordReveal` | Split heading thành `<span>` từng WORD, fade+translate Y 30px → 0, stagger 60ms | Scroll vào view 80% |
| `useLetterReveal` | Split heading thành `<span>` từng KÝ TỰ, opacity 0→1, stagger 30ms | Scroll vào view (cho "Want to start a company?") |
| `useMarquee` | Infinite horizontal scroll, duration 30s, pause on hover | Always-on |
| `useImageReveal` | Image clip-path inset(100% 0 0 0) → inset(0), 1.2s ease-out | Scroll vào view |
| `useNumberCounter` | Đếm số từ 0 → target, duration 2s | Scroll vào view |
| `useMagneticHover` | Pill button dịch nhẹ về phía cursor (max 8px), spring back | mouseenter |
| `useExpandPanel` | Accordion, height auto, icon swap (collapse ↔ expand), 0.4s | onClick |
| `useCursorTrail` | Custom cursor trên hover button: vòng tròn theo cursor | mousemove on `.magnetic` |
| `useParallax` | Image background parallax y -50px → +50px | Scroll progress trong section |

### 5.4 Easing & timing chuẩn
```
--ease-out      cubic-bezier(0.0, 0.0, 0.2, 1)     /* standard exit */
--ease-in-out   cubic-bezier(0.4, 0.0, 0.2, 1)     /* standard */
--ease-expo     cubic-bezier(0.16, 1, 0.3, 1)      /* hero reveals */

--dur-fast      200ms
--dur-base      400ms
--dur-slow      800ms
--dur-hero      1200ms
```

### 5.5 KHÔNG dùng
- `framer-motion` ở sections nặng (Lenis + GSAP nhanh hơn, control tốt hơn)
- CSS keyframes loè loẹt (pulse-glow, float, shimmer của v1)
- Transitions trên màu nền giữa pages — dùng GSAP timeline thay thế

---

## 6. Component Recipes

### 6.1 `<Header>` (sticky top)
- Layout: `[Logo "SABO. Digital Product Co."] [Nav 5 items center] [LocalTime + ThemeIcon right]`
- Height 80px, padding-x 32px
- Background: transparent overlay trên hero, solid `--ink` khi scroll > 100px
- Active nav item: full opacity. Inactive: opacity 0.4 với hover blur effect
- Mobile: hamburger → fullscreen overlay
- Nav typography: `font-mono`, uppercase, tracking rộng (`~0.16em`)
- Header icons (theme/menu/close/cta icon) mặc định trắng sáng để nổi bật trên nền tối

### 6.1.a Icon baseline (mandatory)
- Mặc định icon trên dark sections (`header`, `luxury-section`, `grain`) là **trắng sáng** (`#FFF`, full opacity).
- Nếu một icon cần semantic màu riêng, phải override tường minh tại component (không rely vào default dim color).

### 6.2 `<PillCTA>` (primary button)
- Border-radius: 999px (pill shape)
- Padding: 14px 28px, gap 12px (text + arrow icon)
- Variants:
  - `dark`: bg `--ink`, text `--paper`, arrow trong vòng tròn trắng
  - `light`: bg `--paper`, text `--ink`, arrow trong vòng tròn đen
  - `outline`: border 1px `--paper`, transparent bg
- Hover: magnetic (5.3 `useMagneticHover`)

### 6.3 `<EyebrowLabel>`
- `font-mono`, `text-eyebrow`, UPPERCASE, tracking 0.16em
- Optional: leading bullet `•` hoặc index `01 /`
- Color: gray-400 trên đen, gray-600 trên trắng

### 6.4 `<ServiceList>` (4-col grid như Think page)
- 4 cột, mỗi cột:
  - Eyebrow heading (mono): `Product Vision & Strategy`
  - Bulleted list 4 items (sans, body-sm)
  - Right-arrow ">" ở cột cuối → next slide
- Carousel với Previous/Next button
- Background: accent color của section đang ở

### 6.5 `<ExpandPanel>` (accordion)
- Header: eyebrow label + collapse/expand icon (corner brackets `⌐╝`)
- Body: 4 cards trong row, mỗi card:
  - icon top + separator line + title + body
- Background card: `--paper-soft`
- Click toggle: animate height + icon swap (5.3 `useExpandPanel`)

### 6.6 `<MarqueeText>` (giant scrolling phrase)
- Repeat phrase 3× horizontally, infinite scroll
- Font: display-1 sans, color current accent
- Each word in `<span>` (cho per-word reveal optional)
- Speed: 30s/loop

### 6.7 `<LogoCloud>`
- Grid 7 cols × 2 rows, gap 32px
- Height row 80px
- Logos: PNG monochrome đen trên trắng (hoặc trắng trên đen)
- Optional: marquee mode (như LOUD footer)

### 6.8 `<HeroVideo>` (homepage)
- `<video autoplay muted loop playsinline>` full viewport
- Source: 1 file MP4 ngắn (5-10s), texture liquid/abstract
- Overlay: rgba(0,0,0,0.3) cho contrast text
- Fallback: poster image nếu prefers-reduced-motion

### 6.9 `<IndustryCard>` (homepage 4 industries)
- Aspect ratio 16:10
- Background image full-bleed
- Overlay: `--gradient-industry-black` (linear left → transparent right)
- Title bottom-left: display-2 sans, white
- Hover: image scale 1.05 + overlay opacity 0.7

### 6.10 `<CaseStudyCard>` (3-col case studies row)
- Image aspect 4:5
- Below: eyebrow `CERCACASA` (mono) + sans subtitle `Real Estate Search Engine`
- Hover: arrow icon slide-in from right

### 6.11 `<ScrollNumber>` (page indicator)
- Format: `I • VI PILLARS` (Roman) hoặc `01 / 06` (Arabic)
- Position: floating bottom-center hoặc top-of-section
- Mono, color gray-400

### 6.12 `<LocalTime>`
- Header right: `4:09 PM` + sun/moon icon
- Update every 1min, use Hanoi timezone
- Mono caption

### 6.13 `<Footer>`
- Top row: "Let's build something great…" + `<PillCTA>Work together →`
- 3 cột: SOCIAL / SABO / CONTACT (mỗi cột 2-5 links)
- Bottom row: `2026 ©` / company info / "Always with ❤️ and a lot of ☕"
- Background: `--ink`, text white

---

## 7. Information Architecture

### 7.1 Nav top-level (max 5 items như LOUD)
```
THINK.       → /thinking      (Tư vấn chiến lược)
DESIGN.      → /design        (UX/UI & branding)
BUILD.       → /build         (Kỹ thuật & dev)
MANIFESTO    → /manifesto     (Giá trị + dịch vụ tổng)
STUDIO       → /studio        (Về SABO)
```

### 7.2 Trang con cần có
| Route | Nội dung |
|---|---|
| `/` | Hero video + 4 industries + intro 6 pillars (hoặc 4 cho SABO) + case studies + CTA |
| `/thinking` | Hero burgundy + service list 4 cols + expand panels + marquee + cases + LOUD AGENCY/STUDIO duo |
| `/design` | Tương tự thinking, accent navy |
| `/build` | Tương tự, accent forest |
| `/manifesto` | 5 nguyên tắc + 8 deliverable cards + 12 services full grid |
| `/studio` | About SABO, team, locations |
| `/case-studies` | List grid |
| `/case-studies/[slug]` | Detail page có scroll-driven storytelling |
| `/industries/[slug]` | Industry-specific landing (4 industries) |
| `/contact-us` | Form chia 3 mục đích: business / career / startup |

### 7.3 Content rules (concise, súc tích)
- Mỗi section 1 ý duy nhất — KHÔNG nhồi 3 features vào 1 block
- Headline ≤ 12 từ
- Body ≤ 3 câu, ≤ 50 từ
- Card body ≤ 30 từ
- Eyebrow 1-3 từ UPPERCASE
- Bulleted list tối đa 4 items
- CTA text ≤ 3 từ ("Are you the next?", "Build with us", "Be the next")

---

## 8. Page-by-page Spec cho SABO

### 8.1 Homepage `/`
```
[Header: SABO. + 5 nav + 4:09 PM]

[Hero — 100svh, --ink bg, video oil texture]
  Center:
    eyebrow:  I • IV PILLARS
    h1:       We craft digital products.   (DM Sans, display-1)
  Bottom-left stack (industry buttons):
    REAL ESTATE
    BILLIARDS / SPORTS
    AI TOOLS
    E-COMMERCE
  Bottom-right:
    PillCTA "Are you the next?"  → /contact-us

[Section: Industries — 4 full-width image bands, vertical stack]
  Each band:
    background image full-bleed
    overlay --gradient-industry-black
    title bottom-left + eyebrow industry number

[Section: Pillars intro — white bg]
  eyebrow: WHAT WE DO
  display-2: We think, design and build.
  4 link cards → /thinking, /design, /build, /grow

[Section: Case studies row — 3 cards]
  CaseStudyCard × 3

[Section: Logo cloud — white bg]
  display-2: We work with brands that move first.
  LogoCloud (clients SABO)
  PillCTA "Be the next →"

[Section: Final CTA — burgundy bg]
  display-1 letter-reveal: "Want to start with us?"
  PillCTA "Submit your idea"

[Footer]
```

### 8.2 Pillar pages `/thinking` `/design` `/build`
```
[Hero — accent color full bg, 100svh]
  display-1 mono: "Making something that people want."
  body-lg: paragraph với per-word reveal animation
  Service grid 4 cols (carousel, prev/next)
  Footer caption with icon: "Each individual step involves..."

[Section: Intro — white bg]
  eyebrow: PRODUCT CONSULTING
  display-2: long descriptive paragraph

[Section: Hero image — full-bleed abstract]

[Section: Unleash potential — white bg]
  display-1: "Unleash Your Product's Potential" (mono)
  body-lg right column

[Section: Expand panels (4 panels) — 2 cols]
  ExpandPanel × 4  (Product Vision / Design / Prototyping / Delivery)

[Section: Marquee phrase 3×]

[Section: Case studies row 3 cards]

[Section: Logo cloud + PillCTA]

[Section: Duo cards LOUD AGENCY + LOUD STUDIO]

[Section: "Next consulting way →" page nav]

[Footer]
```

### 8.3 Manifesto `/manifesto`
```
[Hero — pure black or paper bg]
  display-1: "We are in a constant state of becoming."
  Show content button

[Section: 5 principles — list with image carousels]
  Each principle:
    - h2 link to pillar
    - "Discover X →"
    - 3 image previews rolling

[Section: Deliverables 8 cards grid 4×2]
  E-COMMERCE / WEBSITE / AI TOOL / WEB APP / MOBILE APP / CMS & SAAS / WATCH & TV / IOT

[Section: Full services 12 cells grid 4×3]
  Each: eyebrow + 4-bullet list

[Section: Cases + Logos + Duo cards]

[Footer]
```

### 8.4 Footer (toàn site)
```
[Top — accent or ink bg]
  display-2: "Let's build something great…"
  PillCTA "Work together →"

[Middle 3 cols]
  SOCIAL    : Linkedin, Instagram, Facebook
  SABO      : Thinking, Design, Build, Manifesto, Studio
  CONTACT   : Careers, Contact Us, Start a project

[Bottom row]
  2026 ©  |  SABO MT — [địa chỉ VN]  |  Always with ❤️ and a lot of ☕
```

---

## 9. Tech Stack & Dependencies

### 9.1 Giữ nguyên
- Next.js 16.2.4 (App Router + SSG)
- React 18.3.1
- TypeScript 5.6.2 strict
- Tailwind CSS 3.4.13
- Vercel hosting

### 9.2 Cần CÀI THÊM
```bash
npm i gsap @studio-freight/lenis split-type
# Optional:
npm i embla-carousel-react   # cho service carousel
```

### 9.3 Cần XOÁ khỏi v1
- `globals.css`: bỏ keyframes `pulse-glow`, `float`, `shimmer`, classes `card-glass`, `bg-grid-dark`, `bg-grid-light`, `text-grad-gold`
- `tailwind.config.ts`: simplify color tokens — chỉ giữ `ink, paper, accent-{think,design,build,grow}`. Bỏ `navy`, `gold` cũ.
- `page.tsx` LOUD v1 (459 lines) — viết lại từ đầu

### 9.4 Cần TẠO MỚI
- `src/lib/lenis.ts` — Lenis singleton + GSAP ScrollTrigger hookup
- `src/hooks/useWordReveal.ts` — word-by-word reveal
- `src/hooks/useLetterReveal.ts`
- `src/hooks/useMagneticHover.ts`
- `src/hooks/useExpandPanel.ts`
- `src/components/ui/PillCTA.tsx`
- `src/components/ui/EyebrowLabel.tsx`
- `src/components/ui/MarqueeText.tsx`
- `src/components/ui/ExpandPanel.tsx`
- `src/components/ui/LogoCloud.tsx`
- `src/components/ui/CaseStudyCard.tsx`
- `src/components/ui/IndustryCard.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/IndustriesBand.tsx`
- `src/components/sections/PillarsIntro.tsx`
- `src/components/sections/FinalCta.tsx`

### 9.5 Assets cần chuẩn bị
- `public/video/hero-loop.mp4` — abstract liquid texture, ~5s, ≤2MB
- `public/images/industries/` — 4 cover ảnh (real-estate, billiards, ai, ecommerce), ratio 16:10, ≥1920w
- `public/logos/clients/` — logos đen monochrome PNG transparent
- `public/cases/` — case study previews

---

## 10. Accessibility & Performance

- Reduced motion: detect `prefers-reduced-motion`, skip GSAP timelines, dùng instant fade
- Color contrast: text trên đen ≥ 7:1 (WCAG AAA), trên accent ≥ 4.5:1
- Keyboard nav: tất cả PillCTA, ExpandPanel focusable, focus ring rõ ràng
- Video: muted, autoplay, có `poster`, lazy-load nếu out-of-view
- Image: Next.js `<Image>` với `priority` cho hero, lazy cho rest
- LCP target: ≤ 2.5s
- Total JS bundle (homepage): ≤ 180KB gzipped

---

## 11. Definition of "redesign done"

- [ ] DM Sans + DM Mono load qua `next/font/google`
- [ ] Lenis smooth scroll active toàn site
- [ ] Homepage có hero video + 4 industries + per-word reveal headline
- [ ] Mỗi pillar page có accent màu riêng và service grid 4-col
- [ ] Marquee + LogoCloud + ExpandPanel hoạt động mượt
- [ ] Footer 3-col + "Always with ❤️ and ☕"
- [ ] `npm run build` xanh, `tsc --noEmit` pass
- [ ] Lighthouse desktop: Performance ≥ 90, Accessibility ≥ 95
- [ ] Mobile responsive 360 → 1920px
- [ ] Vercel deploy thành công, sabo.com.vn live

---

## 13. Icon System

### 13.1 Hai nguồn icon

| Thư viện | Package | Dùng cho |
|---|---|---|
| **Lucide React** | `lucide-react` | UI / contextual icons — navigation, contact info, feature lists, status |
| **Simple Icons** | `@icons-pack/react-simple-icons` | Tech brand logos — stack badges trong hero / card |

### 13.2 Quy tắc sizing

| Context | Size | Color |
|---|---|---|
| Beside EyebrowLabel | `size={12}` | `text-paper/40` |
| Inline trong body text | `size={12}` | `text-paper/40` |
| Team location / meta | `size={11}` | `text-paper/40` |
| Stack badge (si-icons) | `size={14}` | `text-paper` |
| Feature list check | `w-3.5 h-3.5` | `text-paper` |

### 13.3 Contextual icon map

| Context | Icon (lucide) | Pattern |
|---|---|---|
| Email address | `Mail` | flex + icon + EyebrowLabel |
| Phone number | `Phone` | flex + icon + EyebrowLabel |
| Physical address | `MapPin` | flex + icon + EyebrowLabel |
| Founder / person | `User` | flex + icon + EyebrowLabel |
| Booking / calendar | `Calendar` | flex + icon + EyebrowLabel |
| Feature / outcome item | `Check` | circle badge `w-6 h-6 rounded-full border border-paper/20` |
| Location line (team card) | `MapPin` | `flex items-center gap-1.5` |

### 13.4 Stack icon map (Simple Icons)

| Tech | Import | Title |
|---|---|---|
| Flutter | `SiFlutter` | `"Flutter"` |
| Next.js | `SiNextdotjs` | `"Next.js"` |
| TypeScript | `SiTypescript` | `"TypeScript"` |
| Supabase | `SiSupabase` | `"Supabase"` |
| PostgreSQL | `SiPostgresql` | `"PostgreSQL"` |
| Python | `SiPython` | `"Python"` |
| Node.js | `SiNodedotjs` | `"Node.js"` |
| LangChain | `SiLangchain` | `"LangChain"` |
| Gemini AI | `SiGooglegemini` | `"Gemini AI"` |
| Anthropic | `SiAnthropic` | `"Anthropic"` |
| FFmpeg | `SiFfmpeg` | `"FFmpeg"` |
| Vercel | `SiVercel` | `"Vercel"` |

> ⚠️ `SiOpenai` KHÔNG tồn tại trong package — dùng `SiGooglegemini` hoặc `SiAnthropic` thay thế.

### 13.5 Pattern templates

**EyebrowLabel + icon (contact info):**
```tsx
<div className="flex items-center gap-2">
  <Mail size={12} className="text-paper/40" />
  <EyebrowLabel tone="light">EMAIL</EyebrowLabel>
</div>
```

**Stack row (hero section):**
```tsx
<div className="mt-5 pt-4 border-t border-paper/10 flex flex-wrap items-center gap-x-4 gap-y-2">
  <span className="font-mono text-xs text-paper/40 uppercase tracking-[0.12em]">Stack</span>
  <SiFlutter size={14} className="text-paper" title="Flutter" />
  <SiNextdotjs size={14} className="text-paper" title="Next.js" />
</div>
```

**Feature / outcome item:**
```tsx
<li className="flex items-start gap-5 py-6 border-b border-paper/10">
  <span className="mt-1 w-6 h-6 rounded-full border border-paper/20 grid place-items-center shrink-0">
    <Check className="w-3.5 h-3.5 text-paper" strokeWidth={2} />
  </span>
  <span className="text-body-lg text-paper/80">{item}</span>
</li>
```

**Location line (team card):**
```tsx
<div className="flex items-center gap-1.5 text-body-sm text-paper/50 font-mono">
  <MapPin size={11} className="text-paper/40 shrink-0" />
  TP. Hồ Chí Minh, Việt Nam
</div>
```

### 13.6 Quy tắc KHÔNG làm

- ❌ KHÔNG dùng icon size > 16px trong prose context — quá to, phá layout typography
- ❌ KHÔNG dùng màu sắc khác ngoài `text-paper` (full) hoặc `text-paper/40` (muted)
- ❌ KHÔNG thêm icon vào heading (`h1`, `h2`, `display-*`) — giữ typographic purity
- ❌ KHÔNG trộn Lucide và Simple Icons trong cùng 1 flex row

---

## 12. Tham chiếu

- Nguyên mẫu: https://loudsrl.com/
- Pages đã phân tích: `/`, `/pillars/think`, `/manifesto`
- Fonts: DM Sans, DM Mono (Google Fonts)
- CSS framework discovered: Tailwind v4 (LOUD dùng v4, mình giữ v3 để tương thích Next 14)
- Animation lib: GSAP + Lenis (LOUD dùng nguyên bộ này)

---

**Bước tiếp theo sau khi user approve Design.md**:
1. Cài deps: `gsap @studio-freight/lenis split-type`
2. Cập nhật `tailwind.config.ts` với tokens mới (ink, paper, accents, fonts)
3. Refactor `globals.css` (xoá v1 utilities, thêm Lenis CSS, font CSS vars)
4. Viết hooks (`useWordReveal`, `useLetterReveal`, `useMagneticHover`, `useExpandPanel`)
5. Build UI primitives (`PillCTA`, `EyebrowLabel`, `MarqueeText`, …)
6. Rewrite homepage `page.tsx` từ đầu theo spec 8.1
7. Build pillar pages `/thinking`, `/design`, `/build`
8. Build `/manifesto`
9. Update Header + Footer
10. Test build → deploy Vercel
