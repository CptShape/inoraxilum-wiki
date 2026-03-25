# Quick Start Guide

This guide shows you how to add and edit content in the Fantasy Rulebook.

---

## 📁 Project Structure

```
src/data/
├── chapters.ts              # Main chapters array (imports all chapters)
└── chapters/
    ├── index.ts             # Re-exports all chapters
    ├── mechanics.ts         # Single-file chapter (no sub-chapters)
    │
    ├── kinships/            # Chapter folder with sub-chapters
    │   ├── index.ts         # Chapter definition + imports sub-chapters
    │   ├── high-elves.ts    # Sub-chapter file
    │   ├── mountain-dwarves.ts
    │   └── humans.ts
    │
    ├── vocations/
    │   ├── index.ts
    │   ├── vanguard.ts
    │   ├── arcanist.ts
    │   └── stalker.ts
    │
    ├── spells/
    │   ├── index.ts
    │   ├── evocation.ts
    │   ├── abjuration.ts
    │   └── illusion.ts
    │
    └── bestiary/
        ├── index.ts
        ├── undead.ts
        ├── dragons.ts
        └── humanoids.ts
```

---

## ➕ Adding a New Sub-Chapter

### Step 1: Create the sub-chapter file

Create a new file in the appropriate chapter folder:

```typescript
// src/data/chapters/kinships/wood-elves.ts
import { SubChapter } from '../../../types';

export const woodElves: SubChapter = {
  id: 'wood-elves',
  title: 'Wood Elves',
  content: `# Wood Elves

**Ability Score Increase:** +2 Dexterity, +1 Wisdom

## Traits
- **Darkvision:** See in dim light within 60 feet
- **Fleet of Foot:** Base walking speed increases to 35 feet
- **Mask of the Wild:** Can hide when lightly obscured by nature

## Description
Wood Elves live in harmony with the forests...`
};
```

### Step 2: Export from the chapter's index.ts

```typescript
// src/data/chapters/kinships/index.ts
import { Chapter } from '../../../types';
import { highElves } from './high-elves';
import { mountainDwarves } from './mountain-dwarves';
import { humans } from './humans';
import { woodElves } from './wood-elves';  // Add import

export const kinshipsChapter: Chapter = {
  id: 'kinships',
  title: 'Kinships',
  subtitle: 'Races of the Realm',
  icon: '⚔️',
  content: `# Kinships of the Realm...`,
  subChapters: [highElves, mountainDwarves, humans, woodElves]  // Add to array
};

export { highElves, mountainDwarves, humans, woodElves };  // Export
```

That's it! The new sub-chapter will automatically appear in the app.

---

## ➕ Adding a New Chapter (with sub-chapters)

### Step 1: Create the chapter folder

```bash
mkdir src/data/chapters/equipment
```

### Step 2: Create sub-chapter files

```typescript
// src/data/chapters/equipment/weapons.ts
import { SubChapter } from '../../../types';

export const weapons: SubChapter = {
  id: 'weapons',
  title: 'Weapons',
  content: `# Weapons

## Simple Weapons
...`
};
```

### Step 3: Create the chapter's index.ts

```typescript
// src/data/chapters/equipment/index.ts
import { Chapter } from '../../../types';
import { weapons } from './weapons';
import { armor } from './armor';

export const equipmentChapter: Chapter = {
  id: 'equipment',
  title: 'Equipment',
  subtitle: 'Arms & Armor',
  icon: '🗡️',
  content: `# Equipment

This chapter covers all equipment...`,
  subChapters: [weapons, armor]
};

export { weapons, armor };
```

### Step 4: Export from chapters/index.ts

```typescript
// src/data/chapters/index.ts
export { kinshipsChapter } from './kinships';
export { vocationsChapter } from './vocations';
export { spellsChapter } from './spells';
export { bestiaryChapter } from './bestiary';
export { mechanicsChapter } from './mechanics';
export { equipmentChapter } from './equipment';  // Add this
```

### Step 5: Add to chapters array

```typescript
// src/data/chapters.ts
import {
  kinshipsChapter,
  vocationsChapter,
  spellsChapter,
  bestiaryChapter,
  mechanicsChapter,
  equipmentChapter  // Add import
} from './chapters/index';

export const chapters: Chapter[] = [
  kinshipsChapter,
  vocationsChapter,
  spellsChapter,
  bestiaryChapter,
  mechanicsChapter,
  equipmentChapter  // Add to array
];
```

---

## ➕ Adding a Chapter Without Sub-Chapters

For simple chapters without sub-chapters, create a single file:

```typescript
// src/data/chapters/appendix.ts
import { Chapter } from '../../types';

export const appendixChapter: Chapter = {
  id: 'appendix',
  title: 'Appendix',
  subtitle: 'Quick Reference',
  icon: '📋',
  content: `# Appendix

Quick reference tables and charts...`
  // Note: no subChapters property needed
};
```

Then export it from `chapters/index.ts` and add to the array in `chapters.ts`.

---

## ✏️ Editing Existing Content

Simply edit the appropriate file:

- **Chapter overview:** Edit the `content` property in the chapter's `index.ts`
- **Sub-chapter:** Edit the specific sub-chapter file (e.g., `high-elves.ts`)
- **Chapter metadata:** Edit `title`, `subtitle`, or `icon` in the chapter's `index.ts`

---

## 🎯 Best Practices

1. **One sub-chapter per file** - Keeps files manageable
2. **Use kebab-case for filenames** - e.g., `high-elves.ts`, not `highElves.ts`
3. **Use camelCase for exports** - e.g., `export const highElves`
4. **Keep content in markdown format** - Easy to read and maintain
5. **Always export from index files** - Maintains clean imports
