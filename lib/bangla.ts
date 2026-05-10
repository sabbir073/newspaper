const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

const banglaMonths = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

const banglaWeekdays = [
  'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'
];

export function toBanglaDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => banglaDigits[parseInt(d)]);
}

export function formatBanglaNumber(value: number): string {
  return toBanglaDigits(value.toLocaleString('en-US'));
}

export function formatBanglaDate(dateStr: Date | string): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  const day = toBanglaDigits(date.getDate());
  const month = banglaMonths[date.getMonth()];
  const year = toBanglaDigits(date.getFullYear());
  const weekday = banglaWeekdays[date.getDay()];
  return `${day} ${month} ${year}, ${weekday}`;
}

export function formatBanglaDateShort(dateStr: Date | string): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  const day = toBanglaDigits(date.getDate());
  const month = banglaMonths[date.getMonth()];
  const year = toBanglaDigits(date.getFullYear());
  return `${day} ${month} ${year}`;
}

export function timeSince(dateStr: Date | string): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'এইমাত্র';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${toBanglaDigits(minutes)} মিনিট আগে`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${toBanglaDigits(hours)} ঘণ্টা আগে`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${toBanglaDigits(days)} দিন আগে`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${toBanglaDigits(weeks)} সপ্তাহ আগে`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${toBanglaDigits(months)} মাস আগে`;

  const years = Math.floor(days / 365);
  return `${toBanglaDigits(years)} বছর আগে`;
}

export function estimateReadTime(body: string): string {
  const words = body.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${toBanglaDigits(minutes)} মিনিট পড়া`;
}

const banglaCalendarMonths = [
  'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন',
  'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
];

const banglaCalendarMonthDays = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30];

export function toBanglaCalendarDate(dateStr: Date | string): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  const gYear = date.getFullYear();
  const gMonth = date.getMonth() + 1;
  const gDay = date.getDate();

  let bYear = gYear - 593;
  let bMonth: number;
  let bDay: number;

  // Approximate Bangla calendar conversion
  if (gMonth === 4 && gDay >= 14) {
    bMonth = 0; bDay = gDay - 13;
  } else if (gMonth === 5 && gDay < 15) {
    bMonth = 0; bDay = gDay + 17;
  } else if (gMonth === 5 && gDay >= 15) {
    bMonth = 1; bDay = gDay - 14;
  } else if (gMonth === 6 && gDay < 15) {
    bMonth = 1; bDay = gDay + 16;
  } else if (gMonth === 6 && gDay >= 15) {
    bMonth = 2; bDay = gDay - 14;
  } else if (gMonth === 7 && gDay < 16) {
    bMonth = 2; bDay = gDay + 15;
  } else if (gMonth === 7 && gDay >= 16) {
    bMonth = 3; bDay = gDay - 15;
  } else if (gMonth === 8 && gDay < 16) {
    bMonth = 3; bDay = gDay + 15;
  } else if (gMonth === 8 && gDay >= 16) {
    bMonth = 4; bDay = gDay - 15;
  } else if (gMonth === 9 && gDay < 16) {
    bMonth = 4; bDay = gDay + 15;
  } else if (gMonth === 9 && gDay >= 16) {
    bMonth = 5; bDay = gDay - 15;
  } else if (gMonth === 10 && gDay < 16) {
    bMonth = 5; bDay = gDay + 14;
  } else if (gMonth === 10 && gDay >= 16) {
    bMonth = 6; bDay = gDay - 15;
  } else if (gMonth === 11 && gDay < 15) {
    bMonth = 6; bDay = gDay + 15;
  } else if (gMonth === 11 && gDay >= 15) {
    bMonth = 7; bDay = gDay - 14;
  } else if (gMonth === 12 && gDay < 15) {
    bMonth = 7; bDay = gDay + 15;
  } else if (gMonth === 12 && gDay >= 15) {
    bMonth = 8; bDay = gDay - 14;
  } else if (gMonth === 1 && gDay < 14) {
    bMonth = 8; bDay = gDay + 16; bYear = gYear - 594;
  } else if (gMonth === 1 && gDay >= 14) {
    bMonth = 9; bDay = gDay - 13; bYear = gYear - 594;
  } else if (gMonth === 2 && gDay < 13) {
    bMonth = 9; bDay = gDay + 17; bYear = gYear - 594;
  } else if (gMonth === 2 && gDay >= 13) {
    bMonth = 10; bDay = gDay - 12; bYear = gYear - 594;
  } else if (gMonth === 3 && gDay < 15) {
    bMonth = 10; bDay = gDay + 15; bYear = gYear - 594;
  } else if (gMonth === 3 && gDay >= 15) {
    bMonth = 11; bDay = gDay - 14; bYear = gYear - 594;
  } else {
    bMonth = 11; bDay = gDay + 16; bYear = gYear - 594;
  }

  const ordinalSuffix = bDay === 1 ? 'লা' : bDay <= 4 ? 'ঠা' : bDay <= 18 ? 'ই' : bDay === 19 ? 'শে' : bDay <= 20 ? 'শে' : 'শে';
  return `${toBanglaDigits(bDay)}${ordinalSuffix} ${banglaCalendarMonths[bMonth]}, ${toBanglaDigits(bYear)}`;
}

export function formatBanglaDateWithWeekday(dateStr: Date | string): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  const weekday = banglaWeekdays[date.getDay()];
  const day = toBanglaDigits(date.getDate());
  const month = banglaMonths[date.getMonth()];
  const year = toBanglaDigits(date.getFullYear());
  return `${weekday}, ${day} ${month}, ${year}`;
}
