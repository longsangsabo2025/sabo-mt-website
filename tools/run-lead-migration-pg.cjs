/**
 * Apply 20260503_lead_engine.sql using node-postgres + DATABASE_URL from .env.local.
 * No Docker / no Supabase MCP required.
 *
 * Usage: npm run migrate:lead-engine
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const root = path.join(__dirname, '..');
const envPath = path.join(root, '.env.local');
const sqlPath = path.join(root, 'supabase', 'migrations', '20260503_lead_engine.sql');

function loadDatabaseUrl() {
  if (!fs.existsSync(envPath)) {
    throw new Error(`Missing .env.local at ${envPath}`);
  }
  const envText = fs.readFileSync(envPath, 'utf8');
  const line = envText.split(/\r?\n/).find((l) => l.startsWith('DATABASE_URL='));
  if (!line) throw new Error('DATABASE_URL= not found in .env.local');
  const url = line.slice('DATABASE_URL='.length).trim();
  if (!url.startsWith('postgresql://') && !url.startsWith('postgres://')) {
    throw new Error('DATABASE_URL must be a postgres connection string');
  }
  return url;
}

async function main() {
  const databaseUrl = loadDatabaseUrl();
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const client = new Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });
  console.log('Connecting to Postgres (pooler/direct from DATABASE_URL)...');
  await client.connect();
  try {
    console.log('Applying migration 20260503_lead_engine.sql ...');
    await client.query(sql);
    console.log('Migration applied successfully.');
  } finally {
    await client.end();
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
