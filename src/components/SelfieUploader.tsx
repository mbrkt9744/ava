import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Camera,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  X,
  AlertCircle,
  HelpCircle,
  Video,
} from 'lucide-react';
import { SAMPLE_SELFIES } from '../data/styles';
import { SampleSelfie } from '../types/headshot';

interface SelfieUploaderProps {
  currentSelfieUrl: string | null;
  onSelectSelfie: (dataUrl: string, sourceName?: string) => void;
  onClearSelfie: () => void;
}

export const SelfieUploader: React.FC<SelfieUploaderProps> = ({
  currentSelfieUrl,
  onSelectSelfie,
  onClearSelfie,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera on unmount or when camera deactivated
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setCountdown(null);
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access webcam. Please ensure camera permissions are granted or upload an image file.');
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          takeSnapshot();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Mirror image for natural selfie feel
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      onSelectSelfie(dataUrl, 'Webcam Selfie');
      setSelectedSampleId(null);
      stopCamera();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  const readFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onSelectSelfie(result, file.name);
      setSelectedSampleId(null);
      stopCamera();
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  const handleSelectSample = (sample: SampleSelfie) => {
    setSelectedSampleId(sample.id);
    onSelectSelfie(sample.dataUrl, sample.name);
    stopCamera();
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-5 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/30">
              1
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Upload Your Casual Selfie
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            A quick phone snap, webcam capture, or casual candid portrait works great.
          </p>
        </div>

        {currentSelfieUrl && (
          <button
            onClick={() => {
              onClearSelfie();
              setSelectedSampleId(null);
              stopCamera();
            }}
            className="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1 transition"
          >
            <X className="w-3.5 h-3.5" />
            <span>Remove Photo</span>
          </button>
        )}
      </div>

      {cameraError && (
        <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* Active Webcam View */}
      {isCameraActive && (
        <div className="relative rounded-xl overflow-hidden bg-black border border-slate-700 aspect-video max-h-[380px] mx-auto flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover -scale-x-100"
          />

          {/* Face Centering Oval Guide */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-48 h-64 rounded-[50%] border-2 border-dashed border-white/50 shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]" />
          </div>

          {/* Countdown Indicator */}
          {countdown !== null && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none">
              <span className="text-7xl font-black text-amber-400 animate-ping">
                {countdown}
              </span>
            </div>
          )}

          {/* Camera Action Bar */}
          <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-3">
            <button
              onClick={stopCamera}
              className="px-4 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-semibold backdrop-blur-md transition"
            >
              Cancel
            </button>
            <button
              onClick={capturePhoto}
              disabled={countdown !== null}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold text-xs shadow-lg shadow-rose-500/25 transition flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>Capture Photo</span>
            </button>
          </div>
        </div>
      )}

      {/* Current Photo Preview or Dropzone */}
      {!isCameraActive && (
        <>
          {currentSelfieUrl ? (
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="relative group w-36 h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0 shadow-lg">
                <img
                  src={currentSelfieUrl}
                  alt="Original Selfie"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-amber-300 font-bold border border-white/10">
                  INPUT PHOTO
                </div>
              </div>

              <div className="space-y-3 flex-1 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selfie Loaded Successfully</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Framing</span>
                    <span className="text-slate-200 font-medium">Head &amp; Shoulders Ready</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">AI Retouch</span>
                    <span className="text-amber-400 font-medium">Face Identity Locked</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Replace Image</span>
                  </button>
                  <button
                    onClick={startCamera}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Retake with Camera</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                isDragging
                  ? 'border-amber-400 bg-amber-500/10'
                  : 'border-slate-700/80 hover:border-slate-500 bg-slate-950/40 hover:bg-slate-950/70'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg">
                <Upload className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <p className="text-sm sm:text-base font-semibold text-white">
                  Drop your selfie here, or{' '}
                  <span className="text-amber-400 underline decoration-amber-400/50 underline-offset-4">
                    browse files
                  </span>
                </p>
                <p className="text-xs text-slate-400">
                  Supports JPG, PNG, WEBP up to 25MB • Natural lighting yields best results
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={startCamera}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition flex items-center gap-1.5"
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>Take Selfie with Webcam</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Quick Sample Selfies Tray */}
      <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Or try instantly with a sample casual photo:</span>
          </span>
          <span className="text-[11px] text-slate-500">1-click test</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SAMPLE_SELFIES.map((sample) => {
            const isSelected = selectedSampleId === sample.id;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className={`p-2 rounded-xl text-left transition border flex items-center gap-2.5 group ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/50 text-white'
                    : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                }`}
              >
                <div className="w-10 h-12 rounded-lg overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                  <img
                    src={sample.dataUrl}
                    alt={sample.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-xs text-white truncate">
                    {sample.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {sample.role}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
