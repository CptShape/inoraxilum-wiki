import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Chapter } from '../types';

interface ChapterTreeProps {
  chapters: Chapter[];
  activeChapterId: string | null;
  expandedChapters: Set<string>;
  depth: number;
  path: string[];
  onChapterSelect: (chapterId: string, path: string[]) => void;
  onToggleExpand: (chapterId: string) => void;
}

// Colours per depth level so nesting is visually clear
const depthStyles: Record<number, { border: string; text: string; activeText: string; activeBg: string; bullet: string }> = {
  0: {
    border: 'border-amber-700',
    text: 'text-amber-300',
    activeText: 'text-amber-100',
    activeBg: 'bg-amber-900/50 border-l-4 border-amber-500',
    bullet: '',
  },
  1: {
    border: 'border-amber-800/60',
    text: 'text-amber-400',
    activeText: 'text-amber-200',
    activeBg: 'bg-amber-900/40 border-l-4 border-amber-600',
    bullet: '▸',
  },
  2: {
    border: 'border-amber-900/50',
    text: 'text-amber-500',
    activeText: 'text-amber-300',
    activeBg: 'bg-amber-900/30 border-l-4 border-amber-700',
    bullet: '◆',
  },
};

const getDepthStyle = (depth: number) =>
  depthStyles[Math.min(depth, 2)];

export const ChapterTree: React.FC<ChapterTreeProps> = ({
  chapters,
  activeChapterId,
  expandedChapters,
  depth,
  path,
  onChapterSelect,
  onToggleExpand,
}) => {
  return (
    <div
      className={
        depth > 0
          ? `ml-3 pl-3 border-l-2 ${getDepthStyle(depth).border} mt-1 space-y-0.5`
          : 'space-y-1'
      }
    >
      {chapters.map((chapter) => {
        const hasChildren = !!chapter.subChapters && chapter.subChapters.length > 0;
        const isExpanded = expandedChapters.has(chapter.id);
        const isActive = activeChapterId === chapter.id;
        const currentPath = [...path, chapter.id];
        const ds = getDepthStyle(depth);

        return (
          <div key={chapter.id}>
            {/* Row */}
            <div
              className={`
                flex items-center justify-between rounded-lg px-2 py-1.5 cursor-pointer
                transition-all duration-200 group select-none
                ${isActive ? ds.activeBg : `hover:bg-amber-900/20`}
              `}
              style={{
                fontFamily: depth === 0 ? "'Cinzel', serif" : "'IM Fell English', serif",
                fontSize: depth === 0 ? '0.9rem' : depth === 1 ? '0.85rem' : '0.8rem',
              }}
              onClick={() => onChapterSelect(chapter.id, currentPath)}
            >
              {/* Left: icon / bullet + title */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {depth === 0 && chapter.icon && (
                  <span className="text-base shrink-0">{chapter.icon}</span>
                )}
                {depth > 0 && (
                  <span className={`shrink-0 text-xs ${ds.text}`}>{ds.bullet}</span>
                )}
                <span
                  className={`truncate font-medium ${isActive ? ds.activeText : ds.text} group-hover:${ds.activeText}`}
                >
                  {chapter.title}
                </span>
              </div>

              {/* Right: expand / collapse chevron */}
              {hasChildren && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleExpand(chapter.id);
                  }}
                  className="ml-1 p-1 rounded hover:bg-amber-700/30 transition-colors shrink-0"
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-amber-600" />
                  )}
                </button>
              )}
            </div>

            {/* Children — recursive */}
            {hasChildren && isExpanded && (
              <ChapterTree
                chapters={chapter.subChapters!}
                activeChapterId={activeChapterId}
                expandedChapters={expandedChapters}
                depth={depth + 1}
                path={currentPath}
                onChapterSelect={onChapterSelect}
                onToggleExpand={onToggleExpand}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
