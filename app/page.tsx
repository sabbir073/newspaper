import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/news/HeroSection';
import CategorySection from '@/components/news/CategorySection';
import Sidebar from '@/components/sidebar/Sidebar';

const CATEGORY_SECTIONS = [
  { slug: 'national', reverse: false },
  { slug: 'politics', reverse: true },
  { slug: 'international', reverse: false },
  { slug: 'sports', reverse: true },
  { slug: 'entertainment', reverse: false },
  { slug: 'technology', reverse: true },
  { slug: 'opinion', reverse: false },
  { slug: 'business', reverse: true },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <HeroSection />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {CATEGORY_SECTIONS.map((section) => (
                <CategorySection
                  key={section.slug}
                  categorySlug={section.slug}
                  reverse={section.reverse}
                />
              ))}
            </div>
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
