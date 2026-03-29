import { Chapter } from '../types';

import { playersHandbookCodex } from './players-handbook/chapters/players-handbook-chapters';

// Export all chapters as an array for the application
export const chapters: Chapter[] = [
  playersHandbookCodex
];

// Also export individual chapters for direct access
export {
  playersHandbookCodex
};
