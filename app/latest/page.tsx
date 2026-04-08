import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsListItem from '@/components/news/NewsListItem';
import Pagination from '@/components/ui/Pagination';
import { getLatestNews } from '@/lib/data';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `সর্বশেষ সংবাদ — ${SITE_NAME}`,
  description: 'সর্বশেষ সকল সংবাদ পড়ুন',
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function LatestPage({ searchParams }: Props) {
  const sp = await searchParams;
  const currentPage = parseInt(sp.page || '1', 10);
  const result = getLatestNews(currentPage);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-accent rounded-full" />
            <h1 className="text-2xl sm:text-3xl font-bold">সর্বশেষ সংবাদ</h1>
          </div>

          <div className="border-l-2 border-accent/20 pl-4">
            {result.items.map((article) => (
              <NewsListItem key={article.id} article={article} />
            ))}
          </div>

          <Pagination
            currentPage={result.currentPage}
            totalPages={result.totalPages}
            basePath="/latest"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
