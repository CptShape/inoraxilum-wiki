import { Chapter } from '../../../types';
import { vanguard } from './vanguard';
import { arcanist } from './arcanist';
import { stalker } from './stalker';

export const vocationsChapter: Chapter = {
  id: 'vocations',
  title: 'Vocations',
  subtitle: 'Classes & Professions',
  icon: '🛡️',
  content: `# Vocations

A character's vocation represents their calling, their path of power and expertise. Whether you swing a blade, weave arcane magic, or strike from the shadows, your vocation defines your role in the party.

## Available Vocations
- The Vanguard (Warrior)
- The Arcanist (Mage)
- The Stalker (Rogue)

Each vocation offers unique abilities, playstyles, and progression paths.`,
  subChapters: [vanguard, arcanist, stalker]
};

// Also export individual sub-chapters for direct access
export { vanguard, arcanist, stalker };
