import { useEffect, useState } from 'react';
import { God, MythologyViewMode } from '../../types/mythology';
import GodCard from './GodCard';
import FamilyTreeView from './FamilyTreeView';
import CategoryView from './CategoryView';
import GodProfilePage from './GodProfilePage';

interface MythologyHubProps {
  gods: God[];
  /** Optional god ID from URL hash (e.g. #mythology/zeus → "zeus") */
  initialGodId?: string;
  /** Called when a god is selected/deselected so the parent can update the URL hash */
  onGodNavigate?: (godId: string | null) => void;
}

const viewModes: { id: MythologyViewMode; label: string; icon: string }[] = [
  { id: 'grid', label: 'Pantheon Grid', icon: '⊞' },
  { id: 'category', label: 'By Category', icon: '📂' },
];

export default function MythologyHub({ gods, initialGodId, onGodNavigate }: MythologyHubProps) {
  const [viewMode, setViewMode] = useState<MythologyViewMode>('grid');
  const [selectedGod, setSelectedGod] = useState<God | null>(null);

  // Auto-select god from URL hash on mount or when initialGodId changes
  useEffect(() => {
    if (initialGodId) {
      const god = gods.find(g => g.id === initialGodId);
      if (god) {
        setSelectedGod(god);
      }
    } else {
      setSelectedGod(null);
    }
  }, [initialGodId, gods]);

  const handleGodClick = (god: God) => {
    setSelectedGod(god);
    onGodNavigate?.(god.id);
  };

  const handleBack = () => {
    setSelectedGod(null);
    onGodNavigate?.(null);
  };

  // If a god is selected, show their profile
  if (selectedGod) {
    return (
      <GodProfilePage
        god={selectedGod}
        allGods={gods}
        onGodClick={handleGodClick}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-100 mb-2">
            ✦ The Divine Pantheon ✦
          </h1>
          <p className="text-lg text-purple-300 italic">
            Gods, their domains, and the cosmic order they maintain
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span className="w-8 h-px bg-purple-500/30" />
            <span>{gods.length} Deities Recorded</span>
            <span className="w-8 h-px bg-purple-500/30" />
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl border border-purple-500/30 bg-purple-950/20 p-1 gap-1">
            {viewModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
                  ${
                    viewMode === mode.id
                      ? 'bg-purple-600/30 text-amber-100 border border-purple-500/40 shadow-lg'
                      : 'text-gray-400 hover:text-purple-200 hover:bg-purple-900/20'
                  }
                `}
              >
                <span>{mode.icon}</span>
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* View Content */}
        <div className="min-h-[400px]">
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gods.map((god) => (
                <GodCard
                  key={god.id}
                  god={god}
                  onClick={handleGodClick}
                  size="lg"
                />
              ))}
            </div>
          )}

          {viewMode === 'category' && (
            <CategoryView gods={gods} onGodClick={handleGodClick} />
          )}
        </div>
      </div>
    </div>
  );
}
