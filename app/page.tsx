import Link from 'next/link';
import { SectionTitle } from '@/components/layout/section-title';
import { Button } from '@/components/ui/button';
import { getPublishedPosts } from '@/lib/api';
import { BlogCard } from '@/components/blog/blog-card';

export default async function HomePage() {
  const posts = await getPublishedPosts().catch(() => []);

  return (
    <div>
      <section className="section-gap border-b border-slate-200 bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">Backend Engineer Portfolio</span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Hi, I’m Kraiwit. I build backend systems and share engineering notes.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                This frontend is built with Next.js and connected to the Go backend API you deployed on GCP.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/portfolio"><Button>View Portfolio</Button></Link>
              <Link href="/blog"><Button variant="secondary">Read Blog</Button></Link>
            </div>
          </div>
          <div className="card p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">What’s included</h2>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>• Public profile, about, portfolio, and blog pages</li>
                <li>• Blog list and blog detail pages connected to backend API</li>
                <li>• Search and tag filtering for blog posts</li>
                <li>• Admin login and post management screens</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap">
        <div className="container-page">
          <SectionTitle title="Latest Blog Posts" subtitle="These posts are loaded from your deployed backend API." />
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          {posts.length === 0 ? <div className="card p-8 text-sm text-slate-500">No published posts found yet.</div> : null}
        </div>
      </section>
    </div>
  );
}
