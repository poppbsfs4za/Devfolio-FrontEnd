'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getAdminPostById } from '@/lib/api';
import { Post } from '@/lib/types';
import {
  isUnauthorizedError,
  handleUnauthorized,
} from '@/lib/admin-api';
import { PostForm } from '@/components/admin/post-form';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const postId = params?.id as string;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getAdminPostById(postId);
        setPost(res.data);
      } catch (err) {
        if (isUnauthorizedError(err)) {
          handleUnauthorized(() => router.replace('/admin/login'));
          return;
        }

        console.error(err);
        alert(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, router]);

  if (loading) {
    return (
      <div className="container-page py-10">
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-page py-10">
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Post not found
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="mb-6 text-2xl font-semibold">Edit Post</h1>
      <PostForm mode="edit" initialPost={post} postId={postId} />
    </div>
  );
}