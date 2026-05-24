import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const items = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/admin', label: 'Admin' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="container-page flex h-24 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
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
        <nav className="flex items-center gap-5 text-sm text-slate-600 dark:text-slate-300">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-slate-900 dark:hover:text-white">
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
