import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { slugifyHeading } from '@/lib/markdown';
import { normalizeUploadUrl } from '@/lib/normalize-upload-url';

type Props = {
  content: string;
};

function getNodeText(children: React.ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getNodeText).join('');
  }

  if (React.isValidElement(children)) {
    return getNodeText(children.props.children);
  }

  return '';
}

function createHeadingIdFactory() {
  const usedIds = new Map<string, number>();

  return (text: string) => {
    const baseId = slugifyHeading(text);
    const count = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, count + 1);

    return count === 0 ? baseId : `${baseId}-${count}`;
  };
}

export function MarkdownContent({ content }: Props) {
  const getHeadingId = createHeadingIdFactory();

  return (
    <div className="prose-content border-t border-slate-200 pt-8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => {
            const text = getNodeText(children);
            const id = getHeadingId(text);
            return <h1 id={id}>{children}</h1>;
          },
          h2: ({ children }) => {
            const text = getNodeText(children);
            const id = getHeadingId(text);
            return <h2 id={id}>{children}</h2>;
          },
          h3: ({ children }) => {
            const text = getNodeText(children);
            const id = getHeadingId(text);
            return <h3 id={id}>{children}</h3>;
          },
          p: ({ children }) => <p>{children}</p>,
          ul: ({ children }) => <ul>{children}</ul>,
          ol: ({ children }) => <ol>{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          blockquote: ({ children }) => <blockquote>{children}</blockquote>,
          strong: ({ children }) => <strong>{children}</strong>,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer">
              {children}
            </a>
          ),
          code: ({ children }) => <code>{children}</code>,
          img: ({ src, alt }) => (
            <img
              src={normalizeUploadUrl(typeof src === 'string' ? src : '')}
              alt={alt || ''}
              className="my-6 w-full rounded-2xl border border-slate-200"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}