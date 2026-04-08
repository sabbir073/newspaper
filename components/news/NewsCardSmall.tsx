import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/lib/types';

export default function NewsCardSmall({ article }: { article: NewsArticle }) {
  return (
    <article className="group flex gap-3">
      <Link href={`/news/${article.slug}`} className="shrink-0">
        <div className="relative w-20 h-[60px] rounded overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="80px"
          />
        </div>
      </Link>
      <Link href={`/news/${article.slug}`} className="flex-1 min-w-0">
        <h3 className="text-sm font-medium leading-snug line-clamp-2 hover:text-accent transition-colors">
          {article.title}
        </h3>
      </Link>
    </article>
  );
}
