import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  /**
   * Either:
   * - inline markdown text
   * - or a source-relative .md path such as "src/data/chapters/kinships/elves/sun-elves.md"
   */
  path: string;
}

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; text: string };

const markdownModules = (import.meta as any).glob([
  '../data/chapters/**/*.md',
  '../data/players-handbook/**/*.md',
  '../data/**/*.md'
], {
  query: '?raw',
  import: 'default',
});

const normalizeMarkdownPath = (value: string) => {
  const trimmed = value.trim();

  // Handle src/data/... paths (convert to ../data/... for glob lookup)
  if (trimmed.startsWith('src/')) {
    return `../${trimmed.slice('src/'.length)}`;
  }

  // Handle already normalized paths
  if (trimmed.startsWith('../data/')) {
    return trimmed;
  }

  return trimmed;
};

const looksLikeMarkdownFilePath = (value: string) => {
  const trimmed = value.trim();
  return trimmed.endsWith('.md') && !trimmed.includes('\n');
};

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold text-amber-300 mt-8 mb-4 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold text-amber-300 mt-7 mb-3 leading-snug" style={{ fontFamily: "'Cinzel', serif" }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold text-amber-400 mt-6 mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-semibold text-amber-400 mt-5 mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-lg font-semibold text-amber-500 mt-4 mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-base font-semibold text-amber-500 mt-3 mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
      {children}
    </h6>
  ),
  p: ({ children }) => <p className="text-amber-100 leading-relaxed mb-3">{children}</p>,
  strong: ({ children }) => <strong className="text-amber-300 font-bold">{children}</strong>,
  em: ({ children }) => <em className="text-amber-400 italic">{children}</em>,
  a: ({ href, children }) => (
    <a href={href} className="text-amber-400 underline hover:text-amber-200 transition-colors" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.startsWith('language-');
    if (isBlock) {
      return (
        <pre className="bg-stone-900 border border-amber-900/40 rounded-lg p-4 my-4 overflow-x-auto">
          <code className="text-amber-200 text-sm font-mono">{children}</code>
        </pre>
      );
    }
    return <code className="bg-stone-800 text-amber-300 rounded px-1.5 py-0.5 text-sm font-mono">{children}</code>;
  },
  pre: ({ children }) => <>{children}</>,
  ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-3 text-amber-100 ml-4">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-3 text-amber-100 ml-4">{children}</ol>,
  li: ({ children }) => <li className="text-amber-100 leading-relaxed">{children}</li>,
  hr: () => <hr className="border-t-2 border-amber-800/50 my-6" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-amber-600 pl-4 my-4 italic text-amber-300 bg-amber-950/20 py-2 pr-2 rounded-r">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-amber-900/40">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-amber-900/30">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-amber-900/10 transition-colors">{children}</tr>,
  th: ({ children }) => (
    <th className="text-left text-amber-300 font-bold px-3 py-2 border-b-2 border-amber-700/50" style={{ fontFamily: "'Cinzel', serif" }}>
      {children}
    </th>
  ),
  td: ({ children }) => <td className="text-amber-100 px-3 py-2">{children}</td>,
  div: ({ className, children, ...props }) => (
    <div className={className ?? ''} {...props}>
      {children}
    </div>
  ),
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ path }) => {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const normalizedPath = useMemo(() => normalizeMarkdownPath(path), [path]);

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
          Use a source-relative path like <code className="bg-red-900/30 px-1 rounded">src/data/chapters/kinships/elves/sun-elves.md</code> or pass inline markdown directly.
        </p>
      </div>
    );
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
      {state.text}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
