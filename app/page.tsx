import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/news/HeroSection';
import CategorySection from '@/components/news/CategorySection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <HeroSection />

          {/* Category sections — varied layouts */}
          <div className="space-y-10">
            {/* Row 1: জাতীয় (8 cols: lead+list) | আন্তর্জাতিক (4 cols: lead+titles) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
              <div className="lg:col-span-8">
                <CategorySection categorySlug="national" variant="lead-list" count={8} />
              </div>
              <div className="lg:col-span-4">
                <CategorySection categorySlug="international" variant="lead-titles" count={4} />
              </div>
            </div>

            {/* Row 2: রাজনীতি (4: lead+duo) | অর্থনীতি (4: image-right list) | অপরাধ (4: stacked cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
              <div className="lg:col-span-4">
                <CategorySection categorySlug="politics" variant="lead-duo" count={5} />
              </div>
              <div className="lg:col-span-4">
                <CategorySection categorySlug="business" variant="image-right-list" titleOverride="অর্থনীতি" count={6} />
              </div>
              <div className="lg:col-span-4">
                <CategorySection categorySlug="national" variant="stacked-cards" titleOverride="অপরাধ" newsOffset={5} count={2} />
              </div>
            </div>

            {/* Row 3: আইন-আদালত | বিনোদন | খেলা — all image-left list */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
              <div className="lg:col-span-4">
                <CategorySection categorySlug="politics" variant="image-left-list" titleOverride="আইন-আদালত" newsOffset={5} count={4} />
              </div>
              <div className="lg:col-span-4">
                <CategorySection categorySlug="entertainment" variant="image-left-list" count={4} />
              </div>
              <div className="lg:col-span-4">
                <CategorySection categorySlug="sports" variant="image-left-list" count={4} />
              </div>
            </div>

            {/* Row 4: প্রবাস | লাইফস্টাইল | শিক্ষা | প্রযুক্তি */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              <CategorySection categorySlug="international" variant="duo-grid" titleOverride="প্রবাস" newsOffset={4} count={6} />
              <CategorySection categorySlug="entertainment" variant="titles-only" titleOverride="লাইফস্টাইল" newsOffset={4} count={6} />
              <CategorySection categorySlug="national" variant="image-left-list" titleOverride="শিক্ষা" newsOffset={8} count={4} />
              <CategorySection categorySlug="technology" variant="titles-only" count={6} />
            </div>

            {/* Row 5: স্বাস্থ্য | মতামত | সাহিত্য | ধর্ম */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              <CategorySection categorySlug="entertainment" variant="lead-duo" titleOverride="স্বাস্থ্য" newsOffset={10} count={5} />
              <CategorySection categorySlug="opinion" variant="stacked-cards" titleOverride="মতামত" count={2} />
              <CategorySection categorySlug="opinion" variant="titles-only" titleOverride="সাহিত্য" newsOffset={4} count={8} />
              <CategorySection categorySlug="national" variant="image-left-list" titleOverride="ধর্ম" newsOffset={10} count={5} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
