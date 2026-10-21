import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Columns, SplitSquareVertical, Sparkles } from 'lucide-react';
import { ImageAdjustments } from '../types/headshot';

interface BeforeAfterSliderProps {
  originalUrl: string;
  generatedUrl: string;
  aspectRatio: string;
  adjustments?: ImageAdjustments;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  originalUrl,
  generatedUrl,
  aspectRatio,
  adjustments,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'slider' | 'side_by_side'>('slider');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMouseMove, handleEnd, handleTouchMove]);

  // Compute CSS filter string from adjustments
  const filterStyle = adjustments
    ? {
        filter: `
          brightness(${1 + (adjustments.brightness || 0) / 100})
          contrast(${1 + (adjustments.contrast || 0) / 100})
          sepia(${(adjustments.warmth || 0) > 0 ? (adjustments.warmth || 0) * 0.4 : 0}%)
          grayscale(${adjustments.grayscale ? 100 : 0}%)
        `,
      }
    : {};

  // Compute aspect ratio CSS class or inline style
  const getAspectRatioStyle = () => {
    switch (aspectRatio) {
      case '3:4':
        return 'aspect-[3/4]';
      case '4:3':
        return 'aspect-[4/3]';
      case '9:16':
        return 'aspect-[9/16]';
      case '1:1':
      default:
        return 'aspect-square';
    }
  };

  return (
    <div className="space-y-3">
      {/* View Switcher Bar */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">Transformation View:</span>
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('slider')}
              className={`px-2.5 py-1 rounded-md transition font-medium flex items-center gap-1 ${
                viewMode === 'slider'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              <span>Interactive Split</span>
            </button>
            <button
              onClick={() => setViewMode('side_by_side')}
              className={`px-2.5 py-1 rounded-md transition font-medium flex items-center gap-1 ${
                viewMode === 'side_by_side'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Side by Side</span>
            </button>
          </div>
        </div>

        {viewMode === 'slider' && (
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Drag the handle to compare casual selfie vs executive headshot
          </span>
        )}
      </div>

      {viewMode === 'side_by_side' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Original Casual Selfie */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px]">
                Original Casual Selfie
              </span>
              <span className="text-slate-500 text-[10px]">Unprocessed Input</span>
            </div>
            <div
              className={`relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl ${getAspectRatioStyle()}`}
            >
              <img
                src={originalUrl}
                alt="Original Selfie"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* AI Executive Headshot */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> AI Professional Headshot
              </span>
              <span className="text-emerald-400 font-semibold text-[10px]">Studio Grade</span>
            </div>
            <div
              className={`relative rounded-2xl overflow-hidden bg-slate-950 border border-amber-500/40 shadow-xl shadow-amber-500/10 ${getAspectRatioStyle()}`}
            >
              <img
                src={generatedUrl}
                alt="AI Professional Headshot"
                style={filterStyle}
                className="w-full h-full object-cover"
              />
              {/* Optional Vignette Overlay */}
              {adjustments && adjustments.vignette > 0 && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 ${adjustments.vignette * 1.5}px rgba(0,0,0,${
                      adjustments.vignette / 100
                    })`,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Interactive Split Slider */
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          className={`relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl select-none cursor-ew-resize max-h-[640px] mx-auto ${getAspectRatioStyle()}`}
        >
          {/* Under layer: Generated Professional Headshot */}
          <img
            src={generatedUrl}
            alt="AI Professional Headshot"
            style={filterStyle}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Vignette Overlay */}
          {adjustments && adjustments.vignette > 0 && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: `inset 0 0 ${adjustments.vignette * 1.5}px rgba(0,0,0,${
                  adjustments.vignette / 100
                })`,
              }}
            />
          )}

          {/* Top layer: Original Casual Selfie (Clipped) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src={originalUrl}
                alt="Original Selfie"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  width: containerRef.current?.offsetWidth || '100%',
                  maxWidth: 'none',
                }}
              />
            </div>
          </div>

          {/* Divider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)] z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-slate-950 font-black shadow-2xl border-2 border-slate-900 flex items-center justify-center text-xs">
              ↔
            </div>
          </div>

          {/* Floating Corner Badges */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[11px] font-semibold text-slate-300 border border-white/10 pointer-events-none">
            Original Selfie
          </div>
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-amber-500/90 backdrop-blur-md text-[11px] font-bold text-slate-950 shadow-lg border border-amber-300/30 pointer-events-none flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>AI Executive Studio</span>
          </div>
        </div>
      )}
    </div>
  );
};
