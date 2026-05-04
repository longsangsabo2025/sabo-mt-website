import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { BookingFormLoud } from '@/components/forms/BookingFormLoud';

export const metadata = {
  title: 'Đặt lịch tư vấn — SABO M&T',
  description:
    'Đặt lịch tư vấn 1:1 qua Google Meet với SABO M&T. 30/60/120 phút. Chọn gói phù hợp với nhu cầu Build · Automate · Create của bạn.',
};

export default function BookingPage() {
  return (
    <section className="bg-ink text-paper pt-40 pb-32 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <EyebrowLabel tone="light">BOOKING — ĐẶT LỊCH TƯ VẤN</EyebrowLabel>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <h1 className="text-display-1 font-serif text-paper text-balance leading-[0.95]">
              30 phút
              <br />
              để biết
              <br />
              hướng đi.
            </h1>
            <p className="mt-8 text-body-lg text-paper/70 max-w-md">
              Tư vấn 1:1 qua Google Meet. Mang theo vấn đề thật của doanh nghiệp — chúng tôi đưa ra
              hướng đi cụ thể, không hứa hão.
            </p>
            <div className="mt-12 space-y-6 text-body-sm text-paper/60 border-t border-paper/10 pt-8 max-w-md">
              <p>
                <span className="font-mono text-eyebrow text-paper/80 tracking-[0.16em] block mb-1">
                  AI MIỄN PHÍ
                </span>
                Cần Q&A nhanh? Chat AI 24/7 ngay tại trang chủ — không cần đặt lịch.
              </p>
              <p>
                <span className="font-mono text-eyebrow text-paper/80 tracking-[0.16em] block mb-1">
                  THANH TOÁN
                </span>
                Sau khi xác nhận slot, bạn nhận hướng dẫn chuyển khoản qua email.
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <BookingFormLoud />
          </div>
        </div>
      </div>
    </section>
  );
}
