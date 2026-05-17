type Props = {
  message?: string;
};

export function AdminErrorAlert({ message }: Props) {
  if (!message) return null;

  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300">
      {message}
    </div>
  );
}
