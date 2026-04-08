import Link from 'next/link';
import Image from 'next/image';
import { getNewsByCategoryForHome, getCategoryBySlug } from '@/lib/data';
import SectionHeader from '@/components/ui/SectionHeader';
import { getCategoryBgClass } from '@/lib/utils';

interface CategorySectionProps {
  categorySlug: string;
  variant?: 'lead-list' | 'lead-titles' | 'grid-cards' | 'list-only' | 'lead-duo' | 'image-right-list' | 'image-left-list' | 'stacked-cards' | 'vertical-cards' | 'duo-grid' | 'titles-only';
  titleOverride?: string;
  newsOffset?: number;
  count?: number;
}

export default function CategorySection({ categorySlug, variant = 'lead-list', titleOverride, newsOffset = 0, count }: CategorySectionProps) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;

  const defaults: Record<string, number> = {
    'lead-list': 8,
    'lead-titles': 4,
    'grid-cards': 5,
    'list-only': 6,
    'lead-duo': 5,
    'image-right-list': 6,
    'image-left-list': 5,
    'stacked-cards': 2,
    'vertical-cards': 4,
    'duo-grid': 6,
    'titles-only': 8,
  };
  const limit = count || defaults[variant] || 5;
  const fetchLimit = limit + newsOffset;
  const allNews = getNewsByCategoryForHome(categorySlug, fetchLimit);
  const news = allNews.slice(newsOffset, newsOffset + limit);
  if (news.length === 0) return null;

  const displayName = titleOverride || category.name;
  const colorClass = getCategoryBgClass(category.slug);

  return (
    <section>
      <SectionHeader
        title={displayName}
        href={`/category/${category.slug}`}
        colorClass={colorClass}
      />

      {variant === 'lead-list' && <LeadListLayout news={news} />}
      {variant === 'lead-titles' && <LeadTitlesLayout news={news} />}
      {variant === 'grid-cards' && <GridCardsLayout news={news} />}
      {variant === 'list-only' && <ListOnlyLayout news={news} />}
      {variant === 'lead-duo' && <LeadDuoLayout news={news} />}
      {variant === 'image-right-list' && <ImageRightListLayout news={news} />}
      {variant === 'image-left-list' && <ImageLeftListLayout news={news} />}
      {variant === 'vertical-cards' && <VerticalCardsLayout news={news} />}
      {variant === 'duo-grid' && <DuoGridLayout news={news} />}
      {variant === 'titles-only' && <TitlesOnlyLayout news={news} />}
      {variant === 'stacked-cards' && <StackedCardsLayout news={news} />}
    </section>
  );
}

/* ─── Variant A: Big lead left + 4 thumbnail card rows right ─── */
function LeadListLayout({ news }: { news: { id: string; slug: string; title: string; excerpt: string; featuredImage: string }[] }) {
  const lead = news[0];
  const titleRows = news.slice(1, 3);
  const rest = news.slice(3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
      {/* Lead card + title rows below */}
      <div className="md:col-span-5">
        <article className="group rounded-lg overflow-hidden bg-card border border-border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
          <Link href={`/news/${lead.slug}`} className="block">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={lead.featuredImage}
                alt={lead.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </Link>
          <div className="p-4">
            <Link href={`/news/${lead.slug}`}>
              <h3 className="text-lg sm:text-xl leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
                {lead.title}
              </h3>
            </Link>
            <p className="text-sm text-foreground-secondary line-clamp-3 mt-2 leading-relaxed">
              {lead.excerpt}
            </p>
          </div>
        </article>

        {/* Title rows below lead */}
        <div className="mt-3 space-y-1.5">
          {titleRows.map((article) => (
            <article key={article.id} className="rounded-lg border border-transparent hover:border-border hover:bg-card hover:shadow-md transition-all duration-200">
              <Link href={`/news/${article.slug}`} className="group flex items-start gap-2.5 px-3 py-2.5">
                <span className="shrink-0 mt-[5px]">
                  <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </span>
                <h4 className="text-[17px] leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
                  {article.title}
                </h4>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* 5 small cards */}
      <div className="md:col-span-7 space-y-3">
        {rest.map((article) => (
          <article
            key={article.id}
            className="group flex overflow-hidden rounded-lg border border-border bg-card hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
          >
            <Link href={`/news/${article.slug}`} className="shrink-0">
              <div className="relative w-[140px] min-h-[100px] overflow-hidden">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="140px"
                />
              </div>
            </Link>
            <Link href={`/news/${article.slug}`} className="flex-1 min-w-0 self-center px-3.5 py-3">
              <h4 className="text-[17px] leading-snug line-clamp-3 text-foreground group-hover:text-accent transition-colors">
                {article.title}
              </h4>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ─── Variant B: Big lead card top + title rows below ─── */
function LeadTitlesLayout({ news }: { news: { id: string; slug: string; title: string; featuredImage: string }[] }) {
  const lead = news[0];
  const rest = news.slice(1);

  return (
    <div>
      {/* Lead card */}
      <article className="group rounded-lg overflow-hidden bg-card border border-border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 mb-4">
        <Link href={`/news/${lead.slug}`} className="block">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={lead.featuredImage}
              alt={lead.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </Link>
        <div className="p-3.5">
          <Link href={`/news/${lead.slug}`}>
            <h3 className="text-lg leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
              {lead.title}
            </h3>
          </Link>
        </div>
      </article>

      {/* Title rows with hover card effect */}
      <div className="space-y-1.5">
        {rest.map((article) => (
          <article key={article.id} className="rounded-lg border border-transparent hover:border-border hover:bg-card hover:shadow-md transition-all duration-200">
            <Link href={`/news/${article.slug}`} className="group flex items-start gap-2.5 px-3 py-2.5">
              <span className="shrink-0 mt-[5px]">
                <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </span>
              <h4 className="text-[17px] leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
                {article.title}
              </h4>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ─── Variant C: Lead card top + 2x2 grid cards below ─── */
function GridCardsLayout({ news }: { news: { id: string; slug: string; title: string; featuredImage: string }[] }) {
  const lead = news[0];
  const rest = news.slice(1);

  return (
    <div>
      {/* Lead card */}
      <article className="group rounded-lg overflow-hidden bg-card border border-border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 mb-5">
        <Link href={`/news/${lead.slug}`} className="block">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={lead.featuredImage}
              alt={lead.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </Link>
        <div className="p-3.5">
          <Link href={`/news/${lead.slug}`}>
            <h3 className="text-lg sm:text-xl leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
              {lead.title}
            </h3>
          </Link>
        </div>
      </article>

      {/* 2x2 small cards */}
      <div className="grid grid-cols-2 gap-4">
        {rest.map((article) => (
          <article key={article.id} className="group rounded-lg overflow-hidden bg-card border border-border hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
            <Link href={`/news/${article.slug}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 22vw"
                />
              </div>
            </Link>
            <div className="p-2.5">
              <Link href={`/news/${article.slug}`}>
                <h4 className="text-[14px] leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
                  {article.title}
                </h4>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ─── Variant D: Pure list — thumbnail card rows ─── */
function ListOnlyLayout({ news }: { news: { id: string; slug: string; title: string; featuredImage: string }[] }) {
  return (
    <div className="space-y-3">
      {news.map((article) => (
        <article
          key={article.id}
          className="group flex gap-3.5 p-2.5 rounded-lg border border-border bg-card hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
        >
          <Link href={`/news/${article.slug}`} className="shrink-0">
            <div className="relative w-[120px] h-[78px] rounded-md overflow-hidden">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="120px"
              />
            </div>
          </Link>
          <Link href={`/news/${article.slug}`} className="flex-1 min-w-0 self-center">
            <h4 className="text-[15px] leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
              {article.title}
            </h4>
          </Link>
        </article>
      ))}
    </div>
  );
}

/* ─── Variant E: Lead card top + 2 small cards side-by-side below (3 news total) ─── */
function LeadDuoLayout({ news }: { news: { id: string; slug: string; title: string; featuredImage: string }[] }) {
  const lead = news[0];
  const duo = news.slice(1, 5);

  return (
    <div>
      {/* Lead card */}
      <article className="group rounded-lg overflow-hidden bg-card border border-border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 mb-4">
        <Link href={`/news/${lead.slug}`} className="block">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={lead.featuredImage}
              alt={lead.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </Link>
        <div className="p-3.5">
          <Link href={`/news/${lead.slug}`}>
            <h3 className="text-lg leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
              {lead.title}
            </h3>
          </Link>
        </div>
      </article>

      {/* Two side-by-side cards */}
      <div className="grid grid-cols-2 gap-3">
        {duo.map((article) => (
          <article key={article.id} className="group rounded-lg overflow-hidden bg-card border border-border hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
            <Link href={`/news/${article.slug}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 15vw"
                />
              </div>
            </Link>
            <div className="p-2.5">
              <Link href={`/news/${article.slug}`}>
                <h4 className="text-[17px] leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
                  {article.title}
                </h4>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ─── Variant F: Image-right list — title left, image right (flipped national side cards) ─── */
function ImageRightListLayout({ news }: { news: { id: string; slug: string; title: string; featuredImage: string }[] }) {
  return (
    <div className="space-y-3">
      {news.map((article) => (
        <article
          key={article.id}
          className="group flex overflow-hidden rounded-lg border border-border bg-card hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
        >
          <Link href={`/news/${article.slug}`} className="flex-1 min-w-0 self-center px-3.5 py-3">
            <h4 className="text-[17px] leading-snug line-clamp-3 text-foreground group-hover:text-accent transition-colors">
              {article.title}
            </h4>
          </Link>
          <Link href={`/news/${article.slug}`} className="shrink-0">
            <div className="relative w-[140px] min-h-[100px] overflow-hidden">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="140px"
              />
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}

/* ─── Variant H: Image-left list — image left, title right (like national side cards) ─── */
function ImageLeftListLayout({ news }: { news: { id: string; slug: string; title: string; featuredImage: string }[] }) {
  return (
    <div className="space-y-3">
      {news.map((article) => (
        <article
          key={article.id}
          className="group flex overflow-hidden rounded-lg border border-border bg-card hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
        >
          <Link href={`/news/${article.slug}`} className="shrink-0">
            <div className="relative w-[140px] min-h-[100px] overflow-hidden">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="140px"
              />
            </div>
          </Link>
          <Link href={`/news/${article.slug}`} className="flex-1 min-w-0 self-center px-3.5 py-3">
            <h4 className="text-[17px] leading-snug line-clamp-3 text-foreground group-hover:text-accent transition-colors">
              {article.title}
            </h4>
          </Link>
        </article>
      ))}
    </div>
  );
}

/* ─── Variant J: 2+2 grid — 2 columns, 2 rows of image-top cards ─── */
function DuoGridLayout({ news }: { news: { id: string; slug: string; title: string; featuredImage: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {news.map((article) => (
        <article key={article.id} className="group rounded-lg overflow-hidden bg-card border border-border hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
          <Link href={`/news/${article.slug}`} className="block">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 15vw"
              />
            </div>
          </Link>
          <div className="p-2.5">
            <Link href={`/news/${article.slug}`}>
              <h4 className="text-[15px] leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
                {article.title}
              </h4>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ─── Variant K: Titles only — play icon + title rows with hover card ─── */
function TitlesOnlyLayout({ news }: { news: { id: string; slug: string; title: string }[] }) {
  return (
    <div className="space-y-1.5">
      {news.map((article) => (
        <article key={article.id} className="rounded-lg border border-transparent hover:border-border hover:bg-card hover:shadow-md transition-all duration-200">
          <Link href={`/news/${article.slug}`} className="group flex items-start gap-2.5 px-3 py-2.5">
            <span className="shrink-0 mt-[5px]">
              <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            </span>
            <h4 className="text-[17px] leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
              {article.title}
            </h4>
          </Link>
        </article>
      ))}
    </div>
  );
}

/* ─── Variant I: Vertical cards — small image top, title bottom, stacked 1×4 ─── */
function VerticalCardsLayout({ news }: { news: { id: string; slug: string; title: string; featuredImage: string }[] }) {
  return (
    <div className="space-y-4">
      {news.map((article) => (
        <article key={article.id} className="group rounded-lg overflow-hidden bg-card border border-border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
          <Link href={`/news/${article.slug}`} className="block">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          </Link>
          <div className="p-3">
            <Link href={`/news/${article.slug}`}>
              <h4 className="text-[17px] leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
                {article.title}
              </h4>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ─── Variant G: 2 cards stacked vertically — image + title below each ─── */
function StackedCardsLayout({ news }: { news: { id: string; slug: string; title: string; featuredImage: string }[] }) {
  const cards = news.slice(0, 2);

  return (
    <div className="space-y-4">
      {cards.map((article) => (
        <article key={article.id} className="group rounded-lg overflow-hidden bg-card border border-border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
          <Link href={`/news/${article.slug}`} className="block">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </Link>
          <div className="p-3.5">
            <Link href={`/news/${article.slug}`}>
              <h3 className="text-lg leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
                {article.title}
              </h3>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
