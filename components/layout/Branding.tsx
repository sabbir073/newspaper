import Link from 'next/link';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants';

export default function Branding() {
  return (
    <div className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 sm:h-20">
        <Link href="/" className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold text-accent leading-tight">{SITE_NAME}</h1>
          <span className="text-[10px] sm:text-xs text-foreground-muted hidden sm:block">{SITE_TAGLINE}</span>
        </Link>
        <Link
          href="/search"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-background-tertiary transition-colors text-foreground-muted"
          aria-label="অনুসন্ধান"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
