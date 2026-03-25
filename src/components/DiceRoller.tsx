import React, { useState } from 'react';

const DiceRoller: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);

  const rollDice = (sides: number) => {
    setRolling(true);
    setTimeout(() => {
      const rollResult = Math.floor(Math.random() * sides) + 1;
      setResult(rollResult);
      setRolling(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-stone-900/90 border-2 border-amber-700 rounded-lg p-4 shadow-2xl backdrop-blur-sm z-50">
      <h3 className="text-amber-400 text-center mb-3 font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
        Dice Roller
      </h3>
      
      <div className="flex gap-2 mb-3">
        <button 
          onClick={() => rollDice(4)} 
          className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 border border-amber-600 text-amber-200 rounded-lg font-bold hover:from-amber-600 hover:to-amber-800 transform hover:scale-110 transition-all duration-150 shadow-lg hover:shadow-amber-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={rolling}
        >
          D4
        </button>
        <button 
          onClick={() => rollDice(6)} 
          className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 border border-amber-600 text-amber-200 rounded-lg font-bold hover:from-amber-600 hover:to-amber-800 transform hover:scale-110 transition-all duration-150 shadow-lg hover:shadow-amber-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={rolling}
        >
          D6
        </button>
        <button 
          onClick={() => rollDice(8)} 
          className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 border border-amber-600 text-amber-200 rounded-lg font-bold hover:from-amber-600 hover:to-amber-800 transform hover:scale-110 transition-all duration-150 shadow-lg hover:shadow-amber-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={rolling}
        >
          D8
        </button>
        <button 
          onClick={() => rollDice(10)} 
          className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 border border-amber-600 text-amber-200 rounded-lg font-bold hover:from-amber-600 hover:to-amber-800 transform hover:scale-110 transition-all duration-150 shadow-lg hover:shadow-amber-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={rolling}
        >
          D10
        </button>
        <button 
          onClick={() => rollDice(12)} 
          className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 border border-amber-600 text-amber-200 rounded-lg font-bold hover:from-amber-600 hover:to-amber-800 transform hover:scale-110 transition-all duration-150 shadow-lg hover:shadow-amber-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={rolling}
        >
          D12
        </button>
        <button 
          onClick={() => rollDice(20)} 
          className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 border border-amber-600 text-amber-200 rounded-lg font-bold hover:from-amber-600 hover:to-amber-800 transform hover:scale-110 transition-all duration-150 shadow-lg hover:shadow-amber-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={rolling}
        >
          D20
        </button>
      </div>
      
      <div className="text-center">
        {rolling ? (
          <div className="animate-spin text-amber-400 text-2xl">⚂</div>
        ) : (
          <div className="text-amber-200 text-lg font-bold min-h-8 flex items-center justify-center">
            {result !== null ? (
              <span className={result === 20 ? 'text-green-400' : result === 1 ? 'text-red-400' : ''}>
                Result: {result}
              </span>
            ) : (
              <span className="text-amber-600 italic text-sm">Roll the dice!</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiceRoller;
