import { Chapter } from '../../../../types';
import { elementalDragonborn } from './elemental-dragonbord';

export const dragonbornChapter: Chapter = {
  id: "dragonborn",
  title: "Dragonborn",
  subChapters: [
    elementalDragonborn
  ],
  content: `# Kinships of the Realm

The world is home to many ancient races, each with their own heritage and destiny. Choose your kinship wisely, for it shapes not only your physical form but your very soul.

## Available Kinships
- **Elves** (with sub-races: High Elves, Wood Elves, Dark Elves)
  - *High Elves* (with subtypes: Sun Elves, Moon Elves)
- Mountain Dwarves
- Humans

Each kinship grants unique abilities and cultural traditions passed down through the ages.`
};

// optional export
export { elementalDragonborn };