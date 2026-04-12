import YAML from 'yaml';
import { ParsedMarkdownContent, TimelineFrontmatter } from '../types';

export const parseMarkdownContent = (text: string): ParsedMarkdownContent => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = text.match(frontmatterRegex);
  
  if (!match) {
    return {
      frontmatter: {},
      body: text,
    };
  }
  
  const yamlContent = match[1];
  const body = match[2];
  
  try {
    const frontmatter = YAML.parse(yamlContent) as Record<string, unknown>;
    return { 
      frontmatter: frontmatter ?? {}, 
      body 
    };
  } catch {
    return { frontmatter: {}, body };
  }
};

export const isTimelineFrontmatter = (
  frontmatter: Record<string, unknown>
): boolean => {
  if (frontmatter.pageType === 'timeline') return true;
  if (frontmatter.timeline === true) return true;
  return false;
};

export const getTimelineConfig = (
  frontmatter: Record<string, unknown>
): TimelineFrontmatter | null => {
  if (!isTimelineFrontmatter(frontmatter)) return null;

  const endYear = typeof frontmatter.endYear === 'number' ? frontmatter.endYear : null;
  const events = Array.isArray(frontmatter.events) ? frontmatter.events : null;

  if (endYear === null || !events) return null;

  return {
    pageType: 'timeline',
    timeline: true,
    startYear: typeof frontmatter.startYear === 'number' ? frontmatter.startYear : 0,
    endYear,
    scale: typeof frontmatter.scale === 'number' ? frontmatter.scale : 10,
    events: events as TimelineFrontmatter['events'],
    ranges: Array.isArray(frontmatter.ranges)
      ? (frontmatter.ranges as TimelineFrontmatter['ranges'])
      : [],
  };
};
