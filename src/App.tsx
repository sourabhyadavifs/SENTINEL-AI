import React, { useState, useEffect } from 'react';
import { 
  Shield, ShieldAlert, Activity, TrendingUp, Users, Search, Network, 
  Fingerprint, Map, Cpu, FileText, Terminal, Settings, Play, ArrowRight, 
  Lock, Bell, Phone, ShieldCheck, AlertCircle, CheckCircle2, Download, 
  Plus, Send, RefreshCw, Sliders, UserCheck, Volume2, HelpCircle, 
  Briefcase, FileSpreadsheet, Scale, Info, Crosshair, ArrowLeft, Menu, X
} from 'lucide-react';

import { DemoScenario, ScamResult, ThreatLevel } from './types';
import { DEMO_SCENARIOS, DAILY_THREAT_INTEL } from './data/demoData';

import LandingPage from './components/LandingPage';
import NetworkGraph from './components/NetworkGraph';
import HeatmapView from './components/HeatmapView';
import DeepfakeLab from './components/DeepfakeLab';
import AgentCollaboration from './components/AgentCollaboration';
import ComplaintGenerator from './components/ComplaintGenerator';

export default function App() {
  const [isLanding, setIsLanding] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Scenario simulation states
  const [activeScenario, setActiveScenario] = useState<DemoScenario>(DEMO_SCENARIOS[0]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [completedSimulations, setCompletedSimulations] = useState<string[]>([]);

  // Module 1 states (Live Scam Detection)
  const [scamInputText, setScamInputText] = useState<string>('');
  const [scamResult, setScamResult] = useState<ScamResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Module 6 states (Citizen Safety Copilot)
  const [copilotLang, setCopilotLang] = useState<string>('English');
  const [copilotInput, setCopilotInput] = useState<string>('');
  const [copilotHistory, setCopilotHistory] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hello! I am your Sentinel AI Citizen Safety Copilot. How can I protect you or your relatives from online fraud today?' }
  ]);
  const [isCopilotTyping, setIsCopilotTyping] = useState<boolean>(false);

  // Module 8 states (Investigation Workspace)
  const [customNotes, setCustomNotes] = useState<string[]>([]);
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [newEvidenceName, setNewEvidenceName] = useState<string>('');

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Responsive sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Close sidebar on tab change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Auto load active scenario fields whenever scenario changes
  useEffect(() => {
    setScamInputText(activeScenario.inputText);
    setScamResult(activeScenario.scamResult);
    setCustomNotes([...activeScenario.investigationCase.notes]);
  }, [activeScenario]);

  // Hackathon: Trigger a comprehensive animation of all agents working
  const handleTriggerSimulation = (scenarioId?: string) => {
    const scenario = DEMO_SCENARIOS.find(s => s.id === scenarioId) || activeScenario;
    setActiveScenario(scenario);
    setIsLanding(false);
    setActiveTab('agent-collaboration');
    setIsSimulating(true);
  };

  // Callback when agent analysis completes
  const handleSimulationComplete = () => {
    setIsSimulating(false);
    setCompletedSimulations(prev => [...prev, activeScenario.id]);
    // Redirect to Dashboard or Fraud Network view to see results
    setActiveTab('dashboard');
  };

  // Run full-stack API to analyze custom user input or preset
  const handleAnalyzeScam = async () => {
    if (!scamInputText.trim()) return;
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-scam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: scamInputText })
      });
      const data = await response.json();
      if (data.result) {
        setScamResult(data.result);
        
        // Trigger a short animated agent flow to show collaboration
        setActiveTab('agent-collaboration');
        setIsSimulating(true);
      }
    } catch (err) {
      console.warn('Forensic evaluation failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Multilingual copilot message submission
  const handleSendCopilotMessage = async (presetText?: string) => {
    const textToSend = presetText || copilotInput;
    if (!textToSend.trim()) return;

    setCopilotHistory(prev => [...prev, { role: 'user', text: textToSend }]);
    setCopilotInput('');
    setIsCopilotTyping(true);

    try {
      const chatHistory = copilotHistory.map(h => ({
        role: h.role,
        text: h.text
      }));

      const response = await fetch('/api/copilot-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: copilotLang,
          history: chatHistory
        })
      });
      const data = await response.json();
      if (data.reply) {
        setCopilotHistory(prev => [...prev, { role: 'model', text: data.reply }]);
      }
    } catch (err) {
      console.warn('Copilot advisor offline:', err);
    } finally {
      setIsCopilotTyping(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      // Simulate reading and loading file content
      setScamInputText(`[SCANNED FILE ATTACHMENT: ${file.name}]\nAnalyzing metadata for fraudulent stamps or blackmail narrative...\nContent reads: CBI Warning ticket. Under drug laundering protocols, transfer ₹4,80,000 immediately.`);
    }
  };

  const handleAddCaseNote = () => {
    if (!newNoteText.trim()) return;
    setCustomNotes(prev => [...prev, newNoteText]);
    setNewNoteText('');
  };

  if (isLanding) {
    return (
      <LandingPage 
        onLaunch={() => setIsLanding(false)} 
        onSimulate={() => handleTriggerSimulation('cbi_digital_arrest')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex font-sans relative">
      
      {/* Overlay Backdrop for Mobile / Tablet Sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 1. SIDEBAR NAVIGATION PANEL */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 border-r border-zinc-900 bg-zinc-950 flex flex-col justify-between select-none
        transition-transform duration-300 ease-in-out shrink-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        
        <div className="space-y-6 py-5">
          {/* Logo Brand heading */}
          <div className="px-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setIsLanding(true)}>
              <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-wider text-white">SENTINEL AI</h2>
                <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase">National Safety Engine</span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 rounded bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
              title="Close Menu"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Info Block / Demo controller */}
          <div className="px-4">
            <div className="p-3.5 bg-zinc-900/40 border border-zinc-900 rounded-lg space-y-2">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Active Target Scenario</span>
              <select
                value={activeScenario.id}
                onChange={e => {
                  const sc = DEMO_SCENARIOS.find(s => s.id === e.target.value);
                  if (sc) setActiveScenario(sc);
                }}
                className="w-full bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 py-1.5 px-2 rounded focus:outline-none focus:border-emerald-500 font-mono"
              >
                {DEMO_SCENARIOS.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>

              <button
                onClick={() => handleTriggerSimulation()}
                className="w-full py-1.5 bg-emerald-950/40 hover:bg-emerald-950 border border-emerald-900/40 rounded text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1.5 transition"
              >
                <Play className="w-3 h-3 fill-emerald-400" /> Simulate Scenario
              </button>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          <nav className="space-y-1 px-3">
            {[
              { id: 'dashboard', label: 'Intelligence Dashboard', icon: <Activity className="w-4 h-4" /> },
              { id: 'live-scam', label: 'Live Scam Detection', icon: <Search className="w-4 h-4" /> },
              { id: 'network', label: 'Fraud Network Intel', icon: <Network className="w-4 h-4" /> },
              { id: 'deepfake', label: 'Deepfake Detection Lab', icon: <Fingerprint className="w-4 h-4" /> },
              { id: 'copilot', label: 'Citizen Safety Copilot', icon: <Users className="w-4 h-4" /> },
              { id: 'heatmap', label: 'India Fraud Heatmap', icon: <Map className="w-4 h-4" /> },
              { id: 'police', label: 'Police Command Center', icon: <Briefcase className="w-4 h-4" /> },
              { id: 'investigation', label: 'Investigation Workspace', icon: <FileSpreadsheet className="w-4 h-4" /> },
              { id: 'complaint', label: 'Complaint Generator', icon: <FileText className="w-4 h-4" /> },
              { id: 'threat-intel', label: 'Threat Intel Center', icon: <Scale className="w-4 h-4" /> },
              { id: 'agent-collaboration', label: 'Agent Collaboration View', icon: <Cpu className="w-4 h-4" /> },
              { id: 'settings', label: 'Settings & Telemetry', icon: <Settings className="w-4 h-4" /> },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-3 py-2 rounded-md text-xs font-medium flex items-center gap-2.5 transition text-left cursor-pointer ${
                    isActive 
                      ? 'bg-emerald-950/30 text-emerald-400 border-l-2 border-emerald-500 shadow-sm' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Small Admin Profile Footer */}
        <div className="p-4 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ID: SECURE_CORE_01</span>
          </div>
          <button 
            onClick={() => setIsLanding(true)}
            className="text-zinc-600 hover:text-white transition"
          >
            Log Out
          </button>
        </div>

      </aside>

      {/* 2. MAIN WORKING SCREEN */}
      <div className="flex-grow flex flex-col justify-between overflow-x-hidden min-w-0">
        
        {/* Upper Action Ticker & Active State header */}
        <header className="border-b border-zinc-900 bg-zinc-950 px-4 py-3 md:px-6 md:py-4 lg:px-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 select-none">
          <div className="flex items-center gap-2.5 md:gap-4 overflow-hidden">
            {/* Mobile/Tablet sidebar toggle button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer shrink-0"
              title="Open Navigation"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Back Button in Every Page */}
            <button
              onClick={() => setIsLanding(true)}
              className="group flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 rounded bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 hover:border-zinc-700 text-[10px] font-mono text-zinc-400 hover:text-white transition duration-200 cursor-pointer uppercase tracking-wider shrink-0"
              title="Return to Landing Hub"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform text-emerald-500" />
              <span>Back to Portal</span>
            </button>

            <div className="h-5 w-[1px] bg-zinc-900 shrink-0" />

            <div className="truncate">
              <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider text-white truncate">
                {activeTab.replace('-', ' ')}
              </h2>
              <p className="text-[9px] md:text-[10px] text-zinc-500 font-mono truncate">
                Sentinel Intelligence Node • Active Dossier: <strong className="text-zinc-300">{activeScenario.title}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/* Live Ticker Metrics */}
            <div className="px-2.5 py-1 bg-zinc-900/40 border border-zinc-800 rounded font-mono text-[9px] md:text-[10px] text-zinc-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>SYS INTENSITY: SECURE</span>
            </div>
            
            <div className="px-2.5 py-1 bg-zinc-900/40 border border-zinc-800 rounded font-mono text-[9px] md:text-[10px] text-zinc-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span>INCIDENTS REDIRECTED: 1,824</span>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content Selector */}
        <main className="flex-grow p-4 md:p-6 lg:p-8">
          
          {/* ====================================
              ROUTE 1: INTELLIGENCE DASHBOARD
              ==================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Emergency Bulletin Banner */}
              <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-red-400 font-mono uppercase">Critical Threat Alert: "Digital Arrest" Spike</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">
                      State registries indicate a 38% increase in extortion calls posing as Skype Narcotics interrogators. Ensure citizens freeze accounts immediately before wire routing.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => handleTriggerSimulation('cbi_digital_arrest')}
                  className="px-3 py-1.5 bg-red-950/40 hover:bg-red-950 border border-red-800/60 rounded text-[10px] font-mono text-red-400 uppercase tracking-widest shrink-0 transition"
                >
                  Run Incident Simulation
                </button>
              </div>

              {/* Big Statistics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: '₹12.5 Cr', subtitle: 'Fraud Loss Prevented', desc: 'Direct UPI/Bank ledger freeze holds', trend: '+14% this week' },
                  { title: '23,000+', subtitle: 'Protected Citizens', desc: 'Active surveillance node links', trend: 'Growing daily' },
                  { title: '94.2%', subtitle: 'Classifier Accuracy', desc: 'Acoustic & text forensic validation', trend: 'Verified' },
                  { title: '5,400+', subtitle: 'Syndicates Blocked', desc: 'Mule registries blacklisted in graph', trend: '98% Jamtara cluster accuracy' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-zinc-950 border border-zinc-900 p-5 rounded-xl space-y-1 relative overflow-hidden">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">{stat.subtitle}</span>
                    <p className="text-2xl font-black text-white">{stat.title}</p>
                    <p className="text-[10px] text-zinc-400">{stat.desc}</p>
                    <div className="pt-2 border-t border-zinc-900/60 flex items-center justify-between text-[9px] font-mono text-emerald-400">
                      <span>Telemetry Status: Active</span>
                      <span>{stat.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Core Dashboard Visual Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Active Case Forensics Preview Card */}
                <div className="lg:col-span-2 bg-zinc-950 border border-zinc-900 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-xs font-bold tracking-wider text-white uppercase font-mono">Selected Investigation Profile</h4>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500">CASE ID: {activeScenario.investigationCase.id}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3.5 bg-zinc-900/30 border border-zinc-900 rounded-lg space-y-1.5">
                      <span className="text-zinc-500 text-[10px] uppercase">Suspected Crime Modus</span>
                      <p className="text-zinc-200 font-bold">{activeScenario.scamCategory}</p>
                      <p className="text-[10px] text-zinc-400">Threat Evaluation: <strong className="text-red-400 uppercase">{activeScenario.threatLevel}</strong></p>
                    </div>

                    <div className="p-3.5 bg-zinc-900/30 border border-zinc-900 rounded-lg space-y-1.5">
                      <span className="text-zinc-500 text-[10px] uppercase">Forensic Financial Impact</span>
                      <p className="text-zinc-200 font-bold">{activeScenario.financialLoss}</p>
                      <p className="text-[10px] text-zinc-400">Escrow Destination: <strong className="text-zinc-300 font-bold">Mule Bank flagged</strong></p>
                    </div>
                  </div>

                  {/* Visual Timeline summary */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Incident Capture Timeline</span>
                    <div className="space-y-1.5">
                      {activeScenario.investigationCase.timeline.slice(0, 3).map((item, i) => (
                        <div key={i} className="p-2 bg-zinc-900/20 border border-zinc-900/50 rounded flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-600">[{item.time}]</span>
                            <span className="text-zinc-300 truncate max-w-[280px]">{item.event}</span>
                          </div>
                          <span className="text-[9px] text-zinc-500 uppercase">{item.source}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Forensics Action Tracker */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="border-b border-zinc-900 pb-3">
                      <h4 className="text-xs font-bold tracking-wider text-white uppercase font-mono">Threat Forecast & Growth</h4>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-3 bg-zinc-900/30 border border-zinc-900 rounded-lg space-y-1">
                        <span className="text-[9px] text-zinc-500 uppercase">Target Demographics (High)</span>
                        <p className="text-zinc-200">Senior Citizens (Retirees): 42%</p>
                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden mt-1">
                          <div className="h-full bg-red-500 w-[42%]" />
                        </div>
                      </div>

                      <div className="p-3 bg-zinc-900/30 border border-zinc-900 rounded-lg space-y-1">
                        <span className="text-[9px] text-zinc-500 uppercase">Weekly Prediction Target</span>
                        <p className="text-zinc-200">Current Extortion Loops: 124 cases</p>
                        <p className="text-[11px] text-emerald-400">Predicted Next Week: 177 cases (+31%)</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveTab('copilot')}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-semibold text-xs transition"
                  >
                    Open Safety Copilot
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* ====================================
              ROUTE 2: LIVE SCAM DETECTION CENTER
              ==================================== */}
          {activeTab === 'live-scam' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Text entry panel left */}
                <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 rounded-xl p-6 space-y-4 flex flex-col justify-between min-h-[440px]">
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-xs font-bold tracking-wider text-white uppercase font-mono">Fraud Text & File Parser</h4>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">Upload Preset:</span>
                        <select
                          value={activeScenario.id}
                          onChange={e => {
                            const sc = DEMO_SCENARIOS.find(s => s.id === e.target.value);
                            if (sc) setActiveScenario(sc);
                          }}
                          className="bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 rounded px-1.5 py-0.5 focus:outline-none"
                        >
                          {DEMO_SCENARIOS.map(s => (
                            <option key={s.id} value={s.id}>{s.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400">
                      Paste WhatsApp messages, suspicious text transcripts, emails, or select from ready-made presets below. You can also drag-and-drop screenshots or files for parsing.
                    </p>

                    {/* TextArea */}
                    <textarea
                      value={scamInputText}
                      rows={6}
                      onChange={e => setScamInputText(e.target.value)}
                      placeholder="Paste suspicious SMS, email body, or call transcription here..."
                      className="w-full p-3.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500 leading-relaxed"
                    />
                  </div>

                  {/* Actions & Preset buttons */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      
                      {/* Document upload file input */}
                      <div className="flex items-center gap-2">
                        <label className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-mono text-zinc-400 rounded cursor-pointer transition">
                          Upload Screenshot / File
                          <input type="file" accept="image/*,application/pdf" onChange={handleFileUpload} className="hidden" />
                        </label>
                        {uploadedFileName && (
                          <span className="text-[10px] text-zinc-500 font-mono truncate max-w-[150px]">
                            {uploadedFileName}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={handleAnalyzeScam}
                        disabled={isAnalyzing}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded transition flex items-center gap-2 shrink-0 disabled:opacity-50"
                      >
                        {isAnalyzing ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Forensic Scanning...
                          </>
                        ) : (
                          <>
                            <Crosshair className="w-3.5 h-3.5" /> Execute Cyber Forensic Audit
                          </>
                        )}
                      </button>

                    </div>

                    {/* Scenario fast toggles */}
                    <div className="pt-3 border-t border-zinc-900 flex flex-wrap gap-2">
                      <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block w-full">Fast Demo Scenarios</span>
                      {DEMO_SCENARIOS.map(s => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setActiveScenario(s);
                            setScamInputText(s.inputText);
                            setScamResult(s.scamResult);
                          }}
                          className={`px-2.5 py-1 rounded text-[10px] font-mono border transition ${
                            activeScenario.id === s.id
                              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/50'
                              : 'bg-zinc-900/40 border-zinc-900 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Audit results right */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  {scamResult ? (
                    <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 space-y-4">
                      
                      <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                        <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">SCAM DETECTED DIAGNOSTIC</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider ${
                          scamResult.threatLevel === 'Critical' 
                            ? 'bg-red-950 text-red-400 border border-red-800' 
                            : scamResult.threatLevel === 'High'
                              ? 'bg-orange-950 text-orange-400 border border-orange-800'
                              : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}>
                          {scamResult.threatLevel}
                        </span>
                      </div>

                      {/* Score circle */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full border-4 border-zinc-900 flex items-center justify-center text-center font-bold">
                          <span className={`text-lg font-black ${scamResult.probability > 75 ? 'text-red-400' : 'text-emerald-400'}`}>
                            {scamResult.probability}%
                          </span>
                          <div 
                            className="absolute inset-0 rounded-full border-4 border-emerald-500 animate-pulse opacity-40" 
                            style={{ clipPath: `polygon(50% 50%, -50% -50%, ${scamResult.probability}% -50%)` }}
                          />
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-white">{scamResult.category}</h4>
                          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Urgency Index: {scamResult.urgencyScore}/100 • Financial: {scamResult.financialRiskEstimate}</p>
                        </div>
                      </div>

                      {/* Brief rationale */}
                      <div className="p-3 bg-zinc-900/60 border border-zinc-900 rounded font-mono text-[11px] text-zinc-400 leading-relaxed">
                        {scamResult.explanation}
                      </div>

                      {/* Red flag evidence lists */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Discovered Red Flags</span>
                        <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                          {scamResult.evidence.map((ev, i) => (
                            <li key={i} className="flex items-start gap-2 text-zinc-400">
                              <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                              <span>{ev}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Explainability Report */}
                      <div className="p-3 bg-emerald-950/15 border border-emerald-900/30 rounded-lg space-y-1">
                        <span className="text-emerald-400 font-bold text-[9px] uppercase tracking-widest flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> AI Explainability Analysis
                        </span>
                        <p className="text-[10px] text-zinc-300 font-mono leading-relaxed">
                          {scamResult.explainabilityText}
                        </p>
                      </div>

                    </div>
                  ) : (
                    <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-8 flex items-center justify-center text-center text-zinc-500 font-mono text-xs h-full">
                      Input text or select preset and tap 'Execute Cyber Forensic Audit' to run intelligence scans.
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* ====================================
              ROUTE 3: FRAUD NETWORK INTELLIGENCE
              ==================================== */}
          {activeTab === 'network' && (
            <NetworkGraph 
              graphData={activeScenario.networkData} 
              onFreezeAccount={(acc) => {
                showToast(`ENFORCEMENT SYSTEM: HDFC request issued. Account '${acc}' is frozen under emergency Sec 102 CrPC protocol.`, 'success');
              }}
              onBlockPhone={(phone) => {
                showToast(`TELECOM INTERDICT: Block requested. SIM Card registered under '${phone}' has been blacklisted nationally.`, 'info');
              }}
            />
          )}

          {/* ====================================
              ROUTE 4: DEEPFAKE DETECTION LAB
              ==================================== */}
          {activeTab === 'deepfake' && (
            <DeepfakeLab analysisData={activeScenario.deepfakeData} />
          )}

          {/* ====================================
              ROUTE 5: CITIZEN SAFETY COPILOT
              ==================================== */}
          {activeTab === 'copilot' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full font-sans">
              
              {/* Form config options left */}
              <div className="lg:col-span-4 bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div className="border-b border-zinc-900 pb-3">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Advisor Settings</span>
                    <h4 className="text-sm font-bold text-white mt-1">Safety Copilot Core</h4>
                  </div>

                  {/* Language selection dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-zinc-500 font-mono text-[10px] uppercase">Response Language</label>
                    <select
                      value={copilotLang}
                      onChange={e => setCopilotLang(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 py-1.5 px-2 rounded focus:outline-none focus:border-emerald-500 font-mono"
                    >
                      {['English', 'Hindi', 'Marathi', 'Kannada', 'Tamil', 'Telugu', 'Bengali', 'Gujarati', 'Punjabi', 'Malayalam'].map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  {/* Immediate advice buttons */}
                  <div className="space-y-2 pt-3">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block">Immediate Help Triggers</span>
                    {[
                      { q: 'Someone claiming to be from CBI called me.', label: 'CBI Impersonation Check' },
                      { q: 'Can RBI freeze my savings account?', label: 'RBI Account Lock Law' },
                      { q: 'Is this cashback GPay refund safe?', label: 'Reverse UPI Phishing' },
                      { q: 'Should I share my OTP with courier?', label: 'OTP Handover Safety' }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendCopilotMessage(item.q)}
                        className="w-full text-left p-2.5 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 rounded text-xs text-zinc-300 font-mono leading-relaxed transition"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/15 border border-emerald-900/30 rounded text-[10px] font-mono text-zinc-400">
                  Dial **1930** instantly if you have lost money. Speed is critical to reverse transactional escrows.
                </div>

              </div>

              {/* Chat frame right */}
              <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex flex-col justify-between h-[450px]">
                
                <div className="flex flex-col h-full justify-between">
                  
                  {/* Chat logs */}
                  <div className="flex-grow bg-black rounded border border-zinc-900/60 p-4 font-sans text-xs overflow-y-auto space-y-4 h-[300px]">
                    {copilotHistory.map((item, idx) => {
                      const isUser = item.role === 'user';
                      return (
                        <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`p-3 max-w-[85%] rounded-lg leading-relaxed ${
                            isUser 
                              ? 'bg-zinc-900 border border-zinc-800 text-zinc-100' 
                              : 'bg-emerald-950/20 border border-emerald-900/30 text-emerald-300'
                          }`}>
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                              {isUser ? 'CITIZEN' : 'SENTINEL ADVISOR'}
                            </span>
                            <div className="prose prose-invert prose-xs">
                              {item.text.split('\n').map((line, k) => (
                                <p key={k} className="mt-1 font-mono text-[11px]">{line}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {isCopilotTyping && (
                      <div className="flex justify-start">
                        <div className="p-3 bg-zinc-900 rounded-lg text-zinc-500 font-mono text-xs animate-pulse">
                          Sentinel AI is drafting safety recovery roadmap...
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input form */}
                  <div className="flex items-center gap-2 mt-4">
                    <input
                      type="text"
                      placeholder="Type custom questions to assess risk..."
                      value={copilotInput}
                      onChange={e => setCopilotInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendCopilotMessage()}
                      className="flex-grow bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                    
                    <button
                      onClick={() => handleSendCopilotMessage()}
                      className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded transition"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ====================================
              ROUTE 6: INDIA FRAUD HEATMAP
              ==================================== */}
          {activeTab === 'heatmap' && (
            <HeatmapView />
          )}

          {/* ====================================
              ROUTE 7: POLICE COMMAND CENTER
              ==================================== */}
          {activeTab === 'police' && (
            <div className="space-y-6">
              
              {/* Alert Metrics bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                
                <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase">Active Distress Signals</span>
                  <p className="text-xl font-bold text-red-500">14 Distress Calls Online</p>
                </div>

                <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase">Linked Mule Accounts</span>
                  <p className="text-xl font-bold text-yellow-500">48 Mule Cards Flagged</p>
                </div>

                <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase">Enforcement Dispatch</span>
                  <p className="text-xl font-bold text-emerald-500">92.4% Lock Response Speed</p>
                </div>

              </div>

              {/* Police recommendations section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Suggested actions block */}
                <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 rounded-xl p-6 space-y-4">
                  
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-xs font-bold tracking-wider text-white uppercase font-mono">Suggested Enforcement Actions</h4>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs font-mono">
                    {activeScenario.policeLeads.suggestedActions.map((act, i) => (
                      <div key={i} className="p-3 bg-zinc-900/30 border border-zinc-900 rounded-lg flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-zinc-200">{act}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Queue workspace right */}
                <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-xl p-6 space-y-4">
                  <div className="border-b border-zinc-900 pb-3">
                    <h4 className="text-xs font-bold text-white uppercase font-mono">Active Investigation Leads</h4>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    {activeScenario.policeLeads.leads.map((ld, i) => (
                      <div key={i} className="p-3 bg-zinc-900/40 border border-zinc-900 rounded flex flex-col gap-1 text-zinc-300">
                        <span className="text-[9px] text-zinc-600 uppercase">LEAD INDICATOR {i + 1}</span>
                        <p>{ld}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ====================================
              ROUTE 8: INVESTIGATION WORKSPACE
              ==================================== */}
          {activeTab === 'investigation' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Timeline Case Profile left */}
                <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 rounded-xl p-6 space-y-4">
                  
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-xs font-bold tracking-wider text-white uppercase font-mono">Detailed Case Timeline Dossier</h4>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">TIMELINE LOG v4.2</span>
                  </div>

                  <div className="space-y-3">
                    {activeScenario.investigationCase.timeline.map((step, idx) => (
                      <div key={idx} className="p-3 bg-zinc-900/30 border border-zinc-900 rounded-lg flex items-start gap-4 text-xs font-mono">
                        <span className="text-emerald-400 font-bold bg-emerald-950/35 border border-emerald-900/40 px-2 py-0.5 rounded">
                          {step.time}
                        </span>
                        <div className="flex-grow">
                          <p className="text-zinc-200">{step.event}</p>
                          <span className="text-[9px] text-zinc-600 uppercase mt-0.5 block">CAPTURED SOURCE: {step.source}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add case evidence attachment form */}
                  <div className="pt-4 border-t border-zinc-900 space-y-3">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Add Forensic Evidence Chain</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Evidence label (e.g. Call Audio, WhatsApp screenshot)"
                        value={newEvidenceName}
                        onChange={e => setNewEvidenceName(e.target.value)}
                        className="bg-zinc-900 border border-zinc-850 rounded px-2.5 py-1.5 text-xs focus:outline-none text-white font-mono"
                      />
                      <button
                        onClick={() => {
                          if (!newEvidenceName.trim()) return;
                          showToast(`CASE WORKSPACE: Added evidence '${newEvidenceName}' securely registered into local ledger Chain.`, 'success');
                          setNewEvidenceName('');
                        }}
                        className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 rounded text-xs font-mono py-1.5 px-3 text-zinc-400 hover:text-white uppercase"
                      >
                        Secure Log Evidence
                      </button>
                    </div>
                  </div>

                </div>

                {/* Case notes right panel */}
                <div className="lg:col-span-4 bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex flex-col justify-between">
                  
                  <div className="space-y-4">
                    <div className="border-b border-zinc-900 pb-3">
                      <h4 className="text-xs font-bold text-white uppercase font-mono">Enforcement Investigation Notes</h4>
                    </div>

                    <div className="space-y-2 max-h-[220px] overflow-y-auto">
                      {customNotes.map((note, idx) => (
                        <div key={idx} className="p-3 bg-zinc-900/40 border border-zinc-900 rounded text-xs font-mono text-zinc-400">
                          <span className="text-[9px] text-zinc-600 block">NOTE #{idx + 1}</span>
                          <p className="mt-0.5 leading-relaxed">{note}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-2 border-t border-zinc-900/60">
                      <textarea
                        value={newNoteText}
                        rows={2}
                        onChange={e => setNewNoteText(e.target.value)}
                        placeholder="Add professional observation..."
                        className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-white focus:outline-none"
                      />
                      <button
                        onClick={handleAddCaseNote}
                        className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded text-white font-semibold text-xs transition"
                      >
                        Append Case Note
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-zinc-900 text-center font-mono text-[9px] text-zinc-600">
                    NOTES LEDGER LOGGED SECURELY
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ====================================
              ROUTE 9: COMPLAINT GENERATOR
              ==================================== */}
          {activeTab === 'complaint' && (
            <ComplaintGenerator firData={activeScenario.firDraft} />
          )}

          {/* ====================================
              ROUTE 10: THREAT INTELLIGENCE CENTER
              ==================================== */}
          {activeTab === 'threat-intel' && (
            <div className="space-y-6">
              
              {/* Daily briefings card */}
              <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-xl space-y-3">
                <span className="text-emerald-400 font-bold text-xs uppercase font-mono tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> MEITY / Central Cybercrime Advisory
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed font-mono bg-black/40 border border-zinc-900 p-4 rounded shadow-inner">
                  {DAILY_THREAT_INTEL.dailySummary}
                </p>
              </div>

              {/* Emerging tactics scripts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Trending Fraud Call Scripts</h4>
                  <div className="space-y-4 font-mono text-xs">
                    {DAILY_THREAT_INTEL.trendingScripts.map((sc, i) => (
                      <div key={i} className="p-3.5 bg-zinc-900/30 border border-zinc-900 rounded-lg space-y-1.5">
                        <strong className="text-white text-[13px]">{sc.title}</strong>
                        <p className="text-[10px] text-zinc-500 uppercase">Category: {sc.category}</p>
                        <p className="text-red-400 italic bg-black/30 p-2 border border-zinc-900 rounded">
                          {sc.scriptSnippet}
                        </p>
                        <p className="text-[11px] text-emerald-400">Countermeasure: {sc.counterMeasure}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Targeted demographics charts metrics */}
                <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Most Targeted Demographics</h4>
                  
                  <div className="space-y-3 font-mono text-xs">
                    {DAILY_THREAT_INTEL.targetedDemographics.map((dem, i) => (
                      <div key={i} className="p-3.5 bg-zinc-900/30 border border-zinc-900 rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <strong className="text-zinc-200">{dem.group}</strong>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                            dem.vulnerabilityLevel === 'High' ? 'bg-red-950 border border-red-800 text-red-400' : 'bg-yellow-950 border border-yellow-800 text-yellow-400'
                          }`}>
                            Vulnerability: {dem.vulnerabilityLevel}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500">Primary Scam: {dem.scamType}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-grow h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${dem.percentage}%` }} />
                          </div>
                          <span className="text-[10px] font-bold text-white shrink-0">{dem.percentage}% of all cases</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ====================================
              ROUTE 11: AGENT COLLABORATION VIEW
              ==================================== */}
          {activeTab === 'agent-collaboration' && (
            <AgentCollaboration 
              isSimulating={isSimulating} 
              onSimulationComplete={handleSimulationComplete}
              scenarioTitle={activeScenario.title}
            />
          )}

          {/* ====================================
              ROUTE 12: SETTINGS & TELEMETRY CONTROLS
              ==================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 font-mono text-xs">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-xl space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase border-b border-zinc-900 pb-2">Central Telemetry Settings</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Forensic Database State:</span>
                      <span className="text-emerald-400 font-bold">CONNECTED (1,824 NODES)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Gemini API Key Proxy:</span>
                      <span className="text-emerald-400 font-bold">SECURE / SERVER-ONLY</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">National 1930 Helpline Sync:</span>
                      <span className="text-emerald-400 font-bold">ACTIVE ENFORCEMENT SYNC</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Central IP Registry Location:</span>
                      <span className="text-zinc-300">New Delhi Wing, MeitY Cyber cell</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-white uppercase border-b border-zinc-900 pb-2">Reset & Debug Controls</h4>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                      Utilize these triggers to manually clean case histories, force specific cyber Extortion profiles, or reset the interface.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setCompletedSimulations([]);
                        showToast('SYSTEM INTEGRITY: Checked and cleaned case state caches.', 'info');
                      }}
                      className="py-2 bg-zinc-900 hover:bg-zinc-850 rounded text-zinc-300 border border-zinc-850 uppercase text-xs"
                    >
                      Clear Simulation Caches
                    </button>

                    <button
                      onClick={() => setIsLanding(true)}
                      className="py-2 bg-zinc-900 hover:bg-zinc-850 rounded text-zinc-300 border border-zinc-850 uppercase text-xs"
                    >
                      Return to Welcome Screen
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

        </main>

        {/* Lower console stats footer */}
        <footer className="border-t border-zinc-900 bg-zinc-950 py-3 px-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-zinc-500 font-mono select-none">
          <p>© MEITY INTEGRATED PUBLIC SAFETY DEFENSE ARRAY</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span>ENFORCEMENT API ACTIVE</span>
            <span>CENTRAL REGISTRY CLUSTERING: SECURED</span>
          </div>
        </footer>

      </div>

      {/* Floating System Notification/Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 border border-zinc-800 text-zinc-100 p-4 rounded-xl shadow-2xl flex items-center gap-3 max-w-sm border-l-4 border-l-emerald-500">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <div className="font-mono text-[11px] leading-relaxed flex-grow">
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">National Security Terminal Alert</span>
            {toast.message}
          </div>
          <button 
            onClick={() => setToast(null)} 
            className="text-zinc-500 hover:text-white font-bold font-mono text-sm px-1 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

    </div>
  );
}
