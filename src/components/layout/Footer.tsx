'use client';

import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SITE } from '@/content/site';

function isEnPath(p: string | null) {
  return !!p && (p === '/en' || p.startsWith('/en/'));
}

export function Footer() {
  const pathname = usePathname();
  const en = isEnPath(pathname);
  const year = new Date().getFullYear();

  const serviceLinks = en
    ? [
        { href: '/en/services/build', label: 'Build — Custom Software' },
        { href: '/en/services/automate', label: 'Automate — AI & Workflow' },
        { href: '/en/services/create', label: 'Create — AI Media' },
      ]
    : [
        { href: '/services/build', label: 'Build — Phần mềm tùy chỉnh' },
        { href: '/services/automate', label: 'Automate — AI & Tự động hóa' },
        { href: '/services/create', label: 'Create — AI Media' },
      ];

  const companyLinks = en
    ? [
        { href: '/en/about', label: 'About' },
        { href: '/en/case-studies', label: 'Case studies' },
        { href: '/en/industries', label: 'Industries' },
        { href: '/en/contact', label: 'Contact' },
      ]
    : [
        { href: '/about', label: 'Về chúng tôi' },
        { href: '/case-studies', label: 'Case studies' },
        { href: '/industries', label: 'Ngành dọc' },
        { href: '/contact', label: 'Liên hệ' },
      ];

  const legalLinks = [
    { href: '/legal/privacy', label: en ? 'Privacy' : 'Bảo mật' },
    { href: '/legal/terms', label: en ? 'Terms' : 'Điều khoản' },
    { href: '/legal/cookies', label: 'Cookies' },
  ];

  return (
    <footer className="bg-ink text-paper/60 border-t border-paper/10 mt-20">
      <div className="container-page pt-20 pb-10">
        <div className="font-serif text-display-2 leading-[0.9] text-paper tracking-tight">
          SABO M&amp;T
        </div>
      </div>

      <div className="container-page pb-16 grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-paper/10 pt-12">
        <div className="md:col-span-4">
          <p className="font-mono text-body-sm leading-relaxed">
            {SITE.oneLiner}
          </p>
          <address className="not-italic mt-6 font-mono text-body-sm leading-relaxed">
            <span className="whitespace-nowrap">342/9 Nguyễn An Ninh, P. Tam Thắng,</span>
            <br />
            <span className="whitespace-nowrap">TP. Hồ Chí Minh, Việt Nam</span>
            <br />MST: <span className="text-paper/40">{SITE.taxCode}</span>
          </address>
        </div>

        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <FooterCol title={en ? 'Services' : 'Dịch vụ'} links={serviceLinks} />
          <FooterCol title={en ? 'Company' : 'Công ty'} links={companyLinks} />
          <FooterCol title={en ? 'Legal' : 'Pháp lý'} links={legalLinks}>
            <div className="mt-6 flex items-center gap-3">
              {SITE.social.linkedin && (
                <Link
                  href={SITE.social.linkedin}
                  aria-label="LinkedIn"
                  className="text-paper/60 hover:text-paper transition-colors"
                >
                  <Linkedin className="w-5 h-5" strokeWidth={1.75} />
                </Link>
              )}
            </div>
          </FooterCol>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-body-sm">
          <span>© {year} {SITE.name}. {en ? 'All rights reserved.' : 'Bản quyền được bảo lưu.'}</span>
          <div className="flex items-center gap-6">
            <Link href="/en" className="hover:text-paper transition-colors">EN</Link>
            <Link href="/" className="hover:text-paper transition-colors">VN</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title, links, children
}: {
  title: string;
  links: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-eyebrow uppercase tracking-[0.1em] text-paper">{title}</div>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-body-sm hover:text-paper transition-colors">{l.label}</Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}
