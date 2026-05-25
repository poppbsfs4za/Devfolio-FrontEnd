'use client';

import { SectionTitle } from '@/components/layout/section-title';
import { BlogCard } from '@/components/blog/blog-card';
import { HomeHero } from '@/components/home/home-hero';
import { useLanguage } from '@/lib/language';
import type { Post } from '@/lib/types';

interface HomeContentProps {
  posts: Post[];
}

export function HomeContent({ posts }: HomeContentProps) {
  const { t } = useLanguage();
  const h = t.home;

  return (
    <div>
      {/* Hero */}
      <section className="section-gap border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          {/* Animated hero column — typewriter title + staggered fade-ins */}
          <HomeHero />

          {/* What you'll find card */}
          <div className="card p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{h.whatYoullFind}</h2>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                {h.bullets.map((bullet, i) => (
                  <li key={i}>• {bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="section-gap">
        <div className="container-page">
          <SectionTitle title={h.latestPosts} subtitle={h.latestPostsSubtitle} />
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          {posts.length === 0 ? (
            <div className="card p-8 text-sm text-slate-500 dark:text-slate-400">
              {h.noPosts}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
