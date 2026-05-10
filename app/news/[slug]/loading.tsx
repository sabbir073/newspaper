export default function Loading() {
  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-6" aria-label="সংবাদ লোড হচ্ছে">
      <div className="h-4 w-64 rounded bg-background-tertiary animate-pulse mb-5" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          <div className="h-6 w-24 rounded-full bg-background-tertiary animate-pulse" />
          <div className="h-10 w-11/12 rounded bg-background-tertiary animate-pulse" />
          <div className="h-10 w-9/12 rounded bg-background-tertiary animate-pulse" />
          <div className="h-5 w-2/3 rounded bg-background-tertiary animate-pulse mt-2" />
          <div className="aspect-video rounded-lg bg-background-tertiary animate-pulse mt-4" />
          <div className="space-y-2 mt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-4 rounded bg-background-tertiary animate-pulse"
                style={{ width: `${85 + (i % 3) * 5}%` }}
              />
            ))}
          </div>
        </div>
        <aside className="lg:col-span-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-background-tertiary animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-full rounded bg-background-tertiary animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-background-tertiary animate-pulse" />
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
