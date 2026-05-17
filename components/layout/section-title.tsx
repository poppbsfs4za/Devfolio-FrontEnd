export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 space-y-2">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-slate-600 dark:text-slate-400">{subtitle}</p> : null}
    </div>
  );
}
