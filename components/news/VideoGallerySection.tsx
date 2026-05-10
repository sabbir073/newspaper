'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { VideoPost } from '@/lib/types';
import SectionHeader from '@/components/ui/SectionHeader';
import VideoModal from '@/components/gallery/VideoModal';

interface VideoGallerySectionProps {
  videos: VideoPost[];
}

export default function VideoGallerySection({ videos }: VideoGallerySectionProps) {
  const [activeVideo, setActiveVideo] = useState<VideoPost | null>(null);

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
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent/90 group-hover:bg-accent flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </div>
              </div>
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

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
