type Props = {
  text?: string;
};

export function AdminLoadingCard({ text = 'Loading...' }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
      {text}
    </div>
  );
}
