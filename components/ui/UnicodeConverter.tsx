'use client';

import { useState } from 'react';

/* ──────────────────────────────────────────────────────────────────────────
   Bijoy (Sutonny MJ) ↔ Unicode mapping.
   Covers the most common code points used in everyday Bangla text.
   For production-grade conversion of complex conjuncts, a full table or
   a library like avro-keyboard / bn-converter would be needed.
   ────────────────────────────────────────────────────────────────────────── */

const BIJOY_TO_UNICODE: Record<string, string> = {
  // Vowels
  'A': 'য', 'Av': 'আ', 'Bv': 'ঈ', 'B': 'ই', 'D': 'উ', 'E': 'ঊ', 'F': 'ঋ', 'G': 'এ',
  'H': 'ঐ', 'I': 'ও', 'J': 'ঔ',
  // Consonants
  'K': 'ক', 'L': 'খ', 'M': 'গ', 'N': 'ঘ', 'O': 'ঙ',
  'P': 'চ', 'Q': 'ছ', 'R': 'জ', 'S': 'ঝ', 'T': 'ঞ',
  'U': 'ট', 'V': 'ঠ', 'W': 'ড', 'X': 'ঢ', 'Y': 'ণ',
  'Z': 'ত', '_': 'থ', 'a': 'দ', 'b': 'ধ', 'c': 'ন',
  'd': 'প', 'e': 'ফ', 'f': 'ব', 'g': 'ভ', 'h': 'ম',
  'i': 'য', 'j': 'র', 'k': 'ল', 'l': 'শ', 'm': 'ষ',
  'n': 'স', 'o': 'হ',
  // Vowel signs (kar)
  'v': 'া', 'w': 'ি', 'x': 'ী', 'y': 'ু', 'z': 'ূ',
  '„': 'ৃ', '‡': 'ে', 'ˆ': 'ৈ', '‹': 'ো', '›': 'ৌ',
  // Special signs
  '‘': 'ং', '’': 'ঃ', '¦': 'ঁ', '/': '্', '|': '।',
  // Digits
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫',
  '6': '৬', '7': '৭', '8': '৮', '9': '৯',
};

function bijoyToUnicode(input: string): string {
  let out = '';
  let i = 0;
  while (i < input.length) {
    // Try 2-char first (for Av, Bv, etc.)
    const two = input.substring(i, i + 2);
    if (BIJOY_TO_UNICODE[two]) {
      out += BIJOY_TO_UNICODE[two];
      i += 2;
      continue;
    }
    const one = input[i];
    if (BIJOY_TO_UNICODE[one]) {
      out += BIJOY_TO_UNICODE[one];
    } else {
      out += one;
    }
    i += 1;
  }
  return out;
}

const UNICODE_TO_BIJOY: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const [k, v] of Object.entries(BIJOY_TO_UNICODE)) {
    if (!map[v]) map[v] = k;
  }
  return map;
})();

function unicodeToBijoy(input: string): string {
  let out = '';
  for (const ch of input) {
    out += UNICODE_TO_BIJOY[ch] ?? ch;
  }
  return out;
}

type Direction = 'b2u' | 'u2b';

export default function UnicodeConverter() {
  const [direction, setDirection] = useState<Direction>('b2u');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  function convert(value: string, dir: Direction) {
    setInput(value);
    setOutput(dir === 'b2u' ? bijoyToUnicode(value) : unicodeToBijoy(value));
  }

  function flip() {
    const newDir: Direction = direction === 'b2u' ? 'u2b' : 'b2u';
    setDirection(newDir);
    setInput(output);
    setOutput(input);
  }

  function copyOutput() {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  function clearAll() {
    setInput('');
    setOutput('');
  }

  const inputLabel = direction === 'b2u' ? 'Bijoy (Sutonny MJ) টেক্সট' : 'Unicode বাংলা টেক্সট';
  const outputLabel = direction === 'b2u' ? 'Unicode বাংলা টেক্সট' : 'Bijoy টেক্সট';

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Direction switcher */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-background-secondary">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setDirection('b2u');
              setOutput(bijoyToUnicode(input));
            }}
            className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              direction === 'b2u'
                ? 'bg-accent text-white'
                : 'bg-background text-foreground-secondary hover:bg-background-tertiary'
            }`}
          >
            Bijoy → Unicode
          </button>
          <button
            type="button"
            onClick={() => {
              setDirection('u2b');
              setOutput(unicodeToBijoy(input));
            }}
            className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              direction === 'u2b'
                ? 'bg-accent text-white'
                : 'bg-background text-foreground-secondary hover:bg-background-tertiary'
            }`}
          >
            Unicode → Bijoy
          </button>
        </div>

        <button
          type="button"
          onClick={flip}
          className="p-1.5 rounded-lg hover:bg-background-tertiary text-foreground-muted transition-colors cursor-pointer"
          aria-label="বিনিময় করুন"
          title="ইনপুট ও আউটপুট অদলবদল"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </button>
      </div>

      {/* I/O panes */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        <div className="p-4">
          <label className="text-sm font-semibold text-foreground mb-2 block">{inputLabel}</label>
          <textarea
            value={input}
            onChange={(e) => convert(e.target.value, direction)}
            rows={10}
            placeholder={direction === 'b2u' ? 'GLv‡b Bijoy †U·U wjLyb...' : 'এখানে ইউনিকোড টেক্সট লিখুন...'}
            className="w-full px-3 py-2.5 text-[15px] rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-y"
          />
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-foreground">{outputLabel}</label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={copyOutput}
                disabled={!output}
                className="text-xs font-semibold px-2.5 py-1 rounded-md text-accent hover:bg-accent/10 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                {copied ? '✓ কপি হয়েছে' : 'কপি'}
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-semibold px-2.5 py-1 rounded-md text-foreground-muted hover:bg-background-tertiary cursor-pointer transition-colors"
              >
                মুছুন
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            rows={10}
            placeholder="রূপান্তরিত ফলাফল এখানে দেখা যাবে..."
            className="w-full px-3 py-2.5 text-[15px] rounded-lg border border-border bg-background-secondary focus:outline-none resize-y"
          />
        </div>
      </div>

      <p className="px-4 py-3 border-t border-border text-xs text-foreground-muted bg-background-secondary">
        নোট: এই কনভার্টার সাধারণ অক্ষর ও সংখ্যা সঠিকভাবে রূপান্তর করে। যৌগিক যুক্তাক্ষর (যেমন ক্ষ, জ্ঞ, ত্র) সঠিকভাবে রূপান্তরের জন্য বিশেষায়িত টুল ব্যবহার করুন।
      </p>
    </div>
  );
}
