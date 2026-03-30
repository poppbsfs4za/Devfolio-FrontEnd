import { ApiError } from '@/lib/api';
import { clearAuthCookieClientSide } from '@/lib/auth';

export function isUnauthorizedError(error: unknown): boolean {
  return (
    error instanceof ApiError &&
    (error.code === 'UNAUTHORIZED' || error.status === 401)
  );
}

export function handleUnauthorized(onUnauthorized: () => void) {
  clearAuthCookieClientSide();
  onUnauthorized();
}