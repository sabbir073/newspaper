import Link from 'next/link';
import { getLatestNews } from '@/lib/data';
import TimeSince from '@/components/ui/TimeSince';

export default function LatestWidget() {
  const { items } = getLatestNews(1, 5);

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="text-lg font-bold mb-3 pb-2 border-b border-border">সর্বশেষ সংবাদ</h3>
      <ul className="space-y-0">
        {items.map((article) => (
          <li key={article.id} className="py-2.5 border-b border-border last:border-b-0">
            <Link href={`/news/${article.slug}`}>
              <h4 className="text-sm font-medium leading-snug line-clamp-2 hover:text-accent transition-colors">
                {article.title}
              </h4>
            </Link>
            <div className="mt-1">
              <TimeSince date={article.publishedAt} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
