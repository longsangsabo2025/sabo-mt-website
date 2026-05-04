import { EyebrowLabel } from '@/components/ui/EyebrowLabel';

export const metadata = { title: 'Chính sách bảo mật — SABO M&T' };

export default function PrivacyPage() {
  return (
    <section className="bg-ink text-paper pt-40 pb-32 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 max-w-prose">
        <EyebrowLabel tone="light">PHÁP LÝ</EyebrowLabel>
        <h1 className="mt-8 text-display-2 font-serif text-paper leading-[0.95]">Chính sách bảo mật</h1>
        <p className="mt-4 font-mono text-eyebrow text-paper/50 tracking-[0.16em]">Cập nhật lần cuối: 29/04/2026</p>
        <div className="mt-12 space-y-8 text-body-lg text-paper/70 leading-relaxed border-t border-paper/10 pt-12">
          <p>
            SABO Media &amp; Technology (gọi tắt &ldquo;SABO M&amp;T&rdquo;, &ldquo;chúng tôi&rdquo;) tôn trọng quyền riêng tư của quý vị.
            Tài liệu này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân thu thập qua website sabo.com.vn.
          </p>
          <div className="border-t border-paper/10 pt-8">
            <h2 className="text-h2 font-serif text-paper mb-4">1. Thông tin chúng tôi thu thập</h2>
            <p>Khi quý vị điền form liên hệ, chúng tôi thu thập: họ tên, email công ty, số điện thoại (tùy chọn), tên công ty, vai trò, quy mô doanh nghiệp, dịch vụ quan tâm và mô tả nhu cầu.</p>
          </div>
          <div className="border-t border-paper/10 pt-8">
            <h2 className="text-h2 font-serif text-paper mb-4">2. Mục đích sử dụng</h2>
            <p>Thông tin được sử dụng để: phản hồi yêu cầu của quý vị, gửi báo giá hoặc tài liệu được yêu cầu, lưu trữ trong CRM nội bộ phục vụ hợp đồng dịch vụ.</p>
          </div>
          <div className="border-t border-paper/10 pt-8">
            <h2 className="text-h2 font-serif text-paper mb-4">3. Bên thứ ba</h2>
            <p>Chúng tôi không bán hoặc cho thuê dữ liệu cá nhân. Dữ liệu được lưu trên hạ tầng đám mây của Supabase và Vercel — đối tác công nghệ tuân thủ chuẩn bảo mật quốc tế.</p>
          </div>
          <div className="border-t border-paper/10 pt-8">
            <h2 className="text-h2 font-serif text-paper mb-4">4. Liên hệ</h2>
            <p>Mọi yêu cầu xoá hoặc cập nhật dữ liệu cá nhân, vui lòng liên hệ: contact@sabo.com.vn</p>
          </div>
        </div>
      </div>
    </section>
  );
}
