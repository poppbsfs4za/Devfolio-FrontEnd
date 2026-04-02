import { Suspense } from 'react';
import LoginPageClient from './login-page-client';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <section className="container-page max-w-xl py-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              Admin Login
            </h1>
            <p className="mt-3 text-slate-600">Loading...</p>
          </div>
        </section>
      }
    >
      <LoginPageClient />
    </Suspense>
  );
}