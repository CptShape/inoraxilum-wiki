import { Chapter } from '../../../types';
import { mythologyChapter } from '../mythology/mythology';

export const worldbuildingHandbookCodex: Chapter = {
  id: 'worldbuilding-handbook-codex',
  title: 'Worldbuilding Handbook',
  subtitle: '???',
  icon: '⚔️',
  content: 'src/data/worldbuilding-handbook/chapters/worldbuilding-handbook-chapters.md',
  subChapters: [mythologyChapter],
};

export { mythologyChapter };
