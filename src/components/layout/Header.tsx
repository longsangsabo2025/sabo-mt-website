'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Monitor, Phone, LogIn } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/cn';
import { PillCTA } from '@/components/ui/PillCTA';
import { SabohubAuthModal } from '@/components/ui/SabohubAuthModal';

const NAV_VI = [
  { href: '/services', label: 'Dịch vụ' },
  { href: '/case-studies', label: 'Case studies' },
  { href: '/industries', label: 'Lĩnh vực' },
  { href: '/about', label: 'Về chúng tôi' }
];

const NAV_EN = [
  { href: '/en/services', label: 'Services' },
  { href: '/en/case-studies', label: 'Case studies' },
  { href: '/en/industries', label: 'Industries' },
  { href: '/en/about', label: 'About' }
];

function isEnPath(p: string | null) {
  return !!p && (p === '/en' || p.startsWith('/en/'));
}

function mirrorPath(p: string, target: 'vi' | 'en'): string {
  if (target === 'en') {
    if (isEnPath(p)) return p;
    return p === '/' ? '/en' : `/en${p}`;
  }
  if (!isEnPath(p)) return p;
  if (p === '/en') return '/';
  return p.replace(/^\/en/, '');
}

export function Header() {
  const pathname = usePathname();
  const en = isEnPath(pathname);
  const NAV = en ? NAV_EN : NAV_VI;
  const portalLabel = 'Access SABOHUB';
  const portalHref = '/portal';
  const contactHref = en ? '/en/contact' : '/contact';
  const contactLabel = en ? 'Contact' : 'Liên hệ';
  const [open, setOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  const handleOpenPortalModal = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setAuthModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 bg-ink/80 backdrop-blur-md border-b border-paper/10">
      <div className="container-page h-16 md:h-18 flex items-center justify-between">
        <Link href={en ? '/en' : '/'} aria-label="SABO Media & Technology" className="flex items-center gap-2">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => {
            const active = pathname === n.href || pathname?.startsWith(n.href + '/');
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  'group relative text-body-sm font-mono uppercase tracking-[0.16em] transition-colors',
                  active ? 'text-paper' : 'text-paper/70 hover:text-paper'
                )}
              >
                {n.label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-px bg-paper transition-all duration-300 ease-out',
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <ThemeToggle />
          <LangSwitch en={en} pathname={pathname || '/'} />
          <PillCTA href={contactHref} variant="glass" size="sm" icon={<Phone className="w-3.5 h-3.5" />}>{contactLabel}</PillCTA>
          <PillCTA href={portalHref} variant="glass" size="sm" onClick={handleOpenPortalModal} icon={<LogIn className="w-3.5 h-3.5" />}>{portalLabel}</PillCTA>
          <RealtimeClock />
        </div>

        <button
          aria-label="Open menu"
          className="md:hidden p-2 -mr-2 text-paper"
          onClick={() => setOpen(true)}
        >
          <Menu className="w-6 h-6" strokeWidth={1.75} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink text-paper animate-fade-up md:hidden">
          <div className="container-page h-16 flex items-center justify-between border-b border-paper/10">
            <Logo />
            <button aria-label="Close menu" className="p-2 -mr-2 text-paper" onClick={() => setOpen(false)}>
              <X className="w-6 h-6" strokeWidth={1.75} />
            </button>
          </div>
          <nav className="container-page mt-10 flex flex-col gap-7">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="font-mono text-h2 text-paper uppercase tracking-[0.14em] leading-none"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <PillCTA
                href={portalHref}
                variant="light"
                size="sm"
                onClick={(event) => {
                  handleOpenPortalModal(event);
                  setOpen(false);
                }}
              >
                {portalLabel}
              </PillCTA>
              <PillCTA href={contactHref} variant="outline" size="sm">{contactLabel}</PillCTA>
            </div>
            <div className="mt-6 pt-6 border-t border-paper/10 flex items-center gap-6">
              <LangSwitch en={en} pathname={pathname || '/'} />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}

      <SabohubAuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        locale={en ? 'en' : 'vi'}
      />
    </header>
  );
}

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <span className="w-8 h-8 inline-block" aria-hidden="true" />;
  }

  const cycle = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  const Icon = theme === 'system' ? Monitor : resolvedTheme === 'dark' ? Moon : Sun;
  const label = theme === 'dark' ? 'Switch to light mode' : theme === 'light' ? 'Switch to system mode' : 'Switch to dark mode';

  return (
    <button
      aria-label={label}
      onClick={cycle}
      className="p-1.5 text-paper hover:text-paper transition-colors"
    >
      <Icon className="w-4 h-4" strokeWidth={1.75} />
    </button>
  );
}

function RealtimeClock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span
      className="font-mono text-xs tracking-widest tabular-nums select-none"
      aria-label="Giờ hiện tại"
      style={{
        background: 'linear-gradient(180deg, #FFE59A 0%, #C9A961 50%, #7A5A10 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {time}
    </span>
  );
}

function LangSwitch({ en, pathname }: { en: boolean; pathname: string }) {
  return (
    <div className="text-body-sm inline-flex items-center gap-2 font-mono uppercase tracking-[0.12em]">
      <Link
        href={mirrorPath(pathname, 'vi')}
        className={cn('transition-colors', en ? 'text-paper/60 hover:text-paper' : 'text-paper')}
      >VI</Link>
      <span className="text-paper/30">/</span>
      <Link
        href={mirrorPath(pathname, 'en')}
        className={cn('transition-colors', en ? 'text-paper' : 'text-paper/60 hover:text-paper')}
      >EN</Link>
    </div>
  );
}

function Logo() {
  return (
    <span className="font-mono uppercase tracking-wider text-sm text-paper">
      SABO M&amp;T
    </span>
  );
}
