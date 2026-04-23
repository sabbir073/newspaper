'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PhotoAlbum } from '@/lib/types';
import SectionHeader from '@/components/ui/SectionHeader';

interface PhotoGallerySectionProps {
  albums: PhotoAlbum[];
}

export default function PhotoGallerySection({ albums }: PhotoGallerySectionProps) {
  if (albums.length === 0) return null;

  const featured = albums[0];
  const others = albums.slice(1, 5);

  const [slideIdx, setSlideIdx] = useState(0);
  const total = featured.images.length;

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      setSlideIdx((i) => (i + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  function prev() {
    setSlideIdx((i) => (i - 1 + total) % total);
  }
  function next() {
    setSlideIdx((i) => (i + 1) % total);
  }

  return (
    <section>
      <SectionHeader title="ফটো গ্যালারি" href="/photo-gallery" colorClass="bg-accent" />

      {/* Featured album slider */}
      <Link
        href={`/photo-gallery/${featured.slug}`}
        className="group relative block aspect-[16/10] rounded-lg overflow-hidden bg-background-tertiary mb-4"
      >
        {featured.images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === slideIdx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={img.url}
              alt={img.caption || featured.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={idx === 0}
            />
          </div>
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

        {/* Camera icon badge */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent text-white text-xs font-medium">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5 5-5z" />
            <circle cx="12" cy="12" r="3.2" />
          </svg>
          ফটো গ্যালারি
        </div>

        {/* Title overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="text-white text-lg sm:text-xl font-semibold leading-snug line-clamp-2 group-hover:text-accent transition-colors">
            {featured.title}
          </h3>
        </div>

        {/* Nav arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="আগের ছবি"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="পরের ছবি"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots */}
        {total > 1 && (
          <div className="absolute bottom-2 right-3 flex gap-1.5">
            {featured.images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSlideIdx(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === slideIdx ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`ছবি ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </Link>

      {/* Other albums grid — thumbnails only, no title */}
      <div className="grid grid-cols-4 gap-2.5">
        {others.map((album) => (
          <Link
            key={album.id}
            href={`/photo-gallery/${album.slug}`}
            className="group relative aspect-[4/3] rounded-md overflow-hidden"
          >
            <Image
              src={album.coverImage}
              alt={album.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 25vw, 12vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
