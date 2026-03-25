import { Chapter } from '../types';
import {
  kinshipsChapter,
  vocationsChapter,
  spellsChapter,
  bestiaryChapter,
  mechanicsChapter
} from './chapters/index';

// Export all chapters as an array for the application
export const chapters: Chapter[] = [
  kinshipsChapter,
  vocationsChapter,
  spellsChapter,
  bestiaryChapter,
  mechanicsChapter
];

// Also export individual chapters for direct access
export {
  kinshipsChapter,
  vocationsChapter,
  spellsChapter,
  bestiaryChapter,
  mechanicsChapter
};
