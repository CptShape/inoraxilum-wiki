import React from 'react';
import { Chapter } from '../types';
import MarkdownRenderer from './MarkdownRenderer';

interface ContentViewProps {
  activeChapter: Chapter | null;
  breadcrumb: string[];
}

export const ContentView: React.FC<ContentViewProps> = ({ activeChapter, breadcrumb }) => {
  // ── Empty state ───────────────────────────────────────────────────────────
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

        {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
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

        {/* ── Chapter header ─────────────────────────────────────────────── */}
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

        {/* ── Markdown content fetched from .md file ─────────────────────── */}
        <div style={{ fontFamily: "'IM Fell English', serif" }}>
          <MarkdownRenderer path={activeChapter.content} />
        </div>

        {/* ── Sub-chapter preview cards ──────────────────────────────────── */}
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
