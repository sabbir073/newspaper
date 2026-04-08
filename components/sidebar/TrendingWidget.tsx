import Link from 'next/link';
import { getTrendingNews } from '@/lib/data';
import { toBanglaDigits } from '@/lib/bangla';

export default function TrendingWidget() {
  const trending = getTrendingNews(10);

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="text-lg font-bold mb-3 pb-2 border-b border-border">সর্বাধিক পঠিত</h3>
      <ol className="space-y-0">
        {trending.map((article, idx) => (
          <li key={article.id} className="flex gap-3 py-2.5 border-b border-border last:border-b-0">
            <span className="text-2xl font-bold text-accent/30 leading-none w-7 shrink-0 text-center">
              {toBanglaDigits(idx + 1)}
            </span>
            <Link href={`/news/${article.slug}`} className="flex-1 min-w-0">
              <h4 className="text-sm font-medium leading-snug line-clamp-2 hover:text-accent transition-colors">
                {article.title}
              </h4>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
