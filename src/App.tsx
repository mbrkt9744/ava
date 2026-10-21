import React, { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { SelfieUploader } from './components/SelfieUploader';
import { StyleSelector } from './components/StyleSelector';
import { StudioControls } from './components/StudioControls';
import { HeadshotStudio } from './components/HeadshotStudio';
import { GalleryDrawer } from './components/GalleryDrawer';
import { HEADSHOT_STYLES, WARDROBE_OPTIONS, EXPRESSION_OPTIONS, SAMPLE_SELFIES } from './data/styles';
import {
  HeadshotStyle,
  WardrobeOption,
  ExpressionOption,
  AspectRatio,
  GeneratedHeadshot,
  ImageAdjustments,
} from './types/headshot';
import { AlertCircle, Sparkles, CheckCircle2, ShieldCheck, Camera, Layers } from 'lucide-react';

export default function App() {
  const [selfieUrl, setSelfieUrl] = useState<string | null>(SAMPLE_SELFIES[0].dataUrl);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle>(HEADSHOT_STYLES[0]);
  const [selectedWardrobe, setSelectedWardrobe] = useState<WardrobeOption>(WARDROBE_OPTIONS[0]);
  const [selectedExpression, setSelectedExpression] = useState<ExpressionOption>(EXPRESSION_OPTIONS[0]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [quality, setQuality] = useState<'1K' | '2K'>('1K');
  const [selectedModel, setSelectedModel] = useState<string>('gemini-nano-banana-2.1');
  const [customPrompt, setCustomPrompt] = useState<string>('');

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const [generatedHeadshots, setGeneratedHeadshots] = useState<GeneratedHeadshot[]>([]);
  const [activeHeadshot, setActiveHeadshot] = useState<GeneratedHeadshot | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);

  const studioRef = useRef<HTMLDivElement>(null);

  // Main Generation Function
  const handleGenerate = async (
    overrideStyle?: HeadshotStyle,
    overridePrompt?: string
  ) => {
    if (!selfieUrl) {
      alert('Please upload a casual selfie or select a sample photo first.');
      return;
    }

    const styleToUse = overrideStyle || selectedStyle;
    const promptToUse = overridePrompt !== undefined ? overridePrompt : customPrompt;

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const response = await fetch('/api/generate-headshot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: selfieUrl,
          styleTitle: styleToUse.title,
          stylePrompt: styleToUse.description,
          backdropDesc: styleToUse.backdropDesc,
          wardrobeDesc:
            selectedWardrobe.id === 'auto_recommended'
              ? styleToUse.recommendedWardrobe
              : selectedWardrobe.description,
          expressionDesc: selectedExpression.label,
          aspectRatio,
          model: selectedModel,
          quality,
          customPrompt: promptToUse,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Failed to generate headshot. Please try again.');
      }

      const newHeadshot: GeneratedHeadshot = {
        id: `hs-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        originalImageUrl: selfieUrl,
        generatedImageUrl: data.imageUrl,
        styleId: styleToUse.id,
        styleTitle: styleToUse.title,
        wardrobeLabel: selectedWardrobe.label,
        expressionLabel: selectedExpression.label,
        aspectRatio: data.aspectRatio || aspectRatio,
        modelUsed: data.modelUsed || selectedModel,
        timestamp: data.timestamp || Date.now(),
        notes: data.notes,
        adjustments: {
          brightness: 0,
          contrast: 0,
          warmth: 0,
          vignette: 15,
          grayscale: false,
        },
      };

      setGeneratedHeadshots((prev) => [newHeadshot, ...prev]);
      setActiveHeadshot(newHeadshot);

      // Smooth scroll to results
      setTimeout(() => {
        studioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error('Headshot generation error:', err);
      setGenerationError(err.message || 'Error communicating with AI photographer.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate a variation from the studio toolbar
  const handleGenerateVariation = (styleId: string, customTweak?: string) => {
    const targetStyle = HEADSHOT_STYLES.find((s) => s.id === styleId) || selectedStyle;
    setSelectedStyle(targetStyle);
    handleGenerate(targetStyle, customTweak);
  };

  const handleUpdateAdjustments = (newAdjustments: ImageAdjustments) => {
    if (!activeHeadshot) return;
    const updated = {
      ...activeHeadshot,
      adjustments: newAdjustments,
    };
    setActiveHeadshot(updated);
    setGeneratedHeadshots((prev) =>
      prev.map((h) => (h.id === updated.id ? updated : h))
    );
  };

  const handleDeleteHeadshot = (id: string) => {
    setGeneratedHeadshots((prev) => prev.filter((h) => h.id !== id));
    if (activeHeadshot?.id === id) {
      const remaining = generatedHeadshots.filter((h) => h.id !== id);
      setActiveHeadshot(remaining[0] || null);
    }
  };

  const handleResetSession = () => {
    if (confirm('Start a fresh headshot session?')) {
      setSelfieUrl(null);
      setActiveHeadshot(null);
      setCustomPrompt('');
      setGenerationError(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Studio Header */}
      <Navbar
        totalGenerations={generatedHeadshots.length}
        onOpenHistory={() => setIsGalleryOpen(true)}
        onReset={handleResetSession}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/40 border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="max-w-2xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Master Lighting • Identity Preserving AI</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Executive AI Headshot <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">Photographer</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Upload any casual selfie or phone snapshot. Select an industry photography style—from classic corporate grey backdrops to Silicon Valley tech campuses or golden hour natural light—and transform it into a magazine-grade professional headshot.
            </p>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* Error Notification */}
        {generationError && (
          <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-800/80 text-rose-200 text-xs sm:text-sm flex items-start gap-3 shadow-lg">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Headshot Generation Notice:</span>
              <p className="text-rose-300">{generationError}</p>
            </div>
          </div>
        )}

        {/* Step 1: Selfie Upload / Webcam */}
        <SelfieUploader
          currentSelfieUrl={selfieUrl}
          onSelectSelfie={(url) => {
            setSelfieUrl(url);
            setGenerationError(null);
          }}
          onClearSelfie={() => {
            setSelfieUrl(null);
          }}
        />

        {/* Step 2: Photography Style Selection */}
        <StyleSelector
          selectedStyle={selectedStyle}
          onSelectStyle={setSelectedStyle}
        />

        {/* Step 3: Wardrobe & Controls */}
        <StudioControls
          selectedStyle={selectedStyle}
          selectedWardrobe={selectedWardrobe}
          onSelectWardrobe={setSelectedWardrobe}
          selectedExpression={selectedExpression}
          onSelectExpression={setSelectedExpression}
          aspectRatio={aspectRatio}
          onSelectAspectRatio={setAspectRatio}
          customPrompt={customPrompt}
          onChangeCustomPrompt={setCustomPrompt}
          isGenerating={isGenerating}
          onGenerate={() => handleGenerate()}
          hasSelfie={!!selfieUrl}
          quality={quality}
          onChangeQuality={setQuality}
        />

        {/* Active Generated Headshot Studio Section */}
        {activeHeadshot && (
          <div ref={studioRef} className="pt-4">
            <HeadshotStudio
              headshot={activeHeadshot}
              onUpdateAdjustments={handleUpdateAdjustments}
              onGenerateVariation={handleGenerateVariation}
              onNewPhoto={() => {
                setSelfieUrl(null);
                setActiveHeadshot(null);
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">PersonaShot AI Studio</span>
            <span>• Powered by Gemini Multimodal Studio Intelligence</span>
          </div>
          <div className="text-[11px] text-slate-600">
            Facial geometry and identity protected • Studio three-point lighting synthesis
          </div>
        </div>
      </footer>

      {/* Session History Drawer */}
      <GalleryDrawer
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        headshots={generatedHeadshots}
        activeHeadshotId={activeHeadshot?.id}
        onSelectHeadshot={(h) => {
          setActiveHeadshot(h);
          setTimeout(() => {
            studioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }}
        onDeleteHeadshot={handleDeleteHeadshot}
        onClearAll={() => {
          setGeneratedHeadshots([]);
          setActiveHeadshot(null);
        }}
      />
    </div>
  );
}
