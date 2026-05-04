'use client';

import { PillCTA } from '@/components/ui/PillCTA';
import { EditorialBackdrop } from '@/components/ui/EditorialBackdrop';
import useLetterReveal from '@/hooks/useLetterReveal';

interface FinalCtaProps { locale?: 'vi' | 'en' }

export function FinalCta({ locale = 'vi' }: FinalCtaProps) {
  const letterRef = useLetterReveal<HTMLParagraphElement>();
  const en = locale === 'en';

  return (
    <section className="luxury-section relative py-40 text-center">
      <EditorialBackdrop
        light="/images/light/service-create-light.jpg"
        dark="/images/dark/service-create-dark.jpg"
        density="standard"
        focus="center"
      />
      <div className="relative max-w-[1440px] mx-auto px-8">
        <p
          ref={letterRef}
          className="text-display-1 font-serif luxury-heading text-balance max-w-4xl mx-auto"
        >
          {en ? 'You have an idea. We make it real.' : 'Bạn có ý tưởng. Chúng tôi hiện thực hóa nó.'}
        </p>
        <p className="text-body font-mono text-paper/60 mt-6 max-w-xl mx-auto">
          {en ? 'Every solution is custom-designed. No templates.' : 'Mỗi giải pháp được thiết kế riêng. Không template.'}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <PillCTA href={en ? '/en/contact' : '/booking'} variant="light" className="font-mono uppercase">
            {en ? 'Book a consultation' : 'Đặt lịch tư vấn'}
          </PillCTA>
          <PillCTA href={en ? '/en/contact' : '/contact'} variant="outline" className="font-mono uppercase">
            {en ? 'Request a quote' : 'Yêu cầu báo giá'}
          </PillCTA>
        </div>
      </div>
    </section>
  );
}

export default FinalCta;
