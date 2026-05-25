'use client';

import { useLanguage } from '@/lib/language';
import { FaGlobe } from 'react-icons/fa';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
      aria-label="Switch language"
    >
      <FaGlobe className="h-3.5 w-3.5" />
      {language.toUpperCase()}
    </button>
  );
}
