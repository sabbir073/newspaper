import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants';
import { loadBengaliFont } from '@/lib/og';

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const fontData = await loadBengaliFont(700);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
          color: 'white',
          padding: 80,
          fontFamily: 'Bengali, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: -2,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 36,
            opacity: 0.92,
            textAlign: 'center',
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: 'Bengali', data: fontData, style: 'normal', weight: 700 }]
        : [],
    }
  );
}
