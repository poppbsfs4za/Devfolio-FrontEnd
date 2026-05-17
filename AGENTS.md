# Devfolio Frontend — Agent Guide

## Stack

- **Next.js 14** (App Router), **React 18**, **TypeScript**, **Tailwind CSS 3**
- **No test framework**, **no Prettier**, **no Husky** — only `next lint` for linting
- Path alias `@/*` → project root (e.g. `@/lib/api`)

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build (`next build`) |
| `npm run lint` | `next lint` |
| `npm run start` | `next start` |

No test runner is configured.

## Env vars

| Var | Purpose |
|-----|---------|
| `NEXT_PUBLIC_API_BASE_URL` | API base used in browser (e.g. `http://localhost:8080`) |
| `BACKEND_ORIGIN` | Used by Next.js API proxy routes |
| `INTERNAL_API_BASE_URL` | Used by server-side code |

All API calls go through `/api/v1/*` or `/uploads/*` proxy routes (see `app/api/v1/[...path]/route.ts`).

## Key architecture

- **Auth**: Cookie-based. Cookie name `devfolio_token`. Middleware (`middleware.ts`) protects `/admin/*` except `/admin/login`. Login at `/admin/login?next=<original_path>`.
- **API proxy**: `app/api/v1/[...path]/route.ts` forwards all requests to `BACKEND_ORIGIN` — server-side API calls should use `INTERNAL_API_BASE_URL`.
- **Upload proxy**: `app/uploads/[...path]/route.ts`.
- **Admin CRUD**: `lib/api.ts` exports `createPost`, `updatePost`, `deletePost`, `getAdminPosts`, `getAdminPostById`, `uploadCover`, `getTags`.
- **Tailwind brand colors**: `brand-bg` (`#0f172a`), `brand-text`, `brand-muted`, `brand-line`, `brand-soft` — defined in `tailwind.config.ts`.
- **`clsx`** is used for className merging via `cn()` in `lib/utils.ts`.
- **`output: 'standalone'`** in `next.config.mjs` — Docker uses `.next/standalone`.

## Deployment

- GitHub Actions → Google Cloud Run (`.github/workflows/deploy-frontend-cloud-run.yml`)
- Trigger: push to `main` or `workflow_dispatch`
- Docker multi-stage build (`node:20-alpine`), exposes port 8080
