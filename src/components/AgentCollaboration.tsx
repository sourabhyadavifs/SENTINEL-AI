import React, { useState, useEffect } from 'react';
import { Cpu, Terminal, Shield, ArrowRight, Server, MessageSquare, Zap, CheckCircle2 } from 'lucide-react';
import { AgentState } from '../types';

interface AgentCollaborationProps {
  isSimulating: boolean;
  onSimulationComplete?: () => void;
  scenarioTitle?: string;
}

export default function AgentCollaboration({ isSimulating, onSimulationComplete, scenarioTitle }: AgentCollaborationProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);

  // Individual specialized agents
  const [agents, setAgents] = useState<AgentState[]>([
    { id: '1', name: 'Scam Classification Agent', role: 'Language Forensics & Intent parser', status: 'idle', thought: 'Awaiting trigger data...', confidenceScore: 0 },
    { id: '2', name: 'Deepfake Audio Lab Agent', role: 'Acoustic vocoder analysis', status: 'idle', thought: 'Standby for waveform payload...', confidenceScore: 0 },
    { id: '3', name: 'Fraud Entity Intelligence Agent', role: 'Identity cross-referencing', status: 'idle', thought: 'Awaiting phone/Aadhaar/UPI indexes...', confidenceScore: 0 },
    { id: '4', name: 'Graph Topology Agent', role: 'Mule routing ring clustering', status: 'idle', thought: 'Standby for network coordinates...', confidenceScore: 0 },
    { id: '5', name: 'Threat Prediction Agent', role: 'Geospatial risk growth projection', status: 'idle', thought: 'Standing by for regional node counts...', confidenceScore: 0 },
    { id: '6', name: 'Citizen Safety & Copilot Agent', role: 'Localized advisory & recovery pathing', status: 'idle', thought: 'Standby to draft recovery instructions...', confidenceScore: 0 },
  ]);

  const pipelineSteps = [
    { label: 'User Payload Upload', desc: 'Sinks raw SMS/call transcript' },
    { label: 'Scam Classification', desc: 'Identifies extortion pressure models' },
    { label: 'Deepfake Audio Audit', desc: 'Analyses synthetic vocal clones' },
    { label: 'Fraud Entity Linkage', desc: 'Resolves phone & KYC indexes' },
    { label: 'Graph Ring Cluster', desc: 'Maps Jamtara/Mewat mule loops' },
    { label: 'Enforcement Action Dispatch', desc: 'Locks accounts & drafts legal FIR' }
  ];

  // Simulated agent reasoning sequencer
  useEffect(() => {
    if (!isSimulating) {
      setActiveStep(0);
      setLogs(['SYSTEM: Intelligence node standby. Ready to audit incoming suspicious data files.']);
      setAgents(prev => prev.map(a => ({ ...a, status: 'idle', thought: 'Awaiting trigger data...', confidenceScore: 0 })));
      return;
    }

    const logsList = [
      'SYSTEM: [Incoming Trigger] Suspicious file ingested. Initializing safety array...',
      'AGENT 1 [Scam Classification]: Evaluating transcript semantic patterns. Flagging authority coercion identifiers...',
      'AGENT 1 [Scam Classification]: Detected impersonation of CBI Delhi. Intent matches 98.4% Digital Arrest scam script profile.',
      'AGENT 2 [Deepfake Audio]: Auditing audio recording file... Checking vocoder phase margins.',
      'AGENT 2 [Deepfake Audio]: Alert! Discovered 4.2kHz artificial vocoder hum. Synthesized cloning confirmed.',
      'AGENT 3 [Fraud Entity]: Checking +91 91048-xxxxx SIM history with telecom Shortcodes.',
      'AGENT 3 [Fraud Entity]: Confirmed: Burner SIM activated using forged Aadhaar documents under fictitious name.',
      'AGENT 4 [Graph Topology]: Querying database ledger... Resolving destination UPI ID family.save@oksbi.',
      'AGENT 4 [Graph Topology]: Discovered cluster connection! Mule account routes to Mewat-Deoghar cyber-cells.',
      'AGENT 5 [Threat Prediction]: Synthesizing geopolitical density... Noida & Lucknow sectors show +31% scam growth trends.',
      'AGENT 6 [Citizen Safety]: Formulating custom recovery steps. Generating legal FIR draft dossier and NCRP compliance files.',
      'SYSTEM: Multi-agent security audit complete. Enforcement dossiers dispatched.'
    ];

    let currentLogIndex = 0;
    setActiveStep(1);

    const interval = setInterval(() => {
      if (currentLogIndex >= logsList.length) {
        clearInterval(interval);
        if (onSimulationComplete) onSimulationComplete();
        return;
      }

      const nextLog = logsList[currentLogIndex];
      setLogs(prev => [...prev, nextLog]);

      // Map progress ticks to specialized agent states
      setAgents(prev => {
        return prev.map((agent, idx) => {
          if (nextLog.includes(agent.name.split(' ')[0])) {
            let thought = '';
            let score = 0;
            if (idx === 0) {
              thought = 'Analyzing text semantic indices... Authority pressure and Digital arrest threats mapped.';
              score = 98;
            } else if (idx === 1) {
              thought = 'Scanning spectrograph data... Detected synthetic ElevenLabs vocoder anomalies.';
              score = 96;
            } else if (idx === 2) {
              thought = 'Resolving caller IMEI... SIM registered with fake documents linked to 4 external cases.';
              score = 92;
            } else if (idx === 3) {
              thought = 'Plotting transactional paths... Flagged Jamtara layering mule accounts.';
              score = 94;
            } else if (idx === 4) {
              thought = 'Projecting geospatial hotspot density... Noida sectors at Critical risk.';
              score = 88;
            } else if (idx === 5) {
              thought = 'Drafting court-ready FIR dossiers, legal NCRP timelines, and safety advice.';
              score = 99;
            }
            return {
              ...agent,
              status: 'analyzing',
              thought,
              confidenceScore: score
            };
          } else if (currentLogIndex > idx * 2 + 2) {
            return { ...agent, status: 'complete' };
          }
          return agent;
        });
      });

      // Advance visual pipeline steps
      if (currentLogIndex === 1) setActiveStep(1);
      if (currentLogIndex === 3) setActiveStep(2);
      if (currentLogIndex === 5) setActiveStep(3);
      if (currentLogIndex === 7) setActiveStep(4);
      if (currentLogIndex === 9) setActiveStep(5);
      if (currentLogIndex === 11) setActiveStep(6);

      currentLogIndex++;
    }, 1800);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full font-sans">
      
      {/* Left panel: Animated Agent flow chart */}
      <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[460px]">
        
        {/* Header */}
        <div className="border-b border-zinc-900 pb-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold tracking-wider text-white uppercase">Multi-Agent Cognitive Collaboration Array</h3>
              <p className="text-[10px] text-zinc-500 font-mono">Animated real-time machine-to-machine reasoning workflow</p>
            </div>
          </div>
          {isSimulating && (
            <span className="px-2 py-0.5 bg-red-950 border border-red-800 rounded font-mono text-[9px] text-red-400 uppercase tracking-widest animate-pulse">
              ANALYSIS CASCADE ACTIVE
            </span>
          )}
        </div>

        {/* Visual Pipeline Steps bar */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 py-2 bg-black/40 border border-zinc-900 rounded p-3 relative">
          {pipelineSteps.map((step, idx) => {
            const isActive = activeStep >= idx + 1;
            const isCurrent = activeStep === idx + 1;

            return (
              <div key={idx} className="relative text-center space-y-1 z-10">
                <div className={`w-8 h-8 rounded-full border mx-auto flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                  isCurrent 
                    ? 'bg-emerald-500 text-black border-white shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-110' 
                    : isActive 
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400' 
                      : 'bg-zinc-900/40 border-zinc-900 text-zinc-600'
                }`}>
                  {isActive && !isCurrent ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : idx + 1}
                </div>
                <h5 className={`text-[10px] font-bold ${isActive ? 'text-zinc-200' : 'text-zinc-600'}`}>{step.label}</h5>
                <p className="text-[8px] text-zinc-500 leading-tight hidden md:block">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Grid of active Agent slots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {agents.map((agent) => {
            return (
              <div
                key={agent.id}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  agent.status === 'analyzing'
                    ? 'bg-emerald-950/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] scale-[1.02]'
                    : agent.status === 'complete'
                      ? 'bg-zinc-900/40 border-zinc-900/60 opacity-80'
                      : 'bg-zinc-950 border-zinc-900/40 opacity-50'
                }`}
              >
                <div className="flex items-start justify-between border-b border-zinc-900/60 pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Server className={`w-4 h-4 ${agent.status === 'analyzing' ? 'text-emerald-400 animate-spin' : 'text-zinc-500'}`} />
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{agent.name}</h4>
                      <span className="text-[8px] font-mono text-zinc-500 uppercase">{agent.role}</span>
                    </div>
                  </div>

                  {agent.status === 'analyzing' && (
                    <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-[8px] font-mono text-emerald-400 uppercase rounded">
                      Thinking
                    </span>
                  )}
                  {agent.status === 'complete' && (
                    <span className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-[8px] font-mono text-zinc-400 uppercase rounded">
                      Done
                    </span>
                  )}
                </div>

                <p className="font-mono text-[10px] text-zinc-400 min-h-[30px] leading-relaxed">
                  {agent.thought}
                </p>

                {agent.confidenceScore > 0 && (
                  <div className="mt-2 pt-2 border-t border-zinc-900/40 flex items-center justify-between text-[9px] font-mono">
                    <span className="text-zinc-500">Confidence Match:</span>
                    <strong className="text-emerald-400">{agent.confidenceScore}%</strong>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Right panel: Active Agent Thought-logs and Terminal */}
      <div className="lg:col-span-4 bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex flex-col justify-between h-[460px] overflow-hidden">
        
        <div className="flex flex-col h-full justify-between">
          
          <div className="border-b border-zinc-900 pb-3 mb-3 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold tracking-widest text-white font-mono uppercase">Telemetry Output Logs</h4>
          </div>

          {/* Scrolling Terminal area */}
          <div className="flex-grow bg-black rounded p-3.5 border border-zinc-900 font-mono text-[10px] text-zinc-400 overflow-y-auto space-y-2 h-[300px]">
            {logs.map((log, index) => {
              let style = 'text-zinc-500';
              if (log.includes('SYSTEM')) style = 'text-emerald-400 font-bold';
              if (log.includes('ALERT') || log.includes('Alert')) style = 'text-red-400 font-bold';
              if (log.includes('AGENT')) style = 'text-zinc-300';

              return (
                <div key={index} className={`leading-relaxed border-l-2 pl-2 border-zinc-900 ${style}`}>
                  <span className="text-zinc-600 block text-[8px]">
                    [{new Date().toLocaleTimeString()}]
                  </span>
                  {log}
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-zinc-900 mt-3 font-mono text-[9px] text-zinc-500 flex justify-between items-center">
            <span>Grid Link Status: Secured</span>
            <span>Cascade: {activeStep}/6</span>
          </div>

        </div>

      </div>

    </div>
  );
}
