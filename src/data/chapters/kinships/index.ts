import { Chapter } from '../../../types';
import { elvesChapter } from './elves';
import { mountainDwarves } from './mountain-dwarves';
import { humans } from './humans';
import { dragonbornChapter } from './dragonborn';

export const kinshipsChapter: Chapter = {
  id: 'kinships',
  title: 'Kinships',
  subtitle: 'Races of the Realm',
  icon: '⚔️',
  content: `# Kinships of the Realm

The world is home to many ancient races, each with their own heritage and destiny. Choose your kinship wisely, for it shapes not only your physical form but your very soul.

## Available Kinships
- **Elves** (with sub-races: High Elves, Wood Elves, Dark Elves)
  - *High Elves* (with subtypes: Sun Elves, Moon Elves)
- Mountain Dwarves
- Humans

Each kinship grants unique abilities and cultural traditions passed down through the ages.`,
  subChapters: [elvesChapter, mountainDwarves, humans, dragonbornChapter],
};

// Also export individual sub-chapters for direct access
export { elvesChapter, mountainDwarves, humans, dragonbornChapter };
