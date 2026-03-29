import { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        'min-h-32 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500',
        props.className
      )}
    />
  );
}
