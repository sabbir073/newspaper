'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getTrendingNews, getLatestNews } from '@/lib/data';
import { toBanglaDigits } from '@/lib/bangla';
import BangladeshDivisionMap from './BangladeshDivisionMap';

export default function LatestPopularTabs({ showMap = true }: { showMap?: boolean } = {}) {
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');
  const latest = getLatestNews(1, 20).items;
  const popular = getTrendingNews(20);

  const items = activeTab === 'latest' ? latest : popular;

  return (
    <div className="flex flex-col">
      {/* Tabs + scrollable list + button — fixed height card */}
      <div className="border border-border rounded-xl overflow-hidden flex flex-col bg-card">
        {/* Tabs */}
        <div className="flex shrink-0">
          <button
            onClick={() => setActiveTab('latest')}
            className={`flex-1 py-2.5 text-[17px] font-normal text-center transition-all duration-200 cursor-pointer relative ${
              activeTab === 'latest'
                ? 'bg-accent text-white'
                : 'bg-background-secondary text-foreground-muted hover:text-foreground hover:bg-background-tertiary'
            }`}
          >
            সর্বশেষ
          </button>
          <button
            onClick={() => setActiveTab('popular')}
            className={`flex-1 py-2.5 text-[17px] font-normal text-center transition-all duration-200 cursor-pointer relative ${
              activeTab === 'popular'
                ? 'bg-accent text-white'
                : 'bg-background-secondary text-foreground-muted hover:text-foreground hover:bg-background-tertiary'
            }`}
          >
            সর্বাধিক পঠিত
          </button>
        </div>

        {/* Scrollable list */}
        <div className="overflow-y-auto scrollbar-thin" style={{ maxHeight: '520px' }}>
          <div className="p-2 space-y-1">
            {items.map((article, idx) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg border border-transparent bg-background hover:bg-background-secondary hover:border-border hover:shadow-md transition-all duration-200 group"
              >
                {/* Icon / number indicator */}
                {activeTab === 'latest' ? (
                  <span className="shrink-0 mt-[3px]">
                    <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </span>
                ) : (
                  <span className="shrink-0 w-7 h-7 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">
                    {toBanglaDigits(idx + 1)}
                  </span>
                )}

                <h4 className="flex-1 min-w-0 text-[17px] leading-[1.5] line-clamp-2 text-foreground group-hover:text-accent transition-colors font-normal">
                  {article.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>

        {/* View all button — always at bottom */}
        <div className="shrink-0 border-t border-border p-3">
          <Link
            href="/latest"
            className="block w-full py-2.5 bg-accent text-white text-center text-[15px] font-semibold rounded-lg hover:bg-accent-hover transition-colors"
          >
            সর্বশেষ সব খবর
          </Link>
        </div>
      </div>

      {/* Bangladesh map with divisions */}
      {showMap && (
        <div className="mt-6">
          <BangladeshDivisionMap />
        </div>
      )}
    </div>
  );
}
