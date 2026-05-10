import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { SITE_NAME } from '@/lib/constants';
import { toBanglaDigits } from '@/lib/bangla';

export const metadata: Metadata = {
  title: `বিজ্ঞাপন — ${SITE_NAME}`,
  description: `${SITE_NAME}-এ বিজ্ঞাপন প্রচারের সুযোগ ও মূল্য তালিকা।`,
};

const PLACEMENTS = [
  {
    label: 'হোম পেজ — শীর্ষ ব্যানার',
    size: '১২০০ × ২৪০ পিক্সেল',
    pricePerDay: 5000,
    note: 'সর্বোচ্চ দৃশ্যমানতা, প্রথম স্ক্রিনেই দেখা যায়',
  },
  {
    label: 'ক্যাটাগরি পেজ — সাইডবার',
    size: '৩০০ × ৬০০ পিক্সেল',
    pricePerDay: 2500,
    note: 'নির্দিষ্ট পাঠকশ্রেণিকে লক্ষ্য করে',
  },
  {
    label: 'নিউজ পেজ — ইন-আর্টিকেল',
    size: '৭২৮ × ৯০ পিক্সেল',
    pricePerDay: 3500,
    note: 'বিস্তারিত পড়ার সময় উচ্চ এনগেজমেন্ট',
  },
  {
    label: 'মোবাইল ব্যানার',
    size: '৩২০ × ১০০ পিক্সেল',
    pricePerDay: 1500,
    note: 'মোবাইল পাঠকদের জন্য নিবেদিত',
  },
  {
    label: 'স্পনসরড কনটেন্ট',
    size: 'একটি সম্পূর্ণ আর্টিকেল',
    pricePerDay: 15000,
    note: 'একবারের জন্য, ৩০ দিন আর্কাইভে থাকবে',
  },
];

export default function AdvertisementPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Breadcrumb items={[{ label: 'বিজ্ঞাপন' }]} />

          <header className="mb-8 pb-6 border-b border-border">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              বিজ্ঞাপন প্রচার
            </h1>
            <p className="text-foreground-secondary text-base">
              {SITE_NAME}-এর লক্ষ লক্ষ পাঠকের কাছে আপনার ব্র্যান্ড পৌঁছে দিন।
            </p>
          </header>

          {/* Hero stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              { num: '১০ লক্ষ+', label: 'মাসিক ভিজিটর' },
              { num: '৫ লক্ষ+', label: 'নিয়মিত পাঠক' },
              { num: '৩০ লক্ষ+', label: 'মাসিক পেজ ভিউ' },
              { num: '৬৪', label: 'জেলা কভারেজ' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-card p-4 text-center"
              >
                <div className="text-xl sm:text-2xl font-bold text-accent mb-0.5">{s.num}</div>
                <div className="text-xs sm:text-sm text-foreground-muted">{s.label}</div>
              </div>
            ))}
          </section>

          {/* Rate card */}
          <section className="mb-10">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1 h-7 bg-accent rounded-full" />
              <h2 className="text-2xl font-bold text-foreground">মূল্য তালিকা</h2>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-[15px]">
                <thead className="bg-background-secondary">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-semibold text-foreground">প্লেসমেন্ট</th>
                    <th className="px-4 py-3 font-semibold text-foreground">আকার</th>
                    <th className="px-4 py-3 font-semibold text-foreground text-right">প্রতি দিন (টাকা)</th>
                  </tr>
                </thead>
                <tbody>
                  {PLACEMENTS.map((p) => (
                    <tr key={p.label} className="border-t border-border bg-card">
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-foreground">{p.label}</div>
                        <div className="text-xs text-foreground-muted mt-0.5">{p.note}</div>
                      </td>
                      <td className="px-4 py-3.5 text-foreground-secondary whitespace-nowrap">
                        {p.size}
                      </td>
                      <td className="px-4 py-3.5 text-right font-semibold text-accent whitespace-nowrap">
                        ৳ {toBanglaDigits(p.pricePerDay.toLocaleString('en-US'))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-foreground-muted mt-3">
              * সাপ্তাহিক ও মাসিক চুক্তিতে বিশেষ ছাড় প্রযোজ্য। সকল মূল্য ভ্যাট ব্যতীত।
            </p>
          </section>

          {/* Why us */}
          <section className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { title: 'নির্ভরযোগ্য মাধ্যম', desc: 'বিশ্বস্ত পাঠকশ্রেণির কাছে আপনার ব্র্যান্ড।' },
              { title: 'লক্ষ্যভিত্তিক প্রচার', desc: 'ক্যাটাগরি, ভৌগোলিক অবস্থান অনুযায়ী টার্গেটিং।' },
              { title: 'বিস্তারিত রিপোর্ট', desc: 'ইম্প্রেশন, ক্লিক ও এনগেজমেন্টের পূর্ণ পরিসংখ্যান।' },
            ].map((c) => (
              <div key={c.title} className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-base font-bold text-foreground mb-1.5">{c.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-accent text-white p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">বিজ্ঞাপনের জন্য যোগাযোগ</h2>
            <p className="text-white/90 mb-5 text-[15px] sm:text-base">
              আমাদের বিজ্ঞাপন বিভাগের সঙ্গে যোগাযোগ করতে নিচের যেকোনো উপায় ব্যবহার করুন।
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:ads@protidin.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-accent rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                ads@protidin.com
              </a>
              <a
                href="tel:+8801756329496"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/40 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                ০১৭৫৬ ৩২৯ ৪৯৬
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
