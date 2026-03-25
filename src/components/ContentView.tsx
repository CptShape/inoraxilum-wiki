import React from 'react';
import { Chapter } from '../types';

interface ContentViewProps {
  activeChapter: Chapter | null;
  breadcrumb: string[];
}

// Renders a single line of markdown-like content
const renderLine = (line: string, index: number): React.ReactNode => {
  // Headings
  const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
  if (headingMatch) {
    const level = headingMatch[1].length;
    const text = headingMatch[2];
    const sizes: Record<number, string> = {
      1: 'text-4xl mt-8 mb-4 text-amber-300',
      2: 'text-3xl mt-7 mb-3 text-amber-300',
      3: 'text-2xl mt-6 mb-3 text-amber-400',
      4: 'text-xl mt-5 mb-2 text-amber-400',
      5: 'text-lg mt-4 mb-2 text-amber-500',
      6: 'text-base mt-3 mb-1 text-amber-500',
    };
    return (
      <h2 key={index} className={`font-bold ${sizes[level] ?? sizes[2]}`} style={{ fontFamily: "'Cinzel', serif" }}>
        {text}
      </h2>
    );
  }

  // Horizontal rule
  if (line.trim() === '---') {
    return <hr key={index} className="border-t-2 border-amber-800/50 my-6" />;
  }

  // Bullet list item
  if (line.match(/^[\*\-]\s+/)) {
    const text = line.replace(/^[\*\-]\s+/, '');
    return (
      <li key={index} className="ml-5 list-disc text-amber-100 mb-1">
        {renderInline(text)}
      </li>
    );
  }

  // Numbered list item
  if (line.match(/^\d+\.\s+/)) {
    const text = line.replace(/^\d+\.\s+/, '');
    return (
      <li key={index} className="ml-5 list-decimal text-amber-100 mb-1">
        {renderInline(text)}
      </li>
    );
  }

  // Empty line — spacer
  if (line.trim() === '') {
    return <div key={index} className="h-2" />;
  }

  // Normal paragraph line
  return (
    <p key={index} className="mb-2 text-amber-100 leading-relaxed">
      {renderInline(line)}
    </p>
  );
};

// Renders inline markdown: **bold**, *italic*, `code`
const renderInline = (text: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  // Split on bold (**...**), italic (*...*), code (`...`)
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(
        <strong key={key++} className="text-amber-300 font-bold">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*')) {
      parts.push(
        <em key={key++} className="text-amber-400 italic">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('`')) {
      parts.push(
        <code key={key++} className="bg-stone-800 text-amber-300 rounded px-1 py-0.5 text-sm font-mono">
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>;
};

// Render a markdown table
const renderTable = (lines: string[]): React.ReactNode => {
  const rows = lines.filter(l => l.trim().startsWith('|'));
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-amber-800">
        <tbody>
          {rows.map((row, rowIndex) => {
            // Skip separator rows (e.g. |---|---|)
            if (row.replace(/[\|\-\s:]/g, '').length === 0) return null;
            const cells = row.split('|').map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
            const isHeader = rowIndex === 0;
            return (
              <tr key={rowIndex} className={isHeader ? 'bg-amber-900/30' : 'hover:bg-amber-900/10'}>
                {cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`border border-amber-800/60 px-3 py-2 text-sm ${
                      isHeader ? 'font-bold text-amber-300' : 'text-amber-200'
                    }`}
                  >
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Main content renderer that handles tables as blocks
const renderContent = (content: string): React.ReactNode[] => {
  const lines = content.split('\n');
  const output: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Detect start of a table
    if (line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      output.push(<React.Fragment key={`table-${i}`}>{renderTable(tableLines)}</React.Fragment>);
      continue;
    }

    output.push(renderLine(line, i));
    i++;
  }

  return output;
};

export const ContentView: React.FC<ContentViewProps> = ({ activeChapter, breadcrumb }) => {
  if (!activeChapter) {
    return (
      <div className="flex-1 p-12 overflow-y-auto bg-stone-800/30 flex items-center justify-center">
        <div className="text-center text-amber-400 max-w-lg">
          <div className="text-7xl mb-6">📖</div>
          <h2
            className="text-4xl font-bold mb-4 text-amber-300"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Welcome, Adventurer
          </h2>
          <p
            className="text-xl text-amber-600 leading-relaxed"
            style={{ fontFamily: "'IM Fell English', serif" }}
          >
            Select a chapter from the tome to begin your journey through the Eldritch Grimoire.
          </p>
          <div className="mt-8 text-amber-800 text-4xl">✦ ✦ ✦</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-stone-800/30">
      <div className="max-w-4xl mx-auto px-12 py-10">

        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <div className="mb-6 flex items-center gap-2 flex-wrap">
            {breadcrumb.map((crumb, i) => (
              <React.Fragment key={i}>
                <span
                  className={`text-sm ${i === breadcrumb.length - 1 ? 'text-amber-300' : 'text-amber-600'}`}
                  style={{ fontFamily: "'IM Fell English', serif" }}
                >
                  {crumb}
                </span>
                {i < breadcrumb.length - 1 && (
                  <span className="text-amber-700 text-sm">›</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Chapter Header */}
        <div className="mb-8 pb-6 border-b-2 border-amber-800/60">
          <div className="flex items-center gap-3 mb-2">
            {activeChapter.icon && (
              <span className="text-4xl">{activeChapter.icon}</span>
            )}
            <h1
              className="text-5xl font-bold text-amber-400"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {activeChapter.title}
            </h1>
          </div>
          {activeChapter.subtitle && (
            <p
              className="text-xl text-amber-600 italic mt-1"
              style={{ fontFamily: "'IM Fell English', serif" }}
            >
              {activeChapter.subtitle}
            </p>
          )}
        </div>

        {/* Rendered Markdown Content */}
        <div
          className="text-amber-100 leading-relaxed"
          style={{ fontFamily: "'IM Fell English', serif" }}
        >
          {renderContent(activeChapter.content)}
        </div>

        {/* Sub-chapter preview cards (if any) */}
        {activeChapter.subChapters && activeChapter.subChapters.length > 0 && (
          <div className="mt-10 pt-6 border-t border-amber-800/40">
            <h3
              className="text-xl font-bold text-amber-500 mb-4"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Sections within this Chapter
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeChapter.subChapters.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 bg-amber-900/20 border border-amber-800/40 rounded-lg hover:border-amber-600/60 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {sub.icon && <span className="text-lg">{sub.icon}</span>}
                    <span
                      className="text-amber-300 font-semibold"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {sub.title}
                    </span>
                  </div>
                  {sub.subtitle && (
                    <p className="text-amber-600 text-sm italic" style={{ fontFamily: "'IM Fell English', serif" }}>
                      {sub.subtitle}
                    </p>
                  )}
                  {sub.subChapters && sub.subChapters.length > 0 && (
                    <p className="text-amber-700 text-xs mt-1">
                      {sub.subChapters.length} sub-section{sub.subChapters.length > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center text-amber-800/40 text-2xl select-none">
          ✦ ✦ ✦
        </div>
      </div>
    </div>
  );
};
