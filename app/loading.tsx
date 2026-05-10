export default function Loading() {
  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-8" aria-label="লোড হচ্ছে">
      {/* Header skeleton */}
      <div className="space-y-3 mb-8">
        <div className="h-7 w-40 rounded bg-background-tertiary animate-pulse" />
        <div className="h-10 w-3/4 max-w-2xl rounded bg-background-tertiary animate-pulse" />
        <div className="h-4 w-1/2 max-w-md rounded bg-background-tertiary animate-pulse" />
      </div>

      {/* Hero grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 space-y-5">
          <div className="aspect-[16/10] rounded-lg bg-background-tertiary animate-pulse" />
          <div className="grid grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-[16/10] rounded-lg bg-background-tertiary animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-background-tertiary animate-pulse" />
                <div className="h-4 w-1/2 rounded bg-background-tertiary animate-pulse" />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-background-tertiary animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-full rounded bg-background-tertiary animate-pulse" />
                <div className="h-4 w-2/3 rounded bg-background-tertiary animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
