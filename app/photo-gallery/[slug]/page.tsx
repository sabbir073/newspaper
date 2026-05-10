import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PhotoAlbumGrid from '@/components/gallery/PhotoAlbumGrid';
import { getPhotoAlbumBySlug, getAllPhotoAlbums } from '@/lib/data';
import { formatBanglaDateShort, toBanglaDigits } from '@/lib/bangla';
import { SITE_NAME } from '@/lib/constants';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPhotoAlbums().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = getPhotoAlbumBySlug(slug);
  if (!album) return {};
  return {
    title: `${album.title} — ${SITE_NAME}`,
    description: `${album.title} — ${album.images.length}টি ছবি সংবলিত ফটো অ্যালবাম।`,
    openGraph: {
      title: album.title,
      description: `${album.images.length}টি ছবি সংবলিত ফটো অ্যালবাম`,
      images: [{ url: album.coverImage }],
    },
  };
}

export default async function PhotoAlbumDetailPage({ params }: Props) {
  const { slug } = await params;
  const album = getPhotoAlbumBySlug(slug);
  if (!album) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumb
            items={[
              { label: 'ফটো গ্যালারি', href: '/photo-gallery' },
              { label: album.title },
            ]}
          />

          <header className="mb-6 pb-5 border-b border-border">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-3">
              {album.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-foreground-muted">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                  <circle cx="12" cy="12" r="3.2" />
                </svg>
                {toBanglaDigits(album.images.length)} ছবি
              </span>
              <span>·</span>
              <span>{formatBanglaDateShort(album.publishedAt)}</span>
            </div>
          </header>

          <PhotoAlbumGrid images={album.images} albumTitle={album.title} />
        </div>
      </main>
      <Footer />
    </>
  );
}
