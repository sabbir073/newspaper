import { timeSince } from '@/lib/bangla';

export default function TimeSince({ date }: { date: string }) {
  return (
    <time dateTime={date} className="text-xs text-foreground-muted">
      {timeSince(date)}
    </time>
  );
}
