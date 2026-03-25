import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentView } from './components/ContentView';
import { MarkdownView } from './components/MarkdownView';
import DiceRoller from './components/DiceRoller';
import { chapters } from './data/chapters';
import { Chapter, ViewMode } from './types';

function App() {
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(['kinships', 'elves', 'high-elves']));
  const [viewMode, setViewMode] = useState<ViewMode>('chapters');
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

  // Helper function to find a chapter by ID recursively
  const findChapterById = useCallback((chapters: Chapter[], id: string): Chapter | null => {
    for (const chapter of chapters) {
      if (chapter.id === id) return chapter;
      if (chapter.subChapters) {
        const found = findChapterById(chapter.subChapters, id);
        if (found) return found;
      }
    }
    return null;
  }, []);

  // Get active chapter content
  const activeChapter = activeChapterId ? findChapterById(chapters, activeChapterId) : null;

  const handleChapterSelect = (chapterId: string, path: string[]) => {
    setActiveChapterId(chapterId);
    // Update breadcrumb with titles
    const titles = path.map(id => {
      const ch = findChapterById(chapters, id);
      return ch?.title || id;
    });
    setBreadcrumb(titles);
  };

  const handleToggleExpand = (chapterId: string) => {
    setExpandedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  const handleGetMarkdown = () => {
    setViewMode('markdown');
  };

  const handleBackToChapters = () => {
    setViewMode('chapters');
  };

  // Expand all parents of active chapter
  React.useEffect(() => {
    if (activeChapterId) {
      const expandParents = (chapters: Chapter[], targetId: string, parents: string[] = []): boolean => {
        for (const chapter of chapters) {
          if (chapter.id === targetId) {
            parents.forEach(p => setExpandedChapters(prev => new Set([...prev, p])));
            return true;
          }
          if (chapter.subChapters) {
            if (expandParents(chapter.subChapters, targetId, [...parents, chapter.id])) {
              return true;
            }
          }
        }
        return false;
      };
      expandParents(chapters, activeChapterId);
    }
  }, [activeChapterId]);

  return (
    <div className="flex h-screen bg-stone-900 text-amber-100 leather-bg">
      {viewMode === 'chapters' ? (
        <>
          <Sidebar
            chapters={chapters}
            activeChapterId={activeChapterId}
            expandedChapters={expandedChapters}
            onChapterSelect={handleChapterSelect}
            onToggleExpand={handleToggleExpand}
            onGetMarkdown={handleGetMarkdown}
            breadcrumb={breadcrumb}
          />
          <ContentView
            activeChapter={activeChapter}
            breadcrumb={breadcrumb}
          />
          <DiceRoller />
        </>
      ) : (
        <MarkdownView
          chapters={chapters}
          onBack={handleBackToChapters}
        />
      )}
    </div>
  );
}

export default App;
