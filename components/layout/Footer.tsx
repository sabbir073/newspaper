import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';
import { toBanglaDigits } from '@/lib/bangla';

const SOCIAL_LINKS = [
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    color: '#FF0000',
    svg: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    color: '#1877F2',
    svg: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
  },
  {
    name: 'X',
    href: 'https://x.com',
    color: '',
    svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    color: '#0A66C2',
    svg: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    color: '#E4405F',
    svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com',
    color: '',
    svg: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />,
  },
];

const UTILITY_LINKS = [
  { name: 'আমাদের সম্পর্কে', href: '/about' },
  { name: 'বিজ্ঞাপন', href: '/advertisement' },
  { name: 'আর্কাইভ', href: '/archive' },
  { name: 'শর্তাবলি ও নীতিমালা', href: '/terms' },
  { name: 'গোপনীয়তা নীতি', href: '/privacy' },
  { name: 'যোগাযোগ', href: '/contact' },
  { name: 'ইউনিকোড কনভার্টার', href: '/unicode-converter' },
];

export default function Footer() {
  const year = toBanglaDigits(new Date().getFullYear());

  return (
    <footer className="bg-background-secondary text-foreground border-t border-border mt-12">
      {/* Top section: logo/address | editorial | app downloads */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Logo + address + socials */}
          <div className="lg:col-span-4">
            <h3 className="text-3xl font-bold text-accent mb-4">{SITE_NAME}</h3>
            <p className="text-[15px] text-foreground-secondary leading-relaxed mb-4">
              সম্পাদকীয় কার্যালয়ঃ ৩৮, আব্দুল্লাহপুর (৪র্থ তলা), উত্তরা, ঢাকা-১২৩০
              <br />
              ফোনঃ ০২৪৪ ৮৯১০১৭, মোবাইলঃ ০১৭৫৬ ৩২৯ ৪৯৬
              <br />
              বার্তাঃ ০১৬২৫ ২৯৩ ৬৫৭
              <br />
              ই-মেইলঃ info@protidin.com
              <br />
              ওয়েবঃ www.protidin.com
            </p>

            <div>
              <p className="text-sm text-foreground-muted mb-2 font-medium">অনুসরণ করুন</p>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-background-tertiary hover:bg-accent hover:!text-white text-foreground transition-colors"
                    style={s.color ? { color: s.color } : undefined}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      {s.svg}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Middle: Editorial team */}
          <div className="lg:col-span-5">
            <h4 className="text-base font-semibold text-accent mb-3 uppercase tracking-wide">
              সম্পাদকীয় পরিষদ
            </h4>
            <ul className="space-y-2 text-[15px] text-foreground-secondary">
              <li>
                <span className="text-foreground font-medium">উপদেষ্টা:</span> রোটারিয়ান এম নাজমুল হাসান
              </li>
              <li>
                <span className="text-foreground font-medium">প্রকাশক:</span> সুইটি আক্তার খানম
              </li>
              <li>
                <span className="text-foreground font-medium">সম্পাদক:</span> মোঃ মোখলেছুর রহমান মাসুম
              </li>
              <li>
                <span className="text-foreground font-medium">নির্বাহী সম্পাদক:</span> ডাঃ সাজিদ হাসান রানা
              </li>
              <li>
                <span className="text-foreground font-medium">ব্যবস্থাপনা সম্পাদক:</span> এম. আকতারউজ্জামান
              </li>
              <li>
                <span className="text-foreground font-medium">বার্তা সম্পাদকঃ</span> মোঃ কামরুল হাসান রনি
              </li>
            </ul>
          </div>

          {/* Right: App downloads */}
          <div className="lg:col-span-3">
            <h4 className="text-base font-semibold text-accent mb-3 uppercase tracking-wide">
              মোবাইল অ্যাপস ডাউনলোড করুন
            </h4>
            <div className="flex flex-col gap-2.5">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 bg-background-tertiary hover:bg-accent hover:text-white border border-border rounded-lg transition-colors group"
                aria-label="Google Play থেকে ডাউনলোড করুন"
              >
                <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.2l2.583 1.496a1 1 0 010 1.731l-2.583 1.497-2.537-2.537 2.537-2.188zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[11px] text-foreground-muted group-hover:text-white/80">GET IT ON</div>
                  <div className="text-base font-semibold text-foreground group-hover:text-white">Google Play</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 bg-background-tertiary hover:bg-accent hover:text-white border border-border rounded-lg transition-colors group"
                aria-label="App Store থেকে ডাউনলোড করুন"
              >
                <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[11px] text-foreground-muted group-hover:text-white/80">Download on the</div>
                  <div className="text-base font-semibold text-foreground group-hover:text-white">App Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Utility menu strip */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {UTILITY_LINKS.map((link, idx) => (
              <span key={link.name} className="flex items-center">
                <Link
                  href={link.href}
                  className="text-[15px] text-foreground-secondary hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
                {idx < UTILITY_LINKS.length - 1 && (
                  <span className="ml-6 text-border-strong" aria-hidden="true">
                    |
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* SEO description */}
      <div className="border-t border-border bg-background-tertiary/40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-sm text-foreground-muted leading-[1.9] text-center max-w-5xl mx-auto">
            {SITE_NAME} — বাংলাদেশের অন্যতম জনপ্রিয় ও বিশ্বস্ত অনলাইন সংবাদমাধ্যম। জাতীয়, আন্তর্জাতিক, রাজনীতি, অর্থনীতি, খেলা, বিনোদন, প্রযুক্তি, শিক্ষা, স্বাস্থ্য ও লাইফস্টাইলসহ সকল বিষয়ে সর্বশেষ ও নির্ভরযোগ্য খবর পেতে ভিজিট করুন। আমরা সত্য, নিরপেক্ষ ও বস্তুনিষ্ঠ সাংবাদিকতার মাধ্যমে পাঠকদের কাছে পৌঁছে দিচ্ছি প্রতিদিনের তাজা খবর, বিশ্লেষণ, ফিচার ও মতামত।
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border bg-background-tertiary">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-foreground-muted">
            সম্পাদক ও প্রকাশক : মোঃ মোখলেছুর রহমান মাসুম
          </p>
          <p className="text-sm text-foreground-muted">
            স্বত্ব &copy; ২০২৩-{year} {SITE_NAME}। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
}
