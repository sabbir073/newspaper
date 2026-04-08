import TrendingWidget from './TrendingWidget';
import LatestWidget from './LatestWidget';

export default function Sidebar() {
  return (
    <aside className="space-y-6 lg:sticky lg:top-20">
      <TrendingWidget />
      <LatestWidget />
    </aside>
  );
}
