# Fantasy Rulebook - Architecture Overview

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ • Main state management (active chapter, view mode)   │ │
│  │ • Orchestrates child components                       │ │
│  │ • Handles chapter/sub-chapter navigation              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Sidebar    │    │ ContentView  │    │ MarkdownView │
├──────────────┤    ├──────────────┤    ├──────────────┤
│ • Navigation │    │ • Display    │    │ • Export     │
│ • Expandable │    │   content    │    │   markdown   │
│   chapters   │    │ • Chapter &  │    │ • Copy to    │
│ • Dice       │    │   sub-chapter│    │   clipboard  │
│   roller     │    │   rendering  │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
```

## 📊 Data Flow

```
chapters.ts (Main export)
    │
    ├── imports from chapters/index.ts
    │       │
    │       ├── kinships.ts      → kinshipsChapter
    │       ├── vocations.ts     → vocationsChapter
    │       ├── mechanics.ts     → mechanicsChapter
    │       ├── spells.ts        → spellsChapter
    │       └── bestiary.ts      → bestiaryChapter
    │
    └── exports chaptersData: Chapter[]
            │
            └── consumed by App.tsx
                    │
                    ├── passed to Sidebar
                    ├── passed to ContentView
                    └── passed to MarkdownView
```

## 🔄 Component Communication

```
┌─────────────────────────────────────────────────────────┐
│                     User Interaction                     │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Sidebar Component (Navigation)              │
│  • onClick chapter/sub-chapter                          │
│  • onClick expand/collapse                              │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│           App.tsx (State Management)                     │
│  setState({                                             │
│    activeChapter: chapterId,                            │
│    activeSubChapter: subChapterId,                      │
│    expandedChapters: [...]                              │
│  })                                                     │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│         ContentView Component (Display)                  │
│  • Receives active chapter/sub-chapter IDs              │
│  • Finds matching content from chaptersData             │
│  • Renders markdown content                             │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Type System

```typescript
// Core Data Structures

SubChapter {
  id: string
  title: string
  content: string (markdown)
}
       ⬆
       │ contains 0..n
       │
Chapter {
  id: string
  title: string
  subtitle: string
  icon: string (emoji)
  content: string (markdown)
  subChapters?: SubChapter[]
}
       ⬆
       │ array of
       │
chaptersData: Chapter[]
```

## 🔧 Utility Functions

```
markdownGenerator.ts
    │
    ├── generateMarkdown(chapters: Chapter[]): string
    │   └── Converts all chapters and sub-chapters to markdown
    │
    └── Used by:
        ├── MarkdownView component (for display)
        └── public/fantasy-rulebook.md (standalone export)
```

## 🎯 Benefits of This Architecture

### ✅ Separation of Concerns
- **Data Layer**: `src/data/chapters/*.ts` - Pure data, no UI logic
- **Type Layer**: `src/types/index.ts` - Type definitions
- **Component Layer**: `src/components/*.tsx` - UI components
- **Utility Layer**: `src/utils/*.ts` - Helper functions
- **Main App**: `src/App.tsx` - Orchestration and state

### ✅ Scalability
- Add new chapters without modifying existing code
- Each chapter file is independent and manageable
- Easy to add new features (e.g., search, filtering)

### ✅ Maintainability
- Small, focused files (typically 100-200 lines)
- Clear naming conventions
- TypeScript ensures type safety
- Easy to locate and update specific content

### ✅ Reusability
- Components can be reused in different contexts
- Utility functions are pure and testable
- Type definitions ensure consistency

### ✅ Collaboration
- Multiple developers can work on different chapters
- Minimal merge conflicts
- Clear ownership of files

## 🚀 Performance Considerations

- **Code Splitting**: All chapter data is bundled but tree-shakeable
- **Lazy Loading**: Could add React.lazy() for components if needed
- **Memoization**: Components use React best practices
- **Bundle Size**: ~250KB gzipped (includes all content and UI)

## 📦 Future Enhancements

Potential additions to the architecture:

1. **Search Functionality**
   - Add search utility in `src/utils/search.ts`
   - Index chapter content for fast searching

2. **Bookmarks/Favorites**
   - Store in localStorage
   - Add bookmark management component

3. **Custom Themes**
   - Theme provider component
   - Multiple color schemes

4. **Export Formats**
   - PDF generation
   - JSON export
   - HTML export

5. **Content Validation**
   - Schema validation for chapters
   - Markdown linting
   - Broken link detection
