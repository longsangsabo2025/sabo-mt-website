#!/usr/bin/env node
/**
 * verify-design-tokens.js
 *
 * Scans all app/**\/page.tsx files for FORBIDDEN legacy design tokens.
 * Run: node scripts/verify-design-tokens.js
 * Exit 1 if any violations found — safe to add to CI or pre-build check.
 *
 * Rule: every page (VI and EN) must use LOUD design system only.
 */

const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

// ── Forbidden patterns ────────────────────────────────────────────────────────
const FORBIDDEN = [
  { pattern: /radial-gradient/,          label: 'radial-gradient (no blob backgrounds)' },
  { pattern: /bg-surface\b/,             label: 'bg-surface (use bg-ink)' },
  { pattern: /bg-navy\b/,                label: 'bg-navy (use bg-ink)' },
  { pattern: /font-display\b/,           label: 'font-display (use font-serif)' },
  { pattern: /text-slate-/,              label: 'text-slate-* (use text-paper/60 or text-paper/40)' },
  { pattern: /text-heading-/,            label: 'text-heading-* (legacy alias — use text-h1/h2/h3)' },
  { pattern: /text-display-lg\b/,        label: 'text-display-lg (legacy alias — use text-display-1 or text-display-2)' },
  { pattern: /text-display-md\b/,        label: 'text-display-md (legacy alias — use text-display-2)' },
  { pattern: /\bcard\b/,                 label: '"card" class (no card component — use border-white/10 + bg-ink)' },
  { pattern: /\bbtn\b/,                  label: '"btn" class (use PillCTA component)' },
  { pattern: /from '@\/components\/ui\/Eyebrow'/, label: 'old Eyebrow component (use EyebrowLabel)' },
  { pattern: /from '@\/components\/ui\/Cta'/,     label: 'old Cta component (use PillCTA)' },
  { pattern: /section-y\b/,              label: 'section-y (legacy utility — use py-24 md:py-32)' },
  { pattern: /container-page\b/,         label: 'container-page (legacy — use max-w-[1400px] mx-auto px-6 md:px-10)' },
];

// ── Files to scan ─────────────────────────────────────────────────────────────
const root = path.resolve(__dirname, '..');
const files = globSync('src/app/**/page.tsx', { cwd: root, absolute: true });

let totalViolations = 0;

for (const file of files) {
  const rel = path.relative(root, file);
  const lines = fs.readFileSync(file, 'utf-8').split('\n');
  const fileViolations = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const { pattern, label } of FORBIDDEN) {
      if (pattern.test(line)) {
        fileViolations.push({ lineNo: i + 1, content: line.trim(), label });
      }
    }
  }

  if (fileViolations.length > 0) {
    console.error(`\n❌  ${rel}`);
    for (const v of fileViolations) {
      console.error(`     L${v.lineNo}  [${v.label}]`);
      console.error(`           ${v.content}`);
    }
    totalViolations += fileViolations.length;
  }
}

if (totalViolations === 0) {
  console.log('✅  All pages pass LOUD design token check.');
  process.exit(0);
} else {
  console.error(`\n⛔  ${totalViolations} violation(s) found. Fix before shipping.`);
  process.exit(1);
}
