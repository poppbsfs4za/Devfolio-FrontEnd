import Link from "next/link";
import { Post } from "@/lib/types";
import { normalizeUploadUrl } from '@/lib/normalize-upload-url';


export function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <article className="card flex h-full min-h-[220px] p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-start">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-500">
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString(
                      undefined,
                      { year: "numeric", month: "short", day: "numeric" }
                    )
                  : "Not published yet"}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  post.status === "published"
                    ? "bg-emerald-100 text-emerald-700"
                    : post.status === "archived"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-900 text-white"
                }`}
              >
                {post.status}
              </span>
            </div>

            <h2 className="mb-3 text-2xl font-semibold tracking-tight text-slate-900">
              {post.title}
            </h2>

            {post.summary ? (
              <p className="line-clamp-4 leading-7 text-slate-600">
                {post.summary}
              </p>
            ) : (
              <p className="text-slate-400">No summary available.</p>
            )}
          </div>

          <div className="h-40 w-full shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:h-28 sm:w-40">
            {post.cover_image_url ? (
              <img
                src={normalizeUploadUrl(post.cover_image_url)}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
                <div className="rounded-full border border-slate-300 px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
                  Cover
                </div>
                <p className="text-xs">No image</p>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}