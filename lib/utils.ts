export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getCategoryColorClass(slug: string): string {
  const map: Record<string, string> = {
    national: 'text-cat-national',
    politics: 'text-cat-politics',
    international: 'text-cat-international',
    sports: 'text-cat-sports',
    entertainment: 'text-cat-entertainment',
    technology: 'text-cat-technology',
    opinion: 'text-cat-opinion',
    business: 'text-cat-business',
  };
  return map[slug] || 'text-accent';
}

export function getCategoryBgClass(slug: string): string {
  const map: Record<string, string> = {
    national: 'bg-cat-national',
    politics: 'bg-cat-politics',
    international: 'bg-cat-international',
    sports: 'bg-cat-sports',
    entertainment: 'bg-cat-entertainment',
    technology: 'bg-cat-technology',
    opinion: 'bg-cat-opinion',
    business: 'bg-cat-business',
  };
  return map[slug] || 'bg-accent';
}
