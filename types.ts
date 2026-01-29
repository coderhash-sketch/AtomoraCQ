
export enum WorkflowState {
  IDLE = 'idle',
  AI_FILTERING = 'ai-filtering',
  QUANTUM_SIMULATION = 'quantum-simulation',
  RESULTS = 'results',
  IMPACT = 'impact',
  ANALYTICS = 'analytics',
  CONFIG = 'config',
  LOGS = 'logs'
}

export interface MaterialCandidate {
  id: string;
  name: string;
  metal: string;
  metalColor: string;
  adsorption: string;
  surfaceArea: string;
  synthesisTime: string;
  cost: string;
  highlightMetric: string;
  highlightLabel: string;
  formula: string;
  // Animation trajectory parameters
  entryX: number;
  entryY: number;
  entryRotation: number;
  velocity: number; // m/s
  // Added for Hybrid Optimization
  efficiencyScore?: number;
  durabilityScore?: number;
  feasibilityScore?: number;
  compositeScore?: number;
}

export interface SimulationLog {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface ProcessStep {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'completed';
  progress: number;
}
