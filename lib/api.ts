import { Post, Tag } from '@/lib/types';

const BROWSER_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const SERVER_API_BASE_URL =
  process.env.INTERNAL_API_BASE_URL || 'http://localhost:3000';

function getApiBaseUrl() {
  return typeof window === 'undefined'
    ? SERVER_API_BASE_URL
    : BROWSER_API_BASE_URL;
}

const ROUTES = {
  publicPosts: '/api/v1/posts',
  postBySlug: (slug: string) => `/api/v1/posts/${slug}`,
  login: '/api/v1/auth/login',
  logout: '/api/v1/auth/logout',
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
  const apiBaseUrl = getApiBaseUrl();

  const res = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    credentials: 'include',
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

export async function login(email: string, password: string) {
  return request<{ data: { access_token: string } }>(ROUTES.login, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  return request<{ data: { message: string } }>(ROUTES.logout, {
    method: 'POST',
  });
}

export async function getProfile() {
  return request<{ data: unknown }>(ROUTES.profile, {
    method: 'GET',
  });
}

export async function getTags(): Promise<Tag[]> {
  const result = await request<{ data: Tag[] }>(ROUTES.tags);
  return result.data ?? [];
}

export async function createPost(payload: Record<string, unknown>) {
  return request<{ data: Post }>(ROUTES.adminPosts, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updatePost(id: string, payload: Record<string, unknown>) {
  return request<{ data: Post }>(ROUTES.adminPostById(id), {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deletePost(id: string) {
  return request(ROUTES.adminPostById(id), {
    method: 'DELETE',
  });
}

export async function uploadCover(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return request<{ data?: { url?: string; filename?: string } }>(ROUTES.uploadCover, {
    method: 'POST',
    body: formData,
  });
}

export async function getAdminPostById(id: string) {
  return request<{ data: Post }>(ROUTES.adminPostById(id), {
    method: 'GET',
  });
}

export async function getAdminPosts() {
  return request<{ data: Post[] }>(ROUTES.adminPosts, {
    method: 'GET',
  });
}