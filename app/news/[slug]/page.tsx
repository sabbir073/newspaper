import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import TimeSince from '@/components/ui/TimeSince';
import Sidebar from '@/components/sidebar/Sidebar';
import NewsCardMedium from '@/components/news/NewsCardMedium';
import { getNewsBySlug, getAllCategories, getAuthorById, getRelatedNews, getAllNews } from '@/lib/data';
import { formatBanglaDateShort, estimateReadTime } from '@/lib/bangla';
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

export default async function SingleNewsPage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();

  const categories = getAllCategories();
  const category = categories.find((c) => c.id === article.categoryId);
  const author = getAuthorById(article.authorId);
  const related = getRelatedNews(article, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Breadcrumb items={[
            ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
            { label: article.title },
          ]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <article className="lg:col-span-8">
              {category && (
                <Link
                  href={`/category/${category.slug}`}
                  className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold text-white mb-3"
                  style={{ backgroundColor: `var(--cat-${category.slug})` }}
                >
                  {category.name}
                </Link>
              )}

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-3">
                {article.title}
              </h1>

              <p className="text-lg text-foreground-secondary mb-4">{article.excerpt}</p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-foreground-muted mb-5 pb-5 border-b border-border">
                {author && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-background-tertiary flex items-center justify-center text-xs font-bold text-foreground-muted">
                      {author.name[0]}
                    </div>
                    <div>
                      <span className="font-medium text-foreground">{author.name}</span>
                      <span className="block text-xs">{author.role}</span>
                    </div>
                  </div>
                )}
                <span>·</span>
                <span>{formatBanglaDateShort(article.publishedAt)}</span>
                <span>·</span>
                <span>{estimateReadTime(article.body)}</span>
              </div>

              {/* Share buttons */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-sm text-foreground-muted">শেয়ার:</span>
                <button className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="ফেসবুকে শেয়ার">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="টুইটারে শেয়ার">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="হোয়াটসঅ্যাপে শেয়ার">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </button>
              </div>

              {/* Featured image */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>

              {/* Article body */}
              <div
                className="prose-bangla text-foreground"
                dangerouslySetInnerHTML={{ __html: article.body }}
              />

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 text-xs rounded-full border border-border hover:bg-background-tertiary transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Related news */}
              {related.length > 0 && (
                <div className="mt-10 pt-6 border-t border-border">
                  <h2 className="text-xl font-bold mb-4">সম্পর্কিত সংবাদ</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {related.map((r) => (
                      <NewsCardMedium key={r.id} article={r} />
                    ))}
                  </div>
                </div>
              )}

              {/* Comment placeholder */}
              <div className="mt-10 pt-6 border-t border-border">
                <h2 className="text-xl font-bold mb-4">মন্তব্য করুন</h2>
                <div className="bg-background-secondary rounded-lg p-6 text-center text-foreground-muted">
                  <p className="text-sm">মন্তব্য সিস্টেম শীঘ্রই আসছে।</p>
                </div>
              </div>
            </article>

            <div className="lg:col-span-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
