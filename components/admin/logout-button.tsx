'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api';
import { clearAuthCookieClientSide } from '@/lib/auth';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // no-op
    } finally {
      clearAuthCookieClientSide();
      router.replace('/admin/login');
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      Logout
    </button>
  );
}
