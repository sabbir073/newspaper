import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `যোগাযোগ — ${SITE_NAME}`,
  description: 'আমাদের সাথে যোগাযোগ করুন — মতামত, অভিযোগ বা সংবাদ পাঠানোর জন্য।',
};

const CONTACT_BLOCKS = [
  {
    label: 'সম্পাদকীয় কার্যালয়',
    lines: ['৩৮, আব্দুল্লাহপুর (৪র্থ তলা)', 'উত্তরা, ঢাকা-১২৩০, বাংলাদেশ'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'ফোন ও মোবাইল',
    lines: ['ফোন: ০২৪৪ ৮৯১০১৭', 'মোবাইল: ০১৭৫৬ ৩২৯ ৪৯৬', 'বার্তা: ০১৬২৫ ২৯৩ ৬৫৭'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 17.72V21a2 2 0 01-2 2A18 18 0 013 5z" />
      </svg>
    ),
  },
  {
    label: 'ই-মেইল',
    lines: ['সাধারণ: info@protidin.com', 'বার্তা: news@protidin.com', 'বিজ্ঞাপন: ads@protidin.com'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Breadcrumb items={[{ label: 'যোগাযোগ' }]} />

          <header className="mb-8 pb-6 border-b border-border text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">যোগাযোগ</h1>
            <p className="text-foreground-secondary text-base">
              আমাদের সাথে যেকোনো বিষয়ে যোগাযোগ করতে নিচের ফর্ম ব্যবহার করুন বা সরাসরি কল/ই-মেইল করুন।
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Contact info */}
            <aside className="lg:col-span-2 space-y-3">
              {CONTACT_BLOCKS.map((b) => (
                <div
                  key={b.label}
                  className="rounded-xl border border-border bg-card p-4 flex gap-3"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                    {b.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground mb-1">{b.label}</div>
                    {b.lines.map((l) => (
                      <div key={l} className="text-[14px] text-foreground-secondary leading-relaxed">
                        {l}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </aside>

            {/* Form */}
            <form className="lg:col-span-3 rounded-xl border border-border bg-card p-5 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-foreground mb-1.5 block">নাম</span>
                  <input
                    type="text"
                    required
                    placeholder="আপনার পূর্ণ নাম"
                    className="w-full px-3 py-2.5 text-[15px] rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground mb-1.5 block">ই-মেইল</span>
                  <input
                    type="email"
                    required
                    placeholder="example@email.com"
                    className="w-full px-3 py-2.5 text-[15px] rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-foreground mb-1.5 block">বিষয়</span>
                <input
                  type="text"
                  required
                  placeholder="আপনার বার্তার বিষয়"
                  className="w-full px-3 py-2.5 text-[15px] rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground mb-1.5 block">বার্তা</span>
                <textarea
                  required
                  rows={6}
                  placeholder="আপনার বার্তা লিখুন..."
                  className="w-full px-3 py-2.5 text-[15px] rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-none"
                />
              </label>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-accent text-white text-[15px] font-semibold rounded-lg hover:bg-accent-hover transition-colors cursor-pointer"
              >
                বার্তা পাঠান
              </button>

              <p className="text-xs text-foreground-muted">
                ফর্ম জমা সিস্টেম শীঘ্রই সম্পূর্ণভাবে চালু হবে।
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
