import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';

export interface PartInfo {
  id: string;
  label: string;
}

interface MarkdownRendererProps {
  /**
   * Either:
   * - inline markdown text
   * - or a source-relative .md path such as "src/data/chapters/kinships/elves/sun-elves.md"
   */
  path: string;
  /** Called after the markdown renders and [data-part] anchors are found in the DOM */
  onPartsFound?: (parts: PartInfo[]) => void;
  /** Forwarded ref so the parent can scroll into this container */
  contentRef?: React.RefObject<HTMLDivElement | null>;
  /** Called when a cross-chapter link (data-go-chapter) is clicked */
  onCrossChapterLink?: (chapterId: string, partId?: string) => void;
}

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; text: string };

const markdownModules = (import.meta as any).glob(
  ['../data/**/*.md'],
  { query: '?raw', import: 'default' }
);

const normalizeMarkdownPath = (value: string) => {
  const trimmed = value.trim();
  if (trimmed.startsWith('src/')) {
    return `../${trimmed.slice('src/'.length)}`;
  }
  if (trimmed.startsWith('../data/')) {
    return trimmed;
  }
  return trimmed;
};

const looksLikeMarkdownFilePath = (value: string) => {
  const trimmed = value.trim();
  return trimmed.endsWith('.md') && !trimmed.includes('\n');
};

// ── Helper: check if an element has a custom class from raw HTML ──────────────
const hasCustomClass = (className?: string): boolean => {
  return !!className && className.trim().length > 0;
};

// ── Component overrides factory ─────────────────────────────────────────────
// Creates component overrides with access to the cross-chapter link callback.
const createComponents = (onCrossChapterLink?: (chapterId: string, partId?: string) => void): Components => ({
  h1: ({ children, className, ...props }) => (
    <h1
      className={hasCustomClass(className) ? className! : "text-4xl font-bold text-amber-300 mt-8 mb-4 leading-tight"}
      style={hasCustomClass(className) ? undefined : { fontFamily: "'Cinzel', serif" }}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, className, ...props }) => (
    <h2
      className={hasCustomClass(className) ? className! : "text-3xl font-bold text-amber-300 mt-7 mb-3 leading-snug"}
      style={hasCustomClass(className) ? undefined : { fontFamily: "'Cinzel', serif" }}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }) => (
    <h3
      className={hasCustomClass(className) ? className! : "text-2xl font-semibold text-amber-400 mt-6 mb-3"}
      style={hasCustomClass(className) ? undefined : { fontFamily: "'Cinzel', serif" }}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, className, ...props }) => (
    <h4
      className={hasCustomClass(className) ? className! : "text-xl font-semibold text-amber-400 mt-5 mb-2"}
      style={hasCustomClass(className) ? undefined : { fontFamily: "'Cinzel', serif" }}
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ children, className, ...props }) => (
    <h5
      className={hasCustomClass(className) ? className! : "text-lg font-semibold text-amber-500 mt-4 mb-2"}
      style={hasCustomClass(className) ? undefined : { fontFamily: "'Cinzel', serif" }}
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, className, ...props }) => (
    <h6
      className={hasCustomClass(className) ? className! : "text-base font-semibold text-amber-500 mt-3 mb-1"}
      style={hasCustomClass(className) ? undefined : { fontFamily: "'Cinzel', serif" }}
      {...props}
    >
      {children}
    </h6>
  ),
  p: ({ children, className, ...props }) => (
    <p className={hasCustomClass(className) ? className! : "text-amber-100 leading-relaxed mb-3"} {...props}>
      {children}
    </p>
  ),
  strong: ({ children, className, ...props }) => (
    <strong className={hasCustomClass(className) ? className! : "text-amber-300 font-bold"} {...props}>
      {children}
    </strong>
  ),
  em: ({ children, className, ...props }) => (
    <em className={hasCustomClass(className) ? className! : "text-amber-400 italic"} {...props}>
      {children}
    </em>
  ),
  a: ({ href, children, className, ...props }: any) => {
    const goChapter = props['data-go-chapter'];
    const goChapterPart = props['data-go-chapter-part'];

    if (goChapter && onCrossChapterLink) {
      return (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onCrossChapterLink(goChapter, goChapterPart || undefined);
          }}
          className={hasCustomClass(className) ? className! : "text-amber-400 underline hover:text-amber-200 transition-colors cursor-pointer"}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <a
        href={href}
        className={hasCustomClass(className) ? className! : "text-amber-400 underline hover:text-amber-200 transition-colors"}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, className, ...props }) => {
    const isBlock = className?.startsWith('language-');
    if (isBlock) {
      return (
        <pre className="bg-stone-900 border border-amber-900/40 rounded-lg p-4 my-4 overflow-x-auto">
          <code className={`text-amber-200 text-sm font-mono ${className ?? ''}`} {...props}>{children}</code>
        </pre>
      );
    }
    return (
      <code
        className={hasCustomClass(className) ? className! : "bg-stone-800 text-amber-300 rounded px-1.5 py-0.5 text-sm font-mono"}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => <>{children}</>,
  ul: ({ children, className, ...props }) => (
    <ul className={hasCustomClass(className) ? className! : "list-disc list-inside space-y-1 mb-3 text-amber-100 ml-4"} {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, className, ...props }) => (
    <ol className={hasCustomClass(className) ? className! : "list-decimal list-inside space-y-1 mb-3 text-amber-100 ml-4"} {...props}>
      {children}
    </ol>
  ),
  li: ({ children, className, ...props }) => (
    <li className={hasCustomClass(className) ? className! : "text-amber-100 leading-relaxed"} {...props}>
      {children}
    </li>
  ),
  hr: () => <hr className="border-t-2 border-amber-800/50 my-6" />,
  blockquote: ({ children, className, ...props }) => (
    <blockquote
      className={hasCustomClass(className) ? className! : "border-l-4 border-amber-600 pl-4 my-4 italic text-amber-300 bg-amber-950/20 py-2 pr-2 rounded-r"}
      {...props}
    >
      {children}
    </blockquote>
  ),

  // ── Table components ─────────────────────────────────────────────────────
  table: ({ children, className, ...props }) => {
    if (hasCustomClass(className)) {
      return (
        <div className="overflow-x-auto my-4">
          <table className={className!} {...props}>{children}</table>
        </div>
      );
    }
    return (
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse text-sm" {...props}>{children}</table>
      </div>
    );
  },
  thead: ({ children, className, ...props }) => (
    <thead className={hasCustomClass(className) ? className! : "bg-amber-900/40"} {...props}>{children}</thead>
  ),
  tbody: ({ children, className, ...props }) => (
    <tbody className={hasCustomClass(className) ? className! : "divide-y divide-amber-900/30"} {...props}>{children}</tbody>
  ),
  tr: ({ children, className, ...props }) => (
    <tr className={hasCustomClass(className) ? className! : "hover:bg-amber-900/10 transition-colors"} {...props}>{children}</tr>
  ),
  th: ({ children, className, ...props }) => (
    <th
      className={hasCustomClass(className) ? className! : "text-left text-amber-300 font-bold px-3 py-2 border-b-2 border-amber-700/50"}
      style={hasCustomClass(className) ? undefined : { fontFamily: "'Cinzel', serif" }}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, className, ...props }) => (
    <td className={hasCustomClass(className) ? className! : "text-amber-100 px-3 py-2"} {...props}>{children}</td>
  ),

  // ── Generic elements ─────────────────────────────────────────────────────
  div: ({ className, children, ...props }) => (
    <div className={className ?? ''} {...props}>
      {children}
    </div>
  ),
  span: ({ className, children, ...props }) => (
    <span className={className ?? ''} {...props}>
      {children}
    </span>
  ),
  section: ({ className, children, ...props }) => (
    <section className={className ?? ''} {...props}>
      {children}
    </section>
  ),
});

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ path, onPartsFound, contentRef, onCrossChapterLink }) => {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const normalizedPath = useMemo(() => normalizeMarkdownPath(path), [path]);
  const internalRef = useRef<HTMLDivElement>(null);
  const divRef = (contentRef ?? internalRef) as React.RefObject<HTMLDivElement | null>;

  // Memoize components so they only recreate when the callback changes
  const components = useMemo(
    () => createComponents(onCrossChapterLink),
    [onCrossChapterLink]
  );

  // Load the markdown file or use inline text
  useEffect(() => {
    if (!path?.trim()) {
      setState({ status: 'error', message: 'No content provided.' });
      return;
    }

    if (!looksLikeMarkdownFilePath(path)) {
      setState({ status: 'success', text: path });
      return;
    }

    const loader = markdownModules[normalizedPath] as undefined | (() => Promise<string>);

    if (!loader) {
      setState({
        status: 'error',
        message: `Could not resolve markdown file: ${path}`,
      });
      return;
    }

    setState({ status: 'loading' });

    loader()
      .then((text) => setState({ status: 'success', text }))
      .catch((error: Error) => {
        setState({ status: 'error', message: error.message || `Failed to load ${path}` });
      });
  }, [path, normalizedPath]);

  // After the markdown has rendered into the DOM, find [data-part] elements
  useEffect(() => {
    if (state.status !== 'success') return;
    if (!onPartsFound) return;

    const timer = setTimeout(() => {
      if (!divRef.current) return;
      const elements = Array.from(divRef.current.querySelectorAll('[data-part]'));
      const parts: PartInfo[] = elements.map((el) => ({
        id: el.getAttribute('data-part') ?? '',
        label: el.textContent?.trim() ?? '',
      }));
      onPartsFound(parts);
    }, 80);

    return () => clearTimeout(timer);
  }, [state, onPartsFound]);

  if (state.status === 'loading') {
    return (
      <div className="flex items-center justify-center py-20 text-amber-400 animate-pulse">
        <span style={{ fontFamily: "'Cinzel', serif" }}>Loading ancient scrolls…</span>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="bg-red-950/30 border border-red-800/50 rounded-lg p-6 my-4 text-red-300">
        <p className="font-bold mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
          ⚠ Scroll Not Found
        </p>
        <p className="text-sm font-mono">{state.message}</p>
        <p className="text-xs text-red-400 mt-2">
          Use a source-relative path like{' '}
          <code className="bg-red-900/30 px-1 rounded">src/data/chapters/kinships/elves/sun-elves.md</code> or pass inline markdown directly.
        </p>
      </div>
    );
  }

  return (
    <div ref={divRef}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {state.text}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
