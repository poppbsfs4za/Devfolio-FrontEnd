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
      <section className="border-b border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950 sm:py-14 lg:py-20">
        <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
          {/* Animated hero column — typewriter title + staggered fade-ins */}
          <HomeHero />

          {/* What you'll find card — full-width on mobile, beside hero on lg+ */}
          <div className="card w-full p-6 sm:p-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold sm:text-xl">{h.whatYoullFind}</h2>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                {h.bullets.map((bullet, i) => (
                  <li key={i} className="min-w-0">• {bullet}</li>
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
            <div className="card w-full p-6 text-sm text-slate-500 sm:p-8 dark:text-slate-400">
              {h.noPosts}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
