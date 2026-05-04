/**
 * Showcase data layer with peer-to-peer + multi-tier resilience.
 *
 * Order (per slug):
 *   1. PEER     — fetch directly from project agent's `showcase.json` endpoint
 *                 (e.g. https://saboarena.com/showcase.json). Source of truth.
 *   2. FORGE    — fallback to longsang.org forge `project_showcase` table
 *   3. SNAPSHOT — local JSON committed to repo (always works, even offline)
 *
 * Auto-sync: project agent updates their showcase.json → POST /api/revalidate
 * with tag=showcase → next request fetches fresh from peer endpoint.
 *
 * Auto-sync flow:
 *   - On every request, Next.js serves cached data (fast).
 *   - Every 1h, the next request triggers a background refetch from forge.
 *   - When forge admin updates a project, forge backend POSTs to
 *     `${SABO_MT_URL}/api/revalidate?secret=${REVALIDATE_SECRET}&tag=showcase`
 *     → tag invalidated → next request fetches fresh.
 *
 * Failure modes:
 *   - forge env missing → use snapshot
 *   - forge API 4xx/5xx → use snapshot, log to console (won't break build)
 *   - forge returns empty list → use snapshot (treat as misconfiguration)
 */
import snapshot from '@/content/showcase-snapshot.json';
import { SHOWCASE_REGISTRY } from '@/content/showcase-registry';

export type Showcase = {
  slug: string;
  name: string;
  description: string;
  category: string;
  status: string;
  progress?: number;
  production_url: string | null;
  github_url: string | null;
  hero_title: string;
  hero_description: string;
  hero_stats: Array<{ label: string; value: string }>;
  overview_description: string;
  objectives: string[];
  impacts: string[];
  features: Array<{ title: string; points: string[] }>;
  metrics: Array<{ label: string; value: string }>;
  tech_stack: string[];
  performance: Array<{ label: string; value: string }>;
  infrastructure: Array<{ label: string; value: string }>;
  industry: string;
  industry_slug: string;
  is_featured: boolean;
  display_order: number;
};

const SHOWCASE_TAG = 'showcase';

// Industry mapping for forge categories → editorial industry labels.
// Used when live data lacks `industry` field.
const CATEGORY_INDUSTRY: Record<string, { industry: string; industry_slug: string }> = {
  'Mobile App': { industry: 'Sports & Entertainment', industry_slug: 'sports' },
  'Business Management Platform': { industry: 'Hospitality & Services', industry_slug: 'hospitality' },
  'Real Estate Platform': { industry: 'Real Estate', industry_slug: 'real-estate' },
  'Community Platform': { industry: 'Community / AI', industry_slug: 'community' },
};

function normalizeStat(s: unknown): { label: string; value: string } | null {
  if (!s || typeof s !== 'object') return null;
  const obj = s as Record<string, unknown>;
  const label = typeof obj.label === 'string' ? obj.label : '';
  const value = typeof obj.value === 'string' ? obj.value : String(obj.value ?? '');
  if (!label || !value) return null;
  return { label, value };
}

function normalizeFeature(f: unknown): { title: string; points: string[] } | null {
  if (!f || typeof f !== 'object') return null;
  const obj = f as Record<string, unknown>;
  const title = typeof obj.title === 'string' ? obj.title : '';
  const pointsRaw = Array.isArray(obj.points) ? obj.points : [];
  const points = pointsRaw.filter((p): p is string => typeof p === 'string');
  if (!title) return null;
  return { title, points };
}

function normalizeTechStack(t: unknown): string[] {
  if (!Array.isArray(t)) return [];
  return t
    .map((item) => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object' && typeof (item as { name?: unknown }).name === 'string') {
        return (item as { name: string }).name;
      }
      return null;
    })
    .filter((x): x is string => Boolean(x));
}

function normalize(row: Record<string, unknown>): Showcase | null {
  const slug = typeof row.slug === 'string' ? row.slug : '';
  if (!slug) return null;

  const category = typeof row.category === 'string' ? row.category : 'Web App';
  const industryInfo = CATEGORY_INDUSTRY[category] ?? { industry: category, industry_slug: slug };

  return {
    slug,
    name: typeof row.name === 'string' ? row.name : slug,
    description: typeof row.description === 'string' ? row.description : '',
    category,
    status: typeof row.status === 'string' ? row.status : 'live',
    progress: typeof row.progress === 'number' ? row.progress : undefined,
    production_url: typeof row.production_url === 'string' ? row.production_url : null,
    github_url: typeof row.github_url === 'string' ? row.github_url : null,
    hero_title: typeof row.hero_title === 'string' ? row.hero_title : (typeof row.name === 'string' ? row.name : slug),
    hero_description: typeof row.hero_description === 'string' ? row.hero_description : '',
    hero_stats: (Array.isArray(row.hero_stats) ? row.hero_stats : [])
      .map(normalizeStat)
      .filter((x): x is { label: string; value: string } => x !== null),
    overview_description: typeof row.overview_description === 'string' ? row.overview_description : '',
    objectives: Array.isArray(row.objectives)
      ? row.objectives.filter((x): x is string => typeof x === 'string')
      : [],
    impacts: Array.isArray(row.impacts)
      ? row.impacts.filter((x): x is string => typeof x === 'string')
      : [],
    features: (Array.isArray(row.features) ? row.features : [])
      .map(normalizeFeature)
      .filter((x): x is { title: string; points: string[] } => x !== null),
    metrics: (Array.isArray(row.metrics) ? row.metrics : [])
      .map(normalizeStat)
      .filter((x): x is { label: string; value: string } => x !== null),
    tech_stack: normalizeTechStack(row.tech_stack),
    performance: (Array.isArray(row.performance) ? row.performance : [])
      .map(normalizeStat)
      .filter((x): x is { label: string; value: string } => x !== null),
    infrastructure: (Array.isArray(row.infrastructure) ? row.infrastructure : [])
      .map(normalizeStat)
      .filter((x): x is { label: string; value: string } => x !== null),
    industry: industryInfo.industry,
    industry_slug: industryInfo.industry_slug,
    is_featured: Boolean(row.is_featured),
    display_order: typeof row.display_order === 'number' ? row.display_order : 99,
  };
}

function fromSnapshot(): Showcase[] {
  return (snapshot.showcases as Array<Record<string, unknown>>)
    .map(normalize)
    .filter((x): x is Showcase => x !== null)
    .sort((a, b) => a.display_order - b.display_order);
}

/**
 * Fetch one showcase directly from the project agent's own endpoint.
 * Each project hosts their own `showcase.json` — single source of truth
 * controlled by the agent who owns the product.
 */
async function fromPeer(endpoint: { slug: string; url: string }): Promise<Showcase | null> {
  try {
    const res = await fetch(endpoint.url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600, tags: [SHOWCASE_TAG, `showcase:${endpoint.slug}`] },
    });
    if (!res.ok) {
      console.warn(`[showcase] peer ${endpoint.slug} fetch ${res.status}`);
      return null;
    }
    const ct = res.headers.get('content-type') ?? '';
    if (!ct.includes('application/json') && !ct.includes('text/plain')) {
      console.warn(`[showcase] peer ${endpoint.slug} non-JSON response (${ct.split(';')[0]})`);
      return null;
    }
    const text = await res.text();
    let row: Record<string, unknown>;
    try {
      row = JSON.parse(text) as Record<string, unknown>;
    } catch {
      console.warn(`[showcase] peer ${endpoint.slug} invalid JSON`);
      return null;
    }
    return normalize(row);
  } catch (err) {
    console.warn(`[showcase] peer ${endpoint.slug} error:`, err);
    return null;
  }
}

async function fromPeers(): Promise<Map<string, Showcase>> {
  const results = await Promise.all(
    SHOWCASE_REGISTRY.map(async (ep) => [ep.slug, await fromPeer(ep)] as const),
  );
  const map = new Map<string, Showcase>();
  for (const [slug, sc] of results) {
    if (sc) map.set(slug, sc);
  }
  return map;
}

async function fromForge(): Promise<Showcase[] | null> {
  const url = process.env.FORGE_SUPABASE_URL?.trim();
  // Service role bypasses RLS; safe because this runs server-side only (never bundled to client).
  const key = process.env.FORGE_SUPABASE_SERVICE_ROLE_KEY?.trim() || process.env.FORGE_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) return null;

  const endpoint =
    `${url}/rest/v1/project_showcase` +
    '?select=slug,name,description,category,status,progress,production_url,github_url,' +
    'hero_title,hero_description,hero_stats,overview_description,objectives,impacts,' +
    'features,metrics,tech_stack,performance,infrastructure,is_featured,display_order' +
    '&is_active=eq.true&order=display_order.asc';

  try {
    const res = await fetch(endpoint, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Accept: 'application/json',
      },
      next: { revalidate: 3600, tags: [SHOWCASE_TAG] },
    });
    if (!res.ok) {
      console.warn(`[showcase] forge fetch ${res.status}, falling back to snapshot`);
      return null;
    }
    const rows = (await res.json()) as Array<Record<string, unknown>>;
    if (!Array.isArray(rows) || rows.length === 0) return null;
    const normalized = rows.map(normalize).filter((x): x is Showcase => x !== null);
    return normalized.length > 0 ? normalized : null;
  } catch (err) {
    console.warn('[showcase] forge fetch error, falling back to snapshot:', err);
    return null;
  }
}

/**
 * Returns all active showcases, sorted by display_order.
 * Per-slug priority: peer endpoint → forge → snapshot.
 * Each tier merges into the previous so partial peer outages don't blank the page.
 */
export async function getShowcases(): Promise<Showcase[]> {
  const merged = new Map<string, Showcase>();

  // Tier 3: snapshot baseline (always present)
  for (const sc of fromSnapshot()) merged.set(sc.slug, sc);

  // Tier 2: forge overrides snapshot when reachable
  const forge = await fromForge();
  if (forge) {
    for (const sc of forge) merged.set(sc.slug, sc);
  }

  // Tier 1: peer endpoints override everything (project agent = source of truth)
  const peers = await fromPeers();
  for (const [slug, sc] of peers) merged.set(slug, sc);

  return Array.from(merged.values()).sort((a, b) => a.display_order - b.display_order);
}

export async function getShowcase(slug: string): Promise<Showcase | null> {
  const all = await getShowcases();
  return all.find((s) => s.slug === slug) ?? null;
}

/**
 * Synchronous snapshot accessor for non-async contexts (e.g. generateStaticParams).
 */
export function getShowcaseSlugsSync(): string[] {
  return fromSnapshot().map((s) => s.slug);
}
