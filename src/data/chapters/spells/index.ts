import { Chapter } from '../../../types';
import { evocation } from './evocation';
import { abjuration } from './abjuration';
import { illusion } from './illusion';

export const spellsChapter: Chapter = {
  id: 'spells',
  title: 'Sorcery & Spells',
  subtitle: 'Arcane Grimoire',
  icon: '✨',
  content: `# Sorcery & Spells

Magic permeates the world, and those who study its secrets can bend reality to their will. This chapter contains the spells available to practitioners of the arcane arts.

## Spell Schools
- Evocation: Destructive elemental magic
- Abjuration: Protective wards and barriers
- Illusion: Deception and manipulation of senses

## Casting Spells
Each spell has specific components, casting time, and effects. Consult your class to determine which spells you can learn.`,
  subChapters: [evocation, abjuration, illusion]
};

// Also export individual sub-chapters for direct access
export { evocation, abjuration, illusion };
