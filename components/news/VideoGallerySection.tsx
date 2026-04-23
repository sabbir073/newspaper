'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { VideoPost } from '@/lib/types';
import SectionHeader from '@/components/ui/SectionHeader';

interface VideoGallerySectionProps {
  videos: VideoPost[];
}

export default function VideoGallerySection({ videos }: VideoGallerySectionProps) {
  const [activeVideo, setActiveVideo] = useState<VideoPost | null>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActiveVideo(null);
    }
    if (activeVideo) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKey);
        document.body.style.overflow = '';
      };
    }
  }, [activeVideo]);

  if (videos.length === 0) return null;

  return (
    <section>
      <SectionHeader title="ভিডিও গ্যালারি" href="/video-gallery" colorClass="bg-accent" />

      {/* 3x2 grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {videos.slice(0, 9).map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActiveVideo(video)}
            className="group text-left rounded-lg overflow-hidden bg-card border border-border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent/90 group-hover:bg-accent flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </div>
              </div>
              {/* Duration badge */}
              {video.duration && (
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 text-xs font-medium bg-black/75 text-white rounded">
                  {video.duration}
                </span>
              )}
            </div>
            <div className="p-3">
              <h4 className="text-[15px] leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
                {video.title}
              </h4>
            </div>
          </button>
        ))}
      </div>

      {/* YouTube popup modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="বন্ধ করুন"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative aspect-video rounded-lg overflow-hidden bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <h3 className="text-white text-lg font-medium mt-4 leading-snug">
              {activeVideo.title}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
}
