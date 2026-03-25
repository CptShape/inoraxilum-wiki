import React from 'react';
import { Chapter } from '../types';
import { generateMarkdown } from '../utils/markdownGenerator';

interface MarkdownViewProps {
  chapters: Chapter[];
  onBack: () => void;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({ chapters, onBack }) => {
  const markdown = generateMarkdown(chapters);

  return (
    <div className="flex-1 flex flex-col bg-stone-900">
      <div className="p-4 bg-stone-800 border-b-2 border-amber-800 flex justify-between items-center">
        <h2 className="text-2xl text-amber-400" style={{ fontFamily: "'Cinzel', serif" }}>
          Markdown Output
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-amber-800/30 border border-amber-700 text-amber-200 rounded hover:bg-amber-800/50 transition-colors"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Back to Chapters
        </button>
      </div>
      
      <div className="flex-1 overflow-hidden flex">
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <pre className="bg-stone-800 p-6 rounded-lg border border-amber-800 text-amber-100 text-sm overflow-x-auto whitespace-pre-wrap font-mono">
              {markdown}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};