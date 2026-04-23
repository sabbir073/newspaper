'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, SITE_NAME } from '@/lib/constants';
import { formatBanglaDateWithWeekday, toBanglaCalendarDate } from '@/lib/bangla';
import ThemeToggle from '@/components/ui/ThemeToggle';
import SearchModal from '@/components/ui/SearchModal';
import BreakingTicker from './BreakingTicker';
import MobileNav from './MobileNav';

const SOCIAL_LINKS = [
  { name: 'ইউটিউব', icon: 'youtube', href: 'https://youtube.com', color: '#FF0000' },
  { name: 'ফেসবুক', icon: 'facebook', href: 'https://facebook.com', color: '#1877F2' },
  { name: 'এক্স (সাবেক টুইটার)', icon: 'x', href: 'https://x.com', color: '' },
  { name: 'লিংকডইন', icon: 'linkedin', href: 'https://linkedin.com', color: '#0A66C2' },
  { name: 'ইনস্টাগ্রাম', icon: 'instagram', href: 'https://instagram.com', color: '#E4405F' },
  { name: 'টিকটক', icon: 'tiktok', href: 'https://tiktok.com', color: '' },
  { name: 'থ্রেডস', icon: 'threads', href: 'https://threads.net', color: '' },
  { name: 'টেলিগ্রাম', icon: 'telegram', href: 'https://t.me', color: '#26A5E4' },
  { name: 'পিন্টারেস্ট', icon: 'pinterest', href: 'https://pinterest.com', color: '#BD081C' },
  { name: 'রেডিট', icon: 'reddit', href: 'https://reddit.com', color: '#FF4500' },
  { name: 'হোয়াটসঅ্যাপ', icon: 'whatsapp', href: 'https://whatsapp.com', color: '#25D366' },
  { name: 'স্ন্যাপচ্যাট', icon: 'snapchat', href: 'https://snapchat.com', color: '#FFFC00' },
];

function SocialIcon({ icon, className }: { icon: string; className?: string }) {
  const cls = className || 'w-5 h-5';
  switch (icon) {
    case 'youtube':
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
    case 'facebook':
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
    case 'x':
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
    case 'linkedin':
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
    case 'instagram':
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
    case 'tiktok':
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>;
    case 'threads':
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.781 3.632 2.695 6.54 2.717 2.227-.02 4.358-.631 5.542-2.2.852-1.13 1.27-2.6 1.238-4.373-.04-1.14-.252-2.12-.645-2.958a4.675 4.675 0 00-.502-.78 5.96 5.96 0 01-1.96.455c.044.36.066.724.066 1.09 0 .264-.013.525-.04.78-.168 1.66-1.136 2.9-2.77 3.36a5.389 5.389 0 01-1.474.202c-2.15 0-3.94-1.39-4.26-3.312a4.024 4.024 0 01-.053-.67c0-2.306 1.9-4.028 4.415-4.028.43 0 .854.046 1.264.134v2.088a3.46 3.46 0 00-1.264-.234c-1.33 0-2.292.767-2.292 1.83 0 .082.005.163.016.243.148.923.936 1.588 1.874 1.588.312 0 .616-.062.9-.183.672-.287 1.086-.946 1.145-1.788.01-.102.015-.206.015-.312 0-.348-.03-.697-.092-1.04a7.57 7.57 0 00-.145-.614l.005-.003a7.93 7.93 0 00-1.732-3.072 6.605 6.605 0 00-2.296-1.638 7.478 7.478 0 00-2.047-.556l-.008-.001c-.397-.047-.801-.07-1.21-.07-1.74 0-3.296.476-4.53 1.373a6.463 6.463 0 00-1.843 2.034l.004.002z"/></svg>;
    case 'telegram':
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>;
    case 'pinterest':
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>;
    case 'reddit':
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>;
    case 'whatsapp':
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
    case 'snapchat':
      return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301a.32.32 0 01.254-.014c.135.06.207.21.179.36-.111.586-.22 1.162-.33 1.725-.045.231-.18.39-.42.47-.18.06-.39.09-.57.12-.18.03-.36.06-.51.12-.21.09-.39.27-.39.51 0 .12.06.27.12.39.39.54.84 1.02 1.35 1.44.36.3.72.54 1.11.72.39.18.75.3 1.14.36.18.03.33.06.42.18.09.12.09.27.03.42-.21.48-.78.87-1.68 1.17-.06.03-.12.03-.18.06-.33.12-.42.3-.45.51 0 .03-.03.09-.03.12-.06.39-.18.66-.57.78-.42.12-.9.03-1.53-.18-.45-.15-.93-.21-1.44-.21-.81 0-1.38.21-1.83.45-.45.24-.84.54-1.29.87-.54.42-1.14.87-2.01 1.23-.42.18-.87.3-1.35.36-.06 0-.12 0-.18.03-.06 0-.12-.03-.18-.03a5.36 5.36 0 01-1.35-.36c-.87-.36-1.47-.81-2.01-1.23-.45-.33-.84-.63-1.29-.87-.45-.24-1.02-.45-1.83-.45-.51 0-.99.06-1.44.21-.63.21-1.11.3-1.53.18-.39-.12-.51-.39-.57-.78 0-.03-.03-.09-.03-.12-.03-.21-.12-.39-.45-.51-.06-.03-.12-.03-.18-.06-.9-.3-1.47-.69-1.68-1.17-.06-.15-.06-.3.03-.42.09-.12.24-.15.42-.18.39-.06.75-.18 1.14-.36.39-.18.75-.42 1.11-.72.51-.42.96-.9 1.35-1.44.06-.12.12-.27.12-.39 0-.24-.18-.42-.39-.51-.15-.06-.33-.09-.51-.12-.18-.03-.39-.06-.57-.12-.24-.08-.375-.24-.42-.47-.11-.563-.22-1.14-.33-1.725a.323.323 0 01.18-.36.321.321 0 01.254.015c.374.18.733.284 1.033.3.198 0 .326-.045.401-.09-.008-.165-.018-.33-.03-.51l-.003-.06c-.104-1.628-.23-3.654.3-4.847C6.647 1.069 10.004.793 10.994.793h1.212z"/></svg>;
    default:
      return null;
  }
}

export default function Header() {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 180);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close social dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (socialRef.current && !socialRef.current.contains(e.target as Node)) {
        setSocialOpen(false);
      }
    }
    if (socialOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [socialOpen]);

  const today = new Date();
  const gregorianDate = formatBanglaDateWithWeekday(today);
  const banglaCalDate = toBanglaCalendarDate(today);

  function renderNavLinks(hideLastN = 0) {
    const items = hideLastN > 0 ? NAV_ITEMS.slice(0, -hideLastN) : NAV_ITEMS;
    return (
      <>
        {/* সর্বশেষ first */}
        <Link
          href="/latest"
          className={`px-3 py-2.5 text-lg font-medium whitespace-nowrap transition-colors hover:text-accent ${
            pathname === '/latest' ? 'text-accent' : 'text-foreground'
          }`}
        >
          সর্বশেষ
        </Link>
        {/* Vertical separator */}
        <span className="w-px h-5 bg-border-strong mx-1" />
        {/* Rest of nav items */}
        {items.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-2.5 text-lg font-medium whitespace-nowrap transition-colors hover:text-accent ${
                isActive ? 'text-accent' : 'text-foreground'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </>
    );
  }

  const navLinks = renderNavLinks();
  const stickyNavLinks = renderNavLinks(2);

  return (
    <>
      {/* ===== FULL HEADER (visible when not scrolled) ===== */}
      <header className={isSticky ? 'invisible' : ''}>
        {/* === MOBILE HEADER (lg:hidden) === */}
        <div className="lg:hidden border-b border-border">
          <div className="px-4 py-5 flex flex-col items-center gap-4">
            {/* Date */}
            <div className="text-center">
              <div className="text-base text-foreground font-medium">{gregorianDate}</div>
              <div className="text-sm text-foreground mt-0.5">{banglaCalDate}</div>
            </div>

            {/* Logo */}
            <Link href="/" className="text-center">
              <h1 className="text-5xl sm:text-5xl font-bold text-accent leading-none tracking-tight">
                {SITE_NAME}
              </h1>
            </Link>

            {/* Utility row: অনুসরণ করুন, theme, খুঁজুন, hamburger */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => setSocialOpen(!socialOpen)}
                className="flex items-center gap-1.5 text-sm text-foreground hover:text-accent transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                </svg>
                <span>অনুসরণ করুন</span>
              </button>

              <ThemeToggle />

              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 text-sm text-foreground hover:text-accent transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <span>খুঁজুন</span>
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="p-1 hover:bg-background-tertiary rounded transition-colors text-foreground cursor-pointer"
                aria-label="মেনু খুলুন"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Social dropdown for mobile */}
          {socialOpen && (
            <div className="border-t border-border px-4 py-3">
              <div className="grid grid-cols-2 gap-1">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.icon}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-background-tertiary transition-colors"
                  >
                    <span className={link.color ? '' : 'text-foreground'} style={link.color ? { color: link.color } : undefined}>
                      <SocialIcon icon={link.icon} className="w-4 h-4" />
                    </span>
                    <span className="text-sm text-foreground">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* === DESKTOP HEADER (hidden on mobile) === */}
        {/* Row 1: date left, logo center, utility right */}
        <div className="hidden lg:block border-b border-border">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-3 items-center h-28">
              {/* Left: Date */}
              <div className="flex flex-col gap-0.5">
                <span className="text-lg text-foreground font-medium">{gregorianDate}</span>
                <span className="text-base text-foreground">{banglaCalDate}</span>
              </div>

              {/* Center: Logo */}
              <div className="flex justify-center">
                <Link href="/" className="text-center">
                  <h1 className="text-5xl lg:text-6xl font-bold text-accent leading-none tracking-tight">
                    {SITE_NAME}
                  </h1>
                </Link>
              </div>

              {/* Right: Utility links */}
              <div className="flex items-center justify-end gap-5">
                {/* Follow us dropdown */}
                <div className="relative" ref={socialRef}>
                  <button
                    onClick={() => setSocialOpen(!socialOpen)}
                    className="flex items-center gap-2 text-lg text-foreground hover:text-accent transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                    </svg>
                    <span>অনুসরণ করুন</span>
                  </button>

                  {/* Social dropdown */}
                  {socialOpen && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-background rounded-xl shadow-2xl border border-border z-[60] p-4">
                      <div className="grid grid-cols-2 gap-1">
                        {SOCIAL_LINKS.map((link) => (
                          <a
                            key={link.icon}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-background-tertiary transition-colors"
                          >
                            <span style={{ color: link.color }}>
                              <SocialIcon icon={link.icon} className="w-5 h-5" />
                            </span>
                            <span className="text-sm font-medium text-foreground">{link.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <ThemeToggle />

                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 text-lg text-foreground hover:text-accent transition-colors cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <span>খুঁজুন</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Desktop Navigation bar */}
        <div className="hidden lg:block border-b border-border">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center h-14">
              <nav className="flex items-center">
                {navLinks}
              </nav>

              {/* Hamburger for mega menu */}
              <button
                onClick={() => setMobileOpen(true)}
                className="ml-3 p-1.5 hover:bg-background-tertiary rounded transition-colors text-foreground-muted cursor-pointer"
                aria-label="আরও মেনু"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Row 3: Breaking ticker */}
        <BreakingTicker />
      </header>

      {/* ===== STICKY HEADER (visible when scrolled) ===== */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm transition-transform duration-300 ${
          isSticky ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-14">
            {/* Small logo */}
            <Link href="/" className="text-2xl font-bold text-accent mr-5 whitespace-nowrap">
              {SITE_NAME}
            </Link>

            {/* Nav links (last 2 hidden in sticky) */}
            <nav className="hidden lg:flex items-center flex-1 overflow-x-auto scrollbar-hide">
              {stickyNavLinks}
            </nav>

            {/* Mobile: just fill space */}
            <div className="lg:hidden flex-1" />

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="ml-3 p-1.5 hover:bg-background-tertiary rounded transition-colors text-foreground-muted cursor-pointer"
              aria-label="মেনু খুলুন"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav overlay */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Search modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
