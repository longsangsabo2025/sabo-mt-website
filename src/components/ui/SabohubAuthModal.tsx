'use client';

import { useEffect, useState } from 'react';
import { Apple, Loader2, X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import type { Session } from '@supabase/supabase-js';
import { createPortal } from 'react-dom';
import useModalAnimation from '@/hooks/useModalAnimation';
import { resolveHubUrl } from '@/lib/hub-url';

type Locale = 'vi' | 'en';
type Mode = 'login' | 'signup';

interface SabohubAuthModalProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}

const sabohubDefaultSupabaseUrl = 'https://dqddxowyikefqcdiioyh.supabase.co';
const supabaseUrl = process.env.NEXT_PUBLIC_SABOHUB_SUPABASE_URL ?? sabohubDefaultSupabaseUrl;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SABOHUB_SUPABASE_ANON_KEY!;

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
  if (!role) return true;
  return !STAFF_ROLES.includes(role.toLowerCase());
}

const COPY = {
  vi: {
    title: 'Vào SABOHUB',
    subtitle: 'Đăng nhập hoặc đăng ký để bắt đầu làm việc trong Workspace SABOHUB.',
    orContinueWith: 'Hoặc tiếp tục với',
    continueWithGoogle: 'Google',
    continueWithApple: 'Apple',
    loginTab: 'Đăng nhập',
    signupTab: 'Đăng ký',
    email: 'Email',
    password: 'Mật khẩu',
    loginButton: 'Đăng nhập với SABO ID',
    signupButton: 'Tạo tài khoản SABO ID',
    switchToSignup: 'Chưa có tài khoản? Đăng ký',
    switchToLogin: 'Đã có tài khoản? Đăng nhập',
    setupMissing: 'Thiếu NEXT_PUBLIC_SABOHUB_SUPABASE_ANON_KEY trong .env.local.',
    loading: 'Đang tải...',
    welcome: 'Xin chào',
    mobileRoleNote: 'Vai trò của bạn dùng mobile app. Vui lòng dùng ứng dụng iOS/Android để tiếp tục.',
    openDashboard: 'Vào SABOHUB dashboard',
    signOut: 'Đăng xuất',
    close: 'Đóng',
    signupSuccess: 'Đăng ký thành công. Hãy kiểm tra email để xác thực trước khi đăng nhập.',
  },
  en: {
    title: 'Access SABOHUB',
    subtitle: 'Sign in or create an account to start working in the SABOHUB workspace.',
    orContinueWith: 'Or continue with',
    continueWithGoogle: 'Google',
    continueWithApple: 'Apple',
    loginTab: 'Sign in',
    signupTab: 'Sign up',
    email: 'Email',
    password: 'Password',
    loginButton: 'Continue with SABO ID',
    signupButton: 'Create SABO ID account',
    switchToSignup: 'No account yet? Sign up',
    switchToLogin: 'Already have an account? Sign in',
    setupMissing: 'Missing NEXT_PUBLIC_SABOHUB_SUPABASE_ANON_KEY in .env.local.',
    loading: 'Loading...',
    welcome: 'Welcome',
    mobileRoleNote: 'Your role is mobile-only. Please use the iOS/Android app to continue.',
    openDashboard: 'Enter SABOHUB dashboard',
    signOut: 'Sign out',
    close: 'Close',
    signupSuccess: 'Sign up successful. Please verify your email before signing in.',
  },
} as const;

export function SabohubAuthModal({ open, onClose, locale }: SabohubAuthModalProps) {
  const [mode, setMode] = useState<Mode>('login');
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [mounted, setMounted] = useState(false);
  const [oauthProvider, setOauthProvider] = useState<'google' | 'apple' | null>(null);

  const supabase = getSupabase();
  const hubUrl = resolveHubUrl();
  const t = COPY[locale];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    if (!supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);

    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: string, nextSession: Session | null) => {
        setSession(nextSession);
      }
    );

    return () => subscription.unsubscribe();
  }, [open, supabase]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    setError('');
    setNotice('');
    setMode('login');
  }, [open]);

  const [overlayRef, contentRef] = useModalAnimation({ open });

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase) return;

    setSubmitting(true);
    setError('');
    setNotice('');

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
    }

    setSubmitting(false);
  }

  async function handleSignup(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase) return;

    setSubmitting(true);
    setError('');
    setNotice('');

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      setError(signupError.message);
      setSubmitting(false);
      return;
    }

    if (data.session) {
      setSession(data.session);
    } else {
      setNotice(t.signupSuccess);
      setMode('login');
    }

    setSubmitting(false);
  }

  async function handleOAuth(provider: 'google' | 'apple') {
    if (!supabase) return;

    setError('');
    setNotice('');
    setOauthProvider(provider);

    const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.href,
        skipBrowserRedirect: true,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
      setOauthProvider(null);
      return;
    }

    if (!data?.url) {
      setError('Không thể khởi tạo đăng nhập mạng xã hội. Vui lòng thử lại sau.');
      setOauthProvider(null);
      return;
    }

    window.location.href = data.url;
  }

  function handleOpenHub() {
    if (!session) return;
    const { access_token, refresh_token } = session;
    window.location.href = `${hubUrl}/auth/sso#access_token=${access_token}&refresh_token=${refresh_token}`;
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  }

  if (!open || !mounted) return null;

  const role = session?.user.user_metadata?.role as string | undefined;
  const isMobileOnlyRole = session ? !isWebRole(role) : false;

  return createPortal(
    <div ref={overlayRef} className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label={t.title}>
      <button
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-label={t.close}
      />

      <div ref={contentRef} className="absolute left-1/2 top-1/2 w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 border border-paper/15 bg-ink p-6 shadow-2xl md:w-[calc(100%-4rem)] md:p-10 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute right-4 top-4 p-1 text-paper/60 transition-colors hover:text-paper"
          onClick={onClose}
          aria-label={t.close}
        >
          <X className="h-5 w-5" strokeWidth={1.75} />
        </button>

        <div className="mb-6 pr-8 md:mb-8">
          <p className="font-mono text-eyebrow text-paper/40">SABO ID</p>
          <h2 className="mt-2 font-serif text-display-2 text-paper leading-none">{t.title}.</h2>
          <p className="mt-3 max-w-2xl text-body-md text-paper/60">{t.subtitle}</p>
        </div>

        {!supabaseAnonKey ? (
          <p className="font-mono text-caption text-paper/50">{t.setupMissing}</p>
        ) : loading ? (
          <p className="font-mono text-caption text-paper/50">{t.loading}</p>
        ) : session ? (
          <div className="space-y-4">
            <p className="text-body-sm text-paper/70">
              {t.welcome}: {session.user.email}
              {role ? (
                <span className="ml-2 font-mono text-caption uppercase text-paper/40">[{role}]</span>
              ) : null}
            </p>

            {isMobileOnlyRole ? (
              <p className="border border-paper/10 p-4 text-body-sm text-paper/60">{t.mobileRoleNote}</p>
            ) : (
              <button
                type="button"
                onClick={handleOpenHub}
                className="w-full bg-paper py-3 font-mono text-eyebrow text-ink transition-colors hover:bg-paper-soft"
              >
                {t.openDashboard} →
              </button>
            )}

            <button
              type="button"
              onClick={handleSignOut}
              className="w-full border border-paper/20 py-3 font-mono text-caption uppercase text-paper/60 transition-colors hover:border-paper/40 hover:text-paper"
            >
              {t.signOut}
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 grid grid-cols-2 border border-paper/10 p-1">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={mode === 'login'
                  ? 'bg-paper py-2 font-mono text-caption uppercase text-ink transition-colors'
                  : 'py-2 font-mono text-caption uppercase text-paper/60 transition-colors hover:text-paper'}
              >
                {t.loginTab}
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={mode === 'signup'
                  ? 'bg-paper py-2 font-mono text-caption uppercase text-ink transition-colors'
                  : 'py-2 font-mono text-caption uppercase text-paper/60 transition-colors hover:text-paper'}
              >
                {t.signupTab}
              </button>
            </div>

            <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-5">
              <div className="space-y-1">
                <label className="block font-mono text-caption uppercase text-paper/40">{t.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full border border-paper/20 bg-transparent px-4 py-3 font-sans text-body-sm text-paper transition-colors focus:border-paper/60 focus:outline-none"
                  placeholder="name@company.com"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-caption uppercase text-paper/40">{t.password}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={6}
                  className="w-full border border-paper/20 bg-transparent px-4 py-3 font-sans text-body-sm text-paper transition-colors focus:border-paper/60 focus:outline-none"
                />
              </div>

              {error ? <p className="font-mono text-caption text-red-400">{error}</p> : null}
              {notice ? <p className="font-mono text-caption text-paper/60">{notice}</p> : null}

              <button
                type="submit"
                disabled={submitting || !!oauthProvider}
                className="w-full bg-paper py-3 font-mono text-eyebrow text-ink transition-colors hover:bg-paper-soft disabled:opacity-50"
              >
                {submitting ? `${mode === 'login' ? t.loginTab : t.signupTab}...` : mode === 'login' ? `${t.loginButton} →` : `${t.signupButton} →`}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-paper/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-ink px-3 font-mono tracking-[0.12em] text-paper/45">{t.orContinueWith}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOAuth('google')}
                  disabled={submitting || !!oauthProvider}
                  className="inline-flex items-center justify-center gap-2 border border-paper/20 bg-transparent px-3 py-3 font-mono text-caption uppercase text-paper/85 transition-colors hover:bg-paper/10 disabled:opacity-50"
                >
                  {oauthProvider === 'google' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  )}
                  {t.continueWithGoogle}
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuth('apple')}
                  disabled={submitting || !!oauthProvider}
                  className="inline-flex items-center justify-center gap-2 border border-paper/20 bg-transparent px-3 py-3 font-mono text-caption uppercase text-paper/85 transition-colors hover:bg-paper/10 disabled:opacity-50"
                >
                  {oauthProvider === 'apple' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Apple className="h-4 w-4" />}
                  {t.continueWithApple}
                </button>
              </div>

              <button
                type="button"
                className="w-full text-left font-mono text-caption uppercase text-paper/60 transition-colors hover:text-paper"
                disabled={!!oauthProvider}
                onClick={() => setMode((current) => (current === 'login' ? 'signup' : 'login'))}
              >
                {mode === 'login' ? t.switchToSignup : t.switchToLogin}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
