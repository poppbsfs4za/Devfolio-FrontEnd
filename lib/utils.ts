import { clsx } from 'clsx';

export function cn(...inputs: Array<string | false | undefined | null>) {
  return clsx(inputs);
}

export function formatDate(date?: string) {
  if (!date) return 'Not published yet';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium'
  }).format(new Date(date));
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '');
}
