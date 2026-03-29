'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deletePost, getAdminPosts } from '@/lib/api';
import { getToken, removeToken } from '@/lib/auth';
import { Post } from '@/lib/types';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { getRequiredToken, handleUnauthorized, isUnauthorizedError } from '@/lib/admin-api';


export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = getToken();
        if (!token) {
          router.replace('/admin/login');
          return;
        }

        const res = await getAdminPosts(token);
        setPosts(res.data ?? []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load admin posts';

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

    fetchPosts();
  }, [router]);

  const handleDelete = async (postId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    setDeletingId(postId);

    try {
      const token = getRequiredToken();

      await deletePost(token, String(postId));

      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      if (isUnauthorizedError(err)) {
        handleUnauthorized(() => router.replace('/admin/login'));
        return;
      }

      alert(err instanceof Error ? err.message : 'Failed to delete post');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <ProtectedRoute>
      <main className="container-page py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Manage Posts</h1>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/posts/new"
              className="rounded bg-black px-4 py-2 text-white"
            >
              + New Post
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
            Loading posts...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
            No posts found
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full">
              <thead className="bg-slate-50 text-left text-sm">
                <tr>
                  <th className="p-3">Cover</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Updated</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-t border-slate-200">
                    <td className="p-3">
                      {post.cover_image_url ? (
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="h-16 w-24 rounded object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="flex h-16 w-24 items-center justify-center rounded border border-dashed border-slate-300 text-xs text-slate-400">
                          No image
                        </div>
                      )}
                    </td>

                    <td className="p-3">
                      <div className="font-medium">{post.title}</div>
                      <div className="text-xs text-slate-500">{post.slug}</div>
                    </td>

                    <td className="p-3">
                      <span
                        className={`rounded px-2 py-1 text-xs ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : post.status === 'archived'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>

                    <td className="p-3 text-sm text-slate-500">
                      {post.updated_at
                        ? new Date(post.updated_at).toLocaleDateString()
                        : '-'}
                    </td>

                    <td className="p-3 text-right space-x-3">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="text-red-500 hover:underline disabled:opacity-50"
                      >
                        {deletingId === post.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}