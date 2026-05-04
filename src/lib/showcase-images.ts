export const SHOWCASE_IMAGE_MAP: Record<string, string> = {
  'sabo-arena': '/images/cases/sabo-arena-studio.jpg',
  sabohub: '/images/cases/sabohub-studio.jpg',
  vungtauland: '/images/cases/vungtauland-studio.jpg',
  ainewbievn: '/images/cases/ainewbievn-studio.jpg',
};

export const SHOWCASE_IMAGE_FALLBACK = '/images/cases/ainewbievn-studio.jpg';

export function getShowcaseImage(slug: string) {
  return SHOWCASE_IMAGE_MAP[slug] ?? SHOWCASE_IMAGE_FALLBACK;
}