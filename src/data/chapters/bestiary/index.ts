import { Chapter } from '../../../types';
import { undead } from './undead';
import { dragons } from './dragons';
import { humanoids } from './humanoids';

export const bestiaryChapter: Chapter = {
  id: 'bestiary',
  title: 'Bestiary',
  subtitle: 'Creatures & Foes',
  icon: '🐉',
  content: `# Bestiary

The world teems with creatures both wondrous and terrifying. This bestiary catalogues the monsters, beasts, and adversaries that adventurers may encounter.

## Creature Types
- Undead: Risen from death
- Dragons: Ancient and powerful
- Humanoids: Civilized and savage alike

Each entry includes statistics, abilities, and tactics for the Game Master.`,
  subChapters: [undead, dragons, humanoids]
};

// Also export individual sub-chapters for direct access
export { undead, dragons, humanoids };
