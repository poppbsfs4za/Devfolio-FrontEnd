type Props = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function AdminPageHeader({ title, description, action }: Props) {
  return (
    <div className="mb-8 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description ? (
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        ) : null}
      </div>

      {action ? <div>{action}</div> : null}
    </div>
  );
}