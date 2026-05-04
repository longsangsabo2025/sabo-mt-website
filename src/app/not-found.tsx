import { PillCTA } from '@/components/ui/PillCTA';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] grid place-items-center bg-ink">
      <div className="container-page text-center max-w-xl">
        <EyebrowLabel>404</EyebrowLabel>
        <h1 className="mt-5 font-serif text-display-2 text-paper">Trang quý vị tìm không tồn tại.</h1>
        <p className="mt-4 text-body text-paper/60">
          Có thể link đã thay đổi hoặc bị xoá. Quý vị có thể quay về trang chủ hoặc liên hệ với chúng tôi.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <PillCTA href="/" variant="light">Về trang chủ</PillCTA>
          <PillCTA href="/contact" variant="outline">Liên hệ</PillCTA>
        </div>
      </div>
    </section>
  );
}
