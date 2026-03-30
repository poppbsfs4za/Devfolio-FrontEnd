import { TocItem } from '@/lib/markdown';

type Props = {
  items: TocItem[];
};

export function TocSidebar({ items }: Props) {
  if (!items.length) return null;

  return (
    <aside className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-4">
      <p className="mb-3 text-sm font-semibold text-slate-900">เนื้อหา</p>

      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
              <a
                href={`#${item.id}`}
                className="block border-l-2 border-transparent pl-3 text-sm text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}