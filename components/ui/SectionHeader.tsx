import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  href?: string;
  colorClass?: string;
}

export default function SectionHeader({ title, href, colorClass = 'bg-accent' }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <div className={`w-1 h-7 rounded-full ${colorClass}`} />
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="text-sm text-accent hover:underline font-medium">
          আরও →
        </Link>
      )}
    </div>
  );
}
