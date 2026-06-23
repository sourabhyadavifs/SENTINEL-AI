import React, { useState } from 'react';
import { Map, TrendingUp, AlertTriangle, Filter, DollarSign, Zap } from 'lucide-react';
import { HeatmapPoint } from '../types';
import { INDIA_HEATMAP_DATA } from '../data/demoData';

export default function HeatmapView() {
  const [selectedCity, setSelectedCity] = useState<HeatmapPoint>(INDIA_HEATMAP_DATA[0]);
  const [activeScamFilter, setActiveScamFilter] = useState<string>('All Scams');
  const [activeTimeframe, setActiveTimeframe] = useState<string>('Next 7 Days');

  // Colors based on Density
  const getDensityColor = (density: HeatmapPoint['scamDensity']) => {
    switch (density) {
      case 'Critical': return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] border-red-400';
      case 'High': return 'bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)] border-orange-400';
      case 'Medium': return 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)] border-yellow-400';
      case 'Low': return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] border-emerald-400';
    }
  };

  const getDensityText = (density: HeatmapPoint['scamDensity']) => {
    switch (density) {
      case 'Critical': return 'text-red-400 font-bold';
      case 'High': return 'text-orange-400 font-semibold';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-emerald-400';
    }
  };

  // Pre-mapped visual offsets (percentages on a stylish coordinates bounding box)
  const mapCoordinates: Record<string, { top: string; left: string }> = {
    'New Delhi (NCR)': { top: '35%', left: '42%' },
    'Mumbai': { top: '65%', left: '33%' },
    'Bengaluru': { top: '80%', left: '45%' },
    'Hyderabad': { top: '70%', left: '50%' },
    'Chennai': { top: '82%', left: '52%' },
    'Kolkata': { top: '55%', left: '78%' }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full font-sans">
      
      {/* Map visual section */}
      <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 rounded-xl p-6 flex flex-col justify-between relative min-h-[480px]">
        
        {/* Heatmap Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-900 z-10">
          <div className="flex items-center gap-3">
            <Map className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold tracking-wider text-white uppercase">Geospatial Fraud Density Grid</h3>
              <p className="text-[10px] text-zinc-500 font-mono">Live India cyber surveillance & hotspot forecasting</p>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 font-mono uppercase text-[10px] flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filters:
            </span>
            <select 
              value={activeScamFilter} 
              onChange={e => setActiveScamFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs px-2.5 py-1 rounded focus:outline-none focus:border-emerald-500"
            >
              <option value="All Scams">All Scams</option>
              <option value="Digital Arrest">Digital Arrest</option>
              <option value="Customs Impersonation">Customs & Courier</option>
              <option value="UPI Cashback">UPI Cashback</option>
            </select>

            <select
              value={activeTimeframe}
              onChange={e => setActiveTimeframe(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs px-2.5 py-1 rounded focus:outline-none focus:border-emerald-500"
            >
              <option value="Next 7 Days">Predictive 7D Forecast</option>
              <option value="Past 24h">Past 24 Hours</option>
              <option value="Past 30d">Past 30 Days</option>
            </select>
          </div>
        </div>

        {/* Vector geometric outline representing India's physical boundary with modern styling */}
        <div className="flex-grow flex items-center justify-center relative p-4 my-4 bg-black/30 border border-zinc-900/60 rounded overflow-hidden h-[340px]">
          
          {/* Subtle design references in margins */}
          <div className="absolute top-3 left-3 font-mono text-[8px] text-zinc-600">
            BOUNDING FRAME: 8.4° N TO 37.6° N / 68.7° E TO 97.2° E
          </div>

          <div className="absolute top-3 right-3 font-mono text-[8px] text-zinc-600 flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 text-emerald-500" /> COGNITIVE FORECASTING: ACTIVE
          </div>

          {/* Stylized vector map shape backing the hotzones */}
          <svg className="w-full h-full max-w-[280px] max-h-[320px] opacity-15 text-emerald-500" viewBox="0 0 100 120" fill="currentColor">
            {/* Extremely approximate abstract geographic shape of India */}
            <path d="M 45 5 L 50 15 L 55 20 L 48 30 L 52 40 L 60 45 L 75 50 L 78 55 L 72 60 L 68 55 L 62 65 L 55 70 L 50 85 L 48 100 L 46 115 L 43 118 L 41 110 L 38 95 L 35 85 L 36 78 L 30 75 L 24 70 L 18 65 L 20 58 L 26 55 L 34 58 L 38 48 L 35 40 L 38 30 L 40 15 Z" />
          </svg>

          {/* Heat map points overlays */}
          {INDIA_HEATMAP_DATA.map(point => {
            const coord = mapCoordinates[point.city] || { top: '50%', left: '50%' };
            const isSelected = selectedCity.city === point.city;

            return (
              <div
                key={point.city}
                style={{ top: coord.top, left: coord.left, position: 'absolute' }}
                onClick={() => setSelectedCity(point)}
                className="group -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 flex items-center"
              >
                {/* Outer radar ping ring */}
                <span className="absolute flex h-5 w-5 -left-1">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 ${
                    point.scamDensity === 'Critical' ? 'bg-red-500' : 'bg-orange-500'
                  }`}></span>
                </span>

                {/* Main Dot */}
                <div className={`w-3.5 h-3.5 rounded-full border border-black z-10 transition-transform duration-300 ${getDensityColor(point.scamDensity)} ${
                  isSelected ? 'scale-150 ring-2 ring-white/50' : 'group-hover:scale-125'
                }`} />

                {/* Floating label */}
                <span className={`ml-2.5 px-2 py-0.5 rounded text-[9px] font-mono whitespace-nowrap bg-zinc-950/90 border border-zinc-900 shadow text-zinc-300 ${
                  isSelected ? 'border-emerald-500 text-emerald-400' : 'group-hover:text-white'
                }`}>
                  {point.city.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Heatmap Footer Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-zinc-900 text-[10px] text-zinc-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-red-500 inline-block" /> Critical Density</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-orange-500 inline-block" /> High</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-yellow-500 inline-block" /> Medium</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> Low</span>
          </div>
          <span className="text-emerald-400 uppercase tracking-widest text-[9px]">
            * Geospatial predictive grids refreshed under 1930 distress feedback
          </span>
        </div>

      </div>

      {/* Right panel: City Intelligence Dossier */}
      <div className="lg:col-span-4 bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex flex-col justify-between">
        
        <div className="space-y-4">
          
          {/* City Heading */}
          <div className="border-b border-zinc-900 pb-3">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">SELECTED ZONE FORENSICS</span>
            <h4 className="text-base font-bold text-white mt-0.5">{selectedCity.city}</h4>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] font-mono text-zinc-400">Threat Density:</span>
              <span className={`text-xs font-mono uppercase ${getDensityText(selectedCity.scamDensity)}`}>
                {selectedCity.scamDensity}
              </span>
            </div>
          </div>

          {/* Core Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-zinc-900 border border-zinc-900 rounded">
              <span className="text-[9px] font-mono text-zinc-500 block uppercase">Losses Saved</span>
              <span className="text-sm font-bold text-emerald-400">{selectedCity.lossesPrevented}</span>
            </div>
            <div className="p-3 bg-zinc-900 border border-zinc-900 rounded">
              <span className="text-[9px] font-mono text-zinc-500 block uppercase">Risk Trend</span>
              <span className="text-sm font-bold text-red-400">{selectedCity.growthRate}</span>
            </div>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <span className="text-zinc-600 text-[10px] uppercase block">Logged Complaints (24h)</span>
              <span className="text-zinc-300 font-bold">{selectedCity.complaintVolume} incident tickets</span>
            </div>

            <div>
              <span className="text-zinc-600 text-[10px] uppercase block">Dominant Modus Operandi</span>
              <span className="text-zinc-300 font-medium block p-2 bg-zinc-900 border border-zinc-900 rounded mt-1">
                {selectedCity.topScamType}
              </span>
            </div>

            {/* AI Risk Prediction 7-day */}
            <div className="p-3 bg-emerald-950/15 border border-emerald-900/30 rounded-lg space-y-1.5">
              <span className="text-emerald-400 font-bold text-[10px] uppercase flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> AI Predictive Intelligence
              </span>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                {selectedCity.riskForecast7Day}
              </p>
            </div>
          </div>

        </div>

        {/* Advisory Action */}
        <div className="pt-4 border-t border-zinc-900 mt-4 text-center">
          <div className="inline-flex items-center gap-1.5 text-[9px] text-zinc-500 font-mono uppercase bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
            <AlertTriangle className="w-3 h-3 text-yellow-400 shrink-0" />
            Emergent Alert Dispatched to State Cyber Units
          </div>
        </div>

      </div>

    </div>
  );
}
