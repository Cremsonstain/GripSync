export enum GripType {
  Palm = 'Palm',
  Claw = 'Claw',
  Fingertip = 'Fingertip',
  Hybrid = 'Hybrid'
}

export enum PlaystyleType {
  Flick = 'Flick',
  Track = 'Track',
  Hybrid = 'Hybrid',
  Controller = 'Controller'
}

export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

export interface GripAnalysis {
  type: GripType;
  confidence: number;
  contactPoints: HandLandmark[];
  archAngle: number;
  wristAngle: number;
}

export interface PlaystyleAnalysis {
  type: PlaystyleType;
  subTraits: string[];
  velocityDistribution: number[];
  flickRatio: number;
  trackingDuration: number;
}

export interface SetupEvaluation {
  overallScore: number;
  bottlenecks: string[];
  monitorScore: number;
  mouseScore: number;
  keyboardScore: number;
  mousepadScore: number;
}

export interface Verdict {
  setupGrade: string;
  aimGrade: string;
  tag: string;
  oneLiner: string;
  detailedBrief: string;
}

export interface AnalysisSession {
  id: string;
  userId: string;
  timestamp: Date;
  gripAnalysis: GripAnalysis;
  playstyleAnalysis: PlaystyleAnalysis;
  setupEvaluation: SetupEvaluation;
  verdict: Verdict;
}
