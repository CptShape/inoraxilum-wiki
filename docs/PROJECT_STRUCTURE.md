# Project Structure

Complete file organization for the Eldritch Grimoire Fantasy Rulebook.

---

## 📁 Complete File Tree

```
src/
├── App.tsx                          # Main application component
├── index.css                        # Global styles & custom CSS
├── main.tsx                         # Application entry point
│
├── types/
│   └── index.ts                     # TypeScript interfaces
│
├── data/
│   ├── chapters.ts                  # Main chapters array export
│   │
│   └── chapters/
│       ├── index.ts                 # Re-exports all chapters
│       │
│       ├── mechanics.ts             # Chapter without sub-chapters
│       │
│       ├── kinships/                # Chapter: Kinships (Races)
│       │   ├── index.ts             # Chapter definition
│       │   ├── high-elves.ts        # Sub-chapter
│       │   ├── mountain-dwarves.ts  # Sub-chapter
│       │   └── humans.ts            # Sub-chapter
│       │
│       ├── vocations/               # Chapter: Vocations (Classes)
│       │   ├── index.ts             # Chapter definition
│       │   ├── vanguard.ts          # Sub-chapter
│       │   ├── arcanist.ts          # Sub-chapter
│       │   └── stalker.ts           # Sub-chapter
│       │
│       ├── spells/                  # Chapter: Sorcery & Spells
│       │   ├── index.ts             # Chapter definition
│       │   ├── evocation.ts         # Sub-chapter
│       │   ├── abjuration.ts        # Sub-chapter
│       │   └── illusion.ts          # Sub-chapter
│       │
│       └── bestiary/                # Chapter: Bestiary
│           ├── index.ts             # Chapter definition
│           ├── undead.ts            # Sub-chapter
│           ├── dragons.ts           # Sub-chapter
│           └── humanoids.ts         # Sub-chapter
│
├── components/
│   ├── Sidebar.tsx                  # Navigation sidebar
│   ├── ContentView.tsx              # Main content display
│   ├── MarkdownView.tsx             # Markdown export view
│   └── DiceRoller.tsx               # Interactive dice roller
│
└── utils/
    └── markdownGenerator.ts         # Markdown generation utility

docs/
├── QUICK_START.md                   # How to add/edit content
├── PROJECT_STRUCTURE.md             # This file
└── ARCHITECTURE.md                  # System design

public/
└── fantasy-rulebook.md              # Standalone markdown export
```

---

## 📊 File Statistics

| Category | Files | Purpose |
|----------|-------|---------|
| **Types** | 1 | TypeScript interfaces |
| **Data (Chapters)** | 17 | Chapter and sub-chapter content |
| **Components** | 4 | React UI components |
| **Utils** | 1 | Helper functions |
| **Documentation** | 3+ | Developer guides |

---

## 🔗 Import Flow

```
App.tsx
    ↓
imports from './data/chapters'
    ↓
chapters.ts (main array)
    ↓
imports from './chapters/index'
    ↓
chapters/index.ts (re-exports)
    ↓
├── kinships/index.ts → high-elves.ts, mountain-dwarves.ts, humans.ts
├── vocations/index.ts → vanguard.ts, arcanist.ts, stalker.ts
├── spells/index.ts → evocation.ts, abjuration.ts, illusion.ts
├── bestiary/index.ts → undead.ts, dragons.ts, humanoids.ts
└── mechanics.ts
```

---

## 🎯 Key Design Decisions

### Why folder structure for chapters with sub-chapters?

- **Scalability:** Can easily add many sub-chapters without bloating one file
- **Maintainability:** Each sub-chapter is independent and easy to edit
- **Team-friendly:** Multiple people can work on different sub-chapters

### Why single file for chapters without sub-chapters?

- **Simplicity:** No need for extra folder/index structure
- **Quick access:** Single file is easier to locate and edit

### Why separate index.ts files?

- **Clean imports:** `import { kinshipsChapter } from './kinships'` works automatically
- **Explicit exports:** Clear what's available from each module
- **Flexibility:** Can export sub-chapters individually if needed
