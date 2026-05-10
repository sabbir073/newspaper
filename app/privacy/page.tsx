import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `গোপনীয়তা নীতি — ${SITE_NAME}`,
  description: `${SITE_NAME} আপনার ব্যক্তিগত তথ্য কীভাবে সংগ্রহ ও ব্যবহার করে — গোপনীয়তা নীতি।`,
};

const SECTIONS = [
  {
    title: '১. আমরা কী তথ্য সংগ্রহ করি',
    body: 'আমরা সাধারণত আপনার নাম, ই-মেইল ঠিকানা ও মন্তব্য সংগ্রহ করি — শুধু তখনই, যখন আপনি স্বেচ্ছায় তা প্রদান করেন। এছাড়া সাইট পরিদর্শনের সময় ব্রাউজার ও ডিভাইসের প্রযুক্তিগত তথ্য (IP ঠিকানা, ব্রাউজার টাইপ, পরিদর্শনের সময়) স্বয়ংক্রিয়ভাবে সংরক্ষিত হয়।',
  },
  {
    title: '২. কুকিজের ব্যবহার',
    body: 'আমাদের ওয়েবসাইট কুকিজ (cookies) ব্যবহার করে যাতে আপনার পছন্দ মনে রাখা যায়, পরিসংখ্যান সংগ্রহ করা যায় এবং ব্যবহারকারীর অভিজ্ঞতা উন্নত করা যায়। আপনি চাইলে ব্রাউজার সেটিংস থেকে কুকিজ নিষ্ক্রিয় করতে পারেন।',
  },
  {
    title: '৩. তথ্যের ব্যবহার',
    body: 'সংগৃহীত তথ্য শুধুমাত্র সাইটের কার্যকারিতা উন্নয়ন, পরিসংখ্যান বিশ্লেষণ ও আপনার সাথে যোগাযোগের জন্য ব্যবহার করা হয়। আমরা কখনোই আপনার ব্যক্তিগত তথ্য তৃতীয় পক্ষের কাছে বিক্রি করি না।',
  },
  {
    title: '৪. তৃতীয় পক্ষের সেবা',
    body: 'সাইটে গুগল অ্যানালিটিক্স, সামাজিক যোগাযোগ মাধ্যমের প্লাগইন (Facebook, YouTube, Twitter) ও বিজ্ঞাপন নেটওয়ার্ক ব্যবহার করা হতে পারে। এই সেবাগুলোর নিজস্ব গোপনীয়তা নীতি প্রযোজ্য।',
  },
  {
    title: '৫. তথ্যের নিরাপত্তা',
    body: 'আপনার তথ্য সুরক্ষায় আমরা যথাযথ প্রযুক্তিগত ও প্রশাসনিক ব্যবস্থা গ্রহণ করি। তবে ইন্টারনেটে কোনো ডেটা ১০০% নিরাপদ — এমন নিশ্চয়তা দেওয়া সম্ভব নয়।',
  },
  {
    title: '৬. শিশুদের তথ্য',
    body: 'আমরা সচেতনভাবে ১৩ বছরের কম বয়সী কোনো শিশুর কাছ থেকে ব্যক্তিগত তথ্য সংগ্রহ করি না।',
  },
  {
    title: '৭. আপনার অধিকার',
    body: 'আপনার ব্যক্তিগত তথ্য পর্যালোচনা, সংশোধন বা মুছে ফেলার অনুরোধ করার অধিকার আপনার রয়েছে। যেকোনো অনুরোধের জন্য privacy@protidin.com ঠিকানায় ই-মেইল করুন।',
  },
  {
    title: '৮. নীতি পরিবর্তন',
    body: 'এই গোপনীয়তা নীতি যেকোনো সময় পরিবর্তিত হতে পারে। সর্বশেষ সংস্করণ সর্বদা এই পৃষ্ঠায় পাওয়া যাবে।',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Breadcrumb items={[{ label: 'গোপনীয়তা নীতি' }]} />

          <header className="mb-8 pb-6 border-b border-border">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">গোপনীয়তা নীতি</h1>
            <p className="text-foreground-secondary text-sm sm:text-base">
              সর্বশেষ হালনাগাদ: ১০ মে ২০২৬
            </p>
          </header>

          <p className="text-foreground-secondary leading-[1.9] text-[15px] sm:text-base mb-7">
            {SITE_NAME} আপনার গোপনীয়তাকে গুরুত্ব দেয়। এই নীতিতে আমরা বর্ণনা করেছি আমরা কী তথ্য
            সংগ্রহ করি, কেন করি এবং কীভাবে তা সুরক্ষিত রাখি।
          </p>

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
        </div>
      </main>
      <Footer />
    </>
  );
}
