'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { toBanglaDigits } from '@/lib/bangla';

interface LightboxImage {
  url: string;
  caption?: string;
}

interface PhotoLightboxProps {
  images: LightboxImage[];
  /** Index of the image to start from. */
  startIndex: number;
  onClose: () => void;
  albumTitle: string;
}

export default function PhotoLightbox({
  images,
  startIndex,
  onClose,
  albumTitle,
}: PhotoLightboxProps) {
  const [idx, setIdx] = useState(startIndex);
  const [copied, setCopied] = useState(false);

  const total = images.length;
  const current = images[idx];

  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);

  // Keyboard nav + body scroll lock
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [next, prev, onClose]);

  if (!current) return null;

  function handleShare(platform: 'facebook' | 'twitter' | 'whatsapp' | 'copy') {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const text = encodeURIComponent(albumTitle);
    const encodedUrl = encodeURIComponent(url);

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${encodedUrl}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        });
        return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=500');
  }

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col bg-black/95"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${albumTitle} — ছবি ${idx + 1} / ${total}`}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-3 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          <div className="text-sm font-semibold truncate max-w-[60vw]">{albumTitle}</div>
          <div className="text-xs text-white/70">
            {toBanglaDigits(idx + 1)} / {toBanglaDigits(total)}
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleShare('facebook')}
            className="w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="ফেসবুকে শেয়ার"
            title="ফেসবুকে শেয়ার"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => handleShare('twitter')}
            className="w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="এক্সে শেয়ার"
            title="এক্সে শেয়ার"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => handleShare('whatsapp')}
            className="w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="হোয়াটসঅ্যাপে শেয়ার"
            title="হোয়াটসঅ্যাপে শেয়ার"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => handleShare('copy')}
            className="w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="লিংক কপি"
            title={copied ? 'কপি হয়েছে!' : 'লিংক কপি করুন'}
          >
            {copied ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="বন্ধ করুন"
            title="বন্ধ করুন (Esc)"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main image area */}
      <div
        className="flex-1 flex items-center justify-center relative px-4 sm:px-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev arrow */}
        {total > 1 && (
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer transition-colors z-10"
            aria-label="পূর্ববর্তী ছবি (←)"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Image */}
        <div className="relative w-full h-full max-w-6xl max-h-[70vh]">
          <Image
            key={current.url}
            src={current.url}
            alt={current.caption || albumTitle}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>

        {/* Next arrow */}
        {total > 1 && (
          <button
            type="button"
            onClick={next}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer transition-colors z-10"
            aria-label="পরবর্তী ছবি (→)"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Caption */}
      {current.caption && (
        <div
          className="px-4 py-3 text-center text-white/90 text-sm sm:text-base max-w-3xl mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {current.caption}
        </div>
      )}

      {/* Thumbnail strip */}
      {total > 1 && (
        <div
          className="px-4 pb-4 pt-2 overflow-x-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-2 justify-center min-w-fit mx-auto">
            {images.map((img, i) => (
              <button
                key={img.url}
                type="button"
                onClick={() => setIdx(i)}
                className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded overflow-hidden cursor-pointer transition-all ${
                  i === idx
                    ? 'ring-2 ring-accent ring-offset-2 ring-offset-black scale-105'
                    : 'opacity-60 hover:opacity-100'
                }`}
                aria-label={`ছবি ${i + 1}`}
              >
                <Image
                  src={img.url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
