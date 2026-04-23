'use client';

import { useEffect, useRef, useState } from 'react';

interface ArticleToolbarProps {
  title: string;
  subtitle?: string;
  body?: string;
  /** ID of the element whose font-size scales. Defaults to 'article-body'. */
  targetId?: string;
  compact?: boolean;
  shareOnly?: boolean;
  toolsOnly?: boolean;
}

export default function ArticleToolbar({
  title,
  subtitle = '',
  body = '',
  targetId = 'article-body',
  compact = false,
  shareOnly = false,
  toolsOnly = false,
}: ArticleToolbarProps) {
  const [fontOffset, setFontOffset] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ttsError, setTtsError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlQueueRef = useRef<string[]>([]);
  const prefetchRef = useRef<Map<string, string>>(new Map()); // url -> blob object URL
  const cancelledRef = useRef(false);

  // Apply font size changes to the article body via a CSS variable.
  // `--article-fs` is consumed by `.prose-bangla` (globals.css). Default = 19px.
  useEffect(() => {
    if (shareOnly) return;
    const el = document.getElementById(targetId);
    if (!el) return;
    if (fontOffset === 0) {
      el.style.removeProperty('--article-fs');
    } else {
      el.style.setProperty('--article-fs', `calc(19px + ${fontOffset}px)`);
    }
  }, [fontOffset, targetId, shareOnly]);

  // Cleanup audio + blob URLs on unmount
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      for (const blobUrl of prefetchRef.current.values()) {
        URL.revokeObjectURL(blobUrl);
      }
      prefetchRef.current.clear();
    };
  }, []);

  // Prefetch audio bytes for a given URL, return a blob object-URL for gap-free playback
  async function prefetch(url: string): Promise<string | null> {
    if (prefetchRef.current.has(url)) return prefetchRef.current.get(url)!;
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      prefetchRef.current.set(url, blobUrl);
      return blobUrl;
    } catch (err) {
      console.error('[TTS] prefetch failed', err);
      return null;
    }
  }

  async function playNextChunk() {
    if (cancelledRef.current) return;
    const next = urlQueueRef.current.shift();
    if (!next) {
      setSpeaking(false);
      return;
    }

    const blobUrl = (await prefetch(next)) || next;
    if (cancelledRef.current) return;

    // Prefetch the following chunk in parallel while current plays
    const upcoming = urlQueueRef.current[0];
    if (upcoming) void prefetch(upcoming);

    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;
    audio.src = blobUrl;
    audio.onended = () => {
      // Revoke played blob to free memory
      const played = prefetchRef.current.get(next);
      if (played) {
        URL.revokeObjectURL(played);
        prefetchRef.current.delete(next);
      }
      if (!cancelledRef.current) playNextChunk();
    };
    audio.onerror = () => {
      console.error('[TTS] Audio error on', next);
      setSpeaking(false);
      setTtsError('অডিও প্লে করতে সমস্যা হয়েছে।');
    };
    audio.play().catch((err) => {
      console.error('[TTS] Audio play failed', err);
      setSpeaking(false);
    });
  }

  function stopTTS() {
    cancelledRef.current = true;
    urlQueueRef.current = [];
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.src = '';
    }
    for (const blobUrl of prefetchRef.current.values()) {
      URL.revokeObjectURL(blobUrl);
    }
    prefetchRef.current.clear();
    setSpeaking(false);
    setLoading(false);
  }

  function handleShare(platform: 'facebook' | 'twitter' | 'whatsapp' | 'linkedin' | 'copy') {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const text = encodeURIComponent(title);
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
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
        return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=500');
  }

  async function handleTTS() {
    if (speaking || loading) {
      stopTTS();
      return;
    }

    // Build content strictly from title + subtitle + body — nothing else.
    // `body` may be HTML, so strip tags to plain text.
    const bodyText = body
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const parts: string[] = [];
    if (title) parts.push(title.trim());
    if (subtitle) parts.push(subtitle.trim());
    if (bodyText) parts.push(bodyText);
    const fullText = parts.join('। ');
    if (!fullText) return;

    setLoading(true);
    cancelledRef.current = false;

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: fullText, lang: 'bn' }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { chunks: string[]; provider?: string };

      if (cancelledRef.current) return;
      if (!data.chunks || data.chunks.length === 0) {
        setLoading(false);
        setTtsError('অডিও জেনারেট করা যায়নি।');
        return;
      }

      const provider = data.provider || 'google';
      urlQueueRef.current = data.chunks.map(
        (c) =>
          `/api/tts/audio?provider=${provider}&text=${encodeURIComponent(c)}`
      );
      setLoading(false);
      setSpeaking(true);
      playNextChunk();
    } catch (err) {
      console.error('[TTS] Fetch failed', err);
      setLoading(false);
      setTtsError('অডিও লোড করতে সমস্যা হয়েছে। ইন্টারনেট সংযোগ পরীক্ষা করুন।');
    }
  }

  function handlePrint() {
    if (typeof window !== 'undefined') window.print();
  }

  // 1px per click, range [−15 px, +15 px] from the 19px base.
  function increaseFont() {
    setFontOffset((o) => Math.min(o + 1, 15));
  }
  function decreaseFont() {
    setFontOffset((o) => Math.max(o - 1, -15));
  }

  const btnClass = `flex items-center justify-center rounded-full border border-border hover:bg-background-tertiary hover:border-accent hover:text-accent transition-colors cursor-pointer ${
    compact ? 'w-10 h-10' : 'w-11 h-11'
  }`;
  const iconClass = compact ? 'w-5 h-5' : 'w-[22px] h-[22px]';

  return (
    <>
    {ttsError && (
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50" onClick={() => setTtsError(null)}>
        <div className="relative w-full max-w-md bg-card border border-border rounded-xl shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-lg font-bold mb-3 text-foreground">TTS সমস্যা</h3>
          <p className="text-sm text-foreground-secondary leading-relaxed mb-4">{ttsError}</p>
          <button
            type="button"
            onClick={() => setTtsError(null)}
            className="w-full py-2 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors cursor-pointer"
          >
            ঠিক আছে
          </button>
        </div>
      </div>
    )}
    <div className="flex flex-wrap items-center gap-1.5">
      {!toolsOnly && (
        <>
          {/* Share group */}
          <button
            onClick={() => handleShare('facebook')}
        className={`${btnClass} text-[#1877F2]`}
        aria-label="ফেসবুকে শেয়ার"
        title="ফেসবুকে শেয়ার"
      >
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>
      <button onClick={() => handleShare('twitter')} className={btnClass} aria-label="এক্সে শেয়ার" title="এক্সে শেয়ার">
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
      <button
        onClick={() => handleShare('whatsapp')}
        className={`${btnClass} text-[#25D366]`}
        aria-label="হোয়াটসঅ্যাপে শেয়ার"
        title="হোয়াটসঅ্যাপে শেয়ার"
      >
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>
      <button
        onClick={() => handleShare('linkedin')}
        className={`${btnClass} text-[#0A66C2]`}
        aria-label="লিংকডইনে শেয়ার"
        title="লিংকডইনে শেয়ার"
      >
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>
      <button
        onClick={() => handleShare('copy')}
        className={btnClass}
        aria-label="লিংক কপি"
        title={copied ? 'কপি হয়েছে!' : 'লিংক কপি করুন'}
      >
        {copied ? (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )}
      </button>
        </>
      )}

      {!shareOnly && (
        <>
          {/* Divider — only visible when both share + tools are present */}
          {!toolsOnly && <span className="w-px h-6 bg-border mx-1" aria-hidden="true" />}

          {/* TTS */}
          <button
            onClick={handleTTS}
            disabled={loading}
            className={`${btnClass} ${speaking || loading ? 'bg-accent !text-white border-accent' : ''} disabled:opacity-70`}
            aria-label={speaking ? 'পড়া বন্ধ করুন' : loading ? 'অডিও লোড হচ্ছে' : 'আর্টিকেল পড়ুন'}
            title={speaking ? 'পড়া বন্ধ করুন' : loading ? 'অডিও লোড হচ্ছে...' : 'আর্টিকেল পড়ুন'}
          >
            {loading ? (
              <svg className={`${iconClass} animate-spin`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v4m0 8v4m8-8h-4M8 12H4m13.657-5.657l-2.829 2.829M8.172 15.828l-2.829 2.829m0-13.314l2.829 2.829m7.656 7.656l2.829 2.829" />
              </svg>
            ) : speaking ? (
              <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>

          {/* Font size controls */}
          <button onClick={decreaseFont} className={btnClass} aria-label="ফন্ট ছোট করুন" title="ফন্ট ছোট করুন">
            <span className="text-sm font-bold leading-none">A-</span>
          </button>
          <button onClick={increaseFont} className={btnClass} aria-label="ফন্ট বড় করুন" title="ফন্ট বড় করুন">
            <span className="text-base font-bold leading-none">A+</span>
          </button>

          {/* Print */}
          <button onClick={handlePrint} className={btnClass} aria-label="প্রিন্ট করুন" title="প্রিন্ট করুন">
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>
        </>
      )}
    </div>
    </>
  );
}
