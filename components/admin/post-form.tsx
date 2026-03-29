'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost, uploadCover } from '@/lib/api';
import { getToken, removeToken } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Post } from '@/lib/types';

type Props = {
  mode: 'create' | 'edit';
  initialPost?: Partial<Post>;
  postId?: string;
};

export function PostForm({ mode, initialPost, postId }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [summary, setSummary] = useState(initialPost?.summary || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [coverImageUrl, setCoverImageUrl] = useState(initialPost?.cover_image_url || '');
  const [status, setStatus] = useState(initialPost?.status || 'draft');
  const [tagText, setTagText] = useState(
    (initialPost?.tags || []).map((tag) => tag.name).join(', ')
  );
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const tagNames = useMemo(
    () => tagText.split(',').map((item) => item.trim()).filter(Boolean),
    [tagText]
  );

  const handleUpload = async (file?: File | null) => {
    if (!file) return;

    const token = getToken();
    if (!token) {
      setError('Please login first.');
      return;
    }

    try {
      setUploading(true);
      setError('');
      setMessage('Uploading cover image...');

      const result = await uploadCover(token, file);
      const url = result?.data?.url;

      if (!url) {
        throw new Error('Upload completed but no URL was returned');
      }

      setCoverImageUrl(url);
      setMessage('Cover image uploaded successfully.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';

      if (
        message.toLowerCase().includes('unauthorized') ||
        message.toLowerCase().includes('invalid token')
      ) {
        removeToken();
        router.replace('/admin/login');
        return;
      }

      setError(message);
      setMessage('');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const token = getToken();
    if (!token) {
      setLoading(false);
      setError('Please login first.');
      return;
    }

    const payload = {
      title,
      slug,
      summary,
      content,
      cover_image_url: coverImageUrl,
      status,
      tags: tagNames,
    };

    try {
      if (mode === 'create') {
        await createPost(token, payload);
      } else if (postId) {
        await updatePost(token, postId, payload);
      }

      router.push('/admin/posts');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Request failed';

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

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Slug</label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Summary</label>
        <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Content</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-64"
          required
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Cover Image URL</label>
          <Input
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

      {coverImageUrl ? (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">Cover Preview</p>
          <img
            src={coverImageUrl}
            alt="Cover preview"
            className="h-48 w-full max-w-md rounded-xl border border-slate-200 object-cover"
          />
        </div>
      ) : null}

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Upload Cover Image</label>
          <Input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={(e) => handleUpload(e.target.files?.[0])}
          />
          <p className="text-xs text-slate-500">
            Allowed: jpg, png, webp, gif. Max 5 MB.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Tags (comma separated)</label>
          <Input
            value={tagText}
            onChange={(e) => setTagText(e.target.value)}
            placeholder="golang, backend, devops"
          />
        </div>
      </div>

      {message ? (
        <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <Button type="submit" disabled={loading || uploading}>
        {uploading ? 'Uploading...' : loading ? 'Saving...' : mode === 'create' ? 'Create Post' : 'Update Post'}
      </Button>
    </form>
  );
}