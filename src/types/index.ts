// Recursive Chapter interface for infinite nesting
export interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  // Either inline markdown text or a source-relative .md path,
  // e.g. "src/data/chapters/kinships/elves/sun-elves.md"
  // Markdown files support GitHub-flavored markdown and inline HTML.
  content: string;
  subChapters?: Chapter[]; // Recursive - sub-chapters are also Chapter type
}

export type ViewMode = 'chapters' | 'markdown';
