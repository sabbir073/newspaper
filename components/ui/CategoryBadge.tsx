import Link from 'next/link';
import type { Category } from '@/lib/types';
import { getCategoryColorClass, getCategoryBgClass } from '@/lib/utils';

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
}

export default function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={`inline-block font-semibold ${getCategoryColorClass(category.slug)} ${
        size === 'sm' ? 'text-xs' : 'text-sm'
      } hover:underline`}
    >
      {category.name}
    </Link>
  );
}

export function CategoryBadgePill({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold text-white ${getCategoryBgClass(category.slug)} hover:opacity-90 transition-opacity`}
    >
      {category.name}
    </Link>
  );
}
