/**
 * Apply supabase/migrations/20260503_lead_engine.sql using psql inside Docker.
 * Reads DATABASE_URL from .env.local (repo root). Requires Docker Desktop.
 *
 * Usage: npm run migrate:lead-engine
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const envPath = path.join(root, '.env.local');
const sqlPath = path.join(root, 'supabase', 'migrations', '20260503_lead_engine.sql');

if (!fs.existsSync(envPath)) {
  console.error('Missing .env.local at', envPath);
  process.exit(1);
}
if (!fs.existsSync(sqlPath)) {
  console.error('Missing migration at', sqlPath);
  process.exit(1);
}

const envText = fs.readFileSync(envPath, 'utf8');
const line = envText.split(/\r?\n/).find((l) => l.startsWith('DATABASE_URL='));
if (!line) {
  console.error('DATABASE_URL= not found in .env.local');
  process.exit(1);
}
const databaseUrl = line.slice('DATABASE_URL='.length).trim();
if (!databaseUrl.startsWith('postgresql://')) {
  console.error('DATABASE_URL must start with postgresql://');
  process.exit(1);
}

// Docker Desktop (Windows): host path with forward slashes works for -v
const hostSql = sqlPath.replace(/\\/g, '/');

const args = [
  'run',
  '--rm',
  '-i',
  '-v',
  `${hostSql}:/m.sql:ro`,
  'postgres:17-alpine',
  'psql',
  databaseUrl,
  '-v',
  'ON_ERROR_STOP=1',
  '-f',
  '/m.sql',
];

console.log('Running migration via Docker (postgres:17-alpine psql)...');
const r = spawnSync('docker', args, { stdio: 'inherit', shell: false });
const code = r.status === null ? 1 : r.status;
if (code !== 0) {
  console.error('Migration failed with exit', code);
}
process.exit(code);
