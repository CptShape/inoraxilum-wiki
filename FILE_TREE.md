# Complete File Tree - Fantasy Rulebook

```
fantasy-rulebook/
│
├── 📄 README.md                        # Project overview
├── 📄 QUICK_START.md                   # Getting started guide
├── 📄 PROJECT_STRUCTURE.md             # File organization
├── 📄 ARCHITECTURE.md                  # System design
├── 📄 REFACTORING_SUMMARY.md           # Refactoring details
├── 📄 FILE_TREE.md                     # This file
│
├── 📦 package.json                     # Dependencies
├── 📦 package-lock.json
├── ⚙️ vite.config.ts                   # Vite configuration
├── ⚙️ tsconfig.json                    # TypeScript config
├── ⚙️ tailwind.config.js               # Tailwind config
├── ⚙️ postcss.config.js                # PostCSS config
│
├── 📂 public/
│   └── 📄 fantasy-rulebook.md          # Standalone markdown export
│
├── 📂 dist/                            # Build output (generated)
│   └── 📄 index.html                   # Single-file production build
│
└── 📂 src/                             # Source code
    │
    ├── 📄 main.tsx                     # Application entry point
    ├── 📄 App.tsx                      # Main app component (80 lines)
    ├── 🎨 index.css                    # Global styles
    │
    ├── 📂 types/                       # TypeScript type definitions
    │   └── 📄 index.ts                 # Chapter, SubChapter, ViewMode types
    │
    ├── 📂 data/                        # Content and data
    │   ├── 📄 chapters.ts              # Main chapters array (exports all)
    │   │
    │   └── 📂 chapters/                # Individual chapter files
    │       ├── 📄 index.ts             # Central export point
    │       ├── 📄 kinships.ts          # Races (High Elves, Dwarves, Humans)
    │       ├── 📄 vocations.ts         # Classes (Vanguard, Arcanist, Stalker)
    │       ├── 📄 spells.ts            # Spells (Evocation, Abjuration, Illusion)
    │       ├── 📄 bestiary.ts          # Monsters (Undead, Dragons, Humanoids)
    │       └── 📄 mechanics.ts         # Game rules and mechanics
    │
    ├── 📂 components/                  # React UI components
    │   ├── 📄 Sidebar.tsx              # Navigation sidebar (150 lines)
    │   ├── 📄 ContentView.tsx          # Content display (60 lines)
    │   ├── 📄 MarkdownView.tsx         # Markdown export (80 lines)
    │   └── 📄 DiceRoller.tsx           # Dice rolling utility (120 lines)
    │
    └── 📂 utils/                       # Utility functions
        ├── 📄 markdownGenerator.ts     # Markdown generation (40 lines)
        └── 📄 cn.ts                    # Class name utility
```

## 📊 File Statistics

### By Directory

| Directory | Files | Purpose | Total Lines |
|-----------|-------|---------|-------------|
| `src/types/` | 1 | Type definitions | ~20 |
| `src/data/chapters/` | 6 | Chapter content | ~800 |
| `src/components/` | 4 | UI components | ~410 |
| `src/utils/` | 2 | Helper functions | ~50 |
| Root `src/` | 3 | App entry | ~120 |
| Documentation | 5 | Guides | ~1500 |

### By File Type

| Type | Count | Purpose |
|------|-------|---------|
| `.tsx` | 8 | React components |
| `.ts` | 9 | TypeScript files |
| `.md` | 6 | Documentation |
| `.json` | 2 | Config files |
| `.js` | 2 | Config files |
| `.css` | 1 | Styles |

## 🎯 Key Files Explained

### Entry Points
- **`src/main.tsx`** - React app initialization
- **`src/App.tsx`** - Main component, state management
- **`index.html`** - HTML entry, fonts, meta tags

### Configuration
- **`vite.config.ts`** - Build configuration, single-file output
- **`tsconfig.json`** - TypeScript compiler options
- **`tailwind.config.js`** - Tailwind CSS customization

### Data Layer
- **`src/data/chapters.ts`** - Aggregates all chapters
- **`src/data/chapters/*.ts`** - Individual chapter content
- **`src/types/index.ts`** - Type definitions

### Component Layer
- **`Sidebar.tsx`** - Navigation, chapter selection, dice roller
- **`ContentView.tsx`** - Displays active chapter/sub-chapter
- **`MarkdownView.tsx`** - Markdown export and copy
- **`DiceRoller.tsx`** - D&D dice roller component

### Utility Layer
- **`markdownGenerator.ts`** - Converts chapters to markdown
- **`cn.ts`** - Class name merging utility

### Documentation
- **`README.md`** - Project overview, quick start
- **`QUICK_START.md`** - How to add/edit content
- **`PROJECT_STRUCTURE.md`** - File organization details
- **`ARCHITECTURE.md`** - System design, data flow
- **`REFACTORING_SUMMARY.md`** - Refactoring process

## 📏 File Size Guidelines

### Ideal Sizes (Achieved)
```
✅ Components: 50-150 lines
✅ Chapter files: 100-300 lines
✅ Utility files: 20-100 lines
✅ Type files: 10-50 lines
✅ Main App: 50-100 lines
```

### Size Distribution
```
App.tsx              ████░░░░░░ 80 lines
Sidebar.tsx          ███████░░░ 150 lines
ContentView.tsx      ███░░░░░░░ 60 lines
MarkdownView.tsx     ████░░░░░░ 80 lines
DiceRoller.tsx       ██████░░░░ 120 lines
kinships.ts          ███████░░░ 150 lines
vocations.ts         ███████░░░ 150 lines
spells.ts            ██████████ 200 lines
bestiary.ts          ████████████ 250 lines
mechanics.ts         █░░░░░░░░░ 20 lines
```

## 🔍 Import/Export Flow

```
main.tsx
  ↓ imports
App.tsx
  ↓ imports
  ├─→ components/Sidebar.tsx
  ├─→ components/ContentView.tsx
  ├─→ components/MarkdownView.tsx
  └─→ components/DiceRoller.tsx
      ↓ all import from
      data/chapters.ts
          ↓ imports from
          data/chapters/index.ts
              ↓ exports from
              ├─→ kinships.ts
              ├─→ vocations.ts
              ├─→ spells.ts
              ├─→ bestiary.ts
              └─→ mechanics.ts
                  ↓ all use types from
                  types/index.ts
```

## 🎨 Asset Organization

### Fonts (loaded from CDN)
- **Cinzel** - Headers and titles
- **IM Fell English** - Body text
- **MedievalSharp** - Special accents

### Icons
- **Lucide React** - UI icons (ChevronDown, Copy, etc.)
- **Emoji** - Chapter icons (⚔️, 🛡️, ✨, 🐉, ⚙️)

### Images
- None (uses CSS gradients and emoji)
- Lightweight and performant

## 📦 Build Output

```
dist/
└── index.html (250.88 kB)
    ├── Inlined JavaScript (React + App code)
    ├── Inlined CSS (Tailwind + custom styles)
    └── All content embedded (no external requests)
```

### Production Build Features
- ✅ Single HTML file
- ✅ No external dependencies
- ✅ Optimized and minified
- ✅ Gzip: 76.61 kB
- ✅ Works offline
- ✅ Fast loading

## 🗂️ Content Organization

### Chapters (5 total)
```
1. Kinships (3 sub-chapters)
   ├── High Elves
   ├── Mountain Dwarves
   └── Humans

2. Vocations (3 sub-chapters)
   ├── The Vanguard
   ├── The Arcanist
   └── The Stalker

3. Game Mechanics (no sub-chapters)

4. Sorcery & Spells (3 sub-chapters)
   ├── Evocation Spells
   ├── Abjuration Spells
   └── Illusion Spells

5. Bestiary (3 sub-chapters)
   ├── Undead Creatures
   ├── Dragons & Draconic Beasts
   └── Humanoid Foes
```

### Total Content
- **5 chapters**
- **12 sub-chapters**
- **9 spells**
- **7 creatures**
- **3 races**
- **3 classes**

## 🎯 Navigation Depth

```
Level 0: App
  │
  ├─ Level 1: View Mode (Chapters / Markdown)
  │   │
  │   ├─ Level 2: Chapter Selection
  │   │   │
  │   │   └─ Level 3: Sub-Chapter Selection
  │   │       │
  │   │       └─ Level 4: Content Display
  │   │
  │   └─ Dice Roller (accessible from any level)
```

## 🔑 Important Files Quick Reference

| Task | File to Edit |
|------|--------------|
| Add race | `src/data/chapters/kinships.ts` |
| Add class | `src/data/chapters/vocations.ts` |
| Add spell | `src/data/chapters/spells.ts` |
| Add monster | `src/data/chapters/bestiary.ts` |
| Add rule | `src/data/chapters/mechanics.ts` |
| New chapter | Create `src/data/chapters/name.ts` |
| UI change | `src/components/*.tsx` |
| Styling | `src/index.css` |
| Types | `src/types/index.ts` |

## 💾 Version Control Recommendations

### .gitignore includes:
```
node_modules/
dist/
.vite/
*.log
.DS_Store
```

### Suggested commit structure:
```
content/   - Chapter and sub-chapter additions/edits
ui/        - Component and styling changes
config/    - Configuration updates
docs/      - Documentation updates
```

---

**Last Updated:** After modularization refactoring  
**Total Files:** ~25 (excluding node_modules and dist)  
**Lines of Code:** ~1,400 (application code)  
**Documentation:** ~1,500 lines across 5 files  
**Build Size:** 250.88 kB (76.61 kB gzipped)
