// Main chapters index - imports from chapter folders/files

// Chapters with sub-chapters (folder structure)
export { kinshipsChapter } from './kinships';
export { vocationsChapter } from './vocations';
export { spellsChapter } from './spells';
export { bestiaryChapter } from './bestiary';

// Chapters without sub-chapters (single files)
export { mechanicsChapter } from './mechanics';

// Re-export sub-chapters for direct access if needed
export * from './kinships';
export * from './vocations';
export * from './spells';
export * from './bestiary';
