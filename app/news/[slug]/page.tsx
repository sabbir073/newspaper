import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import NewsCardMedium from '@/components/news/NewsCardMedium';
import ArticleBody from '@/components/news/ArticleBody';
import ArticleToolbar from '@/components/news/ArticleToolbar';
import LatestPopularTabs from '@/components/sidebar/LatestPopularTabs';
import { getNewsBySlug, getAllCategories, getAuthorById, getRelatedNews, getAllNews } from '@/lib/data';
import { formatBanglaDateShort, estimateReadTime, toBanglaDigits } from '@/lib/bangla';
import { SITE_NAME } from '@/lib/constants';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllNews().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} — ${SITE_NAME}`,
    description: article.excerpt,
  };
}

function formatBanglaTime(dateStr: string): string {
  const date = new Date(dateStr);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'অপরাহ্ণ' : 'পূর্বাহ্ণ';
  const h12 = hours % 12 || 12;
  return `${toBanglaDigits(h12)}:${toBanglaDigits(minutes.toString().padStart(2, '0'))} ${period}`;
}

export default async function SingleNewsPage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();

  const categories = getAllCategories();
  const category = categories.find((c) => c.id === article.categoryId);
  const author = getAuthorById(article.authorId);
  const related = getRelatedNews(article, 6);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumb
            items={[
              ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
              { label: article.title },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* ─── Main article ─── */}
            <article className="lg:col-span-8">
              {/* Category badge */}
              {category && (
                <Link
                  href={`/category/${category.slug}`}
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-4"
                  style={{ backgroundColor: `var(--cat-${category.slug})` }}
                >
                  {category.name}
                </Link>
              )}

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-bold leading-[1.3] mb-4 text-foreground">
                {article.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg text-foreground-secondary leading-relaxed mb-5">
                {article.excerpt}
              </p>

              {/* Meta info — two layouts: desktop single-row, mobile stacked */}
              <div className="mb-5 pb-5 border-b border-border">
                {/* DESKTOP (md+): single row, tools on the right */}
                <div className="hidden md:flex items-center justify-between gap-x-4 gap-y-3">
                  <div className="flex items-center gap-x-4 text-[15px] text-foreground-muted">
                    {author && (
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center text-base font-bold">
                          {author.name[0]}
                        </div>
                        <div className="leading-tight">
                          <div className="font-semibold text-foreground text-[16px]">{author.name}</div>
                          <div className="text-sm">{author.role}</div>
                        </div>
                      </div>
                    )}

                    <span className="h-10 w-px bg-border" aria-hidden="true" />

                    <div className="flex flex-col leading-tight gap-1">
                      <span className="flex items-center gap-1.5 text-[15px]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>প্রকাশ: {formatBanglaDateShort(article.publishedAt)}, {formatBanglaTime(article.publishedAt)}</span>
                      </span>
                      {article.updatedAt && (
                        <span className="flex items-center gap-1.5 text-[15px]">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>সর্বশেষ সংস্করণ: {formatBanglaDateShort(article.updatedAt)}, {formatBanglaTime(article.updatedAt)}</span>
                        </span>
                      )}
                    </div>

                    <span className="h-10 w-px bg-border" aria-hidden="true" />

                    <span className="flex items-center gap-1.5 text-[15px]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {estimateReadTime(article.body)}
                    </span>
                  </div>

                  <ArticleToolbar
                    title={article.title}
                    subtitle={article.excerpt}
                    body={article.body}
                    compact
                    toolsOnly
                  />
                </div>

                {/* MOBILE (< md): author row | info row | tools row */}
                <div className="md:hidden space-y-4">
                  {/* Author row */}
                  {author && (
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 shrink-0 rounded-full bg-accent/10 text-accent flex items-center justify-center text-lg font-bold">
                        {author.name[0]}
                      </div>
                      <div className="leading-tight min-w-0">
                        <div className="font-semibold text-foreground text-[17px] truncate">{author.name}</div>
                        <div className="text-sm text-foreground-muted truncate">{author.role}</div>
                      </div>
                    </div>
                  )}

                  {/* Date + read time stack */}
                  <div className="grid grid-cols-1 gap-2 text-[15px] text-foreground-muted">
                    <span className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>প্রকাশ: {formatBanglaDateShort(article.publishedAt)}, {formatBanglaTime(article.publishedAt)}</span>
                    </span>
                    {article.updatedAt && (
                      <span className="flex items-start gap-2">
                        <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>সর্বশেষ: {formatBanglaDateShort(article.updatedAt)}, {formatBanglaTime(article.updatedAt)}</span>
                      </span>
                    )}
                    <span className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{estimateReadTime(article.body)}</span>
                    </span>
                  </div>

                  {/* Tools row — full-width card */}
                  <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-background-secondary border border-border">
                    <span className="text-[15px] font-semibold text-foreground-secondary shrink-0">টুলস</span>
                    <ArticleToolbar
                      title={article.title}
                      subtitle={article.excerpt}
                      body={article.body}
                      compact
                      toolsOnly
                    />
                  </div>
                </div>
              </div>

              {/* Featured image */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-5">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>

              {/* Article body with toolbars (top + bottom) */}
              <ArticleBody title={article.title} body={article.body} />

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-border">
                  <span className="text-[16px] font-semibold text-foreground mr-1">ট্যাগ:</span>
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="px-3.5 py-1.5 text-[15px] rounded-full border border-border hover:bg-accent hover:text-white hover:border-accent transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Comment section */}
              <section className="mt-10 pt-6 border-t border-border">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-7 bg-accent rounded-full" />
                  <h2 className="text-2xl font-bold">মন্তব্য করুন</h2>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-background-tertiary flex items-center justify-center text-foreground-muted">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <textarea
                      placeholder="আপনার মন্তব্য লিখুন..."
                      rows={3}
                      className="flex-1 px-3 py-2.5 text-[15px] rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-none"
                    />
                  </div>
                  <div className="flex justify-end mt-3">
                    <button
                      type="button"
                      className="px-5 py-2.5 bg-accent text-white text-[15px] font-semibold rounded-lg hover:bg-accent-hover transition-colors cursor-pointer"
                    >
                      মন্তব্য পোস্ট করুন
                    </button>
                  </div>
                </div>
                <p className="text-sm text-foreground-muted mt-3 text-center">
                  মন্তব্য সিস্টেম শীঘ্রই সম্পূর্ণভাবে চালু হবে।
                </p>
              </section>

              {/* Related news */}
              {related.length > 0 && (
                <section className="mt-10 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1 h-6 bg-accent rounded-full" />
                    <h2 className="text-xl font-bold">সম্পর্কিত সংবাদ</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                    {related.map((r) => (
                      <NewsCardMedium key={r.id} article={r} />
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* ─── Sidebar: sticky until its end, tabs scroll internally ─── */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-20">
                <LatestPopularTabs showMap={false} />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
