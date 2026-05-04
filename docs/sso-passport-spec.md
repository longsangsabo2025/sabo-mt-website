# SSO Passport Specification — Bet #1

> **Status**: Design spec — ready for implementation
> **Created**: 2026-05-01
> **Owner**: sabo-mt-website agent
> **Target**: Unified authentication portal for SABO ecosystem

---

## 1. Vision & Goals

### Mission Statement
Build the **"Microsoft Account for SABO ecosystem"** — one login at `sabo.com.vn/portal` grants access to all SABO products with role-based routing and zero friction.

### Primary Goals
1. **Single Sign-On**: User logs in once → seamlessly redirected to the correct product
2. **Role-based Routing**: Each role sees only what they need (CEO → dashboard, Staff → mobile app)
3. **Zero Training**: No onboarding docs needed — login = automatic redirect to the right place
4. **Security-first**: PKCE flow, token rotation, CSRF protection, domain whitelist

### Success Metrics
- Login success rate > 99.5%
- Time-to-redirect < 2s (after credentials submitted)
- Zero manual "where do I go?" support tickets
- Zero cross-product session conflicts

---

## 2. Products in Scope

From `ECOSYSTEM_CONTRACTS.md` + ecosystem audit:

| Product | Domain | Current Auth | SSO Integration Status |
| --- | --- | --- | --- |
| **SaboHub Web** | `hub.sabo.com.vn` | Supabase `dqddxowyikefqcdiioyh` | ✅ **Already integrated** — receives tokens via URL fragment |
| **SaboHub Mobile** | iOS + Android | Supabase `dqddxowyikefqcdiioyh` | ⏳ **Planned** — OpenInWebFab opens hub in browser |
| **SABO Arena Web** | `saboarena.com` | Supabase `mogjjvscxjwvhtpkrlqr` | ❌ **Not integrated** — separate auth |
| **SABO Arena App** | iOS + Android | None (no auth yet) | ❌ **Not applicable** — no user accounts |
| **SABO Billiards Elite** | Internal + App | Supabase `cmdsxcdoaqqhkpkigxlu` | ❌ **Not integrated** — separate auth |
| **SABO M&T Website** | `sabo.com.vn` | N/A (marketing site) | ✅ **Portal host** |

### Expansion Path
- **Phase 1** (current): SaboHub only (already working)
- **Phase 2**: SABO Arena Web, Billiards Elite (requires cross-Supabase token trust)
- **Phase 3**: New products auto-register via `/api/sso/register-app` endpoint

---

## 3. Auth Strategy — Decision Document

### Core Decision: Use SaboHub Supabase as **Auth Master**

**Chosen**: Supabase project `dqddxowyikefqcdiioyh` (SaboHub)

**Rationale**:
1. **Already operational**: `sabo.com.vn/portal` already uses this for login → SaboHub SSO
2. **Role system in place**: `user_metadata.role` with 9 roles (CEO, Manager, Staff, ShiftLeader, etc.)
3. **Company multi-tenancy**: RLS-based company isolation already proven
4. **Business-critical**: SaboHub is the revenue-generating core; Arena/Billiards are secondary

**Alternatives Rejected**:
- ❌ **New dedicated Supabase project for SSO only**: Adds complexity, splits user tables, requires 2-step migration
- ❌ **Use `ffouuqklkoszpdaelowr` (sabo-mt-website)**: That's for marketing leads only, not business users
- ❌ **Third-party (Auth0, Clerk)**: Vendor lock-in, monthly cost, overkill for 5 products

### Cross-Supabase Token Sharing

**Problem**: SABO Arena (`mogjjvscxjwvhtpkrlqr`) and Billiards Elite (`cmdsxcdoaqqhkpkigxlu`) use separate Supabase projects.

**Solution — JWT Verification Layer**:

```typescript
// In Arena/Billiards: verify token issued by SaboHub Supabase
import { createClient } from '@supabase/supabase-js';

const MASTER_SUPABASE_URL = 'https://dqddxowyikefqcdiioyh.supabase.co';
const MASTER_JWT_SECRET = process.env.SABOHUB_JWT_SECRET!; // from Supabase dashboard

async function verifyMasterToken(accessToken: string) {
  // Decode JWT, verify signature against MASTER_JWT_SECRET
  const payload = jwt.verify(accessToken, MASTER_JWT_SECRET);
  // Check expiry, aud, iss
  return payload; // { sub: user_id, email, role, ... }
}

// On Arena/Billiards SSO receiver page:
const masterToken = fragmentParams.get('access_token');
const payload = await verifyMasterToken(masterToken);
// Create a local session (or mirror user into local Supabase)
```

**Migration requirement**: Each product needs:
1. `SABOHUB_JWT_SECRET` env var (from SaboHub Supabase Settings → API → JWT Secret)
2. `/auth/sso` receiver page that decodes + verifies master token
3. Optional: mirror user row into local `auth.users` (or keep stateless)

---

## 4. Role → Product Routing Table

Based on `user_metadata.role` in SaboHub Supabase:

| Role | `user_metadata.role` | Target Product | Redirect URL | Platform |
| --- | --- | --- | --- | --- |
| **CEO** | `ceo` | SaboHub Web | `hub.sabo.com.vn/dashboard` | Web |
| **Manager** | `manager` | SaboHub Web | `hub.sabo.com.vn/dashboard` | Web |
| **Finance** | `finance` | SaboHub Web | `hub.sabo.com.vn/finance` | Web |
| **Sales** | `sales` | SaboHub Web | `hub.sabo.com.vn/sales` | Web |
| **Driver** | `driver` | SaboHub Web | `hub.sabo.com.vn/driver` | Web |
| **Shift Leader** | `shift_leader` | SaboHub Mobile | (opens mobile app via deep link) | Mobile |
| **Staff** | `staff` | SaboHub Mobile | (opens mobile app via deep link) | Mobile |
| **Warehouse** | `warehouse` | SaboHub Web | `hub.sabo.com.vn/warehouse` | Web |
| **QC** | `qc` | SaboHub Web | `hub.sabo.com.vn/qc` | Web |

**Special cases**:
- **No role set** (null): Default to `hub.sabo.com.vn/dashboard` (assume CEO/Manager)
- **Arena-specific roles** (future): `arena_admin`, `arena_staff` → `saboarena.com/admin`
- **Billiards-specific roles** (future): `billiards_manager`, `billiards_cashier` → internal URL

**Mobile-only role handling**:
- Portal page detects `STAFF_ROLES = ['staff', 'shift_leader', 'shiftleader']`
- Shows "TRUY CẬP BẰNG APP" UI with App Store / Google Play links
- Does NOT show "VÀO SABOHUB DASHBOARD →" button

---

## 5. Implementation Plan — 3 Phases

### Phase 1: Portal Enhancement (Week 1)
**Goal**: Expand current portal to handle all SaboHub roles elegantly.

**Tasks**:
- [x] `src/app/portal/page.tsx` — already working for CEO/Manager
- [ ] Add role-based routing logic (currently hardcoded to `/dashboard`)
- [ ] Add "Chọn công ty" dropdown if user is multi-company CEO
- [ ] Improve mobile-only role UI (App Store / Google Play QR codes)
- [ ] Add "Quên mật khẩu?" flow (Supabase password reset)
- [ ] Add session timeout warning (15min idle → auto-logout)

**Acceptance criteria**:
- CEO login → `hub.sabo.com.vn/dashboard` ✅
- Finance login → `hub.sabo.com.vn/finance` ✅
- Staff login → shows mobile app prompt ✅
- Multi-company CEO → company selector before redirect ✅

---

### Phase 2: Cross-App Token Trust (Week 2-3)
**Goal**: Arena, Billiards Elite accept master tokens from SaboHub Supabase.

#### 2.1. Token Verification Library
Create `@sabo/sso-verify` npm package (or monorepo package):

```typescript
// packages/sso-verify/src/index.ts
import jwt from 'jsonwebtoken';

export interface SaboSsoPayload {
  sub: string; // user_id
  email: string;
  role: string;
  company_id?: string;
  aud: string;
  exp: number;
  iat: number;
}

export function verifySaboToken(
  accessToken: string,
  jwtSecret: string,
): SaboSsoPayload {
  return jwt.verify(accessToken, jwtSecret, {
    algorithms: ['HS256'],
    audience: 'authenticated',
  }) as SaboSsoPayload;
}
```

#### 2.2. SABO Arena Integration
**File**: `sabo-arena/src/app/auth/sso/page.tsx` (new)

```typescript
'use client';
import { useEffect } from 'react';
import { verifySaboToken } from '@sabo/sso-verify';

export default function ArenaSSO() {
  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const token = fragment.get('access_token');
    if (!token) { window.location.href = '/login'; return; }

    const payload = verifySaboToken(token, process.env.NEXT_PUBLIC_SABOHUB_JWT_SECRET!);
    // Option A: Mirror user into Arena Supabase
    // Option B: Keep stateless, store token in localStorage
    localStorage.setItem('sabo_sso_token', token);
    window.location.href = '/admin'; // Arena admin dashboard
  }, []);

  return <div>Đang xác thực...</div>;
}
```

**Routing change**: Portal adds Arena option for `arena_admin` role:
```typescript
if (role === 'arena_admin') {
  window.location.href = `https://saboarena.com/auth/sso#access_token=${access_token}&refresh_token=${refresh_token}`;
}
```

#### 2.3. Billiards Elite Integration
Same pattern, but for `billiards_manager`, `billiards_cashier` roles.

**Acceptance criteria**:
- User with `arena_admin` role logs in → lands on Arena admin dashboard ✅
- Token verified without calling SaboHub API (JWT signature check only) ✅
- Token expiry respected (15min, then refresh token used) ✅

---

### Phase 3: Unified Profile & Settings (Week 4)
**Goal**: One account page across all products.

#### 3.1. Centralized Profile API
**Endpoint**: `https://sabo.com.vn/api/sso/v1/profile`

```typescript
// GET /api/sso/v1/profile
// Headers: Authorization: Bearer <access_token>
{
  "user_id": "uuid",
  "email": "user@example.com",
  "role": "ceo",
  "company": {
    "id": "uuid",
    "name": "SABO Distribution"
  },
  "avatar_url": "https://...",
  "display_name": "Nguyễn Văn A",
  "created_at": "2025-01-01T00:00:00Z"
}
```

#### 3.2. Unified Settings Page
**URL**: `https://sabo.com.vn/portal/settings`

Settings stored in SaboHub Supabase `user_preferences` table:
```sql
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  language TEXT DEFAULT 'vi',
  theme TEXT DEFAULT 'dark',
  notifications_email BOOLEAN DEFAULT TRUE,
  notifications_sms BOOLEAN DEFAULT FALSE,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Sync mechanism**: Each product polls `GET /api/sso/v1/profile` on mount → applies settings.

**Acceptance criteria**:
- User changes language in SaboHub → Arena also switches to that language ✅
- User enables 2FA in Portal → all products require 2FA ✅
- Settings update reflected < 30s across all open tabs ✅

---

## 6. API Contracts

### 6.1. Auth Session Check
```
GET /api/auth/session
Headers: Cookie (session cookie from Supabase)

Response 200:
{
  "authenticated": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "ceo"
  },
  "redirect_url": "https://hub.sabo.com.vn/dashboard"
}

Response 401:
{
  "authenticated": false,
  "redirect_url": "https://sabo.com.vn/portal"
}
```

### 6.2. Logout (Global)
```
POST /api/auth/logout
Headers: Authorization: Bearer <access_token>

Response 200:
{
  "success": true,
  "message": "Logged out from all devices"
}
```

**Implementation**: Calls `supabase.auth.signOut({ scope: 'global' })` — invalidates refresh token.

### 6.3. App Registration (Phase 3)
```
POST /api/sso/register-app
Headers: Authorization: Bearer <admin_token>

Body:
{
  "app_slug": "sabo-new-product",
  "app_name": "SABO New Product",
  "redirect_url": "https://newproduct.sabo.com.vn/auth/sso",
  "allowed_roles": ["ceo", "manager", "custom_role"]
}

Response 201:
{
  "app_id": "uuid",
  "client_secret": "secret_xxx"
}
```

Stored in SaboHub Supabase `sso_apps` table:
```sql
CREATE TABLE sso_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  redirect_url TEXT NOT NULL,
  allowed_roles TEXT[] NOT NULL,
  client_secret TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 7. Security Considerations

### 7.1. PKCE Flow (OAuth 2.0)
- Portal generates `code_verifier` (random 128-char string)
- Sends `code_challenge = SHA256(code_verifier)` to Supabase
- Supabase returns authorization code → Portal exchanges with `code_verifier`
- Prevents interception attacks

**Implementation**: Supabase Auth already supports PKCE via `signInWithOAuth({ flowType: 'pkce' })`.

### 7.2. Refresh Token Rotation
- Every `access_token` refresh → new `refresh_token` issued
- Old `refresh_token` immediately invalidated
- Prevents replay attacks

**Implementation**: Enabled by default in Supabase (Reuse Interval = 0s).

### 7.3. CSRF Protection
- Portal sets `SameSite=Lax` on session cookies
- All state-changing endpoints require CSRF token in `X-CSRF-Token` header
- Token stored in `<meta name="csrf-token">` tag

**Implementation**: Next.js middleware checks CSRF on POST/PUT/DELETE.

### 7.4. Domain Whitelist
Redirect URLs must match allowlist:
```typescript
const ALLOWED_REDIRECT_DOMAINS = [
  'hub.sabo.com.vn',
  'saboarena.com',
  'sabo.com.vn',
  // Internal for dev:
  'localhost:3000',
  'localhost:5173',
];

function isValidRedirect(url: string): boolean {
  const parsed = new URL(url);
  return ALLOWED_REDIRECT_DOMAINS.includes(parsed.hostname);
}
```

Prevents open redirect vulnerability.

### 7.5. Rate Limiting
- Login endpoint: 5 attempts / 15min / IP
- Password reset: 3 requests / hour / email
- SSO token exchange: 10 requests / min / user

**Implementation**: Upstash Redis rate limiter via Next.js middleware.

---

## 8. Migration Path & Backward Compatibility

### Current State (Pre-SSO Passport)
- SaboHub users: log in at `hub.sabo.com.vn/login` → full access
- Arena users: log in at `saboarena.com/login` → separate account
- No cross-product session

### Phase 1 Migration (Portal-only, no breaking change)
- Existing SaboHub login still works at `hub.sabo.com.vn/login`
- New flow: Users CAN also log in at `sabo.com.vn/portal` → auto-redirect
- **Zero disruption**: Both entry points work

### Phase 2 Migration (Cross-app trust)
- Arena users: Admin creates Arena account in SaboHub Supabase with `arena_admin` role
- Old Arena login deprecated → redirects to `sabo.com.vn/portal`
- **Grace period**: 30 days overlap where both logins work

### Phase 3 Migration (Unified settings)
- Auto-migrate existing user preferences from SaboHub `settings` JSON column → new `user_preferences` table
- **No user action required**

---

## 9. Known Gaps & Open Questions

### Gaps in ECOSYSTEM_CONTRACTS.md
- ❌ **JWT secrets not documented**: Each Supabase project's JWT secret needs to be in central keystore
- ❌ **Role enum not centralized**: `user_metadata.role` values scattered across projects
- ❌ **Mobile deep link URLs**: `sabohub://` scheme not documented

**Action**: After Phase 1, update ECOSYSTEM_CONTRACTS.md section 3 (SSO CONTRACT) with:
- JWT secret env var names (`SABOHUB_JWT_SECRET`, `ARENA_JWT_SECRET`, etc.)
- Central role enum table
- Deep link scheme registry

### Open Technical Questions
1. **Refresh token storage in Arena/Billiards**: LocalStorage (XSS risk) vs httpOnly cookie (CORS complexity)?
   - **Recommendation**: Use httpOnly cookie for Arena, set via `/api/auth/set-session` endpoint
2. **Multi-company CEO selector**: Before redirect or after landing on Hub?
   - **Recommendation**: After landing (Hub has full company list + permissions logic)
3. **Session timeout sync**: If user logs out in Hub, should Portal also log out?
   - **Recommendation**: Yes — implement `BroadcastChannel('sabo_sso_logout')` for cross-tab logout

### Business Questions (Non-blocking)
- **Billing implication**: If Arena uses SaboHub auth, does that count toward SaboHub MAU pricing? (Supabase charges per MAU)
- **User support**: Who handles password reset support tickets — SaboHub team or central SABO support?
- **Data privacy**: Arena users see SaboHub branding during login — is that acceptable to Arena customers?

---

## 10. Recommended Next Actions

### For Session executing Phase 1
1. Read `src/app/portal/page.tsx` (current implementation)
2. Add role-to-URL mapping logic (switch statement on `role`)
3. Add company selector for multi-company CEOs (fetch from `/api/companies`)
4. Improve mobile-only role UI (add QR codes, app links)
5. Add password reset flow (`supabase.auth.resetPasswordForEmail()`)
6. Test with all 9 roles (CEO, Manager, Finance, Sales, Driver, ShiftLeader, Staff, Warehouse, QC)
7. Update DEVLOG.md with Phase 1 completion

### For Session executing Phase 2
1. Create `@sabo/sso-verify` package (or copy token verify logic into each project)
2. Add `SABOHUB_JWT_SECRET` to Arena + Billiards Elite `.env.example`
3. Create `/auth/sso/page.tsx` in Arena repo
4. Update Portal to add Arena redirect for `arena_admin` role
5. Test end-to-end: Portal login as arena_admin → lands on Arena admin dashboard
6. Update ECOSYSTEM_CONTRACTS.md with JWT secret env vars
7. Update DEVLOG.md with Phase 2 completion

### For Session executing Phase 3
1. Design `user_preferences` table schema in SaboHub Supabase
2. Create `/api/sso/v1/profile` endpoint
3. Create `sabo.com.vn/portal/settings` page
4. Add polling logic in Arena/Hub to fetch profile on mount
5. Implement `BroadcastChannel` logout sync
6. Test cross-product settings sync (language change, 2FA enable)
7. Update DEVLOG.md with Phase 3 completion

---

## 11. Appendix: File Paths Reference

| File | Purpose | Project |
| --- | --- | --- |
| `src/app/portal/page.tsx` | SSO login entry point | sabo-mt-website |
| `src/pages/auth/SsoPage.tsx` | SSO receiver (setSession + route) | sabohub-web |
| `lib/shared/widgets/open_in_web_fab.dart` | Mobile → Web FAB | sabohub-app |
| `src/app/auth/sso/page.tsx` | Arena SSO receiver (Phase 2) | sabo-arena |
| `D:\0.PROJECTS\02-SABO-ECOSYSTEM\ECOSYSTEM_CONTRACTS.md` | Cross-project source of truth | ecosystem-wide |

---

**End of SSO Passport Specification**
