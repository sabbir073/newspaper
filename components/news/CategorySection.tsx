import { getNewsByCategoryForHome, getCategoryBySlug } from '@/lib/data';
import NewsCardLarge from './NewsCardLarge';
import NewsCardMinimal from './NewsCardMinimal';
import SectionHeader from '@/components/ui/SectionHeader';
import { getCategoryBgClass } from '@/lib/utils';

interface CategorySectionProps {
  categorySlug: string;
  reverse?: boolean;
}

export default function CategorySection({ categorySlug, reverse = false }: CategorySectionProps) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;

  const news = getNewsByCategoryForHome(categorySlug, 5);
  if (news.length === 0) return null;

  const lead = news[0];
  const rest = news.slice(1);

  const leadCol = (
    <div className="lg:col-span-5">
      <NewsCardLarge article={lead} showExcerpt={false} />
    </div>
  );

  const listCol = (
    <div className="lg:col-span-7">
      {rest.map((article) => (
        <NewsCardMinimal key={article.id} article={article} />
      ))}
    </div>
  );

  return (
    <section className="mb-8">
      <SectionHeader
        title={category.name}
        href={`/category/${category.slug}`}
        colorClass={getCategoryBgClass(category.slug)}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {reverse ? (
          <>
            {listCol}
            {leadCol}
          </>
        ) : (
          <>
            {leadCol}
            {listCol}
          </>
        )}
      </div>
    </section>
  );
}
