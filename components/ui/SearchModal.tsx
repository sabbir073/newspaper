'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Modal */}
      <div
        className="relative bg-background rounded-xl shadow-2xl w-[90%] max-w-lg p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-center mb-5">কি খুঁজতে চান?</h2>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-5">
            <label
              htmlFor="search-input"
              className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                query
                  ? 'top-1 text-xs text-foreground-muted'
                  : 'top-4 text-base text-foreground-muted'
              }`}
            >
              এখানে লিখুন
            </label>
            <input
              ref={inputRef}
              id="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 pt-6 pb-3 text-base border border-border-strong rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium rounded-full border border-border hover:bg-background-tertiary transition-colors cursor-pointer"
            >
              ফিরে যান
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium rounded-full bg-accent text-white hover:bg-accent-hover transition-colors cursor-pointer"
            >
              খুঁজুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
