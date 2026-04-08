import Link from 'next/link';
import { SITE_NAME, SITE_TAGLINE, NAV_ITEMS } from '@/lib/constants';
import { toBanglaDigits } from '@/lib/bangla';

export default function Footer() {
  const year = toBanglaDigits(new Date().getFullYear());

  return (
    <footer className="bg-nav-bg text-nav-text mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-accent mb-3">{SITE_NAME}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{SITE_TAGLINE}</p>
            <div className="flex gap-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-3">বিভাগসমূহ</h4>
            <ul className="space-y-1.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">দ্রুত লিঙ্ক</h4>
            <ul className="space-y-1.5">
              <li><Link href="/latest" className="text-sm text-gray-400 hover:text-white transition-colors">সর্বশেষ সংবাদ</Link></li>
              <li><Link href="/archive" className="text-sm text-gray-400 hover:text-white transition-colors">আর্কাইভ</Link></li>
              <li><Link href="/search" className="text-sm text-gray-400 hover:text-white transition-colors">অনুসন্ধান</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">যোগাযোগ</h4>
            <ul className="space-y-1.5 text-sm text-gray-400">
              <li>ঢাকা, বাংলাদেশ</li>
              <li>ইমেইল: info@protidin.com</li>
              <li>ফোন: +৮৮০-২-৮১৮০০৭৮</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-gray-500">
          কপিরাইট &copy; {year} {SITE_NAME}। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
}
