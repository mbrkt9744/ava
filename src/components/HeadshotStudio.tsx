import React, { useState } from 'react';
import {
  Download,
  Copy,
  Sparkles,
  Sliders,
  RotateCcw,
  Check,
  Share2,
  Maximize2,
  ZoomIn,
  Eye,
  Camera,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { GeneratedHeadshot, ImageAdjustments } from '../types/headshot';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface HeadshotStudioProps {
  headshot: GeneratedHeadshot;
  onUpdateAdjustments: (adjustments: ImageAdjustments) => void;
  onGenerateVariation: (styleId: string, customTweak?: string) => void;
  onNewPhoto: () => void;
}

export const HeadshotStudio: React.FC<HeadshotStudioProps> = ({
  headshot,
  onUpdateAdjustments,
  onGenerateVariation,
  onNewPhoto,
}) => {
  const [copied, setCopied] = useState(false);
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const adjustments: ImageAdjustments = headshot.adjustments || {
    brightness: 0,
    contrast: 0,
    warmth: 0,
    vignette: 15,
    grayscale: false,
  };

  const handleAdjustmentChange = (field: keyof ImageAdjustments, value: any) => {
    onUpdateAdjustments({
      ...adjustments,
      [field]: value,
    });
  };

  const handleResetAdjustments = () => {
    onUpdateAdjustments({
      brightness: 0,
      contrast: 0,
      warmth: 0,
      vignette: 0,
      grayscale: false,
    });
  };

  // Bake filters onto canvas for true high-res download
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = headshot.generatedImageUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 1024;
      canvas.height = img.naturalHeight || 1024;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Apply CSS filters on context
        const brightness = 1 + (adjustments.brightness || 0) / 100;
        const contrast = 1 + (adjustments.contrast || 0) / 100;
        const sepia = (adjustments.warmth || 0) > 0 ? (adjustments.warmth || 0) * 0.4 : 0;
        const grayscale = adjustments.grayscale ? 100 : 0;

        ctx.filter = `brightness(${brightness}) contrast(${contrast}) sepia(${sepia}%) grayscale(${grayscale}%)`;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Apply Vignette if any
        if (adjustments.vignette > 0) {
          ctx.filter = 'none';
          const radial = ctx.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            canvas.width * 0.35,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width * 0.75
          );
          radial.addColorStop(0, 'rgba(0,0,0,0)');
          radial.addColorStop(1, `rgba(0,0,0,${(adjustments.vignette / 100) * 0.7})`);
          ctx.fillStyle = radial;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `PersonaShot-${headshot.styleTitle.replace(/\s+/g, '-')}-${Date.now()}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error('Download error:', err);
      // Fallback: download raw image
      const link = document.createElement('a');
      link.download = `PersonaShot-${Date.now()}.png`;
      link.href = headshot.generatedImageUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = async () => {
    try {
      // Fetch blob to copy to clipboard
      const res = await fetch(headshot.generatedImageUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Clipboard write failed, copying link instead:', err);
      navigator.clipboard.writeText(headshot.generatedImageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-6 shadow-2xl">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Master Headshot Ready
            </span>
            <span className="text-xs font-mono text-slate-400">
              {headshot.aspectRatio} Aspect
            </span>
            <span className="text-xs font-mono text-slate-500">
              • Model: {headshot.modelUsed}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
            {headshot.styleTitle}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Wardrobe: <strong className="text-slate-200">{headshot.wardrobeLabel}</strong> • Expression: <strong className="text-slate-200">{headshot.expressionLabel}</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowAdjustments(!showAdjustments)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition border flex items-center gap-1.5 ${
              showAdjustments
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Retouch &amp; Light</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 transition shadow-lg shadow-orange-500/20 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloading ? 'Processing...' : 'Download Headshot'}</span>
          </button>
        </div>
      </div>

      {/* Retouch & Light Sliders Drawer */}
      {showAdjustments && (
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Studio Lighting &amp; Color Grading</span>
            </span>
            <button
              onClick={handleResetAdjustments}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Exposure / Brightness */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Key Light (Exposure)</span>
                <span className="font-mono text-white font-semibold">
                  {adjustments.brightness > 0 ? `+${adjustments.brightness}` : adjustments.brightness}
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                value={adjustments.brightness}
                onChange={(e) => handleAdjustmentChange('brightness', parseInt(e.target.value, 10))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Contrast */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Shadow Contrast</span>
                <span className="font-mono text-white font-semibold">
                  {adjustments.contrast > 0 ? `+${adjustments.contrast}` : adjustments.contrast}
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                value={adjustments.contrast}
                onChange={(e) => handleAdjustmentChange('contrast', parseInt(e.target.value, 10))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Warmth */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Color Temperature</span>
                <span className="font-mono text-white font-semibold">
                  {adjustments.warmth > 0 ? `+${adjustments.warmth}` : adjustments.warmth}
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                value={adjustments.warmth}
                onChange={(e) => handleAdjustmentChange('warmth', parseInt(e.target.value, 10))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Studio Vignette */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Studio Vignette</span>
                <span className="font-mono text-white font-semibold">
                  {adjustments.vignette}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={adjustments.vignette}
                onChange={(e) => handleAdjustmentChange('vignette', parseInt(e.target.value, 10))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-900">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={adjustments.grayscale}
                onChange={(e) => handleAdjustmentChange('grayscale', e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 accent-amber-400"
              />
              <span>Editorial Black &amp; White Studio Finish</span>
            </label>
            <span className="text-[11px] text-slate-500">
              Changes apply instantly to live preview and export
            </span>
          </div>
        </div>
      )}

      {/* Before / After Interactive Slider */}
      <BeforeAfterSlider
        originalUrl={headshot.originalImageUrl}
        generatedUrl={headshot.generatedImageUrl}
        aspectRatio={headshot.aspectRatio}
        adjustments={adjustments}
      />

      {/* Quick 1-Click Variations Bar */}
      <div className="pt-2 border-t border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Generate Quick Variations with this same photo:</span>
          </span>
          <span className="text-[11px] text-slate-500">Keep facial identity</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onGenerateVariation('corporate_grey', 'Classic executive look')}
            className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition flex items-center gap-1"
          >
            <span>Corporate Grey</span>
            <ArrowRight className="w-3 h-3 text-amber-400" />
          </button>
          <button
            onClick={() => onGenerateVariation('modern_tech', 'Silicon valley glass campus backdrop')}
            className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition flex items-center gap-1"
          >
            <span>Modern Tech Office</span>
            <ArrowRight className="w-3 h-3 text-amber-400" />
          </button>
          <button
            onClick={() => onGenerateVariation('outdoor_natural', 'Golden hour natural park light')}
            className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition flex items-center gap-1"
          >
            <span>Outdoor Natural Light</span>
            <ArrowRight className="w-3 h-3 text-amber-400" />
          </button>
          <button
            onClick={() => onGenerateVariation('creative_dark', 'Cinematic chiaroscuro dark portrait')}
            className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition flex items-center gap-1"
          >
            <span>Creative Dark</span>
            <ArrowRight className="w-3 h-3 text-amber-400" />
          </button>
          <button
            onClick={() => onGenerateVariation('executive_boardroom', 'Metropolitan twilight skyline')}
            className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition flex items-center gap-1"
          >
            <span>Executive Boardroom</span>
            <ArrowRight className="w-3 h-3 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
