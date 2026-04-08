import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/lib/types';
import { getAllCategories, getAuthorById } from '@/lib/data';
import TimeSince from '@/components/ui/TimeSince';

export default function NewsListItem({ article }: { article: NewsArticle }) {
  const categories = getAllCategories();
  const category = categories.find((c) => c.id === article.categoryId);
  const author = getAuthorById(article.authorId);

  return (
    <article className="group flex gap-4 py-4 border-b border-border last:border-b-0">
      <Link href={`/news/${article.slug}`} className="shrink-0">
        <div className="relative w-[200px] h-[130px] rounded-md overflow-hidden max-sm:w-[120px] max-sm:h-[80px]">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 120px, 200px"
          />
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        {category && (
          <Link
            href={`/category/${category.slug}`}
            className="text-xs font-semibold hover:underline"
            style={{ color: `var(--cat-${category.slug})` }}
          >
            {category.name}
          </Link>
        )}
        <Link href={`/news/${article.slug}`}>
          <h3 className="text-base sm:text-lg font-semibold leading-snug line-clamp-2 mt-0.5 hover:text-accent transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="text-sm text-foreground-secondary line-clamp-2 mt-1 hidden sm:block">{article.excerpt}</p>
        <div className="mt-1.5 flex items-center gap-2 text-xs text-foreground-muted">
          {author && <span>{author.name}</span>}
          {author && <span>·</span>}
          <TimeSince date={article.publishedAt} />
        </div>
      </div>
    </article>
  );
}
