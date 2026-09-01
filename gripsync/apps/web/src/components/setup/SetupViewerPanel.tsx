'use client';

import dynamic from 'next/dynamic';
import type { ViewerLabels } from '@gripsync/3d-viewer';

const SetupViewer = dynamic(() => import('@gripsync/3d-viewer').then((mod) => mod.SetupViewer), { ssr: false });

const labels: ViewerLabels = {
  title: 'Interactive setup viewer',
  mouse: 'Mouse',
  keyboard: 'Keyboard',
  mousepad: 'Mousepad',
  monitor: 'Monitor',
  speed: 'Speed',
  control: 'Control',
  inspect: 'Inspect',
  close: 'Close',
  gripHeatmap: 'Grip heatmap',
  movementRange: 'Movement range',
  dpi: 'DPI',
  latency: 'Latency',
  actuation: 'Actuation',
  refreshRate: 'Refresh rate',
  aspectRatio: 'Aspect ratio',
};

export function SetupViewerPanel() {
  return <SetupViewer labels={labels} gripType="claw" palmContactRatio={0.6} movementAmplitude={70} />;
}
