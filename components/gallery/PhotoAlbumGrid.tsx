'use client';

import { useState } from 'react';
import Image from 'next/image';
import PhotoLightbox from './PhotoLightbox';

interface AlbumImage {
  url: string;
  caption?: string;
}

interface PhotoAlbumGridProps {
  images: AlbumImage[];
  albumTitle: string;
}

export default function PhotoAlbumGrid({ images, albumTitle }: PhotoAlbumGridProps) {
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {images.map((img, i) => (
          <button
            key={img.url}
            type="button"
            onClick={() => setOpenIdx(i)}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-background-tertiary cursor-pointer"
            aria-label={`${i + 1} নং ছবি দেখুন`}
          >
            <Image
              src={img.url}
              alt={img.caption || albumTitle}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <svg
                className="w-9 h-9 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {openIdx >= 0 && (
        <PhotoLightbox
          key={openIdx}
          images={images}
          startIndex={openIdx}
          onClose={() => setOpenIdx(-1)}
          albumTitle={albumTitle}
        />
      )}
    </>
  );
}
