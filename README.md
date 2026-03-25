# 📜 Eldritch Grimoire - Fantasy Rulebook

A beautifully designed, interactive fantasy roleplaying game rulebook built with React, TypeScript, and Tailwind CSS.

![Fantasy Rulebook](https://img.shields.io/badge/Fantasy-Rulebook-amber?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan?style=flat-square)

---

## ✨ Features

- 📖 **Interactive Navigation** - Expandable chapters with sub-chapters
- 🎲 **Built-in Dice Roller** - Roll any dice combination (d4, d6, d8, d10, d12, d20)
- 📝 **Markdown Export** - Get a complete markdown file for GitHub Pages
- 🎨 **Fantasy Aesthetic** - Parchment textures, medieval fonts, amber color scheme
- ⚡ **Modular Architecture** - Clean, maintainable codebase

---

## 📚 Content Structure

### Chapters

| Chapter | Sub-Chapters | Description |
|---------|--------------|-------------|
| ⚔️ **Kinships** | High Elves, Mountain Dwarves, Humans | Playable races |
| 🛡️ **Vocations** | Vanguard, Arcanist, Stalker | Character classes |
| ✨ **Sorcery & Spells** | Evocation, Abjuration, Illusion | Magic system |
| 🐉 **Bestiary** | Undead, Dragons, Humanoids | Creatures & foes |
| 📜 **Core Mechanics** | - | Game rules |

---

## 🗂️ Project Structure

```
src/
├── types/                    # TypeScript interfaces
├── data/
│   ├── chapters.ts           # Main chapters array
│   └── chapters/
│       ├── kinships/         # Chapter folder
│       │   ├── index.ts      # Chapter definition
│       │   ├── high-elves.ts # Sub-chapter
│       │   ├── mountain-dwarves.ts
│       │   └── humans.ts
│       ├── vocations/
│       ├── spells/
│       ├── bestiary/
│       └── mechanics.ts      # Single-file chapter
├── components/               # React components
└── utils/                    # Helper functions
```

---

## 🚀 Quick Start

### Adding a New Sub-Chapter

1. Create `src/data/chapters/kinships/wood-elves.ts`:

```typescript
import { SubChapter } from '../../../types';

export const woodElves: SubChapter = {
  id: 'wood-elves',
  title: 'Wood Elves',
  content: `# Wood Elves

**Ability Score Increase:** +2 Dexterity, +1 Wisdom

## Traits
- **Fleet of Foot:** Base walking speed of 35 feet
- **Mask of the Wild:** Can hide in natural phenomena`
};
```

2. Add to `src/data/chapters/kinships/index.ts`:

```typescript
import { woodElves } from './wood-elves';
// ... add to subChapters array
subChapters: [highElves, mountainDwarves, humans, woodElves]
```

Done! The new sub-chapter appears automatically.

---

## 📖 Documentation

| Guide | Description |
|-------|-------------|
| [QUICK_START.md](docs/QUICK_START.md) | How to add/edit content |
| [PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) | Complete file organization |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design |

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📄 GitHub Pages Export

The app includes a "Get Markdown" button that generates a complete markdown file. You can also find a pre-generated version at:

- `public/fantasy-rulebook.md`

This file is ready to be uploaded to GitHub Pages or any static hosting service.

---

## 🎨 Design System

- **Primary Color:** Amber (#F59E0B)
- **Background:** Stone/Dark Brown (#1C1917)
- **Fonts:** Cinzel (headings), IM Fell English (body), MedievalSharp (accents)
- **Texture:** Parchment/leather effect

---

## 📜 License

MIT License - Feel free to use this as a template for your own rulebook!
