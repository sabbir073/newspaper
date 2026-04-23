import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Pagination from '@/components/ui/Pagination';
import LatestPopularTabs from '@/components/sidebar/LatestPopularTabs';
import TimeSince from '@/components/ui/TimeSince';
import { getCategoryBySlug, getNewsByCategory, getAllCategories, getAuthorById } from '@/lib/data';
import { getCategoryBgClass } from '@/lib/utils';
import { SITE_NAME } from '@/lib/constants';
import type { NewsArticle } from '@/lib/types';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; sub?: string }>;
};

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} — ${SITE_NAME}`,
    description: category.description,
  };
}

/* Full-width horizontal news card: image left, title + description right. */
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

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const currentPage = parseInt(sp.page || '1', 10);
  const result = getNewsByCategory(slug, currentPage);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main column — header + news list */}
            <div className="lg:col-span-8">
              <Breadcrumb items={[{ label: category.name }]} />

              {/* Simple header */}
              <div className="mb-6 pb-5 border-b border-border">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`w-1 h-8 rounded-full ${getCategoryBgClass(category.slug)}`} />
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{category.name}</h1>
                </div>
                <p className="text-foreground-secondary mt-1 text-[15px] sm:text-base ml-[14px]">
                  {category.description}
                </p>
              </div>

              {result.items.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-lg text-foreground-muted">এই বিভাগে কোনো সংবাদ পাওয়া যায়নি</p>
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
                    basePath={`/category/${slug}`}
                    searchParams={sp.sub ? { sub: sp.sub } : {}}
                  />
                </>
              )}
            </div>

            {/* Sidebar — starts from the top, fills the right side all the way up */}
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
