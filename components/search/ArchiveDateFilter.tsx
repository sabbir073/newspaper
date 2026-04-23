'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { formatBanglaDateShort } from '@/lib/bangla';
import BanglaCalendar from '@/components/ui/BanglaCalendar';

interface ArchiveDateFilterProps {
  defaultDate?: string;
}

export default function ArchiveDateFilter({ defaultDate = '' }: ArchiveDateFilterProps) {
  const router = useRouter();
  const [date, setDate] = useState(defaultDate);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click or ESC
  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (date) router.push(`/archive?date=${date}`);
    else router.push('/archive');
  }

  function handleReset() {
    setDate('');
    router.push('/archive');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 sm:items-center">
      {/* Calendar trigger + popover */}
      <div ref={wrapperRef} className="relative flex-1 sm:flex-initial">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full sm:w-[260px] flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-background hover:border-accent transition-colors text-left cursor-pointer"
        >
          <span className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>

          <span
            className={`flex-1 text-[15px] truncate ${
              date ? 'text-foreground font-medium' : 'text-foreground-muted'
            }`}
          >
            {date ? formatBanglaDateShort(date) : 'তারিখ নির্বাচন করুন'}
          </span>

          <svg
            className={`w-4 h-4 text-foreground-muted transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 sm:right-auto sm:left-0 top-full mt-2 z-50">
            <BanglaCalendar value={date} onChange={setDate} onClose={() => setOpen(false)} />
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 shrink-0">
        <button
          type="submit"
          className="px-5 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors cursor-pointer"
        >
          খুঁজুন
        </button>
        {date && (
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-background-tertiary transition-colors cursor-pointer"
          >
            রিসেট
          </button>
        )}
      </div>
    </form>
  );
}
