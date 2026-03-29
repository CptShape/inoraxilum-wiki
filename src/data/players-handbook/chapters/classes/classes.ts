import { Chapter } from '../../../../types';

import { classBard } from './bard';
import { classDruid } from './druid';
import { classMagicSource } from './magic-source';

export const classesChapter: Chapter = {
  id: 'classes',
  title: 'Classes',
  subtitle: 'The Paths of Power',
  icon: '⚔️',
  content: 'src/data/players-handbook/chapters/classes/classes.md',
  subChapters: [classBard, classDruid, classMagicSource],
};

export { classBard, classDruid, classMagicSource };
