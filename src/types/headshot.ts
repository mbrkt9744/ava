export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16';

export type ModelId = 'gemini-nano-banana-2.1' | 'gemini-3.1-flash-lite-image';

export interface HeadshotStyle {
  id: string;
  title: string;
  category: 'corporate' | 'tech' | 'creative' | 'outdoor' | 'studio' | 'executive';
  tagline: string;
  description: string;
  backdropDesc: string;
  lightingDesc: string;
  recommendedWardrobe: string;
  suitableFor: string[];
  gradient: string;
  accentColor: string;
  badge?: string;
}

export interface WardrobeOption {
  id: string;
  label: string;
  description: string;
  iconName: string;
}

export interface ExpressionOption {
  id: string;
  label: string;
  hint: string;
}

export interface ImageAdjustments {
  brightness: number; // -50 to 50
  contrast: number; // -50 to 50
  warmth: number; // -50 to 50
  vignette: number; // 0 to 100
  grayscale: boolean;
}

export interface GeneratedHeadshot {
  id: string;
  originalImageUrl: string;
  generatedImageUrl: string;
  styleId: string;
  styleTitle: string;
  wardrobeLabel: string;
  expressionLabel: string;
  aspectRatio: AspectRatio;
  modelUsed: string;
  timestamp: number;
  adjustments?: ImageAdjustments;
  notes?: string;
}

export interface SampleSelfie {
  id: string;
  name: string;
  role: string;
  lighting: string;
  dataUrl: string;
}
