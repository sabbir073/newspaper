import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Pagination from '@/components/ui/Pagination';
import TimeSince from '@/components/ui/TimeSince';
import { getAuthorById, getNewsByAuthor, getAllAuthors } from '@/lib/data';
import { toBanglaDigits } from '@/lib/bangla';
import { SITE_NAME } from '@/lib/constants';
import type { NewsArticle } from '@/lib/types';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  return getAllAuthors().map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const author = getAuthorById(id);
  if (!author) return {};
  return {
    title: `${author.name} — ${SITE_NAME}`,
    description: author.bio || `${author.name} এর প্রকাশিত সংবাদ ও প্রতিবেদন।`,
  };
}

function NewsListCard({ article }: { article: NewsArticle }) {
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
          <TimeSince date={article.publishedAt} />
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {toBanglaDigits(article.viewCount)}
          </span>
        </div>
      </div>
    </article>
  );
}

export default async function AuthorPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const author = getAuthorById(id);
  if (!author) notFound();

  const currentPage = parseInt(sp.page || '1', 10);
  const result = getNewsByAuthor(id, currentPage);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Breadcrumb items={[{ label: author.name }]} />

          {/* Author profile header */}
          <header className="mb-7 pb-6 border-b border-border">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full bg-accent/10 text-accent flex items-center justify-center text-3xl sm:text-4xl font-bold">
                {author.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                  {author.name}
                </h1>
                <div className="text-sm text-accent font-semibold mb-2">{author.role}</div>
                {author.bio && (
                  <p className="text-foreground-secondary leading-relaxed text-[15px]">
                    {author.bio}
                  </p>
                )}
                <div className="mt-3 inline-flex items-center gap-2 text-sm text-foreground-muted">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  মোট প্রকাশিত সংবাদ:{' '}
                  <span className="font-semibold text-foreground">
                    {toBanglaDigits(result.totalItems)}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Article list */}
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-1 h-7 bg-accent rounded-full" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {author.name}-এর প্রকাশিত সংবাদ
            </h2>
          </div>

          {result.items.length === 0 ? (
            <div className="text-center py-16 rounded-xl border border-border bg-card">
              <p className="text-lg text-foreground-muted">এই লেখকের কোনো প্রকাশিত সংবাদ পাওয়া যায়নি</p>
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
                basePath={`/author/${id}`}
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
