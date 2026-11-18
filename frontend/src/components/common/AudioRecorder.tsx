import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, RotateCcw, Volume2, AlertCircle } from 'lucide-react';

interface AudioRecorderProps {
  onAudioRecorded: (audioBlob: Blob, audioUrl: string) => void;
  promptText?: string;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onAudioRecorded,
  promptText = 'Speak roll call phrase into microphone.',
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [recordDuration, setRecordDuration] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      stopStreams();
    };
  }, []);

  const stopStreams = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#0B0F19';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.85;

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#4F46E5');
        gradient.addColorStop(1, '#06B6D4');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    render();
  };

  const startRecording = async () => {
    try {
      setErrorMessage('');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      drawWaveform();

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedUrl(url);
        onAudioRecorded(audioBlob, url);
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordDuration(0);

      timerRef.current = window.setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.warn('Microphone error:', err);
      setErrorMessage('Microphone access denied. You can use the demo voice sample below.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const resetRecording = () => {
    setRecordedUrl(null);
    setRecordDuration(0);
    audioChunksRef.current = [];
  };

  const handleSimulatedVoice = () => {
    const fakeBlob = new Blob(['sample-voice-data'], { type: 'audio/wav' });
    const dummyUrl = 'https://actions.google.com/sounds/v1/speech/hello_there.ogg';
    setRecordedUrl(dummyUrl);
    onAudioRecorded(fakeBlob, dummyUrl);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
      <div className="w-full text-center">
        <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-0.5">Acoustic Identification</p>
        <p className="text-xs font-medium text-slate-300">{promptText}</p>
      </div>

      {/* Waveform Visualizer Screen */}
      <div className="relative w-full h-24 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center shadow-inner">
        {isRecording ? (
          <canvas ref={canvasRef} width={400} height={96} className="w-full h-full object-cover" />
        ) : recordedUrl ? (
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
            <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Audio Clip Ready &bull; Duration: {formatSeconds(recordDuration || 4)}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <Mic className="w-4 h-4 text-slate-600" />
            <span>Microphone Standby &bull; Click Start Recording</span>
          </div>
        )}

        {/* Live Recording Badge */}
        {isRecording && (
          <div className="absolute top-2 right-2 bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            <span>REC {formatSeconds(recordDuration)}</span>
          </div>
        )}
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="text-xs text-rose-400 font-medium flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl w-full">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Audio Playback Controls */}
      {recordedUrl && !isRecording && (
        <div className="w-full">
          <audio src={recordedUrl} controls className="w-full h-10 rounded-xl" />
        </div>
      )}

      {/* Action Buttons */}
      <div className="w-full flex items-center justify-center gap-3">
        {!isRecording ? (
          <>
            <button
              onClick={startRecording}
              type="button"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer transition shadow-sm"
            >
              <Mic className="w-4 h-4" />
              <span>{recordedUrl ? 'Record New Clip' : 'Start Recording'}</span>
            </button>

            <button
              onClick={handleSimulatedVoice}
              type="button"
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition"
            >
              <span>Demo Audio</span>
            </button>
          </>
        ) : (
          <button
            onClick={stopRecording}
            type="button"
            className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer animate-pulse transition shadow-sm"
          >
            <Square className="w-4 h-4 fill-white" />
            <span>Complete Recording</span>
          </button>
        )}

        {recordedUrl && (
          <button
            onClick={resetRecording}
            type="button"
            className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 p-2.5 rounded-xl text-xs cursor-pointer transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
