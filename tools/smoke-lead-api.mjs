#!/usr/bin/env node
/**
 * Smoke lead/chat APIs against a running Next dev server.
 * Usage: npm run dev (other terminal) → npm run smoke:lead-api
 * Override base: SMOKE_BASE=https://sabo.com.vn npm run smoke:lead-api
 */

const BASE = (process.env.SMOKE_BASE || process.argv[2] || 'http://localhost:3210').replace(
  /\/$/,
  '',
);

async function j(res) {
  const t = await res.text();
  try {
    return JSON.parse(t);
  } catch {
    return { _raw: t.slice(0, 500) };
  }
}

async function main() {
  console.log('SMOKE_BASE =', BASE);

  const s = await fetch(`${BASE}/api/chat/session`, { method: 'POST' });
  const sj = await j(s);
  if (!s.ok) {
    console.error('POST /api/chat/session', s.status, sj);
    process.exit(1);
  }
  const { lead_id } = sj;
  if (!lead_id) {
    console.error('No lead_id', sj);
    process.exit(1);
  }
  console.log('OK session → lead_id', lead_id);

  const m = await fetch(`${BASE}/api/chat/message`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      lead_id,
      current_step: 'start',
      message: 'Xin chào',
      session_id: 'smoke',
    }),
  });
  const mj = await j(m);
  if (!m.ok) {
    console.error('POST /api/chat/message', m.status, mj);
    process.exit(1);
  }
  console.log('OK message → next_step', mj.next_step);

  const g = await fetch(`${BASE}/api/leads/${lead_id}`);
  const gj = await j(g);
  if (!g.ok) {
    console.error('GET /api/leads/[id]', g.status, gj);
    process.exit(1);
  }
  console.log('OK GET lead id', gj?.id || lead_id);
  console.log('Smoke passed.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
