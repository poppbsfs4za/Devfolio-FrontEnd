import { ApiError } from '@/lib/api';
import { getToken, removeToken } from '@/lib/auth';

export function getRequiredToken(): string {
  const token = getToken();
  if (!token) {
    throw new ApiError('Authentication required', {
      code: 'UNAUTHORIZED',
      status: 401,
    });
  }
  return token;
}

export function isUnauthorizedError(error: unknown): boolean {
  return error instanceof ApiError && (
    error.code === 'UNAUTHORIZED' ||
    error.status === 401
  );
}

export function handleUnauthorized(onUnauthorized: () => void) {
  removeToken();
  onUnauthorized();
}