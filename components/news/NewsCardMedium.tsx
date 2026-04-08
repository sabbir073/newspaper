import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/lib/types';
import TimeSince from '@/components/ui/TimeSince';

export default function NewsCardMedium({ article }: { article: NewsArticle }) {
  return (
    <article className="group">
      <Link href={`/news/${article.slug}`} className="block">
        <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-2">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25%"
          />
        </div>
      </Link>
      <Link href={`/news/${article.slug}`}>
        <h3 className="text-base sm:text-lg font-semibold leading-snug line-clamp-2 hover:text-accent transition-colors">
          {article.title}
        </h3>
      </Link>
      <div className="mt-1">
        <TimeSince date={article.publishedAt} />
      </div>
    </article>
  );
}
