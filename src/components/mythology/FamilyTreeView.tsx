import { God } from '../../types/mythology';

interface FamilyTreeViewProps {
  gods: God[];
  onGodClick: (god: God) => void;
}

interface TreeNode {
  god: God;
  children: TreeNode[];
  label?: string;
}

function buildGreekFamilyTree(gods: God[]): TreeNode[] {
  const godMap = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  // Create nodes for all gods
  gods.forEach((god) => {
    godMap.set(god.id, { god, children: [] });
  });

  // Special handling for "A Human" parents
  const humanNode: TreeNode = {
    god: {
      id: 'mortal-human',
      name: 'A Human',
      mainTitle: 'Mortal Parent',
      titles: [],
      aliases: [],
      alignment: 'Neutral',
      symbol: '👤',
      domains: [],
      worshipers: '',
      manifestation: { animal: '', monster: '', colors: [] },
      parents: [],
      children: [],
      descriptionFile: '',
      customFields: []
    },
    children: []
  };
  godMap.set('mortal-human', humanNode);

  // Link children to parents
  gods.forEach((god) => {
    const node = godMap.get(god.id)!;
    god.parents.forEach((parentRef) => {
      const parentNode = godMap.get(parentRef.id);
      if (parentNode) {
        // Avoid duplicates
        if (!parentNode.children.some(c => c.god.id === god.id)) {
          parentNode.children.push(node);
        }
      }
    });
  });

  // Find the main roots for Greek pantheon (Zeus first, then the other primordials)
  const rootOrder = ['zeus', 'poseidon', 'hades', 'hera', 'demeter', 'leto'];
  
  rootOrder.forEach(rootId => {
    const node = godMap.get(rootId);
    if (node && !roots.includes(node)) {
      roots.push(node);
    }
  });

  return roots;
}

function TreeNodeComponent({
  node,
  onGodClick,
  depth = 0,
  isHuman = false,
}: {
  node: TreeNode;
  onGodClick: (god: God) => void;
  depth: number;
  isHuman?: boolean;
}) {
  const { god, children } = node;
  const hasChildren = children.length > 0;

  const alignmentColors: Record<string, string> = {
    'Lawful Good': 'border-amber-500/50 bg-amber-900/20',
    'Neutral Good': 'border-emerald-500/50 bg-emerald-900/20',
    'Chaotic Good': 'border-sky-500/50 bg-sky-900/20',
    'Lawful Neutral': 'border-gray-500/50 bg-gray-900/20',
    'Neutral': 'border-stone-500/50 bg-stone-900/20',
    'Chaotic Neutral': 'border-orange-500/50 bg-orange-900/20',
    'Lawful Evil': 'border-red-700/50 bg-red-950/20',
    'Neutral Evil': 'border-purple-700/50 bg-purple-950/20',
    'Chaotic Evil': 'border-red-800/50 bg-red-950/20',
  };

  const borderColor = alignmentColors[god.alignment] || 'border-gray-500/50 bg-gray-900/20';

  return (
    <div className="flex flex-col items-center">
      {/* God Card */}
      <div className="flex flex-col items-center mb-3">
        <button
          onClick={() => onGodClick(god)}
          className={`
            group relative px-5 py-4 rounded-2xl border-2 ${borderColor} min-w-[140px]
            transition-all duration-300 cursor-pointer shadow-xl
            hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1
            focus:outline-none focus:ring-2 focus:ring-purple-400
            ${isHuman ? 'opacity-75 border-dashed' : ''}
          `}
        >
          <div className="text-center">
            <span className="text-4xl block mb-2 transition-transform group-hover:scale-110">
              {god.symbol}
            </span>
            <p className="font-bold text-amber-100 text-base leading-tight">{god.name}</p>
            <p className="text-xs text-purple-300 italic mt-1 leading-tight">{god.mainTitle}</p>
            {!isHuman && (
              <p className="text-[10px] text-gray-400 mt-2 tracking-widest">{god.alignment}</p>
            )}
          </div>
        </button>
      </div>

      {/* Children */}
      {hasChildren && (
        <div className="flex flex-col items-center pt-2">
          {/* Vertical connector from parent */}
          <div className="w-0.5 h-8 bg-gradient-to-b from-purple-400 to-transparent" />
          
          {/* Horizontal connector bar for multiple children */}
          <div className="flex items-center gap-8 relative">
            {/* Horizontal line */}
            <div className="absolute h-0.5 bg-purple-500/40 -top-4 left-4 right-4" />
            
            {children.map((child) => (
              <div key={child.god.id} className="flex flex-col items-center relative">
                {/* Vertical connector to child */}
                <div className="w-0.5 h-8 bg-gradient-to-b from-purple-400 to-purple-600" />
                <TreeNodeComponent
                  node={child}
                  onGodClick={onGodClick}
                  depth={depth + 1}
                  isHuman={child.god.id === 'mortal-human'}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FamilyTreeView({ gods, onGodClick }: FamilyTreeViewProps) {
  const tree = buildGreekFamilyTree(gods);

  return (
    <div className="overflow-x-auto pb-8">
      <div className="min-w-[1200px] mx-auto">
        <div className="flex flex-col items-center gap-8">
          {/* Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 bg-black/60 border border-amber-500/30 px-8 py-3 rounded-2xl">
              <span className="text-4xl">🏛️</span>
              <div>
                <h2 className="text-3xl font-bold text-amber-100 tracking-wider">THE OLYMPIAN FAMILY</h2>
                <p className="text-purple-300 text-sm">Divine Lineage of the Greek Pantheon</p>
              </div>
            </div>
          </div>

          {/* Main Tree Container */}
          <div className="flex gap-16 justify-center items-start pt-4">
            {tree.map((root) => (
              <TreeNodeComponent
                key={root.god.id}
                node={root}
                onGodClick={onGodClick}
                depth={0}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-12 text-xs text-gray-400 flex items-center gap-8 bg-black/40 px-8 py-3 rounded-xl border border-purple-500/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <span>Primordial Gods</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <span>Olympians</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              <span>Younger Gods</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="opacity-50">───</span>
              <span>Divine Bloodline</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
