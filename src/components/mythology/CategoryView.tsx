import { God } from '../../types/mythology';

interface CategoryViewProps {
  gods: God[];
  onGodClick: (god: God) => void;
}

export default function CategoryView({ gods, onGodClick }: CategoryViewProps) {
  // Group by alignment
  const byAlignment = new Map<string, God[]>();
  gods.forEach((g) => {
    const key = g.alignment;
    if (!byAlignment.has(key)) byAlignment.set(key, []);
    byAlignment.get(key)!.push(g);
  });

  // Group by domain
  const byDomain = new Map<string, God[]>();
  gods.forEach((g) => {
    g.domains.forEach((d) => {
      if (!byDomain.has(d)) byDomain.set(d, []);
      byDomain.get(d)!.push(g);
    });
  });

  const alignmentOrder = [
    'Lawful Good', 'Neutral Good', 'Chaotic Good',
    'Lawful Neutral', 'Neutral', 'Chaotic Neutral',
    'Lawful Evil', 'Neutral Evil', 'Chaotic Evil',
  ];

  const sortedAlignments = alignmentOrder.filter((a) => byAlignment.has(a));

  const alignmentColors: Record<string, string> = {
    'Lawful Good': 'border-amber-500/30 bg-amber-950/20',
    'Neutral Good': 'border-emerald-500/30 bg-emerald-950/20',
    'Chaotic Good': 'border-sky-500/30 bg-sky-950/20',
    'Lawful Neutral': 'border-gray-500/30 bg-gray-950/20',
    'Neutral': 'border-stone-500/30 bg-stone-950/20',
    'Chaotic Neutral': 'border-orange-500/30 bg-orange-950/20',
    'Lawful Evil': 'border-red-700/30 bg-red-950/20',
    'Neutral Evil': 'border-purple-700/30 bg-purple-950/20',
    'Chaotic Evil': 'border-red-800/30 bg-red-950/20',
  };

  return (
    <div className="space-y-8">
      {/* By Alignment */}
      <section>
        <h3 className="text-lg font-bold text-amber-200 mb-4 flex items-center gap-2">
          <span className="text-amber-400">⚖</span> By Alignment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAlignments.map((alignment) => (
            <div
              key={alignment}
              className={`rounded-lg border ${alignmentColors[alignment] || 'border-gray-500/30 bg-gray-950/20'} p-4`}
            >
              <h4 className="text-sm font-bold text-amber-100 mb-3 uppercase tracking-wider">
                {alignment}
              </h4>
              <div className="space-y-2">
                {byAlignment.get(alignment)!.map((god) => (
                  <button
                    key={god.id}
                    onClick={() => onGodClick(god)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg bg-black/20 hover:bg-black/40 transition-colors cursor-pointer text-left group"
                  >
                    <span className="text-xl">{god.symbol}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-amber-100 group-hover:text-amber-50 transition-colors truncate">
                        {god.name}
                      </p>
                      <p className="text-xs text-purple-300 italic truncate">
                        {god.mainTitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* By Domain */}
      <section>
        <h3 className="text-lg font-bold text-amber-200 mb-4 flex items-center gap-2">
          <span className="text-purple-400">✦</span> By Domain
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from(byDomain.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([domain, domainGods]) => (
              <div
                key={domain}
                className="rounded-lg border border-purple-500/20 bg-purple-950/10 p-4"
              >
                <h4 className="text-sm font-bold text-purple-200 mb-3 uppercase tracking-wider">
                  {domain}
                </h4>
                <div className="space-y-2">
                  {domainGods.map((god) => (
                    <button
                      key={god.id}
                      onClick={() => onGodClick(god)}
                      className="w-full flex items-center gap-3 p-2 rounded-lg bg-black/20 hover:bg-black/40 transition-colors cursor-pointer text-left group"
                    >
                      <span className="text-xl">{god.symbol}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-amber-100 group-hover:text-amber-50 transition-colors truncate">
                          {god.name}
                        </p>
                        <p className="text-xs text-purple-300 italic truncate">
                          {god.mainTitle}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
