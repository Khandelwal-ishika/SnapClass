import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, AlertCircle, Sparkles, SwitchCamera, Scan } from 'lucide-react';

interface WebCamCaptureProps {
  onCapture: (imageDataUrl: string) => void;
  showScanLaser?: boolean;
  scanTargetText?: string;
  buttonLabel?: string;
  isScanning?: boolean;
}

export const WebCamCapture: React.FC<WebCamCaptureProps> = ({
  onCapture,
  showScanLaser = false,
  scanTargetText = 'Align face within biometric frame',
  buttonLabel = 'Capture Image',
  isScanning = false,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isFlashing, setIsFlashing] = useState<boolean>(false);

  const startCamera = useCallback(async () => {
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setErrorMessage('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      setStream(mediaStream);
      setHasPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.warn('Camera access failed:', err);
      setHasPermission(false);
      setErrorMessage(
        err.name === 'NotAllowedError'
          ? 'Camera permission was denied. Please allow camera permissions in your browser.'
          : 'Camera hardware is busy or unavailable. You can use sample biometric capture below.'
      );
    }
  }, [facingMode]);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const captureSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    onCapture(dataUrl);
  };

  const handleSimulatedCapture = () => {
    const sampleFaces = [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=80',
    ];
    const chosen = sampleFaces[Math.floor(Math.random() * sampleFaces.length)];
    onCapture(chosen);
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Video Viewfinder Container */}
      <div className="relative w-full aspect-4/3 max-h-[380px] bg-slate-950 rounded-2xl border border-slate-700/80 overflow-hidden flex items-center justify-center shadow-xl">
        {/* Flash Effect */}
        {isFlashing && (
          <div className="absolute inset-0 bg-white z-30 pointer-events-none transition-opacity duration-150" />
        )}

        {/* Live Camera Video Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''} ${
            hasPermission ? 'block' : 'hidden'
          }`}
        />

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />

        {/* High-Tech Biometric HUD Overlay */}
        {hasPermission && showScanLaser && (
          <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-between p-6">
            {/* Target Reticle corners */}
            <div className="w-48 h-48 md:w-56 md:h-56 relative border border-indigo-500/30 rounded-3xl flex items-center justify-center">
              <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-cyan-400 rounded-tl-md"></div>
              <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-cyan-400 rounded-tr-md"></div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-cyan-400 rounded-bl-md"></div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-cyan-400 rounded-br-md"></div>

              {/* Laser line */}
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#06b6d4] animate-modern-scan"></div>
            </div>

            {/* Target HUD text */}
            <div className="bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-semibold px-4 py-1.5 rounded-full border border-slate-700/80 flex items-center gap-2">
              <Scan className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>{isScanning ? 'Processing Biometric Vectors...' : scanTargetText}</span>
            </div>
          </div>
        )}

        {/* Camera Permission Denied or Fallback */}
        {hasPermission === false && (
          <div className="p-6 text-center text-slate-200 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <p className="text-xs font-medium text-slate-300 max-w-xs">{errorMessage}</p>
            <div className="flex gap-2 mt-1">
              <button
                onClick={startCamera}
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry
              </button>
              <button
                onClick={handleSimulatedCapture}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                Use Sample Face
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="w-full flex items-center justify-between gap-3 mt-4">
        {hasPermission && (
          <button
            onClick={toggleFacingMode}
            type="button"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition"
            title="Switch Camera"
          >
            <SwitchCamera className="w-4 h-4" />
            <span className="hidden sm:inline">Switch</span>
          </button>
        )}

        <button
          onClick={hasPermission ? captureSnapshot : handleSimulatedCapture}
          disabled={isScanning}
          type="button"
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition shadow-lg shadow-indigo-600/25"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Biometrics...</span>
            </>
          ) : (
            <>
              <Camera className="w-4 h-4 text-cyan-300" />
              <span>{buttonLabel}</span>
            </>
          )}
        </button>

        {hasPermission && (
          <button
            onClick={handleSimulatedCapture}
            type="button"
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold px-3 py-2.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition"
            title="Load sample test face"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Sample</span>
          </button>
        )}
      </div>
    </div>
  );
};
