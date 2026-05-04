'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { User, Session } from '@supabase/supabase-js';
import { resolveHubUrl } from '@/lib/hub-url';

const sabohubDefaultSupabaseUrl = 'https://dqddxowyikefqcdiioyh.supabase.co';
const supabaseUrl = process.env.NEXT_PUBLIC_SABOHUB_SUPABASE_URL ?? sabohubDefaultSupabaseUrl;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SABOHUB_SUPABASE_ANON_KEY!;

// True singleton — chỉ khởi tạo 1 lần duy nhất
let supabaseInstance: ReturnType<typeof createClient> | null | undefined = undefined;

function getSupabase() {
  if (supabaseInstance !== undefined) return supabaseInstance;
  if (!supabaseAnonKey) {
    supabaseInstance = null;
    return null;
  }
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}

const STAFF_ROLES = ['staff', 'shift_leader', 'shiftleader'];

function isWebRole(role: string | undefined): boolean {
  if (!role) return true; // CEO mặc định
  return !STAFF_ROLES.includes(role.toLowerCase());
}

export default function PortalPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  const supabase = getSupabase();
  const hubUrl = resolveHubUrl();

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_e: string, s: Session | null) => { setSession(s); }
    );
    return () => subscription.unsubscribe();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setSigningIn(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError(err.message);
    setSigningIn(false);
  }

  function handleOpenHub() {
    if (!session) return;
    const { access_token, refresh_token } = session;
    // Dùng URL fragment (#) — không bị ghi vào server logs
    window.location.href =
      `${hubUrl}/auth/sso#access_token=${access_token}&refresh_token=${refresh_token}`;
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  }

  if (!supabaseAnonKey) {
    return (
      <main className="min-h-screen bg-ink flex items-center justify-center">
        <p className="text-paper/40 font-mono text-eyebrow">
          Thiếu NEXT_PUBLIC_SABOHUB_SUPABASE_ANON_KEY trong .env.local.
        </p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-ink flex items-center justify-center">
        <p className="text-paper/40 font-mono text-eyebrow animate-pulse">Đang tải...</p>
      </main>
    );
  }

  // --- Đã đăng nhập ---
  if (session) {
    const role = session.user.user_metadata?.role as string | undefined;
    const isMobileOnlyRole = !isWebRole(role);

    return (
      <main className="min-h-screen bg-ink flex items-center justify-center px-6">
        <div className="w-full max-w-md space-y-8">
          <div>
            <p className="font-mono text-eyebrow text-paper/40 mb-2">SABO ID</p>
            <h1 className="font-serif text-display-2 text-paper leading-none">
              Xin chào.
            </h1>
            <p className="mt-3 text-body-md text-paper/60">
              {session.user.email}
              {role && (
                <span className="ml-2 font-mono text-caption text-paper/40 uppercase">
                  [{role}]
                </span>
              )}
            </p>
          </div>

          <div className="space-y-3">
            {isMobileOnlyRole ? (
              <div className="border border-white/10 rounded-none p-6 space-y-3">
                <p className="font-mono text-eyebrow text-paper/40">TRUY CẬP BẰNG APP</p>
                <p className="text-body-sm text-paper/60">
                  Vai trò của bạn sử dụng mobile app. Tải về iOS hoặc Android để tiếp tục.
                </p>
                <p className="font-mono text-caption text-paper/30 pt-2">
                  App đang phát triển — sẽ ra mắt sớm.
                </p>
              </div>
            ) : (
              <button
                onClick={handleOpenHub}
                className="w-full bg-paper text-ink font-mono text-eyebrow py-4 hover:bg-paper/90 transition-colors"
              >
                VÀO SABOHUB DASHBOARD →
              </button>
            )}

            <button
              onClick={handleSignOut}
              className="w-full border border-white/10 text-paper/40 font-mono text-caption py-3 hover:border-white/30 hover:text-paper/60 transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </main>
    );
  }

  // --- Chưa đăng nhập ---
  return (
    <main className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        <div>
          <p className="font-mono text-eyebrow text-paper/40 mb-2">SABO ID</p>
          <h1 className="font-serif text-display-2 text-paper leading-none">
            Đăng nhập bằng SABO ID.
          </h1>
          <p className="mt-3 text-body-md text-paper/60">
            Một tài khoản cho toàn bộ hệ sinh thái SABO.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="font-mono text-caption text-paper/40 uppercase block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border border-white/20 text-paper px-4 py-3 font-sans text-body-sm focus:outline-none focus:border-white/60 transition-colors"
              placeholder="ten@congty.com"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-caption text-paper/40 uppercase block">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border border-white/20 text-paper px-4 py-3 font-sans text-body-sm focus:outline-none focus:border-white/60 transition-colors"
            />
          </div>

          {error && (
            <p className="font-mono text-caption text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={signingIn}
            className="w-full bg-paper text-ink font-mono text-eyebrow py-4 hover:bg-paper/90 disabled:opacity-40 transition-colors"
          >
            {signingIn ? 'ĐANG XÁC THỰC...' : 'TIẾP TỤC VỚI SABO ID →'}
          </button>

          <p className="pt-2 text-body-sm text-paper/60">
            Chưa có SABO ID?{' '}
            <a
              href={`${hubUrl}/auth/signup`}
              className="font-mono text-caption uppercase tracking-[0.12em] text-paper/80 hover:text-paper transition-colors"
            >
              Đăng ký tài khoản →
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
