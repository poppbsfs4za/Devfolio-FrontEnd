'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { useLanguage } from '@/lib/language';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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

  const activeLinkClass =
    "relative font-medium text-slate-900 transition after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-slate-900 after:content-[''] dark:text-white dark:after:bg-white";
  const inactiveLinkClass =
    'text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white';

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-100/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div className="container-page flex h-16 items-center justify-between md:h-24">

        {/* ── Logo / site name ─────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 text-slate-900 dark:text-slate-100 sm:gap-3"
        >
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-slate-200 dark:ring-slate-700 sm:h-11 sm:w-11 md:h-14 md:w-14">
            <Image
              src="/profile.jpg"
              alt="Kraiwit W"
              fill
              className="object-cover object-top"
            />
          </div>
          <span className="truncate text-sm font-semibold sm:text-base md:text-lg">
            Kraiwit.W
          </span>
          <span className="hidden text-sm font-normal text-slate-400 dark:text-slate-500 sm:inline md:text-base">
            Devfolio.
          </span>
        </Link>

        {/* ── Desktop nav (md and above) ────────────────────────────────── */}
        <nav className="hidden items-center gap-5 text-sm md:flex">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={active ? activeLinkClass : inactiveLinkClass}
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

        {/* ── Mobile controls (below md) ────────────────────────────────── */}
        <div className="flex items-center gap-0.5 md:hidden">
          <a
            href="https://github.com/poppbsfs4za"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {menuOpen ? (
              <FaTimes className="h-5 w-5" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown menu ──────────────────────────────────────── */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-slate-200 bg-slate-100/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 md:hidden"
        >
          <div className="container-page flex flex-col py-2">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`border-b border-slate-100 py-3 text-sm last:border-0 dark:border-slate-800 ${
                    active
                      ? 'font-semibold text-slate-900 dark:text-white'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
