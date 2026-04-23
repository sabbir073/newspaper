import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Pagination from '@/components/ui/Pagination';
import SearchInput from '@/components/search/SearchInput';
import LatestPopularTabs from '@/components/sidebar/LatestPopularTabs';
import TimeSince from '@/components/ui/TimeSince';
import { searchNews, getAuthorById } from '@/lib/data';
import { toBanglaDigits } from '@/lib/bangla';
import { SITE_NAME } from '@/lib/constants';
import type { NewsArticle } from '@/lib/types';

export const metadata: Metadata = {
  title: `অনুসন্ধান — ${SITE_NAME}`,
  description: 'সংবাদ অনুসন্ধান করুন',
};

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: string;
  }>;
};

/* Full-width horizontal news card — matches category page */
function NewsListCard({ article }: { article: NewsArticle }) {
  const author = getAuthorById(article.authorId);

  return (
    <article className="group flex overflow-hidden rounded-lg border border-border bg-card hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
      <Link href={`/news/${article.slug}`} className="shrink-0">
        <div className="relative w-[140px] sm:w-[220px] md:w-[260px] h-full min-h-[120px] sm:min-h-[160px] overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 140px, 260px"
          />
        </div>
      </Link>

      <div className="flex-1 min-w-0 p-3.5 sm:p-5 flex flex-col justify-center">
        <Link href={`/news/${article.slug}`}>
          <h3 className="text-[17px] sm:text-xl leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors font-semibold">
            {article.title}
          </h3>
        </Link>
        <p className="hidden sm:block text-[15px] text-foreground-secondary line-clamp-2 mt-2 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-foreground-muted">
          {author && <span className="font-medium">{author.name}</span>}
          {author && <span>·</span>}
          <TimeSince date={article.publishedAt} />
        </div>
      </div>
    </article>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = sp.q || '';
  const result = searchNews(sp);

  const currentSearchParams: Record<string, string> = {};
  if (sp.q) currentSearchParams.q = sp.q;
  if (sp.dateFrom) currentSearchParams.dateFrom = sp.dateFrom;
  if (sp.dateTo) currentSearchParams.dateTo = sp.dateTo;

  const hasQuery = Boolean(q || sp.dateFrom || sp.dateTo);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main column */}
            <div className="lg:col-span-8">
              <Breadcrumb items={[{ label: 'অনুসন্ধান' }]} />

              {/* Header */}
              <div className="mb-6 pb-5 border-b border-border">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-1 h-8 rounded-full bg-accent" />
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground">অনুসন্ধান</h1>
                </div>
                <p className="text-foreground-secondary mt-1 text-[15px] sm:text-base ml-[14px]">
                  সংবাদ, বিষয় বা ট্যাগ অনুযায়ী খুঁজে দেখুন
                </p>
              </div>

              {/* Search input */}
              <SearchInput defaultValue={q} />

              {/* Result count */}
              {hasQuery && q && (
                <div className="mb-5">
                  <p className="text-[17px] text-foreground-secondary">
                    <span className="text-foreground font-semibold">&ldquo;{q}&rdquo;</span> এর জন্য{' '}
                    <span className="text-foreground font-semibold">{toBanglaDigits(result.totalItems)}</span>টি ফলাফল পাওয়া গেছে
                  </p>
                </div>
              )}

              {/* Results */}
              {result.items.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {result.items.map((article) => (
                      <NewsListCard key={article.id} article={article} />
                    ))}
                  </div>

                  <Pagination
                    currentPage={result.currentPage}
                    totalPages={result.totalPages}
                    basePath="/search"
                    searchParams={currentSearchParams}
                  />
                </>
              ) : hasQuery ? (
                <div className="text-center py-16 rounded-xl border border-border bg-card">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-background-tertiary flex items-center justify-center text-foreground-muted">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-foreground">কোনো ফলাফল পাওয়া যায়নি</p>
                  <p className="text-sm text-foreground-muted mt-1">অন্য কিওয়ার্ড দিয়ে অনুসন্ধান করুন</p>
                </div>
              ) : (
                <div className="text-center py-16 rounded-xl border border-border bg-card">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-foreground">কি খুঁজতে চান?</p>
                  <p className="text-sm text-foreground-muted mt-1">উপরের ইনপুট বক্সে লিখে অনুসন্ধান শুরু করুন</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-20">
                <LatestPopularTabs showMap={false} />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
