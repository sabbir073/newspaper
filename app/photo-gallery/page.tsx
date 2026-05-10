import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getAllPhotoAlbums } from '@/lib/data';
import { formatBanglaDateShort, toBanglaDigits } from '@/lib/bangla';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `ফটো গ্যালারি — ${SITE_NAME}`,
  description: 'বাছাইকৃত আলোকচিত্র ও ফটো অ্যালবাম দেখুন।',
};

export default function PhotoGalleryIndexPage() {
  const albums = getAllPhotoAlbums();

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumb items={[{ label: 'ফটো গ্যালারি' }]} />

          <header className="mb-6 pb-5 border-b border-border">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-1 h-8 bg-accent rounded-full" />
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">ফটো গ্যালারি</h1>
            </div>
            <p className="text-foreground-secondary text-[15px] sm:text-base ml-[14px]">
              সাম্প্রতিক ঘটনা ও বিশেষ মুহূর্তের আলোকচিত্র
            </p>
          </header>

          {albums.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-foreground-muted">কোনো ফটো অ্যালবাম পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {albums.map((album) => (
                <Link
                  key={album.id}
                  href={`/photo-gallery/${album.slug}`}
                  className="group rounded-xl overflow-hidden bg-card border border-border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={album.coverImage}
                      alt={album.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-xs font-medium">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                        <circle cx="12" cy="12" r="3.2" />
                      </svg>
                      {toBanglaDigits(album.images.length)} ছবি
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-base sm:text-lg font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                      {album.title}
                    </h2>
                    <div className="mt-auto pt-3 text-xs text-foreground-muted">
                      {formatBanglaDateShort(album.publishedAt)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
