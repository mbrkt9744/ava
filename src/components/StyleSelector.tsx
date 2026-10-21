import React, { useState } from 'react';
import { HEADSHOT_STYLES } from '../data/styles';
import { HeadshotStyle } from '../types/headshot';
import { Check, Sparkles, SlidersHorizontal, Sun, Building, Briefcase, Camera } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: HeadshotStyle;
  onSelectStyle: (style: HeadshotStyle) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  selectedStyle,
  onSelectStyle,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredStyles = HEADSHOT_STYLES.filter((style) => {
    if (filterCategory === 'all') return true;
    return style.category === filterCategory;
  });

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/30">
              2
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Select Your Headshot Photography Style
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Tailored backdrops, studio lighting schemes, and ambiance crafted for specific career paths.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          {[
            { id: 'all', label: 'All Styles' },
            { id: 'corporate', label: 'Corporate' },
            { id: 'tech', label: 'Tech & Startup' },
            { id: 'outdoor', label: 'Outdoor' },
            { id: 'creative', label: 'Creative & Editorial' },
            { id: 'studio', label: 'Clean Studio' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1 rounded-lg font-medium transition whitespace-nowrap text-xs ${
                filterCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Styles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {filteredStyles.map((style) => {
          const isSelected = selectedStyle.id === style.id;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onSelectStyle(style)}
              className={`relative rounded-xl text-left overflow-hidden transition-all duration-200 border p-4 flex flex-col justify-between group ${
                isSelected
                  ? 'border-amber-400 bg-slate-800/90 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/10 scale-[1.01]'
                  : 'border-slate-800/90 hover:border-slate-700 bg-slate-950/60 hover:bg-slate-800/60'
              }`}
            >
              {/* Color Gradient Banner Header */}
              <div
                className={`h-24 -mx-4 -mt-4 mb-3 rounded-t-xl bg-gradient-to-br ${style.gradient} relative overflow-hidden flex items-end p-3 border-b border-white/10`}
              >
                {/* Backdrop Pattern / Lighting Glow */}
                <div className="absolute inset-0 bg-radial from-white/15 to-transparent opacity-60" />

                {/* Badge if available */}
                {style.badge && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-300 border border-white/10">
                    {style.badge}
                  </span>
                )}

                {/* Checkbox indicator */}
                <div
                  className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                      : 'bg-black/40 text-transparent border border-white/20 group-hover:border-white/40'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>

                <div className="relative z-10">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-300 block">
                    {style.category}
                  </span>
                  <span className="font-bold text-sm text-white drop-shadow-sm leading-tight block">
                    {style.title}
                  </span>
                </div>
              </div>

              {/* Description & Specs */}
              <div className="space-y-2.5 flex-1 text-xs">
                <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-2">
                  {style.tagline}
                </p>

                {/* Suitable for chips */}
                <div className="pt-2 border-t border-slate-800/60 flex flex-wrap gap-1">
                  {style.suitableFor.slice(0, 2).map((item, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
