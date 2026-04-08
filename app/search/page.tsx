import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsListItem from '@/components/news/NewsListItem';
import Pagination from '@/components/ui/Pagination';
import SearchInput from '@/components/search/SearchInput';
import { searchNews, getAllCategories } from '@/lib/data';
import { toBanglaDigits } from '@/lib/bangla';
import { SITE_NAME } from '@/lib/constants';

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

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = sp.q || '';
  const result = searchNews(sp);
  const categories = getAllCategories();

  const currentSearchParams: Record<string, string> = {};
  if (sp.q) currentSearchParams.q = sp.q;
  if (sp.category) currentSearchParams.category = sp.category;
  if (sp.dateFrom) currentSearchParams.dateFrom = sp.dateFrom;
  if (sp.dateTo) currentSearchParams.dateTo = sp.dateTo;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">অনুসন্ধান</h1>

          <SearchInput defaultValue={q} categories={categories} searchParams={sp} />

          {q && (
            <p className="text-sm text-foreground-muted mb-4">
              &apos;{q}&apos; এর জন্য {toBanglaDigits(result.totalItems)}টি ফলাফল পাওয়া গেছে
            </p>
          )}

          {result.items.length > 0 ? (
            <div>
              {result.items.map((article) => (
                <NewsListItem key={article.id} article={article} />
              ))}
              <Pagination
                currentPage={result.currentPage}
                totalPages={result.totalPages}
                basePath="/search"
                searchParams={currentSearchParams}
              />
            </div>
          ) : q ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-lg text-foreground-muted">কোনো ফলাফল পাওয়া যায়নি</p>
              <p className="text-sm text-foreground-muted mt-1">অন্য কিছু দিয়ে অনুসন্ধান করুন</p>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-foreground-muted">সংবাদ খুঁজতে উপরে লিখুন</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
