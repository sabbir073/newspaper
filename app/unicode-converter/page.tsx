import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import UnicodeConverter from '@/components/ui/UnicodeConverter';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `ইউনিকোড কনভার্টার — ${SITE_NAME}`,
  description: 'Bijoy (Sutonny MJ) থেকে ইউনিকোড বাংলায় এবং উল্টো রূপান্তরের ফ্রি অনলাইন টুল।',
};

export default function UnicodeConverterPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Breadcrumb items={[{ label: 'ইউনিকোড কনভার্টার' }]} />

          <header className="mb-6 pb-5 border-b border-border">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              ইউনিকোড কনভার্টার
            </h1>
            <p className="text-foreground-secondary text-base">
              Bijoy (Sutonny MJ) থেকে Unicode বাংলায় এবং Unicode থেকে Bijoy-তে দ্রুত রূপান্তর করুন।
            </p>
          </header>

          <UnicodeConverter />

          <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-base font-bold text-foreground mb-2">
                কেন ইউনিকোডে রূপান্তর করবেন?
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                ইউনিকোড টেক্সট সকল আধুনিক ব্রাউজার, মোবাইল ও ওয়েব প্ল্যাটফর্মে সঠিকভাবে দেখা যায়।
                সার্চ ইঞ্জিনে ইনডেক্স হয় ও সহজে কপি-পেস্ট করা যায়।
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-base font-bold text-foreground mb-2">কীভাবে ব্যবহার করবেন</h3>
              <ol className="text-sm text-foreground-secondary list-decimal pl-5 space-y-1">
                <li>উপরে দিকনির্দেশ (Bijoy → Unicode বা Unicode → Bijoy) নির্বাচন করুন।</li>
                <li>বাম পাশের বক্সে আপনার টেক্সট পেস্ট করুন।</li>
                <li>ডান পাশের বক্স থেকে রূপান্তরিত টেক্সট কপি করুন।</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
