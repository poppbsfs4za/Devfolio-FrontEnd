import { Tag } from '@/lib/types';

export function TagBadge({ tag }: { tag: Tag }) {
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">#{tag.name}</span>;
}
