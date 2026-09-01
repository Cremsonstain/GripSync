'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { SetupScene } from './SetupScene';
import { setupViewerState, setKeyboardLayout, setMousepadSurface, setMonitor } from './store';
import type { KeyboardLayout, SetupViewerProps } from './types';

const layouts: KeyboardLayout[] = ['60%', '65%', '75%', 'TKL', 'full'];

export function SetupViewer({ labels, initialSelection, gripType = 'hybrid', palmContactRatio = 0.6, movementAmplitude = 70, className = '', footer }: SetupViewerProps) {
  const state = useSnapshot(setupViewerState);

  useEffect(() => {
    if (!initialSelection) return;
    if (initialSelection.keyboardLayout) setKeyboardLayout(initialSelection.keyboardLayout);
    if (initialSelection.mousepadSurface) setMousepadSurface(initialSelection.mousepadSurface);
    if (initialSelection.monitorAspectRatio && initialSelection.monitorRefreshRate) setMonitor(initialSelection.monitorAspectRatio, initialSelection.monitorRefreshRate);
  }, [initialSelection]);

  return (
    <section className={`overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 ${className}`} aria-label={labels.title}>
      <div className="relative h-[520px] min-h-[420px] w-full">
        <Canvas shadows dpr={[1, 1.75]} camera={{ position: [7, 5.8, 8], fov: 38, near: 0.1, far: 100 }}>
          <SetupScene labels={labels} gripType={gripType} palmContactRatio={palmContactRatio} movementAmplitude={movementAmplitude} />
        </Canvas>
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs text-slate-300 backdrop-blur">{labels.keyboard}: <strong className="text-white">{state.keyboardLayout}</strong></div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs text-slate-300 backdrop-blur">{labels.mousepad}: <strong className="text-white">{state.mousepadSurface === 'speed' ? labels.speed : labels.control}</strong></div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/85 p-3 backdrop-blur">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{labels.keyboard}</div>
            <div className="flex flex-wrap gap-1.5">{layouts.map((layout) => <button key={layout} type="button" aria-pressed={state.keyboardLayout === layout} onClick={() => setKeyboardLayout(layout)} className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition ${state.keyboardLayout === layout ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>{layout}</button>)}</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/85 p-3 backdrop-blur">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{labels.mousepad}</div>
            <div className="flex gap-1.5">{(['speed', 'control'] as const).map((surface) => <button key={surface} type="button" aria-pressed={state.mousepadSurface === surface} onClick={() => setMousepadSurface(surface)} className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${state.mousepadSurface === surface ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>{surface === 'speed' ? labels.speed : labels.control}</button>)}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 bg-slate-900/70 px-4 py-3 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-4">
          <span>{labels.monitor}: <strong className="text-slate-200">{Number(state.monitorRefreshRate)} Hz</strong></span>
          <span>{labels.aspectRatio}: <strong className="text-slate-200">{Number(state.monitorAspectRatio).toFixed(2)}:1</strong></span>
          <button type="button" onClick={() => setMonitor(Number(state.monitorAspectRatio), Number(state.monitorRefreshRate) === 240 ? 360 : 240)} className="rounded-md border border-slate-700 px-2 py-1 text-slate-300 hover:bg-slate-800">{labels.refreshRate}</button>
        </div>
        {footer}
      </div>
    </section>
  );
}
