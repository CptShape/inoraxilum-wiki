import { Chapter } from '../types';

import { playersHandbookCodex } from './players-handbook/chapters/players-handbook-chapters';
import { styleChapter } from './styles/styles';
import { chronicleChapter } from './worldbuilding-handbook/chapters/history/history';
import { worldbuildingHandbookCodex } from './worldbuilding-handbook/chapters/worldbuilding-handbook-chapters';
import { pleiadasSistersChapter } from './worldbuilding-handbook/chapters/history/asd/pleiadas-sisters';

// Export all chapters as an array for the application
export const chapters: Chapter[] = [
  playersHandbookCodex,
  worldbuildingHandbookCodex,
  chronicleChapter,
  styleChapter,
  pleiadasSistersChapter
];

export const allChapters: Chapter[] = [
  playersHandbookCodex,
  worldbuildingHandbookCodex,
  chronicleChapter,
  styleChapter,
  pleiadasSistersChapter
];

// Also export individual chapters for direct access
export {
  playersHandbookCodex,
  worldbuildingHandbookCodex,
  chronicleChapter,
  styleChapter,
  pleiadasSistersChapter
};
