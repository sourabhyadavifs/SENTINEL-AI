import React, { useState, useEffect, useRef } from 'react';
import { Fingerprint, Volume2, ShieldAlert, AlertTriangle, Zap, CheckCircle2, Play, Pause } from 'lucide-react';
import { DeepfakeAnalysis } from '../types';

interface DeepfakeLabProps {
  analysisData?: DeepfakeAnalysis;
}

export default function DeepfakeLab({ analysisData }: DeepfakeLabProps) {
  const [activeAnalysis, setActiveAnalysis] = useState<DeepfakeAnalysis | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [customFile, setCustomFile] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (analysisData) {
      setActiveAnalysis(analysisData);
    } else {
      // Default initial mock state
      setActiveAnalysis({
        isFake: true,
        probability: 89,
        confidenceLevel: 94,
        technicalIndicators: {
          voiceCloning: true,
          artificialSpeechRatio: 88,
          audioArtifactsScore: 76,
          noiseInconsistencies: true
        },
        waveformPoints: [20, 40, -10, -50, 30, 80, 10, -20, 60, 40, -80, -20, 40, 90, 10, -30, -60, 50, 80, -20, -10],
        spectralAnomalies: [
          'High frequency vocoder phase correlation (typical of synthetic audio pipelines)',
          'Flattened pitch prosody without natural physiological micro-vibrations',
          'Inconsistent environment noise decay rate over continuous consonants'
        ],
        findingsExplanation: 'Spectrograph scans indicate high correlation with ElevenLabs v2 voice clone vocoders. Perfect mathematical pitch peaks reveal synthetic neural vocoding.'
      });
    }
  }, [analysisData]);

  // Animated Waveform Spectrograph Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth || 400;
    let height = canvas.height = canvas.offsetHeight || 150;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background grid lines
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let j = 0; j < height; j += 20) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        ctx.stroke();
      }

      // Draw multi-layered glowing forensic waves
      const drawWave = (amplitude: number, frequency: number, color: string, speed: number, lineWidth: number) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();

        for (let x = 0; x < width; x++) {
          const y = height / 2 + Math.sin(x * frequency + phase * speed) * amplitude * Math.sin(x * 0.005);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      };

      if (isPlaying) {
        phase += 0.25;
        // Fast dynamic active audio waves
        drawWave(40, 0.015, 'rgba(16, 185, 129, 0.4)', 0.5, 2);
        drawWave(25, 0.03, 'rgba(16, 185, 129, 0.2)', -0.8, 1);
        drawWave(15, 0.05, 'rgba(239, 68, 68, 0.3)', 1.2, 1); // Synthetic distortion wave red
      } else {
        // Slow standby idle wave
        drawWave(10, 0.008, 'rgba(82, 82, 91, 0.3)', 0.1, 1);
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 400;
      height = canvas.height = canvas.offsetHeight || 150;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current || 0);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomFile(file.name);
      setIsPlaying(true);
      // Generate randomized fake detection for custom upload
      setActiveAnalysis({
        isFake: Math.random() > 0.4,
        probability: Math.floor(Math.random() * 45) + 50,
        confidenceLevel: Math.floor(Math.random() * 15) + 80,
        technicalIndicators: {
          voiceCloning: Math.random() > 0.3,
          artificialSpeechRatio: Math.floor(Math.random() * 40) + 50,
          audioArtifactsScore: Math.floor(Math.random() * 30) + 60,
          noiseInconsistencies: Math.random() > 0.5
        },
        waveformPoints: [10, 30, -50, 20, 60, -90, 40, -10],
        spectralAnomalies: [
          'Abrupt frequency cut-offs detected at 8kHz acoustic boundary.',
          'Formant amplitude levels exceed human physiologic ranges by 4dB.'
        ],
        findingsExplanation: `Scanned custom audio file '${file.name}'. Spectrograph indicates elevated robotic artifact scores, suggesting generative speech synthesizers.`
      });
    }
  };

  if (!activeAnalysis) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full font-sans">
      
      {/* Waveform Canvas Visualization */}
      <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex flex-col justify-between min-h-[420px]">
        
        {/* Lab Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <Fingerprint className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold tracking-wider text-white uppercase">Acoustic Deepfake Forensic Center</h3>
              <p className="text-[10px] text-zinc-500 font-mono">Neural voice cloning & spectral phase analysis</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-emerald-400 rounded cursor-pointer transition">
              Upload Audio/Voice
              <input type="file" accept="audio/*,video/*" onChange={handleFileUpload} className="hidden" />
            </label>
            {customFile && (
              <span className="text-[9px] text-zinc-500 font-mono truncate max-w-[120px]">
                {customFile}
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Waveform Visualizer Screen */}
        <div className="flex-grow flex flex-col justify-between bg-black rounded-lg border border-zinc-900 my-4 p-4 relative overflow-hidden">
          
          <div className="flex items-center justify-between z-10 select-none">
            <span className="font-mono text-[9px] text-zinc-500 tracking-wider">SPECTROGRAPH SAMPLER ACTIVE</span>
            <span className="font-mono text-[9px] text-emerald-400 flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-900/30 px-2 py-0.5 rounded">
              <Volume2 className="w-3 h-3 animate-pulse" /> 
              {isPlaying ? 'PLAYING BACK SCANS (24,000 Hz)' : 'ACQUISITION READY'}
            </span>
          </div>

          {/* HTML5 Interactive Oscilloscope Canvas */}
          <canvas ref={canvasRef} className="w-full h-40" />

          {/* Player controls */}
          <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 z-10">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-white flex items-center gap-2 transition"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> Pause Forensics
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" /> Listen Voice Print
                </>
              )}
            </button>

            <div className="flex gap-4 text-[9px] text-zinc-500 font-mono uppercase tracking-widest">
              <span>Vocoder: WaveNet v2</span>
              <span>Sample integrity: Checked</span>
            </div>
          </div>

        </div>

        {/* Waveform Spectral anomalies report */}
        <div className="space-y-2">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Acoustic Anomalies Discovered</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activeAnalysis.spectralAnomalies.map((anom, i) => (
              <div key={i} className="p-2.5 bg-zinc-900/30 border border-zinc-900 rounded font-mono text-[10px] text-zinc-400 flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                <span>{anom}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right panel: Deepfake Diagnostic Metrics */}
      <div className="lg:col-span-4 bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex flex-col justify-between">
        
        <div className="space-y-4">
          
          <div className="border-b border-zinc-900 pb-3">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Forensic Report Summary</span>
            <h4 className="text-sm font-bold text-white mt-1">Authenticity Diagnostic</h4>
          </div>

          {/* Dials for Probabilities */}
          <div className="space-y-4">
            
            {/* Main Risk Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Deepfake Probability:</span>
                <span className={`font-bold ${activeAnalysis.isFake ? 'text-red-400' : 'text-emerald-400'}`}>
                  {activeAnalysis.probability}%
                </span>
              </div>
              <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-900">
                <div 
                  className={`h-full transition-all duration-1000 ${activeAnalysis.isFake ? 'bg-red-500' : 'bg-emerald-500'}`}
                  style={{ width: `${activeAnalysis.probability}%` }}
                />
              </div>
            </div>

            {/* Diagnostic Indicators */}
            <div className="space-y-2 font-mono text-xs">
              <span className="text-[9px] text-zinc-600 uppercase tracking-widest block">Synthesizer Indicators</span>
              
              <div className="p-3 bg-zinc-900 border border-zinc-900 rounded space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-[11px]">Neural Voice Cloning:</span>
                  <span className={`text-[11px] ${activeAnalysis.technicalIndicators.voiceCloning ? 'text-red-400' : 'text-emerald-400'}`}>
                    {activeAnalysis.technicalIndicators.voiceCloning ? 'DETECTED' : 'CLEARED'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-[11px]">Artificial Speech Ratio:</span>
                  <span className="text-[11px] text-zinc-300">
                    {activeAnalysis.technicalIndicators.artificialSpeechRatio}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-[11px]">Acoustic Phase Artifacts:</span>
                  <span className="text-[11px] text-red-400 font-bold">
                    {activeAnalysis.technicalIndicators.audioArtifactsScore}/100
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-[11px]">Ambient Discrepancy:</span>
                  <span className={`text-[11px] ${activeAnalysis.technicalIndicators.noiseInconsistencies ? 'text-red-400' : 'text-emerald-400'}`}>
                    {activeAnalysis.technicalIndicators.noiseInconsistencies ? 'FLAGGED' : 'STABLE'}
                  </span>
                </div>
              </div>

            </div>

            {/* Deepfake explanation */}
            <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-lg space-y-1">
              <span className="text-red-400 font-bold text-[9px] uppercase tracking-widest flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Core Forensic Findings
              </span>
              <p className="text-[11px] text-zinc-300 font-mono leading-relaxed">
                {activeAnalysis.findingsExplanation}
              </p>
            </div>

          </div>

        </div>

        {/* Verdict Badge */}
        <div className="pt-4 border-t border-zinc-900 mt-4 text-center">
          {activeAnalysis.isFake ? (
            <div className="p-2 bg-red-950/30 border border-red-800/40 text-red-400 text-xs font-mono uppercase tracking-widest rounded flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              SYNTHETIC DEEPFAKE VERDICT
            </div>
          ) : (
            <div className="p-2 bg-emerald-950/30 border border-emerald-800/40 text-emerald-400 text-xs font-mono uppercase tracking-widest rounded flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              AUTHENTIC SPEECH VERDICT
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
