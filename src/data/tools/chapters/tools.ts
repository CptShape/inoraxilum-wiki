import { Chapter } from '../../../types';
import { battleTrackerChapter } from './battle-tracker';
import { diceMacrosChapter } from './dice-macros';
import { messageSenderChapter } from './message-sender';

export const toolsChapter: Chapter = {
  id: 'tools',
  title: 'Tools',
  subtitle: 'Instruments and Utilities for the Game Master',
  icon: '🛠️',
  content: 'src/data/tools/chapters/tools.md',
  subChapters: [battleTrackerChapter, diceMacrosChapter, messageSenderChapter],
};

export { battleTrackerChapter, diceMacrosChapter, messageSenderChapter };
