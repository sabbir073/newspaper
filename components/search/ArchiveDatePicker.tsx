'use client';

import { useRouter } from 'next/navigation';
import { formatBanglaDateShort } from '@/lib/bangla';

interface ArchiveDatePickerProps {
  dates: string[];
  selectedDate: string;
}

export default function ArchiveDatePicker({ dates, selectedDate }: ArchiveDatePickerProps) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      {dates.map((date) => (
        <button
          key={date}
          onClick={() => router.push(`/archive?date=${date}`)}
          className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
            date === selectedDate
              ? 'bg-accent text-white border-accent'
              : 'border-border hover:bg-background-tertiary'
          }`}
        >
          {formatBanglaDateShort(date)}
        </button>
      ))}
    </div>
  );
}
