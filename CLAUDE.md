# CLAUDE.md — SABO M&T Website

> Đọc file này trước khi làm bất cứ thứ gì trong repo này.

## Step 0: Cross-project task → đọc ECOSYSTEM_CONTRACTS trước
Nếu task liên quan domain, SSO, showcase.json, hay Supabase shared:
**Đọc `D:\0.PROJECTS\02-SABO-ECOSYSTEM\ECOSYSTEM_CONTRACTS.md` TRƯỚC KHI làm bất cứ thứ gì.**
Sau khi làm xong, update file đó nếu interface thay đổi.

## Step 1: Đọc AGENTS.md
[AGENTS.md](AGENTS.md) là canonical spec cho project này. Bắt buộc đọc trước khi sửa code.

## Step 2: Bắt buộc update DEVLOG.md cuối session
**Không có ngoại lệ.** Dù thay đổi nhỏ hay lớn, session kết thúc = có DEVLOG entry.

### Quy tắc DEVLOG
- **Prepend** — entry mới đặt ở **ĐẦU FILE** (dưới dòng `# DEVLOG`), không append xuống đáy
- **Session number** — đọc số session cao nhất hiện tại, cộng thêm 1
- **Format chuẩn:**

```markdown
## Session N — YYYY-MM-DD (mô tả ngắn)

**Trigger:** [user yêu cầu gì]

### Delivered
- **`path/to/file.tsx`** — [thay đổi gì, tại sao]

### Verification
- `npx tsc --noEmit` ✅ / ❌
- `npm run build` ✅ / ❌
- `npm run design-check` ✅ / ❌

### Pending
- ⏳ [việc chưa xong]
```

## Step 3: Verify trước khi declare done
```bash
npx tsc --noEmit    # must exit 0
npm run build       # must exit 0
npm run design-check # must exit 0
```

## Stack nhanh
Next.js 14 App Router · TypeScript strict · Tailwind 3 · Supabase · Vercel deploy
