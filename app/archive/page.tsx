import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Pagination from '@/components/ui/Pagination';
import ArchiveDateFilter from '@/components/search/ArchiveDateFilter';
import TimeSince from '@/components/ui/TimeSince';
import { getArchiveNewsByDate, getLatestNews } from '@/lib/data';
import { formatBanglaDateShort, toBanglaDigits } from '@/lib/bangla';
import { SITE_NAME } from '@/lib/constants';
import type { NewsArticle } from '@/lib/types';

export const metadata: Metadata = {
  title: `আর্কাইভ — ${SITE_NAME}`,
  description: 'তারিখ অনুযায়ী সংবাদ আর্কাইভ ব্রাউজ করুন',
};

type Props = {
  searchParams: Promise<{ date?: string; page?: string }>;
};

/* Grid card — image top, title bottom */
function ArchiveCard({ article }: { article: NewsArticle }) {
  return (
    <article className="group rounded-lg overflow-hidden bg-card border border-border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex flex-col">
      <Link href={`/news/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </Link>
      <div className="p-3 flex-1 flex flex-col">
        <Link href={`/news/${article.slug}`}>
          <h3 className="text-[15px] sm:text-base leading-snug line-clamp-3 text-foreground group-hover:text-accent transition-colors font-semibold">
            {article.title}
          </h3>
        </Link>
        <div className="mt-auto pt-2 text-xs text-foreground-muted">
          <TimeSince date={article.publishedAt} />
        </div>
      </div>
    </article>
  );
}

export default async function ArchivePage({ searchParams }: Props) {
  const sp = await searchParams;
  const date = sp.date;
  const currentPage = parseInt(sp.page || '1', 10);
  const result = date ? getArchiveNewsByDate(date, currentPage, 16) : getLatestNews(currentPage, 16);

  const paginationParams: Record<string, string> = {};
  if (date) paginationParams.date = date;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <Breadcrumb items={[{ label: 'আর্কাইভ' }]} />
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-6">
          {/* Header — title left, filter right, single row on desktop */}
          <div className="mb-6 pb-5 border-b border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-1">আর্কাইভ</h1>
              <p className="text-foreground-secondary text-[15px] sm:text-base">
                তারিখ অনুযায়ী সংবাদ ব্রাউজ করুন
              </p>
            </div>
            <ArchiveDateFilter defaultDate={date} />
          </div>

          {/* Result summary */}
          {date && (
            <p className="mb-5 text-[15px] text-foreground-secondary">
              <span className="text-foreground font-medium">{formatBanglaDateShort(date)}</span>
              {' — '}
              <span className="text-foreground font-semibold">{toBanglaDigits(result.totalItems)}</span>টি সংবাদ পাওয়া গেছে
            </p>
          )}

          {/* Grid */}
          {result.items.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {result.items.map((article) => (
                  <ArchiveCard key={article.id} article={article} />
                ))}
              </div>

              <Pagination
                currentPage={result.currentPage}
                totalPages={result.totalPages}
                basePath="/archive"
                searchParams={paginationParams}
              />
            </>
          ) : (
            <div className="text-center py-20 rounded-xl border border-border bg-card">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-background-tertiary flex items-center justify-center text-foreground-muted">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-foreground">কোনো সংবাদ পাওয়া যায়নি</p>
              <p className="text-sm text-foreground-muted mt-1">অন্য তারিখের পরিসর নির্বাচন করুন</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
