'use client';

import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const MEGA_MENU_CATEGORIES = [
  { name: 'জাতীয়', href: '/category/national' },
  { name: 'রাজনীতি', href: '/category/politics' },
  { name: 'সারাদেশ', href: '/latest' },
  { name: 'অপরাধ', href: '/category/national' },
  { name: 'আইন-আদালত', href: '/category/politics' },
  { name: 'প্রবাস', href: '/category/international' },
  { name: 'আন্তর্জাতিক', href: '/category/international' },
  { name: 'পশ্চিমবঙ্গ', href: '/category/international' },
  { name: 'অর্থনীতি', href: '/category/business' },
  { name: 'খেলা', href: '/category/sports' },
  { name: 'বিনোদন', href: '/category/entertainment' },
  { name: 'লাইফস্টাইল', href: '/latest' },
  { name: 'রূপচর্চা', href: '/latest' },
  { name: 'স্বাস্থ্য', href: '/latest' },
  { name: 'চিকিৎসা', href: '/latest' },
  { name: 'পর্যটন', href: '/category/business' },
  { name: 'শিক্ষা', href: '/latest' },
  { name: 'প্রযুক্তি', href: '/category/technology' },
  { name: 'সাহিত্য', href: '/latest' },
  { name: 'গণমাধ্যম', href: '/latest' },
  { name: 'ফিচার', href: '/latest' },
  { name: 'ফেবু লিখন', href: '/latest' },
  { name: 'ভ্রমণ গদ্য', href: '/latest' },
  { name: 'ওয়াইল্ডলাইফ', href: '/latest' },
  { name: 'ভিন্নরকম', href: '/latest' },
  { name: 'ধর্ম', href: '/latest' },
  { name: 'মতামত', href: '/category/opinion' },
  { name: 'বিজ্ঞপ্তি', href: '/latest' },
  { name: 'বিজ্ঞাপন', href: '/latest' },
  { name: 'সর্বশেষ', href: '/latest' },
  { name: 'ছবি', href: '/latest' },
  { name: 'ভিডিও', href: '/latest' },
];

const SOCIAL_ICONS = [
  { name: 'YouTube', href: 'https://youtube.com', color: '#FF0000', svg: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/> },
  { name: 'Facebook', href: 'https://facebook.com', color: '#1877F2', svg: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/> },
  { name: 'X', href: 'https://x.com', color: '#000000', svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
  { name: 'LinkedIn', href: 'https://linkedin.com', color: '#0A66C2', svg: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/> },
  { name: 'Instagram', href: 'https://instagram.com', color: '#E4405F', svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/> },
  { name: 'TikTok', href: 'https://tiktok.com', color: '#000000', svg: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/> },
  { name: 'Threads', href: 'https://threads.net', color: '#000000', svg: <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/> },
  { name: 'Telegram', href: 'https://t.me', color: '#26A5E4', svg: <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/> },
  { name: 'Pinterest', href: 'https://pinterest.com', color: '#BD081C', svg: <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/> },
  { name: 'Reddit', href: 'https://reddit.com', color: '#FF4500', svg: <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/> },
  { name: 'WhatsApp', href: 'https://whatsapp.com', color: '#25D366', svg: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/> },
  { name: 'Snapchat', href: 'https://snapchat.com', color: '#FFFC00', svg: <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/> },
];

export default function MobileNav({ open, onClose }: MobileNavProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Mega menu dropdown */}
      <div
        className="absolute left-0 right-0 top-0 bg-background shadow-2xl border-b border-border overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Top row: Logo left, Close right */}
          <div className="flex items-center justify-between py-4 border-b border-border">
            <Link href="/" onClick={onClose} className="text-3xl sm:text-4xl font-bold text-accent">
              {SITE_NAME}
            </Link>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-background-tertiary transition-colors text-foreground-muted cursor-pointer"
              aria-label="মেনু বন্ধ করুন"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Category grid (4 columns) */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-1">
                {MEGA_MENU_CATEGORIES.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className="block px-2 py-3 text-lg font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Social + App + Utility */}
            <div className="lg:col-span-4 lg:border-l lg:border-border lg:pl-8">
              {/* Follow us */}
              <h3 className="text-lg font-semibold text-foreground mb-4">অনুসরণ করুন</h3>
              <div className="grid grid-cols-6 gap-2.5 mb-7">
                {SOCIAL_ICONS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-background-tertiary transition-colors"
                    aria-label={social.name}
                    style={{ color: social.color }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{social.svg}</svg>
                  </a>
                ))}
              </div>

              {/* Mobile Apps */}
              <h3 className="text-lg font-semibold text-foreground mb-4">মোবাইল অ্যাপস ডাউনলোড করুন</h3>
              <div className="flex gap-3 mb-7">
                <a href="#" className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.2l2.583 1.496a1 1 0 010 1.731l-2.583 1.497-2.537-2.537 2.537-2.188zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
                  Google Play
                </a>
                <a href="#" className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  App Store
                </a>
              </div>

              {/* Theme toggle */}
              <div className="flex items-center gap-3 py-4 border-t border-border">
                <ThemeToggle />
                <span className="text-base text-foreground">থিম পরিবর্তন</span>
              </div>

              {/* Utility links */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-4 border-t border-border">
                <Link href="/" onClick={onClose} className="text-base text-foreground hover:text-accent py-1.5 transition-colors">আমাদের সম্পর্কে</Link>
                <Link href="/" onClick={onClose} className="text-base text-foreground hover:text-accent py-1.5 transition-colors">বিজ্ঞাপন</Link>
                <Link href="/" onClick={onClose} className="text-base text-foreground hover:text-accent py-1.5 transition-colors">শর্তাবলি ও নীতিমালা</Link>
                <Link href="/" onClick={onClose} className="text-base text-foreground hover:text-accent py-1.5 transition-colors">গোপনীয়তা নীতি</Link>
                <Link href="/" onClick={onClose} className="text-base text-foreground hover:text-accent py-1.5 transition-colors">যোগাযোগ</Link>
                <Link href="/search" onClick={onClose} className="text-base text-foreground hover:text-accent py-1.5 transition-colors">অনুসন্ধান</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
