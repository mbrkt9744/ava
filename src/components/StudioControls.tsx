import React, { useState } from 'react';
import {
  Sparkles,
  Shirt,
  Smile,
  Crop,
  Sliders,
  ChevronDown,
  ChevronUp,
  Loader2,
  Check,
} from 'lucide-react';
import { WARDROBE_OPTIONS, EXPRESSION_OPTIONS } from '../data/styles';
import {
  WardrobeOption,
  ExpressionOption,
  AspectRatio,
  HeadshotStyle,
} from '../types/headshot';

interface StudioControlsProps {
  selectedStyle: HeadshotStyle;
  selectedWardrobe: WardrobeOption;
  onSelectWardrobe: (w: WardrobeOption) => void;
  selectedExpression: ExpressionOption;
  onSelectExpression: (e: ExpressionOption) => void;
  aspectRatio: AspectRatio;
  onSelectAspectRatio: (r: AspectRatio) => void;
  customPrompt: string;
  onChangeCustomPrompt: (val: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  hasSelfie: boolean;
  quality: '1K' | '2K';
  onChangeQuality: (q: '1K' | '2K') => void;
}

export const StudioControls: React.FC<StudioControlsProps> = ({
  selectedStyle,
  selectedWardrobe,
  onSelectWardrobe,
  selectedExpression,
  onSelectExpression,
  aspectRatio,
  onSelectAspectRatio,
  customPrompt,
  onChangeCustomPrompt,
  isGenerating,
  onGenerate,
  hasSelfie,
  quality,
  onChangeQuality,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const quickChips = [
    'Add elegant dark navy silk tie',
    'Keep prescription eyeglasses in place',
    'Warm sun rim light on hair',
    'Slight friendly closed-mouth smile',
    'Subtle blurred luxury watch on wrist',
    'Crisp white pocket square in blazer',
  ];

  const handleAddChip = (chip: string) => {
    if (customPrompt.includes(chip)) return;
    onChangeCustomPrompt(
      customPrompt.trim() ? `${customPrompt.trim()}, ${chip}` : chip
    );
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/30">
              3
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Customize Wardrobe, Expression &amp; Framing
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Tailor the clothing style, facial posture, and camera aspect ratio for your professional profile.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Wardrobe Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Shirt className="w-3.5 h-3.5 text-amber-400" />
            <span>Wardrobe &amp; Attire</span>
          </label>
          <div className="space-y-1.5">
            {WARDROBE_OPTIONS.map((opt) => {
              const isSelected = selectedWardrobe.id === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectWardrobe(opt)}
                  className={`w-full p-2.5 rounded-xl text-left transition-all border flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/50 text-white ring-1 ring-amber-500/30'
                      : 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-slate-200">
                      {opt.label}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {opt.description}
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Expression & Framing */}
        <div className="space-y-5">
          {/* Facial Expression */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Smile className="w-3.5 h-3.5 text-amber-400" />
              <span>Facial Expression &amp; Mood</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EXPRESSION_OPTIONS.map((exp) => {
                const isSelected = selectedExpression.id === exp.id;
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => onSelectExpression(exp)}
                    className={`p-2.5 rounded-xl text-left transition border text-xs ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 text-white ring-1 ring-amber-500/30'
                        : 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-slate-200">
                      {exp.label}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {exp.hint}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Framing / Aspect Ratio */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Crop className="w-3.5 h-3.5 text-amber-400" />
              <span>Aspect Ratio &amp; Target Platform</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: '1:1' as AspectRatio, label: '1:1 Square', sub: 'LinkedIn Avatar' },
                { id: '3:4' as AspectRatio, label: '3:4 Portrait', sub: 'Resume & CV' },
                { id: '4:3' as AspectRatio, label: '4:3 Studio', sub: 'Company Bio' },
                { id: '9:16' as AspectRatio, label: '9:16 Full', sub: 'Mobile / Story' },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onSelectAspectRatio(r.id)}
                  className={`p-2 rounded-xl text-center transition border text-xs ${
                    aspectRatio === r.id
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-300 font-bold'
                      : 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-mono">{r.label}</div>
                  <div className="text-[10px] text-slate-500 truncate">{r.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quality & Resolution Switcher */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
            <div>
              <span className="font-semibold text-slate-300 block">Resolution Quality</span>
              <span className="text-[11px] text-slate-500">
                Studio master render resolution
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onChangeQuality('1K')}
                className={`px-3 py-1 rounded-lg font-mono font-semibold text-xs transition ${
                  quality === '1K'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                1K Standard
              </button>
              <button
                type="button"
                onClick={() => onChangeQuality('2K')}
                className={`px-3 py-1 rounded-lg font-mono font-semibold text-xs transition ${
                  quality === '2K'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                2K Ultra HD
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Prompt Directives Accordion */}
      <div className="pt-2 border-t border-slate-800/80">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Additional Photographer Directives &amp; Fine Tuning (Optional)</span>
          </div>
          {showAdvanced ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {showAdvanced && (
          <div className="mt-3 space-y-2.5 animate-in fade-in duration-200">
            <textarea
              rows={2}
              value={customPrompt}
              onChange={(e) => onChangeCustomPrompt(e.target.value)}
              placeholder="e.g. Keep my silver spectacles, add a dark burgundy silk tie, enhance natural warm rim lighting on hair..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />

            {/* Quick Chips */}
            <div className="flex flex-wrap gap-1.5">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddChip(chip)}
                  className="text-[11px] px-2 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700 text-slate-300 transition"
                >
                  + {chip}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Generate Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onGenerate}
          disabled={!hasSelfie || isGenerating}
          className={`w-full py-4 rounded-xl font-black text-sm tracking-wide uppercase transition-all shadow-xl flex items-center justify-center gap-2.5 ${
            !hasSelfie
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : isGenerating
              ? 'bg-amber-500 text-slate-950 opacity-90 cursor-wait'
              : 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:via-orange-400 hover:to-rose-400 text-slate-950 shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.01]'
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Photographing &amp; Retouching Executive Headshot...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>
                Generate Professional Headshot ({selectedStyle.title})
              </span>
            </>
          )}
        </button>

        {!hasSelfie && (
          <p className="text-center text-xs text-amber-400/90 mt-2 font-medium">
            Please upload a selfie or select one of the sample photos above to activate the photographer.
          </p>
        )}
      </div>
    </div>
  );
};
