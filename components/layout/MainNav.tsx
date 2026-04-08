'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import { useState } from 'react';
import MobileNav from './MobileNav';

export default function MainNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="bg-nav-bg text-nav-text sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center h-11">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden mr-3 p-1 hover:bg-white/10 rounded transition-colors"
            aria-label="মেনু খুলুন"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden lg:flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
            <Link
              href="/"
              className={`px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-white/10 ${
                pathname === '/' ? 'border-b-[3px] border-accent' : ''
              }`}
            >
              প্রচ্ছদ
            </Link>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-white/10 ${
                    isActive ? 'border-b-[3px] border-accent' : ''
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/latest"
              className={`px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-white/10 ${
                pathname === '/latest' ? 'border-b-[3px] border-accent' : ''
              }`}
            >
              সর্বশেষ
            </Link>
            <Link
              href="/archive"
              className={`px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-white/10 ${
                pathname === '/archive' ? 'border-b-[3px] border-accent' : ''
              }`}
            >
              আর্কাইভ
            </Link>
          </div>

          {/* Mobile: scrollable nav */}
          <div className="lg:hidden flex items-center gap-0.5 overflow-x-auto scrollbar-hide flex-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-2.5 py-2.5 text-xs font-medium whitespace-nowrap transition-colors hover:bg-white/10"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
