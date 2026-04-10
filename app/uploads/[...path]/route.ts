import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKEND_ORIGIN = process.env.BACKEND_ORIGIN;

async function proxy(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  if (!BACKEND_ORIGIN) {
    return NextResponse.json(
      {
        error: {
          code: "BACKEND_ORIGIN_MISSING",
          message: "BACKEND_ORIGIN is not configured",
        },
      },
      { status: 500 }
    );
  }

  const upstreamUrl = new URL(`/uploads/${params.path.join("/")}`, BACKEND_ORIGIN);

  request.nextUrl.searchParams.forEach((value, key) => {
    upstreamUrl.searchParams.append(key, value);
  });

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");

  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    method: request.method,
    headers,
    redirect: "manual",
    cache: "no-store",
  });

  const responseHeaders = new Headers(upstreamResponse.headers);

  return new NextResponse(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
}

export { proxy as GET, proxy as HEAD };