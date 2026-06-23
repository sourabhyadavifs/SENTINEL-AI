import React, { useEffect, useState } from 'react';
import { Shield, Play, ArrowRight, Activity, Users, TrendingUp, Network, Zap, CheckCircle2 } from 'lucide-react';

interface LandingPageProps {
  onLaunch: () => void;
  onSimulate: () => void;
}

export default function LandingPage({ onLaunch, onSimulate }: LandingPageProps) {
  const [tickerLog, setTickerLog] = useState<string>('Initializing safety nodes...');
  const [stats, setStats] = useState({
    prevented: 11.2,
    protected: 21850,
    accuracy: 91.5,
    networks: 4980
  });

  // Ticker animation mimicking live intelligence updates
  useEffect(() => {
    const alerts = [
      'CRITICAL: FBI/CBI impersonation call block in South Delhi sector (+91 91048-xxxxx)',
      'ALERT: Spurt of FedEx Synthetic drug customs scams registered in Bengaluru IT Corridor',
      'INTEL: Jamtara Mule Account 49201xxxxx flagged for KYC laundering suspicious OTP loop',
      'ALERT: WhatsApp task "Like & Earn" phishing web-app blocked on national server',
      'PREDICTION: High risk of utility bill disconnection scams targeting Mumbai senior citizen nodes in next 48h',
      'SECURITY: 14 Deepfake audio recordings analyzed; Voice forgery confidence: 98.4%',
      'GEOINT: High Density Fraud Zone identified in Mewat cyber district; coordinated law enforcement notify sent'
    ];
    let i = 0;
    const interval = setInterval(() => {
      setTickerLog(alerts[i]);
      i = (i + 1) % alerts.length;
    }, 4000);

    // Minor stats ticking upward to show real-time persistence
    const statsInterval = setInterval(() => {
      setStats(prev => ({
        prevented: parseFloat((prev.prevented + 0.01).toFixed(2)),
        protected: prev.protected + Math.floor(Math.random() * 2) + 1,
        accuracy: parseFloat((prev.accuracy + (Math.random() * 0.05 - 0.02)).toFixed(1)),
        networks: prev.networks + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(statsInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between font-sans">
      {/* Background Tech Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Bar */}
      <header className="border-b border-zinc-900 bg-black/80 backdrop-blur-md px-6 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold tracking-widest relative overflow-hidden">
            <Shield className="w-5 h-5 absolute animate-pulse text-emerald-500" />
            <div className="absolute inset-0 bg-emerald-500/5" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-lg tracking-wider text-emerald-400">SENTINEL AI</h1>
            <p className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase">Public Safety Intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-zinc-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            SECURE COMMAND ONLINE
          </span>
          <button
            onClick={onLaunch}
            className="px-4 py-1.5 rounded border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition text-xs font-mono uppercase tracking-wider"
          >
            Terminal Access
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto relative z-10 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Title & Action */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 text-xs font-mono">
              <Zap className="w-3.5 h-3.5 fill-emerald-400/20" />
              <span>National Safety Portal v3.8-Live</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tight text-white leading-[1.1]">
                India's First AI-Powered <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-300 drop-shadow-[0_2px_10px_rgba(16,185,129,0.2)]">
                  Digital Public Safety
                </span> <br />
                Intelligence Platform
              </h2>
              <p className="text-zinc-400 text-base md:text-lg max-w-2xl font-light">
                Detect fraud, uncover scam networks, identify deepfakes, and protect citizens before financial loss occurs. Sentinel AI harnesses secure multi-agent reasoning, graph intelligence, and predictive modeling at national scale.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                id="btn-launch-platform"
                onClick={onLaunch}
                className="group px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 cursor-pointer"
              >
                Launch Intelligence Platform
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="btn-simulate-scam"
                onClick={onSimulate}
                className="px-8 py-4 rounded-lg bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-emerald-400 font-semibold transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-emerald-400" />
                Run Live Scam Simulation
              </button>
            </div>

            {/* Live Ticker */}
            <div className="p-4 rounded bg-zinc-950 border border-zinc-900 flex items-center gap-4 shadow-inner max-w-2xl">
              <div className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono tracking-wider uppercase rounded select-none shrink-0 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Live Intel
              </div>
              <div className="font-mono text-xs text-zinc-300 truncate w-full transition-all duration-500">
                {tickerLog}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Preview Screen */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl" />
            
            {/* Hologram Card Frame */}
            <div className="relative border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl p-6 rounded-2xl shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
              
              {/* Glassmorphic inner dashboard mockup */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="font-mono text-xs text-red-400">ACTIVE FRAUD ENFORCEMENT</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500">11:18:34 UTC</span>
                </div>

                {/* Animated agent blocks */}
                <div className="space-y-2">
                  <div className="p-3 bg-zinc-900/40 border border-zinc-900/60 rounded flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-emerald-500/10 flex items-center justify-center text-[10px] font-mono text-emerald-400">AG1</div>
                      <div>
                        <p className="text-xs font-medium text-zinc-200">Scam Detection Agent</p>
                        <p className="text-[10px] text-zinc-500 font-mono">Parsing CBI digital arrest transcript</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.5 bg-emerald-500/10 rounded">98% Match</span>
                  </div>

                  <div className="p-3 bg-zinc-900/40 border border-zinc-900/60 rounded flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center text-[10px] font-mono text-blue-400">AG3</div>
                      <div>
                        <p className="text-xs font-medium text-zinc-200">Graph Intelligence Agent</p>
                        <p className="text-[10px] text-zinc-500 font-mono">Tracing mule wallets to Deoghar cell</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-blue-400 px-1.5 py-0.5 bg-blue-500/10 rounded">Linked (5)</span>
                  </div>

                  <div className="p-3 bg-zinc-900/40 border border-zinc-900/60 rounded flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-purple-500/10 flex items-center justify-center text-[10px] font-mono text-purple-400">AG4</div>
                      <div>
                        <p className="text-xs font-medium text-zinc-200">Threat Prediction Agent</p>
                        <p className="text-[10px] text-zinc-500 font-mono">Forecasting Mumbai region growth</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-purple-400 px-1.5 py-0.5 bg-purple-500/10 rounded">Critical Zone</span>
                  </div>
                </div>

                {/* Simulated Waveform / Map preview */}
                <div className="h-20 rounded bg-black border border-zinc-900 p-2 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
                  <div className="flex items-end gap-1.5 w-full h-full justify-center">
                    {[30, 45, 90, 60, 40, 20, 80, 95, 30, 15, 60, 75, 90, 45, 20, 40, 85, 100, 70, 50, 30, 80, 95, 40, 25].map((h, index) => (
                      <div
                        key={index}
                        className="w-1.5 bg-emerald-500/30 rounded-t transition-all"
                        style={{
                          height: `${h}%`,
                          animation: `wave 1.5s ease-in-out infinite alternate ${index * 0.05}s`
                        }}
                      />
                    ))}
                  </div>
                  <span className="absolute bottom-2 left-3 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Forensic Voice Spectrum</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Grid of National Success Statistics */}
      <section className="border-t border-zinc-900 bg-black/60 py-10 relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Fraud Blocked</span>
            </div>
            <p className="text-2xl md:text-3xl font-sans font-black text-white">
              ₹{stats.prevented.toFixed(2)} Cr
            </p>
            <p className="text-[10px] text-zinc-500">Prevented financial damage since inception</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider">
              <Users className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Citizens Protected</span>
            </div>
            <p className="text-2xl md:text-3xl font-sans font-black text-white">
              {stats.protected.toLocaleString()}
            </p>
            <p className="text-[10px] text-zinc-500">Active citizens protected under Sentinel safety network</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider">
              <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Detection Accuracy</span>
            </div>
            <p className="text-2xl md:text-3xl font-sans font-black text-white">
              {stats.accuracy.toFixed(1)}%
            </p>
            <p className="text-[10px] text-zinc-500">Rigorous model classification confidence rating</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider">
              <Network className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Scam Rings Tracked</span>
            </div>
            <p className="text-2xl md:text-3xl font-sans font-black text-white">
              {stats.networks}
            </p>
            <p className="text-[10px] text-zinc-500">Organized syndicates catalogued in graph database</p>
          </div>

        </div>
      </section>

      {/* Mini footer */}
      <footer className="border-t border-zinc-950 bg-black py-4 px-6 flex flex-col md:flex-row items-center justify-between text-[10px] text-zinc-600 relative z-10 w-full font-mono">
        <p>© 2026 MINISTRY OF ELECTRONICS & INFORMATION TECHNOLOGY (MEITY) INTEGRATED PLATFORM</p>
        <p className="mt-2 md:mt-0 tracking-wider">SECURED UNDER CENTRAL ENCRYPTION STANDARDS V4.1</p>
      </footer>

      {/* Styled animation frames */}
      <style>{`
        @keyframes wave {
          0% { height: 10%; }
          100% { height: 95%; }
        }
      `}</style>
    </div>
  );
}
