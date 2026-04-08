import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Pagination from '@/components/ui/Pagination';
import NewsCardLarge from '@/components/news/NewsCardLarge';
import NewsCardMedium from '@/components/news/NewsCardMedium';
import Sidebar from '@/components/sidebar/Sidebar';
import { getCategoryBySlug, getNewsByCategory, getAllCategories } from '@/lib/data';
import { getCategoryBgClass } from '@/lib/utils';
import { SITE_NAME } from '@/lib/constants';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
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

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page } = await searchParams;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const currentPage = parseInt(page || '1', 10);
  const result = getNewsByCategory(slug, currentPage);
  const lead = result.items[0];
  const rest = result.items.slice(1);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumb items={[{ label: category.name }]} />

          <div className="mb-6">
            <div className={`h-1.5 w-20 rounded-full ${getCategoryBgClass(category.slug)} mb-3`} />
            <h1 className="text-3xl sm:text-4xl font-bold">{category.name}</h1>
            <p className="text-foreground-secondary mt-1">{category.description}</p>
          </div>

          {category.subcategories.length > 0 && (
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-accent text-white whitespace-nowrap">সব</span>
              {category.subcategories.map((sub) => (
                <span key={sub.id} className="px-3 py-1.5 text-sm font-medium rounded-full border border-border hover:bg-background-tertiary transition-colors cursor-pointer whitespace-nowrap">
                  {sub.name}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {lead && (
                <div className="mb-6">
                  <NewsCardLarge article={lead} />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((article) => (
                  <NewsCardMedium key={article.id} article={article} />
                ))}
              </div>
              <Pagination
                currentPage={result.currentPage}
                totalPages={result.totalPages}
                basePath={`/category/${slug}`}
              />
            </div>
            <div className="lg:col-span-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
