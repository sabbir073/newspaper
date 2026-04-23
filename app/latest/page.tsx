import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Pagination from '@/components/ui/Pagination';
import TimeSince from '@/components/ui/TimeSince';
import { getLatestNews, getAuthorById } from '@/lib/data';
import { SITE_NAME } from '@/lib/constants';
import type { NewsArticle } from '@/lib/types';

export const metadata: Metadata = {
  title: `সর্বশেষ সংবাদ — ${SITE_NAME}`,
  description: 'সর্বশেষ সকল সংবাদ পড়ুন',
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

/* Full-width horizontal news card — matches category/search pages */
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

export default async function LatestPage({ searchParams }: Props) {
  const sp = await searchParams;
  const currentPage = parseInt(sp.page || '1', 10);
  const result = getLatestNews(currentPage);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Breadcrumb — full page width */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <Breadcrumb items={[{ label: 'সর্বশেষ সংবাদ' }]} />
        </div>

        {/* Centered content column */}
        <div className="max-w-4xl mx-auto px-4 pb-6">
          {/* Header — centered */}
          <div className="mb-6 pb-5 border-b border-border text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">সর্বশেষ সংবাদ</h1>
            <p className="text-foreground-secondary text-[15px] sm:text-base">
              সকল বিভাগের নতুন প্রকাশিত সংবাদ, সময়ক্রম অনুযায়ী সাজানো
            </p>
          </div>

          {result.items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-foreground-muted">কোনো সংবাদ পাওয়া যায়নি</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {result.items.map((article) => (
                  <NewsListCard key={article.id} article={article} />
                ))}
              </div>

              <Pagination
                currentPage={result.currentPage}
                totalPages={result.totalPages}
                basePath="/latest"
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
