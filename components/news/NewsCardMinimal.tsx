import Link from 'next/link';
import type { NewsArticle } from '@/lib/types';
import TimeSince from '@/components/ui/TimeSince';

export default function NewsCardMinimal({ article }: { article: NewsArticle }) {
  return (
    <article className="py-3 border-b border-border last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <Link href={`/news/${article.slug}`} className="flex-1 min-w-0">
          <h3 className="text-[15px] font-medium leading-snug line-clamp-2 hover:text-accent transition-colors">
            {article.title}
          </h3>
        </Link>
        <TimeSince date={article.publishedAt} />
      </div>
    </article>
  );
}
