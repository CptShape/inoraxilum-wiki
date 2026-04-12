import { God } from '../../types/mythology';

interface GodCardProps {
  god: God;
  onClick: (god: God) => void;
  size?: 'sm' | 'md' | 'lg';
}

const alignmentColors: Record<string, string> = {
  'Lawful Good': 'from-amber-500/20 to-yellow-600/20 border-amber-500/40',
  'Neutral Good': 'from-emerald-500/20 to-green-600/20 border-emerald-500/40',
  'Chaotic Good': 'from-sky-500/20 to-blue-600/20 border-sky-500/40',
  'Lawful Neutral': 'from-gray-500/20 to-slate-600/20 border-gray-500/40',
  'Neutral': 'from-stone-500/20 to-zinc-600/20 border-stone-500/40',
  'Chaotic Neutral': 'from-orange-500/20 to-red-600/20 border-orange-500/40',
  'Lawful Evil': 'from-red-900/40 to-red-700/20 border-red-700/40',
  'Neutral Evil': 'from-purple-900/40 to-purple-700/20 border-purple-700/40',
  'Chaotic Evil': 'from-red-950/40 to-orange-800/20 border-red-800/40',
};

const alignmentTextColors: Record<string, string> = {
  'Lawful Good': 'text-amber-300',
  'Neutral Good': 'text-emerald-300',
  'Chaotic Good': 'text-sky-300',
  'Lawful Neutral': 'text-gray-300',
  'Neutral': 'text-stone-300',
  'Chaotic Neutral': 'text-orange-300',
  'Lawful Evil': 'text-red-400',
  'Neutral Evil': 'text-purple-400',
  'Chaotic Evil': 'text-red-500',
};

export default function GodCard({ god, onClick, size = 'md' }: GodCardProps) {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const nameSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const bgGrad = alignmentColors[god.alignment] || 'from-gray-500/20 to-gray-600/20 border-gray-500/40';
  const textColor = alignmentTextColors[god.alignment] || 'text-gray-300';

  return (
    <button
      onClick={() => onClick(god)}
      className={`
        relative w-full text-left rounded-xl border bg-gradient-to-br ${bgGrad}
        transition-all duration-300 cursor-pointer group
        hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-900/30
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900
        ${sizeClasses[size]}
      `}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-purple-500/0 group-hover:bg-purple-500/5 transition-colors duration-300" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-3 mb-2">
          <span className="text-2xl flex-shrink-0">{god.symbol}</span>
          <div className="min-w-0">
            <h3 className={`font-bold ${nameSizes[size]} text-amber-100 truncate`}>
              {god.name}
            </h3>
            <p className={`text-purple-300 ${titleSizes[size]} italic`}>
              {god.mainTitle}
            </p>
          </div>
        </div>

        {/* Alignment badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${textColor} border-current/30 bg-black/20`}>
            {god.alignment}
          </span>
        </div>

        {/* Domains */}
        {size !== 'sm' && (
          <div className="flex flex-wrap gap-1">
            {god.domains.slice(0, size === 'md' ? 3 : undefined).map((domain) => (
              <span
                key={domain}
                className="text-xs px-1.5 py-0.5 rounded bg-purple-900/40 text-purple-200 border border-purple-700/30"
              >
                {domain}
              </span>
            ))}
            {god.domains.length > 3 && size === 'md' && (
              <span className="text-xs text-purple-400">+{god.domains.length - 3}</span>
            )}
          </div>
        )}

        {/* Manifestation */}
        {size === 'lg' && god.manifestation.animal && (
          <p className="text-xs text-gray-400 mt-2">
            Manifests as: {god.manifestation.animal}
          </p>
        )}
      </div>
    </button>
  );
}
