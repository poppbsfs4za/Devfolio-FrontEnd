import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE_NAME = 'devfolio_token';

const PROTECTED_PREFIXES = ['/admin'];
const PUBLIC_ADMIN_PATHS = ['/admin/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPath = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  const isPublicAdminPath = PUBLIC_ADMIN_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token && !isPublicAdminPath) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/admin/posts', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};