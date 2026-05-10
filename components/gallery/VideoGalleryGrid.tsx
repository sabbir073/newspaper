'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { VideoPost } from '@/lib/types';
import { formatBanglaDateShort } from '@/lib/bangla';
import VideoModal from './VideoModal';

interface VideoGalleryGridProps {
  videos: VideoPost[];
}

export default function VideoGalleryGrid({ videos }: VideoGalleryGridProps) {
  const [activeVideo, setActiveVideo] = useState<VideoPost | null>(null);

  if (videos.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-foreground-muted">কোনো ভিডিও পাওয়া যায়নি</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActiveVideo(video)}
            className="group text-left rounded-xl overflow-hidden bg-card border border-border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent/90 group-hover:bg-accent flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </div>
              </div>
              {video.duration && (
                <span className="absolute bottom-2 right-2 px-2 py-0.5 text-xs font-medium bg-black/75 text-white rounded">
                  {video.duration}
                </span>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-base sm:text-lg font-semibold leading-snug line-clamp-2 text-foreground group-hover:text-accent transition-colors">
                {video.title}
              </h2>
              <div className="mt-auto pt-3 text-xs text-foreground-muted">
                {formatBanglaDateShort(video.publishedAt)}
              </div>
            </div>
          </button>
        ))}
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
