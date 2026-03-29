'use client';

import { useMemo, useState } from 'react';
import { Post } from '@/lib/types';
import { BlogCard } from '@/components/blog/blog-card';
import { Input } from '@/components/ui/input';

export function BlogFilter({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('all');

  const tags = useMemo(() => {
    const values = new Set<string>();
    posts.forEach((post) => post.tags?.forEach((item) => values.add(item.slug)));
    return ['all', ...Array.from(values)];
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const hitSearch = [post.title, post.summary, post.content].join(' ').toLowerCase().includes(search.toLowerCase());
      const hitTag = tag === 'all' || post.tags?.some((item) => item.slug === tag);
      return hitSearch && hitTag;
    });
  }, [posts, search, tag]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search blog posts..." />
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm"
        >
          {tags.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-8 text-center text-sm text-slate-500">No posts match your current search or filter.</div>
      ) : null}
    </div>
  );
}
