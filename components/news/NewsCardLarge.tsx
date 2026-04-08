import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/lib/types';
import { getAllCategories, getAuthorById } from '@/lib/data';
import TimeSince from '@/components/ui/TimeSince';

interface NewsCardLargeProps {
  article: NewsArticle;
  showExcerpt?: boolean;
  priority?: boolean;
}

export default function NewsCardLarge({ article, showExcerpt = true, priority = false }: NewsCardLargeProps) {
  const categories = getAllCategories();
  const category = categories.find((c) => c.id === article.categoryId);
  const author = getAuthorById(article.authorId);

  return (
    <article className="group">
      <Link href={`/news/${article.slug}`} className="block">
        <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 58%"
            priority={priority}
          />
          {category && (
            <span
              className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-semibold text-white"
              style={{ backgroundColor: `var(--cat-${category.slug})` }}
            >
              {category.name}
            </span>
          )}
        </div>
      </Link>
      <div>
        <Link href={`/news/${article.slug}`}>
          <h3 className="text-xl sm:text-2xl font-bold leading-snug line-clamp-3 hover:text-accent transition-colors">
            {article.title}
          </h3>
        </Link>
        {showExcerpt && (
          <p className="mt-2 text-sm text-foreground-secondary line-clamp-2">{article.excerpt}</p>
        )}
        <div className="mt-2 flex items-center gap-2 text-xs text-foreground-muted">
          {author && <span>{author.name}</span>}
          {author && <span>·</span>}
          <TimeSince date={article.publishedAt} />
        </div>
      </div>
    </article>
  );
}
