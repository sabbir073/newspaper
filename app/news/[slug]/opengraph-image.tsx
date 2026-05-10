import { ImageResponse } from 'next/og';
import { getNewsBySlug, getAllCategories } from '@/lib/data';
import { SITE_NAME } from '@/lib/constants';
import { loadBengaliFont } from '@/lib/og';

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CAT_HEX: Record<string, string> = {
  national: '#dc2626',
  politics: '#ea580c',
  international: '#2563eb',
  sports: '#16a34a',
  entertainment: '#db2777',
  technology: '#7c3aed',
  opinion: '#d97706',
  business: '#0d9488',
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  const [bold, regular] = await Promise.all([loadBengaliFont(700), loadBengaliFont(400)]);

  if (!article) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0f172a',
            color: 'white',
            fontSize: 64,
            fontFamily: 'Bengali, sans-serif',
          }}
        >
          {SITE_NAME}
        </div>
      ),
      {
        ...size,
        fonts: bold
          ? [{ name: 'Bengali', data: bold, style: 'normal', weight: 700 }]
          : [],
      }
    );
  }

  const category = getAllCategories().find((c) => c.id === article.categoryId);
  const accent = category ? CAT_HEX[category.slug] || '#dc2626' : '#dc2626';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0b1120',
          color: 'white',
          fontFamily: 'Bengali, sans-serif',
          position: 'relative',
        }}
      >
        {/* Accent bar */}
        <div style={{ height: 12, background: accent, display: 'flex' }} />

        {/* Body */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 70,
          }}
        >
          {/* Top: category badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {category && (
              <div
                style={{
                  background: accent,
                  color: 'white',
                  padding: '8px 22px',
                  borderRadius: 999,
                  fontSize: 28,
                  fontWeight: 700,
                  display: 'flex',
                }}
              >
                {category.name}
              </div>
            )}
          </div>

          {/* Middle: title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.25,
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {article.title}
          </div>

          {/* Bottom: site brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '2px solid rgba(255,255,255,0.15)',
              paddingTop: 24,
            }}
          >
            <div
              style={{
                fontSize: 38,
                fontWeight: 700,
                color: accent,
              }}
            >
              {SITE_NAME}
            </div>
            <div style={{ fontSize: 26, opacity: 0.7 }}>protidin.com</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        ...(bold ? [{ name: 'Bengali', data: bold, style: 'normal' as const, weight: 700 as const }] : []),
        ...(regular ? [{ name: 'Bengali', data: regular, style: 'normal' as const, weight: 400 as const }] : []),
      ],
    }
  );
}
