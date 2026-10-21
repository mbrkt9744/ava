import React, { useState } from 'react';
import { X, Trash2, Download, ArrowRight, Columns, CheckCircle2 } from 'lucide-react';
import { GeneratedHeadshot } from '../types/headshot';

interface GalleryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  headshots: GeneratedHeadshot[];
  activeHeadshotId?: string;
  onSelectHeadshot: (h: GeneratedHeadshot) => void;
  onDeleteHeadshot: (id: string) => void;
  onClearAll: () => void;
}

export const GalleryDrawer: React.FC<GalleryDrawerProps> = ({
  isOpen,
  onClose,
  headshots,
  activeHeadshotId,
  onSelectHeadshot,
  onDeleteHeadshot,
  onClearAll,
}) => {
  const [comparingIds, setComparingIds] = useState<[string, string] | null>(null);

  if (!isOpen) return null;

  const compareA = headshots.find((h) => h.id === comparingIds?.[0]);
  const compareB = headshots.find((h) => h.id === comparingIds?.[1]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Session Headshots Gallery
            </h3>
            <p className="text-xs text-slate-400">
              {headshots.length} headshot{headshots.length === 1 ? '' : 's'} generated in this session
            </p>
          </div>
          <div className="flex items-center gap-2">
            {headshots.length > 1 && (
              <button
                onClick={onClearAll}
                className="px-2.5 py-1 text-xs text-rose-400 hover:text-rose-300 font-medium transition"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison view if two selected */}
        {comparingIds && compareA && compareB ? (
          <div className="p-5 space-y-4 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Side-by-Side Comparison
              </span>
              <button
                onClick={() => setComparingIds(null)}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                Exit Comparison
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-200 block truncate">
                  {compareA.styleTitle}
                </span>
                <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-square">
                  <img
                    src={compareA.generatedImageUrl}
                    alt={compareA.styleTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => {
                    onSelectHeadshot(compareA);
                    setComparingIds(null);
                    onClose();
                  }}
                  className="w-full py-1.5 text-xs font-bold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400"
                >
                  Open in Studio
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-200 block truncate">
                  {compareB.styleTitle}
                </span>
                <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-square">
                  <img
                    src={compareB.generatedImageUrl}
                    alt={compareB.styleTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => {
                    onSelectHeadshot(compareB);
                    setComparingIds(null);
                    onClose();
                  }}
                  className="w-full py-1.5 text-xs font-bold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400"
                >
                  Open in Studio
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Grid of Headshots */
          <div className="p-5 flex-1 overflow-y-auto space-y-3">
            {headshots.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
                <p className="text-xs">No headshots generated yet in this session.</p>
                <p className="text-[11px] text-slate-600">
                  Select a photo and style above to create your first executive portrait.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {headshots.map((h, idx) => {
                  const isActive = h.id === activeHeadshotId;
                  return (
                    <div
                      key={h.id}
                      className={`p-3 rounded-xl border text-xs space-y-2.5 transition group ${
                        isActive
                          ? 'bg-amber-500/10 border-amber-500/40 ring-1 ring-amber-500/30'
                          : 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800'
                      }`}
                    >
                      <div className="relative rounded-lg overflow-hidden bg-slate-900 aspect-square">
                        <img
                          src={h.generatedImageUrl}
                          alt={h.styleTitle}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-semibold text-slate-200">
                          {h.aspectRatio}
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-bold text-slate-200 truncate">
                            {h.styleTitle}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {h.wardrobeLabel}
                          </div>
                        </div>
                        <button
                          onClick={() => onDeleteHeadshot(h.id)}
                          className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                          title="Delete headshot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <button
                          onClick={() => {
                            onSelectHeadshot(h);
                            onClose();
                          }}
                          className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                        >
                          <span>Open Studio</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>

                        {headshots.length >= 2 && (
                          <button
                            onClick={() => {
                              const other = headshots.find((item) => item.id !== h.id);
                              if (other) {
                                setComparingIds([h.id, other.id]);
                              }
                            }}
                            className="text-slate-400 hover:text-slate-200 text-[11px] flex items-center gap-1"
                          >
                            <Columns className="w-3 h-3" />
                            <span>Compare</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
