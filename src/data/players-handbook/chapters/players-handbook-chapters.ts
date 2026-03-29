import { Chapter } from '../../../types';

import { classesChapter } from './classes/classes';
import { descriptionChapter } from './description/description';
import { generalRulesChapter } from './general-rules/general-rules';
import { racesChapter } from './races/races';

export const playersHandbookCodex: Chapter = {
  id: 'players-handbook-codex',
  title: 'Player\'s Handbook',
  subtitle: '???',
  icon: '⚔️',
  content: 'src/data/players-handbook/chapters/players-handbook-chapters.md',
  subChapters: [classesChapter, racesChapter, descriptionChapter, generalRulesChapter],
};

export { classesChapter, racesChapter, descriptionChapter, generalRulesChapter };
