// Recursive Chapter interface for infinite nesting
export interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  content: string;
  subChapters?: Chapter[]; // Recursive - sub-chapters are also Chapter type
}

export type ViewMode = 'chapters' | 'markdown';
