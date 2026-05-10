'use client';

import { useEffect, useState } from 'react';

interface ReadingProgressProps {
  /** ID of the element whose scroll position drives the bar. */
  targetId?: string;
}

export default function ReadingProgress({ targetId = 'article-body' }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const el = document.getElementById(targetId);
      if (!el) {
        setProgress(0);
        return;
      }
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      const total = rect.height + winH; // distance from top entering viewport to bottom leaving
      const passed = winH - rect.top; // 0 when top of element hits bottom of viewport
      const pct = Math.max(0, Math.min(100, (passed / total) * 100));
      setProgress(pct);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [targetId]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-[55] bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-accent transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
