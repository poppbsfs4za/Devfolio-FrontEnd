import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BACKEND_ORIGIN = process.env.BACKEND_ORIGIN;

async function proxy(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  if (!BACKEND_ORIGIN) {
    return NextResponse.json(
      {
        error: {
          code: 'BACKEND_ORIGIN_MISSING',
          message: 'BACKEND_ORIGIN is not configured',
        },
      },
      { status: 500 }
    );
  }

  const { path } = await params;
  const upstreamUrl = new URL(`/api/v1/${path.join('/')}`, BACKEND_ORIGIN);

  request.nextUrl.searchParams.forEach((value, key) => {
    upstreamUrl.searchParams.append(key, value);
  });

  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.delete('content-length');

  const body =
    request.method === 'GET' || request.method === 'HEAD'
      ? undefined
      : await request.arrayBuffer();

  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    method: request.method,
    headers,
    body,
    redirect: 'manual',
    cache: 'no-store',
  });

  const responseHeaders = new Headers(upstreamResponse.headers);

  return new NextResponse(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
}

export { proxy as GET };
export { proxy as POST };
export { proxy as PUT };
export { proxy as PATCH };
export { proxy as DELETE };
export { proxy as OPTIONS };