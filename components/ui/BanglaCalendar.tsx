'use client';

import { toBanglaDigits } from '@/lib/bangla';
import { useState } from 'react';

const BANGLA_MONTHS = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
];

const BANGLA_WEEKDAYS_SHORT = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];

function parseLocalDate(iso: string): { y: number; m: number; d: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  return {
    y: parseInt(match[1], 10),
    m: parseInt(match[2], 10) - 1,
    d: parseInt(match[3], 10),
  };
}

function toISODate(y: number, m: number, d: number): string {
  const mm = String(m + 1).padStart(2, '0');
  const dd = String(d).padStart(2, '0');
  return `${y}-${mm}-${dd}`;
}

interface BanglaCalendarProps {
  value?: string;
  onChange: (date: string) => void;
  onClose?: () => void;
}

type Mode = 'days' | 'months' | 'years';

export default function BanglaCalendar({ value, onChange, onClose }: BanglaCalendarProps) {
  const today = new Date();
  const parsed = value ? parseLocalDate(value) : null;
  const initialY = parsed?.y ?? today.getFullYear();
  const initialM = parsed?.m ?? today.getMonth();

  const [viewYear, setViewYear] = useState(initialY);
  const [viewMonth, setViewMonth] = useState(initialM);
  const [mode, setMode] = useState<Mode>('days');
  // Year grid pagination — pages of 12 years, anchored at a multiple of 12
  const [yearPageStart, setYearPageStart] = useState(Math.floor(initialY / 12) * 12);

  const todayY = today.getFullYear();
  const todayM = today.getMonth();
  const todayD = today.getDate();

  /* ─── Day view helpers ─── */
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const cells: (number | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function selectDay(day: number) {
    onChange(toISODate(viewYear, viewMonth, day));
    onClose?.();
  }

  function jumpToToday() {
    setViewMonth(todayM);
    setViewYear(todayY);
    setMode('days');
    onChange(toISODate(todayY, todayM, todayD));
    onClose?.();
  }

  function openYearPicker() {
    setYearPageStart(Math.floor(viewYear / 12) * 12);
    setMode('years');
  }

  function selectYear(y: number) {
    setViewYear(y);
    setMode('months');
  }

  function selectMonth(m: number) {
    setViewMonth(m);
    setMode('days');
  }

  return (
    <div className="w-[340px] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
      {/* Header band */}
      <div className="bg-accent text-white px-3 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (mode === 'days') prevMonth();
            else if (mode === 'months') setViewYear((y) => y - 1);
            else setYearPageStart((s) => s - 12);
          }}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="পূর্ববর্তী"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Clickable title — cycles views */}
        <button
          type="button"
          onClick={() => {
            if (mode === 'days') setMode('months');
            else if (mode === 'months') openYearPicker();
            else setMode('days');
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
        >
          <span className="text-[15px] font-semibold leading-tight">
            {mode === 'days' && `${BANGLA_MONTHS[viewMonth]} ${toBanglaDigits(viewYear)}`}
            {mode === 'months' && toBanglaDigits(viewYear)}
            {mode === 'years' && `${toBanglaDigits(yearPageStart)} – ${toBanglaDigits(yearPageStart + 11)}`}
          </span>
          <svg className="w-3.5 h-3.5 text-white/90" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => {
            if (mode === 'days') nextMonth();
            else if (mode === 'months') setViewYear((y) => y + 1);
            else setYearPageStart((s) => s + 12);
          }}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="পরবর্তী"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── DAYS VIEW ── */}
      {mode === 'days' && (
        <>
          <div className="grid grid-cols-7 px-3 pt-3">
            {BANGLA_WEEKDAYS_SHORT.map((w, i) => (
              <div
                key={w}
                className={`text-center text-[11px] font-semibold py-1 ${
                  i === 5 ? 'text-accent' : 'text-foreground-muted'
                }`}
              >
                {w}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 px-3 pb-3">
            {cells.map((day, idx) => {
              if (day === null) return <div key={idx} className="aspect-square" />;
              const isToday = viewYear === todayY && viewMonth === todayM && day === todayD;
              const isSelected =
                parsed && parsed.y === viewYear && parsed.m === viewMonth && parsed.d === day;
              const isFriday = idx % 7 === 5;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectDay(day)}
                  className={`
                    aspect-square rounded-full flex items-center justify-center text-sm
                    transition-all duration-150 cursor-pointer
                    ${
                      isSelected
                        ? 'bg-accent text-white font-bold shadow-md shadow-accent/30 scale-105'
                        : isToday
                        ? 'border-2 border-accent text-accent font-semibold'
                        : isFriday
                        ? 'text-accent/80 hover:bg-accent/10'
                        : 'text-foreground hover:bg-background-tertiary'
                    }
                  `}
                >
                  {toBanglaDigits(day)}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* ── MONTHS VIEW ── */}
      {mode === 'months' && (
        <div className="grid grid-cols-3 gap-2 p-4">
          {BANGLA_MONTHS.map((name, m) => {
            const isSelected = parsed && parsed.y === viewYear && parsed.m === m;
            const isCurrent = viewYear === todayY && m === todayM;
            return (
              <button
                key={name}
                type="button"
                onClick={() => selectMonth(m)}
                className={`
                  py-3 rounded-lg text-sm font-medium transition-all cursor-pointer
                  ${
                    isSelected
                      ? 'bg-accent text-white shadow-md shadow-accent/30'
                      : isCurrent
                      ? 'border-2 border-accent text-accent font-semibold'
                      : 'text-foreground hover:bg-background-tertiary'
                  }
                `}
              >
                {name}
              </button>
            );
          })}
        </div>
      )}

      {/* ── YEARS VIEW ── */}
      {mode === 'years' && (
        <div className="grid grid-cols-3 gap-2 p-4">
          {Array.from({ length: 12 }, (_, i) => yearPageStart + i).map((y) => {
            const isSelected = parsed && parsed.y === y;
            const isCurrent = y === todayY;
            return (
              <button
                key={y}
                type="button"
                onClick={() => selectYear(y)}
                className={`
                  py-3 rounded-lg text-sm font-medium transition-all cursor-pointer
                  ${
                    isSelected
                      ? 'bg-accent text-white shadow-md shadow-accent/30'
                      : isCurrent
                      ? 'border-2 border-accent text-accent font-semibold'
                      : 'text-foreground hover:bg-background-tertiary'
                  }
                `}
              >
                {toBanglaDigits(y)}
              </button>
            );
          })}
        </div>
      )}

      {/* Footer actions */}
      <div className="border-t border-border px-3 py-2.5 flex items-center justify-between bg-background-secondary">
        <button
          type="button"
          onClick={jumpToToday}
          className="text-sm font-semibold text-accent hover:bg-accent/10 rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
        >
          আজকের তারিখ
        </button>
        <button
          type="button"
          onClick={() => onClose?.()}
          className="text-sm text-foreground-secondary hover:text-foreground rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
        >
          বন্ধ
        </button>
      </div>
    </div>
  );
}
