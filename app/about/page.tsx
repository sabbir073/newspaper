import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants';

export const metadata: Metadata = {
  title: `আমাদের সম্পর্কে — ${SITE_NAME}`,
  description: `${SITE_NAME} সম্পর্কে জানুন — আমাদের লক্ষ্য, ইতিহাস ও সম্পাদকীয় পরিষদ।`,
};

const EDITORIAL_BOARD = [
  { role: 'উপদেষ্টা', name: 'রোটারিয়ান এম নাজমুল হাসান' },
  { role: 'প্রকাশক', name: 'সুইটি আক্তার খানম' },
  { role: 'সম্পাদক', name: 'মোঃ মোখলেছুর রহমান মাসুম' },
  { role: 'নির্বাহী সম্পাদক', name: 'ডাঃ সাজিদ হাসান রানা' },
  { role: 'ব্যবস্থাপনা সম্পাদক', name: 'এম. আকতারউজ্জামান' },
  { role: 'বার্তা সম্পাদক', name: 'মোঃ কামরুল হাসান রনি' },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Breadcrumb items={[{ label: 'আমাদের সম্পর্কে' }]} />

          <header className="mb-8 pb-6 border-b border-border">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              আমাদের সম্পর্কে
            </h1>
            <p className="text-foreground-secondary text-base sm:text-lg">{SITE_TAGLINE}</p>
          </header>

          <section className="prose-bangla space-y-5 text-foreground-secondary">
            <p>
              <span className="font-semibold text-foreground">{SITE_NAME}</span> বাংলাদেশের অন্যতম
              আধুনিক অনলাইন সংবাদমাধ্যম। সত্য, নিরপেক্ষ ও দায়িত্বশীল সাংবাদিকতার মাধ্যমে দেশ ও
              বিদেশের সর্বশেষ খবর পাঠকের কাছে পৌঁছে দেওয়াই আমাদের একমাত্র লক্ষ্য।
            </p>
            <p>
              জাতীয়, আন্তর্জাতিক, রাজনীতি, অর্থনীতি, খেলা, বিনোদন, প্রযুক্তি, শিক্ষা, স্বাস্থ্য ও
              লাইফস্টাইল — সব ক্ষেত্রের সংবাদ এক প্ল্যাটফর্মে তুলে ধরতে আমরা প্রতিশ্রুতিবদ্ধ।
              পেশাদার সাংবাদিক ও সম্পাদকদের একটি দক্ষ দল প্রতিদিন কাজ করছে যাতে পাঠক নির্ভুল ও
              সময়োপযোগী তথ্য পান।
            </p>

            <h2 className="text-xl font-bold text-foreground mt-6">আমাদের লক্ষ্য</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>সত্য ও বস্তুনিষ্ঠ সংবাদ পরিবেশন।</li>
              <li>সাধারণ মানুষের কণ্ঠস্বর হয়ে দাঁড়ানো।</li>
              <li>গণতন্ত্র, মানবাধিকার ও মুক্তচিন্তার পক্ষে অবস্থান।</li>
              <li>সাংবাদিকতার সর্বোচ্চ নৈতিক মান বজায় রাখা।</li>
            </ul>
          </section>

          <section className="mt-10">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-1 h-7 bg-accent rounded-full" />
              <h2 className="text-2xl font-bold text-foreground">সম্পাদকীয় পরিষদ</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EDITORIAL_BOARD.map((p) => (
                <div
                  key={p.role}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <div className="text-sm text-foreground-muted mb-0.5">{p.role}</div>
                  <div className="text-base font-semibold text-foreground">{p.name}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-xl border border-border bg-background-secondary p-5 sm:p-6">
            <h2 className="text-xl font-bold text-foreground mb-3">যোগাযোগ</h2>
            <p className="text-[15px] text-foreground-secondary leading-relaxed">
              সম্পাদকীয় কার্যালয়ঃ ৩৮, আব্দুল্লাহপুর (৪র্থ তলা), উত্তরা, ঢাকা-১২৩০
              <br />
              ফোনঃ ০২৪৪ ৮৯১০১৭ | মোবাইলঃ ০১৭৫৬ ৩২৯ ৪৯৬
              <br />
              ই-মেইলঃ info@protidin.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
