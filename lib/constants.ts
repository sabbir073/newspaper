export const SITE_NAME = 'দৈনিক প্রতিদিন';
export const SITE_TAGLINE = 'বাংলাদেশের আধুনিক অনলাইন সংবাদপত্র';
export const SITE_DESCRIPTION = 'দৈনিক প্রতিদিন — বাংলাদেশের সবচেয়ে আধুনিক ও বিশ্বস্ত অনলাইন সংবাদপত্র। জাতীয়, আন্তর্জাতিক, খেলা, বিনোদন, প্রযুক্তি ও আরও অনেক খবর পড়ুন।';

export const PER_PAGE = 12;

export const NAV_ITEMS = [
  { name: 'জাতীয়', href: '/category/national' },
  { name: 'রাজনীতি', href: '/category/politics' },
  { name: 'অর্থনীতি', href: '/category/business' },
  { name: 'আন্তর্জাতিক', href: '/category/international' },
  { name: 'সারাদেশ', href: '/category/national' },
  { name: 'মতামত', href: '/category/opinion' },
  { name: 'খেলা', href: '/category/sports' },
  { name: 'বিনোদন', href: '/category/entertainment' },
  { name: 'সাহিত্য', href: '/category/opinion' },
  { name: 'গণমাধ্যম', href: '/category/technology' },
  { name: 'প্রযুক্তি', href: '/category/technology' },
  { name: 'শিক্ষা', href: '/category/national' },
];

export const CATEGORY_COLOR_MAP: Record<string, string> = {
  national: 'var(--cat-national)',
  politics: 'var(--cat-politics)',
  international: 'var(--cat-international)',
  sports: 'var(--cat-sports)',
  entertainment: 'var(--cat-entertainment)',
  technology: 'var(--cat-technology)',
  opinion: 'var(--cat-opinion)',
  business: 'var(--cat-business)',
};
