import Link from 'next/link';
import { getBreakingNews, getLatestNews } from '@/lib/data';

function TriangleIcon() {
  return (
    <svg className="w-3 h-3 text-accent shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

export default function BreakingTicker() {
  const breakingNews = getBreakingNews();
  // If not enough breaking news, fill with latest
  const latestFill = breakingNews.length < 5 ? getLatestNews(1, 8).items : [];
  const allNews = [...breakingNews, ...latestFill.filter(n => !breakingNews.find(b => b.id === n.id))].slice(0, 10);

  if (allNews.length === 0) return null;

  // Build one set of ticker items
  const tickerItems = allNews.map((news) => (
    <span key={news.id} className="inline-flex items-center gap-2.5 shrink-0">
      <TriangleIcon />
      <Link
        href={`/news/${news.slug}`}
        className="text-[17px] text-foreground hover:text-accent transition-colors whitespace-nowrap"
      >
        {news.title}
      </Link>
    </span>
  ));

  return (
    <div className="bg-background-secondary border-b border-border overflow-hidden mt-2">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-14 gap-4">
        {/* Red label pill */}
        <span className="shrink-0 px-3 py-0.5 bg-accent text-white text-[19px] font-normal rounded whitespace-nowrap">
          সর্বশেষ
        </span>

        {/* Seamless infinite scroller */}
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker whitespace-nowrap inline-flex items-center gap-8">
            {/* First copy */}
            <span className="inline-flex items-center gap-8">
              {tickerItems}
            </span>
            {/* Duplicate for seamless loop */}
            <span className="inline-flex items-center gap-8">
              {allNews.map((news) => (
                <span key={`dup-${news.id}`} className="inline-flex items-center gap-2.5 shrink-0">
                  <TriangleIcon />
                  <Link
                    href={`/news/${news.slug}`}
                    className="text-[17px] text-foreground hover:text-accent transition-colors whitespace-nowrap"
                  >
                    {news.title}
                  </Link>
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
