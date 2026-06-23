export type ThreatLevel = 'Safe' | 'Low Risk' | 'Medium' | 'High' | 'Critical';

export interface ScamResult {
  probability: number; // 0 - 100
  threatLevel: ThreatLevel;
  category: string;
  explanation: string;
  evidence: string[];
  psychologicalIndicators: {
    urgency: number; // 1-10
    authorityImpersonation: boolean;
    fearInducement: boolean;
    financialLure: boolean;
    secrecyDemand: boolean;
  };
  urgencyScore: number; // 1-100
  financialRiskEstimate: string;
  recommendedActions: string[];
  explainabilityText: string;
}

export interface Node {
  id: string;
  label: string;
  type: 'Victim' | 'Fraudster' | 'Account' | 'Device' | 'Phone';
  status?: 'Flagged' | 'Secure' | 'Investigating';
  details?: string;
  location?: string;
}

export interface Link {
  source: string;
  target: string;
  label: string;
  type?: 'Transacted' | 'Registered' | 'Shared' | 'Communicated';
}

export interface NetworkGraphData {
  nodes: Node[];
  links: Link[];
  networkRiskScore: number; // 1-100
  fraudRingConfidence: number; // 1-100
  connectionsCount: number;
  criticalLeads: string[];
}

export interface DeepfakeAnalysis {
  isFake: boolean;
  probability: number;
  confidenceLevel: number;
  technicalIndicators: {
    voiceCloning: boolean;
    artificialSpeechRatio: number; // 0 - 100
    lipSyncInconsistency?: number; // 0 - 100 (for video)
    audioArtifactsScore: number; // 0 - 100
    noiseInconsistencies: boolean;
  };
  waveformPoints: number[];
  spectralAnomalies: string[];
  findingsExplanation: string;
}

export interface HeatmapPoint {
  city: string;
  lat: number;
  lng: number;
  scamDensity: 'Low' | 'Medium' | 'High' | 'Critical';
  lossesPrevented: string;
  lossesOccurred: string;
  complaintVolume: number;
  growthRate: string;
  topScamType: string;
  riskForecast7Day: string;
}

export interface PoliceLead {
  id: string;
  title: string;
  severity: ThreatLevel;
  category: string;
  timestamp: string;
  status: 'Open' | 'Enforcing' | 'Resolved';
  leads: string[];
  suggestedActions: string[];
}

export interface InvestigationCase {
  id: string;
  title: string;
  scamCategory: string;
  threatLevel: ThreatLevel;
  dateCreated: string;
  victimName: string;
  financialAmount: string;
  phoneNumbers: string[];
  muleAccounts: string[];
  status: 'New' | 'Under Investigation' | 'Enforcement Action' | 'Closed';
  timeline: {
    time: string;
    event: string;
    source: string;
  }[];
  evidenceChain: {
    id: string;
    type: string;
    name: string;
    hash: string;
    verified: boolean;
  }[];
  notes: string[];
}

export interface FIRDraft {
  policeStation: string;
  district: string;
  state: string;
  complainantName: string;
  complainantContact: string;
  suspectDetails: string;
  offenseSection: string[];
  incidentNarrative: string;
  timestamp: string;
  amountLost: string;
}

export interface ThreatIntelBriefing {
  dailySummary: string;
  trendingScripts: {
    title: string;
    category: string;
    scriptSnippet: string;
    counterMeasure: string;
  }[];
  targetedDemographics: {
    group: string;
    vulnerabilityLevel: 'High' | 'Medium' | 'Low';
    scamType: string;
    percentage: number;
  }[];
}

export interface AgentState {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'analyzing' | 'sharing' | 'complete';
  thought: string;
  confidenceScore: number;
}

export interface DemoScenario {
  id: string;
  title: string;
  headline: string;
  inputText: string;
  scamCategory: string;
  threatLevel: ThreatLevel;
  financialLoss: string;
  scamResult: ScamResult;
  networkData: NetworkGraphData;
  deepfakeData?: DeepfakeAnalysis;
  policeLeads: PoliceLead;
  investigationCase: InvestigationCase;
  firDraft: FIRDraft;
}
