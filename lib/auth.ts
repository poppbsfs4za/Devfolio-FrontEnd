const COOKIE_NAME = 'devfolio_token';

function isBrowser() {
  return typeof window !== 'undefined';
}

export function getCookie(name: string): string | null {
  if (!isBrowser()) return null;

  const cookies = document.cookie.split(';').map((item) => item.trim());
  const prefix = `${name}=`;

  for (const cookie of cookies) {
    if (cookie.startsWith(prefix)) {
      return decodeURIComponent(cookie.slice(prefix.length));
    }
  }

  return null;
}

export function isAuthenticated(): boolean {
  return !!getCookie(COOKIE_NAME);
}

export function clearAuthCookieClientSide() {
  if (!isBrowser()) return;
  document.cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;