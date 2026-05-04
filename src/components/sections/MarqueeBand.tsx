import {
  Code, Zap, Wand2, Activity, Home,
  Coffee, BookOpen, ShoppingCart, Brain, Globe,
} from 'lucide-react';
import { MarqueeText, type MarqueeItem } from '@/components/ui/MarqueeText';

const SZ = 30;
const SW = 1.25;

const ITEMS_VI: MarqueeItem[] = [
  { icon: <Code       size={SZ} strokeWidth={SW} />, text: 'XÂY DỰNG' },
  { icon: <Zap        size={SZ} strokeWidth={SW} />, text: 'TỰ ĐỘNG HÓA' },
  { icon: <Wand2      size={SZ} strokeWidth={SW} />, text: 'SÁNG TẠO' },
  { icon: <Activity   size={SZ} strokeWidth={SW} />, text: 'THỂ THAO & GIẢI TRÍ' },
  { icon: <Home       size={SZ} strokeWidth={SW} />, text: 'BẤT ĐỘNG SẢN' },
  { icon: <Coffee     size={SZ} strokeWidth={SW} />, text: 'HOSPITALITY' },
  { icon: <BookOpen   size={SZ} strokeWidth={SW} />, text: 'GIÁO DỤC' },
  { icon: <ShoppingCart size={SZ} strokeWidth={SW} />, text: 'BÁN LẺ' },
  { icon: <Brain      size={SZ} strokeWidth={SW} />, text: 'AI TÙY CHỈNH' },
  { icon: <Globe      size={SZ} strokeWidth={SW} />, text: 'VIỆT NAM' },
];

const ITEMS_EN: MarqueeItem[] = [
  { icon: <Code       size={SZ} strokeWidth={SW} />, text: 'BUILD' },
  { icon: <Zap        size={SZ} strokeWidth={SW} />, text: 'AUTOMATE' },
  { icon: <Wand2      size={SZ} strokeWidth={SW} />, text: 'CREATE' },
  { icon: <Activity   size={SZ} strokeWidth={SW} />, text: 'SPORTS & ENTERTAINMENT' },
  { icon: <Home       size={SZ} strokeWidth={SW} />, text: 'REAL ESTATE' },
  { icon: <Coffee     size={SZ} strokeWidth={SW} />, text: 'HOSPITALITY' },
  { icon: <BookOpen   size={SZ} strokeWidth={SW} />, text: 'EDUCATION' },
  { icon: <ShoppingCart size={SZ} strokeWidth={SW} />, text: 'RETAIL' },
  { icon: <Brain      size={SZ} strokeWidth={SW} />, text: 'CUSTOM AI STUDIO' },
  { icon: <Globe      size={SZ} strokeWidth={SW} />, text: 'VIETNAM' },
];

interface MarqueeBandProps { locale?: 'vi' | 'en' }

export function MarqueeBand({ locale = 'vi' }: MarqueeBandProps) {
  const items = locale === 'en' ? ITEMS_EN : ITEMS_VI;
  return (
    <section className="bg-paper text-ink border-y border-ink/10 py-10">
      <MarqueeText items={items} textClass="text-h1 font-mono" />
    </section>
  );
}

export default MarqueeBand;
