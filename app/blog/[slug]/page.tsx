import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { TagBadge } from '@/components/blog/tag-badge';
import { MarkdownContent } from '@/components/blog/markdown-content';
import { TocSidebar } from '@/components/blog/toc-sidebar';
import { extractToc } from '@/lib/markdown';
import { normalizeUploadUrl } from '@/lib/normalize-upload-url';

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug).catch(() => null);
  if (!post) notFound();

  const tocItems = extractToc(post.content);

  return (
    <section className="section-gap">
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/blog" className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
            ← Back to blog
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="card overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800">
              {post.cover_image_url ? (
                <img
                  src={normalizeUploadUrl(post.cover_image_url)}
                  alt={post.title}
                  className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[420px]"
                />
              ) : (
                <div className="flex h-[260px] w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 sm:h-[360px] lg:h-[420px]">
                  <div className="text-center text-slate-400 dark:text-slate-500">
                    <div className="mb-3 inline-flex rounded-full border border-slate-300 px-4 py-1 text-xs uppercase tracking-[0.2em] dark:border-slate-700">
                      Cover Image
                    </div>
                    <p className="text-sm">No image available</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 sm:p-10">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <span>{formatDate(post.published_at)}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      post.status === 'published'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : post.status === 'archived'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950'
                    }`}
                  >
                    {post.status}
                  </span>
                </div>

                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
                  {post.title}
                </h1>

                {post.summary ? (
                  <p className="text-lg leading-8 text-slate-600 dark:text-slate-400">
                    {post.summary}
                  </p>
                ) : null}

                {post.tags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <TagBadge key={tag.id} tag={tag} />
                    ))}
                  </div>
                ) : null}

                <MarkdownContent content={post.content} />
              </div>
            </div>
          </article>

          <div className="hidden lg:block">
            <TocSidebar items={tocItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
