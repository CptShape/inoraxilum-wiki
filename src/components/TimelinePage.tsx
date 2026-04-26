import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Chapter, TimelineEvent, TimelineFrontmatter, TimelineRange } from '../types';

interface TimelinePageProps {
  config: TimelineFrontmatter;
  onChapterSelect?: (chapterId: string, path?: string[] | null) => void;
  allChapters?: Chapter[];
}

const sizeConfig = {
  sm: { marker: 'w-2.5 h-2.5', title: 'text-xs', desc: 'text-[10px]', cardPad: 'px-2 py-1', tag: 'text-[8px]' },
  md: { marker: 'w-3.5 h-3.5', title: 'text-sm', desc: 'text-xs', cardPad: 'px-3 py-1.5', tag: 'text-[9px]' },
  lg: { marker: 'w-5 h-5', title: 'text-base', desc: 'text-sm', cardPad: 'px-3 py-2', tag: 'text-[9px]' },
};

const defaultColor = '#f59e0b';
const defaultRangeColor = 'rgba(245, 158, 11, 0.45)';

const findChapterPath = (chapters: Chapter[], targetId: string, path: string[] = []): string[] | null => {
  for (const ch of chapters) {
    const next = [...path, ch.id];
    if (ch.id === targetId) return next;
    if (ch.subChapters?.length) {
      const found = findChapterPath(ch.subChapters, targetId, next);
      if (found) return found;
    }
  }
  return null;
};

// ─── Positioned event ────────────────────────────────────────
interface PosEvent extends TimelineEvent {
  top: number;
  height: number;
  clusterId: string;
  clusterSize: number;
  slot: number;
}

const MIN_GAP = 10; // minimum px between bottom of one card and top of next

export const TimelinePage: React.FC<TimelinePageProps> = ({ config, onChapterSelect, allChapters = [] }) => {
  const startYear = config.startYear ?? 0;
  const endYear = config.endYear;
  const scale = config.scale ?? 10;

  const events = config.events ?? [];
  const sorted = useMemo(() => [...events].sort((a, b) => a.year - b.year), [events]);

  // ── Phase 1: Render cards at estimated positions to measure them ──
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [measuredHeights, setMeasuredHeights] = useState<Map<string, number>>(new Map());

  // Ref callback to register each card DOM element
  const registerCard = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current.set(id, el);
    } else {
      cardRefs.current.delete(id);
    }
  }, []);

  // After DOM render, measure all cards (useLayoutEffect prevents visual flash)
  React.useLayoutEffect(() => {
    const heights = new Map<string, number>();
    let changed = false;
    cardRefs.current.forEach((el, id) => {
      const h = el.getBoundingClientRect().height;
      const prev = measuredHeights.get(id);
      if (prev !== h) changed = true;
      heights.set(id, h);
    });
    if (changed) setMeasuredHeights(heights);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorted]);

  // ── Phase 2: Calculate layout with real measured heights ──
  const positioned = useMemo<PosEvent[]>(() => {
    if (!sorted.length) return [];

    const getHeight = (id: string, fallbackSize?: string): number => {
      const measured = measuredHeights.get(id);
      if (measured) return measured;
      // Fallback estimates while measuring
      if (fallbackSize === 'sm') return 40;
      if (fallbackSize === 'lg') return 60;
      return 50;
    };

    const result: PosEvent[] = [];
    let cursor = 0;

    let i = 0;
    while (i < sorted.length) {
      const anchor = sorted[i];
      const anchorPixel = (anchor.year - startYear) * scale;

      // Gather cluster: events too close to the growing stack
      const cluster: TimelineEvent[] = [anchor];
      let j = i + 1;

      while (j < sorted.length) {
        const nextPixel = (sorted[j].year - startYear) * scale;
        const stackBottom = Math.max(cursor, anchorPixel);
        if (nextPixel < stackBottom + MIN_GAP) {
          cluster.push(sorted[j]);
          j++;
        } else {
          break;
        }
      }

      // Position cluster cards starting at max(cursor, anchorPixel)
      const clusterTop = Math.max(cursor, anchorPixel);
      const clusterId = `c-${anchor.id}`;
      let yOffset = 0;

      cluster.forEach((evt, slot) => {
        const h = getHeight(evt.id, evt.size);
        result.push({
          ...evt,
          top: clusterTop + yOffset,
          height: h,
          slot,
          clusterSize: cluster.length,
          clusterId,
        });
        yOffset += h + MIN_GAP;
      });

      cursor = clusterTop + yOffset;
      i = j;
    }

    return result;
  }, [sorted, measuredHeights, startYear, scale]);

  // ── Total timeline height ──
  const timelineHeight = useMemo(() => {
    let maxBottom = (endYear - startYear) * scale;
    for (const e of positioned) {
      const bottom = e.top + e.height + 20;
      if (bottom > maxBottom) maxBottom = bottom;
    }
    return maxBottom + 120;
  }, [positioned, startYear, endYear, scale]);

  const handleEventClick = (event: TimelineEvent) => {
    if (!event.goChapter) return;
    const path = findChapterPath(allChapters, event.goChapter) ?? [event.goChapter];
    onChapterSelect?.(event.goChapter, path);
    if (event.goChapterPart) {
      setTimeout(() => {
        const el = document.querySelector(`[data-part="${event.goChapterPart}"]`) as HTMLElement | null;
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 250);
    }
  };

  const rangeStyle = (r: TimelineRange) => {
    const top = (r.start - startYear) * scale;
    const bottom = (r.end - startYear) * scale;
    return { top, height: Math.max(bottom - top, scale * 1.2) };
  };

  // ── Cluster info for connectors ──
  const clusters = useMemo(() => {
    const map = new Map<string, PosEvent[]>();
    for (const e of positioned) {
      if (!map.has(e.clusterId)) map.set(e.clusterId, []);
      map.get(e.clusterId)!.push(e);
    }
    return map;
  }, [positioned]);

  return (
    <div className="mt-6 rounded-2xl border border-amber-800/50 bg-stone-950/45 shadow-[0_0_40px_rgba(0,0,0,0.18)] overflow-hidden">
      {/* Header */}
      <div className="border-b border-amber-800/40 bg-gradient-to-r from-stone-950 via-amber-950/20 to-stone-950 px-4 py-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-600" style={{ fontFamily: "'Cinzel', serif" }}>
          Chronicle Timeline
        </p>
        <p className="text-sm text-amber-300/80 mt-1" style={{ fontFamily: "'IM Fell English', serif" }}>
          Years {startYear}–{endYear} &bull; {events.length} events
        </p>
      </div>

      {/* Body */}
      <div className="px-3 py-8 sm:px-6 pb-12">
        {/* Column headers */}
        <div className="grid grid-cols-[2.5fr_1.5fr_6fr] gap-4 mb-4">
          <div className="text-[10px] uppercase tracking-[0.28em] text-amber-700" style={{ fontFamily: "'Cinzel', serif" }}>Eras</div>
          <div className="text-center text-[10px] uppercase tracking-[0.28em] text-amber-700" style={{ fontFamily: "'Cinzel', serif" }}>—</div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-amber-700" style={{ fontFamily: "'Cinzel', serif" }}>Events</div>
        </div>

        {/* Timeline area */}
        <div className="grid grid-cols-[2.5fr_1.5fr_6fr] gap-4" style={{ height: timelineHeight }}>

          {/* ── Column 1: Eras ──────────────────────────────── */}
          <div className="relative overflow-hidden">
            {(config.ranges ?? []).map((r) => {
              const s = rangeStyle(r);
              return (
                <div
                  key={r.id}
                  className="absolute left-0 right-0 rounded-lg border border-amber-700/30 bg-stone-900/50 px-2 py-2 shadow-md"
                  style={{
                    top: s.top,
                    height: s.height,
                    borderLeftWidth: 3,
                    borderLeftColor: r.color ?? defaultRangeColor,
                  }}
                >
                  <div className="text-xs font-bold text-amber-200 break-words leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                    {r.label}
                  </div>
                  <div className="mt-0.5 text-[10px] text-amber-500" style={{ fontFamily: "'IM Fell English', serif" }}>
                    {r.start} – {r.end}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Column 2: Centre line + ticks ───────────────── */}
          <div className="relative overflow-hidden">
            {/* Main vertical line */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-amber-700/20 via-amber-400/90 to-amber-700/20" />

            {/* Tick marks */}
            {Array.from({ length: endYear - startYear + 1 }).map((_, i) => {
              const year = startYear + i;
              const top = (year - startYear) * scale;
              const major = year % 50 === 0;
              const medium = year % 10 === 0;
              return (
                <div key={year} className="absolute left-0 right-0" style={{ top }}>
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 ${major ? 'w-5' : medium ? 'w-3' : 'w-1.5'} border-t ${
                      major ? 'border-amber-300/80' : medium ? 'border-amber-500/70' : 'border-amber-900/50'
                    }`}
                  />
                  {major && (
                    <span className="absolute left-1/2 ml-4 -translate-y-1/2 text-amber-400 text-[9px]" style={{ fontFamily: "'Cinzel', serif" }}>
                      {year}
                    </span>
                  )}
                </div>
              );
            })}

            {/* Cluster connectors */}
            {[...clusters.entries()].map(([id, events]) => {
              if (events.length <= 1) return null;
              const first = events[0];
              const last = events[events.length - 1];
              const anchorPixel = (first.year - startYear) * scale;
              const color = first.color ?? defaultColor;
              const totalHeight = last.top - first.top + last.height;

              return (
                <div key={`bracket-${id}`} className="absolute" style={{ top: anchorPixel, left: '50%', width: 0 }}>
                  <svg
                    style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}
                    width={20}
                    height={totalHeight}
                  >
                    <line
                      x1={0} y1={0} x2={0}
                      y2={totalHeight}
                      stroke={`${color}55`}
                      strokeWidth={2}
                      strokeDasharray="3 3"
                    />
                  </svg>
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border z-10"
                    style={{
                      width: 22, height: 22,
                      borderColor: `${color}66`,
                      background: `radial-gradient(circle, ${color}33, ${color}11)`,
                      top: 0,
                      left: 0,
                    }}
                  >
                    <span className="text-[8px] font-bold" style={{ color }}>{events.length}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Column 3: Event cards ───────────────────────── */}
          <div className="relative overflow-hidden">
            {sorted.map((event) => {
              const sc = sizeConfig[event.size ?? 'md'] ?? sizeConfig.md;
              const color = event.color ?? defaultColor;
              const interactive = !!event.goChapter;

              // Find positioned data if available, otherwise use estimated position
              const pos = positioned.find(p => p.id === event.id);
              const top = pos?.top ?? ((event.year - startYear) * scale);

              return (
                <div
                  key={event.id}
                  ref={(el) => registerCard(event.id, el)}
                  className="absolute left-0 right-0"
                  style={{ top }}
                >
                  <div className="flex items-start gap-1">
                    {/* Marker */}
                    <div className="flex items-center shrink-0" style={{ width: 18 }}>
                      <div
                        className={`rounded-full border-2 border-stone-950 shrink-0 ${sc.marker}`}
                        style={{
                          backgroundColor: color,
                          boxShadow: `0 0 8px ${color}44`,
                        }}
                      />
                    </div>

                    {/* Card */}
                    <div
                      className={`flex-1 min-w-0 rounded-lg border transition-all duration-200 ${sc.cardPad} ${
                        interactive ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg' : ''
                      }`}
                      style={{
                        borderColor: `${color}33`,
                        borderLeftWidth: 3,
                        borderLeftColor: color,
                        background: 'rgba(28, 25, 23, 0.7)',
                      }}
                      onClick={() => handleEventClick(event)}
                      role={interactive ? 'button' : undefined}
                      tabIndex={interactive ? 0 : -1}
                      onKeyDown={(e) => {
                        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault();
                          handleEventClick(event);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`shrink-0 rounded border border-amber-700/25 bg-stone-950/60 px-1 py-0.5 uppercase tracking-wider text-amber-500 ${sc.tag}`}
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          {event.year}
                        </span>
                        <h3
                          className={`font-semibold break-words leading-tight ${sc.title} ${interactive ? 'hover:underline' : ''}`}
                          style={{ fontFamily: "'Cinzel', serif", color }}
                        >
                          {event.title}
                        </h3>
                      </div>

                      {event.description && (
                        <p
                          className={`mt-1 leading-relaxed text-amber-100/70 break-words ${sc.desc}`}
                          style={{ fontFamily: "'IM Fell English', serif" }}
                        >
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
