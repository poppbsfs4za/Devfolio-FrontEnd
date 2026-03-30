export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');
}

export function extractToc(content: string): TocItem[] {
  const lines = content.split('\n');
  const items: TocItem[] = [];
  const usedIds = new Map<string, number>();

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith('## ')) {
      const text = line.replace(/^##\s+/, '').trim();
      if (!text) continue;

      const baseId = slugifyHeading(text);
      const count = usedIds.get(baseId) ?? 0;
      usedIds.set(baseId, count + 1);

      items.push({
        id: count === 0 ? baseId : `${baseId}-${count}`,
        text,
        level: 2,
      });

      continue;
    }

    if (line.startsWith('### ')) {
      const text = line.replace(/^###\s+/, '').trim();
      if (!text) continue;

      const baseId = slugifyHeading(text);
      const count = usedIds.get(baseId) ?? 0;
      usedIds.set(baseId, count + 1);

      items.push({
        id: count === 0 ? baseId : `${baseId}-${count}`,
        text,
        level: 3,
      });
    }
  }

  return items;
}