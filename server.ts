import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// High body limit for base64 images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Server-side initialization of Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    appName: 'PersonaShot AI Studio',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    models: ['gemini-nano-banana-2.1', 'gemini-3.1-flash-lite-image'],
  });
});

// Endpoint to transform a casual selfie into a professional headshot
app.post('/api/generate-headshot', async (req: Request, res: Response) => {
  try {
    const {
      image, // base64 string or data URL
      styleTitle,
      stylePrompt,
      backdropDesc,
      wardrobeDesc,
      expressionDesc,
      aspectRatio = '1:1',
      model = 'gemini-nano-banana-2.1',
      quality = '1K',
      customPrompt = '',
    } = req.body;

    if (!image) {
      return res.status(400).json({
        ok: false,
        error: 'Missing selfie image. Please upload a photo to continue.',
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        ok: false,
        error: 'GEMINI_API_KEY is not configured on the server. Please check your environment configuration.',
      });
    }

    // Extract base64 and mime type from data URL if formatted that way
    let mimeType = 'image/jpeg';
    let base64Data = image;

    const dataUrlMatch = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (dataUrlMatch) {
      mimeType = dataUrlMatch[1];
      base64Data = dataUrlMatch[2];
    }

    // Build the master photographer prompt
    const promptInstructions = [
      `You are an elite master portrait photographer and professional commercial retoucher shooting for executive publications (Forbes, Vanity Fair, Wired, Time).`,
      `Your task is to transform this casual selfie photo into an ultra-high-end, authentic professional executive headshot.`,
      ``,
      `[CRITICAL IDENTITY PRESERVATION RULES]:`,
      `- Preserve the exact identity, facial structure, biological facial features, bone structure, eye shape, nose shape, lip shape, ethnicity, and genuine likeness of the person in the input photo.`,
      `- Maintain accurate skin tone, natural skin texture with subtle pores (never artificial plastic airbrushing or porcelain doll smoothing).`,
      `- If the subject wears prescription eyeglasses in the input photo, keep similar stylish professional eyewear nicely integrated.`,
      `- Elevate hair grooming into neat, natural, camera-ready styling while keeping original hair color and natural hairline.`,
      ``,
      `[DESIRED PHOTOGRAPHY STYLE]:`,
      `- Style: ${styleTitle || 'Executive Studio Headshot'}`,
      `- Backdrop & Environment: ${backdropDesc || 'Classic textured studio backdrop with soft gentle lighting'}.`,
      `- Wardrobe & Attire: ${wardrobeDesc || 'Crisp tailored business attire suited for an executive profile'}.`,
      `- Facial Expression & Mood: ${expressionDesc || 'Warm, confident, competent, and approachable professional expression'}.`,
      ``,
      `[STUDIO LIGHTING & CAMERA SPECIFICATIONS]:`,
      `- Lighting: Professional 3-point studio lighting setup (soft diffused 45-degree key light with large octabox, gentle warm fill light to lift shadows, subtle hair/rim light separating subject from background). Catchlights in the eyes.`,
      `- Camera & Optics: Shot on 85mm f/1.4 portrait prime lens at f/2.8 for tack-sharp focus on the subject's eyes and face, with creamy cinematic background bokeh (shallow depth of field).`,
      `- Color Grading: Natural true-to-life skin tones, balanced white balance, rich contrast, zero artifacts or synthetic plastic looks.`,
      customPrompt ? `[ADDITIONAL CLIENT DIRECTIVES]: ${customPrompt}` : '',
      `Output ONLY the final rendered photographic headshot image.`,
    ]
      .filter(Boolean)
      .join('\n');

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: promptInstructions,
    };

    // Supported aspect ratios for nano-banana: 1:1, 3:4, 4:3, 9:16, 16:9
    const validAspectRatios = ['1:1', '3:4', '4:3', '9:16', '16:9'];
    const chosenRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : '1:1';

    // Model configuration
    const selectedModel = model === 'gemini-3.1-flash-lite-image'
      ? 'gemini-3.1-flash-lite-image'
      : 'gemini-nano-banana-2.1';

    const config: any = {
      imageConfig: {
        aspectRatio: chosenRatio,
      },
    };

    if (selectedModel === 'gemini-nano-banana-2.1') {
      config.imageConfig.imageSize = quality === '2K' ? '2K' : '1K';
    }

    console.log(`[PersonaShot] Generating headshot with model ${selectedModel}, style: "${styleTitle}", ratio: ${chosenRatio}`);

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: {
        parts: [imagePart, textPart],
      },
      config,
    });

    let generatedImageUrl: string | null = null;
    let textFeedback: string | null = null;

    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const outMime = part.inlineData.mimeType || 'image/png';
          generatedImageUrl = `data:${outMime};base64,${part.inlineData.data}`;
        } else if (part.text) {
          textFeedback = part.text;
        }
      }
    }

    if (!generatedImageUrl) {
      return res.status(502).json({
        ok: false,
        error: textFeedback || 'No image was generated by the model. Please check the image and try again.',
      });
    }

    return res.json({
      ok: true,
      imageUrl: generatedImageUrl,
      modelUsed: selectedModel,
      aspectRatio: chosenRatio,
      timestamp: Date.now(),
      notes: textFeedback,
    });
  } catch (error: any) {
    console.error('[PersonaShot] Generation Error:', error);
    const msg = error?.message || 'Failed to generate headshot';
    return res.status(500).json({
      ok: false,
      error: msg,
    });
  }
});

// Start server with Vite middleware in dev mode
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[PersonaShot AI Studio Server] running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
