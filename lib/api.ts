import { Post, Tag } from '@/lib/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const ROUTES = {
  publicPosts: '/api/v1/posts',
  postBySlug: (slug: string) => `/api/v1/posts/${slug}`,
  login: '/api/v1/auth/login',
  profile: '/api/v1/profile',
  tags: '/api/v1/tags',
  adminPosts: '/api/v1/admin/posts',
  adminPostById: (id: string) => `/api/v1/admin/posts/${id}`,
  uploadCover: '/api/v1/admin/uploads/cover',
};

type ApiErrorObject = {
  code?: string;
  message?: string;
};

type ApiErrorPayload = {
  error?: string | ApiErrorObject;
};

export class ApiError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, options?: { code?: string; status?: number }) {
    super(message);
    this.name = 'ApiError';
    this.code = options?.code;
    this.status = options?.status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  if (res.status === 204) {
    return {} as T;
  }

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    if (isJson) {
      const apiPayload = payload as ApiErrorPayload;

      if (typeof apiPayload?.error === 'string') {
        throw new ApiError(apiPayload.error, { status: res.status });
      }

      if (apiPayload?.error && typeof apiPayload.error === 'object') {
        throw new ApiError(apiPayload.error.message || 'Request failed', {
          code: apiPayload.error.code,
          status: res.status,
        });
      }

      throw new ApiError('Request failed', { status: res.status });
    }

    if (typeof payload === 'string' && payload) {
      throw new ApiError(payload, { status: res.status });
    }

    throw new ApiError('Request failed', { status: res.status });
  }

  return payload as T;
}

export async function getPublishedPosts(): Promise<Post[]> {
  const result = await request<{ data: Post[] }>(ROUTES.publicPosts);
  return result.data ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const result = await request<{ data: Post }>(ROUTES.postBySlug(slug));
  return result.data;
}

export async function login(email: string, password: string): Promise<string> {
  const result = await request<{ data: { access_token: string } }>(ROUTES.login, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  return result.data.access_token;
}

export async function getProfile(token: string) {
  return request<{ data: unknown }>(ROUTES.profile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getTags(): Promise<Tag[]> {
  const result = await request<{ data: Tag[] }>(ROUTES.tags);
  return result.data ?? [];
}

export async function createPost(token: string, payload: Record<string, unknown>) {
  return request<{ data: Post }>(ROUTES.adminPosts, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

export async function updatePost(token: string, id: string, payload: Record<string, unknown>) {
  return request<{ data: Post }>(ROUTES.adminPostById(id), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

export async function deletePost(token: string, id: string) {
  return request<void>(ROUTES.adminPostById(id), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function uploadCover(token: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return request<{ data?: { url?: string; filename?: string } }>(ROUTES.uploadCover, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

export async function getAdminPostById(token: string, id: string) {
  return request<{ data: Post }>(ROUTES.adminPostById(id), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getAdminPosts(token: string) {
  return request<{ data: Post[] }>(ROUTES.adminPosts, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export { API_BASE_URL };