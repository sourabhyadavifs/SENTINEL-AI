import React, { useState } from 'react';
import { Network, ShieldAlert, CheckCircle2, User, Phone, Laptop, CreditCard, Crosshair, Ban, Lock, Search } from 'lucide-react';
import { Node, Link, NetworkGraphData } from '../types';

interface NetworkGraphProps {
  graphData: NetworkGraphData;
  onFreezeAccount?: (acc: string) => void;
  onBlockPhone?: (phone: string) => void;
}

export default function NetworkGraph({ graphData, onFreezeAccount, onBlockPhone }: NetworkGraphProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedType, setHighlightedType] = useState<string | null>(null);

  // Map types to distinct high-contrast UI colors and icons
  const getNodeColor = (node: Node) => {
    if (node.status === 'Flagged') return 'border-red-500 text-red-400 bg-red-950/40 shadow-[0_0_15px_rgba(239,68,68,0.4)]';
    if (node.status === 'Investigating') return 'border-yellow-500 text-yellow-400 bg-yellow-950/40 shadow-[0_0_15px_rgba(234,179,8,0.3)]';
    return 'border-emerald-500 text-emerald-400 bg-emerald-950/20';
  };

  const getNodeIcon = (type: Node['type']) => {
    switch (type) {
      case 'Victim': return <User className="w-5 h-5" />;
      case 'Fraudster': return <Crosshair className="w-5 h-5 text-red-400" />;
      case 'Phone': return <Phone className="w-5 h-5 text-yellow-400" />;
      case 'Device': return <Laptop className="w-5 h-5 text-blue-400" />;
      case 'Account': return <CreditCard className="w-5 h-5 text-purple-400" />;
    }
  };

  // Pre-calculated coordinates for a gorgeous balanced grid layout (6 nodes maximum)
  const nodePositions: Record<string, { x: number; y: number }> = {
    v1: { x: 150, y: 250 },      // Victim Dr Ramesh S.
    f1: { x: 450, y: 150 },      // Caller Vijay
    p1: { x: 300, y: 100 },      // Phone Sim
    a1: { x: 350, y: 320 },      // HDFC Account
    d1: { x: 600, y: 120 },      // Device OnePlus
    a2: { x: 550, y: 300 },      // SBI Account
    // Backup positions for FedEx/Customs cases
    v2: { x: 150, y: 250 },
    f2: { x: 450, y: 150 },
    p2: { x: 300, y: 120 },
    a3: { x: 400, y: 320 },
    d2: { x: 580, y: 200 },
    // UPI Scam Case
    v3: { x: 150, y: 250 },
    f3: { x: 450, y: 150 },
    p3: { x: 300, y: 100 },
    a4: { x: 450, y: 320 },
    // Deepfake Voice clone
    v4: { x: 150, y: 320 },
    child: { x: 150, y: 150 },
    f4: { x: 450, y: 150 },
    a5: { x: 400, y: 320 },
    p4: { x: 300, y: 100 },
  };

  // Get position or generate dynamic circular position for safety fallback
  const getPosition = (id: string, index: number, total: number) => {
    if (nodePositions[id]) return nodePositions[id];
    const angle = (index / total) * 2 * Math.PI;
    return {
      x: 350 + Math.cos(angle) * 160,
      y: 200 + Math.sin(angle) * 120
    };
  };

  // Process nodes
  const filteredNodes = graphData.nodes.filter(node => {
    const matchesSearch = node.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (node.details && node.details.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = !highlightedType || node.type === highlightedType;
    return matchesSearch && matchesType;
  });

  const selectedNode = graphData.nodes.find(n => n.id === selectedNodeId) || graphData.nodes[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full font-sans">
      
      {/* Left panel: Interactive canvas */}
      <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden min-h-[450px]">
        
        {/* Graph Header Tools */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-zinc-900 z-10 bg-zinc-950/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Network className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold tracking-wider text-white uppercase">Forensic Entity Relationship Graph</h3>
              <p className="text-[10px] text-zinc-500 font-mono">Select entities to trace laundering channels</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search nodes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 w-40"
              />
            </div>
            
            <button
              onClick={() => { setSelectedNodeId(null); setHighlightedType(null); setSearchQuery(''); }}
              className="px-2 py-1 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded text-[10px] text-zinc-400 font-mono uppercase"
            >
              Reset view
            </button>
          </div>
        </div>

        {/* Node Filters */}
        <div className="flex gap-2 py-2 overflow-x-auto z-10">
          {(['Victim', 'Fraudster', 'Account', 'Device', 'Phone'] as Node['type'][]).map(type => (
            <button
              key={type}
              onClick={() => setHighlightedType(highlightedType === type ? null : type)}
              className={`px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase transition ${
                highlightedType === type 
                  ? 'bg-emerald-500 text-black border border-emerald-400' 
                  : 'bg-zinc-900/60 border border-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Dynamic SVG Relationship Plotter */}
        <div className="flex-grow relative flex items-center justify-center my-4 overflow-hidden border border-zinc-900/60 rounded bg-black/40">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: '700px', minHeight: '350px' }}>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" opacity="0.6" />
              </marker>
              <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Links / Edges */}
            {graphData.links.map((link, idx) => {
              const sourceNode = graphData.nodes.find(n => n.id === link.source);
              const targetNode = graphData.nodes.find(n => n.id === link.target);
              if (!sourceNode || !targetNode) return null;

              const sourceIdx = graphData.nodes.indexOf(sourceNode);
              const targetIdx = graphData.nodes.indexOf(targetNode);

              const sPos = getPosition(link.source, sourceIdx, graphData.nodes.length);
              const tPos = getPosition(link.target, targetIdx, graphData.nodes.length);

              const isSuspicious = sourceNode.status === 'Flagged' || targetNode.status === 'Flagged';

              return (
                <g key={`edge-${idx}`}>
                  <line
                    x1={sPos.x}
                    y1={sPos.y}
                    x2={tPos.x}
                    y2={tPos.y}
                    stroke={isSuspicious ? 'url(#edge-grad)' : '#27272a'}
                    strokeWidth={isSuspicious ? 1.5 : 1}
                    strokeDasharray={link.label.includes('Transfer') || link.label.includes('ATM') ? '4 4' : 'none'}
                    className={isSuspicious ? 'animate-[dash_10s_linear_infinite]' : ''}
                  />
                  {/* Label overlay on line */}
                  <text
                    x={(sPos.x + tPos.x) / 2}
                    y={(sPos.y + tPos.y) / 2 - 4}
                    fill="#52525b"
                    fontSize="8"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="select-none"
                  >
                    {link.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive HTML Nodes overlayed on positions */}
          <div className="absolute inset-0 w-full h-full">
            {graphData.nodes.map((node, idx) => {
              const pos = getPosition(node.id, idx, graphData.nodes.length);
              const isSelected = selectedNodeId === node.id;
              const matchesSearch = filteredNodes.some(fn => fn.id === node.id);

              return (
                <div
                  key={node.id}
                  style={{ left: pos.x - 24, top: pos.y - 24, position: 'absolute' }}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 z-20 hover:scale-115 ${getNodeColor(node)} ${
                    isSelected ? 'ring-2 ring-emerald-400 scale-110' : ''
                  } ${!matchesSearch ? 'opacity-30' : 'opacity-100'}`}
                  title={`${node.label} (${node.type})`}
                >
                  {getNodeIcon(node.type)}

                  {/* Flagged beacon */}
                  {node.status === 'Flagged' && (
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600 border border-black items-center justify-center text-[7px] text-white font-bold font-mono">!</span>
                    </span>
                  )}
                  {/* User label */}
                  <span className="absolute top-13 left-1/2 -translate-x-1/2 font-mono text-[9px] text-zinc-400 truncate text-center max-w-[80px] bg-black/80 px-1 rounded border border-zinc-900">
                    {node.label.split(':')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 pt-3 border-t border-zinc-900 text-[10px] text-zinc-500 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded bg-red-500" /> Flagged Syndicate Node
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded bg-yellow-500" /> Investigating
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded bg-emerald-500" /> Secure Citizen Node
          </div>
          <div className="ml-auto text-[9px]">
            Showing <strong className="text-zinc-300">{graphData.connectionsCount}</strong> elements in current intelligence bundle
          </div>
        </div>

      </div>

      {/* Right panel: Case Details & Intervention control */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        
        {/* Network Metrics card */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4">
          <h4 className="text-xs font-bold tracking-widest text-zinc-500 font-mono uppercase mb-3">Threat Assessment Metrics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-lg text-center">
              <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block">Network Risk Score</span>
              <span className="text-2xl font-black text-red-500">{graphData.networkRiskScore}%</span>
            </div>
            <div className="p-3 bg-emerald-950/25 border border-emerald-900/30 rounded-lg text-center">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Ring Confidence</span>
              <span className="text-2xl font-black text-emerald-400">{graphData.fraudRingConfidence}%</span>
            </div>
          </div>
        </div>

        {/* Inspected Node Detail Card */}
        {selectedNode ? (
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 flex-grow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b border-zinc-900 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-zinc-900 border border-zinc-800 rounded text-emerald-400">
                    {getNodeIcon(selectedNode.type)}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white leading-tight">{selectedNode.label}</h5>
                    <span className="text-[9px] font-mono tracking-wider uppercase bg-zinc-900 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-800 mt-1 inline-block">
                      {selectedNode.type}
                    </span>
                  </div>
                </div>

                {selectedNode.status === 'Flagged' && (
                  <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-400 font-mono text-[9px] uppercase tracking-widest">
                    FLAGGED
                  </span>
                )}
              </div>

              {/* Node Forensics Info */}
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-zinc-600 text-[10px] uppercase block">Assigned Coordinates</span>
                  <span className="text-zinc-300">GEO LOCATED: {selectedNode.location || 'Pending tower match'}</span>
                </div>

                <div>
                  <span className="text-zinc-600 text-[10px] uppercase block">Dossier Notes</span>
                  <span className="text-zinc-300 block bg-zinc-900/50 p-2 border border-zinc-900 rounded">
                    {selectedNode.details || 'No additional records registered on this identity node.'}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-600 text-[10px] uppercase block">Linked Neighbors</span>
                  <ul className="space-y-1 mt-1 text-[11px]">
                    {graphData.links
                      .filter(l => l.source === selectedNode.id || l.target === selectedNode.id)
                      .map((l, index) => {
                        const targetLabel = l.source === selectedNode.id 
                          ? graphData.nodes.find(n => n.id === l.target)?.label 
                          : graphData.nodes.find(n => n.id === l.source)?.label;
                        return (
                          <li key={index} className="text-zinc-400 flex items-center gap-1">
                            <span className="text-emerald-500">→</span> {l.label}: <strong className="text-zinc-300">{targetLabel?.split(':')[0]}</strong>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Enforcement Actions panel */}
            <div className="pt-4 border-t border-zinc-900 mt-4 space-y-2">
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block">INTERVENTION TERMINAL</span>
              
              {selectedNode.type === 'Account' && (
                <button
                  onClick={() => onFreezeAccount && onFreezeAccount(selectedNode.label)}
                  className="w-full py-2 bg-red-950/40 hover:bg-red-950 text-red-400 rounded border border-red-800/60 font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Freeze Bank Ledger
                </button>
              )}

              {selectedNode.type === 'Phone' && (
                <button
                  onClick={() => onBlockPhone && onBlockPhone(selectedNode.label)}
                  className="w-full py-2 bg-yellow-950/40 hover:bg-yellow-950 text-yellow-400 rounded border border-yellow-800/60 font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Ban className="w-3.5 h-3.5" />
                  Request SIM Card Block
                </button>
              )}

              <button className="w-full py-2 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 rounded border border-zinc-800 font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                Dispatch Local Police Notice
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-8 flex items-center justify-center text-center text-zinc-500 font-mono text-xs flex-grow">
            Select any entity circle in the relations graph to trace transactional footprints.
          </div>
        )}

      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
      `}</style>
    </div>
  );
}
