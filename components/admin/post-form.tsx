'use client';

import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost, uploadCover } from '@/lib/api';
import {
  isUnauthorizedError,
  handleUnauthorized,
} from '@/lib/admin-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Post } from '@/lib/types';
import { normalizeUploadUrl } from '@/lib/normalize-upload-url';

type Props = {
  mode: 'create' | 'edit';
  initialPost?: Partial<Post>;
  postId?: string;
};

export function PostForm({ mode, initialPost, postId }: Props) {
  const router = useRouter();
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [summary, setSummary] = useState(initialPost?.summary || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [coverImageUrl, setCoverImageUrl] = useState(
    normalizeUploadUrl(initialPost?.cover_image_url || "")
  );
  const [status, setStatus] = useState(initialPost?.status || 'draft');
  const [tagText, setTagText] = useState(
    (initialPost?.tags || []).map((tag) => tag.name).join(', ')
  );
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingContentImage, setUploadingContentImage] = useState(false);

  const tagNames = useMemo(
    () => tagText.split(',').map((item) => item.trim()).filter(Boolean),
    [tagText]
  );

  const isBusy = loading || uploadingCover || uploadingContentImage;

  const onUnauthorized = () => {
    handleUnauthorized(() => router.replace('/admin/login'));
  };

  const insertTextAtCursor = (textToInsert: string) => {
    const textarea = contentRef.current;

    if (!textarea) {
      setContent((prev) => {
        const spacer = prev.length > 0 && !prev.endsWith('\n') ? '\n\n' : '';
        return `${prev}${spacer}${textToInsert}`;
      });
      return;
    }

    const start = textarea.selectionStart ?? content.length;
    const end = textarea.selectionEnd ?? content.length;

    const before = content.slice(0, start);
    const after = content.slice(end);

    const needsLeadingBreak =
      before.length > 0 && !before.endsWith('\n') ? '\n\n' : '';
    const needsTrailingBreak =
      after.length > 0 && !after.startsWith('\n') ? '\n\n' : '';

    const nextValue =
      before + needsLeadingBreak + textToInsert + needsTrailingBreak + after;

    setContent(nextValue);

    requestAnimationFrame(() => {
      const newCursorPos = (before + needsLeadingBreak + textToInsert).length;
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    });
  };

  const handleUploadCover = async (file?: File | null) => {
    if (!file) return;

    try {
      setUploadingCover(true);
      setError('');
      setMessage('Uploading cover image...');

      const result = await uploadCover(file);
      const rawUrl = result?.data?.url;

      if (!rawUrl) {
        throw new Error("Upload completed but no URL was returned");
      }

      const normalizedUrl = normalizeUploadUrl(rawUrl);
      setCoverImageUrl(normalizedUrl);
      setMessage('Cover image uploaded successfully.');
    } catch (err) {
      if (isUnauthorizedError(err)) {
        onUnauthorized();
        return;
      }

      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      setMessage('');
    } finally {
      setUploadingCover(false);
    }
  };

  const handleUploadContentImage = async (file?: File | null) => {
    if (!file) return;

    try {
      setUploadingContentImage(true);
      setError('');
      setMessage('Uploading image into content...');

      const result = await uploadCover(file);
      const url = result?.data?.url;

      if (!url) {
        throw new Error('Upload completed but no URL was returned');
      }

      const safeAlt =
        file.name
          .replace(/\.[^.]+$/, '')
          .trim()
          .replace(/\s+/g, '-')
          .toLowerCase() || 'image';

      insertTextAtCursor(`![${safeAlt}](${url})`);
      setMessage('Image uploaded and inserted into content.');
    } catch (err) {
      if (isUnauthorizedError(err)) {
        onUnauthorized();
        return;
      }

      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      setMessage('');
    } finally {
      setUploadingContentImage(false);
    }
  };

  const handleInsertHeading = (level: 2 | 3) => {
    const prefix = level === 2 ? '## ' : '### ';
    insertTextAtCursor(`${prefix}Heading`);
  };

  const handleInsertQuote = () => {
    insertTextAtCursor(`> Quote`);
  };

  const handleInsertBulletList = () => {
    insertTextAtCursor(`- item 1\n- item 2\n- item 3`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const payload = {
        title,
        slug,
        summary,
        content,
        cover_image_url: normalizeUploadUrl(coverImageUrl),
        status,
        tags: tagNames,
      };

      if (mode === 'create') {
        await createPost(payload);
      } else if (postId) {
        await updatePost(postId, payload);
      }

      router.push('/admin/posts');
    } catch (err) {
      if (isUnauthorizedError(err)) {
        onUnauthorized();
        return;
      }

      setError(err instanceof Error ? err.message : 'Request failed');
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

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-sm font-medium text-slate-700">Content</label>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleInsertHeading(2)}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
            >
              + H2
            </button>

            <button
              type="button"
              onClick={() => handleInsertHeading(3)}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
            >
              + H3
            </button>

            <button
              type="button"
              onClick={handleInsertBulletList}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
            >
              + List
            </button>

            <button
              type="button"
              onClick={handleInsertQuote}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
            >
              + Quote
            </button>
          </div>
        </div>

        <Textarea
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-64"
          required
        />

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3">
            <p className="text-sm font-medium text-slate-800">Insert image into content</p>
            <p className="text-xs text-slate-500">
              Upload an image and insert markdown automatically at the current cursor position.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={(e) => handleUploadContentImage(e.target.files?.[0])}
            />
            <p className="text-xs text-slate-500">Allowed: jpg, png, webp, gif. Max 5 MB.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Cover Image URL</label>
          <Input
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(normalizeUploadUrl(e.target.value))}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Upload Cover Image</label>
          <Input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={(e) => handleUploadCover(e.target.files?.[0])}
          />
          <p className="text-xs text-slate-500">
            Allowed: jpg, png, webp, gif. Max 5 MB.
          </p>
        </div>
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

      <Button type="submit" disabled={isBusy}>
        {uploadingCover
          ? 'Uploading cover...'
          : uploadingContentImage
          ? 'Uploading content image...'
          : loading
          ? 'Saving...'
          : mode === 'create'
          ? 'Create Post'
          : 'Update Post'}
      </Button>
    </form>
  );
}