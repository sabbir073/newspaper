import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `শর্তাবলি ও নীতিমালা — ${SITE_NAME}`,
  description: `${SITE_NAME} ব্যবহারের শর্তাবলি ও নীতিমালা।`,
};

const SECTIONS = [
  {
    title: '১. সাধারণ শর্তাবলি',
    body: `${SITE_NAME} ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলি মেনে চলতে সম্মত হচ্ছেন। কোনো শর্ত পরিবর্তন করার অধিকার কর্তৃপক্ষ সংরক্ষণ করে।`,
  },
  {
    title: '২. কপিরাইট ও বুদ্ধিবৃত্তিক সম্পত্তি',
    body: `এই ওয়েবসাইটে প্রকাশিত সকল সংবাদ, ছবি, ভিডিও, গ্রাফিক্স এবং অন্যান্য কনটেন্ট ${SITE_NAME}-এর সম্পত্তি। কোনো কনটেন্ট পুনঃপ্রকাশ বা বাণিজ্যিক ব্যবহার করতে হলে অবশ্যই লিখিত অনুমতি নিতে হবে।`,
  },
  {
    title: '৩. ব্যবহারকারীর দায়িত্ব',
    body: `ব্যবহারকারীগণ এই ওয়েবসাইটে কোনো অশ্লীল, মানহানিকর, সাম্প্রদায়িক, রাষ্ট্রবিরোধী বা ক্ষতিকর কনটেন্ট পোস্ট করতে পারবেন না। মন্তব্য বিভাগে যেকোনো অনুপযুক্ত মন্তব্য মুছে ফেলার অধিকার কর্তৃপক্ষ সংরক্ষণ করে।`,
  },
  {
    title: '৪. দায় সীমাবদ্ধতা',
    body: `প্রকাশিত তথ্যের নির্ভুলতা ও সম্পূর্ণতার জন্য আমরা সর্বাত্মক চেষ্টা করি, তবে কোনো ভুল বা ক্ষতির জন্য ${SITE_NAME} আইনগতভাবে দায়ী থাকবে না।`,
  },
  {
    title: '৫. বিজ্ঞাপন ও তৃতীয় পক্ষের লিংক',
    body: `ওয়েবসাইটে প্রদর্শিত বিজ্ঞাপন বা বাইরের লিংকের কনটেন্টের জন্য আমরা দায়ী নই। বিজ্ঞাপনদাতার পণ্য বা সেবা সম্পর্কে যেকোনো লেনদেন আপনার নিজস্ব দায়িত্বে।`,
  },
  {
    title: '৬. পরিবর্তন',
    body: 'এই শর্তাবলি যেকোনো সময় পরিবর্তন বা সংশোধন করা হতে পারে। সর্বশেষ সংস্করণটি এই পৃষ্ঠায় প্রকাশ করা হবে এবং তা প্রকাশের সঙ্গে সঙ্গে কার্যকর হবে।',
  },
  {
    title: '৭. বিরোধ নিষ্পত্তি',
    body: 'যেকোনো বিরোধের ক্ষেত্রে বাংলাদেশের প্রচলিত আইন প্রযোজ্য হবে এবং ঢাকা বিচারিক এখতিয়ারের আদালত মীমাংসার অধিকারী হবে।',
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Breadcrumb items={[{ label: 'শর্তাবলি ও নীতিমালা' }]} />

          <header className="mb-8 pb-6 border-b border-border">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              শর্তাবলি ও নীতিমালা
            </h1>
            <p className="text-foreground-secondary text-sm sm:text-base">
              সর্বশেষ হালনাগাদ: ১০ মে ২০২৬
            </p>
          </header>

          <div className="space-y-7">
            {SECTIONS.map((s) => (
              <section key={s.title}>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                  {s.title}
                </h2>
                <p className="text-foreground-secondary leading-[1.9] text-[15px] sm:text-base">
                  {s.body}
                </p>
              </section>
            ))}
          </div>

          <p className="mt-10 p-4 rounded-lg bg-background-secondary border border-border text-sm text-foreground-muted">
            এই শর্তাবলি সংক্রান্ত যেকোনো প্রশ্নের জন্য{' '}
            <a href="mailto:info@protidin.com" className="text-accent hover:underline">
              info@protidin.com
            </a>{' '}
            ঠিকানায় ই-মেইল করুন।
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
