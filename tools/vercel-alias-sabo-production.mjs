/**
 * Point sabo.com.vn to the latest deployment of sabo-mt-website.
 *
 * Token: set VERCEL_TOKEN in the environment, or put VERCEL_TOKEN= in
 * 00-MASTER-ADMIN/admin/.env (not committed).
 *
 * Team: set VERCEL_TEAM (slug, e.g. dsmhs-projects). Default: dsmhs-projects.
 *
 * Usage: npm run alias:production
 */
import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const adminEnv = path.join(
  root,
  '..',
  '..',
  '00-MASTER-ADMIN',
  'admin',
  '.env',
);

function loadToken() {
  if (process.env.VERCEL_TOKEN?.trim()) {
    return process.env.VERCEL_TOKEN.trim();
  }
  if (!fs.existsSync(adminEnv)) {
    console.error('Missing', adminEnv, 'and VERCEL_TOKEN not set');
    process.exit(1);
  }
  const text = fs.readFileSync(adminEnv, 'utf8');
  const m = text.match(/^VERCEL_TOKEN=(.+)$/m);
  if (!m) {
    console.error('VERCEL_TOKEN= not found in admin/.env; export VERCEL_TOKEN instead');
    process.exit(1);
  }
  return m[1].trim().replace(/\r/g, '');
}

const token = loadToken();
const team = (process.env.VERCEL_TEAM || 'dsmhs-projects').trim();
const env = { ...process.env, VERCEL_TOKEN: token };

try {
  execSync('npx vercel whoami', { encoding: 'utf8', env, cwd: root });
} catch {
  console.error(
    'Vercel rejected VERCEL_TOKEN (invalid or expired). Create a new token at vercel.com/account/tokens and set VERCEL_TOKEN.',
  );
  process.exit(1);
}

const raw = execSync(`npx vercel ls sabo-mt-website --scope ${team} --json`, {
  encoding: 'utf8',
  cwd: root,
  env,
});
const list = JSON.parse(raw);
const first = list[0];
if (!first?.url) {
  console.error('No deployment in list. Check VERCEL_TEAM / project name.');
  process.exit(1);
}
const host = first.url.replace(/^https?:\/\//, '');
console.log('Latest deployment host:', host);
console.log('Creating alias sabo.com.vn ->', host);

execSync(`npx vercel alias set ${host} sabo.com.vn --scope ${team} --yes`, {
  stdio: 'inherit',
  cwd: root,
  env,
});
