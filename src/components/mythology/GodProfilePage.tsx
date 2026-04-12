import { useRef, useCallback } from 'react';
import { God } from '../../types/mythology';
import MarkdownRenderer from '../MarkdownRenderer';

interface GodProfilePageProps {
  god: God;
  allGods: God[];
  onGodClick: (god: God) => void;
  onBack: () => void;
}

export default function GodProfilePage({ god, allGods, onGodClick, onBack }: GodProfilePageProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Resolve parent/child god objects while preserving non-god references
  const parentLinks = god.parents.map((parent) => ({
    relationship: parent,
    god: parent.id ? allGods.find((g) => g.id === parent.id) : undefined,
  }));

  const childLinks = god.children.map((child) => ({
    relationship: child,
    god: child.id ? allGods.find((g) => g.id === child.id) : undefined,
  }));

  const handleGodLink = useCallback(
    (linkedGod: God) => {
      onGodClick(linkedGod);
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [onGodClick]
  );

  const alignmentColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    'Lawful Good': { bg: 'from-amber-900/30 to-yellow-900/20', border: 'border-amber-500/40', text: 'text-amber-300', glow: 'shadow-amber-500/20' },
    'Neutral Good': { bg: 'from-emerald-900/30 to-green-900/20', border: 'border-emerald-500/40', text: 'text-emerald-300', glow: 'shadow-emerald-500/20' },
    'Chaotic Good': { bg: 'from-sky-900/30 to-blue-900/20', border: 'border-sky-500/40', text: 'text-sky-300', glow: 'shadow-sky-500/20' },
    'Lawful Neutral': { bg: 'from-gray-900/30 to-slate-900/20', border: 'border-gray-500/40', text: 'text-gray-300', glow: 'shadow-gray-500/20' },
    'Neutral': { bg: 'from-stone-900/30 to-zinc-900/20', border: 'border-stone-500/40', text: 'text-stone-300', glow: 'shadow-stone-500/20' },
    'Chaotic Neutral': { bg: 'from-orange-900/30 to-red-900/20', border: 'border-orange-500/40', text: 'text-orange-300', glow: 'shadow-orange-500/20' },
    'Lawful Evil': { bg: 'from-red-950/30 to-red-900/20', border: 'border-red-700/40', text: 'text-red-400', glow: 'shadow-red-700/20' },
    'Neutral Evil': { bg: 'from-purple-950/30 to-purple-900/20', border: 'border-purple-700/40', text: 'text-purple-400', glow: 'shadow-purple-700/20' },
    'Chaotic Evil': { bg: 'from-red-950/30 to-orange-900/20', border: 'border-red-800/40', text: 'text-red-500', glow: 'shadow-red-800/20' },
  };

  const colors = alignmentColors[god.alignment] || alignmentColors['Neutral'];

  return (
    <div ref={contentRef} className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-purple-300 hover:text-purple-100 transition-colors cursor-pointer"
        >
          <span>←</span> Back to Pantheon
        </button>

        {/* Hero Section */}
        <div className={`relative rounded-2xl border-2 ${colors.border} bg-gradient-to-br ${colors.bg} p-8 mb-8 shadow-xl ${colors.glow}`}>
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-500/40 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-500/40 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-500/40 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-500/40 rounded-br-2xl" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Symbol */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-black/40 border-2 border-amber-500/30 flex items-center justify-center text-5xl shadow-lg">
                {god.symbol}
              </div>
            </div>

            {/* Name & Titles */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-amber-100 mb-1">
                {god.name}
              </h1>
              <p className="text-xl text-purple-300 italic mb-3">{god.mainTitle}</p>

              {/* Alignment */}
              <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full border ${colors.text} ${colors.border} bg-black/30`}>
                {god.alignment}
              </span>

              {/* Aliases */}
              {god.aliases.length > 0 && (
                <p className="text-sm text-gray-400 mt-2">
                  Also known as: {god.aliases.join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Domains */}
          <div className="rounded-xl border border-purple-500/20 bg-purple-950/10 p-5">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-3">
              ✦ Domains
            </h3>
            <div className="flex flex-wrap gap-2">
              {god.domains.map((domain) => (
                <span
                  key={domain}
                  className="px-3 py-1 rounded-full bg-purple-900/30 text-purple-200 border border-purple-700/30 text-sm"
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>

          {/* Worshipers */}
          <div className="rounded-xl border border-purple-500/20 bg-purple-950/10 p-5">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-3">
              ✦ Worshipers
            </h3>
            <p className="text-amber-100">{god.worshipers}</p>
          </div>

          {/* Manifestations */}
          <div className="rounded-xl border border-purple-500/20 bg-purple-950/10 p-5">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-3">
              ✦ Manifestations
            </h3>
            <div className="space-y-2 text-sm">
              {god.manifestation.animal && (
                <p className="text-amber-100">
                  <span className="text-gray-400">Animal:</span> {god.manifestation.animal}
                </p>
              )}
              {god.manifestation.monster && (
                <p className="text-amber-100">
                  <span className="text-gray-400">Monster:</span> {god.manifestation.monster}
                </p>
              )}
              {god.manifestation.colors && god.manifestation.colors.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Colors:</span>
                  <div className="flex gap-1.5">
                    {god.manifestation.colors.map((color) => (
                      <span
                        key={color}
                        className="text-xs px-2 py-0.5 rounded-full bg-black/30 text-gray-300 border border-gray-600/30"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Symbol */}
          <div className="rounded-xl border border-purple-500/20 bg-purple-950/10 p-5">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-3">
              ✦ Holy Symbol
            </h3>
            <p className="text-amber-100">{god.symbol}</p>
          </div>
        </div>

        {/* Custom Fields */}
        {god.customFields && god.customFields.length > 0 && (
          <div className="rounded-xl border border-purple-500/20 bg-purple-950/10 p-5 mb-8">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-3">
              ✦ Sacred Lore
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {god.customFields.map((field) => (
                <div key={field.key} className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">{field.label}:</span>
                  <span className="text-amber-100 text-sm font-medium">
                    {Array.isArray(field.value) ? field.value.join(', ') : String(field.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Relationships */}
        {(parentLinks.length > 0 || childLinks.length > 0) && (
          <div className="rounded-xl border border-purple-500/20 bg-purple-950/10 p-5 mb-8">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-4">
              ✦ Divine Lineage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Parents */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Parents
                </h4>
                {parentLinks.length > 0 ? (
                  <div className="space-y-2">
                    {parentLinks.map(({ relationship, god: parent }) => (
                      parent ? (
                        <button
                          key={relationship.id}
                          onClick={() => handleGodLink(parent)}
                          className="w-full flex items-center gap-3 p-2 rounded-lg bg-black/20 hover:bg-black/40 transition-colors cursor-pointer text-left group"
                        >
                          <span className="text-xl">{parent.symbol}</span>
                          <div>
                            <p className="text-sm font-semibold text-amber-100 group-hover:text-amber-50 transition-colors">
                              {parent.name}
                            </p>
                            <p className="text-xs text-purple-300 italic">{parent.mainTitle}</p>
                          </div>
                        </button>
                      ) : (
                        <div
                          key={relationship.label ?? relationship.id}
                          className="w-full flex items-center gap-3 p-2 rounded-lg bg-black/10 border border-white/5 text-left"
                        >
                          <span className="text-xl opacity-70">◌</span>
                          <div>
                            <p className="text-sm font-semibold text-amber-100/80">{relationship.label ?? relationship.id}</p>
                            <p className="text-xs text-gray-500 italic">Mortal or unnamed ancestor</p>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">Primordial — no known parent</p>
                )}
              </div>

              {/* Children */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Children
                </h4>
                {childLinks.length > 0 ? (
                  <div className="space-y-2">
                    {childLinks.map(({ relationship, god: child }) => (
                      child ? (
                        <button
                          key={relationship.id}
                          onClick={() => handleGodLink(child)}
                          className="w-full flex items-center gap-3 p-2 rounded-lg bg-black/20 hover:bg-black/40 transition-colors cursor-pointer text-left group"
                        >
                          <span className="text-xl">{child.symbol}</span>
                          <div>
                            <p className="text-sm font-semibold text-amber-100 group-hover:text-amber-50 transition-colors">
                              {child.name}
                            </p>
                            <p className="text-xs text-purple-300 italic">{child.mainTitle}</p>
                          </div>
                        </button>
                      ) : (
                        <div
                          key={relationship.label ?? relationship.id}
                          className="w-full flex items-center gap-3 p-2 rounded-lg bg-black/10 border border-white/5 text-left"
                        >
                          <span className="text-xl opacity-70">◌</span>
                          <div>
                            <p className="text-sm font-semibold text-amber-100/80">{relationship.label ?? relationship.id}</p>
                            <p className="text-xs text-gray-500 italic">Unknown descendant</p>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No known divine offspring</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Markdown Description */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-950/10 p-6">
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4">
            ✦ Sacred Texts
          </h3>
          <MarkdownRenderer
            path={god.descriptionFile}
            onCrossChapterLink={() => {}}
            allChapters={[]}
            onChapterSelect={() => {}}
          />
        </div>

        {/* Other Titles */}
        {god.titles.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              {god.titles.join(' • ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
