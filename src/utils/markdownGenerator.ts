import { Chapter } from '../types';

const renderChapterMarkdown = (chapter: Chapter, depth: number): string => {
  const headingPrefix = '#'.repeat(Math.min(depth + 1, 6));
  let md = '';

  md += `${headingPrefix} ${chapter.title}\n\n`;
  if (chapter.subtitle) {
    md += `*${chapter.subtitle}*\n\n`;
  }
  md += `${chapter.content.trim()}\n\n`;

  if (chapter.subChapters && chapter.subChapters.length > 0) {
    chapter.subChapters.forEach((sub) => {
      md += renderChapterMarkdown(sub, depth + 1);
    });
  }

  if (depth === 0) {
    md += '\n---\n\n';
  }

  return md;
};

export const generateMarkdown = (chapters: Chapter[]): string => {
  let markdown = `# Eldritch Grimoire — Fantasy Rulebook\n\n`;
  markdown += `> *A tome of ancient knowledge, written for those who seek power beyond the mortal realm.*\n\n`;
  markdown += `---\n\n`;

  chapters.forEach((chapter) => {
    markdown += renderChapterMarkdown(chapter, 0);
  });

  return markdown;
};
