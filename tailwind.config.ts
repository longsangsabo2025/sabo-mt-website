import type { Config } from 'tailwindcss';

// Design tokens — SABO MT redesign (Editorial minimalism, per-pillar accent)
const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  darkMode: 'class',
  theme: {
    container: { center: true, padding: '1rem', screens: { '2xl': '1280px' } },
    extend: {
      colors: {
        // Core editorial palette — CSS-variable-backed for light/dark mode
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        'paper-soft': 'rgb(var(--paper-soft) / <alpha-value>)',
        rule: 'rgba(255,255,255,0.12)',
        'rule-dark': 'rgba(0,0,0,0.10)',
        // Per-pillar accent
        accent: {
          think: '#6E2A21',
          design: '#1F3A5C',
          build: '#2A5C3C',
          grow: '#C9A961'
        },
        // Functional
        success: '#2D7A4A',
        warn: '#B5651D',
        danger: '#B33A3A',
        // Legacy — kept for backward compat (other pages)
        navy: {
          DEFAULT: '#1E3A8A',
          hover: '#1E40AF',
          dark: '#020617'
        },
        gold: {
          DEFAULT: '#C9A961',
          hover: '#8B7341'
        },
        surface: '#FAFAF9',
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A'
        },
        error: '#DC2626',
        warning: '#F59E0B'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-serif)', 'Georgia', 'serif']
      },
      fontSize: {
        // New editorial scale
        'display-1': ['clamp(3.5rem, 6vw + 1rem, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.05em' }],
        'display-2': ['clamp(2.5rem, 4vw + 1rem, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['clamp(2rem, 2.5vw + 1rem, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'h2': ['clamp(1.5rem, 1.5vw + 1rem, 2.25rem)', { lineHeight: '1.2' }],
        'h3': ['1.25rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.55' }],
        'eyebrow': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.16em' }],
        'caption': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.04em' }],
        // Legacy — kept for backward compat
        'display-xl': ['5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'heading-lg': ['2.25rem', { lineHeight: '1.2' }],
        'heading-md': ['1.5rem', { lineHeight: '1.3' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.4' }],
        'body-md': ['1rem', { lineHeight: '1.65' }],
        'mono': ['0.875rem', { lineHeight: '1.5' }]
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem'
      },
      maxWidth: {
        prose: '680px',
        container: '1280px'
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px'
      },
      boxShadow: {
        xs: '0 1px 2px rgba(15,23,42,0.04)',
        sm: '0 4px 12px rgba(15,23,42,0.06)',
        md: '0 8px 24px rgba(15,23,42,0.08)',
        lg: '0 16px 40px rgba(15,23,42,0.12)'
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-soft': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
        '500': '500ms',
        '800': '800ms',
        '1200': '1200ms'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'shake': {
          '10%,90%': { transform: 'translateX(-2px)' },
          '20%,80%': { transform: 'translateX(4px)' },
          '30%,50%,70%': { transform: 'translateX(-4px)' },
          '40%,60%': { transform: 'translateX(4px)' }
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 500ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'shake': 'shake 200ms linear',
        'marquee': 'marquee 30s linear infinite'
      }
    }
  },
  plugins: []
};
export default config;
