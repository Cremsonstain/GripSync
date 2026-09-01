'use client';

import dynamic from 'next/dynamic';
import type { ViewerLabels } from '@gripsync/3d-viewer';
import labels from '@/locales/en/3d-viewer.json';

const SetupViewer = dynamic(() => import('@gripsync/3d-viewer').then((mod) => mod.SetupViewer), { ssr: false });

export function SetupViewerPanel() {
  return <SetupViewer labels={labels satisfies ViewerLabels} gripType="claw" palmContactRatio={0.6} movementAmplitude={70} />;
}
