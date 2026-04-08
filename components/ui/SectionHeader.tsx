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
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-[15px] text-accent font-medium px-3 py-1.5 rounded-full border border-accent/20 hover:bg-accent hover:text-white transition-all duration-200"
        >
          আরও
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}
