/**
 * Showcase registry — peer-to-peer endpoints.
 *
 * Mỗi project agent tự host `showcase.json` ở endpoint riêng.
 * sabo-mt-website fetch trực tiếp từ source, không qua trung gian.
 *
 * Khi project có release mới:
 *   1. Project agent update showcase.json ở endpoint của họ
 *   2. Project agent POST /api/revalidate?tag=showcase để invalidate cache
 *   3. Request kế tiếp → fresh fetch
 *
 * Fallback chain: live endpoint → Next.js cache (1h) → showcase-snapshot.json
 */

export interface ShowcaseEndpoint {
  slug: string;
  /** Public URL trả về showcase.json */
  url: string;
  /** Agent owner (để liên hệ khi schema lệch) */
  owner: string;
  /** Repo path (nội bộ) */
  repo?: string;
}

export const SHOWCASE_REGISTRY: ShowcaseEndpoint[] = [
  {
    slug: 'sabo-arena',
    url: 'https://saboarena.com/showcase.json',
    owner: 'sabo-arena agent',
    repo: 'D:\\0.PROJECTS\\02-SABO-ECOSYSTEM\\sabo-arena\\SABO ARENA APP',
  },
  {
    slug: 'sabohub',
    url: 'https://hub.sabo.com.vn/showcase.json',
    owner: 'sabohub agent',
    repo: 'D:\\0.PROJECTS\\02-SABO-ECOSYSTEM\\sabo-hub\\sabohub-web',
  },
  {
    slug: 'vungtauland',
    url: 'https://vungtauland.vercel.app/showcase.json',
    owner: 'vungtauland agent',
  },
  {
    slug: 'ainewbievn',
    url: 'https://ainewbievn.shop/showcase.json',
    owner: 'ainewbievn agent',
  },
];
