import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsListItem from '@/components/news/NewsListItem';
import Pagination from '@/components/ui/Pagination';
import ArchiveDatePicker from '@/components/search/ArchiveDatePicker';
import { getArchiveDates, getArchiveNewsByDate, getLatestNews } from '@/lib/data';
import { formatBanglaDateShort } from '@/lib/bangla';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `আর্কাইভ — ${SITE_NAME}`,
  description: 'তারিখ অনুযায়ী সংবাদ আর্কাইভ ব্রাউজ করুন',
};

type Props = {
  searchParams: Promise<{ date?: string; page?: string }>;
};

export default async function ArchivePage({ searchParams }: Props) {
  const sp = await searchParams;
  const dates = getArchiveDates();
  const selectedDate = sp.date || dates[0] || '';
  const currentPage = parseInt(sp.page || '1', 10);

  const result = selectedDate
    ? getArchiveNewsByDate(selectedDate, currentPage)
    : getLatestNews(currentPage);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">আর্কাইভ</h1>

          <ArchiveDatePicker dates={dates} selectedDate={selectedDate} />

          {selectedDate && (
            <h2 className="text-lg font-semibold mb-4 mt-6 pb-2 border-b border-border">
              {formatBanglaDateShort(selectedDate)}
            </h2>
          )}

          {result.items.length > 0 ? (
            <div>
              {result.items.map((article) => (
                <NewsListItem key={article.id} article={article} />
              ))}
              <Pagination
                currentPage={result.currentPage}
                totalPages={result.totalPages}
                basePath="/archive"
                searchParams={selectedDate ? { date: selectedDate } : {}}
              />
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-foreground-muted">এই তারিখে কোনো সংবাদ পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
