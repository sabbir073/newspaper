'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchInputProps {
  defaultValue: string;
}

export default function SearchInput({ defaultValue }: SearchInputProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="সংবাদ অনুসন্ধান করুন..."
            className="w-full pl-10 pr-4 py-3 text-lg rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
            autoFocus
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover transition-colors whitespace-nowrap cursor-pointer"
        >
          খুঁজুন
        </button>
      </div>
    </form>
  );
}
