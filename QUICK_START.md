# Quick Start Guide - Fantasy Rulebook

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## ✏️ Common Tasks

### 1. Adding a New Chapter

**Step 1:** Create chapter file in `src/data/chapters/`

```typescript
// src/data/chapters/equipment.ts
import { Chapter } from '../../types';

export const equipmentChapter: Chapter = {
  id: 'equipment',
  title: 'Equipment',
  subtitle: 'Weapons & Armor',
  icon: '⚔️',
  content: `
# Equipment

Your character's equipment can mean the difference between life and death...
  `,
  subChapters: [
    {
      id: 'weapons',
      title: 'Weapons',
      content: `# Weapons\n\nWeapon descriptions here...`
    },
    {
      id: 'armor',
      title: 'Armor',
      content: `# Armor\n\nArmor descriptions here...`
    }
  ]
};
```

**Step 2:** Export from `src/data/chapters/index.ts`

```typescript
export { kinshipsChapter } from './kinships';
export { vocationsChapter } from './vocations';
export { equipmentChapter } from './equipment'; // Add this line
// ... other exports
```

**Step 3:** Add to chapters array in `src/data/chapters.ts`

```typescript
import {
  kinshipsChapter,
  vocationsChapter,
  equipmentChapter, // Add import
  // ... other imports
} from './chapters/index';

export const chaptersData: Chapter[] = [
  kinshipsChapter,
  vocationsChapter,
  equipmentChapter, // Add to array
  // ... other chapters
];
```

**Done!** Your new chapter will appear in the sidebar automatically.

---

### 2. Adding Sub-Chapters to Existing Chapter

Edit the relevant chapter file (e.g., `src/data/chapters/kinships.ts`):

```typescript
subChapters: [
  // ... existing sub-chapters
  {
    id: 'halflings',
    title: 'Halflings',
    content: `
# Halflings

**Ability Score Increase:** +2 Dexterity, +1 Charisma

## Traits
- Lucky: Reroll 1s on d20
- Brave: Advantage vs. being frightened
- Halfling Nimbleness: Move through larger creatures

## Description
Small but resilient folk who value comfort and community...
    `
  }
]
```

---

### 3. Editing Existing Content

Simply find the chapter file and edit the content:

```typescript
// src/data/chapters/spells.ts
content: `
# Sorcery & Spells

Updated description here...

## New Section
Added content...
`
```

All content uses **Markdown** syntax for formatting.

---

### 4. Changing Chapter Order

Reorder entries in `src/data/chapters.ts`:

```typescript
export const chaptersData: Chapter[] = [
  mechanicsChapter,    // Now first
  kinshipsChapter,     // Now second
  vocationsChapter,
  spellsChapter,
  bestiaryChapter,
];
```

---

### 5. Customizing Icons

Change the `icon` property (supports emoji):

```typescript
{
  icon: '🗡️',  // Sword
  icon: '📖',  // Book
  icon: '🏰',  // Castle
  icon: '🐉',  // Dragon
  icon: '✨',  // Sparkles
  // ... any emoji
}
```

---

## 📝 Markdown Formatting Tips

### Headings
```markdown
# Level 1 Heading
## Level 2 Heading
### Level 3 Heading
```

### Emphasis
```markdown
**Bold text**
*Italic text*
***Bold and italic***
```

### Lists
```markdown
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item
```

### Code
```markdown
Inline `code` here

\`\`\`typescript
// Code block
const example = "code";
\`\`\`
```

### Separators
```markdown
---
Horizontal rule above
```

### Tables
```markdown
| Weapon  | Damage | Type     |
|---------|--------|----------|
| Longsword | 1d8  | Slashing |
| Dagger  | 1d4    | Piercing |
```

---

## 🎨 Styling Guidelines

### For Game Statistics
Use bold for stat names and values:

```markdown
**Armor Class:** 15  
**Hit Points:** 45 (6d8 + 18)  
**Speed:** 30 ft.
```

### For Ability Descriptions
Use consistent formatting:

```markdown
### Ability Name
**Level:** 3rd  
**Casting Time:** 1 action  
**Range:** 60 feet

Description of the ability...
```

### For Monster Stats
Follow the stat block format:

```markdown
## Monster Name
**Armor Class:** 13  
**Hit Points:** 22 (4d8 + 4)

**STR** 14 (+2) | **DEX** 12 (+1) | **CON** 13 (+1)

### Actions
**Attack.** *Melee Weapon Attack:* +4 to hit...
```

---

## 🔍 File Locations Quick Reference

| What you want to do | File to edit |
|---------------------|--------------|
| Add new chapter | Create `src/data/chapters/name.ts` |
| Edit chapter content | `src/data/chapters/{chapter-name}.ts` |
| Change chapter order | `src/data/chapters.ts` |
| Modify UI components | `src/components/*.tsx` |
| Change styles | `src/index.css` |
| Update types | `src/types/index.ts` |
| Modify markdown export | `src/utils/markdownGenerator.ts` |

---

## 🐛 Troubleshooting

### Build Errors

**TypeScript errors:**
- Make sure all Chapter objects have required fields: `id`, `title`, `subtitle`, `icon`, `content`
- Check imports match exports
- Verify types match `src/types/index.ts`

**Missing content:**
- Verify chapter is exported from `src/data/chapters/index.ts`
- Verify chapter is imported and added to array in `src/data/chapters.ts`

### UI Issues

**Chapter not appearing:**
```bash
# Clear cache and rebuild
rm -rf node_modules/.vite
npm run dev
```

**Styles not applying:**
```bash
# Rebuild Tailwind
npm run build
```

---

## 📚 Additional Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 💡 Pro Tips

1. **Preview as you write**: Keep `npm run dev` running to see live changes
2. **Use markdown preview**: Most code editors have markdown preview plugins
3. **Copy existing patterns**: Look at existing chapters for formatting examples
4. **Test the build**: Run `npm run build` before committing changes
5. **Keep it organized**: One chapter per file, logical sub-chapter grouping
