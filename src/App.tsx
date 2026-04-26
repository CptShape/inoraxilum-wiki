import React, { useEffect, useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentView } from './components/ContentView';
import { MarkdownView } from './components/MarkdownView';
import { allChapters, chapters } from './data/chapters';
import { Chapter, ViewMode } from './types';

// styles
import './data/styles/tableRow.css';
import './data/styles/runic-table.css';
import './data/styles/dwarven-table.css';
import './data/styles/elven-table.css';
import './data/styles/dragon-table.css';
import './data/styles/necromancer-table.css';
import './data/styles/monster-stat-block.css';
import './data/styles/scroll-table.css';
import './data/styles/spell-card.css';
import './data/styles/header.css';
import './data/styles/draconic-table.css';
import './data/styles/burglar-table.css';
import './data/styles/hobbit-hoard-table.css';
import './data/styles/hobbit-thief-table.css';
import './data/styles/titanborn-table.css';
import './data/styles/orc-table.css';

// ─── URL Hash Utilities ──────────────────────────────────────────────
// Hash format: #chapter-id/sub-chapter-id/deep-chapter-id
// Mythology:   #mythology/zeus  (god profile)
// Timeline:    #chronicle       (normal chapter)

function getHashPath(): string[] | null {
  const hash = window.location.hash.slice(1); // remove '#'
  if (!hash) return null;
  return hash.split('/').map(s => s.trim()).filter(Boolean);
}

function setHashPath(path: string[]) {
  const hash = '#' + path.join('/');
  if (window.location.hash !== hash) {
    window.history.pushState(null, '', hash);
  }
}

function clearHash() {
  if (window.location.hash) {
    window.history.pushState(null, '', window.location.pathname + window.location.search);
  }
}
// ─────────────────────────────────────────────────────────────────────

function App() {
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(['kinships', 'elves', 'high-elves']));
  const [viewMode, setViewMode] = useState<ViewMode>('chapters');
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [breadcrumbPath, setBreadcrumbPath] = useState<string[]>([]);

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

  // Helper to find the path (array of IDs) from root to a target chapter
  const findChapterPath = useCallback((chapters: Chapter[], targetId: string, currentPath: string[] = []): string[] | null => {
    for (const chapter of chapters) {
      const newPath = [...currentPath, chapter.id];
      if (chapter.id === targetId) return newPath;
      if (chapter.subChapters) {
        const found = findChapterPath(chapter.subChapters, targetId, newPath);
        if (found) return found;
      }
    }
    return null;
  }, []);

  // Get active chapter content
  const activeChapter = activeChapterId ? findChapterById(chapters, activeChapterId) : null;

  // Resolve prevChapter and nextChapter IDs into actual Chapter objects
  const prevChapter = activeChapter?.prevChapter
    ? findChapterById(chapters, activeChapter.prevChapter)
    : null;
  const nextChapter = activeChapter?.nextChapter
    ? findChapterById(chapters, activeChapter.nextChapter)
    : null;

  const handleChapterSelect = useCallback((chapterId: string, path: string[] | null = null) => {
    setActiveChapterId(chapterId);

    // If a full path is provided (from ContentView card click or timeline event), use it
    let fullPath = path;

    // If only the ID is provided (from Sidebar), compute the full path
    if (!fullPath) {
      fullPath = findChapterPath(chapters, chapterId) || [chapterId];
    }
    
    setBreadcrumbPath(fullPath);
    // Update breadcrumb with titles
    const titles = fullPath.map(id => {
      const ch = findChapterById(chapters, id);
      return ch?.title || id;
    });
    setBreadcrumb(titles);

    // Update URL hash
    setHashPath(fullPath);
  }, [findChapterById, findChapterPath]);

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

  // Navigate from a hash path (array of IDs)
  const navigateFromHashPath = useCallback((path: string[]) => {
    if (path.length === 0) {
      setActiveChapterId(null);
      setBreadcrumb([]);
      setBreadcrumbPath([]);
      return;
    }

    const targetId = path[path.length - 1];
    const chapter = findChapterById(chapters, targetId);

    if (chapter) {
      // Standard chapter navigation
      setActiveChapterId(targetId);
      setBreadcrumbPath(path);
      const titles = path.map(id => {
        const ch = findChapterById(chapters, id);
        return ch?.title || id;
      });
      setBreadcrumb(titles);
      // Expand all parent chapters in sidebar
      path.slice(0, -1).forEach(parentId => {
        setExpandedChapters(prev => new Set([...prev, parentId]));
      });
    } else {
      // Chapter not found — check if this is a special sub-route
      // e.g. #mythology/zeus where "zeus" is a god, not a chapter
      const rootChapter = findChapterById(chapters, path[0]);
      if (rootChapter) {
        // The root chapter exists — treat the extra segments as sub-content
        // (mythology god profiles, etc.)
        setActiveChapterId(path[0]);
        setBreadcrumbPath(path);
        const titles = [rootChapter.title];
        // Add extra path segments as-is to breadcrumb
        for (let i = 1; i < path.length; i++) {
          titles.push(path[i]);
        }
        setBreadcrumb(titles);
        // Expand the root chapter
        setExpandedChapters(prev => new Set([...prev, path[0]]));
      } else {
        // Nothing found — clear to main menu
        setActiveChapterId(null);
        setBreadcrumb([]);
        setBreadcrumbPath([]);
        clearHash();
      }
    }
  }, [findChapterById]);

  // Initialize from URL hash on mount
  useEffect(() => {
    const hashPath = getHashPath();
    if (hashPath) {
      navigateFromHashPath(hashPath);
    }
  }, [navigateFromHashPath]);

  // Listen for browser back/forward (hashchange)
  useEffect(() => {
    const handleHashChange = () => {
      const hashPath = getHashPath();
      if (hashPath) {
        navigateFromHashPath(hashPath);
      } else {
        // Hash was cleared — go back to main menu
        setActiveChapterId(null);
        setBreadcrumb([]);
        setBreadcrumbPath([]);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [navigateFromHashPath]);

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
            onClearSelection={() => {
              setActiveChapterId(null);
              setBreadcrumb([]);
              setBreadcrumbPath([]);
              clearHash();
            }}
            breadcrumb={breadcrumb}
          />
          <ContentView
            activeChapter={activeChapter}
            breadcrumb={breadcrumb}
            onChapterSelect={handleChapterSelect}
            parentPath={breadcrumbPath}
            prevChapter={prevChapter}
            nextChapter={nextChapter}
            allChapters={chapters}
          />
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