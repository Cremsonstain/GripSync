export interface Mouse {
  name: string;
  brand: string;
  weight: number;
  shape: string;
  sensorModel: string;
  maxDPI: number;
  pollingRate: number;
  wireless: boolean;
  price: number;
  gripCompatibility: string[];
}

export interface Mousepad {
  name: string;
  brand: string;
  size: string;
  surface: 'Speed' | 'Control' | 'Hybrid';
  material: string;
  thickness: number;
  price: number;
}

export interface MouseSkates {
  name: string;
  material: 'PTFE' | 'Glass' | 'Ceramic';
  thickness: number;
  mouseCompatibility: string[];
}

export interface GripTape {
  name: string;
  material: string;
  texture: string;
  mouseCompatibility: string[];
}

export interface Keyboard {
  name: string;
  brand: string;
  layout: '60' | '65' | '75' | 'TKL' | 'Full';
  switchType: string;
  actuationPoint: number;
  pollingRate: number;
  price: number;
}

export interface Monitor {
  name: string;
  brand: string;
  panelType: 'IPS' | 'VA' | 'TN' | 'OLED';
  refreshRate: number;
  responseTime: number;
  resolution: string;
  size: number;
  price: number;
}

export interface Recommendation {
  peripheral: Mouse | Mousepad | MouseSkates | GripTape | Keyboard | Monitor;
  matchScore: number;
  reasons: string[];
  priorityScore: number;
  impactEstimate: string;
}
