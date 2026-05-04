import { EyebrowLabel } from '@/components/ui/EyebrowLabel';

export const metadata = { title: 'Chính sách Cookies — SABO M&T' };

export default function CookiesPage() {
  return (
    <section className="bg-ink text-paper pt-40 pb-32 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 max-w-prose">
        <EyebrowLabel tone="light">PHÁP LÝ</EyebrowLabel>
        <h1 className="mt-8 text-display-2 font-serif text-paper leading-[0.95]">Chính sách Cookies</h1>
        <p className="mt-4 font-mono text-eyebrow text-paper/50 tracking-[0.16em]">Cập nhật lần cuối: 29/04/2026</p>
        <div className="mt-12 space-y-8 text-body-lg text-paper/70 leading-relaxed border-t border-paper/10 pt-12">
          <p>
            Website sabo.com.vn sử dụng cookies kỹ thuật tối thiểu để đảm bảo trải nghiệm cơ bản và đo lường lưu lượng tổng quát.
            Chúng tôi không dùng cookies quảng cáo bên thứ ba.
          </p>
          <div className="border-t border-paper/10 pt-8">
            <h2 className="text-h2 font-serif text-paper mb-4">Cookies chúng tôi dùng</h2>
            <ul className="list-none space-y-4">
              <li className="border-l-2 border-paper/20 pl-5">Session cookies — duy trì trạng thái form khi quý vị điền dở.</li>
              <li className="border-l-2 border-paper/20 pl-5">Analytics cookies — đo lường lưu lượng tổng quát (không cá nhân hóa).</li>
            </ul>
          </div>
          <p>Quý vị có thể vô hiệu hóa cookies trong cài đặt trình duyệt mà không ảnh hưởng đến nội dung tĩnh của website.</p>
        </div>
      </div>
    </section>
  );
}
