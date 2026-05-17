export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-page flex flex-col gap-2 py-8 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Devfolio. Built with Next.js + Tailwind CSS.</p>
        <p>Connected to your Go backend API.</p>
      </div>
    </footer>
  );
}
