# Devfolio Frontend

Next.js + Tailwind CSS frontend for your Devfolio backend.

## Included pages

- Home
- About
- Portfolio
- Blog List
- Blog Detail
- Admin Login
- Admin Create Post
- Admin Edit Post

## Connected backend API

This frontend is already wired to these backend routes:

- `GET /api/v1/posts`
- `GET /api/v1/posts/:slug`
- `POST /api/v1/auth/login`
- `GET /api/v1/profile`

Admin routes are scaffolded with these default assumptions:

- `GET /api/v1/tags`
- `POST /api/v1/admin/posts`
- `PUT /api/v1/admin/posts/:id`
- `POST /api/v1/admin/uploads/cover`

If your backend uses different admin routes, update them in `lib/api.ts`.

## Setup

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

