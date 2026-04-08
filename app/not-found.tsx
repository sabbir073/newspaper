import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center py-20 px-4">
          <h1 className="text-6xl font-bold text-accent mb-4">৪০৪</h1>
          <p className="text-xl text-foreground-secondary mb-6">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover transition-colors"
          >
            প্রচ্ছদে ফিরে যান
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
