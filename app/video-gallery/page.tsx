import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import VideoGalleryGrid from '@/components/gallery/VideoGalleryGrid';
import { getAllVideos } from '@/lib/data';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `ভিডিও গ্যালারি — ${SITE_NAME}`,
  description: 'সাম্প্রতিক ও জনপ্রিয় ভিডিও সংবাদ ও প্রতিবেদন।',
};

export default function VideoGalleryPage() {
  const videos = getAllVideos();

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumb items={[{ label: 'ভিডিও গ্যালারি' }]} />

          <header className="mb-6 pb-5 border-b border-border">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-1 h-8 bg-accent rounded-full" />
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">ভিডিও গ্যালারি</h1>
            </div>
            <p className="text-foreground-secondary text-[15px] sm:text-base ml-[14px]">
              বিশেষ প্রতিবেদন, সাক্ষাৎকার ও সংবাদের ভিডিও
            </p>
          </header>

          <VideoGalleryGrid videos={videos} />
        </div>
      </main>
      <Footer />
    </>
  );
}
