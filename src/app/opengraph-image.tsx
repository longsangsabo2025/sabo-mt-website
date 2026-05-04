import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SABO M&T — Build. Automate. Create.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#000000',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          fontFamily: 'serif'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'monospace',
            fontSize: 18,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)'
          }}
        >
          <span>CUSTOM AI SOLUTIONS STUDIO</span>
          <span>SABO.COM.VN</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'serif',
            fontSize: 156,
            lineHeight: 0.95,
            letterSpacing: -4
          }}
        >
          <span>Build.</span>
          <span>Automate.</span>
          <span>Create.</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontFamily: 'sans-serif',
            fontSize: 22,
            color: 'rgba(255,255,255,0.7)'
          }}
        >
          <span style={{ maxWidth: 720 }}>
            Studio xây dựng giải pháp công nghệ và sản xuất media tùy chỉnh bằng AI — cho doanh nghiệp Việt Nam.
          </span>
          <span style={{ fontFamily: 'monospace', fontSize: 16, letterSpacing: 2 }}>SABO M&amp;T · 2026</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
