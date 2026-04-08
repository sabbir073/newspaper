import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedNews, getLatestNews, getAllCategories, getAuthorById } from '@/lib/data';
import LatestPopularTabs from '@/components/sidebar/LatestPopularTabs';

function MediumCard({ article, cat }: { article: { id: string; slug: string; title: string; featuredImage: string }; cat?: { slug: string; name: string } }) {
  return (
    <article className="group rounded-lg overflow-hidden bg-card border border-border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
      <Link href={`/news/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 27%"
          />
        </div>
      </Link>
      <div className="p-3.5">
        {cat && (
          <Link
            href={`/category/${cat.slug}`}
            className="inline-block text-[11px] font-bold tracking-wide uppercase mb-1.5 hover:underline"
            style={{ color: `var(--cat-${cat.slug})` }}
          >
            {cat.name}
          </Link>
        )}
        <Link href={`/news/${article.slug}`}>
          <h3 className="text-[15px] leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
            {article.title}
          </h3>
        </Link>
      </div>
    </article>
  );
}

export default function HeroSection() {
  const featured = getFeaturedNews();
  const latest = getLatestNews(1, 15).items;
  const allNews = [...featured, ...latest.filter(n => !featured.find(f => f.id === n.id))].slice(0, 9);
  const categories = getAllCategories();

  if (allNews.length === 0) return null;

  const lead = allNews[0];
  const secondary = allNews.slice(1, 3);
  const bottomCards = allNews.slice(3, 9);

  const leadCategory = categories.find(c => c.id === lead.categoryId);

  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* LEFT: Col 1+2 (featured cards) */}
        <div className="lg:col-span-8">
          {/* Top: Big card + 2 medium stacked — DESKTOP */}
          <div className="hidden md:grid md:grid-cols-12 gap-5">

            {/* Big featured card */}
            <article className="group md:col-span-7 rounded-lg overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300">
              <Link href={`/news/${lead.slug}`} className="block">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={lead.featuredImage}
                    alt={lead.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 42%"
                    priority
                  />
                </div>
              </Link>
              <div className="p-4 border-l-4" style={{ borderLeftColor: leadCategory ? `var(--cat-${leadCategory.slug})` : 'var(--accent)' }}>
                {leadCategory && (
                  <Link
                    href={`/category/${leadCategory.slug}`}
                    className="inline-block text-[11px] font-bold tracking-wide uppercase mb-2 hover:underline"
                    style={{ color: `var(--cat-${leadCategory.slug})` }}
                  >
                    {leadCategory.name}
                  </Link>
                )}
                <Link href={`/news/${lead.slug}`}>
                  <h2 className="text-xl sm:text-[22px] leading-[1.25] line-clamp-3 text-foreground group-hover:text-accent transition-colors">
                    {lead.title}
                  </h2>
                </Link>
                <p className="text-sm text-foreground-muted line-clamp-2 mt-2 leading-relaxed">
                  {lead.excerpt}
                </p>
              </div>
            </article>

            {/* Two medium cards stacked */}
            <div className="md:col-span-5 flex flex-col gap-5">
              {secondary.map((article) => {
                const cat = categories.find(c => c.id === article.categoryId);
                return (
                  <article key={article.id} className="group flex-1 rounded-lg overflow-hidden bg-card border border-border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                    <Link href={`/news/${article.slug}`} className="block h-full relative">
                      <div className="relative h-full min-h-[180px] overflow-hidden">
                        <Image
                          src={article.featuredImage}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33%"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          {cat && (
                            <span
                              className="inline-block px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase text-white mb-2"
                              style={{ backgroundColor: `var(--cat-${cat.slug})` }}
                            >
                              {cat.name}
                            </span>
                          )}
                          <h3 className="text-base sm:text-lg text-white leading-[1.25] line-clamp-2">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>

          {/* MOBILE layout */}
          <div className="md:hidden space-y-4">
            {/* Lead card */}
            <article className="group rounded-lg overflow-hidden bg-card border border-border">
              <Link href={`/news/${lead.slug}`} className="block">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={lead.featuredImage}
                    alt={lead.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                </div>
              </Link>
              <div className="p-3 border-l-4" style={{ borderLeftColor: leadCategory ? `var(--cat-${leadCategory.slug})` : 'var(--accent)' }}>
                {leadCategory && (
                  <Link
                    href={`/category/${leadCategory.slug}`}
                    className="inline-block text-[11px] font-bold tracking-wide uppercase mb-1 hover:underline"
                    style={{ color: `var(--cat-${leadCategory.slug})` }}
                  >
                    {leadCategory.name}
                  </Link>
                )}
                <Link href={`/news/${lead.slug}`}>
                  <h2 className="text-lg leading-[1.25] line-clamp-3 hover:text-accent transition-colors">
                    {lead.title}
                  </h2>
                </Link>
                <p className="text-sm text-foreground-muted line-clamp-2 mt-1">
                  {lead.excerpt}
                </p>
              </div>
            </article>

            {/* 8 cards in 2-column grid */}
            <div className="grid grid-cols-2 gap-3.5">
              {[...secondary, ...bottomCards].map((article) => {
                const cat = categories.find(c => c.id === article.categoryId);
                return <MediumCard key={article.id} article={article} cat={cat} />;
              })}
            </div>
          </div>

          {/* Bottom: 3+3 medium cards — DESKTOP */}
          {bottomCards.length > 0 && (
            <div className="hidden md:grid md:grid-cols-3 gap-5 mt-5">
              {bottomCards.map((article) => {
                const cat = categories.find(c => c.id === article.categoryId);
                return <MediumCard key={article.id} article={article} cat={cat} />;
              })}
            </div>
          )}
        </div>

        {/* RIGHT: Latest/Popular tabs */}
        <div className="lg:col-span-4">
          <LatestPopularTabs />
        </div>

      </div>
    </section>
  );
}
