'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getTrendingNews, getLatestNews } from '@/lib/data';
import { timeSince } from '@/lib/bangla';

export default function LatestPopularTabs() {
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');
  const latest = getLatestNews(1, 8).items;
  const popular = getTrendingNews(8);

  const items = activeTab === 'latest' ? latest : popular;

  return (
    <div className="border border-border rounded-lg overflow-hidden h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('latest')}
          className={`flex-1 py-3 text-base font-semibold text-center transition-colors cursor-pointer ${
            activeTab === 'latest'
              ? 'bg-background text-accent border-b-2 border-accent'
              : 'bg-background-secondary text-foreground-muted hover:text-foreground'
          }`}
        >
          সর্বশেষ
        </button>
        <button
          onClick={() => setActiveTab('popular')}
          className={`flex-1 py-3 text-base font-semibold text-center transition-colors cursor-pointer ${
            activeTab === 'popular'
              ? 'bg-background text-accent border-b-2 border-accent'
              : 'bg-background-secondary text-foreground-muted hover:text-foreground'
          }`}
        >
          সর্বাধিক পঠিত
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {items.map((article) => (
          <div key={article.id} className="border-b border-border last:border-b-0">
            <Link
              href={`/news/${article.slug}`}
              className="block px-4 py-3 hover:bg-background-secondary transition-colors"
            >
              <h4 className="text-[15px] font-medium leading-snug line-clamp-2 text-foreground hover:text-accent transition-colors">
                {article.title}
              </h4>
              {activeTab === 'latest' && (
                <span className="text-xs text-foreground-muted mt-1 block">
                  {timeSince(article.publishedAt)}
                </span>
              )}
            </Link>
          </div>
        ))}
      </div>

      {/* View all button */}
      <div className="border-t border-border p-3">
        <Link
          href={activeTab === 'latest' ? '/latest' : '/latest'}
          className="block w-full py-2.5 bg-accent text-white text-center text-sm font-semibold rounded hover:bg-accent-hover transition-colors"
        >
          সর্বশেষ সব খবর
        </Link>
      </div>
    </div>
  );
}
