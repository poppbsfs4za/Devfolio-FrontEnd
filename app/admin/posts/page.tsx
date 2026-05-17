'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deletePost, getAdminPosts } from '@/lib/api';
import { Post } from '@/lib/types';
import {
  isUnauthorizedError,
  handleUnauthorized,
} from '@/lib/admin-api';
import { LogoutButton } from '@/components/admin/logout-button';
import { normalizeUploadUrl } from '@/lib/normalize-upload-url';

export default function AdminPostsPage() {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchPosts = async () => {
    try {
      const res = await getAdminPosts();
      setPosts(res.data ?? []);
    } catch (err) {
      if (isUnauthorizedError(err)) {
        handleUnauthorized(() => router.replace('/admin/login'));
        return;
      }

      console.error(err);
      alert(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    setDeletingId(postId);

    try {
      await deletePost(String(postId));
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      if (isUnauthorizedError(err)) {
        handleUnauthorized(() => router.replace('/admin/login'));
        return;
      }

      alert(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="container-page py-10">
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Manage Posts</h1>

        <div className="flex gap-3">
          <LogoutButton />

          <Link
            href="/admin/posts/new"
            className="rounded bg-black px-4 py-2 text-white dark:bg-slate-100 dark:text-slate-950"
          >
            + New Post
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-900 dark:bg-slate-800 dark:text-slate-100">
            <tr>
              <th className="px-4 py-3">Cover</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-slate-200 align-top text-slate-700 dark:border-slate-800 dark:text-slate-300">
                <td className="px-4 py-3">
                  <div className="h-16 w-24 overflow-hidden rounded border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                    {post.cover_image_url ? (
                      <img
                        src={normalizeUploadUrl(post.cover_image_url)}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-slate-400 dark:text-slate-500">
                        No image
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="font-medium">{post.title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{post.slug}</div>
                </td>

                <td className="px-4 py-3">{post.status}</td>

                <td className="px-4 py-3">
                  {post.updated_at
                    ? new Date(post.updated_at).toLocaleDateString()
                    : '-'}
                </td>

                <td className="px-4 py-3 text-right space-x-2">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-blue-600 dark:text-blue-400"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deletingId === post.id}
                    className="text-red-600 disabled:opacity-50 dark:text-red-400"
                  >
                    {deletingId === post.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
