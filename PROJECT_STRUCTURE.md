# Fantasy Rulebook - Project Structure

This document describes the modular architecture of the Fantasy Rulebook application.

## 📁 Directory Structure

```
src/
├── types/
│   └── index.ts              # TypeScript type definitions
│
├── data/
│   ├── chapters/
│   │   ├── index.ts          # Central export for all chapters
│   │   ├── kinships.ts       # Race/kinship data and sub-chapters
│   │   ├── vocations.ts      # Class/vocation data and sub-chapters
│   │   ├── spells.ts         # Spell schools and spell data
│   │   ├── bestiary.ts       # Monster/creature data by type
│   │   └── mechanics.ts      # Game mechanics and rules
│   └── chapters.ts           # Main chapters array (imports from chapters/)
│
├── components/
│   ├── Sidebar.tsx           # Navigation sidebar with expandable sub-chapters
│   ├── ContentView.tsx       # Main content display area
│   ├── MarkdownView.tsx      # Markdown export view
│   └── DiceRoller.tsx        # Interactive dice rolling utility
│
├── utils/
│   └── markdownGenerator.ts  # Markdown generation utility functions
│
├── App.tsx                   # Main application component
├── main.tsx                  # Application entry point
└── index.css                 # Global styles and custom CSS
```

## 🎯 Key Concepts

### Modularity
Each chapter is defined in its own file under `src/data/chapters/`, making it easy to:
- Add new chapters without modifying existing ones
- Maintain and update individual chapters independently
- Keep files at a manageable size
- Enable team collaboration on different sections

### Component Separation
UI components are separated by responsibility:
- **Sidebar**: Handles navigation and chapter selection
- **ContentView**: Displays chapter and sub-chapter content
- **MarkdownView**: Generates and displays markdown export
- **DiceRoller**: Provides dice rolling functionality

### Type Safety
All data structures are typed using TypeScript interfaces defined in `src/types/`:
- `Chapter`: Main chapter structure with optional sub-chapters
- `SubChapter`: Nested chapter structure
- `ViewMode`: Application view state

## 📝 Adding New Content

### Adding a New Chapter

1. Create a new file in `src/data/chapters/`:
```typescript
// src/data/chapters/new-chapter.ts
import { Chapter } from '../../types';

export const newChapter: Chapter = {
  id: 'new-chapter',
  title: 'New Chapter',
  subtitle: 'Chapter Subtitle',
  icon: '🎯',
  content: `# Chapter Content...`,
  subChapters: [
    {
      id: 'sub-1',
      title: 'Sub Chapter 1',
      content: `# Sub Chapter Content...`
    }
  ]
};
```

2. Export it from `src/data/chapters/index.ts`:
```typescript
export { newChapter } from './new-chapter';
```

3. Add it to the chapters array in `src/data/chapters.ts`:
```typescript
import { newChapter } from './chapters/index';

export const chaptersData: Chapter[] = [
  // ... existing chapters
  newChapter,
];
```

### Adding Sub-Chapters

Simply add objects to the `subChapters` array in any chapter file:
```typescript
subChapters: [
  {
    id: 'unique-id',
    title: 'Sub-Chapter Title',
    content: `# Markdown content here...`
  }
]
```

## 🎨 Styling

- Fantasy fonts: Cinzel (headings), IM Fell English (body)
- Custom parchment-style background with leather texture
- Responsive design with Tailwind CSS
- Custom scrollbars matching the fantasy theme

## 🚀 Build & Deploy

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

The built application is a single HTML file in `dist/index.html` ready for deployment to GitHub Pages or any static hosting service.

## 📄 Markdown Export

The application includes a "Get Markdown" feature that exports all content as a single markdown file. This is also available as a standalone file at `public/fantasy-rulebook.md`.
