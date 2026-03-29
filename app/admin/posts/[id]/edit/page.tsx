'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminPostById, updatePost } from '@/lib/api';
import { getToken, removeToken } from '@/lib/auth';
import { ProtectedRoute } from '@/components/admin/protected-route';

type EditPostPageProps = {
  params: {
    id: string;
  };
};

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImageURL, setCoverImageURL] = useState('');
  const [status, setStatus] = useState('draft');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = getToken();
        if (!token) {
          router.replace('/admin/login');
          return;
        }

        const res = await getAdminPostById(token, params.id);
        const post = res.data;

        setTitle(post.title || '');
        setSlug(post.slug || '');
        setSummary(post.summary || '');
        setContent(post.content || '');
        setCoverImageURL(post.cover_image_url || '');
        setStatus(post.status || 'draft');
        setTagInput(post.tags?.map((tag) => tag.name).join(', ') || '');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load post';

        if (
          message.toLowerCase().includes('unauthorized') ||
          message.toLowerCase().includes('invalid token')
        ) {
          removeToken();
          router.replace('/admin/login');
          return;
        }

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const token = getToken();
      if (!token) {
        router.replace('/admin/login');
        return;
      }

      const payload = {
        title,
        slug,
        summary,
        content,
        cover_image_url: coverImageURL,
        status,
        tags: tagInput
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      await updatePost(token, params.id, payload);
      router.push('/admin/posts');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="container-page py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Edit Post</h1>
          <p className="mt-2 text-gray-600">
            Update your post content and settings.
          </p>
        </div>

        {loading ? (
          <p>Loading post...</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Title</label>
                <input
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post title"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Slug</label>
                <input
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-slug"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Summary</label>
              <textarea
                className="min-h-[120px] w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Short summary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Content</label>
              <textarea
                className="min-h-[220px] w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your content here..."
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Cover Image URL</label>
                <input
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  value={coverImageURL}
                  onChange={(e) => setCoverImageURL(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Status</label>
                <select
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                  <option value="archived">archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Tags</label>
              <input
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="go, backend, api"
              />
            </div>

            {error ? (
              <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-gray-900 px-5 py-3 text-white disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>

              <button
                type="button"
                onClick={() => router.push('/admin/posts')}
                className="rounded-xl border border-gray-300 px-5 py-3 text-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </main>
    </ProtectedRoute>
  );
}