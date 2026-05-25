'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { useLanguage } from '@/lib/language';
import { FaGithub } from 'react-icons/fa';

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();

  const items = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/portfolio', label: t.nav.portfolio },
    { href: '/blog', label: t.nav.blog },
  ];

  /** Returns true when the current URL belongs to this nav item. */
  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/';
    if (href === '/blog') return pathname === '/blog' || pathname.startsWith('/blog/');
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-100/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div className="container-page flex h-24 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-slate-100"
        >
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-slate-200 dark:ring-slate-700">
            <Image
              src="/profile.jpg"
              alt="Kraiwit W"
              fill
              className="object-cover object-top"
            />
          </div>
          Kraiwit.W Devfolio.
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={
                  active
                    ? // Active state: darker text + thin underline via ::after pseudo-element
                      "relative font-medium text-slate-900 transition after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-slate-900 after:content-[''] dark:text-white dark:after:bg-white"
                    : // Inactive state: muted colour that brightens on hover
                      'text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }
              >
                {item.label}
              </Link>
            );
          })}

          <a
            href="https://github.com/poppbsfs4za"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <LanguageToggle />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
