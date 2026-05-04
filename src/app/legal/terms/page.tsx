import { EyebrowLabel } from '@/components/ui/EyebrowLabel';

export const metadata = { title: 'Điều khoản dịch vụ — SABO M&T' };

export default function TermsPage() {
  return (
    <section className="bg-ink text-paper pt-40 pb-32 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 max-w-prose">
        <EyebrowLabel tone="light">PHÁP LÝ</EyebrowLabel>
        <h1 className="mt-8 text-display-2 font-serif text-paper leading-[0.95]">Điều khoản dịch vụ</h1>
        <p className="mt-4 font-mono text-eyebrow text-paper/50 tracking-[0.16em]">Cập nhật lần cuối: 29/04/2026</p>
        <div className="mt-12 space-y-8 text-body-lg text-paper/70 leading-relaxed border-t border-paper/10 pt-12">
          <p>
            Bằng việc sử dụng website sabo.com.vn, quý vị đồng ý với các điều khoản dưới đây.
            Các điều khoản dịch vụ chi tiết cho từng engagement được quy định trong hợp đồng riêng giữa hai bên.
          </p>
          <div className="border-t border-paper/10 pt-8">
            <h2 className="text-h2 font-serif text-paper mb-4">1. Sử dụng nội dung</h2>
            <p>Toàn bộ nội dung trên website (text, hình ảnh, design tokens, tài liệu) thuộc bản quyền của SABO Media &amp; Technology, ngoại trừ các nội dung trích dẫn có ghi nguồn.</p>
          </div>
          <div className="border-t border-paper/10 pt-8">
            <h2 className="text-h2 font-serif text-paper mb-4">2. Form liên hệ</h2>
            <p>Form liên hệ chỉ phục vụ mục đích kinh doanh. Việc gửi nội dung quảng cáo, spam hoặc lừa đảo qua form sẽ bị từ chối phục vụ và có thể bị báo cáo đến cơ quan chức năng.</p>
          </div>
          <div className="border-t border-paper/10 pt-8">
            <h2 className="text-h2 font-serif text-paper mb-4">3. Liên hệ</h2>
            <p>contact@sabo.com.vn</p>
          </div>
        </div>
      </div>
    </section>
  );
}
