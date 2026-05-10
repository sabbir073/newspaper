'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[app error]', error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent/10 text-accent flex items-center justify-center">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          কিছু একটা সমস্যা হয়েছে
        </h1>
        <p className="text-foreground-secondary mb-6 leading-relaxed">
          এই পৃষ্ঠাটি লোড করার সময় একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন বা প্রচ্ছদে ফিরে যান।
        </p>
        {error.digest && (
          <p className="text-xs text-foreground-muted mb-5 font-mono">
            ত্রুটি কোড: {error.digest}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="px-5 py-2.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors cursor-pointer"
          >
            আবার চেষ্টা করুন
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 border border-border text-foreground font-semibold rounded-lg hover:bg-background-tertiary transition-colors"
          >
            প্রচ্ছদে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
