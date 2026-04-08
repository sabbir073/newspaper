'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Category } from '@/lib/types';

interface SearchInputProps {
  defaultValue: string;
  categories: Category[];
  searchParams: Record<string, string | undefined>;
}

export default function SearchInput({ defaultValue, categories, searchParams }: SearchInputProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);
  const [category, setCategory] = useState(searchParams.category || '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('category', category);
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
          className="px-5 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover transition-colors whitespace-nowrap"
        >
          খুঁজুন
        </button>
      </div>
      <div className="mt-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          <option value="">সকল বিভাগ</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
