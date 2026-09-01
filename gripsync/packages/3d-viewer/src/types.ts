import type { ReactNode } from 'react';

export type GripType = 'palm' | 'claw' | 'fingertip' | 'hybrid';
export type KeyboardLayout = '60%' | '65%' | '75%' | 'TKL' | 'full';
export type PadSurface = 'speed' | 'control';

export interface ViewerSelection {
  mouseModel?: string;
  keyboardLayout: KeyboardLayout;
  mousepadSurface: PadSurface;
  monitorAspectRatio: number;
  monitorRefreshRate: number;
}

export interface ViewerLabels {
  title: string;
  mouse: string;
  keyboard: string;
  mousepad: string;
  monitor: string;
  speed: string;
  control: string;
  inspect: string;
  close: string;
  gripHeatmap: string;
  movementRange: string;
  dpi: string;
  latency: string;
  actuation: string;
  refreshRate: string;
  aspectRatio: string;
}

export interface SetupViewerProps {
  labels: ViewerLabels;
  initialSelection?: Partial<ViewerSelection>;
  gripType?: GripType;
  palmContactRatio?: number;
  movementAmplitude?: number;
  className?: string;
  footer?: ReactNode;
}
