import { Tag } from '@/lib/types';

export function TagBadge({ tag }: { tag: Tag }) {
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">#{tag.name}</span>;
}
