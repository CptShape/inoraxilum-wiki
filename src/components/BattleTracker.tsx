import React, { useState } from 'react';
import { ArrowDownAZ, ArrowUpZA, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';




const STORAGE_KEYS = {
  COLUMNS: "bt_columns_v1",
  ROWS: "bt_rows_v1",
  ACTIVE_INDEX: "bt_active_index_v1",
  SORT_DESC: "bt_sort_desc_v1"
};

const safeParse = (value: string | null, fallback: any) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};




type Column = {
  id: string;
  name: string;
  isStatic?: boolean;
};

type Row = {
  id: string;
  cells: Record<string, string>;
};

export const BattleTracker: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'name', name: 'Name', isStatic: true },
    { id: 'initiative', name: 'Initiative', isStatic: true },
  ]);
  
  const [rows, setRows] = useState<Row[]>([]);
  const [sortDesc, setSortDesc] = useState(true);
  const [activeRowIndex, setActiveRowIndex] = useState(0);

  const nextTurn = () => {
    if (rows.length === 0) return;
    setActiveRowIndex((prev) => (prev + 1) % rows.length);
  };

  const addColumn = () => {
    const newColId = `col-${Date.now()}`;
    setColumns([...columns, { id: newColId, name: 'New Column' }]);
    
    // Add empty value for new column in existing rows
    setRows(rows.map(row => ({
      ...row,
      cells: { ...row.cells, [newColId]: '' }
    })));
  };

  const removeColumn = (colId: string) => {
    setColumns(columns.filter(c => c.id !== colId));
  };

  const updateColumnName = (colId: string, newName: string) => {
    setColumns(columns.map(c => c.id === colId ? { ...c, name: newName } : c));
  };

  const addRow = () => {
    const newRowId = `row-${Date.now()}`;
    const emptyCells: Record<string, string> = {};
    columns.forEach(c => {
      emptyCells[c.id] = '';
    });
    setRows([...rows, { id: newRowId, cells: emptyCells }]);
  };

  const removeRow = (rowId: string) => {
    const removedIndex = rows.findIndex((r) => r.id === rowId);
    const nextRows = rows.filter(r => r.id !== rowId);
    setRows(nextRows);

    if (nextRows.length === 0) {
      setActiveRowIndex(0);
      return;
    }

    setActiveRowIndex((prev) => {
      if (removedIndex === -1) return Math.min(prev, nextRows.length - 1);
      if (prev > removedIndex) return prev - 1;
      if (prev === removedIndex) return Math.min(prev, nextRows.length - 1);
      return prev;
    });
  };

  const moveRow = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= rows.length) return;

    const nextRows = [...rows];
    [nextRows[index], nextRows[targetIndex]] = [nextRows[targetIndex], nextRows[index]];
    setRows(nextRows);

    setActiveRowIndex((prev) => {
      if (prev === index) return targetIndex;
      if (prev === targetIndex) return index;
      return prev;
    });
  };

  const updateCell = (rowId: string, colId: string, value: string) => {
    setRows(rows.map(r => r.id === rowId ? {
      ...r,
      cells: { ...r.cells, [colId]: value }
    } : r));
  };

  const sortRows = () => {
    const sorted = [...rows].sort((a, b) => {
      const aVal = parseInt(a.cells['initiative'] || '0', 10) || 0;
      const bVal = parseInt(b.cells['initiative'] || '0', 10) || 0;
      return sortDesc ? bVal - aVal : aVal - bVal;
    });
    setRows(sorted);
    setSortDesc(!sortDesc); // Toggle for next click
    setActiveRowIndex(0); // Reset turn to top when sorting
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 
            className="text-4xl md:text-5xl font-bold text-amber-500 tracking-wider mb-2 drop-shadow-md"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Battle Tracker
          </h1>
          <p 
            className="text-amber-200/70 text-lg italic"
            style={{ fontFamily: "'IM Fell English', serif" }}
          >
            Manage your encounters, track initiative, and control the chaos of battle.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addColumn}
            className="flex items-center gap-2 px-4 py-2 bg-amber-900/50 border border-amber-700/50 rounded-md hover:bg-amber-800/60 hover:border-amber-500/80 text-amber-100 transition-all"
          >
            <Plus size={18} />
            <span>Add Column</span>
          </button>
          <button
            onClick={sortRows}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-900/50 border border-emerald-700/50 rounded-md hover:bg-emerald-800/60 hover:border-emerald-500/80 text-emerald-100 transition-all"
          >
            {sortDesc ? <ArrowDownAZ size={18} /> : <ArrowUpZA size={18} />}
            <span>Sort</span>
          </button>
          <button
            onClick={nextTurn}
            className="flex items-center gap-2 px-4 py-2 bg-blue-900/50 border border-blue-700/50 rounded-md hover:bg-blue-800/60 hover:border-blue-500/80 text-blue-100 transition-all"
          >
            <span>Next Turn</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-amber-900/50 rounded-lg bg-black/40 backdrop-blur-sm shadow-xl custom-scrollbar">
        <table className="w-full text-left border-collapse table-fixed" style={{ minWidth: `${Math.max(columns.length * 200 + 160, 900)}px` }}>
          <thead>
            <tr className="bg-amber-950/80 border-b border-amber-700/50">
              <th className="p-3 w-20 text-center text-amber-300/70" style={{ fontFamily: "'Cinzel', serif" }}>
                Turn
              </th>
              {columns.map(col => (
                <th 
                  key={col.id} 
                  className="p-3 text-amber-300 font-bold tracking-wide relative group w-[200px]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <div className="flex items-center gap-2">
                    {col.isStatic ? (
                      <span className="py-1 px-2">{col.name}</span>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={col.name}
                          onChange={(e) => updateColumnName(col.id, e.target.value)}
                          className="bg-black/30 border border-amber-900/50 rounded px-2 py-1 text-amber-200 focus:outline-none focus:border-amber-500/50 w-full"
                        />
                        <button 
                          onClick={() => removeColumn(col.id)}
                          className="text-red-400/50 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove Column"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </th>
              ))}
              <th className="p-3 w-20 text-center text-amber-300/50">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + 2} 
                  className="p-8 text-center text-amber-500/50 italic"
                  style={{ fontFamily: "'IM Fell English', serif" }}
                >
                  No combatants in the tracker. Click "Add Row" to begin.
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr 
                  key={row.id} 
                  className={`border-b border-amber-900/30 hover:bg-amber-900/20 transition-all ${index === activeRowIndex ? 'bg-amber-500/20 ring-2 ring-inset ring-amber-500/50' : (index % 2 === 0 ? 'bg-black/20' : 'bg-black/40')}`}
                >
                  <td className="p-2 align-middle">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <button
                        onClick={() => moveRow(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-amber-300/70 hover:text-amber-200 disabled:opacity-25 disabled:cursor-not-allowed"
                        title="Move row up"
                      >
                        <ChevronUp size={16} />
                      </button>

                      <button
                        onClick={() => setActiveRowIndex(index)}
                        className="group"
                        title="Set current turn"
                      >
                        <span
                          className={`block w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                            index === activeRowIndex
                              ? 'border-amber-300 bg-amber-300 shadow-[inset_0_0_10px_rgba(251,191,36,0.85),0_0_10px_rgba(251,191,36,0.65)]'
                              : 'border-amber-500/70 bg-transparent hover:border-amber-300/90'
                          }`}
                        />
                      </button>

                      <button
                        onClick={() => moveRow(index, 'down')}
                        disabled={index === rows.length - 1}
                        className="p-1 text-amber-300/70 hover:text-amber-200 disabled:opacity-25 disabled:cursor-not-allowed"
                        title="Move row down"
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  </td>

                  {columns.map(col => (
                    <td key={`${row.id}-${col.id}`} className="p-2 w-[200px]">
                      <input
                        type={col.id === 'initiative' ? 'number' : 'text'}
                        value={row.cells[col.id] || ''}
                        onChange={(e) => updateCell(row.id, col.id, e.target.value)}
                        placeholder={`Enter ${col.name.toLowerCase()}...`}
                        className="w-full bg-transparent border border-transparent hover:border-amber-900/50 focus:bg-black/50 focus:border-amber-700/50 rounded px-3 py-2 text-amber-100 placeholder-amber-900/50 focus:outline-none transition-all"
                      />
                    </td>
                  ))}
                  <td className="p-2 text-center">
                    <button
                      onClick={() => removeRow(row.id)}
                      className="p-2 text-red-500/40 hover:text-red-400 hover:bg-red-950/30 rounded transition-all"
                      title="Remove Row"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4">
        <button
          onClick={addRow}
          className="flex items-center gap-2 px-6 py-3 bg-amber-950/60 border border-amber-800/60 rounded-md hover:bg-amber-900/80 hover:border-amber-500/80 text-amber-200 transition-all w-full justify-center text-lg tracking-wider"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <Plus size={20} />
          <span>Add Combatant (Row)</span>
        </button>
      </div>
    </div>
  );
};
