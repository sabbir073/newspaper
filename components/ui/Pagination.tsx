import Link from 'next/link';
import { toBanglaDigits } from '@/lib/bangla';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
}

export default function Pagination({ currentPage, totalPages, basePath, searchParams = {} }: PaginationProps) {
  if (totalPages <= 1) return null;

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${basePath}?${params.toString()}`;
  }

  const pages: (number | 'ellipsis')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('ellipsis');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);
  }

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-8" aria-label="প���ষ্ঠা ন্যাভিগেশন">
      {currentPage > 1 && (
        <Link
          href={buildHref(currentPage - 1)}
          className="px-3 py-2 text-sm rounded-lg border border-border hover:bg-background-tertiary transition-colors"
        >
          পূর্ববর্তী
        </Link>
      )}

      {pages.map((page, idx) =>
        page === 'ellipsis' ? (
          <span key={`e-${idx}`} className="px-2 py-2 text-sm text-foreground-muted">...</span>
        ) : (
          <Link
            key={page}
            href={buildHref(page)}
            className={`w-9 h-9 flex items-center justify-center text-sm rounded-lg transition-colors ${
              page === currentPage
                ? 'bg-accent text-white font-bold'
                : 'border border-border hover:bg-background-tertiary'
            }`}
          >
            {toBanglaDigits(page)}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="px-3 py-2 text-sm rounded-lg border border-border hover:bg-background-tertiary transition-colors"
        >
          পরবর্তী
        </Link>
      )}
    </nav>
  );
}
