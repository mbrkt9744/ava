import React from 'react';
import { Camera, Sparkles, Sliders, History, RefreshCw, Zap } from 'lucide-react';

interface NavbarProps {
  totalGenerations: number;
  onOpenHistory: () => void;
  onReset: () => void;
  selectedModel: string;
  onSelectModel: (model: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalGenerations,
  onOpenHistory,
  onReset,
  selectedModel,
  onSelectModel,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-lg shadow-rose-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Camera className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white">
                Persona<span className="text-amber-400">Shot</span>
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Studio AI
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Casual Selfie to Executive Headshot Studio
            </p>
          </div>
        </div>

        {/* Right Tools & Badges */}
        <div className="flex items-center gap-2.5">
          {/* Model Selector Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Engine:</span>
            <select
              value={selectedModel}
              onChange={(e) => onSelectModel(e.target.value)}
              className="bg-transparent text-amber-300 font-mono font-semibold focus:outline-none cursor-pointer text-xs"
            >
              <option value="gemini-nano-banana-2.1" className="bg-slate-900 text-white">
                Nano Banana 2.1 (HQ)
              </option>
              <option value="gemini-3.1-flash-lite-image" className="bg-slate-900 text-white">
                Flash Lite Image
              </option>
            </select>
          </div>

          {/* History Button */}
          {totalGenerations > 0 && (
            <button
              onClick={onOpenHistory}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition flex items-center gap-1.5 text-xs font-semibold"
            >
              <History className="w-3.5 h-3.5 text-indigo-400" />
              <span>Headshots ({totalGenerations})</span>
            </button>
          )}

          {/* New Session Button */}
          <button
            onClick={onReset}
            title="Start new headshot session"
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition flex items-center gap-1.5 text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Photo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
