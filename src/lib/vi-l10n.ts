const INDUSTRY_VI: Record<string, string> = {
  'sports & entertainment': 'Thể thao & Giải trí',
  'hospitality & services': 'Hospitality & Dịch vụ',
  hospitality: 'Hospitality & Dịch vụ',
  'real estate': 'Bất động sản',
  'community / ai': 'Cộng đồng / AI',
  community: 'Cộng đồng / AI',
  education: 'Giáo dục',
  retail: 'Bán lẻ',
  finance: 'Tài chính',
};

const CATEGORY_VI: Record<string, string> = {
  'mobile app': 'Ứng dụng di động',
  'business management platform': 'Nền tảng quản trị doanh nghiệp',
  'real estate platform': 'Nền tảng bất động sản',
  'community platform': 'Nền tảng cộng đồng',
};

export function viIndustryLabel(value: string): string {
  const key = value.trim().toLowerCase();
  return INDUSTRY_VI[key] ?? value;
}

export function viCategoryLabel(value: string): string {
  const key = value.trim().toLowerCase();
  return CATEGORY_VI[key] ?? value;
}

export function viFilterLabel(value: string): string {
  if (value.toUpperCase() === 'ALL') return 'TẤT CẢ';
  return viIndustryLabel(value);
}
